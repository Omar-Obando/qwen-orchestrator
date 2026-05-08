/**
 * File Interceptor - Hook for file:read and file:write events
 *
 * This hook intercepts file operations and redirects them to session-isolated paths.
 * For file:read - checks session directory first, falls back to root
 * For file:write - always writes to session directory
 *
 * @author Omar-Obando
 * @license MIT
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import { getSessionDir, readCurrentSessionId } from '../session-manager.js';

/**
 * File read payload
 */
export interface FileReadPayload {
  filePath: string;
  encoding?: BufferEncoding;
  sessionId?: string;
}

/**
 * File write payload
 */
export interface FileWritePayload {
  filePath: string;
  content: string;
  sessionId?: string;
}

/**
 * Hook result for file operations
 */
export interface FileOperationResult {
  success: boolean;
  filePath: string;
  content?: string;
  error?: string;
  fromSession?: boolean; // true if read from session dir
}

/**
 * Read a file with session isolation
 * Checks session directory first, falls back to root if not found
 */
export async function readFileWithSession(
  payload: FileReadPayload
): Promise<FileOperationResult> {
  try {
    const { filePath, encoding = 'utf8' } = payload;
    let sessionId = payload.sessionId || readCurrentSessionId();

    // If no session, use root path directly
    if (!sessionId) {
      const content = readFileSync(filePath, encoding);
      return {
        success: true,
        filePath,
        content,
        fromSession: false,
      };
    }

    const sessionDir = getSessionDir(sessionId);
    const sessionFilePath = join(sessionDir, filePath);

    // Check session directory first
    if (existsSync(sessionFilePath)) {
      const content = readFileSync(sessionFilePath, encoding);
      return {
        success: true,
        filePath: sessionFilePath,
        content,
        fromSession: true,
      };
    }

    // Fall back to root orchestrator directory
    const rootFilePath = join(sessionDir, '..', filePath);
    if (existsSync(rootFilePath)) {
      const content = readFileSync(rootFilePath, encoding);
      return {
        success: true,
        filePath: rootFilePath,
        content,
        fromSession: false,
      };
    }

    // File not found anywhere
    return {
      success: false,
      filePath,
      error: `File not found: ${filePath}`,
    };
  } catch (error: any) {
    console.error('File read failed:', error);
    return {
      success: false,
      filePath: payload.filePath,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Write a file to session directory (always)
 */
export async function writeFileWithSession(
  payload: FileWritePayload
): Promise<FileOperationResult> {
  try {
    const { filePath, content } = payload;
    let sessionId = payload.sessionId || readCurrentSessionId();

    // If no session, write to root orchestrator directory
    if (!sessionId) {
      const dir = dirname(filePath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(filePath, content, 'utf8');
      return {
        success: true,
        filePath,
      };
    }

    const sessionDir = getSessionDir(sessionId);
    const sessionFilePath = join(sessionDir, filePath);
    const dir = dirname(sessionFilePath);

    // Create directory structure if needed
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Write to session directory
    writeFileSync(sessionFilePath, content, 'utf8');

    return {
      success: true,
      filePath: sessionFilePath,
    };
  } catch (error: any) {
    console.error('File write failed:', error);
    return {
      success: false,
      filePath: payload.filePath,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Check if a file exists in session or root
 */
export async function fileExistsWithSession(
  filePath: string,
  sessionId?: string
): Promise<{ exists: boolean; path: string; fromSession: boolean }> {
  try {
    let sid = sessionId || readCurrentSessionId();

    if (!sid) {
      return {
        exists: existsSync(filePath),
        path: filePath,
        fromSession: false,
      };
    }

    const sessionDir = getSessionDir(sid);
    const sessionFilePath = join(sessionDir, filePath);

    // Check session directory first
    if (existsSync(sessionFilePath)) {
      return {
        exists: true,
        path: sessionFilePath,
        fromSession: true,
      };
    }

    // Check root
    const rootFilePath = join(sessionDir, '..', filePath);
    if (existsSync(rootFilePath)) {
      return {
        exists: true,
        path: rootFilePath,
        fromSession: false,
      };
    }

    return {
      exists: false,
      path: filePath,
      fromSession: false,
    };
  } catch {
    return {
      exists: false,
      path: filePath,
      fromSession: false,
    };
  }
}

/**
 * Get all session-aware file paths
 */
export async function getSessionAwarePaths(
  filePath: string,
  sessionId?: string
): Promise<{
  sessionPath: string;
  rootPath: string;
  existsInSession: boolean;
  existsInRoot: boolean;
}> {
  let sid = sessionId || readCurrentSessionId();

  if (!sid) {
    return {
      sessionPath: filePath,
      rootPath: filePath,
      existsInSession: false,
      existsInRoot: existsSync(filePath),
    };
  }

  const sessionDir = getSessionDir(sid);
  const sessionPath = join(sessionDir, filePath);
  const rootPath = join(sessionDir, '..', filePath);

  return {
    sessionPath,
    rootPath,
    existsInSession: existsSync(sessionPath),
    existsInRoot: existsSync(rootPath),
  };
}

/**
 * Export hook registration objects
 */
export const fileReadHook = {
  name: 'file:read',
  handler: readFileWithSession,
};

export const fileWriteHook = {
  name: 'file:write',
  handler: writeFileWithSession,
};
