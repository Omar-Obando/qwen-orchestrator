/**
 * Session Management Tools for MCP Server
 *
 * Provides session isolation tools via the Model Context Protocol.
 * Each project folder gets its own isolated session space.
 *
 * @author Omar-Obando
 * @license MIT
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { z } from 'zod';

// Helper function to get current working directory safely
function getCurrentWorkingDirectory(): string {
  try {
    // Try to use process.cwd() which is available in Node.js environment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cwd = (globalThis as any).process?.cwd?.();
    if (cwd) return cwd;
  } catch {
    // Ignore errors
  }
  // Fallback to current directory
  return '.';
}

// These will be registered on the server in index.ts
// This file exports the tool registration functions

export function registerSessionTools(server: McpServer) {
  // ---------------------------------------------------------------------------
  // Tool: Create Session
  // ---------------------------------------------------------------------------
  server.registerTool(
    'create_session',
    {
      description:
        'Create a new isolated session directory for a project and set it as the current session. Each project folder gets its own workspace with isolated sessions.',
      inputSchema: z.object({
        projectPath: z
          .string()
          .optional()
          .describe(
            'Project path to associate with this session (uses workspace isolation)'
          ),
        mission: z
          .string()
          .optional()
          .describe(
            'Optional mission description to associate with this session'
          ),
      }).shape,
    },
    async ({
      projectPath,
      mission,
    }: {
      projectPath?: string;
      mission?: string;
    }) => {
      const { initializeSession, getWorkspaceDir } =
        await import('./session-manager.js');

      // Use projectPath if provided, otherwise default to orchestrator dir
      const targetPath = projectPath || getCurrentWorkingDirectory();

      // ALWAYS force a new session — archive the previous one automatically.
      // This prevents session reuse across different /orchestrator invocations.
      const state = await initializeSession(targetPath, mission, true);
      // FIX 2026-06-21: write current-session file (was missing)
      const currentSessionFile = join(
        getWorkspaceDir(targetPath),
        'current-session'
      );
      try {
        mkdirSync(dirname(currentSessionFile), { recursive: true });
        writeFileSync(currentSessionFile, state.sessionId, 'utf8');
      } catch (e) {
        console.error('Failed to write current-session:', e);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                sessionId: state.sessionId,
                createdAt: state.createdAt,
                active: state.active,
                projectPath: state.projectPath,
                mission: state.mission,
                workspaceDir: getWorkspaceDir(targetPath),
                sessionDir: `.qwen-orchestrator/workspaces/${state.projectPath?.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}__sessions/${state.sessionId}`,
                directories: {
                  root: `.qwen-orchestrator/workspaces/${state.projectPath?.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}__sessions/${state.sessionId}`,
                  progress: `.qwen-orchestrator/workspaces/${state.projectPath?.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}__sessions/${state.sessionId}/progress`,
                  checkpoints: `.qwen-orchestrator/workspaces/${state.projectPath?.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}__sessions/${state.sessionId}/checkpoints`,
                  docs: `.qwen-orchestrator/workspaces/${state.projectPath?.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}__sessions/${state.sessionId}/docs`,
                },
                note: 'Previous session was automatically archived. This is a fresh session with workspace isolation.',
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ---------------------------------------------------------------------------
  // Tool: Get Current Session
  // ---------------------------------------------------------------------------
  server.registerTool(
    'get_current_session',
    {
      description:
        'Get the current active session ID and path for a project. Returns session state if available.',
      inputSchema: z.object({
        projectPath: z
          .string()
          .optional()
          .describe(
            'Project path to check (uses current directory if not provided)'
          ),
      }).shape,
    },
    async ({ projectPath }: { projectPath?: string }) => {
      const { readCurrentSessionId, getSessionState, getSessionDir } =
        await import('./session-manager.js');

      const targetPath = projectPath || getCurrentWorkingDirectory();
      const sessionId = readCurrentSessionId(targetPath);

      if (!sessionId) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: false,
                  sessionId: null,
                  sessionDir: null,
                  workspaceDir: getWorkspaceDir(targetPath),
                  error: 'No active session found. Call create_session first.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const sessionDir = getSessionDir(sessionId, targetPath);
      const state = getSessionState(sessionId, targetPath);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                sessionId,
                sessionDir,
                workspaceDir: getWorkspaceDir(targetPath),
                state,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ---------------------------------------------------------------------------
  // Tool: Archive Session
  // ---------------------------------------------------------------------------
  server.registerTool(
    'archive_session',
    {
      description:
        'Archive a completed session. Moves the session directory to the archived-sessions folder.',
      inputSchema: z.object({
        sessionId: z.string().describe('Session ID to archive'),
        projectPath: z
          .string()
          .optional()
          .describe('Project path (uses current directory if not provided)'),
      }).shape,
    },
    async ({
      sessionId,
      projectPath,
    }: {
      sessionId: string;
      projectPath?: string;
    }) => {
      const { archiveSession, getSessionDir } =
        await import('./session-manager.js');

      const targetPath = projectPath || getCurrentWorkingDirectory();
      const archived = archiveSession(sessionId, targetPath);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: archived,
                sessionId,
                sessionDir: getSessionDir(sessionId, targetPath),
                archivedDir: '.qwen-orchestrator/archived-sessions',
                workspaceDir: getWorkspaceDir(targetPath),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ---------------------------------------------------------------------------
  // Tool: Redirect to Session
  // ---------------------------------------------------------------------------
  server.registerTool(
    'redirect_to_session',
    {
      description:
        'Get the session-aware path for a file. If the file exists in the session directory, returns that; otherwise returns the root path.',
      inputSchema: z.object({
        filePath: z.string().describe('File path to redirect'),
        sessionId: z
          .string()
          .optional()
          .describe('Optional session ID (uses current if not provided)'),
        projectPath: z
          .string()
          .optional()
          .describe(
            'Optional project path (uses current directory if not provided)'
          ),
      }).shape,
    },
    async ({
      filePath,
      sessionId,
      projectPath,
    }: {
      filePath: string;
      sessionId?: string;
      projectPath?: string;
    }) => {
      const { getSessionAwarePath, readCurrentSessionId } =
        await import('./session-manager.js');

      const targetPath = projectPath || getCurrentWorkingDirectory();
      const sid = sessionId || readCurrentSessionId(targetPath);
      const sessionAwarePath = getSessionAwarePath(
        sid || '',
        filePath,
        targetPath
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                filePath,
                sessionId: sid,
                projectPath: targetPath,
                sessionAwarePath,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ---------------------------------------------------------------------------
  // Tool: Check Session Isolation
  // ---------------------------------------------------------------------------
  server.registerTool(
    'check_session_isolation',
    {
      description:
        'Check if session isolation is properly configured for a project. Returns any issues found.',
      inputSchema: z.object({
        projectPath: z
          .string()
          .optional()
          .describe(
            'Project path to check (uses current directory if not provided)'
          ),
      }).shape,
    },
    async ({ projectPath }: { projectPath?: string }) => {
      const { checkSessionIsolation, getWorkspaceDir } =
        await import('./session-manager.js');

      const targetPath = projectPath || getCurrentWorkingDirectory();
      const result = checkSessionIsolation(targetPath);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                valid: result.valid,
                issues: result.issues,
                workspaceDir: getWorkspaceDir(targetPath),
                sessionsDir: `.qwen-orchestrator/workspaces/${targetPath.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}`,
                currentSessionFile: `.qwen-orchestrator/workspaces/${targetPath.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-')}/current-session`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}

function getWorkspaceDir(path: string): string {
  // Simple helper to compute workspace dir for display
  const safeName = path.replace(/[\\/]+/g, '__').replace(/[:]+/g, '-');
  return `.qwen-orchestrator/workspaces/${safeName}`;
}
