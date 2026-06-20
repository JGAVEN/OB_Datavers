# CLAUDE.md — Operating Agreement for OB_Datavers

This file tells Claude Code how to work in this repository. Read it fully before
acting. It is authoritative; if a request conflicts with the **Hard boundaries**
below, stop and flag it rather than proceeding.

## 1. What this repo is
The **Owned Brands Sales Intelligence Platform** — a read-only, Azure-hosted
internal app that consumes governed OBCO data and adds vendor-side analytics,
activity tracking, and AI insight for the Owned Brands team. It complements Power
BI and is **not** a system of record for OBCO data.

North-star value loop: *competitor sell-through → owned-brand cross-reference →
margin lift → rep converts it.* Every capability must serve this loop.

## 2. Hard boundaries (never cross; refuse if asked)
1. **Read-only** at every source boundary — no write/update/delete to CORE, USD,
   or any OBCO system of record; no direct production DB connectivity.
2. **No new system of record** for OBCO data — we only own Owned Brands activity.
3. **In-tenant only** — no data, secret, or dependency leaves the Microsoft /
   Azure boundary. No egress.
4. **Least privilege** — scoped to the Owned Brands domain and defined user group.
5. **No secrets or real margin/cost/customer data** in the repo, ever.

## 3. Source of truth (read before generating content)
- `Project planning/` — brief, access request, systems discovery, decision log.
  **Pull figures and scope from here; never invent them.**
- `ARCHITECTURE.md` — system context, principles, component responsibilities.
- `docs/adr/` — why decisions were made. Check before changing structure.
- `SECURITY.md` — controls for anything touching data, secrets, or dependencies.

## 4. How to work here
- **Plan before building.** For multi-step work, state the plan and the affected
  files first. Prefer small, reversible changes.
- **Match conventions.** Follow `CONTRIBUTING.md`: Conventional Commits, one
  logical change per branch/PR, update docs/CHANGELOG when relevant.
- **Significant or hard-to-reverse decision?** Write an ADR (`docs/adr/template.md`).
- **Touching data access, secrets, or dependencies?** Treat as security-sensitive:
  call it out, keep least-privilege, and request human review.
- **Don't add dependencies or third-party actions/skills** without vetting and
  pinning. Skills in `.claude/skills/` must stay Markdown-only (CI enforces this).

## 5. Skills available (`.claude/skills/`, all vetted & Markdown-only)
| Skill | Use it for |
|---|---|
| `exec-deck-structure` | Argument/spine of any leadership pitch. Use FIRST for the deck. |
| `ogilvy` | Persuasive headline/claim copy. |
| `copywriting` | Clear, action-driving section copy. |
| `copy-editing` | Tightening/polishing existing copy. |
| `content-strategy` | Messaging framework & narrative consistency. |
| `page-cro` | Conversion-oriented structure (e.g. the access-request one-pager). |
| `stop-slop` | Remove generic AI phrasing so output doesn't read as machine-written. |

For documents: use the built-in `pptx` (decks) and `docx` (Word) skills for file
mechanics; drive their *language* with the copy skills above and their *structure*
with `exec-deck-structure`. Licenses/attribution: `.claude/skills/NOTICE.md`.

## 6. Definition of done
Behavior matches the brief and ADRs; boundaries respected; docs/CHANGELOG updated
if needed; no secrets or real data; CI green. When unsure, ask — a clarifying
question is cheaper than an irreversible mistake.
