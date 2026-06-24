# Qwen Orchestrator — Equipo de Desarrollo AI Multi-Agente para Qwen Code

**Español** · [English](../README.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Français](README.fr.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agentes: 24](https://img.shields.io/badge/agentes-24-blue.svg)](#-equipo-de-agentes-24-agentes-especializados)
[![Habilidades: 82](https://img.shields.io/badge/habilidades-82-purple.svg)](#-habilidades-82-habilidades-profesionales)

> 🤖 **La extensión de orquestación AI multi-agente de nivel empresarial exclusivamente para [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**
>
> Convierte tu asistente de programación AI en un **departamento completo de desarrollo de software** — 24 agentes especializados, 82 habilidades profesionales, 6 comandos slash, memoria persistente e integración de herramientas MCP.
>
> **Autor:** [Omar-Obando](https://github.com/Omar-Obando) · **Licencia:** MIT · **Versión:** 0.0.6

---

## 📑 Tabla de Contenidos

- [¿Qué es Qwen Orchestrator?](#-qué-es-qwen-orchestrator)
- [Instalación Rápida](#-instalación-rápida)
- [Inicio Rápido](#-inicio-rápido)
- [Características Principales](#-características-principales)
- [Equipo de Agentes (24 Agentes Especializados)](#-equipo-de-agentes-24-agentes-especializados)
- [Habilidades (82 Habilidades Profesionales)](#-habilidades-82-habilidades-profesionales)
- [Comandos (6 Comandos Slash)](#-comandos-6-comandos-slash)
- [Cómo Funciona](#-cómo-funciona)
  - [Flujo de Ejecución](#flujo-de-ejecución)
  - [Claridad del Usuario: Pregunta Antes de Construir](#claridad-del-usuario-pregunta-antes-de-construir)
  - [Diagrama de Arquitectura](#diagrama-de-arquitectura)
- [Guía de Instalación](#-guía-de-instalación)
  - [Instalación Rápida (Recomendada)](#instalación-rápida-recomendada)
  - [Instalación Manual](#instalación-manual)
  - [Servidor de Herramientas MCP (Opcional)](#servidor-de-herramientas-mcp-opcional)
  - [Solución de Problemas](#solución-de-problemas)
- [Configuración de Modelos](#-configuración-de-modelos)
- [Recomendaciones de Modo CLI](#-recomendaciones-de-modo-cli)
- [Herramientas Avanzadas](#-herramientas-avanzadas)
  - [Comunicación entre Agentes](#comunicación-entre-agentes)
  - [Monitoreo en Tiempo Real](#monitoreo-en-tiempo-real)
  - [Tareas Programadas](#tareas-programadas)
- [Integraciones](#-integraciones)
  - [Context7 (Opcional)](#context7-opcional)
  - [MCP Memory Server](#mcp-memory-server)
  - [Habilidades UI/UX (Recomendado)](#habilidades-uiux-recomendado)
- [Estándares de Calidad](#-estándares-de-calidad)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Documentación](#-documentación)
- [Autor](#-autor)
- [Palabras Clave](#-palabras-clave)

---

## ⚡ ¿Qué es Qwen Orchestrator?

**Qwen Orchestrator** es una extensión poderosa construida exclusivamente para **[Qwen Code](https://github.com/QwenLM/qwen-code)** — la CLI de programación AI de código abierto de Alibaba. Transforma un solo asistente de programación AI en un **equipo coordinado de 24 agentes AI especializados** que trabajan juntos como un departamento profesional de desarrollo de software.

### ¿Por qué Qwen Orchestrator?

Imagina tener todo un equipo de ingeniería al alcance de tu mano: un **Commander** que orquesta, un **Planner** que diseña la arquitectura, **Desarrolladores Frontend y Backend** que programan en paralelo, un **Reviewer** que protege la calidad, un **Ingeniero QA** que prueba, un **Ingeniero de Ciberseguridad** que audita vulnerabilidades, un **Ingeniero DevOps** que despliega — y 16 especialistas más, todos coordinados automáticamente.

**Ninguna otra extensión de programación AI ofrece este nivel de orquestación multi-agente profesional.**

### Construido Exclusivamente Para

<table>
<tr>
<td width="80" align="center">

![Qwen Code](https://img.shields.io/badge/Qwen%20Code-CLI-orange?style=for-the-badge)

</td>
<td>

**[Qwen Code](https://github.com/QwenLM/qwen-code)** por [QwenLM / Alibaba](https://github.com/QwenLM) — La CLI de asistente de programación AI de código abierto que soporta múltiples proveedores de LLM (Qwen, DeepSeek, OpenAI, Anthropic, modelos locales). Qwen Orchestrator es una **extensión construida por la comunidad** y no está afiliada ni respaldada por Alibaba.

</td>
</tr>
</table>

> ⚠️ **Esta extensión SOLO funciona con [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**. NO es una herramienta independiente, NO es una extensión de VS Code, y NO es compatible con otros asistentes de programación AI. Si no tienes Qwen Code instalado, [instálalo primero](https://github.com/QwenLM/qwen-code#installation).
>
> ⚠️ **Aviso de Compatibilidad IDE**: Esta extensión NO ha sido probada con Visual Studio, extensiones de VS Code, IDEs de JetBrains ni ninguna integración fuera de Qwen Code CLI. Está diseñada exclusivamente para la experiencia de terminal/CLI de Qwen Code.

---

## 🚀 Instalación Rápida

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

¡Eso es todo! La extensión registra automáticamente los 24 agentes, 82 habilidades, 6 comandos y el servidor MCP Memory.

> 📖 Consulta la [Guía de Instalación](#-guía-de-instalación) completa para instalación manual, servidor MCP y solución de problemas.

---

## 🎯 Inicio Rápido

Una vez instalado, simplemente escribe en tu CLI de Qwen Code:

```bash
/orchestrator Crear una API REST para gestión de usuarios
/orchestrator Construir un sitio web responsive de comercio electrónico
/plan Diseñar un esquema de base de datos para un blog
/review Revisar todos los controladores de autenticación
/test Ejecutar todas las pruebas del proyecto actual
/deploy Desplegar la aplicación a producción
```

El comando `/orchestrator` es el punto de entrada principal. Activa el equipo completo de 24 agentes con el flujo profesional completo:

1. **CLARIFICAR** → Hace preguntas específicas si algo es ambiguo
2. **DESCUBRIR** → Escanea tu proyecto, detecta el stack tecnológico
3. **PLANIFICAR** → Descompone la misión en hitos con ejecución paralela
4. **EJECUTAR** → Lanza agentes especializados simultáneamente
5. **VERIFICAR** → Reviewer + QA confirman que todo funciona
6. **ENTREGAR** → Resumen de lo construido, cambios y evidencia

---

## 🌟 Características Principales

| Característica                   | Descripción                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **24 Agentes Especializados**    | Commander, Planner, Desarrolladores Frontend/Backend, Reviewer, QA, PM, DevOps, Seguridad y más          |
| **82 Habilidades Profesionales** | TDD, auditoría de seguridad, detección de anti-patrones, design system, SQL, Docker, Kubernetes y 75 más |
| **6 Comandos Slash**             | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`                                  |
| **Pregunta Antes de Construir**  | Los agentes clarifican requisitos antes de escribir código                                               |
| **Ejecución Paralela**           | El Commander delega tareas a múltiples agentes simultáneamente                                           |
| **Memoria Persistente**          | Knowledge Graph vía MCP Memory Server almacena decisiones entre sesiones                                 |
| **Cero Bloqueo de Modelo**       | Funciona con Qwen, DeepSeek, OpenAI, Anthropic o cualquier modelo local                                  |
| **Multi-Lenguaje**               | TypeScript, PHP (Laravel), Python (Django), Dart (Flutter), Rust, Go, Java, C#                           |
| **Protección contra Bucles**     | El agente Monitor detecta y rompe bucles infinitos automáticamente                                       |
| **Puertas de Calidad**           | El Reviewer es el ÚNICO agente que puede aprobar tareas                                                  |
| **Seguridad Primero**            | Cumplimiento OWASP Top 10 mediante habilidad de auditoría y agente Reviewer                              |
| **Sin Mockups**                  | Los agentes tienen prohibido escribir stubs o placeholders                                               |
| **Recuperación de Compactación** | El estado persiste en `.qwen-orchestrator/` — sobrevive la compresión de contexto                        |

---

## 👥 Equipo de Agentes (24 Agentes Especializados)

| #   | Agente                    | Rol                          | Superpoder                                              |
| --- | ------------------------- | ---------------------------- | ------------------------------------------------------- |
| 1   | **Commander** 🔴          | Orquestador Maestro          | Delegación paralela, ejecución incansable               |
| 2   | **Planner** 🔵            | Investigación y Arquitectura | Planificación a nivel de archivos, decisiones de diseño |
| 3   | **Frontend Developer** 🔵 | Implementación UI/UX         | Componentes, responsivo, accesible, rápido              |
| 4   | **Backend Developer** 🟢  | Lógica del Servidor          | APIs, autenticación, caché, operaciones de BD           |
| 5   | **Reviewer** 🟣           | Guardián de Calidad          | ÚNICO agente que puede aprobar tareas                   |
| 6   | **QA Engineer** 🟠        | Aseguramiento de Calidad     | Estrategia de pruebas, descubrimiento de edge cases     |
| 7   | **Project Manager** 🔵    | Gestión de Entregas          | Control de alcance, evaluación de riesgos               |
| 8   | **Doc Researcher** 🟣     | Conocimiento Context7        | Consulta de docs en vivo, anti-alucinación              |
| 9   | **Tech Lead** 🟡          | Estándares y Guía            | Completitud de módulos, verificación CRUD               |
| 10  | **Database Architect** 🟢 | Especialista de Datos        | Diseño de esquema, seguridad de migraciones             |
| 11  | **Product Owner** 🟡      | Valor de Negocio             | Historias de usuario, criterios de aceptación           |
| 12  | **DevOps Engineer** 🔘    | Infraestructura              | CI/CD, Docker, automatización de despliegue             |
| 13  | **Code Quality Guard** 🌹 | Centinela de Calidad         | Verificación de sintaxis, lint, typecheck               |
| 14  | **Monitor** 🛡️            | Guardián de Bucles           | Detectar/romper bucles LLM, watchdog                    |
| 15  | **SEO Specialist** 🔵     | SEO y Rendimiento Web        | Meta tags, datos estructurados, Core Web Vitals         |
| 16  | **Tech Selector** 🟣      | Asesor Tecnológico           | Selección de framework/BD con pros y contras            |
| 17  | **Cybersecurity Eng.** 🔴 | Seguridad de Aplicaciones    | OWASP, modelado de amenazas, auditoría de dependencias  |
| 18  | **Performance Eng.** ⚡   | Velocidad y Escala           | Profiling, optimización de consultas, pruebas de carga  |
| 19  | **Release Manager** 🏷️    | Releases y Versionado        | SemVer, changelogs, planificación de rollback           |
| 20  | **API Specialist** 🔗     | APIs e Integración           | REST/GraphQL, versionado, APIs de terceros              |
| 21  | **Mobile Engineer** 📱    | Apps Móviles                 | Flutter, React Native, offline-first                    |
| 22  | **Localization Eng.** 🌐  | i18n/L10n                    | Multi-lenguaje, RTL, adaptación cultural                |
| 23  | **Documenter** 📄         | Redacción Técnica            | README, docs de API, ADRs, base de conocimiento         |
| 24  | **Skill Creator** 🛠️      | Creación de Habilidades      | Autoría de habilidades, documentación, testing          |

---

## 🛠️ Habilidades (82 Habilidades Profesionales)

### Contenedores y Orquestación

| Habilidad                | Propósito                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Docker Containerization  | Builds multi-etapa, hardening de seguridad, optimización de imágenes, Docker Compose |
| Kubernetes Orchestration | Deployments, HPA, service mesh, ingress, GitOps con ArgoCD/Flux                      |

### Infraestructura como Código

| Habilidad     | Propósito                                                             |
| ------------- | --------------------------------------------------------------------- |
| Terraform IaC | Módulos, gestión de estado, workspaces, políticas Sentinel, Terratest |

### Automatización CI/CD

| Habilidad            | Propósito                                                           |
| -------------------- | ------------------------------------------------------------------- |
| GitHub Actions CI/CD | Workflows, matrices, entornos, caché, actions compuestas, seguridad |

### Caché y Rendimiento

| Habilidad     | Propósito                                                                            |
| ------------- | ------------------------------------------------------------------------------------ |
| Redis Caching | Estructuras de datos, patrones de caché, gestión de sesiones, pub/sub, Lua scripting |

### Diseño de APIs

| Habilidad          | Propósito                                                               |
| ------------------ | ----------------------------------------------------------------------- |
| GraphQL API Design | Diseño de esquema, resolvers, DataLoader, paginación, Apollo Federation |

### Multi-Plataforma

| Habilidad          | Propósito                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Multi-Platform Dev | Comandos multiplataforma, manejo de rutas, finales de línea, permisos, gestores de paquetes |

### LLM y Agentes

| Habilidad        | Propósito                                                         |
| ---------------- | ----------------------------------------------------------------- |
| LangGraph        | Flujos de agentes, gestión de estado, sistemas multi-agente       |
| LangChain        | Cadenas LLM, agentes, herramientas, memoria, RAG                  |
| Qwen Agent       | Desarrollo e integración de agentes específicos de Qwen           |
| LLM Integrations | Integración multi-proveedor LLM (OpenAI, Anthropic, Google, etc.) |

### Plataformas Cloud

| Habilidad          | Propósito                                                  |
| ------------------ | ---------------------------------------------------------- |
| Vercel Deployment  | Funciones serverless, edge computing, optimización Next.js |
| Cloudflare Pages   | Edge functions, distribución global, caché                 |
| Cloudflare Workers | Edge computing, manipulación request/response              |
| AWS Serverless     | Lambda, API Gateway, SAM, arquitecturas event-driven       |

### SEO

| Habilidad     | Propósito                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| SEO LLM       | Optimización para ChatGPT, Perplexity, Gemini, Claude, Bing AI, Qwen         |
| Technical SEO | Velocidad de sitio, optimización móvil, datos estructurados, Core Web Vitals |

### Liderazgo y Arquitectura

| Habilidad                  | Propósito                                                            |
| -------------------------- | -------------------------------------------------------------------- |
| Strategic Leadership       | Gestión de equipos, toma de decisiones, alineación con stakeholders  |
| Requirements Engineering   | Casos de uso, historias de usuario, criterios de aceptación          |
| Microservices Architecture | Diseño domain-driven, límites de servicio, comunicación event-driven |
| Technology Evaluation      | Selección de framework/BD, análisis de pros/contras                  |

### Producto y Equipo

| Habilidad     | Propósito                                                                |
| ------------- | ------------------------------------------------------------------------ |
| Product Owner | Gestión de backlog, historias de usuario, sprint planning                |
| Scrum Master  | Facilitación de ceremonias, coaching de equipo, remoción de impedimentos |

### Desarrollo de Software

| Habilidad             | Propósito                                                   |
| --------------------- | ----------------------------------------------------------- |
| Testing Strategy      | Pirámide de testing, objetivos de cobertura, automatización |
| Security Auditor      | OWASP Top 10, evaluación de vulnerabilidades, cumplimiento  |
| DevOps Pipeline       | Diseño CI/CD, estrategias de despliegue, IaC                |
| Architecture Patterns | Capas, DDD, microservicios, event-driven, CQRS              |
| Documentation         | README, docs de API, ADRs, base de conocimiento             |
| Debugging             | Investigación sistemática, debugging basado en hipótesis    |
| Refactoring           | Detección de code smells, transformaciones seguras          |

### Seguridad y Calidad

| Habilidad            | Propósito                                                     |
| -------------------- | ------------------------------------------------------------- |
| Security Code Review | OWASP Top 10, patrones de vulnerabilidad, codificación segura |
| Threat Modeling      | STRIDE, DREAD, árboles de ataque, identificación de amenazas  |
| Test Automation      | Diseño de framework, patrones page object, ejecución paralela |
| Load Testing         | Pruebas de carga, estrés, resistencia, pico                   |
| Code Review          | Revisión sistemática OWASP + SOLID + Clean Code               |

### Base de Datos

| Habilidad           | Propósito                                                |
| ------------------- | -------------------------------------------------------- |
| Database Design     | Diseño de esquema, relaciones, estrategias de indexación |
| Database Security   | Encriptación, control de acceso, auditoría, cumplimiento |
| SQL Best Practices  | Optimización de consultas, indexación, prevención N+1    |
| SQL Query Assistant | Asistencia en consultas, mejores prácticas, optimización |

### Frontend y Móvil

| Habilidad          | Propósito                                                              |
| ------------------ | ---------------------------------------------------------------------- |
| Accessibility      | WCAG 2.1 AA, HTML semántico, ARIA, navegación por teclado              |
| Design System      | Paletas de colores, tipografía, espaciado, arquitectura de componentes |
| Website Redesign   | Rediseño basado en URL/screenshot, flujo de análisis                   |
| Flutter Web        | Layouts responsivos, widgets adaptativos, gestión de estado            |
| Mobile Performance | Optimización de apps, tiempo de inicio, uso de memoria                 |
| Offline-First      | Almacenamiento local, sincronización, resolución de conflictos         |

### Backend y APIs

| Habilidad               | Propósito                                                       |
| ----------------------- | --------------------------------------------------------------- |
| API Design              | Estándares RESTful, envolturas de respuesta, paginación         |
| API Documentation       | Especificación OpenAPI, Swagger, esquemas GraphQL               |
| Third-Party Integration | Stripe, PayPal, AWS, Google, Twilio                             |
| Laravel                 | Eloquent ORM, Form Requests, colas, patrones de API             |
| NestJS                  | Módulos, guards, pipes, interceptors, ciclo de vida de requests |
| Supabase                | Políticas RLS, Edge Functions, auth, APIs auto-generadas        |

### DevOps e Infraestructura

| Habilidad         | Propósito                                                                |
| ----------------- | ------------------------------------------------------------------------ |
| Disaster Recovery | Estrategias de backup, procedimientos de restauración, failover, RTO/RPO |
| Release Workflow  | SemVer, changelogs, staging, producción, rollback                        |
| Git Workflow      | Estrategias de branching, convenciones de commits, plantillas PR         |
| Deployment        | CI/CD, Docker, gestión de releases                                       |

### Específico de LLM

| Habilidad           | Propósito                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| Anti-Hallucination  | Verificación de fuentes, afirmaciones basadas en evidencia, validación |
| Loop Detection      | Detección de bucles LLM, bucles de tool calls, rutas de escape         |
| Context7 Docs       | Consulta de documentación en vivo vía Context7 MCP                     |
| Compaction Recovery | Preservación de contexto durante la compactación de sesión             |

### Proyecto y Equipo

| Habilidad                | Propósito                                                         |
| ------------------------ | ----------------------------------------------------------------- |
| Agile Project Management | Ceremonias Scrum, refinamiento de backlog, sprint planning        |
| User Story Mapping       | Mapeo de historias, desglose de épicas, visualización de timeline |
| CRUD Completeness        | Patrones Create, Read, Update, Delete, validación                 |
| Project Conventions      | Estructura de proyecto, estándares de código, convenciones        |
| ERP/SaaS Organization    | Organización de proyectos grandes, estructura de módulos          |

### Localización

| Habilidad            | Propósito                                         |
| -------------------- | ------------------------------------------------- |
| Translation Workflow | Memoria de traducción, traducción automática, TMS |
| Multi-Language       | Patrones i18n, l10n, soporte RTL                  |

### Habilidades Adicionales

| Habilidad              | Propósito                                                |
| ---------------------- | -------------------------------------------------------- |
| Domain-Driven          | Patrones DDD, bounded contexts, agregados, value objects |
| Performance            | Profiling, optimización, benchmarks                      |
| TDD Workflow           | Desarrollo Guiado por Pruebas (Red/Green/Refactor)       |
| Security Audit         | Detección de vulnerabilidades OWASP Top 10               |
| Agent Task Coordinator | Coordinación de agentes, protocolo MCP                   |
| Skill Creation         | Autoría de habilidades, documentación, testing           |
| Multi-Channel Funnels  | Embudos de marketing, optimización de conversión         |
| Architecture           | Diseño de sistemas, patrones, trade-offs                 |
| Code Quality           | Linting, formateo, verificación de tipos                 |
| Monitoring             | Observabilidad, logging, alertas                         |
| Compliance             | GDPR, HIPAA, SOC 2, PCI-DSS                              |
| Testing                | Pruebas unitarias, integración, E2E                      |

---

## ⌨️ Comandos (6 Comandos Slash)

| Comando                           | Descripción                                                           |
| --------------------------------- | --------------------------------------------------------------------- |
| **`/orchestrator [objetivo]`** ⭐ | **Entrada principal** — Equipo completo con protocolo de claridad     |
| `/orchestrate [misión]`           | Ejecución directa — sin preguntas, solo construye                     |
| `/plan [funcionalidad]`           | Solo crear plan de implementación — investigación + arquitectura      |
| `/review [objetivo]`              | Revisión exhaustiva de código — seguridad, calidad, patrones          |
| `/test [objetivo]`                | Ejecutar y analizar suite de pruebas — cobertura, brechas, edge cases |
| `/deploy [objetivo]`              | Desplegar con verificación pre/post — CI/CD, plan de rollback         |

> **¿Cuándo usar `/orchestrator` vs `/orchestrate`?**
>
> - `/orchestrator` — Para **nuevas funcionalidades, proyectos o tareas complejas**. El equipo hará preguntas primero.
> - `/orchestrate` — Cuando ya **sabes exactamente qué quieres** y solo necesitas que se ejecute rápido.

---

## 🧠 Cómo Funciona

### Flujo de Ejecución

```
Usuario escribe /orchestrator "Construir un sistema de pagos"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Clarifica alcance │
         │   vía AskUserQuestion│
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   Analiza proyecto  │
         │   Crea hitos        │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│Tarea 1  │  │Tarea 2   │  │Esquema + Migración│
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│Aprueba  │  │Prueba    │  │Lint + Typecheck  │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Concluye misión   │
         │   Entrega resumen   │
         └─────────────────────┘
```

### Claridad del Usuario: Pregunta Antes de Construir

El orquestador **nunca asume** lo que quieres. Cuando empieza una misión, los agentes Commander y Planner usan `AskUserQuestion` para clarificar requisitos antes de escribir código.

**Ejemplo de interacción:**

```
👤 Usuario: /orchestrator Construir un checkout de e-commerce

🤖 Commander: Necesito clarificar algunas cosas antes de planificar:

   📋 Proveedor de Pagos (Pregunta 1/3)
   ¿Qué pasarela de pago debo integrar?
   ○ Stripe       — Estándar de la industria, API excelente, soporta suscripciones
   ○ PayPal       — Amplia confianza, buen soporte internacional
   ○ MercadoPago  — Mejor para mercados latinoamericanos

   📋 Flujo de Checkout (Pregunta 2/3)
   ¿Qué tipo de experiencia de checkout?
   ○ Página Única — Todos los pasos en una página (más simple, rápido)
   ○ Multi-Paso   — Páginas separadas por paso (más controlado)

   📋 Checkout sin Cuenta (Pregunta 3/3)
   ¿Los usuarios pueden comprar sin cuenta?
   ○ Sí           — Menos fricción, mayor conversión
   ○ No           — Cuenta requerida, mejor para retención

👤 Usuario selecciona: MercadoPago → Multi-Paso → Sí

🤖 Commander: Perfecto. Planificando checkout con MercadoPago, flujo multi-paso, soporte invitados.
```

**Agentes que hacen preguntas:**

| Agente          | Cuándo Pregunta                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| Commander       | Antes de cada misión — alcance, prioridades, restricciones                                  |
| Planner         | Antes de decisiones de arquitectura — stack tecnológico, patrones                           |
| Product Owner   | Al definir historias de usuario — criterios de aceptación, edge cases                       |
| QA Engineer     | Al diseñar estrategia de pruebas — caminos críticos, umbrales                               |
| Project Manager | Al definir alcance — plazos, tolerancia al riesgo, recursos                                 |
| Tech Selector   | Cuando el stack no está especificado — presenta frameworks, BDs, lenguajes con pros/contras |
| SEO Specialist  | Al construir proyectos web — audiencia objetivo, tipo de contenido, región                  |

> **Consejo**: Puedes proporcionar todos los detalles desde el inicio y saltarte las preguntas. Los agentes solo preguntan cuando detectan ambigüedad.

### Diagrama de Arquitectura

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    QWEN ORCHESTRATOR v0.0.6                            ║
║                     by Omar-Obando (GitHub)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  ┌─────────────────────────────────────────────────────────────────┐   ║
║  │                      COMMANDER 🔴                               │   ║
║  │       "Orquesto. Nunca paro hasta terminar."                    │   ║
║  │    EXPLORAR → APRENDER → ADAPTAR → ACTUAR → VERIFICAR → ENTREGAR│   ║
║  └──────┬─────────┬─────────┬─────────┬────────────────────────────┘   ║
║         │         │         │         │                                 ║
║  ┌──────▼──┐ ┌────▼──────┐ ┌▼────────┐ ┌▼──────────────┐              ║
║  │ PLANNER │ │FE DEV+BE  │ │REVIEWER │ │ QA ENGINEER   │              ║
║  │  🔵     │ │   🟢🟠    │ │  🟣     │ │    🟠         │              ║
║  │Investiga│ │ Código TDD│ │Aprueba  │ │Estrategia     │              ║
║  │Diseña   │ │ Entrega   │ │Calidad  │ │Cobertura      │              ║
║  └─────────┘ └───────────┘ └─────────┘ └───────────────┘              ║
║         │         │         │         │                                 ║
║  ┌──────▼─────────▼─────────▼─────────▼──────────────────────────┐    ║
║  │               PROJECT MANAGER 🔵                               │    ║
║  │         Alcance · Riesgo · Progreso · Entrega                  │    ║
║  └────────────────────────────────────────────────────────────────┘    ║
║                                                                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────────────┐    ║
║  │DOC RESEARCHER│ │  TECH LEAD   │ │    DATABASE ARCHITECT       │    ║
║  │  🟣 Magenta  │ │  🟡 Dorado  │ │       🟢 Teal              │    ║
║  │ Context7     │ │ Verif. CRUD │ │   Esquema y Migración       │    ║
║  └──────────────┘ └──────────────┘ └─────────────────────────────┘    ║
║                                                                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────────────┐    ║
║  │PRODUCT OWNER │ │DEVOPS ENGINEER│ │   CODE QUALITY GUARD      │    ║
║  │  🟡 Ámbar    │ │  🔘 Slate    │ │       🌹 Rosa             │    ║
║  │Hist. Usuario │ │  CI/CD       │ │  Sintaxis · Lint · Tipos  │    ║
║  └──────────────┘ └──────────────┘ └─────────────────────────────┘    ║
║                                                                        ║
║  Agentes: 24 | Habilidades: 82 | Comandos: 6 | Herramientas MCP: 7    ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 📦 Guía de Instalación

### Instalación Rápida (Recomendada)

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

La extensión automáticamente:

- ✅ Registra los 24 agentes especializados
- ✅ Carga las 82 habilidades profesionales
- ✅ Activa los 6 comandos slash
- ✅ Configura el MCP Memory Server para conocimiento persistente
- ✅ Configura todo para uso inmediato

### Instalación Manual

**1. Obtén la extensión:**

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

**2. Dile a Qwen Code sobre ella.** Agrega a tu configuración (`~/.qwen/settings.json`):

```json
{
  "extensions": ["/ruta/completa/a/qwen-orchestrator"]
}
```

> 💡 Para encontrar tu ruta completa, ejecuta `pwd` dentro del directorio clonado.

### Servidor de Herramientas MCP (Opcional)

Para funciones avanzadas como estado de misión y roster de agentes:

```bash
cd qwen-orchestrator
npm install
npm run build
```

Luego agrega a tu configuración MCP de Qwen Code:

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

**Herramientas MCP disponibles:**

| Herramienta                | Propósito                                             |
| -------------------------- | ----------------------------------------------------- |
| `get_mission_status`       | Obtener progreso actual de la misión                  |
| `validate_project`         | Validar estructura y salud del proyecto               |
| `generate_todo`            | Generar TODO estructurado desde descripción de misión |
| `get_agent_roster`         | Listar los 24 agentes con capacidades                 |
| `context7_resolve_library` | Resolver IDs de bibliotecas Context7                  |
| `check_crud_completeness`  | Verificar CRUD completo para todas las entidades      |
| `create_checkpoint`        | Crear checkpoint para recuperación de compactación    |

### Solución de Problemas

| Problema                                  | Solución                                                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| "Comando no encontrado" tras instalar     | Reinicia Qwen Code CLI para recargar extensiones                                    |
| "Permiso denegado" en comandos npm        | Windows: ejecuta terminal como Administrador. Mac/Linux: usa `sudo` si es necesario |
| ¿Dónde se guardan los archivos de sesión? | Directorio `.qwen-orchestrator/` en tu proyecto                                     |
| La extensión no carga                     | Verifica que la ruta en settings.json sea absoluta y correcta                       |

> ¿Necesitas más ayuda? Abre un issue en [GitHub](https://github.com/Omar-Obando/qwen-orchestrator/issues).

---

## ⚙️ Configuración de Modelos

**Por defecto, todos los agentes usan tu modelo predeterminado de Qwen Code.** No hay modelo fijo — cero bloqueo.

### Usar el modelo por defecto (recomendado)

Solo instala y usa. Cada agente usará el modelo que tengas configurado en Qwen Code.

### Configurar un modelo específico por agente

Edita el archivo `.md` del agente en `agents/` y descomenta la línea `model`:

```yaml
---
name: commander
# ... otros campos ...
# model: descomenta abajo para sobrescribir el modelo por defecto
model: qwen-max
---
```

### Modelos recomendados por rol

| Agente             | Modelo Recomendado       | Por qué                                        |
| ------------------ | ------------------------ | ---------------------------------------------- |
| Commander          | `qwen-max` o `qwen-plus` | Necesita razonamiento fuerte para orquestación |
| Planner            | `qwen-max` o `qwen-plus` | Necesita análisis fuerte para arquitectura     |
| Frontend Developer | `qwen3-coder-plus`       | Optimizado para generación de código           |
| Backend Developer  | `qwen3-coder-plus`       | Optimizado para generación de código           |
| Reviewer           | `qwen-max`               | Necesita comprensión profunda para calidad     |
| QA Engineer        | `qwen-plus`              | Equilibrado para estrategia de pruebas         |
| Code Quality Guard | `qwen-plus`              | Rápido para verificaciones de sintaxis/lint    |
| Todos los demás    | Modelo del usuario       | Sin necesidades especiales                     |

> Cualquier modelo soportado por tu instalación de Qwen Code funciona — incluyendo DeepSeek, OpenAI, Anthropic o modelos locales.

---

## 🎛️ Recomendaciones de Modo CLI

Para máxima autonomía, configura tu modo CLI de Qwen Code **antes** de ejecutar `/orchestrator`:

| Modo CLI      | Configuración | Qué Sucede                                                                       |
| ------------- | ------------- | -------------------------------------------------------------------------------- |
| **Auto-Edit** | `auto-edit`   | Los agentes editan/escriben libremente. Usuario confirma shell. **Recomendado.** |
| **YOLO**      | `yolo`        | Autonomía completa. Sin confirmaciones. Máxima velocidad.                        |
| **Default**   | `default`     | Usuario confirma cada edición. Más lento pero máximo control.                    |
| **Plan**      | `plan`        | Solo planificación — los agentes no pueden escribir archivos.                    |

> Los agentes intencionalmente **no** tienen campos `approvalMode`, `runConfig` o `background` — tú controlas la autonomía desde la CLI, no la extensión.

---

## 🔧 Herramientas Avanzadas

### Comunicación entre Agentes

El Commander puede enviar mensajes a agentes en segundo plano durante una tarea:

```
SendMessage({ task_id: "worker-auth", message: "Usuario clarificó: usa JWT, no sesiones." })
```

### Monitoreo en Tiempo Real

El DevOps Engineer puede observar procesos de larga duración:

```
Monitor({ command: "docker compose logs -f app", description: "Ver logs de app durante deploy" })
```

### Tareas Programadas

Programa chequeos de calidad e informes recurrentes:

```
CronCreate({ cron: "0 6 * * 1-5", prompt: "Ejecutar auditoría de seguridad", recurring: true })
```

### Matriz Agente-Herramienta

| Herramienta         | Cmd | Plan | FE  | BE  | Rev | QA  | PM  | Doc | TL  | DB  | PO  | Dev | CQG | Mon | SEO | TSel |
| ------------------- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
| AskUserQuestion     | ✅  | ✅   | ✅  |     |     | ✅  | ✅  |     |     |     | ✅  |     |     |     | ✅  | ✅   |
| Agent (sub-agentes) | ✅  | ✅   |     |     |     |     |     |     |     |     |     |     |     |     |     |      |
| Skill (cargar hab.) |     |      | ✅  |     |     |     |     |     |     |     |     |     |     |     |     |      |
| SendMessage         | ✅  | ✅   |     |     |     |     |     |     |     |     |     |     |     | ✅  |     |      |
| Monitor (watchdog)  | ✅  |      |     |     |     |     | ✅  |     |     |     |     |     | ✅  |     |     |      |
| TaskStop            | ✅  |      |     |     |     |     |     |     |     |     |     |     | ✅  |     |     |      |
| CronCreate/List     | ✅  |      |     |     |     | ✅  | ✅  |     |     |     |     |     | ✅  |     |     |      |
| ExitPlanMode        |     | ✅   |     |     |     |     |     |     |     |     |     |     |     |     |     |      |
| SaveMemory          | ✅  | ✅   | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  |     |     | ✅  | ✅  | ✅   |
| Lsp (diagnósticos)  | ✅  | ✅   | ✅  | ✅  | ✅  |     |     | ✅  | ✅  |     |     | ✅  | ✅  |     |     |      |
| WebFetch            | ✅  | ✅   | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |     | ✅  | ✅   |

---

## 🔌 Integraciones

### Context7 (Opcional)

[Context7](https://context7.com) proporciona documentación en tiempo real y específica por versión.

**Con Context7:** Doc Researcher obtiene docs en vivo, cero alucinación en firmas de API.

**Sin Context7:** Los agentes usan búsqueda web y conocimiento de entrenamiento — sin errores.

Para instalar, agrega a tu configuración MCP de Qwen Code:

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

El servidor `@modelcontextprotocol/server-memory` proporciona un **Knowledge Graph** que persiste entre sesiones.

**Qué almacena:**

- **Decisiones del proyecto**: BD elegida, framework, patrones de arquitectura
- **Preferencias del usuario**: Framework CSS, convenciones de nombres, modo dark/light
- **Registros de arquitectura**: Jerarquía de componentes, convenciones de API, destinos de despliegue
- **Continuidad de sesión**: Última tarea, siguiente paso, problemas conocidos

**Cómo lo usan los agentes:**

```
create_entities({
  entities: [{ name: "database", entityType: "decision",
    observations: ["PostgreSQL 16", "RLS habilitado", "UUID primary keys"] }]
})

read_graph({})
```

El MCP Memory Server está configurado en `qwen-extension.json` y se ejecuta automáticamente.

### Habilidades UI/UX (Recomendado)

El Frontend Developer puede aprovechar repositorios externos de UI/UX:

| Habilidad           | Instalación                                              | Qué Proporciona                                                              |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     | 161 reglas de razonamiento, 67 estilos UI, generador de design system        |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   | 87 habilidades, 27 comandos en 8 plugins de diseño                           |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` | Framework frontend anti-slop — layout premium, tipografía, motion, espaciado |

---

## ✅ Estándares de Calidad

Cada línea de código producida por el orquestador cumple:

| Estándar    | Requisito                                                                       |
| ----------- | ------------------------------------------------------------------------------- |
| Complejidad | ≤ 10 ciclomática por función                                                    |
| Tamaño      | ≤ 40 líneas por función, ≤ 4 parámetros                                         |
| Tipos       | Tipos estrictos, sin `any`                                                      |
| Testing     | TDD obligatorio, 80%+ cobertura                                                 |
| Seguridad   | Cumplimiento OWASP Top 10                                                       |
| SQL         | Keywords en mayúsculas, una columna por línea, JOINs indentados, prevención N+1 |
| Revisión    | Revisión multidimensional antes de merge                                        |
| Lenguajes   | No solo TypeScript — se adapta al stack del proyecto                            |

---

## 📁 Estructura del Proyecto

```
qwen-orchestrator/
├── qwen-extension.json       # Manifiesto de extensión
├── package.json              # Configuración NPM
├── AGENTS.md                 # Reglas operacionales de agentes
├── LICENSE                   # Licencia MIT
├── CHANGELOG.md              # Historial de releases
├── SECURITY.md               # Política de seguridad
│
├── agents/                   # 24 Definiciones de agentes
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
├── skills/                   # 82 Definiciones de habilidades
│   └── (82 directorios de habilidades)
│
├── commands/                 # 6 Comandos slash
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

## 🎯 Ejemplos de Uso

Una vez instalado, prueba estos comandos en tu CLI de Qwen Code:

```bash
/orchestrator Crear una API REST para gestión de usuarios
/orchestrator Construir un sitio e-commerce responsive con pagos Stripe
/plan Diseñar un esquema de base de datos para un blog
/review Revisar todos los controladores de autenticación por seguridad
/test Ejecutar todas las pruebas y reportar brechas de cobertura
/deploy Desplegar la aplicación a producción con plan de rollback
```

---

## 📚 Documentación

| Documento                                          | Descripción                                   |
| -------------------------------------------------- | --------------------------------------------- |
| [ARCHITECTURE.md](ARCHITECTURE.md)                 | Arquitectura detallada y decisiones de diseño |
| [QUICK-START.md](QUICK-START.md)                   | Guía de inicio rápido                         |
| [INSTALLATION.md](INSTALLATION.md)                 | Instrucciones completas de instalación        |
| [HOOKS-BEST-PRACTICES.md](HOOKS-BEST-PRACTICES.md) | Guía de integración con hooks de Qwen Code    |
| [SUBAGENT-MONITORING.md](SUBAGENT-MONITORING.md)   | Monitoreo y ciclo de vida de sub-agentes      |
| [QWEN_CODE_PATTERNS.md](../QWEN_CODE_PATTERNS.md)  | Servidores MCP, hooks y gestión de sesiones   |
| [SECURITY.md](../SECURITY.md)                      | Política de seguridad                         |
| [CHANGELOG.md](../CHANGELOG.md)                    | Historial de releases                         |
| [AGENTS.md](../AGENTS.md)                          | Reglas operacionales de agentes               |

---

## 👤 Autor

**Omar Obando**

- GitHub: [@Omar-Obando](https://github.com/Omar-Obando)
- Licencia: MIT

---

## 🔑 Palabras Clave

`qwen-code` · `qwen-code-extension` · `multi-agent` · `ai-agents` · `orchestration` · `ai-coding` · `ai-development` · `tdd` · `code-review` · `devops` · `cicd` · `mcp` · `model-context-protocol` · `ai-orchestrator` · `software-engineering` · `ai-assistant` · `coding-agent` · `enterprise-ai` · `multi-agent-system` · `ai-coding-assistant` · `qwen` · `deepseek` · `openai` · `flutter` · `laravel` · `nestjs` · `supabase` · `typescript` · `python` · `php` · `rust` · `golang` · `java` · `csharp` · `sql` · `security-audit` · `owasp` · `test-driven-development` · `code-quality` · `frontend` · `backend` · `mobile` · `devops` · `database` · `api-design` · `i18n` · `localization` · `seo` · `performance` · `refactoring` · `anti-patterns`

---

<div align="center">

**Construido con ❤️ para la comunidad de [Qwen Code](https://github.com/QwenLM/qwen-code)**

[⬆ Volver arriba](#qwen-orchestrator--equipo-de-desarrollo-ai-multi-agente-para-qwen-code)

</div>
