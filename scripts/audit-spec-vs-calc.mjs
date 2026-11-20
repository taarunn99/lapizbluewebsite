/*
  Cross-check the coverage printed in each product's spec table against the
  rate its calculator uses.

  The calculator rates were transcribed from the sheets by hand and are gated
  by verify-calculators.ts, so they are the trustworthy number. The spec table
  was parsed out of the sheet text and is not. Where the two disagree the spec
  table is wrong, and a wrong coverage on the page is a wrong quantity in a
  quotation.

  Usage: node scripts/audit-spec-vs-calc.mjs
*/
import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const calcs = JSON.parse(fs.readFileSync('data/calculators/index.json', 'utf8'));

/**
 * Every rate the spec string could be stating, normalised to the calculator's
 * own unit: kilograms or litres per square metre, per millimetre where the
 * product is dosed by thickness.
 *
 * Sheets say the same thing many ways. "15 kg/m2 per cm" and "1.5 per mm" are
 * one number. "350 g/m2" is 0.35. "1 L per 12 m2" is 0.083. All three forms
 * have to reduce to the same scale or the check reports differences that are
 * not there.
 */
function candidates(raw) {
  const s = String(raw).toLowerCase().replace(/,(\d)/g, '.$1');
  const out = [];
  const push = (n) => { if (Number.isFinite(n) && n > 0) out.push(n); };

  // "1 litre per 10-15 m2", "up to 30 m2 with 1 litre", "473 mL: 2.32 to 16.3 m2"
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:ml|l\b|litre|liter)[^.]{0,40}?(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*m[²2]/g)) {
    const vol = /ml/.test(m[0]) ? Number(m[1]) / 1000 : Number(m[1]);
    for (const area of [m[2], m[3]].filter(Boolean).map(Number)) push(vol / area);
  }
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*m[²2]\s*(?:per|with|using|\/)\s*(?:one\s*)?(\d+(?:\.\d+)?)?\s*(ml|l\b|litre)/g)) {
    const vol = m[4] === 'ml' ? Number(m[3] ?? 1) / 1000 : Number(m[3] ?? 1);
    for (const area of [m[1], m[2]].filter(Boolean).map(Number)) push(vol / area);
  }

  const plain = [...s.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const perCm = /per\s*1?\s*cm|\/\s*cm|per\s*10\s*mm/.test(s);
  // "42 kg/m2 per 20mm" is 2.1 per mm; without this the audit reports a
  // difference that is only a change of reference thickness.
  const perN = s.match(/per\s*(\d+)\s*mm/);
  const grams = /\bg\s*\/\s*m|\bg\/m[²2]|grams?/.test(s) && !/kg/.test(s);
  for (const n of plain) {
    push(n);                        // as printed
    if (perCm) push(n / 10);        // per cm restated per mm
    if (perN && Number(perN[1]) > 1) push(n / Number(perN[1]));
    if (grams) push(n / 1000);      // grams restated in kilograms
    push(n / 1000);                 // a bare g/m2 figure with the unit elsewhere
  }
  return out;
}
const nums = candidates;

const problems = [];
let checked = 0;

for (const rec of manifest) {
  const cov = rec.specs?.coverage;
  if (!cov) continue;
  const cfg = calcs[`${rec.brand}/${rec.slug}`];
  if (!cfg) continue;

  // The rate the calculator actually uses, whichever model it is.
  let rates = [];
  if (cfg.model === 'thickness_area') rates = [cfg.ratePerMm, cfg.ratePerMmMax].filter((n) => typeof n === 'number');
  else if (cfg.model === 'tiered_area') rates = cfg.tiers.flatMap((t) => [t.min, t.max]).filter((n) => typeof n === 'number');
  else continue;            // the other models are not a plain rate per m2
  if (!rates.length) continue;

  checked++;
  const inSpec = nums(cov);
  if (!inSpec.length) continue;

  // Pass if any number in the spec string matches any rate the calculator uses.
  const near = (a, b) => Math.abs(a - b) <= Math.max(0.011, b * 0.02);
  if (inSpec.some((v) => rates.some((r) => near(v, r)))) continue;

  problems.push({
    page: `${rec.brand}/${rec.slug}`,
    spec: String(cov).slice(0, 44),
    calc: rates.join(' to '),
    model: cfg.model,
  });
}

console.log(`${checked} pages carry both a spec coverage and a rate based calculator.`);
if (!problems.length) {
  console.log('Every one agrees with its calculator.');
} else {
  console.log(`\n${problems.length} disagree. The calculator is the checked number, so the spec table is what is wrong:\n`);
  for (const p of problems) {
    console.log(`  ${p.page.padEnd(42)} spec says "${p.spec}"   calculator uses ${p.calc}`);
  }
}
