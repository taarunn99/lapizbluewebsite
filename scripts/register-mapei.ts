/**
 * Build Mapei manifest records from the harvested catalogue, limited to what
 * Lapiz Blue actually stocks.
 *
 * Two sources are joined. The curated list says which products are stocked and
 * carries the pack sizes and colours from Zoho. The catalogue says where the
 * image and the data sheet live. A product needs both to become a page.
 *
 * Spec extraction uses the existing Mapei tuned maps in scripts/lib/spec-maps,
 * which were written against this manufacturer's sheet layout, rather than the
 * per brand parsing the other registrars need.
 *
 * It does not write product descriptions. Those are original copy.
 *
 * Usage: npx tsx scripts/register-mapei.ts [--limit N]
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { getDocumentProxy, extractText } from 'unpdf';
import { slugify } from '../src/lib/slugify';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';
import { extractSpecs, fixLigatures } from './lib/spec-maps';

const REPO = process.cwd();
const BRAND = 'mapei';
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');

interface Curated {
  name: string;
  family: string;
  product_line: string;
  packs: string[];
  colours: string[];
  sku_count: number;
  stock_on_hand: number;
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
}

/** Folder names already used under public/images/brands/mapei. */
const FOLDERS: Record<string, string> = {
  'tile-adhesives-and-grouts': 'tile-adhesives',
  waterproofing: 'waterproofing',
  'flooring-systems': 'flooring-systems',
  'sealants-and-anchoring': 'sealants-and-anchoring',
  'self-leveling-and-microcement': 'self-leveling',
  'concrete-additives-and-repair-systems': 'concrete-additives',
};

/** Narrow the category from the product's own words. */
function categoryFor(text: string, line: string): TdsCategory {
  const t = text.toLowerCase();
  if (/\bepoxy\b[^.]{0,30}\bgrout\b|\bgrout\b[^.]{0,30}\bepoxy\b|kerapoxy/.test(t)) return 'epoxy_grout';
  if (/\b(tile|joint) grout\b|keracolor|ultracolor|fugolastic/.test(t)) return 'cementitious_grout';
  if (/\btile adhesive\b|adhesive for ceramic|kerabond|keraflex|granirapid|keraquick|adesilex p/.test(t)) return 'tile_adhesive';
  if (/parquet|vinyl|lvt|resilient|textile|carpet|ultrabond/.test(t)) return 'resilient_adhesive';
  if (/self.?level|ultraplan|nivorapid|planiprep/.test(t)) return 'self_leveling';
  if (/microcement|ultratop|decorative.{0,20}floor/.test(t)) return 'microcement';
  if (/waterproof|membrane|mapelastic|mapeproof|mapeband|mapegum|tanking/.test(t)) return 'waterproofing';
  if (/sealant|mapesil|mapeflex|caulk/.test(t)) return 'sealant';
  if (/anchor|mapefill|non.?shrink|precision grout/.test(t)) return 'precision_grout';
  if (/repair mortar|mapegrout|planitop|mapefer|micro.?concrete|structural repair/.test(t)) return 'repair_mortar';
  if (/primer|eco prim|mapeprim/.test(t)) return 'primer';
  if (/admixture|superplastic|dynamon|mapeplast|mapeair|mapequick|accelerat|retard/.test(t)) return 'bonding_agent';
  if (/plaster|render|skim|monofinish|planitop raso/.test(t)) return 'plaster';
  if (/paint|coating|silancolor|elastocolor|dursilite|quarzolite|antipluviol|protective/.test(t)) return 'surface_treatment';
  if (/screed|topcem|floor hardener|mapefloor|mapecoat|epoxy floor/.test(t)) return 'flooring_system';
  if (/roller|spatola|trowel|disc|valve|outlet|mesh|tape only/.test(t)) return 'accessory';
  if (line === 'tile-adhesives-and-grouts') return 'tile_adhesive';
  if (line === 'waterproofing') return 'waterproofing';
  if (line === 'sealants-and-anchoring') return 'sealant';
  if (line === 'self-leveling-and-microcement') return 'self_leveling';
  if (line === 'concrete-additives-and-repair-systems') return 'repair_mortar';
  return 'flooring_system';
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

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

async function main() {
  const limArg = process.argv.indexOf('--limit');
  const limit = limArg === -1 ? 0 : Number(process.argv[limArg + 1]);

  const curated: { products: Curated[] } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'data', 'discovery', 'mapei-zoho-curated.json'), 'utf8'),
  );
  const cat: { products: Catalogued[] } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'data', 'discovery', 'mapei-catalogue.json'), 'utf8'),
  );
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);

  const byName = new Map(cat.products.map((p) => [norm(p.name), p]));
  const match = (name: string): Catalogued | undefined => {
    const k = norm(name);
    return (
      byName.get(k) ??
      cat.products.find((p) => norm(p.name).startsWith(k) && k.length >= 6) ??
      cat.products.find((p) => k.startsWith(norm(p.name)) && norm(p.name).length >= 6)
    );
  };

  const items = limit ? curated.products.slice(0, limit) : curated.products;
  let created = 0, refreshed = 0, images = 0, sheets = 0, nameFails = 0, noMatch = 0;

  for (const [i, cur] of items.entries()) {
    const hit = match(cur.name);
    if (!hit) { noMatch++; continue; }

    const slug = slugify(cur.name);
    const line = cur.product_line;
    const folder = FOLDERS[line] ?? 'tile-adhesives';
    const category = categoryFor(`${cur.name} ${hit.classification} ${hit.description}`, line);

    // Image
    const imgRel = `/images/brands/${BRAND}/${folder}/${slug}.webp`;
    const imgAbs = path.join(REPO, 'public', imgRel.replace(/^\//, ''));
    let hasImage = fs.existsSync(imgAbs);
    if (!hasImage && hit.image_url) {
      const buf = await get(hit.image_url);
      if (buf) {
        try {
          fs.mkdirSync(path.dirname(imgAbs), { recursive: true });
          await sharp(buf)
            .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .webp({ quality: 90, effort: 6 })
            .toFile(imgAbs);
          hasImage = true;
          images++;
        } catch { /* unreadable image, leave it missing */ }
      }
    }

    // Technical data sheet
    let tds: ManifestRecord['tds'] = {
      status: 'documents_pending',
      source_url: hit.product_url,
      local_path: '',
      sha256: '',
      revision_date: '',
      verified_name_match_score: 0,
    };
    let sheetSpecs: Record<string, string> = {};

    if (hit.tds_url) {
      const pdfRel = `/tds/${BRAND}/${slug}.pdf`;
      const pdfAbs = path.join(REPO, 'public', pdfRel.replace(/^\//, ''));
      const buf = fs.existsSync(pdfAbs) ? fs.readFileSync(pdfAbs) : await get(hit.tds_url);

      if (buf && buf.subarray(0, 4).toString() === '%PDF') {
        try {
          const pdf = await getDocumentProxy(new Uint8Array(buf));
          const { text: pages } = await extractText(pdf, { mergePages: false });
          const page1 = fixLigatures(Array.isArray(pages) ? pages[0] : String(pages));
          const full = fixLigatures(Array.isArray(pages) ? pages.join('\n') : String(pages));
          const check = verifyNameInPageText(cur.name, page1);

          if (check.score >= 90 && !check.suffixTrap) {
            fs.mkdirSync(path.dirname(pdfAbs), { recursive: true });
            fs.writeFileSync(pdfAbs, buf);
            tds = {
              status: 'verified',
              source_url: hit.tds_url,
              local_path: pdfRel,
              sha256: crypto.createHash('sha256').update(buf).digest('hex'),
              size_bytes: buf.length,
              revision_date: extractRevisionDate(full),
              verified_name_match_score: check.score,
            };
            sheetSpecs = extractSpecs(category, full);
            sheets++;
          } else {
            nameFails++;
          }
        } catch { /* unreadable PDF, stays pending */ }
      }
    }

    // Pack sizes and colours come from the distributor's own stock list, which
    // is more reliable than the sheet for what is actually sold here.
    const specs: Record<string, string> = { ...sheetSpecs };
    if (cur.packs.length) specs.pack_size = cur.packs.slice(0, 4).join(', ');
    if (cur.colours.length) specs.colours = cur.colours.slice(0, 8).join(', ');
    if (hit.classification && !specs.classification) specs.classification = hit.classification;

    const existing = manifest.find((r) => r.brand === BRAND && r.slug === slug);
    if (existing) {
      existing.product_line = line;
      existing.category = category;
      existing.specs = { ...existing.specs, ...specs };
      if (specs.classification) existing.classification = specs.classification;
      if (tds.status === 'verified') existing.tds = tds;
      if (hasImage) existing.image = { status: 'found', path: imgRel, source_url: hit.image_url };
      existing.updated_at = now;
      refreshed++;
    } else {
      manifest.push({
        slug,
        brand: BRAND,
        product_line: line,
        name: cur.name,
        category,
        classification: specs.classification ?? '',
        description: '',
        meta_description: '',
        image: hasImage
          ? { status: 'found', path: imgRel, source_url: hit.image_url }
          : { status: 'missing', path: imgRel, source_url: '' },
        tds,
        specs,
        applications: [],
        equivalents: [],
        page_status: 'pending',
        notes: `Catalogue page: ${hit.product_url}. ${cur.sku_count} SKUs in stock list.`,
        updated_at: now,
      });
      created++;
    }

    if ((i + 1) % 20 === 0 || i === items.length - 1) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
      console.log(`  ${i + 1}/${items.length}  images ${images}, sheets ${sheets}, name rejects ${nameFails}, unmatched ${noMatch}`);
    }
    await sleep(200);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    `\n${BRAND}: ${created} created, ${refreshed} refreshed, ${images} images, ${sheets} verified sheets, ${nameFails} rejected on the name check, ${noMatch} with no catalogue match.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
