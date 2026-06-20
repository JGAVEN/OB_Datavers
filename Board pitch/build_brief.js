const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, Footer, PageNumber,
} = require("docx");

// ---- brand ----
const GREEN = "1B7F4B";      // margin / owned-brand win
const INK = "1A1A1A";
const GREY = "5A5A5A";
const RULE = "D9D9D9";
const LIGHT = "EAF4EE";      // pale green fill

const CONTENT_W = 9360;      // US Letter, 1" margins

const bullet = (children, ref = "bul", level = 0) =>
  new Paragraph({ numbering: { reference: ref, level }, spacing: { after: 18 }, children });
const t = (text, opts = {}) => new TextRun({ text, font: "Arial", ...opts });

const kicker = (text) =>
  new Paragraph({
    spacing: { before: 160, after: 40 },
    children: [t(text.toUpperCase(), { bold: true, size: 17, color: GREEN, characterSpacing: 20 })],
  });

const h2 = (text) =>
  new Paragraph({
    spacing: { before: 92, after: 24 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 2 } },
    children: [t(text, { bold: true, size: 21, color: INK })],
  });

const cell = (runs, { fill, w, bold } = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 42, bottom: 42, left: 110, right: 110 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      left: { style: BorderStyle.SINGLE, size: 1, color: RULE },
      right: { style: BorderStyle.SINGLE, size: 1, color: RULE },
    },
    children: [new Paragraph({ spacing: { after: 0 }, children: runs.map((r) =>
      typeof r === "string" ? t(r, { size: 17, bold }) : r) })],
  });

const twoColTable = (rows, w1, w2, headers) =>
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [w1, w2],
    rows: [
      ...(headers ? [new TableRow({ tableHeader: true, children: [
        cell([t(headers[0], { size: 17, bold: true, color: "FFFFFF" })], { fill: GREEN, w: w1 }),
        cell([t(headers[1], { size: 17, bold: true, color: "FFFFFF" })], { fill: GREEN, w: w2 }),
      ] })] : []),
      ...rows.map((r, i) => new TableRow({ children: [
        cell([t(r[0], { size: 17, bold: true })], { w: w1, fill: i % 2 ? "F5F5F5" : undefined }),
        cell([t(r[1], { size: 17 })], { w: w2, fill: i % 2 ? "F5F5F5" : undefined }),
      ] })),
    ],
  });

// =================== PAGE 1 ===================
const page1 = [
  new Paragraph({ spacing: { after: 0 }, children: [
    t("OWNED BRANDS SALES INTELLIGENCE PLATFORM", { bold: true, size: 26, color: INK }),
  ] }),
  new Paragraph({ spacing: { before: 20, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GREEN, space: 4 } },
    children: [t("Board Decision Brief", { size: 22, color: GREEN, bold: true })] }),
  new Paragraph({ spacing: { before: 60, after: 60 }, children: [
    t("Director, Owned Brands Sales (OB_Vend & OBCO)   ·   June 19, 2026   ·   Status: Discovery / prototype", { size: 16, color: GREY }),
  ] }),

  new Paragraph({ spacing: { before: 40, after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: GREEN, space: 8 } },
    children: [t("Turn competitor sell-through into higher-margin owned-brand revenue.", { bold: true, size: 24, color: INK })] }),

  kicker("The opportunity"),
  bullet([t("Every OBCO customer buying a competitor part we cross to an owned brand is a margin-conversion opportunity — and today we can’t see them.", { size: 18 })]),
  bullet([t("Owned Brands sells as a ", { size: 18 }), t("vendor", { size: 18, italics: true }), t(" inside a distributor. CORE and USD were built for the distributor; they don’t show vendor-side sell-through, competitive conversion, or margin.", { size: 18 })]),
  bullet([t("The conversion pipeline lives in disconnected spreadsheets. No system tracks it.", { size: 18 })]),

  kicker("The solution"),
  bullet([t("A parallel, vendor-side sales-intelligence and CRM platform inside OBCO — read-only from governed OBCO data, owning only net-new Owned Brands activity.", { size: 18 })]),

  kicker("The value loop — our north star"),
  new Paragraph({ spacing: { after: 80 }, alignment: AlignmentType.CENTER,
    shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
    children: [
      t("Identify competitor sell-through", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("cross to an owned-brand equivalent", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("quantify the margin lift", { size: 18, bold: true }),
      t("   →   ", { size: 18, color: GREEN, bold: true }),
      t("equip the rep to convert", { size: 18, bold: true }),
    ] }),

  kicker("What it does"),
  bullet([t("SKU cross-reference engine — competitor part → owned-brand equivalent, living and searchable.", { size: 18 })]),
  bullet([t("Conversion targets ranked by margin upside, paired with a supply signal.", { size: 18 })]),
  bullet([t("Vendor-lens CRM — opportunities, quotes-in-progress, calls, demos, and engagements.", { size: 18 })]),
  bullet([t("AI email-drop (rep emails a note → structured records), datasheet cross-extraction, and a natural-language leadership dashboard.", { size: 18 })]),
  bullet([t("Inventory overlay with a pipeline-weighted demand forecast.", { size: 18 })]),

  kicker("Why this is a low-risk yes"),
  bullet([t("Read-only toward CORE and USD — no writes, no data duplication, no egress.", { size: 18 })]),
  bullet([t("Azure-native: Entra ID SSO, RBAC + row-level security, embedded certified Power BI, Azure OpenAI in-tenant.", { size: 18 })]),

  new Paragraph({ spacing: { before: 150, after: 0 },
    shading: { fill: GREEN, type: ShadingType.CLEAR },
    children: [
      t("THE ASK   ", { bold: true, size: 18, color: "FFFFFF" }),
      t("Approve read-only access to governed OBCO sales data (incl. margin/cost) for a defined Owned Brands user group, provision the Azure build environment, and assign governance liaisons. Tooling and budget detail overleaf.", { size: 18, color: "FFFFFF" }),
    ] }),
];

// =================== PAGE 2 ===================
const page2 = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [
    t("DEEPER DIVE", { bold: true, size: 18, color: GREEN, characterSpacing: 20 }) ] }),
  new Paragraph({ spacing: { before: 0, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN, space: 3 } },
    children: [t("Owned Brands Sales Intelligence Platform — the case in one page", { bold: true, size: 22, color: INK })] }),

  h2("The prize: competitor sell-through is owned-brand revenue left on the table"),
  new Paragraph({ spacing: { after: 40 }, children: [t(
    "Owned-brand product carries materially higher margin than the competitor lines our customers buy today. Each competitor part with an owned-brand cross is revenue we can move up the margin curve — if we can find it. Total addressable lift is [quantify with Data Office once sell-through access is granted].",
    { size: 18 })] }),

  h2("Why our own systems can’t see it — the vendor blind spot"),
  new Paragraph({ spacing: { after: 40 }, children: [t(
    "CORE (ERP) and USD (CRM) serve the distributor operating model. Owned Brands operates as a vendor inside it and needs the lens those systems were never built to provide: brand sell-through, competitive conversion, margin, and the surrounding activity — opportunities, quotes, engagements. That gap is why the work lives in spreadsheets.",
    { size: 18 })] }),

  h2("How it works — one loop, two tiers, one spine"),
  bullet([t("Two tiers: ", { size: 18 }), t("the OBCO seller channel", { size: 18, bold: true }), t(" (enablement) and ", { size: 18 }), t("OBCO end customers", { size: 18, bold: true }), t(" (demand). Owned-brand selling runs through the channel and into the customer.", { size: 18 })]),
  bullet([t("The SKU is the spine: one detail view unifies sales, stock, opportunities, crosses, and activity — no siloed dashboards.", { size: 18 })]),
  bullet([t("Scope of conversion targets is ", { size: 18 }), t("all", { size: 18, bold: true }), t(" OBCO customers — anyone buying competitor product is a target. Platform users are Owned Brands only.", { size: 18 })]),

  h2("Capabilities"),
  twoColTable([
    ["Cross-reference engine", "Competitor → owned-brand part mapping; living, searchable, AI-extracted from datasheets."],
    ["Conversion + supply", "Targets ranked by margin upside; pipeline-weighted demand forecast surfaces a stock signal."],
    ["Vendor-lens CRM", "Opportunities, quotes-in-progress, calls, visits, demos, hardware evals — for sellers and customers."],
    ["AI layer", "Email-drop ingestion to structured records; natural-language leadership dashboard; in-tenant only."],
  ], 2600, 6760),

  h2("Architecture & governance"),
  bullet([t("Hosting: Azure-native (App Service / Functions; Azure SQL for the isolated app database).", { size: 18 })]),
  bullet([t("Identity & access: Entra ID SSO, application RBAC, territory row-level security mirroring Power BI RLS — margin/cost confined to the authorized group.", { size: 18 })]),
  bullet([t("Reporting & AI: embedded certified Power BI (no dataset duplication); Azure OpenAI within the Microsoft boundary; sales and margin/cost handled as Confidential.", { size: 18 })]),

  h2("Risk boundaries — what we are NOT doing"),
  new Paragraph({ spacing: { after: 30 }, children: [
    t("No write/update/delete to CORE, USD, or any system of record   ·   no direct production-DB connectivity   ·   no duplication or ownership of OBCO data   ·   no egress outside the Microsoft / Azure boundary.", { size: 18 }),
  ]}),

  h2("Roadmap"),
  twoColTable([
    ["Phase 0 — now", "Scoping, prototype wireframe, access one-pager, systems discovery (in progress)."],
    ["Phase 1", "Secure read-only access approval; confirm mechanism with the Data Office."],
    ["Phase 2", "Build production on Azure — data-access layer, app DB, identity, embedded Power BI."],
    ["Phase 3 → 4", "AI layer (email-drop, datasheet crosses, NL query); rollout, education & sales-plan outputs."],
  ], 2600, 6760),

  h2("The Ask"),
  bullet([t("Read-only data access — ", { size: 18, bold: true }), t("via governed datasets, certified Power BI, or the API layer: sales incl. margin/cost, open orders & backlog, quotes/bids, account/contact/SKU master, inventory. Sole user at launch: the Director, Owned Brands Sales (expandable).", { size: 18 })]),
  bullet([t("Azure environment — ", { size: 18, bold: true }), t("subscription/resource group under OBCO governance; Entra ID app registration; Azure OpenAI in-tenant; Power BI workspace + certified-dataset read access.", { size: 18 })]),
  bullet([t("Governance liaisons — ", { size: 18, bold: true }), t("named contacts from Data Office, BI Governance, Cloud Engineering, and IT Security; confirmation of the access workflow and margin/cost classification.", { size: 18 })]),
  bullet([t("Developer tooling & hardware — ", { size: 18, bold: true }), t("one MacBook Pro (or equivalent) as the primary dev workstation; standard dev licensing; incremental Azure consumption budget for the build phase, est. [confirm]/month during Phases 2–4.", { size: 18 })]),
  new Paragraph({ spacing: { before: 30 }, children: [t("Execution is solo — the Director builds and operates the platform; no additional headcount requested.", { size: 16, italics: true, color: GREY })] }),
];

const doc = new Document({
  creator: "Owned Brands Sales",
  title: "Owned Brands Sales Intelligence Platform — Board Decision Brief",
  styles: { default: { document: { run: { font: "Arial", size: 18, color: INK } } } },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "■", alignment: AlignmentType.LEFT,
      style: { run: { color: GREEN }, paragraph: { indent: { left: 360, hanging: 200 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      t("Owned Brands Sales Intelligence Platform · Board Decision Brief · Confidential — Internal · ", { size: 14, color: GREY }),
      new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 14, color: GREY }),
      t(" of ", { size: 14, color: GREY }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 14, color: GREY }),
    ] })] }) },
    children: [...page1, ...page2],
  }],
});

const out = path.join(__dirname, "Owned_Brands_Board_Brief.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote " + out); });
