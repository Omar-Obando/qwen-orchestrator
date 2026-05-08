# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Qwen Orchestrator, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainers at: security@yourdomain.com (replace with actual email)
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Within 48 hours**: We will acknowledge receipt of your report
- **Within 7 days**: We will provide an initial assessment
- **Within 30 days**: We will provide a fix or timeline for resolution

## Security Practices

### For Maintainers

- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Run `npm audit` before releases
- Keep dependencies updated

### For Users

- Keep your extension updated to the latest version
- Review agent permissions before installation
- Be cautious with custom MCP servers
- Report security issues responsibly

## Encryption Standards

- No sensitive data stored in plain text
- Session data isolated per project
- MCP Memory server uses secure storage

## Known Limitations

- Session files stored locally (ensure proper file permissions)
- MCP server runs locally (ensure proper network isolation)

## Security Audit

Regular security audits are performed on:

- MCP server code
- Agent implementations
- Session management
- File system access

## Bug Bounty

At this time, we do not offer a bug bounty program. However, we greatly appreciate responsible disclosure and will credit contributors in the release notes.

## Security Team

- [Omar-Obando](https://github.com/Omar-Obando) - Primary maintainer

## Changelog

### 2026-05-07

- Initial security policy published
- Defined reporting process
- Documented security practices
