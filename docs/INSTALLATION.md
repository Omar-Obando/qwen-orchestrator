# 🚀 Guía de Instalación de Qwen Orchestrator

Esta guía te ayudará a instalar y configurar Qwen Orchestrator paso a paso.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga: https://nodejs.org/
   - Verifica: `node --version`

2. **Qwen Code CLI**
   - Instalación: https://github.com/QwenLM/qwen-code#installation
   - Verifica: `qwen --version`

---

## 📦 Instalación Paso a Paso

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/Omar-Obando/qwen-orchestrator.git
cd qwen-orchestrator
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Compilar el Servidor MCP

```bash
npm run build:mcp
```

### Paso 4: Copiar a Directorio de Extensiones

Copia la carpeta completa a:

- **Windows**: `%USERPROFILE%\.qwen\extensions\`
- **macOS/Linux**: `~/.qwen/extensions/`

Ejemplo en Windows:

```bash
xcopy "C:\path\to\qwen-orchestrator" "%USERPROFILE%\.qwen\extensions\qwen-orchestrator" /E /I /Y
```

---

## 🔧 Configuración de Hooks (Opcional pero Recomendado)

Los **hooks** permiten que Qwen Orchestrator redirija automáticamente archivos a directorios de sesión específicos para aislamiento de contexto.

### Configuración en `~/.qwen/settings.json`

Crea o edita el archivo `~/.qwen/settings.json` y agrega:

```json
{
  "hooks": {
    "session:start": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "node",
            "args": [
              "${extensionPath}${/}mcp-server${/}dist${/}hooks${/}session-handler.js"
            ],
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
            "args": [
              "${extensionPath}${/}mcp-server${/}dist${/}hooks${/}file-interceptor.js"
            ],
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
            "args": [
              "${extensionPath}${/}mcp-server${/}dist${/}hooks${/}file-interceptor.js"
            ],
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
            "args": [
              "${extensionPath}${/}mcp-server${/}dist${/}hooks${/}context-redirector.js"
            ],
            "cwd": "${extensionPath}",
            "name": "Context Redirector",
            "description": "Redirect context injection to session directory"
          }
        ]
      }
    ]
  }
}
```

### ⚠️ Importante: Solución al Error "\_R no se reconoce"

Si ves el error:

```
'_R' no se reconoce como un comando interno o externo
```

Es un problema de shell en Windows. Solución:

1. **Usar PowerShell** (recomendado):

   ```json
   {
     "shell": "powershell"
   }
   ```

2. **O usar cmd.exe con doble comilla**:

   ```json
   {
     "shell": "cmd.exe"
   }
   ```

3. **O usar bash en Windows** (si tienes Git Bash):
   ```json
   {
     "shell": "bash",
     "args": [
       "-c",
       "node \"$1\"",
       "_",
       "${extensionPath}${/}mcp-server${/}dist${/}hooks${/}session-handler.js"
     ]
   }
   ```

### Ejemplo Completo para Windows

```json
{
  "hooks": {
    "session:start": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cmd.exe",
            "args": [
              "/c",
              "node",
              "${extensionPath}\\mcp-server\\dist\\hooks\\session-handler.js"
            ],
            "cwd": "${extensionPath}",
            "shell": "cmd.exe",
            "name": "Session Handler",
            "description": "Initialize session directory structure"
          }
        ]
      }
    ]
  }
}
```

---

## 🔌 Configuración de MCP Servers

### Servidor Principal (Obligatorio)

El servidor principal ya está configurado en `qwen-extension.json`:

```json
{
  "mcpServers": {
    "qwen-orchestrator": {
      "command": "node",
      "args": ["${extensionPath}${/}mcp-server${/}dist${/}index.js"],
      "cwd": "${extensionPath}"
    }
  }
}
```

### Servidor de Memoria (Opcional pero Recomendado)

Para persistencia de contexto entre sesiones:

```bash
qwen mcp add memory npx -y @modelcontextprotocol/server-memory
```

O manualmente en `~/.qwen/settings.json`:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "Knowledge Graph for persistent context"
    }
  }
}
```

---

## ✅ Verificación

### 1. Verificar Extensión Instalada

```bash
qwen extensions list
```

Deberías ver:

```
qwen-orchestrator
```

### 2. Verificar MCP Servers

```bash
qwen mcp list
```

Deberías ver:

```
qwen-orchestrator
memory (si lo configuraste)
```

### 3. Probar Comando

```bash
/orchestrator Hello world
```

---

## 🛠️ Solución de Problemas

### Error: "\_R no se reconoce"

**Causa**: Problema de shell en Windows con comandos que usan variables.

**Solución**: Usa `cmd.exe` con `/c` o especifica `shell: "cmd.exe"` en la configuración del hook.

### Error: "Cannot find module"

**Causa**: El servidor MCP no ha sido compilado.

**Solución**:

```bash
npm run build:mcp
```

### Error: "Extension not found"

**Causa**: La extensión no está en el directorio correcto.

**Solución**: Copia la carpeta a `%USERPROFILE%\.qwen\extensions\`

### Hooks no se ejecutan

**Causa**: Configuración incorrecta en `~/.qwen/settings.json`

**Solución**:

1. Verifica la sintaxis JSON
2. Asegúrate de usar rutas absolutas o `${extensionPath}`
3. Prueba con `shell: "cmd.exe"` en Windows

---

## 📚 Recursos Adicionales

- [Documentación de Qwen Code - Hooks](https://qwenlm.github.io/qwen-code-docs/en/users/features/hooks/)
- [Documentación de Qwen Code - MCP Servers](https://qwenlm.github.io/qwen-code-docs/en/users/features/mcp/)
- [Documentación de Qwen Code - Extensiones](https://qwenlm.github.io/qwen-code-docs/en/users/extension/introduction/)

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Consulta los logs de Qwen Code
3. Abre un issue en GitHub

---

**¡Listo!** Ahora puedes usar Qwen Orchestrator con todos sus agentes, skills y comandos.
