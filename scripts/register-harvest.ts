/**
 * Turn a harvested catalogue plus a distributor stock list into manifest
 * records, and pull the official pack shots down beside them.
 *
 * This is the mechanical half of adding a brand. It writes everything that can
 * be derived from source data: slugs, product lines, categories, pack sizes,
 * classifications, the specs that appear in the manufacturer's own usage text,
 * applications, and the image. It deliberately does not write the product
 * description or the meta description, because those are original copy and
 * belong to a content pass, and check-manifest.ts will refuse to ship a record
 * without them.
 *
 * Records are created as documents_pending, which is the honest state for a
 * manufacturer that gates its data sheets: real specs, real image, a document
 * request in place of a download.
 *
 * Idempotent. An existing record keeps its slug and its written copy; only the
 * derived fields are refreshed.
 *
 * Usage: npx tsx scripts/register-harvest.ts --brand vetonit [--limit 5]
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { slugify } from '../src/lib/slugify';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const REPO = process.cwd();
const DIR = path.join(REPO, 'data', 'discovery');
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');

interface StockItem { category: string; name: string; description: string; pack: string }
interface Harvested {
  source_slug: string; name: string; source_category: string; tagline: string;
  description: string; product_url: string; image_url: string; tds_url: string;
  sds_url: string; uses: string[]; advantages: string[]; usage: Record<string, string>;
}

/**
 * The distributor's own category headings, mapped to the product line each
 * becomes on the site and the per product category used for spec extraction
 * and schema. Keyed on the stock list headings exactly as supplied.
 */
const LINES: Record<string, { slug: string; folder: string; fallback: TdsCategory }> = {
  'TILING & SPECIALTY ADHESIVES': { slug: 'tile-adhesives-and-grouts', folder: 'tile-adhesives', fallback: 'tile_adhesive' },
  'WATERPROOFING': { slug: 'waterproofing', folder: 'waterproofing', fallback: 'waterproofing' },
  'SEALANTS & JOINTS': { slug: 'sealants-and-joints', folder: 'sealants', fallback: 'sealant' },
  'FLOORING': { slug: 'flooring-systems', folder: 'flooring', fallback: 'flooring_system' },
  'SURFACE TREATMENTS & FINISHES': { slug: 'surface-treatments', folder: 'surface-treatments', fallback: 'surface_treatment' },
  'HIGH PRECESION GROUT & CONCRETE REPAIR': { slug: 'grouts-and-concrete-repair', folder: 'grouts-repair', fallback: 'repair_mortar' },
  'PLASTER & MASONRY': { slug: 'plasters-and-masonry', folder: 'plasters', fallback: 'plaster' },
  'BONDING AGENTS & SOIL STABILIZER': { slug: 'bonding-agents', folder: 'bonding-agents', fallback: 'bonding_agent' },
};
/** The microcement heading carries a long parenthetical, so it is matched by prefix. */
const MICROCEMENT = { slug: 'microcement-systems', folder: 'microcement', fallback: 'microcement' as TdsCategory };

function lineFor(category: string) {
  if (/^DECOFLOOR/i.test(category)) return MICROCEMENT;
  return LINES[category];
}

/**
 * Narrow the category from the product's own words. The product line gives a
 * sensible default; this only overrides it where the text is unambiguous,
 * because a wrong category changes which specs are extracted and which
 * standard the page cites.
 */
function categoryFor(text: string, fallback: TdsCategory): TdsCategory {
  const t = text.toLowerCase();
  if (/\bepoxy\b.*\bgrout\b|\bgrout\b.*\bepoxy\b/.test(t)) return 'epoxy_grout';
  if (/\btile grout\b|\bjoint filler\b|\bgrout\b/.test(t) && !/precision|non.?shrink|anchor/.test(t)) return 'cementitious_grout';
  if (/\btile adhesive\b|\bfixing (?:of )?tiles?\b|\btile fix\b/.test(t)) return 'tile_adhesive';
  if (/\bparquet\b|\bvinyl\b|\bresilient\b|\bcarpet\b/.test(t)) return 'resilient_adhesive';
  if (/\bself.?level/.test(t)) return 'self_leveling';
  if (/\bmicrocement\b|\bdecorative\b.*\bcoat/.test(t)) return 'microcement';
  if (/\bwaterproof|\bmembrane\b|\btanking\b/.test(t)) return 'waterproofing';
  if (/\bsealant\b|\bjoint seal/.test(t)) return 'sealant';
  if (/\bnon.?shrink\b|\bprecision\b|\banchor/.test(t)) return 'precision_grout';
  if (/\brepair mortar\b|\bmicro.?concrete\b|\bfairing coat\b|\bstructural repair\b/.test(t)) return 'repair_mortar';
  if (/\bprimer\b/.test(t)) return 'primer';
  if (/\bbonding agent\b|\badmixture\b|\bsoil stabilis/.test(t)) return 'bonding_agent';
  if (/\bplaster\b|\brender\b|\bmasonry mortar\b/.test(t)) return 'plaster';
  if (/\bputty\b|\bstucco\b|\bsealer\b|\bwater repellent\b|\brelease agent\b|\bretarder\b/.test(t)) return 'surface_treatment';
  if (/\bscreed\b|\bfloor (?:topping|hardener)\b|\bepoxy (?:topping|floor)/.test(t)) return 'flooring_system';
  return fallback;
}

/** Pull the figures a manufacturer states in prose into named spec fields. */
function specsFrom(stock: StockItem, h?: Harvested): Record<string, string> {
  const specs: Record<string, string> = {};
  const corpus = [stock.description, h?.tagline, h?.description, ...Object.values(h?.usage ?? {})]
    .filter(Boolean)
    .join(' ');

  if (stock.pack) specs.pack_size = stock.pack.replace(/\s+/g, ' ').trim();

  const cls = corpus.match(/\b(C[12]\s?[A-Z]{0,3}(?:\s?S[12])?|R[1-4]|RG|CG\s?[12]\s?[A-Z]{0,2}|EN\s?1504-\d)\b/);
  if (cls) specs.classification = cls[1].replace(/\s+/g, ' ').trim();

  const thickness = corpus.match(/thickness\s+(?:of\s+)?(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?\s*mm)/i)
    ?? corpus.match(/\b(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?\s*mm)\s+(?:thick|in thickness)/i);
  if (thickness) specs.thickness = thickness[1].replace(/\s+/g, ' ');

  const water = corpus.match(/(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?)\s*(?:L|litres?|liters?)\.?\s*of water/i);
  if (water) specs.mixing_ratio = `${water[1].replace(/\s+/g, ' ')} litres of water per bag`;

  const adjust = corpus.match(/adjustability time of\s+(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?\s*minutes?)/i);
  if (adjust) specs.adjustment_time = adjust[1].replace(/\s+/g, ' ');

  const open = corpus.match(/open time[^.]{0,30}?(\d+(?:\.\d+)?\s*(?:-|to)?\s*\d*\s*minutes?)/i);
  if (open) specs.open_time = open[1].replace(/\s+/g, ' ');

  const cover = corpus.match(/(\d+(?:\.\d+)?(?:\s*(?:-|to)\s*\d+(?:\.\d+)?)?\s*(?:kg|l|litres?)\s*\/?\s*(?:per\s*)?m2?)/i);
  if (cover) specs.coverage = cover[1].replace(/\s+/g, ' ');

  const cure = corpus.match(/(?:cure|curing|traffic)[^.]{0,40}?(\d+\s*(?:-|to)?\s*\d*\s*(?:hours?|days?))/i);
  if (cure) specs.set_time = cure[1].replace(/\s+/g, ' ');

  return specs;
}

async function main() {
  const arg = (f: string) => { const i = process.argv.indexOf(f); return i === -1 ? undefined : process.argv[i + 1]; };
  const brand = arg('--brand') ?? 'vetonit';
  const limit = Number(arg('--limit') ?? 0);

  const stock: { products: StockItem[] } = JSON.parse(fs.readFileSync(path.join(DIR, `${brand}-stocklist.json`), 'utf8'));
  const harvest: { products: Harvested[] } = JSON.parse(fs.readFileSync(path.join(DIR, `${brand}.json`), 'utf8'));
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const codeOf = (s: string) => { const m = s.match(/\b([a-z]{1,3}\s?\d{2,4})\b/i); return m ? m[1].toLowerCase().replace(/\s/g, '') : ''; };
  const byKey = new Map<string, Harvested>();
  const byCode = new Map<string, Harvested>();
  for (const h of harvest.products) {
    byKey.set(key(h.name), h);
    byKey.set(key(h.source_slug.replace(/-\d+$/, '')), h);
    const c = codeOf(h.name);
    if (c && !byCode.has(c)) byCode.set(c, h);
  }
  const match = (name: string) => byKey.get(key(name)) ?? (codeOf(name) ? byCode.get(codeOf(name)) : undefined);

  const now = new Date().toISOString().slice(0, 10);
  let created = 0, refreshed = 0, images = 0, noImage = 0;
  const items = limit ? stock.products.slice(0, limit) : stock.products;

  for (const item of items) {
    const line = lineFor(item.category);
    if (!line) { console.warn(`  no product line mapped for "${item.category}", skipping ${item.name}`); continue; }

    const h = match(item.name);
    const slug = slugify(item.name);
    const category = categoryFor([item.description, h?.tagline].filter(Boolean).join(' '), line.fallback);
    const imgRel = `/images/brands/${brand}/${line.folder}/${slug}.webp`;

    // Pull the official pack shot once. Square canvas on white, matching the
    // 600x600 convention the existing brands use.
    let imageFound = false;
    const imgAbs = path.join(REPO, 'public', imgRel.replace(/^\//, ''));
    if (fs.existsSync(imgAbs)) {
      imageFound = true;
    } else if (h?.image_url) {
      try {
        const res = await fetch(h.image_url);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.mkdirSync(path.dirname(imgAbs), { recursive: true });
          await sharp(buf)
            .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .webp({ quality: 90, effort: 6 })
            .toFile(imgAbs);
          imageFound = true;
          images++;
        }
      } catch (e) {
        console.warn(`  image failed for ${slug}: ${(e as Error).message}`);
      }
    }
    if (!imageFound) noImage++;

    const specs = specsFrom(item, h);
    const applications = (h?.uses ?? []).slice(0, 8);

    const existing = manifest.find((r) => r.brand === brand && r.slug === slug);
    if (existing) {
      existing.product_line = line.slug;
      existing.category = category;
      existing.classification = specs.classification ?? existing.classification;
      existing.specs = { ...specs, ...existing.specs };
      if (applications.length > 0 && existing.applications.length === 0) existing.applications = applications;
      existing.image = imageFound
        ? { status: 'found', path: imgRel, source_url: h?.image_url ?? '' }
        : existing.image;
      existing.updated_at = now;
      refreshed++;
      continue;
    }

    manifest.push({
      slug,
      brand,
      product_line: line.slug,
      name: item.name,
      category,
      classification: specs.classification ?? '',
      description: '',
      meta_description: '',
      image: imageFound
        ? { status: 'found', path: imgRel, source_url: h?.image_url ?? '' }
        : { status: 'missing', path: imgRel, source_url: '' },
      tds: {
        status: 'documents_pending',
        source_url: h?.product_url ?? '',
        local_path: '',
        sha256: '',
        revision_date: '',
        verified_name_match_score: 0,
      },
      specs,
      applications,
      equivalents: [],
      page_status: 'pending',
      notes: h ? `Catalogue page: ${h.product_url}` : 'Not in the published catalogue, built from the stock list.',
      updated_at: now,
    });
    created++;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    `${brand}: ${created} records created, ${refreshed} refreshed, ${images} images downloaded, ${noImage} without an image.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
