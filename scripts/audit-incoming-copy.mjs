/**
 * Read the copy across every incoming record at once.
 *
 * Each record is written by a different person working from a different data
 * sheet, and problems that are invisible one at a time show up immediately
 * when they are read side by side: the same sentence pasted into six
 * products, the marketing adjectives the house style bans, a figure in the
 * description that contradicts the record's own specs.
 *
 *   node scripts/audit-incoming-copy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'data/incoming';
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.json')) : [];
const recs = files.map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) }));

const problems = [];
const advisory = [];
const note = (slug, msg) => problems.push(`${slug}: ${msg}`);

// Words that say nothing. A data sheet never needs them and the house style
// bans them, because a sentence true of every product is not information.
const EMPTY = /\b(high quality|premium|top quality|world class|cutting edge|state of the art|best in class|superior performance|excellent quality|unrivalled|unparalleled)\b/i;

const sentences = new Map();

for (const r of recs) {
  const slug = r.slug ?? r.file;
  const text = `${r.description ?? ''} ${r.meta_description ?? ''}`;

  if (/[–—]/.test(JSON.stringify(r))) note(slug, 'em or en dash somewhere in the record');
  if (EMPTY.test(text)) note(slug, `empty praise: "${text.match(EMPTY)[0]}"`);

  const words = (r.description ?? '').trim().split(/\s+/).length;
  if (words < 100 || words > 150) note(slug, `description is ${words} words`);
  const ml = (r.meta_description ?? '').length;
  if (ml < 140 || ml > 160) note(slug, `meta_description is ${ml} characters`);

  // The product has to be named in its own first sentence.
  const first = (r.description ?? '').split(/(?<=\.)\s/)[0] ?? '';
  const head = (r.name ?? '').split(' ')[0];
  if (head && !first.toLowerCase().includes(head.toLowerCase()))
    note(slug, `the first sentence does not name the product`);

  // Reused sentences across records, which is what template copy looks like.
  for (const s of (r.description ?? '').split(/(?<=\.)\s+/)) {
    const key = s.trim().toLowerCase();
    if (key.length < 40) continue;
    sentences.set(key, [...(sentences.get(key) ?? []), slug]);
  }

  // A figure in the prose that the record's own specs do not carry. Advisory
  // only: good copy often cites a figure from a product it is contrasting
  // against, as when a quartz grade is distinguished from a 2 to 3 mm
  // limestone aggregate, and that figure correctly belongs to neither spec.
  const specText = JSON.stringify(r.specs ?? {});
  for (const s of (r.description ?? '').split(/(?<=\.)\s+/)) {
    // Skip a sentence that names another product, which is where a contrast lives.
    const others = (s.match(/\b(Mape|Kera|Ultra|Plani|Adesilex|Primer|Topcem|Idrostop)[a-z]+/g) ?? [])
      .filter((w) => !(r.name ?? '').includes(w));
    if (others.length) continue;
    for (const m of s.matchAll(/(\d+(?:\.\d+)?)\s*(kg\/m2|kg\/m²|mm|kg)\b/g)) {
      if (!specText.includes(m[1])) advisory.push(`${slug}: description says "${m[0]}" and no spec carries ${m[1]}`);
    }
  }

  if ((r.applications ?? []).some((a) => a.length < 12)) note(slug, 'an application is too short to be useful');
  if (new Set(r.applications ?? []).size !== (r.applications ?? []).length) note(slug, 'duplicate applications');
}

for (const [s, slugs] of sentences) {
  if (slugs.length > 1) note(slugs.join(' and '), `share a sentence: "${s.slice(0, 70)}..."`);
}

console.log(`${recs.length} incoming records read`);
if (!problems.length) {
  console.log('No copy problems found.');
} else {
  console.log(`\n${problems.length} to look at:`);
  for (const p of problems) console.log(`  ${p}`);
}
if (advisory.length) {
  console.log(`\n${advisory.length} advisory, usually a figure cited from another product:`);
  for (const a of advisory) console.log(`  ${a}`);
}
