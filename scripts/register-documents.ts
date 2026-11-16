/**
 * Register manufacturer documents against manifest records.
 *
 * Takes a folder of PDFs, works out which product each one belongs to,
 * verifies that the product name really appears in the document, hosts it
 * under public/, and records its hash and size so the download button can
 * state a size and the gates can prove the hosted file is the one we checked.
 *
 * The name check is the point of this script. A data sheet filed against the
 * wrong product is worse than no data sheet, because a contractor will mix to
 * it. A file whose name does not verify is left alone and reported, never
 * quietly attached.
 *
 * Technical sheets move a record from documents_pending to verified. Safety
 * sheets fill the optional sds block and never change the record's state.
 *
 * Usage:
 *   npx tsx scripts/register-documents.ts --brand vetonit --from ~/Downloads
 *   npx tsx scripts/register-documents.ts --brand vetonit --from ~/Downloads --dry
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getDocumentProxy, extractText } from 'unpdf';
import type { ManifestRecord } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');

const arg = (f: string) => {
  const i = process.argv.indexOf(f);
  return i === -1 ? undefined : process.argv[i + 1];
};
const brand = arg('--brand') ?? 'vetonit';
const from = (arg('--from') ?? path.join(process.env.HOME ?? '', 'Downloads')).replace(/^~/, process.env.HOME ?? '');
const dry = process.argv.includes('--dry');

const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const records = manifest.filter((r) => r.brand === brand);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Work out which product a filename refers to. Saveto names its files
 * "TDS - Vetoproof TOP - Waterproofing - EN AE.pdf", so the product name is
 * usually the second segment, but the whole filename is searched as a
 * fallback. Longest product name wins, so "Vetogrout CG519" is never matched
 * as "Vetogrout CG51".
 */
function matchRecord(filename: string): ManifestRecord | undefined {
  const stem = norm(filename.replace(/\.pdf$/i, ''));
  const candidates = records
    .filter((r) => stem.includes(norm(r.name)))
    .sort((a, b) => norm(b.name).length - norm(a.name).length);
  return candidates[0];
}

/** Technical sheet unless the filename says safety. */
function kindOf(filename: string): 'tds' | 'sds' {
  return /\b(sds|msds|safety)\b/i.test(filename) ? 'sds' : 'tds';
}

/**
 * Pull the consumption figure out of the sheet.
 *
 * These sheets print a small table, "Product | Pack Size | Consumption", and
 * the row runs the three cells together once the PDF is flattened to text:
 *
 *   Vetonit Finish WR EG 25 kG Bag 40 Kg Bag ~ 1.5 Kg/m2/1 mm
 *
 * A loose pattern reads "40 Kg" out of that and calls it a rate, which is a
 * pack size, and 40 kg per square metre of skim coat is the kind of number
 * that gets a lorry load of material ordered for one wall. So this only
 * accepts a figure that is immediately followed by a real rate unit: mass or
 * volume over area, or area over mass. Anything else returns nothing and the
 * page simply shows no consumption.
 */
function coverageFrom(text: string, productName: string): string | undefined {
  const t = text.replace(/\s+/g, ' ');

  // Scope to this product's own row of the consumption table. These sheets
  // sometimes list a companion product in the same table, and an unscoped
  // search happily reads the primer's coverage and files it against the
  // grout. The window runs from this product's name inside the table to the
  // next heading, which is where the row ends.
  const tableAt = t.search(/Pack Size/i);
  let window = t;
  if (tableAt !== -1) {
    const after = t.slice(tableAt);
    const nameAt = after.search(new RegExp(productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    if (nameAt !== -1) {
      const rest = after.slice(nameAt + productName.length);
      // The row ends at whichever comes first: the next section heading, the
      // next product code in the same table, or a short cap. Some sheets
      // tabulate a whole system, so the row after this one belongs to the
      // primer or the companion product and must not be read as ours.
      const stops = [
        rest.search(/Usage Instructions|Surface Preparation|Product Description|Advantages|Uses\b/i),
        rest.search(/\b(?:Veto|Plastermix|Premix|Putty|Quick Floor|Porcelain|Tile Fix|Premium Fix|Spatter)\w*\s*[A-Z0-9]/),
        90,
      ].filter((n) => n > 0);
      window = rest.slice(0, Math.min(...stops));
    } else {
      return undefined;
    }
  }

  // Mass or volume per unit area, optionally per millimetre of thickness.
  // "~ 1.5 Kg/m2/1 mm", "1.7 kg/m2", "0.3 L/m2 per coat".
  const perArea = window.match(
    /(\d+(?:\.\d+)?(?:\s*(?:-|to)\s*\d+(?:\.\d+)?)?)\s*(kg|g|l|ltr|litres?|liters?)\s*\/\s*m\s*2?(\s*\/\s*\d*\s*mm)?[^.]{0,40}/i,
  );
  if (perArea) return perArea[0].trim().slice(0, 150);

  // Area per unit mass, which is the inverse. "2.3 m2/kg/coat @300 microns".
  const perMass = window.match(/(\d+(?:\.\d+)?)\s*m\s*2?\s*\/\s*(kg|l|ltr|litres?)[^.]{0,60}/i);
  if (perMass) return perMass[0].trim().slice(0, 150);

  return undefined;
}

function specsFromPdf(text: string, productName: string): Record<string, string> {
  const t = text.replace(/\s+/g, ' ');
  const out: Record<string, string> = {};

  const cov = coverageFrom(t, productName);
  if (cov) out.coverage = cov;

  const water = t.match(/add\s+(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?)\s*(?:litres?|liters?|l)\s*of water[^.]{0,40}/i);
  if (water) out.mixing_ratio = water[0].replace(/^add\s+/i, '').trim().slice(0, 140);

  const thick = t.match(/(\d+(?:\.\d+)?\s*(?:-|to)\s*\d+(?:\.\d+)?)\s*mm\s*(?:thick|in thickness|thickness)/i);
  if (thick) out.thickness = `${thick[1].replace(/\s+/g, ' ')} mm`;

  const comp = t.match(/compressive strength[^.]{0,80}?(\d+(?:\.\d+)?\s*(?:N\/mm2|MPa)[^.]{0,30})/i);
  if (comp) out.compressive_strength = comp[1].trim().slice(0, 100);

  const pot = t.match(/pot life[^.]{0,40}?(\d+(?:\.\d+)?\s*(?:-|to)?\s*\d*\s*(?:minutes?|mins?|hours?))/i);
  if (pot) out.pot_life = pot[1].trim();

  const shelf = t.match(/shelf life[^.]{0,60}?(\d+\s*months?)/i);
  if (shelf) out.storage_shelf_life = shelf[1].trim();

  return out;
}

async function main() {
  if (!fs.existsSync(from)) {
    console.error(`Source folder not found: ${from}`);
    process.exit(1);
  }
  const files = fs.readdirSync(from).filter((f) => /\.pdf$/i.test(f));
  console.log(`${files.length} PDFs in ${from}, ${records.length} ${brand} records\n`);

  const now = new Date().toISOString().slice(0, 10);
  let attached = 0;
  const skipped: string[] = [];

  for (const file of files.sort()) {
    const rec = matchRecord(file);
    if (!rec) {
      skipped.push(`${file}  no matching ${brand} product`);
      continue;
    }

    const abs = path.join(from, file);
    const buf = fs.readFileSync(abs);
    if (buf.subarray(0, 4).toString() !== '%PDF') {
      skipped.push(`${file}  not a PDF`);
      continue;
    }

    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const { text: pages } = await extractText(pdf, { mergePages: false });
    const page1 = Array.isArray(pages) ? pages[0] : String(pages);
    const full = Array.isArray(pages) ? pages.join('\n') : String(pages);

    const kind = kindOf(file);
    const check = verifyNameInPageText(rec.name, page1);
    if (kind === 'tds' && (check.score < 90 || check.suffixTrap)) {
      skipped.push(
        `${file}  name check failed for "${rec.name}" (score ${check.score}${check.suffixTrap ? ', suffix trap' : ''})`,
      );
      continue;
    }

    const dir = path.join(REPO, 'public', kind, brand);
    const webPath = `/${kind}/${brand}/${rec.slug}.pdf`;
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    const revision = extractRevisionDate(full);

    if (!dry) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${rec.slug}.pdf`), buf);

      if (kind === 'tds') {
        rec.tds = {
          status: 'verified',
          source_url: rec.tds.source_url,
          local_path: webPath,
          sha256: sha,
          size_bytes: buf.length,
          revision_date: revision,
          verified_name_match_score: check.score,
        };
        // Sheet derived specs win over ones inferred from catalogue prose.
        // A figure read from the sheet replaces one inferred from catalogue
        // prose, and an absent one clears the inferred value rather than
        // leaving a guess standing next to a verified document.
        const fromSheet = specsFromPdf(full, rec.name);
        if (!fromSheet.coverage) delete rec.specs.coverage;
        rec.specs = { ...rec.specs, ...fromSheet };
        if (!rec.applications.length) rec.applications = [];
      } else {
        rec.sds = {
          status: 'verified',
          source_url: '',
          local_path: webPath,
          sha256: sha,
          size_bytes: buf.length,
          revision_date: revision,
        };
      }
      rec.updated_at = now;
    }

    attached++;
    console.log(
      `  ${kind.toUpperCase()}  ${rec.name.padEnd(28)} score ${String(check.score).padStart(3)}  ` +
        `${(buf.length / 1024 / 1024).toFixed(1)} MB  ${revision ? `rev ${revision}` : ''}`,
    );
  }

  if (!dry) fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`\n${attached} documents attached${dry ? ' (dry run, nothing written)' : ''}.`);
  if (skipped.length) {
    console.log(`\n${skipped.length} skipped:`);
    for (const s of skipped) console.log(`  ${s}`);
  }

  const verified = records.filter((r) => r.tds.status === 'verified').length;
  console.log(`\n${brand}: ${verified}/${records.length} products now hold a technical data sheet.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
