---
name: domain-driven
description: >
  Domain-Driven Design skill for building complete business modules for building complete business modules.
  Ensures every business module has all sub-modules identified, complete CRUD
  operations, proper relationships, and no mock/placeholder implementations.
license: MIT
---

# Domain-Driven Design Skill — Complete Business Module Builder

This skill ensures every business module is built completely with all sub-modules, CRUD operations, relationships, and business rules — NO mockups, NO placeholders.

## Module Discovery Protocol

When asked to build an business module:

### Step 1: Enumerate Sub-Modules

```
For module "Inventory", identify:
├── Products (CRUD + categories, variants, pricing)
├── Warehouses (CRUD + locations, capacity)
├── Stock Movements (CRUD + types: in, out, transfer)
├── Suppliers (CRUD + contacts, contracts)
├── Purchase Orders (CRUD + lines, receiving)
├── Stock Counts (CRUD + adjustments)
└── Reports (Read-only analytics)
```

### Step 2: Entity Relationship Map

```
Product ──< ProductVariant >── Attribute
  │
  ├──< StockItem >── Warehouse
  │
  └──< PurchaseOrderLine >── PurchaseOrder >── Supplier
```

### Step 3: CRUD Completeness Matrix

For EVERY entity, verify ALL operations:

| Entity  | Create | Read List    | Read Detail   | Update     | Delete  | Restore |
| ------- | ------ | ------------ | ------------- | ---------- | ------- | ------- |
| Product | ✅     | ✅ + filters | ✅ + variants | ✅ partial | ✅ soft | ✅      |
| ...     | ...    | ...          | ...           | ...        | ...     | ...     |

## Implementation Rules

### NO Mock Implementations

Every function must contain REAL implementation logic:

```typescript
// ❌ FORBIDDEN - Mock/Placeholder
async getProducts() {
  return []; // TODO: implement
}

// ✅ REQUIRED - Real Implementation
async getProducts(filters: ProductFilters, pagination: Pagination): Promise<PaginatedResult<Product>> {
  const query = this.repository.createQueryBuilder('p')
    .leftJoinAndSelect('p.category', 'category')
    .leftJoinAndSelect('p.variants', 'variant');

  if (filters.categoryId) {
    query.andWhere('p.categoryId = :categoryId', { categoryId: filters.categoryId });
  }
  if (filters.search) {
    query.andWhere('(p.name ILIKE :search OR p.sku ILIKE :search)', { search: `%${filters.search}%` });
  }

  query.orderBy('p.createdAt', 'DESC');
  return query.paginate(pagination);
}
```

### CRUD Pattern Requirements

#### Create

- Input validation with specific error messages
- Unique constraint checking before insert
- Default values applied
- Relationships validated (FK existence)
- Audit trail (createdBy, createdAt)

#### Read List

- Pagination (cursor or offset)
- Filtering by relevant fields
- Sorting by configurable columns
- Include counts and aggregates
- Field selection (don't return unnecessary data)

#### Read Detail

- Include related entities (eager loading)
- 404 handling with clear message
- Authorization check (user can access this resource)

#### Update

- Partial update support (PATCH semantics)
- Immutable fields protection (e.g., createdAt, id)
- Optimistic locking or version checking
- Audit trail (updatedBy, updatedAt)

#### Delete

- Soft delete by default (deletedAt timestamp)
- Cascade behavior explicitly defined
- Referential integrity check before delete
- Hard delete only via explicit admin endpoint

## Domain-Driven Design Patterns

### Entity Structure

```typescript
// Base entity with audit fields
interface BaseEntity {
  id: string; // UUID
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null; // Soft delete
  createdBy: string;
  updatedBy: string;
}

// Domain entity with business rules
class Product extends BaseEntity {
  // Fields
  name: string;
  sku: string;
  price: number;
  cost: number;
  status: ProductStatus;

  // Business rules in the entity
  activate(): void {
    if (this.price <= 0) throw new DomainError("Price must be positive");
    this.status = ProductStatus.ACTIVE;
  }

  calculateMargin(): number {
    return this.price - this.cost;
  }
}
```

### Repository Pattern

```typescript
interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findList(
    filters: ProductFilters,
    page: Pagination,
  ): Promise<PaginatedResult<Product>>;
  save(product: Product): Promise<Product>;
  softDelete(id: string): Promise<void>;
  restore(id: string): Promise<void>;
}
```

## Sub-Module Detection Checklist

When building a module, check for these common sub-modules:

- [ ] **Master Data**: Core entities (Products, Customers, Vendors)
- [ ] **Transactions**: Business operations (Orders, Invoices, Movements)
- [ ] **Configuration**: Settings and preferences
- [ ] **Reports**: Read-only analytics and exports
- [ ] **Audit Log**: Change tracking
- [ ] **Permissions**: Role-based access per entity
- [ ] **Notifications**: Event-driven alerts
- [ ] **Import/Export**: Bulk data operations

## Delivery Verification

Before marking a module complete:

- [ ] ALL sub-modules identified and listed in TODO
- [ ] EVERY entity has complete CRUD (no gaps)
- [ ] NO mock/placeholder implementations
- [ ] ALL relationships properly configured
- [ ] ALL business rules implemented (not stubbed)
- [ ] ALL validations in place
- [ ] Migration files created and tested
- [ ] Seed data exists for development
- [ ] API documentation complete
- [ ] Tests cover every endpoint
