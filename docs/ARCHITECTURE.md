# Qwen Orchestrator — Architecture Diagram (v0.0.1)

## System Architecture (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         QWEN CODE CLI                                   │
│                    (Extension Host Runtime)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  qwen-extension.json                                                    │
│  ├── Registers 22 agents (agents/*.md)                                  │
│  ├── Registers 21 skills (skills/*/SKILL.md)                            │
│  ├── Registers 6 commands (commands/*.md)                               │
│  ├── Injects context (context/QWEN.md)                                  │
│  └── Starts MCP Server (mcp-server/) — 7 tools                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AGENT LAYER                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                      COMMANDER AGENT                            │  │
│   │  ┌────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │  │
│   │  │ Discovery  │ │ Delegation   │ │  Recovery                │ │  │
│   │  │ Engine     │ │ Engine       │ │  Engine                  │ │  │
│   │  └────────────┘ └──────────────┘ └──────────────────────────┘ │  │
│   │  ┌────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │  │
│   │  │ Parallel   │ │ State        │ │  Sync Issue              │ │  │
│   │  │ Coordinator│ │ Manager      │ │  Handler                 │ │  │
│   │  └────────────┘ └──────────────┘ └──────────────────────────┘ │  │
│   └─────────────────────────────────┬───────────────────────────────┘  │
│                                     │                                   │
│          ┌──────────────────────────┼──────────────────────────┐       │
│          │                          │                          │       │
│   ┌──────▼──────┐  ┌────────┬──────────┐  ┌──────────────────▼──┐   │
│   │  PLANNER    │  │FRONTEND│ BACKEND  │  │     REVIEWER        │   │
│   │             │  │  DEV   │   DEV    │  │                     │   │
│   │ • Survey    │  │TDD Cycle│TDD Cycle│  │ • Code Review       │   │
│   │ • Analyze   │  │Implement│Implement│  │ • Integration Test   │   │
│   │ • Design    │  │ Build  │  Build   │  │ • Sync Verify        │   │
│   │ • Plan      │  │UnitTest│ UnitTest │  │ • TODO Approval      │   │
│   │ • Document  │  │LSP Chk │ LSP Chk  │  │ • Evidence Gate      │   │
│   └─────────────┘  └────────┴──────────┘  └─────────────────────┘   │
│          │                          │                          │       │
│   ┌──────▼──────────────────────────▼──────────────────────────▼──┐  │
│   │                    QA ENGINEER                                │  │
│   │  • Test Strategy    • Coverage Analysis                      │  │
│   │  • Edge Case Hunt   • Regression Testing                     │  │
│   │  • Bug Reports      • Quality Gates                          │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │                  PROJECT MANAGER                             │   │
│   │  • Scope Control    • Risk Assessment                       │   │
│   │  • Progress Track   • Release Management                    │   │
│   │  • Communication    • Delivery Verification                 │   │
│   └──────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌────────────┐ ┌────────────┐ ┌────────────────────────────────┐   │
│   │DOC RESEARCH│ │ TECH LEAD  │ │    DATABASE ARCHITECT          │   │
│   │            │ │            │ │                                │   │
│   │• Context7  │ │• CRUD Chk  │ │• Schema Design                 │   │
│   │• Doc Lookup│ │• Standards │ │• Migration Safety              │   │
│   │• AntiHallu │ │• Guidance  │ │• N+1 Prevention                │   │
│   └────────────┘ └────────────┘ └────────────────────────────────┘   │
│                                                                         │
│   ┌────────────┐ ┌────────────┐ ┌────────────────────────────────┐   │
│   │PRODUCTOWNER│ │DEVOPS ENG  │ │    CODE QUALITY GUARD          │   │
│   │            │ │            │ │                                │   │
│   │• Stories   │ │• CI/CD     │ │• Syntax Check                  │   │
│   │• Acceptance│ │• Docker    │ │• Linting                       │   │
│   │• Value     │ │• Infra     │ │• Typecheck                     │   │
│   └────────────┘ └────────────┘ └────────────────────────────────┘   │
│                                                                         │
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        SKILLS LAYER                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │Code Review │  │ Architect  │  │ TDD Flow   │  │Security Audit  │  │
│  │            │  │            │  │            │  │                │  │
│  │• OWASP     │  │• SOLID     │  │• Red/Green │  │• OWASP Top 10 │  │
│  │• SOLID     │  │• CUPID     │  │• AAA       │  │• Input Valid. │  │
│  │• Clean Code│  │• ADR       │  │• Coverage  │  │• Headers      │  │
│  │• Severity  │  │• Tradeoffs │  │• Pyramid   │  │• CVSS         │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────────┘  │
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────────────┐  │
│  │Performance │  │ Debugging  │  │        Deployment              │  │
│  │            │  │            │  │                                │  │
│  │• Profile   │  │• Observe   │  │• Pre-flight checks             │  │
│  │• Optimize  │  │• Hypothesize│ │• CI/CD pipeline                │  │
│  │• Benchmark │  │• Test      │  │• Docker                        │  │
│  │• Cache     │  │• Fix       │  │• Release mgmt                  │  │
│  └────────────┘  └────────────┘  └────────────────────────────────┘  │
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────────────┐  │
│  │Domain-Driven│ │ Context7   │  │     Compaction Recovery        │  │
│  │            │  │   Docs     │  │                                │  │
│  │• Sub-mods  │  │• Resolve   │  │• State persistence             │  │
│  │• CRUD chk  │  │• Query     │  │• Checkpoint creation           │  │
│  │• No mock   │  │• Verify    │  │• Resume from compact           │  │
│  └────────────┘  └────────────┘  └────────────────────────────────┘  │
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │ API Design │  │ Refactor   │  │Git Workflow│  │Database Design │  │
│  │• RESTful   │  │• Safe xform│  │• Branching │  │• Indexing      │  │
│  │• Envelope  │  │• Preserve  │  │• Commits   │  │• Migration     │  │
│  │• Paginate  │  │• Patterns │  │• PR templates│ │• Integrity     │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────────┘  │
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │Anti-Pattern│  │ Multi-Lang │  │SQL Best Pr.│  │  Flutter Web    │  │
│  │• No mock   │  │• 8+ langs  │  │• Uppercase  │  │• LayoutBuilder  │  │
│  │• No N+1    │  │• Adapt     │  │• One col/ln │  │• Responsive     │  │
│  │• No dead   │  │• Lint/Test │  │• Parameter. │  │• Adaptive UI    │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────────┘  │
│                                                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │  Laravel   │  │  NestJS    │  │  Supabase  │  │                │  │
│  │• Eloquent  │  │• Modules   │  │• RLS       │  │                │  │
│  │• Form Req  │  │• Guards    │  │• Edge Fn   │  │                │  │
│  │• Container │  │• Pipes     │  │• Auth       │  │                │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SHARED STATE LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   .qwen-orchestrator/                                                   │
│   ├── todo.md            ← Hierarchical mission tasks                   │
│   ├── context.md         ← Project context (<150 lines)                 │
│   ├── memory.md          ← Session memory & restore points              │
│   ├── sync-issues.md     ← Cross-file synchronization issues            │
│   ├── qa-report.md       ← Quality assurance reports                    │
│   ├── project-status.md  ← Progress tracking & metrics                  │
│   └── work-log.md        ← Real-time work status                        │
│                                                                         │
│   Reading Protocol:                                                     │
│   • Commander reads ALL files at loop start                             │
│   • Planner reads context.md before planning                            │
│   • Developers read todo.md for assignments                             │
│   • Reviewer reads work-log.md for completed units                      │
│   • QA reads todo.md for verification targets                           │
│   • PM reads project-status.md for tracking                             │
│                                                                         │
│   Writing Protocol:                                                     │
│   • Only Commander writes context.md                                    │
│   • Only Planner writes todo.md (Commander approves)                    │
│   • Only Reviewer marks [x] in todo.md                                 │
│   • Only Developers update work-log.md                                  │
│   • QA updates qa-report.md                                             │
│   • PM updates project-status.md                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        MCP SERVER LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Tools exposed:                                                        │
│   ┌────────────────────┐  ┌────────────────────┐                      │
│   │ get_mission_status │  │ validate_project   │                      │
│   │ Progress & agents  │  │ Quality checks     │                      │
│   └────────────────────┘  └────────────────────┘                      │
│   ┌────────────────────┐  ┌────────────────────┐                      │
│   │ generate_todo      │  │ get_agent_roster   │                      │
│   │ TODO template      │  │ Agent capabilities │                      │
│   └────────────────────┘  └────────────────────┘                      │
│   ┌────────────────────┐  ┌────────────────────┐                      │
│   │context7_resolve_lib│  │check_crud_complete │                      │
│   │ Library resolution  │  │ CRUD verification  │                      │
│   └────────────────────┘  └────────────────────┘                      │
│   ┌─────────────────────────────────────────────┐                     │
│   │ create_checkpoint                            │                     │
│   │ State persistence for compaction recovery    │                     │
│   └─────────────────────────────────────────────┘                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User ──▶ /orchestrator "Build auth system"
              │
              ▼
         Commander
              │
              ├──▶ Planner: "Research auth patterns, create plan"
              │         │
              │         └──▶ .qwen-orchestrator/todo.md created
              │
              ├──▶ Frontend Dev: "Implement login UI" (parallel)
              ├──▶ Backend Dev: "Implement JWT service" (parallel)
              │
              │    [Developers update work-log.md]
              │
              ├──▶ Reviewer: "Verify auth implementation"
              ├──▶ QA Engineer: "Test auth edge cases"
              │
              │    [Reviewer marks [x] in todo.md]
              │    [QA updates qa-report.md]
              │
              └──▶ PM: "Track progress, report status"
                       │
                       └──▶ .qwen-orchestrator/project-status.md updated
```

## Agent Communication

```
Commander ──delegates──▶ Planner
Commander ──delegates──▶ Frontend Developer
Commander ──delegates──▶ Backend Developer
Commander ──delegates──▶ Reviewer
Commander ──delegates──▶ QA Engineer
Commander ──delegates──▶ Project Manager
Commander ──delegates──▶ Doc Researcher
Commander ──delegates──▶ Tech Lead
Commander ──delegates──▶ Database Architect
Commander ──delegates──▶ Product Owner
Commander ──delegates──▶ DevOps Engineer
Commander ──delegates──▶ Code Quality Guard
Commander ──delegates──▶ Cybersecurity Engineer
Commander ──delegates──▶ Performance Engineer
Commander ──delegates──▶ Release Manager
Commander ──delegates──▶ API Specialist
Commander ──delegates──▶ Mobile Engineer
Commander ──delegates──▶ Localization Engineer

Reviewer ──reports──▶ Commander (sync issues)
QA ──reports──▶ Commander (test failures)
PM ──reports──▶ Commander (scope/risk)
Tech Lead ──reports──▶ Commander (CRUD/standards)
DB Architect ──reports──▶ Commander (schema/migration)
CQ Guard ──reports──▶ Commander (syntax/lint/type errors)
Cybersecurity ──reports──▶ Commander (vulnerabilities)
Performance ──reports──▶ Commander (bottlenecks)

Frontend Dev ──submits──▶ Reviewer (for approval)
Backend Dev ──submits──▶ Reviewer (for approval)
QA ──submits──▶ Reviewer (test evidence)

NOTE: Agents NEVER communicate directly.
ALL communication goes through Commander or shared state files.
```

## Error Recovery Flow

```
Task Failed
     │
     ▼
Commander assesses
     │
     ├── Simple failure → Retry with same agent
     │
     ├── Complex failure → Decompose into smaller tasks
     │
     ├── Wrong approach → Re-plan with new strategy
     │
     └── All retries exhausted → Escalate to user
          with: what was tried, what failed, options
```
