/*
  Generate src/data/tdsSearchEntries.json: search index entries for every
  shippable TDS product page. searchIndex.ts spreads this file into its
  exported array; hand maintained entries are never touched.

  Usage: npx tsx scripts/generate-search-entries.ts
*/
import fs from 'fs';
import path from 'path';
import type { ManifestRecord } from '../src/lib/tds';
import { TDS_CATEGORY_LABELS } from '../src/lib/tds';

const REPO = process.cwd();
const manifest: ManifestRecord[] = JSON.parse(
  fs.readFileSync(path.join(REPO, 'data', 'manifest.json'), 'utf8')
);

const entries = manifest
  .filter(
    (r) =>
      (r.page_status === 'generated' || r.page_status === 'live') &&
      r.tds.status === 'verified'
  )
  .map((r) => ({
    id: `tds-${r.brand}-${r.slug}`,
    type: 'product',
    url: `/brands/${r.brand}/${r.product_line}/${r.slug}`,
    title: `${r.name} TDS`,
    description: r.meta_description,
    category: 'Products',
    image: r.image.path || null,
    keywords: [
      r.name.toLowerCase(),
      `${r.name.toLowerCase()} tds`,
      `${r.name.toLowerCase()} technical data sheet`,
      r.classification.toLowerCase(),
      TDS_CATEGORY_LABELS[r.category].toLowerCase(),
      r.brand,
    ].filter(Boolean),
  }));

const out = path.join(REPO, 'src', 'data', 'tdsSearchEntries.json');
fs.writeFileSync(out, JSON.stringify(entries, null, 2) + '\n');
console.log(`Wrote ${entries.length} search entries to ${out}`);
