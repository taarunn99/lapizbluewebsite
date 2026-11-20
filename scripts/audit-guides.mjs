/*
  Checks every blog post in the Guides category against the brief before it
  ships: frontmatter complete, 1,400 to 2,000 words, no dashes, no forbidden
  words, question H2s, exactly one 3d fence naming a real scene, five or more
  internal links that resolve, five FAQs with real answers.

  Usage: node scripts/audit-guides.mjs
*/
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const dir = path.join(root, 'content/blog');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/manifest.json'), 'utf8'));
const records = (Array.isArray(manifest) ? manifest : manifest.records).filter((r) => ['generated', 'live'].includes(r.page_status));
const configs = fs.readFileSync(path.join(root, 'src/data/brandConfigs.ts'), 'utf8') + fs.readFileSync(path.join(root, 'src/data/brand-configs/kerakoll.ts'), 'utf8');
const valid = new Set(['/', '/brands', '/contact', '/about', '/tools', '/quote', '/trade-account', '/credentials', '/blog', '/construction-chemicals-dubai', '/tile-adhesive-supplier-dubai', '/waterproofing-supplier-dubai', '/epoxy-flooring-supplier-dubai', '/concrete-repair-supplier-dubai', '/mapei-grout-calculator']);
const brandSlugs = ['mapei', 'kerakoll', 'weber', 'laticrete', 'pidilite-puma', 'profilpas', 'akzonobel', 'fila', 'kalinga-stone'];
for (const b of brandSlugs) valid.add(`/brands/${b}`);
for (const m of configs.matchAll(/^  ['"]?([a-z-]+)['"]?: \{\n    slug: '([^']+)',[\s\S]*?\n    productLines: \[([\s\S]*?)\n    \],/gm)) for (const l of m[3].matchAll(/slug: '([^']+)'/g)) valid.add(`/brands/${m[2]}/${l[1]}`);
const kera = fs.readFileSync(path.join(root, 'src/data/brand-configs/kerakoll.ts'), 'utf8');
for (const l of kera.matchAll(/\n\s+slug: '([^']+)',\n\s+name:/g)) valid.add(`/brands/kerakoll/${l[1]}`);
for (const r of records) valid.add(`/brands/${r.brand}/${r.product_line}/${r.slug}`);
for (const f of fs.readdirSync(dir)) if (/\.mdx?$/.test(f)) valid.add(`/blog/${f.replace(/\.mdx?$/, '')}`);
const scenes = new Set([...fs.readFileSync(path.join(root, 'src/data/scenes/index.ts'), 'utf8').matchAll(/^\s{4}slug: "([^"]+)",/gm)].map((m) => m[1]));
const posters = JSON.parse(fs.readFileSync(path.join(root, 'src/data/scenes/posters.json'), 'utf8'));

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const problems = [];
let n = 0;
for (const f of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const { data, content } = matter(raw);
  if (data.category !== 'Guides') continue;
  n++;
  const note = (m) => problems.push(`${f}: ${m}`);
  for (const k of ['title', 'date', 'excerpt', 'image', 'category', 'author', 'scene']) if (!data[k]) note(`frontmatter missing ${k}`);
  if (/[–—]/.test(raw)) note('contains an em or en dash');
  for (const bad of ['Grani Marmo', '1 of 87', 'one in four', '\\bDIY\\b', 'homeowner', 'Biofix', 'Superbio', 'Bioflex', '325 Platinum', 'Pegoland Optima']) if (new RegExp(bad, 'i').test(raw)) note(`contains forbidden text "${bad}"`);
  const body = content.replace(/```3d[\s\S]*?```/g, '');
  const w = words(body.replace(/[#>*_`\[\]()!-]/g, ' '));
  if (w < 1350 || w > 2700) note(`${w} words (want 1,400 to 2,600; link URLs are counted)`);
  if (data.title && data.title.length > 70) note(`title is ${data.title.length} characters`);
  if (data.excerpt && (data.excerpt.length < 120 || data.excerpt.length > 170)) note(`excerpt is ${data.excerpt.length} characters (want 140 to 160)`);
  const h1s = (content.match(/^# /gm) || []).length;
  if (h1s > 0) note(`${h1s} markdown H1s; the template owns the H1, start at ##`);
  const h2s = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  if (h2s.length < 5) note(`only ${h2s.length} H2s`);
  const qs = h2s.filter((h) => h.endsWith('?')).length;
  if (qs < Math.ceil(h2s.length * 0.6)) note(`only ${qs} of ${h2s.length} H2s are questions`);
  const fences = [...content.matchAll(/```3d\s*\n([^\n`]+)\n```/g)].map((m) => m[1].trim());
  if (fences.length !== 1) note(`${fences.length} 3d fences (want exactly 1)`);
  for (const sc of fences) {
    if (!scenes.has(sc)) note(`3d fence names unknown scene "${sc}"`);
    else if (!posters[sc]) note(`scene "${sc}" has no poster`);
    if (data.scene && data.scene !== sc) note(`frontmatter scene "${data.scene}" differs from fence "${sc}"`);
  }
  if (data.image && !fs.existsSync(path.join(root, 'public', data.image))) note(`image missing: ${data.image}`);
  const links = [...content.matchAll(/\]\((\/[^)\s#]+)(?:#[^)]*)?\)/g)].map((m) => m[1].replace(/\/$/, ''));
  const uniq = [...new Set(links)];
  if (uniq.length < 5) note(`only ${uniq.length} distinct internal links (want 5 or more)`);
  for (const l of uniq) if (!valid.has(l)) note(`link target does not exist: ${l}`);
  if (/https?:\/\/(?!www\.lapizblue\.com)/.test(content)) note('contains an external link');
  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  if (faqs.length < 4 || faqs.length > 6) note(`${faqs.length} FAQs (want 5)`);
  for (const q of faqs) {
    if (!q.question?.endsWith('?')) note(`FAQ "${q.question}" is not a question`);
    if (words(q.answer || '') < 25) note(`FAQ "${q.question}" answer is thin`);
  }
  console.log(`${f}: ${w} words, ${h2s.length} H2s (${qs} questions), ${uniq.length} links, ${faqs.length} FAQs, scene ${fences[0] ?? 'none'}`);
}
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`\n${n} guides clean.`);
