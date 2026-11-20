/**
 * The colour a product page is tinted with.
 *
 * Each brand config already carries a `theme.primary`. That colour was chosen
 * to sit next to a logo, not to carry body text, so it cannot be used for both
 * jobs. Kerakoll is the case that proves it: their sage `#AFCDAF` measures
 * about 1.7:1 on white, well under the 4.5 that text needs, and the product
 * pages score 100 on accessibility today.
 *
 * So one colour in, three out:
 *
 *   brand      the real colour, for fills, rules, icons and the active pill
 *   brandInk   the same hue darkened until it clears 4.5:1 on white, the only
 *              one allowed to carry text
 *   brandSoft  a very light wash of the same hue, for tinted panels
 *
 * Darkening walks the colour down in HSL lightness rather than blending it
 * towards black, which keeps the hue recognisable. A brand that already passes
 * is returned untouched, so Mapei and Vetonit are unaffected.
 */

export interface BrandTheme {
  brand: string;
  brandInk: string;
  brandSoft: string;
}

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb | null {
  const clean = hex.trim().replace(/^#/, '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

const toHex = ({ r, g, b }: Rgb) =>
  `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')}`;

/** Relative luminance, the WCAG definition. */
function luminance({ r, g, b }: Rgb): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast against white, which is what every product page sits on. */
const contrastOnWhite = (rgb: Rgb) => 1.05 / (luminance(rgb) + 0.05);

function rgbToHsl({ r, g, b }: Rgb) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === rr ? ((gg - bb) / d + (gg < bb ? 6 : 0)) : max === gg ? (bb - rr) / d + 2 : (rr - gg) / d + 4;
  return { h: h / 6, s, l };
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const toChannel = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return {
    r: Math.round(toChannel(h + 1 / 3) * 255),
    g: Math.round(toChannel(h) * 255),
    b: Math.round(toChannel(h - 1 / 3) * 255),
  };
}

/** Walk the lightness down until the colour is legible as text on white. */
function darkenUntilLegible(rgb: Rgb): Rgb {
  const { h, s } = rgbToHsl(rgb);
  let { l } = rgbToHsl(rgb);
  let out = rgb;
  // One per cent at a time, floored, so a pale colour cannot loop forever.
  while (contrastOnWhite(out) < 5.0 && l > 0.08) {
    l -= 0.01;
    out = hslToRgb(h, s, l);
  }
  return out;
}

/** A wash of the same hue, for panel fills. */
function lightenToWash(rgb: Rgb): Rgb {
  const { h, s } = rgbToHsl(rgb);
  return hslToRgb(h, Math.min(s, 0.45), 0.94);
}

const FALLBACK: BrandTheme = { brand: '#23395B', brandInk: '#23395B', brandSoft: '#BFD7EA' };

/**
 * The manufacturer's own colour, where it differs from what the brand config
 * carries.
 *
 * `theme.primary` is shared with the brand page and the product line pages, and
 * several brands have it set to the house navy rather than to their own colour:
 * Mapei's entry is literally commented "Lapiz Blue primary". Changing it there
 * would retint pages that already rank, so the product pages keep their own
 * map and everything else is left alone.
 *
 * A brand not listed here falls through to its config colour, which is correct
 * for Pidilite Puma and for Kerakoll.
 */
const MANUFACTURER_COLOUR: Record<string, string> = {
  mapei: '#0179C2',
};

/**
 * Resolve a brand's `theme.primary` into the three values the page needs.
 * An unreadable or missing colour falls back to the house navy rather than
 * rendering something arbitrary.
 */
export function resolveBrandTheme(primary: string | undefined): BrandTheme {
  const rgb = primary ? hexToRgb(primary) : null;
  if (!rgb) return FALLBACK;
  return {
    brand: toHex(rgb),
    brandInk: toHex(contrastOnWhite(rgb) >= 5.0 ? rgb : darkenUntilLegible(rgb)),
    brandSoft: toHex(lightenToWash(rgb)),
  };
}

/** The inline custom properties to put on a product page wrapper. */
export function brandThemeStyle(brandSlug: string, primary: string | undefined): React.CSSProperties {
  const theme = resolveBrandTheme(MANUFACTURER_COLOUR[brandSlug] ?? primary);
  return {
    '--brand': theme.brand,
    '--brand-ink': theme.brandInk,
    '--brand-soft': theme.brandSoft,
  } as React.CSSProperties;
}
