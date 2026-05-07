---
name: git-workflow
description: >
  Git workflow and version control skill covering branching strategies,
  commit conventions, merge conflict resolution, and collaborative
  development patterns.
license: MIT
---

# Git Workflow Skill — Version Control Best Practices

This skill provides comprehensive git workflow guidance for team development.

## Branching Strategy

### Git Flow (Recommended for ERP/Enterprise)

```
main (production)
  │
  ├── develop (integration)
  │     │
  │     ├── feature/JIRA-123-user-auth
  │     ├── feature/JIRA-124-inventory-module
  │     └── bugfix/JIRA-125-login-error
  │
  ├── release/v1.2.0
  └── hotfix/v1.1.1
```

### Branch Naming Convention

```
feature/JIRA-123-short-description
bugfix/JIRA-124-short-description
hotfix/JIRA-125-critical-fix
release/v1.2.0
```

## Commit Convention (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type     | Usage                                   |
| -------- | --------------------------------------- |
| feat     | New feature                             |
| fix      | Bug fix                                 |
| refactor | Code restructuring (no behavior change) |
| docs     | Documentation only                      |
| test     | Adding or updating tests                |
| chore    | Build, config, tooling                  |
| perf     | Performance improvement                 |
| ci       | CI/CD changes                           |
| style    | Formatting (no logic change)            |

### Examples

```
feat(auth): add JWT refresh token rotation

- Implement refresh token storage in database
- Add token rotation on every refresh
- Invalidate old tokens after rotation
- Add tests for token expiry edge cases

Closes JIRA-123
```

```
fix(inventory): correct stock calculation for negative quantities

Stock was showing incorrect values when adjusting below zero.
Now clamps to zero and logs a warning.

Fixes JIRA-125
```

## Commit Rules

1. **Atomic**: Each commit does ONE thing
2. **Revertible**: Each commit can be safely reverted
3. **Tested**: Each commit has passing tests
4. **Described**: Subject line ≤ 72 chars, body explains WHY
5. **No Secrets**: Never commit .env, credentials, tokens

## Merge Conflict Resolution

### Protocol

1. Pull latest from develop
2. Rebase feature branch on develop
3. Resolve conflicts manually (never auto-merge)
4. Run full test suite after resolution
5. Verify no regressions
6. Push and create PR

### Conflict Prevention

- Keep feature branches small and short-lived
- Pull/rebase frequently from develop
- Avoid modifying the same files as other branches
- Communicate with team about file ownership

## Pull Request Template

```markdown
## Description

[What does this PR do and why?]

## Type of Change

- [ ] Feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Test

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist

- [ ] No secrets committed
- [ ] No unnecessary files
- [ ] Self-reviewed the code
- [ ] Documentation updated
```
