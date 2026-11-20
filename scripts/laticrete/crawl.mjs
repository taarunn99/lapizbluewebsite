/*
  Crawl the Laticrete products we sell: data sheet, pack shot and the page's
  own description.

  Laticrete is open. Its robots.txt disallows only Sitecore and admin paths,
  its sitemap is public, and product pages serve in full to a plain fetch, so
  none of the Weber gymnastics are needed here.

  The English data sheet is linked as "<PRODUCT> DS-nnn (English)" and the
  pack shot lives on cdnmdm.laticrete.com under ProductAssets at 2500px.

  node scripts/laticrete/crawl.mjs
*/
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = 'data/incoming/laticrete';
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync('public/tds/laticrete', { recursive: true });

/** Our product, and the Laticrete page slug it maps to. */
const TARGETS = JSON.parse(fs.readFileSync('data/discovery/laticrete-targets.json', 'utf8'));

async function get(url, bin = false) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(String(res.status));
  return bin ? Buffer.from(await res.arrayBuffer()) : res.text();
}

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');

const out = [];
for (const t of TARGETS) {
  // MYK paths carry category folders, so a flat key is used for filenames
  const key = t.slug.split('/').pop();
  const rec = { product: t.product, slug: t.slug, key, url: `https://www.laticrete.com/products/${t.slug}` };
  try {
    // Laticrete's global range and MYK Laticrete, its India arm, are separate
    // sites. Several products we sell exist only on one of them.
    rec.url = t.site === 'myk'
      ? `https://myklaticrete.com/products/${t.slug}/`
      : `https://www.laticrete.com/products/${t.slug}`;
    const html = await get(rec.url);
    rec.title = dec((html.match(/<title>([^<]+)/) || [, ''])[1]).replace(/\s*\|.*$/, '').trim();

    // the English data sheet, named for the product in the link text
    // Most sheets are labelled "<product> DS-nnn (English)", but the combined
    // ones are not, so the filename's own language tag counts as well.
    const pdfs = [...html.matchAll(/href="([^"]+\.pdf[^"]*)"[^>]*>([^<]{0,90})/gi)]
      .map((m) => ({ url: dec(m[1]), label: dec(m[2]).trim() }))
      // MSDS is the safety sheet, not the technical one, and the word sits
      // right next to it on the page
      .filter((d) => !/warranty|terms|logo|msds|[-_]sds|safety/i.test(d.url + d.label));
    const pick = pdfs.find((d) => /\(English\)/i.test(d.label))
              || pdfs.find((d) => /[-_]en[-_.]|_en_|-en\.pdf/i.test(d.url))
              // MYK names its sheets <PRODUCT>_TDS.pdf
              // MYK names its sheets <PRODUCT>_TDS.pdf, sometimes with a
              // revision number appended as _TDS-2.pdf
              || pdfs.find((d) => /[-_]tds[-_0-9]*\.pdf|datasheet|\bds-?\d/i.test(d.url + d.label));
    if (pick) { rec.tds = pick.url; rec.tdsLabel = pick.label; }
    // a product render rather than a comparison chart or an install photo
    const imgs = [...new Set((html.match(/https:\/\/(?:cdnmdm\.laticrete\.com\/ProductAssets|(?:media\.)?myklaticrete\.com\/(?:mykl|wp-content\/uploads))\/[^"' ]+\.(?:jpg|jpeg|png|webp)/gi) || []))]
      .map(dec)
      .filter((u) => !/Comparison|Install|Chart|favicon|logo|icon|banner|placeholder/i.test(u));
    rec.image = imgs.find((u) => /Render|Bag|Pail|Unit|Group/i.test(u)) || imgs[0] || '';

    const desc = html.match(/<meta name="description" content="([^"]*)"/i);
    rec.description = desc ? dec(desc[1]).trim() : '';

    if (rec.tds) {
      const buf = await get(rec.tds, true);
      if (buf.subarray(0, 4).toString() === '%PDF') {
        const dest = path.join('public/tds/laticrete', `${key}.pdf`);
        fs.writeFileSync(dest, buf);
        rec.tdsFile = dest;
        rec.sha256 = crypto.createHash('sha256').update(buf).digest('hex');
        rec.size_bytes = buf.length;
      }
    }
    if (rec.image) {
      const buf = await get(rec.image, true);
      const dest = path.join(OUT, `${key}.webp`);
      await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#ffffff' }).webp({ quality: 85, effort: 6 }).toFile(dest);
      rec.imageFile = dest;
    }
    console.log(`  ${rec.tdsFile ? 'TDS' : '   '} ${rec.imageFile ? 'IMG' : '   '}  ${t.product}`);
  } catch (e) {
    rec.error = String(e.message || e);
    console.log(`  FAIL  ${t.product}: ${rec.error}`);
  }
  out.push(rec);
  await sleep(900);
}
fs.writeFileSync('data/incoming/laticrete-crawl.json', JSON.stringify(out, null, 2) + '\n');
console.log(`\n${out.filter((r) => r.tdsFile).length} sheets, ${out.filter((r) => r.imageFile).length} images, of ${out.length}`);
