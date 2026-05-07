---
name: tdd-workflow
description: >
  Test-Driven Development workflow skill with patterns for unit, integration,
  and e2e testing. Use when implementing features to ensure all code is
  born tested with comprehensive coverage.
license: MIT
---

# TDD Workflow Skill — Test-First Development

This skill enforces a strict Test-Driven Development workflow ensuring every line of production code is justified by a failing test.

## The TDD Cycle

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌─────────┐    ┌─────────┐    ┌────────┐ │
│   │  RED    │───▶│  GREEN  │───▶│REFACTOR│ │
│   │Write    │    │Make it  │    │Clean it│ │
│   │Failing  │    │Pass     │    │Up      │ │
│   └─────────┘    └─────────┘    └────────┘ │
│        │                              │     │
│        └──────────────────────────────┘     │
│                  REPEAT                     │
└─────────────────────────────────────────────┘
```

## Test Categories

### Unit Tests (Foundation)

- Test a single function/method in isolation
- Mock all external dependencies
- Fast (< 10ms per test)
- No file system, network, or database access

```typescript
describe("calculateTotal", () => {
  it("should sum all item prices", () => {
    const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
    expect(calculateTotal(items)).toBe(60);
  });

  it("should return 0 for empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("should handle negative prices with absolute value", () => {
    const items = [{ price: -10 }];
    expect(calculateTotal(items)).toBe(10);
  });
});
```

### Integration Tests (Service Boundaries)

- Test interaction between modules
- Use real implementations where possible
- Use test databases/containers for data layer
- Verify contracts between services

### E2E Tests (User Journeys)

- Test complete user workflows
- Run against real environment
- Minimal mocking
- Focus on critical paths

## What to Test

### For Every Function

| Category         | Test Cases                       |
| ---------------- | -------------------------------- |
| Happy Path       | Normal inputs → expected outputs |
| Boundaries       | Empty, single, max, min values   |
| Null/Undefined   | Missing optional parameters      |
| Type Errors      | Wrong input types                |
| Error Conditions | Expected failures                |
| Concurrency      | Race conditions if applicable    |

### For Every API Endpoint

| Category         | Test Cases                       |
| ---------------- | -------------------------------- |
| 200 OK           | Valid request → correct response |
| 400 Bad Request  | Invalid input → clear error      |
| 401 Unauthorized | Missing/invalid auth             |
| 403 Forbidden    | Insufficient permissions         |
| 404 Not Found    | Non-existent resource            |
| 409 Conflict     | Duplicate creation               |
| 500 Error        | Server error handling            |

## Coverage Strategy

### Must Have (100% coverage target)

- Business logic and domain rules
- Data transformations and validations
- Error handling paths
- Authentication and authorization

### Should Have (80% coverage target)

- Controller/route handlers
- Service orchestration
- Data access layer

### Nice to Have (60% coverage target)

- Configuration loading
- Utility functions
- Logging and monitoring

## Test Quality Rules

1. **No Test Interdependence**: Each test must run independently
2. **Descriptive Names**: `it('should return 404 when user not found')`
3. **Arrange-Act-Assert**: Clear three-phase structure
4. **One Assertion Per Concept**: Group related assertions, separate unrelated
5. **Deterministic**: Same test, same result, every time
6. **Fast Feedback**: Unit tests < 10ms, Integration < 1s, E2E < 30s
