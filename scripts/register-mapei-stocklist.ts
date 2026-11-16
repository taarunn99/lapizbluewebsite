/**
 * Create a record for every Mapei product Lapiz Blue stocks, including the
 * ones Mapei's UAE catalogue does not list.
 *
 * Twenty one stocked SKUs have no UAE catalogue page, so the catalogue driven
 * registrar never saw them: Mapei sell them under another region, or under a
 * name the UAE site has retired. The owner's position is that anything we sell
 * should exist in the system, so the stock list alone is enough to create the
 * record.
 *
 * A record is not a page. These carry what Zoho knows, which is the name, the
 * family and the pack sizes, and nothing else, so the five field gate in
 * check-manifest.ts holds every one of them at pending. They exist so they are
 * counted, so they appear in the gap report, and so they ship the moment a
 * sheet arrives rather than needing to be discovered again.
 *
 * Usage: npx tsx scripts/register-mapei-stocklist.ts [--dry]
 */
import fs from 'node:fs';
import { slugify } from '../src/lib/slugify';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST = 'data/manifest.json';
const dry = process.argv.includes('--dry');

const SYNONYMS: Array<[RegExp, string]> = [
  [/\bexpress\b/gi, 'xpress'],
  [/\bpaint\b/gi, 'pittura'],
  [/&/g, 'and'],
];
const NOISE = /(eco|plus|zero|me|2k|1k|new|uae|gcc|and)/g;
const norm = (s: string) => {
  let out = s;
  for (const [pattern, to] of SYNONYMS) out = out.replace(pattern, to);
  return out.toLowerCase().replace(/[^a-z0-9]/g, '');
};
const loose = (s: string) => norm(s).replace(NOISE, '');

/** Narrow from the product family, which is all these records have. */
function categoryFor(name: string, family: string, line: string): TdsCategory {
  const t = `${name} ${family}`.toLowerCase();
  if (/ultracare|sealer|protector|cleaner|mould|remover/.test(t)) return 'surface_treatment';
  if (/ultrabond/.test(t)) return 'resilient_adhesive';
  if (/mapeflex|mapesil/.test(t)) return 'sealant';
  if (/eco prim|primer/.test(t)) return 'primer';
  if (/dynamon|mapeplast|mapeair|mapequick/.test(t)) return 'bonding_agent';
  if (/mapegrout|planitop|mapefer/.test(t)) return 'repair_mortar';
  if (/mapefloor|mapecoat/.test(t)) return 'flooring_system';
  if (/mapeplan|mapetex|tape/.test(t)) return 'accessory';
  if (/adesilex/.test(t)) return 'tile_adhesive';
  if (/fiber|fibre/.test(t)) return 'accessory';
  if (line === 'waterproofing') return 'waterproofing';
  if (line === 'tile-adhesives-and-grouts') return 'tile_adhesive';
  if (line === 'sealants-and-anchoring') return 'sealant';
  if (line === 'self-leveling-and-microcement') return 'self_leveling';
  if (line === 'concrete-additives-and-repair-systems') return 'repair_mortar';
  return 'flooring_system';
}

const FOLDERS: Record<string, string> = {
  'tile-adhesives-and-grouts': 'tile-adhesives',
  waterproofing: 'waterproofing',
  'flooring-systems': 'flooring-systems',
  'sealants-and-anchoring': 'sealants-and-anchoring',
  'self-leveling-and-microcement': 'self-leveling',
  'concrete-additives-and-repair-systems': 'concrete-additives',
};

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const curated = JSON.parse(fs.readFileSync('data/discovery/mapei-zoho-curated.json', 'utf8')).products;
const now = new Date().toISOString().slice(0, 10);

const mapei = manifest.filter((r) => r.brand === 'mapei');
const have = new Set(mapei.map((r) => norm(r.name)));
const haveLoose = new Set(mapei.map((r) => loose(r.name)));

let created = 0;
for (const cur of curated) {
  if (have.has(norm(cur.name)) || haveLoose.has(loose(cur.name))) continue;

  const slug = slugify(cur.name);
  const line = cur.product_line as string;
  const specs: Record<string, string> = {};
  if (cur.packs.length) specs.pack_size = cur.packs.slice(0, 4).join(', ');
  if (cur.colours.length) specs.colours = cur.colours.slice(0, 8).join(', ');

  const imgRel = `/images/brands/mapei/${FOLDERS[line] ?? 'tile-adhesives'}/${slug}.webp`;
  console.log(`${cur.name}  ->  ${slug}  [${line}]  packs ${cur.packs.join(', ') || 'none'}`);

  if (!dry) {
    manifest.push({
      slug,
      brand: 'mapei',
      product_line: line,
      name: cur.name,
      category: categoryFor(cur.name, cur.family, line),
      classification: '',
      description: '',
      meta_description: '',
      image: { status: 'missing', path: imgRel, source_url: '' },
      tds: {
        status: 'documents_pending',
        source_url: '',
        local_path: '',
        sha256: '',
        revision_date: '',
        verified_name_match_score: 0,
      },
      specs,
      applications: [],
      equivalents: [],
      page_status: 'pending',
      notes: `Stocked, ${cur.sku_count} SKUs in Zoho. No page on the Mapei UAE catalogue, so no sheet, image or specification has been found yet.`,
      updated_at: now,
    });
  }
  have.add(norm(cur.name));
  created++;
}

if (!dry) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${created} records ${dry ? 'would be ' : ''}created from the stock list alone. All held at pending.`);
