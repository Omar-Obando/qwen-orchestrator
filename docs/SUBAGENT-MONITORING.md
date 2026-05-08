# Subagent Monitoring Guide

## Overview

This guide explains how to monitor and manage long-running subagents in the Qwen Orchestrator. It covers status updates, loop detection, and cancellation of stuck tasks.

---

## Problem: Long-Running Subagents

Sometimes subagents run for hours and you can't see what they're doing. This can happen when:

- Complex tasks require many steps
- External API calls are slow
- Build processes take time
- No progress feedback is provided

---

## Solution 1: SendMessage for Status Updates

Use `SendMessage` to track subagent progress in real-time.

### Pattern: Progress Updates

```typescript
// Parent sends task to subagent
const task = Agent({
  description: 'Build user auth',
  prompt: `Build user authentication for ${project}.`,
  subagent_type: 'backend-developer',
});

// Subagent sends status updates
SendMessage({
  task_id: task.task_id,
  message: 'Starting authentication flow...',
});

SendMessage({
  task_id: task.task_id,
  message: 'Checking user credentials...',
});

SendMessage({
  task_id: task.task_id,
  message: 'Authentication successful!',
});
```

### Pattern: Checkpoint Updates

```typescript
SendMessage({
  task_id: task.task_id,
  message: 'Checkpoint 1/5: Database schema created',
});

SendMessage({
  task_id: task.task_id,
  message: 'Checkpoint 2/5: API endpoints implemented',
});

SendMessage({
  task_id: task.task_id,
  message: 'Checkpoint 3/5: Authentication service complete',
});

SendMessage({
  task_id: task.task_id,
  message: 'Checkpoint 4/5: Tests written',
});

SendMessage({
  task_id: task.task_id,
  message: 'Checkpoint 5/5: Documentation updated',
});
```

### Pattern: Blocker Reporting

```typescript
SendMessage({
  task_id: task.task_id,
  message: '⚠️ BLOCKER: Database connection timeout',
});

SendMessage({
  task_id: task.task_id,
  message: 'Trying alternative database connection...',
});

SendMessage({
  task_id: task.task_id,
  message: '✅ BLOCKER RESOLVED: Connection established',
});
```

---

## Solution 2: Monitor Tool for Long Processes

Use the `Monitor` tool to watch long-running processes and stream their output.

### Pattern: Watch Build Process

```typescript
Monitor({
  command: 'npm run build',
  description: 'Watch build output',
  max_events: 1000,
  idle_timeout_ms: 300000, // 5 minutes
});
```

### Pattern: Watch Dev Server

```typescript
Monitor({
  command: 'npm run dev',
  description: 'Watch dev server output',
  max_events: 1000,
  idle_timeout_ms: 300000,
});
```

### Pattern: Watch Test Suite

```typescript
Monitor({
  command: 'npm test -- --watch',
  description: 'Watch test output',
  max_events: 1000,
  idle_timeout_ms: 600000, // 10 minutes
});
```

---

## Solution 3: CronCreate for Periodic Reports

Use `CronCreate` to schedule recurring status reports from subagents.

### Pattern: Every 15 Minutes

```typescript
CronCreate({
  cron: '*/15 * * * *', // Every 15 minutes
  prompt: 'Send a status update on your current task progress',
  recurring: true,
});
```

### Pattern: Hourly Reports

```typescript
CronCreate({
  cron: '0 * * * *', // Every hour at minute 0
  prompt: 'What have you accomplished in the last hour? Any blockers?',
  recurring: true,
});
```

### Pattern: Daily Standup

```typescript
CronCreate({
  cron: '0 9 * * 1-5', // Weekdays at 9 AM
  prompt:
    'Daily standup: 1) What did you do yesterday? 2) What will you do today? 3) Any blockers?',
  recurring: true,
});
```

---

## Solution 4: TaskStop to Cancel Runaway Tasks

Use `TaskStop` to cancel stuck or runaway subagents.

### Pattern: Cancel on Timeout

```typescript
// Start task with timeout
const task = Agent({
  description: 'Complex analysis',
  prompt: 'Perform complex analysis...',
  subagent_type: 'planner',
});

// Cancel if no progress after 1 hour
setTimeout(() => {
  TaskStop({ task_id: task.task_id });
}, 3600000); // 1 hour in milliseconds
```

### Pattern: Cancel on Error Loop

```typescript
// Monitor for error loops
let errorCount = 0;

// If error count exceeds threshold, cancel
if (errorCount > 3) {
  TaskStop({ task_id: task.task_id });
  console.error('Task cancelled: Error loop detected');
}
```

### Pattern: Manual Cancellation

```typescript
// Commander cancels stuck task
TaskStop({
  task_id: 'worker-stuck',
  reason: 'Task appears stuck, no progress for 30 minutes',
});
```

---

## Complete Example: Multi-Step Build Process

### Scenario: Build a Full-Stack Application

```typescript
// Commander orchestrates the build
const buildTask = Agent({
  description: 'Build full-stack app',
  prompt: `Build a full-stack application with:
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT

Files to create:
- /frontend/src/
- /backend/src/
- /database/migrations/
`,
  subagent_type: 'team-lead',
});

// Subagent sends progress updates
SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 1/10: Setting up project structure',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 2/10: Creating database schema',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 3/10: Implementing authentication API',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 4/10: Building frontend components',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 5/10: Connecting frontend to backend',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 6/10: Writing unit tests',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 7/10: Writing integration tests',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 8/10: Setting up CI/CD pipeline',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 9/10: Creating documentation',
});

SendMessage({
  task_id: buildTask.task_id,
  message: 'Step 10/10: Final verification and testing',
});

SendMessage({
  task_id: buildTask.task_id,
  message: '✅ Build complete! Application ready for deployment',
});
```

### With Periodic Reports

```typescript
// Schedule hourly status reports
CronCreate({
  cron: '0 * * * *', // Every hour
  prompt: `Status update:
- What step are you on?
- What did you accomplish?
- Any blockers?
- Estimated time to completion?`,
  recurring: true,
});
```

### With Loop Detection

```typescript
// Monitor for loops
let previousOutput = '';
let loopCount = 0;

// If output is identical for 3 checks, detect loop
if (currentOutput === previousOutput) {
  loopCount++;

  if (loopCount >= 3) {
    SendMessage({
      task_id: buildTask.task_id,
      message: '⚠️ LOOP DETECTED: Repeating same output',
    });

    TaskStop({
      task_id: buildTask.task_id,
      reason: 'Loop detected: Task is repeating same output',
    });
  }
}

previousOutput = currentOutput;
```

---

## Monitor Agent Role

The `monitor` agent is the dedicated watchdog for detecting and breaking LLM loops.

### Loop Detection Patterns

| Pattern           | Description                        | Solution                             |
| ----------------- | ---------------------------------- | ------------------------------------ |
| Tool Call Loop    | Same tool call fails repeatedly    | SendMessage with fix suggestion      |
| Reasoning Loop    | Same approach tried multiple times | SendMessage with new approach        |
| Error-Bounce Loop | Fix doesn't resolve error          | SendMessage with different fix       |
| Context Loop      | No progress on understanding       | SendMessage with clarifying question |
| Apology Loop      | Repeated apologies without action  | SendMessage with clear task          |

### Monitor Agent Tools

- `SendMessage` - Break loops with escape routes
- `TaskStop` - Cancel runaway tasks
- `Monitor` - Watch long-running processes
- `CronCreate` - Schedule recurring checks

### Monitor Agent Configuration

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

## Best Practices

### 1. Always Send Status Updates

- Send updates for each major step
- Include progress percentage when possible
- Report blockers immediately

### 2. Use Specific Task IDs

- Always use the task_id from Agent() call
- Don't guess or hardcode task IDs
- Log task IDs for debugging

### 3. Set Reasonable Timeouts

- Short tasks: 5-10 minutes
- Medium tasks: 30-60 minutes
- Long tasks: 2-4 hours
- Very long tasks: 8+ hours (with frequent updates)

### 4. Monitor for Stuck Patterns

- No output for 10+ minutes
- Repeating same output
- Error loops
- Context loops (no progress)

### 5. Cancel and Restart

If a task is stuck:

1. Send `SendMessage` with the issue
2. Call `TaskStop` to cancel
3. Restart with different approach
4. Document the failure for future reference

---

## Checklist

Before starting a long-running task:

- [ ] Define clear steps with progress indicators
- [ ] Set up periodic status reports (SendMessage)
- [ ] Configure loop detection
- [ ] Set appropriate timeouts
- [ ] Plan for error recovery
- [ ] Document expected duration

During task execution:

- [ ] Monitor for progress updates
- [ ] Check for error patterns
- [ ] Verify no stuck loops
- [ ] Update stakeholders on progress

After task completion:

- [ ] Verify all steps completed
- [ ] Document any issues encountered
- [ ] Update knowledge base with lessons learned

---

## Resources

- [Qwen Code Agent Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/features/agents/)
- [Qwen Code MCP Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/features/mcp/)
- [Qwen Code Extensions Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/extension/introduction/)
