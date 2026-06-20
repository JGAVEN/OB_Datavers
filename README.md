# Owned Brands Sales Intelligence Platform (OB_Datavers)

A read-only, Azure-hosted internal application for the OBCO Owned Brands team. It
consumes **governed** OBCO sales data and adds vendor-side analytics, activity
tracking, and AI-assisted insight — without becoming a system of record.

> **North-star value loop:** identify competitor sell-through → cross-reference to
> an owned-brand equivalent → quantify the margin lift → equip the rep to convert it.

## Status
Discovery / prototype. Best-case design pending data-access confirmation. See
[`Project planning/`](Project%20planning/) for the brief, access request, and
systems discovery.

## Repository map
| Path | What it holds |
|---|---|
| `Project planning/` | Source-of-truth brief, access request, decision log. |
| `ARCHITECTURE.md` | System context, principles, and boundaries. |
| `docs/adr/` | Architecture Decision Records — why we chose what we chose. |
| `.claude/` | Vetted Claude Code skills + working agreement (`../CLAUDE.md`). |
| `.github/` | CI guardrails, templates, ownership. |

## Hard boundaries (non-negotiable)
- **Read-only.** No write/update/delete to CORE, USD, or any OBCO system of record.
- **No new system of record** for OBCO data; consume the governed layer only.
- **Stay inside the Microsoft / Azure boundary.** No data egress.
- Owned Brands sellers and managers are the only users.

## Getting started
1. Read `CLAUDE.md` (the operating agreement) and `ARCHITECTURE.md`.
2. Read `CONTRIBUTING.md` for branch, commit, and review conventions.
3. Read `SECURITY.md` before touching anything that handles data or credentials.

## License
Internal / proprietary unless a `LICENSE` file states otherwise. Third-party
material is attributed in `.claude/skills/NOTICE.md`.
