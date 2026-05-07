---
name: api-design
description: >
  RESTful and GraphQL API design skill with endpoint patterns, request/response
  schemas, versioning, pagination, filtering, error handling, and API documentation.
license: MIT
---

# API Design Skill — Professional API Patterns

This skill provides comprehensive API design guidance following industry best practices.

## RESTful API Standards

### URL Structure

```
GET    /api/v1/resources              # List (paginated, filtered)
GET    /api/v1/resources/:id          # Detail (with includes)
POST   /api/v1/resources              # Create
PATCH  /api/v1/resources/:id          # Partial update
PUT    /api/v1/resources/:id          # Full replace
DELETE /api/v1/resources/:id          # Delete (soft by default)
POST   /api/v1/resources/:id/restore  # Restore soft-deleted
```

### Response Envelope

```typescript
// Success - Single
{ data: { ... }, meta: { requestId, timestamp } }

// Success - Collection
{
  data: [...],
  meta: { requestId, timestamp },
  pagination: {
    page: 1,
    perPage: 20,
    total: 150,
    totalPages: 8,
    hasNext: true,
    hasPrev: false
  }
}

// Error
{
  error: {
    code: "VALIDATION_ERROR",
    message: "Human-readable message",
    details: [
      { field: "email", message: "Invalid email format" }
    ]
  },
  meta: { requestId, timestamp }
}
```

### Filtering & Sorting

```
GET /api/v1/products?
  filter[category]=electronics&
  filter[price_min]=10&
  filter[price_max]=100&
  filter[status]=active&
  sort=-createdAt,name&
  page=2&
  perPage=50&
  include=category,variants
```

### HTTP Status Codes

| Code | Usage                                          |
| ---- | ---------------------------------------------- |
| 200  | Success (GET, PATCH, PUT, DELETE)              |
| 201  | Created (POST)                                 |
| 204  | No Content (successful DELETE with no body)    |
| 400  | Validation Error                               |
| 401  | Unauthorized (missing/invalid auth)            |
| 403  | Forbidden (insufficient permissions)           |
| 404  | Not Found                                      |
| 409  | Conflict (duplicate, version mismatch)         |
| 422  | Unprocessable Entity (business rule violation) |
| 429  | Too Many Requests (rate limiting)              |
| 500  | Internal Server Error                          |

### Versioning Strategy

```
URL Versioning (recommended for REST):
  /api/v1/resources
  /api/v2/resources

Header Versioning (alternative):
  Accept: application/vnd.api.v1+json
```

## CRUD Completeness for API

Every resource MUST have these endpoints:

```typescript
// 1. CREATE - Full validation
POST /api/v1/products
Body: { name, sku, price, categoryId, ... }
Response: 201 { data: product }

// 2. READ LIST - Paginated with filters
GET /api/v1/products?filter[status]=active&sort=-createdAt
Response: 200 { data: [...], pagination: {...} }

// 3. READ DETAIL - With relationships
GET /api/v1/products/:id?include=category,variants
Response: 200 { data: product }

// 4. UPDATE - Partial update
PATCH /api/v1/products/:id
Body: { price: 29.99 }
Response: 200 { data: product }

// 5. DELETE - Soft delete
DELETE /api/v1/products/:id
Response: 200 { data: { deleted: true } }

// 6. RESTORE - If soft delete
POST /api/v1/products/:id/restore
Response: 200 { data: product }
```

## Rate Limiting

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

## API Documentation Standard

Every endpoint must document:

1. Description and purpose
2. Required permissions/roles
3. Request body schema (with examples)
4. Response schema (success + all error codes)
5. Query parameters (filter, sort, include, pagination)
6. Rate limit information
