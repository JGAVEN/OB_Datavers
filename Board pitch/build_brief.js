const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, Footer, PageNumber,
} = require("docx");

// ---- brand ----
const GREEN = "1B7F4B";
const INK = "1A1A1A";
const GREY = "5A5A5A";
const RULE = "D9D9D9";
const LIGHT = "EAF4EE";

const CONTENT_W = 9360;

const bullet = (children, ref = "bul", level = 0) =>
  new Paragraph({ numbering: { reference: ref, level }, spacing: { after: 18 }, children });
const t = (text, opts = {}) => new TextRun({ text, font: "Arial", ...opts });

const kicker = (text) =>
  new Paragraph({
    spacing: { before: 150, after: 40 },
    children: [t(text.toUpperCase(), { bold: true, size: 17, color: GREEN, characterSpacing: 20 })],
  });

const h2 = (text) =>
  new Paragraph({
    spacing: { before: 88, after: 22 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 2 } },
    children: [t(text, { bold: true, size: 21, color: INK })],
  });

const cell = (runs, { fill, w, bold } = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 40, bottom: 40, left: 110, right: 110 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      left: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      right: { style: BorderStyle.SINGLE, size: 1, color: RULE },
    },
    children: [new Paragraph({ spacing: { after: 0 }, children: runs.map((r) =>
      typeof r === "string" ? t(r, { size: 17, bold }) : r) })],
  });

const twoColTable = (rows, w1, w2) =>
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [w1, w2],
    rows: rows.map((r, i) => new TableRow({ children: [
      cell([t(r[0], { size: 17, bold: true })], { w: w1, fill: i % 2 ? "F5F5F5" : undefined }),
      cell([t(r[1], { size: 17 })], { w: w2, fill: i % 2 ? "F5F5F5" : undefined }),
    ] })),
  });

// =================== PAGE 1 ===================
const page1 = [
  new Paragraph({ spacing: { after: 0 }, children: [
    t("OWNED BRANDS SALES INTELLIGENCE PLATFORM", { bold: true, size: 26, color: INK }),
  ] }),
  new Paragraph({ spacing: { before: 20, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GREEN, space: 4 } },
    children: [t("Owned Brands Datavers Brief", { size: 22, color: GREEN, bold: true })] }),
  new Paragraph({ spacing: { before: 60, after: 60 }, children: [
    t("Jeff Goodman   ·   Director, Sales, Owned Brands   ·   June 19, 2026   ·   Status: Discovery / prototype", { size: 16, color: GREY }),
  ] }),

  new Paragraph({ spacing: { before: 40, after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: GREEN, space: 8 } },
    children: [t("Give the Owned Brands team the signals to help WCO sellers win deals and hold margin.", { bold: true, size: 24, color: INK })] }),

  kicker("Who we are, and what’s missing"),
  bullet([t("The Owned Brands (OB) sales team is WCO’s owned-brands ", { size: 18 }), t("vendor", { size: 18, italics: true }), t(" team. Our job is to call on WCO sellers and select WCO customers and help them win.", { size: 18 })]),
  bullet([t("Stronger signals would put us in the right place at the right time: which sellers are about to lose a deal they could win, and where competitive pressure or missing national-brand support is eroding margin.", { size: 18 })]),
  bullet([t("WCO’s systems (CORE, USD) are built for the distributor, not the vendor lens. Tools built specifically for OB will lift win rate and margin organization-wide.", { size: 18 })]),

  kicker("The solution"),
  bullet([t("A read-only, vendor-side intelligence and activity platform inside WCO. It surfaces the signals and tracks our engagement, so we show up at the right time with the right pitch.", { size: 18 })]),

  kicker("The value loop, our north star"),
  new Paragraph({ spacing: { after: 80 }, alignment: AlignmentType.CENTER,
    shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
    children: [
      t("Surface the signal", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("reach the right WCO seller / customer", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("help win the deal & hold margin", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("growth", { size: 18, bold: true }),
    ] }),

  kicker("What it does"),
  bullet([t("Competitive product cross database: competitor part → owned-brand equivalent, living and searchable. Built for OB sales-team enablement, not org-wide access.", { size: 18 })]),
  bullet([t("Signals that rank where to show up: deals at risk, margin under pressure, conversion openings.", { size: 18 })]),
  bullet([t("Vendor-lens CRM: OB-generated opportunities, quotes, calls, visits, demos. The WCO seller is our customer, and engagement with a WCO seller isn’t tracked in USD.", { size: 18 })]),
  bullet([t("AI email-drop (a note → structured records), datasheet cross-extraction, opportunity-loss tracking, product-development signals, and a natural-language leadership dashboard.", { size: 18 })]),
  bullet([t("Inventory overlay with a pipeline-weighted demand forecast.", { size: 18 })]),

  kicker("Why this is a low-risk yes"),
  bullet([t("Read-only toward CORE and USD: no writes, no data duplication, no egress.", { size: 18 })]),
  bullet([t("Azure-native: Entra ID SSO, RBAC + row-level security, embedded certified Power BI, Azure OpenAI in-tenant.", { size: 18 })]),

  new Paragraph({ spacing: { before: 130, after: 0 },
    shading: { fill: GREEN, type: ShadingType.CLEAR },
    children: [
      t("THE ASK   ", { bold: true, size: 18, color: "FFFFFF" }),
      t("Approve read-only access to governed WCO sales data (incl. margin/cost) for the Owned Brands sales team only, with no access outside OB. Provision the Azure build environment and assign governance liaisons. Tooling and budget detail overleaf.", { size: 18, color: "FFFFFF" }),
    ] }),
];

// =================== PAGE 2 ===================
const page2 = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [
    t("DEEPER DIVE", { bold: true, size: 18, color: GREEN, characterSpacing: 20 }) ] }),
  new Paragraph({ spacing: { before: 0, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN, space: 3 } },
    children: [t("Owned Brands Sales Intelligence Platform: the case in one page", { bold: true, size: 22, color: INK })] }),

  h2("What’s missing: the signals to be the resource our sellers need"),
  new Paragraph({ spacing: { after: 40 }, children: [t(
    "The Owned Brands team doesn’t currently receive the signals that identify sellers who need help winning deals they’d otherwise lose, or who are losing margin to competitive pressure or a lack of national-brand support. We can’t be the best version of the resource we’re meant to be without better visibility into the data.",
    { size: 18 })] }),
  new Paragraph({ spacing: { after: 40 }, children: [t(
    "We are WCO’s owned-brands vendor team, and our job is to call on WCO sellers and WCO customers. The better our data, the better we identify the signals that put us in the right place at the right time, and the more we lift win rate and margin organization-wide.",
    { size: 18 })] }),

  h2("Why our own systems can’t see it: the vendor blind spot"),
  new Paragraph({ spacing: { after: 40 }, children: [t(
    "Our internal systems serve the distributor operating model. Owned Brands operates as a vendor inside a distributor and needs the lens those systems weren’t built to provide. The WCO seller is effectively our customer, yet engagement with a WCO seller isn’t tracked in USD.",
    { size: 18 })] }),

  h2("How it works: two tiers, one spine"),
  bullet([t("Two tiers: ", { size: 18 }), t("the WCO seller channel", { size: 18, bold: true }), t(" (push) and ", { size: 18 }), t("WCO customers", { size: 18, bold: true }), t(" (pull).", { size: 18 })]),
  bullet([t("The SKU is the spine: one detail view unifies sales, stock, opportunities, crosses, and activity.", { size: 18 })]),
  bullet([t("Scope of engagements: ", { size: 18 }), t("WCO sellers and select WCO customers", { size: 18, bold: true }), t(", in collaboration with the WCO seller.", { size: 18 })]),

  h2("Capabilities"),
  twoColTable([
    ["Competitive product cross database", "Competitor part → owned-brand mapping; living, searchable, AI-extracted from datasheets. For OB enablement, not org-wide access."],
    ["Signals + supply", "Where to show up: deals at risk and margin under pressure; pipeline-weighted demand forecast surfaces a stock signal."],
    ["Vendor-lens CRM", "OB-generated opportunities, quotes, calls, visits, demos, hardware evals; tracks OB engagement with WCO sellers and customers (not captured in USD)."],
    ["AI layer", "Email-drop to structured records; opportunity-loss tracking; product-development signals; natural-language leadership dashboard; in-tenant only."],
  ], 2600, 6760),

  h2("Architecture & governance"),
  bullet([t("Hosting: Azure-native (App Service / Functions; Azure SQL for the isolated app database).", { size: 18 })]),
  bullet([t("Identity & access: Entra ID SSO, application RBAC, territory row-level security mirroring Power BI RLS. Margin/cost confined to the authorized OB group.", { size: 18 })]),
  bullet([t("Reporting & AI: embedded certified Power BI (no dataset duplication); Azure OpenAI within the Microsoft boundary; sales and margin/cost handled as Confidential.", { size: 18 })]),

  h2("Risk boundaries: what we are NOT doing"),
  new Paragraph({ spacing: { after: 30 }, children: [
    t("No write/update/delete to CORE, USD, or any system of record   ·   no direct production-DB connectivity   ·   no duplication or ownership of WCO data   ·   no access outside the OB sales team   ·   no egress outside the Microsoft / Azure boundary.", { size: 18 }),
  ]}),

  h2("Roadmap"),
  twoColTable([
    ["Phase 0 (now)", "Scoping, prototype wireframe, access one-pager, systems discovery (in progress)."],
    ["Phase 1", "Secure read-only access approval; confirm mechanism with the Data Office."],
    ["Phase 2", "Build production on Azure: data-access layer, app DB, identity, embedded Power BI."],
    ["Phase 3 → 4", "AI layer (email-drop, datasheet crosses, NL query); rollout, education & sales-plan outputs."],
  ], 2600, 6760),

  h2("The Ask"),
  bullet([t("Read-only data access: ", { size: 18, bold: true }), t("via governed datasets, certified Power BI, or the API layer (sales incl. margin/cost, open orders & backlog, quotes/bids, account/contact/SKU master, inventory). Defined user group: the Owned Brands sales team only, with no access outside OB.", { size: 18 })]),
  bullet([t("Azure environment: ", { size: 18, bold: true }), t("subscription/resource group under WCO governance; Entra ID app registration; Azure OpenAI in-tenant; Power BI workspace + certified-dataset read access.", { size: 18 })]),
  bullet([t("Governance liaisons: ", { size: 18, bold: true }), t("named contacts from Data Office, BI Governance, Cloud Engineering, and IT Security; confirmation of the access workflow and margin/cost classification.", { size: 18 })]),
  bullet([t("Developer tooling & hardware: ", { size: 18, bold: true }), t("one MacBook Pro (or equivalent) as the primary dev workstation; standard dev licensing; incremental Azure consumption budget for the build phase, TBD with Cloud Engineering.", { size: 18 })]),
  new Paragraph({ spacing: { before: 30 }, children: [t("Execution is solo: I build and operate the platform as the sole developer; no additional headcount requested.", { size: 16, italics: true, color: GREY })] }),
];

const doc = new Document({
  creator: "Owned Brands Sales",
  title: "Owned Brands Datavers Brief",
  styles: { default: { document: { run: { font: "Arial", size: 18, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "■", alignment: AlignmentType.LEFT,
      style: { run: { color: GREEN }, paragraph: { indent: { left: 360, hanging: 200 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      t("Owned Brands Datavers Brief · Confidential / Internal · ", { size: 14, color: GREY }),
      new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: GREY }),
      t(" of ", { size: 14, color: GREY }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 14, color: GREY }),
    ] })] }) },
    children: [...page1, ...page2],
  }],
});

const out = path.join(__dirname, "Owned_Brands_Board_Brief.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote " + out); });
