# Qwen Orchestrator — Qwen Code 多 Agent AI 开发团队

**中文** · [English](../README.md) · [Español](README.es.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Français](README.fr.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 24](https://img.shields.io/badge/agents-24-blue.svg)](#-agent-团队24-个专业-agent)
[![Skills: 82](https://img.shields.io/badge/skills-82-purple.svg)](#-技能82-项专业技能)

> 🤖 **专为 [Qwen Code CLI](https://github.com/QwenLM/qwen-code) 打造的企业级多 Agent AI 编排扩展**
>
> 将你的 AI 编程助手转变为一个完整的**软件开发部门** — 24 个专业 Agent、82 项专业技能、6 个斜杠命令、持久化记忆和 MCP 工具集成。
>
> **作者：** [Omar-Obando](https://github.com/Omar-Obando) · **许可证：** MIT · **版本：** 0.0.6

---

## 📑 目录

- [Qwen Orchestrator 是什么？](#-qwen-orchestrator-是什么)
- [快速安装](#-快速安装)
- [快速开始](#-快速开始)
- [核心特性](#-核心特性)
- [Agent 团队（24 个专业 Agent）](#-agent-团队24-个专业-agent)
- [技能（82 项专业技能）](#-技能82-项专业技能)
- [命令（6 个斜杠命令）](#-命令6-个斜杠命令)
- [工作原理](#-工作原理)
  - [执行流程](#执行流程)
  - [用户清晰度：先问后做](#用户清晰度先问后做)
  - [架构图](#架构图)
- [安装指南](#-安装指南)
  - [快速安装（推荐）](#快速安装推荐)
  - [手动安装](#手动安装)
  - [MCP 工具服务器（可选）](#mcp-工具服务器可选)
  - [故障排除](#故障排除)
- [模型配置](#-模型配置)
- [CLI 模式推荐](#-cli-模式推荐)
- [高级工具](#-高级工具)
  - [Agent 间通信](#agent-间通信)
  - [实时监控](#实时监控)
  - [定时任务](#定时任务)
- [集成](#-集成)
  - [Context7（可选）](#context7可选)
  - [MCP Memory Server](#mcp-memory-server)
  - [UI/UX 技能（推荐）](#uiux-技能推荐)
- [质量标准](#-质量标准)
- [项目结构](#-项目结构)
- [使用示例](#-使用示例)
- [文档](#-文档)
- [作者](#-作者)
- [关键词](#-关键词)

---

## ⚡ Qwen Orchestrator 是什么？

**Qwen Orchestrator** 是一个专为 **[Qwen Code](https://github.com/QwenLM/qwen-code)** 构建的强大扩展 — Qwen Code 是阿里巴巴推出的开源 AI 编程 CLI 工具。它将单个 AI 编程助手转变为一个由 **24 个专业 AI Agent 组成的协调团队**，像一个专业的软件开发部门一样协同工作。

### 为什么选择 Qwen Orchestrator？

想象一下，你手边就有一支完整的工程团队：一个负责编排的 **Commander**、一个负责架构的 **Planner**、并行编码的**前端和后端开发者**、一个把控质量的 **Reviewer**、一个负责测试的 **QA 工程师**、一个审计漏洞的**网络安全工程师**、一个负责部署的 **DevOps 工程师** — 还有 16 名专家，全部自动协调工作。

**没有其他 AI 编程扩展能提供这种级别的专业多 Agent 编排能力。**

### 专属构建平台

<table>
<tr>
<td width="80" align="center">

![Qwen Code](https://img.shields.io/badge/Qwen%20Code-CLI-orange?style=for-the-badge)

</td>
<td>

**[Qwen Code](https://github.com/QwenLM/qwen-code)** 由 [QwenLM / Alibaba](https://github.com/QwenLM) 开发 — 开源 AI 编程助手 CLI，支持多种 LLM 提供商。Qwen Orchestrator 是一个**社区构建的扩展**，与阿里巴巴无关联或背书关系。

</td>
</tr>
</table>

> ⚠️ **此扩展仅适用于 [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**。它不是独立工具，不是 VS Code 扩展，也不兼容其他 AI 编程助手。如果你还没有安装 Qwen Code，请[先安装](https://github.com/QwenLM/qwen-code#installation)。

---

## 🚀 快速安装

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

搞定！扩展会自动注册所有 24 个 Agent、82 项技能、6 个命令和 MCP Memory Server。

> 📖 查看完整[安装指南](#-安装指南)了解手动安装、MCP 工具服务器和故障排除。

---

## 🎯 快速开始

安装后，在 Qwen Code CLI 中输入：

```bash
/orchestrator 创建用户管理的 REST API
/orchestrator 构建响应式电商网站
/plan 为博客设计数据库架构
/review 检查所有认证控制器
/test 运行当前项目的所有测试
/deploy 部署应用到生产环境
```

`/orchestrator` 是主入口命令。它激活完整的 24 Agent 团队和专业工作流：

1. **澄清** → 如有歧义，提出针对性问题
2. **发现** → 扫描项目，检测技术栈
3. **规划** → 将任务分解为可并行执行的里程碑
4. **执行** → 同时启动专业 Agent 以最大化效率
5. **验证** → Reviewer + QA 确认一切正常，零回归
6. **交付** → 总结构建内容、变更和证据

---

## 🌟 核心特性

| 特性                | 描述                                                                              |
| ------------------- | --------------------------------------------------------------------------------- |
| **24 个专业 Agent** | Commander、Planner、前后端开发者、Reviewer、QA、PM、DevOps、安全等                |
| **82 项专业技能**   | TDD、安全审计、反模式检测、设计系统、SQL、Docker、Kubernetes 等                   |
| **6 个斜杠命令**    | `/orchestrator`、`/orchestrate`、`/plan`、`/review`、`/test`、`/deploy`           |
| **先问后做**        | Agent 在编写代码前通过 `AskUserQuestion` 澄清需求                                 |
| **并行执行**        | Commander 将任务同时委派给多个 Agent                                              |
| **持久化记忆**      | Knowledge Graph 通过 MCP Memory Server 跨会话存储决策                             |
| **零模型锁定**      | 支持 Qwen、DeepSeek、OpenAI、Anthropic 或本地模型                                 |
| **多语言**          | TypeScript、PHP（Laravel）、Python（Django）、Dart（Flutter）、Rust、Go、Java、C# |
| **循环保护**        | Monitor Agent 自动检测并中断 LLM 无限循环                                         |
| **质量门控**        | Reviewer 是唯一可以批准任务的 Agent                                               |
| **安全优先**        | 通过安全审计技能和 Reviewer Agent 实现 OWASP Top 10 合规                          |
| **无模拟代码**      | Agent 被禁止编写桩代码或占位符                                                    |
| **压缩恢复**        | 状态持久化到 `.qwen-orchestrator/` — 上下文窗口压缩后仍可恢复                     |

---

## 👥 Agent 团队（24 个专业 Agent）

| #   | Agent                     | 角色            | 超能力                                 |
| --- | ------------------------- | --------------- | -------------------------------------- |
| 1   | **Commander** 🔴          | 编排大师        | 并行委派，不达目的不罢休               |
| 2   | **Planner** 🔵            | 研究与架构      | 文件级规划，设计决策                   |
| 3   | **Frontend Developer** 🔵 | UI/UX 实现      | 组件化、响应式、无障碍、快速           |
| 4   | **Backend Developer** 🟢  | 服务端逻辑      | API、认证、缓存、数据库操作            |
| 5   | **Reviewer** 🟣           | 质量把关者      | 唯一可以批准任务的 Agent               |
| 6   | **QA Engineer** 🟠        | 质量保证        | 测试策略，边缘案例发现                 |
| 7   | **Project Manager** 🔵    | 交付管理        | 范围控制，风险评估                     |
| 8   | **Doc Researcher** 🟣     | Context7 知识   | 实时文档查询，防幻觉                   |
| 9   | **Tech Lead** 🟡          | 标准与指导      | 模块完整性，CRUD 验证                  |
| 10  | **Database Architect** 🟢 | 数据层专家      | 架构设计，迁移安全                     |
| 11  | **Product Owner** 🟡      | 业务价值        | 用户故事，验收标准                     |
| 12  | **DevOps Engineer** 🔘    | 基础设施        | CI/CD、Docker、部署自动化              |
| 13  | **Code Quality Guard** 🌹 | 质量哨兵        | 语法检查、lint、类型检查               |
| 14  | **Monitor** 🛡️            | 循环守护者      | 检测/中断 LLM 循环，运行时监控         |
| 15  | **SEO Specialist** 🔵     | SEO 与 Web 性能 | Meta 标签、结构化数据、Core Web Vitals |
| 16  | **Tech Selector** 🟣      | 技术顾问        | 框架/数据库选择与利弊分析              |
| 17  | **Cybersecurity Eng.** 🔴 | 应用安全        | OWASP、威胁建模、依赖审计              |
| 18  | **Performance Eng.** ⚡   | 速度与扩展      | 性能分析、查询优化、负载测试           |
| 19  | **Release Manager** 🏷️    | 发布与版本管理  | SemVer、变更日志、回滚规划             |
| 20  | **API Specialist** 🔗     | API 与集成      | REST/GraphQL、版本管理、第三方 API     |
| 21  | **Mobile Engineer** 📱    | 移动应用        | Flutter、React Native、离线优先        |
| 22  | **Localization Eng.** 🌐  | i18n/L10n       | 多语言、RTL、文化适配                  |
| 23  | **Documenter** 📄         | 技术写作        | README、API 文档、ADR、知识库          |
| 24  | **Skill Creator** 🛠️      | 技能创作        | 技能创建、文档、测试                   |

---

## 🛠️ 技能（82 项专业技能）

### 容器化与编排

| 技能                     | 用途                                            |
| ------------------------ | ----------------------------------------------- |
| Docker Containerization  | 多阶段构建、安全加固、镜像优化、Docker Compose  |
| Kubernetes Orchestration | Deployments、HPA、Service Mesh、Ingress、GitOps |

### 基础设施即代码

| 技能          | 用途                                               |
| ------------- | -------------------------------------------------- |
| Terraform IaC | 模块、状态管理、工作空间、Sentinel 策略、Terratest |

### CI/CD 自动化

| 技能                 | 用途                                            |
| -------------------- | ----------------------------------------------- |
| GitHub Actions CI/CD | Workflows、矩阵、环境、缓存、复合 Actions、安全 |

### 缓存与性能

| 技能          | 用途                                              |
| ------------- | ------------------------------------------------- |
| Redis Caching | 数据结构、缓存模式、会话管理、发布/订阅、Lua 脚本 |

### API 设计

| 技能               | 用途                                                        |
| ------------------ | ----------------------------------------------------------- |
| GraphQL API Design | Schema 设计、Resolvers、DataLoader、分页、Apollo Federation |

### 多平台

| 技能               | 用途                                         |
| ------------------ | -------------------------------------------- |
| Multi-Platform Dev | 跨平台命令、路径处理、行尾符、权限、包管理器 |

### LLM 与 Agent

| 技能             | 用途                                  |
| ---------------- | ------------------------------------- |
| LangGraph        | Agent 工作流、状态管理、多 Agent 系统 |
| LangChain        | LLM 链、Agent、工具、记忆、RAG        |
| Qwen Agent       | Qwen 专用 Agent 开发与集成            |
| LLM Integrations | 多提供商 LLM 集成                     |

### 云平台

| 技能               | 用途                                    |
| ------------------ | --------------------------------------- |
| Vercel Deployment  | Serverless 函数、边缘计算、Next.js 优化 |
| Cloudflare Pages   | Edge Functions、全球分发、缓存          |
| Cloudflare Workers | 边缘计算、请求/响应处理                 |
| AWS Serverless     | Lambda、API Gateway、SAM、事件驱动架构  |

### SEO

| 技能          | 用途                                               |
| ------------- | -------------------------------------------------- |
| SEO LLM       | ChatGPT/Perplexity/Gemini/Claude/Bing AI/Qwen 优化 |
| Technical SEO | 网站速度、移动优化、结构化数据、Core Web Vitals    |

### 领导力与架构

| 技能                       | 用途                                 |
| -------------------------- | ------------------------------------ |
| Strategic Leadership       | 团队管理、决策、利益相关者对齐       |
| Requirements Engineering   | 用例、用户故事、验收标准             |
| Microservices Architecture | 领域驱动设计、服务边界、事件驱动通信 |
| Technology Evaluation      | 框架/数据库选择、利弊分析            |

### 产品与团队

| 技能          | 用途                                |
| ------------- | ----------------------------------- |
| Product Owner | 待办事项管理、用户故事、Sprint 规划 |
| Scrum Master  | 仪式引导、团队辅导、障碍消除        |

### 软件开发

| 技能                  | 用途                              |
| --------------------- | --------------------------------- |
| Testing Strategy      | 测试金字塔、覆盖率目标、自动化    |
| Security Auditor      | OWASP Top 10、漏洞评估、合规      |
| DevOps Pipeline       | CI/CD 设计、部署策略、IaC         |
| Architecture Patterns | 分层、DDD、微服务、事件驱动、CQRS |
| Documentation         | README、API 文档、ADR、知识库     |
| Debugging             | 系统化调查、假设驱动调试          |
| Refactoring           | 代码异味检测、安全转换            |

### 安全与质量

| 技能                 | 用途                                |
| -------------------- | ----------------------------------- |
| Security Code Review | OWASP Top 10、漏洞模式、安全编码    |
| Threat Modeling      | STRIDE、DREAD、攻击树、威胁识别     |
| Test Automation      | 框架设计、页面对象模式、并行执行    |
| Load Testing         | 负载、压力、耐久、峰值测试          |
| Code Review          | OWASP + SOLID + Clean Code 系统审查 |

### 数据库与数据

| 技能                | 用途                           |
| ------------------- | ------------------------------ |
| Database Design     | 架构设计、关系、索引策略       |
| Database Security   | 加密、访问控制、审计日志、合规 |
| SQL Best Practices  | 查询优化、索引、N+1 防护       |
| SQL Query Assistant | 查询辅助、最佳实践、优化       |

### 前端与移动端

| 技能               | 用途                                   |
| ------------------ | -------------------------------------- |
| Accessibility      | WCAG 2.1 AA、语义 HTML、ARIA、键盘导航 |
| Design System      | 调色板、排版、间距、组件架构           |
| Website Redesign   | 基于 URL/截图的重新设计、分析工作流    |
| Flutter Web        | 响应式布局、自适应组件、状态管理       |
| Mobile Performance | 应用优化、启动时间、内存使用           |
| Offline-First      | 本地存储、同步、冲突解决               |

### 后端与 API

| 技能                    | 用途                                            |
| ----------------------- | ----------------------------------------------- |
| API Design              | RESTful 标准、响应封装、分页                    |
| API Documentation       | OpenAPI 规范、Swagger、GraphQL Schema           |
| Third-Party Integration | Stripe、PayPal、AWS、Google、Twilio             |
| Laravel                 | Eloquent ORM、Form Requests、队列、API 模式     |
| NestJS                  | 模块、Guards、Pipes、Interceptors、请求生命周期 |
| Supabase                | RLS 策略、Edge Functions、认证、自动生成 API    |

### DevOps 与基础设施

| 技能              | 用途                                  |
| ----------------- | ------------------------------------- |
| Disaster Recovery | 备份策略、恢复流程、故障转移、RTO/RPO |
| Release Workflow  | SemVer、变更日志、预发布、生产、回滚  |
| Git Workflow      | 分支策略、提交规范、PR 模板           |
| Deployment        | CI/CD、Docker、发布管理               |

### LLM 专项

| 技能                | 用途                                 |
| ------------------- | ------------------------------------ |
| Anti-Hallucination  | 来源验证、基于证据的声明、验证       |
| Loop Detection      | LLM 循环检测、工具调用循环、逃逸路径 |
| Context7 Docs       | 通过 Context7 MCP 实时文档查询       |
| Compaction Recovery | 会话压缩期间的上下文保持             |

### 项目与团队

| 技能                     | 用途                                    |
| ------------------------ | --------------------------------------- |
| Agile Project Management | Scrum 仪式、待办事项梳理、Sprint 规划   |
| User Story Mapping       | 故事映射、史诗拆分、时间线可视化        |
| CRUD Completeness        | Create、Read、Update、Delete 模式、验证 |
| Project Conventions      | 项目结构、编码标准、约定                |
| ERP/SaaS Organization    | 大型项目组织、模块结构                  |

### 本地化

| 技能                 | 用途                      |
| -------------------- | ------------------------- |
| Translation Workflow | 翻译记忆、机器翻译、TMS   |
| Multi-Language       | i18n、l10n 模式、RTL 支持 |

### 其他技能

| 技能                   | 用途                               |
| ---------------------- | ---------------------------------- |
| Domain-Driven          | DDD 模式、限界上下文、聚合、值对象 |
| Performance            | 性能分析、优化、基准测试           |
| TDD Workflow           | 测试驱动开发（Red/Green/Refactor） |
| Security Audit         | OWASP Top 10 漏洞检测              |
| Agent Task Coordinator | Agent 协调、MCP 协议               |
| Skill Creation         | 技能创作、文档、测试               |
| Multi-Channel Funnels  | 营销漏斗、转化优化                 |
| Architecture           | 系统设计、模式、权衡               |
| Code Quality           | Linting、格式化、类型检查          |
| Monitoring             | 可观测性、日志、告警               |
| Compliance             | GDPR、HIPAA、SOC 2、PCI-DSS        |
| Testing                | 单元、集成、E2E 测试               |

---

## ⌨️ 命令（6 个斜杠命令）

| 命令                          | 描述                                        |
| ----------------------------- | ------------------------------------------- |
| **`/orchestrator [目标]`** ⭐ | **主入口** — 完整团队与清晰度协议（先提问） |
| `/orchestrate [任务]`         | 直接任务执行 — 不提问，直接构建             |
| `/plan [功能]`                | 仅创建实施计划 — 调研 + 架构                |
| `/review [目标]`              | 全面代码审查 — 安全、质量、模式             |
| `/test [目标]`                | 执行并分析测试套件 — 覆盖率、漏洞、边缘案例 |
| `/deploy [目标]`              | 部署与前后验证 — CI/CD、回滚计划            |

> **何时使用 `/orchestrator` vs `/orchestrate`？**
>
> - `/orchestrator` — 开始**新功能、项目或复杂任务**时。团队会先提问澄清。
> - `/orchestrate` — 当你已经**明确知道要什么**，只需要快速执行时。

---

## 🧠 工作原理

### 执行流程

```
用户输入 /orchestrator "构建支付系统"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   通过 AskUserQuestion│
         │   澄清范围           │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   分析项目           │
         │   创建里程碑         │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│前端开发  │  │后端开发   │  │数据库架构师       │
│任务 1   │  │任务 2    │  │Schema + 迁移      │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA 工程师  │  │代码质量守卫       │
│批准     │  │测试      │  │Lint + 类型检查    │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   任务完成           │
         │   交付总结           │
         └─────────────────────┘
```

### 用户清晰度：先问后做

编排器**从不假设**你想要什么。任务开始时，Commander 和 Planner Agent 使用 `AskUserQuestion` 工具在编写代码前澄清需求。

**交互示例：**

```
👤 用户: /orchestrator 构建电商结账系统

🤖 Commander: 在规划前我需要澄清几件事：

   📋 支付提供商（问题 1/3）
   应该集成哪个支付网关？
   ○ Stripe       — 行业标准，API 优秀，支持订阅
   ○ PayPal       — 广泛信任，国际支持好
   ○ MercadoPago  — 拉美市场最佳选择

   📋 结账流程（问题 2/3）
   什么类型的结账体验？
   ○ 单页         — 所有步骤在一页（更简单、更快）
   ○ 多步骤       — 每步独立页面（更可控）

   📋 访客结账（问题 3/3）
   用户能否无需账户即可结账？
   ○ 是           — 低摩擦，更高转化率
   ○ 否           — 需要账户，更利于留存

👤 用户选择: MercadoPago → 多步骤 → 是

🤖 Commander: 完美。规划使用 MercadoPago、多步骤流程、支持访客结账。
```

**会提问的 Agent：**

| Agent           | 何时提问                                      |
| --------------- | --------------------------------------------- |
| Commander       | 每次任务前 — 范围、优先级、约束               |
| Planner         | 架构决策前 — 技术栈、模式                     |
| Product Owner   | 定义用户故事时 — 验收标准、边缘案例           |
| QA Engineer     | 设计测试策略时 — 关键路径、阈值               |
| Project Manager | 范围界定时 — 截止日期、风险容忍度、资源       |
| Tech Selector   | 技术栈未指定时 — 展示框架、数据库、语言及利弊 |
| SEO Specialist  | 构建 Web 项目时 — 目标受众、内容类型、地区    |

> **提示**：你可以始终在一开始就提供完整细节以跳过提问。Agent 仅在检测到歧义时才会提问。

### 架构图

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    QWEN ORCHESTRATOR v0.0.6                            ║
║                     by Omar-Obando (GitHub)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  ┌─────────────────────────────────────────────────────────────────┐   ║
║  │                      COMMANDER 🔴                               │   ║
║  │       "我编排。不达目的不罢休。"                                 │   ║
║  │    探索 → 学习 → 适应 → 行动 → 验证 → 交付                     │   ║
║  └──────┬─────────┬─────────┬─────────┬────────────────────────────┘   ║
║         │         │         │         │                                 ║
║  ┌──────▼──┐ ┌────▼──────┐ ┌▼────────┐ ┌▼──────────────┐              ║
║  │ PLANNER │ │前端+后端   │ │REVIEWER │ │ QA ENGINEER   │              ║
║  │  🔵     │ │   🟢🟠    │ │  🟣     │ │    🟠         │              ║
║  │调研设计 │ │ TDD 编码  │ │质量把关 │ │测试策略       │              ║
║  └─────────┘ └───────────┘ └─────────┘ └───────────────┘              ║
║                                                                        ║
║  Agents: 24 | Skills: 82 | Commands: 6 | MCP Tools: 7 | Languages: 8+ ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 📦 安装指南

### 快速安装（推荐）

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

扩展会自动：

- ✅ 注册所有 24 个专业 Agent
- ✅ 加载所有 82 项专业技能
- ✅ 激活所有 6 个斜杠命令
- ✅ 设置 MCP Memory Server 用于持久化知识
- ✅ 一切就绪，立即可用

### 手动安装

**1. 获取扩展：**

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

**2. 告知 Qwen Code。** 添加到配置文件（`~/.qwen/settings.json`）：

```json
{
  "extensions": ["/完整路径/qwen-orchestrator"]
}
```

### MCP 工具服务器（可选）

```bash
cd qwen-orchestrator
npm install
npm run build
```

然后添加到 Qwen Code MCP 配置：

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

### 故障排除

| 问题                 | 解决方案                                                |
| -------------------- | ------------------------------------------------------- |
| 安装后"命令未找到"   | 重启 Qwen Code CLI 以重新加载扩展                       |
| npm 命令"权限被拒绝" | Windows：以管理员运行终端。Mac/Linux：必要时使用 `sudo` |
| 会话文件存储在哪？   | 项目中的 `.qwen-orchestrator/` 目录                     |

---

## ⚙️ 模型配置

**默认情况下，所有 Agent 使用你的 Qwen Code 默认模型。** 无硬编码模型 — 零锁定。

### 使用默认模型（推荐）

直接安装使用。每个 Agent 会使用你在 Qwen Code 中配置的模型。

### 按 Agent 设置特定模型

编辑 `agents/` 中的 Agent `.md` 文件，取消注释 `model` 行：

```yaml
---
name: commander
model: qwen-max
---
```

### 按角色推荐模型

| Agent              | 推荐模型                  | 原因                       |
| ------------------ | ------------------------- | -------------------------- |
| Commander          | `qwen-max` 或 `qwen-plus` | 需要强推理能力进行编排     |
| Planner            | `qwen-max` 或 `qwen-plus` | 需要强分析能力进行架构设计 |
| Frontend Developer | `qwen3-coder-plus`        | 针对代码生成优化           |
| Backend Developer  | `qwen3-coder-plus`        | 针对代码生成优化           |
| Reviewer           | `qwen-max`                | 需要深度理解进行质量把关   |
| QA Engineer        | `qwen-plus`               | 平衡的测试策略能力         |
| Code Quality Guard | `qwen-plus`               | 语法/lint 检查速度快       |
| 其他所有           | 用户默认                  | 无特殊需求                 |

---

## 🔧 高级工具

### Agent 间通信

Commander 可在任务执行中向后台 Agent 发送消息：

```
SendMessage({ task_id: "worker-auth", message: "用户澄清：使用 JWT，不用 sessions。" })
```

### 实时监控

DevOps Engineer 可观察长时间运行的进程：

```
Monitor({ command: "docker compose logs -f app", description: "部署期间查看应用日志" })
```

### 定时任务

```
CronCreate({ cron: "0 6 * * 1-5", prompt: "运行安全审计", recurring: true })
```

---

## 🔌 集成

### Context7（可选）

[Context7](https://context7.com) 提供实时、版本特定的文档。

安装方式 — 添加到 Qwen Code MCP 配置：

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

提供跨会话持久化的 **Knowledge Graph**。自动配置在 `qwen-extension.json` 中。

### UI/UX 技能（推荐）

| 技能                | 安装命令                                                 | 提供内容                                 |
| ------------------- | -------------------------------------------------------- | ---------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     | 161 推理规则、67 UI 风格、设计系统生成器 |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   | 87 技能、8 个设计插件                    |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` | 高级前端框架                             |

---

## ✅ 质量标准

编排器生成的每行代码都满足：

| 标准   | 要求                                      |
| ------ | ----------------------------------------- |
| 复杂度 | 每个函数 ≤ 10 圈复杂度                    |
| 大小   | 每个函数 ≤ 40 行，≤ 4 个参数              |
| 类型   | 严格类型，无 `any`                        |
| 测试   | TDD 强制，80%+ 覆盖率                     |
| 安全   | OWASP Top 10 合规                         |
| SQL    | 大写关键词、每行一列、缩进 JOIN、N+1 防护 |
| 审查   | 合并前多维代码审查                        |
| 语言   | 不仅限 TypeScript — 适配项目技术栈        |

---

## 📁 项目结构

```
qwen-orchestrator/
├── agents/                   # 24 个 Agent 定义
├── skills/                   # 82 项技能定义
├── commands/                 # 6 个斜杠命令
├── context/QWEN.md           # 最佳实践
├── mcp-server/src/           # MCP 工具服务器
├── docs/                     # 文档和翻译
├── qwen-extension.json       # 扩展清单
├── package.json
├── AGENTS.md                 # Agent 操作规则
├── LICENSE                   # MIT 许可
└── README.md
```

---

## 🎯 使用示例

```bash
/orchestrator 创建用户管理的 REST API
/orchestrator 构建带 Stripe 支付的响应式电商网站
/plan 为博客平台设计数据库架构
/review 检查所有认证控制器的安全问题
/test 运行当前项目所有测试并报告覆盖率漏洞
/deploy 部署应用到生产环境及回滚计划
```

---

## 📚 文档

| 文档                               | 描述               |
| ---------------------------------- | ------------------ |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 详细架构与设计决策 |
| [QUICK-START.md](QUICK-START.md)   | 快速入门指南       |
| [INSTALLATION.md](INSTALLATION.md) | 完整安装说明       |
| [English README](../README.md)     | 完整英文文档       |

---

## 👤 作者

**Omar Obando**

- GitHub: [@Omar-Obando](https://github.com/Omar-Obando)
- 许可证: MIT

---

## 🔑 关键词

`qwen-code` · `multi-agent` · `ai-agents` · `orchestration` · `ai-coding` · `tdd` · `code-review` · `devops` · `mcp` · `ai-orchestrator` · `enterprise-ai` · `deepseek` · `openai` · `flutter` · `laravel` · `nestjs` · `typescript` · `python` · `sql` · `security-audit` · `owasp`

---

<div align="center">

**为 [Qwen Code](https://github.com/QwenLM/qwen-code) 社区用 ❤️ 构建**

[⬆ 返回顶部](#qwen-orchestrator--qwen-code-多-agent-ai-开发团队)

</div>
