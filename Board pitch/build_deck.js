const pptxgen = require("pptxgenjs");
const path = require("path");

const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";
const W = 13.333, H = 7.5, M = 0.6;

// ---- palette (margin-green, content-informed) ----
const INK = "14241C", DEEP = "10402A", GREEN = "1B7F4B", LIME = "37B26B";
const PAPER = "FFFFFF", MIST = "EAF4EE", GREY = "586160", LINE = "DCE5DF", CARD = "F4F8F5";
const HEAD = "Trebuchet MS", BODY = "Calibri", MONO = "Consolas";

const titleOpts = { fontFace: HEAD, bold: true, color: INK, align: "left" };

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
             { text: "   ·   Confidential — Internal   ·   " + n + " / 8", options: { color: GREY } }],
    { x: M, y: H - 0.42, w: W - 2 * M, h: 0.3, fontFace: BODY, fontSize: 9, align: "left" });
}

// circle "icon" badge with a glyph
function badge(s, x, y, glyph, fill) {
  s.addShape("ellipse", { x, y, w: 0.6, h: 0.6, fill: { color: fill || GREEN } });
  s.addText(glyph, { x, y, w: 0.6, h: 0.6, align: "center", valign: "middle",
    fontFace: MONO, bold: true, fontSize: 18, color: "FFFFFF" });
}
function card(s, x, y, w, h, fill) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.09, fill: { color: fill || CARD },
    line: { color: LINE, width: 1 } });
}

// =================== SLIDE 1 — TITLE (dark) ===================
let s = p.addSlide();
s.background = { color: DEEP };
s.addText("OBCO  ·  OWNED BRANDS  ·  BOARD DECISION BRIEF", { x: M, y: 0.7, w: W - 2 * M, h: 0.35,
  fontFace: MONO, fontSize: 13, color: LIME, charSpacing: 3 });
s.addText("Turn competitor sell-through into\nhigher-margin owned-brand revenue.", {
  x: M, y: 1.9, w: W - 2 * M, h: 2.4, fontFace: HEAD, bold: true, fontSize: 40, color: "FFFFFF",
  lineSpacingMultiple: 1.04, align: "left" });
s.addText("A vendor-side sales-intelligence and CRM platform inside OBCO — read-only from governed OBCO data, owning only Owned Brands activity.", {
  x: M, y: 4.35, w: 10.6, h: 0.9, fontFace: BODY, fontSize: 17, color: "D6E8DD", align: "left" });
// the loop motif
s.addShape("roundRect", { x: M, y: 5.5, w: W - 2 * M, h: 0.78, rectRadius: 0.1,
  fill: { color: "0B3020" }, line: { color: GREEN, width: 1 } });
s.addText([
  { text: "identify sell-through", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "cross to owned brand", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "quantify margin lift", options: { color: "FFFFFF" } },
  { text: "  →  ", options: { color: LIME, bold: true } },
  { text: "rep converts", options: { color: "FFFFFF" } },
], { x: M, y: 5.5, w: W - 2 * M, h: 0.78, align: "center", valign: "middle", fontFace: MONO, fontSize: 15 });
s.addText("Director, Owned Brands Sales (OB_Vend & OBCO)   ·   June 19, 2026   ·   Status: Discovery / prototype", {
  x: M, y: 6.7, w: W - 2 * M, h: 0.3, fontFace: BODY, fontSize: 11, color: "9DB6A8" });

// =================== SLIDE 2 — OPPORTUNITY ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The opportunity");
actionTitle(s, "Every competitor part our customers buy is owned-brand margin we can’t see");
const opp = [
  ["▲", "Higher margin, same shelf", "Owned-brand product carries materially higher margin than the competitor lines our customers buy today."],
  ["◎", "Every customer is a target", "Any OBCO customer buying competitor product we can cross is a conversion opportunity — not just OB_Vend AV."],
  ["∑", "Sized once we can see it", "Total addressable lift is quantified with the Data Office the moment sell-through access is granted."],
];
opp.forEach((c, i) => {
  const x = M + i * ((W - 2 * M - 0.6) / 3 + 0.3);
  const w = (W - 2 * M - 0.6) / 3;
  card(s, x, 2.35, w, 3.4);
  badge(s, x + 0.35, 2.7, c[0]);
  s.addText(c[1], { x: x + 0.3, y: 3.45, w: w - 0.6, h: 0.7, fontFace: HEAD, bold: true, fontSize: 16, color: INK });
  s.addText(c[2], { x: x + 0.3, y: 4.2, w: w - 0.6, h: 1.4, fontFace: BODY, fontSize: 14, color: GREY, lineSpacingMultiple: 1.05 });
});
s.addText("The platform’s job: find that sell-through at scale and route it to a rep.", {
  x: M, y: 6.0, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 2);

// =================== SLIDE 3 — PROBLEM ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The problem");
actionTitle(s, "Our own systems are blind to the vendor lens");
const colW = (W - 2 * M - 0.4) / 2;
card(s, M, 2.35, colW, 3.0, CARD);
card(s, M + colW + 0.4, 2.35, colW, 3.0, MIST);
s.addText("Distributor lens — CORE & USD", { x: M + 0.3, y: 2.55, w: colW - 0.6, h: 0.4, fontFace: HEAD, bold: true, fontSize: 16, color: GREY });
s.addText([
  { text: "Built for the distributor operating model", options: { bullet: { code: "2022" } } },
  { text: "Order, invoice, and channel transactions", options: { bullet: { code: "2022" } } },
  { text: "No view of brand sell-through or competitive conversion", options: { bullet: { code: "2022" } } },
  { text: "No vendor-side activity tracking", options: { bullet: { code: "2022" } } },
], { x: M + 0.3, y: 3.05, w: colW - 0.6, h: 2.1, fontFace: BODY, fontSize: 14, color: INK, lineSpacingMultiple: 1.15, paraSpaceAfter: 6 });
s.addText("Vendor lens — what Owned Brands needs", { x: M + colW + 0.7, y: 2.55, w: colW - 0.6, h: 0.4, fontFace: HEAD, bold: true, fontSize: 16, color: GREEN });
s.addText([
  { text: "Competitor sell-through, brand by brand", options: { bullet: { code: "2022" } } },
  { text: "Margin performance on every line", options: { bullet: { code: "2022" } } },
  { text: "SKU cross-reference to owned-brand equivalents", options: { bullet: { code: "2022" } } },
  { text: "Opportunities, quotes, and engagements tracked", options: { bullet: { code: "2022" } } },
], { x: M + colW + 0.7, y: 3.05, w: colW - 0.6, h: 2.1, fontFace: BODY, fontSize: 14, color: INK, lineSpacingMultiple: 1.15, paraSpaceAfter: 6 });
s.addText("Today the conversion pipeline lives in disconnected spreadsheets — invisible to leadership and impossible to scale.", {
  x: M, y: 5.65, w: W - 2 * M, h: 0.6, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 3);

// =================== SLIDE 4 — THE ENGINE / LOOP ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The engine — our north star");
actionTitle(s, "One loop converts competitor sell-through into margin");
const steps = [
  ["1", "Identify", "Competitor sell-through in the governed data"],
  ["2", "Cross", "Map the part to an owned-brand equivalent"],
  ["3", "Quantify", "Compute the margin lift of the switch"],
  ["4", "Convert", "Equip the rep with the target and the pitch"],
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
  { text: "The SKU is the spine ", options: { bold: true, color: INK } },
  { text: "— one detail view unifies sales, stock, opportunities, crosses, and activity. Two tiers run the model: the OBCO seller channel (enablement) and the end customer (demand).", options: { color: GREY } },
], { x: M, y: 5.55, w: W - 2 * M, h: 0.8, fontFace: BODY, fontSize: 15, lineSpacingMultiple: 1.1 });
pageNum(s, 4);

// =================== SLIDE 5 — CAPABILITIES ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "What you get");
actionTitle(s, "A vendor-side platform and CRM — already prototyped");
const caps = [
  ["⇄", "Cross-reference engine", "Competitor → owned-brand part mapping; living, searchable."],
  ["◎", "Conversion + supply", "Targets ranked by margin upside, paired with a stock signal."],
  ["☷", "Vendor-lens CRM", "Opportunities, quotes, calls, demos, hardware evals."],
  ["✉", "AI email-drop", "Rep emails a note → structured records; datasheet cross-extraction."],
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
s.addText("A working two-persona prototype (Leadership + Sales Team) already exists — this is proven UX, not a concept.", {
  x: M, y: 6.25, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 14, color: GREEN });
pageNum(s, 5);

// =================== SLIDE 6 — RISK HANDLED ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "Risk & governance");
actionTitle(s, "Read-only and in-tenant — zero risk to CORE or USD");
card(s, M, 2.35, colW, 3.4, "FBECEC");
s.addText("What we will NOT do", { x: M + 0.3, y: 2.55, w: colW - 0.6, h: 0.4, fontFace: HEAD, bold: true, fontSize: 16, color: "A6322B" });
s.addText([
  { text: "No write / update / delete to CORE, USD, or any system of record", options: { bullet: { code: "2715" } } },
  { text: "No direct production-database connectivity", options: { bullet: { code: "2715" } } },
  { text: "No duplication or ownership of OBCO data", options: { bullet: { code: "2715" } } },
  { text: "No data egress outside the Microsoft / Azure boundary", options: { bullet: { code: "2715" } } },
], { x: M + 0.3, y: 3.1, w: colW - 0.6, h: 2.4, fontFace: BODY, fontSize: 14, color: INK, lineSpacingMultiple: 1.15, paraSpaceAfter: 8 });
card(s, M + colW + 0.4, 2.35, colW, 3.4, MIST);
s.addText("How it’s governed", { x: M + colW + 0.7, y: 2.55, w: colW - 0.6, h: 0.4, fontFace: HEAD, bold: true, fontSize: 16, color: GREEN });
s.addText([
  { text: "Azure-native: App Service / Functions + isolated Azure SQL", options: { bullet: { code: "2713" } } },
  { text: "Entra ID SSO, application RBAC, territory row-level security", options: { bullet: { code: "2713" } } },
  { text: "Embedded certified Power BI — no dataset duplication", options: { bullet: { code: "2713" } } },
  { text: "Azure OpenAI in-tenant; margin/cost handled as Confidential", options: { bullet: { code: "2713" } } },
], { x: M + colW + 0.7, y: 3.1, w: colW - 0.6, h: 2.4, fontFace: BODY, fontSize: 14, color: INK, lineSpacingMultiple: 1.15, paraSpaceAfter: 8 });
s.addText("This complements Power BI and introduces no new system of record for OBCO data.", {
  x: M, y: 5.95, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 6);

// =================== SLIDE 7 — PLAN ===================
s = p.addSlide(); s.background = { color: PAPER };
kicker(s, "The plan");
actionTitle(s, "A phased build I can execute solo");
const ph = [
  ["0", "Now", "Scoping, prototype, access one-pager, systems discovery"],
  ["1", "Access", "Secure read-only approval; confirm mechanism with Data Office"],
  ["2", "Build", "Azure production — data layer, app DB, identity, Power BI"],
  ["3", "AI", "Email-drop, datasheet crosses, natural-language query"],
  ["4", "Rollout", "Team adoption, education & sales-plan outputs"],
];
const pw = (W - 2 * M - 4 * 0.4) / 5;
// connecting baseline
s.addShape("line", { x: M + pw / 2, y: 3.3, w: (W - 2 * M) - pw, h: 0, line: { color: LINE, width: 2 } });
ph.forEach((q, i) => {
  const x = M + i * (pw + 0.4);
  badge(s, x + pw / 2 - 0.3, 3.0, q[0], i === 0 ? LIME : GREEN);
  s.addText(q[1], { x, y: 3.75, w: pw, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 16, color: INK });
  s.addText(q[2], { x: x + 0.05, y: 4.2, w: pw - 0.1, h: 1.5, align: "center", fontFace: BODY, fontSize: 12.5, color: GREY, lineSpacingMultiple: 1.08 });
});
s.addText("Phased by design: each phase is independently valuable and lowers the risk of the next.", {
  x: M, y: 6.05, w: W - 2 * M, h: 0.4, fontFace: BODY, italic: true, fontSize: 15, color: GREEN });
pageNum(s, 7);

// =================== SLIDE 8 — THE ASK (dark, decision) ===================
s = p.addSlide(); s.background = { color: DEEP };
s.addText("THE ASK", { x: M, y: 0.55, w: W - 2 * M, h: 0.35, fontFace: MONO, fontSize: 13, color: LIME, charSpacing: 3 });
s.addText("Approve read-only access, an Azure environment, and governance liaisons", {
  x: M, y: 0.95, w: W - 2 * M, h: 1.0, fontFace: HEAD, bold: true, fontSize: 26, color: "FFFFFF", lineSpacingMultiple: 1.0 });
const asks = [
  ["1", "Read-only data access", "Governed OBCO sales data incl. margin/cost — via certified datasets, Power BI, or the API layer. Defined Owned Brands user group; sole user at launch, expandable."],
  ["2", "Azure build environment", "Subscription / resource group under OBCO governance, Entra ID app registration, Azure OpenAI in-tenant, and a Power BI workspace with certified-dataset read access."],
  ["3", "Governance liaisons", "Named contacts from Data Office, BI Governance, Cloud Engineering, and IT Security — plus confirmation of the access-request workflow and margin/cost classification."],
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
  { text: "writes to CORE/USD, direct DB connectivity, data duplication, or any egress.", options: { color: "B9D2C5" } },
], { x: M, y: 6.15, w: W - 2 * M, h: 0.4, fontFace: BODY, fontSize: 13 });
s.addText("Approve these and Owned Brands starts converting competitor sell-through into margin.", {
  x: M, y: 6.6, w: W - 2 * M, h: 0.5, fontFace: HEAD, bold: true, italic: true, fontSize: 15, color: "FFFFFF" });

const out = path.join(__dirname, "Owned_Brands_Board_Deck.pptx");
p.writeFile({ fileName: out }).then(() => console.log("wrote " + out));
