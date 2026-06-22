# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project will adopt
[Semantic Versioning](https://semver.org/) once it ships releasable artifacts.

## [Unreleased]
### Added
- "Target Sellers" worklist on the wireframe (`Project planning/index.html`):
  the missing "identify" screen for the Sales persona. Each row is a WCO seller
  (the OB team's target customer) holding an open competitor quote that crosses to
  an owned brand, with the end-customer account as context. Calibration bar (saved
  presets plus brand / SKU / margin-below / territory / open-quote filters) and a
  target list. A `Select` action claims a row and routes it to the new "My
  Opportunities" view with `source = Target Sellers`. The not-yet-secured
  open-quote / real-time signal is marked per-column (target dataset, not a
  commitment).
- "My Opportunities" view: the OB rep's claimed and worked pipeline, keyed by the
  WCO seller (with the account as context), filterable by source (Target Sellers,
  Cross reference, Email-drop, Manual). The "Margin under" calibration targets the
  lowest-margin lines (sample threshold 12%).
- Interactive guided walk-through on the wireframe (`Project planning/index.html`):
  a scenario-driven product tour (competitor part to cross to captured opportunity
  to worked to measured) with spotlight + popup, persona/view switching, keyboard
  nav, and a `?tour=1` deep-link for auto-start. Stays anonymized (no real names).
- Architecture and governance scaffold: `README`, `ARCHITECTURE`, ADR practice
  (`docs/adr/`), `CONTRIBUTING`, `SECURITY`, this changelog.
- Repo consistency + collaboration tooling: `.editorconfig`, `.gitattributes`,
  expanded `.gitignore`, CODEOWNERS, PR/issue templates, Dependabot, guardrail CI.
- Vetted, Markdown-only Claude Code skills under `.claude/skills/` and an upgraded
  `CLAUDE.md` operating agreement.
- Board pitch under `Board pitch/`: a 2-page decision brief (`.docx`) and an
  8-slide deck (`.pptx`), both generated from the `Project planning/` source of
  truth, plus their build scripts. The deck ends on the ask (read-only access,
  Azure environment, governance liaisons); the brief adds the developer tooling /
  hardware / budget request.

### Changed
- Rebuilt the guided walk-through (`Project planning/index.html`) as a 13-step,
  sales-first tour (My day, Target Sellers, My Opportunities, Cross reference,
  Hardware demos, then the leadership roll-up), framed as a two-phase build whose
  second-phase payoff is higher inventory turns and lower inventory liability.
  Renamed the overview "Conversion value loop" panel to "Value conversion flow".
  The walk-through now auto-launches on every visit.
- Renamed the Sales "Cross lookup" view to "Cross reference" (the part-to-part
  reference dictionary); the new worklist is "Target Sellers" (its rows are the WCO
  sellers the OB team calls, not the end-customer companies), paired with "My
  Opportunities".
- Upgraded the Leadership "Conversion engine" into the leadership lens on the same
  opportunity pipeline (surfaced pool, claimed and working, unclaimed/leaking,
  converted) with an owner column, instead of adding a duplicate leadership screen.
  Re-spined the guided walk-through to identify, cross, engage, measure across the
  new screens. Sample data made consistent across all three opportunity views.
- Recalibrated the board pitch per stakeholder review: reframed from "convert
  competitor sell-through for margin" to "give the Owned Brands team the data
  signals to help WCO sellers win deals and hold margin." Clarified that platform
  users are the OB sales team, their call targets are WCO sellers + select WCO
  customers, and the build is solo.
- Second pitch pass: positive "stronger signals" framing; org-wide win-rate/margin
  payoff; OB-only access stated explicitly (no org-wide access); elevated the "the
  WCO seller is our customer, not tracked in USD" insight; added opportunity-loss
  and product-development signals; removed all em-dashes; budget set to TBD.
- Renamed anonymization aliases repo-wide: `OBCO` → `WCO`, `OB_Vend` → `LCO`,
  so the whole repo matches the pitch.
- Eighth pitch pass (deck): merged in-slide edits from the reviewed .pptx; flipped
  slide 2 fully to upside framing ("Insights surfaced at the right time increase
  margin company-wide"); replaced the "30 in 90 days" KPI with a growth-cycle
  visual while keeping the why-now beat; scrubbed all "prototype/proven UX" claims
  in favour of honest "wireframe" language; tightened the slide-3 worked example
  (own-brand cable/power/racking; "despite our registered pricing"); bottom-
  anchored slide-2 card headers for uniform body alignment.
- Seventh pitch pass: elevated the deck's tone to match the formalized brief —
  removed casual idioms ("fly blind", "see around corners") and conversational
  asides ("the one we just walked through", "finally", "quietly"); made titles and
  taglines declarative; standardized system naming to ERP/CRM throughout.
- Sixth pitch pass: updated the dashboard's blended-margin metric (39.4%, up from
  38.2%); tightened and formalized the brief's two opening narrative paragraphs;
  reframed the vendor blind spot ("the distributor is our primary customer; we
  need a distinct view of the data to maximize our value"); added "sandbox access
  to Claude Code" to the tooling ask; reflected the primary-customer point on the
  deck.
- Fifth pitch pass: replaced the deck's risk slide with a data-flow + governance
  slide (WCO sources → governed read-only access → OB_Datavers on Azure →
  dashboard and the win), with an identity/boundary band and a "proposed, aligned
  to confirmed standards, mechanism confirmed with the Data Office" footnote.
  Names only the confirmed Microsoft/Azure components; keeps the undecided layer
  abstract. Deck stays at 10 slides.
- Fourth pitch pass: added the leadership-dashboard screenshot to the brief's
  one-pager; per review, dropped the ERP/CRM expansion, added "at the right time"
  to the value loop, reworded why-now ("see around corners that are blind today"),
  and tightened the access ask ("No access provided outside of OB").
- Third pitch pass: added a concrete worked example (a security-bid deal), a
  "why now" beat (LCO integration momentum) with a first-90-day KPI of 30
  saved opportunities, a value-loop graphic on the brief, and a prototype
  screenshot slide in the deck (captured from the wireframe). Deck grew to 10
  slides. Spelled out CORE/USD as ERP/CRM. Removed em-dashes from the wireframe
  (`index.html`) too.
