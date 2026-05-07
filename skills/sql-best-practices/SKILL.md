---
name: sql-best-practices
description: >
  SQL best practices skill covering query writing, indentation,
  N+1 prevention, indexing, performance, and security. Every SQL
  query must follow these standards regardless of the database engine.
license: MIT
---

# SQL Best Practices — Every Query a Masterpiece

This skill enforces SQL quality standards: proper indentation, N+1 prevention, parameterized queries, index-friendly patterns, and security.

## SQL Indentation Standard

EVERY SQL query MUST be properly indented:

```sql
-- ✅ CORRECT: Properly formatted
SELECT
    u.id,
    u.name,
    u.email,
    u.created_at,
    r.name  AS role_name,
    d.name  AS department_name
FROM
    users u
    INNER JOIN roles r
        ON r.id = u.role_id
    LEFT JOIN departments d
        ON d.id = u.department_id
WHERE
    u.deleted_at IS NULL
    AND u.status = 'active'
    AND u.created_at >= '2024-01-01'
ORDER BY
    u.created_at DESC
LIMIT 20
OFFSET 0;
```

```sql
-- ❌ WRONG: No formatting
select id,name,email from users where deleted_at is null and status='active' order by created_at desc limit 20;
```

### Formatting Rules

1. **Keywords**: UPPERCASE (SELECT, FROM, WHERE, JOIN, etc.)
2. **Indentation**: Each clause on its own line, indented
3. **Columns**: One per line in SELECT
4. **JOIN conditions**: Indented under the JOIN
5. **WHERE conditions**: Aligned AND/OR
6. **Commas**: Leading or trailing — pick one, be consistent

## N+1 Prevention Patterns

### Detection Pattern

```
If you see a LOOP containing a QUERY, it's likely N+1.
Count queries: 1 (initial) + N (loop) = N+1 problem.
```

### Solution: Eager Loading

```sql
-- ❌ N+1: One query per order for items
SELECT * FROM orders WHERE user_id = 123;
-- Then for EACH order:
SELECT * FROM order_items WHERE order_id = ?;

-- ✅ Single query with JOIN
SELECT
    o.id           AS order_id,
    o.total        AS order_total,
    o.status       AS order_status,
    oi.id          AS item_id,
    oi.product_name,
    oi.quantity,
    oi.unit_price
FROM
    orders o
    INNER JOIN order_items oi
        ON oi.order_id = o.id
WHERE
    o.user_id = 123
    AND o.deleted_at IS NULL
ORDER BY
    o.created_at DESC,
    oi.id ASC;
```

### Solution: Batch with IN

```sql
-- ❌ N+1: Loop over IDs
SELECT * FROM products WHERE id = 1;
SELECT * FROM products WHERE id = 2;
SELECT * FROM products WHERE id = 3;

-- ✅ Batch: Single query
SELECT
    id,
    name,
    sku,
    price,
    stock_quantity
FROM
    products
WHERE
    id IN (1, 2, 3)
    AND deleted_at IS NULL;
```

### Solution: Subquery for Aggregates

```sql
-- ❌ N+1: Count per category in a loop
SELECT * FROM categories;
-- Then for EACH category:
SELECT COUNT(*) FROM products WHERE category_id = ?;

-- ✅ Single query with subquery
SELECT
    c.id,
    c.name,
    COALESCE(p.product_count, 0) AS product_count
FROM
    categories c
    LEFT JOIN (
        SELECT
            category_id,
            COUNT(*) AS product_count
        FROM
            products
        WHERE
            deleted_at IS NULL
        GROUP BY
            category_id
    ) p ON p.category_id = c.id
WHERE
    c.deleted_at IS NULL
ORDER BY
    c.name ASC;
```

## Security Rules

### Parameterized Queries (ALWAYS)

```
❌ NEVER: String concatenation or interpolation
✅ ALWAYS: Parameterized queries with placeholders (? or named)

Language-specific:
- TypeScript: pool.query('SELECT * FROM users WHERE id = ?', [userId])
- PHP/Laravel: User::where('id', $userId)->first()
- Python: cursor.execute('SELECT * FROM users WHERE id = %s', [user_id])
- Dart: query('SELECT * FROM users WHERE id = ?', [userId])
```

### Access Control

```sql
-- Always filter by tenant/user in multi-tenant systems
SELECT
    id, name, email
FROM
    users
WHERE
    tenant_id = :current_tenant_id    -- NEVER skip tenant filter
    AND deleted_at IS NULL;
```

## Performance Rules

### Index-Friendly Patterns

```sql
-- ✅ Index-friendly: sargable
WHERE created_at >= '2024-01-01'
WHERE status = 'active'
WHERE email = 'user@example.com'

-- ❌ Index-hostile: non-sargable
WHERE YEAR(created_at) = 2024         -- Function on column
WHERE LOWER(email) = 'user@...'       -- Function on column
WHERE name LIKE '%search%'            -- Leading wildcard
WHERE id + 1 = 100                    -- Expression on column
```

### SELECT Explicit Columns (NEVER SELECT \*)

```sql
-- ❌ NEVER
SELECT * FROM users

-- ✅ ALWAYS
SELECT
    id,
    name,
    email,
    status,
    created_at
FROM
    users
```

## Comment Standards

```sql
-- Purpose: Fetch active users with their role and department
-- Author: [Agent/User]
-- Performance: Uses idx_users_status_created, expected < 10ms
-- Security: Filters by tenant_id for data isolation
SELECT
    u.id,
    u.name,
    u.email,
    r.name  AS role_name,
    d.name  AS department_name
FROM
    users u
    INNER JOIN roles r ON r.id = u.role_id
    LEFT JOIN departments d ON d.id = u.department_id
WHERE
    u.tenant_id = :tenant_id           -- Data isolation
    AND u.deleted_at IS NULL            -- Soft delete filter
    AND u.status = 'active'             -- Active users only
ORDER BY
    u.name ASC;
```
