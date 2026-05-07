# AGENTS.md

## Purpose

This file defines the mandatory operational rules for all agent work in this repository.
These rules apply to code, documentation, analysis, design, review, and debugging.

---

## Core Rule

All work must be **evidence-based**.

**Valid evidence:**

- Files opened and relevant lines read directly
- Commands executed and output observed directly
- Tests run and pass/fail results observed directly

**Invalid as evidence:**

- Memory or recollection
- Assumptions or pattern matching
- Search results alone
- "It should work" or "It's probably correct"

If you don't know something, say:

> "I don't know — I will verify by reading the file."

---

## Absolute Prohibitions

NEVER do any of the following:

- Claim verification without opening the relevant files
- Modify code based on assumptions
- Reference unverified functions, files, variables, paths, exports, types, or interfaces
- Skip impact analysis
- Skip post-work verification
- Change behavior during refactoring unless explicitly requested
- Leave dead code after migration
- Mix refactoring with feature work in the same change
- Omit synchronization of tests, types, constants, imports, config, and docs
- Ignore collision risk with parallel agents working on the same files

---

## Required Workflow

### 1. Before Starting Work

Complete ALL of the following BEFORE making changes:

1. Open and read all directly relevant files top-to-bottom
2. Identify: entry points, data flow, dependencies, dynamic wiring, public exports
3. List affected files
4. Declare: Target, Reason, Scope, Expected Impact, Rollback Plan
5. Verify baseline stability: build succeeds, relevant tests pass

Do NOT begin implementation until ALL items above are complete.

### 2. During Work

Follow this order:

`SURVEY → PLAN → EXECUTE → TEST → VERIFY → DOCUMENT`

Rules:

- Prefer incremental migration
- Preserve behavior unless explicitly asked to change it
- Remove previous-generation code after successful migration
- Stop immediately if unexpected behavior appears or evidence is missing

### 3. After Work

Complete ALL of the following:

1. Re-open all changed files and read them start-to-finish
2. Trace all affected connections directly
3. Verify upstream and downstream impact
4. Run relevant tests
5. Synchronize all affected artifacts: tests, types, constants, imports, config, docs

Do NOT mark work complete until ALL items above are done.

---

## Verification Standards

### File Verification

To say "verified," you must have done at least one of:

- Opened the file and read relevant lines
- Executed a command and observed the output
- Run tests and observed pass/fail results

### Connection Tracing

For meaningful changes, verify:

- Producer output fields
- Consumer input fields
- Intermediate transforms
- Serialization/deserialization boundaries
- All branch paths accessing changed data

### Mandatory Anti-Hallucination Checks

Verify directly from files:

1. Function signatures and return shapes
2. Export boundaries and entry point exposure
3. Actual data flow of constants, config, and env values
4. Actual state shapes of interfaces, classes, and types

---

## Work-Type Rules

### Code Work

Before changing code, verify:

- All entry points
- Full path from entry to exit
- Dependency relationships
- Dynamic registration (registries, event emitters, DI, string dispatch)
- Public export surface

After changing code, synchronize:

- Tests, mocks, and stubs
- Interfaces and types
- Constants, env docs, and imports

### Documentation Work

Before writing docs:

- Open and read existing documentation fully
- Open the code the documentation describes
- List outdated or incorrect descriptions

Rules:

- Code is the source of truth
- Don't copy large code blocks into docs unless necessary
- Write intent and rationale, not obvious implementation steps

### Analysis Work

Follow this order:
`OBSERVE → HYPOTHESIZE → VERIFY → CONCLUDE`

Rules:

- Collect evidence before concluding
- Separate confirmed facts from inferences
- Don't make performance claims without measurement
- Don't make security claims without verifying inputs, secrets, encryption, and access control

### Design Work

Before proposing design:

- Read current structure directly
- List all affected modules
- Prepare at least two options

Rules:

- Record decisions, alternatives, reasons, and consequences
- Avoid circular dependencies and layer violations
- Check if direct implementation is simpler than adding a new dependency

---

## Parallel Agent Rules

Before starting parallel work, confirm ALL of:

- File ownership does not overlap
- One agent's output is not another agent's required input
- Shared state is not modified concurrently
- Each task has an independent "definition of done"

DO NOT parallelize if ANY of:

- Multiple agents change the same file
- Schema or migration work is involved
- Dependency install/remove is involved
- Strict sequential dependencies exist

When running parallel agents, define for each:

- Owned files, feature boundary, definition of done
- Forbidden files, dependencies on other agents
- Collision risk zones, integration plan

---

## Anti-Pattern Detection Rules

During ANY work, agents MUST detect and reject these patterns:

### Forbidden Patterns

- `return []; // TODO: implement` — Stub/placeholder return
- `throw new Error('Not implemented')` — Unimplemented function
- Mock/hardcoded data in production code paths
- Empty function bodies
- Stubs returning static values
- N+1 queries (query inside loop instead of eager loading)
- Raw SQL with string concatenation (SQL injection risk)
- "Coming soon", "under construction", hardcoded demo data

### Required Replacements

- Full implementation with real logic, validation, and error handling
- Parameterized queries only — never string concatenation for SQL
- Eager loading (JOIN / IN clause) to prevent N+1
- Input validation on every endpoint

---

## SQL Formatting Rules

All SQL queries MUST follow this format:

```sql
-- ✅ CORRECT: Uppercase keywords, one column per line, indented JOINs
SELECT
    p.id,
    p.name,
    p.email,
    r.name AS role_name
FROM
    users p
    INNER JOIN roles r ON p.role_id = r.id
WHERE
    p.status = 'active'
    AND p.deleted_at IS NULL
ORDER BY
    p.created_at DESC
LIMIT 20 OFFSET 0;
```

```sql
-- ❌ WRONG: Lowercase, everything on one line, inline JOINs
select p.id, p.name, p.email, r.name as role_name from users p inner join roles r on p.role_id = r.id where p.status = 'active' and p.deleted_at is null order by p.created_at desc limit 20 offset 0;
```

Rules:

- Keywords: UPPERCASE (SELECT, FROM, WHERE, JOIN, AND, OR, ORDER BY, etc.)
- Columns: One per line with trailing comma
- JOINs: Indented under FROM clause
- WHERE conditions: One per line, AND/OR at start of line
- Always use parameterized queries (never string concatenation)

---

## Multi-Language Awareness

This orchestrator supports ANY programming language, not just TypeScript. When working on a project, ADAPT to its tech stack:

| Language     | Testing        | Linting               | Typing                   |
| ------------ | -------------- | --------------------- | ------------------------ |
| TypeScript   | Jest / Vitest  | ESLint                | tsc --strict             |
| PHP          | Pest / PHPUnit | PHPStan / Psalm       | declare(strict_types=1)  |
| Python       | pytest         | Ruff / mypy           | Type hints               |
| Dart/Flutter | flutter_test   | dart analyze          | Sound null safety        |
| Rust         | cargo test     | clippy                | Compiler enforced        |
| Go           | go test        | go vet                | Statically typed         |
| Java         | JUnit 5        | Checkstyle / SpotBugs | Strong typing            |
| C#           | xUnit / NUnit  | Roslyn analyzers      | Nullable reference types |

Rules:

- Detect the project's language from config files BEFORE writing code
- Use the project's existing conventions, not generic patterns
- Run the appropriate linter and test commands for the detected language
- Never assume TypeScript — the project could be Laravel, Django, Flutter, etc.

---

## Code Quality Rules

All submitted code must satisfy:

- Cyclomatic complexity ≤ 10
- Parameter count ≤ 4
- Function length ≤ 40 lines
- Nesting depth ≤ 3
- No untyped `any`
- No magic strings or numbers
- No implicit type coercion
- No circular dependencies
- No layer violations
- No dead references

Architecture preferences:

- Presentation: parsing and validation only
- Business: domain logic
- Infrastructure: DB, network, filesystem, external services
- Cross-cutting: logging, auth, monitoring via separate mechanisms

Comment policy:

- Keep only comments that explain **WHY**
- Remove comments that restate the code
- Every workaround must include: issue reference + removal condition

---

## Post-Work Audit

Before completion, run this audit:

### Safety

- No references to removed code
- No missing consumers
- Build succeeds
- Static analysis passes
- Relevant tests pass

### Connectivity

- Imports and exports valid
- Dynamic wiring still works
- Public entry points expose intended items
- Producer/consumer fields match
- No orphaned code

### Consistency

- Naming consistent
- Layering preserved
- Constants/types point to current definitions
- Documentation matches current behavior

### Full Sync

- Tests updated, no orphan tests
- Test coverage exists for new public behavior
- Mocks/stubs match current contracts
- Config and env docs updated

---

## Session Memory

Update `.qwen-orchestrator/memory.md` at session end with:

- Current task, last completed step, next exact step
- Incomplete items and reasons
- Key decisions, rejected alternatives, known risks
- Files to open first in next session, in order

At next session start:

1. Open `memory.md`
2. Read the latest snapshot
3. Open files in the restore list, in order
4. Resume from the recorded next step

---

## MCP Memory Server — Persistent Knowledge Graph

When the MCP Memory Server is configured, agents with `SaveMemory` can persist decisions, patterns, and context across sessions using a Knowledge Graph.

### Available Tools

| Tool               | Purpose                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| `create_entities`  | Create nodes in the knowledge graph (decisions, patterns, preferences) |
| `create_relations` | Create edges between entities (e.g., "depends_on", "supersedes")       |
| `read_graph`       | Read the full knowledge graph or filtered subgraph                     |

### When to Persist

Agents MUST persist to the Knowledge Graph when:

- A **significant architectural decision** is made (tech stack, patterns, trade-offs)
- A **recurring pattern** is discovered that other agents should follow
- A **rejected alternative** is documented (to avoid re-evaluation)
- A **project convention** is established (naming, file structure, error handling)
- A **security or performance concern** is identified for future reference

### Entity Types

| Type         | Description                                | Example                                  |
| ------------ | ------------------------------------------ | ---------------------------------------- |
| `decision`   | A choice made with rationale               | "Use PostgreSQL over MongoDB for ACID"   |
| `pattern`    | A reusable solution to a recurring problem | "Repository pattern for all data access" |
| `preference` | A project-specific convention              | "Use kebab-case for file names"          |
| `blocker`    | An unresolved issue requiring attention    | "CORS not configured for staging"        |
| `context`    | Background knowledge for future sessions   | "Project uses multi-tenant architecture" |

### Relation Types

| Relation     | Meaning                                |
| ------------ | -------------------------------------- |
| `depends_on` | Entity A requires Entity B             |
| `supersedes` | Entity A replaces Entity B             |
| `related_to` | General association                    |
| `blocks`     | Entity A prevents Entity B             |
| `implements` | Entity A implements Entity B (pattern) |

### Agents with Memory Access (19 of 22)

api-specialist, backend-developer, commander, cybersecurity-engineer, doc-researcher, frontend-developer, localization-engineer, mobile-engineer, monitor, performance-engineer, planner, product-owner, project-manager, qa-engineer, release-manager, reviewer, seo-specialist, tech-lead, tech-selector

### Workflow

1. **Session start**: Call `read_graph` to load relevant context
2. **During work**: Call `create_entities` when significant decisions are made
3. **Session end**: Call `create_relations` to link related entities

---

## User Clarification Workflow (AskUserQuestion)

### When to Ask

Agents with the `AskUserQuestion` tool MUST ask the user before proceeding when:

- The task has **multiple valid approaches** (e.g., tech stack choice, architecture pattern)
- Requirements are **ambiguous or incomplete** (e.g., "build a checkout" without specifying provider)
- There are **hidden trade-offs** the user should decide (e.g., performance vs. flexibility)
- The scope could **expand significantly** based on interpretation
- The user's request contains **vague terms** (e.g., "make it fast", "like Airbnb")

### How to Ask

Use `AskUserQuestion` with structured options:

```
AskUserQuestion({
  questions: [
    {
      question: "Which payment gateway should I integrate?",
      header: "Payment",
      options: [
        { label: "Stripe", description: "Industry standard, great API" },
        { label: "PayPal", description: "Widely trusted, international" },
        { label: "MercadoPago", description: "Best for Latin America" }
      ]
    }
  ]
})
```

### Rules

1. **Max 4 questions** per AskUserQuestion call
2. **Max 12 characters** for header
3. **2-4 options** per question, each with label + description
4. **Never ask obvious questions** — if the answer is clear from context, proceed
5. **Ask early, not late** — clarify before planning, not during implementation
6. **One clarification round** — don't ask the same thing twice

### Agents Authorized to Ask (13 of 22 agents)

| Agent               | Trigger                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| Commander           | Before every mission — scope, priorities                               |
| Planner             | Before architecture — tech stack, patterns                             |
| **Frontend Dev**    | **Before UI work — framework choice, design system, responsiveness**   |
| **Backend Dev**     | **Before API work — endpoints, data model, auth patterns**             |
| **API Specialist**  | **Before integration — API style (REST/GraphQL/gRPC), third-party**    |
| **Mobile Engineer** | **Before mobile work — platform (Flutter/RN/Native), offline support** |
| QA Engineer         | Before test strategy — critical paths, thresholds                      |
| Project Manager     | Before scoping — deadlines, risk, resources                            |
| Product Owner       | Before user stories — acceptance criteria                              |
| Tech Selector       | When tech stack is unspecified — framework/DB/language selection       |
| SEO Specialist      | When building web projects — target audience, content type             |

---

## Completion Requirements

NEVER declare completion without providing ALL of:

- Changed files re-read and verified
- Commands executed with observed results
- Side effects reviewed
- Artifacts synchronized
- Post-work audit completed
- Session memory updated

Report a confidence score (0-100) at the end of work.
