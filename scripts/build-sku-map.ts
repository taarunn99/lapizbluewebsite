/*
  Build data/sku-map.json: the Zoho Books item names and SKU codes that belong
  to each product page.

  The sales desk works from Books, where an item reads "Pegoland Dos Plus C2TE
  Grey 25 kg ( 486 )" or just a bare code like 19254. Nobody can hold that
  against the product names on the site, so site search has to accept what is
  on their screen. This file is what lets it.

  Nothing here renames anything. The page keeps the name it already has, and
  the Books spelling rides along as a hidden search key.

  Usage: npx tsx scripts/build-sku-map.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord } from '../src/lib/tds';

const REPO = process.cwd();
const D = path.join(REPO, 'data', 'discovery');

interface ZohoItem {
  name: string;
  sku?: string;
}

/** Discovery files, each keyed to the brand its items belong to. */
const SOURCES: { file: string; brand: string }[] = [
  { file: 'mapei-skus.json', brand: 'mapei' },
  { file: 'kerakoll-skus.json', brand: 'kerakoll' },
  { file: 'pidilite-puma-skus.json', brand: 'pidilite-puma' },
  { file: 'profilpas-skus.json', brand: 'profilpas' },
];

/**
 * Strip everything from a Books item name that describes the pack rather than
 * the product: the SKU code Books prefixes to some items, the trailing
 * bracketed reference, pack sizes, colours and the EN class token. What is
 * left should be the product name, which is what the page is called.
 */
function productPart(raw: string): string {
  let s = ` ${raw} `;
  s = s.replace(/\(\s*[^)]*\s*\)/g, ' ');          // ( 486 ), (A+B)
  s = s.replace(/\b\d{4,}\b/g, ' ');                 // bare Books codes
  s = s.replace(/\b\d+(?:[.,]\d+)?\s*(kg|kgs|ltr|lt|l|ml|g|gm|m|mm|pcs|pc|bag|bags|can|cans)\b/gi, ' ');
  s = s.replace(/\b[CDR][123]\s?(?:F?T?E?S?[12]?)\b/gi, ' '); // C2TE, C2 TE S1, R2T, D2TE
  s = s.replace(/\b(grey|gray|white|bianco|grigio|beige|black|extra\s+white|shock)\b/gi, ' ');
  s = s.replace(/\b(unit|pack|bag|bags|box|boxes|roll|rolls|per|and|the)\b/gi, ' ');
  s = s.replace(/[^A-Za-z0-9+ ]+/g, ' ');
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function tokens(s: string): string[] {
  return s.split(' ').filter((t) => t.length > 1);
}

const manifest: ManifestRecord[] = JSON.parse(
  fs.readFileSync(path.join(REPO, 'data', 'manifest.json'), 'utf8')
);

const pages = manifest
  .filter((r) => r.page_status === 'generated' || r.page_status === 'live')
  .map((r) => ({
    brand: r.brand,
    slug: r.slug,
    name: r.name,
    norm: productPart(r.name),
    toks: tokens(productPart(r.name)),
  }));

/**
 * Score a Books item against a page. A page only wins on whole words, so
 * "Pegoland Dos" never steals an item that says "Pegoland Dos Plus": the
 * longer page name carries one more matching token and outscores it.
 */
function best(itemNorm: string, brand: string) {
  const itemToks = tokens(itemNorm);
  if (itemToks.length === 0) return null;
  let top: { slug: string; score: number } | null = null;
  for (const p of pages) {
    if (p.brand !== brand) continue;
    if (p.toks.length === 0) continue;
    const hit = p.toks.filter((t) => itemToks.includes(t));
    if (hit.length !== p.toks.length) continue;   // every page word must appear
    // Prefer the page that explains the most of the item, then the longest page name.
    const score = p.toks.length * 100 - (itemToks.length - p.toks.length);
    if (!top || score > top.score) top = { slug: p.slug, score };
  }
  return top;
}

const map: Record<string, { skus: string[]; names: string[] }> = {};
const unmatched: { brand: string; name: string; sku: string }[] = [];
let seen = 0;

for (const src of SOURCES) {
  const fp = path.join(D, src.file);
  if (!fs.existsSync(fp)) {
    console.log(`  skipped ${src.file}, not present yet`);
    continue;
  }
  const items: ZohoItem[] = JSON.parse(fs.readFileSync(fp, 'utf8')).items ?? [];
  let matched = 0;
  for (const it of items) {
    seen++;
    const hit = best(productPart(it.name), src.brand);
    if (!hit) {
      unmatched.push({ brand: src.brand, name: it.name, sku: it.sku ?? '' });
      continue;
    }
    matched++;
    const key = `${src.brand}/${hit.slug}`;
    map[key] ??= { skus: [], names: [] };
    if (it.sku && !map[key].skus.includes(it.sku)) map[key].skus.push(it.sku);
    const n = it.name.trim();
    if (!map[key].names.includes(n)) map[key].names.push(n);
  }
  console.log(`  ${src.brand}: ${matched} of ${items.length} items matched a page`);
}

/**
 * Hand made pairings for Books items the matcher cannot reach. Profilpas sells
 * raised floor parts under component codes, so "PPL/T1 Natural aluminium
 * joist" shares no word with the page it belongs to and no amount of string
 * matching will find it.
 */
const manualPath = path.join(REPO, 'data', 'sku-map-manual.json');
if (fs.existsSync(manualPath)) {
  const manual: Record<string, string[]> = JSON.parse(fs.readFileSync(manualPath, 'utf8'));
  const skuOf = new Map<string, string>();
  for (const src of SOURCES) {
    const fp = path.join(D, src.file);
    if (!fs.existsSync(fp)) continue;
    for (const it of (JSON.parse(fs.readFileSync(fp, 'utf8')).items ?? []) as ZohoItem[]) {
      if (it.sku) skuOf.set(it.name.trim(), it.sku);
    }
  }
  let paired = 0;
  for (const [key, names] of Object.entries(manual)) {
    if (key.startsWith('_')) continue;
    map[key] ??= { skus: [], names: [] };
    for (const n of names) {
      if (!map[key].names.includes(n)) { map[key].names.push(n); paired++; }
      const sku = skuOf.get(n.trim());
      if (sku && !map[key].skus.includes(sku)) map[key].skus.push(sku);
      const idx = unmatched.findIndex((u) => u.name.trim() === n.trim());
      if (idx >= 0) unmatched.splice(idx, 1);
    }
  }
  console.log(`  manual: ${paired} items paired by hand`);
}

for (const k of Object.keys(map)) {
  map[k].skus.sort();
  map[k].names.sort();
}

fs.writeFileSync(
  path.join(REPO, 'data', 'sku-map.json'),
  JSON.stringify(map, null, 2) + '\n'
);
fs.writeFileSync(
  path.join(D, 'sku-map-unmatched.json'),
  JSON.stringify(unmatched, null, 2) + '\n'
);

console.log(
  `\n${seen} Books items read, ${seen - unmatched.length} mapped onto ${Object.keys(map).length} pages.`
);
console.log(`${unmatched.length} left over, listed in data/discovery/sku-map-unmatched.json`);
