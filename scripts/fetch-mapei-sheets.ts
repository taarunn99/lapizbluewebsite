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
/**
 * Mapei runs a site per country and each one publishes its own edition of the
 * same document. The UAE site is slowest to fill, so a product sold here
 * often has no sheet there and four elsewhere, under the identical document
 * number. The owner's instruction is that any country's sheet is the sheet:
 * they are already sent to customers as they are. So the Emirates edition is
 * preferred and the rest are tried in turn rather than giving up.
 */
const REGIONS = [
  'ae/en', 'sa/en', 'qa/en', 'eg/en', 'za/en',
  'gb/en', 'ie/en', 'it/en', 'in/en', 'sg/en',
  'my/en', 'au/en', 'nz/en', 'us/en', 'ca/en', 'ph/en',
];
const detail = (region: string, slug: string) =>
  `https://www.mapei.com/${region}/products-and-solutions/products/detail/${slug}`;

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
      const toUrl = (s: string) => s;
      return parts.length > 1
        ? { slug: parts[0], url: toUrl(parts[1]) }
        : { url: toUrl(parts[0]) };
    });
}

/** The technical data sheet among the several documents one page links. */
async function sheetOnPage(url: string): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(url, { redirect: 'follow' });
  } catch {
    return null;
  }
  if (!res.ok) return null;
  const html = await res.text();
  const pdfs = [...html.matchAll(/https:\/\/cdnmedia\.mapei\.com\/docs\/librariesprovider\d+\/products-documents\/[^"']+?\.pdf/g)]
    .map((m) => m[0]);
  // 1_ is the technical sheet. 2_ is the safety sheet and 7_ the
  // environmental declaration, neither of which is what a page needs.
  const sheets = pdfs.filter((u) => /^1_\d+_/.test(path.basename(u)));
  return sheets.find((u) => /_en-ae_/.test(u)) ?? sheets.find((u) => /_en[-_]/.test(u)) ?? sheets[0] ?? null;
}

/** The product's own pack shot, which the page carries as its og:image. */
function packShotOn(html: string): string | null {
  const og = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+products-images[^"]+)"/);
  return og ? og[1].split('?')[0] : null;
}

interface Found { pdf: string; region: string; page: string }

/**
 * Walk the countries until one of them publishes the sheet. A bare slug is
 * tried everywhere; a full URL is tried as given first, then its slug is
 * tried everywhere else, so a link to one country still finds the others.
 */
async function findSheet(input: string): Promise<Found | null> {
  const slug = input.startsWith('http') ? path.basename(new URL(input).pathname) : input;
  const first = input.startsWith('http') ? [input] : [];
  const rest = REGIONS.map((r) => detail(r, slug)).filter((u) => u !== input);
  for (const page of [...first, ...rest]) {
    const pdf = await sheetOnPage(page);
    if (pdf) {
      const m = page.match(/mapei\.com\/([a-z]{2}\/[a-z]{2})\//);
      return { pdf, region: m ? m[1] : 'unknown', page };
    }
  }
  return null;
}

async function main() {
  const jobs = readJobs();
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const mapei = manifest.filter((r) => r.brand === 'mapei');

  let done = 0;
  const skipped: string[] = [];

  for (const job of jobs) {
    const label = job.slug ?? (job.url.startsWith('http') ? path.basename(new URL(job.url).pathname) : job.url);
    const found = await findSheet(job.url);
    if (!found) {
      skipped.push(`${label}: no Mapei country site publishes a technical data sheet for this`);
      continue;
    }
    const pdfUrl = found.pdf;

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
      `${already ? 'have' : 'new '}  ${rec.slug.padEnd(30)} ${String(check.score).padStart(3)}  ${found.region.padEnd(5)} ${(buf.length / 1024 / 1024).toFixed(1)} MB  ${path.basename(pdfUrl).slice(0, 46)}`,
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
    if (found.region !== 'ae/en') {
      const country = found.region.split('/')[0].toUpperCase();
      const note = `Data sheet is Mapei's ${country} edition. Mapei publishes one document per product and the country editions carry the same document number; the Emirates site does not host this one.`;
      if (!rec.notes.includes('edition. Mapei publishes')) rec.notes = `${rec.notes} ${note}`.trim();
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
