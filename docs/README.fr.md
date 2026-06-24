# Qwen Orchestrator — Équipe de Développement IA Multi-Agent pour Qwen Code

**Français** · [English](../README.md) · [Español](README.es.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 24](https://img.shields.io/badge/agents-24-blue.svg)](#-équipe-dagents-24-agents-spécialisés)
[![Compétences: 82](https://img.shields.io/badge/compétences-82-purple.svg)](#-compétences-82-compétences-professionnelles)

> 🤖 **Extension d'orchestration IA multi-agent de niveau entreprise exclusivement pour [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**
>
> Transformez votre assistant de codage IA en un **département complet de développement logiciel** — 24 agents spécialisés, 82 compétences professionnelles, 6 commandes slash, mémoire persistante et intégration d'outils MCP.
>
> **Auteur:** [Omar-Obando](https://github.com/Omar-Obando) · **Licence:** MIT · **Version:** 0.0.6

---

## 📑 Table des Matières

- [Qu'est-ce que Qwen Orchestrator ?](#-quest-ce-que-qwen-orchestrator)
- [Installation Rapide](#-installation-rapide)
- [Démarrage Rapide](#-démarrage-rapide)
- [Fonctionnalités Principales](#-fonctionnalités-principales)
- [Équipe d'Agents (24 Agents Spécialisés)](#-équipe-dagents-24-agents-spécialisés)
- [Compétences (82 Compétences Professionnelles)](#-compétences-82-compétences-professionnelles)
- [Commandes (6 Commandes Slash)](#-commandes-6-commandes-slash)
- [Fonctionnement](#-fonctionnement)
- [Guide d'Installation](#-guide-dinstallation)
- [Configuration des Modèles](#-configuration-des-modèles)
- [Outils Avancés](#-outils-avancés)
- [Intégrations](#-intégrations)
- [Normes de Qualité](#-normes-de-qualité)
- [Exemples d'Utilisation](#-exemples-dutilisation)
- [Auteur](#-auteur)

---

## ⚡ Qu'est-ce que Qwen Orchestrator ?

**Qwen Orchestrator** est une extension puissante construite exclusivement pour **[Qwen Code](https://github.com/QwenLM/qwen-code)** — le CLI de codage IA open-source d'Alibaba. Il transforme un seul assistant de codage IA en une **équipe coordonnée de 24 agents IA spécialisés** qui travaillent ensemble comme un département professionnel de développement logiciel.

### Pourquoi Qwen Orchestrator ?

Imaginez avoir toute une équipe d'ingénierie à portée de main : un **Commander** qui orchestre, un **Planner** qui conçoit l'architecture, des **Développeurs Frontend et Backend** qui codent en parallèle, un **Reviewer** qui contrôle la qualité, un **QA Engineer** qui teste, un **Cybersecurity Engineer** qui audite les vulnérabilités, un **DevOps Engineer** qui déploie — et 16 spécialistes supplémentaires, tous coordonnés automatiquement.

### Construit Exclusivement Pour

**[Qwen Code](https://github.com/QwenLM/qwen-code)** par [QwenLM / Alibaba](https://github.com/QwenLM) — Le CLI d'assistant de codage IA open-source qui prend en charge plusieurs fournisseurs LLM. Qwen Orchestrator est une **extension communautaire** et n'est pas affilié ou approuvé par Alibaba.

> ⚠️ **Cette extension fonctionne UNIQUEMENT avec [Qwen Code CLI](https://github.com/QwenLM/qwen-code)**. Ce N'EST PAS un outil autonome, PAS une extension VS Code, et PAS compatible avec d'autres assistants de codage IA.

---

## 🚀 Installation Rapide

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

C'est tout ! L'extension enregistre automatiquement les 24 agents, 82 compétences, 6 commandes et le MCP Memory Server.

---

## 🎯 Démarrage Rapide

```bash
/orchestrator Créer une API REST pour la gestion des utilisateurs
/orchestrator Construire un site e-commerce responsive
/plan Concevoir un schéma de base de données pour un blog
/review Vérifier tous les contrôleurs d'authentification
/test Exécuter tous les tests du projet actuel
/deploy Déployer l'application en production
```

La commande `/orchestrator` est le point d'entrée principal. Elle active l'équipe complète de 24 agents :

1. **CLARIFIER** → Pose des questions ciblées en cas d'ambiguïté
2. **DÉCOUVRIR** → Analyse le projet, détecte la stack technique
3. **PLANIFIER** → Décompose la mission en jalons avec exécution parallèle
4. **EXÉCUTER** → Lance les agents spécialisés simultanément
5. **VÉRIFIER** → Reviewer + QA confirment que tout fonctionne
6. **LIVRER** → Résumé de ce qui a été construit, modifié et des preuves

---

## 🌟 Fonctionnalités Principales

| Fonctionnalité                  | Description                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| **24 Agents Spécialisés**       | Commander, Planner, Devs Frontend/Backend, Reviewer, QA, PM, DevOps, Sécurité et plus        |
| **82 Compétences Pro**          | TDD, audit de sécurité, détection anti-patterns, design system, SQL, Docker, Kubernetes etc. |
| **6 Commandes Slash**           | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`                      |
| **Questionner Avant de Coder**  | Les agents clarifient les exigences avant d'écrire du code                                   |
| **Exécution Parallèle**         | Le Commander délègue des tâches à plusieurs agents simultanément                             |
| **Mémoire Persistante**         | Knowledge Graph via MCP Memory Server stocke les décisions entre sessions                    |
| **Zéro Verrouillage de Modèle** | Fonctionne avec Qwen, DeepSeek, OpenAI, Anthropic ou tout modèle local                       |
| **Multi-Langage**               | TypeScript, PHP (Laravel), Python (Django), Dart (Flutter), Rust, Go, Java, C#               |
| **Protection Anti-Boucle**      | L'agent Monitor détecte et interrompt les boucles infinies automatiquement                   |
| **Portes de Qualité**           | Le Reviewer est le SEUL agent qui peut approuver les tâches                                  |

---

## 👥 Équipe d'Agents (24 Agents Spécialisés)

| #   | Agent                     | Rôle                      | Superpouvoir                                             |
| --- | ------------------------- | ------------------------- | -------------------------------------------------------- |
| 1   | **Commander** 🔴          | Maître Orchestrateur      | Délégation parallèle, exécution sans relâche             |
| 2   | **Planner** 🔵            | Recherche et Architecture | Planification au niveau fichier, décisions de conception |
| 3   | **Frontend Developer** 🔵 | Implémentation UI/UX      | Composants, responsive, accessible, rapide               |
| 4   | **Backend Developer** 🟢  | Logique Serveur           | APIs, authentification, cache, opérations BD             |
| 5   | **Reviewer** 🟣           | Gardien de Qualité        | SEUL agent pouvant approuver les tâches                  |
| 6   | **QA Engineer** 🟠        | Assurance Qualité         | Stratégie de test, découverte de cas limites             |
| 7   | **Project Manager** 🔵    | Gestion de Livraison      | Contrôle de périmètre, évaluation des risques            |
| 8   | **Doc Researcher** 🟣     | Connaissance Context7     | Consultation de docs en direct, anti-hallucination       |
| 9   | **Tech Lead** 🟡          | Standards et Conseils     | Complétude des modules, vérification CRUD                |
| 10  | **Database Architect** 🟢 | Spécialiste Données       | Conception de schéma, sécurité des migrations            |
| 11  | **Product Owner** 🟡      | Valeur Métier             | User stories, critères d'acceptation                     |
| 12  | **DevOps Engineer** 🔘    | Infrastructure            | CI/CD, Docker, automatisation du déploiement             |
| 13  | **Code Quality Guard** 🌹 | Sentinelle Qualité        | Vérification syntaxe, lint, typecheck                    |
| 14  | **Monitor** 🛡️            | Gardien Anti-Boucle       | Détecter/interrompre les boucles LLM, watchdog           |
| 15  | **SEO Specialist** 🔵     | SEO et Performance Web    | Meta tags, données structurées, Core Web Vitals          |
| 16  | **Tech Selector** 🟣      | Conseiller Technique      | Sélection framework/BD avec avantages/inconvénients      |
| 17  | **Cybersecurity Eng.** 🔴 | Sécurité Applicative      | OWASP, modélisation des menaces, audit des dépendances   |
| 18  | **Performance Eng.** ⚡   | Vitesse et Échelle        | Profilage, optimisation des requêtes, tests de charge    |
| 19  | **Release Manager** 🏷️    | Releases et Versioning    | SemVer, changelogs, planification de rollback            |
| 20  | **API Specialist** 🔗     | APIs et Intégration       | REST/GraphQL, versioning, APIs tierces                   |
| 21  | **Mobile Engineer** 📱    | Apps Mobiles              | Flutter, React Native, offline-first                     |
| 22  | **Localization Eng.** 🌐  | i18n/L10n                 | Multi-langue, RTL, adaptation culturelle                 |
| 23  | **Documenter** 📄         | Rédaction Technique       | README, docs API, ADRs, base de connaissances            |
| 24  | **Skill Creator** 🛠️      | Création de Compétences   | Création de compétences, documentation, tests            |

---

## 🛠️ Compétences (82 Compétences Professionnelles)

### Conteneurisation et Orchestration

| Compétence               | Objectif                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| Docker Containerization  | Builds multi-étapes, durcissement sécurité, optimisation d'images |
| Kubernetes Orchestration | Deployments, HPA, service mesh, ingress, GitOps                   |

### Infrastructure as Code

| Compétence    | Objectif                                                 |
| ------------- | -------------------------------------------------------- |
| Terraform IaC | Modules, gestion d'état, workspaces, politiques Sentinel |

### Automatisation CI/CD

| Compétence           | Objectif                                   |
| -------------------- | ------------------------------------------ |
| GitHub Actions CI/CD | Workflows, matrices, environnements, cache |

### Cache et Performance

| Compétence    | Objectif                                                      |
| ------------- | ------------------------------------------------------------- |
| Redis Caching | Structures de données, patterns de cache, gestion de sessions |

### Conception d'API

| Compétence         | Objectif                                                |
| ------------------ | ------------------------------------------------------- |
| GraphQL API Design | Conception de schéma, resolvers, DataLoader, pagination |

### LLM et Agents

| Compétence       | Objectif                                                  |
| ---------------- | --------------------------------------------------------- |
| LangGraph        | Workflows d'agents, gestion d'état, systèmes multi-agents |
| LangChain        | Chaînes LLM, agents, outils, mémoire, RAG                 |
| LLM Integrations | Intégration multi-fournisseurs LLM                        |

### Plateformes Cloud

| Compétence        | Objectif                                                   |
| ----------------- | ---------------------------------------------------------- |
| Vercel Deployment | Fonctions serverless, edge computing, optimisation Next.js |
| Cloudflare Pages  | Edge functions, distribution globale, cache                |
| AWS Serverless    | Lambda, API Gateway, SAM, architectures event-driven       |

### Leadership et Architecture

| Compétence                 | Objectif                                                             |
| -------------------------- | -------------------------------------------------------------------- |
| Strategic Leadership       | Gestion d'équipe, prise de décision, alignement                      |
| Microservices Architecture | Design domain-driven, limites de service, communication event-driven |

### Sécurité et Qualité

| Compétence           | Objectif                                                 |
| -------------------- | -------------------------------------------------------- |
| Security Code Review | OWASP Top 10, patterns de vulnérabilité, codage sécurisé |
| Threat Modeling      | STRIDE, DREAD, arbres d'attaque                          |
| Code Review          | Revue systématique OWASP + SOLID + Clean Code            |

### Base de Données

| Compétence         | Objectif                                                 |
| ------------------ | -------------------------------------------------------- |
| Database Design    | Conception de schéma, relations, stratégies d'indexation |
| SQL Best Practices | Optimisation des requêtes, indexation, prévention N+1    |

### Frontend et Mobile

| Compétence       | Objectif                                                  |
| ---------------- | --------------------------------------------------------- |
| Accessibility    | WCAG 2.1 AA, HTML sémantique, ARIA, navigation clavier    |
| Design System    | Palettes de couleurs, typographie, espacement, composants |
| Website Redesign | Refonte basée URL/capture d'écran, flux d'analyse         |
| Flutter Web      | Layouts responsives, widgets adaptatifs                   |

### Backend et APIs

| Compétence | Objectif                                                             |
| ---------- | -------------------------------------------------------------------- |
| API Design | Standards RESTful, enveloppes de réponse, pagination                 |
| Laravel    | Eloquent ORM, Form Requests, files d'attente, patterns API           |
| NestJS     | Modules, guards, pipes, interceptors                                 |
| Supabase   | Politiques RLS, Edge Functions, authentification, APIs auto-générées |

### DevOps et Infrastructure

| Compétence        | Objectif                                                       |
| ----------------- | -------------------------------------------------------------- |
| Disaster Recovery | Stratégies de sauvegarde, procédures de restauration, failover |
| Git Workflow      | Stratégies de branching, conventions de commit, templates PR   |
| Deployment        | CI/CD, Docker, gestion des releases                            |

### Autres

| Compétence         | Objectif                                                      |
| ------------------ | ------------------------------------------------------------- |
| Anti-Hallucination | Vérification des sources, affirmations basées sur des preuves |
| TDD Workflow       | Développement Piloté par les Tests (Red/Green/Refactor)       |
| Security Audit     | Détection de vulnérabilités OWASP Top 10                      |
| Domain-Driven      | Patterns DDD, contextes bornés, agrégats                      |
| Performance        | Profilage, optimisation, benchmarks                           |
| Compliance         | GDPR, HIPAA, SOC 2, PCI-DSS                                   |

---

## ⌨️ Commandes (6 Commandes Slash)

| Commande                          | Description                                                          |
| --------------------------------- | -------------------------------------------------------------------- |
| **`/orchestrator [objectif]`** ⭐ | **Entrée principale** — Équipe complète avec protocole de clarté     |
| `/orchestrate [mission]`          | Exécution directe — sans questions, construction immédiate           |
| `/plan [fonctionnalité]`          | Créer uniquement le plan d'implémentation — recherche + architecture |
| `/review [cible]`                 | Revue de code complète — sécurité, qualité, patterns                 |
| `/test [cible]`                   | Exécuter et analyser la suite de tests — couverture, lacunes         |
| `/deploy [cible]`                 | Déployer avec vérification pré/post — CI/CD, plan de rollback        |

---

## 🧠 Fonctionnement

### Flux d'Exécution

```
L'utilisateur tape /orchestrator "Construire un système de paiement"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Clarifie le scope │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   Analyse le projet │
         │   Crée des jalons   │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│Tâche 1  │  │Tâche 2   │  │Schéma + Migration│
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│Approuve │  │Teste     │  │Lint + Typecheck  │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   Termine la mission│
         │   Livre le résumé   │
         └─────────────────────┘
```

---

## 📦 Guide d'Installation

### Installation Rapide (Recommandée)

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

### Installation Manuelle

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

Ajoutez à la configuration (`~/.qwen/settings.json`) :

```json
{
  "extensions": ["/chemin/complet/qwen-orchestrator"]
}
```

### Serveur d'Outils MCP (Optionnel)

```bash
cd qwen-orchestrator && npm install && npm run build
```

---

## ⚙️ Configuration des Modèles

**Par défaut, tous les agents utilisent votre modèle Qwen Code par défaut.**

| Agent              | Modèle Recommandé        | Pourquoi                                         |
| ------------------ | ------------------------ | ------------------------------------------------ |
| Commander          | `qwen-max` / `qwen-plus` | Besoin de raisonnement fort pour l'orchestration |
| Planner            | `qwen-max` / `qwen-plus` | Besoin d'analyse forte pour l'architecture       |
| Frontend Developer | `qwen3-coder-plus`       | Optimisé pour la génération de code              |
| Backend Developer  | `qwen3-coder-plus`       | Optimisé pour la génération de code              |
| Reviewer           | `qwen-max`               | Besoin de compréhension profonde pour la qualité |
| Autres             | Défaut utilisateur       | Pas de besoins spéciaux                          |

---

## 🔌 Intégrations

### Context7 (Optionnel)

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

Fournit un **Knowledge Graph** persistant entre les sessions. Configuré automatiquement dans `qwen-extension.json`.

### Compétences UI/UX (Recommandé)

| Compétence          | Installation                                             |
| ------------------- | -------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` |

---

## ✅ Normes de Qualité

| Norme      | Exigence                                                                       |
| ---------- | ------------------------------------------------------------------------------ |
| Complexité | ≤ 10 cyclomatique par fonction                                                 |
| Taille     | ≤ 40 lignes par fonction, ≤ 4 paramètres                                       |
| Types      | Types stricts, pas de `any`                                                    |
| Tests      | TDD obligatoire, 80%+ couverture                                               |
| Sécurité   | Conformité OWASP Top 10                                                        |
| SQL        | Mots-clés en majuscules, une colonne par ligne, JOINs indentés, prévention N+1 |

---

## 🎯 Exemples d'Utilisation

```bash
/orchestrator Créer une API REST pour la gestion des utilisateurs
/orchestrator Construire un site e-commerce responsive avec paiements Stripe
/plan Concevoir un schéma de base de données pour un blog
/review Vérifier tous les contrôleurs d'authentification pour la sécurité
/deploy Déployer l'application en production avec plan de rollback
```

---

## 👤 Auteur

**Omar Obando** · GitHub: [@Omar-Obando](https://github.com/Omar-Obando) · Licence: MIT

---

<div align="center">

**Construit avec ❤️ pour la communauté [Qwen Code](https://github.com/QwenLM/qwen-code)**

[⬆ Retour en haut](#qwen-orchestrator--équipe-de-développement-ia-multi-agent-pour-qwen-code)

</div>
