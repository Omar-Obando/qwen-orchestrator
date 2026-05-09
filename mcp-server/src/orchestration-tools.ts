/**
 * Orchestration Tools for MCP Server
 *
 * Provides cubicleq-inspired orchestration tools via the Model Context Protocol.
 * Tools: claim_task, heartbeat, report_progress, report_completion,
 *        report_blockage, log_event, check_dependencies, get_task_state,
 *        get_stale_tasks, set_validation_commands, validate_task
 *
 * Task State Machine: pending → claimed → in_progress → completed | blocked | failed
 *   - blocked → in_progress (unblocked)
 *   - failed is terminal
 *   - claimed is atomic — only one agent can claim a task
 *
 * State files per session:
 *   $SESSION_DIR/tasks.json   — array of task objects
 *   $SESSION_DIR/events.json  — append-only event log
 *
 * Timeout constants (inspired by cubicleq, tuned for 5-min shell operations):
 *   - HEARTBEAT_STALE_TIMEOUT: 20 minutes — must exceed max shell timeout (5min) + buffer
 *   - LAUNCH_SILENCE_TIMEOUT: 90 seconds — agent considered stuck if no initial heartbeat
 *   - MCP_TOOL_TIMEOUT: 15 minutes — must exceed HEARTBEAT_STALE_TIMEOUT
 *
 * @author Omar-Obando
 * @license MIT
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

import { getSessionDir, readCurrentSessionId } from './session-manager.js';

// ---------------------------------------------------------------------------
// Timeout Constants (cubicleq-inspired)
// ---------------------------------------------------------------------------

/** How long before a task with no heartbeat is considered stale (7 minutes — must exceed max shell timeout of 5min) */
export const HEARTBEAT_STALE_TIMEOUT_MS = 20 * 60 * 1000;

/** How long before an agent that hasn't sent initial heartbeat is considered stuck (90 seconds) */
export const LAUNCH_SILENCE_TIMEOUT_MS = 90 * 1000;

/** Maximum time for any MCP tool call (15 minutes — must exceed HEARTBEAT_STALE_TIMEOUT) */
export const MCP_TOOL_TIMEOUT_MS = 15 * 60 * 1000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Valid states in the task state machine */
type TaskState =
  | 'pending'
  | 'claimed'
  | 'in_progress'
  | 'completed'
  | 'blocked'
  | 'failed'
  | 'cancelled';

/** Task record stored in tasks.json */
interface TaskRecord {
  taskId: string;
  status: TaskState;
  agent: string;
  /** Agent that claimed the task (atomic ownership) */
  claimedBy: string | null;
  /** UTC timestamp when the task was claimed */
  claimedAt: string | null;
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
  /** For continuation: the previous task ID this continues from */
  continuesFrom: string | null;
  /** Progress notes left by the previous agent for continuation */
  handoffNotes: string | null;
  /** Shell commands to run after task completion to validate deliverables */
  validationCommands: string[];
  /** Results of running validationCommands: { command, exitCode, stdout, stderr } */
  validationResults: Array<{
    command: string;
    exitCode: number;
    stdout: string;
    stderr: string;
  }> | null;
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
    claimedBy: null,
    claimedAt: null,
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
    continuesFrom: null,
    handoffNotes: null,
    validationCommands: [],
    validationResults: null,
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
        'Report that a task has been completed. Updates the task status to "completed", records completion time, files changed, and test results. Appends a completion event to the session event log. Automatically runs validation commands if defined.',
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

      // Run validation commands if defined (QA/Audit enforcement)
      let validationPassed = true;
      if (task.validationCommands && task.validationCommands.length > 0) {
        const { execSync } = require('child_process');
        const results: Array<{ command: string; exitCode: number; stdout: string; stderr: string }> = [];
        
        for (const cmd of task.validationCommands) {
          try {
            const stdout = execSync(cmd, {
              timeout: 5 * 60 * 1000, // 5 min timeout per command
              encoding: 'utf8',
              maxBuffer: 1024 * 1024,
            }).trim();
            results.push({ command: cmd, exitCode: 0, stdout, stderr: '' });
          } catch (err: any) {
            results.push({
              command: cmd,
              exitCode: err.status ?? 1,
              stdout: (err.stdout ?? '').toString().trim(),
              stderr: (err.stderr ?? '').toString().trim(),
            });
          }
        }
        
        task.validationResults = results;
        validationPassed = results.every((r) => r.exitCode === 0);
        
        if (!validationPassed) {
          const failedCount = results.filter((r) => r.exitCode !== 0).length;
          return makeResult({
            success: false,
            error: `Validation failed: ${failedCount}/${results.length} commands failed`,
            results: results.map((r) => ({ command: r.command, passed: r.exitCode === 0, exitCode: r.exitCode, stdout: r.stdout.slice(0, 500), stderr: r.stderr.slice(0, 500) })),
            recommendation: 'Fix validation issues before reporting completion',
          });
        }
      }

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
          validationPassed,
        },
      });

      return makeResult({ success: true, task });
    }
  );

  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // Tool 3b: report_failure (for cancelled/failed tasks)
  // -------------------------------------------------------------------------
  server.registerTool(
    'report_failure',
    {
      description:
        'Report that a task has failed or been cancelled. Updates the task status to "failed" or "cancelled" with the failure reason. Appends a failure event to the session event log. Use this when a task cannot complete due to errors, user cancellation, or external failures.',
      inputSchema: z.object({
        taskId: z.string().describe('Unique task identifier'),
        agent: z.string().describe('Agent reporting the failure'),
        reason: z.string().describe('Why the task failed or was cancelled'),
        status: z
          .enum(['failed', 'cancelled'])
          .describe('Failure type: "failed" for errors, "cancelled" for user stop'),
      }).shape,
    },
    async ({
      taskId,
      agent,
      reason,
      status,
    }: {
      taskId: string;
      agent: string;
      reason: string;
      status: 'failed' | 'cancelled';
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const { task } = findOrCreateTask(tasks, taskId);

      task.status = status;
      task.agent = agent;
      task.blockedAt = new Date().toISOString();
      task.blockReason = reason;

      writeTasks(sessionDir, tasks);

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: status,
        description: reason,
        metadata: { taskId, failureType: status },
      });

      return makeResult({ success: false, task, message: 'Task ' + taskId + ' marked as ' + status });
    }
  );

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

  // =========================================================================
  // Tool 7: claim_task — Atomically claim a pending task
  // =========================================================================
  server.registerTool(
    'claim_task',
    {
      description:
        `Atomically claim a pending task for an agent. Only one agent can claim a given task. ` +
        `Sets status to 'claimed' and records the claiming agent and timestamp. ` +
        `Returns the full task record with computed fields on success, or an error if already claimed.`,
      inputSchema: z.object({
        taskId: z.string().describe('ID of the task to claim'),
        agent: z.string().describe('Name of the agent claiming this task'),
      }).shape,
    },
    async ({ taskId, agent }: { taskId: string; agent: string }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const task = tasks.find((t) => t.taskId === taskId);

      if (!task) {
        return makeResult({
          success: false,
          error: `Task ${taskId} not found`,
        });
      }

      if (task.status !== 'pending') {
        return makeResult({
          success: false,
          error: `Task ${taskId} is '${task.status}', not 'pending'. Only pending tasks can be claimed.`,
          currentStatus: task.status,
          claimedBy: task.claimedBy,
        });
      }

      // Atomic claim
      task.status = 'claimed';
      task.claimedBy = agent;
      task.claimedAt = new Date().toISOString();
      task.lastHeartbeat = new Date().toISOString();

      writeTasks(sessionDir, tasks);
      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: 'task_claimed',
        description: `Task ${taskId} claimed by ${agent}`,
        metadata: { taskId },
      });

      return makeResult({
        success: true,
        task,
        computed: computeFields(task),
        message: `Task ${taskId} claimed by ${agent}. You MUST call heartbeat periodically and report_progress when starting work.`,
      });
    }
  );

  // =========================================================================
  // Tool 8: heartbeat — Lightweight keep-alive signal
  // =========================================================================
  server.registerTool(
    'heartbeat',
    {
      description:
        `Send a lightweight heartbeat to signal the agent is still alive and working. ` +
        `Call this every 30-60 seconds during long-running operations to prevent being marked as stale. ` +
        `If no heartbeat is received within ${HEARTBEAT_STALE_TIMEOUT_MS / 1000}s, the task is considered stale. ` +
        `Optionally include a brief status message.`,
      inputSchema: z.object({
        taskId: z.string().describe('ID of the task to send heartbeat for'),
        agent: z.string().describe('Name of the agent sending the heartbeat'),
        message: z
          .string()
          .optional()
          .describe(
            'Optional brief status message (e.g., "still analyzing file", "writing tests")'
          ),
      }).shape,
    },
    async ({
      taskId,
      agent,
      message,
    }: {
      taskId: string;
      agent: string;
      message?: string;
    }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const task = tasks.find((t) => t.taskId === taskId);

      if (!task) {
        return makeResult({
          success: false,
          error: `Task ${taskId} not found`,
        });
      }

      // Verify the claiming agent matches
      if (task.claimedBy && task.claimedBy !== agent) {
        return makeResult({
          success: false,
          error: `Task ${taskId} is claimed by '${task.claimedBy}', not '${agent}'. Only the claiming agent can heartbeat.`,
        });
      }

      // Update heartbeat timestamp
      task.lastHeartbeat = new Date().toISOString();
      if (message) {
        task.summary = message;
      }

      // If task was blocked, unblock it on heartbeat
      if (task.status === 'blocked') {
        task.status = 'in_progress';
        task.blockedAt = null;
      }

      // If task was claimed but not yet in_progress, promote it
      if (task.status === 'claimed') {
        task.status = 'in_progress';
      }

      writeTasks(sessionDir, tasks);

      // Lightweight event log for audit trail
      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent,
        eventType: 'heartbeat',
        description: message ?? `Heartbeat from ${agent}`,
        metadata: { taskId },
      });

      return makeResult({
        success: true,
        taskId,
        status: task.status,
        lastHeartbeat: task.lastHeartbeat,
        message: `Heartbeat recorded. Task ${taskId} is ${task.status}.`,
      });
    }
  );

  // =========================================================================
  // Tool 9: get_stale_tasks — Find tasks that haven't had a heartbeat
  // =========================================================================
  server.registerTool(
    'get_stale_tasks',
    {
      description:
        `Find tasks whose last heartbeat is older than the stale timeout (${HEARTBEAT_STALE_TIMEOUT_MS / 1000}s). ` +
        `These tasks may belong to agents that have stopped, timed out, or crashed. ` +
        `The commander should use this to detect stuck agents and create continuation tasks. ` +  
        `Returns stale tasks with their computed durations since last heartbeat.`,
      inputSchema: z.object({
        staleTimeoutMs: z
          .number()
          .optional()
          .describe(
            `Custom stale timeout in milliseconds (default: \${HEARTBEAT_STALE_TIMEOUT_MS} = 20 minutes)`
          ),
      }).shape,
    },
    async ({ staleTimeoutMs }: { staleTimeoutMs?: number }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const timeout = staleTimeoutMs ?? HEARTBEAT_STALE_TIMEOUT_MS;
      const now = Date.now();

      const staleTasks = tasks
        .filter((t) => {
          // Only check active tasks (claimed, in_progress, or blocked)
          if (!['claimed', 'in_progress', 'blocked'].includes(t.status)) {
            return false;
          }
          // Check if heartbeat is stale
          if (!t.lastHeartbeat) return true; // No heartbeat ever = stale
          const elapsed = now - new Date(t.lastHeartbeat).getTime();
          return elapsed > timeout;
        })
        .map((t) => {
          const elapsed = t.lastHeartbeat
            ? now - new Date(t.lastHeartbeat).getTime()
            : null;
          return {
            task: t,
            computed: computeFields(t),
            staleFor: elapsed ? formatDuration(elapsed) : 'never',
            staleForMs: elapsed,
          };
        });

      return makeResult({
        success: true,
        staleCount: staleTasks.length,
        staleTimeoutMs: timeout,
        staleTasks,
        recommendation:
          staleTasks.length > 0
            ? `Found ${staleTasks.length} stale task(s). Create continuation tasks with continuesFrom pointing to these stale task IDs. Mark stale tasks as failed.`
            : 'No stale tasks detected. All agents are reporting heartbeats.',
      });
    }
  );

  // =========================================================================
  // Tool 10: set_validation_commands — Define validation commands for a task
  // =========================================================================
  server.registerTool(
    'set_validation_commands',
    {
      description:
        `Set validation commands for a task. These commands will be run by validate_task ` +
        `to verify the deliverable is complete. Example: ["ls src/styles/global.css", "npm run build"]. ` +
        `Commands should be shell commands that return exit code 0 on success.`,
      inputSchema: z.object({
        taskId: z.string().describe('ID of the task'),
        commands: z
          .array(z.string())
          .describe(
            'Array of shell commands to run for validation. Each must return exit code 0.'
          ),
      }).shape,
    },
    async ({ taskId, commands }: { taskId: string; commands: string[] }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const task = tasks.find((t) => t.taskId === taskId);

      if (!task) {
        return makeResult({
          success: false,
          error: `Task ${taskId} not found`,
        });
      }

      task.validationCommands = commands;
      writeTasks(sessionDir, tasks);

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent: task.agent || 'unknown',
        eventType: 'validation_commands_set',
        description: `Set ${commands.length} validation command(s) for task ${taskId}`,
        metadata: { taskId, commandCount: commands.length },
      });

      return makeResult({
        success: true,
        taskId,
        validationCommands: task.validationCommands,
        message: `Set ${commands.length} validation command(s) for task ${taskId}. Run validate_task to execute them.`,
      });
    }
  );

  // =========================================================================
  // Tool 11: validate_task — Run validation commands for a task
  // =========================================================================
  server.registerTool(
    'validate_task',
    {
      description:
        `Run validation commands for a task and return results. ` +
        `Each command runs with a 5-minute timeout. ` +
        `All commands must pass (exit code 0) for validation to succeed. ` +
        `Results are stored in task.validationResults. ` +
        `Call this BEFORE report_completion to verify deliverables.`,
      inputSchema: z.object({
        taskId: z.string().describe('ID of the task to validate'),
      }).shape,
    },
    async ({ taskId }: { taskId: string }) => {
      const sessionResult = requireSession();
      if ('error' in sessionResult) return sessionResult.error;

      const { sessionDir } = sessionResult;
      const tasks = readTasks(sessionDir);
      const task = tasks.find((t) => t.taskId === taskId);

      if (!task) {
        return makeResult({
          success: false,
          error: `Task ${taskId} not found`,
        });
      }

      if (task.validationCommands.length === 0) {
        return makeResult({
          success: true,
          taskId,
          warning:
            'No validation commands defined for this task. Set them with set_validation_commands first.',
          validationResults: [],
        });
      }

      // Run each validation command
      const results: Array<{
        command: string;
        exitCode: number;
        stdout: string;
        stderr: string;
      }> = [];

      for (const cmd of task.validationCommands) {
        try {
          const stdout = execSync(cmd, {
            timeout: 5 * 60 * 1000, // 5 min timeout per command
            encoding: 'utf8',
            maxBuffer: 1024 * 1024,
          }).trim();
          results.push({
            command: cmd,
            exitCode: 0,
            stdout,
            stderr: '',
          });
        } catch (err: unknown) {
          const error = err as {
            status?: number;
            stdout?: string;
            stderr?: string;
          };
          results.push({
            command: cmd,
            exitCode: error.status ?? 1,
            stdout: (error.stdout ?? '').toString().trim(),
            stderr: (error.stderr ?? '').toString().trim(),
          });
        }
      }

      // Store results
      task.validationResults = results;
      writeTasks(sessionDir, tasks);

      const allPassed = results.every((r) => r.exitCode === 0);
      const failedCount = results.filter((r) => r.exitCode !== 0).length;

      appendEvent(sessionDir, {
        timestamp: new Date().toISOString(),
        agent: task.agent || 'unknown',
        eventType: allPassed ? 'validation_passed' : 'validation_failed',
        description: `Validation ${allPassed ? 'PASSED' : 'FAILED'} for task ${taskId}: ${results.length - failedCount}/${results.length} commands passed`,
        metadata: {
          taskId,
          allPassed,
          passedCount: results.length - failedCount,
          failedCount,
        },
      });

      return makeResult({
        success: allPassed,
        taskId,
        allPassed,
        totalCommands: results.length,
        passedCommands: results.length - failedCount,
        failedCommands: failedCount,
        results: results.map((r) => ({
          command: r.command,
          passed: r.exitCode === 0,
          exitCode: r.exitCode,
          stdout: r.stdout.slice(0, 500), // Truncate for readability
          stderr: r.stderr.slice(0, 500),
        })),
        recommendation: allPassed
          ? 'All validation commands passed. Safe to call report_completion.'
          : `${failedCount} command(s) failed. Fix the issues and re-run validate_task before reporting completion.`,
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
