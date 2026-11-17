/**
 * Walk Mapei's own product index and write down every product slug it lists.
 *
 * Guessing a slug from a stock list name fails more often than it works:
 * "Quartz 1 2 ME" is quartz-1-2-me, "Quartz 0" is one of four grain sizes, and
 * nothing in our names hints at either. Their listing is paginated ten at a
 * time and takes a q= filter, so one walk of the catalogue gives the real
 * universe of names to match against, and no further guessing is needed.
 *
 *   node scripts/mapei-catalogue.mjs <region> <out.json>
 */
import fs from 'node:fs';

const region = process.argv[2] ?? 'ae/en';
const OUT = process.argv[3];
const base = `https://www.mapei.com/${region}/products-and-solutions/products`;

const slugs = new Map();
let page = 1;
let quiet = 0;

while (page < 400 && quiet < 3) {
  let html = '';
  try {
    const r = await fetch(`${base}?page=${page}`, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
    html = r.ok ? await r.text() : '';
  } catch {
    html = '';
  }
  const found = [...html.matchAll(/products\/detail\/([a-z0-9-]+)"[^>]*>\s*([^<]{2,80}?)\s*</g)];
  const bare = [...html.matchAll(/products\/detail\/([a-z0-9-]+)/g)].map((m) => m[1]);
  let added = 0;
  for (const m of found) if (!slugs.has(m[1])) { slugs.set(m[1], m[2].trim()); added += 1; }
  for (const s of bare) if (!slugs.has(s)) { slugs.set(s, ''); added += 1; }
  quiet = added === 0 ? quiet + 1 : 0;
  if (page % 20 === 0 || added === 0) process.stdout.write(`page ${page}: ${slugs.size} slugs\n`);
  page += 1;
}

fs.writeFileSync(OUT, `${JSON.stringify(Object.fromEntries(slugs), null, 1)}\n`);
console.log(`\n${slugs.size} product slugs from ${region}`);
