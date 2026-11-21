#!/usr/bin/env node
/**
 * Build the KalingaStone catalogue from the gcbuae.com crawl.
 *
 * Reads data/incoming/kalinga/pages/*.md (one Markdown file per crawled page,
 * fetch authorised, sister company), writes src/data/kalinga-catalogue.json,
 * downloads the 128 swatches plus the lifestyle and fluting photographs that
 * exist, and renders the responsive WebP and AVIF sets under
 * public/images/brands/kalinga-stone/{swatches,lifestyle,fluting}.
 *
 * Idempotent: originals are cached in data/incoming/kalinga/files, derived
 * images are skipped when present, the JSON is rewritten every run.
 *
 *   node scripts/kalinga-catalogue.mjs            # everything
 *   node scripts/kalinga-catalogue.mjs --no-images # JSON only
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileP = promisify(execFile);
const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const PAGES = path.join(ROOT, "data/incoming/kalinga/pages");
const CACHE = path.join(ROOT, "data/incoming/kalinga/files");
const OUT_JSON = path.join(ROOT, "src/data/kalinga-catalogue.json");
const PUBLIC = path.join(ROOT, "public/images/brands/kalinga-stone");
const ORIGIN = "https://www.gcbuae.com";
const WITH_IMAGES = !process.argv.includes("--no-images");

const MATERIALS = {
  quartz: { line: "engineered-quartz", name: "Quartz", label: "quartz", rangeKind: "colours", rangeWord: "colour range", formatSummary: "20 mm slabs" },
  marble: { line: "engineered-marble", name: "Engineered marble", label: "engineered marble", rangeKind: "colours", rangeWord: "colour range", formatSummary: "304 x 125 cm slabs" },
  terrazzo: { line: "terrazzo", name: "Terrazzo", label: "terrazzo", rangeKind: "collections", rangeWord: "collection", formatSummary: "304 x 125 cm slabs" },
};

/* ------------------------------------------------------------------------ */
/* Text                                                                      */
/* ------------------------------------------------------------------------ */

/** House copy rules: no multiplication sign, no en or em dash, sister company named. */
function clean(s) {
  if (!s) return s;
  let t = s.replace(/×/g, "x");
  t = t.replace(/(\d)\s*[–—]\s*(\d)/g, "$1 to $2");
  t = t.replace(/\s*[–—]\s*/g, ", ");
  t = t.replace(/’/g, "'").replace(/[“”]/g, '"');
  t = t.replace(/Global Classic Building Materials? (?:Trading )?LLC/g, "Global Classic Building Materials, our sister company,");
  t = t.replace(/by Global Classic (?=[a-z])/g, "by Global Classic, our sister company, ");
  t = t.replace(/showsnine/g, "shows nine");
  t = t.replace(/,\s*,/g, ",").replace(/,\s*\./g, ".").replace(/\s{2,}/g, " ").trim();
  return t;
}

function decodeNextImage(md) {
  // ![alt](/_next/image?url=%2Fkalingastone%2F...webp&w=...)
  const m = md.match(/!\[([^\]]*)\]\(\/_next\/image\?url=([^&)]+)/);
  if (!m) return null;
  return { alt: clean(m[1]), src: decodeURIComponent(m[2]) };
}

function head(md) {
  const title = md.match(/^Title: (.*)$/m)?.[1] ?? "";
  const description = md.match(/^Meta description: (.*)$/m)?.[1] ?? "";
  const source = md.match(/^# SOURCE: (.*)$/m)?.[1] ?? "";
  return { title, description, source };
}

/** The page body between the breadcrumb and the footer, as non empty lines. */
function body(md) {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => l.startsWith("Home/Products"));
  let end = lines.findIndex((l, i) => i > start && l === "Navigate");
  if (end === -1) end = lines.length;
  return lines.slice(start + 1, end).filter((l) => l.trim() !== "" && l.trim() !== "-");
}

function fit(candidates, min, max, label) {
  for (const c of candidates) if (c.length >= min && c.length <= max) return c;
  console.warn(`! no ${label} fits ${min} to ${max}: ${candidates.map((c) => c.length).join(", ")}`);
  return candidates[0];
}

/* ------------------------------------------------------------------------ */
/* Shade pages                                                               */
/* ------------------------------------------------------------------------ */

const HEADER_RE = /^(Series[- ]?\d(?: ?[AB])?)(\d{3,4} × \d{3,4}(?: × \d+ mm| cm))(Tiles · Slabs · CTS)?(.+?) \((\/kalingastone\/[a-z]+\/(?:colours|collections)\/[a-z0-9-]+)\)(.*)$/;
const LINK_RE = /\((\/kalingastone\/(quartz|marble|terrazzo)\/([a-z0-9-]+))\)$/;
const PROTECTED = ["kitchen countertops and islands", "bathroom floors and walls", "wardrobe partitions and shelves", "floors and walls"];

function parseApplications(para) {
  const m = para.match(/Typical applications: (.+?)\.(?: |$)/);
  if (!m) return { applications: [], finishes: [] };
  const items = m[1].split(", ").flatMap((it, i, arr) => {
    const isLast = i === arr.length - 1;
    if (!isLast) return [it];
    if (it.startsWith("and ")) return [it.slice(4)];
    if (PROTECTED.some((p) => it.includes(p))) return [it];
    const j = it.lastIndexOf(" and ");
    return j === -1 ? [it] : [it.slice(0, j), it.slice(j + 5)];
  });
  const applications = items.map((s) => clean(s.trim())).filter(Boolean);
  const LIST = "((?:[A-Z][a-z]+(?: [A-Z][a-z]+)?, )*[A-Z][a-z]+(?: [A-Z][a-z]+)? and [A-Z][a-z]+(?: [A-Z][a-z]+)?)";
  const fm = para.match(new RegExp(`${LIST}(?: finishes)? on request`)) ?? para.match(new RegExp(`Finishes on request: ${LIST}`));
  const finishes = ["Polished"];
  if (fm) finishes.push(...fm[1].split(/, | and /));
  return { applications, finishes };
}

function parseShade(file, md) {
  const material = file.match(/^kalingastone--(quartz|marble|terrazzo)--/)[1];
  const slug = file.replace(/^kalingastone--[a-z]+--/, "").replace(/\.md$/, "");
  const meta = head(md);
  const lines = body(md);
  const name = clean(lines.find((l) => l.startsWith("# "))?.slice(2) ?? "");
  const hi = lines.findIndex((l) => HEADER_RE.test(l));
  if (hi === -1) throw new Error(`${file}: no header line`);
  const h = lines[hi].match(HEADER_RE);
  const series = clean(h[1].replace(/^Series-?\s?/, "Series ").replace(/(\d) ([AB])$/, "$1$2"));
  const format = clean(h[2]);
  const rangeName = clean(h[4].trim());
  const range = h[5].split("/").pop();
  const suffix = h[6];
  const microban = /Microban/.test(suffix);
  const isNew = /\bNew\b/.test(suffix.replace(/Microban® (option|protected)/, ""));

  const reqIdx = lines.findIndex((l, i) => i > hi && l.startsWith("Request this shade"));
  const paras = lines.slice(hi + 1, reqIdx);
  const appPara = paras.find((p) => p.startsWith("Typical applications:")) ?? "";
  const description = paras.filter((p) => p !== appPara).map(clean);
  const { applications, finishes } = parseApplications(appPara);

  // Images after the CTA: the swatch first, the lifestyle photograph second.
  let swatch = null;
  let lifestyle = null;
  for (let i = reqIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith("Related shades") || lines[i].startsWith("## ")) break;
    const img = decodeNextImage(lines[i]);
    if (!img) continue;
    if (/\/swatches/.test(img.src)) swatch = img;
    else if (/\/lifestyle\//.test(img.src)) lifestyle = img;
  }
  if (!swatch) throw new Error(`${file}: no swatch image`);

  // Related shades: between "Related shades" and the prev/next line.
  const related = [];
  const relStart = lines.findIndex((l) => l === "Related shades");
  if (relStart !== -1) {
    for (let i = relStart + 1; i < lines.length; i++) {
      const l = lines[i];
      if (l.includes("Previous shade") || l.includes("Next shade") || l.startsWith("## Need")) break;
      const m = l.match(LINK_RE);
      if (m && !l.startsWith("![") && m[2] === material) related.push(m[3]);
    }
  }
  const navLine = lines.find((l) => l.includes("Previous shade") || l.includes("Next shade")) ?? "";
  const prev = navLine.match(/← Previous shade.+?\(\/kalingastone\/[a-z]+\/([a-z0-9-]+)\)/)?.[1] ?? null;
  const next = navLine.match(/Next shade →.+?\(\/kalingastone\/[a-z]+\/([a-z0-9-]+)\)/)?.[1] ?? null;

  const mat = MATERIALS[material];
  const matWord = material === "quartz" ? "Quartz" : material === "marble" ? "Marble" : "Terrazzo";
  const title = fit(
    [
      `${name} Kalinga Stone ${matWord} Slab UAE | Lapiz Blue`,
      `${name} Kalinga Stone ${matWord} UAE | Lapiz Blue`,
      `${name} KalingaStone ${matWord} UAE | Lapiz Blue`,
      `${name} ${matWord} Slab UAE | Lapiz Blue`,
    ],
    20,
    59,
    `title for ${slug}`,
  );
  const shortLabel = material === "marble" ? "marble" : mat.label;
  const cores = [
    `${name}, KalingaStone ${mat.label} ${series}, ${format} slab, ${rangeName} range.`,
    `${name}, KalingaStone ${mat.label} ${series}, ${format}, ${rangeName}.`,
    `${name}, KalingaStone ${shortLabel} ${series}, ${format}, ${rangeName}.`,
    `${name}, KalingaStone ${shortLabel} ${series}, ${format}.`,
  ];
  const tails = [
    " Stocked in the UAE through Lapiz Blue, quoted and delivered from Dubai, Abu Dhabi and Sharjah.",
    " Stocked in the UAE, quoted by Lapiz Blue from Dubai, Abu Dhabi and Sharjah.",
    " In stock in the UAE through Lapiz Blue, Dubai, Abu Dhabi and Sharjah.",
    " Quoted by Lapiz Blue from Dubai, Abu Dhabi and Sharjah.",
    " Stocked in the UAE through Lapiz Blue, quoted from Dubai, Abu Dhabi and Sharjah. Samples and AED pricing in one working day.",
    " Stocked in the UAE through Lapiz Blue, quoted and delivered from Dubai, Abu Dhabi and Sharjah. Free trade samples, AED pricing in a day.",
  ];
  const metaDescription = fit(
    cores.flatMap((c) => tails.map((t) => c + t)),
    140,
    160,
    `description for ${slug}`,
  );

  return {
    slug,
    material,
    line: mat.line,
    name,
    series,
    format,
    range,
    rangeName,
    microban,
    isNew,
    title,
    metaDescription,
    sourceDescription: clean(meta.description),
    description,
    applications,
    finishes,
    swatch: `/images/brands/kalinga-stone/swatches/${material}/${slug}.webp`,
    swatchAlt: clean(swatch.alt) || `${name}, KalingaStone ${mat.label} slab`,
    swatchSource: swatch.src,
    ...(lifestyle
      ? {
          lifestyle: `/images/brands/kalinga-stone/lifestyle/${material}/${path.basename(lifestyle.src, ".webp")}.webp`,
          lifestyleAlt: clean(lifestyle.alt),
          lifestyleSource: lifestyle.src,
        }
      : {}),
    related,
    prev,
    next,
    source: meta.source,
  };
}

/* ------------------------------------------------------------------------ */
/* Range pages (colour ranges, terrazzo collections)                         */
/* ------------------------------------------------------------------------ */

function parseRange(file, md, material) {
  const slug = file.replace(/^kalingastone--[a-z]+--(colours|collections)--/, "").replace(/\.md$/, "");
  const meta = head(md);
  const lines = body(md);
  const h1 = lines.find((l) => l.startsWith("# ")) ?? "";
  const h1i = lines.indexOf(h1);
  const countIdx = lines.findIndex((l) => /^\d+ shades in this/.test(l));
  const intro = [];
  const sub = [];
  for (let i = h1i + 1; i < countIdx; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) {
      sub.push({ name: clean(l.slice(3)), body: clean(lines[i + 1] ?? "") });
      i++;
    } else if (!l.startsWith("![")) intro.push(clean(l));
  }
  const shades = [];
  for (let i = countIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("Other ") || l.startsWith("## ")) break;
    const m = l.match(LINK_RE);
    if (m && !l.startsWith("![") && m[2] === material) shades.push(m[3]);
  }
  // Name from the breadcrumb tail: "…/Quartz (/kalingastone/quartz)/White Quartz"
  const crumb = md.split("\n").find((l) => l.startsWith("Home/Products")) ?? "";
  const name = clean(crumb.split("/").pop().trim());
  const mat = MATERIALS[material];
  const matWord = material === "quartz" ? "Quartz" : material === "marble" ? "Marble" : "Terrazzo";
  const nameHasMaterial = new RegExp(`\\b${matWord}\\b`, "i").test(name);
  const title = fit(
    nameHasMaterial
      ? [`${name} Kalinga Stone Slabs UAE | Lapiz Blue`, `${name} KalingaStone Slabs UAE | Lapiz Blue`, `${name} Kalinga Stone Slabs UAE`]
      : [`${name} Kalinga Stone ${matWord} UAE | Lapiz Blue`, `${name} KalingaStone ${matWord} UAE | Lapiz Blue`, `${name} Kalinga Stone ${matWord} UAE`],
    20,
    59,
    `title for range ${slug}`,
  );
  const h1Ours = nameHasMaterial ? `${name} KalingaStone shades, stocked in the UAE.` : `${name} KalingaStone ${mat.label} shades, stocked in the UAE.`;
  const n = shades.length;
  const cores = [
    `${n} ${name} shades of KalingaStone ${mat.label} in ${mat.formatSummary}, stocked in the UAE.`,
    `${n} ${name} shades of KalingaStone in ${mat.formatSummary}, stocked in the UAE.`,
    `${n} ${name} KalingaStone shades, ${mat.formatSummary}, stocked in the UAE.`,
  ];
  const tails = [
    " Lapiz Blue quotes, reserves and delivers from Dubai, Abu Dhabi and Sharjah, with samples and AED pricing in one working day.",
    " Lapiz Blue quotes and delivers from Dubai, Abu Dhabi and Sharjah, samples and AED pricing in one working day.",
    " Lapiz Blue quotes and delivers to Dubai, Abu Dhabi and Sharjah. Free trade samples.",
    " Quoted and delivered by Lapiz Blue from Dubai, Abu Dhabi and Sharjah.",
    " Quoted by Lapiz Blue, Dubai, Abu Dhabi and Sharjah.",
  ];
  const description = fit(cores.flatMap((c) => tails.map((t) => c + t)), 140, 160, `description for range ${slug}`);
  return {
    slug,
    name,
    kind: material === "terrazzo" ? "collection" : "colour",
    title,
    description,
    h1: h1Ours,
    sourceH1: clean(h1.slice(2)),
    intro,
    sub,
    shades,
    source: meta.source,
  };
}

/* ------------------------------------------------------------------------ */
/* Fluting                                                                   */
/* ------------------------------------------------------------------------ */

function parseFluting(md, shadeBySlug) {
  const meta = head(md);
  const lines = body(md);
  const h1 = clean(lines.find((l) => l.startsWith("# "))?.slice(2) ?? "");
  const h1i = lines.findIndex((l) => l.startsWith("# "));
  const intro = [];
  let feature = null;
  for (let i = h1i + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("Drag the light")) break;
    const img = decodeNextImage(l);
    if (img) feature = img;
    else intro.push(clean(l));
  }
  const samples = [];
  let pending = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const img = decodeNextImage(l);
    if (img && /\/fluting\//.test(img.src)) {
      pending = img;
      continue;
    }
    if (pending) {
      const m = l.match(/^(.+?)Base shade: (.+?) · (Series \d) \(\/kalingastone\/terrazzo\/([a-z0-9-]+)\)$/);
      const x = l.match(/^(.+?)Fluting-programme exclusive$/);
      if (m) samples.push({ name: clean(m[1]), baseName: clean(m[2]), series: m[3], base: m[4], image: `/images/brands/kalinga-stone/fluting/${path.basename(pending.src, ".webp")}.webp`, alt: pending.alt, source: pending.src });
      else if (x) samples.push({ name: clean(x[1]), baseName: null, series: null, base: null, image: `/images/brands/kalinga-stone/fluting/${path.basename(pending.src, ".webp")}.webp`, alt: pending.alt, source: pending.src, note: "Fluting programme exclusive" });
      pending = null;
    }
  }
  const whereIdx = lines.findIndex((l) => l === "Where it works");
  const where = whereIdx === -1 ? [] : lines.slice(whereIdx + 1, whereIdx + 3).map((l) => clean(l.replace(/^## /, "")));
  const lifestyle = lines.map(decodeNextImage).find((img) => img && /\/lifestyle\//.test(img.src)) ?? null;
  const samplesIdx = lines.findIndex((l) => l === "The catalogued samples");
  const samplesHeading = samplesIdx === -1 ? [] : lines.slice(samplesIdx + 1, samplesIdx + 3).map((l) => clean(l.replace(/^## /, "")));
  const bases = [...new Set(samples.map((s) => s.base).filter((b) => b && shadeBySlug.has(b)))];
  return {
    slug: "fluting",
    name: "Fluted terrazzo",
    kind: "fluting",
    title: "Fluted Terrazzo Panels Kalinga Stone UAE | Lapiz Blue",
    description: fit(
      [
        "KalingaStone fluted terrazzo panels: machined grooves across 304 x 125 cm slabs, nine catalogued samples, stocked in the UAE. Lapiz Blue quotes and delivers from Dubai, Abu Dhabi and Sharjah.",
        "KalingaStone fluted terrazzo panels, nine catalogued samples on 304 x 125 cm slabs, stocked in the UAE. Lapiz Blue quotes from Dubai, Abu Dhabi and Sharjah.",
      ],
      140,
      160,
      "fluting description",
    ),
    h1: "Fluted KalingaStone terrazzo panels, stocked in the UAE.",
    sourceH1: h1,
    intro,
    sub: [],
    shades: bases,
    samples,
    samplesHeading,
    where,
    feature: feature ? { image: `/images/brands/kalinga-stone/fluting/${path.basename(feature.src, ".webp")}.webp`, alt: feature.alt, source: feature.src } : null,
    lifestyle: lifestyle ? { image: `/images/brands/kalinga-stone/fluting/${path.basename(lifestyle.src, ".webp")}.webp`, alt: lifestyle.alt, source: lifestyle.src } : null,
    source: meta.source,
  };
}

/* ------------------------------------------------------------------------ */
/* Images                                                                    */
/* ------------------------------------------------------------------------ */

const exists = (p) => fs.access(p).then(() => true, () => false);

async function cached(src) {
  const name = src.replace(/^\/kalingastone\//, "").replace(/\//g, "-");
  const file = path.join(CACHE, name);
  if (await exists(file)) return file;
  await fs.mkdir(CACHE, { recursive: true });
  const url = ORIGIN + src;
  const { stdout } = await execFileP("curl", ["-sS", "-L", "--fail", "-o", file, "-w", "%{http_code}", url]);
  if (stdout.trim() !== "200") throw new Error(`${url}: HTTP ${stdout}`);
  return file;
}

async function render(src, outBase, widths) {
  const todo = [];
  for (const w of widths) for (const ext of ["webp", "avif"]) if (!(await exists(`${outBase}-${w}.${ext}`))) todo.push([w, ext]);
  if (todo.length === 0) return 0;
  const file = await cached(src);
  await fs.mkdir(path.dirname(outBase), { recursive: true });
  for (const [w, ext] of todo) {
    const img = sharp(file).resize({ width: w, withoutEnlargement: true });
    if (ext === "webp") await img.webp({ quality: 82 }).toFile(`${outBase}-${w}.webp`);
    else await img.avif({ quality: 55 }).toFile(`${outBase}-${w}.avif`);
  }
  return todo.length;
}

async function pool(items, n, fn) {
  const q = [...items];
  let done = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (q.length) {
        await fn(q.shift());
        done++;
      }
    }),
  );
  return done;
}

/* ------------------------------------------------------------------------ */
/* Main                                                                      */
/* ------------------------------------------------------------------------ */

async function main() {
  const files = (await fs.readdir(PAGES)).filter((f) => f.startsWith("kalingastone--") && f.endsWith(".md")).sort();
  const shades = [];
  const rangesByMaterial = { quartz: [], marble: [], terrazzo: [] };
  let flutingMd = null;

  for (const f of files) {
    const md = await fs.readFile(path.join(PAGES, f), "utf8");
    const parts = f.replace(/\.md$/, "").split("--");
    if (parts.length === 2) continue; // material pages: kalingastone--quartz
    const material = parts[1];
    if (!MATERIALS[material]) continue;
    if (parts[2] === "colours" || parts[2] === "collections") rangesByMaterial[material].push(parseRange(f, md, material));
    else if (parts[2] === "fluting") flutingMd = md;
    else shades.push(parseShade(f, md));
  }

  const bySlug = new Map(shades.map((s) => [s.slug, s]));
  const fluting = parseFluting(flutingMd, bySlug);

  // Range order as the material pages present them.
  const materials = {};
  for (const [material, mat] of Object.entries(MATERIALS)) {
    const md = await fs.readFile(path.join(PAGES, `kalingastone--${material}.md`), "utf8");
    const order = [...md.matchAll(new RegExp(`\\(/kalingastone/${material}/(?:colours|collections)/([a-z-]+)\\)`, "g"))].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i);
    const ranges = rangesByMaterial[material].slice().sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
    if (material === "terrazzo") ranges.push(fluting);
    materials[material] = { line: mat.line, name: mat.name, label: mat.label, formatSummary: mat.formatSummary, rangeWord: mat.rangeWord, count: shades.filter((s) => s.material === material).length, ranges };
  }

  // Validation.
  const counts = { quartz: 0, marble: 0, terrazzo: 0 };
  for (const s of shades) counts[s.material]++;
  const problems = [];
  if (counts.quartz !== 69 || counts.marble !== 35 || counts.terrazzo !== 24) problems.push(`shade counts ${JSON.stringify(counts)}`);
  for (const s of shades) {
    const r = materials[s.material].ranges.find((x) => x.slug === s.range);
    if (!r) problems.push(`${s.slug}: range ${s.range} unknown`);
    else if (!r.shades.includes(s.slug)) problems.push(`${s.slug}: not listed on range ${s.range}`);
    for (const rel of s.related) if (!bySlug.has(rel)) problems.push(`${s.slug}: related ${rel} unknown`);
    if (s.prev && !bySlug.has(s.prev)) problems.push(`${s.slug}: prev ${s.prev} unknown`);
    if (s.next && !bySlug.has(s.next)) problems.push(`${s.slug}: next ${s.next} unknown`);
    if (s.applications.length === 0) problems.push(`${s.slug}: no applications`);
    if (s.finishes.length < 2) problems.push(`${s.slug}: finishes ${s.finishes.join("/")}`);
  }
  const everything = JSON.stringify({ materials, shades });
  if (/[–—×]/.test(everything)) problems.push("dash or multiplication sign survived cleaning");
  if (/Grani Marmo/i.test(everything)) problems.push("forbidden name present");
  if (problems.length) {
    console.error("Problems:\n  " + problems.join("\n  "));
    process.exitCode = 1;
  }

  const out = {
    source: ORIGIN,
    generated: new Date().toISOString().slice(0, 10),
    counts: { ...counts, total: shades.length, ranges: Object.values(materials).reduce((n, m) => n + m.ranges.length, 0) },
    materials,
    shades,
  };
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(out, null, 1) + "\n");
  console.log(`catalogue: ${shades.length} shades (${counts.quartz} quartz, ${counts.marble} marble, ${counts.terrazzo} terrazzo), ${out.counts.ranges} ranges -> ${path.relative(ROOT, OUT_JSON)}`);

  if (!WITH_IMAGES) return;

  const jobs = [];
  for (const s of shades) {
    jobs.push({ src: s.swatchSource, out: path.join(PUBLIC, "swatches", s.material, s.slug), widths: [480, 960] });
    if (s.lifestyleSource) jobs.push({ src: s.lifestyleSource, out: path.join(PUBLIC, "lifestyle", s.material, path.basename(s.lifestyleSource, ".webp")), widths: [640, 1200] });
  }
  for (const smp of fluting.samples) jobs.push({ src: smp.source, out: path.join(PUBLIC, "fluting", path.basename(smp.source, ".webp")), widths: [480, 960] });
  if (fluting.feature) jobs.push({ src: fluting.feature.source, out: path.join(PUBLIC, "fluting", path.basename(fluting.feature.source, ".webp")), widths: [640, 1200] });
  if (fluting.lifestyle) jobs.push({ src: fluting.lifestyle.source, out: path.join(PUBLIC, "fluting", path.basename(fluting.lifestyle.source, ".webp")), widths: [640, 1200] });
  const unique = [...new Map(jobs.map((j) => [j.out, j])).values()];

  let written = 0;
  const failed = [];
  await pool(unique, 4, async (j) => {
    try {
      written += await render(j.src, j.out, j.widths);
    } catch (e) {
      failed.push(`${j.src}: ${e.message}`);
    }
  });
  const swatchCount = unique.filter((j) => j.out.includes("/swatches/")).length;
  const lifestyleCount = unique.filter((j) => j.out.includes("/lifestyle/")).length;
  const flutingCount = unique.filter((j) => j.out.includes("/fluting/")).length;
  console.log(`images: ${swatchCount} swatches, ${lifestyleCount} lifestyle, ${flutingCount} fluting; ${written} files written this run`);
  if (failed.length) {
    console.error("Failed downloads:\n  " + failed.join("\n  "));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
