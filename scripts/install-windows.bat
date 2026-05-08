@echo off
REM Qwen Orchestrator - Automatic Installation Script for Windows
REM This script installs the extension and configures MCP servers with proper Windows shell handling

echo ========================================
echo  Qwen Orchestrator - Installation
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed: 
node --version

REM Check if qwen is installed
echo.
echo [2/6] Checking Qwen Code installation...
qwen --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Qwen Code is not installed!
    echo Please install Qwen Code from https://github.com/QwenLM/qwen-code#installation
    pause
    exit /b 1
)
echo Qwen Code is installed: 
qwen --version

REM Get extension path
set "EXT_PATH=%USERPROFILE%\.qwen\extensions\qwen-orchestrator"

echo.
echo [3/6] Installing extension...
qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator
if errorlevel 1 (
    echo WARNING: Extension installation failed. Trying manual install...
    
    REM Manual install
    echo Cloning repository...
    git clone https://github.com/Omar-Obando/qwen-orchestrator.git "%EXT_PATH%"
    if errorlevel 1 (
        echo ERROR: Failed to clone repository!
        pause
        exit /b 1
    )
    
    echo Installing dependencies...
    cd /d "%EXT_PATH%"
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    
    echo Building MCP server...
    npm run build:mcp
    if errorlevel 1 (
        echo ERROR: Failed to build MCP server!
        pause
        exit /b 1
    )
) else (
    echo Extension installed successfully!
)

echo.
echo [4/6] Configuring MCP servers...
echo Adding Memory MCP server...
qwen mcp add memory npx -y @modelcontextprotocol/server-memory

echo.
echo [5/6] Configuring hooks to fix "_R" error on Windows...
echo Using cmd.exe shell to avoid PowerShell variable expansion issues...

set "HOOKS_CONFIG=%USERPROFILE%\.qwen\settings.json"

if not exist "%USERPROFILE%\.qwen" (
    mkdir "%USERPROFILE%\.qwen"
)

echo Creating hooks configuration with cmd.exe shell...

REM Create the hooks config using a temporary file to avoid escaping issues
echo { > "%HOOKS_CONFIG%.tmp"
echo   "hooks": { >> "%HOOKS_CONFIG%.tmp"
echo     "session:start": [ >> "%HOOKS_CONFIG%.tmp"
echo       { >> "%HOOKS_CONFIG%.tmp"
echo         "matcher": "", >> "%HOOKS_CONFIG%.tmp"
echo         "hooks": [ >> "%HOOKS_CONFIG%.tmp"
echo           { >> "%HOOKS_CONFIG%.tmp"
echo             "type": "command", >> "%HOOKS_CONFIG%.tmp"
echo             "command": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "args": [ >> "%HOOKS_CONFIG%.tmp"
echo               "/c", >> "%HOOKS_CONFIG%.tmp"
echo               "node", >> "%HOOKS_CONFIG%.tmp"
echo               "%EXT_PATH:\=\\%\\mcp-server\\dist\\hooks\\session-handler.js" >> "%HOOKS_CONFIG%.tmp"
echo             ], >> "%HOOKS_CONFIG%.tmp"
echo             "cwd": "%EXT_PATH:\=\\%", >> "%HOOKS_CONFIG%.tmp"
echo             "shell": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "name": "Session Handler", >> "%HOOKS_CONFIG%.tmp"
echo             "description": "Initialize session directory structure" >> "%HOOKS_CONFIG%.tmp"
echo           } >> "%HOOKS_CONFIG%.tmp"
echo         ] >> "%HOOKS_CONFIG%.tmp"
echo       } >> "%HOOKS_CONFIG%.tmp"
echo     ], >> "%HOOKS_CONFIG%.tmp"
echo     "file:read": [ >> "%HOOKS_CONFIG%.tmp"
echo       { >> "%HOOKS_CONFIG%.tmp"
echo         "matcher": "", >> "%HOOKS_CONFIG%.tmp"
echo         "hooks": [ >> "%HOOKS_CONFIG%.tmp"
echo           { >> "%HOOKS_CONFIG%.tmp"
echo             "type": "command", >> "%HOOKS_CONFIG%.tmp"
echo             "command": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "args": [ >> "%HOOKS_CONFIG%.tmp"
echo               "/c", >> "%HOOKS_CONFIG%.tmp"
echo               "node", >> "%HOOKS_CONFIG%.tmp"
echo               "%EXT_PATH:\=\\%\\mcp-server\\dist\\hooks\\file-interceptor.js" >> "%HOOKS_CONFIG%.tmp"
echo             ], >> "%HOOKS_CONFIG%.tmp"
echo             "cwd": "%EXT_PATH:\=\\%", >> "%HOOKS_CONFIG%.tmp"
echo             "shell": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "name": "File Interceptor", >> "%HOOKS_CONFIG%.tmp"
echo             "description": "Redirect file reads to session directory" >> "%HOOKS_CONFIG%.tmp"
echo           } >> "%HOOKS_CONFIG%.tmp"
echo         ] >> "%HOOKS_CONFIG%.tmp"
echo       } >> "%HOOKS_CONFIG%.tmp"
echo     ], >> "%HOOKS_CONFIG%.tmp"
echo     "file:write": [ >> "%HOOKS_CONFIG%.tmp"
echo       { >> "%HOOKS_CONFIG%.tmp"
echo         "matcher": "", >> "%HOOKS_CONFIG%.tmp"
echo         "hooks": [ >> "%HOOKS_CONFIG%.tmp"
echo           { >> "%HOOKS_CONFIG%.tmp"
echo             "type": "command", >> "%HOOKS_CONFIG%.tmp"
echo             "command": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "args": [ >> "%HOOKS_CONFIG%.tmp"
echo               "/c", >> "%HOOKS_CONFIG%.tmp"
echo               "node", >> "%HOOKS_CONFIG%.tmp"
echo               "%EXT_PATH:\=\\%\\mcp-server\\dist\\hooks\\file-interceptor.js" >> "%HOOKS_CONFIG%.tmp"
echo             ], >> "%HOOKS_CONFIG%.tmp"
echo             "cwd": "%EXT_PATH:\=\\%", >> "%HOOKS_CONFIG%.tmp"
echo             "shell": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "name": "File Interceptor", >> "%HOOKS_CONFIG%.tmp"
echo             "description": "Redirect file writes to session directory" >> "%HOOKS_CONFIG%.tmp"
echo           } >> "%HOOKS_CONFIG%.tmp"
echo         ] >> "%HOOKS_CONFIG%.tmp"
echo       } >> "%HOOKS_CONFIG%.tmp"
echo     ], >> "%HOOKS_CONFIG%.tmp"
echo     "context:inject": [ >> "%HOOKS_CONFIG%.tmp"
echo       { >> "%HOOKS_CONFIG%.tmp"
echo         "matcher": "", >> "%HOOKS_CONFIG%.tmp"
echo         "hooks": [ >> "%HOOKS_CONFIG%.tmp"
echo           { >> "%HOOKS_CONFIG%.tmp"
echo             "type": "command", >> "%HOOKS_CONFIG%.tmp"
echo             "command": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "args": [ >> "%HOOKS_CONFIG%.tmp"
echo               "/c", >> "%HOOKS_CONFIG%.tmp"
echo               "node", >> "%HOOKS_CONFIG%.tmp"
echo               "%EXT_PATH:\=\\%\\mcp-server\\dist\\hooks\\context-redirector.js" >> "%HOOKS_CONFIG%.tmp"
echo             ], >> "%HOOKS_CONFIG%.tmp"
echo             "cwd": "%EXT_PATH:\=\\%", >> "%HOOKS_CONFIG%.tmp"
echo             "shell": "cmd.exe", >> "%HOOKS_CONFIG%.tmp"
echo             "name": "Context Redirector", >> "%HOOKS_CONFIG%.tmp"
echo             "description": "Redirect context injection to session directory" >> "%HOOKS_CONFIG%.tmp"
echo           } >> "%HOOKS_CONFIG%.tmp"
echo         ] >> "%HOOKS_CONFIG%.tmp"
echo       } >> "%HOOKS_CONFIG%.tmp"
echo     ] >> "%HOOKS_CONFIG%.tmp"
echo   } >> "%HOOKS_CONFIG%.tmp"
echo } >> "%HOOKS_CONFIG%.tmp"

move /Y "%HOOKS_CONFIG%.tmp" "%HOOKS_CONFIG%" >nul

echo Hooks configured successfully with cmd.exe shell!
echo.
echo Configuration saved to: %HOOKS_CONFIG%

echo.
echo [6/6] Verifying installation...
echo.
echo Verifying extension...
qwen extensions list | findstr qwen-orchestrator
if errorlevel 1 (
    echo WARNING: Extension not found in list. Manual configuration may be needed.
) else (
    echo Extension verified!
)

echo.
echo Verifying MCP servers...
qwen mcp list | findstr /I "memory qwen-orchestrator"
if errorlevel 1 (
    echo WARNING: MCP servers not found. Run 'qwen mcp list' to check.
) else (
    echo MCP servers verified!
)

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Restart Qwen Code CLI
echo 2. Run: /orchestrator Hello world
echo 3. Check docs/INSTALLATION.md for troubleshooting
echo.
echo If you see "_R" errors, check:
echo - %HOOKS_CONFIG%
echo - Make sure shell is set to "cmd.exe" (not "powershell")
echo - Make sure command is "cmd.exe" with "/c" flag
echo.
pause
