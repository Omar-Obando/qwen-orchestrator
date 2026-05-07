---
name: database-design
description: >
  Database schema design skill covering normalization, indexing strategy,
  migration patterns, query optimization, and data integrity. Use when
  designing database schemas, writing migrations, or optimizing queries.
license: MIT
---

# Database Design Skill — Schema & Query Expert

This skill provides comprehensive database design guidance for building reliable, performant data layers.

## Schema Design Principles

### Normalization Levels

- **1NF**: No repeating groups, atomic values
- **2NF**: 1NF + no partial dependencies
- **3NF**: 2NF + no transitive dependencies
- **Denormalize** for read performance when justified by measurement

### Entity Template

```sql
CREATE TABLE entities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Business fields
  name        VARCHAR(100) NOT NULL,
  code        VARCHAR(20) NOT NULL UNIQUE,
  status      VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'archived')),
  -- JSON for flexible metadata
  metadata    JSONB DEFAULT '{}',
  -- Audit fields
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ,  -- Soft delete
  created_by  UUID NOT NULL REFERENCES users(id),
  updated_by  UUID NOT NULL REFERENCES users(id)
);

-- Essential indexes
CREATE INDEX idx_entities_status ON entities(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_entities_code ON entities(code);
CREATE INDEX idx_entities_created_at ON entities(created_at DESC);
```

## Migration Safety Rules

### Every Migration Must Have

```sql
-- UP Migration
-- Description: [What this migration does]
-- Reversible: YES
-- Data Loss: NONE
-- Estimated Duration: [expected runtime]

BEGIN;
  -- Schema changes here
  -- Data migrations here
COMMIT;

-- DOWN Migration (rollback)
BEGIN;
  -- Exact reverse of UP
COMMIT;
```

### Migration Checklist

- [ ] Both UP and DOWN migrations written
- [ ] No data loss in UP migration
- [ ] DOWN migration actually reverses changes
- [ ] Tested with production-like data volume
- [ ] Foreign key constraints added AFTER data migration
- [ ] Indexes created CONCURRENTLY (PostgreSQL)

## Query Optimization

### Index Strategy Decision Tree

```
Is it a PK? → Auto-indexed
Is it a FK? → Always index
Used in WHERE? → Index it
Used in ORDER BY? → Consider index
Used in both WHERE + ORDER BY? → Composite index
High cardinality? → B-tree index
Low cardinality? → Consider partial index
Text search? → GIN/GiST index
```

### Common Performance Patterns

```sql
-- Pagination: Use cursor-based for large tables
SELECT * FROM products
WHERE id > :last_seen_id
ORDER BY id ASC
LIMIT 20;

-- Aggregation: Pre-compute with materialized views
CREATE MATERIALIZED VIEW order_summary AS
SELECT
  customer_id,
  COUNT(*) as total_orders,
  SUM(total) as total_spent
FROM orders
GROUP BY customer_id;

-- Bulk operations: Use batch inserts
INSERT INTO products (name, sku, price)
SELECT name, sku, price FROM temp_import
ON CONFLICT (sku) DO UPDATE SET
  price = EXCLUDED.price,
  updated_at = NOW();
```

## Data Integrity Patterns

### Constraints

```sql
-- Check constraints for business rules
ALTER TABLE products ADD CONSTRAINT chk_positive_price
  CHECK (price >= 0);

-- Exclusion constraints for scheduling
ALTER TABLE bookings ADD CONSTRAINT excl_no_overlap
  EXCLUDE USING gist (
    room_id WITH =,
    daterange(start_date, end_date, '[]') WITH &&
  );

-- Partial unique index for soft delete
CREATE UNIQUE INDEX uq_products_sku_active
  ON products(sku) WHERE deleted_at IS NULL;
```
