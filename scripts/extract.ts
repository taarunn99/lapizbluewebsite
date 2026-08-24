/*
  Verification gate + spec extraction for downloaded TDS PDFs.

  For each manifest record with tds.status downloaded (or needs_review on
  re-run): extract page 1 text, fuzzy-match the product name (>= 90 verified,
  else needs_review and both names logged to MANUAL-QUEUE.md), then extract
  specs per the category field map and the revision date, writing everything
  back to the manifest. Never guesses: ambiguity always parks in needs_review.

  Usage: npx tsx scripts/extract.ts [--only slug] [--rerun]
*/
import fs from 'fs';
import path from 'path';
import { extractText, getDocumentProxy } from 'unpdf';
import type { ManifestRecord } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';
import { extractSpecs, heroFields, fixLigatures } from './lib/spec-maps';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');
const QUEUE_PATH = path.join(REPO, 'MANUAL-QUEUE.md');

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const only = arg('--only');
const rerun = process.argv.includes('--rerun');

function queueEntry(text: string) {
  const queue = fs.readFileSync(QUEUE_PATH, 'utf8');
  if (queue.includes(text)) return;
  fs.writeFileSync(QUEUE_PATH, queue.replace('## Resolved', `${text}\n\n## Resolved`));
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let verified = 0;
  let review = 0;
  let skipped = 0;

  for (const rec of manifest) {
    if (only && rec.slug !== only) continue;
    const eligible =
      rec.tds.status === 'downloaded' ||
      (rerun && (rec.tds.status === 'needs_review' || rec.tds.status === 'verified'));
    if (!eligible) {
      skipped++;
      continue;
    }
    const pdfPath = path.join(REPO, 'public', rec.tds.local_path.replace(/^\//, ''));
    if (!fs.existsSync(pdfPath)) {
      console.log(`MISSING FILE ${rec.slug}: ${pdfPath}`);
      continue;
    }
    const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(pdfPath)));
    const { text } = await extractText(pdf, { mergePages: false });
    const page1 = fixLigatures(text[0] ?? '');
    const fullText = fixLigatures(text.join('\n'));

    const result = verifyNameInPageText(rec.name, page1);
    rec.tds.verified_name_match_score = result.score;

    if (result.score >= 90 && !result.suffixTrap) {
      rec.tds.status = 'verified';
      verified++;
    } else {
      rec.tds.status = 'needs_review';
      review++;
      queueEntry(
        `- **TDS verify failed: ${rec.slug}.** Product name "${rec.name}" vs best page-1 line "${result.bestLine}" scored ${result.score}${result.suffixTrap ? ' (variant suffix trap)' : ''}. File: ${rec.tds.local_path}, source: ${rec.tds.source_url}`
      );
    }

    rec.tds.revision_date = extractRevisionDate(fullText) || rec.tds.revision_date;
    rec.specs = extractSpecs(rec.category, fullText);
    if (!rec.classification && specs.classification) {
      rec.classification = specs.classification;
    }

    const missingHero = heroFields(rec.category).filter((f) => !rec.specs[f] && !(f === 'classification' && rec.classification));
    rec.notes = rec.notes.replace(/ ?\[hero missing:[^\]]*\]/, '');
    if (missingHero.length > 0) {
      rec.notes = `${rec.notes} [hero missing: ${missingHero.join(', ')}]`.trim();
    }
    rec.updated_at = now;
    console.log(
      `${rec.slug}: score ${result.score}${result.suffixTrap ? ' TRAP' : ''} -> ${rec.tds.status}, specs ${Object.keys(rec.specs).length}, rev "${rec.tds.revision_date}"${missingHero.length ? `, hero missing: ${missingHero.join(',')}` : ''}`
    );
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nVerified: ${verified}, needs_review: ${review}, untouched: ${skipped}`);
}

main();
