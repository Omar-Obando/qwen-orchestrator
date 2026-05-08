# Hooks vs Rules - Best Practices

## Overview

Qwen Code supports two mechanisms for intercepting and modifying behavior:

1. **Hooks** - Real-time event interception (NEW, RECOMMENDED)
2. **Rules** - Legacy configuration-based rules (DEPRECATED)

**All new extensions should use HOOKS, not RULES.**

---

## Hook Events Available

| Event                | Triggered When                  | Use Case                                  |
| -------------------- | ------------------------------- | ----------------------------------------- |
| `PreToolUse`         | Before tool execution           | Validate, modify, or block tool calls     |
| `PostToolUse`        | After successful tool execution | Log, transform, or enhance responses      |
| `PostToolUseFailure` | After tool execution fails      | Handle errors, retry, or fallback         |
| `UserPromptSubmit`   | After user submits prompt       | Process, analyze, or transform prompts    |
| `SessionStart`       | When session starts/resumes     | Initialize state, create directories      |
| `SessionEnd`         | When session ends               | Cleanup, save state, send notifications   |
| `Stop`               | Before Qwen concludes response  | Add final messages, save checkpoints      |
| `SubagentStart`      | When subagent starts            | Initialize subagent state, track progress |
| `SubagentStop`       | When subagent stops             | Cleanup, save results, notify parent      |
| `PreCompact`         | Before conversation compaction  | Save critical state, create checkpoints   |
| `PostCompact`        | After conversation compaction   | Restore state, recover context            |

---

## Hook Configuration Format

### Location

Hooks must be configured in `~/.qwen/settings.json`, NOT in `qwen-extension.json`.

### Basic Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "pattern",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["path/to/hook.js"],
            "cwd": "${extensionPath}",
            "name": "Hook Name",
            "description": "What this hook does"
          }
        ]
      }
    ]
  }
}
```

### Hook Types

#### 1. Command Hooks (Most Common)

Execute shell commands with JSON input via stdin.

```json
{
  "type": "command",
  "command": "node",
  "args": ["${extensionPath}${/}hooks${/}session-handler.js"],
  "cwd": "${extensionPath}",
  "name": "Session Handler",
  "description": "Initialize session directory structure",
  "timeout": 60000,
  "async": false,
  "shell": "cmd.exe",
  "statusMessage": "Initializing session..."
}
```

#### 2. HTTP Hooks

Send JSON as POST request body to specified URLs.

```json
{
  "type": "http",
  "url": "http://localhost:3000/hook",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${API_KEY}"
  },
  "timeout": 600,
  "name": "HTTP Hook",
  "statusMessage": "Sending to HTTP endpoint"
}
```

#### 3. Function Hooks

Directly call JavaScript/TypeScript functions (session-level only).

```json
{
  "type": "function",
  "name": "Function Hook",
  "handler": "functionName"
}
```

---

## Qwen Orchestrator Hook Configuration

### Current Configuration (Recommended)

```json
{
  "hooks": {
    "session:start": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\session-handler.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "Session Handler",
            "description": "Initialize session directory structure"
          }
        ]
      }
    ],
    "file:read": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\file-interceptor.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "File Interceptor",
            "description": "Redirect file reads to session directory"
          }
        ]
      }
    ],
    "file:write": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\file-interceptor.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "File Interceptor",
            "description": "Redirect file writes to session directory"
          }
        ]
      }
    ],
    "context:inject": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\context-redirector.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "Context Redirector",
            "description": "Redirect context injection to session directory"
          }
        ]
      }
    ]
  }
}
```

### Why cmd.exe?

On Windows, using `cmd.exe` with `/c` avoids the "\_R no se reconoce" error that occurs when using PowerShell, which interprets `_R` as a variable.

---

## Subagent Monitoring

### Problem: Long-Running Subagents

Sometimes subagents run for hours and you can't see what they're doing.

### Solution: Real-Time Monitoring

#### 1. Use the Monitor Tool

```typescript
// Commander can watch long-running processes
Monitor({
  command: 'npm run dev',
  description: 'Watch dev server output',
});
```

#### 2. Use SendMessage for Status Updates

```typescript
// Subagent sends status updates to parent
SendMessage({
  task_id: 'worker-auth',
  message: 'Starting authentication flow...',
});

SendMessage({
  task_id: 'worker-auth',
  message: 'Checking user credentials...',
});

SendMessage({
  task_id: 'worker-auth',
  message: 'Authentication successful!',
});
```

#### 3. Use CronCreate for Periodic Reports

```typescript
// Schedule recurring status reports
CronCreate({
  cron: '*/15 * * * *', // Every 15 minutes
  prompt: 'Send a status update on your current task progress',
  recurring: true,
});
```

#### 4. Use TaskStop to Cancel Runaway Tasks

```typescript
// Cancel a stuck subagent
TaskStop({
  task_id: 'worker-stuck',
});
```

### Monitor Agent Configuration

The `monitor` agent is already configured to detect and break LLM loops:

```yaml
---
name: monitor
description: >
  Runtime watchdog that detects LLM loops, repetitive outputs, stuck agents,
  and local runtime errors. Monitors agent health, breaks loops via SendMessage,
  cancels runaway tasks via TaskStop, and provides recovery instructions.
  The safety net that prevents the team from getting stuck.
color: orange
tools:
  - Glob
  - Grep
  - ReadFile
  - Shell
  - TodoWrite
  - SaveMemory
  - SendMessage
  - TaskStop
  - Monitor
  - CronCreate
  - CronList
  - CronDelete
  - Lsp
---
```

---

## Hook Best Practices

### 1. Always Use cmd.exe on Windows

```json
{
  "shell": "cmd.exe",
  "args": ["/c", "node", "${extensionPath}\\hooks\\hook.js"]
}
```

### 2. Set Timeouts to Prevent Hanging

```json
{
  "timeout": 60000, // 60 seconds
  "name": "Hook Name",
  "statusMessage": "Running hook..."
}
```

### 3. Use Async for Non-Blocking Operations

```json
{
  "async": true,
  "name": "Async Hook",
  "description": "This hook runs asynchronously"
}
```

### 4. Validate Hook Outputs

Always return valid JSON:

```javascript
export async function handleHook(payload) {
  try {
    // Process payload
    return {
      success: true,
      data: result,
      message: 'Hook completed successfully',
    };
  } catch (error) {
    console.error('Hook failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Hook failed',
    };
  }
}
```

### 5. Log to Session Directory

```javascript
import fs from 'fs';
import path from 'path';

const sessionDir = process.env.SESSION_DIR || '.qwen-orchestrator/sessions';
const logFile = path.join(sessionDir, 'hook.log');

fs.appendFileSync(logFile, `[${new Date().toISOString()}] Hook executed\n`);
```

---

## Debugging Hooks

### 1. Check Hook Logs

```bash
# Check the session directory for hook logs
cat .qwen-orchestrator/sessions/<session-id>/hook.log
```

### 2. Test Hook Manually

```bash
# Test hook with sample payload
echo '{"session_id": "test", "cwd": "."}' | node hooks/session-handler.js
```

### 3. Enable Verbose Logging

```json
{
  "name": "Session Handler",
  "description": "Initialize session directory structure",
  "statusMessage": "Initializing session..."
}
```

### 4. Use Console.Error for Errors

```javascript
console.error('Hook failed:', error); // This goes to Qwen logs
```

---

## Migration from Rules to Hooks

### Old Rules Format (DEPRECATED)

```json
{
  "rules": [
    {
      "event": "file:read",
      "action": "redirect",
      "target": "session"
    }
  ]
}
```

### New Hooks Format (RECOMMENDED)

```json
{
  "hooks": {
    "file:read": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${extensionPath}${/}hooks${/}file-interceptor.js"],
            "cwd": "${extensionPath}",
            "name": "File Interceptor",
            "description": "Redirect file reads to session directory"
          }
        ]
      }
    ]
  }
}
```

### Migration Steps

1. **Identify all rules** in your extension
2. **Map rules to hook events** (see table above)
3. **Create hook handlers** for each event
4. **Update configuration** to use hooks instead of rules
5. **Test thoroughly** with sample payloads
6. **Remove old rules** from configuration

---

## Common Hook Patterns

### 1. File Redirection

```javascript
// Redirect file operations to session directory
export async function handleFileRead(payload) {
  const { session_id, cwd, file_path } = payload;
  const sessionDir = `.qwen-orchestrator/sessions/${session_id}`;
  const sessionPath = path.join(sessionDir, file_path);

  // Check if file exists in session directory
  if (fs.existsSync(sessionPath)) {
    return {
      continue: true,
      systemMessage: `Reading from session directory: ${sessionPath}`,
      hookSpecificOutput: {
        filePath: sessionPath,
      },
    };
  }

  return { continue: true };
}
```

### 2. Session Initialization

```javascript
// Create session directory structure
export async function handleSessionStart(payload) {
  const { projectPath, mission } = payload;
  const sessionId = generateSessionId();
  const sessionDirs = createSessionDirectory(sessionId);

  writeSessionState(sessionId, {
    createdAt: new Date().toISOString(),
    active: true,
    projectPath,
    mission,
    files: [],
    checkpoints: [],
  });

  return {
    success: true,
    sessionId,
    sessionDir: sessionDirs.root,
  };
}
```

### 3. Context Injection

```javascript
// Redirect context injection to session directory
export async function handleContextInject(payload) {
  const { session_id, context } = payload;
  const sessionDir = `.qwen-orchestrator/sessions/${session_id}`;

  // Save context to session directory
  fs.writeFileSync(path.join(sessionDir, 'context.md'), context);

  return {
    continue: true,
    systemMessage: `Context saved to session directory`,
  };
}
```

---

## Checklist

- [ ] All hooks configured in `~/.qwen/settings.json`
- [ ] No rules in `qwen-extension.json`
- [ ] Windows hooks use `cmd.exe` with `/c` flag
- [ ] All hooks have timeouts set
- [ ] All hooks return valid JSON
- [ ] Subagents use SendMessage for status updates
- [ ] Monitor agent configured for loop detection
- [ ] Cron jobs set up for periodic reports
- [ ] Hook logs saved to session directory
- [ ] Error handling in all hooks

---

## Resources

- [Qwen Code Hooks Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/features/hooks/)
- [Qwen Code MCP Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/features/mcp/)
- [Qwen Code Extensions Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/extension/introduction/)
