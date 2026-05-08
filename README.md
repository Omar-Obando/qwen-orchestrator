# Qwen Orchestrator — Multi-Agent AI Development Team for Qwen Code

**[English](README.md)** · **[Español](docs/README.es.md)** · **[中文](docs/README.zh.md)** · **[日本語](docs/README.ja.md)** · **[한국어](docs/README.ko.md)** · **[Português](docs/README.pt.md)** · **[Français](docs/README.fr.md)** · **[العربية](docs/README.ar.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version: 0.0.2](https://img.shields.io/badge/version-0.0.2-green.svg)](package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 22](https://img.shields.io/badge/agents-22-blue.svg)](#agent-team-22-specialized-agents)
[![Skills: 26](https://img.shields.io/badge/skills-26-purple.svg)](#skills-26-professional-skills)

> 🤖 **The enterprise-grade multi-agent AI orchestration extension exclusively for [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**
>
> Turn your AI coding assistant into a full **software development department** — with 22 specialized agents, 26 professional skills, 6 slash commands, persistent memory, and MCP tool integration.
>
> **Author:** [Omar-Obando](https://github.com/Omar-Obando) · **License:** MIT · **Version:** 0.0.2

---

## ⚡ What is Qwen Orchestrator?

**Qwen Orchestrator** is a powerful extension built exclusively for **[Qwen Code](https://github.com/QwenLM/qwen-code)** — the open-source AI coding CLI by Alibaba. It transforms a single AI coding assistant into a **coordinated team of 22 specialized AI agents** that work together like a professional software development department.

### Why Qwen Orchestrator?

Imagine having an entire engineering team at your fingertips: a **Commander** that orchestrates, a **Planner** that architects, **Frontend and Backend Developers** that code in parallel, a **Reviewer** that gatekeeps quality, a **QA Engineer** that tests, a **Cybersecurity Engineer** that audits vulnerabilities, a **DevOps Engineer** that deploys — and 14 more specialists, all coordinated automatically.

**No other AI coding extension provides this level of professional multi-agent orchestration.**

### Built Exclusively For

<table>
<tr>
<td width="80" align="center">

![Qwen Code](https://img.shields.io/badge/Qwen%20Code-CLI-orange?style=for-the-badge)

</td>
<td>

**[Qwen Code](https://github.com/QwenLM/qwen-code)** by [QwenLM / Alibaba](https://github.com/QwenLM) — The open-source AI-powered coding assistant CLI that supports multiple LLM providers (Qwen, DeepSeek, OpenAI, Anthropic, local models). Qwen Orchestrator is a **community-built extension** and is not affiliated with or endorsed by Alibaba.

</td>
</tr>
</table>

> ⚠️ **This extension ONLY works with [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**. It is NOT a standalone tool, NOT a VS Code extension, and NOT compatible with other AI coding assistants. If you don't have Qwen Code installed, [install it first](https://github.com/QwenLM/qwen-code#installation).
>
> ⚠️ **IDE Compatibility Notice**: This extension has NOT been tested with Visual Studio, VS Code extensions, JetBrains IDEs, or any integrations outside of the Qwen Code CLI. It is designed exclusively for the Qwen Code terminal/CLI experience. Community testing and feedback on other integrations is welcome.

---

## 🎯 Overview

Qwen Orchestrator transforms Qwen Code into a **professional IT department** with **22 specialized AI agents**, **23 expert skills**, **6 slash commands**, **persistent memory (Knowledge Graph)**, and an **MCP tools server**. Every feature is delivered tested, reviewed, and complete — **no mockups, no placeholders, no unfinished CRUD operations**.

### Key Guarantees

| Guarantee                   | How It's Enforced                                                              |
| --------------------------- | ------------------------------------------------------------------------------ |
| **No mockups/placeholders** | Agents are forbidden from writing stubs; anti-pattern skill detects violations |
| **No model lock-in**        | All agents default to user's model; override per-agent is optional             |
| **Loop protection**         | Monitor agent detects and breaks LLM loops automatically                       |
| **N+1 prevention**          | SQL best-practices skill + Database Architect agent enforce eager loading      |
| **SQL formatting**          | Uppercase keywords, one column per line, indented JOINs — enforced by skill    |
| **Security first**          | OWASP Top 10 compliance via security-audit skill and Reviewer agent            |
| **CRUD completeness**       | Tech Lead verifies every entity has Create/Read/Update/Delete/Restore          |
| **Multi-language**          | Supports TypeScript, PHP, Python, Dart, Rust, Go, Java, C# — not just TS       |
| **Context7 optional**       | Works without Context7; with it, agents get real-time documentation lookup     |
| **Compaction recovery**     | State persists to `.qwen-orchestrator/` — survives context window compression  |

### 🌟 Highlights

- **22 Specialized Agents** — From Commander to Localization Engineer, each with dedicated tools and expertise
- **23 Professional Skills** — TDD workflow, security audit, anti-pattern detection, design system, website redesign, SQL best practices, and 18 more
- **6 Slash Commands** — `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`
- **Ask Before Building** — Agents ask clarifying questions via `AskUserQuestion` before starting work
- **Website Redesign** — Redesign existing sites from URL (WebFetch) or screenshot (vision models)
- **Persistent Memory** — Knowledge Graph via MCP Memory Server stores decisions across sessions
- **Zero Model Lock-In** — Works with Qwen, DeepSeek, OpenAI, Anthropic, or any local model
- **Multi-Language Support** — Not TypeScript-only: PHP (Laravel), Python (Django), Dart (Flutter), Rust, Go, Java, C#
- **Framework Skills** — Built-in skills for Flutter Web, Laravel, NestJS, and Supabase
- **Loop Protection** — Monitor agent detects and breaks LLM infinite loops automatically
- **Inter-Agent Messaging** — Commander sends instructions to background agents mid-task via SendMessage
- **Scheduled Tasks** — CronCreate for recurring quality audits, health checks, and progress reports
- **Real-Time Monitoring** — Watch builds, containers, and logs via the Monitor tool
- **UI/UX Integration** — Frontend Developer can leverage UI UX Pro Max, Designer Skills, and Taste Skill

---

## 📊 Quick Stats

| Metric              | Count | Details                                                                                                                                                                                                                                                                                            |
| ------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agents**          | 22    | Commander, Planner, Frontend Dev, Backend Dev, Reviewer, QA, PM, Doc Researcher, Tech Lead, DB Architect, Product Owner, DevOps, Code Quality Guard, Monitor, SEO Specialist, Tech Selector, Cybersecurity Eng., Performance Eng., Release Manager, API Specialist, Mobile Eng., Localization Eng. |
| **Skills**          | 23    | Design system, website redesign, code review, TDD, security audit, performance, debugging, deployment, Context7 docs, domain-driven, API design, refactoring, compaction recovery, git workflow, database design, anti-pattern, multi-language, SQL, Flutter Web, Laravel, NestJS, Supabase        |
| **Commands**        | 6     | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`                                                                                                                                                                                                                            |
| **MCP Tools**       | 7     | Mission status, project validation, TODO generation, agent roster, Context7 resolve, CRUD check, checkpoint                                                                                                                                                                                        |
| **MCP Servers**     | 2     | Orchestrator tools + Memory Knowledge Graph                                                                                                                                                                                                                                                        |
| **Languages**       | 8+    | TypeScript, PHP, Python, Dart, Rust, Go, Java, C#                                                                                                                                                                                                                                                  |
| **Qwen Code Tools** | 21    | Full tool suite — Edit, WriteFile, ReadFile, Grep, Glob, Shell, AskUserQuestion, Agent, Skill, SendMessage, Monitor, CronCreate, ExitPlanMode, and more                                                                                                                                            |

### Key Guarantees

| Guarantee                   | How It's Enforced                                                              |
| --------------------------- | ------------------------------------------------------------------------------ |
| **No mockups/placeholders** | Agents are forbidden from writing stubs; anti-pattern skill detects violations |
| **No model lock-in**        | All agents default to user's model; override per-agent is optional             |
| **Loop protection**         | Monitor agent detects and breaks LLM loops automatically                       |
| **N+1 prevention**          | SQL best-practices skill + Database Architect agent enforce eager loading      |
| **SQL formatting**          | Uppercase keywords, one column per line, indented JOINs — enforced by skill    |
| **Security first**          | OWASP Top 10 compliance via security-audit skill and Reviewer agent            |
| **CRUD completeness**       | Tech Lead verifies every entity has Create/Read/Update/Delete/Restore          |
| **Multi-language**          | Supports TypeScript, PHP, Python, Dart, Rust, Go, Java, C# — not just TS       |
| **Context7 optional**       | Works without Context7; with it, agents get real-time documentation lookup     |
| **Compaction recovery**     | State persists to `.qwen-orchestrator/` — survives context window compression  |

---

## Architecture

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    QWEN ORCHESTRATOR v0.0.1                            ║
║                     by Omar-Obando (GitHub)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  ┌─────────────────────────────────────────────────────────────────┐   ║
║  │                      COMMANDER 🔴                               │   ║
║  │       "I orchestrate. I never stop until done."                 │   ║
║  │    EXPLORE → LEARN → ADAPT → ACT → VERIFY → DELIVER            │   ║
║  └──────┬─────────┬─────────┬─────────┬────────────────────────────┘   ║
║         │         │         │         │                                 ║
║  ┌──────▼──┐ ┌────▼──────┐ ┌▼────────┐ ┌▼──────────────┐              ║
║  │ PLANNER │ │FE DEV+BE  │ │REVIEWER │ │ QA ENGINEER   │              ║
║  │  🔵     │ │   🟢🟠    │ │  🟣     │ │    🟠         │              ║
║  │Research │ │ TDD Code  │ │Gatekeep │ │Test Strategy  │              ║
║  │Design   │ │ Deliver   │ │Approve  │ │Coverage       │              ║
║  └─────────┘ └───────────┘ └─────────┘ └───────────────┘              ║
║         │         │         │         │                                 ║
║  ┌──────▼─────────▼─────────▼─────────▼──────────────────────────┐    ║
║  │               PROJECT MANAGER 🔵                               │    ║
║  │         Scope · Risk · Progress · Delivery                     │    ║
║  └────────────────────────────────────────────────────────────────┘    ║
║                                                                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────────────┐    ║
║  │DOC RESEARCHER│ │  TECH LEAD   │ │    DATABASE ARCHITECT       │    ║
║  │  🟣 Magenta  │ │  🟡 Gold    │ │       🟢 Teal              │    ║
║  │ Context7     │ │ CRUD Verify │ │   Schema & Migration        │    ║
║  └──────────────┘ └──────────────┘ └─────────────────────────────┘    ║
║                                                                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────────────┐    ║
║  │PRODUCT OWNER │ │DEVOPS ENGINEER│ │   CODE QUALITY GUARD      │    ║
║  │  🟡 Amber    │ │  🔘 Slate    │ │       🌹 Rose             │    ║
║  │User Stories  │ │  CI/CD       │ │  Syntax · Lint · Types    │    ║
║  └──────────────┘ └──────────────┘ └─────────────────────────────┘    ║
║                                                                        ║
║  Skills: 22 | Agents: 22 | Commands: 6 | MCP Tools: 7 | Languages: 8+           ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## Agent Team (22 Specialized Agents)

| #   | Agent                  | Color      | Role                    | Superpower                                  |
| --- | ---------------------- | ---------- | ----------------------- | ------------------------------------------- |
| 1   | **Commander**          | 🔴 Red     | Master Orchestrator     | Parallel delegation, relentless execution   |
| 2   | **Planner**            | 🔵 Blue    | Research & Architecture | File-level planning, design decisions       |
| 3   | **Frontend Developer** | 🔵 Cyan    | UI/UX Implementation    | Components, responsive, accessible, fast    |
| 4   | **Backend Developer**  | 🟢 Green   | Server-Side Logic       | APIs, auth, caching, database ops           |
| 5   | **Reviewer**           | 🟣 Purple  | Quality Gatekeeper      | ONLY agent that can approve tasks           |
| 6   | **QA Engineer**        | 🟠 Orange  | Quality Assurance       | Test strategy, edge case discovery          |
| 7   | **Project Manager**    | 🔵 Cyan    | Delivery Management     | Scope control, risk assessment              |
| 8   | **Doc Researcher**     | 🟣 Magenta | Context7 Knowledge      | Live doc lookup, anti-hallucination         |
| 9   | **Tech Lead**          | 🟡 Gold    | Standards & Guidance    | Module completeness, CRUD verification      |
| 10  | **Database Architect** | 🟢 Teal    | Data Layer Specialist   | Schema design, migration safety             |
| 11  | **Product Owner**      | 🟡 Amber   | Business Value          | User stories, acceptance criteria           |
| 12  | **DevOps Engineer**    | 🔘 Slate   | Infrastructure          | CI/CD, Docker, deployment automation        |
| 13  | **Code Quality Guard** | 🌹 Rose    | Quality Sentinel        | Syntax check, lint, typecheck               |
| 14  | **Monitor**            | 🛡️ Shield  | Loop Guardian           | Detect/break LLM loops, runtime watchdog    |
| 15  | **SEO Specialist**     | 🔵 Blue    | SEO & Web Performance   | Meta tags, structured data, Core Web Vitals |
| 16  | **Tech Selector**      | 🟣 Violet  | Technology Advisor      | Framework/DB selection with pros/cons       |
| 17  | **Cybersecurity Eng.** | 🔴 Crimson | Application Security    | OWASP, threat modeling, dependency audit    |
| 18  | **Performance Eng.**   | ⚡ Amber   | Speed & Scale           | Profiling, query optimization, load testing |
| 19  | **Release Manager**    | 🏷️ Indigo  | Release & Versioning    | SemVer, changelogs, rollback planning       |
| 20  | **API Specialist**     | 🔗 Teal    | API & Integration       | REST/GraphQL, versioning, third-party APIs  |
| 21  | **Mobile Engineer**    | 📱 Sky     | Mobile Apps             | Flutter, React Native, offline-first        |
| 22  | **Localization Eng.**  | 🌐 Lime    | i18n/L10n               | Multi-language, RTL, cultural adaptation    |

---

## Skills (23 Professional Skills)

| #   | Skill                   | Purpose                                                                                |
| --- | ----------------------- | -------------------------------------------------------------------------------------- |
| 1   | **Code Review**         | OWASP + SOLID + Clean Code systematic review                                           |
| 2   | **Architect**           | Architecture design with ADR records                                                   |
| 3   | **TDD Workflow**        | Test-Driven Development (Red/Green/Refactor)                                           |
| 4   | **Security Audit**      | OWASP Top 10 vulnerability detection                                                   |
| 5   | **Performance**         | Profiling, optimization, benchmarks                                                    |
| 6   | **Debugging**           | Systematic investigation methodology                                                   |
| 7   | **Deployment**          | CI/CD, Docker, release management                                                      |
| 8   | **Context7 Docs**       | Optional — live documentation lookup via Context7 MCP                                  |
| 9   | **Domain-Driven**       | Complete business module builder — sub-modules, CRUD, no mockups                       |
| 10  | **API Design**          | RESTful standards, response envelopes, pagination                                      |
| 11  | **Refactoring**         | Safe behavior-preserving code transformations                                          |
| 12  | **Compaction Recovery** | Context preservation across session compaction                                         |
| 13  | **Git Workflow**        | Branching strategies, commit conventions, PR templates                                 |
| 14  | **Database Design**     | Schema design, indexing, migration safety                                              |
| 15  | **Anti-Pattern**        | Bans mockups, placeholders, N+1 queries, dead code                                     |
| 16  | **Multi-Language**      | 8+ languages: TS, PHP, Python, Dart, Rust, Go, Java, C#                                |
| 17  | **SQL Best Practices**  | Indentation, N+1 prevention, parameterized queries                                     |
| 18  | **Design System**       | Multi-page architecture, color palettes, typography, spacing, Astro + Cloudflare Pages |
| 19  | **Website Redesign**    | Redesign from URL (WebFetch) or screenshot (vision models), full analysis workflow     |
| 20  | **Flutter Web**         | Responsive layouts, adaptive widgets, state management, forms                          |
| 21  | **Laravel**             | Eloquent ORM, Form Requests, queues, API backend patterns                              |
| 22  | **NestJS**              | Modules, guards, pipes, interceptors, request lifecycle                                |
| 23  | **Supabase**            | RLS policies, Edge Functions, auth, auto-generated APIs                                |

---

## Commands (6 Slash Commands)

### `/orchestrator` — Main Entry Point ⭐

```bash
/orchestrator Build a checkout system with Stripe payments
```

This is **THE** command. It activates the full 22-agent team with the complete professional workflow:

1. **CLARIFY** → Asks you targeted questions if anything is ambiguous (via `AskUserQuestion`)
2. **DISCOVER** → Scans your project, detects tech stack, reads configs
3. **PLAN** → Decomposes the mission into milestones with parallel execution groups
4. **EXECUTE** → Launches specialized agents simultaneously for max throughput
5. **VERIFY** → Reviewer + QA confirm everything works, zero regressions
6. **DELIVER** → Summary of what was built, changed, and evidence

### All Commands

| Command                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| **`/orchestrator [goal]`** | ⭐ **Main entry** — Full team with clarity protocol |
| `/orchestrate [mission]`   | Direct mission execution (no clarity questions)     |
| `/plan [feature]`          | Create implementation plan only                     |
| `/review [target]`         | Comprehensive code review                           |
| `/test [target]`           | Execute and analyze test suite                      |
| `/deploy [target]`         | Deploy with pre/post verification                   |

> **When to use `/orchestrator` vs `/orchestrate`?**
>
> - `/orchestrator` — When starting a new feature, project, or complex task. The team will ask clarifying questions first.
> - `/orchestrate` — When you already know exactly what you want and just need it executed fast.

---

## User Clarity: Ask Before Building

The orchestrator **never assumes** what you want. When a mission starts, the Commander and Planner agents use the `AskUserQuestion` tool to clarify requirements before writing a single line of code.

### How It Works

1. You describe your mission (e.g., `/orchestrator Build a user authentication system`)
2. The Commander analyzes your request and checks: **is this 100% clear?**
3. If not, it asks you targeted questions with predefined options
4. You answer, and only then does planning begin

### Example Interaction

```
👤 User: /orchestrator Build an e-commerce checkout

🤖 Commander: I need to clarify a few things before planning:

   📋 Payment Provider (Question 1/3)
   Which payment gateway should I integrate?
   ○ Stripe       — Industry standard, great API, supports subscriptions
   ○ PayPal       — Widely trusted, good international support
   ○ MercadoPago  — Best for Latin American markets

   📋 Checkout Flow (Question 2/3)
   What type of checkout experience?
   ○ Single Page  — All steps on one page (simpler, faster)
   ○ Multi-Step   — Separate pages per step (more controlled)

   📋 Guest Checkout (Question 3/3)
   Should users be able to checkout without an account?
   ○ Yes          — Lower friction, higher conversion
   ○ No           — Required account, better for retention

👤 User selects: MercadoPago → Multi-Step → Yes

🤖 Commander: Perfect. Planning checkout with MercadoPago, multi-step flow, guest support.
```

### Agents That Ask Questions

| Agent              | When It Asks                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Commander          | Before every mission — scope, priorities, constraints                                         |
| Planner            | Before architecture decisions — tech stack, patterns                                          |
| Product Owner      | When defining user stories — acceptance criteria, edge cases                                  |
| QA Engineer        | When designing test strategy — critical paths, thresholds                                     |
| Project Manager    | When scoping — deadlines, risk tolerance, resources                                           |
| **Tech Selector**  | **When tech stack is unspecified — presents frameworks, databases, languages with pros/cons** |
| **SEO Specialist** | **When building web projects — target audience, content type, region**                        |

> **Tip**: You can always provide full details upfront and skip questions. The agents only ask when they detect ambiguity or missing information.

---

## Advanced Tool Integration

The orchestrator leverages Qwen Code's full tool suite beyond basic file operations:

### Inter-Agent Communication (SendMessage)

The Commander can send messages to background agents mid-task to redirect, clarify, or provide additional context without waiting for the agent to finish.

```
SendMessage({ task_id: "worker-auth", message: "User clarified: use JWT, not sessions." })
```

### Real-Time Monitoring (Monitor)

The DevOps Engineer can watch long-running processes (builds, containers, test suites) and receive streaming notifications.

```
Monitor({ command: "docker compose logs -f app", description: "Watch app logs during deploy" })
```

### Scheduled Tasks (CronCreate/CronList/CronDelete)

Schedule recurring or one-shot tasks for automated quality checks and progress reports.

```
CronCreate({ cron: "0 6 * * 1-5", prompt: "Run security audit", recurring: true })
```

### Plan Approval Gate (ExitPlanMode)

The Planner presents the final plan for user approval before execution begins, ensuring alignment.

### Task Cancellation (TaskStop)

The Commander can cancel runaway or outdated background tasks instantly.

### Agent-Tool Matrix

| Tool               | Cmd | Plan | FE  | BE  | Rev | QA  | PM  | Doc | TL  | DB  | PO  | Dev | CQG | Mon | SEO | TSel |
| ------------------ | :-: | :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :--: |
| AskUserQuestion    | ✅  |  ✅  | ✅  |     |     | ✅  | ✅  |     |     |     | ✅  |     |     |     | ✅  |  ✅  |
| Agent (sub-agents) | ✅  |  ✅  |     |     |     |     |     |     |     |     |     |     |     |     |     |      |
| Skill (load skill) |     |      | ✅  |     |     |     |     |     |     |     |     |     |     |     |     |      |
| SendMessage        | ✅  |  ✅  |     |     |     |     |     |     |     |     |     |     |     | ✅  |     |      |
| Monitor (watchdog) | ✅  |      |     |     |     |     | ✅  |     |     |     |     |     | ✅  |     |     |
| TaskStop           | ✅  |      |     |     |     |     |     |     |     |     |     |     | ✅  |     |     |
| CronCreate/List    | ✅  |      |     |     |     | ✅  | ✅  |     |     |     |     |     | ✅  |     |     |
| ExitPlanMode       |     |  ✅  |     |     |     |     |     |     |     |     |     |     |     |     |     |
| SaveMemory         | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |     |     | ✅  | ✅  |  ✅  |
| Lsp (diagnostics)  | ✅  |  ✅  | ✅  | ✅  | ✅  |     |     | ✅  | ✅  |     |     | ✅  | ✅  |     |     |
| WebFetch           | ✅  |  ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |  ✅  |

---

## Model Configuration

**By default, all agents use your Qwen Code default model.** There is no hardcoded model — zero lock-in.

### Using the default model (recommended)

Just install the extension and use it. Every agent will pick up whatever model you have configured in Qwen Code.

### Setting a specific model per agent

To use a different model for a specific agent, edit the agent's `.md` file in `agents/` and uncomment the `model` line:

```yaml
---
name: commander
# ... other fields ...
# model: uncomment below to override the user's default model
model: qwen-max # ← Uncomment and set your preferred model
---
```

### Recommended models per role

| Agent              | Recommended Model         | Why                                        |
| ------------------ | ------------------------- | ------------------------------------------ |
| Commander          | `qwen-max` or `qwen-plus` | Needs strong reasoning for orchestration   |
| Planner            | `qwen-max` or `qwen-plus` | Needs strong analysis for architecture     |
| Frontend Developer | `qwen3-coder-plus`        | Optimized for code generation              |
| Backend Developer  | `qwen3-coder-plus`        | Optimized for code generation              |
| Reviewer           | `qwen-max`                | Needs deep understanding for quality gates |
| QA Engineer        | `qwen-plus`               | Balanced for test strategy                 |
| Code Quality Guard | `qwen-plus`               | Fast for syntax/lint checks                |
| All others         | User's default            | No special needs                           |

> **Note**: Any model supported by your Qwen Code installation works — including DeepSeek, OpenAI, Anthropic, or local models. The model field is just a string that gets passed to your configured provider.

---

## Orchestrator Mode

Qwen Orchestrator works as a **virtual CLI mode** activated via `/orchestrator`. The Commander agent takes over and manages the full 22-agent team.

### Recommended CLI Settings

For maximum autonomy, set your Qwen Code CLI to one of these modes **before** running `/orchestrate`:

| CLI Mode      | Setting     | What Happens                                                    |
| ------------- | ----------- | --------------------------------------------------------------- |
| **Auto-Edit** | `auto-edit` | Agents edit/write freely. User confirms shell. **Recommended.** |
| **YOLO**      | `yolo`      | Full autonomy. No confirmations. Maximum speed.                 |
| **Default**   | `default`   | User confirms every edit. Slower but maximum control.           |
| **Plan**      | `plan`      | Planning only — agents can't write files.                       |

### Why Agents Don't Override Your Settings

Agents intentionally have **no** `approvalMode`, `runConfig`, or `background` fields:

- **You control autonomy** from the CLI, not the extension
- **No time/turn limits** — the Monitor agent handles runaway detection instead
- **Background execution** managed by Commander when spawning sub-agents
- **The orchestrator adapts to your CLI settings**, not the other way around

---

## Context7 Integration (Optional)

[Context7](https://context7.com) provides real-time, version-specific documentation for any library or framework. It's **optional** — the orchestrator works perfectly without it.

### With Context7 installed

- Doc Researcher agent resolves library IDs and fetches live docs
- All agents can query Context7 before writing unfamiliar API code
- Zero hallucination on API signatures and patterns

### Without Context7

- Agents fall back to web search and their training knowledge
- The `context7-docs` skill gracefully degrades
- No errors or missing functionality

### How to install Context7

Add to your Qwen Code MCP configuration:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

---

## MCP Memory Server — Knowledge Graph

The `@modelcontextprotocol/server-memory` MCP server provides a **Knowledge Graph** that persists across sessions. Agents can save decisions, preferences, and project context that survive session resets.

### What It Stores

- **Project decisions**: Database choice, framework selection, architecture patterns
- **User preferences**: Preferred CSS framework, dark/light mode, naming conventions
- **Architecture records**: Component hierarchy, API conventions, deployment targets
- **Session continuity**: Last task, next step, known issues from previous sessions

### How Agents Use It

```
# Commander saves a decision
create_entities({
  entities: [{ name: "database", entityType: "decision", observations: ["PostgreSQL 16", "RLS enabled", "UUID primary keys"] }]
})

# Tech Lead saves coding standards
create_entities({
  entities: [{ name: "code-standards", entityType: "standard", observations: ["PascalCase for components", "ESLint strict mode", "Tests mandatory"] }]
})

# Any agent queries previous decisions
read_graph({})
```

### Setup (included in extension)

The Memory MCP server is configured in `qwen-extension.json` and runs automatically when the extension is loaded. No additional setup needed.

> **Reference**: [MCP Server Memory on npm](https://www.npmjs.com/package/@modelcontextprotocol/server-memory)

---

## MCP Tools Server (Optional)

The optional MCP server provides 7 tools for mission management:

| Tool                       | Purpose                                             |
| -------------------------- | --------------------------------------------------- |
| `get_mission_status`       | Get current mission progress                        |
| `validate_project`         | Validate project structure and health               |
| `generate_todo`            | Generate a structured TODO from mission description |
| `get_agent_roster`         | List all 22 agents with capabilities                |
| `context7_resolve_library` | Resolve Context7 library IDs                        |
| `check_crud_completeness`  | Verify full CRUD for all entities                   |
| `create_checkpoint`        | Create a state checkpoint for compaction recovery   |

### Setup

```bash
cd qwen-orchestrator
npm install
npm run build
npm run mcp:start
```

Then add to your Qwen Code MCP configuration:

```json
{
  "mcpServers": {
    "qwen-orchestrator": {
      "command": "node",
      "args": ["./qwen-orchestrator/mcp-server/dist/index.js"]
    }
  }
}
```

---

## Execution Flow

```
User Request
     │
     ▼
┌──────────┐     ┌──────────┐     ┌──────────┐
│ COMMANDER│────▶│ PLANNER  │────▶│   TODO   │
│ Discovers│     │ Analyzes │     │ Created  │
│ & Scopes │     │ & Plans  │     │          │
└──────────┘     └──────────┘     └────┬─────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
              ┌──────────┐      ┌──────────┐      ┌──────────┐
              │ FE DEV A │      │ BE DEV B │      │ MOB DEV C│
              │ Task 1   │      │ Task 2   │      │ Task 3   │
              └────┬─────┘      └────┬─────┘      └────┬─────┘
                  │                 │                  │
                  ▼                 ▼                  ▼
             ┌──────────┐      ┌──────────┐      ┌──────────┐
             │ REVIEWER │      │   QA     │      │ CQ GUARD │
             │ Verifies │      │ Tests A  │      │ Lint+Type│
             └────┬─────┘      └────┬─────┘      └────┬─────┘
                  │                 │                  │
                  └────────────────┼──────────────────┘
                                   ▼
                          ┌──────────────┐
                          │   COMMANDER  │
                          │   CONCLUDES  │
                          └──────────────┘
```

---

## Quality Standards

Every line of code produced by the orchestrator meets:

- **Complexity**: ≤ 10 cyclomatic per function
- **Size**: ≤ 40 lines per function, ≤ 4 parameters
- **Types**: Strict types, no `any`
- **Testing**: TDD mandatory, 80%+ coverage
- **Security**: OWASP Top 10 compliance
- **SQL**: Uppercase keywords, one column per line, indented JOINs, N+1 prevention
- **Review**: Multi-dimensional code review before merge
- **Languages**: Not TypeScript-only — adapts to project's tech stack

---

## Project Structure

```
qwen-orchestrator/
├── qwen-extension.json       # Extension manifest (v0.0.1)
├── package.json              # NPM package config
├── AGENTS.md                 # Agent operational rules
├── LICENSE                   # MIT License
│
├── agents/                   # 22 Agent definitions
│   ├── commander.md          #   Master orchestrator
│   ├── planner.md            #   Research & planning
│   ├── frontend-developer.md #   UI/UX implementation
│   ├── backend-developer.md  #   Server-side logic
│   ├── reviewer.md           #   Quality gatekeeper
│   ├── qa-engineer.md        #   Test strategy
│   ├── project-manager.md    #   Delivery management
│   ├── doc-researcher.md     #   Context7 knowledge engine
│   ├── tech-lead.md          #   Standards & module completeness
│   ├── database-architect.md #   Schema & migration safety
│   ├── product-owner.md      #   User stories & acceptance criteria
│   ├── devops-engineer.md    #   CI/CD & infrastructure
│   ├── code-quality-guard.md #   Syntax, lint, typecheck sentinel
│   ├── monitor.md            #   Loop guardian & runtime watchdog
│   ├── seo-specialist.md     #   SEO & web performance
│   ├── tech-selector.md      #   Technology selection advisor
│   ├── cybersecurity-engineer.md  # Application security
│   ├── performance-engineer.md    # Speed & scale optimization
│   ├── release-manager.md         # SemVer & release workflow
│   ├── api-specialist.md          # REST/GraphQL & integrations
│   ├── mobile-engineer.md         # Flutter, React Native
│   └── localization-engineer.md   # i18n/L10n & RTL
│
├── skills/                   # 22 Skill definitions
│   ├── code-review/          #   Code review methodology
│   ├── architect/            #   Architecture design
│   ├── tdd-workflow/         #   TDD patterns
│   ├── security-audit/       #   OWASP Top 10
│   ├── performance/          #   Performance optimization
│   ├── debugging/            #   Debugging methodology
│   ├── deployment/           #   DevOps & CI/CD
│   ├── context7-docs/        #   Context7 documentation (optional)
│   ├── domain-driven/        #   Complete module builder
│   ├── api-design/           #   RESTful API standards
│   ├── refactoring/          #   Safe code transformations
│   ├── compaction-recovery/  #   Context preservation
│   ├── git-workflow/         #   Git branching & commits
│   ├── database-design/      #   Schema & query optimization
│   ├── anti-pattern/         #   Bans mockups, N+1, dead code
│   ├── multi-lang/           #   8+ language support
│   ├── sql-best-practices/   #   SQL formatting & safety
│   ├── design-system/        #   Color palettes, typography, spacing, multi-page
│   ├── website-redesign/     #   Redesign from URL or screenshot
│   ├── flutter-web/          #   Flutter Web patterns
│   ├── laravel/              #   Laravel PHP patterns
│   ├── nestjs/               #   NestJS TypeScript patterns
│   └── supabase/             #   Supabase patterns
│
├── commands/                 # 6 Slash commands
│   ├── orchestrator.md       #   ⭐ Main entry point (clarity-first)
│   ├── orchestrate.md        #   Direct mission execution
│   ├── plan.md               #   Create plan
│   ├── review.md             #   Code review
│   ├── test.md               #   Test execution
│   └── deploy.md             #   Deploy with verification
│
├── context/
│   └── QWEN.md               #   Best practices (injected into sessions)
│
├── mcp-server/src/
│   └── index.ts              #   7 MCP tools (optional)
│
└── docs/
    ├── ARCHITECTURE.md       #   Detailed architecture
    └── QUICK-START.md        #   Getting started guide
```

---

## UI/UX Skill Integration (Recommended)

The Frontend Developer agent can leverage external UI/UX skill repos for design intelligence beyond code. These are **optional** but highly recommended for web projects.

### Recommended Skills

| Skill               | Install Command                                          | What It Provides                                                                                                                                                        |
| ------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     | 161 reasoning rules, 67 UI styles, design system generator, domain search (product/style/typography/color), stack-specific code (React, Next.js, Vue, Flutter, etc.)    |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   | 87 skills, 27 commands across 8 plugins: design-research, design-systems, ux-strategy, ui-design, interaction-design, prototyping-testing, design-ops, designer-toolkit |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` | Anti-slop frontend framework — premium layout, typography, motion, spacing. Skills: design-taste-frontend, minimalist-ui, soft-skill, brutalist-ui, redesign            |

### When to Use

- **New project** → Run UI UX Pro Max's design system generator for colors, typography, spacing tokens
- **Component library** → Use Designer Skills' design-systems plugin for tokens, theming, governance
- **Polish existing UI** → Use Taste Skill's `redesign-existing-projects` to audit and fix layout/spacing
- **UX research** → Use Designer Skills' ux-strategy plugin for competitive analysis, information architecture
- **Motion & interaction** → Use Designer Skills' interaction-design plugin for micro-animations

---

## Installation

### 🚀 Quick Install (Recommended - 10 Seconds)

Just run this single command in your terminal:

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

That's it! The extension will automatically:

- ✅ Register all 22 specialized agents
- ✅ Load all 26 professional skills
- ✅ Activate all 6 slash commands
- ✅ Set up the MCP Memory Server for persistent knowledge
- ✅ Configure everything for immediate use

### 📝 Manual Install (Step-by-Step)

If you prefer manual installation, follow these simple steps:

#### 1️⃣ Get the Extension

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

#### 2️⃣ Tell Qwen Code About It

Add this to your Qwen Code configuration file (usually `~/.qwen/settings.json`):

```json
{
  "extensions": ["/full/path/to/qwen-orchestrator"]
}
```

> 💡 **Tip**: To find your full path, run `pwd` inside the cloned directory

#### 3️⃣ (Optional) Build the MCP Tools Server

For advanced features like mission status checking and agent roster tools:

```bash
cd qwen-orchestrator
npm install          # Install dependencies
npm run build        # Build the MCP tools server
```

#### 4️⃣ (Optional) Add Extra MCP Servers

Want to add Context7 for live documentation or other MCP servers? Edit your `qwen-extension.json`:

```json
{
  "mcpServers": {
    "qwen-orchestrator": {
      "command": "node",
      "args": ["${extensionPath}${/}mcp-server${/}dist${/}index.js"],
      "cwd": "${extensionPath}"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
    // Add more servers here like:
    // "context7": {
    //   "command": "npx",
    //   "args": ["-y", "@upstash/context7-mcp@latest"]
    // }
  }
}
```

### 🎯 First Usage Examples

Once installed, try these commands in your Qwen Code CLI:

```bash
/orchestrator Create a REST API for user management
/orchestrator Build a responsive e-commerce website
/plan Design a database schema for a blog
/test Run all tests in the current project
/deploy Deploy the application to production
```

### 🔧 Troubleshooting

**Q: "Command not found" after installation?**  
A: Restart your Qwen Code CLI to reload extensions.

**Q: "Permission denied" on npm commands?**  
A: On Windows, run your terminal as Administrator. On Mac/Linux, use `sudo` if needed.

**Q: Where are my session files stored?**  
A: Check the `.qwen-orchestrator/` directory in your project - it contains isolated session data.

**Need more help?** Visit our [documentation](docs/) or open an issue on [GitHub](https://github.com/Omar-Obando/qwen-orchestrator/issues).

---

## Author

**Omar Obando**

- GitHub: [@Omar-Obando](https://github.com/Omar-Obando)
- License: MIT

---

## 🔑 Keywords & Topics

`qwen-code` · `qwen-code-extension` · `multi-agent` · `ai-agents` · `orchestration` · `ai-coding` · `ai-development` · `tdd` · `code-review` · `devops` · `cicd` · `mcp` · `model-context-protocol` · `ai-orchestrator` · `software-engineering` · `ai-assistant` · `coding-agent` · `enterprise-ai` · `multi-agent-system` · `ai-coding-assistant` · `qwen` · `deepseek` · `openai` · `flutter` · `laravel` · `nestjs` · `supabase` · `typescript` · `python` · `php` · `rust` · `golang` · `java` · `csharp` · `sql` · `security-audit` · `owasp` · `test-driven-development` · `code-quality` · `frontend` · `backend` · `mobile` · `devops` · `database` · `api-design` · `i18n` · `localization` · `seo` · `performance` · `refactoring` · `anti-patterns`

---

<div align="center">

**Built with ❤️ for the [Qwen Code](https://github.com/QwenLM/qwen-code) community**

[⬆ Back to top](#qwen-orchestrator--multi-agent-ai-development-team-for-qwen-code)

</div>
