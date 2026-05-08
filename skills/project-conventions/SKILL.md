---
name: project-conventions
description: >
  Ensures agents respect existing project conventions, patterns, query styles,
  and architecture when working on established codebases. Prevents agents from
  imposing new patterns on existing projects.
license: MIT
---

# Project Conventions Skill — Respect Existing Code

## Purpose

When working on an EXISTING project (not greenfield), agents MUST discover and respect the established conventions. This skill provides the discovery protocol and rules for matching existing patterns.

## Step 1: Convention Discovery (MANDATORY — Before Writing Any Code)

Before touching any file in an existing project, run this discovery:

### 1.1 Architecture Discovery

```
1. Read project root files: package.json, composer.json, pubspec.yaml, Cargo.toml, etc.
2. Identify ALL frameworks and their versions
3. Map the directory structure:
   - Where are controllers? (app/Http/Controllers, src/controllers, lib/controllers)
   - Where are models? (app/Models, src/models, lib/models)
   - Where are views/pages? (resources/views, src/pages, lib/screens)
   - Where are services? (app/Services, src/services, lib/services)
   - Where are API routes? (routes/api.php, src/routes/, pages/api/)
   - Where are tests? (tests/, __tests__/, test/, spec/)
4. Identify the project's entry point(s)
```

### 1.2 Query/Request Pattern Discovery

```
For Backend (Laravel, NestJS, Express, Django, etc.):
- How does the frontend call the backend? (REST, GraphQL, tRPC, gRPC)
- What HTTP client does the frontend use? (axios, fetch, http, dio)
- How are API endpoints structured? (/api/v1/resource, /resource, /graphql)
- How is authentication handled? (Bearer token, session, cookie, API key)
- How are errors returned? ({error: "msg"}, {message: "msg"}, Problem Details)
- How is pagination handled? (cursor, offset, relay-style)

For Frontend (Flutter, React, Vue, etc.):
- How does it fetch data? (Riverpod + dio, Redux + axios, hooks + fetch, BLoC + http)
- How is state managed? (Provider, BLoC, Riverpod, Redux, Vuex, Pinia, getX)
- How are forms handled? (Form widgets, react-hook-form, vee-validate)
- How are routes defined? (named routes, GoRouter, React Router, Vue Router)
- How are API calls structured? (repository pattern, service layer, direct calls)
```

### 1.3 Code Style Discovery

```
1. Read 2-3 existing files in the same area you'll be working on
2. Identify naming conventions: (camelCase, snake_case, PascalCase)
3. Identify import style: (relative, absolute, alias @/)
4. Identify error handling pattern: (try/catch, Result type, error codes, exceptions)
5. Identify comment style: (JSDoc, PHPDoc, docstrings, inline)
6. Identify file organization: (one class per file, grouped by feature, grouped by type)
```

### 1.4 Database Convention Discovery

```
1. How are migrations structured? (timestamp_name, sequential numbering)
2. How are models defined? (Eloquent ORM, Prisma, TypeORM, Drift, Drizzle)
3. How are relationships defined? (hasMany, belongsTo, many-to-many)
4. How are queries built? (query builder, raw SQL, ORM methods, repository pattern)
5. What's the naming convention? (snake_case tables, camelCase columns, singular vs plural)
```

## Step 2: Convention Compliance Rules

### Rule 1: Match the Existing Style

```
❌ BANNED:
- Introducing a new state management library (if project uses Riverpod, don't add BLoC)
- Using a different HTTP client (if project uses dio, don't add http)
- Creating files in a different directory structure
- Using a different naming convention than existing files
- Introducing a new ORM or query builder
- Changing the error response format
- Using different import style (if project uses @/ aliases, don't use relative paths)

✅ REQUIRED:
- Read 2-3 existing files in the same area before writing new code
- Match the existing code style exactly (indentation, naming, imports)
- Use the same libraries and patterns already in the project
- Follow the same directory structure
- Use the same error handling pattern
- Use the same state management approach
```

### Rule 2: Respect the Architecture

```
For Laravel Backend + Flutter Web Frontend:
- Backend: Eloquent ORM, Form Requests, API Resources, middleware
- Frontend: The EXISTING state management (Riverpod/BLoC/GetX), the EXISTING HTTP client (dio/http)
- API: Match the EXISTING endpoint structure, response format, auth mechanism
- Database: Use the EXISTING migration pattern, model structure, relationship definitions

For Next.js Full-Stack:
- Use the EXISTING data fetching pattern (SSR, SSG, ISR, client-side)
- Use the EXISTING API route structure (/pages/api or /app/api)
- Use the EXISTING auth approach (NextAuth, custom JWT, session)
- Use the EXISTING form handling library

For NestJS Backend:
- Use the EXISTING module structure
- Use the EXISTING DTO pattern
- Use the EXISTING service/repository pattern
- Use the EXISTING guard/interceptor/pipe pattern
```

### Rule 3: AskUserQuestion When Unsure

If after discovery you're still unsure about the convention:

```
AskUserQuestion({
  questions: [
    {
      question: "I found mixed patterns in the codebase. Which should I follow for this task?",
      header: "Convention",
      options: [
        { label: "Pattern A", description: "Description of what I found (e.g., Repository pattern with dio)" },
        { label: "Pattern B", description: "Description of alternative found (e.g., Direct API calls with http)" },
        { label: "Your choice", description: "I'll describe what I want" }
      ]
    }
  ]
})
```

## Step 3: Convention Documentation

After discovery, write findings to `$SESSION_DIR/context.md` under a "Project Conventions" section:

```markdown
## Project Conventions

### Architecture

- Backend: Laravel 10.x (Eloquent ORM, API Resources)
- Frontend: Flutter Web 3.x (Riverpod + dio)
- API: REST, /api/v1/\*, Bearer token auth

### Code Style

- Backend: PSR-12, PHPDoc comments, snake_case methods
- Frontend: Effective Dart, camelCase, riverpod annotations

### Query Pattern

- Backend: Eloquent with query scopes, API Resources for response transformation
- Frontend: Repository pattern with dio, Riverpod StateNotifierProvider

### State Management

- Riverpod (StateNotifierProvider for complex state, Provider for simple)

### Error Handling

- Backend: JSON API errors {error: {code, message, details}}
- Frontend: try/catch with Either pattern from riverpod
```

## Anti-Patterns

- ❌ Adding a new HTTP client when one exists
- ❌ Introducing Redux when the project uses Riverpod
- ❌ Using raw SQL when the project uses Eloquent ORM
- ❌ Creating a new directory structure that doesn't match the project
- ❌ Changing response format from what the frontend expects
- ❌ Using a different auth mechanism than the project already has
- ❌ Ignoring existing base classes, traits, or mixins
- ❌ Not reading existing code before writing new code
