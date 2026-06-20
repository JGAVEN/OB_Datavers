---
name: exec-deck-structure
description: >
  Use when building or reviewing an executive presentation that asks leadership
  for a decision — funding, headcount, data access, or a mandate. Governs the
  ARGUMENT and STRUCTURE of the deck (not the .pptx file mechanics — for that,
  also use the pptx skill). Triggers: "pitch deck", "leadership deck", "board
  slides", "funding ask", "steering committee", "exec readout".
license: MIT
metadata:
  author: Prepared for JGAVEN/OB_Datavers
  note: Original methodology. Captures general best-practice (action titles,
        ghost-deck test) without reproducing any proprietary skill text.
---

# Executive Deck Structure

You are building a deck whose job is to get a yes from senior leadership. Optimize
for one decision, made fast, by busy people who skim. Priority order:
**argument -> evidence -> layout -> aesthetics.** Earlier items dominate later ones.

## Step 1 — Name the single decision
Before any slide, write one sentence: "I am asking [who] to approve [what] by [when]."
If you cannot say it in one sentence, the deck is not ready. Everything that does
not move that decision forward goes in the appendix.

## Step 2 — Action titles, not labels
Every slide title is a full declarative sentence stating the takeaway —
"Owned Brands loses $X/yr to fragmented data," not "Current State." The audience
should get the whole argument by reading titles alone.

## Step 3 — The ghost-deck test
Read only the titles, top to bottom. They must form a complete, persuasive
narrative arc: Context -> Problem (quantified) -> Why now -> The ask -> What you
get -> Proof you can deliver -> Risk handled -> The decision. If the title-only
read does not convince, fix the spine before touching a single chart.

## Step 4 — One idea per slide
One claim, one exhibit, one "so what." Put the key number on the chart itself and
highlight it. If a slide has two messages, split it. Body text orients; it does not
carry the argument — the presenter does. Cap body text at ~40 words.

## Step 5 — Executive narrative arc (default for a funding/access ask)
1. Opportunity in one line (the prize, sized).
2. The problem today, quantified in money or risk leadership already cares about.
3. Why now — the cost of waiting / the window.
4. The ask — specific resources, headcount, and data access, with the boundary of
   what you are NOT asking for.
5. What leadership gets — outcomes and ROI, time-phased.
6. Proof of delivery — your plan, milestones, and why you/your team can execute.
7. Risk and governance — name the data-security and control concerns first and
   show they are handled. For a data-platform ask this slide is mandatory.
8. The decision slide — restate the one ask; this slide stays up during Q&A.

## Step 6 — Design that reads as rigor (exec, not academic)
Unlike an academic talk, an exec pitch may be visually polished — but restraint
signals competence. Three colors max (one primary, one accent, one alert).
One typeface, hierarchy by size/weight. Generous whitespace. Use color to direct
the eye to the number that matters. No clip art, no stock-photo filler, no
gradient decoration. A CFO trusts a clean deck.

## Step 7 — QA before you ship
- [ ] One-sentence ask is on the decision slide verbatim.
- [ ] Ghost-deck test passes (titles alone tell the story).
- [ ] Every number has a source noted on the slide.
- [ ] Data-security / governance objection is pre-empted, not buried.
- [ ] The deck ends on the ask, never on "Thank You."
- [ ] Appendix holds all depth; main deck is <= the agreed slide count.

When generating the actual .pptx, also load the `pptx` skill for file mechanics
and the `stop-slop` / `copywriting` / `ogilvy` skills for the on-slide language.
