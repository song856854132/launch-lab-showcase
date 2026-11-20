#!/usr/bin/env node
/**
 * Launch Lab showcase deck builder.
 *
 *   node build_deck.js spec.json out.pptx
 *
 * Turns a JSON deck spec into a .pptx in the NU Launch Labs visual system:
 * black header band, red rule, red letter-spaced eyebrows, heavy black
 * headlines, light-grey cards with a red top edge, red diamond bullets,
 * red call-to-action bar, "BUILD ◆ GROW ◆ CONNECT" footer.
 *
 * The slide types and their fields are documented in
 * references/design-system.md. Unknown types throw, so a typo fails loudly.
 */
const fs = require("fs");
const path = require("path");
let pptxgen;
try { pptxgen = require("pptxgenjs"); }
catch (e) { console.error("pptxgenjs missing: run `npm install pptxgenjs`"); process.exit(1); }

// ---------- brand tokens (sampled from the Launch Labs email) ----------
const C = {
  black: "0E0C0D",
  red: "B82B35",
  card: "F7F7F9",
  text: "3A393D",
  muted: "6E6D73",
  line: "D9D8DD",
  white: "FFFFFF",
};
const FONT = "Arial";
const W = 13.333, H = 7.5, MX = 0.6; // canvas + side margin
const CW = W - 2 * MX;                // content width

// ---------- helpers ----------
function estLines(text, widthIn, pt) {
  const cpl = Math.max(8, Math.floor((widthIn * 72) / (pt * 0.52)));
  return String(text || "").split("\n").reduce((n, para) => n + Math.max(1, Math.ceil(para.length / cpl)), 0);
}
function textH(text, widthIn, pt, lineH = 1.22) {
  return (estLines(text, widthIn, pt) * pt * lineH) / 72;
}
function fitPt(text, widthIn, maxH, startPt, minPt) {
  let pt = startPt;
  while (pt > minPt && textH(text, widthIn, pt) > maxH) pt -= 1;
  return pt;
}
function T(slide, text, o) {
  slide.addText(text, Object.assign({ fontFace: FONT, color: C.text, margin: 0, isTextBox: true, valign: "top" }, o));
}
function diamond(pres, slide, x, y, s = 0.13, color = C.red) {
  slide.addShape(pres.shapes.DIAMOND, { x, y, w: s, h: s, fill: { color }, line: { color, width: 0 } });
}
function cardBox(pres, slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: opts.fill || C.card }, line: { color: opts.fill || C.card, width: 0 } });
  if (opts.topRule !== false) {
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.07, fill: { color: opts.ruleColor || C.red }, line: { color: opts.ruleColor || C.red, width: 0 } });
  }
}
function exists(p) { try { return p && fs.existsSync(p); } catch (e) { return false; } }

// ---------- slide layouts ----------
// The frame (header band, red rule, logo, footer, slide number) lives on PowerPoint
// slide layouts, so anyone editing by hand gets it from Home > New Slide.
const L = { cover: "LL Cover", closing: "LL Closing", content: "LL Title Only", bullets: "LL Title and Content", statement: "LL Statement", demo: "LL Demo" };

function logoObjs(meta, box, big) {
  if (exists(meta.logo)) return [{ image: { path: meta.logo, x: box.x, y: box.y, w: box.w, h: box.h, sizing: { type: "contain", w: box.w, h: box.h } } }];
  // Text wordmark until the official logo file is dropped into assets/.
  // Layout text can't mix colors in one box, so "NU" and "LAUNCH LABS" are two boxes.
  const o = { y: box.y, h: box.h, fontFace: FONT, fontSize: big ? 26 : 12, bold: true, charSpacing: big ? 4 : 2, valign: "middle", margin: 0, align: "left" };
  const nuW = big ? 0.8 : 0.36, restW = big ? 3.3 : 1.6;
  const x0 = big ? box.x + (box.w - nuW - restW) / 2 : box.x;
  return [
    { text: { text: "NU", options: Object.assign({}, o, { x: x0, w: nuW, color: C.white }) } },
    { text: { text: "LAUNCH LABS", options: Object.assign({}, o, { x: x0 + nuW, w: restW, color: C.red }) } },
  ];
}
const rect = (x, y, w, h, color) => ({ rect: { x, y, w, h, fill: { color }, line: { color, width: 0 } } });
const txt = (text, o) => ({ text: { text, options: Object.assign({ fontFace: FONT, margin: 0, valign: "top" }, o) } });
const ph = (name, type, text, o) => ({ placeholder: { options: Object.assign({ name, type, fontFace: FONT, margin: 0, valign: "top" }, o), text } });
const EYEBROW = { fontSize: 12, bold: true, color: C.red, charSpacing: 3 };
const motto = txt("BUILD  ◆  GROW  ◆  CONNECT", { x: 0, y: 6.75, w: W, h: 0.3, fontSize: 12, bold: true, color: C.red, charSpacing: 4, align: "center" });

function defineLayouts(pres, meta) {
  const header = [
    rect(0, 0, W, 0.62, C.black), rect(0, 0.62, W, 0.07, C.red),
    ...logoObjs(meta, { x: MX, y: 0.11, w: 2.6, h: 0.4 }, false),
    txt(meta.event || "Launch Lab Showcase", { x: W - MX - 5, y: 0.11, w: 5, h: 0.4, fontSize: 11, color: "A9A8AE", align: "right", valign: "middle" }),
    txt(meta.team || "", { x: MX, y: H - 0.42, w: 6, h: 0.25, fontSize: 10, color: C.muted }),
  ];
  const num = (color) => ({ x: W - MX - 0.6, y: H - 0.47, w: 0.6, h: 0.3, color, fontFace: FONT, fontSize: 10, align: "right" });
  const eyebrowPh = ph("eyebrow", "body", "SECTION LABEL", Object.assign({ x: MX, y: 0.98, w: CW, h: 0.3, align: "left" }, EYEBROW));
  const titlePh = ph("title", "title", "Slide title that states the point", { x: MX, y: 1.3, w: CW, h: 0.95, fontSize: 28, bold: true, color: C.black, align: "left", valign: "middle" });

  pres.defineSlideMaster({ title: L.content, background: { color: C.white }, objects: [...header, eyebrowPh, titlePh], slideNumber: num(C.muted) });
  pres.defineSlideMaster({ title: L.bullets, background: { color: C.white }, slideNumber: num(C.muted), objects: [...header, eyebrowPh, titlePh,
    ph("body", "body", "Point one\nPoint two\nPoint three", { x: MX, y: 2.45, w: CW, h: 4.3, fontSize: 20, color: C.text, align: "left", bullet: { code: "25C6", indent: 22 }, paraSpaceAfter: 10 })] });
  pres.defineSlideMaster({ title: L.statement, background: { color: C.white }, slideNumber: num(C.muted), objects: [...header,
    ph("eyebrow", "body", "SECTION LABEL", Object.assign({ x: MX, y: 1.5, w: CW, h: 0.35, align: "center" }, EYEBROW, { fontSize: 14 })),
    ph("title", "title", "One big sentence: the problem or the research question", { x: MX + 0.75, y: 2.0, w: CW - 1.5, h: 2.3, fontSize: 38, bold: true, color: C.black, align: "center", valign: "middle" }),
    ph("body", "body", "One or two sentences of evidence: who, how many, how we know", { x: MX + 1.5, y: 4.55, w: CW - 3, h: 1.6, fontSize: 18, color: C.text, align: "center" })] });
  pres.defineSlideMaster({ title: L.cover, background: { color: C.white }, objects: [
    rect(0, 0, W, 2.5, C.black), rect(0, 2.5, W, 0.1, C.red), ...logoObjs(meta, { x: W / 2 - 3, y: 0.65, w: 6, h: 1.2 }, true), motto,
    ph("eyebrow", "body", "TRACK ONE · INNOVATION TEAM", Object.assign({ x: MX, y: 2.95, w: CW, h: 0.35, align: "center" }, EYEBROW, { fontSize: 15, charSpacing: 4 })),
    ph("title", "title", "Project name", { x: MX + 0.5, y: 3.35, w: CW - 1, h: 1.35, fontSize: 46, bold: true, color: C.black, align: "center", valign: "middle" }),
    ph("subtitle", "body", "One literal sentence: what it does, for whom", { x: MX + 1.2, y: 4.8, w: CW - 2.4, h: 0.9, fontSize: 20, color: C.text, align: "center" }),
    ph("byline", "body", "Names · Semester", { x: MX, y: 5.85, w: CW, h: 0.4, fontSize: 14, color: C.muted, align: "center" })] });
  pres.defineSlideMaster({ title: L.closing, background: { color: C.white }, objects: [
    rect(0, 0, W, 2.0, C.black), rect(0, 2.0, W, 0.1, C.red), ...logoObjs(meta, { x: W / 2 - 3, y: 0.4, w: 6, h: 1.2 }, true), motto,
    ph("eyebrow", "body", "NEXT SEMESTER", Object.assign({ x: MX, y: 2.4, w: CW, h: 0.35, align: "center" }, EYEBROW, { fontSize: 14, charSpacing: 4 })),
    ph("title", "title", "What happens next", { x: MX + 0.5, y: 2.75, w: CW - 1, h: 1.15, fontSize: 40, bold: true, color: C.black, align: "center", valign: "middle" }),
    ph("body", "body", "Continue, pivot, or stop, and what you need", { x: MX + 1.5, y: 3.95, w: CW - 3, h: 0.75, fontSize: 18, color: C.text, align: "center" })] });
  pres.defineSlideMaster({ title: L.demo, background: { color: C.black }, slideNumber: num("8A898F"), objects: [
    rect(0, H - 0.1, W, 0.1, C.red),
    txt(meta.team || "", { x: MX, y: H - 0.45, w: 6, h: 0.25, fontSize: 10, color: "8A898F" }),
    ph("eyebrow", "body", "LIVE DEMO", Object.assign({ x: MX, y: 0.7, w: CW, h: 0.35, align: "left" }, EYEBROW, { fontSize: 14, charSpacing: 4 })),
    ph("title", "title", "The scenario you will show", { x: MX, y: 1.1, w: CW, h: 0.95, fontSize: 34, bold: true, color: C.white, align: "left", valign: "middle" })] });
}

// Fill a layout's eyebrow + title placeholders.
function heads(slide, s, upper = true) {
  if (s.eyebrow) slide.addText(upper ? String(s.eyebrow).toUpperCase() : s.eyebrow, { placeholder: "eyebrow" });
  if (s.title) slide.addText(s.title, { placeholder: "title" });
}
function contentFrame(pres, slide, meta, s) {
  heads(slide, s);
  return { top: 2.4, bottom: H - 0.65 };
}

// Diamond bullet list; returns the y after the list.
function bulletList(pres, slide, items, x, y, w, maxBottom, pt = 18) {
  const gap = 0.16;
  // shrink font until the list fits
  let size = pt;
  const total = (p) => items.reduce((acc, it) => acc + textH(it, w - 0.35, p) + gap, 0);
  while (size > 14 && y + total(size) > maxBottom) size -= 1;
  let cy = y;
  items.forEach((it) => {
    const h = textH(it, w - 0.35, size);
    diamond(pres, slide, x, cy + (size / 72) * 0.42, 0.14);
    T(slide, it, { x: x + 0.35, y: cy, w: w - 0.35, h, fontSize: size, color: C.text });
    cy += h + gap;
  });
  return cy;
}

// ---------- slide renderers ----------
const R = {};

R.cover = (pres, slide, meta, s) => {
  heads(slide, s);
  if (s.subtitle) slide.addText(s.subtitle, { placeholder: "subtitle" });
  if (s.byline) slide.addText(s.byline, { placeholder: "byline" });
};
R.cover.layout = L.cover;

R.statement = (pres, slide, meta, s) => {
  heads(slide, s);
  if (s.body) slide.addText(s.body, { placeholder: "body" });
};
R.statement.layout = L.statement;

R.bullets = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const hasAside = !!s.aside;
  const listW = hasAside ? CW * 0.58 : CW;
  bulletList(pres, slide, s.bullets || [], MX, f.top + 0.1, listW, f.bottom, 20);
  if (hasAside) {
    const ax = MX + listW + 0.5, aw = CW - listW - 0.5;
    const ah = Math.min(f.bottom - f.top, Math.max(2.4, measureCard(s.aside, aw - 0.7)));
    cardBox(pres, slide, ax, f.top, aw, ah);
    renderCardText(pres, slide, s.aside, ax + 0.35, f.top + 0.35, aw - 0.7, f.top + ah - 0.3);
  }
};

function renderCardText(pres, slide, c, x, y, w, maxBottom) {
  let cy = y;
  if (c.eyebrow) { T(slide, c.eyebrow.toUpperCase(), { x, y: cy, w, h: 0.28, fontSize: 11, bold: true, color: C.red, charSpacing: 3 }); cy += 0.38; }
  if (c.title) {
    const pt = fitPt(c.title, w, 0.9, 22, 16);
    const h = textH(c.title, w, pt);
    T(slide, c.title, { x, y: cy, w, h, fontSize: pt, bold: true, color: C.black });
    cy += h + 0.15;
  }
  if (c.body) {
    const room = maxBottom - cy - (c.bullets ? 0.6 * c.bullets.length : 0);
    const pt = fitPt(c.body, w, Math.max(0.5, room), 17, 13);
    const h = textH(c.body, w, pt);
    T(slide, c.body, { x, y: cy, w, h, fontSize: pt, color: C.text });
    cy += h + 0.15;
  }
  if (c.bullets && c.bullets.length) cy = bulletList(pres, slide, c.bullets, x, cy, w, maxBottom, 16);
  return cy;
}

// Rough content height of a card, so cards shrink to fit instead of leaving empty grey.
function measureCard(c, w) {
  let h = 0.35 + 0.3;
  if (c.eyebrow) h += 0.38;
  if (c.title) h += textH(c.title, w, 22) + 0.15;
  if (c.body) h += textH(c.body, w, 17) + 0.15;
  (c.bullets || []).forEach((t) => { h += textH(t, w - 0.35, 16) + 0.16; });
  return h;
}

R.cards = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  let top = f.top;
  if (s.intro) {
    const h = textH(s.intro, CW, 16);
    T(slide, s.intro, { x: MX, y: top - 0.1, w: CW, h, fontSize: 16, color: C.text });
    top += h + 0.15;
  }
  const n = (s.cards || []).length;
  if (n < 1 || n > 4) throw new Error("cards: give 1-4 cards");
  const gap = 0.3, w = (CW - gap * (n - 1)) / n;
  const h = Math.min(f.bottom - top, Math.max(2.6, ...s.cards.map((c) => measureCard(c, w - 0.6))));
  s.cards.forEach((c, i) => {
    const x = MX + i * (w + gap);
    cardBox(pres, slide, x, top, w, h, { ruleColor: c.muted ? C.line : C.red });
    renderCardText(pres, slide, c, x + 0.3, top + 0.35, w - 0.6, top + h - 0.25);
  });
};

R.compare = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const gap = 0.4, w = (CW - gap) / 2;
  const need = Math.max(...[s.left, s.right].map((c) => measureCard({ eyebrow: c.label, title: c.title, bullets: c.points, body: c.body }, w - 0.7)));
  const bottom = Math.min(s.verdict ? f.bottom - 0.75 : f.bottom, f.top + Math.max(2.6, need));
  [s.left, s.right].forEach((c, i) => {
    const x = MX + i * (w + gap);
    cardBox(pres, slide, x, f.top, w, bottom - f.top, { ruleColor: i === 1 ? C.red : C.line });
    renderCardText(pres, slide, { eyebrow: c.label, title: c.title, bullets: c.points, body: c.body }, x + 0.35, f.top + 0.35, w - 0.7, bottom - 0.25);
  });
  if (s.verdict) {
    diamond(pres, slide, MX, bottom + 0.33, 0.16);
    T(slide, s.verdict, { x: MX + 0.4, y: bottom + 0.2, w: CW - 0.4, h: 0.5, fontSize: fitPt(s.verdict, CW - 0.4, 0.5, 17, 13), bold: true, color: C.black, valign: "middle" });
  }
};

R.architecture = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const layers = s.layers || [];
  if (!layers.length) throw new Error("architecture: needs layers");
  const labelW = 1.7, gx = 0.25, arrowGap = 0.32;
  const legendH = 0.35, capH = s.caption ? 0.4 : 0;
  const avail = f.bottom - f.top - legendH - capH;
  const rowH = (avail - arrowGap * (layers.length - 1)) / layers.length;
  layers.forEach((L, r) => {
    const y = f.top + r * (rowH + arrowGap);
    T(slide, (L.label || "").toUpperCase(), { x: MX, y, w: labelW - 0.15, h: rowH, fontSize: 11, bold: true, color: C.red, charSpacing: 2, valign: "middle" });
    const nodes = L.nodes || [];
    const nw = (CW - labelW - gx * (nodes.length - 1)) / nodes.length;
    nodes.forEach((nd, i) => {
      const x = MX + labelW + i * (nw + gx);
      const st = nd.status || "built";
      const fill = st === "built" ? C.black : st === "partial" ? C.card : C.white;
      const line = st === "stub" ? { color: "9C9BA1", width: 1.25, dashType: "dash" } : { color: fill, width: 0 };
      slide.addShape(pres.shapes.RECTANGLE, { x, y, w: nw, h: rowH, fill: { color: fill }, line });
      if (st === "partial") slide.addShape(pres.shapes.RECTANGLE, { x, y, w: nw, h: 0.06, fill: { color: C.red }, line: { color: C.red, width: 0 } });
      const fg = st === "built" ? C.white : st === "partial" ? C.black : C.muted;
      const runs = [{ text: nd.name, options: { bold: true, fontSize: fitPt(nd.name, nw - 0.3, 0.45, 15, 11), color: fg, breakLine: !!nd.detail } }];
      if (nd.detail) runs.push({ text: nd.detail, options: { fontSize: fitPt(nd.detail, nw - 0.3, Math.max(0.3, rowH - 0.55), 12, 9), color: st === "built" ? "CFCED3" : C.muted } });
      T(slide, runs, { x: x + 0.15, y: y + 0.08, w: nw - 0.3, h: rowH - 0.16, valign: "middle", align: "center" });
    });
    if (r < layers.length - 1) {
      const ax = MX + 0.35;
      slide.addShape(pres.shapes.DOWN_ARROW, { x: ax, y: y + rowH + 0.04, w: 0.24, h: arrowGap - 0.08, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    }
  });
  // legend
  const ly = f.bottom - legendH - capH + 0.08;
  const items = [["built", "Working"], ["partial", "Partial"], ["stub", "Stubbed / planned"]];
  let lx = W - MX - 6.2;
  items.forEach(([st, lbl]) => {
    const fill = st === "built" ? C.black : st === "partial" ? C.card : C.white;
    const line = st === "stub" ? { color: "9C9BA1", width: 1, dashType: "dash" } : { color: st === "partial" ? C.red : fill, width: 1 };
    slide.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + 0.04, w: 0.3, h: 0.2, fill: { color: fill }, line });
    T(slide, lbl, { x: lx + 0.4, y: ly, w: 1.6, h: 0.28, fontSize: 11, color: C.muted, valign: "middle" });
    lx += 2.05;
  });
  if (s.caption) T(slide, s.caption, { x: MX, y: f.bottom - capH + 0.05, w: CW, h: capH, fontSize: 12, color: C.muted, italic: true });
};

R.demo = (pres, slide, meta, s) => {
  heads(slide, Object.assign({ eyebrow: "Live demo" }, s));
  const steps = s.steps || [];
  const fbH = s.fallback ? 0.95 : 0;
  const top = 2.35, bottom = H - 0.6 - fbH;
  const sh = Math.min(0.85, (bottom - top) / Math.max(1, steps.length));
  steps.forEach((st, i) => {
    const y = top + i * sh;
    T(slide, String(i + 1).padStart(2, "0"), { x: MX, y, w: 0.8, h: sh, fontSize: 24, bold: true, color: C.red, valign: "middle" });
    T(slide, st, { x: MX + 0.9, y, w: CW - 0.9, h: sh, fontSize: fitPt(st, CW - 0.9, sh, 20, 14), color: C.white, valign: "middle" });
  });
  if (s.fallback) {
    const y = H - 0.45 - fbH;
    slide.addShape(pres.shapes.RECTANGLE, { x: MX, y, w: CW, h: fbH - 0.15, fill: { color: "1E1C1F" }, line: { color: "3A383C", width: 1 } });
    T(slide, [
      { text: (s.fallbackLabel || "If the live demo fails").toUpperCase() + "   ", options: { bold: true, color: C.red, charSpacing: 2, fontSize: 11 } },
      { text: s.fallback, options: { color: "CFCED3", fontSize: 14 } },
    ], { x: MX + 0.3, y, w: CW - 0.6, h: fbH - 0.15, valign: "middle" });
  }
};
R.demo.layout = L.demo;

R.metrics = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const stats = s.stats || [];
  const n = stats.length;
  if (n < 1 || n > 4) throw new Error("metrics: give 1-4 stats");
  const gap = 0.3, w = (CW - gap * (n - 1)) / n;
  const bottom = s.footnote ? f.bottom - 0.55 : f.bottom;
  const h = Math.min(3.6, bottom - f.top);
  stats.forEach((st, i) => {
    const x = MX + i * (w + gap);
    cardBox(pres, slide, x, f.top, w, h);
    T(slide, st.value, { x: x + 0.3, y: f.top + 0.35, w: w - 0.6, h: 1.1, fontSize: fitPt(st.value, w - 0.6, 1.0, 60, 30), bold: true, color: C.red, valign: "middle" });
    T(slide, st.label, { x: x + 0.3, y: f.top + 1.55, w: w - 0.6, h: 0.6, fontSize: fitPt(st.label, w - 0.6, 0.6, 17, 13), bold: true, color: C.black });
    if (st.context) T(slide, st.context, { x: x + 0.3, y: f.top + 2.2, w: w - 0.6, h: h - 2.4, fontSize: fitPt(st.context, w - 0.6, h - 2.4, 15, 11), color: C.text });
  });
  if (s.footnote) T(slide, s.footnote, { x: MX, y: f.bottom - 0.45, w: CW, h: 0.45, fontSize: 11, color: C.muted, italic: true, valign: "bottom" });
};

R.chart = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const ch = s.chart || {};
  const types = { bar: pres.charts.BAR, line: pres.charts.LINE };
  const data = (ch.series || []).map((sr) => ({ name: sr.name, labels: ch.categories, values: sr.values }));
  const chartW = s.takeaway ? CW * 0.64 : CW;
  const bottom = s.footnote ? f.bottom - 0.5 : f.bottom;
  slide.addChart(types[ch.type || "bar"], data, {
    x: MX, y: f.top, w: chartW, h: bottom - f.top,
    barDir: ch.horizontal ? "bar" : "col",
    chartColors: [C.red, C.black, "9C9BA1", "D9A3A8"],
    catAxisLabelColor: C.text, valAxisLabelColor: C.muted,
    catAxisLabelFontFace: FONT, valAxisLabelFontFace: FONT, catAxisLabelFontSize: 12, valAxisLabelFontSize: 11,
    valGridLine: { color: "E6E5EA", size: 0.75 }, catGridLine: { style: "none" },
    showValue: ch.showValue !== false, dataLabelPosition: ch.type === "line" ? "t" : "outEnd", dataLabelColor: C.black, dataLabelFontSize: 11, dataLabelFontFace: FONT,
    dataLabelFormatCode: ch.format || "General",
    showLegend: (ch.series || []).length > 1, legendPos: "b", legendFontFace: FONT, legendFontSize: 11, legendColor: C.text,
    showValAxisTitle: !!ch.yTitle, valAxisTitle: ch.yTitle || "", valAxisTitleColor: C.muted, valAxisTitleFontSize: 11, valAxisTitleFontFace: FONT,
    lineSize: 3, lineDataSymbolSize: 8,
    // bars start at zero so gaps are not exaggerated; chart.min / chart.max override
    valAxisMinVal: ch.min !== undefined ? ch.min : ((ch.type || "bar") === "bar" ? 0 : undefined),
    ...(ch.max !== undefined ? { valAxisMaxVal: ch.max } : {}),
  });
  if (s.takeaway) {
    const ax = MX + chartW + 0.4, aw = CW - chartW - 0.4;
    cardBox(pres, slide, ax, f.top, aw, bottom - f.top);
    renderCardText(pres, slide, { eyebrow: "Takeaway", title: s.takeaway, bullets: s.points }, ax + 0.3, f.top + 0.35, aw - 0.6, bottom - 0.25);
  }
  if (s.footnote) T(slide, s.footnote, { x: MX, y: f.bottom - 0.4, w: CW, h: 0.4, fontSize: 11, color: C.muted, italic: true, valign: "bottom" });
};

R.milestones = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const ST = {
    pass: { t: "PASSED", fill: C.black, color: C.white },
    stop: { t: "STOPPED", fill: C.muted, color: C.white }, // a decision, not a failure: grey, not red
    fail: { t: "MISSED", fill: C.red, color: C.white },
    partial: { t: "PARTIAL", fill: "E4E3E8", color: C.black },
    pending: { t: "PENDING", fill: C.white, color: C.muted },
  };
  const hdr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.black }, fontSize: 12, charSpacing: 1 } });
  const rows = [[hdr("MILESTONE"), hdr("PASS CRITERION (SET AT INTAKE)"), hdr("WHAT HAPPENED"), hdr("STATUS")]];
  const n = (s.rows || []).length;
  const fs_ = n > 5 ? 12 : 14;
  (s.rows || []).forEach((r, i) => {
    const st = ST[r.status] || ST.pending;
    const bg = i % 2 ? C.white : C.card;
    rows.push([
      { text: r.milestone, options: { bold: true, color: C.black, fill: { color: bg }, fontSize: fs_ } },
      { text: r.criterion, options: { color: C.text, fill: { color: bg }, fontSize: fs_ } },
      { text: r.result, options: { color: C.text, fill: { color: bg }, fontSize: fs_ } },
      { text: st.t, options: { bold: true, color: st.color, fill: { color: st.fill }, align: "center", fontSize: 11, charSpacing: 1 } },
    ]);
  });
  slide.addTable(rows, {
    x: MX, y: f.top, w: CW, colW: [2.6, 3.8, 4.3, 1.433],
    fontFace: FONT, valign: "middle", margin: [0.08, 0.12, 0.08, 0.12],
    border: { type: "solid", pt: 0.75, color: "FFFFFF" }, rowH: 0.45,
  });
  if (s.footnote) T(slide, s.footnote, { x: MX, y: f.bottom - 0.4, w: CW, h: 0.4, fontSize: 11, color: C.muted, italic: true, valign: "bottom" });
};

R.team = (pres, slide, meta, s, idx) => {
  const f = contentFrame(pres, slide, meta, s, idx);
  const members = s.members || [];
  const hasStrip = (s.openRoles && s.openRoles.length) || (s.asks && s.asks.length);
  const stripH = hasStrip ? 1.15 : 0;
  const bottom = f.bottom - (hasStrip ? stripH + 0.25 : 0);
  const perRow = members.length <= 4 ? members.length : Math.ceil(members.length / 2);
  const rowsN = Math.ceil(members.length / perRow);
  const gap = 0.3, w = (CW - gap * (perRow - 1)) / perRow, h = (bottom - f.top - gap * (rowsN - 1)) / rowsN;
  members.forEach((m, i) => {
    const x = MX + (i % perRow) * (w + gap), y = f.top + Math.floor(i / perRow) * (h + gap);
    cardBox(pres, slide, x, y, w, h);
    let cy = y + 0.3;
    T(slide, (m.role || "").toUpperCase(), { x: x + 0.3, y: cy, w: w - 0.6, h: 0.3, fontSize: 10, bold: true, color: C.red, charSpacing: 2 }); cy += 0.35;
    T(slide, m.name, { x: x + 0.3, y: cy, w: w - 0.6, h: 0.4, fontSize: 18, bold: true, color: C.black }); cy += 0.5;
    const tail = m.skills ? 0.55 : 0.1;
    if (m.built) {
      const room = y + h - cy - tail - 0.15;
      const pt = fitPt("Built: " + m.built, w - 0.6, room, 16, 11);
      T(slide, [{ text: "Built  ", options: { bold: true, color: C.black } }, { text: m.built, options: { color: C.text } }], { x: x + 0.3, y: cy, w: w - 0.6, h: room, fontSize: pt });
    }
    if (m.skills) T(slide, m.skills, { x: x + 0.3, y: y + h - 0.55, w: w - 0.6, h: 0.4, fontSize: 12, color: C.muted, valign: "bottom" });
  });
  if (hasStrip) {
    const y = f.bottom - stripH;
    slide.addShape(pres.shapes.RECTANGLE, { x: MX, y, w: CW, h: stripH, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    const cols = [];
    if (s.openRoles && s.openRoles.length) cols.push(["OPEN ROLES", s.openRoles.join("  ◆  ")]);
    if (s.asks && s.asks.length) cols.push(["WE'RE ASKING FOR", s.asks.join("  ◆  ")]);
    const cw = (CW - 0.6) / cols.length;
    cols.forEach(([lbl, txt], i) => {
      const x = MX + 0.3 + i * cw;
      T(slide, lbl, { x, y: y + 0.15, w: cw - 0.3, h: 0.3, fontSize: 11, bold: true, color: "F3D6D9", charSpacing: 3 });
      T(slide, txt, { x, y: y + 0.45, w: cw - 0.3, h: stripH - 0.55, fontSize: fitPt(txt, cw - 0.3, stripH - 0.55, 16, 11), bold: true, color: C.white });
    });
  }
};

R.closing = (pres, slide, meta, s) => {
  heads(slide, Object.assign({ title: "Thank you" }, s));
  if (s.body) slide.addText(s.body, { placeholder: "body" });
  if (s.cta) {
    slide.addShape(pres.shapes.RECTANGLE, { x: MX + 1.5, y: 4.8, w: CW - 3, h: 0.8, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    T(slide, s.cta + "  →", { x: MX + 1.5, y: 4.8, w: CW - 3, h: 0.8, fontSize: 20, bold: true, color: C.white, align: "center", valign: "middle" });
  }
  if (s.contacts && s.contacts.length) T(slide, s.contacts.join("     ·     "), { x: MX, y: 5.8, w: CW, h: 0.4, fontSize: 13, color: C.muted, align: "center" });
};
R.closing.layout = L.closing;

// pptxgenjs writes empty folder entries into the zip; OneDrive/SharePoint can refuse such files.
async function dropFolderEntries(file) {
  let JSZip;
  try { JSZip = require("jszip"); } catch (e) { try { JSZip = require(require.resolve("jszip", { paths: [path.dirname(require.resolve("pptxgenjs"))] })); } catch (e2) { return; } }
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  // delete only the folder entries; zip.remove(folder) would also delete their contents
  Object.keys(zip.files).filter((k) => zip.files[k].dir).forEach((k) => { delete zip.files[k]; });
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

// ---------- main ----------
async function main() {
  const [specPath, outPath] = process.argv.slice(2);
  if (!specPath || !outPath) { console.error("usage: node build_deck.js spec.json out.pptx"); process.exit(2); }
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const meta = spec.meta || {};
  if (meta.logo && !path.isAbsolute(meta.logo)) meta.logo = path.resolve(path.dirname(specPath), meta.logo);
  if (!exists(meta.logo)) {
    const bundled = ["logo.png", "logo.svg", "logo.jpg"].map((f) => path.join(__dirname, "..", "assets", f)).find(exists);
    if (bundled) meta.logo = bundled; else { delete meta.logo; console.warn("note: no logo file found; using the text wordmark placeholder"); }
  }
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = meta.title || "Launch Lab Showcase";
  pres.author = meta.team || "Launch Lab team";
  pres.company = "NU Launch Labs";
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  defineLayouts(pres, meta);
  (spec.slides || []).forEach((s, i) => {
    const fn = R[s.type];
    if (!fn) throw new Error(`slide ${i + 1}: unknown type "${s.type}". Known: ${Object.keys(R).join(", ")}`);
    const slide = pres.addSlide({ masterName: fn.layout || L.content });
    fn(pres, slide, meta, s, i + 1);
    if (s.notes) slide.addNotes(s.notes);
  });
  await pres.writeFile({ fileName: outPath });
  await dropFolderEntries(outPath);
  console.log(`wrote ${outPath} (${spec.slides.length} slides)`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
