import fs from 'fs'; import os from 'os'; import path from 'path';
import { readSheet } from './extract.mjs';
const match = JSON.parse(fs.readFileSync('/tmp/weber_match.json','utf8'));
const DL = path.join(os.homedir(), 'Downloads');
const out = [];
for (const [product, file] of Object.entries(match)) {
  const full = path.join(DL, file);
  try { out.push({ product, file, ...readSheet(full) }); }
  catch (e) { out.push({ product, file, error: String(e.message || e) }); }
}
fs.mkdirSync('data/incoming', { recursive: true });
fs.writeFileSync('data/incoming/weber-sheets.json', JSON.stringify(out, null, 2) + '\n');
const has = (k) => out.filter((r) => r[k]).length;
console.log(`${out.length} sheets read`);
console.log(`  category   ${has('category')}`);
console.log(`  description ${has('description')}`);
console.log(`  coverage   ${has('coverage')}`);
console.log(`  pack       ${has('pack')}`);
console.log(`  class      ${has('classification')}`);
console.log(`  specs>=4   ${out.filter((r) => Object.keys(r.specs||{}).length >= 4).length}`);
console.log(`  errors     ${out.filter((r) => r.error).length}`);
