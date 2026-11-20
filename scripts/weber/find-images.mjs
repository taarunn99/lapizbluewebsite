/*
  Find a pack shot for each Weber product that has none.

  Weber's own site is behind a bot challenge, which is where the first attempt
  stopped. It should not have: the products are stocked by UAE and GCC
  retailers whose sites are ordinary, and a plain search fetch reaches them.
  This asks a search engine per product, takes image URLs from the results,
  and keeps the first that downloads as a real image of a plausible size.

  Nothing here decides a product is the right one on its own. Each result is
  recorded with the page it came from so a person can see where a shot came
  from, and the filename and URL have to mention the product.

  node scripts/weber/find-images.mjs [--limit N]
*/
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Encode a pack shot the way the product page actually consumes it.
 *
 * next/image is configured for avif then webp and resizes on demand, so the
 * job here is a clean source rather than a second set of formats: no bigger
 * than twice the largest size the page renders it at, white matted so a
 * transparent PNG does not go grey in dark mode, and metadata stripped.
 */
async function encodePackShot(buf, dest) {
  const fsmod = await import('fs');
  const pathmod = await import('path');
  fsmod.mkdirSync(pathmod.dirname(dest), { recursive: true });
  await sharp(buf)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 85, effort: 6 })
    .toFile(dest);
  return fsmod.statSync(dest).size;
}


const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg > -1 ? Number(process.argv[limitArg + 1]) : Infinity;

const manifest = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const want = manifest.filter((r) => r.brand === 'weber' && r.image.status !== 'found').slice(0, LIMIT);

/** Hosts that serve other people's logos, avatars and video stills. */
const JUNK = /ytimg|fbcdn|gravatar|logo|favicon|sprite|placeholder|avatar|banner|\/flags?\//i;

/**
 * Search engines throttle. The first run fired six queries a few seconds
 * apart, every one came back 429, and the script reported "none" for products
 * whose image was sitting in the results. Backing off and waiting is the whole
 * fix.
 */
async function get(url, bin = false, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: bin ? 'image/webp,image/*,*/*' : 'text/html,application/xhtml+xml',
      },
      redirect: 'follow', signal: AbortSignal.timeout(30000),
    });
    if (res.status === 429 || res.status === 503) {
      const wait = 8000 * attempt;
      console.log(`    throttled, waiting ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(String(res.status));
    return bin ? Buffer.from(await res.arrayBuffer()) : res.text();
  }
  throw new Error('throttled');
}

/** The distinctive words of a product name, for checking a URL mentions it. */
const marks = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ')
  .filter((w) => w && w !== 'weber').map((w) => w.replace(/^weber/, ''));

const found = [];
const missed = [];

for (const rec of want) {
  const q = encodeURIComponent(`${rec.name} weber ${rec.specs.pack_size || ''} buy`);
  let urls = [];
  try {
    const html = await get(`https://search.brave.com/search?q=${q}`);
    urls = [...new Set((html.match(/https?:\/\/[^"&<>\s]{25,180}\.(?:jpg|jpeg|png|webp)/gi) || []))];
  } catch { /* try the product anyway, below */ }

  const m = marks(rec.name);
  /**
   * Weber's own pack shots are reachable even though its pages are not: they
   * sit at /files/sodamco/styles/768x768/public/pictures/, and a search turns
   * up the exact filename. Those come first, a UAE retailer's photo second.
   */
  const ranked = urls.filter((u) => !JUNK.test(u))
    .map((u) => {
      const low = u.toLowerCase();
      const hits = m.filter((t) => low.includes(t)).length;
      const official = /middleeast\.weber|sodamco/.test(low) ? 100 : 0;
      return [hits + official, u];
    })
    .filter(([n]) => (n % 100) >= Math.min(2, m.length))
    .sort((a, b) => b[0] - a[0])
    .map(([, u]) => u);

  let got = null;
  for (const u of ranked.slice(0, 6)) {
    try {
      const buf = await get(u, true);
      if (buf.length < 6000) continue;
      const meta = await sharp(buf).metadata();
      if (!meta.width || meta.width < 240 || meta.height < 240) continue;
      const dest = path.join('public/images/brands/weber', rec.product_line, `${rec.slug}.webp`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await encodePackShot(buf, dest);
      got = { url: u, w: meta.width, h: meta.height };
      break;
    } catch { /* next candidate */ }
  }

  if (got) { found.push([rec.name, got]); console.log(`  FOUND ${rec.name.padEnd(24)} ${got.w}x${got.h}  ${got.url.slice(0, 70)}`); }
  else { missed.push(rec.name); console.log(`  none  ${rec.name}`); }
  await sleep(9000);   // the search engine throttles hard below this
}

fs.writeFileSync('data/incoming/weber-found-images.json',
  JSON.stringify({ found: Object.fromEntries(found), missed }, null, 2) + '\n');
console.log(`\n${found.length} found, ${missed.length} still without a photo`);
