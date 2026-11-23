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
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(ml|l\b|litre|liter)[^.]{0,80}?(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*(m[²2]|m\b(?=\s*(?:of|per))|sq\s*\.?\s*ft|sft)/g)) {
    const ml = m[2] === 'ml';
    const vol = ml ? Number(m[1]) / 1000 : Number(m[1]);
    const feet = /ft/.test(m[5]);
    for (const raw of [m[3], m[4]].filter(Boolean).map(Number)) {
      const area = feet ? raw * 0.092903 : raw;
      push(vol / area);
      // The same rate as a calculator working in millilitres would hold it.
      push((vol / area) * 1000);
    }
  }
  // The same sentence the other way round, and sheets often put words between
  // the area and the quantity: "40 m2 of surface with 1 litre", "1.5 to 1.9 m2
  // per 4 kg pack". Without the middle clause and the kg case these read as a
  // rate of 40 or 1.9 and the audit reports a difference that is not there.
  // The same sentence the other way round, and sheets put words in between:
  // "40 m2 of surface with 1 litre", "1.5 to 1.9 m2 per 4 kg pack", "55 to 60
  // Sft per 20 kg pack". A dropped superscript is common in these sheets, so
  // a bare "m" counts when the words after it say surface or an area unit.
  const AREA = String.raw`m[²2]|m\b(?=\s*(?:of|per|using|with))|sq\s*\.?\s*ft|sft|sq\s*feet`;
  for (const m of s.matchAll(new RegExp(String.raw`(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*(${AREA})(?:[^.\d]{0,28}?)(?:per|with|using|\/)\s*(?:one\s*)?(\d+(?:\.\d+)?)?\s*(ml|l\b|litre|kg)`, 'g'))) {
    const feet = /ft|feet/.test(m[3]);
    const unit = m[5];
    const qty = unit === 'ml' ? Number(m[4] ?? 1) / 1000 : Number(m[4] ?? 1);
    for (const raw of [m[1], m[2]].filter(Boolean).map(Number)) {
      const area = feet ? raw * 0.092903 : raw;
      push(qty / area);
      // The same rate as the calculator would hold it when it works in millilitres.
      if (unit === 'ml' || unit === 'l' || unit === 'litre') push((qty / area) * 1000);
    }
  }

  const plain = [...s.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const perCm = /per\s*1?\s*cm|\/\s*cm|per\s*10\s*mm/.test(s);
  // "42 kg/m2 per 20mm" is 2.1 per mm; without this the audit reports a
  // difference that is only a change of reference thickness.
  const perN = s.match(/per\s*(\d+)\s*mm/);
  // A yield as litres of mortar per bag is the same figure upside down: the
  // calculator holds kilogrammes of powder per litre, which is the bag over
  // the yield. "12.7 liters per 25 kg", "13.0 litres / 25 kg", "a 25 kg bag
  // yields approximately 16 to 17 litres" are all this.
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*(?:lit(?:re|er)s?|l)\s*(?:per|\/)\s*(\d+(?:\.\d+)?)\s*kg/g)) {
    const bag = Number(m[3]);
    for (const litres of [m[1], m[2]].filter(Boolean).map(Number)) if (litres > 0) push(bag / litres);
  }
  // The same yield written the other way round, "30LT/59.2kg kit", and the
  // mixed volume form, "78 kg kit plus 6 litres of water give a volume of
  // 34.5 litres", where the water is not part of the powder weight.
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:lt|lit(?:re|er)s?)\s*\/\s*(\d+(?:\.\d+)?)\s*kg/g)) {
    const litres = Number(m[1]);
    if (litres > 0) push(Number(m[2]) / litres);
  }
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*kg[\s\S]{0,60}?volume\s*of[^\d]{0,24}(\d+(?:\.\d+)?)\s*lit/g)) {
    const litres = Number(m[2]);
    if (litres > 0) push(Number(m[1]) / litres);
  }
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*kg\s*(?:bag|sack)[^.]{0,40}?yields?[^.\d]{0,20}(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(\d+(?:\.\d+)?)?\s*lit/g)) {
    const bag = Number(m[1]);
    for (const litres of [m[2], m[3]].filter(Boolean).map(Number)) if (litres > 0) push(bag / litres);
  }
  // A rate quoted against a thickness in centimetres, "23 kg/m2 at 1 cm".
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:to|-|–)?\s*(?:\d+(?:\.\d+)?)?\s*kg[^.]{0,24}?(?:at|every|per|over)\s*(?:a\s*thickness\s*of\s*)?(\d+(?:\.\d+)?)\s*(mm|cm)/g)) {
    const mm = m[3] === 'cm' ? Number(m[2]) * 10 : Number(m[2]);
    if (mm > 0) push(Number(m[1]) / mm);
  }
  // A total quoted for a number of coats, "0.7 kg/m2 total (2 coats)", "1.5
  // kg/m2 in two coats": the calculator holds the rate for one coat.
  const COATS = { one: 1, two: 2, three: 3, four: 4 };
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(?:kg|lit(?:re|er)s?|l)\s*\/?\s*m[²2][^.]{0,30}?\/?\(?(?:in|total|over|per)?\s*\(?(\d+|one|two|three|four)\s*(?:coats?|layers?)/g)) {
    const n = Number(m[2]) || COATS[m[2]] || 0;
    if (n > 0) push(Number(m[1]) / n);
  }
  // "1.3 kg/m2 per mm of thickness" with "minimum thickness per coat approx.
  // 0.5 mm" elsewhere in the same line is a rate for one coat of 0.65. The
  // two figures only mean something multiplied together.
  const perMm = s.match(/(\d+(?:\.\d+)?)\s*kg\s*\/?\s*m[²2]\s*(?:per|\/)\s*mm/);
  if (perMm) {
    for (const t of s.matchAll(/(\d+(?:\.\d+)?)\s*mm/g)) {
      const mm = Number(t[1]);
      if (mm > 0 && mm <= 20) push(Number(perMm[1]) * mm);
    }
  }
  // "2.2 kg/m2 every 2.0 mm" and "2 kg/m2 corresponds to approx. 1.2 mm dry"
  // are a rate against a thickness, so the per millimetre figure is the
  // division of the two. Without this the audit reads only the printed pair.
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*kg\s*\/?\s*m[²2][^.]{0,40}?(?:every|corresponds to|approx\.?|=)\s*(?:approx\.?\s*)?(\d+(?:\.\d+)?)\s*mm/g)) {
    const [rate, mm] = [Number(m[1]), Number(m[2])];
    if (mm > 0) push(rate / mm);
  }
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

  // A sheet often prints the same quantity in two places, once in the summary
  // table and once in the method, and the calculator may quote the other one.
  // Its `source` is a line from the same sheet, so a figure that reconciles
  // against it is not a disagreement; only a figure in neither is.
  const inSource = nums(cfg.source ?? '');
  const tiersText = (cfg.tiers ?? []).map((t) => `${t.label} ${t.hint ?? ''}`).join(' ');
  const inTiers = nums(tiersText);
  if ([...inSource, ...inTiers].some((v) => rates.some((r) => near(v, r)))) continue;

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
  console.log(`\n${problems.length} carry a rate that appears neither in the spec table nor in the line the calculator quotes from the sheet:\n`);
  for (const p of problems) {
    console.log(`  ${p.page.padEnd(42)} spec says "${p.spec}"   calculator uses ${p.calc}`);
  }
}
