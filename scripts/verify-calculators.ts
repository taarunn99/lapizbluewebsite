/**
 * Prove the calculators against the sheets, not against themselves.
 *
 * Two jobs. First, every entry in the index has to be a well formed config:
 * a known model, a default tier that exists, a thickness default inside the
 * printed range, no dashes in any string. Second, and the part that actually
 * matters, the grout and sealant sums are run against cells transcribed by
 * hand out of the published tables, so a change to the formula cannot quietly
 * start producing numbers the manufacturer never printed.
 *
 *   npx tsx scripts/verify-calculators.ts
 */
import fs from 'node:fs';
import type { CalcConfig, CalcIndex } from '../src/lib/calc-types';
import { compute, headlineRate, initialInputs, depthFor } from '../src/lib/calculator';

const MODELS = [
  'batch_dose',
  'volume_fill',
  'roll_goods',
  'tiered_area',
  'thickness_area',
  'joint_volume',
  'linear_joint',
  'gap_volume',
  'layer_schedule',
  'none',
];

const fails: string[] = [];
const warns: string[] = [];

/* ---------- 1. the index is well formed ---------- */

const index: CalcIndex = JSON.parse(fs.readFileSync('data/calculators/index.json', 'utf8'));
const dashes = /[–—]/;

function checkStrings(key: string, o: unknown, path = '') {
  if (typeof o === 'string') {
    if (dashes.test(o)) fails.push(`${key}${path}: em or en dash in "${o}"`);
  } else if (Array.isArray(o)) {
    o.forEach((v, n) => checkStrings(key, v, `${path}[${n}]`));
  } else if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) checkStrings(key, v, `${path}.${k}`);
  }
}

for (const [key, cfg] of Object.entries(index)) {
  if (!MODELS.includes(cfg.model)) {
    fails.push(`${key}: unknown model "${cfg.model}"`);
    continue;
  }
  checkStrings(key, cfg);

  if (cfg.model === 'none') {
    if (!cfg.reason?.trim()) fails.push(`${key}: model none with no reason`);
    continue;
  }
  if (!('source' in cfg) || !cfg.source?.trim()) fails.push(`${key}: no source line`);

  if (cfg.model === 'tiered_area') {
    if (!cfg.tiers?.length) fails.push(`${key}: tiered_area with no tiers`);
    else {
      if (cfg.defaultTier < 0 || cfg.defaultTier >= cfg.tiers.length)
        fails.push(`${key}: defaultTier ${cfg.defaultTier} outside 0..${cfg.tiers.length - 1}`);
      cfg.tiers.forEach((t, n) => {
        if (!(t.max >= t.min)) fails.push(`${key}: tier ${n} max below min`);
        if (!(t.min > 0)) fails.push(`${key}: tier ${n} min is not positive`);
      });
      // The defect this whole pass exists to kill: shipping the cheapest row.
      if (cfg.tiers.length > 1 && cfg.defaultTier === 0)
        warns.push(`${key}: defaults to the first and lowest tier, "${cfg.tiers[0].label}"`);
    }
    if (cfg.coats && !(cfg.coats.default >= cfg.coats.min))
      fails.push(`${key}: coats default below the sheet minimum`);
  }

  if (cfg.model === 'thickness_area') {
    const t = cfg.thickness;
    if (!(t && t.max >= t.min)) fails.push(`${key}: thickness range inverted or missing`);
    else if (t.default < t.min || t.default > t.max)
      fails.push(`${key}: thickness default ${t.default} outside the printed ${t.min} to ${t.max}`);
    if (!(cfg.ratePerMm > 0)) fails.push(`${key}: ratePerMm is not positive`);
    if (cfg.ratePerMm > 10) warns.push(`${key}: ${cfg.ratePerMm} kg/m2 per mm looks like a per cm figure`);
  }

  if (cfg.model === 'joint_volume') {
    if (!(cfg.k >= 1.3 && cfg.k <= 2.1))
      fails.push(`${key}: k of ${cfg.k} outside the 1.3 to 2.1 range every fitted sheet falls in`);
  }

  if (cfg.model === 'batch_dose') {
    if (!(cfg.max >= cfg.min && cfg.min > 0)) fails.push(`${key}: batch_dose range inverted or not positive`);
    if (!['cement', 'concrete', 'bag'].includes(cfg.basis)) fails.push(`${key}: unknown dose basis "${cfg.basis}"`);
    if (!(cfg.defaults?.quantity > 0)) fails.push(`${key}: batch_dose needs a positive default quantity`);
  }

  if (cfg.model === 'volume_fill') {
    if (!(cfg.densityPerLitre > 0)) fails.push(`${key}: volume_fill density is not positive`);
    const d = cfg.defaults;
    if (!(d?.metres > 0 && d?.widthMm > 0 && d?.depthMm > 0))
      fails.push(`${key}: volume_fill needs a positive default chase`);
  }

  if (cfg.model === 'roll_goods') {
    if (!(cfg.rollWidth > 0 && cfg.rollLength > 0))
      fails.push(`${key}: roll_goods needs a positive roll width and length`);
    if (cfg.unit !== 'm') fails.push(`${key}: roll_goods answers in metres, not ${cfg.unit}`);
    // A membrane is lapped along its side, so the lap has to be narrower than
    // the roll. A strip, a tape or a waterstop bar is bought by the metre of
    // joint and lapped end to end, so its lap is measured along the length and
    // is often wider than the strip itself, and a box holds several rolls.
    if (cfg.basis === 'length') {
      if (!(cfg.overlap >= 0 && cfg.overlap < cfg.rollLength))
        fails.push(`${key}: a lap of ${cfg.overlap} m does not fit a ${cfg.rollLength} m roll`);
      if (cfg.pack && cfg.pack.value % cfg.rollLength !== 0)
        fails.push(`${key}: a pack of ${cfg.pack.value} is not whole rolls of ${cfg.rollLength} m`);
    } else {
      if (!(cfg.overlap >= 0 && cfg.overlap < cfg.rollWidth))
        fails.push(`${key}: an overlap of ${cfg.overlap} m is not inside a ${cfg.rollWidth} m roll`);
      if (cfg.pack && cfg.pack.value !== cfg.rollLength)
        fails.push(`${key}: the pack is ${cfg.pack.value} but a roll is ${cfg.rollLength} m`);
    }
  }

  if (cfg.model === 'linear_joint') {
    if (!cfg.depthByWidth?.length) fails.push(`${key}: linear_joint with no depth table`);
    if (!cfg.profiles?.length) fails.push(`${key}: linear_joint with no joint profiles`);
  }

  // A rate in one unit divided by a pack in another. withPacks divides
  // blindly, so a rate in millilitres against a pack quoted in litres asked
  // for five hundred bottles where one would do. This kills the whole class.
  if ('pack' in cfg && cfg.pack) {
    const family = (u: string) =>
      /^(ml|millilitre|millilitre?s)$/i.test(u)
        ? 'ml'
        : /^(l|lt|ltr|litre|liter|litres|liters)$/i.test(u)
          ? 'litre'
          : /^(kg|kgs|kilo|kilogram|kilograms|g|gram|grams)$/i.test(u)
            ? 'kg'
            : 'other';
    const want = family(cfg.unit);
    const got = family(cfg.pack.unit);
    if (got === 'other')
      warns.push(`${key}: pack unit "${cfg.pack.unit}" is not a weight or a volume`);
    else if (want !== got)
      fails.push(
        `${key}: the rate is in ${cfg.unit} but the pack is in ${cfg.pack.unit}, so the pack count is out by a factor`,
      );
  }

  // The hero spec row and the calculator read the same config and must not
  // disagree. headlineRate has drifted from compute twice already.
  if (cfg.model === 'linear_joint' || cfg.model === 'tiered_area') {
    // The hero prints the whole published span and the calculator prints one
    // chosen row of it, so they are not the same number. What must hold is
    // that the row sits inside the span: if it does not, one of them is
    // reading the table differently from the other.
    const head = headlineRate(cfg);
    const r = compute(cfg, { ...initialInputs(cfg), area: 1, metres: 1 });
    const nums = (head?.value ?? '').replace(/,/g, '').match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    if (r && nums.length) {
      const spanLo = Math.min(...nums);
      const spanHi = Math.max(...nums);
      const lo = Math.min(r.low, r.high);
      const hi = Math.max(r.low, r.high);
      if (lo < spanLo * 0.98 - 1e-9 || hi > spanHi * 1.02 + 1e-9)
        warns.push(
          `${key}: the calculator's default gives ${lo} to ${hi} ${cfg.unit}, outside the hero's published span of ${spanLo} to ${spanHi}`,
        );
    }
  }

  // Every config must produce a number from its own defaults.
  const r = compute(cfg, initialInputs(cfg));
  if (cfg.model !== 'layer_schedule' && !r)
    fails.push(`${key}: produces nothing from its own default inputs`);
}

/* ---------- 2. the sums against printed cells ---------- */

/**
 * Transcribed from the Ultracolor Plus data sheet, "Consumption according to
 * the size of the tiles and the width of the joints (kg/m2)". Joint widths 2,
 * 3, 5, 8 and 10 mm across; a blank means the sheet prints no cell there.
 */
const ULTRACOLOR: [string, (number | null)[]][] = [
  ['75x150x6', [0.4, 0.6, 1.0, 1.5, 1.9]],
  ['100x100x7', [0.4, 0.7, 1.1, 1.8, 2.2]],
  ['100x100x9', [0.6, 0.9, 1.4, 2.3, 2.9]],
  ['150x150x6', [0.3, 0.4, 0.6, 1.0, 1.3]],
  ['200x200x7', [0.2, 0.3, 0.6, 0.9, 1.1]],
  ['200x200x9', [0.3, 0.4, 0.7, 1.2, 1.4]],
  ['300x300x10', [0.2, 0.3, 0.5, 0.9, 1.1]],
  ['300x300x20', [0.4, 0.6, 1.1, 1.7, 2.1]],
  ['300x600x10', [0.2, 0.2, 0.4, 0.6, 0.8]],
  ['400x400x10', [0.2, 0.2, 0.4, 0.6, 0.8]],
  ['500x500x10', [0.1, 0.2, 0.3, 0.5, 0.6]],
  ['600x600x10', [0.1, 0.2, 0.3, 0.4, 0.5]],
  ['750x750x10', [0.1, 0.1, 0.2, 0.3, 0.4]],
  ['100x600x9', [0.3, 0.5, 0.8, 1.3, 1.7]],
  ['150x600x9', [0.2, 0.4, 0.6, 1.0, 1.2]],
  ['150x900x9', [0.2, 0.3, 0.6, 0.9, 1.1]],
  ['150x1200x10', [0.2, 0.4, 0.6, 1.0, 1.2]],
  ['225x450x9', [0.2, 0.3, 0.5, 0.8, 1.0]],
  ['225x900x9', [0.2, 0.2, 0.4, 0.6, 0.8]],
  ['250x900x9', [0.1, 0.2, 0.4, 0.6, 0.7]],
  ['250x1200x10', [0.2, 0.2, 0.4, 0.6, 0.8]],
  ['600x600x5', [0.1, 0.1, 0.1, 0.2, 0.3]],
  ['600x600x3', [null, null, 0.1, 0.1, 0.2]],
  ['1000x500x5', [null, 0.1, 0.1, 0.2, 0.2]],
  ['1000x500x3', [null, null, 0.1, 0.1, 0.1]],
  ['1000x1000x5', [null, null, 0.1, 0.1, 0.2]],
];
const JOINTS = [2, 3, 5, 8, 10];

function checkGroutTable(key: string, table: typeof ULTRACOLOR) {
  const cfg = index[key];
  if (!cfg) {
    warns.push(`${key}: not in the index yet, its printed table was not checked`);
    return;
  }
  if (cfg.model !== 'joint_volume') {
    fails.push(`${key}: has a printed grout table but is modelled as ${cfg.model}`);
    return;
  }
  let hit = 0;
  let total = 0;
  const misses: string[] = [];
  for (const [size, cells] of table) {
    const [L, W, T] = size.split('x').map(Number);
    cells.forEach((printed, n) => {
      if (printed === null) return;
      total += 1;
      const r = compute(cfg, { ...initialInputs(cfg), area: 1, tileL: L, tileW: W, tileT: T, joint: JOINTS[n] });
      const got = Math.round((r?.low ?? 0) * 10) / 10;
      if (Math.abs(got - printed) < 1e-9) hit += 1;
      else misses.push(`${size} at ${JOINTS[n]} mm: sheet ${printed}, calculator ${got}`);
    });
  }
  const pct = (hit / total) * 100;
  console.log(`  ${key}: ${hit} of ${total} printed cells reproduced (${pct.toFixed(1)}%)`);
  for (const m of misses.slice(0, 6)) console.log(`      ${m}`);
  // One or two cells in a manufacturer's own table are typographical. A fifth
  // of them being wrong means the constant or the formula is wrong.
  if (pct < 90) fails.push(`${key}: only ${pct.toFixed(1)}% of its printed cells reproduce`);
}

/**
 * Transcribed from the Mapesil AC sheet. Width and depth in mm, then the
 * printed ml per metre for a butt joint and the printed number of 310 ml
 * cartridges per 10 m.
 */
const MAPESIL: [number, number, number][] = [
  [5, 5, 25],
  [10, 10, 100],
  [15, 10, 150],
  [20, 10, 200],
  [25, 12.5, 312.5],
  [30, 15, 450],
  [35, 17.5, 612.5],
  [40, 20, 800],
  [50, 20, 1000],
];

function checkSealant(key: string) {
  const cfg = index[key];
  if (!cfg) {
    warns.push(`${key}: not in the index yet, its printed joint table was not checked`);
    return;
  }
  if (cfg.model !== 'linear_joint') {
    fails.push(`${key}: has a printed joint table but is modelled as ${cfg.model}`);
    return;
  }
  let hit = 0;
  for (const [w, d, printed] of MAPESIL) {
    const r = compute(cfg, { ...initialInputs(cfg), metres: 1, jointWidth: w, jointDepth: d, profile: 0 });
    if (Math.abs((r?.low ?? 0) - printed) < 0.5) hit += 1;
    else fails.push(`${key}: ${w}x${d} mm joint, sheet ${printed} ml/m, calculator ${r?.low}`);
  }
  console.log(`  ${key}: ${hit} of ${MAPESIL.length} printed joint sections reproduced`);
  // The sheet pairs a depth with every width, so the control must preselect it.
  for (const [w, d] of MAPESIL) {
    const got = depthFor(cfg, w);
    if (got !== d) warns.push(`${key}: at ${w} mm wide the sheet says ${d} mm deep, the control offers ${got}`);
  }
}

console.log(`\n${Object.keys(index).length} products in the calculator index\n`);
console.log('Against the printed tables:');
checkGroutTable('mapei/ultracolor-plus', ULTRACOLOR);
checkSealant('mapei/mapesil-ac');

const counts = new Map<string, number>();
for (const cfg of Object.values(index)) counts.set(cfg.model, (counts.get(cfg.model) ?? 0) + 1);
console.log('\nBy model:');
for (const [m, n] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${m}`);

if (warns.length) {
  console.log(`\n${warns.length} warnings:`);
  for (const w of warns.slice(0, 40)) console.log(`  ${w}`);
}
if (fails.length) {
  console.log(`\n${fails.length} FAILURES:`);
  for (const f of fails.slice(0, 60)) console.log(`  ${f}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
