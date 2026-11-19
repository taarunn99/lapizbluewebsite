/*
  Fetch one shard of Profilpas product detail pages and their English TDS.

  The detail page carries the sheet inside a language select:
    <select class="tds-language-selector">
      <option value="<pdf url>" selected>English</option>
  so there is no document API to call. Everything else we want, the long
  description and the category breadcrumb, is in the page's Product JSON-LD.

  Usage: node scripts/profilpas/fetch-shard.mjs <shard number>
  Writes data/incoming/profilpas/out-NN.json and PDFs into the staging dir.
*/
import fs from 'fs';
import path from 'path';

const n = String(process.argv[2]).padStart(2, '0');
const IN = `data/incoming/profilpas/shard-${n}.json`;
const OUT = `data/incoming/profilpas/out-${n}.json`;
const PDFS = process.env.PP_PDF_DIR || '/tmp/profilpas-tds';
fs.mkdirSync(PDFS, { recursive: true });

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, bin = false) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
    redirect: 'follow',
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return bin ? Buffer.from(await res.arrayBuffer()) : res.text();
}

const slugOf = (url) => url.split('/').filter(Boolean).pop();

/** The option that is marked selected is the English sheet. */
function englishTds(html) {
  const sel = html.match(/<select[^>]*tds-language-selector[\s\S]*?<\/select>/i)?.[0];
  if (!sel) return null;
  for (const m of sel.matchAll(/<option\s+value="([^"]+\.pdf[^"]*)"([^>]*)>([^<]*)</gi)) {
    if (/english/i.test(m[3])) return m[1].replace(/&amp;/g, '&');
  }
  return null;
}

function jsonLd(html) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const o = JSON.parse(m[1]);
      if (o['@type'] === 'Product') return o;
    } catch { /* a malformed block is not worth failing the product over */ }
  }
  return null;
}

const items = JSON.parse(fs.readFileSync(IN, 'utf8'));
const out = [];

for (const it of items) {
  const slug = slugOf(it.url);
  const rec = { ...it, slug, tds: null, tdsFile: null, categoryPath: null, note: null };
  try {
    const html = await get(it.url);
    const ld = jsonLd(html);
    if (ld) {
      rec.categoryPath = Array.isArray(ld.category) ? ld.category.filter(Boolean) : null;
      if (ld.description) rec.ldDescription = ld.description;
      if (ld.name) rec.ldName = ld.name;
    }
    const pdf = englishTds(html);
    if (!pdf) {
      rec.note = 'no English technical data sheet offered on the page';
    } else {
      rec.tds = pdf;
      const buf = await get(pdf, true);
      if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('not a PDF');
      const file = path.join(PDFS, `${slug}.pdf`);
      fs.writeFileSync(file, buf);
      rec.tdsFile = file;
      rec.tdsBytes = buf.length;
    }
  } catch (e) {
    rec.note = `fetch failed: ${e.message ?? e}`;
  }
  out.push(rec);
  console.log(`  ${rec.tdsFile ? 'TDS ' : rec.note ? 'none' : '??? '} ${it.name}`);
  await sleep(1100);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
const got = out.filter((r) => r.tdsFile).length;
console.log(`\nshard ${n}: ${got} of ${out.length} products have an English sheet. wrote ${OUT}`);
