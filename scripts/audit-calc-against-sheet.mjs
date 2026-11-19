/**
 * Compare every calculator's figures against the numbers printed in its own
 * data sheet.
 *
 * verify-calculators.ts proves the shapes are sound and reproduces two
 * printed tables cell by cell. This asks a blunter question of all of them at
 * once: does each rate the config carries actually appear in the consumption
 * text of the PDF the page hosts? A figure in a config that appears nowhere in
 * the sheet is either a transcription slip or a number from somewhere else,
 * and either way somebody should look at it.
 *
 * It is a net, not a proof. A sheet that prints 800 g/m2 against a config
 * holding 0.8 kg is correct and will be reported, which is why conversions
 * are recognised before anything is flagged.
 *
 *   node scripts/audit-calc-against-sheet.mjs [slug substring]
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const only = process.argv[2];
const index = JSON.parse(fs.readFileSync('data/calculators/index.json', 'utf8'));
const man = JSON.parse(fs.readFileSync('data/manifest.json', 'utf8'));
const byKey = Object.fromEntries(man.map((r) => [`${r.brand}/${r.slug}`, r]));

const text = (pdf) => {
  try {
    return execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return '';
  }
};

/** Every way a sheet might print the same quantity. */
function printed(sheet, n) {
  const forms = new Set();
  const add = (v) => {
    const s = String(parseFloat(v.toPrecision(6)));
    forms.add(s);
    forms.add(s.replace('.', ','));
  };
  add(n);
  add(n * 1000);   // kg quoted as grammes
  add(n / 1000);
  add(n * 10);     // per mm quoted per cm
  add(n / 10);
  add(1 / n);      // a rate quoted as an area per unit
  add(n * 2);      // a per coat rate halved out of a printed two coat total
  add(n / 2);
  return [...forms].some((f) => f.length > 1 && sheet.includes(f));
}

const rows = [];
let checked = 0;

for (const [key, cfg] of Object.entries(index)) {
  if (only && !key.includes(only)) continue;
  const rec = byKey[key];
  const pdf = rec?.tds?.local_path ? `public${rec.tds.local_path}` : null;
  if (!pdf || !fs.existsSync(pdf)) continue;

  const nums = [];
  if (cfg.model === 'tiered_area') for (const t of cfg.tiers) nums.push(t.min, t.max);
  else if (cfg.model === 'thickness_area') nums.push(cfg.ratePerMm, cfg.ratePerMmMax);
  else if (cfg.model === 'gap_volume') nums.push(cfg.densityKgPerLitre);
  else continue;

  const want = [...new Set(nums.filter((n) => typeof n === 'number' && n > 0))];
  if (!want.length) continue;
  const sheet = text(pdf);
  if (!sheet.trim()) continue;
  checked += 1;

  const missing = want.filter((n) => !printed(sheet, n));
  // One derived figure among several printed ones is ordinary: sheets quote a
  // yield per bag, an area per litre, a two coat total. A config where not one
  // figure appears in its own sheet is a different thing, and that is what
  // this reports.
  if (missing.length === want.length) {
    const why = (cfg.caveat ?? cfg.source ?? '').replace(/\s+/g, ' ');
    rows.push({ key, model: cfg.model, missing, of: want.length, why });
  }
}

console.log(`\n${checked} calculators compared against the text of their own sheet`);
console.log(`${rows.length} where not one figure appears in the sheet in any form\n`);
console.log('Each should be a stated derivation. Read the reason and judge it.\n');
let unexplained = 0;
for (const r of rows.sort((a, b) => a.key.localeCompare(b.key))) {
  const derived =
    /divid|invert|yield|per bag|per litre|per dm3|halv|two coat|per cm|per coat|conver|g\/m2|grammes|per \d+\s?kg|m2 per|per m2|pack|density/i.test(r.why);
  if (!derived) unexplained += 1;
  console.log(`  ${derived ? ' ' : '!'} ${r.key.padEnd(42)} ${r.missing.join(', ')}`);
  console.log(`      ${r.why.slice(0, 150) || 'NO REASON GIVEN'}`);
}
console.log(`\n${rows.length - unexplained} explain the derivation in their own source or caveat.`);
if (unexplained) console.log(`${unexplained} marked ! do not, and need a person.`);
