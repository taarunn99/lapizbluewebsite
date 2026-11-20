/*
  Match the Weber pack shots in Downloads to products.

  Case insensitive on purpose: the first pass globbed weber* and silently
  skipped Webercol_prime because of its capital W. Matching is also done the
  same way the sheets are, so weberjoint cannot take the weberjoint Deco shot.

  node scripts/weber/match-images.mjs
*/
import fs from 'fs';
import os from 'os';
import path from 'path';

const DL = path.join(os.homedir(), 'Downloads');
const products = JSON.parse(fs.readFileSync('data/discovery/weber-products.json', 'utf8')).products;

const SKIP = /logo|simulation|^weber\.(png|jpg)$|website/i;
const files = fs.readdirSync(DL)
  .filter((f) => /weber/i.test(f) && /\.(jpg|jpeg|png|webp)$/i.test(f) && !SKIP.test(f))
  .map((f) => path.join(DL, f));

const toks = (s, isFile) => {
  let t = s;
  if (isFile) {
    t = path.basename(t).replace(/\.[a-z]+$/i, '');
    t = t.replace(/_[0-9A-Fa-f]{24,}$/, '');   // the CDN hash Weber appends
    t = t.replace(/_lapiz$/i, '');
  }
  t = t.toLowerCase().replace(/[_\-+]/g, ' ').replace(/\bpox\b/g, 'epox');
  return t.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
};

const pt = new Map(products.map((p) => [p.name, new Set(toks(p.name, false))]));
const ft = new Map(files.map((f) => [f, toks(f, true)]));
const fits = (want, have) => [...want].every((t) => have.some((x) => x === t || (t.length > 2 && x.includes(t))));

const hit = {};
for (const p of products) {
  const mine = pt.get(p.name);
  const cands = [];
  for (const [f, have] of ft) {
    if (!fits(mine, have)) continue;
    // a product whose name strictly extends this one owns that file
    const stolen = products.some((o) => o.name !== p.name && mine.size < pt.get(o.name).size
      && [...mine].every((t) => pt.get(o.name).has(t)) && fits(pt.get(o.name), have));
    if (stolen) continue;
    cands.push([have.filter((x) => !mine.has(x)).length, f]);
  }
  if (cands.length) { cands.sort((a, b) => a[0] - b[0]); hit[p.name] = path.basename(cands[0][1]); }
}

fs.writeFileSync('/tmp/weber_images.json', JSON.stringify(hit, null, 2) + '\n');
const used = new Set(Object.values(hit));
console.log(`${files.length} Weber images in Downloads, ${Object.keys(hit).length} matched to a product\n`);
for (const [p, f] of Object.entries(hit).sort()) console.log(`  ${p.padEnd(24)} ${f}`);
const spare = files.map((f) => path.basename(f)).filter((f) => !used.has(f));
if (spare.length) { console.log(`\nnot matched (${spare.length}):`); spare.forEach((s) => console.log('  ', s)); }
