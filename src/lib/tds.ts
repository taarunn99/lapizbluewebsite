import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export type TdsStatus =
  | 'pending'
  | 'found'
  | 'downloaded'
  | 'verified'
  | 'needs_review'
  | 'missing'
  // The page is complete and accurate but the manufacturer gates its data
  // sheet behind a dealer login, so we hold no PDF to host yet. The page
  // ships with a document request in place of the download. Registering the
  // real PDF later moves it to 'verified' with no change to the page.
  | 'documents_pending';

export type PageStatus = 'pending' | 'generated' | 'live';

export type ImageStatus = 'found' | 'missing' | 'placeholder';

export type TdsCategory =
  // Tiling
  | 'tile_adhesive'
  | 'cementitious_grout'
  | 'epoxy_grout'
  | 'resilient_adhesive'
  // Structure and repair
  | 'repair_mortar'
  | 'precision_grout'
  // Protection
  | 'waterproofing'
  | 'sealant'
  // Floors
  | 'flooring_system'
  | 'self_leveling'
  | 'microcement'
  // Walls and surfaces
  | 'plaster'
  | 'surface_treatment'
  // Ancillaries
  | 'bonding_agent'
  | 'primer'
  // Hardware rather than chemistry: drains, edge profiles, tapes, meshes,
  // spacers, sponges and application tools. Real products people search for,
  // but they carry none of the figures a mortar does.
  | 'accessory';

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
  size_bytes?: number;
  revision_date: string;
  verified_name_match_score: number;
}

/**
 * Safety data sheet. Optional on every record: a product page is useful
 * without one, so a missing SDS never blocks a page the way a missing TDS
 * does. Same shape as ManifestTds minus the name verification, which only
 * applies to the technical sheet.
 */
export interface ManifestSds {
  status: TdsStatus;
  source_url: string;
  local_path: string;
  sha256: string;
  size_bytes?: number;
  revision_date: string;
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
  sds?: ManifestSds;
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
  resilient_adhesive: 'Flooring Adhesive',
  repair_mortar: 'Repair Mortar',
  precision_grout: 'Precision Grout',
  waterproofing: 'Waterproofing',
  sealant: 'Sealant',
  flooring_system: 'Flooring System',
  self_leveling: 'Self Levelling',
  microcement: 'Microcement',
  plaster: 'Plaster',
  surface_treatment: 'Surface Treatment',
  bonding_agent: 'Bonding Agent',
  primer: 'Primer',
  accessory: 'Accessory',
};

// Range drawer groups: pill order, label and dot colour per category. Order is
// the order a specifier works in, from the structure outwards to the finish.
export const RANGE_GROUPS: { category: TdsCategory; label: string; dot: string }[] = [
  { category: 'tile_adhesive', label: 'Tile Adhesives', dot: '#1E6BA8' },
  { category: 'cementitious_grout', label: 'Cementitious Grouts', dot: '#2E9E6B' },
  { category: 'epoxy_grout', label: 'Epoxy Grouts', dot: '#C24B6E' },
  { category: 'resilient_adhesive', label: 'Flooring Adhesives', dot: '#E8833A' },
  { category: 'waterproofing', label: 'Waterproofing', dot: '#1F7A8C' },
  { category: 'sealant', label: 'Sealants and Joints', dot: '#B5651D' },
  { category: 'self_leveling', label: 'Self Levelling', dot: '#4C7BA8' },
  { category: 'flooring_system', label: 'Flooring Systems', dot: '#55606E' },
  { category: 'microcement', label: 'Microcement', dot: '#8C7B6B' },
  { category: 'repair_mortar', label: 'Repair Mortars', dot: '#7A5FB5' },
  { category: 'precision_grout', label: 'Precision Grouts', dot: '#5A6E3A' },
  { category: 'plaster', label: 'Plasters and Masonry', dot: '#9A7B4F' },
  { category: 'surface_treatment', label: 'Surface Treatments', dot: '#6B7A8F' },
  { category: 'bonding_agent', label: 'Bonding Agents', dot: '#3F6B5A' },
  { category: 'primer', label: 'Primers', dot: '#8A93A3' },
  { category: 'accessory', label: 'Accessories', dot: '#7C8795' },
];

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
    (rec.tds.status === 'verified' || rec.tds.status === 'documents_pending')
  );
}

/** True when we actually host a PDF and can offer a direct download. */
export function hasTdsDownload(rec: ManifestRecord): boolean {
  return rec.tds.status === 'verified' && Boolean(rec.tds.local_path);
}

export function hasSdsDownload(rec: ManifestRecord): boolean {
  return rec.sds?.status === 'verified' && Boolean(rec.sds.local_path);
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

// Size comes from the manifest, never from fs at request time. A runtime
// stat under public/ made Next trace the whole public folder (about 300 MB)
// into every TDS function, which blew Vercel's 250 MB limit.
export function getPdfSizeMB(rec: ManifestRecord): string {
  return bytesToMB(rec.tds.size_bytes);
}

export function getSdsSizeMB(rec: ManifestRecord): string {
  return bytesToMB(rec.sds?.size_bytes);
}

function bytesToMB(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  return (bytes / (1024 * 1024)).toFixed(1);
}

/**
 * The document number a manufacturer prints on its own sheet, used as a small
 * kicker on the cover. Each manufacturer encodes it differently in its URL,
 * so this is a list of patterns rather than one regex. An unrecognised URL
 * returns an empty string and the kicker simply does not render.
 */
const DOC_NUMBER_PATTERNS: RegExp[] = [
  /\/1_(\d{3,6})_/, // Mapei DAM, e.g. /1_00095_mapeset_en-ae.pdf
  /[_-]tds[_-](\d{3,6})/i, // generic "tds-00123"
  /\/(\d{4,6})[_-][a-z]/i, // leading numeric document id
];

export function getTdsDocNumber(rec: ManifestRecord): string {
  for (const re of DOC_NUMBER_PATTERNS) {
    const m = rec.tds.source_url.match(re);
    if (m) return m[1];
  }
  return '';
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

export type ConsumptionKind =
  /** A rate per square metre, e.g. "1.7 kg/m2". */
  | 'flat'
  /** A rate per square metre per millimetre of thickness, e.g. "1.2 kg/m2 per mm". */
  | 'per_mm';

export interface ConsumptionModel {
  kind: ConsumptionKind;
  /** Lower bound of the published rate. */
  min: number;
  /** Upper bound. Equal to min when the sheet gives a single figure. */
  max: number;
  unit: 'kg' | 'litre';
  /** Published thickness range in mm, when the sheet states one. */
  thickness?: { min: number; max: number };
  /** Pack size the product is sold in, used to turn mass into bags. */
  pack?: { value: number; unit: string };
  /** The sentence the numbers came from, shown so a user can check us. */
  source: string;
}

/**
 * Turn a manufacturer's consumption sentence into something a calculator can
 * use. Deliberately conservative: it only reports a model when the sheet
 * actually states a rate. A thickness on its own is not enough, because
 * converting thickness to mass needs a density the sheet may not give, and
 * guessing one would put an invented number in front of someone ordering
 * material. Where this returns null, the page shows no calculator.
 */
export function consumptionModel(rec: ManifestRecord): ConsumptionModel | null {
  const corpus = [rec.specs.coverage, rec.specs.consumption, rec.description]
    .filter(Boolean)
    .join(' ');
  if (!corpus) return null;

  const unitWord = '(kg|kgs|kilograms?|l|lt|ltr|liters?|litres?)';
  const perArea = `(?:\\/|\\s+per\\s+)\\s*(?:m2|m²|sq\\.?\\s*m(?:etre|eter)?)`;

  // "1.5 Kg/m2/1 mm", "1.2 kg/m2 per mm of thickness".
  const perMm = new RegExp(
    `(\\d+(?:\\.\\d+)?)\\s*(?:-|to)?\\s*(\\d+(?:\\.\\d+)?)?\\s*${unitWord}\\s*${perArea}\\s*(?:\\/|\\s+per\\s+)\\s*\\d*\\s*mm`,
    'i',
  );
  // "approximate coverage per coat is 1.7 kg/m2", "2 to 5 kg/m²".
  const flat = new RegExp(
    `(\\d+(?:\\.\\d+)?)\\s*(?:-|to)?\\s*(\\d+(?:\\.\\d+)?)?\\s*${unitWord}\\s*${perArea}`,
    'i',
  );
  // The inverse form some sheets use: "2.3 m2/kg/coat", "0.6 m2/kg @ 1 mm".
  const perMass = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:m2|m²)\\s*\\/\\s*${unitWord}`, 'i');

  let kind: ConsumptionKind;
  let min: number;
  let max: number;
  let unit: 'kg' | 'litre';
  let matched: string;

  const mm = corpus.match(perMm);
  const inv = corpus.match(perMass);
  if (mm) {
    kind = 'per_mm';
    matched = mm[0];
    min = parseFloat(mm[1]);
    max = mm[2] ? parseFloat(mm[2]) : min;
    unit = /^(l|lt|ltr|liter|litre)/i.test(mm[3]) ? 'litre' : 'kg';
  } else if (inv) {
    // Area per unit mass inverts to mass per unit area. A sheet quoting
    // "2.3 m2/kg" means 0.43 kg covers a square metre.
    const area = parseFloat(inv[1]);
    if (!Number.isFinite(area) || area <= 0) return null;
    matched = inv[0];
    min = 1 / area;
    max = min;
    unit = /^(l|lt|ltr|liter|litre)/i.test(inv[2]) ? 'litre' : 'kg';
    // "0.6 m2/kg @ 1 mm thickness" is a rate at a stated thickness, so it
    // scales with thickness. "2.3 m2/kg/coat" is a rate per coat and does
    // not. Reading the first as flat would halve the quantity at 2 mm.
    const tail = corpus.slice(corpus.indexOf(inv[0]) + inv[0].length, corpus.indexOf(inv[0]) + inv[0].length + 40);
    const atThickness = tail.match(/^[^.]{0,20}?@?\s*(\d+(?:\.\d+)?)\s*mm/i);
    if (atThickness && !/\/\s*coat/i.test(inv[0])) {
      const per = parseFloat(atThickness[1]);
      if (Number.isFinite(per) && per > 0) {
        kind = 'per_mm';
        min = min / per;
        max = min;
      } else {
        kind = 'flat';
      }
    } else {
      kind = 'flat';
    }
  } else {
    const f = corpus.match(flat);
    if (!f) return null;
    kind = 'flat';
    matched = f[0];
    min = parseFloat(f[1]);
    max = f[2] ? parseFloat(f[2]) : min;
    unit = /^(l|lt|ltr|liter|litre)/i.test(f[3]) ? 'litre' : 'kg';
  }

  if (!Number.isFinite(min) || min <= 0) return null;

  // Sanity bound. Construction chemicals run from roughly 0.05 up to about 25
  // units per square metre; a screed at 100 mm is the heavy end and still
  // inside that once thickness is applied separately. A figure outside this
  // range means the pattern caught a pack size or a water volume rather than
  // a rate, so it is refused rather than shown.
  const PLAUSIBLE_MAX = 25;
  const PLAUSIBLE_MIN = 0.02;
  if (min < PLAUSIBLE_MIN || max > PLAUSIBLE_MAX) return null;

  const th = corpus.match(/thickness\s+of\s+(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*mm/i);
  const pf = packFigure(rec);

  return {
    kind,
    min: Math.min(min, max),
    max: Math.max(min, max),
    unit,
    thickness: th ? { min: parseFloat(th[1]), max: parseFloat(th[2]) } : undefined,
    pack: pf ? { value: parseFloat(pf.value), unit: pf.unit } : undefined,
    source: matched.replace(/\s+/g, ' ').trim(),
  };
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
