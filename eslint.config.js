import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import nodePlugin from 'eslint-plugin-n';

export default [
  js.configs.recommended,

  // Base configuration for all files
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.qwen-orchestrator/**',
      'mcp-server/node_modules/**',
      'mcp-server/dist/**',
      '*.tar.gz',
      '.git/**',
      'agents/**/*.md',
      'commands/**/*.md',
      'skills/**/*.md',
      'docs/**/*.md',
      'AGENTS.md',
      'context/QWEN.md',
      'qwen-extension.json',
    ],
  },

  // MCP Server configuration
  {
    files: ['mcp-server/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        BufferEncoding: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      n: nodePlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      'import/no-unresolved': 'off',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/export': 'error',
      'import/extensions': ['error', 'ignorePackages'],
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'no-debugger': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'n/no-unsupported-features/es-builtins': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },

  // Agent files configuration
  {
    files: ['agents/**/*.md'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Configuration for extension files
  {
    files: ['**/qwen-extension.json'],
    rules: {
      'no-console': 'off',
    },
  },
];
