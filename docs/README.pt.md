# Qwen Orchestrator — Equipe de Desenvolvimento IA Multi-Agente para Qwen Code

**Português** · [English](../README.md) · [Español](README.es.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Français](README.fr.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agentes: 24](https://img.shields.io/badge/agentes-24-blue.svg)](#-equipe-de-agentes-24-agentes-especializados)
[![Habilidades: 82](https://img.shields.io/badge/habilidades-82-purple.svg)](#-habilidades-82-habilidades-profissionais)

> 🤖 **Extensão de orquestração AI multi-agente de nível empresarial exclusivamente para [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**
>
> Transforme seu assistente de programação AI em um **departamento completo de desenvolvimento de software** — 24 agentes especializados, 82 habilidades profissionais, 6 comandos slash, memória persistente e integração de ferramentas MCP.
>
> **Autor:** [Omar-Obando](https://github.com/Omar-Obando) · **Licença:** MIT · **Versão:** 0.0.6

---

## 📑 Índice

- [O que é o Qwen Orchestrator?](#-o-que-é-o-qwen-orchestrator)
- [Instalação Rápida](#-instalação-rápida)
- [Início Rápido](#-início-rápido)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Equipe de Agentes (24 Agentes Especializados)](#-equipe-de-agentes-24-agentes-especializados)
- [Habilidades (82 Habilidades Profissionais)](#-habilidades-82-habilidades-profissionais)
- [Comandos (6 Comandos Slash)](#-comandos-6-comandos-slash)
- [Como Funciona](#-como-funciona)
- [Guia de Instalação](#-guia-de-instalação)
- [Configuração de Modelos](#-configuração-de-modelos)
- [Ferramentas Avançadas](#-ferramentas-avançadas)
- [Integrações](#-integrações)
- [Padrões de Qualidade](#-padrões-de-qualidade)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Autor](#-autor)

---

## ⚡ O que é o Qwen Orchestrator?

**Qwen Orchestrator** é uma extensão poderosa construída exclusivamente para **[Qwen Code](https://github.com/QwenLM/qwen-code)** — o CLI de programação AI de código aberto da Alibaba. Transforma um único assistente de programação AI em uma **equipe coordenada de 24 agentes AI especializados** que trabalham juntos como um departamento profissional de desenvolvimento de software.

### Por que Qwen Orchestrator?

Imagine ter uma equipe completa de engenharia ao seu alcance: um **Commander** que orquestra, um **Planner** que projeta a arquitetura, **Desenvolvedores Frontend e Backend** que programam em paralelo, um **Reviewer** que protege a qualidade, um **QA Engineer** que testa, um **Cybersecurity Engineer** que audita vulnerabilidades, um **DevOps Engineer** que implanta — e mais 16 especialistas, todos coordenados automaticamente.

### Construído Exclusivamente Para

**[Qwen Code](https://github.com/QwenLM/qwen-code)** por [QwenLM / Alibaba](https://github.com/QwenLM) — O CLI de assistente de programação AI de código aberto que suporta múltiplos provedores de LLM. Qwen Orchestrator é uma **extensão construída pela comunidade** e não é afiliada ou endossada pela Alibaba.

> ⚠️ **Esta extensão SOMENTE funciona com [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**. NÃO é uma ferramenta independente, NÃO é uma extensão do VS Code e NÃO é compatível com outros assistentes de programação AI.

---

## 🚀 Instalação Rápida

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

Pronto! A extensão registra automaticamente os 24 agentes, 82 habilidades, 6 comandos e o MCP Memory Server.

---

## 🎯 Início Rápido

```bash
/orchestrator Criar uma API REST para gestão de usuários
/orchestrator Construir um site e-commerce responsivo
/plan Projetar um esquema de banco de dados para um blog
/review Verificar todos os controladores de autenticação
/test Executar todos os testes do projeto atual
/deploy Implantar a aplicação em produção
```

O comando `/orchestrator` é o ponto de entrada principal. Ele ativa a equipe completa de 24 agentes:

1. **CLARIFICAR** → Faz perguntas específicas se algo for ambíguo
2. **DESCOBRIR** → Escaneia o projeto, detecta a stack tecnológica
3. **PLANEJAR** → Decompõe a missão em marcos com execução paralela
4. **EXECUTAR** → Lança agentes especializados simultaneamente
5. **VERIFICAR** → Reviewer + QA confirmam que tudo funciona
6. **ENTREGAR** → Resumo do que foi construído, alterações e evidências

---

## 🌟 Principais Funcionalidades

| Funcionalidade                   | Descrição                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **24 Agentes Especializados**    | Commander, Planner, Devs Frontend/Backend, Reviewer, QA, PM, DevOps, Segurança e mais                |
| **82 Habilidades Profissionais** | TDD, auditoria de segurança, detecção de anti-padrões, design system, SQL, Docker, Kubernetes e mais |
| **6 Comandos Slash**             | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`                              |
| **Pergunte Antes de Construir**  | Agentes esclarecem requisitos antes de escrever código                                               |
| **Execução Paralela**            | Commander delega tarefas a múltiplos agentes simultaneamente                                         |
| **Memória Persistente**          | Knowledge Graph via MCP Memory Server armazena decisões entre sessões                                |
| **Zero Bloqueio de Modelo**      | Funciona com Qwen, DeepSeek, OpenAI, Anthropic ou qualquer modelo local                              |
| **Multi-Linguagem**              | TypeScript, PHP (Laravel), Python (Django), Dart (Flutter), Rust, Go, Java, C#                       |
| **Proteção contra Loops**        | Agente Monitor detecta e interrompe loops infinitos automaticamente                                  |
| **Portões de Qualidade**         | Reviewer é o ÚNICO agente que pode aprovar tarefas                                                   |

---

## 👥 Equipe de Agentes (24 Agentes Especializados)

| #   | Agente                    | Função                   | Superpoder                                             |
| --- | ------------------------- | ------------------------ | ------------------------------------------------------ |
| 1   | **Commander** 🔴          | Orquestrador Mestre      | Delegação paralela, execução incansável                |
| 2   | **Planner** 🔵            | Pesquisa e Arquitetura   | Planejamento em nível de arquivo, decisões de design   |
| 3   | **Frontend Developer** 🔵 | Implementação UI/UX      | Componentes, responsivo, acessível, rápido             |
| 4   | **Backend Developer** 🟢  | Lógica do Servidor       | APIs, autenticação, cache, operações de BD             |
| 5   | **Reviewer** 🟣           | Guardião de Qualidade    | ÚNICO agente que pode aprovar tarefas                  |
| 6   | **QA Engineer** 🟠        | Garantia de Qualidade    | Estratégia de testes, descoberta de edge cases         |
| 7   | **Project Manager** 🔵    | Gestão de Entregas       | Controle de escopo, avaliação de riscos                |
| 8   | **Doc Researcher** 🟣     | Conhecimento Context7    | Consulta de docs ao vivo, anti-alucinação              |
| 9   | **Tech Lead** 🟡          | Padrões e Orientação     | Completude de módulos, verificação CRUD                |
| 10  | **Database Architect** 🟢 | Especialista em Dados    | Design de esquema, segurança de migrações              |
| 11  | **Product Owner** 🟡      | Valor de Negócio         | Histórias de usuário, critérios de aceitação           |
| 12  | **DevOps Engineer** 🔘    | Infraestrutura           | CI/CD, Docker, automação de implantação                |
| 13  | **Code Quality Guard** 🌹 | Sentinela de Qualidade   | Verificação de sintaxe, lint, typecheck                |
| 14  | **Monitor** 🛡️            | Guardião de Loops        | Detectar/interromper loops LLM, watchdog               |
| 15  | **SEO Specialist** 🔵     | SEO e Performance Web    | Meta tags, dados estruturados, Core Web Vitals         |
| 16  | **Tech Selector** 🟣      | Consultor Tecnológico    | Seleção de framework/BD com prós e contras             |
| 17  | **Cybersecurity Eng.** 🔴 | Segurança de Aplicações  | OWASP, modelagem de ameaças, auditoria de dependências |
| 18  | **Performance Eng.** ⚡   | Velocidade e Escala      | Profiling, otimização de consultas, testes de carga    |
| 19  | **Release Manager** 🏷️    | Releases e Versionamento | SemVer, changelogs, planejamento de rollback           |
| 20  | **API Specialist** 🔗     | APIs e Integração        | REST/GraphQL, versionamento, APIs de terceiros         |
| 21  | **Mobile Engineer** 📱    | Apps Móveis              | Flutter, React Native, offline-first                   |
| 22  | **Localization Eng.** 🌐  | i18n/L10n                | Multi-idioma, RTL, adaptação cultural                  |
| 23  | **Documenter** 📄         | Redação Técnica          | README, docs de API, ADRs, base de conhecimento        |
| 24  | **Skill Creator** 🛠️      | Criação de Habilidades   | Autoria de habilidades, documentação, testes           |

---

## 🛠️ Habilidades (82 Habilidades Profissionais)

### Containerização e Orquestração

| Habilidade               | Propósito                                                           |
| ------------------------ | ------------------------------------------------------------------- |
| Docker Containerization  | Builds multi-estágio, hardening de segurança, otimização de imagens |
| Kubernetes Orchestration | Deployments, HPA, service mesh, ingress, GitOps                     |

### Infraestrutura como Código

| Habilidade    | Propósito                                                 |
| ------------- | --------------------------------------------------------- |
| Terraform IaC | Módulos, gestão de estado, workspaces, políticas Sentinel |

### Automação CI/CD

| Habilidade           | Propósito                                                |
| -------------------- | -------------------------------------------------------- |
| GitHub Actions CI/CD | Workflows, matrizes, ambientes, cache, actions compostas |

### Cache e Performance

| Habilidade    | Propósito                                                |
| ------------- | -------------------------------------------------------- |
| Redis Caching | Estruturas de dados, padrões de cache, gestão de sessões |

### Design de APIs

| Habilidade         | Propósito                                                             |
| ------------------ | --------------------------------------------------------------------- |
| GraphQL API Design | Design de schema, resolvers, DataLoader, paginação, Apollo Federation |

### LLM e Agentes

| Habilidade | Propósito                                                     |
| ---------- | ------------------------------------------------------------- |
| LangGraph  | Workflows de agentes, gestão de estado, sistemas multi-agente |
| LangChain  | Cadeias LLM, agentes, ferramentas, memória, RAG               |

### Plataformas Cloud

| Habilidade        | Propósito                                              |
| ----------------- | ------------------------------------------------------ |
| Vercel Deployment | Funções serverless, edge computing, otimização Next.js |
| Cloudflare Pages  | Edge functions, distribuição global, cache             |
| AWS Serverless    | Lambda, API Gateway, SAM, arquiteturas event-driven    |

### Liderança e Arquitetura

| Habilidade                 | Propósito                                                          |
| -------------------------- | ------------------------------------------------------------------ |
| Strategic Leadership       | Gestão de equipes, tomada de decisão, alinhamento                  |
| Microservices Architecture | Design domain-driven, limites de serviço, comunicação event-driven |

### Segurança e Qualidade

| Habilidade           | Propósito                                                    |
| -------------------- | ------------------------------------------------------------ |
| Security Code Review | OWASP Top 10, padrões de vulnerabilidade, codificação segura |
| Threat Modeling      | STRIDE, DREAD, árvores de ataque                             |
| Code Review          | Revisão sistemática OWASP + SOLID + Clean Code               |

### Banco de Dados

| Habilidade         | Propósito                                                   |
| ------------------ | ----------------------------------------------------------- |
| Database Design    | Design de schema, relacionamentos, estratégias de indexação |
| SQL Best Practices | Otimização de consultas, indexação, prevenção N+1           |

### Frontend e Mobile

| Habilidade       | Propósito                                                |
| ---------------- | -------------------------------------------------------- |
| Accessibility    | WCAG 2.1 AA, HTML semântico, ARIA, navegação por teclado |
| Design System    | Paletas de cores, tipografia, espaçamento, componentes   |
| Website Redesign | Redesign baseado em URL/screenshot, fluxo de análise     |
| Flutter Web      | Layouts responsivos, widgets adaptativos                 |

### Backend e APIs

| Habilidade | Propósito                                                      |
| ---------- | -------------------------------------------------------------- |
| API Design | Padrões RESTful, envelopes de resposta, paginação              |
| Laravel    | Eloquent ORM, Form Requests, filas, padrões de API             |
| NestJS     | Módulos, guards, pipes, interceptors                           |
| Supabase   | Políticas RLS, Edge Functions, autenticação, APIs auto-geradas |

### DevOps e Infraestrutura

| Habilidade        | Propósito                                                     |
| ----------------- | ------------------------------------------------------------- |
| Disaster Recovery | Estratégias de backup, procedimentos de restauração, failover |
| Git Workflow      | Estratégias de branching, convenções de commit, templates PR  |
| Deployment        | CI/CD, Docker, gestão de releases                             |

### Outras

| Habilidade         | Propósito                                                |
| ------------------ | -------------------------------------------------------- |
| Anti-Hallucination | Verificação de fontes, afirmações baseadas em evidências |
| TDD Workflow       | Desenvolvimento Orientado a Testes (Red/Green/Refactor)  |
| Security Audit     | Detecção de vulnerabilidades OWASP Top 10                |
| Domain-Driven      | Padrões DDD, contextos delimitados, agregados            |
| Performance        | Profiling, otimização, benchmarks                        |
| Compliance         | GDPR, HIPAA, SOC 2, PCI-DSS                              |

---

## ⌨️ Comandos (6 Comandos Slash)

| Comando                           | Descrição                                                            |
| --------------------------------- | -------------------------------------------------------------------- |
| **`/orchestrator [objetivo]`** ⭐ | **Entrada principal** — Equipe completa com protocolo de clareza     |
| `/orchestrate [missão]`           | Execução direta — sem perguntas, apenas constrói                     |
| `/plan [funcionalidade]`          | Apenas criar plano de implementação — pesquisa + arquitetura         |
| `/review [alvo]`                  | Revisão abrangente de código — segurança, qualidade, padrões         |
| `/test [alvo]`                    | Executar e analisar suite de testes — cobertura, lacunas, edge cases |
| `/deploy [alvo]`                  | Implantar com verificação pré/pós — CI/CD, plano de rollback         |

---

## 🧠 Como Funciona

### Fluxo de Execução

```
Usuário digita /orchestrator "Construir sistema de pagamentos"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Clarifica escopo  │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   Analisa projeto   │
         │   Cria marcos       │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│Tarefa 1 │  │Tarefa 2  │  │Schema + Migração │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│Aprova   │  │Testa     │  │Lint + Typecheck  │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Conclui missão    │
         │   Entrega resumo    │
         └─────────────────────┘
```

---

## 📦 Guia de Instalação

### Instalação Rápida (Recomendada)

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

### Instalação Manual

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

Adicione à configuração (`~/.qwen/settings.json`):

```json
{
  "extensions": ["/caminho/completo/qwen-orchestrator"]
}
```

### Servidor de Ferramentas MCP (Opcional)

```bash
cd qwen-orchestrator && npm install && npm run build
```

---

## ⚙️ Configuração de Modelos

**Por padrão, todos os agentes usam seu modelo padrão do Qwen Code.**

| Agente             | Modelo Recomendado       | Por quê                                        |
| ------------------ | ------------------------ | ---------------------------------------------- |
| Commander          | `qwen-max` / `qwen-plus` | Precisa de raciocínio forte para orquestração  |
| Planner            | `qwen-max` / `qwen-plus` | Precisa de análise forte para arquitetura      |
| Frontend Developer | `qwen3-coder-plus`       | Otimizado para geração de código               |
| Backend Developer  | `qwen3-coder-plus`       | Otimizado para geração de código               |
| Reviewer           | `qwen-max`               | Precisa de compreensão profunda para qualidade |
| Demais             | Padrão do usuário        | Sem necessidades especiais                     |

---

## 🔌 Integrações

### Context7 (Opcional)

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

Fornece um **Knowledge Graph** que persiste entre sessões. Configurado automaticamente em `qwen-extension.json`.

### Habilidades UI/UX (Recomendado)

| Habilidade          | Instalação                                               |
| ------------------- | -------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` |

---

## ✅ Padrões de Qualidade

| Padrão       | Requisito                                                                     |
| ------------ | ----------------------------------------------------------------------------- |
| Complexidade | ≤ 10 ciclomática por função                                                   |
| Tamanho      | ≤ 40 linhas por função, ≤ 4 parâmetros                                        |
| Tipos        | Tipos estritos, sem `any`                                                     |
| Testes       | TDD obrigatório, 80%+ cobertura                                               |
| Segurança    | Conformidade OWASP Top 10                                                     |
| SQL          | Keywords em maiúsculas, uma coluna por linha, JOINs indentados, prevenção N+1 |

---

## 🎯 Exemplos de Uso

```bash
/orchestrator Criar uma API REST para gestão de usuários
/orchestrator Construir um site e-commerce responsivo com pagamentos Stripe
/plan Projetar um esquema de banco de dados para um blog
/review Verificar todos os controladores de autenticação por segurança
/deploy Implantar a aplicação em produção com plano de rollback
```

---

## 👤 Autor

**Omar Obando** · GitHub: [@Omar-Obando](https://github.com/Omar-Obando) · Licença: MIT

---

<div align="center">

**Construído com ❤️ para a comunidade [Qwen Code](https://github.com/QwenLM/qwen-code)**

[⬆ Voltar ao topo](#qwen-orchestrator--equipe-de-desenvolvimento-ia-multi-agente-para-qwen-code)

</div>
