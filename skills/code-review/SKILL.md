---
name: code-review
description: >
  Professional code review skill following OWASP, SOLID, and Clean Code principles.
  Use when reviewing code changes, performing pull request reviews, or auditing
  existing code for quality issues.
license: MIT
---

# Code Review Skill — Professional Quality Audit

This skill provides a systematic, evidence-based code review methodology that catches real issues, not style nits.

## Review Dimensions

### 1. Correctness (Priority: CRITICAL)

- Does the code do what it claims?
- Are edge cases handled?
- Are off-by-one errors possible?
- Are null/undefined checks present where needed?
- Are error conditions properly handled?

### 2. Security (Priority: CRITICAL)

- **Injection**: SQL, XSS, command injection, path traversal
- **Auth**: Proper authentication and authorization checks
- **Data Exposure**: No secrets in logs, error messages, or responses
- **Input Validation**: All external inputs validated and sanitized
- **Dependencies**: Known vulnerabilities in third-party packages

### 3. Performance (Priority: HIGH)

- Unnecessary allocations in hot paths
- O(n²) or worse algorithms where O(n) or O(log n) is possible
- Missing pagination for large datasets
- Synchronous operations that should be async
- Memory leaks (event listeners, subscriptions not cleaned up)

### 4. Maintainability (Priority: HIGH)

- Functions under 40 lines
- Cyclomatic complexity ≤ 10
- Meaningful names that reveal intent
- No magic numbers or strings
- Proper error types with context

### 5. Testing (Priority: HIGH)

- Tests exist for new behavior
- Tests cover happy path AND failure modes
- Tests are isolated and repeatable
- Test names describe expected behavior
- No test interdependencies

### 6. Architecture (Priority: MEDIUM)

- Proper separation of concerns
- No circular dependencies
- Dependency direction is correct (inward in hexagonal)
- No layer violations
- Single Responsibility Principle followed

## Severity Classification

| Severity | Criteria                               | Action                  |
| -------- | -------------------------------------- | ----------------------- |
| BLOCKER  | Security vulnerability, data loss risk | Must fix before merge   |
| CRITICAL | Bug, incorrect behavior                | Must fix before merge   |
| MAJOR    | Performance issue, poor error handling | Should fix before merge |
| MINOR    | Style, naming, minor improvement       | Can fix later           |
| INFO     | Suggestion, alternative approach       | Optional                |

## Review Workflow

1. **Read the PR description** — understand intent
2. **Read the changed files** — understand implementation
3. **Trace data flow** — from input to output
4. **Check tests** — do they verify the behavior?
5. **Check dependencies** — any side effects?
6. **Classify findings** — by severity with evidence
7. **Write review** — constructive, specific, actionable

## Output Format

```markdown
## Code Review Report

### Summary

- Files reviewed: [N]
- Findings: [BLOCKER: N] [CRITICAL: N] [MAJOR: N] [MINOR: N] [INFO: N]
- Verdict: APPROVE | REQUEST CHANGES | BLOCK

### Findings

#### [SEVERITY] [File:Line] — [Title]

**Issue**: [Description of the problem]
**Evidence**: [Code snippet showing the issue]
**Recommendation**: [Specific fix suggestion]
**Confidence**: HIGH | MEDIUM | LOW
```
