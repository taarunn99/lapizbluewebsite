/**
 * Write src/data/pack3d.json from the plan, including only products whose
 * poster is actually on disk.
 *
 * The product page uses this index to decide whether to show the 3D render or
 * the flat pack shot, and a missing file would mean a broken image request on
 * a live page, which is exactly the fault the Keraflex pack shot caused on the
 * homepage. So presence on disk is the gate, and a product that has not been
 * rendered and reviewed simply keeps its flat shot.
 *
 * Usage: npx tsx scripts/build-pack-3d-index.ts [--exclude slug,slug]
 */
import fs from 'node:fs';
import path from 'node:path';

const excludeArg = process.argv.indexOf('--exclude');
const excluded = new Set(
  excludeArg === -1 ? [] : (process.argv[excludeArg + 1] ?? '').split(',').map((s) => s.trim()).filter(Boolean),
);

const plan: Record<string, { form: string; poster: string }> = JSON.parse(
  fs.readFileSync('data/discovery/pack-3d-plan.json', 'utf8'),
);

const index: Record<string, { form: string; poster: string }> = {};
const missing: string[] = [];
for (const [slug, entry] of Object.entries(plan)) {
  if (excluded.has(slug)) continue;
  const abs = path.join('public', entry.poster.replace(/^\//, ''));
  if (fs.existsSync(abs)) index[slug] = { form: entry.form, poster: entry.poster };
  else missing.push(slug);
}

fs.writeFileSync('src/data/pack3d.json', `${JSON.stringify(index, null, 2)}\n`);
console.log(`${Object.keys(index).length} products have a poster on disk and will show the 3D render.`);
if (excluded.size) console.log(`excluded by hand: ${[...excluded].join(', ')}`);
if (missing.length) console.log(`no poster yet, keeping the flat pack shot: ${missing.join(', ')}`);
