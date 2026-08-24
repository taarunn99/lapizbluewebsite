/*
  Seed data/manifest.json from the existing site segmentation in brandConfigs.
  Idempotent: merges by brand + product_line + slug (also matches by name to
  avoid duplicates on re-seed) and NEVER rewrites an existing record's slug.

  Usage: npx tsx scripts/seed-manifest.ts --brand mapei --line tile-adhesives-and-grouts
*/
import fs from 'fs';
import path from 'path';
import { getBrandConfig } from '../src/data/brandConfigs';
import { slugify } from '../src/lib/slugify';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const brandSlug = arg('--brand') ?? 'mapei';
const lineSlug = arg('--line') ?? 'tile-adhesives-and-grouts';

function categorize(name: string): TdsCategory {
  const n = name.toLowerCase();
  if (n.includes('mapegrout') || n.includes('planitop')) return 'repair_mortar';
  if (n.includes('kerapoxy') && !n.includes('adhesive')) return 'epoxy_grout';
  if (n.includes('ultracolor') || n.includes('keracolor')) return 'cementitious_grout';
  return 'tile_adhesive';
}

function readManifest(): ManifestRecord[] {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as ManifestRecord[];
}

function main() {
  const brand = getBrandConfig(brandSlug);
  if (!brand) throw new Error(`Unknown brand: ${brandSlug}`);
  const line = brand.productLines.find((pl) => pl.slug === lineSlug);
  if (!line) throw new Error(`Unknown product line: ${lineSlug}`);
  const products = line.content?.featuredProducts ?? line.featuredProducts ?? [];
  if (products.length === 0) throw new Error(`No featuredProducts for ${brandSlug}/${lineSlug}`);

  const manifest = readManifest();
  const now = new Date().toISOString().slice(0, 10);
  let added = 0;
  let skipped = 0;
  const divergences: string[] = [];

  for (const product of products) {
    const slug = slugify(product.name);
    const existing = manifest.find(
      (rec) =>
        rec.brand === brandSlug &&
        rec.product_line === lineSlug &&
        (rec.slug === slug || rec.name.toLowerCase() === product.name.toLowerCase())
    );
    if (existing) {
      skipped++;
      continue;
    }
    const imageExists = fs.existsSync(path.join(process.cwd(), 'public', product.image.replace(/^\//, '')));
    const imageBase = path.basename(product.image).replace(/\.[a-z0-9]+$/i, '');
    if (imageBase !== slug) {
      divergences.push(`${product.name}: slug "${slug}" vs image basename "${imageBase}"`);
    }
    const record: ManifestRecord = {
      slug,
      brand: brandSlug,
      product_line: lineSlug,
      name: product.name,
      category: categorize(product.name),
      classification: '',
      description: '',
      meta_description: '',
      image: {
        status: imageExists ? 'found' : 'missing',
        path: imageExists ? product.image : '',
        source_url: '',
      },
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
      notes: '',
      updated_at: now,
    };
    manifest.push(record);
    added++;
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`Seeded ${brandSlug}/${lineSlug}: ${added} added, ${skipped} already present.`);
  console.log(`Manifest total: ${manifest.length} records.`);
  if (divergences.length > 0) {
    console.log('Slug vs image filename divergences (note in MANUAL-QUEUE.md):');
    for (const d of divergences) console.log(`  ${d}`);
  }
}

main();
