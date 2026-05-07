---
name: anti-pattern
description: >
  Anti-pattern detection and prevention skill. Catches hardcoded data,
  non-functional UI elements, placeholder code, N+1 queries, and other
  common development anti-patterns before they ship.
license: MIT
---

# Anti-Pattern Skill — Ship Real Code, Not Decorations

This skill detects and prevents the most common anti-patterns that make software look unfinished or unprofessional.

## Banned Anti-Patterns (ZERO TOLERANCE)

### UI/UX Anti-Patterns

```
❌ BANNED:
- "Coming Soon" sections or labels
- Non-functional buttons (must work or be removed)
- Forms that don't submit anywhere
- Hardcoded fake data in production components
- Static tables pretending to be dynamic
- Links that go nowhere (href="#")
- "Under Construction" banners
- Feature flags permanently set to false
- Disabled inputs without clear explanation
- Empty states without helpful messaging
- Pagination that doesn't actually paginate
- Search bars that don't actually search
- Filters that return the same results

✅ REQUIRED:
- Every visible button triggers a real handler or is removed
- Every form has a real onSubmit connected to an API call
- Every list loads from a real data source with loading states
- Every link navigates to a real destination
- Empty states explain why and suggest next actions
- Error states show real error messages from the server
- Loading states appear during real async operations
```

### Code Anti-Patterns

```
❌ BANNED:
- return []; // TODO: implement
- throw new Error('Not implemented');
- // placeholder
- Hardcoded arrays pretending to be API responses
- Functions with empty bodies
- Catch blocks that silently swallow errors
- Commented-out code in production
- Magic numbers without named constants
- Copy-pasted code (DRY violation)
- God functions (>100 lines)
- Deeply nested callbacks (>3 levels)
- N+1 database queries in loops

✅ REQUIRED:
- Every function has real, working implementation
- Every error is properly handled with user feedback
- Constants are named and documented
- Code is DRY — extract shared logic
- Functions are focused and under 40 lines
```

### N+1 Query Detection

```
❌ BANNED (N+1):
// This fires 1 query per user = N+1 problem
for (const user of users) {
  const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [user.id]);
}

✅ REQUIRED (Batch):
// This fires 1 query total
const userIds = users.map(u => u.id);
const orders = await db.query(
  'SELECT * FROM orders WHERE user_id IN (?)',
  [userIds]
);
// Then group in memory
const ordersByUser = groupBy(orders, 'user_id');
```

### SQL Anti-Patterns

```
❌ BANNED:
SELECT * FROM users                    -- No SELECT *
WHERE name LIKE '%" + input + "%'     -- SQL injection
ORDER BY RAND()                        -- Performance killer
HAVING COUNT(*) > 0                    -- Use WHERE instead
WHERE YEAR(created_at) = 2024          -- Breaks index usage

✅ REQUIRED:
SELECT id, name, email FROM users      -- Explicit columns
WHERE name LIKE ?                      -- Parameterized
ORDER BY id DESC LIMIT 20              -- Deterministic sort
WHERE created_at >= '2024-01-01'       -- Index-friendly
  AND created_at < '2025-01-01'
```

## Verification Checklist

Before ANY deliverable is marked complete:

- [ ] No "coming soon" or "under construction" anywhere
- [ ] All buttons are functional or removed
- [ ] All forms submit to real endpoints
- [ ] All lists load from real data sources
- [ ] No hardcoded demo data in production paths
- [ ] No N+1 queries (check every loop with a query)
- [ ] No TODO comments without issue references
- [ ] Error states handle real errors
- [ ] Loading states show during real operations
