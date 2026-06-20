# Owned Brands Sales Intelligence Platform
## Read-Only Data Access Request

**Requested by:** Director, LCO & WCO Owned Brands Sales
**Decision requested:** Approval of read-only access to governed WCO sales datasets — including margin/cost — for a defined Owned Brands user group, and assignment of a Data Office / BI Governance liaison to confirm the access mechanism.

---

### The problem
WCO's core systems (CORE, USD) are built for the distributor's operating model. The Owned Brands team operates as a *vendor* inside WCO and lacks the vendor-side visibility it needs — brand sell-through, competitive conversion opportunities, margin performance — along with the activity tracking (opportunities, quotes, engagements) the distributor systems were never designed to capture. Today this work lives in disconnected spreadsheets.

### What we will build
A read-only, Azure-hosted internal application that consumes **governed enterprise datasets** and surfaces analytics, tracking, and AI-assisted insight for the Owned Brands team. It complements — does not replace — Power BI, and introduces **no new system of record for WCO data**. Users are **Owned Brands sellers and managers only**.

The platform supports a two-tier model: the WCO seller channel (enablement) and LCO AV end customers (direct demand). Its signature capability is a **SKU cross-reference engine** mapping competitor parts to owned-brand equivalents — letting the team find competitor sell-through in the data and convert it to higher-margin owned-brand revenue.

### Access requested (read-only)
Read-only consumption — via governed datasets, certified Power BI models, or the enterprise API layer — of:

- Sales transactions, **including margin/cost**
- Open orders and backlog
- Quote and bid activity
- Account, contact, and product/SKU master
- Inventory and availability

Scoped to the Owned Brands data domain and the defined user group.

### What we are NOT requesting (risk boundaries)
- **No** write, update, or delete to CORE, USD, or any system of record
- **No** direct production database connectivity — consumption via the governed layer only
- **No** ownership or duplication of authoritative WCO data; it remains in WCO systems
- **No** data egress outside the Microsoft / Azure boundary

The platform maintains its own **isolated** application database for *net-new* Owned Brands operational data only — SKU crosses, opportunities, in-progress quotes, call/engagement/contact tracking, and AI-parsed email intelligence. This data exists nowhere in WCO today and is fully separated from all WCO systems of record.

### Architecture & governance alignment
- **Hosting:** Azure-native (App Service / Functions; Azure SQL for the isolated app database)
- **Identity:** Entra ID SSO with application-level RBAC
- **Access control:** territory / hierarchy row-level security mirroring existing Power BI RLS — margin/cost visibility confined to the authorized Owned Brands group
- **Reporting:** embedded certified Power BI for authoritative sales data (no dataset duplication)
- **AI:** Azure OpenAI within the Microsoft boundary — email parsing, datasheet cross extraction, natural-language query; no external AI services, no data egress
- **Classification:** sales and margin/cost handled as financial / Confidential data per the enterprise classification framework

### Deferred to enterprise standards
The specific data-access mechanism, source platform (Fabric vs. Synapse), ingestion tooling, dataset certification path, and refresh latency will be aligned with the **Data Office, BI Governance, Cloud Engineering, and IT Security / Identity** teams prior to implementation. Where enterprise patterns are not yet documented, this proposal defers to them rather than assuming.

---

*Read-only toward WCO systems. Azure-native. Entra ID secured. Governed data consumed, never owned. Zero operational risk to CORE or USD.*
