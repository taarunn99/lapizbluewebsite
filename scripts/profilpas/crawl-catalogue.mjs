/*
  Build data/discovery/profilpas-catalogue.json: every Profilpas product in the
  English catalogue, with the category it sits under.

  Profilpas moved onto mapei.com and its product lists are drawn client side
  from /restapi/products/v2/products. That endpoint answers plainly once the
  request looks like the page's own, so there is no need to drive a browser.
  Each category page carries its own line and category GUID in the markup,
  which is what the two greps below pull out.

  Fetched under the owner's distributor authorisation, one request at a time
  with a pause between, so this is never a load on their site.

  Usage: node scripts/profilpas/crawl-catalogue.mjs
*/
import fs from 'fs';
import path from 'path';

const SITE = 'e504ae84-79c5-62e4-9128-ff01007028e9';
const ROOT = 'https://www.mapei.com/profilpas/en/products';
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const LINES = {
  'profiles-for-floors-and-coverings': [
    'external-corner-profiles', 'internal-corner-profiles',
    'listello-tile-trims-and-decorative-profiles', 'joints-for-floors',
    'profiles-for-balconies-and-terraces', 'profiles-for-floors-of-different-heights',
    'profiles-for-floors-of-equal-height', 'profiles-for-lvt--spc-and-resilient-floors',
    'profiles-for-wooden-and-laminate-floors', 'prolight', 'stair-nosing-profiles',
    'diy-profiles',
  ],
  'profiles-and-shower-systems': ['shower-drains', 'point-drainage', 'shower-tile-trims'],
  'skirting-boards': ['metal-skirting-boards', 'pvc-skirting-boards'],
  'raised-floors': [],
  'technical-entrance-mats': [],
  'complementary-products-and-tools': [],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, json = false) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: json ? 'application/json, text/plain, */*' : 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: ROOT,
      ...(json ? { 'X-Requested-With': 'XMLHttpRequest' } : {}),
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(40000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return json ? res.json() : res.text();
}

/** The category page embeds the two GUIDs its own product call needs. */
function guids(html) {
  const line = html.match(/line:\s*'([0-9a-f-]{36})'/)?.[1];
  const category = html.match(/category:\s*'([0-9a-f-]{36})'/)?.[1];
  return { line, category };
}

const byUrl = new Map();
const problems = [];

for (const [line, cats] of Object.entries(LINES)) {
  const targets = cats.length ? cats.map((c) => `${ROOT}/${line}/category/${c}`) : [`${ROOT}/${line}`];
  for (const pageUrl of targets) {
    const category = cats.length ? pageUrl.split('/').pop() : line;
    try {
      const { line: lineId, category: catId } = guids(await get(pageUrl));
      await sleep(900);
      if (!lineId) throw new Error('no line GUID in the page');
      const api =
        `https://www.mapei.com/restapi/products/v2/products?page=1&size=300` +
        `&line=${lineId}&category=${catId ?? ''}&subcategory=&site=${SITE}&language=en`;
      const data = await get(api, true);
      const entries = data?.Result?.Entries ?? [];
      for (const e of entries) {
        const rec = byUrl.get(e.PageUrl) ?? {
          name: e.Name, url: e.PageUrl, image: e.ImageUrl,
          description: e.Description, line, categories: [],
        };
        if (!rec.categories.includes(category)) rec.categories.push(category);
        byUrl.set(e.PageUrl, rec);
      }
      console.log(`  ${line}/${category}: ${entries.length}`);
    } catch (err) {
      problems.push({ pageUrl, error: String(err.message ?? err) });
      console.log(`  ${line}/${category}: FAILED ${err.message ?? err}`);
    }
    await sleep(900);
  }
}

const products = [...byUrl.values()].sort((a, b) => a.name.localeCompare(b.name));
const out = path.join(process.cwd(), 'data', 'discovery', 'profilpas-catalogue.json');
fs.writeFileSync(
  out,
  JSON.stringify(
    { source: 'mapei.com/profilpas English catalogue', fetched: new Date().toISOString().slice(0, 10), count: products.length, problems, products },
    null, 2
  ) + '\n'
);
console.log(`\n${products.length} products across ${Object.keys(LINES).length} lines, ${problems.length} pages failed.`);
console.log(`wrote ${out}`);
