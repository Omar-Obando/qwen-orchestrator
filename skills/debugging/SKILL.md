---
name: debugging
description: >
  Systematic debugging skill with structured investigation methodology.
  Use when troubleshooting bugs, investigating failures, or diagnosing
  unexpected behavior in production or development.
license: MIT
---

# Debugging Skill — Systematic Investigation

This skill provides a structured approach to debugging that replaces guessing with evidence-based investigation.

## Debugging Methodology

```
OBSERVE → HYPOTHESIZE → TEST → FIX → VERIFY
```

### Phase 1: OBSERVE (Collect Evidence)

- What is the exact error message?
- What is the expected behavior?
- What is the actual behavior?
- When does it happen? (always, sometimes, specific conditions?)
- What changed recently? (code, config, dependencies, environment)

### Phase 2: HYPOTHESIZE (Form Theories)

- List at least 3 possible causes
- Rank by probability (most likely first)
- For each: what evidence would prove/disprove it?

### Phase 3: TEST (Verify Hypothesis)

- Test ONE hypothesis at a time
- Change ONLY ONE variable per test
- Record all observations
- Stop when you find the root cause

### Phase 4: FIX (Apply Fix)

- Make the MINIMAL change that fixes the issue
- Do NOT refactor while fixing
- Write a test that reproduces the bug FIRST
- Then implement the fix

### Phase 5: VERIFY (Confirm Fix)

- Original test now passes
- No new failures introduced
- Edge cases still work
- Similar code paths checked

## Investigation Techniques

### Binary Search Debugging

```
1. Find the midpoint of the execution path
2. Check state at that point
3. If correct: bug is AFTER midpoint
4. If incorrect: bug is BEFORE midpoint
5. Repeat until isolated
```

### Rubber Duck Debugging

```
1. Explain the code line by line
2. Explain what each variable should be
3. Explain what the output should be
4. The act of explaining often reveals the bug
```

### Log-Based Debugging

```typescript
// Strategic logging for debugging
console.log("[DEBUG] Input:", { userId, filters, pagination });
console.log("[DEBUG] Query result:", { count, firstItem, lastItem });
console.log("[DEBUG] Transform:", { input, output, duration });
```

## Common Bug Categories

| Category           | Symptoms                        | Investigation                 |
| ------------------ | ------------------------------- | ----------------------------- |
| Off-by-one         | Wrong count, missing last item  | Check boundary conditions     |
| Race condition     | Intermittent, timing-dependent  | Add logging, check async flow |
| Null reference     | TypeError: Cannot read property | Check all property access     |
| Type coercion      | Unexpected comparison results   | Use strict equality (===)     |
| Stale state        | UI doesn't reflect changes      | Check state update mechanism  |
| Memory leak        | Increasing memory over time     | Profile heap, check cleanup   |
| Circular reference | Stack overflow, infinite loop   | Trace the reference chain     |

## Bug Report Template

```markdown
## Bug Report

### Environment

- OS: [operating system]
- Runtime: [Node.js version, browser]
- Package version: [version]

### Reproduction Steps

1. [exact step 1]
2. [exact step 2]
3. [exact step 3]

### Expected Behavior

[What should happen]

### Actual Behavior

[What actually happens]

### Evidence

- Error message: [exact error]
- Stack trace: [relevant portion]
- Logs: [relevant log entries]
- Screenshot: [if applicable]

### Root Cause (after investigation)

[Detailed explanation of why this happens]

### Fix

[What was changed and why]
```

## Debugging Rules

1. **NEVER guess** — always form a hypothesis first
2. **NEVER change multiple things** — one variable at a time
3. **NEVER skip the test** — write a failing test that reproduces the bug
4. **NEVER fix symptoms** — find the root cause
5. **NEVER assume** — verify every assumption with evidence
