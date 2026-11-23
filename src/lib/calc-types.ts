/**
 * What a calculator needs to know about one product.
 *
 * Every number in here is transcribed from a published data sheet. Nothing is
 * derived, averaged across products, or inferred from a sibling, because a
 * salesperson reading a quantity off this page has to be able to turn to the
 * sheet and find the same figure. `source` names the line it came from, and
 * the page prints it under the result.
 *
 * The old model had one shape, a rate times an area, which is why every
 * calculator on the site was a multiplication box. A tiler choosing a notched
 * trowel, a waterproofer deciding one coat or two and a grouter sizing a joint
 * are three different sums, so there are six models here and no more: each one
 * earns its place by being a sum the others cannot do.
 */

/**
 * kg, litres, millilitres or metres. What the sheet quotes, never converted.
 * Metres are for goods sold by the roll, where the answer is a length of
 * fabric and then a number of rolls rather than a weight.
 */
export type CalcUnit = 'kg' | 'litre' | 'ml' | 'm';

export interface CalcPack {
  value: number;
  unit: string;
  /** A sealant is ordered in cartridges, not kilogrammes. */
  label?: string;
}

/**
 * One row of a published consumption table: a named way of applying the
 * product and the rate that goes with it. The trowel table in a tile adhesive
 * sheet, the TKB notch classes in a vinyl adhesive sheet, the porous and non
 * porous columns in a sealer sheet.
 */
export interface CalcTier {
  /** As printed: "Trowel no. 5", "TKB B1", "Porous substrate". */
  label: string;
  min: number;
  max: number;
  /** Tile sizes or substrates the sheet puts against this row. */
  hint?: string;
}

interface Base {
  /** Exact line from the sheet that the figures come from. */
  source: string;
  unit: CalcUnit;
  pack?: CalcPack;
  /** Anything the sheet says that changes how the number should be read. */
  caveat?: string;
}

/**
 * A rate per square metre that depends on a choice, plus coats.
 *
 * Tile adhesives (trowel), resilient adhesives (TKB class), sealers and
 * primers (substrate, dilution), waterproofing and microcement (coats).
 */
export interface TieredArea extends Base {
  model: 'tiered_area';
  tiers: CalcTier[];
  /** What the rows are, when they are not trowels: "Surface", "Substrate". */
  tiersLabel?: string;
  /** Index into `tiers`. The sheet's own recommendation, never the cheapest. */
  defaultTier: number;
  /** Omitted when the product is a single coat product. */
  coats?: { min: number; max: number; default: number; label: string };
  /** Vertical work uses more, when and only when the sheet says so. */
  orientation?: { label: string; factor: number }[];
}

/** A rate per millimetre of thickness: screeds, renders, repair mortars. */
export interface ThicknessArea extends Base {
  model: 'thickness_area';
  /** kg per square metre per millimetre. */
  ratePerMm: number;
  ratePerMmMax?: number;
  thickness: { min: number; max: number; default: number };
}

/**
 * The grout sum. kg/m2 = ((L + W) / (L x W)) x depth x joint x k, with the
 * tile dimensions in millimetres. k is the product's own fitted constant and
 * runs from 1.52 to 1.90 across the range, so it is never shared.
 */
export interface JointVolume extends Base {
  model: 'joint_volume';
  k: number;
  /** True when the sheet says its table already carries site wastage. */
  includesWastage?: boolean;
  defaults: { tileL: number; tileW: number; tileT: number; joint: number };
}

/** A sealant joint. ml per metre = width x depth, halved for a fillet. */
export interface LinearJoint extends Base {
  model: 'linear_joint';
  profiles: { label: string; factor: number }[];
  /** Depth the sheet pairs with each width, so depth is never a free guess. */
  depthByWidth: { width: number; depth: number }[];
  defaults: { width: number; metres: number };
}

/** Pourable grout filling a measured gap: a volume times a density. */
export interface GapVolume extends Base {
  model: 'gap_volume';
  /** kg of powder per litre of finished grout. */
  densityKgPerLitre: number;
  defaults: { gapMm: number };
}

/**
 * A resin floor is a schedule of named layers, several of them other
 * products. There is no single rate, so nothing is calculated: the sheet's own
 * layer list is printed, each with its own rate, and the total is the sum of
 * the layers that belong to this product.
 */
export interface LayerSchedule extends Base {
  model: 'layer_schedule';
  layers: { name: string; rate: string; thisProduct: boolean }[];
}

/**
 * Reinforcing fabric, mesh, membrane and tape, sold by the roll.
 *
 * These sheets publish no consumption rate at all, because there is nothing
 * to spread: what they publish is a roll size and an overlap. Thirty six
 * products on this site were showing no calculator for that reason, including
 * Mapetex Sel, which is one of the heaviest selling lines in the catalogue.
 *
 * The sum is the one a foreman does on site. A roll one metre wide lapped
 * five centimetres covers 0.95 m of width, so a hundred square metres needs
 * 105 metres of fabric and five 25 m rolls, not four.
 */
export interface RollGoods extends Base {
  model: 'roll_goods';
  /** Metres. */
  rollWidth: number;
  rollLength: number;
  /** Metres of lap the sheet calls for at each junction. */
  overlap: number;
  /**
   * Whether the product is laid over an area, as a fabric is, or run along a
   * detail, as a tape is. A tape is measured by the metre of joint.
   */
  basis: 'area' | 'length';
}

/**
 * An admixture, dosed against the batch rather than spread over anything.
 *
 * A superplasticiser is quoted per hundred kilogrammes of cement, a fibre per
 * cubic metre of concrete, a latex per bag of the product it goes into. None
 * of those is an area, which is why twelve of these were showing no
 * calculator at all, and all of them are a straightforward multiplication
 * once the page asks for the right quantity.
 */
export interface BatchDose extends Base {
  model: 'batch_dose';
  /** What the dose is quoted against. */
  basis: 'cement' | 'concrete' | 'bag';
  /** Dose in `unit` per 100 kg of cement, per m3 of concrete, or per bag. */
  min: number;
  max: number;
  /** Named on the control, as the sheet names it. */
  label: string;
  defaults: { quantity: number };
}

/**
 * A crack, a hole or a duct, filled by volume.
 *
 * These sheets quote kilogrammes per cubic decimetre of void. Running that
 * through an area times a depth asks for 1800 kg to plug a few cracks, which
 * is why they were turned off. The honest sum is the volume of the chase:
 * its length, its width and its depth, times the density.
 */
export interface VolumeFill extends Base {
  model: 'volume_fill';
  /** Kilogrammes or litres of product per litre of void. */
  densityPerLitre: number;
  defaults: { metres: number; widthMm: number; depthMm: number };
}

/** The sheet publishes no rate, or publishes one that cannot be computed. */
export interface NoCalc {
  model: 'none';
  /** Said plainly on the page, in place of a calculator. */
  reason: string;
  /**
   * True when the reason is itself published data: an admixture dosed against
   * the cement weight, a tape quoted per linear metre, a binder quoted per
   * cubic metre of sand. That is the answer a salesperson came for, so it is
   * printed. False, or absent, means no sheet exists for the product yet and
   * there is genuinely nothing to show, so the section does not render.
   * Set by scripts/build-calculator-index.ts, not by hand.
   */
  dosage?: boolean;
}

export type CalcConfig =
  | BatchDose
  | VolumeFill
  | RollGoods
  | TieredArea
  | ThicknessArea
  | JointVolume
  | LinearJoint
  | GapVolume
  | LayerSchedule
  | NoCalc;

/** Keyed "brand/slug", exactly as the manifest spells them. */
export type CalcIndex = Record<string, CalcConfig>;
