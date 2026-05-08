---
name: multi-lang
description: >
  Multi-language development skill covering patterns, conventions, and
  best practices for the top programming languages and frameworks.
  Adapts guidance based on the detected tech stack. Works with or
  without Context7.
license: MIT
---

# Multi-Language Skill — Universal Development Patterns

This skill provides language-specific best practices for the most used programming languages and frameworks. Works WITH Context7 (recommended) or WITHOUT (using built-in knowledge with lower confidence).

## Language Detection

When the project uses a language, adapt ALL output to that language's conventions:

### TypeScript / JavaScript

```typescript
// Naming: camelCase for variables/functions, PascalCase for classes/types
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findMany(
    filters: UserFilters,
    pagination: Pagination
  ): Promise<PaginatedResult<User>>;
}

// Error handling: typed errors
class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, 404, 'NOT_FOUND');
  }
}
```

### PHP / Laravel

```php
// Naming: camelCase methods, PascalCase classes, snake_case DB columns
class UserRepository
{
    /**
     * Find users with filters and pagination.
     *
     * @param  array<string, mixed>  $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function findMany(array $filters, int $perPage = 20): LengthAwarePaginator
    {
        return User::query()
            ->select(['id', 'name', 'email', 'created_at'])
            ->when($filters['search'] ?? null, fn ($q, $search) =>
                $q->where(fn ($q) =>
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                )
            )
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
```

### Python

```python
# Naming: snake_case for functions/variables, PascalCase for classes
class UserRepository:
    """Repository for user data access with filtering and pagination."""

    def find_many(
        self,
        filters: UserFilters,
        pagination: Pagination,
    ) -> PaginatedResult[User]:
        """Find users matching filters with pagination."""
        query = self.session.query(User).filter(User.deleted_at.is_(None))

        if filters.search:
            search_pattern = f"%{filters.search}%"
            query = query.filter(
                or_(
                    User.name.ilike(search_pattern),
                    User.email.ilike(search_pattern),
                )
            )

        total = query.count()
        results = (
            query.order_by(User.created_at.desc())
            .offset(pagination.offset)
            .limit(pagination.per_page)
            .all()
        )
        return PaginatedResult(items=results, total=total, page=pagination.page)
```

### Dart / Flutter

```dart
// Naming: camelCase for variables/functions, PascalCase for classes
class UserRepository {
  /// Find users matching filters with pagination.
  ///
  /// Throws [ServerException] on network failure.
  Future<PaginatedResult<User>> findMany(
    UserFilters filters,
    Pagination pagination,
  ) async {
    final response = await _apiClient.get(
      '/users',
      queryParameters: {
        'search': filters.search,
        'page': pagination.page,
        'per_page': pagination.perPage,
      },
    );
    return PaginatedResult.fromJson(response.data, User.fromJson);
  }
}
```

### Rust

```rust
// Naming: snake_case for functions/variables, PascalCase for types
pub fn find_many(
    &self,
    filters: &UserFilters,
    pagination: &Pagination,
) -> Result<PaginatedResult<User>, RepositoryError> {
    let mut query = self.pool
        .query_builder()
        .select(&["id", "name", "email", "created_at"])
        .from("users")
        .where_clause("deleted_at IS NULL");

    if let Some(ref search) = filters.search {
        query = query.where_clause(&format!(
            "(name ILIKE '%{}%' OR email ILIKE '%{}%')",
            search, search
        ));
    }

    query.paginate(pagination).map_err(RepositoryError::from)
}
```

## Context7 Integration

### WITH Context7 (Recommended)

```
1. Resolve library ID via context7_resolve-library-id
2. Query for specific API/feature via context7_query-docs
3. Use official patterns from docs
4. Confidence: HIGH
```

### WITHOUT Context7 (Fallback)

```
1. Check $SESSION_DIR/docs/ for cached docs
2. Use built-in language knowledge (this skill)
3. Read node_modules/vendor source code if available
4. Clearly state: "Without Context7, confidence: MEDIUM"
5. Recommend installing Context7 MCP for best results
```

## Framework-Specific Patterns

| Framework   | Language   | ORM                | Auth             | Testing      |
| ----------- | ---------- | ------------------ | ---------------- | ------------ |
| Laravel     | PHP        | Eloquent           | Sanctum/Passport | Pest/PHPUnit |
| NestJS      | TypeScript | TypeORM/Prisma     | Passport/JWT     | Jest         |
| Django      | Python     | Django ORM         | DRF Tokens       | pytest       |
| Flutter     | Dart       | HTTP/Dio           | Firebase/JWT     | flutter_test |
| Next.js     | TypeScript | Prisma/Drizzle     | NextAuth         | Vitest       |
| Express     | JavaScript | Mongoose/Sequelize | JWT              | Mocha/Jest   |
| FastAPI     | Python     | SQLAlchemy         | OAuth2           | pytest       |
| Spring Boot | Java       | JPA/Hibernate      | Spring Security  | JUnit        |
