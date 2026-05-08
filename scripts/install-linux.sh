#!/bin/bash
# Qwen Orchestrator - Automatic Installation Script for macOS/Linux
# This script installs the extension and configures MCP servers

set -e

echo "========================================"
echo " Qwen Orchestrator - Installation"
echo "========================================"
echo

# Check if Node.js is installed
echo "[1/6] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "Node.js is installed: $(node --version)"

# Check if qwen is installed
echo
echo "[2/6] Checking Qwen Code installation..."
if ! command -v qwen &> /dev/null; then
    echo "ERROR: Qwen Code is not installed!"
    echo "Please install Qwen Code from https://github.com/QwenLM/qwen-code#installation"
    exit 1
fi
echo "Qwen Code is installed: $(qwen --version)"

# Get extension path
EXT_PATH="$HOME/.qwen/extensions/qwen-orchestrator"

echo
echo "[3/6] Installing extension..."
if ! qwen extensions install https://github.com/Omar-Obando/qwen-orchestrator 2>/dev/null; then
    echo "WARNING: Extension installation failed. Trying manual install..."
    
    # Manual install
    echo "Cloning repository..."
    git clone https://github.com/Omar-Obando/qwen-orchestrator.git "$EXT_PATH"
    
    echo "Installing dependencies..."
    cd "$EXT_PATH"
    npm install
    
    echo "Building MCP server..."
    npm run build:mcp
else
    echo "Extension installed successfully!"
fi

echo
echo "[4/6] Configuring MCP servers..."
echo "Adding Memory MCP server..."
qwen mcp add memory npx -y @modelcontextprotocol/server-memory

echo
echo "[5/6] Configuring hooks..."
HOOKS_CONFIG="$HOME/.qwen/settings.json"

# Create hooks configuration
mkdir -p "$HOME/.qwen"

if [ -f "$HOOKS_CONFIG" ]; then
    echo "Backing up existing settings..."
    cp "$HOOKS_CONFIG" "$HOOKS_CONFIG.backup"
fi

echo "Creating hooks configuration..."
cat > "$HOOKS_CONFIG" << 'EOF'
{
  "hooks": {
    "session:start": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${extensionPath}/mcp-server/dist/hooks/session-handler.js"],
            "cwd": "${extensionPath}",
            "name": "Session Handler",
            "description": "Initialize session directory structure"
          }
        ]
      }
    ],
    "file:read": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${extensionPath}/mcp-server/dist/hooks/file-interceptor.js"],
            "cwd": "${extensionPath}",
            "name": "File Interceptor",
            "description": "Redirect file reads to session directory"
          }
        ]
      }
    ],
    "file:write": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${extensionPath}/mcp-server/dist/hooks/file-interceptor.js"],
            "cwd": "${extensionPath}",
            "name": "File Interceptor",
            "description": "Redirect file writes to session directory"
          }
        ]
      }
    ],
    "context:inject": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": ["${extensionPath}/mcp-server/dist/hooks/context-redirector.js"],
            "cwd": "${extensionPath}",
            "name": "Context Redirector",
            "description": "Redirect context injection to session directory"
          }
        ]
      }
    ]
  }
}
EOF

echo "Hooks configured successfully!"

echo
echo "[6/6] Verifying installation..."
echo
echo "Verifying extension..."
if qwen extensions list | grep -q "qwen-orchestrator"; then
    echo "Extension verified!"
else
    echo "WARNING: Extension not found in list. Manual configuration may be needed."
fi

echo
echo "Verifying MCP servers..."
if qwen mcp list | grep -q -E "memory|qwen-orchestrator"; then
    echo "MCP servers verified!"
else
    echo "WARNING: MCP servers not found. Run 'qwen mcp list' to check."
fi

echo
echo "========================================"
echo " Installation Complete!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Restart Qwen Code CLI"
echo "2. Run: /orchestrator Hello world"
echo "3. Check docs/INSTALLATION.md for troubleshooting"
echo
echo "If you see errors, check:"
echo "- $HOOKS_CONFIG"
echo "- Make sure paths use \${extensionPath}"
echo
