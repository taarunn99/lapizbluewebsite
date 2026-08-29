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

export function getPdfSizeMB(rec: ManifestRecord): string {
  try {
    const stat = fs.statSync(path.join(process.cwd(), 'public', rec.tds.local_path.replace(/^\//, '')));
    return (stat.size / (1024 * 1024)).toFixed(1);
  } catch {
    return '';
  }
}

export function getTdsDocNumber(rec: ManifestRecord): string {
  const m = rec.tds.source_url.match(/\/1_(\d{3,6})_/);
  return m ? m[1] : '';
}

// Compact numeric range for the cover figure, derived from the consumption
// text, e.g. "approx. 2 kg/m² ... 2.5-3 kg/m² ... approx. 5 kg/m²" -> "2-5".
export function coverageRange(rec: ManifestRecord): string {
  const text = rec.specs.coverage ?? '';
  const nums = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*kg\/m/g)]
    .flatMap((m) => [parseFloat(m[1]), m[2] ? parseFloat(m[2]) : NaN])
    .filter((n) => !Number.isNaN(n));
  if (nums.length === 0) return '';
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  return min === max ? fmt(min) : `${fmt(min)}-${fmt(max)}`;
}

// Pack figure from the pack_size sentence, e.g. "25 kg bags" -> {value: "25", unit: "kg"}.
export function packFigure(rec: ManifestRecord): { value: string; unit: string } | null {
  const text = rec.specs.pack_size ?? '';
  const m = text.match(/(\d+(?:\.\d+)?)\s*(kg|g|l|litre)/i);
  if (!m) return null;
  return { value: m[1], unit: m[2].toLowerCase() };
}

// Usability chips, only from wording actually present in the TDS derived
// description and applications. Nothing is invented.
const USABILITY_TESTS: { label: string; re: RegExp }[] = [
  { label: 'Interior', re: /\b(internal|interior|indoor)\b/i },
  { label: 'Exterior', re: /\b(external|exterior|outdoor)\b/i },
  { label: 'Floors', re: /\bfloors?\b/i },
  { label: 'Walls', re: /\bwalls?\b/i },
  { label: 'Ceilings', re: /\bceilings?\b/i },
  { label: 'Swimming pools', re: /\bswimming pools?\b/i },
  { label: 'Facades', re: /\bfacades?\b/i },
  { label: 'Wet areas', re: /\b(wet areas?|showers?|bathrooms?)\b/i },
  { label: 'Food safe areas', re: /\bHACCP\b/i },
];

export function usabilityChips(rec: ManifestRecord): string[] {
  const corpus = [rec.description, ...rec.applications, rec.specs.coverage ?? ''].join(' ');
  let chips = USABILITY_TESTS.filter((t) => t.re.test(corpus)).map((t) => t.label);
  // Class aware verification: even where a TDS mentions a surface, we do not
  // suggest beyond the classification. A plain C1 adhesive is never suggested
  // for ceilings or large formats; facades need a deformable (S) or reactive
  // (R2) product. Owner rule, 2026-08-29.
  const cls = rec.classification.toUpperCase();
  const isPlainC1 = /^C1(?![0-9])/.test(cls);
  if (isPlainC1) {
    chips = chips.filter((c) => c !== 'Ceilings' && c !== 'Facades');
  }
  if (!/S[12]|R2/.test(cls)) {
    chips = chips.filter((c) => c !== 'Facades');
  }
  return chips;
}

export interface ConsumptionTier {
  label: string;
  trowel: string;
  value: string;
}

// Consumption tiers for the scale figure, parsed from the TDS consumption
// text: per-trowel rows like "(trowel No. 5; size 5x5 mm): 2.5-3 kg/m²".
export function consumptionTiers(rec: ManifestRecord): ConsumptionTier[] {
  const text = rec.specs.coverage ?? '';
  const segments = text.split(/[▪·]+/);
  const tiers: ConsumptionTier[] = [];
  for (const seg of segments) {
    const trowel = seg.match(/trowel\s*No\.?\s*(\d+)/i);
    const value = seg.match(/(\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?)\s*kg\/m/);
    if (!trowel || !value) continue;
    const label = seg
      .slice(0, seg.indexOf('('))
      .replace(/^[^a-zA-Z]*/, '')
      .replace(/\b(bonding of|in general)\b/gi, '')
      .replace(/\s+/g, ' ')
      .replace(/[:.]$/, '')
      .trim();
    tiers.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      trowel: `No. ${trowel[1]}`,
      value: value[1].replace(/\s/g, ''),
    });
  }
  return tiers;
}
