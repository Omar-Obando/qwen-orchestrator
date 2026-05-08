# Changelog

All notable changes to Qwen Orchestrator will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased](https://github.com/your-org/qwen-orchestrator/compare/v0.0.2...HEAD)

### Added

- **Qwen Code Patterns documentation** - Comprehensive guide to MCP servers, hooks, and session management patterns
- **QWEN_CODE_PATTERNS.md** - Documentation covering MCP architecture, hook system, and best practices

### Changed

- **GSD_LEARNINGS.md removed** - Replaced GSD analysis with Qwen Code-specific patterns

## [0.0.2] - 2025-01-10

### Added

- **Workspace-based session isolation** - Each project folder now gets its own isolated session space, similar to Qwen Code's approach. Sessions are no longer shared across different project folders.
- **Session state persistence** - Each session stores state in `session-state.json` with metadata including session ID, creation time, project path, and active status.
- **Progress tracking** - Mission snapshots are stored in `progress/` subdirectory for tracking work progress.
- **Checkpoint system** - State snapshots for recovery are stored in `checkpoints/` subdirectory.
- **Documentation caching** - Cached documentation is stored in `docs/` subdirectory.

### Changed

- **Session directory structure** - Now uses `.qwen-orchestrator/workspaces/<safe-project-path>/sessions/` instead of flat `.qwen-orchestrator/sessions/`
- **Path safety** - Project paths are converted to safe folder names: Windows paths (`C:\`) → `C__`, Unix paths (`/`) → `_`
- **MCP tools** - All session management tools (`create_session`, `get_current_session`, `archive_session`, `redirect_to_session`, `check_session_isolation`) now support optional `projectPath` parameter

### Fixed

- **Session isolation** - Sessions are now properly isolated per project folder, preventing cross-contamination between projects
- **TypeScript compilation** - Added `@types/node` dependency and updated `tsconfig.json` with proper type definitions

## [0.0.1] - 2025-01-10

### Added

- **Initial release** - Basic session management system
- **Session creation** - `create_session` MCP tool for creating new sessions
- **Session retrieval** - `get_current_session` MCP tool for getting current session info
- **Session archiving** - `archive_session` MCP tool for archiving completed sessions
- **Session redirection** - `redirect_to_session` MCP tool for getting session-aware file paths
- **Session isolation check** - `check_session_isolation` MCP tool for debugging session configuration
- **Session handler hooks** - Automatic session initialization via MCP hooks
- **Orchestration tools** - Core orchestration functionality for AI development teams

### Features

- Session-based state management
- MCP hook integration for automatic session management
- File read/write interception for session isolation
- Context injection to session directories
- Support for multiple concurrent sessions

---

## Notes

- **Safe Path Naming**: Project paths are converted to safe folder names to ensure compatibility across different operating systems:
  - Windows: `C:\Users\user\Documents\project` → `C__Users_user_Documents_project`
  - Unix/Linux: `/home/user/projects/project` → `_home_user_projects_project`
  - Mac: `/Users/user/Sites/site` → `_Users_user_Sites_site`

- **Backward Compatibility**: Existing sessions without workspace isolation continue to work. The new system is additive, not breaking.

- **Migration**: No action required for existing users. New projects automatically get workspace isolation.
