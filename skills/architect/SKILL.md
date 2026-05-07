---
name: architect
description: >
  System architecture design skill with pattern recognition, trade-off analysis,
  and documentation. Use when designing new features, evaluating architecture
  decisions, or planning system refactoring.
license: MIT
---

# Architect Skill — System Design Expert

This skill provides comprehensive architecture design guidance with evidence-based decision making.

## Design Principles

### SOLID

- **S**ingle Responsibility: One reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable
- **I**nterface Segregation: Many specific interfaces > one general
- **D**ependency Inversion: Depend on abstractions, not concretions

### CUPID

- **C**omposable: Works well with other components
- **U**nderstandable: Clear purpose and usage
- **P**redictable: Behaves as expected
- **I**dempotent: Same operation, same result
- **D**omain-focused: Names and structure reflect the domain

## Architecture Patterns

### Monolith vs Microservices Decision Matrix

| Factor               | Monolith    | Microservices          |
| -------------------- | ----------- | ---------------------- |
| Team size            | Small (1-5) | Large (5+)             |
| Deployment frequency | Low         | High                   |
| Scaling needs        | Uniform     | Variable per component |
| Complexity           | Low         | High                   |
| Data consistency     | Easy        | Hard (eventual)        |

### Recommended Patterns by Domain

| Domain      | Pattern            | Why                      |
| ----------- | ------------------ | ------------------------ |
| API Layer   | Hexagonal/Clean    | Testability, flexibility |
| Data Access | Repository Pattern | Abstraction from storage |
| Events      | Event Sourcing     | Audit trail, replay      |
| Caching     | Write-through      | Consistency              |
| Auth        | RBAC + ABAC        | Fine-grained control     |

## Decision Record Template

```markdown
## ADR-[N]: [Decision Title]

### Status: PROPOSED | ACCEPTED | DEPRECATED | SUPERSEDED

### Context

[What is the issue that we're seeing that is motivating this decision?]

### Decision

[What is the change that we're proposing/making?]

### Alternatives Considered

1. [Alternative 1]: [Pros] / [Cons]
2. [Alternative 2]: [Pros] / [Cons]

### Consequences

**Positive**: [Benefits]
**Negative**: [Costs/Risks]
**Neutral**: [Side effects]

### Reversibility

[How hard would it be to undo? What is the blast radius?]
```

## Design Review Checklist

- [ ] Requirements clearly understood
- [ ] At least 2 alternatives evaluated
- [ ] Trade-offs documented
- [ ] No circular dependencies introduced
- [ ] Layer boundaries respected
- [ ] Error handling strategy defined
- [ ] Performance characteristics understood
- [ ] Security implications evaluated
- [ ] Testability ensured
- [ ] Documentation planned
