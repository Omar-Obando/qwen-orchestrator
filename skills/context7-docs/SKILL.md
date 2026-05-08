---
name: context7-docs
description: >
  Context7 MCP integration skill for real-time documentation lookup.
  Use whenever an agent encounters an unfamiliar API, library, framework,
  or pattern. Queries Context7 to fetch verified, version-specific docs.
  The primary defense against hallucinated API signatures.
license: MIT
---

# Context7 Docs Skill — Live Documentation Lookup

This skill integrates Context7 MCP tools into the orchestrator workflow, providing real-time access to official documentation for any library or framework.

## When to Use

Use this skill when ANY of these situations arise:

- An agent needs to verify an API signature
- A Developer needs to use a library they're not 100% sure about
- A Planner needs to check if a feature exists in a specific version
- A Reviewer needs to validate that code follows current best practices
- Any agent encounters "I'm not sure about this..."

## Workflow

### 1. Resolve Library ID

```
Tool: context7_resolve-library-id
Input:
  libraryName: "React"  (use official name)
  query: "How to use useEffect cleanup function"
Output:
  libraryId: "/facebook/react"
```

### 2. Query Documentation

```
Tool: context7_query-docs
Input:
  libraryId: "/facebook/react"
  query: "useEffect cleanup function examples"
Output:
  [Relevant documentation snippets with code examples]
```

### 3. Cache Results

Save to `$SESSION_DIR/docs/` for future sessions:

```markdown
# [Library] — [Topic]

- Retrieved: [date]
- Library ID: [Context7 ID]
- Version: [if available]
- Key findings: [summary]
- Code examples: [snippets]
```

## Integration Points

### For Developer Agents

Before implementing with an unfamiliar library:

```
1. Resolve library ID via Context7
2. Query for specific API/feature
3. Read the code examples
4. Implement following official patterns
5. Cache for future reference
```

### For Reviewer Agent

When reviewing code that uses a specific library:

```
1. Resolve library ID via Context7
2. Query for the specific API being used
3. Compare implementation against official patterns
4. Flag deviations from recommended usage
```

### For Planner Agent

When planning features that depend on libraries:

```
1. Resolve library IDs for all dependencies
2. Query for feature availability in target version
3. Check for breaking changes between versions
4. Document version requirements in plan
```

## Anti-Hallucination Rules

1. **NEVER** guess API signatures — always verify via Context7
2. **NEVER** assume version compatibility — check specific version docs
3. **NEVER** use knowledge from memory for critical implementation details
4. **ALWAYS** cite the Context7 source when providing information
5. **ALWAYS** cache results for session continuity

## Fallback Strategy

If Context7 is unavailable:

1. Check `.qwen-orchestrator/docs/` for cached documentation
2. Use `WebFetch` to access official documentation sites
3. Read the library's source code from `node_modules/`
4. Search GitHub for examples and issues
5. Clearly state: "Documentation was retrieved from [fallback source], confidence level: [MEDIUM/LOW]"

## Supported Libraries (Examples)

| Library     | Context7 ID               |
| ----------- | ------------------------- |
| React       | /facebook/react           |
| Next.js     | /vercel/next.js           |
| Express     | /expressjs/express        |
| Prisma      | /prisma/prisma            |
| TypeScript  | /microsoft/TypeScript     |
| Node.js     | /nodejs/node              |
| TailwindCSS | /tailwindlabs/tailwindcss |
| Zod         | /colinhacks/zod           |
| Vitest      | /vitest-dev/vitest        |
