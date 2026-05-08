# Qwen Orchestrator — Quick Start Guide

## Installation

### Method 1: Direct Copy

```bash
# Copy the extension to your Qwen Code extensions directory
cp -r qwen-orchestrator ~/.qwen/extensions/
```

### Method 2: Project-Level

```bash
# Add to your project's .qwen/ directory
cp -r qwen-orchestrator .qwen/extensions/
```

## Usage

### Start a Mission (Main Entry Point)

```
/orchestrator Build a REST API with authentication
```

The `/orchestrator` command is **THE** main entry point. It activates the full 22-agent team with a clarity-first workflow — asking targeted questions before building anything.

### Direct Execution (No Questions)

```
/orchestrate Build a REST API with authentication
```

Use `/orchestrate` when you already know exactly what you want and need fast execution without the clarity protocol.

### Plan a Feature

```
/plan Add WebSocket support to the chat module
```

### Review Code

```
/review src/auth/
```

### Run Tests

```
/test src/services/
```

### Deploy

```
/deploy production
```

## Agent Selection Guide

| Task Type     | Primary Agent      | Supporting Agents                   |
| ------------- | ------------------ | ----------------------------------- |
| New feature   | Frontend/Backend   | Planner, QA, Reviewer, Tech Lead    |
| Bug fix       | Frontend/Backend   | QA, Reviewer, Code Quality Guard    |
| Code review   | Reviewer           | QA, Security Audit skill            |
| Architecture  | Planner            | Architect skill, DB Architect       |
| Testing       | QA Engineer        | Reviewer, Code Quality Guard        |
| Deployment    | DevOps Engineer    | PM, Reviewer                        |
| Investigation | Planner            | Debugging skill, Doc Researcher     |
| DB Schema     | DB Architect       | Tech Lead, SQL Best Practices skill |
| Quality gate  | Code Quality Guard | Reviewer, QA Engineer               |
| Requirements  | Product Owner      | Planner, Frontend/Backend           |
| Documentation | Doc Researcher     | Context7 skill                      |

## Shared State Files

The orchestrator creates a `.qwen-orchestrator/` directory in your project with session isolation:

```
.qwen-orchestrator/
├── current-session          # Active session ID (single line: YYYY-MM-DDTHH-MM-SS)
├── sessions/
│   ├── 2026-05-07T14-30-00/   # Archived session (IMMUTABLE)
│   │   ├── context.md         ← Project context (<150 lines)
│   │   ├── memory.md          ← Session memory & restore points
│   │   ├── sync-issues.md     ← Cross-file synchronization issues
│   │   ├── qa-report.md       ← Quality assurance reports
│   │   ├── project-status.md  ← Progress tracking & metrics
│   │   └── work-log.md        ← Real-time work status
│   └── 2026-05-07T16-45-00/   # Active session (current)
│       ├── context.md         ← Project context (<150 lines)
│       ├── memory.md          ← Session memory & restore points
│       ├── sync-issues.md     ← Cross-file synchronization issues
│       ├── qa-report.md       ← Quality assurance reports
│       ├── project-status.md  ← Progress tracking & metrics
│       └── work-log.md        ← Real-time work status
└── shared/                    # Cross-session data (future use)
```

Each session has its own isolated state. The active session is pointed to by `.qwen-orchestrator/current-session`.

## Best Practices

1. **Start with `/orchestrator`** for complex tasks — it asks clarifying questions first
2. **Use `/orchestrate`** when you know exactly what you want and need fast execution
3. **Use `/plan`** first for new features to get a clear roadmap
4. **Run `/review`** before merging any PR
5. **Trust the Reviewer** — only it can mark tasks complete
6. **Let the system work** — avoid interrupting autonomous missions
