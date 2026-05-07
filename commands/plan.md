Create a detailed implementation plan for the following feature:

**Feature**: {{args}}

## Planning Protocol

1. **SURVEY**: Read relevant codebase sections to understand current state
2. **ANALYZE**: Understand requirements, constraints, and dependencies
3. **DECOMPOSE**: Break into milestones → tasks → atomic sub-tasks
4. **ESTIMATE**: Assign size (S/M/L) to each sub-task
5. **IDENTIFY RISKS**: List potential blockers and mitigation strategies
6. **DOCUMENT**: Create plan in `.qwen-orchestrator/todo.md`

## Plan Format

```markdown
# Plan: [Feature Name]

## Overview

[Brief description]

## Architecture Impact

[Files/modules affected]

## Implementation Plan

### M1: [Milestone]

#### T1.1: [Task] | agent:Frontend Developer

- [ ] S1.1.1: [Sub-task] | size:S
- [ ] S1.1.2: [Sub-task] | size:M

### M2: [Milestone] | depends:M1

...

## Risks

[Risk assessment]

## Alternatives Considered

[What was rejected and why]
```

Begin by reading the codebase structure and relevant files.
