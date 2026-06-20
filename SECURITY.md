# Security Policy

Security is an architectural property of this platform, not an add-on. The
platform handles sensitive commercial data (including **margin/cost**) and
operates against governed enterprise systems.

## Core controls (must always hold)
- **Read-only at every source boundary.** No write/update/delete to CORE, USD, or
  any WCO system of record. No direct production database connectivity.
- **Stay in-tenant.** No data, secret, or build dependency leaves the Microsoft /
  Azure boundary. No egress.
- **Least privilege & default deny.** Access scoped to the Owned Brands data
  domain and the defined user group. Users are Owned Brands sellers/managers only.
- **Governed access only.** Consume certified Power BI models / governed datasets
  / the enterprise API layer.

## Secrets & credentials
- Never commit secrets, connection strings, tokens, keys, or `.env` files. The
  `.gitignore` and `.gitleaks.toml` baselines exist to prevent this; CI scans for
  secret patterns on every PR.
- Use Azure Key Vault / managed identities for runtime secrets — never source code.
- If a secret is committed, treat it as compromised: rotate immediately, then scrub history.

## Data handling
- Margin/cost and customer data are confidential. Do not paste real data into
  issues, PRs, commit messages, logs, or external tools.
- Use synthetic or masked data for examples, tests, and screenshots.

## Dependencies / supply chain
- Prefer first-party and tenant-approved dependencies. Pin versions (and pin
  GitHub Actions to a commit SHA). Dependabot is scoped to keep CI actions current.
- Any third-party code, action, or Claude skill must be vetted before inclusion;
  skills must remain Markdown-only (enforced by CI — see `.github/workflows/guardrails.yml`).

## Reporting a vulnerability
Report suspected vulnerabilities privately to the repository owner / Data Office
liaison — do **not** open a public issue. Include impact and reproduction steps.
