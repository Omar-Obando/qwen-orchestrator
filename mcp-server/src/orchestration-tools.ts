/**
 * Orchestration Tools for MCP Server
 *
 * Provides cubicleq-inspired orchestration tools via the Model Context Protocol.
 * Tools: report_progress, report_completion, report_blockage,
 *        log_event, check_dependencies, get_task_state
 *
 * Task State Machine: pending → in_progress → completed | blocked | failed
 *   - blocked → in_progress (unblocked)
 *   - failed is terminal
 *
 * State files per session:
 *   $SESSION_DIR/tasks.json   — array of task objects
 *   $SESSION_DIR/events.json  — append-only event log
 *
 * @author Omar-Obando
 * @license MIT
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

import { getSessionDir, readCurrentSessionId } from './session-manager.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Valid states in the task state machine */
type TaskState = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'failed';

/** Task record stored in tasks.json */
interface TaskRecord {
  taskId: string;
  status: TaskState;
  agent: string;
  summary: string;
  progressPercent: number;
  createdAt: string;
  lastHeartbeat: string;
  completedAt: string | null;
  filesChanged: string[];
  testResults: string | null;
  blockedAt: string | null;
  blockReason: string | null;
  suggestedFix: string | null;
}

/** Event record stored in events.json */
interface EventRecord {
  timestamp: string;
  agent: string;
  eventType: string;
  description: string;
  metadata: Record<string, unknown> | null;
}

/** Dependency task input for check_dependencies */
interface DependencyTask {
  id: string;
  dependsOn: string[];
}

// ---------------------------------------------------------------------------
// Helpers — JSON file I/O
// ---------------------------------------------------------------------------

function readJsonArray<T>(filePath: string): T[] {
  if (!existsSync(filePath)) {
    return [];
  }
  try {
    const raw = readFileSync(filePath, 'utf8').trim();
    if (raw.length === 0) {
      return [];
    }
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeJson<T>(filePath: string, data: T): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

/** Return the tasks.json path for the current session, or null if no session */
function tasksPath(sessionDir: string): string {
  return join(sessionDir, 'tasks.json');
}

function eventsPath(sessionDir: string): string {
  return join(sessionDir, 'events.json');
}

/** Read all tasks for a session */
function readTasks(sessionDir: string): TaskRecord[] {
  return readJsonArray<TaskRecord>(tasksPath(sessionDir));
}

/** Write all tasks for a session */
function writeTasks(sessionDir: string, tasks: TaskRecord[]): void {
  writeJson(tasksPath(sessionDir), tasks);
}

/** Append an event to events.json */
function appendEvent(sessionDir: string, event: EventRecord): void {
  const events = readJsonArray<EventRecord>(eventsPath(sessionDir));
  events.push(event);
  writeJson(eventsPath(sessionDir), events);
}

/** Find or create a task record */
function findOrCreateTask(
  tasks: TaskRecord[],
  taskId: string
): { task: TaskRecord; created: boolean } {
  const existing = tasks.find((t) => t.taskId === taskId);
  if (existing) {
    return { task: existing, created: false };
  }
  const now = new Date().toISOString();
  const created: TaskRecord = {
    taskId,
    status: 'pending',
    agent: '',
    summary: '',
    progressPercent: 0,
    createdAt: now,
    lastHeartbeat: now,
    completedAt: null,
    filesChanged: [],
    testResults: null,
    blockedAt: null,
    blockReason: null,
    suggestedFix: null,
  };
  tasks.push(created);
  return { task: created, created: true };
}

/** Resolve current session or return an error result */
function requireSession():
  | { sessionDir: string }
  | { error: ReturnType<typeof makeError> } {
  const sessionId = readCurrentSessionId();
  if (!sessionId) {
    return {
      error: makeError('No active session. Call create_session first.'),
    };
  }
  const sessionDir = getSessionDir(sessionId);
  if (!existsSync(sessionDir)) {
    return { error: makeError(`Session directory not found: ${sessionDir}`) };
  }
  return { sessionDir };
}

function makeError(message: string) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ success: false, error: message }, null, 2),
      },
    ],
  };
}

function makeResult(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
}

// ---------------------------------------------------------------------------
// Cycle detection (DFS)
// ---------------------------------------------------------------------------

/**
 * Detect circular dependencies using iterative DFS with coloring:
 *   WHITE = 0 (unvisited), GRAY = 1 (in stack), BLACK = 2 (done)
 */
function detectCycles(tasks: DependencyTask[]): string[][] {
  const taskMap = new Map<string, DependencyTask>();
  for (const t of tasks) {
    taskMap.set(t.id, t);
  }

  const cycles: string[][] = [];
  const color = new Map<string, number>();
  const path: string[] = [];

  function dfs(nodeId: string): void {
    if (color.get(nodeId) === 2) return; // BLACK — done
    if (color.get(nodeId) === 1) {
      // GRAY — cycle detected, extract the cycle path
      const cycleStart = path.indexOf(nodeId);
      if (cycleStart >= 0) {
        cycles.push(path.slice(cycleStart).concat(nodeId));
      }
      return;
    }

    color.set(nodeId, 1); // GRAY
    path.push(nodeId);

    const task = taskMap.get(nodeId);
    if (task) {
      for (const dep of task.dependsOn) {
        dfs(dep);
      }
    }

    path.pop();
    color.set(nodeId, 2); // BLACK
  }

  for (const t of tasks) {
    if (!color.has(t.id)) {
      dfs(t.id);
    }
  }

  return cycles;
}

// ---------------------------------------------------------------------------
// Tool Registration
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerOrchestrationTools(server: any): void {
  // -------------------------------------------------------------------------
  // Tool 1: report_progress (heartbeat)
  // -------------------------------------------------------------------------
  server.registerTool(
    'report_progress',
    {
      description:
        'Report that a task is in progress (heartbeat). Updates the task status, agent, summary, and progress percentage. Appends a progress event to the session event log.',
      inputSchema: z.object({
        taskId: z.string().describe('Unique task identifier'),
        agent: z.string().describe('Agent reporting progress'),
        summary: z.string().describe('Progress summary text'),
        progress_percent: z
          .number()
          .min(0)
          .max(100)
          .optional()
          .describe('Progress percentage 0-100 (default: 0)'),
      }).shape,
    },
    async ({
      taskId,
      agent,
      summary,
      progress_percent,
    }: {
      taskId: string;
      agent: string;
      summary: string;
      progress_percent?: number;
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const { task } = findOrCreateTask(tasks, taskId);

      task.status = 'in_progress';
      task.agent = agent;
      task.summary = summary;
      task.progressPercent = progress_percent ?? task.progressPercent;
      task.lastHeartbeat = new Date().toISOString();

      writeTasks(sessionDir, tasks);

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: 'progress',
        description: summary,
        metadata: { taskId, progressPercent: task.progressPercent },
      });

      return makeResult({ success: true, task });
    }
  );

  // -------------------------------------------------------------------------
  // Tool 2: report_completion
  // -------------------------------------------------------------------------
  server.registerTool(
    'report_completion',
    {
      description:
        'Report that a task has been completed. Updates the task status to "completed", records completion time, files changed, and test results. Appends a completion event to the session event log.',
      inputSchema: z.object({
        taskId: z.string().describe('Unique task identifier'),
        agent: z.string().describe('Agent completing the task'),
        summary: z.string().describe('Completion summary'),
        files_changed: z
          .array(z.string())
          .optional()
          .describe('List of files modified during the task'),
        test_results: z
          .string()
          .optional()
          .describe('Test execution output or summary'),
      }).shape,
    },
    async ({
      taskId,
      agent,
      summary,
      files_changed,
      test_results,
    }: {
      taskId: string;
      agent: string;
      summary: string;
      files_changed?: string[];
      test_results?: string;
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const { task } = findOrCreateTask(tasks, taskId);

      task.status = 'completed';
      task.agent = agent;
      task.summary = summary;
      task.progressPercent = 100;
      task.completedAt = new Date().toISOString();
      task.filesChanged = files_changed ?? task.filesChanged;
      task.testResults = test_results ?? task.testResults;

      writeTasks(sessionDir, tasks);

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: 'completed',
        description: summary,
        metadata: {
          taskId,
          filesChanged: task.filesChanged.length,
        },
      });

      return makeResult({ success: true, task });
    }
  );

  // -------------------------------------------------------------------------
  // Tool 3: report_blockage
  // -------------------------------------------------------------------------
  server.registerTool(
    'report_blockage',
    {
      description:
        'Report that a task is blocked. Updates the task status to "blocked" with the block reason and optional suggested fix. Appends a blocked event to the session event log.',
      inputSchema: z.object({
        taskId: z.string().describe('Unique task identifier'),
        agent: z.string().describe('Agent reporting the blockage'),
        reason: z.string().describe('Why the task is blocked'),
        suggested_fix: z
          .string()
          .optional()
          .describe('Optional suggestion for resolving the blockage'),
      }).shape,
    },
    async ({
      taskId,
      agent,
      reason,
      suggested_fix,
    }: {
      taskId: string;
      agent: string;
      reason: string;
      suggested_fix?: string;
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const { task } = findOrCreateTask(tasks, taskId);

      task.status = 'blocked';
      task.agent = agent;
      task.blockedAt = new Date().toISOString();
      task.blockReason = reason;
      task.suggestedFix = suggested_fix ?? null;

      writeTasks(sessionDir, tasks);

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: 'blocked',
        description: reason,
        metadata: { taskId, suggestedFix: suggested_fix ?? null },
      });

      return makeResult({ success: true, task });
    }
  );

  // -------------------------------------------------------------------------
  // Tool 4: log_event (audit logging)
  // -------------------------------------------------------------------------
  server.registerTool(
    'log_event',
    {
      description:
        'Append an audit event to the session event log. Used for tracking agent actions, decisions, and state changes that are not covered by the specific report_* tools.',
      inputSchema: z.object({
        agent: z.string().describe('Agent logging the event'),
        event_type: z
          .string()
          .describe(
            'Event type (e.g., "decision", "warning", "info", "error")'
          ),
        description: z.string().describe('Human-readable event description'),
        metadata: z
          .record(z.string(), z.any())
          .optional()
          .describe('Optional key-value metadata attached to the event'),
      }).shape,
    },
    async ({
      agent,
      event_type,
      description,
      metadata,
    }: {
      agent: string;
      event_type: string;
      description: string;
      metadata?: Record<string, unknown>;
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;

      const event: EventRecord = {
        timestamp: new Date().toISOString(),
        agent,
        eventType: event_type,
        description,
        metadata: metadata ?? null,
      };

      appendEvent(sessionDir, event);

      const events = readJsonArray<EventRecord>(eventsPath(sessionDir));

      return makeResult({
        success: true,
        totalEvents: events.length,
        event,
      });
    }
  );

  // -------------------------------------------------------------------------
  // Tool 5: check_dependencies
  // -------------------------------------------------------------------------
  server.registerTool(
    'check_dependencies',
    {
      description:
        'Validate a dependency graph for tasks. Detects circular dependencies (cycles) and missing dependency references (dependsOn IDs that do not map to any task). Returns a validation report.',
      inputSchema: z.object({
        tasks: z
          .array(
            z.object({
              id: z.string().describe('Task ID'),
              dependsOn: z
                .array(z.string())
                .describe('Array of task IDs this task depends on'),
            })
          )
          .describe('Array of tasks with their dependency declarations'),
      }).shape,
    },
    async ({ tasks }: { tasks: DependencyTask[] }) => {
      const allIds = new Set(tasks.map((t) => t.id));

      // Detect missing dependencies
      const missingDependencies: { taskId: string; missing: string[] }[] = [];
      for (const t of tasks) {
        const missing = t.dependsOn.filter((dep) => !allIds.has(dep));
        if (missing.length > 0) {
          missingDependencies.push({ taskId: t.id, missing });
        }
      }

      // Detect circular dependencies
      const circularDependencies = detectCycles(tasks);

      // Count total dependency edges
      const dependencyCount = tasks.reduce(
        (sum, t) => sum + t.dependsOn.length,
        0
      );

      const valid =
        circularDependencies.length === 0 && missingDependencies.length === 0;

      return makeResult({
        valid,
        circularDependencies,
        missingDependencies,
        taskCount: tasks.length,
        dependencyCount,
      });
    }
  );

  // -------------------------------------------------------------------------
  // Tool 6: get_task_state
  // -------------------------------------------------------------------------
  server.registerTool(
    'get_task_state',
    {
      description:
        'Read the current state of one or all tasks in the session. If taskId is provided, returns that specific task with computed duration fields. If omitted, returns all tasks.',
      inputSchema: z.object({
        taskId: z
          .string()
          .optional()
          .describe('Optional task ID. If omitted, returns all tasks.'),
      }).shape,
    },
    async ({ taskId }: { taskId?: string }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);

      if (taskId) {
        const task = tasks.find((t) => t.taskId === taskId);
        if (!task) {
          return makeError(`Task not found: ${taskId}`);
        }
        return makeResult({
          success: true,
          task,
          computed: computeFields(task),
        });
      }

      // Return all tasks with computed fields
      const allTasks = tasks.map((t) => ({
        task: t,
        computed: computeFields(t),
      }));

      return makeResult({
        success: true,
        taskCount: tasks.length,
        tasks: allTasks,
      });
    }
  );
}

// ---------------------------------------------------------------------------
// Computed field helpers
// ---------------------------------------------------------------------------

function computeFields(task: TaskRecord): {
  duration: string | null;
  blockedDuration: string | null;
} {
  let duration: string | null = null;
  let blockedDuration: string | null = null;

  if (task.completedAt && task.createdAt) {
    const ms =
      new Date(task.completedAt).getTime() - new Date(task.createdAt).getTime();
    duration = formatDuration(ms);
  }

  if (task.blockedAt) {
    const endTime = task.completedAt ?? new Date().toISOString();
    const ms = new Date(endTime).getTime() - new Date(task.blockedAt).getTime();
    blockedDuration = formatDuration(ms);
  }

  return { duration, blockedDuration };
}

function formatDuration(ms: number): string {
  if (ms < 0) return '0s';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}
