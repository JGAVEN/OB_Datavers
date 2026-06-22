# HANDOFF — Owned Brands Sales Intelligence pitch

> Read `CLAUDE.md` (repo root) first, then this. This file captures the decisions,
> current state, and active task that are **not** fully reflected in code or git
> history. It is the single source of truth for picking this work up cold.
> Last updated: 2026-06-21.

---

## 1. What this work is
The pitch package to get leadership approval for the **Owned Brands Sales
Intelligence platform**. Current deliverables:
1. **One one-pager** (no slide deck — the deck was explicitly killed).
2. **An interactive HTML walk-through** of the wireframe dashboard.

## 2. Hard rules (carry forward, do not break)
- **Public repo.** `github.com/JGAVEN/OB_Dataverse`, live on GitHub Pages at
  **https://jgaven.github.io/OB_Dataverse/** (auto-deploys on push to `main`).
- **Anonymize everything committed:** Wesco → **WCO**, Liberty → **LCO**. Never
  commit real names. Real-name versions build **locally only** to
  `Board pitch/_present/` (gitignored) via `Board pitch/build_realnames.sh`.
- **Real person:** Michael Biscan — credit **only in the local one-pager**, never
  on the public site/wireframe.
- **No em-dashes anywhere.** Use commas, colons, parentheses.
- **No fabricated numbers.** Only figures the user provides.
- **Honesty:** it is a **wireframe**, not a prototype or built product.

## 3. The repositioning (CURRENT strategy — most important)
The pitch was repositioned away from "fund a speculative build" to **"fund the
automation of a proven, already-earning process":**
- A teammate (**Michael Biscan**) built a **Copilot AI workflow** that crosses
  national-brand SKUs to Owned-Brand equivalents. It already works and has
  generated real opportunities/value — but **manually**.
- The ask: **operationalize it into an agentic workflow** (local open-weight LLMs)
  to raise throughput, and **add a CRM** to capture every opportunity so none leak.
- **Why local LLMs:** expediency given sensitivity to competitive access to
  sensitive WCO data, plus cost containment. (Not throughput per se.)
- **Data access is precedented:** 4 inside-sales reps already call WCO sellers off
  historical sales data. The gap is **real-time open-quote activity data**.

## 4. The spine & pillars
Arc (set by the user): **identify → cross → engage → measure.**
Four pillars: **Win deals · Grow margin · Safe/governed · Cheap/feasible.**

## 5. Economics & numbers
- Avg deal **$20,000 at 35% margin = $7,000 gross profit/deal**.
- Target: **90 deals in 90 days** (once built) = **~$1.8M revenue / ~$630K GP**.
  **Feature the $630K** prominently.
- Cost: **$6,000** top-end MacBook Pro (M4 Max, 128 GB) to run local open-weight
  models on-device (no data leaves the machine). **Azure spend = TBD** with Cloud
  Engineering.
- **PENDING from user (one-pager is on hold for these):** opportunities since the
  program started + a growth-over-time graph; opportunity **stage**
  (identified / quoted / won); **$ value**; the 4-rep throughput baseline;
  **win ratio** (if available); more detail on the local-LLM driver.

## 6. Attribution definition (drafted, lives as the memo footnote)
> A **saved deal** counts only if all hold: (1) the platform flagged it as at
> competitive-displacement risk **before** the order; (2) a WCO seller, enabled by
> OB, acted on the signal; (3) WCO won it; (4) the prior loss trajectory was
> **recorded at signal time**, not assumed retroactively. Counted once, logged in
> the platform, valued at actual deal size (default $20K / 35%).

## 7. Deliverable status
### One-pager — ON HOLD (pending §5 numbers)
- Format decided: **hybrid** — answer-first SCQA decision-memo voice + scannable
  proof callouts; lead with the proof numbers and the ask; $630K as a callout.
- A draft exists: `Board pitch/build_memo.js` → `Owned_Brands_Decision_Memo.docx`.
  **It predates the repositioning** — must be reframed around the Copilot/automate
  story and the real numbers. Built it answer-first (decision box → Situation →
  Complication → Recommendation → 4 pillars → Decision/gate → attribution footnote).
- Structure research (for reference): SCQA/Minto answer-first, Amazon PR-FAQ, HBR
  exec-summary, NN/g scan patterns. Hybrid was chosen.

### Walk-through — BUILT & LIVE, mid-review
- In `Project planning/index.html`. Self-contained guided tour: spotlight + popup,
  persona/view switching, keyboard nav (←/→/Esc), `?tour=1` deep-link auto-starts,
  `?tour=N` jumps to step N. Floating "▶ Guided walk-through" button (bottom-left).
- **Being reviewed step-by-step with the user.** Step 1 corrected (below). Steps
  are being realigned to the identify→cross→engage→measure arc.
- **BLOCKED on §8:** the user says the tour's next step is wrong because the
  wireframe is **missing the "Cross Opportunities" section** that beat 1 ("identify")
  should point at. Build that section first, then resume the tour review.

**Step 1 corrected copy (logged, not yet written to code):**
> Title: How Owned Brands helps sellers close opportunities and increase margin
> Body: A short tour of the Engine. A low-margin opportunity is identified. Its
> target SKUs are crossed to owned-brand equivalents. The OB sales team engages the
> WCO seller. Opportunities, wins, and losses are recorded and measured over time.
> Sample data throughout.

### Obsolete (remove when finalizing)
- `Board pitch/build_deck.js`, `Owned_Brands_Board_Deck.pptx/.pdf` — no deck anymore.
- `Board pitch/build_brief.js`, `Owned_Brands_Board_Brief.docx/.pdf` — superseded by
  the single one-pager.

## 8. ACTIVE TASK — build the "Cross Opportunities" section in the wireframe
Add a new section to `Project planning/index.html`. User's spec:
- **Name:** "Cross Opportunities."
- Surfaces opportunities from the **read-only datasets** we will gain access to.
- **Calibrated by user-set filters:** SKU targets, brand targets, margin targets.
  e.g. "list all sellers with open quotes for brand X, or SKU X, or margin below XX%."
- **Purpose:** identify target sellers/opportunities to call and sell Owned Brands
  as a **flip**.
- **Workflow:** from the list, the OB rep **selects** a target → it **becomes an
  opportunity** and **moves to "My Opportunities."**
- **My Opportunities** must be **filterable by the source** of the opportunity
  (e.g. Cross Opportunities, Cross lookup, Email-drop, Manual).

**Open design questions the user posed (answer + confirm in the new chat):**
"Anything else we should add here? Anything I'm not thinking of? Is it logical?"

**Build-ready design notes (head start, confirm before building):**
- Lives under the **Sales Team** nav (likely also a Leadership view). New `.view`
  section + nav entry wired into the existing `go()` switcher.
- Filter bar: Brand · SKU · Margin-below-threshold · Open-quote · Territory/Seller.
  Treat "open-quote / real-time" data as a **target-not-yet-secured** dependency
  (call it out, consistent with the scopebar).
- Row shape: WCO seller · customer/account · competitor brand/SKU · current margin
  · OB cross + margin lift · **[Select]** action.
- "Select" assigns owner + status and routes the row to **My Opportunities** with
  **source = "Cross Opportunities."** Add a Source column/filter there.
- Consider: saved filter presets (the "calibration"), bulk-select, de-dupe,
  assignment to the 4 inside reps.
- Keep wireframe conventions: vanilla HTML/CSS/JS, sample data, no real names, the
  existing token/class system, the `.skulink` drill pattern if useful.

## 9. Files, tooling, commands
- **Wireframe:** `Project planning/index.html` — vanilla HTML/CSS/JS, no deps.
  Personas (Leadership/Sales), `go(id)` view switcher, `.view` sections, modal,
  SVG demand chart. Tour code is at the bottom of the `<script>`.
- **One-pager:** `Board pitch/build_memo.js` (docx-js).
- **Real-name local build:** `Board pitch/build_realnames.sh` → `Board pitch/_present/`.
- **Env:** `export NODE_PATH="$(npm root -g)"` before running node (docx +
  pptxgenjs installed globally). Render docx/pptx → PDF with LibreOffice
  (`/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf`).
  Rasterize with `pdftoppm`. Use `/opt/homebrew/bin/python3.13` for XML parsing.
  Headless Chrome screenshots the wireframe/tour (`?tour=N`).
- **Verify the tour:** screenshot `index.html?tour=N` per step; placement logic
  does below/above/beside/pin with viewport clamping.
- **Git:** Conventional Commits; update `CHANGELOG.md`; commit when ready; push to
  `main` redeploys Pages. QA scratch (`Board pitch/*.jpg`, `tour-*.png`, `raw/`,
  `unpacked/`) is gitignored.

## 10. Immediate next steps for the new chat
1. Confirm the **Cross Opportunities** design (§8) with the user, then build it.
2. Resume the **walk-through step-by-step review** (§7) from Step 2, now that the
   "identify" beat has a real screen to point at. Apply Step 1's corrected copy.
3. Keep the **one-pager on hold** until the user delivers the §5 numbers; then
   reframe `build_memo.js` around the repositioning and finalize the single page.
4. When finalizing, **remove the obsolete deck/brief files** (§7).
