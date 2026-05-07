---
name: deployment
description: >
  Deployment and DevOps skill covering CI/CD pipelines, containerization,
  infrastructure as code, and release management. Use when setting up
  deployment pipelines, Docker configurations, or release processes.
license: MIT
---

# Deployment Skill — Release Engineering

This skill provides comprehensive deployment and release management guidance.

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass (unit, integration, e2e)
- [ ] Code review approved
- [ ] Security scan clean
- [ ] Performance baselines met
- [ ] Database migrations tested
- [ ] Environment variables documented
- [ ] Rollback plan documented
- [ ] Monitoring/alerting configured

### Deployment Steps

- [ ] Tag release in version control
- [ ] Build production artifacts
- [ ] Run smoke tests against staging
- [ ] Deploy to production
- [ ] Verify health checks pass
- [ ] Monitor error rates for 15 minutes
- [ ] Announce deployment

### Post-Deployment

- [ ] Verify all critical user journeys
- [ ] Check error rates and latency
- [ ] Verify monitoring dashboards
- [ ] Update release notes
- [ ] Notify stakeholders

## CI/CD Pipeline Template

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx audit-ci --moderate
      - run: npx snyk test

  deploy:
    needs: [quality, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:production
```

## Docker Best Practices

```dockerfile
# Multi-stage build for minimal image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
```

## Release Versioning

### Semantic Versioning

```
MAJOR.MINOR.PATCH
  │     │     └── Bug fixes (backward compatible)
  │     └──────── New features (backward compatible)
  └────────────── Breaking changes
```

### Release Notes Template

```markdown
## [Version] — [Date]

### Breaking Changes

- [What changed and migration path]

### New Features

- [Feature description with PR link]

### Bug Fixes

- [Fix description with PR link]

### Dependencies

- [Updated dependencies list]

### Migration Guide

[Steps to upgrade from previous version]
```

## Infrastructure as Code Principles

1. **Version Controlled**: All infrastructure defined in code
2. **Reproducible**: Same config → same environment
3. **Immutable**: Replace, don't modify
4. **Auditable**: Changes tracked in git history
5. **Testable**: Validate infrastructure changes before applying
