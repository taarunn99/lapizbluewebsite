/**
 * Fetch Mapei data sheets from their own product pages and register them.
 *
 * Mapei's UAE site links the sheet from each product page, and the filename
 * carries the document number and the locale: provider 59 is the Middle East
 * library, which is the one our other sheets come from, so a page fetched here
 * gives the edition our customers are actually sold. A product page links
 * several documents and only the ones numbered 1_ are the technical data
 * sheet; 2_ is the safety sheet and 7_ is the environmental declaration.
 *
 * The gate is the same one every registrar here runs: the product has to be
 * named on page one of the PDF, or nothing is written. That gate exists
 * because Mapei's naming makes a longer product look like a match, which is
 * how a page for one product once ended up publishing another's figures.
 *
 * Usage:
 *   npx tsx scripts/fetch-mapei-sheets.ts --list links.txt
 *   npx tsx scripts/fetch-mapei-sheets.ts --slug keraflex-maxi-s1-zero --url https://...
 *   ... --dry   to resolve and check without writing anything
 *
 * A list is one entry per line. Either a bare URL, in which case the product
 * is matched to a record by the name printed on the sheet, or "slug url" when
 * the site's name and ours differ, as with a rebranded product.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getDocumentProxy, extractText } from 'unpdf';
import type { ManifestRecord } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';
import { extractSpecs, fixLigatures } from './lib/spec-maps';

const MANIFEST = 'data/manifest.json';
const AE = 'https://www.mapei.com/ae/en/products-and-solutions/products/detail/';

const arg = (n: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i === -1 ? '' : process.argv[i + 1];
};
const DRY = process.argv.includes('--dry');
/** Take the sheet's value even where the record already holds one. */
const REFRESH = process.argv.includes('--refresh');

interface Job { slug?: string; url: string }

function readJobs(): Job[] {
  if (arg('url')) return [{ slug: arg('slug') || undefined, url: arg('url') }];
  const file = arg('list');
  if (!file) {
    console.error('Need --list <file> or --url <url>.');
    process.exit(1);
  }
  return fs
    .readFileSync(file.replace(/^~/, process.env.HOME ?? '~'), 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const parts = l.split(/\s+/);
      // A bare slug is as good as a URL: the product detail path is predictable.
      const toUrl = (s: string) => (s.startsWith('http') ? s : AE + s);
      return parts.length > 1
        ? { slug: parts[0], url: toUrl(parts[1]) }
        : { url: toUrl(parts[0]) };
    });
}

/** The technical data sheet among the several documents a page links. */
async function findSheet(url: string): Promise<string | null> {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) return null;
  const html = await res.text();
  const pdfs = [...html.matchAll(/https:\/\/cdnmedia\.mapei\.com\/docs\/librariesprovider\d+\/products-documents\/[^"']+?\.pdf/g)]
    .map((m) => m[0]);
  const sheets = pdfs.filter((u) => /^1_\d+_/.test(path.basename(u)));
  // Prefer the Middle East edition, which is what the rest of the site uses.
  return sheets.find((u) => /_en-ae_/.test(u)) ?? sheets[0] ?? null;
}

async function main() {
  const jobs = readJobs();
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const mapei = manifest.filter((r) => r.brand === 'mapei');

  let done = 0;
  const skipped: string[] = [];

  for (const job of jobs) {
    const label = job.slug ?? path.basename(new URL(job.url).pathname);
    const pdfUrl = await findSheet(job.url);
    if (!pdfUrl) {
      skipped.push(`${label}: the product page links no technical data sheet`);
      continue;
    }

    const res = await fetch(pdfUrl);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== '%PDF') {
      skipped.push(`${label}: the link did not return a PDF`);
      continue;
    }

    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const { text: pages } = await extractText(pdf, { mergePages: false });
    const page1 = fixLigatures(Array.isArray(pages) ? pages[0] : String(pages));
    const full = fixLigatures(Array.isArray(pages) ? pages.join('\n') : String(pages));

    // Find the record. An explicit slug wins; otherwise the sheet itself says
    // which product it is and the best scoring record has to clear the gate.
    let rec = job.slug ? mapei.find((r) => r.slug === job.slug) : undefined;
    let check = rec ? verifyNameInPageText(rec.name, page1) : null;
    if (!rec) {
      const scored = mapei
        .map((r) => ({ r, c: verifyNameInPageText(r.name, page1) }))
        .filter((x) => !x.c.suffixTrap)
        .sort((a, b) => b.c.score - a.c.score || b.r.name.length - a.r.name.length);
      if (scored.length && scored[0].c.score >= 90) {
        rec = scored[0].r;
        check = scored[0].c;
      }
    }
    if (!rec || !check) {
      skipped.push(`${label}: no record matches the product named on the sheet`);
      continue;
    }
    // A rebrand defeats the gate honestly. Mapei renamed Keraflex Maxi S1 to
    // Keraflex Maxi S1 Zero and still publishes one sheet under the old name,
    // so the suffix trap that exists to stop Keraset taking Keraset Maxi's
    // sheet fires on a pair that really is one product. The only thing that
    // can settle that is a person, so an explicit slug in the list counts as
    // the owner asserting the mapping. The sheet still has to name the same
    // stem, and the record says where its sheet came from.
    let rebrand = '';
    if (check.score < 90 || check.suffixTrap) {
      const ours = rec.name.toUpperCase().replace(/[^A-Z0-9]+/g, ' ').trim();
      const page = page1.toUpperCase().replace(/[^A-Z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
      const stemOk = job.slug && page.includes(ours.split(' ').slice(0, -1).join(' ')) && ours.split(' ').length > 1;
      if (!stemOk) {
        skipped.push(
          `${label}: page one names "${check.bestLine}", which does not match "${rec.name}"${check.suffixTrap ? ' (suffix trap)' : ''}`,
        );
        continue;
      }
      rebrand = check.bestLine || rec.name.split(' ').slice(0, -1).join(' ');
      console.log(`      rebrand accepted: the sheet names the earlier version of ${rec.name}`);
    }

    const already = Boolean(
      rec.tds?.local_path && fs.existsSync(path.join('public', rec.tds.local_path.replace(/^\//, ''))),
    );
    console.log(
      `${already ? 'have' : 'new '}  ${rec.slug.padEnd(30)} ${check.score}  ${(buf.length / 1024 / 1024).toFixed(1)} MB  ${path.basename(pdfUrl).slice(0, 52)}`,
    );
    if (DRY) continue;

    const rel = `/tds/mapei/${rec.slug}.pdf`;
    const abs = path.join('public', rel.replace(/^\//, ''));
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, buf);

    rec.tds = {
      status: 'verified',
      source_url: pdfUrl,
      local_path: rel,
      sha256: crypto.createHash('sha256').update(buf).digest('hex'),
      size_bytes: buf.length,
      revision_date: extractRevisionDate(full),
      verified_name_match_score: check.score,
    };

    // The stock list stays the authority on packs and colours.
    //
    // Everything else: a record that has never had a sheet carries specs
    // guessed from a stock list or a catalogue page, and the sheet supersedes
    // them. Only filling the blanks leaves those guesses standing, which is
    // how a tile adhesive kept a classification of "ISO 13007-1 C2TE" after
    // its own sheet arrived saying C2TES1, losing the deformability class a
    // buyer actually selects on. Re-registering a sheet we already hold stays
    // conservative and fills blanks only, unless asked to refresh.
    const fromSheet = extractSpecs(rec.category, full);
    const supersede = !already || REFRESH;
    const changed: string[] = [];
    for (const [field, value] of Object.entries(fromSheet)) {
      if (field === 'pack_size' || field === 'colours') continue;
      const old = rec.specs[field];
      if (!old) {
        rec.specs[field] = value;
      } else if (supersede && old !== value) {
        rec.specs[field] = value;
        changed.push(`${field}: "${old}" -> "${value}"`);
      }
    }
    for (const c of changed) console.log(`      ${c}`);
    // The record carries the class twice: once in specs and once as a
    // top-level field that the page subtitle and the Class row read. A sheet
    // that corrects one has to correct the other, or the page contradicts
    // itself, which is how a C2TE S1 adhesive kept printing plain C2TE after
    // its own sheet arrived.
    const sheetClass = fromSheet.classification;
    if (sheetClass && supersede) {
      const bare = sheetClass.replace(/^.*?\b(?=[CR]\d)/, '').trim();
      const keepsStandard = /^(EN|ISO|ASTM|UNI|DIN)/i.test(rec.classification ?? '');
      const standard = (rec.classification ?? '').match(/^((?:EN|ISO|ASTM|UNI|DIN)[^\s]*(?:\s\d[\w-]*)?)/i);
      const next = keepsStandard && standard ? `${standard[1]} ${bare}` : bare;
      if (rec.classification !== next) {
        console.log(`      classification (record): "${rec.classification}" -> "${next}"`);
        rec.classification = next;
      }
    }

    if (rebrand) {
      rec.tds.rebrand_of = rebrand;
      const note = `Mapei publishes one data sheet for this product under its previous name, ${rebrand}. Registered against ${rec.name} on the owner's instruction that they are the same product.`;
      if (!rec.notes.includes('previous name')) rec.notes = `${rec.notes} ${note}`.trim();
    }
    rec.updated_at = new Date().toISOString().slice(0, 10);
    done += 1;
  }

  if (!DRY && done) {
    fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  console.log(`\n${done} registered, ${skipped.length} skipped of ${jobs.length}`);
  for (const s of skipped) console.log(`  ${s}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
