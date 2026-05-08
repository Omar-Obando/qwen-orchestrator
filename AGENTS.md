# AGENTS.md

## ⚠️ MANDATORY RULE #1: READ BEFORE WRITE

**BEFORE modifying ANY file, you MUST read it completely from start to finish.**

```
❌ BANNED:
- Editing a file you haven't read in full
- Assuming file contents without reading
- Modifying code based on memory or assumptions
- Skipping the read step to "save time"

✅ REQUIRED:
- Read the ENTIRE file before making ANY change
- After editing, re-read the file to verify changes are correct
- If a file is too long, read it in chunks — but read ALL of it
- Never use Edit or WriteFile on a file you haven't ReadFile'd first
```

**Why?** This prevents breaking existing functionality, duplicating code, introducing inconsistencies, and losing important logic that was already in the file.

---

## ⚠️ MANDATORY RULE #2: MULTI-PAGE WEBSITES

**When the user asks for "a website", "a site", or "a page for X business" — create a FULL multi-page website, NEVER a single landing page.**

```
❌ BANNED (for "website" requests):
- Creating index.html as the ONLY file
- Putting all content in one scrollable page
- Using anchor links (#about, #services) instead of separate routes
- No navigation between pages

✅ REQUIRED (minimum pages):
- Home (hero, value proposition, key sections)
- About (company story, team, mission)
- Services (detailed offerings with CTAs)
- Products/Portfolio (showcase work, case studies)
- Contact (form, map, phone, email, hours)
```

**The ONLY exception**: User EXPLICITLY says "landing page" or "one-page site".

Use the `design-system` skill for full page architecture, color palettes, and typography rules.

---

## ⚠️ MANDATORY RULE #3: ZERO EMOJIS + PROPER SPACING

**Professional websites NEVER use emojis. Sections NEVER touch each other.**

```
❌ BANNED:
- 🚀 🎯 💡 ✨ 🏆 emojis anywhere in website output (headings, buttons, nav, meta, content)
- Using emojis as section icons or bullet points
- Sections with less than 80px padding between them
- Footer directly touching the section above (no gap)
- More than 7 items in main navigation (saturated menu)

✅ REQUIRED:
- SVG icons from Lucide, Heroicons, or Phosphor (pick ONE, use consistently)
- Section spacing: minimum 80px top+bottom padding (use clamp for responsive)
- Footer spacing: minimum 128px top padding
- Navigation: max 7 top-level items, dropdowns for groups, secondary in footer
- Alternating section backgrounds (--color-bg / --color-surface)
```

### Service and Product Detail Pages

```
❌ BANNED:
- /services page with only a list (no individual detail pages)
- /products page with only cards (no individual detail pages)
- Generic 2-3 line descriptions per service or product

✅ REQUIRED:
- /services listing page → links to /services/web-design, /services/seo, etc.
- Each service detail: description, process, deliverables, pricing, FAQ, CTA
- /products listing page → links to /products/[slug] detail pages
- Each product detail: gallery, specs, pricing, reviews, related products
```

---

## ⚠️ MANDATORY RULE #4: TODO TRACKING + QUALITY GATES

**Every task MUST be tracked via TodoWrite. Every deliverable MUST pass quality checks.**

```
❌ BANNED:
- Completing a task without updating TodoWrite to status: "completed"
- Delivering code without running lint/syntax/type checks
- Skipping quality gates to "save time"
- Setting status: "completed" without verification evidence

✅ REQUIRED:
- Read current TodoWrite state before starting work
- Set task to status: "in_progress" when starting (include ALL tasks in the call)
- Run framework-specific quality checks BEFORE setting status: "completed"
- Set status: "completed" ONLY after all checks pass
- If checks fail, FIX issues then re-run checks before updating TodoWrite
- ALWAYS send the FULL todos array to TodoWrite (it replaces, not merges)
```

**TodoWrite API**:

```
TodoWrite({
  todos: [
    { id: "t1", content: "Task description", status: "pending" },
    { id: "t2", content: "Another task", status: "in_progress" },
    { id: "t3", content: "Completed task", status: "completed" }
  ]
})
```

**Status values**: `"pending"` (not started), `"in_progress"` (working), `"completed"` (done)

**CRITICAL**: Every TodoWrite call must include ALL tasks (not just changed ones). The tool REPLACES the entire array — it does not merge.

### Pre-Delivery Quality Gate (MANDATORY)

Before ANY task can be set to `status: "completed"`, the Code Quality Guard or the implementing agent MUST run the appropriate checks:

| Framework        | Syntax Check           | Lint                       | Type Check                     | Build/Test          |
| ---------------- | ---------------------- | -------------------------- | ------------------------------ | ------------------- |
| **Astro**        | `astro check`          | `eslint .`                 | `tsc --noEmit`                 | `astro build`       |
| **Next.js**      | `next lint`            | `eslint .`                 | `tsc --noEmit`                 | `next build`        |
| **TypeScript**   | `tsc --noEmit`         | `eslint .`                 | `tsc --strict`                 | `npm run build`     |
| **Flutter**      | `dart analyze`         | `dart analyze`             | `dart analyze`                 | `flutter build web` |
| **Laravel/PHP**  | `php -l app/**/*.php`  | `./vendor/bin/pint --test` | `./vendor/bin/phpstan analyse` | `php artisan test`  |
| **Supabase/SQL** | SQL syntax check       | Schema validation          | Migration check                | `supabase db lint`  |
| **React**        | `tsc --noEmit`         | `eslint .`                 | `tsc --noEmit`                 | `npm run build`     |
| **NestJS**       | `tsc --noEmit`         | `eslint .`                 | `tsc --strict`                 | `npm run build`     |
| **Python**       | `python -m py_compile` | `ruff check .`             | `mypy src/`                    | `pytest`            |
| **Rust**         | `cargo check`          | `cargo clippy`             | `cargo check`                  | `cargo test`        |
| **Go**           | `go vet`               | `golangci-lint`            | `go build`                     | `go test ./...`     |

**If the project has `package.json` scripts for these, use them instead.** Always read `package.json`, `pubspec.yaml`, `composer.json`, etc. first to discover the project's existing check commands.

---

## ⚠️ MANDATORY RULE #5: MCP REPORTING PROTOCOL

**Every agent MUST use MCP reporting tools for task progress. No silent work.**

```
❌ BANNED:
- Completing a task without calling report_completion
- Starting a task without calling report_progress
- Being stuck without calling report_blockage
- Making major decisions without calling log_event

✅ REQUIRED:
- report_progress when starting ANY task (progress_percent: 0)
- report_progress at key milestones (every 20-30% progress)
- report_completion when done (include files_changed + test_results)
- report_blockage when stuck (include reason + suggested_fix)
- log_event for all major decisions
```

### Task State Machine

| State         | Meaning         | Who Sets It       | When                   |
| ------------- | --------------- | ----------------- | ---------------------- |
| `pending`     | Not started     | Planner           | Initial plan creation  |
| `in_progress` | Working         | Agent             | report_progress call   |
| `blocked`     | Stuck           | Agent             | report_blockage call   |
| `completed`   | Done + verified | Agent + Commander | report_completion call |
| `failed`      | Cannot complete | Agent             | Terminal state         |

### State Transitions

```
pending ──→ in_progress ──→ completed
               │    ↑
               │    └── (unblocked)
               └──→ blocked
               └──→ failed (terminal)
```

### MCP Reporting Tools

| Tool                 | When to Use            | Required Fields                       |
| -------------------- | ---------------------- | ------------------------------------- |
| `report_progress`    | Starting + milestones  | taskId, agent, summary                |
| `report_completion`  | Task done + verified   | taskId, agent, summary, files_changed |
| `report_blockage`    | Stuck or blocked       | taskId, agent, reason                 |
| `log_event`          | Major decisions        | agent, event_type, description        |
| `check_dependencies` | Before parallel launch | tasks array with id + dependsOn       |
| `get_task_state`     | Check task status      | taskId (optional — returns all)       |

---

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

Each `/orchestrator` invocation creates a new isolated session. State is stored in session-specific directories under `.qwen-orchestrator/sessions/<session-id>/`.

**Shorthand**: `$SESSION_DIR` = `.qwen-orchestrator/sessions/$(cat .qwen-orchestrator/current-session)/`

Update `$SESSION_DIR/memory.md` at session end with:

- Current task, last completed step, next exact step
- Incomplete items and reasons
- Key decisions, rejected alternatives, known risks
- Files to open first in next session, in order

At next session start:

1. Read `.qwen-orchestrator/current-session` to find the active session ID
2. Open `$SESSION_DIR/memory.md`
3. Read the latest snapshot
4. Open files in the restore list, in order
5. Resume from the recorded next step

**Session Isolation Rules**:

- ALL state writes go to `$SESSION_DIR/` (never the flat `.qwen-orchestrator/` root)
- NEVER modify files from archived sessions
- NEVER delete session directories
- Previous sessions are IMMUTABLE after they end

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

## Agent Delegation & Subagent Monitoring

### Delegation Best Practices

When delegating work to subagents, follow these patterns:

#### 1. Use Agent Roster for Delegation

```
Commander → [Planner] → [Frontend Dev] → [Backend Dev] → [Reviewer]
              ↓                 ↓                 ↓
           [QA Engineer] → [DevOps Eng] → [Monitor]
```

#### 2. Delegate with Clear Context

```typescript
Agent({
  description: 'Implement user auth',
  prompt: `Implement user authentication for ${project}. 

Context:
- Project: ${project}
- Framework: ${framework}
- Requirements: [list requirements]
- Files to modify: [list files]
- Constraints: [list constraints]

Please implement and return a summary of changes.`,
  subagent_type: 'backend-developer',
});
```

#### 3. Monitor Subagent Progress

```typescript
// Commander can use SendMessage to check status
SendMessage({
  task_id: 'subagent-123',
  message: 'What is your current progress? Any blockers?',
});

// Use TaskStop to cancel stuck subagents
TaskStop({ task_id: 'subagent-stuck' });
```

### Subagent Status Tracking

#### Problem: Long-Running Subagents

Sometimes subagents run for hours and you can't see what they're doing.

#### Solutions:

**1. Use Monitor Tool for Long Processes**

```typescript
Monitor({
  command: 'npm run dev',
  description: 'Watch dev server output',
  max_events: 1000,
  idle_timeout_ms: 300000, // 5 minutes
});
```

**2. Use SendMessage for Status Updates**

```typescript
// Subagent sends status updates to parent
SendMessage({
  task_id: 'worker-auth',
  message: 'Starting authentication flow...',
});

SendMessage({
  task_id: 'worker-auth',
  message: 'Checking user credentials...',
});

SendMessage({
  task_id: 'worker-auth',
  message: 'Authentication successful!',
});
```

**3. Use CronCreate for Periodic Reports**

```typescript
// Schedule recurring status reports
CronCreate({
  cron: '*/15 * * * *', // Every 15 minutes
  prompt: 'Send a status update on your current task progress',
  recurring: true,
});
```

**4. Use TaskStop to Cancel Runaway Tasks**

```typescript
// Cancel a stuck subagent
TaskStop({
  task_id: 'worker-stuck',
});
```

### Monitor Agent Role

The `monitor` agent is the dedicated watchdog for detecting and breaking LLM loops:

**Loop Detection Patterns:**

| Pattern           | Description                        | Solution                             |
| ----------------- | ---------------------------------- | ------------------------------------ |
| Tool Call Loop    | Same tool call fails repeatedly    | SendMessage with fix suggestion      |
| Reasoning Loop    | Same approach tried multiple times | SendMessage with new approach        |
| Error-Bounce Loop | Fix doesn't resolve error          | SendMessage with different fix       |
| Context Loop      | No progress on understanding       | SendMessage with clarifying question |
| Apology Loop      | Repeated apologies without action  | SendMessage with clear task          |

**Monitor Agent Tools:**

- `SendMessage` - Break loops with escape routes
- `TaskStop` - Cancel runaway tasks
- `Monitor` - Watch long-running processes
- `CronCreate` - Schedule recurring checks

### Hooks vs Rules Configuration

**All new extensions should use HOOKS, not RULES.**

#### Hook Events Available

| Event                | Triggered When                  | Use Case                                  |
| -------------------- | ------------------------------- | ----------------------------------------- |
| `PreToolUse`         | Before tool execution           | Validate, modify, or block tool calls     |
| `PostToolUse`        | After successful tool execution | Log, transform, or enhance responses      |
| `PostToolUseFailure` | After tool execution fails      | Handle errors, retry, or fallback         |
| `UserPromptSubmit`   | After user submits prompt       | Process, analyze, or transform prompts    |
| `SessionStart`       | When session starts/resumes     | Initialize state, create directories      |
| `SessionEnd`         | When session ends               | Cleanup, save state, send notifications   |
| `Stop`               | Before Qwen concludes response  | Add final messages, save checkpoints      |
| `SubagentStart`      | When subagent starts            | Initialize subagent state, track progress |
| `SubagentStop`       | When subagent stops             | Cleanup, save results, notify parent      |
| `PreCompact`         | Before conversation compaction  | Save critical state, create checkpoints   |
| `PostCompact`        | After conversation compaction   | Restore state, recover context            |

#### Hook Configuration Location

**Hooks must be configured in `~/.qwen/settings.json`, NOT in `qwen-extension.json`.**

#### Windows Hook Configuration

On Windows, use `cmd.exe` with `/c` flag to avoid "\_R no se reconoce" error:

```json
{
  "hooks": {
    "session:start": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\session-handler.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "Session Handler",
            "description": "Initialize session directory structure"
          }
        ]
      }
    ]
  }
}
```

#### Hook Best Practices

- [ ] Always use `cmd.exe` on Windows
- [ ] Set timeouts to prevent hanging (default: 60s)
- [ ] Return valid JSON from all hooks
- [ ] Use async for non-blocking operations
- [ ] Log to session directory
- [ ] Validate hook outputs
- [ ] Test hooks manually before deployment

### Agent Delegation Checklist

Before delegating to a subagent:

- [ ] **Clear context**: Provide full context about the task
- [ ] **Specific instructions**: What exactly to implement/analyze
- [ ] **File ownership**: Which files to modify/create
- [ ] **Constraints**: Any limitations or requirements
- [ ] **Success criteria**: How to know when it's done
- [ ] **Status updates**: How to report progress (SendMessage)
- [ ] **Error handling**: What to do if stuck

### Agent Completion Checklist

Before declaring completion:

- [ ] All files changed and re-read
- [ ] Commands executed with observed results
- [ ] Side effects reviewed
- [ ] Artifacts synchronized
- [ ] Post-work audit completed
- [ ] Session memory updated
- [ ] Subagents reported completion
- [ ] Monitor agent confirmed no loops

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
