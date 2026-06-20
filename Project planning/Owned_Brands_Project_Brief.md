# Owned Brands Sales Intelligence Platform
## Project Brief & Decision Log

**Status:** Discovery / prototype · *Best-case design pending data-access confirmation*
**Owner:** Director, LCO & WCO Owned Brands Sales
**Last updated:** June 19, 2026

---

## 1. Purpose

A parallel, vendor-side sales intelligence and CRM platform for the Owned Brands team, hosted inside WCO. It reads (read-only) from governed WCO sales data and maintains its own record of Owned Brands activity, with the central goal of converting competitor sell-through into higher-margin owned-brand revenue.

## 2. Problem & rationale

WCO's core systems (CORE, USD) are built for the **distributor** operating model. The Owned Brands team operates as a **vendor** inside WCO and lacks vendor-side visibility — sell-through, competitive conversion, margin — and the activity tracking the distributor systems were never designed to capture. Today this work lives in disconnected spreadsheets.

## 3. The value loop (north star)

> Identify competitor sell-through → cross it to an owned-brand equivalent → quantify the margin lift → equip the rep to convert it.

Every capability serves this loop.

## 4. Scope

**In scope**
- Historical sales catalog + current sales, quote, and SKU-level opportunity tracking
- Engagement tracking — call planning & logs, visits, demos, training, hardware/eval demos — for **both** parties (WCO sellers and WCO customers)
- SKU cross-reference engine (competitor → owned brand), living and searchable
- Email-drop AI ingestion (rep emails a note → parsed to structured records)
- Leadership dashboard with natural-language query
- Inventory & demand: historical sales + current stock overlay + pipeline-weighted forecast
- Education / sales plan outputs (target lists, playbooks, training)

**Out of scope**
- Any write/update to CORE, USD, or any WCO system of record
- Duplication or ownership of authoritative WCO data
- WCO sellers as platform *users* (they are tracked subjects, not logins)
- Minuteman (explicitly removed)
- Data egress outside the Microsoft / Azure boundary

## 5. Decision log

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Build a parallel platform, not an extension of WCO's core | Core serves the distributor lens; Owned Brands needs the vendor lens it can't provide |
| D2 | Read-only toward all WCO source systems | Minimizes risk to WCO infrastructure; eases approval |
| D3 | Platform *is* the system of record for its own net-new data (crosses, opportunities, quotes-in-progress, activities, email intelligence), in an isolated app DB | That data exists nowhere in WCO; required for CRM function; isolated = no source-system risk |
| D4 | Two-tier model: WCO sellers (channel / PRM) + WCO customers (demand / CRM) | Owned-brand selling runs through the channel and into the end customer |
| D5 | Customer scope = **all** WCO customers, not just LCO AV | Any WCO customer buying competitor product is a conversion target |
| D6 | Users = Owned Brands sellers and managers only | Contains identity/scale; defuses broad margin-exposure concern |
| D7 | Margin/cost is phase 0 and visible to all users, gated by RBAC + territory RLS | Margin uplift is the team's value; user group is small and internal |
| D8 | SKU is the spine — one detail view unifies sales, stock, opportunities, crosses, activity | Prevents siloed dashboards; everything drills into the SKU |
| D9 | Forecast = baseline demand + probability-weighted pipeline | Ties inventory directly to the conversion engine; surfaces a supply signal to reps |
| D10 | Reconcile multiple historical datasets into one governed demand series per SKU | Trust + a clean artifact to hand the Data Office |
| D11 | Azure-native architecture, Entra ID SSO + RBAC + RLS, embedded certified Power BI, Azure OpenAI in-tenant | Confirmed alignment with WCO's documented standards |
| D12 | Build path: prototype in Claude (HTML) → port to Azure production | Prove model/UX cheaply; production lives under governance |
| D13 | Visual identity: green accent, mono part numbers, conversion loop as signature | Green = margin/owned-brand win; reinforces the north star |

## 6. Governing assumption & constraints

> **This is a best-case end state. The entire design is contingent on data access not yet secured. The platform will be built to what is achievable from WCO systems; every capability remains a target, not a commitment, until access is confirmed with the Data Office.**

- Governed-dataset / API-layer consumption is preferred over direct CORE/USD access.
- Refresh assumed nightly batch, with a path to near-real-time if exposed.

**Confirmed from internal Copilot discovery:** Azure-first architecture; Entra ID + RBAC + Power BI RLS; certified-dataset governance; Azure OpenAI stays in-tenant; formal data classification (Internal / Confidential / Restricted / Protected) and governance lifecycle exist.

## 7. Open questions — deferred to enterprise standards

- Exact data platform (Microsoft Fabric vs. Synapse vs. other)
- CORE / USD downstream exposure mechanism (API, OData, exports, datasets)
- Refresh latency of the reporting/warehouse layer
- Whether teams may build own datasets or must use certified models
- Dataset certification process
- Formal access-request workflow and approving body
- Sanctioned app-hosting "preferred path" (Power Platform vs. Azure App Service)
- OCR / document-intelligence pattern for datasheet scanning
- Classification of margin/cost data and resulting access implications

## 8. Stakeholders to engage

Data Office / Enterprise Data · BI Governance / Report Certification · Cloud Engineering (CCOE / DCOE) · IT Security / Identity · Access approval committee (TBD)

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Data access denied or limited → reduced scope | Phased build; read-only low-risk posture; defer specifics to standards |
| "Margin to all users" scrutiny | Small internal group; RBAC + RLS; in-tenant; fallback to manager-gated margin |
| Reconciling multiple historical datasets | Collapse to one governed demand series per SKU |
| Shadow-IT perception | Vendor-lens justification; read-only; no duplication; complements Power BI |
| Scope creep (CRM expanded materially) | Phase the roadmap; hold the line on out-of-scope items |

## 10. Artifacts register

| Artifact | Purpose |
|----------|---------|
| `Copilot_Systems_Discovery_Prompt.md` | Non-sensitive systems/capabilities questions for the internal Copilot |
| `Owned_Brands_Platform_Access_Request.md` | One-pager for the read-only access approval committee |
| `owned_brands_crm_wireframe.html` | Two-persona prototype: Leadership + Sales Team, inventory, SKU detail |
| `Owned_Brands_Project_Brief.md` | This document — single source of truth |

## 11. Roadmap

- **Phase 0 — now:** scoping, prototype wireframe, access one-pager, Copilot discovery *(in progress)*
- **Phase 1:** secure read-only access approval; engage Data Office to confirm mechanism
- **Phase 2:** build production on Azure — data access layer, app DB, identity, embedded Power BI; migrate cross-engine seed
- **Phase 3:** AI layer — email-drop ingestion, datasheet cross extraction, NL query
- **Phase 4:** rollout to Owned Brands team; education / sales plan outputs

## 12. Next actions

- [ ] Decide whether to fold the best-case caveat into the access one-pager (recommended)
- [ ] Identify the actual approval committee and its process (Open Question)
- [ ] Confirm data-access mechanism with the Data Office
- [ ] Continue prototype: email-drop inbox, accounts, quotes screens
