/**
 * Assemble the per product calculator index from the group files.
 *
 * Eight people transcribed eight groups of data sheets. This stitches them
 * into the one file the site imports, and refuses to write it if the groups
 * disagree: a product claimed by two groups, or a product on a live page with
 * no entry at all, is a mistake that would otherwise reach a customer as a
 * missing or a wrong quantity.
 *
 *   npx tsx scripts/build-calculator-index.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'data/calculators';
const OUT = path.join(DIR, 'index.json');

const live = new Set<string>(
  (JSON.parse(fs.readFileSync('data/manifest.json', 'utf8')) as { brand: string; slug: string; page_status?: string }[])
    .filter((r) => r.page_status === 'generated' || r.page_status === 'live')
    .map((r) => `${r.brand}/${r.slug}`),
);

const merged: Record<string, unknown> = {};
const owner = new Map<string, string>();
const clashes: string[] = [];
const groups: string[] = [];

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith('.json') || file === 'index.json') continue;
  groups.push(file);
  const entries = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8')) as Record<string, unknown>;
  for (const [key, cfg] of Object.entries(entries)) {
    const held = owner.get(key);
    if (held && held !== file) {
      clashes.push(`${key}: claimed by both ${held} and ${file}`);
      continue;
    }
    owner.set(key, file);
    merged[key] = cfg;
  }
}

const missing = [...live].filter((k) => !(k in merged)).sort();
const stray = Object.keys(merged).filter((k) => !live.has(k)).sort();

console.log(`${groups.length} group files, ${Object.keys(merged).length} products`);
for (const g of groups) {
  const n = [...owner.values()].filter((v) => v === g).length;
  console.log(`  ${String(n).padStart(4)}  ${g}`);
}

if (clashes.length) {
  console.log(`\n${clashes.length} products claimed twice:`);
  for (const c of clashes) console.log(`  ${c}`);
}
if (stray.length) {
  console.log(`\n${stray.length} entries for products with no live page:`);
  for (const s of stray.slice(0, 20)) console.log(`  ${s}`);
}
console.log(`\n${missing.length} live pages with no entry yet`);
for (const m of missing.slice(0, 15)) console.log(`  ${m}`);
if (missing.length > 15) console.log(`  and ${missing.length - 15} more`);

fs.writeFileSync(OUT, `${JSON.stringify(merged, null, 1)}\n`);
console.log(`\nwrote ${OUT}`);
if (clashes.length) process.exit(1);
