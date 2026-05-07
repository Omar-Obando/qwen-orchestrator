Perform a comprehensive code review on the following target:

**Target**: {{args}}

## Review Dimensions

1. **Correctness** — Does it do what it claims? Edge cases handled?
2. **Security** — OWASP Top 10 vulnerabilities? Input validated?
3. **Performance** — Unnecessary allocations? O(n²) where O(n) possible?
4. **Maintainability** — Under 40 lines per function? Meaningful names?
5. **Testing** — Tests exist? Cover happy path AND failures?
6. **Architecture** — Proper separation? No circular deps?

## Output Format

```
## Code Review Report
### Summary
- Files reviewed: [N]
- Findings: [BLOCKER: N] [CRITICAL: N] [MAJOR: N] [MINOR: N]
- Verdict: APPROVE | REQUEST CHANGES

### Findings
[Each finding with severity, file:line, evidence, and recommendation]
```

Begin by reading all changed files, then systematically review each dimension.
