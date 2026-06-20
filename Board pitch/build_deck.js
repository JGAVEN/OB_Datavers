const pptxgen = require("pptxgenjs");
const path = require("path");

const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";
const W = 13.333, H = 7.5, M = 0.6;
const TOTAL = 10;

const INK = "14241C", DEEP = "10402A", GREEN = "1B7F4B", LIME = "37B26B";
const PAPER = "FFFFFF", MIST = "EAF4EE", GREY = "586160", LINE = "DCE5DF", CARD = "F4F8F5";
const HEAD = "Trebuchet MS", BODY = "Calibri", MONO = "Consolas";

function kicker(s, text, color) {
  s.addText(text.toUpperCase(), { x: M, y: 0.45, w: W - 2 * M, h: 0.3,
    fontFace: MONO, fontSize: 11, color: color || GREEN, charSpacing: 2, align: "left" });
}
function actionTitle(s, text, color) {
  s.addText(text, { x: M, y: 0.78, w: W - 2 * M, h: 1.15,
    fontFace: HEAD, bold: true, fontSize: 27, color: color || INK, align: "left", lineSpacingMultiple: 1.0 });
}
function pageNum(s, n) {
  s.addText([{ text: "Owned Brands Sales Intelligence Platform", options: { color: GREY } },
             { text: "   ·   Confidential / Internal   ·   " + n + " / " + TOTAL, options: { color: GREY } }],
    { x: M, y: H - 0.42, w: W - 2 * M, h: 0.3, fontFace: BODY, fontSize: 9, align: "left" });
}
function badge(s, x, y, glyph, fill) {
  s.addShape("ellipse", { x, y, w: 0.6, h: 0.6, fill: { color: fill || GREEN } });
  s.addText(glyph, { x, y, w: 0.6, h: 0.6, align: "center", valign: "middle",
    fontFace: MONO, bold: true, fontSize: 18, color: "FFFFFF" });
}
function card(s, x, y, w, h, fill) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.09, fill: { color: fill || CARD },
    line: { color: LINE, width: 1 } });
}

// =================== SLIDE 1 — TITLE ===================
let s = p.addSlide();
s.background = { color: DEEP };
s.addText("WCO  ·  OWNED BRANDS  ·  DATAVERS BRIEF", { x: M, y: 0.7, w: W - 2 * M, h: 0.35,
  fontFace: MONO, fontSize: 13, color: LIME, charSpacing: 3 });
s.addText("The signals to help WCO sellers win deals\nand hold owned-brand margin.", {
  x: M, y: 1.9, w: W - 2 * M, h: 2.4, fontFace: HEAD, bold: true, fontSize: 40, color: "FFFFFF",
  lineSpacingMultiple: 1.04, align: "left" });
s.addText("A read-only, vendor-side intelligence and activity platform inside WCO. It surfaces the signals and tracks our engagement, so the Owned Brands team shows up at the right time with the right pitch.", {
  x: M, y: 4.3, w: 11.0, h: 1.0, fontFace: BODY, fontSize: 17, color: "D6E8DD", align: "left" });
s.addShape("roundRect", { x: M, y: 5.5, w: W - 2 * M, h: 0.78, rectRadius: 0.1,
  fill: { color: "0B3020" }, line: { color: GREEN, width: 1 } });
s.addText([
  { text: "surface signal", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "reach the right seller", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "win & hold margin", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "growth", options: { color: "FFFFFF" } },
], { x: M, y: 5.5, w: W - 2 * M, h: 0.78, align: "center", valign: "middle", fontFace: MONO, fontSize: 13 });
s.addText("Jeff Goodman   ·   Director, Sales, Owned Brands   ·   June 19, 2026   ·   Status: Discovery / prototype", {
  x: M, y: 6.7, w: W - 2 * M, h: 0.3, fontFace: BODY, fontSize: 11, color: "9DB6A8" });

// =================== SLIDE 2 — WHAT'S MISSING ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "Who we are, and what’s missing");
actionTitle(s, "We can’t see the signals that win deals and hold margin");
const opp = [
  ["◉", "We’re the vendor team", "WCO is our primary customer. The Owned Brands team calls on WCO sellers and select customers to help them win with owned brands."],
  ["⚑", "We fly blind", "We don’t see which sellers are about to lose a winnable deal, or where competitive pressure is eroding owned-brand margin."],
  ["▤", "We have no tools of our own", "WCO’s systems (CORE, USD) weren’t built for the vendor lens. OB-specific tools would lift win rate and margin org-wide."],
];
opp.forEach((c, i) => {
  const x = M + i * ((W - 2 * M - 0.6) / 3 + 0.3);
  const w = (W - 2 * M - 0.6) / 3;
  card(s, x, 2.35, w, 3.4);
  badge(s, x + 0.35, 2.7, c[0]);
  s.addText(c[1], { x: x + 0.3, y: 3.45, w: w - 0.6, h: 0.7, fontFace: HEAD, bold: true, fontSize: 16, color: INK });
  s.addText(c[2], { x: x + 0.3, y: 4.2, w: w - 0.6, h: 1.4, fontFace: BODY, fontSize: 14, color: GREY, lineSpacingMultiple: 1.05 });
});
s.addText("The platform’s job: surface those signals and put us in the right place at the right time.", {
  x: M, y: 6.0, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 2);

// =================== SLIDE 3 — EXAMPLE ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "In practice");
actionTitle(s, "A deal we’d lose today, and how we win it");
const story = [
  ["The deal", "A WCO seller is bidding a security project: a national-brand camera line, with the rest of the bill of materials still open. The seller sourced it and holds registered project pricing on the cameras.", false],
  ["The threat", "A competing distributor bids the same cameras, but pairs them with its own-brand cable. The extra margin on that cable lets it beat our total price, registered pricing and all.", false],
  ["How we win", "The platform flags this seller. The OB team helps specify Owned Brands into the bill of materials, lifting margin and sharpening total price, so WCO keeps the deal.", true],
];
const stW = (W - 2 * M - 2 * 0.55) / 3;
story.forEach((c, i) => {
  const x = M + i * (stW + 0.55);
  card(s, x, 2.45, stW, 3.5, c[2] ? GREEN : CARD);
  s.addText(c[0], { x: x + 0.3, y: 2.7, w: stW - 0.6, h: 0.45, fontFace: HEAD, bold: true, fontSize: 17, color: c[2] ? "FFFFFF" : GREEN });
  s.addText(c[1], { x: x + 0.3, y: 3.25, w: stW - 0.6, h: 2.5, fontFace: BODY, fontSize: 14.5, color: c[2] ? "EAF4EE" : INK, lineSpacingMultiple: 1.12 });
  if (i < 2) s.addText("→", { x: x + stW, y: 2.45, w: 0.55, h: 3.5, align: "center", valign: "middle", fontFace: MONO, bold: true, fontSize: 26, color: LIME });
});
s.addText("Today no system surfaces this seller in time. That is the gap, and the whole point of the platform.", {
  x: M, y: 6.25, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 3);

// =================== SLIDE 4 — THE ENGINE / LOOP ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The engine, our north star");
actionTitle(s, "One loop puts us in the right deal at the right time");
const steps = [
  ["1", "Surface", "Signal in the governed data: a deal at risk or margin under pressure"],
  ["2", "Reach", "The right WCO seller or customer, at the right time, with the cross and context"],
  ["3", "Win", "Help close the deal and hold owned-brand margin"],
  ["4", "Grow", "Owned brands grow; the engagement is tracked"],
];
const sw = (W - 2 * M - 3 * 0.55) / 4;
steps.forEach((st, i) => {
  const x = M + i * (sw + 0.55);
  card(s, x, 2.6, sw, 2.5);
  badge(s, x + sw / 2 - 0.3, 2.85, st[0], i === 3 ? LIME : GREEN);
  s.addText(st[1], { x, y: 3.6, w: sw, h: 0.45, align: "center", fontFace: HEAD, bold: true, fontSize: 18, color: INK });
  s.addText(st[2], { x: x + 0.2, y: 4.1, w: sw - 0.4, h: 0.95, align: "center", fontFace: BODY, fontSize: 13, color: GREY, lineSpacingMultiple: 1.05 });
  if (i < 3) s.addText("→", { x: x + sw, y: 2.6, w: 0.55, h: 2.5, align: "center", valign: "middle", fontFace: MONO, bold: true, fontSize: 26, color: LIME });
});
s.addText([
  { text: "The SKU is the spine. ", options: { bold: true, color: INK } },
  { text: "One detail view unifies sales, stock, opportunities, crosses, and activity. Two tiers run the model: the WCO seller channel (push) and WCO customers (pull).", options: { color: GREY } },
], { x: M, y: 5.55, w: W - 2 * M, h: 0.8, fontFace: BODY, fontSize: 15, lineSpacingMultiple: 1.1 });
pageNum(s, 4);

// =================== SLIDE 5 — CAPABILITIES ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "What you get");
actionTitle(s, "A vendor-side platform and CRM, already prototyped");
const caps = [
  ["⇄", "Cross database", "Competitive product to owned-brand mapping. OB enablement, not org-wide access."],
  ["◎", "Signals + supply", "Where to show up: deals at risk, margin under pressure, stock signal."],
  ["☷", "Vendor-lens CRM", "OB-generated opportunities; engagement with WCO sellers, our customer (not in USD)."],
  ["✉", "AI email-drop", "A note to records; opportunity-loss and product-development signals."],
  ["▣", "Leadership dashboard", "Natural-language query over the whole pipeline."],
  ["▤", "Inventory & forecast", "Stock overlay with pipeline-weighted demand."],
];
const gw = (W - 2 * M - 2 * 0.4) / 3, gh = 1.5;
caps.forEach((c, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * (gw + 0.4), y = 2.4 + row * (gh + 0.35);
  card(s, x, y, gw, gh);
  badge(s, x + 0.25, y + 0.27, c[0]);
  s.addText(c[1], { x: x + 1.0, y: y + 0.22, w: gw - 1.15, h: 0.4, fontFace: HEAD, bold: true, fontSize: 15, color: INK });
  s.addText(c[2], { x: x + 1.0, y: y + 0.62, w: gw - 1.15, h: 0.8, fontFace: BODY, fontSize: 12.5, color: GREY, lineSpacingMultiple: 1.03 });
});
s.addText("Built read-only and in-tenant. Margin/cost confined to the authorized OB group.", {
  x: M, y: 6.25, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 14, color: GREEN });
pageNum(s, 5);

// =================== SLIDE 6 — PROTOTYPE ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "Proof");
actionTitle(s, "Already built: the leadership view");
const imgX = M, imgY = 1.65, imgW = 6.95, imgH = 6.95 / 1.44;
s.addShape("roundRect", { x: imgX - 0.07, y: imgY - 0.07, w: imgW + 0.14, h: imgH + 0.14, rectRadius: 0.04, fill: { color: MIST }, line: { color: LINE, width: 1 } });
s.addImage({ path: path.join(__dirname, "prototype_shot.png"), x: imgX, y: imgY, w: imgW, h: imgH });
const notes = [
  ["Conversion value loop", "Identified → crossed → in progress → converted, tracked live."],
  ["Pipeline by owned brand", "LCO AV, LCO Cable and more, ranked by open opportunity."],
  ["Engagement by party", "Calls, visits, demos logged for the WCO seller and customer."],
];
const nx = imgX + imgW + 0.45, nw = W - M - nx;
notes.forEach((n, i) => {
  const y = imgY + 0.1 + i * 1.35;
  badge(s, nx, y, String(i + 1));
  s.addText(n[0], { x: nx + 0.78, y: y - 0.02, w: nw - 0.78, h: 0.4, fontFace: HEAD, bold: true, fontSize: 15, color: INK });
  s.addText(n[1], { x: nx + 0.78, y: y + 0.38, w: nw - 0.78, h: 0.8, fontFace: BODY, fontSize: 13, color: GREY, lineSpacingMultiple: 1.05 });
});
s.addText("Working two-persona wireframe (Leadership + Sales Team); sample data only. This is proven UX, not a concept.", {
  x: M, y: 6.62, w: W - 2 * M, h: 0.35, fontFace: BODY, italic: true, fontSize: 13, color: GREEN });
pageNum(s, 6);

// =================== SLIDE 7 — WHY NOW + KPI ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "Why now");
actionTitle(s, "The team is built to execute. The tool is the missing piece.");
const leftW = 7.0;
s.addText([
  { text: "We just integrated the LCO sales organization", options: { bold: true, color: INK } },
  { text: ", adding capability and aligning structure to the Owned Brands mandate inside WCO. The structure is in place; the missing piece is the toolset that lets it see around corners that are blind today.", options: { color: INK } },
], { x: M, y: 2.5, w: leftW, h: 1.2, fontFace: BODY, fontSize: 17, lineSpacingMultiple: 1.15 });
s.addText("Equip the team now and that structural investment compounds. Wait, and winnable deals like the one we just walked through keep slipping, quietly.", {
  x: M, y: 3.95, w: leftW, h: 1.4, fontFace: BODY, fontSize: 17, color: GREY, lineSpacingMultiple: 1.15 });
// KPI stat card
const kx = M + leftW + 0.6, kw = W - M - kx;
s.addShape("roundRect", { x: kx, y: 2.4, w: kw, h: 3.3, rectRadius: 0.1, fill: { color: DEEP } });
s.addText("FIRST 90 DAYS", { x: kx, y: 2.75, w: kw, h: 0.35, align: "center", fontFace: MONO, fontSize: 12, color: LIME, charSpacing: 2 });
s.addText("30", { x: kx, y: 3.0, w: kw, h: 1.6, align: "center", fontFace: HEAD, bold: true, fontSize: 96, color: "FFFFFF" });
s.addText("opportunities WCO would otherwise have lost, identified and supported.", {
  x: kx + 0.4, y: 4.7, w: kw - 0.8, h: 0.9, align: "center", fontFace: BODY, fontSize: 15, color: "D6E8DD", lineSpacingMultiple: 1.05 });
pageNum(s, 7);

// =================== SLIDE 8 — DATA FLOW + GOVERNANCE ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "Architecture & governance");
actionTitle(s, "Read-only in, governed all the way through, the win out");
const fb = [
  ["WCO sources", ["CORE (ERP)", "USD (CRM)", "Inventory"], "systems of record", "tag"],
  ["Governed access", ["Certified datasets,", "Power BI, or the", "enterprise API layer"], "read-only", "solid"],
  ["OB_Datavers", ["Cross-reference engine", "Activity store, Azure SQL", "AI layer, Azure OpenAI"], "isolated, in-tenant", "tag"],
  ["Dashboard, then the win", ["Embedded Power BI", "Seller signals surfaced", "Spec owned brands, win"], null, "win"],
];
const fbw = 2.7, fgap = (W - 2 * M - 4 * fbw) / 3, fy = 2.0, fh = 2.75;
fb.forEach((b, i) => {
  const x = M + i * (fbw + fgap);
  const win = b[3] === "win";
  card(s, x, fy, fbw, fh, win ? GREEN : CARD);
  s.addText(b[0], { x: x + 0.22, y: fy + 0.18, w: fbw - 0.44, h: 0.5, fontFace: HEAD, bold: true, fontSize: 15, color: win ? "FFFFFF" : INK });
  s.addText(b[1].map((ln) => ({ text: ln, options: { breakLine: true } })), { x: x + 0.22, y: fy + 0.78, w: fbw - 0.44, h: 1.2, fontFace: BODY, fontSize: 12, color: win ? "EAF4EE" : GREY, lineSpacingMultiple: 1.12 });
  if (b[2]) {
    const solid = b[3] === "solid";
    s.addShape("roundRect", { x: x + 0.22, y: fy + fh - 0.52, w: fbw - 0.44, h: 0.34, rectRadius: 0.06, fill: { color: solid ? GREEN : MIST } });
    s.addText(b[2], { x: x + 0.22, y: fy + fh - 0.52, w: fbw - 0.44, h: 0.34, align: "center", valign: "middle", fontFace: MONO, fontSize: 10, bold: solid, color: solid ? "FFFFFF" : GREEN });
  }
  if (i < 3) s.addText("→", { x: x + fbw, y: fy, w: fgap, h: fh, align: "center", valign: "middle", fontFace: MONO, bold: true, fontSize: 22, color: LIME });
});
s.addShape("roundRect", { x: M, y: 5.15, w: W - 2 * M, h: 0.5, rectRadius: 0.08, fill: { color: DEEP } });
s.addText("Entra ID SSO   ·   RBAC + row-level security   ·   stays inside the Microsoft / Azure boundary, no egress", { x: M, y: 5.15, w: W - 2 * M, h: 0.5, align: "center", valign: "middle", fontFace: BODY, fontSize: 13, color: "FFFFFF" });
s.addText([
  { text: "Not doing: ", options: { bold: true, color: "A6322B" } },
  { text: "no writes to CORE/USD, no direct DB connectivity, no duplication, no access outside OB, no egress.", options: { color: GREY } },
], { x: M, y: 5.8, w: W - 2 * M, h: 0.35, align: "center", fontFace: BODY, fontSize: 13 });
s.addText("Proposed and aligned to confirmed WCO Azure standards; the exact governed-data mechanism is confirmed with the Data Office before build.", { x: M, y: 6.28, w: W - 2 * M, h: 0.35, align: "center", fontFace: BODY, italic: true, fontSize: 11.5, color: GREEN });
pageNum(s, 8);

// =================== SLIDE 9 — PLAN ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The plan");
actionTitle(s, "A phased build I can execute solo");
const ph = [
  ["0", "Now", "Scoping, prototype, access one-pager, systems discovery"],
  ["1", "Access", "Secure read-only approval; confirm mechanism with Data Office"],
  ["2", "Build", "Azure production: data layer, app DB, identity, Power BI"],
  ["3", "AI", "Email-drop, datasheet crosses, natural-language query"],
  ["4", "Rollout", "Team adoption, education & sales-plan outputs"],
];
const pw = (W - 2 * M - 4 * 0.4) / 5;
s.addShape("line", { x: M + pw / 2, y: 3.3, w: (W - 2 * M) - pw, h: 0, line: { color: LINE, width: 2 } });
ph.forEach((q, i) => {
  const x = M + i * (pw + 0.4);
  badge(s, x + pw / 2 - 0.3, 3.0, q[0], i === 0 ? LIME : GREEN);
  s.addText(q[1], { x, y: 3.75, w: pw, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 16, color: INK });
  s.addText(q[2], { x: x + 0.05, y: 4.2, w: pw - 0.1, h: 1.5, align: "center", fontFace: BODY, fontSize: 12.5, color: GREY, lineSpacingMultiple: 1.08 });
});
s.addText("Phased by design: each phase is independently valuable and lowers the risk of the next.", {
  x: M, y: 6.05, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 9);

// =================== SLIDE 10 — THE ASK ===================
s = p.addSlide(); s.background = { color: DEEP };
s.addText("THE ASK", { x: M, y: 0.55, w: W - 2 * M, h: 0.35, fontFace: MONO, fontSize: 13, color: LIME, charSpacing: 3 });
s.addText("Approve read-only access, an Azure environment, and governance liaisons", {
  x: M, y: 0.95, w: W - 2 * M, h: 1.0, fontFace: HEAD, bold: true, fontSize: 26, color: "FFFFFF", lineSpacingMultiple: 1.0 });
const asks = [
  ["1", "Read-only data access", "Governed WCO sales data incl. margin/cost, via certified datasets, Power BI, or the API layer. User group: the Owned Brands sales team only. No access provided outside of OB."],
  ["2", "Azure build environment", "Subscription / resource group under WCO governance, Entra ID app registration, Azure OpenAI in-tenant, and a Power BI workspace with certified-dataset read access."],
  ["3", "Governance liaisons", "Named contacts from Data Office, BI Governance, Cloud Engineering, and IT Security, plus confirmation of the access-request workflow and margin/cost classification."],
];
asks.forEach((a, i) => {
  const y = 2.25 + i * 1.25;
  s.addShape("roundRect", { x: M, y, w: W - 2 * M, h: 1.1, rectRadius: 0.08, fill: { color: "0B3020" }, line: { color: GREEN, width: 1 } });
  badge(s, M + 0.3, y + 0.25, a[0], LIME);
  s.addText(a[1], { x: M + 1.15, y: y + 0.16, w: 3.4, h: 0.8, fontFace: HEAD, bold: true, fontSize: 16, color: "FFFFFF", valign: "middle" });
  s.addText(a[2], { x: M + 4.6, y: y + 0.12, w: W - 2 * M - 4.9, h: 0.9, fontFace: BODY, fontSize: 13, color: "D6E8DD", valign: "middle", lineSpacingMultiple: 1.03 });
});
s.addText([
  { text: "Not requested: ", options: { bold: true, color: LIME } },
  { text: "writes to CORE/USD, direct DB connectivity, data duplication, access outside OB, or any egress.", options: { color: "B9D2C5" } },
], { x: M, y: 6.15, w: W - 2 * M, h: 0.4, fontFace: BODY, fontSize: 13 });
s.addText("Approve these and the Owned Brands team can finally see the signals and act on them.", {
  x: M, y: 6.6, w: W - 2 * M, h: 0.5, fontFace: HEAD, bold: true, italic: true, fontSize: 15, color: "FFFFFF" });

const out = path.join(__dirname, "Owned_Brands_Board_Deck.pptx");
p.writeFile({ fileName: out }).then(() => console.log("wrote " + out));
