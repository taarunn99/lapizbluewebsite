import type {
  CalcConfig,
  CalcIndex,
  GapVolume,
  JointVolume,
  LinearJoint,
  ThicknessArea,
  TieredArea,
} from './calc-types';
import INDEX from '../../data/calculators/index.json';

/**
 * The sums behind the calculators.
 *
 * Deliberately pure and free of React, so each one can be checked against a
 * data sheet in a test rather than through a browser. Every function returns a
 * range, because sheets publish ranges, and a single number would be a quiet
 * decision about which end of the manufacturer's own range to believe.
 *
 * Nothing here adds a wastage allowance. That stays a separate, explicit
 * control on the page: a quantity that silently carries someone else's site
 * assumption cannot be checked against the sheet, and being checkable against
 * the sheet is the whole point.
 */

const calcIndex = INDEX as CalcIndex;

export function calcConfig(brand: string, slug: string): CalcConfig | null {
  return calcIndex[`${brand}/${slug}`] ?? null;
}

/** The state every model reads from, so one form can drive all of them. */
export interface CalcInputs {
  area: number;
  metres: number;
  tier: number;
  coats: number;
  orientation: number;
  thickness: number;
  tileL: number;
  tileW: number;
  tileT: number;
  joint: number;
  jointWidth: number;
  jointDepth: number;
  profile: number;
  gapMm: number;
}

export interface CalcResult {
  /** The data sheet figure, with no allowance of any kind folded in. */
  low: number;
  high: number;
  unit: string;
  /** How the figure was reached, printed under the result, line by line. */
  workings: string[];
  packsLow?: number;
  packsHigh?: number;
  packLabel?: string;
}

const round = (n: number) => Math.round(n * 1000) / 1000;

function withPacks(cfg: CalcConfig, r: CalcResult): CalcResult {
  if (!('pack' in cfg) || !cfg.pack) return r;
  const { value, unit, label } = cfg.pack;
  // Up, always. Running short on site costs more than a spare bag.
  return {
    ...r,
    packsLow: Math.ceil(r.low / value),
    packsHigh: Math.ceil(r.high / value),
    packLabel: `${value} ${unit}${label ? ` ${label}` : ''}`,
  };
}

function tieredArea(cfg: TieredArea, i: CalcInputs): CalcResult {
  const tier = cfg.tiers[Math.min(i.tier, cfg.tiers.length - 1)];
  const coats = cfg.coats ? Math.max(1, i.coats) : 1;
  const or = cfg.orientation?.[i.orientation];
  const f = (or?.factor ?? 1) * coats;
  const workings = [`${tier.label}: ${tier.min}${tier.max > tier.min ? ` to ${tier.max}` : ''} ${cfg.unit}/m2`];
  if (cfg.coats) workings.push(`${coats} ${coats === 1 ? 'coat' : 'coats'}`);
  if (or && or.factor !== 1) workings.push(`${or.label}, ${or.factor} times the flat rate`);
  workings.push(`over ${i.area} m2`);
  return { low: round(tier.min * i.area * f), high: round(tier.max * i.area * f), unit: cfg.unit, workings };
}

function thicknessArea(cfg: ThicknessArea, i: CalcInputs): CalcResult {
  const t = i.thickness;
  const hi = cfg.ratePerMmMax ?? cfg.ratePerMm;
  return {
    low: round(cfg.ratePerMm * t * i.area),
    high: round(hi * t * i.area),
    unit: cfg.unit,
    workings: [
      `${cfg.ratePerMm}${hi > cfg.ratePerMm ? ` to ${hi}` : ''} ${cfg.unit}/m2 per mm`,
      `${t} mm thick`,
      `over ${i.area} m2`,
    ],
  };
}

/**
 * The grout sum, as every manufacturer prints it:
 *
 *   kg/m2 = ((L + W) / (L x W)) x T x J x k
 *
 * with the tile length, width and thickness and the joint width all in
 * millimetres. The tile thickness is the joint depth, which is why a 20 mm
 * porcelain slab takes twice the grout of a 10 mm tile at the same joint.
 *
 * k is the product's own constant, fitted to its own printed table and
 * verified cell by cell. It runs from 1.52 to 1.90 across the range, a 25 per
 * cent spread, so it is never shared between products and never averaged.
 */
function jointVolume(cfg: JointVolume, i: CalcInputs): CalcResult {
  const { tileL: L, tileW: W, tileT: T, joint: J } = i;
  if (L <= 0 || W <= 0) return { low: 0, high: 0, unit: cfg.unit, workings: [] };
  const rate = ((L + W) / (L * W)) * T * J * cfg.k;
  return {
    low: round(rate * i.area),
    high: round(rate * i.area),
    unit: cfg.unit,
    workings: [
      `${L} x ${W} x ${T} mm tile, ${J} mm joint`,
      `${round(rate)} ${cfg.unit}/m2 by the sheet's own formula`,
      `over ${i.area} m2`,
      cfg.includesWastage ? 'The sheet states this already includes normal site wastage.' : '',
    ].filter(Boolean),
  };
}

/**
 * A sealant joint, which is a volume and not an area.
 *
 * ml per metre = width x depth in millimetres, exactly, because one cubic
 * millimetre over one metre is one millilitre. A fillet is half of a butt
 * joint of the same section. No constant, so nothing to fit and nothing to
 * get wrong: the arithmetic reproduces every printed row of every sealant
 * sheet checked.
 */
function linearJoint(cfg: LinearJoint, i: CalcInputs): CalcResult {
  const p = cfg.profiles[Math.min(i.profile, cfg.profiles.length - 1)];
  const ml = i.jointWidth * i.jointDepth * p.factor * i.metres;
  return {
    low: round(ml),
    high: round(ml),
    unit: 'ml',
    workings: [
      `${p.label}, ${i.jointWidth} mm wide by ${i.jointDepth} mm deep`,
      `${round(i.jointWidth * i.jointDepth * p.factor)} ml per metre`,
      `over ${i.metres} m of joint`,
    ],
  };
}

function gapVolume(cfg: GapVolume, i: CalcInputs): CalcResult {
  // A gap in millimetres over a square metre is that many litres.
  const litres = i.area * i.gapMm;
  return {
    low: round(litres * cfg.densityKgPerLitre),
    high: round(litres * cfg.densityKgPerLitre),
    unit: cfg.unit,
    workings: [
      `${i.gapMm} mm gap over ${i.area} m2 is ${round(litres)} litres to fill`,
      `${cfg.densityKgPerLitre} ${cfg.unit} of powder per litre of mixed grout`,
    ],
  };
}

export function compute(cfg: CalcConfig, i: CalcInputs): CalcResult | null {
  if (cfg.model === 'none' || cfg.model === 'layer_schedule') return null;
  if (i.area <= 0 && cfg.model !== 'linear_joint') return null;
  if (cfg.model === 'linear_joint' && i.metres <= 0) return null;
  const r =
    cfg.model === 'tiered_area'
      ? tieredArea(cfg, i)
      : cfg.model === 'thickness_area'
        ? thicknessArea(cfg, i)
        : cfg.model === 'joint_volume'
          ? jointVolume(cfg, i)
          : cfg.model === 'linear_joint'
            ? linearJoint(cfg, i)
            : gapVolume(cfg, i);
  if (!Number.isFinite(r.low) || r.low <= 0) return null;
  return withPacks(cfg, r);
}

/** Where every control starts, taken from the product's own sheet. */
export function initialInputs(cfg: CalcConfig): CalcInputs {
  const base: CalcInputs = {
    area: 50,
    metres: 20,
    tier: 0,
    coats: 1,
    orientation: 0,
    thickness: 3,
    tileL: 600,
    tileW: 600,
    tileT: 10,
    joint: 3,
    jointWidth: 10,
    jointDepth: 10,
    profile: 0,
    gapMm: 30,
  };
  switch (cfg.model) {
    case 'tiered_area':
      return { ...base, tier: cfg.defaultTier, coats: cfg.coats?.default ?? 1 };
    case 'thickness_area':
      return { ...base, thickness: cfg.thickness.default };
    case 'joint_volume':
      return {
        ...base,
        tileL: cfg.defaults.tileL,
        tileW: cfg.defaults.tileW,
        tileT: cfg.defaults.tileT,
        joint: cfg.defaults.joint,
      };
    case 'linear_joint': {
      const w = cfg.defaults.width;
      return {
        ...base,
        metres: cfg.defaults.metres,
        jointWidth: w,
        jointDepth: depthFor(cfg, w),
      };
    }
    case 'gap_volume':
      return { ...base, gapMm: cfg.defaults.gapMm };
    default:
      return base;
  }
}

/**
 * The depth the sheet pairs with a width, so depth is never a free guess.
 *
 * Sealant sheets print a handful of widths, not every width, and they do it in
 * two regimes. Up to about 10 mm the depth equals the width, so a 6 mm joint
 * between the printed 5 and 10 mm rows is 6 mm deep and reading the 10 mm row
 * would over-order by two thirds. Above that the depth is its own figure, and
 * there the next printed row up is used, because understating a depth
 * understates the order and running short on site is the expensive mistake.
 */
export function depthFor(cfg: LinearJoint, width: number): number {
  const rows = [...cfg.depthByWidth].sort((a, b) => a.width - b.width);
  if (!rows.length) return width;

  const exact = rows.find((r) => r.width === width);
  if (exact) return exact.depth;

  const below = [...rows].reverse().find((r) => r.width < width);
  const above = rows.find((r) => r.width > width);

  // Inside the band where the sheet keeps depth equal to width, follow that
  // rule rather than snapping to a printed row.
  const equalBand = (r?: { width: number; depth: number }) => !r || r.depth === r.width;
  if (below && equalBand(below) && equalBand(above)) return width;

  return (above ?? below)!.depth;
}

/**
 * The one line summary of a product's published rate.
 *
 * Used by the hero specification table and by the bill of quantities clause,
 * so that both agree with the calculator sitting further down the same page.
 * The old code took whatever rate a regex found first, which was always the
 * lowest row of the table, so a tile adhesive's hero read 2 kg/m2 while its
 * own sheet went to 8. This spans the whole published table instead: the
 * floor of the lightest way of applying it to the ceiling of the heaviest.
 */
export function headlineRate(cfg: CalcConfig): { label: string; value: string } | null {
  const span = (lo: number, hi: number, dp = 2) => {
    const f = (n: number) => String(parseFloat(n.toFixed(dp)));
    return hi > lo + 1e-9 ? `${f(lo)} to ${f(hi)}` : f(lo);
  };
  const per = cfg.model === 'none' ? '' : cfg.unit === 'litre' ? 'L/m²' : `${cfg.unit}/m²`;

  switch (cfg.model) {
    case 'tiered_area': {
      const lo = Math.min(...cfg.tiers.map((t) => t.min));
      const hi = Math.max(...cfg.tiers.map((t) => t.max));
      return { label: 'Consumption', value: `${span(lo, hi)} ${per}` };
    }
    case 'thickness_area':
      return {
        label: 'Consumption',
        value: `${span(cfg.ratePerMm, cfg.ratePerMmMax ?? cfg.ratePerMm)} ${per} per mm`,
      };
    case 'joint_volume': {
      const { tileL: L, tileW: W, tileT: T, joint: J } = cfg.defaults;
      const rate = ((L + W) / (L * W)) * T * J * cfg.k;
      return {
        label: 'Consumption',
        value: `${span(rate, rate)} ${per} on a ${L}x${W}x${T} mm tile at a ${J} mm joint`,
      };
    }
    case 'linear_joint': {
      const w = cfg.defaults.width;
      const d = depthFor(cfg, w);
      return { label: 'Consumption', value: `${w * d} ml per metre of ${w} by ${d} mm joint` };
    }
    case 'gap_volume':
      return {
        label: 'Consumption',
        value: `${cfg.densityKgPerLitre} ${cfg.unit} of powder per litre of mixed grout`,
      };
    default:
      return null;
  }
}
