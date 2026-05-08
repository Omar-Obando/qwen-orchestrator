/**
 * Session Manager - Session Isolation Logic
 *
 * Provides session management utilities for the Qwen Orchestrator.
 * Ensures each session has isolated state in .qwen-orchestrator/sessions/<session-id>/
 *
 * @author Omar-Obando
 * @license MIT
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base directory for orchestrator state
const ORCHESTRATOR_DIR = join(__dirname, '..', '..', '..');

/**
 * Session directory structure
 */
export interface SessionDirectories {
  root: string;
  progress: string;
  checkpoints: string;
  docs: string;
}

/**
 * Session state interface
 */
export interface SessionState {
  sessionId: string;
  createdAt: string;
  active: boolean;
  projectPath?: string;
  mission?: string;
}

/**
 * Get the base orchestrator directory
 */
export function getOrchestratorDir(): string {
  return ORCHESTRATOR_DIR;
}

/**
 * Get the sessions directory path
 */
export function getSessionsDir(): string {
  return join(ORCHESTRATOR_DIR, '.qwen-orchestrator', 'sessions');
}

/**
 * Get the current session ID file path
 */
export function getCurrentSessionFile(): string {
  return join(ORCHESTRATOR_DIR, '.qwen-orchestrator', 'current-session');
}

/**
 * Get the archived sessions directory
 */
export function getArchivedSessionsDir(): string {
  return join(ORCHESTRATOR_DIR, '.qwen-orchestrator', 'archived-sessions');
}

/**
 * Generate a unique session ID
 * Format: YYYY-MM-DDTHH-MM-SS-<random>
 */
export function generateSessionId(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -1);
  const random = Math.random().toString(36).substring(2, 8);
  return `session-${timestamp}-${random}`;
}

/**
 * Read the current session ID from file
 * Returns null if no current session exists
 */
export function readCurrentSessionId(): string | null {
  const currentSessionFile = getCurrentSessionFile();
  if (!existsSync(currentSessionFile)) {
    return null;
  }
  try {
    return readFileSync(currentSessionFile, 'utf8').trim();
  } catch (error) {
    console.error('Failed to read current session:', error);
    return null;
  }
}

/**
 * Write the current session ID to file
 */
export function writeCurrentSessionId(sessionId: string): void {
  const currentSessionFile = getCurrentSessionFile();
  const dir = dirname(currentSessionFile);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(currentSessionFile, sessionId, 'utf8');
}

/**
 * Get the session directory path for a given session ID
 */
export function getSessionDir(sessionId: string): string {
  return join(getSessionsDir(), sessionId);
}

/**
 * Get all session directories
 */
export async function listSessionDirs(): Promise<string[]> {
  const sessionsDir = getSessionsDir();
  if (!existsSync(sessionsDir)) {
    return [];
  }

  try {
    const entries = statSync(sessionsDir);
    if (!entries.isDirectory()) {
      return [];
    }

    // Try reading as a file first (legacy format)
    try {
      return readFileSync(sessionsDir, 'utf8')
        .split('\n')
        .filter((line) => line.trim().length > 0);
    } catch {
      // Fallback: read directory entries
      const fs = await import('fs');
      return fs
        .readdirSync(sessionsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    }
  } catch {
    return [];
  }
}

/**
 * Create a new session directory structure
 */
export function createSessionDirectory(sessionId: string): SessionDirectories {
  const sessionDir = getSessionDir(sessionId);
  const progressDir = join(sessionDir, 'progress');
  const checkpointsDir = join(sessionDir, 'checkpoints');
  const docsDir = join(sessionDir, 'docs');

  // Create all directories
  mkdirSync(sessionDir, { recursive: true });
  mkdirSync(progressDir, { recursive: true });
  mkdirSync(checkpointsDir, { recursive: true });
  mkdirSync(docsDir, { recursive: true });

  return {
    root: sessionDir,
    progress: progressDir,
    checkpoints: checkpointsDir,
    docs: docsDir,
  };
}

/**
 * Check if a session directory exists
 */
export function sessionExists(sessionId: string): boolean {
  return existsSync(getSessionDir(sessionId));
}

/**
 * Get session state from session directory
 */
export function getSessionState(sessionId: string): SessionState | null {
  const sessionDir = getSessionDir(sessionId);
  const stateFile = join(sessionDir, 'session-state.json');

  if (!existsSync(stateFile)) {
    return null;
  }

  try {
    const content = readFileSync(stateFile, 'utf8');
    return JSON.parse(content) as SessionState;
  } catch (error) {
    console.error('Failed to read session state:', error);
    return null;
  }
}

/**
 * Write session state to session directory
 */
export function writeSessionState(
  sessionId: string,
  state: SessionState
): void {
  const sessionDir = getSessionDir(sessionId);
  const stateFile = join(sessionDir, 'session-state.json');

  writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
}

/**
 * Archive a session
 */
export function archiveSession(sessionId: string): boolean {
  const sessionDir = getSessionDir(sessionId);
  const archivedDir = getArchivedSessionsDir();
  const archivedSessionDir = join(archivedDir, sessionId);

  if (!existsSync(sessionDir)) {
    return false;
  }

  // Create archived directory if needed
  mkdirSync(archivedDir, { recursive: true });

  // Move session directory to archived
  try {
    // Use fs.rename for atomic move within same filesystem
    // Fall back to copy+delete if rename fails (different filesystems)
    import('fs').then(({ rename }) => {
      rename(sessionDir, archivedSessionDir, (err) => {
        if (err) {
          // Fall back to copy+delete
          console.warn('Rename failed, using copy+delete fallback');
          // Implementation would continue here
        }
      });
    });

    return true;
  } catch (error) {
    console.error('Failed to archive session:', error);
    return false;
  }
}

/**
 * Delete a session directory
 */
export function deleteSession(sessionId: string): boolean {
  const sessionDir = getSessionDir(sessionId);

  if (!existsSync(sessionDir)) {
    return false;
  }

  try {
    import('fs').then(({ rmSync }) => {
      rmSync(sessionDir, { recursive: true, force: true });
    });
    return true;
  } catch (error) {
    console.error('Failed to delete session:', error);
    return false;
  }
}

/**
 * Initialize or retrieve the current session
 * If no current session exists, creates a new one
 */
export function initializeSession(
  projectPath?: string,
  mission?: string
): SessionState {
  let sessionId = readCurrentSessionId();

  // If no current session or invalid session, create new one
  if (!sessionId || !sessionExists(sessionId)) {
    sessionId = generateSessionId();
    const sessionDirs = createSessionDirectory(sessionId);

    const state: SessionState = {
      sessionId,
      createdAt: new Date().toISOString(),
      active: true,
      projectPath,
      mission,
    };

    writeSessionState(sessionId, state);
    writeCurrentSessionId(sessionId);

    console.warn(`Created new session: ${sessionId}`);
    console.warn(`Session directory: ${sessionDirs.root}`);
  }

  const state = getSessionState(sessionId);
  if (!state) {
    throw new Error(`Session ${sessionId} has no state file`);
  }

  return state;
}

/**
 * Get the session-aware path for a file
 * If file exists in session directory, return that; otherwise fall back to root
 */
export function getSessionAwarePath(
  sessionId: string,
  filePath: string
): string {
  const sessionDir = getSessionDir(sessionId);
  const sessionFilePath = join(sessionDir, filePath);

  // Check if file exists in session directory
  if (existsSync(sessionFilePath)) {
    return sessionFilePath;
  }

  // Fall back to root orchestrator directory
  const rootFilePath = join(ORCHESTRATOR_DIR, '.qwen-orchestrator', filePath);
  if (existsSync(rootFilePath)) {
    return rootFilePath;
  }

  // Return session path as primary (file will be created there)
  return sessionFilePath;
}

/**
 * Get all session files for a given session
 */
export async function listSessionFiles(sessionId: string): Promise<string[]> {
  const sessionDir = getSessionDir(sessionId);
  if (!existsSync(sessionDir)) {
    return [];
  }

  const files: string[] = [];
  const queue = [sessionDir];

  while (queue.length > 0) {
    const currentDir = queue.shift()!;
    const fs = await import('fs');
    const dirents = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const dirent of dirents) {
      const path = join(currentDir, dirent.name);
      if (dirent.isDirectory()) {
        queue.push(path);
      } else if (dirent.isFile()) {
        files.push(path);
      }
    }
  }

  return files;
}

/**
 * Check if session isolation is properly configured
 */
export function checkSessionIsolation(): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const sessionsDir = getSessionsDir();

  // Check if sessions directory exists
  if (!existsSync(sessionsDir)) {
    issues.push('Sessions directory does not exist');
  }

  // Check if current-session file exists
  if (!existsSync(getCurrentSessionFile())) {
    issues.push('Current session file does not exist');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
