/**
 * Every product page must be the same page.
 *
 * The owner's requirement, in his words: the people using this site are
 * looking something up, not browsing, and a page whose furniture moves from
 * product to product makes them give up. So only the data, the sheet, the
 * calculator and the image may differ. The section order may not, and no page
 * may invent a section the others do not have.
 *
 * A section is allowed to be absent, because a sheet that does not publish a
 * rate gets no calculator and an empty section would be worse than none. What
 * is checked is that the sections a page does render appear in the one
 * canonical order, and that the chip bar lists exactly what rendered.
 *
 *   node scripts/audit-page-sameness.mjs [base url]
 */
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:3210';

const ORDER = [
  'documents',
  'calculator',
  'where-to-use',
  'technical-data',
  'on-site',
  'boq-clause',
  'tools',
];

const recs = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8')).filter(
  (r) => r.page_status === 'generated' || r.page_status === 'live',
);

const combos = new Map();
const fails = [];
let done = 0;

async function check(rec) {
  const url = `${BASE}/brands/${rec.brand}/${rec.product_line}/${rec.slug}`;
  const res = await fetch(url);
  if (!res.ok) {
    fails.push(`${url}: HTTP ${res.status}`);
    return;
  }
  const html = await res.text();

  // Sections actually rendered, in document order.
  const rendered = [...html.matchAll(/<section[^>]*\sid="([a-z-]+)"/g)].map((m) => m[1]);
  const known = rendered.filter((id) => ORDER.includes(id));
  const unknown = rendered.filter((id) => !ORDER.includes(id));
  if (unknown.length) fails.push(`${url}: sections not in the canonical order: ${unknown.join(', ')}`);

  // Order must be a subsequence of the canonical order.
  let at = -1;
  for (const id of known) {
    const n = ORDER.indexOf(id);
    if (n <= at) {
      fails.push(`${url}: "${id}" out of order, after "${known[known.indexOf(id) - 1]}"`);
      break;
    }
    at = n;
  }

  // The chip bar must point at what rendered and nothing else.
  const nav = html.match(/<nav[^>]*aria-label="On this page"[\s\S]*?<\/nav>/);
  if (nav) {
    const chips = [...nav[0].matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]);
    const dangling = chips.filter((c) => !rendered.includes(c));
    const unlisted = known.filter((k) => !chips.includes(k));
    if (dangling.length) fails.push(`${url}: chip bar points at missing ${dangling.join(', ')}`);
    if (unlisted.length) fails.push(`${url}: section rendered but not in the chip bar: ${unlisted.join(', ')}`);
  } else {
    fails.push(`${url}: no section chip bar`);
  }

  // Exactly one h1, which the SEO gate also depends on.
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fails.push(`${url}: ${h1s} h1 elements`);

  const sig = known.join(' > ');
  combos.set(sig, (combos.get(sig) ?? 0) + 1);
  done += 1;
}

const queue = [...recs];
await Promise.all(
  Array.from({ length: 12 }, async () => {
    for (let r = queue.pop(); r; r = queue.pop()) await check(r);
  }),
);

console.log(`\n${done} product pages checked\n`);
console.log(`${combos.size} distinct section layouts, each one a subset of the same order:`);
for (const [sig, n] of [...combos].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${sig}`);
}
if (fails.length) {
  console.log(`\n${fails.length} FAILURES:`);
  for (const f of fails.slice(0, 40)) console.log(`  ${f}`);
  process.exit(1);
}
console.log('\nEvery page renders its sections in the one canonical order.');
