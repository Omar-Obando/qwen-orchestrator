---
name: compaction-recovery
description: >
  Context compaction recovery skill that preserves mission state across
  session compaction events. Ensures TODO items, sub-task details, and
  implementation progress survive context window compression.
license: MIT
---

# Compaction Recovery Skill — Context Preservation Protocol

This skill ensures that when the LLM context window is compacted (compressed), no mission-critical information is lost. It defines what to preserve and how to restore it.

## The Compaction Problem

When context is compacted:

- Previous conversation is summarized/compressed
- Detailed TODO items may lose their sub-task descriptions
- Implementation progress may be forgotten
- File-level assignment details may vanish
- Partial code changes may lose their context

## Prevention Protocol

### Write Everything Important to Files

NEVER rely on conversation context for critical information. ALWAYS persist to:

```
.qwen-orchestrator/
├── todo.md              # Full TODO with ALL details
├── context.md           # Project context (<150 lines)
├── memory.md            # Session state for recovery
├── progress/
│   ├── mission-state.md # Current mission snapshot
│   ├── active-files.md  # Files being worked on + status
│   └── decisions.md     # Architecture decisions made
└── checkpoints/
    ├── cp-[timestamp].md  # Periodic checkpoint snapshots
```

### TODO Format for Compaction Survival

Each TODO item must be SELF-CONTAINED (understandable without conversation):

```markdown
## T3.1: Implement User Authentication Module | agent:Backend Developer | status:in_progress

### Context ( survives compaction )

- **Goal**: JWT-based auth with refresh tokens
- **Files**: src/auth/jwt.service.ts, src/auth/auth.controller.ts
- **Dependencies**: jsonwebtoken, bcrypt
- **Business Rules**: Token expires in 15min, refresh in 7 days
- **Pattern**: Repository pattern with Passport.js strategy

### Sub-tasks

- [x] S3.1.1: Create JWT service with sign/verify/refresh | PASS
- [ ] S3.1.2: Create auth controller with login/logout/register
- [ ] S3.1.3: Add refresh token rotation
- [ ] S3.1.4: Write integration tests

### Progress

- S3.1.1 DONE: jwt.service.ts created, unit tests pass (12/12)
- S3.1.2 NEXT: Starting auth.controller.ts
```

### Checkpoint Schedule

Write checkpoints at these moments:

1. **After every milestone** completion
2. **Before complex refactoring**
3. **When switching between agents**
4. **Every 30 minutes** of active work
5. **Before any risky operation**

### Checkpoint Format

```markdown
# Checkpoint — [Timestamp]

## Mission: [Name]

## Progress: [N]/[Total] tasks complete

## Currently Active

- Agent: [Name]
- Task: [ID + Description]
- File: [Current file being worked on]
- Status: [What was just done, what's next]

## Completed This Session

- [Task 1]: [Result]
- [Task 2]: [Result]

## Pending

- [Next 3 immediate tasks]

## Blockers

- [Any blockers and their status]

## Key Decisions

- [Decisions made this session]

## Files Modified

- [file1]: [what changed]
- [file2]: [what changed]
```

## Recovery Protocol

### When Compaction is Detected

1. **STOP** current operation
2. **READ** `.qwen-orchestrator/memory.md` for session state
3. **READ** `.qwen-orchestrator/todo.md` for task status
4. **READ** latest checkpoint in `.qwen-orchestrator/checkpoints/`
5. **RESUME** from the exact point recorded

### Recovery Checklist

- [ ] Memory file read and understood
- [ ] TODO status matches reality (verify files)
- [ ] Last checkpoint verified against actual file state
- [ ] Active agent identified and re-engaged
- [ ] No duplicate work started

## Agent-Specific Preservation

### Commander

Must persist: Mission scope, delegation plan, active sessions, sync issues

### Planner

Must persist: Research findings, architecture decisions, TODO structure

### Developer

Must persist: Current file, implementation approach, test status, code patterns

### Reviewer

Must persist: Review findings, sync issues, verification evidence

### QA Engineer

Must persist: Test strategy, coverage targets, known bugs

### Project Manager

Must persist: Scope changes, risk register, progress metrics

## Rules

- ALWAYS write state to files BEFORE doing risky operations
- ALWAYS make TODO items self-contained (no conversation context needed)
- ALWAYS create checkpoints at regular intervals
- ALWAYS verify file state matches recorded state after recovery
- NEVER rely on conversation memory for mission-critical information
