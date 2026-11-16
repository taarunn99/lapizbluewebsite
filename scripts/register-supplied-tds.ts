/**
 * Register a data sheet supplied by hand, usually one the manufacturer's own
 * product page does not link.
 *
 * It runs the same gate as every automated registrar: the product name has to
 * appear on page one, the specs come out of the sheet, and the file is hashed.
 * The only difference is where the file came from, which is why --note exists:
 * a sheet from another region is still the manufacturer's document for the
 * same product, but the record should say so.
 *
 * Usage:
 *   npx tsx scripts/register-supplied-tds.ts --brand mapei --slug kerabond-t \
 *     --file ~/Downloads/1_00078_kerabond-t_en-sg_....pdf \
 *     --note "Singapore edition, document 00078. The Mapei UAE product page links no sheet."
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getDocumentProxy, extractText } from 'unpdf';
import type { ManifestRecord } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';
import { extractSpecs, fixLigatures } from './lib/spec-maps';

const MANIFEST = 'data/manifest.json';

function arg(name: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? '' : process.argv[i + 1];
}

async function main() {
  const brand = arg('brand');
  const slug = arg('slug');
  const file = arg('file').replace(/^~/, process.env.HOME ?? '~');
  const note = arg('note');
  const force = process.argv.includes('--force');
  if (!brand || !slug || !file) {
    console.error('Need --brand, --slug and --file.');
    process.exit(1);
  }
  if (!fs.existsSync(file)) {
    console.error(`No file at ${file}`);
    process.exit(1);
  }

  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rec = manifest.find((r) => r.brand === brand && r.slug === slug);
  if (!rec) {
    console.error(`No ${brand} record with slug ${slug}.`);
    process.exit(1);
  }

  const buf = fs.readFileSync(file);
  if (buf.subarray(0, 4).toString() !== '%PDF') {
    console.error('That file is not a PDF.');
    process.exit(1);
  }

  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const { text: pages } = await extractText(pdf, { mergePages: false });
  const page1 = fixLigatures(Array.isArray(pages) ? pages[0] : String(pages));
  const full = fixLigatures(Array.isArray(pages) ? pages.join('\n') : String(pages));

  const check = verifyNameInPageText(rec.name, page1);
  console.log(`Name check: ${check.score} against "${check.bestLine}"${check.suffixTrap ? '  SUFFIX TRAP' : ''}`);
  if ((check.score < 90 || check.suffixTrap) && !force) {
    console.error('Refused. Page one does not name this product. Pass --force only if you have read the sheet yourself.');
    process.exit(1);
  }

  const rel = `/tds/${brand}/${slug}.pdf`;
  const abs = path.join('public', rel.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buf);

  rec.tds = {
    status: 'verified',
    source_url: rec.tds.source_url,
    local_path: rel,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
    size_bytes: buf.length,
    revision_date: extractRevisionDate(full),
    verified_name_match_score: check.score,
  };

  // The stock list stays the authority on what is sold here.
  const fromSheet = extractSpecs(rec.category, full);
  const added: string[] = [];
  for (const [field, value] of Object.entries(fromSheet)) {
    if (field === 'pack_size' || field === 'colours') continue;
    if (!rec.specs[field]) { rec.specs[field] = value; added.push(field); }
  }
  if (note && !rec.notes.includes(note)) rec.notes = `${rec.notes} ${note}`.trim();
  rec.updated_at = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Registered ${rel} at ${(buf.length / 1024 / 1024).toFixed(1)} MB.`);
  console.log(`Specs now ${Object.keys(rec.specs).length}, added: ${added.join(', ') || 'none'}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
