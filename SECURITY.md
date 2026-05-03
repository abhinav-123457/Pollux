# Security Policy

## Supported Versions

This project is currently maintained on the `main` branch.

## Security Controls Implemented

- Strict TypeScript configuration and ESLint checks.
- Content Security Policy in `index.html`.
- Input sanitization and guardrails in AI request pipeline.
- Firebase-based telemetry for runtime error tracking.
- Service worker with scoped caching strategy.

## Reporting a Vulnerability

If you discover a security issue, report it privately by opening a private security advisory on GitHub or emailing the maintainer directly.

Please include:

1. Clear reproduction steps.
2. Affected file or route.
3. Potential impact.
4. Suggested fix, if available.

We aim to acknowledge reports within 48 hours and ship a fix as quickly as possible.
