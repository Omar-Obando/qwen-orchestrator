Deploy the following target to the specified environment:

**Target**: {{args}}

## Deployment Protocol

1. **Pre-Flight Checks**:
   - All tests pass
   - Build succeeds
   - No security vulnerabilities
   - Environment variables documented

2. **Build**:
   - Generate production artifacts
   - Verify build output

3. **Deploy**:
   - Deploy to target environment
   - Run health checks
   - Verify deployment

4. **Post-Deploy**:
   - Smoke test critical paths
   - Monitor error rates
   - Update release notes

## Report Format

```markdown
## Deployment Report

### Pre-Flight

- Tests: PASS/FAIL
- Build: PASS/FAIL
- Security: PASS/FAIL

### Deployment

- Environment: [target]
- Version: [version]
- Status: SUCCESS/ROLLBACK

### Post-Deploy Verification

- Health check: PASS/FAIL
- Smoke tests: PASS/FAIL
- Error rate: [baseline vs current]
```

Begin by running the pre-flight checks.
