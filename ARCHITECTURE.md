# Architecture

This document is the durable description of *what the system is and the rules it
obeys*. Time-sensitive plans live in `Project planning/`; point-in-time decisions
live in `docs/adr/`.

## 1. System context
OB_Datavers is a **downstream consumer** of WCO's governed enterprise data,
hosted on Azure inside the Microsoft tenant boundary. It maintains its own record
of Owned Brands activity (opportunities, quotes, engagements) but never owns or
mutates authoritative WCO data.

```
[Governed WCO data]      (read-only: certified Power BI models /
   CORE · USD  ──────►     enterprise API layer / governed datasets)
                                      │
                                      ▼
                         ┌────────────────────────────┐
                         │  OB_Datavers (Azure)        │
                         │  • SKU cross-reference       │
                         │  • Activity / CRM store      │
                         │  • Email-drop AI ingestion   │
                         │  • NL-query leadership view   │
                         └────────────────────────────┘
                                      │
                                      ▼
                     Owned Brands sellers & managers (only users)
```

## 2. Architecture principles
1. **Read-only at the boundary.** Authoritative data is consumed, never written.
   Every integration is a read. This is a security control, not just a design taste.
2. **Single source of truth.** WCO systems remain authoritative; we never
   duplicate-as-master. Our store holds *only* Owned Brands activity.
3. **Stay inside the tenant.** No data, secret, or dependency leaves the
   Microsoft / Azure boundary. No data egress, ever.
4. **Governed access only.** Consume via certified models / governed API; never
   direct production DB connectivity.
5. **Least privilege.** Access is scoped to the Owned Brands data domain and the
   defined user group. Default deny.
6. **Reversible decisions are made fast; irreversible ones get an ADR.**
7. **Boring and consistent beats clever.** Optimize for the next maintainer.

## 3. Component responsibilities
- **Ingestion** — pulls governed datasets; idempotent, retryable, logged. No write-back.
- **SKU cross-reference engine** — living competitor→owned-brand map; searchable, versioned.
- **Activity store** — the only system-of-record we own (Owned Brands activity).
- **AI layer (email-drop, NL query)** — parses rep notes / answers questions over
  *our* data and governed reads only; never granted write access to source systems.
- **Presentation** — leadership dashboard; complements Power BI, does not replace it.

## 4. Cross-cutting requirements
- **Reliability:** ingestion is idempotent and resumable; degraded source = stale-but-safe, never wrong.
- **Observability:** every external read is logged with purpose and scope.
- **Security & privacy:** see `SECURITY.md`. Margin/cost data is sensitive — treat as confidential.
- **Auditability:** access decisions and schema changes are recorded (ADR or changelog).

## 5. Decisions
Significant or hard-to-reverse choices are recorded as ADRs in `docs/adr/`.
Start with [ADR-0001](docs/adr/0001-record-architecture-decisions.md).
