import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export type TdsStatus =
  | 'pending'
  | 'found'
  | 'downloaded'
  | 'verified'
  | 'needs_review'
  | 'missing';

export type PageStatus = 'pending' | 'generated' | 'live';

export type ImageStatus = 'found' | 'missing' | 'placeholder';

export type TdsCategory =
  | 'tile_adhesive'
  | 'cementitious_grout'
  | 'epoxy_grout'
  | 'repair_mortar';

export interface ManifestImage {
  status: ImageStatus;
  path: string;
  source_url: string;
}

export interface ManifestTds {
  status: TdsStatus;
  source_url: string;
  local_path: string;
  sha256: string;
  revision_date: string;
  verified_name_match_score: number;
}

export interface ManifestEquivalent {
  brand: string;
  name: string;
  slug: string;
  classification: string;
}

export interface ManifestRecord {
  slug: string;
  brand: string;
  product_line: string;
  name: string;
  category: TdsCategory;
  classification: string;
  description: string;
  meta_description: string;
  image: ManifestImage;
  tds: ManifestTds;
  specs: Record<string, string>;
  applications: string[];
  equivalents: ManifestEquivalent[];
  page_status: PageStatus;
  notes: string;
  updated_at: string;
}

export const TDS_CATEGORY_LABELS: Record<TdsCategory, string> = {
  tile_adhesive: 'Tile Adhesive',
  cementitious_grout: 'Grout',
  epoxy_grout: 'Epoxy Grout',
  repair_mortar: 'Repair Mortar',
};

const MANIFEST_PATH = path.join(process.cwd(), 'data', 'manifest.json');

let cachedManifest: ManifestRecord[] | null = null;

export function getManifest(): ManifestRecord[] {
  if (cachedManifest) return cachedManifest;
  if (!fs.existsSync(MANIFEST_PATH)) {
    cachedManifest = [];
    return cachedManifest;
  }
  cachedManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as ManifestRecord[];
  return cachedManifest;
}

export function isShippable(rec: ManifestRecord): boolean {
  return (
    (rec.page_status === 'generated' || rec.page_status === 'live') &&
    rec.tds.status === 'verified'
  );
}

export function getShippable(brand?: string, productLine?: string): ManifestRecord[] {
  return getManifest().filter(
    (rec) =>
      isShippable(rec) &&
      (!brand || rec.brand === brand) &&
      (!productLine || rec.product_line === productLine)
  );
}

export function getTdsProduct(
  brand: string,
  productLine: string,
  slug: string
): ManifestRecord | undefined {
  return getManifest().find(
    (rec) => rec.brand === brand && rec.product_line === productLine && rec.slug === slug
  );
}

export function getRelatedProducts(rec: ManifestRecord, max = 6): ManifestRecord[] {
  return getShippable(rec.brand, rec.product_line)
    .filter((other) => other.slug !== rec.slug)
    .slice(0, max);
}

export function tdsHref(rec: ManifestRecord): string {
  return `/brands/${rec.brand}/${rec.product_line}/${rec.slug}`;
}

export function findBySlugCandidates(
  brand: string,
  productLine: string,
  name: string,
  image?: string
): ManifestRecord | undefined {
  const nameSlug = slugify(name);
  const imageSlug = image ? path.basename(image).replace(/\.[a-z0-9]+$/i, '') : '';
  return getManifest().find(
    (rec) =>
      rec.brand === brand &&
      rec.product_line === productLine &&
      (rec.slug === nameSlug || (imageSlug !== '' && rec.slug === imageSlug))
  );
}

export function getBrandsWithShippablePages(): string[] {
  return [...new Set(getShippable().map((rec) => rec.brand))];
}
