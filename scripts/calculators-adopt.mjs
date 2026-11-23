#!/usr/bin/env node
// Moves a patch of calculator entries into the group files that build the
// index, so the figures survive the next `build-calculator-index.ts` run.
//
// A key may only be owned by one group file, so every key in the patch is
// first removed from every other group, then written into its own file.
//
//   node scripts/calculators-adopt.mjs patch-mapei.json new-mapei-tds.json
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'data/calculators';
const [patchName, ownerName] = process.argv.slice(2);
if (!patchName || !ownerName) throw new Error('usage: calculators-adopt.mjs <patch.json> <owner.json>');

const patch = JSON.parse(fs.readFileSync(path.join(DIR, patchName), 'utf8'));
const keys = Object.keys(patch);
const removed = [];

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.json') || file === 'index.json' || file === patchName || file === ownerName) continue;
  if (file.startsWith('patch-')) continue;
  const group = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  let touched = false;
  for (const key of keys) {
    if (key in group) { delete group[key]; removed.push(`${key} out of ${file}`); touched = true; }
  }
  if (touched) fs.writeFileSync(path.join(DIR, file), `${JSON.stringify(group, null, 1)}\n`);
}

fs.writeFileSync(path.join(DIR, ownerName), `${JSON.stringify(patch, null, 1)}\n`);
fs.unlinkSync(path.join(DIR, patchName));
console.log(`${ownerName} now owns ${keys.length} keys; ${removed.length} older copies removed.`);
for (const line of removed.slice(0, 8)) console.log(`  ${line}`);
if (removed.length > 8) console.log(`  and ${removed.length - 8} more`);
