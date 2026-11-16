/**
 * Attach the harvested Mapei UAE data sheets to the products Lapiz Blue sells.
 *
 * The harvest keyed 1,073 sheets by Mapei's own catalogue name. Our records are
 * named from the Zoho stock list, and the two disagree in predictable ways:
 * Zoho keeps marketing tokens Mapei drop from the catalogue title ("Ultrabond
 * Eco 520" against "ULTRABOND 520"), writes "and" where Mapei write "&", and
 * anglicises a couple of Italian names. So the join normalises those away.
 *
 * The name check still runs against Mapei's name, not ours, because that is
 * what is printed on page one of the sheet. A sheet that fails it is not
 * attached and the record stays documents_pending: a wrong download is worse
 * than a missing one, since the page states it as the product's own sheet.
 *
 * Where our SKU name differs from the catalogue name, the mapping goes into
 * notes so the next person can see which Mapei product a sheet came from.
 *
 * Usage: npx tsx scripts/register-mapei-sheets.ts [--dry] [--source DIR]
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

const MANIFEST = 'data/manifest.json';
const dry = process.argv.includes('--dry');
const srcArg = process.argv.indexOf('--source');
const SOURCE = srcArg === -1 ? '/tmp/mapei-tds' : process.argv[srcArg + 1];

interface Sheet {
  name: string;
  slug: string;
  product_url: string;
  tds_url: string;
  local_path: string;
  size_bytes: number;
}

const FOLDERS: Record<string, string> = {
  'tile-adhesives-and-grouts': 'tile-adhesives',
  waterproofing: 'waterproofing',
  'flooring-systems': 'flooring-systems',
  'sealants-and-anchoring': 'sealants-and-anchoring',
  'self-leveling-and-microcement': 'self-leveling',
  'concrete-additives-and-repair-systems': 'concrete-additives',
};

// Tokens Zoho carries that Mapei's catalogue title drops, plus the two name
// differences that are translation rather than abbreviation.
const SYNONYMS: Array<[RegExp, string]> = [
  [/\bexpress\b/gi, 'xpress'],
  [/\bpaint\b/gi, 'pittura'],
  [/&/g, 'and'],
];
// Only tokens that are genuinely a labelling difference for the same product.
// "Eco" appears in Mapei's catalogue listing and in our stock list but not in
// the document itself; "ME" marks the Middle East edition. Everything else,
// "Zero", "Plus", "Maxi", "Fibre", "Spray", "Fast Track", names a different
// product with its own sheet. Stripping those once gave five Ultraplan
// variants one ULTRAPLAN sheet between them, so the list stays this short.
const NOISE = /\b(eco|me)\b/g;

// Names where Mapei's document uses a contraction of ours. Each one here has
// been checked against the harvested sheet list by eye; the name check on page
// one of the PDF still has to pass afterwards.
const ALIASES: Record<string, string> = {
  'Ultraplan Eco 20': 'ULTRAPLAN EC20',
};

function applySynonyms(s: string): string {
  let out = s;
  for (const [pattern, to] of SYNONYMS) out = out.replace(pattern, to);
  return out;
}
const norm = (s: string) => applySynonyms(s).toLowerCase().replace(/[^a-z0-9]/g, '');
// Applied to the spaced name, before punctuation is stripped, so the word
// boundaries in NOISE still mean something.
const loose = (s: string) => {
  let out = applySynonyms(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ');
  out = out.replace(NOISE, ' ');
  return out.replace(/[^a-z0-9]/g, '');
};

function categoryFor(text: string, line: string): TdsCategory {
  const t = text.toLowerCase();
  if (/\bepoxy\b[^.]{0,30}\bgrout\b|kerapoxy/.test(t)) return 'epoxy_grout';
  if (/\b(tile|joint) grout\b|keracolor|ultracolor|fugolastic/.test(t)) return 'cementitious_grout';
  if (/tile adhesive|kerabond|keraflex|granirapid|keraquick|adesilex p/.test(t)) return 'tile_adhesive';
  if (/parquet|vinyl|lvt|resilient|textile|carpet|ultrabond/.test(t)) return 'resilient_adhesive';
  if (/self.?level|ultraplan|nivorapid|planiprep/.test(t)) return 'self_leveling';
  if (/microcement|ultratop/.test(t)) return 'microcement';
  if (/waterproof|membrane|mapelastic|mapeproof|mapeband|mapegum/.test(t)) return 'waterproofing';
  if (/sealant|mapesil|mapeflex|caulk/.test(t)) return 'sealant';
  if (/anchor|mapefill|non.?shrink|precision grout/.test(t)) return 'precision_grout';
  if (/repair mortar|mapegrout|planitop|mapefer|structural repair/.test(t)) return 'repair_mortar';
  if (/primer|eco prim|mapeprim/.test(t)) return 'primer';
  if (/admixture|superplastic|dynamon|mapeplast|mapeair|mapequick|accelerat|retard/.test(t)) return 'bonding_agent';
  if (/plaster|render|skim|monofinish/.test(t)) return 'plaster';
  if (/paint|coating|pittura|silancolor|elastocolor|dursilite|antipluviol|sealer|protector|cleaner/.test(t)) return 'surface_treatment';
  if (/screed|topcem|floor hardener|mapefloor|mapecoat/.test(t)) return 'flooring_system';
  if (/tape|roller|trowel|disc|valve|outlet|mesh|spacer|sponge/.test(t)) return 'accessory';
  if (line === 'tile-adhesives-and-grouts') return 'tile_adhesive';
  if (line === 'waterproofing') return 'waterproofing';
  if (line === 'sealants-and-anchoring') return 'sealant';
  if (line === 'self-leveling-and-microcement') return 'self_leveling';
  if (line === 'concrete-additives-and-repair-systems') return 'repair_mortar';
  return 'flooring_system';
}

async function fetchBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const sheets: Sheet[] = JSON.parse(fs.readFileSync('data/discovery/mapei-tds-index.json', 'utf8')).sheets;
  const curated = JSON.parse(fs.readFileSync('data/discovery/mapei-zoho-curated.json', 'utf8')).products;
  const catalogue = JSON.parse(fs.readFileSync('data/discovery/mapei-catalogue.json', 'utf8')).products;
  const now = new Date().toISOString().slice(0, 10);

  const byNorm = new Map<string, Sheet>();
  const byLoose = new Map<string, Sheet>();
  for (const s of sheets) {
    if (!byNorm.has(norm(s.name))) byNorm.set(norm(s.name), s);
    if (!byLoose.has(loose(s.name))) byLoose.set(loose(s.name), s);
  }
  // Equality only. No prefix matching: "Ultraplan Fast Track" starts with
  // "Ultraplan", and treating that as a match is exactly the mistake that
  // handed a parent's sheet to its variants.
  const findSheet = (name: string): Sheet | undefined => {
    const aliased = ALIASES[name] ?? name;
    return byNorm.get(norm(aliased)) ?? byLoose.get(loose(aliased));
  };

  const catByNorm = new Map<string, any>();
  for (const p of catalogue) if (!catByNorm.has(norm(p.name))) catByNorm.set(norm(p.name), p);

  let attached = 0, rejected = 0, created = 0, noSheet = 0, images = 0;
  const rejects: string[] = [];

  /** Read the sheet, name check it, and write it next to the product. */
  async function attach(rec: ManifestRecord, sheet: Sheet): Promise<boolean> {
    if (!fs.existsSync(sheet.local_path)) return false;
    const buf = fs.readFileSync(sheet.local_path);
    if (buf.subarray(0, 4).toString() !== '%PDF') return false;

    let page1 = '';
    let full = '';
    try {
      const pdf = await getDocumentProxy(new Uint8Array(buf));
      const { text: pages } = await extractText(pdf, { mergePages: false });
      page1 = fixLigatures(Array.isArray(pages) ? pages[0] : String(pages));
      full = fixLigatures(Array.isArray(pages) ? pages.join('\n') : String(pages));
    } catch {
      return false;
    }

    // Checked against Mapei's name for this sheet, which is what the document
    // prints, not against our stock list name for the same product. The
    // catalogue listing sometimes carries an "Eco" the document itself does
    // not, so the filename Mapei gave the PDF is tried as well and the better
    // score wins. Both candidates come from Mapei, so neither weakens the gate.
    const candidates = [sheet.name, sheet.slug.replace(/-/g, ' ')];
    let check = verifyNameInPageText(candidates[0], page1);
    for (const candidate of candidates.slice(1)) {
      const alt = verifyNameInPageText(candidate, page1);
      if (alt.score > check.score) check = alt;
    }
    if (check.score < 90 || check.suffixTrap) {
      rejects.push(`${rec.slug}: sheet "${sheet.name}" scored ${check.score}${check.suffixTrap ? ' and hit the suffix trap' : ''}`);
      rejected++;
      return false;
    }

    const rel = `/tds/mapei/${rec.slug}.pdf`;
    const abs = path.join('public', rel.replace(/^\//, ''));
    if (!dry) {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, buf);
    }
    rec.tds = {
      status: 'verified',
      source_url: sheet.tds_url,
      local_path: rel,
      sha256: crypto.createHash('sha256').update(buf).digest('hex'),
      size_bytes: buf.length,
      revision_date: extractRevisionDate(full),
      verified_name_match_score: check.score,
    };
    // The sheet is the better authority for everything except pack size and
    // colours, which come from what we actually stock.
    const fromSheet = extractSpecs(rec.category, full);
    for (const [field, value] of Object.entries(fromSheet)) {
      if (field === 'pack_size' || field === 'colours') continue;
      if (!rec.specs[field]) rec.specs[field] = value;
    }
    if (norm(rec.name) !== norm(sheet.name) && !rec.notes.includes('Mapei catalogue name')) {
      rec.notes = `${rec.notes} Mapei catalogue name: ${sheet.name}.`.trim();
    }
    rec.updated_at = now;
    attached++;
    return true;
  }

  // Pass one: every Mapei record that is still waiting on a sheet.
  for (const rec of manifest) {
    if (rec.brand !== 'mapei' || rec.tds.status === 'verified') continue;
    const sheet = findSheet(rec.name);
    if (!sheet) { noSheet++; continue; }
    await attach(rec, sheet);
  }

  // Pass two: stocked products that never became records, because the earlier
  // join needed a catalogue match and did not find one.
  const have = new Set(manifest.filter((r) => r.brand === 'mapei').map((r) => norm(r.name)));
  for (const cur of curated) {
    if (have.has(norm(cur.name))) continue;
    const sheet = findSheet(cur.name);
    if (!sheet) { noSheet++; continue; }

    const cat = catByNorm.get(norm(sheet.name));
    const line = cur.product_line as string;
    const slug = slugify(cur.name);
    const category = categoryFor(`${cur.name} ${cat?.classification ?? ''} ${cat?.description ?? ''}`, line);

    const specs: Record<string, string> = {};
    if (cur.packs.length) specs.pack_size = cur.packs.slice(0, 4).join(', ');
    if (cur.colours.length) specs.colours = cur.colours.slice(0, 8).join(', ');
    if (cat?.classification) specs.classification = cat.classification;

    const imgRel = `/images/brands/mapei/${FOLDERS[line] ?? 'tile-adhesives'}/${slug}.webp`;
    const imgAbs = path.join('public', imgRel.replace(/^\//, ''));
    let hasImage = fs.existsSync(imgAbs);
    if (!hasImage && cat?.image_url && !dry) {
      const buf = await fetchBuffer(cat.image_url);
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

    const rec: ManifestRecord = {
      slug,
      brand: 'mapei',
      product_line: line,
      name: cur.name,
      category,
      classification: specs.classification ?? '',
      description: '',
      meta_description: '',
      image: hasImage
        ? { status: 'found', path: imgRel, source_url: cat?.image_url ?? '' }
        : { status: 'missing', path: imgRel, source_url: '' },
      tds: {
        status: 'documents_pending',
        source_url: sheet.product_url,
        local_path: '',
        sha256: '',
        revision_date: '',
        verified_name_match_score: 0,
      },
      specs,
      applications: [],
      equivalents: [],
      page_status: 'pending',
      notes: `Catalogue page: ${sheet.product_url}. ${cur.sku_count} SKUs in stock list.`,
      updated_at: now,
    };
    const ok = await attach(rec, sheet);
    if (!ok && rec.tds.status !== 'verified') {
      // Still worth the record: it carries the stock list data and an image.
    }
    manifest.push(rec);
    have.add(norm(cur.name));
    created++;
  }

  for (const r of rejects) console.log('REJECTED', r);
  if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    `\n${attached} sheets attached, ${rejected} rejected on the name check, ${created} records created, ${images} images fetched, ${noSheet} stocked products with no harvested sheet.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
