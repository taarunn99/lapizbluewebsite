/*
  Check that each downloaded Profilpas sheet really belongs to the product it
  was fetched for.

  Mapei's document server has been seen handing back a neighbouring product's
  sheet, and a wrong sheet on a product page is worse than no sheet at all, so
  nothing is published until it passes here.

  The test is the distinctive model token, not the whole name: a sheet titled
  "Cerfix Prostep SIS" is the right sheet for "CERFIX PROSTEP SIS", and a sheet
  titled "Skirting boards PVC Line 8608 8612 8613" is the right sheet for
  "PVC LINE 8608", because Profilpas groups variants onto one sheet on purpose.

  Usage: node scripts/profilpas/verify-sheets.mjs
*/
import fs from 'fs';
import { execFileSync } from 'child_process';

/** Words that appear on every sheet and so prove nothing. */
const COMMON = new Set([
  'cerfix', 'profilpas', 'profile', 'profiles', 'line', 'pp', 'level',
  'prolight', 'unisystem', 'plus', 'fix', 'thin', 'and', 'for', 'the',
]);

/** The parts of a name that actually identify the model. */
function marks(name) {
  const cleaned = name.toUpperCase().replace(/[–—]/g, '-');
  const parts = cleaned.split(/[\s/]+/).filter(Boolean);
  const out = [];
  for (const p of parts) {
    const low = p.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!low || COMMON.has(low)) continue;
    // a grouped name like SGI SGA SGN SGK or 150-151-152-154: any one is proof
    for (const piece of low.split('-')) if (piece.length >= 2) out.push(piece);
  }
  return [...new Set(out)];
}

const files = fs.readdirSync('data/incoming/profilpas').filter((f) => /^out-\d\d\.json$/.test(f)).sort();
let ok = 0, weak = 0, wrong = 0, none = 0;
const problems = [];

for (const f of files) {
  const p = `data/incoming/profilpas/${f}`;
  const recs = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const r of recs) {
    if (!r.tdsFile || !fs.existsSync(r.tdsFile)) {
      r.verified = 'no sheet';
      none++;
      continue;
    }
    let txt = '';
    try {
      txt = execFileSync('pdftotext', ['-layout', '-f', '1', '-l', '2', r.tdsFile, '-'], {
        encoding: 'utf8', timeout: 40000, maxBuffer: 20 * 1024 * 1024,
      });
    } catch {
      r.verified = 'unreadable';
      problems.push({ name: r.name, verdict: 'unreadable', saw: '' });
      wrong++;
      continue;
    }
    const hay = txt.toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ');
    const m = marks(r.name);
    const hit = m.filter((t) => hay.includes(t));
    // The sheet's own heading, for the report.
    const saw = (txt.split('\n').map((l) => l.trim()).filter((l) => l && !/profilpas s\.p\.a|via einstein|italy|tel\.|fax\.|email:/i.test(l))[0] ?? '').slice(0, 70);
    if (m.length === 0) { r.verified = 'ok'; ok++; continue; }
    const ratio = hit.length / m.length;
    if (ratio >= 0.5) { r.verified = 'ok'; ok++; }
    else if (hit.length > 0) { r.verified = 'weak'; r.verifyNote = `only ${hit.join(', ')} of ${m.join(', ')} found; sheet reads "${saw}"`; weak++; problems.push({ name: r.name, verdict: 'weak', saw }); }
    else { r.verified = 'wrong-product'; r.verifyNote = `none of ${m.join(', ')} appear; sheet reads "${saw}"`; wrong++; problems.push({ name: r.name, verdict: 'wrong-product', saw }); }
  }
  fs.writeFileSync(p, JSON.stringify(recs, null, 2) + '\n');
}

console.log(`ok ${ok}   weak ${weak}   wrong ${wrong}   no sheet ${none}`);
if (problems.length) {
  console.log('\nneeds a human eye:');
  for (const p of problems) console.log(`  ${p.verdict.padEnd(14)} ${p.name.padEnd(36)} sheet reads: ${p.saw}`);
}
