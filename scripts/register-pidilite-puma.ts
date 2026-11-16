/**
 * Build Pidilite Puma manifest records from the owner's stock list and the
 * harvested Grupo Puma catalogue.
 *
 * Two sources are joined, each authoritative over what it actually knows.
 * The stock list says which products Lapiz Blue sells and carries the pack
 * sizes, the colours and the pack shot paths, which are facts about what is
 * on the shelf here and are not in the manufacturer's catalogue. The
 * catalogue says where the data sheet lives and what the sheet states, which
 * is the manufacturer's to declare. Where both hold a classification the
 * catalogue wins, because it is the figure the sheet itself prints; a
 * disagreement is recorded in the record's notes rather than smoothed over.
 *
 * Spec extraction runs the Puma label set in scripts/lib/spec-maps, which was
 * written against Grupo Puma's own row labels.
 *
 * It does not write product descriptions. Those are original copy.
 *
 * Usage: npx tsx scripts/register-pidilite-puma.ts [--limit N]
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getDocumentProxy, extractText } from 'unpdf';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate, normalize, ratio } from './lib/verify';
import { extractSpecs, fixLigatures } from './lib/spec-maps';

const REPO = process.cwd();
const BRAND = 'pidilite-puma';
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');

interface Stocked {
  name: string;
  slug: string;
  product_line: string;
  classification: string;
  colours: string[];
  pack_sizes: string[];
  type: string;
  image_path: string;
}

interface Catalogued {
  name: string;
  product_url: string;
  line: string;
  category: string;
  image_url: string;
  tds_url: string;
  classification: string;
  description: string;
  spec_text: string;
}

/** Narrow the category from the product's own words, then from its line. */
function categoryFor(stock: Stocked, hit: Catalogued | undefined): TdsCategory {
  const t = `${stock.name} ${stock.type} ${hit?.category ?? ''} ${hit?.description ?? ''}`.toLowerCase();
  if (/\bepox/.test(t) && /\bgrout\b/.test(t)) return 'epoxy_grout';
  if (/\bgrout\b|morcemcolor/.test(t)) return 'cementitious_grout';
  if (/primer/.test(t)) return 'primer';
  if (/self level|self-level|levelling compound|leveling compound/.test(t)) return 'self_leveling';
  if (/waterproof|membrane|morcem dry/.test(t)) return 'waterproofing';
  if (/tile adhesive|stone adhesive|thin-set|thin set|pegoland/.test(t)) return 'tile_adhesive';
  if (/sealant/.test(t)) return 'sealant';
  if (/repair mortar|morcemrest/.test(t)) return 'repair_mortar';
  if (/plaster|render|estuco|morcemsec/.test(t)) return 'plaster';
  if (stock.product_line === 'tile-adhesives-and-grouts') return 'tile_adhesive';
  if (stock.product_line === 'waterproofing') return 'waterproofing';
  if (stock.product_line === 'self-leveling') return 'self_leveling';
  return 'flooring_system';
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Join on the product name. Grupo Puma appends the standard code to its own
 * titles ("Pegoland Superflex C2 TE S2") and spells a few differently from the
 * stock list ("Morcemcolor Epoxy" against "Morcemcolor Epoxi", "Fast Flex"
 * against "Fastflex"), so an exact match is tried first, then a title that
 * opens with the stock name, then the closest name by edit distance. The last
 * pass compares against only the opening of the catalogue title so that the
 * trailing standard code does not count against the score.
 */
function matchCatalogue(name: string, catalogue: Catalogued[]): Catalogued | undefined {
  const key = norm(name);
  const exact = catalogue.find((p) => norm(p.name) === key);
  if (exact) return exact;

  const opens = catalogue
    .filter((p) => norm(p.name).startsWith(key))
    .sort((a, b) => a.name.length - b.name.length);
  if (opens.length) return opens[0];

  const target = normalize(name);
  const scored = catalogue
    .map((p) => ({ p, score: ratio(target, normalize(p.name).slice(0, target.length + 4)) }))
    .sort((a, b) => b.score - a.score);
  return scored[0] && scored[0].score >= 90 ? scored[0].p : undefined;
}

async function get(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Grupo Puma stamps the footer "Rev. 2025_12" on most sheets and "Rev. 25_11"
 * on some, neither of which the shared patterns recognise. Kept local rather
 * than added to lib/verify so a re-run of another brand's registrar cannot
 * pick up a new revision date from it.
 */
function revisionDate(fullText: string): string {
  const shared = extractRevisionDate(fullText);
  if (shared) return shared;
  return fullText.match(/Rev\.?\s*(\d{2,4}[_\-/]\d{1,2})/i)?.[1] ?? '';
}

async function main() {
  const limArg = process.argv.indexOf('--limit');
  const limit = limArg === -1 ? 0 : Number(process.argv[limArg + 1]);

  const stock: { products: Stocked[] } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'data', 'discovery', 'pidilite-puma-products.json'), 'utf8'),
  );
  const cat: { products: Catalogued[] } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'data', 'discovery', 'pidilite-puma-catalogue.json'), 'utf8'),
  );
  const now = new Date().toISOString().slice(0, 10);

  const items = limit ? stock.products.slice(0, limit) : stock.products;

  /* The records are built first and merged into the manifest in one burst at
     the end: other registrars write the same file, so it is held open for as
     short a time as possible. */
  const built: Array<{ record: ManifestRecord; verified: boolean }> = [];
  let noMatch = 0, sheets = 0, nameFails = 0, missingImages = 0;

  for (const [i, s] of items.entries()) {
    const hit = matchCatalogue(s.name, cat.products);
    if (!hit) noMatch++;

    const slug = s.slug;
    const category = categoryFor(s, hit);

    const imgRel = s.image_path;
    const hasImage = fs.existsSync(path.join(REPO, 'public', imgRel.replace(/^\//, '')));
    if (!hasImage) missingImages++;

    let tds: ManifestRecord['tds'] = {
      status: 'documents_pending',
      source_url: hit?.tds_url || hit?.product_url || '',
      local_path: '',
      sha256: '',
      revision_date: '',
      verified_name_match_score: 0,
    };

    if (hit?.tds_url) {
      const pdfRel = `/tds/${BRAND}/${slug}.pdf`;
      const pdfAbs = path.join(REPO, 'public', pdfRel.replace(/^\//, ''));
      const buf = await get(hit.tds_url);

      if (buf && buf.subarray(0, 4).toString() === '%PDF') {
        try {
          const pdf = await getDocumentProxy(new Uint8Array(buf));
          const { text: pages } = await extractText(pdf, { mergePages: false });
          const page1 = fixLigatures(Array.isArray(pages) ? pages[0] : String(pages));
          const full = fixLigatures(Array.isArray(pages) ? pages.join('\n') : String(pages));
          const check = verifyNameInPageText(s.name, page1);

          if (check.score >= 90 && !check.suffixTrap) {
            fs.mkdirSync(path.dirname(pdfAbs), { recursive: true });
            fs.writeFileSync(pdfAbs, buf);
            tds = {
              status: 'verified',
              source_url: hit.tds_url,
              local_path: pdfRel,
              sha256: crypto.createHash('sha256').update(buf).digest('hex'),
              size_bytes: buf.length,
              revision_date: revisionDate(full),
              verified_name_match_score: check.score,
            };
            sheets++;
          } else {
            nameFails++;
            console.log(
              `      name check rejected ${s.name}: score ${check.score}` +
                `${check.suffixTrap ? ', suffix trap' : ''} on "${check.bestLine}"`,
            );
          }
        } catch {
          /* unreadable PDF, stays pending */
        }
      }
    }

    const specs: Record<string, string> = hit ? extractSpecs(category, hit.spec_text, 'puma') : {};
    // The stock list wins on what is in the warehouse.
    if (s.pack_sizes.length) specs.pack_size = s.pack_sizes.slice(0, 4).join(', ');
    else delete specs.pack_size;
    if (s.colours.length) specs.colours = s.colours.slice(0, 8).join(', ');

    const classification = hit?.classification || s.classification || '';
    // The code is stated in the sheet's own table on most products and only in
    // the title on the rest, so where the extractor found none the catalogue's
    // own reading of it fills the spec row.
    if (classification && !specs.classification) specs.classification = classification;
    const notes: string[] = [];
    if (hit) notes.push(`Catalogue page: ${hit.product_url}.`);
    else notes.push('No Grupo Puma catalogue match found.');
    if (hit?.classification && s.classification && hit.classification !== s.classification) {
      notes.push(
        `Classification differs: sheet says ${hit.classification}, stock list says ${s.classification}.`,
      );
    }

    built.push({
      verified: tds.status === 'verified',
      record: {
        slug,
        brand: BRAND,
        product_line: s.product_line,
        name: s.name,
        category,
        classification,
        description: '',
        meta_description: '',
        image: hasImage
          ? { status: 'found', path: imgRel, source_url: hit?.image_url ?? '' }
          : { status: 'missing', path: imgRel, source_url: hit?.image_url ?? '' },
        tds,
        specs,
        applications: [],
        equivalents: [],
        page_status: 'pending',
        notes: notes.join(' '),
        updated_at: now,
      },
    });

    console.log(
      `  ${String(i + 1).padStart(2)}/${items.length}  ${s.name.padEnd(30).slice(0, 30)}` +
        ` ${category.padEnd(19)} sheet:${tds.status === 'verified' ? 'y' : 'n'}` +
        ` img:${hasImage ? 'y' : 'n'} specs:${String(Object.keys(specs).length).padStart(2)}`,
    );
    await sleep(200);
  }

  // Read, merge, write. Deliberately the only moment this script touches the
  // manifest, because other registrars are writing the same file.
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  let created = 0, refreshed = 0;
  for (const { record } of built) {
    const existing = manifest.findIndex((r) => r.brand === BRAND && r.slug === record.slug);
    if (existing === -1) {
      manifest.push(record);
      created++;
    } else {
      const prev = manifest[existing];
      manifest[existing] = {
        ...prev,
        product_line: record.product_line,
        category: record.category,
        classification: record.classification || prev.classification,
        image: record.image.status === 'found' ? record.image : prev.image,
        // A sheet that failed the name check must never displace one that
        // passed it on an earlier run.
        tds: record.tds.status === 'verified' ? record.tds : prev.tds,
        specs: { ...prev.specs, ...record.specs },
        notes: record.notes,
        updated_at: record.updated_at,
      };
      refreshed++;
    }
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  const gated = built.filter(({ record }) => Object.keys(record.specs).length >= 5).length;
  console.log(
    `\n${BRAND}: ${created} created, ${refreshed} refreshed, ${sheets} verified sheets, ` +
      `${nameFails} rejected on the name check, ${noMatch} with no catalogue match, ` +
      `${missingImages} missing images, ${gated} with 5 or more spec fields.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
