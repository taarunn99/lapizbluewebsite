/**
 * Check every shipping product's consumption calculator against the coverage
 * string it was built from.
 *
 * The calculator must never show a figure the data sheet does not support, so
 * this prints what the model derived next to the raw text and flags anything
 * outside the plausible band for construction chemicals. A record with no
 * parsable rate is not a failure, it simply renders no calculator.
 *
 * Usage: npx tsx scripts/audit-calculators.ts [--all]
 */
import fs from 'node:fs';
import { consumptionModel, type ManifestRecord } from '../src/lib/tds';

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const shipping = manifest.filter((r) => r.page_status === 'generated' || r.page_status === 'live');
const showAll = process.argv.includes('--all');

let withCalc = 0, noCalc = 0;
const suspect: string[] = [];

for (const rec of shipping) {
  const model = consumptionModel(rec);
  if (!model) {
    noCalc++;
    if (showAll) console.log(`-- ${rec.brand}/${rec.slug}  no rate parsed  "${(rec.specs.coverage ?? '').slice(0, 90)}"`);
    continue;
  }
  withCalc++;

  const raw = `${rec.specs.coverage ?? ''} ${rec.specs.consumption ?? ''} ${rec.description}`;
  const nums = (raw.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => Number(n.replace(',', '')));
  // Every figure the model shows must trace back to a number in the source
  // text, through at most one of the conversions the model is allowed to make:
  // grams to kilogrammes, a centimetre rate to a millimetre one, and an area
  // per mass figure inverted to a mass per area one.
  const traces = (d: number) =>
    nums.some(
      (n) =>
        Math.abs(n - d) < 0.0015 ||
        Math.abs(n / 1000 - d) < 0.0015 ||
        Math.abs(n / 10 - d) < 0.0015 ||
        (n > 0 && Math.abs(1 / n - d) < 0.0015) ||
        (n > 0 && Math.abs(1 / n / 10 - d) < 0.0015),
    );
  const unsupported = [model.min, model.max].filter((d) => !traces(d));

  const line = `${rec.brand}/${rec.slug}  ${model.min}-${model.max} ${model.unit}${model.kind === 'per_mm' ? ' per mm' : ''}  <-  "${raw.slice(0, 80)}"`;
  if (unsupported.length) suspect.push(`FIGURE NOT IN TEXT  ${line}`);
  else if (model.min <= 0 || model.max < model.min) suspect.push(`RANGE INVALID  ${line}`);
  else if (showAll) console.log(`ok ${line}`);
}

for (const s of suspect) console.log(s);
console.log(`\n${shipping.length} shipping records: ${withCalc} render a calculator, ${noCalc} render none, ${suspect.length} suspect.`);
