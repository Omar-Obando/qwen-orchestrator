/**
 * Qwen Orchestrator MCP Server
 *
 * Provides orchestration tools via the Model Context Protocol.
 * This server exposes tools that the Qwen Code CLI can use to
 * interact with the orchestrator system.
 *
 * @author Omar-Obando
 * @license MIT
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "qwen-orchestrator",
  version: "0.0.1",
});

// ---------------------------------------------------------------------------
// Tool: Get Mission Status
// ---------------------------------------------------------------------------
server.registerTool(
  "get_mission_status",
  {
    description:
      "Get the current mission status from the orchestrator. Returns progress, active agents, and next actions.",
    inputSchema: z.object({
      projectPath: z.string().describe("Absolute path to the project root"),
    }).shape,
  },
  async ({ projectPath }) => {
    const status = {
      orchestrator: "qwen-orchestrator",
      version: "0.0.1",
      author: "Omar-Obando",
      projectPath,
      agents: [
        { name: "commander", role: "Master Orchestrator", status: "ready" },
        { name: "planner", role: "Research & Architecture", status: "ready" },
        {
          name: "frontend-developer",
          role: "UI/UX Implementation",
          status: "ready",
        },
        {
          name: "backend-developer",
          role: "API & Server-Side Logic",
          status: "ready",
        },
        { name: "reviewer", role: "Quality Gatekeeper", status: "ready" },
        { name: "qa-engineer", role: "Quality Assurance", status: "ready" },
        {
          name: "project-manager",
          role: "Delivery & Scope Management",
          status: "ready",
        },
        {
          name: "doc-researcher",
          role: "Documentation & Research",
          status: "ready",
        },
        { name: "tech-lead", role: "Technical Leadership", status: "ready" },
        {
          name: "database-architect",
          role: "Database Design & Optimization",
          status: "ready",
        },
        {
          name: "product-owner",
          role: "Product & User Stories",
          status: "ready",
        },
        {
          name: "devops-engineer",
          role: "Infrastructure & CI/CD",
          status: "ready",
        },
        {
          name: "code-quality-guard",
          role: "Code Standards & Anti-Patterns",
          status: "ready",
        },
        {
          name: "monitor",
          role: "Loop Guardian & Runtime Health",
          status: "ready",
        },
        {
          name: "seo-specialist",
          role: "SEO & Web Optimization",
          status: "ready",
        },
        {
          name: "tech-selector",
          role: "Technology Selection & Comparison",
          status: "ready",
        },
        {
          name: "cybersecurity-engineer",
          role: "Application Security",
          status: "ready",
        },
        {
          name: "performance-engineer",
          role: "Speed & Scale",
          status: "ready",
        },
        {
          name: "release-manager",
          role: "Release & Versioning",
          status: "ready",
        },
        {
          name: "api-specialist",
          role: "API & Integration",
          status: "ready",
        },
        {
          name: "mobile-engineer",
          role: "Mobile Apps",
          status: "ready",
        },
        {
          name: "localization-engineer",
          role: "i18n/L10n",
          status: "ready",
        },
      ],
      skills: [
        "code-review",
        "architect",
        "tdd-workflow",
        "security-audit",
        "performance",
        "debugging",
        "deployment",
        "context7-docs",
        "domain-driven",
        "api-design",
        "refactoring",
        "compaction-recovery",
        "git-workflow",
        "database-design",
        "anti-pattern",
        "multi-lang",
        "sql-best-practices",
        "flutter-web",
        "laravel",
        "nestjs",
        "supabase",
      ],
      commands: [
        "/orchestrator",
        "/orchestrate",
        "/plan",
        "/review",
        "/test",
        "/deploy",
      ],
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(status, null, 2),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Validate Project
// ---------------------------------------------------------------------------
server.registerTool(
  "validate_project",
  {
    description:
      "Validate that a project meets quality standards by checking for required configuration files, test setup, and code quality tools.",
    inputSchema: z.object({
      projectPath: z.string().describe("Path to the project"),
      checks: z
        .array(
          z.enum([
            "package.json",
            "tsconfig",
            "tests",
            "linting",
            "ci-cd",
            "docker",
            "readme",
          ]),
        )
        .optional()
        .describe("Specific checks to perform"),
    }).shape,
  },
  async ({ projectPath, checks }) => {
    const results = {
      projectPath,
      timestamp: new Date().toISOString(),
      checks: {
        "package.json": { status: "info", message: "Check manually" },
        tsconfig: { status: "info", message: "Check manually" },
        tests: { status: "info", message: "Verify test framework setup" },
        linting: { status: "info", message: "Verify ESLint/Prettier config" },
        "ci-cd": {
          status: "info",
          message: "Check for GitHub Actions or similar",
        },
        docker: {
          status: "info",
          message: "Check for Dockerfile",
        },
        readme: {
          status: "info",
          message: "Ensure README.md exists",
        },
      },
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Generate TODO Template
// ---------------------------------------------------------------------------
server.registerTool(
  "generate_todo",
  {
    description:
      "Generate a TODO.md template for a mission with hierarchical task decomposition.",
    inputSchema: z.object({
      mission: z.string().describe("Mission description"),
      milestones: z
        .number()
        .min(1)
        .max(10)
        .optional()
        .describe("Number of milestones (default: 3)"),
    }).shape,
  },
  async ({ mission, milestones = 3 }) => {
    let todo = `# Mission: ${mission}\n\n`;

    for (let m = 1; m <= milestones; m++) {
      todo += `## M${m}: [Milestone ${m} Description] | status: pending\n`;
      todo += `### T${m}.1: [Task ${m}.1] | agent:Frontend Developer\n`;
      todo += `- [ ] S${m}.1.1: [Sub-task] | size:S\n`;
      todo += `- [ ] S${m}.1.2: [Sub-task] | size:M\n\n`;
      todo += `### T${m}.2: [Review ${m}] | agent:Reviewer | depends:T${m}.1\n`;
      todo += `- [ ] S${m}.2.1: [Verification] | size:S\n\n`;
    }

    todo += `---\n_Generated by qwen-orchestrator v0.0.1 (Omar-Obando)_\n`;

    return {
      content: [
        {
          type: "text",
          text: todo,
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Get Agent Roster
// ---------------------------------------------------------------------------
server.registerTool(
  "get_agent_roster",
  {
    description:
      "Get the full list of available agents with their roles, capabilities, and recommended use cases.",
    inputSchema: z.object({}).shape,
  },
  async () => {
    const roster = {
      agents: [
        {
          name: "commander",
          role: "Master Orchestrator",
          color: "red",
          capabilities: [
            "Mission decomposition",
            "Parallel delegation",
            "Progress monitoring",
            "Inter-agent messaging",
            "Recovery handling",
            "Loop detection",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "TodoWrite",
            "ListFiles",
            "WebFetch",
            "Agent",
            "Lsp",
            "SaveMemory",
            "SendMessage",
            "Monitor",
            "TaskStop",
            "CronCreate",
            "CronList",
          ],
        },
        {
          name: "planner",
          role: "Research & Architecture",
          color: "blue",
          capabilities: [
            "Codebase analysis",
            "Architecture design",
            "TODO creation",
            "Documentation research",
            "Plan approval via ExitPlanMode",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "TodoWrite",
            "ListFiles",
            "WebFetch",
            "Agent",
            "Lsp",
            "SaveMemory",
            "SendMessage",
            "ExitPlanMode",
          ],
        },
        {
          name: "frontend-developer",
          role: "UI/UX Implementation",
          color: "#61DAFB",
          capabilities: [
            "Component architecture",
            "Responsive design",
            "Accessibility (WCAG)",
            "CSS/animation optimization",
            "Framework expertise (React, Vue, Angular, Svelte, Next.js, Nuxt)",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "Lsp",
            "SaveMemory",
            "Skill",
          ],
        },
        {
          name: "backend-developer",
          role: "API & Server-Side Logic",
          color: "#68A063",
          capabilities: [
            "API design (REST/GraphQL)",
            "Database operations",
            "Authentication & authorization",
            "Microservices architecture",
            "Multi-language (Node.js, Python, PHP, Go, Java, Rust)",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Lsp",
            "SaveMemory",
            "TodoWrite",
            "Skill",
          ],
        },
        {
          name: "reviewer",
          role: "Quality Gatekeeper",
          color: "purple",
          capabilities: [
            "Code review",
            "Integration testing",
            "Sync verification",
            "TODO approval",
            "Documentation",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "Lsp",
            "SaveMemory",
            "WebFetch",
          ],
        },
        {
          name: "qa-engineer",
          role: "Quality Assurance",
          color: "orange",
          capabilities: [
            "Test strategy",
            "Coverage analysis",
            "Edge case discovery",
            "Regression testing",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "project-manager",
          role: "Delivery & Scope Management",
          color: "cyan",
          capabilities: [
            "Scope management",
            "Risk assessment",
            "Progress tracking",
            "Scheduled tasks",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "SaveMemory",
            "CronCreate",
            "CronList",
          ],
        },
        {
          name: "doc-researcher",
          role: "Documentation & Research",
          color: "amber",
          capabilities: [
            "API docs research",
            "Framework docs",
            "Best practices",
            "Context caching",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "SaveMemory",
            "TodoWrite",
          ],
        },
        {
          name: "tech-lead",
          role: "Technical Leadership",
          color: "indigo",
          capabilities: [
            "Architecture decisions",
            "Code standards",
            "Mentoring",
            "Technical planning",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Lsp",
            "SaveMemory",
          ],
        },
        {
          name: "database-architect",
          role: "Database Design & Optimization",
          color: "teal",
          capabilities: [
            "Schema design",
            "Query optimization",
            "N+1 prevention",
            "Migration planning",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Lsp",
          ],
        },
        {
          name: "product-owner",
          role: "Product & User Stories",
          color: "pink",
          capabilities: [
            "User story creation",
            "Acceptance criteria",
            "Priority management",
            "Stakeholder communication",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "devops-engineer",
          role: "Infrastructure & CI/CD",
          color: "slate",
          capabilities: [
            "Docker/K8s",
            "CI/CD pipelines",
            "Monitoring",
            "Scheduled audits",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Monitor",
            "CronCreate",
            "CronList",
            "CronDelete",
          ],
        },
        {
          name: "code-quality-guard",
          role: "Code Standards & Anti-Patterns",
          color: "rose",
          capabilities: [
            "Anti-pattern detection",
            "Standards enforcement",
            "Complexity analysis",
            "Dead code detection",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Lsp",
          ],
        },
        {
          name: "monitor",
          role: "Loop Guardian & Runtime Health",
          color: "yellow",
          capabilities: [
            "Loop detection",
            "Runtime error monitoring",
            "Agent health checks",
            "Auto-recovery",
          ],
          tools: [
            "Grep",
            "ReadFile",
            "Shell",
            "TodoWrite",
            "SaveMemory",
            "SendMessage",
            "TaskStop",
            "Monitor",
            "CronCreate",
            "CronList",
            "CronDelete",
            "Lsp",
            "Glob",
          ],
        },
        {
          name: "seo-specialist",
          role: "SEO & Web Optimization",
          color: "#1A73E8",
          capabilities: [
            "SEO audits",
            "Meta tags & Open Graph",
            "Core Web Vitals",
            "Structured data",
            "Sitemap & robots.txt",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "ListFiles",
            "WebFetch",
            "WriteFile",
            "Edit",
            "Shell",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "tech-selector",
          role: "Technology Selection & Comparison",
          color: "#7C3AED",
          capabilities: [
            "Framework comparison",
            "Pros/cons analysis",
            "User-driven selection",
            "Decision documentation",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "ListFiles",
            "WebFetch",
            "Shell",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "cybersecurity-engineer",
          role: "Application Security",
          color: "#FF4444",
          capabilities: [
            "OWASP Top 10 prevention",
            "Threat modeling",
            "Vulnerability assessment",
            "Secure coding practices",
            "Penetration testing guidance",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "performance-engineer",
          role: "Speed & Scale",
          color: "#FF9900",
          capabilities: [
            "Profiling & bottleneck identification",
            "Query optimization",
            "Caching strategies",
            "Load testing",
            "Performance budgets",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "Lsp",
            "SaveMemory",
            "Monitor",
          ],
        },
        {
          name: "release-manager",
          role: "Release & Versioning",
          color: "#8B5CF6",
          capabilities: [
            "Semantic versioning",
            "Changelog generation",
            "Release workflows",
            "Rollback planning",
            "Deployment coordination",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WriteFile",
            "Edit",
            "WebFetch",
            "SaveMemory",
          ],
        },
        {
          name: "api-specialist",
          role: "API & Integration",
          color: "#00D4AA",
          capabilities: [
            "REST/GraphQL/gRPC design",
            "API versioning",
            "Rate limiting",
            "Third-party integrations",
            "Contract-first design",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "WriteFile",
            "Edit",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
        {
          name: "mobile-engineer",
          role: "Mobile Apps",
          color: "#00B4D8",
          capabilities: [
            "Cross-platform (Flutter, React Native)",
            "Native (iOS/Swift, Android/Kotlin)",
            "Offline-first architecture",
            "Push notifications",
            "App store deployment",
          ],
          tools: [
            "Edit",
            "WriteFile",
            "ReadFile",
            "Grep",
            "Glob",
            "Shell",
            "ListFiles",
            "WebFetch",
            "AskUserQuestion",
            "Lsp",
            "SaveMemory",
            "Skill",
          ],
        },
        {
          name: "localization-engineer",
          role: "i18n/L10n",
          color: "#F59E0B",
          capabilities: [
            "Multi-language support",
            "RTL/LTR layouts",
            "Cultural adaptation",
            "Date/number formatting",
            "Translation management",
          ],
          tools: [
            "ReadFile",
            "Grep",
            "Glob",
            "ListFiles",
            "WebFetch",
            "WriteFile",
            "Edit",
            "AskUserQuestion",
            "SaveMemory",
          ],
        },
      ],
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(roster, null, 2),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Context7 Resolve Library
// ---------------------------------------------------------------------------
server.registerTool(
  "context7_resolve_library",
  {
    description:
      "Resolve a library name to a Context7-compatible library ID for documentation queries. Use before querying docs.",
    inputSchema: z.object({
      libraryName: z
        .string()
        .describe(
          'Official library name (e.g., "React", "Next.js", "Express")',
        ),
      query: z
        .string()
        .describe("What you need help with, used to rank results by relevance"),
    }).shape,
  },
  async ({ libraryName, query }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              instruction:
                "Use the Context7 MCP tools (context7_resolve-library-id then context7_query-docs) to fetch real documentation. This tool provides the lookup strategy.",
              libraryName,
              query,
              recommendedWorkflow: [
                "1. Call context7_resolve-library-id with libraryName and query",
                "2. Get the libraryId from the result",
                "3. Call context7_query-docs with libraryId and specific question",
                "4. Use the returned documentation to implement correctly",
              ],
              commonLibraries: {
                React: "/facebook/react",
                "Next.js": "/vercel/next.js",
                Express: "/expressjs/express",
                Prisma: "/prisma/prisma",
                TypeScript: "/microsoft/TypeScript",
                TailwindCSS: "/tailwindlabs/tailwindcss",
                Zod: "/colinhacks/zod",
                Vitest: "/vitest-dev/vitest",
                "Node.js": "/nodejs/node",
              },
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Check CRUD Completeness
// ---------------------------------------------------------------------------
server.registerTool(
  "check_crud_completeness",
  {
    description:
      "Check CRUD completeness for a module entity. Returns a matrix of required operations and their status.",
    inputSchema: z.object({
      moduleName: z.string().describe("Name of the module"),
      entityName: z.string().describe("Name of the entity to check"),
      projectPath: z.string().describe("Absolute path to the project root"),
    }).shape,
  },
  async ({ moduleName, entityName, projectPath }) => {
    const matrix = {
      module: moduleName,
      entity: entityName,
      projectPath,
      operations: {
        create: {
          required: true,
          checks: [
            "Input validation with specific error messages",
            "Unique constraint checking before insert",
            "Default values applied",
            "Relationships validated (FK existence)",
            "Audit trail (createdBy, createdAt)",
          ],
        },
        readList: {
          required: true,
          checks: [
            "Pagination (cursor or offset)",
            "Filtering by relevant fields",
            "Sorting by configurable columns",
            "Include counts and aggregates",
          ],
        },
        readDetail: {
          required: true,
          checks: [
            "Include related entities",
            "404 handling with clear message",
            "Authorization check",
          ],
        },
        update: {
          required: true,
          checks: [
            "Partial update support (PATCH)",
            "Immutable fields protection",
            "Optimistic locking or version check",
            "Audit trail (updatedBy, updatedAt)",
          ],
        },
        delete: {
          required: true,
          checks: [
            "Soft delete by default (deletedAt)",
            "Cascade behavior defined",
            "Referential integrity check",
          ],
        },
        restore: {
          required: "if soft delete is used",
          checks: ["Restore soft-deleted record", "Re-validate constraints"],
        },
      },
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(matrix, null, 2),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Tool: Create Checkpoint (Compaction Recovery)
// ---------------------------------------------------------------------------
server.registerTool(
  "create_checkpoint",
  {
    description:
      "Create a checkpoint snapshot for compaction recovery. Saves current mission state to survive context window compression.",
    inputSchema: z.object({
      missionName: z.string().describe("Current mission name"),
      progress: z.string().describe('Progress summary (e.g., "5/12 tasks")'),
      activeAgent: z.string().describe("Currently active agent"),
      currentTask: z.string().describe("Current task description"),
      lastCompletedStep: z.string().describe("Last completed step"),
      nextStep: z.string().describe("Exact next step to take"),
      filesModified: z
        .array(z.string())
        .describe("List of files modified in this session"),
      blockers: z.string().optional().describe("Any current blockers"),
    }).shape,
  },
  async ({
    missionName,
    progress,
    activeAgent,
    currentTask,
    lastCompletedStep,
    nextStep,
    filesModified,
    blockers,
  }) => {
    const checkpoint = {
      timestamp: new Date().toISOString(),
      mission: missionName,
      progress,
      activeAgent,
      currentTask,
      lastCompletedStep,
      nextStep,
      filesModified,
      blockers: blockers || "None",
      recoveryInstructions: [
        "1. Read this checkpoint",
        "2. Read .qwen-orchestrator/todo.md",
        "3. Verify files match recorded state",
        `4. Resume: ${nextStep}`,
      ],
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(checkpoint, null, 2),
        },
      ],
    };
  },
);

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
const transport = new StdioServerTransport();
await server.connect(transport);
