---
name: skill-creation
description: >
  Guide for creating high-quality Qwen Code skills. Use this skill when
  creating new skills for projects, especially large-scale applications
  like ERP, SaaS, or enterprise systems that need clear rules and workflows.
  Uses Context7 to verify best practices and learn from official documentation.
---

# Skill Creation Guide — Professional Skill Development

You are creating a Qwen Code skill to encode project-specific knowledge. Follow these principles to ensure your skill is effective, maintainable, and professional.

## Core Principles (Clean Code for Skills)

### 1. Single Responsibility
Each skill should focus on **one specific task or pattern**:
- ✅ Good: `react-component-patterns`
- ✅ Good: `laravel-api-endpoint-structure`
- ❌ Bad: `coding-best-practices` (too broad)

### 2. Clear Scope and When to Use
Every skill must clearly state:
- **What** it does
- **When** to use it
- **When not** to use it

### 3. Actionable Instructions
Provide step-by-step guidance, not vague advice:
```markdown
# Good
1. Create the component file with .tsx extension
2. Define the interface with all props
3. Implement the component function
4. Add JSDoc comments

# Bad
"Make good components" (not actionable)
```

### 4. Examples Over Theory
Always provide concrete examples:
```markdown
## Good Pattern
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

## Bad Pattern
```tsx
// Don't do this
const Button = ({ label }) => { ... }
```
```

## Skill Creation Workflow

### Phase 1: Research with Context7

Before creating a skill, use Context7 to learn best practices:

1. **Resolve the library/framework**:
   - Query: "skill creation best practices"
   - Library: "Qwen Code" or "Claude Code"

2. **Query documentation**:
   - Ask: "What are the best practices for skill creation?"
   - Learn: Structure, format, and content guidelines

3. **Verify patterns**:
   - Cross-reference with official examples
   - Update if official docs differ

### Phase 2: Skill Structure

```markdown
---
name: {{skill-name}}
description: >
  {{One-sentence purpose}}
  Use this skill when {{specific scenario}}.
---

# {{Skill Title}}

## When to Use This Skill

Use this skill when:
- {{Condition 1}}
- {{Condition 2}}
- {{Condition 3}}

Do NOT use this skill when:
- {{Exception 1}}
- {{Exception 2}}

## Core Principles

1. **Principle 1**: Brief description
2. **Principle 2**: Brief description
3. **Principle 3**: Brief description

## Step-by-Step Workflow

### Step 1: {{Action}}
- Action detail
- Example if helpful

### Step 2: {{Action}}
- Action detail
- Example if helpful

## Output Format

When completing this task, output:
1. {{Item 1}}
2. {{Item 2}}
3. {{Item 3}}

## Examples

### Good Pattern
```language
// Good example
```

### Bad Pattern
```language
// Bad example - don't do this
```

## Common Pitfalls

- ❌ **Pitfall 1**: Description
- ❌ **Pitfall 2**: Description
- ❌ **Pitfall 3**: Description

## Quality Checklist

Before finishing, verify:
- [ ] Follows project conventions
- [ ] Includes concrete examples
- [ ] Specifies output format
- [ ] References official docs (Context7)
```

### Phase 3: Project-Specific Skills (ERP, SaaS, Enterprise)

For large projects, create skills that capture:

#### ERP Skills
- `erp-module-structure`: How to structure ERP modules
- `erp-api-endpoint-patterns`: API design for ERP systems
- `erp-database-schema`: Database patterns for ERP

#### SaaS Skills
- `saas-authentication-flow`: Authentication patterns
- `saas-tenant-isolation`: Multi-tenancy patterns
- `saas-billing-integration`: Billing system patterns

#### Enterprise Skills
- `enterprise-logging-strategy`: Logging patterns
- `enterprise-error-handling`: Error handling patterns
- `enterprise-security-standards`: Security guidelines

## Context7 Integration

Always use Context7 to improve your skills:

1. **Before creating a skill**:
   ```
   1. Resolve: "Qwen Code" + "skill creation"
   2. Query: "Best practices for skill creation"
   3. Learn: Structure, format, content guidelines
   ```

2. **When documenting patterns**:
   ```
   1. Resolve: "React" + "component patterns"
   2. Query: "Best practices for React components"
   3. Verify: Your skill matches official docs
   ```

3. **When adding examples**:
   ```
   1. Resolve: "TypeScript" + "interface definitions"
   2. Query: "Best practices for TypeScript interfaces"
   3. Update: Examples to match current best practices
   ```

## Clean Code Principles for Skills

### 1. Meaningful Names
- Skill names should be descriptive: `laravel-crud-patterns`
- Avoid abbreviations: `laravel-crud-patterns` not `lcp`

### 2. Small and Focused
- One skill per pattern/concept
- If a skill is too long, split it

### 3. DRY (Don't Repeat Yourself)
- Reference other skills instead of duplicating
- Use `Skill` tool to invoke related skills

### 4. Single Level of Abstraction
- Mix high-level and specific instructions
- Don't jump between levels

### 5. Clear Success Criteria
- Define what "done" looks like
- Include quality checklist

## Output Format

When creating a skill file:

1. **File location**: `skills/<skill-name>/SKILL.md`
2. **YAML frontmatter**: Valid and complete
3. **Content structure**: Follow the template above
4. **Code examples**: Properly formatted with language identifiers

## Quality Checklist

Before finalizing a skill:

- [ ] **Single Responsibility**: One clear purpose
- [ ] **Clear When to Use**: Specific conditions stated
- [ ] **Actionable Steps**: Step-by-step guidance
- [ ] **Concrete Examples**: Good and bad examples
- [ ] **Output Format**: Specifies what to produce
- [ ] **Context7 Verified**: Matches official documentation
- [ ] **Clean Code**: Follows principles above
- [ ] **Project Conventions**: Matches existing style
- [ ] **No Forced Changes**: Respects existing code
- [ ] **Permanent Memory**: Saves user preferences

## Anti-Patterns to Avoid

- ❌ **Too Broad**: `coding-best-practices` (split into multiple skills)
- ❌ **Vague Instructions**: "Make good code" (be specific)
- ❌ **Missing Examples**: No good/bad examples provided
- ❌ **Ignoring Context7**: Not verifying against official docs
- ❌ **Overwriting Files**: Creating skills that force changes
- ❌ **No When to Use**: Not specifying the scope

## Example: Complete Skill

See `skills/synonyms/SKILL.md` for a complete example of a well-structured skill.
