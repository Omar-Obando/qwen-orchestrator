## MCP Hooks and Session Isolation

### Overview

The Qwen Orchestrator uses MCP (Model Context Protocol) hooks to automatically manage session isolation. Hooks intercept file operations and redirect them to session-isolated directories without requiring manual path manipulation.

### Hook Types

| Hook Name        | Triggered When             | Handler File                                  | Purpose                                   |
| ---------------- | -------------------------- | --------------------------------------------- | ----------------------------------------- |
| `session:start`  | New session initialization | `mcp-server/dist/hooks/session-handler.js`    | Create session directory and state        |
| `file:read`      | File read operations       | `mcp-server/dist/hooks/file-interceptor.js`   | Check session dir first, fallback to root |
| `file:write`     | File write operations      | `mcp-server/dist/hooks/file-interceptor.js`   | Always write to session directory         |
| `context:inject` | Context data injection     | `mcp-server/dist/hooks/context-redirector.js` | Write context to session directory        |

### Hook Behavior

#### session:start Hook

- Automatically creates new session directory structure
- Generates unique session ID (timestamp + random)
- Creates subdirectories: `progress/`, `checkpoints/`, `docs/`
- Updates `current-session` file with new session ID

#### file:read Hook

- Checks `$SESSION_DIR/` first for requested file
- Falls back to root `.qwen-orchestrator/` if not found in session
- Returns `fromSession: true` if read from session directory

#### file:write Hook

- ALWAYS writes to `$SESSION_DIR/` (never root)
- Creates directory structure if needed
- Ensures session isolation - no cross-session file overwrites

#### context:inject Hook

- Writes context data to `$SESSION_DIR/context/`
- Creates structured context files per key
- Updates session state with context keys

### MCP Tools for Session Management

| Tool                      | Purpose                                     | When to Use                          |
| ------------------------- | ------------------------------------------- | ------------------------------------ |
| `create_session`          | Create new session directory and set active | At start of every `/orchestrator`    |
| `get_current_session`     | Get current session ID and path             | Verify active session before writes  |
| `redirect_to_session`     | Get session-aware path for a file           | Before reading/writing session files |
| `archive_session`         | Archive a completed session                 | When mission is complete             |
| `check_session_isolation` | Verify session isolation configuration      | Debugging session issues             |

### Session Directory Structure

```
.qwen-orchestrator/
├── current-session          # Active session ID (single line)
├── sessions/
│   └── <session-id>/        # Per-session state
│       ├── context.md           # Project context
│       ├── memory.md            # Session memory (for compaction recovery)
│       ├── sync-issues.md       # Cross-file synchronization issues
│       ├── qa-report.md         # Quality reports from QA/Reviewer
│       ├── project-status.md    # Progress tracking
│       ├── redesign-analysis.md # Redesign analysis (if applicable)
│       ├── tech-decisions.md    # Technology decisions
│       ├── seo-report.md        # SEO audit results
│       ├── agent-health.md      # Agent status tracking
│       ├── progress/            # Mission snapshots
│       ├── checkpoints/         # State snapshots for recovery
│       └── docs/                # Cached documentation
└── archived-sessions/       # Archived completed sessions
```

### Backward Compatibility

- Existing sessions without hooks continue to work
- Files in root `.qwen-orchestrator/` are still accessible
- Hook-based redirection is additive, not breaking
- Graceful fallback if session directory is missing

### Error Handling

- Missing session directory: Creates automatically
- Session not found: Returns error with guidance to call `create_session`
- File not found: Returns `null` content, allows graceful handling
- Hook execution failure: Logs error, continues with fallback behavior
