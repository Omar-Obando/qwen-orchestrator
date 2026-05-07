---
name: refactoring
description: >
  Code refactoring skill focused on safe, incremental transformations that
  preserve behavior. Covers extract method, rename, introduce parameter,
  replace conditional with polymorphism, and other Fowler refactoring patterns.
license: MIT
---

# Refactoring Skill — Safe Code Transformations

This skill provides systematic refactoring guidance ensuring behavior preservation.

## Core Principle

> Refactoring changes the STRUCTURE without changing the BEHAVIOR.
> If behavior needs to change, that's a feature — do it separately.

## Refactoring Catalog

### Extract Method

```typescript
// BEFORE
function printOwing(invoice) {
  // Print banner
  console.log("*******************");
  console.log("*** Customer Owes ***");
  console.log("*******************");

  // Calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // Print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}

// AFTER
function printOwing(invoice: Invoice): void {
  printBanner();
  const outstanding = calculateOutstanding(invoice.orders);
  printDetails(invoice.customer, outstanding);
}
```

### Replace Conditional with Polymorphism

```typescript
// BEFORE
function getDiscount(customerType: string): number {
  if (customerType === "premium") return 0.2;
  if (customerType === "gold") return 0.15;
  if (customerType === "silver") return 0.1;
  return 0;
}

// AFTER
abstract class Customer {
  abstract getDiscount(): number;
}
class PremiumCustomer extends Customer {
  getDiscount(): number {
    return 0.2;
  }
}
class GoldCustomer extends Customer {
  getDiscount(): number {
    return 0.15;
  }
}
```

### Introduce Parameter Object

```typescript
// BEFORE
function createReport(
  title: string,
  startDate: Date,
  endDate: Date,
  format: string,
  includeCharts: boolean,
  groupBy: string
) { ... }

// AFTER
interface ReportOptions {
  title: string;
  dateRange: { start: Date; end: Date };
  format: 'pdf' | 'html' | 'csv';
  includeCharts: boolean;
  groupBy: 'day' | 'week' | 'month';
}
function createReport(options: ReportOptions) { ... }
```

## Safe Refactoring Protocol

1. **GREEN**: Ensure all tests pass before starting
2. **SMALL**: Make one refactoring at a time
3. **TEST**: Run tests after EACH refactoring step
4. **COMMIT**: Commit after each successful refactoring
5. **REVIEW**: Code review the refactoring separately

## Refactoring Checklist

Before refactoring:

- [ ] All existing tests pass
- [ ] Test coverage is adequate for the code being refactored
- [ ] No feature work mixed in
- [ ] Rollback plan exists (git commit before starting)

During refactoring:

- [ ] One transformation at a time
- [ ] Tests run after each step
- [ ] No behavior changes
- [ ] No dead code left behind

After refactoring:

- [ ] All tests still pass
- [ ] No new lint warnings
- [ ] Code is cleaner than before
- [ ] No functionality lost

## Forbidden Actions

- NEVER mix refactoring with feature changes
- NEVER refactor without passing tests first
- NEVER skip running tests between steps
- NEVER leave dead code after refactoring
- NEVER change behavior during refactoring
