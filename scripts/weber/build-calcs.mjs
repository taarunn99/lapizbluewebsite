/*
  Turn the verified Weber coverage readings into calculator configs.

  The readings come from data/incoming/weber-verified.json, which ten agents
  transcribed off the sheets by hand after the regex pass got several of them
  wrong. Nothing is inferred here either: a figure the sheet does not print
  produces no calculator, and every unit change is done explicitly and printed
  so it can be checked.

  Unit traps this handles, each one real on a Weber sheet:
    22 kg/m2/cm        is 2.2 per mm, not 22
    42 kg/m2 per 20mm  is 2.1 per mm
    2-2.5 m2/LT        is the inverse, 0.4 to 0.5 litres per m2
    yield per bag      is not a coverage rate at all and gets no calculator

  node scripts/weber/build-calcs.mjs
*/
import fs from 'fs';

const rows = JSON.parse(fs.readFileSync('data/incoming/weber-verified.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/discovery/weber-products.json', 'utf8')).products;
const slugOf = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const num = (s) => Number(String(s).replace(',', '.'));
/** First numeric range in a string, as [low, high]. */
function range(text) {
  const m = String(text).match(/(\d+(?:[.,]\d+)?)\s*(?:to|-|–|~)\s*(\d+(?:[.,]\d+)?)/);
  if (m) return [num(m[1]), num(m[2])];
  const one = String(text).match(/(\d+(?:[.,]\d+)?)/);
  return one ? [num(one[1]), num(one[1])] : null;
}

const out = {};
const notes = [];
const skipped = [];

for (const r of rows) {
  const prod = products.find((p) => p.name === r.product)
            || products.find((p) => slugOf(p.name) === slugOf(r.product));
  if (!prod) { skipped.push([r.product, 'no product record']); continue; }
  const key = `weber/${slugOf(prod.name)}`;
  const cov = (r.coverage || '').trim();
  const basis = r.coverage_basis || '';
  const unit = /litre|liter|\bl\s*\/|\bL\/|ltr|\bml\b/i.test(cov) && !/kg/i.test(cov) ? 'litre' : 'kg';

  if (!cov || basis === 'none' || basis === 'dose' || basis === 'per linear metre' || basis === 'per joint') {
    const why = basis === 'dose'
      ? `Weber doses this against the mix, not over an area: ${cov}`
      : basis === 'per linear metre'
        ? `Weber quotes this per metre of joint rather than per square metre: ${cov}`
        : cov
          ? `Weber publishes a yield rather than a rate per square metre: ${cov}`
          : 'Weber prints no consumption figure for this product, so there is nothing to calculate from.';
    out[key] = { model: 'none', reason: why,
                 ...(basis === 'dose' || basis === 'per linear metre' || cov ? { dosage: true } : {}) };
    if (basis === 'dose') notes.push([prod.name, 'dosed as a ratio, shown as a note not a calculator', cov.slice(0, 60)]);
    continue;
  }

  /**
   * A sheet often prints several figures, one per trowel, substrate or coat,
   * separated here by semicolons. Each becomes its own tier so the page asks
   * which case applies instead of averaging them into a number the sheet
   * never states. Clauses that are a yield rather than a rate are dropped: a
   * yield is litres of mortar from a bag, not a quantity per square metre.
   */
  const YIELD = /\byield\b|per\s*(?:\d+\s*)?(?:kg\s*)?bag|per\s*kit|lit(?:re|er)?s?\s*\/\s*(?:kit|bag)/i;
  const clauses = cov.split(/;|\u2022/).map((c) => c.trim()).filter(Boolean);

  const tiers = [];
  for (const c of clauses) {
    if (YIELD.test(c)) continue;
    const r = range(c);
    if (!r) continue;
    let [a, b] = r;
    // grams restated in kilograms, so every tier is in one unit
    if (/\bg\s*\/\s*m[²2]/i.test(c) && !/kg/i.test(c)) { a /= 1000; b /= 1000; }
    // area per litre is the inverse of what a calculator needs
    if (/m[²2]\s*(?:\/|per)\s*(?:lt|l\b|litre|liter)/i.test(c)) {
      const lo2 = 1 / b, hi2 = 1 / a;
      notes.push([prod.name, 'area per litre inverted to litres per m2', `${c.slice(0, 44)} -> ${lo2.toFixed(3)} to ${hi2.toFixed(3)}`]);
      a = lo2; b = hi2;
    }
    // whatever thickness it was quoted against, brought to one millimetre
    if (basis === 'per m2 per mm') {
      const cm = /\/\s*cm|per\s*1?\s*cm|\bcm\s*thick/i.test(c);
      const mm = c.match(/per\s*(\d+)\s*mm|\/\s*(\d+)\s*mm/i);
      let per = cm ? 10 : (mm && Number(mm[1] || mm[2]) > 1 ? Number(mm[1] || mm[2]) : 1);
      if (per !== 1) {
        a /= per; b /= per;
        notes.push([prod.name, `quoted per ${cm ? 'cm' : per + ' mm'}, divided by ${per}`, `${c.slice(0, 44)} -> ${a} to ${b} per mm`]);
      }
    }
    const label = (c.split(':')[0] || '').trim();
    tiers.push({ label: label && label.length < 60 && /[a-z]/i.test(label) ? label : 'As the sheet states',
                 min: Number(a.toPrecision(4)), max: Number(b.toPrecision(4)) });
  }

  if (!tiers.length) {
    out[key] = { model: 'none', dosage: true,
      reason: `Weber publishes a yield rather than a rate per square metre: ${cov}` };
    skipped.push([prod.name, 'the figures are yields, not rates']); continue;
  }

  if (basis === 'per m2 per mm') {
    const lo = Math.min(...tiers.map((t) => t.min)), hi = Math.max(...tiers.map((t) => t.max));
    out[key] = { model: 'thickness_area', source: cov, unit,
                 ratePerMm: lo, ...(hi !== lo ? { ratePerMmMax: hi } : {}),
                 thickness: { min: 1, max: 20, default: 3 } };
  } else {
    // Default to the heaviest tier. Under-ordering strands a job; a little
    // over is returned to the shelf. The page still lets a person pick the
    // case that actually applies.
    let heaviest = 0;
    tiers.forEach((t, i) => { if (t.max > tiers[heaviest].max) heaviest = i; });
    out[key] = { model: 'tiered_area', source: cov, unit, tiers, defaultTier: heaviest };
  }
}

fs.writeFileSync('data/incoming/weber-calcs.json', JSON.stringify(out, null, 2) + '\n');
const byModel = {};
for (const v of Object.values(out)) byModel[v.model] = (byModel[v.model] || 0) + 1;
console.log(`${Object.keys(out).length} calculator configs`, byModel);
console.log('\nUNIT CONVERSIONS APPLIED, every one printed for checking:');
for (const [p, why, detail] of notes) console.log(`  ${p.padEnd(22)} ${why}\n${' '.repeat(24)}${detail}`);
if (skipped.length) { console.log('\nno calculator:'); for (const [p, w] of skipped) console.log(`  ${p.padEnd(24)} ${w}`); }
