#!/usr/bin/env node
/**
 * Build the FILA catalogue from the owner supplied "EASY GUIDE ME 06 2023".
 *
 * Reads data/incoming/fila/guide.txt (pdftotext -layout of
 * data/incoming/fila/fila-easy-guide-me-2023.pdf) and writes
 * src/data/fila-products.json.
 *
 * Every figure in the output is lifted from the guide. Nothing is estimated:
 * a product with no coverage printed on its page gets coverage: [].
 *
 * Idempotent: the JSON is rewritten from the text on every run.
 *
 *   node scripts/fila-catalogue.mjs           # write the JSON and print a summary
 *   node scripts/fila-catalogue.mjs --dry     # print the summary only
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const SRC = path.join(ROOT, "data/incoming/fila/guide.txt");
const OUT = path.join(ROOT, "src/data/fila-products.json");
const DRY = process.argv.includes("--dry");

/* ------------------------------------------------------------------ text */

/** House copy rules: no en or em dash, straight quotes, single spaces. */
function clean(s) {
  return String(s ?? "")
    .replace(/’/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
    .replace(/\s*[–—]\s*/g, ", ")
    .replace(/×/g, "x")
    .replace(/\s{2,}/g, " ")
    .replace(/-\s+(?!and\b)(?=[a-z])/g, "-")
    .trim();
}

/** The guide sets these in small caps, so pdftotext hands them back lower case. */
const caps = (s) =>
  s.replace(/\blvt\b/gi, "LVT").replace(/\bpvc\b/gi, "PVC").replace(/\bwpc\b/gi, "WPC").replace(/\buv\b/gi, "UV");

const slugify = (s) =>
  clean(s)
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const isCaps = (s) => /[A-Z]/.test(s) && s === s.toUpperCase() && !/[a-z]/.test(s);

const BADGE_LINE = /^(ECO|ADVANCED|FORMULA|WATER-BASED|TECHNOLOGY|WATER-BASED TECHNOLOGY|water|-based|PRIMA DOPO|BEFORE AFTER|PRIMA DOPO BEFORE AFTER)$/;
const BADGE_TAIL = /\s{2,}(TECHNOLOGY|WATER-BASED)\s*$/;
const SECTION = /^(CLEANERS|PROTECTORS|FINISHING)$/;
const CATEGORY = { CLEANERS: "cleaner", PROTECTORS: "protector", FINISHING: "finish" };

/* ------------------------------------------------------------- structure */

/** Split the guide into one chunk per printed page, keyed by its page number. */
function pages(raw) {
  const out = [];
  let buf = [];
  for (const line of raw.split("\n")) {
    const only = line.trim();
    if (/^\d{1,2}$/.test(only)) {
      out.push({ page: Number(only), lines: buf });
      buf = [];
      continue;
    }
    buf.push(line);
  }
  return out;
}

/** The contents list tells us which pages sit under "ready to use". */
function readyPages(raw) {
  const lines = raw.split("\n").map((l) => l.trimEnd());
  const marker = lines.findIndex((l) => l.trim() === "ready");
  if (marker < 0) throw new Error('contents list: no "ready" marker found');
  const stop = lines.findIndex((l) => /^WHAT IT/.test(l.trim()));
  const set = new Set();
  for (let i = marker; i < (stop < 0 ? lines.length : stop); i++) {
    const m = lines[i].match(/^\s*(.+?)\s{2,}(\d{1,2})\s*$/);
    if (m) set.add(Number(m[2]));
  }
  if (!set.size) throw new Error('contents list: no "ready to use" page numbers found');
  return set;
}

/* ------------------------------------------------------- packaging block */

/** Join the two printed columns of the packaging block into two strings. */
function columns(lines) {
  const left = [];
  const right = [];
  for (const raw of lines) {
    if (!raw.trim()) continue;
    const indent = raw.length - raw.trimStart().length;
    const parts = raw.trim().split(/\s{3,}/);
    if (parts.length > 1) {
      left.push(parts[0]);
      right.push(parts.slice(1).join(" "));
    } else if (indent >= 30) {
      right.push(parts[0]);
    } else {
      left.push(parts[0]);
    }
  }
  return { left: clean(left.join(" ")), right: clean(right.join(" ")) };
}

function packSizes(left) {
  return left
    .replace(/^Packaging:\s*/i, "")
    .split(/\.\s*/)
    .map((s) => clean(s).replace(/(\d),(\d)/g, "$1.$2"))
    .filter((s) => s && /litre|ml|box|can|bottle/i.test(s));
}

/** Only the real packaging block starts a line, never the word "coverage" in a bullet. */
const PACK_START = /^(?:Packaging:?$|Coverage\b|Approximate coverage\b|With one litre of product|With 750 ml of product|Indicative for 750 ml)/i;

const HEADER =
  /^(?:(?:Approximate\s+)?Coverage(?: and dilution)?(?:\s*\([^)]*\))?\s*:|With (?:one litre of product|750 ml of product)\s*:?|Indicative for 750 ml bottle)\s*/i;

/** Pull the coverage table out of the right hand column. */
function coverageFrom(right, surfaces) {
  if (!right || !/m²|linear metres/i.test(right)) return { coverage: [], dilutions: [] };

  const per750 = /750\s*ml/i.test(right.match(HEADER)?.[0] ?? "");
  let text = right.replace(HEADER, "");
  const fallback = surfaces.length === 1 ? surfaces[0] : "All listed surfaces";

  const rows = [];
  const dilutions = [];
  const chunks = text.match(/[^]*?(?:m²|linear metres)/g) ?? [];
  for (const rawChunk of chunks) {
    let chunk = clean(rawChunk);
    const linear = /linear metres$/i.test(chunk);
    chunk = chunk.replace(/\s*(?:m²|linear metres)$/i, "");

    let ratio = null;
    const dil = chunk.match(/(\d+:\d+(?:\s*[-,]\s*\d+:\d+)?)/);
    if (dil) {
      ratio = clean(dil[1]).replace(/\s*,\s*/, " to ");
      chunk = clean(chunk.replace(dil[1], " "));
    }

    const num = chunk.match(/((?:up to\s+)?\d[\d.,]*(?:\s*(?:[-/]|\s+to\s+)\s*\d[\d.,]*)?)\s*$/i);
    if (!num) continue;
    const spec = clean(num[1]);
    let label = clean(chunk.slice(0, chunk.length - num[1].length)).replace(/[,\-:]\s*$/, "").trim();
    if (/^diluted$/i.test(label)) label = "";

    const upTo = /^up to/i.test(spec);
    const digits = spec.replace(/^up to\s*/i, "");
    const bounds = digits.split(/\s*(?:[-/]|to)\s*/).map((n) => Number(n.replace(/,/g, ".")));
    if (bounds.some((n) => !Number.isFinite(n))) continue;

    const notes = [];
    if (upTo) notes.push("up to");
    if (linear) notes.push("linear metres");
    if (per750) notes.push("per 750 ml bottle");

    rows.push({
      surface: (label || fallback).replace(/^./, (c) => c.toUpperCase()),
      sqmPerLitre: bounds.length > 1 ? [bounds[0], bounds[1]] : bounds[0],
      ...(notes.length ? { note: notes.join(", ") } : {}),
    });
    if (ratio) dilutions.push({ label: (label || fallback).replace(/^./, (c) => c.toUpperCase()), ratio });
    if (/\(undiluted\)/i.test(label)) dilutions.push({ label, ratio: "undiluted" });
  }

  // "Min coverage" and "Max coverage" on consecutive rows are one range.
  const merged = [];
  for (let i = 0; i < rows.length; i++) {
    const a = rows[i];
    const b = rows[i + 1];
    const min = a.surface.match(/^(.*?)\s*Min coverage$/i);
    if (min && b && /^Max coverage$/i.test(b.surface) && typeof a.sqmPerLitre === "number" && typeof b.sqmPerLitre === "number") {
      merged.push({ surface: clean(min[1]), sqmPerLitre: [a.sqmPerLitre, b.sqmPerLitre] });
      i++;
      continue;
    }
    merged.push(a);
  }

  const seen = new Set();
  return {
    coverage: merged,
    dilutions: dilutions.filter((d) => {
      const k = `${d.label}|${d.ratio}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }),
  };
}

/* ------------------------------------------------------------ one product */

function parsePage({ page, lines }, ready) {
  const trimmed = lines.map((l) => l.replace(/\s+$/, ""));
  const forIdx = trimmed.findIndex((l) => /^\s*WHAT IT'?S FOR\s*$/i.test(clean(l)));
  if (forIdx < 0) return null;

  let section = null;
  for (let i = 0; i < forIdx; i++) if (SECTION.test(clean(trimmed[i]))) section = clean(trimmed[i]);
  if (!section) return null;
  const sectionIdx = trimmed.findLastIndex((l, i) => i < forIdx && clean(l) === section);

  // Name, purpose and surfaces: all caps lines first, then the sentence case line.
  const head = trimmed
    .slice(sectionIdx + 1, forIdx)
    .map((l) => clean(l.replace(BADGE_TAIL, "")))
    .filter((l) => l && !BADGE_LINE.test(l));
  if (!head.length) return null;

  const name = head[0];
  const purposeLines = [];
  let i = 1;
  for (; i < head.length && isCaps(head[i]); i++) purposeLines.push(head[i]);
  const surfaceLines = head.slice(i);

  let purpose = clean(purposeLines.join(" "));
  if (purpose.toUpperCase().startsWith(name.toUpperCase())) purpose = clean(purpose.slice(name.length));
  purpose = caps(purpose.toLowerCase().replace(/^./, (c) => c.toUpperCase()));

  const surfaces = clean(surfaceLines.join(" "))
    .replace(/:\s*/g, ", ")
    .split(/,\s*/)
    .map((s) => caps(clean(s)))
    .filter(Boolean);

  const bullets = [];
  for (let j = forIdx + 1; j < trimmed.length; j++) {
    const t = clean(trimmed[j]);
    if (/^Packaging:?$/i.test(t) || /^Before full application/i.test(t)) break;
    if (t.startsWith("•")) bullets.push(clean(t.slice(1)));
    else if (bullets.length && t && !/^(ADVANTAGES|\*|\d\.)/.test(t) && !/^[A-Z ]+$/.test(t))
      bullets[bullets.length - 1] += " " + t;
  }

  const packStart = trimmed.findIndex(
    (l, j) => j > forIdx && clean(l) && l.trim().split(/\s{2,}/).some((seg) => PACK_START.test(clean(seg)))
  );
  const packEnd = trimmed.findIndex((l, j) => j > forIdx && /^Before full application/i.test(clean(l)));
  const block = packStart < 0 ? [] : trimmed.slice(packStart, packEnd < 0 ? trimmed.length : packEnd);
  const { left, right } = columns(block);
  const { coverage, dilutions } = coverageFrom(right, surfaces);

  return {
    slug: slugify(name),
    name,
    category: CATEGORY[section],
    ready: ready.has(page),
    purpose,
    surfaces,
    dilutions,
    coverage,
    packSizes: packSizes(left),
    page,
    _bullets: bullets,
  };
}

/* ----------------------------------------------------------- treatments */

/**
 * The guide's "configure the treatment" logic as data: a material is matched to
 * a product by the surfaces printed on that product's page, and the stage comes
 * from what that page says the product is for.
 */
const MATERIALS = [
  { id: "porcelain", keys: [/porcelain/] },
  { id: "ceramic", keys: [/ceramic/, /single-fired/] },
  { id: "natural stone", keys: [/\bstone\b/, /agglomerate/, /slate/, /\btuff?a?\b/] },
  { id: "marble", keys: [/marble/] },
  { id: "granite", keys: [/granite/] },
  { id: "terracotta", keys: [/terracotta/, /quarry tile/, /exposed brick/] },
  { id: "concrete", keys: [/concrete/, /cement tile/, /interlocking paver/] },
  { id: "terrazzo", keys: [/terrazzo/, /\bgrit\b/] },
  { id: "quartz", keys: [/quartz/, /agglomerate/] },
  { id: "wood", keys: [/\bwood\b/] },
  { id: "LVT and vinyl", keys: [/\blvt\b/, /vinyl/, /\bpvc\b/, /linoleum/, /plastic laminate/, /rubber/] },
];

const STAGE_RULES = [
  { stage: "after installation", re: /end-of-installation|end-of-work|end of work|post-application deposit|building-site residue|fresh cement grout|before laying|pre-laying|initial stone wash|saline efflorescence|engobing|epoxy grout/i },
  { stage: "problem", re: /stain-remover|stain remover|removes surface rust|removes greasy|coloured, organic stains|residues of silicone|wax remover|seasoned treatments|removes stubborn stains|tar and bitumen/i },
  { stage: "periodic", re: /degreas|descal|removes deposit|removes dirt|limescale|basic cleaning|dewaxing|thoroughly clean|wax-remover|intensive/i },
  { stage: "daily", re: /delicately clean|routine cleaning|daily|maintenance|cleans all surfaces|regular cleaning|specific cleaning/i },
];

/** Later entries win the primary slot for a stage. */
const PRIMARY_ORDER = [
  "zerosil", "cr10", "max", "phzero", "norust", "nospot", "sr95", "instant-remover",
  "deterdek-pro", "ps87-pro", "fuganet", "deepclean", "nodrops", "rapidsan", "clean-and-shine",
  "marble-refresh", "cleaner-pro",
  "pw10", "concrete-hydro", "stop-dirt", "hydrorep", "hydrorep-eco", "w68", "wet-eco",
  "contractors-choice", "fugaproof", "concrete-shield", "classic", "longlife",
  "stoneplus", "stoneplus-eco", "fob-xtreme", "mp90", "mp90-eco-xtreme",
];

function matchText(p) {
  return [p.surfaces.join(", "), p.purpose, ...p.coverage.map((c) => c.surface)].join(" | ").toLowerCase();
}

function stagesFor(p) {
  const text = [p.purpose, ...p._bullets].join(" ");
  const out = new Set();
  for (const r of STAGE_RULES) if (r.re.test(text)) out.add(r.stage);
  if (p.category === "protector" || p.category === "finish") out.add("protection");
  if (p.ready && p.category === "cleaner") out.add("daily");
  if (p.dilutions.some((d) => /maintenance/i.test(d.label))) out.add("daily");
  if (p.category === "cleaner" && !out.size) out.add("periodic");
  if (p.category !== "cleaner") out.delete("daily");
  return [...out];
}

function dilutionFor(p, material) {
  if (p.dilutions.length) {
    const keys = MATERIALS.find((m) => m.id === material).keys;
    const hit = p.dilutions.find((d) => keys.some((k) => k.test(d.label.toLowerCase())));
    return (hit ?? p.dilutions[0]).ratio;
  }
  return p.ready ? "Ready to use" : "Per the technical data sheet";
}

function buildTreatments(products) {
  const STAGES = ["after installation", "protection", "daily", "periodic", "problem"];
  const out = [];
  for (const material of MATERIALS.map((m) => m.id)) {
    const keys = MATERIALS.find((m) => m.id === material).keys;
    const fits = products.filter((p) => keys.some((k) => k.test(matchText(p))));
    for (const stage of STAGES) {
      const pool = fits
        .filter((p) => stagesFor(p).includes(stage))
        .sort((a, b) => PRIMARY_ORDER.indexOf(b.slug) - PRIMARY_ORDER.indexOf(a.slug));
      for (const p of pool.slice(0, 3)) {
        out.push({
          material,
          stage,
          product: p.slug,
          dilution: dilutionFor(p, material),
          note: p._bullets[0] ? clean(p._bullets[0]).replace(/\.$/, "") + "." : p.purpose + ".",
        });
      }
    }
  }
  return out;
}

/* ---------------------------------------------------------------- run it */

const raw = await fs.readFile(SRC, "utf8");
const ready = readyPages(raw);
const parsed = pages(raw)
  .map((p) => parsePage(p, ready))
  .filter(Boolean)
  .sort((a, b) => a.page - b.page);

const seenSlug = new Set();
for (const p of parsed) {
  if (seenSlug.has(p.slug)) throw new Error(`duplicate slug ${p.slug} on page ${p.page}`);
  seenSlug.add(p.slug);
}

const treatments = buildTreatments(parsed);
const products = parsed.map(({ _bullets, ...rest }) => rest);

if (!DRY) {
  await fs.writeFile(OUT, JSON.stringify({ products, treatments }, null, 2) + "\n", "utf8");
}

const withCoverage = products.filter((p) => p.coverage.length);
const byCat = (c) => products.filter((p) => p.category === c).length;
console.log(`FILA catalogue from ${path.relative(ROOT, SRC)}`);
console.log(`  products     ${products.length}  (cleaner ${byCat("cleaner")}, protector ${byCat("protector")}, finish ${byCat("finish")}, ready to use ${products.filter((p) => p.ready).length})`);
console.log(`  coverage     ${withCoverage.length} of ${products.length} products, ${products.reduce((n, p) => n + p.coverage.length, 0)} figures`);
console.log(`  dilutions    ${products.reduce((n, p) => n + p.dilutions.length, 0)} ratios on ${products.filter((p) => p.dilutions.length).length} products`);
console.log(`  pack sizes   ${products.reduce((n, p) => n + p.packSizes.length, 0)}`);
console.log(`  treatments   ${treatments.length} rows, ${new Set(treatments.map((t) => t.material)).size} materials`);
console.log(`  no coverage  ${products.filter((p) => !p.coverage.length).map((p) => p.name).join(", ") || "none"}`);
if (!DRY) console.log(`  written      ${path.relative(ROOT, OUT)}`);
