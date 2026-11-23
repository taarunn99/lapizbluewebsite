import type {
  CalcConfig,
  CalcIndex,
  BatchDose,
  GapVolume,
  RollGoods,
  VolumeFill,
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
  /** Kilogrammes of cement, cubic metres of concrete, or bags. */
  quantity: number;
  /** The repair pocket as a volume, for the products that offer that mode. */
  volumeM3: number;
  /** 0 measures by area and depth, 1 by the volume of the pocket. */
  mode: number;
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

/**
 * Four significant figures, not three decimal places.
 *
 * Fixed decimals destroy the dilute end of the range: a cleaner used at 1:200
 * is 0.00067 litres per square metre and rounding to three places turned that
 * into 0.001, half as much again, while doing nothing useful at the other end
 * where quantities run into the thousands.
 */
const round = (n: number) => (Number.isFinite(n) ? Number(n.toPrecision(4)) : n);

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
  // A repair pocket is often measured as a volume, not an area and a depth.
  // One square metre at one millimetre is one litre, so a cubic metre is the
  // same as 1000 square metre millimetres and the published rate still holds.
  if (cfg.byVolume && i.mode === 1) {
    const litres = i.volumeM3 * 1000;
    return {
      low: round(cfg.ratePerMm * litres),
      high: round(hi * litres),
      unit: cfg.unit,
      workings: [
        `${cfg.ratePerMm}${hi > cfg.ratePerMm ? ` to ${hi}` : ''} ${cfg.unit} per litre of mortar`,
        `${i.volumeM3} m3 of repair, which is ${Math.round(litres)} litres`,
      ],
    };
  }
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

/**
 * Fabric, mesh and membrane by the roll.
 *
 * Nothing is spread, so there is no rate. A roll one metre wide lapped five
 * centimetres covers 0.95 m of width, and the lap is why a hundred square
 * metres takes 105 metres of fabric rather than 100. Answered in metres, and
 * the pack is the roll, so the order line comes out as whole rolls.
 */
function rollGoods(cfg: RollGoods, i: CalcInputs): CalcResult {
  const effective = Math.max(cfg.rollWidth - cfg.overlap, 0.01);
  const metres =
    cfg.basis === 'area' ? i.area / effective : i.metres * (1 + cfg.overlap / cfg.rollLength);
  const lapCm = Math.round(cfg.overlap * 100);
  return {
    low: round(metres),
    high: round(metres),
    unit: 'm',
    workings:
      cfg.basis === 'area'
        ? [
            `${cfg.rollWidth} m wide roll lapped ${lapCm} cm covers ${round(effective)} m of width`,
            `over ${i.area} m2`,
          ]
        : [`${i.metres} m of detail`, `plus ${lapCm} cm of lap at each roll end`],
    };
}

/**
 * An admixture against its batch. Nothing is spread, so the question the page
 * asks is how much cement, how much concrete, or how many bags.
 */
function batchDose(cfg: BatchDose, i: CalcInputs): CalcResult {
  const q = i.quantity;
  const per =
    cfg.basis === 'cement'
      ? 'per 100 kg of cement'
      : cfg.basis === 'concrete'
        ? 'per cubic metre of concrete'
        : 'per bag';
  const n = cfg.basis === 'cement' ? q / 100 : q;
  return {
    low: round(cfg.min * n),
    high: round(cfg.max * n),
    unit: cfg.unit,
    workings: [
      `${cfg.min}${cfg.max > cfg.min ? ` to ${cfg.max}` : ''} ${cfg.unit} ${per}`,
      `${q} ${cfg.basis === 'cement' ? 'kg of cement' : cfg.basis === 'concrete' ? 'm3 of concrete' : 'bags'}`,
    ],
  };
}

/** A chase, a crack or a duct, filled by its own volume. */
function volumeFill(cfg: VolumeFill, i: CalcInputs): CalcResult {
  // A millimetre by a millimetre along a metre is a thousandth of a litre.
  const litres = (i.jointWidth * i.jointDepth * i.metres) / 1000;
  return {
    low: round(litres * cfg.densityPerLitre),
    high: round(litres * cfg.densityPerLitre),
    unit: cfg.unit,
    workings: [
      `${i.jointWidth} by ${i.jointDepth} mm chase over ${i.metres} m is ${round(litres)} litres to fill`,
      `${cfg.densityPerLitre} ${cfg.unit} per litre of void`,
    ],
  };
}

export function compute(cfg: CalcConfig, i: CalcInputs): CalcResult | null {
  if (cfg.model === 'none' || cfg.model === 'layer_schedule') return null;
  const byLength =
    cfg.model === 'linear_joint' ||
    cfg.model === 'volume_fill' ||
    (cfg.model === 'roll_goods' && cfg.basis === 'length');
  if (cfg.model === 'batch_dose') {
    if (i.quantity <= 0) return null;
  } else if (byLength) {
    if (i.metres <= 0) return null;
  } else if (cfg.model === 'thickness_area' && cfg.byVolume && i.mode === 1) {
    if (i.volumeM3 <= 0) return null;
  } else if (i.area <= 0) return null;
  const r =
    cfg.model === 'tiered_area'
      ? tieredArea(cfg, i)
      : cfg.model === 'thickness_area'
        ? thicknessArea(cfg, i)
        : cfg.model === 'joint_volume'
          ? jointVolume(cfg, i)
          : cfg.model === 'linear_joint'
            ? linearJoint(cfg, i)
            : cfg.model === 'roll_goods'
              ? rollGoods(cfg, i)
              : cfg.model === 'batch_dose'
                ? batchDose(cfg, i)
                : cfg.model === 'volume_fill'
                  ? volumeFill(cfg, i)
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
    quantity: 100,
    volumeM3: 0.25,
    mode: 0,
  };
  switch (cfg.model) {
    case 'tiered_area':
      return { ...base, tier: cfg.defaultTier, coats: cfg.coats?.default ?? 1 };
    case 'thickness_area':
      return {
        ...base,
        thickness: cfg.thickness.default,
        volumeM3: cfg.byVolume?.defaultM3 ?? base.volumeM3,
      };
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
      return { ...base, area: 2, gapMm: cfg.defaults.gapMm };
    case 'roll_goods':
      return { ...base, metres: 20 };
    case 'batch_dose':
      return { ...base, quantity: cfg.defaults.quantity };
    case 'volume_fill':
      return {
        ...base,
        metres: cfg.defaults.metres,
        jointWidth: cfg.defaults.widthMm,
        jointDepth: cfg.defaults.depthMm,
      };
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
  // Two decimals is not enough for a dilute sealer. A cleaner used at 1:200
  // is 0.0007 litres per square metre, and fixed rounding printed that as a
  // flat zero in the hero. Keep enough places that the figure survives.
  const span = (lo: number, hi: number) => {
    const places = (n: number) => (n >= 1 ? 2 : n >= 0.1 ? 3 : n >= 0.01 ? 4 : 5);
    const dp = Math.max(places(lo), places(hi));
    const f = (n: number) => String(parseFloat(n.toFixed(dp)));
    return hi > lo + 1e-9 ? `${f(lo)} to ${f(hi)}` : f(lo);
  };
  const per = cfg.model === 'none' ? '' : cfg.unit === 'litre' ? 'L/m²' : `${cfg.unit}/m²`;

  switch (cfg.model) {
    case 'tiered_area': {
      // Coats have to be in the headline. A membrane whose sheet prints 0.7
      // kg/m2 as a two coat total is stored as 0.35 per coat, and a hero
      // reading 0.35 contradicts both the sheet and the calculator below it.
      const coats = cfg.coats?.default ?? 1;
      const lo = Math.min(...cfg.tiers.map((t) => t.min)) * coats;
      const hi = Math.max(...cfg.tiers.map((t) => t.max)) * coats;
      const over = coats > 1 ? ` over ${coats} coats` : '';
      return { label: 'Consumption', value: `${span(lo, hi)} ${per}${over}` };
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
      // The default profile's factor has to be in here. A coving defaults to a
      // fillet, which is half a rectangular section, and a hero that ignored
      // the factor printed exactly double the calculator below it.
      const w = cfg.defaults.width;
      const d = depthFor(cfg, w);
      const p = cfg.profiles[0];
      const shape = cfg.profiles.length > 1 ? `, ${p.label.toLowerCase()}` : '';
      return {
        label: 'Consumption',
        value: `${round(w * d * p.factor)} ml per metre of ${w} by ${d} mm joint${shape}`,
      };
    }
    case 'gap_volume':
      return {
        label: 'Consumption',
        value: `${cfg.densityKgPerLitre} ${cfg.unit} of powder per litre of mixed grout`,
      };
    case 'batch_dose': {
      const per =
        cfg.basis === 'cement'
          ? 'per 100 kg of cement'
          : cfg.basis === 'concrete'
            ? 'per m3 of concrete'
            : 'per bag';
      return { label: 'Dosage', value: `${span(cfg.min, cfg.max)} ${cfg.unit} ${per}` };
    }
    case 'volume_fill':
      return {
        label: 'Consumption',
        value: `${cfg.densityPerLitre} ${cfg.unit} per litre of void`,
      };
    case 'roll_goods':
      return {
        label: 'Supplied',
        value: `${cfg.rollLength} m roll, ${cfg.rollWidth} m wide, lapped ${Math.round(cfg.overlap * 100)} cm`,
      };
    default:
      return null;
  }
}
