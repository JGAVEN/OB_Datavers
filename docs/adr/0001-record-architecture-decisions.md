# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-06-19
- **Deciders:** Owned Brands platform team

## Context
The platform is early and will grow in complexity (data integrations, AI
features, more contributors). Decisions made now — especially around the
read-only boundary and Azure tenancy — must be understandable to people who
join later.

## Decision
We will record significant, hard-to-reverse decisions as ADRs in `docs/adr/`,
using `template.md`. Reversible decisions do not require an ADR.

## Consequences
Easier onboarding and consistent reasoning over time; a small per-decision
writing cost. ADRs are immutable once accepted and superseded rather than edited.

## Alternatives considered
Tribal knowledge / chat history (not durable); a single growing design doc
(loses the decision-by-decision audit trail).
