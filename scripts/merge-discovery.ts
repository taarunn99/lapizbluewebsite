/*
  Merge a discovery JSON (crawled product list) into data/manifest.json.
  Adds records that do not exist yet (matched by slug or name within brand+line).
  Never touches existing records. Usage:
  npx tsx scripts/merge-discovery.ts data/discovery/mapei-tile-adhesives-and-grouts.json mapei tile-adhesives-and-grouts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const [discoveryPath, brand, line] = process.argv.slice(2);
if (!discoveryPath || !brand || !line) throw new Error('args: <discovery.json> <brand> <line>');

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');
const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const discovery = JSON.parse(fs.readFileSync(discoveryPath, 'utf8')) as {
  products: { slug: string; name: string; subcategory: string; category: TdsCategory }[];
};

const now = new Date().toISOString().slice(0, 10);
let added = 0;
let skipped = 0;

for (const p of discovery.products) {
  const existing = manifest.find(
    (r) =>
      r.brand === brand &&
      r.product_line === line &&
      (r.slug === p.slug || r.name.toLowerCase() === p.name.toLowerCase())
  );
  if (existing) {
    skipped++;
    continue;
  }
  manifest.push({
    slug: p.slug,
    brand,
    product_line: line,
    name: p.name,
    category: p.category,
    classification: '',
    description: '',
    meta_description: '',
    image: { status: 'missing', path: '', source_url: '' },
    tds: {
      status: 'pending',
      source_url: '',
      local_path: '',
      sha256: '',
      revision_date: '',
      verified_name_match_score: 0,
    },
    specs: {},
    applications: [],
    equivalents: [],
    page_status: 'pending',
    notes: `Discovered on mapei.com/ae, subcategory: ${p.subcategory}`,
    updated_at: now,
  });
  added++;
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Merged: ${added} added, ${skipped} already present. Total: ${manifest.length}`);
