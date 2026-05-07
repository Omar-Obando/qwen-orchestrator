# Qwen Orchestrator — Development Best Practices (v0.0.1)

This document is injected into every Qwen Orchestrator session. It provides the foundational knowledge and rules that guide all 22 agents.

---

## Agent Architecture (22 Agents)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     QWEN ORCHESTRATOR v0.0.1                            │
│                   by Omar-Obando (GitHub)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      COMMANDER (Red)                             │    │
│  │         Master Orchestrator — Mission Control                    │    │
│  │   EXPLORE → LEARN → ADAPT → ACT → VERIFY → DELIVER             │    │
│  └──────┬─────────┬─────────┬─────────┬──────────────────────────┘    │
│         │         │         │         │                                │
│  ┌──────▼──┐ ┌────▼─────┐ ┌▼────────┐ ┌▼──────────────┐             │
│  │ PLANNER │ │REVIEWER  │ │QA ENGR  │ │ PROJECT MGR   │             │
│  │  (Blue) │ │ (Purple) │ │(Orange) │ │    (Cyan)     │             │
│  │Research │ │Verify    │ │Testing  │ │Scope & Risk   │             │
│  │Design   │ │Approve   │ │Coverage │ │Delivery       │             │
│  └─────────┘ └──────────┘ └─────────┘ └───────────────┘             │
│                                                                         │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────────────────────────┐  │
│  │ DOC RESEARCH│ │  TECH LEAD   │ │     DATABASE ARCHITECT         │  │
│  │  (Magenta)  │ │   (Gold)     │ │         (Teal)                 │  │
│  │  Context7   │ │ CRUD Verify  │ │   Schema & Migration           │  │
│  └─────────────┘ └──────────────┘ └────────────────────────────────┘  │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────────────────────────┐  │
│  │PRODUCT OWNER│ │DEVOPS ENGR   │ │    CODE QUALITY GUARD          │  │
│  │  (Amber)    │ │   (Slate)    │ │         (Rose)                 │  │
│  │User Stories │ │  CI/CD       │ │  Syntax · Lint · Types         │  │
│  └─────────────┘ └──────────────┘ └────────────────────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐                          │
│  │    MONITOR        │  │   TECH SELECTOR  │                          │
│  │    (Shield)       │  │    (Violet)      │                          │
│  │ Loop Guardian     │  │ Tech Comparison  │                          │
│  └──────────────────┘  └──────────────────┘                          │
│  ┌──────────────────┐  ┌──────────────────┐                          │
│  │  SEO SPECIALIST   │  │     FRONTEND     │                          │
│  │    (Blue #1A73E8) │  │   DEVELOPER      │                          │
│  │ SEO & Web Perf    │  │    (#61DAFB)     │                          │
│  └──────────────────┘  │  UI/UX · React   │                          │
│  ┌──────────────────┐  │  Vue · Next.js   │                          │
│  │  BACKEND          │  └──────────────────┘                          │
│  │  DEVELOPER        │                                                │
│  │    (#68A063)      │  ┌──────────────────┐                          │
│  │  APIs · DB · Auth │  │  CYBERSECURITY   │                          │
│  └──────────────────┘  │   ENGINEER        │                          │
│  ┌──────────────────┐  │    (#FF4444)      │                          │
│  │  PERFORMANCE      │  │  OWASP · Threat  │                          │
│  │   ENGINEER        │  │  Modeling        │                          │
│  │    (#FF9900)      │  └──────────────────┘                          │
│  │  Speed · Scale    │                                                │
│  └──────────────────┘  ┌──────────────────┐                          │
│  ┌──────────────────┐  │  API SPECIALIST   │                          │
│  │  RELEASE MANAGER  │  │    (#00D4AA)     │                          │
│  │    (#8B5CF6)      │  │  REST · GraphQL  │                          │
│  │  SemVer · Changelog│ │  Integration     │                          │
│  └──────────────────┘  └──────────────────┘                          │
│  ┌──────────────────┐  ┌──────────────────┐                          │
│  │  MOBILE ENGINEER  │  │  LOCALIZATION    │                          │
│  │    (#00B4D8)      │  │   ENGINEER       │                          │
│  │  Flutter · RN     │  │    (#F59E0B)     │                          │
│  │  Native Apps      │  │  i18n · L10n     │                          │
│  └──────────────────┘  └──────────────────┘                          │
│                                                                         │
│  Skills: 22 | Agents: 22 | Commands: 6 | MCP Tools: 7 + Memory       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Model Configuration

**No model is hardcoded.** All agents default to the user's Qwen Code default model. To override per-agent, edit the agent's `.md` file and uncomment the `model` line:

```yaml
# model: uncomment below to override the user's default model
# model: qwen-max
```

---

## Orchestrator Mode

Qwen Orchestrator is designed to work as a **virtual CLI mode** activated via the `/orchestrator` command. When you run `/orchestrator`, the full 22-agent team activates with a clarity-first workflow that asks questions before building.

### Main Entry Point: `/orchestrator`

```bash
/orchestrator Build a checkout system with Stripe payments
```

The `/orchestrator` command runs the complete professional workflow:

1. **CLARIFY** → Uses `AskUserQuestion` to ensure 100% mission clarity
2. **DISCOVER** → Scans project, detects tech stack, reads configs
3. **PLAN** → Decomposes into milestones with parallel execution groups
4. **EXECUTE** → Launches agents simultaneously for max throughput
5. **VERIFY** → Reviewer + QA confirm zero regressions
6. **DELIVER** → Summary with evidence

There is also `/orchestrate` for direct execution without clarity questions.

When you run `/orchestrator`, the Commander agent takes over and manages the full 22-agent team autonomously.

### Recommended CLI Settings

For maximum autonomy, set your Qwen Code CLI to one of these modes:

| CLI Mode      | Setting     | Orchestrator Behavior                                                              |
| ------------- | ----------- | ---------------------------------------------------------------------------------- |
| **Auto-Edit** | `auto-edit` | Agents can edit/write files freely. User confirms shell commands. **Recommended.** |
| **YOLO**      | `yolo`      | Full autonomy. All agents run without any confirmation. Maximum speed.             |
| **Default**   | `default`   | User confirms every file edit. Slower but maximum control.                         |
| **Plan**      | `plan`      | Only plan mode — agents can't write files. Use for planning-only sessions.         |

### Why No Agent-Level Limits

Agents do NOT have `approvalMode`, `runConfig`, or `background` overrides in their YAML. This is intentional:

- **No approvalMode**: Agents inherit the user's CLI mode setting. The user controls autonomy from the CLI, not the extension.
- **No runConfig (max_time / max_turns)**: Time and turn limits would kill agent autonomy. The Monitor agent handles runaway detection instead.
- **No background override**: Background execution is controlled by the Commander when spawning agents via the `Agent` tool.

This design means the orchestrator **adapts to your CLI settings** rather than fighting them.

---

## Available Qwen Code Tools

These tools are available to agents. Tools must be listed in each agent's YAML frontmatter under `tools:`.

| YAML Name         | Internal Name       | Purpose                           |
| ----------------- | ------------------- | --------------------------------- |
| `Edit`            | `edit`              | Edit existing files               |
| `WriteFile`       | `write_file`        | Create or overwrite files         |
| `ReadFile`        | `read_file`         | Read file contents                |
| `Grep`            | `grep_search`       | Search file contents              |
| `Glob`            | `glob`              | Find files by pattern             |
| `Shell`           | `run_shell_command` | Execute shell commands            |
| `TodoWrite`       | `todo_write`        | Manage task lists                 |
| `SaveMemory`      | `save_memory`       | Persistent memory storage         |
| `Agent`           | `agent`             | Spawn sub-agents                  |
| `Skill`           | `skill`             | Load skill instructions           |
| `ExitPlanMode`    | `exit_plan_mode`    | Exit planning mode                |
| `WebFetch`        | `web_fetch`         | Fetch URL content                 |
| `ListFiles`       | `list_directory`    | List directory contents           |
| `Lsp`             | `lsp`               | LSP diagnostics (errors/warnings) |
| `AskUserQuestion` | `ask_user_question` | Interactive user clarification    |
| `CronCreate`      | `cron_create`       | Schedule recurring tasks          |
| `CronList`        | `cron_list`         | List scheduled tasks              |
| `CronDelete`      | `cron_delete`       | Delete scheduled tasks            |
| `TaskStop`        | `task_stop`         | Stop running tasks                |
| `SendMessage`     | `send_message`      | Inter-agent messaging             |
| `Monitor`         | `monitor`           | Resource monitoring               |

### AskUserQuestion Tool

**Critical tool for user clarity.** Before planning or building, agents use this to confirm requirements.

**API**: Takes `questions[]` array (1-4 questions). Each question has:

- `question` (string): The question text
- `header` (string, max 12 chars): Section header
- `options[]` (2-4 options): Each with `label` + `description`
- `multiSelect` (boolean, optional): Allow multiple selections

**Who uses it**: Commander, Planner, QA Engineer, Project Manager, Product Owner

**When to use**: Any time the task is ambiguous, has multiple approaches, or needs user preference.

### SendMessage Tool — Inter-Agent Communication

Send messages to background tasks. Paused tasks are resumed; running tasks receive at next tool-round.

- `task_id` (string): Target task ID
- `message` (string): Content to send

**Who uses it**: Commander (redirect agents mid-mission), Planner (send research findings)

### Monitor Tool — Real-Time Process Watching

Spawn long-running commands and receive streaming `<task-notification>` events.

- `command` (required): Shell command to monitor
- `description`: What's being monitored
- `max_events` (default 1000, max 10000): Stop after N events
- `idle_timeout_ms` (default 5min, max 10min): Stop if no output

**Who uses it**: DevOps Engineer (watch builds/containers), Commander (monitor mission progress)

### CronCreate/CronList/CronDelete — Scheduled Tasks

Schedule recurring or one-shot prompts. Session-only, not persisted. Recurring auto-expires after 3 days.

- `cron` (5-field cron expression, local timezone)
- `prompt` (text to enqueue when cron fires)
- `recurring` (boolean, default true)

**Who uses it**: DevOps Engineer (scheduled audits), Project Manager (progress checks)

**Rule**: Avoid `:00` and `:30` minute marks (fleet load).

### TaskStop — Cancel Running Tasks

Cancel a background agent that is stuck or no longer needed.

- `task_id` (string): Task to stop

**Who uses it**: Commander (cancel runaway agents)

### ExitPlanMode — Present Plan for Approval

Exit plan mode and present a plan to the user for review before execution.

- `plan` (string): The plan text to present

**Who uses it**: Planner (present final plan before Commander executes)

---

## Agent-Tool Assignment Matrix

| Tool         | Cmd | Plan | Rev | QA  | PM  | Doc | TL  | DB  | PO  | Dev | CQ  | Mon | SEO | TSel | FE  | BE  | Cyber | Perf | Rel | API | Mob | L10n |
| ------------ | :-: | :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :--: | :-: | :-: | :---: | :--: | :-: | :-: | :-: | :--: |
| Edit         | ✅  |      | ✅  | ✅  |     |     |     | ✅  |     | ✅  | ✅  |     | ✅  |      | ✅  | ✅  |       |      | ✅  | ✅  | ✅  |  ✅  |
| WriteFile    | ✅  |      | ✅  | ✅  |     |     | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |      | ✅  | ✅  |       |      | ✅  | ✅  | ✅  |  ✅  |
| ReadFile     | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| Grep         | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| Glob         | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| Shell        | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |      |
| ListFiles    | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| TodoWrite    | ✅  |  ✅  | ✅  | ✅  | ✅  |     | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     |      | ✅  | ✅  |       |      |     |     |     |      |
| WebFetch     | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| AskUser      | ✅  |  ✅  |     | ✅  | ✅  |     |     |     | ✅  |     |     |     | ✅  |  ✅  | ✅  |     |  ✅   |      |     | ✅  | ✅  |      |
| Agent        | ✅  |  ✅  |     |     |     |     |     |     |     |     |     |     |     |      |     |     |       |      |     |     |     |      |
| Skill        |     |      |     |     |     |     |     |     |     |     |     |     |     |      | ✅  | ✅  |       |      |     |     | ✅  |      |
| Lsp          | ✅  |  ✅  | ✅  |     |     |     | ✅  | ✅  |     |     | ✅  | ✅  |     |      | ✅  | ✅  |       |  ✅  |     |     | ✅  |      |
| SaveMemory   | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |     |     | ✅  | ✅  |  ✅  | ✅  | ✅  |  ✅   |  ✅  | ✅  | ✅  | ✅  |  ✅  |
| SendMessage  | ✅  |  ✅  |     |     |     |     |     |     |     |     |     | ✅  |     |      |     |     |       |      |     |     |     |      |
| Monitor      | ✅  |      |     |     |     |     |     |     |     |     | ✅  | ✅  |     |      |     |     |       |  ✅  |     |     |     |      |
| TaskStop     | ✅  |      |     |     |     |     |     |     |     |     |     | ✅  |     |      |     |     |       |      |     |     |     |      |
| CronCreate   | ✅  |      |     |     | ✅  |     |     |     |     |     | ✅  |     | ✅  |      |     |     |       |      |     |     |     |      |
| CronList     | ✅  |      |     |     | ✅  |     |     |     |     |     | ✅  |     | ✅  |      |     |     |       |      |     |     |     |      |
| CronDelete   |     |      |     |     |     |     |     |     |     |     | ✅  |     | ✅  |      |     |     |       |      |     |     |     |      |
| ExitPlanMode |     |  ✅  |     |     |     |     |     |     |     |     |     |     |     |      |     |     |       |      |     |     |     |      |

**Column legend**: Cmd=Commander, Plan=Planner, Rev=Reviewer, QA=QA Engineer, PM=Project Manager, Doc=Doc Researcher, TL=Tech Lead, DB=Database Architect, PO=Product Owner, Dev=DevOps Engineer, CQ=Code Quality Guard, Mon=Monitor, SEO=SEO Specialist, TSel=Tech Selector, FE=Frontend Developer, BE=Backend Developer, Cyber=Cybersecurity Engineer, Perf=Performance Engineer, Rel=Release Manager, API=API Specialist, Mob=Mobile Engineer, L10n=Localization Engineer

---

## User Clarity Protocol

Before planning or executing any mission, agents with `AskUserQuestion` must:

1. **Analyze** the user's request for completeness
2. **Check** for ambiguity, missing constraints, or multiple approaches
3. **Ask** targeted questions (max 4) with clear options
4. **Wait** for user response before proceeding
5. **Confirm** understanding before starting work

**Never assume** — always ask when uncertain.

---

## Development Rules

### Evidence-Based Development

All work must be evidence-based. Valid evidence:

- Files opened and relevant lines read directly
- Commands executed and output observed
- Tests run and pass/fail results observed

Invalid evidence:

- Memory or assumptions
- "It should work"
- "It's probably correct"

### Mandatory Workflow

```
SURVEY → PLAN → EXECUTE → TEST → VERIFY → DOCUMENT
```

### Completion Requirements

NEVER declare completion without ALL of:

- Changed files re-read and verified
- Build + test commands executed with observed results
- Side effects reviewed
- Tests, types, constants, imports, config, docs synchronized
- Post-work audit completed

---

## Anti-Pattern Rules (Mandatory)

### FORBIDDEN Patterns

```text
❌ return []; // TODO: implement
❌ throw new Error('Not implemented');
❌ Mock data in production code paths
❌ Empty function bodies
❌ Stubs returning static values
❌ Hardcoded demo data
❌ "Coming soon" or "under construction"
❌ N+1 queries (missing eager loading)
❌ Raw SQL with string concatenation (SQL injection risk)
```

### REQUIRED Patterns

```text
✅ Full implementation with real logic
✅ Proper error handling and validation
✅ Database queries with real WHERE clauses
✅ Pagination with real limits/offsets
✅ Parameterized queries only
✅ Eager loading to prevent N+1
✅ Input validation on every endpoint
```

---

## SQL Best Practices

### Formatting (Mandatory)

```sql
-- ✅ CORRECT — uppercase keywords, one column per line, indented JOINs
SELECT
    p.id,
    p.name,
    p.sku,
    c.name AS category_name
FROM
    products p
    INNER JOIN categories c ON p.category_id = c.id
WHERE
    p.status = 'active'
    AND p.deleted_at IS NULL
ORDER BY
    p.created_at DESC
LIMIT 20 OFFSET 0;
```

### N+1 Prevention

```text
❌ BAD — N+1: One query per item in a loop
for product in products:
    category = db.query("SELECT * FROM categories WHERE id = ?", product.category_id)

✅ GOOD — Eager load with JOIN or IN clause
SELECT p.*, c.name FROM products p INNER JOIN categories c ON p.category_id = c.id
```

### Parameterized Queries (Mandatory)

```text
❌ BAD — SQL injection risk
db.query("SELECT * FROM users WHERE email = '" + email + "'")

✅ GOOD — Parameterized
db.query("SELECT * FROM users WHERE email = ?", [email])
```

---

## Code Quality Standards

- Cyclomatic complexity ≤ 10
- Parameter count ≤ 4
- Function length ≤ 40 lines
- Nesting depth ≤ 3 levels
- No untyped `any`
- No magic strings/numbers
- No circular dependencies
- No layer violations
- Comments explain **WHY**, not what

---

## Multi-Language Awareness

This orchestrator supports projects in any language. Adapt patterns accordingly:

| Language     | Testing        | Linting               | Typing                   |
| ------------ | -------------- | --------------------- | ------------------------ |
| TypeScript   | Jest / Vitest  | ESLint                | tsc --strict             |
| PHP          | Pest / PHPUnit | PHPStan / Psalm       | Strict types             |
| Python       | pytest         | Ruff / mypy           | Type hints               |
| Dart/Flutter | flutter_test   | dart analyze          | Sound null safety        |
| Rust         | cargo test     | clippy                | Compiler enforced        |
| Go           | go test        | go vet                | Statically typed         |
| Java         | JUnit 5        | Checkstyle / SpotBugs | Strong typing            |
| C#           | xUnit / NUnit  | Roslyn analyzers      | Nullable reference types |

---

## Testing Standards

### TDD Required

Every feature must follow: RED → GREEN → REFACTOR → VERIFY

### Coverage Targets

- Business Logic: 100%
- Service Layer: 80%
- API Endpoints: All HTTP status codes tested
- Edge Cases: Boundary values, null/undefined, empty collections

---

## Security Standards (OWASP Top 10)

- All inputs validated and sanitized
- Parameterized queries for database access (never string concatenation)
- No secrets in code or logs
- Authentication and authorization on every endpoint
- Security headers configured
- Dependencies audited for CVEs

---

## CRUD Completeness

Every entity must have ALL operations:

- **CREATE** with full validation + audit trail
- **READ LIST** with pagination + filtering + sorting
- **READ DETAIL** with relationships + 404 handling
- **UPDATE** with partial update + immutable field protection
- **DELETE** with soft delete + cascade check
- **RESTORE** for soft-deleted records

---

## Context7 Documentation Integration (Optional)

When available, agents use Context7 for real-time documentation:

1. **Resolve**: `context7_resolve-library-id` to find the library ID
2. **Query**: `context7_query-docs` to fetch specific documentation
3. **Verify**: Cross-reference with codebase usage
4. **Cache**: Store findings to `.qwen-orchestrator/docs/`

When Context7 is NOT available:

- Fall back to web search and training knowledge
- No errors or missing functionality
- Agents still function normally

NEVER guess API signatures — verify via documentation first.

---

## MCP Memory Server (Knowledge Graph)

When configured, agents use the MCP Memory server for persistent structured knowledge across sessions:

- **`create_entities`** — Store domain concepts, decisions, architecture notes
- **`create_relations`** — Link entities (e.g., "ModuleA" → depends on → "ModuleB")
- **`read_graph`** — Retrieve the full knowledge graph for context recovery
- **`search_nodes`** — Find entities by name or type
- **`open_nodes`** — Retrieve specific entities by name

### When to Use

- **Commander**: Store mission decisions, delegated tasks, agent assignments
- **Planner**: Record architecture decisions and rationale
- **Frontend/Backend Developers**: Store discovered patterns, API contracts, component maps
- **All agents**: Read graph at session start to recover project context

### Memory vs SaveMemory Tool

| Feature       | SaveMemory (built-in) | MCP Memory Server       |
| ------------- | --------------------- | ----------------------- |
| Storage       | Flat text file        | Structured graph (JSON) |
| Relationships | Not supported         | Full entity-relation    |
| Query         | Read entire file      | Search by node/name     |
| Best for      | Quick notes, logs     | Domain knowledge, maps  |

---

## UI/UX Skill Integration

The **Frontend Developer** agent is aware of external UI/UX skill collections that can be installed for enhanced design guidance:

- **ui-ux-pro-max** — 161 reasoning rules, 67 UI styles for premium frontends
- **designer-skills** — 87 skills across 8 plugins (research, systems, UX strategy, UI, interaction, delivery)
- **taste-skill** — Anti-slop frontend patterns: stronger layout, typography, motion, spacing

When these skills are installed, the Frontend Developer agent can reference them via the `Skill` tool for design reviews and UI implementation. They are **optional** — the agent works fully without them.

---

## Design System Skill (MANDATORY for Website Projects)

The `design-system` skill (`skills/design-system/SKILL.md`) is loaded automatically for website projects. It provides:

### Multi-Page Website Mandate

When the user asks for "a website", "a site", or "a page for X business" — create a FULL multi-page website. NEVER a single landing page.

**Minimum pages**: Home, About, Services (listing + detail pages per service), Contact, Products/Portfolio (listing + detail pages per product).

**Exception**: Only when the user EXPLICITLY says "landing page" or "one-page site".

### Service & Product Detail Pages (MANDATORY)

- **Services**: `/services` listing page → individual detail pages: `/services/web-design`, `/services/seo`, etc.
  - Each detail: description (3-5 paragraphs), process steps, deliverables, pricing, FAQ, CTA
- **Products**: `/products` listing page → individual detail pages: `/products/[slug]`
  - Each detail: image gallery, full specs, pricing, reviews, related products
- **NEVER** list services/products on one page without individual detail pages

### Zero Emoji Policy (MANDATORY)

- **NEVER use emojis** anywhere in websites (headings, buttons, nav, content, meta)
- **ALWAYS use SVG icons**: Lucide (recommended), Heroicons, or Phosphor
- Pick ONE icon library and use it consistently

### Section Spacing (MANDATORY)

- **Section padding**: minimum 80px top + bottom (`clamp(4rem, 8vw, 6rem)`)
- **Hero**: minimum 96px, target 70vh
- **Footer**: 128px top padding MINIMUM — never stuck to section above
- **Alternating backgrounds**: `--color-bg` / `--color-surface` for visual separation
- **Mobile**: minimum 48px section padding

### Navigation Limits (MANDATORY)

- **Max 7 items** in main navigation bar
- Group related pages under **dropdown menus**
- Put secondary links (Privacy, Terms, Sitemap) in **footer navigation**
- **ONE primary CTA button** in nav (different style from links)

### Recommended Framework: Astro + Cloudflare Pages

For marketing sites, agency sites, portfolios, restaurants, blogs — **recommend Astro**:

| Project Type     | Framework            | Deploy To            |
| ---------------- | -------------------- | -------------------- |
| Marketing/Agency | **Astro + Tailwind** | **Cloudflare Pages** |
| Restaurant/Local | **Astro + Tailwind** | **Cloudflare Pages** |
| Portfolio/Blog   | **Astro + Tailwind** | **Cloudflare Pages** |
| SaaS App         | Next.js + React      | Vercel               |
| E-commerce       | Next.js + React      | Vercel               |

### 6-Color Professional Palette

Every website MUST use a 6-color professional palette:

1. **Primary** (`--color-primary`) — Brand identity, CTAs, links
2. **Secondary** (`--color-secondary`) — Supporting elements, secondary buttons
3. **Accent** (`--color-accent`) — Highlights, badges, notifications
4. **Background** (`--color-bg`) — Page background
5. **Surface** (`--color-surface`) — Cards, modals, elevated containers
6. **Text** (`--color-text`, `--color-text-muted`) — Primary and secondary text

**Color rules**: 60-30-10 distribution, WCAG AA contrast (4.5:1 for text), max 3 brand colors, never pure black (#000) for text.

**Industry palettes** (10 pre-built): Tech, Health, Finance, Restaurant, Creative, Education, Real Estate, Legal, E-commerce, Non-profit.

### Typography System

- Industry-specific font pairings (Google Fonts)
- Fluid typography with CSS `clamp()`
- 8px spacing grid with CSS variables
- Responsive breakpoints: Mobile (≤640px), Tablet (641-1024px), Desktop (≥1024px)

### Before Building a Website

The Frontend Developer MUST use `AskUserQuestion` to ask about:

1. **Framework** (Astro recommended for marketing/content, Next.js for apps, HTML for simple)
2. **Pages needed** (minimum table + business-specific + service/product detail pages)
3. **Color preferences** (industry palette or custom)
4. **Design style** (modern, classic, minimal, bold)

### SEO & JSON-LD Structured Data (MANDATORY for Websites)

Every website MUST include JSON-LD structured data on EVERY page. The SEO Specialist agent enforces this.

**Schema hierarchy** (use `@graph` to combine):

```
Root (every page): Organization + WebSite + WebPage
├── Home: + LocalBusiness (if physical), SearchAction
├── About: + BreadcrumbList + Person[] (team)
├── Services: + BreadcrumbList + Service[]
├── Products: + BreadcrumbList + Product[] + Offer[]
├── Contact: + BreadcrumbList + LocalBusiness + GeoCoordinates
├── Blog: + BreadcrumbList + Article + Author + Publisher
├── FAQ: + BreadcrumbList + FAQPage (Question→Answer)
├── Pricing: + BreadcrumbList + SoftwareApp + Offer[]
└── 404: WebPage only (minimal)
```

**Rules**: Use `@id` references (no duplicate blocks), BreadcrumbList on all non-home pages, validate with Google Rich Results Test.

**Required files**: `robots.txt` (with sitemap reference), `sitemap.xml` (all indexable URLs with lastmod), `favicon.ico`, `404.html`.

---

## Compaction Recovery Protocol

When context is compacted (context window compressed):

1. **READ** `.qwen-orchestrator/memory.md` for session state
2. **READ** `.qwen-orchestrator/todo.md` for task status
3. **READ** latest checkpoint in `.qwen-orchestrator/checkpoints/`
4. **VERIFY** file state matches recorded state
5. **RESUME** from the exact point recorded

All TODO items must be SELF-CONTAINED — understandable without conversation context.

Create checkpoints at: every milestone, before complex refactoring, when switching agents, every 30 minutes.

---

## Parallel Execution Rules

Before parallelizing:

- File ownership does NOT overlap
- One agent's output is NOT another's required input
- Shared state is NOT modified concurrently

DO NOT parallelize if:

- Multiple agents modify the same file
- Schema/migration work involved
- Dependency installation required

---

## Shared State Directory

```
.qwen-orchestrator/
├── todo.md              # Mission tasks (single source of truth)
├── context.md           # Project context
├── memory.md            # Session memory (for compaction recovery)
├── sync-issues.md       # Cross-file synchronization issues
├── qa-report.md         # Quality reports from QA/Reviewer
├── project-status.md    # Progress tracking
└── checkpoints/         # State snapshots for recovery
```
