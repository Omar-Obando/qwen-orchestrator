/**
 * Session Management Tools for MCP Server
 *
 * Provides session isolation tools via the Model Context Protocol.
 *
 * @author Omar-Obando
 * @license MIT
 */

import { z } from 'zod';

// These will be registered on the server in index.ts
// This file exports the tool registration functions

export function registerSessionTools(server: any) {
  // ---------------------------------------------------------------------------
  // Tool: Create Session
  // ---------------------------------------------------------------------------
  server.registerTool(
    'create_session',
    {
      description:
        "Create a new isolated session directory and set it as the current session. All state files will be written to this session's directory.",
      inputSchema: z.object({
        projectPath: z
          .string()
          .optional()
          .describe('Optional project path to associate with this session'),
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
      const { initializeSession } = await import('./session-manager.js');

      const state = initializeSession(projectPath, mission);

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
                sessionDir: `.qwen-orchestrator/sessions/${state.sessionId}`,
                directories: {
                  root: `.qwen-orchestrator/sessions/${state.sessionId}`,
                  progress: `.qwen-orchestrator/sessions/${state.sessionId}/progress`,
                  checkpoints: `.qwen-orchestrator/sessions/${state.sessionId}/checkpoints`,
                  docs: `.qwen-orchestrator/sessions/${state.sessionId}/docs`,
                },
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
        'Get the current active session ID and path. Returns session state if available.',
      inputSchema: z.object({}).shape,
    },
    async () => {
      const { readCurrentSessionId, getSessionState, getSessionDir } =
        await import('./session-manager.js');

      const sessionId = readCurrentSessionId();

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
                  error: 'No active session found. Call create_session first.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const sessionDir = getSessionDir(sessionId);
      const state = getSessionState(sessionId);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                sessionId,
                sessionDir,
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
      }).shape,
    },
    async ({ sessionId }: { sessionId: string }) => {
      const { archiveSession, getSessionDir } =
        await import('./session-manager.js');

      const archived = archiveSession(sessionId);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: archived,
                sessionId,
                sessionDir: getSessionDir(sessionId),
                archivedDir: '.qwen-orchestrator/archived-sessions',
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
      }).shape,
    },
    async ({
      filePath,
      sessionId,
    }: {
      filePath: string;
      sessionId?: string;
    }) => {
      const { getSessionAwarePath, readCurrentSessionId } =
        await import('./session-manager.js');

      const sid = sessionId || readCurrentSessionId();
      const sessionAwarePath = getSessionAwarePath(sid || '', filePath);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                filePath,
                sessionId: sid,
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
        'Check if session isolation is properly configured. Returns any issues found.',
      inputSchema: z.object({}).shape,
    },
    async () => {
      const { checkSessionIsolation } = await import('./session-manager.js');

      const result = checkSessionIsolation();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                valid: result.valid,
                issues: result.issues,
                sessionsDir: '.qwen-orchestrator/sessions',
                currentSessionFile: '.qwen-orchestrator/current-session',
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
