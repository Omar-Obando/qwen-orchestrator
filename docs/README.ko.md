# Qwen Orchestrator — Qwen Code를 위한 멀티 에이전트 AI 개발 팀

**한국어** · [English](../README.md) · [Español](README.es.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [Português](README.pt.md) · [Français](README.fr.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 24](https://img.shields.io/badge/agents-24-blue.svg)](#-에이전트-팀24개-전문-에이전트)
[![Skills: 82](https://img.shields.io/badge/skills-82-purple.svg)](#-스킬82개-전문-스킬)

> 🤖 **[Qwen Code CLI](https://github.com/QwenLM/qwen-code) 전용 엔터프라이즈급 멀티 에이전트 AI 오케스트레이션 확장**
>
> AI 코딩 어시스턴트를 완전한 **소프트웨어 개발 부서**로 변환 — 24개 전문 에이전트, 82개 전문 스킬, 6개 슬래시 명령어, 영구 메모리, MCP 도구 통합.
>
> **제작자:** [Omar-Obando](https://github.com/Omar-Obando) · **라이선스:** MIT · **버전:** 0.0.6

---

## 📑 목차

- [Qwen Orchestrator란?](#-qwen-orchestrator란)
- [빠른 설치](#-빠른-설치)
- [빠른 시작](#-빠른-시작)
- [주요 기능](#-주요-기능)
- [에이전트 팀 (24개 전문 에이전트)](#-에이전트-팀24개-전문-에이전트)
- [스킬 (82개 전문 스킬)](#-스킬82개-전문-스킬)
- [명령어 (6개 슬래시 명령어)](#-명령어6개-슬래시-명령어)
- [작동 방식](#-작동-방식)
- [설치 가이드](#-설치-가이드)
- [모델 설정](#-모델-설정)
- [통합](#-통합)
- [품질 기준](#-품질-기준)
- [사용 예시](#-사용-예시)
- [제작자](#-제작자)

---

## ⚡ Qwen Orchestrator란?

**Qwen Orchestrator**는 **[Qwen Code](https://github.com/QwenLM/qwen-code)** 전용으로 구축된 강력한 확장입니다. 단일 AI 코딩 어시스턴트를 전문 소프트웨어 개발 부서처럼 협업하는 **24개 전문 AI 에이전트의 조정된 팀**으로 변환합니다.

**Commander**가 조정하고, **Planner**가 아키텍처를 설계하며, **프론트엔드·백엔드 개발자**가 병렬로 코딩하고, **Reviewer**가 품질을 관리하며, **QA 엔지니어**가 테스트하고, **사이버보안 엔지니어**가 취약점을 감사하며, **DevOps 엔지니어**가 배포합니다 — 그리고 16명의 추가 전문가가 자동으로 조정됩니다.

### 전용 빌드

**[Qwen Code](https://github.com/QwenLM/qwen-code)** by [QwenLM / Alibaba](https://github.com/QwenLM) — 여러 LLM 제공자를 지원하는 오픈소스 AI 코딩 어시스턴트 CLI. Qwen Orchestrator는 **커뮤니티 구축 확장**이며 Alibaba와 제휴 또는 보증 관계가 없습니다.

> ⚠️ **이 확장은 [Qwen Code CLI](https://github.com/QwenLM/qwen-code) 전용입니다**. 독립형 도구나 VS Code 확장이 아니며 다른 AI 코딩 어시스턴트와 호환되지 않습니다.

---

## 🚀 빠른 설치

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

24개 에이전트, 82개 스킬, 6개 명령어, MCP Memory Server가 자동 등록됩니다.

---

## 🎯 빠른 시작

```bash
/orchestrator 사용자 관리를 위한 REST API 생성
/orchestrator 반응형 이커머스 웹사이트 구축
/plan 블로그용 데이터베이스 스키마 설계
/review 모든 인증 컨트롤러 검사
/test 현재 프로젝트의 모든 테스트 실행
/deploy 프로덕션에 애플리케이션 배포
```

`/orchestrator`는 메인 진입점입니다. 24개 에이전트 풀팀과 전문 워크플로를 활성화합니다:

1. **명확화** → 모호한 점이 있으면 질문
2. **발견** → 프로젝트 스캔, 기술 스택 감지
3. **계획** → 병렬 실행 그룹으로 마일스톤 분해
4. **실행** → 전문 에이전트 동시 실행
5. **검증** → Reviewer + QA가 작동 확인
6. **납품** → 구축 내용, 변경 사항, 증거 요약

---

## 🌟 주요 기능

| 기능                   | 설명                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- |
| **24개 전문 에이전트** | Commander, Planner, 프론트엔드/백엔드 개발자, Reviewer, QA, PM, DevOps, 보안 등 |
| **82개 전문 스킬**     | TDD, 보안 감사, 안티패턴 감지, 디자인 시스템, SQL, Docker, Kubernetes 등        |
| **6개 슬래시 명령어**  | `/orchestrator`, `/orchestrate`, `/plan`, `/review`, `/test`, `/deploy`         |
| **구축 전 질문**       | 에이전트가 코드 작성 전 `AskUserQuestion`으로 요구사항 명확화                   |
| **병렬 실행**          | Commander가 여러 에이전트에 동시 작업 위임                                      |
| **영구 메모리**        | MCP Memory Server를 통한 Knowledge Graph로 세션 간 결정 저장                    |
| **모델 락인 없음**     | Qwen, DeepSeek, OpenAI, Anthropic, 로컬 모델 모두 지원                          |
| **다국어**             | TypeScript, PHP(Laravel), Python(Django), Dart(Flutter), Rust, Go, Java, C#     |
| **루프 보호**          | Monitor 에이전트가 LLM 무한 루프 자동 감지 및 차단                              |
| **품질 게이트**        | Reviewer만이 작업 승인 가능                                                     |

---

## 👥 에이전트 팀 (24개 전문 에이전트)

| #   | 에이전트                  | 역할                  | 슈퍼파워                                  |
| --- | ------------------------- | --------------------- | ----------------------------------------- |
| 1   | **Commander** 🔴          | 마스터 오케스트레이터 | 병렬 위임, relentless 실행                |
| 2   | **Planner** 🔵            | 연구 및 아키텍처      | 파일 수준 계획, 설계 결정                 |
| 3   | **Frontend Developer** 🔵 | UI/UX 구현            | 컴포넌트, 반응형, 접근성, 빠름            |
| 4   | **Backend Developer** 🟢  | 서버 사이드 로직      | API, 인증, 캐시, DB 작업                  |
| 5   | **Reviewer** 🟣           | 품질 게이트키퍼       | 작업 승인 권한 가진 유일한 에이전트       |
| 6   | **QA Engineer** 🟠        | 품질 보증             | 테스트 전략, 엣지 케이스 발견             |
| 7   | **Project Manager** 🔵    | 납품 관리             | 범위 제어, 위험 평가                      |
| 8   | **Doc Researcher** 🟣     | Context7 지식         | 실시간 문서 조회, 환각 방지               |
| 9   | **Tech Lead** 🟡          | 표준 및 가이드        | 모듈 완전성, CRUD 검증                    |
| 10  | **Database Architect** 🟢 | 데이터 레이어 전문가  | 스키마 설계, 마이그레이션 안전            |
| 11  | **Product Owner** 🟡      | 비즈니스 가치         | 사용자 스토리, 수락 기준                  |
| 12  | **DevOps Engineer** 🔘    | 인프라스트럭처        | CI/CD, Docker, 배포 자동화                |
| 13  | **Code Quality Guard** 🌹 | 품질 센티넬           | 구문 검사, Lint, 타입 검사                |
| 14  | **Monitor** 🛡️            | 루프 가디언           | LLM 루프 감지/차단, 런타임 감시           |
| 15  | **SEO Specialist** 🔵     | SEO 및 웹 성능        | 메타 태그, 구조화 데이터, Core Web Vitals |
| 16  | **Tech Selector** 🟣      | 기술 어드바이저       | 프레임워크/DB 선정 및 장단점              |
| 17  | **Cybersecurity Eng.** 🔴 | 애플리케이션 보안     | OWASP, 위협 모델링, 종속성 감사           |
| 18  | **Performance Eng.** ⚡   | 속도 및 규모          | 프로파일링, 쿼리 최적화, 부하 테스트      |
| 19  | **Release Manager** 🏷️    | 릴리스 및 버전 관리   | SemVer, 변경 로그, 롤백 계획              |
| 20  | **API Specialist** 🔗     | API 및 통합           | REST/GraphQL, 버전 관리, 서드파티 API     |
| 21  | **Mobile Engineer** 📱    | 모바일 앱             | Flutter, React Native, 오프라인 우선      |
| 22  | **Localization Eng.** 🌐  | i18n/L10n             | 다국어, RTL, 문화적 적응                  |
| 23  | **Documenter** 📄         | 기술 문서화           | README, API 문서, ADR, 지식 베이스        |
| 24  | **Skill Creator** 🛠️      | 스킬 저작             | 스킬 생성, 문서화, 테스트                 |

---

## 🛠️ 스킬 (82개 전문 스킬)

### 컨테이너화 및 오케스트레이션

| 스킬                     | 목적                                            |
| ------------------------ | ----------------------------------------------- |
| Docker Containerization  | 멀티 스테이지 빌드, 보안 강화, 이미지 최적화    |
| Kubernetes Orchestration | Deployments, HPA, Service Mesh, Ingress, GitOps |

### Infrastructure as Code

| 스킬          | 목적                                         |
| ------------- | -------------------------------------------- |
| Terraform IaC | 모듈, 상태 관리, 워크스페이스, Sentinel 정책 |

### CI/CD 자동화

| 스킬                 | 목적                             |
| -------------------- | -------------------------------- |
| GitHub Actions CI/CD | 워크플로우, 매트릭스, 환경, 캐시 |

### 캐시 및 성능

| 스킬          | 목적                                       |
| ------------- | ------------------------------------------ |
| Redis Caching | 데이터 구조, 캐시 패턴, 세션 관리, Pub/Sub |

### API 설계

| 스킬               | 목적                                          |
| ------------------ | --------------------------------------------- |
| GraphQL API Design | 스키마 설계, 리졸버, DataLoader, 페이지네이션 |

### LLM 및 에이전트

| 스킬             | 목적                                          |
| ---------------- | --------------------------------------------- |
| LangGraph        | 에이전트 워크플로우, 상태 관리, 멀티 에이전트 |
| LangChain        | LLM 체인, 에이전트, 도구, 메모리, RAG         |
| LLM Integrations | 멀티 제공자 LLM 통합                          |

### 클라우드 플랫폼

| 스킬              | 목적                                       |
| ----------------- | ------------------------------------------ |
| Vercel Deployment | 서버리스 함수, 엣지 컴퓨팅, Next.js 최적화 |
| Cloudflare Pages  | 엣지 함수, 글로벌 분산, 캐시               |
| AWS Serverless    | Lambda, API Gateway, SAM                   |

### 리더십 및 아키텍처

| 스킬                       | 목적                                       |
| -------------------------- | ------------------------------------------ |
| Strategic Leadership       | 팀 관리, 의사 결정, 이해관계자 조정        |
| Microservices Architecture | 도메인 주도 설계, 서비스 경계, 이벤트 구동 |

### 보안 및 품질

| 스킬                 | 목적                                   |
| -------------------- | -------------------------------------- |
| Security Code Review | OWASP Top 10, 취약점 패턴, 보안 코딩   |
| Threat Modeling      | STRIDE, DREAD, 공격 트리               |
| Code Review          | OWASP + SOLID + Clean Code 체계적 검토 |

### 데이터베이스

| 스킬               | 목적                           |
| ------------------ | ------------------------------ |
| Database Design    | 스키마 설계, 관계, 인덱싱 전략 |
| SQL Best Practices | 쿼리 최적화, 인덱싱, N+1 방지  |

### 프론트엔드 및 모바일

| 스킬             | 목적                                      |
| ---------------- | ----------------------------------------- |
| Accessibility    | WCAG 2.1 AA, 시맨틱 HTML, ARIA            |
| Design System    | 컬러 팔레트, 타이포그래피, 간격, 컴포넌트 |
| Website Redesign | URL/스크린샷 기반 재설계                  |
| Flutter Web      | 반응형 레이아웃, 적응형 위젯              |

### 백엔드 및 API

| 스킬       | 목적                                  |
| ---------- | ------------------------------------- |
| API Design | RESTful 표준, 응답 봉투, 페이지네이션 |
| Laravel    | Eloquent ORM, Form Requests, 큐       |
| NestJS     | 모듈, 가드, 파이프, 인터셉터          |
| Supabase   | RLS 정책, Edge Functions, 인증        |

### DevOps 및 인프라

| 스킬              | 목적                              |
| ----------------- | --------------------------------- |
| Disaster Recovery | 백업 전략, 복구 절차, 페일오버    |
| Git Workflow      | 브랜치 전략, 커밋 규칙, PR 템플릿 |
| Deployment        | CI/CD, Docker, 릴리스 관리        |

### 기타

| 스킬               | 목적                                  |
| ------------------ | ------------------------------------- |
| Anti-Hallucination | 소스 검증, 증거 기반 주장             |
| TDD Workflow       | 테스트 주도 개발 (Red/Green/Refactor) |
| Security Audit     | OWASP Top 10 취약점 감지              |
| Domain-Driven      | DDD 패턴, 제한된 컨텍스트             |
| Performance        | 프로파일링, 최적화, 벤치마크          |
| Compliance         | GDPR, HIPAA, SOC 2, PCI-DSS           |

---

## ⌨️ 명령어 (6개 슬래시 명령어)

| 명령어                        | 설명                                            |
| ----------------------------- | ----------------------------------------------- |
| **`/orchestrator [목표]`** ⭐ | **메인 진입점** — 전체 팀, 명확화 프로토콜 포함 |
| `/orchestrate [미션]`         | 직접 실행 — 질문 없음, 즉시 구축                |
| `/plan [기능]`                | 구현 계획만 — 연구 + 아키텍처                   |
| `/review [대상]`              | 포괄적 코드 리뷰                                |
| `/test [대상]`                | 테스트 스위트 실행 및 분석                      |
| `/deploy [대상]`              | 사전/사후 검증 포함 배포                        |

---

## 🧠 작동 방식

### 실행 흐름

```
사용자 입력 /orchestrator "결제 시스템 구축"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   AskUserQuestion으로│
         │   범위 명확화        │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   프로젝트 분석      │
         │   마일스톤 생성      │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│작업 1   │  │작업 2    │  │스키마 + 마이그레이션│
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│승인     │  │테스트    │  │Lint + 타입 검사   │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   미션 완료          │
         │   요약 납품          │
         └─────────────────────┘
```

---

## 📦 설치 가이드

### 빠른 설치 (권장)

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

### 수동 설치

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

설정 파일에 추가:

```json
{
  "extensions": ["/전체경로/qwen-orchestrator"]
}
```

### MCP 도구 서버 (선택 사항)

```bash
cd qwen-orchestrator && npm install && npm run build
```

---

## ⚙️ 모델 설정

**기본적으로 모든 에이전트는 Qwen Code 기본 모델을 사용합니다.**

| 에이전트           | 권장 모델                | 이유                    |
| ------------------ | ------------------------ | ----------------------- |
| Commander          | `qwen-max` / `qwen-plus` | 강력한 추론 필요        |
| Planner            | `qwen-max` / `qwen-plus` | 강력한 분석 필요        |
| Frontend Developer | `qwen3-coder-plus`       | 코드 생성 최적화        |
| Backend Developer  | `qwen3-coder-plus`       | 코드 생성 최적화        |
| Reviewer           | `qwen-max`               | 품질 게이트용 심층 이해 |
| 기타               | 사용자 기본값            | 특별 요구사항 없음      |

---

## 🔌 통합

### Context7 (선택 사항)

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

세션 간 영구 **Knowledge Graph** 제공. `qwen-extension.json`에 자동 설정.

### UI/UX 스킬 (권장)

| 스킬                | 설치                                                     |
| ------------------- | -------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` |

---

## ✅ 품질 기준

| 기준   | 요구사항                                           |
| ------ | -------------------------------------------------- |
| 복잡도 | 함수당 ≤ 10 사이클로매틱 복잡도                    |
| 크기   | 함수당 ≤ 40줄, ≤ 4개 매개변수                      |
| 타입   | 엄격한 타입, `any` 미사용                          |
| 테스트 | TDD 필수, 80%+ 커버리지                            |
| 보안   | OWASP Top 10 준수                                  |
| SQL    | 대문자 키워드, 줄당 한 열, 들여쓰기 JOIN, N+1 방지 |

---

## 🎯 사용 예시

```bash
/orchestrator 사용자 관리를 위한 REST API 생성
/orchestrator Stripe 결제 포함 반응형 이커머스 사이트 구축
/plan 블로그 플랫폼용 데이터베이스 스키마 설계
/review 모든 인증 컨트롤러의 보안 검사
/deploy 롤백 계획 포함 프로덕션 배포
```

---

## 👤 제작자

**Omar Obando** · GitHub: [@Omar-Obando](https://github.com/Omar-Obando) · 라이선스: MIT

---

<div align="center">

**[Qwen Code](https://github.com/QwenLM/qwen-code) 커뮤니티를 위해 ❤️로 제작**

[⬆ 맨 위로](#qwen-orchestrator--qwen-code를-위한-멀티-에이전트-ai-개발-팀)

</div>
