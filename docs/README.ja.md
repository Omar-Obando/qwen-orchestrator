# Qwen Orchestrator — Qwen Code向けマルチエージェントAI開発チーム

**日本語** · [English](../README.md) · [Español](README.es.md) · [中文](README.zh.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Français](README.fr.md) · [العربية](README.ar.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.6-green.svg)](../package.json)
[![Qwen Code Extension](https://img.shields.io/badge/Qwen%20Code-Extension-orange.svg)](https://github.com/QwenLM/qwen-code)
[![Agents: 24](https://img.shields.io/badge/agents-24-blue.svg)](#-エージェントチーム24の専門エージェント)
[![Skills: 82](https://img.shields.io/badge/skills-82-purple.svg)](#-スキル82の専門スキル)

> 🤖 **[Qwen Code CLI](https://github.com/QwenLM/qwen-code)専用のエンタープライズグレード・マルチエージェントAIオーケストレーション拡張機能**
>
> AIコーディングアシスタントを完全な**ソフトウェア開発部門**に変革 — 24の専門エージェント、82の専門スキル、6つのスラッシュコマンド、永続メモリ、MCPツール統合。
>
> **作者:** [Omar-Obando](https://github.com/Omar-Obando) · **ライセンス:** MIT · **バージョン:** 0.0.6

---

## 📑 目次

- [Qwen Orchestratorとは？](#-qwen-orchestratorとは)
- [クイックインストール](#-クイックインストール)
- [クイックスタート](#-クイックスタート)
- [主な機能](#-主な機能)
- [エージェントチーム（24の専門エージェント）](#-エージェントチーム24の専門エージェント)
- [スキル（82の専門スキル）](#-スキル82の専門スキル)
- [コマンド（6つのスラッシュコマンド）](#-コマンド6つのスラッシュコマンド)
- [仕組み](#-仕組み)
  - [実行フロー](#実行フロー)
  - [ユーザークラリティ：構築前に質問](#ユーザークラリティ構築前に質問)
  - [アーキテクチャ図](#アーキテクチャ図)
- [インストールガイド](#-インストールガイド)
  - [クイックインストール（推奨）](#クイックインストール推奨)
  - [手動インストール](#手動インストール)
  - [MCPツールサーバー（オプション）](#mcpツールサーバーオプション)
  - [トラブルシューティング](#トラブルシューティング)
- [モデル設定](#-モデル設定)
- [CLIモードの推奨事項](#-cliモードの推奨事項)
- [高度なツール](#-高度なツール)
- [統合](#-統合)
- [品質基準](#-品質基準)
- [プロジェクト構造](#-プロジェクト構造)
- [使用例](#-使用例)
- [ドキュメント](#-ドキュメント)
- [作者](#-作者)

---

## ⚡ Qwen Orchestratorとは？

**Qwen Orchestrator**は、**[Qwen Code](https://github.com/QwenLM/qwen-code)**専用に構築された強力な拡張機能です。単一のAIコーディングアシスタントを、プロのソフトウェア開発部門のように協働する**24の専門AIエージェントの調整チーム**に変革します。

### なぜQwen Orchestratorなのか？

**Commander**が調整し、**Planner**がアーキテクチャを設計し、**フロントエンド・バックエンド開発者**が並行してコーディングし、**Reviewer**が品質を管理し、**QAエンジニア**がテストし、**サイバーセキュリティエンジニア**が脆弱性を監査し、**DevOpsエンジニア**がデプロイする — さらに16人のスペシャリストが自動的に連携します。

### 専用ビルド

<table>
<tr>
<td width="80" align="center">

![Qwen Code](https://img.shields.io/badge/Qwen%20Code-CLI-orange?style=for-the-badge)

</td>
<td>

**[Qwen Code](https://github.com/QwenLM/qwen-code)** by [QwenLM / Alibaba](https://github.com/QwenLM) — 複数のLLMプロバイダーをサポートするオープンソースAIコーディングアシスタントCLI。Qwen Orchestratorは**コミュニティ構築の拡張機能**であり、Alibabaとは提携・承認関係にありません。

</td>
</tr>
</table>

> ⚠️ **この拡張機能は[Qwen Code CLI](https://github.com/QwenLM/qwen-code)専用です**。スタンドアロンツールでもVS Code拡張でもなく、他のAIコーディングアシスタントとの互換性もありません。

---

## 🚀 クイックインストール

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

これだけで24のエージェント、82のスキル、6つのコマンド、MCP Memory Serverが自動登録されます。

---

## 🎯 クイックスタート

```bash
/orchestrator ユーザー管理のREST APIを作成
/orchestrator レスポンシブなEコマースサイトを構築
/plan ブログのデータベーススキーマを設計
/review すべての認証コントローラーをチェック
/test 現在のプロジェクトの全テストを実行
/deploy アプリケーションを本番環境にデプロイ
```

`/orchestrator`コマンドはメインエントリポイントです。24エージェントのフルチームを起動します：

1. **明確化** → 曖昧な点があれば質問
2. **発見** → プロジェクトをスキャン、技術スタックを検出
3. **計画** → マイルストーンに分解し並列実行グループを作成
4. **実行** → 専門エージェントを同時起動
5. **検証** → Reviewer + QAが動作を確認
6. **納品** → 構築内容・変更・証跡のサマリー

---

## 🌟 主な機能

| 機能                        | 説明                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **24の専門エージェント**    | Commander、Planner、フロントエンド/バックエンド開発者、Reviewer、QA、PM、DevOps、セキュリティ他 |
| **82の専門スキル**          | TDD、セキュリティ監査、アンチパターン検出、デザインシステム、SQL、Docker、Kubernetes他          |
| **6つのスラッシュコマンド** | `/orchestrator`、`/orchestrate`、`/plan`、`/review`、`/test`、`/deploy`                         |
| **構築前に質問**            | エージェントがコードを書く前に`AskUserQuestion`で要件を明確化                                   |
| **並列実行**                | Commanderが複数エージェントに同時にタスクを委任                                                 |
| **永続メモリ**              | MCP Memory Server経由のKnowledge Graphがセッション間で決定を保存                                |
| **モデルロックインなし**    | Qwen、DeepSeek、OpenAI、Anthropic、任意のローカルモデルで動作                                   |
| **マルチ言語**              | TypeScript、PHP（Laravel）、Python（Django）、Dart（Flutter）、Rust、Go、Java、C#               |
| **ループ保護**              | MonitorエージェントがLLM無限ループを自動検出・遮断                                              |
| **品質ゲート**              | Reviewerのみがタスクを承認可能                                                                  |
| **セキュリティ第一**        | セキュリティ監査スキル + ReviewerエージェントによるOWASP Top 10準拠                             |

---

## 👥 エージェントチーム（24の専門エージェント）

| #   | エージェント              | 役割                         | スーパーパワー                                  |
| --- | ------------------------- | ---------------------------- | ----------------------------------------------- |
| 1   | **Commander** 🔴          | マスターオーケストレーター   | 並列委任、 relentlessな実行                     |
| 2   | **Planner** 🔵            | 調査・アーキテクチャ         | ファイルレベル計画、設計判断                    |
| 3   | **Frontend Developer** 🔵 | UI/UX実装                    | コンポーネント、レスポンシブ、アクセシブル      |
| 4   | **Backend Developer** 🟢  | サーバーサイドロジック       | API、認証、キャッシュ、DB操作                   |
| 5   | **Reviewer** 🟣           | 品質ゲートキーパー           | タスク承認権限を持つ唯一のエージェント          |
| 6   | **QA Engineer** 🟠        | 品質保証                     | テスト戦略、エッジケース発見                    |
| 7   | **Project Manager** 🔵    | デリバリー管理               | スコープ管理、リスク評価                        |
| 8   | **Doc Researcher** 🟣     | Context7ナレッジ             | ライブドキュメント検索、反幻覚                  |
| 9   | **Tech Lead** 🟡          | 標準・ガイダンス             | モジュール完全性、CRUD検証                      |
| 10  | **Database Architect** 🟢 | データレイヤー専門家         | スキーマ設計、マイグレーション安全性            |
| 11  | **Product Owner** 🟡      | ビジネス価値                 | ユーザーストーリー、受け入れ基準                |
| 12  | **DevOps Engineer** 🔘    | インフラストラクチャ         | CI/CD、Docker、デプロイ自動化                   |
| 13  | **Code Quality Guard** 🌹 | 品質センチネル               | 構文チェック、lint、型チェック                  |
| 14  | **Monitor** 🛡️            | ループガーディアン           | LLMループの検出・遮断、ランタイム監視           |
| 15  | **SEO Specialist** 🔵     | SEO・Webパフォーマンス       | メタタグ、構造化データ、Core Web Vitals         |
| 16  | **Tech Selector** 🟣      | 技術アドバイザー             | フレームワーク/DB選定と長所短所                 |
| 17  | **Cybersecurity Eng.** 🔴 | アプリケーションセキュリティ | OWASP、脅威モデリング、依存関係監査             |
| 18  | **Performance Eng.** ⚡   | 速度・スケール               | プロファイリング、クエリ最適化、負荷テスト      |
| 19  | **Release Manager** 🏷️    | リリース・バージョニング     | SemVer、チェンジログ、ロールバック計画          |
| 20  | **API Specialist** 🔗     | API・統合                    | REST/GraphQL、バージョニング、サードパーティAPI |
| 21  | **Mobile Engineer** 📱    | モバイルアプリ               | Flutter、React Native、オフラインファースト     |
| 22  | **Localization Eng.** 🌐  | i18n/L10n                    | 多言語、RTL、文化的適応                         |
| 23  | **Documenter** 📄         | テクニカルライティング       | README、APIドキュメント、ADR、ナレッジベース    |
| 24  | **Skill Creator** 🛠️      | スキルオーサリング           | スキル作成、ドキュメント、テスト                |

---

## 🛠️ スキル（82の専門スキル）

### コンテナ化・オーケストレーション

| スキル                   | 目的                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| Docker Containerization  | マルチステージビルド、セキュリティ強化、イメージ最適化、Docker Compose |
| Kubernetes Orchestration | Deployments、HPA、Service Mesh、Ingress、GitOps                        |

### Infrastructure as Code

| スキル        | 目的                                                              |
| ------------- | ----------------------------------------------------------------- |
| Terraform IaC | モジュール、状態管理、ワークスペース、Sentinelポリシー、Terratest |

### CI/CD自動化

| スキル               | 目的                                                         |
| -------------------- | ------------------------------------------------------------ |
| GitHub Actions CI/CD | ワークフロー、マトリックス、環境、キャッシュ、複合アクション |

### キャッシュ・パフォーマンス

| スキル        | 目的                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| Redis Caching | データ構造、キャッシュパターン、セッション管理、Pub/Sub、Luaスクリプト |

### API設計

| スキル             | 目的                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| GraphQL API Design | スキーマ設計、リゾルバ、DataLoader、ページネーション、Apollo Federation |

### LLM・エージェント

| スキル           | 目的                                                           |
| ---------------- | -------------------------------------------------------------- |
| LangGraph        | エージェントワークフロー、状態管理、マルチエージェントシステム |
| LangChain        | LLMチェーン、エージェント、ツール、メモリ、RAG                 |
| Qwen Agent       | Qwen特化エージェント開発と統合                                 |
| LLM Integrations | マルチプロバイダーLLM統合                                      |

### クラウドプラットフォーム

| スキル            | 目的                                                      |
| ----------------- | --------------------------------------------------------- |
| Vercel Deployment | サーバーレス関数、エッジコンピューティング、Next.js最適化 |
| Cloudflare Pages  | エッジ関数、グローバル分散、キャッシュ                    |
| AWS Serverless    | Lambda、API Gateway、SAM、イベント駆動アーキテクチャ      |

### リーダーシップ・アーキテクチャ

| スキル                     | 目的                                             |
| -------------------------- | ------------------------------------------------ |
| Strategic Leadership       | チーム管理、意思決定、ステークホルダー調整       |
| Requirements Engineering   | ユースケース、ユーザーストーリー、受け入れ基準   |
| Microservices Architecture | ドメイン駆動設計、サービス境界、イベント駆動通信 |

### セキュリティ・品質

| スキル               | 目的                                                     |
| -------------------- | -------------------------------------------------------- |
| Security Code Review | OWASP Top 10、脆弱性パターン、セキュアコーディング       |
| Threat Modeling      | STRIDE、DREAD、攻撃ツリー、脅威識別                      |
| Test Automation      | フレームワーク設計、ページオブジェクトパターン、並列実行 |
| Code Review          | OWASP + SOLID + Clean Code体系的レビュー                 |

### データベース

| スキル             | 目的                                         |
| ------------------ | -------------------------------------------- |
| Database Design    | スキーマ設計、リレーション、インデックス戦略 |
| SQL Best Practices | クエリ最適化、インデックス、N+1防止          |

### フロントエンド・モバイル

| スキル           | 目的                                                             |
| ---------------- | ---------------------------------------------------------------- |
| Accessibility    | WCAG 2.1 AA、セマンティックHTML、ARIA、キーボードナビゲーション  |
| Design System    | カラーパレット、タイポグラフィ、スペーシング、コンポーネント設計 |
| Website Redesign | URL/スクリーンショットベースの再設計、分析ワークフロー           |
| Flutter Web      | レスポンシブレイアウト、適応型ウィジェット、状態管理             |

### バックエンド・API

| スキル     | 目的                                                  |
| ---------- | ----------------------------------------------------- |
| API Design | RESTful標準、レスポンスエンベロープ、ページネーション |
| Laravel    | Eloquent ORM、Form Requests、キュー、APIパターン      |
| NestJS     | モジュール、ガード、パイプ、インターセプター          |
| Supabase   | RLSポリシー、Edge Functions、認証、自動生成API        |

### DevOps・インフラ

| スキル            | 目的                                         |
| ----------------- | -------------------------------------------- |
| Disaster Recovery | バックアップ戦略、復旧手順、フェイルオーバー |
| Git Workflow      | ブランチ戦略、コミット規約、PRテンプレート   |
| Deployment        | CI/CD、Docker、リリース管理                  |

### その他

| スキル             | 目的                                          |
| ------------------ | --------------------------------------------- |
| Anti-Hallucination | ソース検証、エビデンスベースの主張            |
| Loop Detection     | LLMループ検出、ツール呼び出しループ、脱出経路 |
| TDD Workflow       | テスト駆動開発（Red/Green/Refactor）          |
| Security Audit     | OWASP Top 10脆弱性検出                        |
| Domain-Driven      | DDDパターン、境界づけられたコンテキスト       |
| Performance        | プロファイリング、最適化、ベンチマーク        |
| Monitoring         | 可観測性、ログ、アラート                      |
| Compliance         | GDPR、HIPAA、SOC 2、PCI-DSS                   |

---

## ⌨️ コマンド（6つのスラッシュコマンド）

| コマンド                      | 説明                                                  |
| ----------------------------- | ----------------------------------------------------- |
| **`/orchestrator [目標]`** ⭐ | **メインエントリ** — フルチーム、明確化プロトコル付き |
| `/orchestrate [ミッション]`   | 直接実行 — 質問なし、即構築                           |
| `/plan [機能]`                | 実装計画のみ — 調査 + アーキテクチャ                  |
| `/review [対象]`              | 包括的コードレビュー                                  |
| `/test [対象]`                | テストスイートの実行と分析                            |
| `/deploy [対象]`              | 事前/事後検証付きデプロイ                             |

---

## 🧠 仕組み

### 実行フロー

```
ユーザー入力 /orchestrator "支払いシステムを構築"
                    │
                    ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   AskUserQuestionで │
         │   スコープを明確化    │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │   PLANNER 🔵        │
         │   プロジェクト分析    │
         │   マイルストーン作成  │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────────┐
     ▼              ▼                  ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│FE DEV   │  │BE DEV    │  │DB ARCHITECT      │
│タスク1   │  │タスク2   │  │スキーマ+移行      │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     ▼            ▼                 ▼
┌─────────┐  ┌──────────┐  ┌──────────────────┐
│REVIEWER │  │QA ENG    │  │CODE QUALITY GUARD│
│承認     │  │テスト    │  │Lint + 型チェック  │
└────┬────┘  └────┬─────┘  └────────┬─────────┘
     │            │                 │
     └────────────┼─────────────────┘
                  ▼
         ┌─────────────────────┐
         │   COMMANDER 🔴      │
         │   ミッション完了      │
         │   サマリー納品        │
         └─────────────────────┘
```

### ユーザークラリティ：構築前に質問

オーケストレーターは**決して推測しません**。ミッション開始時、CommanderとPlannerが`AskUserQuestion`を使ってコードを書く前に要件を明確化します。

**やり取りの例:**

```
👤 ユーザー: /orchestrator Eコマースのチェックアウトを構築

🤖 Commander: 計画前にいくつか明確にしたい点があります：

   📋 支払いプロバイダー（質問 1/3）
   どの支払いゲートウェイを統合しますか？
   ○ Stripe       — 業界標準、優れたAPI、サブスクリプション対応
   ○ PayPal       — 広く信頼、優れた国際サポート
   ○ MercadoPago  — ラテンアメリカ市場に最適

   📋 チェックアウトフロー（質問 2/3）
   どのようなチェックアウト体験にしますか？
   ○ 単一ページ    — 全ステップを1ページに（シンプル、高速）
   ○ マルチステップ — ステップごとに別ページ（より制御可能）

   📋 ゲストチェックアウト（質問 3/3）
   アカウントなしでチェックアウト可能にしますか？
   ○ はい         — 摩擦が少なく、コンバージョン率向上
   ○ いいえ       — アカウント必須、リテンションに効果的

👤 ユーザー選択: MercadoPago → マルチステップ → はい

🤖 Commander: 完璧です。MercadoPago、マルチステップ、ゲスト対応で計画します。
```

---

## 📦 インストールガイド

### クイックインストール（推奨）

```bash
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
```

### 手動インストール

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
```

設定ファイル（`~/.qwen/settings.json`）に追加：

```json
{
  "extensions": ["/完全なパス/qwen-orchestrator"]
}
```

### MCPツールサーバー（オプション）

```bash
cd qwen-orchestrator
npm install
npm run build
```

### トラブルシューティング

| 問題                                         | 解決策                                        |
| -------------------------------------------- | --------------------------------------------- |
| インストール後に「コマンドが見つかりません」 | Qwen Code CLIを再起動して拡張機能を再読み込み |

---

## ⚙️ モデル設定

**デフォルトでは、すべてのエージェントがQwen Codeのデフォルトモデルを使用します。**

| エージェント       | 推奨モデル               | 理由                       |
| ------------------ | ------------------------ | -------------------------- |
| Commander          | `qwen-max` / `qwen-plus` | 強力な推論が必要           |
| Planner            | `qwen-max` / `qwen-plus` | 強力な分析が必要           |
| Frontend Developer | `qwen3-coder-plus`       | コード生成に最適化         |
| Backend Developer  | `qwen3-coder-plus`       | コード生成に最適化         |
| Reviewer           | `qwen-max`               | 品質ゲートに深い理解が必要 |
| その他             | ユーザーのデフォルト     | 特別な要件なし             |

---

## 🔧 高度なツール

### エージェント間通信

```
SendMessage({ task_id: "worker-auth", message: "ユーザーが明確化：JWTを使用、セッション不使用。" })
```

### リアルタイム監視

```
Monitor({ command: "docker compose logs -f app", description: "デプロイ中のアプリログを監視" })
```

### スケジュールタスク

```
CronCreate({ cron: "0 6 * * 1-5", prompt: "セキュリティ監査を実行", recurring: true })
```

---

## 🔌 統合

### Context7（オプション）

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

セッション間で永続化される**Knowledge Graph**を提供。`qwen-extension.json`に自動設定済み。

### UI/UXスキル（推奨）

| スキル              | インストール                                             |
| ------------------- | -------------------------------------------------------- |
| **UI UX Pro Max**   | `npx uipro-cli init`                                     |
| **Designer Skills** | `/plugin marketplace add Owl-Listener/designer-skills`   |
| **Taste Skill**     | `npx skills add https://github.com/Leonxlnx/taste-skill` |

---

## ✅ 品質基準

| 基準         | 要件                                                  |
| ------------ | ----------------------------------------------------- |
| 複雑度       | 関数あたり ≤ 10サイクロマティック複雑度               |
| サイズ       | 関数あたり ≤ 40行、≤ 4パラメータ                      |
| 型           | 厳格な型、`any`不使用                                 |
| テスト       | TDD必須、80%+カバレッジ                               |
| セキュリティ | OWASP Top 10準拠                                      |
| SQL          | 大文字キーワード、1行1カラム、インデントJOIN、N+1防止 |

---

## 📁 プロジェクト構造

```
qwen-orchestrator/
├── agents/                   # 24のエージェント定義
├── skills/                   # 82のスキル定義
├── commands/                 # 6つのスラッシュコマンド
├── docs/                     # ドキュメントと翻訳
├── qwen-extension.json       # 拡張機能マニフェスト
├── AGENTS.md                 # エージェント運用ルール
└── README.md
```

---

## 🎯 使用例

```bash
/orchestrator ユーザー管理のREST APIを作成
/orchestrator Stripe決済付きレスポンシブEコマースサイトを構築
/plan ブログプラットフォームのデータベーススキーマを設計
/review すべての認証コントローラーのセキュリティをチェック
/deploy ロールバック計画付きで本番環境にデプロイ
```

---

## 👤 作者

**Omar Obando** · GitHub: [@Omar-Obando](https://github.com/Omar-Obando) · ライセンス: MIT

---

<div align="center">

**[Qwen Code](https://github.com/QwenLM/qwen-code)コミュニティのために❤️で構築**

[⬆ トップに戻る](#qwen-orchestrator--qwen-code向けマルチエージェントai開発チーム)

</div>
