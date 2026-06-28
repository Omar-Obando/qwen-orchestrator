# Qwen Orchestrator — Multi-Agent AI Development Team for Qwen Code

**English** · [Español](docs/README.es.md) · [中文](docs/README.zh.md) · [日本語](docs/README.ja.md) · [한국어](docs/README.ko.md) · [Português](docs/README.pt.md) · [Français](docs/README.fr.md) · [العربية](docs/README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 24](https://img.shields.io/badge/agents-24-blue.svg)](#-agent-team-24-specialized-agents)
[![Skills: 82](https://img.shields.io/badge/skills-82-purple.svg)](#-skills-82-professional-skills)

> 🤖 **The enterprise-grade multi-agent AI orchestration extension exclusively for [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**
>
> Turn your AI coding assistant into a full **software development department** — 24 specialized agents, 82 professional skills, 6 slash commands, persistent memory, and MCP tool integration.
>
> **Author:** [Omar-Obando](https://github.com/Omar-Obando) · **License:** MIT · **Version:** 0.0.6

---

## 📑 Table of Contents

- [What is Qwen Orchestrator?](#-what-is-qwen-orchestrator)
- [Quick Install](#-quick-install)
- [Quick Start](#-quick-start)
- [Key Features](#-key-features)
- [Agent Team (24 Specialized Agents)](#-agent-team-24-specialized-agents)
- [Skills (82 Professional Skills)](#-skills-82-professional-skills)
- [Commands (6 Slash Commands)](#-commands-6-slash-commands)
- [How It Works](#-how-it-works)
  - [Execution Flow](#execution-flow)
  - [User Clarity: Ask Before Building](#user-clarity-ask-before-building)
  - [Architecture Diagram](#architecture-diagram)
- [Installation Guide](#-installation-guide)
  - [Quick Install (Recommended)](#quick-install-recommended)
  - [Manual Install](#manual-install)
  - [MCP Tools Server (Optional)](#mcp-tools-server-optional)
  - [Troubleshooting](#troubleshooting)
- [Model Configuration](#-model-configuration)
- [CLI Mode Recommendations](#-cli-mode-recommendations)
- [Advanced Tools](#-advanced-tools)
  - [Inter-Agent Communication](#inter-agent-communication)
  - [Real-Time Monitoring](#real-time-monitoring)
  - [Scheduled Tasks](#scheduled-tasks)
- [Integrations](#-integrations)
  - [Context7 (Optional)](#context7-optional)
  - [MCP Memory Server](#mcp-memory-server)
  - [UI/UX Skills (Recommended)](#uiux-skills-recommended)
- [Quality Standards](#-quality-standards)
- [Project Structure](#-project-structure)
- [First Usage Examples](#-first-usage-examples)
- [Documentation](#-documentation)
- [Author](#-author)
- [Keywords](#-keywords)

---

## ⚡ What is Qwen Orchestrator?

**Qwen Orchestrator** is a powerful extension built exclusively for **[Qwen Code](https://github.com/QwenLM/qwen-code)** — the open-source AI coding CLI by Alibaba. It transforms a single AI coding assistant into a **coordinated team of 24 specialized AI agents** that work together like a professional software development department.

### Why Qwen Orchestrator?

Imagine having an entire engineering team at your fingertips: a **Commander** that orchestrates, a **Planner** that architects, **Frontend and Backend Developers** that code in parallel, a **Reviewer** that gatekeeps quality, a **QA Engineer** that tests, a **Cybersecurity Engineer** that audits vulnerabilities, a **DevOps Engineer** that deploys — and 16 more specialists, all coordinated automatically.

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
> ⚠️ **IDE Compatibility Notice**: This extension has NOT been tested with Visual Studio, VS Code extensions, JetBrains IDEs, or any integrations outside of the Qwen Code CLI. It is designed exclusively for the Qwen Code terminal/CLI experience.

---

## 🚀 Quick Install

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

That's it! The extension automatically registers all 24 agents, 82 skills, 6 commands, and the MCP Memory Server.

> 📖 See the full [Installation Guide](#-installation-guide) for manual install, MCP tools server setup, and troubleshooting.

---

## 🎯 Quick Start

Once installed, just type in your Qwen Code CLI:

```bash
/orchestrator Create a REST API for user management
/orchestrator Build a responsive e-commerce website
/plan Design a database schema for a blog
/review Check all authentication controllers
/test Run all tests in the current project
/deploy Deploy the application to production
```

The `/orchestrator` command is the main entry point. It activates the full 24-agent team with the complete professional workflow:

1. **CLARIFY** → Asks targeted questions if anything is ambiguous
2. **DISCOVER** → Scans your project, detects tech stack, reads configs
3. **PLAN** → Decomposes the mission into milestones with parallel execution groups
4. **EXECUTE** → Launches specialized agents simultaneously for max throughput
5. **VERIFY** → Reviewer + QA confirm everything works, zero regressions
6. **DELIVER** → Summary of what was built, changed, and evidence

---

## 🌟 Key Features

| Feature                    | Description                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **24 Specialized Agents**  | Commander, Planner, Frontend/Backend Devs, Reviewer, QA, PM, DevOps, Security, and more                         |
| **82 Professional Skills** | TDD, security audit, anti-pattern detection, design system, SQL best practices, Docker, Kubernetes, and 75 more |
| **6 Slash Commands**       | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`                                         |
| **Ask Before Building**    | Agents ask clarifying questions via `AskUserQuestion` before writing code                                       |
| **Parallel Execution**     | Commander delegates tasks to multiple agents simultaneously                                                     |
| **Persistent Memory**      | Knowledge Graph via MCP Memory Server stores decisions across sessions                                          |
| **Zero Model Lock-In**     | Works with Qwen, DeepSeek, OpenAI, Anthropic, or any local model                                                |
| **Multi-Language**         | TypeScript, PHP (Laravel), Python (Django), Dart (Flutter), Rust, Go, Java, C#                                  |
| **Loop Protection**        | Monitor agent detects and breaks LLM infinite loops automatically                                               |
| **Quality Gates**          | Reviewer is the ONLY agent that can approve tasks                                                               |
| **Security First**         | OWASP Top 10 compliance via security-audit skill and Reviewer agent                                             |
| **No Mockups**             | Agents are forbidden from writing stubs or placeholders                                                         |
| **Compaction Recovery**    | State persists to `.qwen-orchestrator/` — survives context window compression                                   |

---

## 👥 Agent Team (24 Specialized Agents)

| #   | Agent                     | Role                    | Superpower                                  |
| --- | ------------------------- | ----------------------- | ------------------------------------------- |
| 1   | **Commander** 🔴          | Master Orchestrator     | Parallel delegation, relentless execution   |
| 2   | **Planner** 🔵            | Research & Architecture | File-level planning, design decisions       |
| 3   | **Frontend Developer** 🔵 | UI/UX Implementation    | Components, responsive, accessible, fast    |
| 4   | **Backend Developer** 🟢  | Server-Side Logic       | APIs, auth, caching, database ops           |
| 5   | **Reviewer** 🟣           | Quality Gatekeeper      | ONLY agent that can approve tasks           |
| 6   | **QA Engineer** 🟠        | Quality Assurance       | Test strategy, edge case discovery          |
| 7   | **Project Manager** 🔵    | Delivery Management     | Scope control, risk assessment              |
| 8   | **Doc Researcher** 🟣     | Context7 Knowledge      | Live doc lookup, anti-hallucination         |
| 9   | **Tech Lead** 🟡          | Standards & Guidance    | Module completeness, CRUD verification      |
| 10  | **Database Architect** 🟢 | Data Layer Specialist   | Schema design, migration safety             |
| 11  | **Product Owner** 🟡      | Business Value          | User stories, acceptance criteria           |
| 12  | **DevOps Engineer** 🔘    | Infrastructure          | CI/CD, Docker, deployment automation        |
| 13  | **Code Quality Guard** 🌹 | Quality Sentinel        | Syntax check, lint, typecheck               |
| 14  | **Monitor** 🛡️            | Loop Guardian           | Detect/break LLM loops, runtime watchdog    |
| 15  | **SEO Specialist** 🔵     | SEO & Web Performance   | Meta tags, structured data, Core Web Vitals |
| 16  | **Tech Selector** 🟣      | Technology Advisor      | Framework/DB selection with pros/cons       |
| 17  | **Cybersecurity Eng.** 🔴 | Application Security    | OWASP, threat modeling, dependency audit    |
| 18  | **Performance Eng.** ⚡   | Speed & Scale           | Profiling, query optimization, load testing |
| 19  | **Release Manager** 🏷️    | Release & Versioning    | SemVer, changelogs, rollback planning       |
| 20  | **API Specialist** 🔗     | API & Integration       | REST/GraphQL, versioning, third-party APIs  |
| 21  | **Mobile Engineer** 📱    | Mobile Apps             | Flutter, React Native, offline-first        |
| 22  | **Localization Eng.** 🌐  | i18n/L10n               | Multi-language, RTL, cultural adaptation    |
| 23  | **Documenter** 📄         | Technical Writing       | README, API docs, ADRs, knowledge base      |
| 24  | **Skill Creator** 🛠️      | Skill Authoring         | Skill creation, documentation, testing      |

---

## 🛠️ Skills (82 Professional Skills)

### Containerization & Orchestration

| Skill                    | Purpose                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| Docker Containerization  | Multi-stage builds, security hardening, image optimization, Docker Compose |
| Kubernetes Orchestration | Deployments, HPA, service mesh, ingress, GitOps with ArgoCD/Flux           |

### Infrastructure as Code

| Skill         | Purpose                                                             |
| ------------- | ------------------------------------------------------------------- |
| Terraform IaC | Modules, state management, workspaces, Sentinel policies, Terratest |

### CI/CD Automation

| Skill                | Purpose                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| GitHub Actions CI/CD | Workflows, matrices, environments, caching, composite actions, security |

### Caching & Performance

| Skill         | Purpose                                                                       |
| ------------- | ----------------------------------------------------------------------------- |
| Redis Caching | Data structures, caching patterns, session management, pub/sub, Lua scripting |

### API Design

| Skill              | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| GraphQL API Design | Schema design, resolvers, DataLoader, pagination, Apollo Federation |

### Multi-Platform

| Skill              | Purpose                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- |
| Multi-Platform Dev | Cross-platform commands, path handling, line endings, permissions, package managers |

### LLM & Agents

| Skill            | Purpose                                                          |
| ---------------- | ---------------------------------------------------------------- |
| LangGraph        | Agent workflows, state management, multi-agent systems           |
| LangChain        | LLM chains, agents, tools, memory, RAG                           |
| Qwen Agent       | Qwen-specific agent development and integration                  |
| LLM Integrations | Multi-provider LLM integration (OpenAI, Anthropic, Google, etc.) |

### Cloud Platforms

| Skill              | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| Vercel Deployment  | Serverless functions, edge computing, Next.js optimization |
| Cloudflare Pages   | Edge functions, global distribution, caching               |
| Cloudflare Workers | Edge computing, request/response manipulation              |
| AWS Serverless     | Lambda, API Gateway, SAM, event-driven architectures       |

### SEO

| Skill         | Purpose                                                             |
| ------------- | ------------------------------------------------------------------- |
| SEO LLM       | Optimization for ChatGPT, Perplexity, Gemini, Claude, Bing AI, Qwen |
| Technical SEO | Site speed, mobile optimization, structured data, Core Web Vitals   |

### Leadership & Architecture

| Skill                      | Purpose                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| Strategic Leadership       | Team management, decision-making, stakeholder alignment              |
| Requirements Engineering   | Use cases, user stories, acceptance criteria                         |
| Microservices Architecture | Domain-driven design, service boundaries, event-driven communication |
| Technology Evaluation      | Framework/DB selection, pros/cons analysis                           |

### Product & Team

| Skill         | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| Product Owner | Backlog management, user stories, sprint planning        |
| Scrum Master  | Ceremony facilitation, team coaching, impediment removal |

### Software Development

| Skill                 | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| Testing Strategy      | Test pyramid, coverage targets, automation            |
| Security Auditor      | OWASP Top 10, vulnerability assessment, compliance    |
| DevOps Pipeline       | CI/CD design, deployment strategies, IaC              |
| Architecture Patterns | Layered, DDD, microservices, event-driven, CQRS       |
| Documentation         | README, API docs, ADRs, knowledge base                |
| Debugging             | Systematic investigation, hypothesis-driven debugging |
| Refactoring           | Code smell detection, safe transformations            |

### Security & Quality

| Skill                | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| Security Code Review | OWASP Top 10, vulnerability patterns, secure coding        |
| Threat Modeling      | STRIDE, DREAD, attack trees, threat identification         |
| Test Automation      | Framework design, page object patterns, parallel execution |
| Load Testing         | Load, stress, endurance, spike testing                     |
| Code Review          | OWASP + SOLID + Clean Code systematic review               |

### Database & Data

| Skill               | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| Database Design     | Schema design, relationships, indexing strategies     |
| Database Security   | Encryption, access control, audit logging, compliance |
| SQL Best Practices  | Query optimization, indexing, N+1 prevention          |
| SQL Query Assistant | Query assistance, best practices, optimization        |

### Frontend & Mobile

| Skill              | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| Accessibility      | WCAG 2.1 AA, semantic HTML, ARIA, keyboard navigation       |
| Design System      | Color palettes, typography, spacing, component architecture |
| Website Redesign   | URL/screenshot-based redesign, analysis workflow            |
| Flutter Web        | Responsive layouts, adaptive widgets, state management      |
| Mobile Performance | App optimization, startup time, memory usage                |
| Offline-First      | Local storage, sync, conflict resolution                    |

### Backend & APIs

| Skill                   | Purpose                                                 |
| ----------------------- | ------------------------------------------------------- |
| API Design              | RESTful standards, response envelopes, pagination       |
| API Documentation       | OpenAPI specification, Swagger, GraphQL schemas         |
| Third-Party Integration | Stripe, PayPal, AWS, Google, Twilio                     |
| Laravel                 | Eloquent ORM, Form Requests, queues, API patterns       |
| NestJS                  | Modules, guards, pipes, interceptors, request lifecycle |
| Supabase                | RLS policies, Edge Functions, auth, auto-generated APIs |

### DevOps & Infrastructure

| Skill             | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| Disaster Recovery | Backup strategies, restore procedures, failover, RTO/RPO |
| Release Workflow  | SemVer, changelogs, staging, production, rollback        |
| Git Workflow      | Branching strategies, commit conventions, PR templates   |
| Deployment        | CI/CD, Docker, release management                        |

### LLM-Specific

| Skill               | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| Anti-Hallucination  | Source verification, evidence-based claims, validation |
| Loop Detection      | LLM loop detection, tool call loops, escape routes     |
| Context7 Docs       | Live documentation lookup via Context7 MCP             |
| Compaction Recovery | Context preservation across session compaction         |

### Project & Team

| Skill                    | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| Agile Project Management | Scrum ceremonies, backlog grooming, sprint planning   |
| User Story Mapping       | Story mapping, epic breakdown, timeline visualization |
| CRUD Completeness        | Create, Read, Update, Delete patterns, validation     |
| Project Conventions      | Project structure, coding standards, conventions      |
| ERP/SaaS Organization    | Large project organization, module structure          |

### Localization

| Skill                | Purpose                                      |
| -------------------- | -------------------------------------------- |
| Translation Workflow | Translation memory, machine translation, TMS |
| Multi-Language       | i18n, l10n patterns, RTL support             |

### Additional Skills

| Skill                  | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| Domain-Driven          | DDD patterns, bounded contexts, aggregates, value objects |
| Performance            | Profiling, optimization, benchmarks                       |
| TDD Workflow           | Test-Driven Development (Red/Green/Refactor)              |
| Security Audit         | OWASP Top 10 vulnerability detection                      |
| Agent Task Coordinator | Agent coordination, MCP protocol                          |
| Skill Creation         | Skill authoring, documentation, testing                   |
| Multi-Channel Funnels  | Marketing funnels, conversion optimization                |
| Architecture           | System design, patterns, trade-offs                       |
| Code Quality           | Linting, formatting, type checking                        |
| Monitoring             | Observability, logging, alerting                          |
| Compliance             | GDPR, HIPAA, SOC 2, PCI-DSS                               |
| Testing                | Unit, integration, E2E testing                            |

---

## ⌨️ Commands (6 Slash Commands)

| Command                       | Description                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------- |
| **`/orchestrator [goal]`** ⭐ | **Main entry point** — Full team with clarity protocol (asks questions first) |
| `/orchestrate [mission]`      | Direct mission execution — no clarity questions, just builds                  |
| `/plan [feature]`             | Create implementation plan only — research + architecture                     |
| `/review [target]`            | Comprehensive code review — security, quality, patterns                       |
| `/test [target]`              | Execute and analyze test suite — coverage, gaps, edge cases                   |
| `/deploy [target]`            | Deploy with pre/post verification — CI/CD, rollback plan                      |

> **When to use `/orchestrator` vs `/orchestrate`?**
>
> - `/orchestrator` — When starting a **new feature, project, or complex task**. The team will ask clarifying questions first.
> - `/orchestrate` — When you already **know exactly what you want** and just need it executed fast.

---

## 🧠 How It Works

### Execution Flow

```
User types /orchestrator "Build a payment system"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Clarifies scope   │
         │   via AskUserQuestion│
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   Analyzes project  │
         │   Creates milestones │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│Task 1   │  │Task 2    │  │Schema + Migration│
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│Approves │  │Tests     │  │Lint + Typecheck  │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Concludes mission │
         │   Delivers summary  │
         └─────────────────────┘
```

### User Clarity: Ask Before Building

The orchestrator **never assumes** what you want. When a mission starts, the Commander and Planner agents use the `AskUserQuestion` tool to clarify requirements before writing code.

**Example interaction:**

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

**Agents that ask questions:**

| Agent           | When It Asks                                                                              |
| --------------- | ----------------------------------------------------------------------------------------- |
| Commander       | Before every mission — scope, priorities, constraints                                     |
| Planner         | Before architecture decisions — tech stack, patterns                                      |
| Product Owner   | When defining user stories — acceptance criteria, edge cases                              |
| QA Engineer     | When designing test strategy — critical paths, thresholds                                 |
| Project Manager | When scoping — deadlines, risk tolerance, resources                                       |
| Tech Selector   | When tech stack is unspecified — presents frameworks, databases, languages with pros/cons |
| SEO Specialist  | When building web projects — target audience, content type, region                        |

> **Tip**: You can always provide full details upfront and skip questions. The agents only ask when they detect ambiguity.

### Architecture Diagram

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    QWEN ORCHESTRATOR v0.0.6                            ║
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
║  Agents: 24 | Skills: 82 | Commands: 6 | MCP Tools: 7 | Languages: 8+ ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 📦 Installation Guide

### Quick Install (Recommended)

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

The extension automatically:

- ✅ Registers all 24 specialized agents
- ✅ Loads all 82 professional skills
- ✅ Activates all 6 slash commands
- ✅ Sets up the MCP Memory Server for persistent knowledge
- ✅ Configures everything for immediate use

### Manual Install

**1. Get the extension:**

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

**2. Tell Qwen Code about it.** Add to your Qwen Code configuration (`~/.qwen/settings.json`):

```json
{
  "extensions": ["/full/path/to/qwen-orchestrator"]
}
```

> 💡 To find your full path, run `pwd` inside the cloned directory.

### MCP Tools Server (Optional)

For advanced features like mission status checking and agent roster tools:

```bash
cd qwen-orchestrator
npm install
npm run build
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

**Available MCP tools:**

| Tool                       | Purpose                                           |
| -------------------------- | ------------------------------------------------- |
| `get_mission_status`       | Get current mission progress                      |
| `validate_project`         | Validate project structure and health             |
| `generate_todo`            | Generate structured TODO from mission description |
| `get_agent_roster`         | List all 24 agents with capabilities              |
| `context7_resolve_library` | Resolve Context7 library IDs                      |
| `check_crud_completeness`  | Verify full CRUD for all entities                 |
| `create_checkpoint`        | Create state checkpoint for compaction recovery   |

### Troubleshooting

| Problem                             | Solution                                                                |
| ----------------------------------- | ----------------------------------------------------------------------- |
| "Command not found" after install   | Restart Qwen Code CLI to reload extensions                              |
| "Permission denied" on npm commands | Windows: run terminal as Administrator. Mac/Linux: use `sudo` if needed |
| Where are session files stored?     | `.qwen-orchestrator/` directory in your project                         |
| Extension not loading               | Verify path in settings.json is absolute and correct                    |

> Need more help? Open an issue on [GitHub](https://github.com/Omar-Obando/qwen-orchestrator/issues).

---

## ⚙️ Model Configuration

**By default, all agents use your Qwen Code default model.** There is no hardcoded model — zero lock-in.

> ⚠️ **CRITICAL: Set Temperature to 0.1 (TP 0.1) on ALL models**
>
> For the orchestrator to follow instructions strictly and reliably, **every model** used by any agent **MUST be configured with Temperature 0.1 (TP 0.1)**. Higher temperatures introduce randomness that causes agents to deviate from their assigned roles, ignore constraints, hallucinate tools, or produce inconsistent output.
>
> **Why TP 0.1?**
> - Ensures strict adherence to system prompts and agent instructions
> - Eliminates creative drift that breaks multi-agent coordination
> - Produces deterministic, reproducible results across sessions
> - Prevents agents from inventing tools, files, or behaviors
>
> **How to configure:**
> ```json
> {
>   "modelConfig": {
>     "temperature": 0.1
>   }
> }
> ```
>
> This applies to **every model** — Qwen, DeepSeek, OpenAI, Anthropic, local models, or any other provider. If your provider or model does not support temperature configuration, consider switching to one that does. **TP 0.1 is not optional — it is a hard requirement for reliable multi-agent orchestration.**

### Using the default model (recommended)

Just install and use. Every agent picks up whatever model you have configured in Qwen Code.

### Setting a specific model per agent

Edit the agent's `.md` file in `agents/` and uncomment the `model` line:

```yaml
---
name: commander
# ... other fields ...
# model: uncomment below to override the user's default model
model: qwen-max
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

> Any model supported by your Qwen Code installation works — including DeepSeek, OpenAI, Anthropic, or local models.

---

## 🎛️ CLI Mode Recommendations

For maximum autonomy, set your Qwen Code CLI mode **before** running `/orchestrator`:

| CLI Mode      | Setting     | What Happens                                                    |
| ------------- | ----------- | --------------------------------------------------------------- |
| **Auto-Edit** | `auto-edit` | Agents edit/write freely. User confirms shell. **Recommended.** |
| **YOLO**      | `yolo`      | Full autonomy. No confirmations. Maximum speed.                 |
| **Default**   | `default`   | User confirms every edit. Slower but maximum control.           |
| **Plan**      | `plan`      | Planning only — agents can't write files.                       |

> Agents intentionally have **no** `approvalMode`, `runConfig`, or `background` fields — you control autonomy from the CLI, not the extension.

---

## 🔧 Advanced Tools

### Inter-Agent Communication

The Commander can send messages to background agents mid-task:

```
SendMessage({ task_id: "worker-auth", message: "User clarified: use JWT, not sessions." })
```

### Real-Time Monitoring

The DevOps Engineer can watch long-running processes:

```
Monitor({ command: "docker compose logs -f app", description: "Watch app logs during deploy" })
```

### Scheduled Tasks

Schedule recurring quality checks and reports:

```
CronCreate({ cron: "0 6 * * 1-5", prompt: "Run security audit", recurring: true })
```

### Agent-Tool Matrix

| Tool               | Cmd | Plan | FE  | BE  | Rev | QA  | PM  | Doc | TL  | DB  | PO  | Dev | CQG | Mon | SEO | TSel |
| ------------------ | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
| AskUserQuestion    | ✅  | ✅   | ✅  |     |     | ✅  | ✅  |     |     |     | ✅  |     |     |     | ✅  | ✅   |
| Agent (sub-agents) | ✅  | ✅   |     |     |     |     |     |     |     |     |     |     |     |     |     |      |
| Skill (load skill) |     |      | ✅  |     |     |     |     |     |     |     |     |     |     |     |     |      |
| SendMessage        | ✅  | ✅   |     |     |     |     |     |     |     |     |     |     |     | ✅  |     |      |
| Monitor (watchdog) | ✅  |      |     |     |     |     | ✅  |     |     |     |     |     | ✅  |     |     |      |
| TaskStop           | ✅  |      |     |     |     |     |     |     |     |     |     |     | ✅  |     |     |      |
| CronCreate/List    | ✅  |      |     |     |     | ✅  | ✅  |     |     |     |     |     | ✅  |     |     |      |
| ExitPlanMode       |     | ✅   |     |     |     |     |     |     |     |     |     |     |     |     |     |      |
| SaveMemory         | ✅  | ✅   | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |     |     | ✅  | ✅  | ✅   |
| Lsp (diagnostics)  | ✅  | ✅   | ✅  | ✅  | ✅  |     |     | ✅  | ✅  |     |     | ✅  | ✅  |     |     |      |
| WebFetch           | ✅  | ✅   | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  | ✅   |

---

## 🔌 Integrations

### Context7 (Optional)

[Context7](https://context7.com) provides real-time, version-specific documentation.

**With Context7:** Doc Researcher fetches live docs, zero hallucination on API signatures.

**Without Context7:** Agents fall back to web search and training knowledge — no errors.

To install, add to your Qwen Code MCP configuration:

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

### MCP Memory Server

The `@modelcontextprotocol/server-memory` MCP server provides a **Knowledge Graph** that persists across sessions.

**What it stores:**

- **Project decisions**: Database choice, framework, architecture patterns
- **User preferences**: CSS framework, naming conventions, dark/light mode
- **Architecture records**: Component hierarchy, API conventions, deployment targets
- **Session continuity**: Last task, next step, known issues

**How agents use it:**

```
create_entities({
  entities: [{ name: "database", entityType: "decision",
    observations: ["PostgreSQL 16", "RLS enabled", "UUID primary keys"] }]
})

read_graph({})
```

The Memory MCP server is configured in `qwen-extension.json` and runs automatically. No additional setup needed.

### UI/UX Skills (Recommended)

The Frontend Developer agent can leverage external UI/UX repos for design intelligence:

| Skill               | Install                                                  | What It Provides                                                           |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     | 161 reasoning rules, 67 UI styles, design system generator, domain search  |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   | 87 skills, 27 commands across 8 design plugins                             |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` | Anti-slop frontend framework — premium layout, typography, motion, spacing |

---

## ✅ Quality Standards

Every line of code produced by the orchestrator meets:

| Standard   | Requirement                                                             |
| ---------- | ----------------------------------------------------------------------- |
| Complexity | ≤ 10 cyclomatic per function                                            |
| Size       | ≤ 40 lines per function, ≤ 4 parameters                                 |
| Types      | Strict types, no `any`                                                  |
| Testing    | TDD mandatory, 80%+ coverage                                            |
| Security   | OWASP Top 10 compliance                                                 |
| SQL        | Uppercase keywords, one column per line, indented JOINs, N+1 prevention |
| Review     | Multi-dimensional code review before merge                              |
| Languages  | Not TypeScript-only — adapts to project's tech stack                    |

---

## 📁 Project Structure

```
qwen-orchestrator/
├── qwen-extension.json       # Extension manifest
├── package.json              # NPM package config
├── AGENTS.md                 # Agent operational rules
├── LICENSE                   # MIT License
├── CHANGELOG.md              # Release history
├── SECURITY.md               # Security policy
│
├── agents/                   # 24 Agent definitions
│   ├── commander.md
│   ├── planner.md
│   ├── frontend-developer.md
│   ├── backend-developer.md
│   ├── reviewer.md
│   ├── qa-engineer.md
│   ├── project-manager.md
│   ├── doc-researcher.md
│   ├── tech-lead.md
│   ├── database-architect.md
│   ├── product-owner.md
│   ├── devops-engineer.md
│   ├── code-quality-guard.md
│   ├── monitor.md
│   ├── seo-specialist.md
│   ├── tech-selector.md
│   ├── cybersecurity-engineer.md
│   ├── performance-engineer.md
│   ├── release-manager.md
│   ├── api-specialist.md
│   ├── mobile-engineer.md
│   ├── localization-engineer.md
│   ├── documenter.md
│   └── skill-creator.md
│
├── skills/                   # 82 Skill definitions
│   ├── docker-containerization/
│   ├── kubernetes-orchestration/
│   ├── terraform-iac/
│   ├── github-actions-cicd/
│   ├── redis-caching/
│   ├── graphql-api-design/
│   ├── multi-platform-dev/
│   ├── langgraph/
│   ├── langchain/
│   ├── qwen-agent/
│   ├── llm-integrations/
│   ├── vercel-deployment/
│   ├── cloudflare-pages/
│   ├── cloudflare-workers/
│   ├── aws-serverless/
│   ├── seo-llm/
│   ├── technical-seo/
│   ├── strategic-leadership/
│   ├── requirements-engineering/
│   ├── microservices-architecture/
│   ├── technology-evaluation/
│   ├── product-owner/
│   ├── scrum-master/
│   ├── testing-strategy/
│   ├── security-auditor/
│   ├── devops-pipeline/
│   ├── architecture-patterns/
│   ├── documentation/
│   ├── debugging/
│   ├── refactoring/
│   ├── security-code-review/
│   ├── threat-modeling/
│   ├── test-automation/
│   ├── load-testing/
│   ├── code-review/
│   ├── database-design/
│   ├── database-security/
│   ├── sql-best-practices/
│   ├── sql-query-assistant/
│   ├── accessibility/
│   ├── design-system/
│   ├── website-redesign/
│   ├── flutter-web/
│   ├── mobile-performance/
│   ├── offline-first/
│   ├── api-design/
│   ├── api-documentation/
│   ├── third-party-integration/
│   ├── laravel/
│   ├── nestjs/
│   ├── supabase/
│   ├── disaster-recovery/
│   ├── release-workflow/
│   ├── git-workflow/
│   ├── deployment/
│   ├── anti-hallucination/
│   ├── loop-detection/
│   ├── context7-docs/
│   ├── compaction-recovery/
│   ├── agile-project-management/
│   ├── user-story-mapping/
│   ├── crud-completeness/
│   ├── project-conventions/
│   ├── erp-saas-organization/
│   ├── translation-workflow/
│   ├── multi-language/
│   ├── domain-driven/
│   ├── performance/
│   ├── tdd-workflow/
│   ├── security-audit/
│   ├── agent-task-coordinator/
│   ├── skill-creation/
│   ├── multi-channel-funnels/
│   ├── architecture/
│   ├── code-quality/
│   ├── monitoring/
│   ├── compliance/
│   ├── testing/
│   └── debugging-skill/
│
├── commands/                 # 6 Slash commands
│   ├── orchestrator.md
│   ├── orchestrate.md
│   ├── plan.md
│   ├── review.md
│   ├── test.md
│   └── deploy.md
│
├── context/
│   └── QWEN.md
│
├── mcp-server/src/
│   └── index.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── QUICK-START.md
│   ├── INSTALLATION.md
│   ├── HOOKS-BEST-PRACTICES.md
│   ├── SUBAGENT-MONITORING.md
│   ├── README.es.md
│   ├── README.zh.md
│   ├── README.ja.md
│   ├── README.ko.md
│   ├── README.pt.md
│   ├── README.fr.md
│   └── README.ar.md
│
└── scripts/
    └── setup.sh
```

---

## 🎯 First Usage Examples

Once installed, try these in your Qwen Code CLI:

```bash
/orchestrator Create a REST API for user management
/orchestrator Build a responsive e-commerce website with Stripe payments
/plan Design a database schema for a blog platform
/review Check all authentication controllers for security issues
/test Run all tests in the current project and report coverage gaps
/deploy Deploy the application to production with rollback plan
```

---

## 📚 Documentation

| Document                                                | Description                                |
| ------------------------------------------------------- | ------------------------------------------ |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)                 | Detailed architecture and design decisions |
| [QUICK-START.md](docs/QUICK-START.md)                   | Getting started guide                      |
| [INSTALLATION.md](docs/INSTALLATION.md)                 | Full installation instructions             |
| [HOOKS-BEST-PRACTICES.md](docs/HOOKS-BEST-PRACTICES.md) | Qwen Code hooks integration guide          |
| [SUBAGENT-MONITORING.md](docs/SUBAGENT-MONITORING.md)   | Sub-agent monitoring and lifecycle         |
| [QWEN_CODE_PATTERNS.md](QWEN_CODE_PATTERNS.md)          | MCP servers, hooks, and session management |
| [SECURITY.md](SECURITY.md)                              | Security policy                            |
| [CHANGELOG.md](CHANGELOG.md)                            | Release history                            |
| [AGENTS.md](AGENTS.md)                                  | Agent operational rules                    |

---

## 👤 Author

**Omar Obando**

- GitHub: [@Omar-Obando](https://github.com/Omar-Obando)
- License: MIT

---

## 🔑 Keywords

`qwen-code` · `qwen-code-extension` · `multi-agent` · `ai-agents` · `orchestration` · `ai-coding` · `ai-development` · `tdd` · `code-review` · `devops` · `cicd` · `mcp` · `model-context-protocol` · `ai-orchestrator` · `software-engineering` · `ai-assistant` · `coding-agent` · `enterprise-ai` · `multi-agent-system` · `ai-coding-assistant` · `qwen` · `deepseek` · `openai` · `flutter` · `laravel` · `nestjs` · `supabase` · `typescript` · `python` · `php` · `rust` · `golang` · `java` · `csharp` · `sql` · `security-audit` · `owasp` · `test-driven-development` · `code-quality` · `frontend` · `backend` · `mobile` · `devops` · `database` · `api-design` · `i18n` · `localization` · `seo` · `performance` · `refactoring` · `anti-patterns`

---

<div align="center">

**Built with ❤️ for the [Qwen Code](https://github.com/QwenLM/qwen-code) community**

[⬆ Back to top](#qwen-orchestrator--multi-agent-ai-development-team-for-qwen-code)

</div>
