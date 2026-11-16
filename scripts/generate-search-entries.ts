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

/**
 * Search results show one line, and the second sentence of every meta
 * description is the same call to action, which matches nothing and is not
 * worth shipping 406 times. The whole index is imported by a client hook, so
 * these bytes are parsed in the browser. The split needs a capital after the
 * full stop, or "0.8 kg" and "no. 5" would be cut in half.
 */
function firstSentence(text: string): string {
  const parts = text.split(/\.\s+(?=[A-Z])/);
  if (parts.length < 2) return text;
  const head = `${parts[0]}.`;
  // If the first sentence carries nothing, keep the whole thing.
  return head.length >= 40 ? head : text;
}


const REPO = process.cwd();
const manifest: ManifestRecord[] = JSON.parse(
  fs.readFileSync(path.join(REPO, 'data', 'manifest.json'), 'utf8')
);

const entries = manifest
  .filter(
    (r) =>
      (r.page_status === 'generated' || r.page_status === 'live') &&
      // Matches the router: a page whose sheet is pending is still a page,
      // and leaving it out of site search hides it from people looking for it.
      (r.tds.status === 'verified' || r.tds.status === 'documents_pending')
  )
  .map((r) => ({
    id: `tds-${r.brand}-${r.slug}`,
    type: 'product',
    url: `/brands/${r.brand}/${r.product_line}/${r.slug}`,
    title: `${r.name} TDS`,
    description: firstSentence(r.meta_description),
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
