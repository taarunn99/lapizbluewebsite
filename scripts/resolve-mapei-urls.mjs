/**
 * Find, for each product we sell and have no page for, a Mapei country site
 * that publishes its data sheet.
 *
 * Mapei runs a site per country and each publishes its own edition of the same
 * document, under the same document number. The Emirates site is the slowest
 * to fill, so a product sold here can have no sheet there and five elsewhere.
 * Any of them is the manufacturer's document for the product.
 *
 *   node scripts/resolve-mapei-urls.mjs <targets.json> <out.json>
 */
import fs from 'node:fs';

const REGIONS = [
  'ae/en', 'sa/en', 'qa/en', 'eg/en', 'za/en', 'gb/en', 'ie/en', 'it/en',
  'in/en', 'sg/en', 'my/en', 'au/en', 'nz/en', 'us/en', 'ca/en', 'ph/en',
];
const detail = (r, s) => `https://www.mapei.com/${r}/products-and-solutions/products/detail/${s}`;

const targets = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3];

async function probe(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return null;
    const html = await res.text();
    const pdfs = [...html.matchAll(/https:\/\/cdnmedia\.mapei\.com\/docs\/librariesprovider\d+\/products-documents\/[^"']+?\.pdf/g)].map((m) => m[0]);
    const sheet = pdfs.find((u) => /\/1_\d+_/.test(u));
    if (!sheet) return null;
    const og = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+products-images[^"]+)"/);
    const title = html.match(/<title>([^<]*)<\/title>/);
    return { sheet, image: og ? og[1].split('?')[0] : null, title: title ? title[1].trim() : '' };
  } catch {
    return null;
  }
}

async function pool(items, size, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const n = i++;
        out[n] = await fn(items[n]);
      }
    }),
  );
  return out;
}

// Several products at a time, each walking its own candidates. Kept modest
// so this stays a polite number of connections to someone else's server.
let n = 0;
const results = await pool(targets, 5, async (t) => {
  let hit = null;
  for (const slug of t.candidates.slice(0, 3)) {
    const urls = REGIONS.map((r) => detail(r, slug));
    const found = await pool(urls, 6, probe);
    const k = found.findIndex(Boolean);
    if (k >= 0) {
      hit = { slug, region: REGIONS[k], page: urls[k], ...found[k] };
      break;
    }
  }
  n += 1;
  process.stdout.write(
    `${String(n).padStart(3)}/${targets.length}  ${hit ? 'FOUND' : 'none '}  ${t.name.slice(0, 38).padEnd(38)}  ${hit ? `${hit.region}  ${hit.slug}` : ''}\n`,
  );
  return { ...t, hit };
});
fs.writeFileSync(OUT, `${JSON.stringify(results, null, 1)}\n`);

const found = results.filter((r) => r.hit).length;
console.log(`\n${found} of ${results.length} have a sheet on some Mapei country site`);
console.log(`${results.length - found} found nowhere:`);
for (const r of results.filter((x) => !x.hit)) console.log(`   ${r.invoices} inv  ${r.name}`);
