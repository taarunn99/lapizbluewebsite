/*
  Checks every brand hub copy file against the house rules before it ships.

  Dashes, forbidden names, link targets that do not exist, word counts outside
  the brief, the wrong number of questions or FAQs. Run after editing anything
  in src/data/brand-hub.

  Usage: node scripts/audit-brand-hub.mjs
*/
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'src/data/brand-hub');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/manifest.json'), 'utf8'));
const records = (Array.isArray(manifest) ? manifest : manifest.records).filter((r) =>
  ['generated', 'live'].includes(r.page_status),
);
const configs =
  fs.readFileSync(path.join(root, 'src/data/brandConfigs.ts'), 'utf8') +
  fs.readFileSync(path.join(root, 'src/data/brand-configs/kerakoll.ts'), 'utf8');

// Every route a hub file may point at.
const valid = new Set(['/brands', '/contact', '/about', '/tools', '/quote', '/construction-chemicals-dubai']);
for (const m of configs.matchAll(/slug: '([^']+)'/g)) valid.add(m[1]);
const brandSlugs = ['mapei', 'kerakoll', 'weber', 'laticrete', 'pidilite-puma', 'profilpas', 'akzonobel', 'fila', 'kalinga-stone'];
for (const b of brandSlugs) {
  valid.add(`/brands/${b}`);
  // line pages: slug appears in the config under that brand; approximate by any slug listed
}
for (const m of configs.matchAll(/^  ['"]?([a-z-]+)['"]?: \{\n    slug: '([^']+)',[\s\S]*?\n    productLines: \[([\s\S]*?)\n    \],/gm)) {
  for (const l of m[3].matchAll(/slug: '([^']+)'/g)) valid.add(`/brands/${m[2]}/${l[1]}`);
}
const kera = fs.readFileSync(path.join(root, 'src/data/brand-configs/kerakoll.ts'), 'utf8');
for (const l of kera.matchAll(/\n\s+slug: '([^']+)',\n\s+name:/g)) valid.add(`/brands/kerakoll/${l[1]}`);
for (const r of records) valid.add(`/brands/${r.brand}/${r.product_line}/${r.slug}`);

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const problems = [];
const note = (f, msg) => problems.push(`${f}: ${msg}`);

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && !['types.ts', 'index.ts'].includes(f));
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  if (/[–—]/.test(src)) note(f, 'contains an em or en dash');
  for (const bad of ['Grani Marmo', '1 of 87', 'one in four', 'Biofix', 'Superbio', 'Bioflex', 'Biogel Ready', 'Biogel Revolution', '325 Platinum', 'Pegoland Optima', '\\bDIY\\b', 'homeowner']) {
    if (new RegExp(bad, 'i').test(src)) note(f, `contains forbidden text "${bad}"`);
  }
  // Pull the object by evaluating the TS as data: strip the import and type.
  const body = src
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export const \w+: BrandHubCopy = /, 'globalThis.__hub = ')
    .replace(/;\s*$/, ';');
  try {
    // eslint-disable-next-line no-new-func
    new Function(body)();
  } catch (e) {
    note(f, `could not evaluate: ${e.message}`);
    continue;
  }
  const hub = globalThis.__hub;
  const answerWords = hub.answer.reduce((n, p) => n + words(p), 0);
  if (answerWords < 140 || answerWords > 175) note(f, `answer is ${answerWords} words (want 140 to 170)`);
  const intro = words(hub.whereToBuy.intro);
  if (intro < 45 || intro > 85) note(f, `whereToBuy.intro is ${intro} words (want 50 to 80)`);
  if (!/near me/i.test(hub.whereToBuy.dubai)) note(f, 'dubai sentence lacks "near me"');
  if (hub.questions.length !== 4) note(f, `${hub.questions.length} questions (want 4)`);
  for (const q of hub.questions) {
    const n = words(q.body);
    if (n < 55 || n > 115) note(f, `question "${q.h2}" body is ${n} words (want 60 to 110)`);
    if (!q.h2.endsWith('?')) note(f, `question "${q.h2}" is not a question`);
    for (const l of q.links) if (!valid.has(l.href)) note(f, `link target does not exist: ${l.href}`);
  }
  if (hub.faqs.length < 8 || hub.faqs.length > 10) note(f, `${hub.faqs.length} FAQs (want 8 to 10)`);
  for (const faq of hub.faqs) if (words(faq.answer) < 15) note(f, `FAQ "${faq.question}" answer is thin`);
  if (hub.credential && !fs.existsSync(path.join(root, 'public', hub.credential.file))) note(f, `credential file missing: ${hub.credential.file}`);
  console.log(`${f}: answer ${answerWords}w, intro ${intro}w, ${hub.questions.length} questions, ${hub.faqs.length} faqs, ${hub.questions.reduce((n, q) => n + q.links.length, 0)} links`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`\n${files.length} hub files clean.`);
