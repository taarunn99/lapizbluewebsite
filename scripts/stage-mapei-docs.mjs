/**
 * Stage every document Mapei publishes for a named list of products.
 *
 * The owner picked these pages by hand, so the identity question is settled
 * before this runs and what matters is taking everything the page offers
 * rather than only the technical sheet. Mapei publishes the safety sheet in
 * up to twenty eight languages and the technical sheet in two or three, so
 * the English one is taken and the rest ignored; where a page offers an
 * attachment carrying the anchor design tables the sheet itself refers to,
 * that is taken as well, because the sheet is not usable without it.
 *
 * Nothing reaches public/ here. Files are staged outside the repo and a facts
 * file per product records the hashes, so a document only becomes part of a
 * page once someone has read it.
 *
 *   node scripts/stage-mapei-docs.mjs <urls.txt> <outdir>
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const urls = fs.readFileSync(process.argv[2], 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
const OUT = process.argv[3];
fs.mkdirSync(path.join(OUT, 'doc'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'img'), { recursive: true });

/** English, and nothing else. en-ae and en-gb are English; fr-ca is not. */
const isEnglish = (f) => /_en(?:[-_][a-z]{2})?_/i.test(f) && !/_(fr|it|de|es|pt|nl|pl|cs|sk|sl|hr|hu|ro|ru|tr|el|da|sv|no|fi|lv|lt|et|bg|sr|ar|zh)[-_]/i.test(f);

async function grab(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('not a PDF');
  return buf;
}

const facts = [];
for (const page of urls) {
  const slug = page.split('/').pop();
  let html = '';
  try {
    const r = await fetch(page, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
    html = r.ok ? await r.text() : '';
  } catch { /* reported below */ }
  if (!html) { console.log(`ERROR  ${slug}: page did not answer`); continue; }

  const all = [...new Set([...html.matchAll(/https:\/\/cdnmedia\.mapei\.com\/docs\/librariesprovider\d+\/products-documents\/[^"']+?\.pdf/g)].map((m) => m[0]))];
  const pick = (prefix) => {
    const of = all.filter((u) => new RegExp(`/${prefix}_`).test(u));
    return of.find((u) => isEnglish(path.basename(u))) ?? null;
  };

  const want = [
    ['tds', pick('1')],
    ['sds', pick('2')],
    // The anchor design tables the Mapefix sheets refer to and do not contain.
    ['annex', all.filter((u) => /\/31_/.test(u)).find((u) => isEnglish(path.basename(u))) ?? null],
  ].filter(([, u]) => u);

  const row = { slug, page, title: (html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() ?? '', docs: {} };
  for (const [kind, url] of want) {
    try {
      const buf = await grab(url);
      const file = `${slug}.${kind}.pdf`;
      fs.writeFileSync(path.join(OUT, 'doc', file), buf);
      row.docs[kind] = {
        source_url: url,
        staged: path.join(OUT, 'doc', file),
        sha256: crypto.createHash('sha256').update(buf).digest('hex'),
        size_bytes: buf.length,
      };
    } catch (e) {
      row.docs[kind] = { source_url: url, error: String(e.message) };
    }
  }

  const og = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+products-images[^"]+)"/);
  if (og) {
    try {
      const raw = Buffer.from(await (await fetch(og[1].split('?')[0], { signal: AbortSignal.timeout(40000) })).arrayBuffer());
      await sharp(raw).resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 88 }).toFile(path.join(OUT, 'img', `${slug}.webp`));
      row.image = { source_url: og[1].split('?')[0], staged: path.join(OUT, 'img', `${slug}.webp`) };
    } catch (e) { row.image = { error: String(e.message) }; }
  }

  facts.push(row);
  const got = Object.entries(row.docs).filter(([, d]) => !d.error).map(([k]) => k).join(', ');
  console.log(`${slug.padEnd(50)} ${got || 'nothing'}${row.image?.staged ? ' + image' : ''}  of ${all.length} docs on the page`);
}

fs.writeFileSync(path.join(OUT, 'facts.json'), `${JSON.stringify(facts, null, 1)}\n`);
console.log(`\n${facts.length} products staged`);
