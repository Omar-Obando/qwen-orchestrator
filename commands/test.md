Execute a comprehensive test run for the following target:

**Target**: {{args}}

## Test Execution Protocol

1. **Discover**: Find all test files related to the target
2. **Run Unit Tests**: Execute with coverage reporting
3. **Run Integration Tests**: Execute service boundary tests
4. **Analyze Coverage**: Identify untested code paths
5. **Report**: Provide detailed results with evidence

## Report Format

```markdown
## Test Report

### Summary

- Total tests: [N]
- Passed: [N]
- Failed: [N]
- Skipped: [N]
- Coverage: [X]%

### Failed Tests

[Test name, expected vs actual, stack trace]

### Coverage Gaps

[File:line references for untested code paths]

### Recommendations

[Suggestions for improving test coverage]
```

Begin by discovering the test configuration and running the full suite.
