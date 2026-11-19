/**
 * Put the safety sheets where they belong and date them the way the site does.
 *
 * Two things the people writing records could not settle for themselves,
 * because both are site wide conventions rather than facts about a product.
 *
 * First, the safety sheet was being hosted at /tds/<brand>/<slug>.sds.pdf.
 * It works, but a safety sheet served from a folder called tds reads wrongly
 * to anyone who looks at the address, and these pages are not published yet,
 * so the time to move it is now rather than after it is indexed.
 *
 * Second, Mapei prints the revision on a safety sheet half a dozen ways: "6
 * October 2025, version 2", "07/05/2026 version 5", "05-2026". The site
 * prints that date under the document card, and 88 of the 106 technical
 * sheets that carry one write it as month-year. One shape, so a reader moving
 * between two pages is reading the same thing.
 *
 *   node scripts/tidy-incoming-sds.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'data/incoming';

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

/** Month and year, the way the rest of the site writes it. */
function normaliseRevision(raw) {
  if (!raw) return '';
  const s = String(raw).toLowerCase();

  // "6 October 2025", "7 May 2026"
  const named = s.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  if (named) {
    const m = MONTHS.indexOf(named[2]);
    if (m >= 0) return `${m + 1}-${named[3]}`;
  }
  // "October 2025"
  const my = s.match(/\b([a-z]+)\s+(\d{4})\b/);
  if (my) {
    const m = MONTHS.indexOf(my[1]);
    if (m >= 0) return `${m + 1}-${my[2]}`;
  }
  // "07/05/2026" and "29/09/2023", day first as Mapei writes them
  const slash = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slash) return `${Number(slash[2])}-${slash[3]}`;
  // "05-2026", "09-2025"
  const dash = s.match(/\b(\d{1,2})-(\d{4})\b/);
  if (dash) return `${Number(dash[1])}-${dash[2]}`;
  // "2026-05"
  const iso = s.match(/\b(\d{4})[-_](\d{1,2})\b/);
  if (iso) return `${Number(iso[2])}-${iso[1]}`;
  return String(raw);
}

let moved = 0;
let dated = 0;

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
  const full = path.join(DIR, file);
  const rec = JSON.parse(fs.readFileSync(full, 'utf8'));
  if (!rec.sds?.local_path) continue;

  const want = `/sds/${rec.brand}/${rec.slug}.pdf`;
  if (rec.sds.local_path !== want) {
    const from = path.join('public', rec.sds.local_path.replace(/^\//, ''));
    const to = path.join('public', want.replace(/^\//, ''));
    if (fs.existsSync(from)) {
      if (!DRY) {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.renameSync(from, to);
      }
      console.log(`  moved  ${rec.sds.local_path}  ->  ${want}`);
      moved += 1;
    } else if (!fs.existsSync(to)) {
      console.log(`  MISSING ${rec.slug}: no file at ${rec.sds.local_path}`);
      continue;
    }
    rec.sds.local_path = want;
  }

  const was = rec.sds.revision_date;
  const now = normaliseRevision(was);
  if (now !== was) {
    console.log(`  date   ${rec.slug.padEnd(50)} "${was}"  ->  "${now}"`);
    rec.sds.revision_date = now;
    dated += 1;
  }

  if (!DRY) fs.writeFileSync(full, `${JSON.stringify(rec, null, 2)}\n`);
}

console.log(`\n${moved} safety sheets moved to /sds, ${dated} revision dates normalised${DRY ? ' (dry run)' : ''}`);
