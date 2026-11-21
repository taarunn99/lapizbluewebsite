import catalogue from "@/data/kalinga-catalogue.json";

/**
 * The KalingaStone catalogue as the pages read it: 128 shades across the
 * three materials, grouped into the colour ranges and terrazzo collections
 * gcbuae.com publishes. Built by scripts/kalinga-catalogue.mjs from the crawl
 * of the sister company's site; nothing here is typed by hand.
 */

export type Material = "quartz" | "marble" | "terrazzo";

export interface Shade {
  slug: string;
  material: Material;
  line: string;
  name: string;
  series: string;
  format: string;
  range: string;
  rangeName: string;
  microban: boolean;
  isNew: boolean;
  title: string;
  metaDescription: string;
  sourceDescription: string;
  description: string[];
  applications: string[];
  finishes: string[];
  swatch: string;
  swatchAlt: string;
  lifestyle?: string;
  lifestyleAlt?: string;
  related: string[];
  prev: string | null;
  next: string | null;
}

export interface FlutingSample {
  name: string;
  baseName: string | null;
  series: string | null;
  base: string | null;
  image: string;
  alt: string;
  note?: string;
}

export interface Range {
  slug: string;
  name: string;
  kind: "colour" | "collection" | "fluting";
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sub: { name: string; body: string }[];
  shades: string[];
  samples?: FlutingSample[];
  samplesHeading?: string[];
  where?: string[];
  feature?: { image: string; alt: string } | null;
  lifestyle?: { image: string; alt: string } | null;
}

export interface MaterialEntry {
  line: string;
  name: string;
  label: string;
  formatSummary: string;
  rangeWord: string;
  count: number;
  ranges: Range[];
}

interface Catalogue {
  materials: Record<Material, MaterialEntry>;
  shades: Shade[];
}

const data = catalogue as unknown as Catalogue;

export const BRAND_SLUG = "kalinga-stone";
export const MATERIALS = data.materials;
export const SHADES = data.shades;

const shadeBySlug = new Map(SHADES.map((s) => [s.slug, s]));
const materialByLine = new Map(Object.entries(MATERIALS).map(([m, e]) => [e.line, m as Material]));

export function materialForLine(line: string): Material | undefined {
  return materialByLine.get(line);
}

export function getMaterial(line: string): MaterialEntry | undefined {
  const m = materialForLine(line);
  return m ? MATERIALS[m] : undefined;
}

export function getRange(line: string, range: string): { material: Material; entry: MaterialEntry; range: Range } | undefined {
  const m = materialForLine(line);
  if (!m) return undefined;
  const entry = MATERIALS[m];
  const r = entry.ranges.find((x) => x.slug === range);
  return r ? { material: m, entry, range: r } : undefined;
}

export function getShade(slug: string): Shade | undefined {
  return shadeBySlug.get(slug);
}

/** The shade only if it really sits at that line and range, so one shade has one URL. */
export function getShadeAt(line: string, range: string, slug: string): Shade | undefined {
  const s = shadeBySlug.get(slug);
  if (!s || s.line !== line) return undefined;
  const r = getRange(line, range);
  if (!r) return undefined;
  if (s.range === range) return s;
  // Fluting lists its base shades, but their canonical home is their colour range.
  return undefined;
}

export function shadesOf(range: Range): Shade[] {
  return range.shades.map((slug) => shadeBySlug.get(slug)).filter((s): s is Shade => Boolean(s));
}

export function lineHref(line: string): string {
  return `/brands/${BRAND_SLUG}/${line}`;
}

export function rangeHref(line: string, range: string): string {
  return `/brands/${BRAND_SLUG}/${line}/${range}`;
}

export function shadeHref(s: Shade): string {
  return `/brands/${BRAND_SLUG}/${s.line}/${s.range}/${s.slug}`;
}

export function allRangeParams(): { productLine: string; range: string }[] {
  return Object.values(MATERIALS).flatMap((m) => m.ranges.map((r) => ({ productLine: m.line, range: r.slug })));
}

export function allShadeParams(): { productLine: string; range: string; shade: string }[] {
  return SHADES.map((s) => ({ productLine: s.line, range: s.range, shade: s.slug }));
}

/** Material word as the hub and line pages print it. */
export const MATERIAL_WORD: Record<Material, string> = { quartz: "Quartz", marble: "Marble", terrazzo: "Terrazzo" };
/** The product preset the quote form expects. */
export const QUOTE_PRODUCT: Record<Material, string> = { quartz: "Quartz", marble: "Engineered marble", terrazzo: "Terrazzo" };
/** schema.org material string. */
export const SCHEMA_MATERIAL: Record<Material, string> = { quartz: "Engineered quartz", marble: "Engineered marble", terrazzo: "Terrazzo" };

/** Responsive sources for a swatch rendered by the catalogue script. */
export function swatchSrcSet(s: Shade): { avif: string; webp: string; fallback: string } {
  const base = s.swatch.replace(/\.webp$/, "");
  return {
    avif: `${base}-480.avif 480w, ${base}-960.avif 960w`,
    webp: `${base}-480.webp 480w, ${base}-960.webp 960w`,
    fallback: `${base}-960.webp`,
  };
}

/** Responsive sources for a lifestyle or fluting photograph (640 and 1200 wide). */
export function photoSrcSet(image: string): { avif: string; webp: string; fallback: string } {
  const base = image.replace(/\.webp$/, "");
  return {
    avif: `${base}-640.avif 640w, ${base}-1200.avif 1200w`,
    webp: `${base}-640.webp 640w, ${base}-1200.webp 1200w`,
    fallback: `${base}-1200.webp`,
  };
}

/** Fluting sample images are rendered at 480 and 960. */
export function sampleSrcSet(image: string): { avif: string; webp: string; fallback: string } {
  const base = image.replace(/\.webp$/, "");
  return {
    avif: `${base}-480.avif 480w, ${base}-960.avif 960w`,
    webp: `${base}-480.webp 480w, ${base}-960.webp 960w`,
    fallback: `${base}-960.webp`,
  };
}
