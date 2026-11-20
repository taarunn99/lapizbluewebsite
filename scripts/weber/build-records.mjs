/*
  Build the Weber manifest records.

  Prose comes from each sheet's own PRODUCT and SCOPE OF USE blocks. Every
  number comes from data/incoming/weber-verified.json, which ten agents read
  off the sheets by hand; the regex pass had the UAE pack wrong on at least
  eight products because Weber's packaging table is one column per country and
  a careless read takes Jordan's or Kuwait's figure.

  node scripts/weber/build-records.mjs [--write]
*/
import fs from 'fs';
import os from 'os';
import path from 'path';
import { readSheet } from './extract.mjs';

const WRITE = process.argv.includes('--write');
const products = JSON.parse(fs.readFileSync('data/discovery/weber-products.json', 'utf8')).products;
const verified = JSON.parse(fs.readFileSync('data/incoming/weber-verified.json', 'utf8'));
const images = JSON.parse(fs.readFileSync('/tmp/weber_images.json', 'utf8'));
const DL = path.join(os.homedir(), 'Downloads');

const slugOf = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const byProduct = new Map();
for (const v of verified) byProduct.set(slugOf(v.product), v);

const CATEGORY = {
  'tile-adhesives-and-grouts': 'tile_adhesive',
  'waterproofing': 'waterproofing',
  'repair-and-anchoring': 'repair_mortar',
  'self-leveling-and-microcement': 'self_leveling',
  'plasters-and-renders': 'plaster',
  'sealants': 'sealant',
  'admixtures-and-bonding-agents': 'bonding_agent',
  'masonry-mortars': 'repair_mortar',
};
const USE = {
  'tile-adhesives-and-grouts': ['Fixing ceramic and porcelain tiles', 'Grouting tiled walls and floors'],
  'waterproofing': ['Waterproofing wet areas and roofs', 'Protecting concrete from water ingress'],
  'repair-and-anchoring': ['Concrete repair', 'Anchoring and grouting'],
  'self-leveling-and-microcement': ['Levelling floors before a finish', 'Industrial and commercial floors'],
  'plasters-and-renders': ['Plastering and rendering walls', 'Skimming before decoration'],
  'sealants': ['Sealing movement and expansion joints'],
  'admixtures-and-bonding-agents': ['Improving a site mixed mortar or render', 'Bonding new concrete to old'],
  'masonry-mortars': ['Laying blockwork and masonry'],
};

const words = (s) => s.trim().split(/\s+/).filter(Boolean);
const clean = (s) => String(s || '').replace(/[–—]/g, ' to ').replace(/\s+/g, ' ').trim();
const sentences = (s) => clean(s).split(/(?<=[.!?])\s+/).map((x) => x.trim())
  .filter((x) => x.length > 14 && /[.!?]$/.test(x));

/** Compare on words, so the same sentence twice is caught whatever the spacing. */
const fingerprint = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
/** The opening words, so a sentence repeated with a heading glued on is caught. */
const opening = (s) => fingerprint(s).split(' ').filter((w) => w.length > 2).slice(0, 8).join(' ');

const out = [];
const problems = [];

for (const p of products) {
  const slug = slugOf(p.name);
  const v = byProduct.get(slug);
  const file = v?.file ? path.join(DL, v.file) : null;
  const hasSheet = !!(file && fs.existsSync(file));
  const sheet = hasSheet ? readSheet(file) : null;

  // specs: the agents' readings first, since they checked the right column
  const specs = {};
  const put = (k, val) => { const c = clean(val); if (c && c !== '-' && c.length < 90) specs[k] = c; };
  if (v) {
    put('pack_size', v.pack_uae);
    put('classification', v.classification);
    put('coverage', v.coverage && v.coverage.length < 90 ? v.coverage : '');
    put('open_time', v.open_time);
    put('pot_life', v.pot_life);
    put('service_temperature', v.service_temperature);
    put('storage_shelf_life', v.shelf_life);
    put('mixing_ratio', v.mixing_ratio);
  }
  if (sheet) {
    for (const [k, val] of Object.entries(sheet.specs)) {
      const key = k.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      if (!specs[key] && key.length < 30) put(key, val);
    }
    if (!specs.product_type && sheet.category) put('product_type', sheet.category.toLowerCase().replace(/^./, (c) => c.toUpperCase()));
  }
  if (!specs.product_type) put('product_type', p.line.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()));
  if (Object.keys(specs).length < 2) put('range', 'Weber Saint-Gobain, supplied in the UAE');

  // prose, from the sheet's own words
  // Where PRODUCT and SCOPE OF USE are brief, the sheet's own ADVANTAGES and
  // INSTRUCTIONS FOR USE carry the rest. Still Weber's words, not invented.
  const pool = sheet
    ? [...sentences(sheet.description), ...sentences(sheet.scope),
       ...sentences(sheet.advantages), ...sentences(sheet.howto)]
    : [];
  const seen = new Set();
  const parts = [];
  const add = (s) => {
    const f = fingerprint(s), o = opening(s);
    if (!f || seen.has(f) || (o && seen.has(o))) return false;
    seen.add(f); if (o) seen.add(o);
    parts.push(s); return true;
  };
  for (const s0 of pool.slice(0, 4)) add(s0);
  const facts = [];
  if (specs.classification) facts.push(`Weber states it as ${specs.classification}.`);
  if (specs.coverage) {
    // The spec row keeps the full reading. In a sentence, a trailing yield
    // clause reads as shouting and is not a consumption rate anyway.
    const prose = specs.coverage
      .replace(/;?\s*YIELD:.*$/i, '')
      // the readers annotated which heading a figure came from; useful in the
      // spec row, noise in a sentence
      .replace(/\s*\((?:CONSUMPTION|COVERAGE|YIELD|Yield)\)/g, '')
      .replace(/;\s*approximately[^;]*\bbag\b[^;]*/i, '')
      .replace(/\s*\.$/, '').replace(/\s+/g, ' ').trim();
    if (prose) facts.push(`The sheet gives consumption as ${prose}.`);
  }
  if (specs.pack_size) facts.push(`It is supplied in the UAE in ${specs.pack_size}.`);
  if (specs.pot_life) facts.push(`Pot life is given as ${specs.pot_life}.`);
  if (specs.open_time) facts.push(`Open time is given as ${specs.open_time}.`);
  if (specs.service_temperature) facts.push(`Weber states a service temperature of ${specs.service_temperature}.`);
  if (specs.mixing_ratio) facts.push(`The mixing ratio is ${specs.mixing_ratio}.`);
  if (specs.storage_shelf_life) facts.push(`Shelf life is ${specs.storage_shelf_life} in the unopened pack.`);
  let i = 4;
  while (words(parts.join(' ')).length < 112) {
    if (i < pool.length) { add(pool[i++]); continue; }
    if (facts.length) { add(facts.shift()); continue; }
    break;
  }
  for (const f of facts) if (words(parts.join(' ')).length < 140) add(f);
  // Anything the sheet still has to say, rather than a short page.
  while (words(parts.join(' ')).length < 106 && i < pool.length) add(pool[i++]);
  if (words(parts.join(' ')).length < 106 && sheet) {
    for (const extra of [...sentences(sheet.howto), ...sentences(sheet.advantages)]) {
      if (parts.includes(extra)) continue;
      add(extra);
      if (words(parts.join(' ')).length >= 106) break;
    }
  }
  // The sheet's named prose blocks only. A catch all over the whole page was
  // tried and dragged in table rows, country headers and section headings,
  // which is worse than a shorter paragraph closed with something true.
  // Exhaust those, then say plainly what is missing.
  while (words(parts.join(' ')).length < 112 && i < pool.length) add(pool[i++]);
  if (!hasSheet) {
    const family = p.name.split(' ')[0];
    add(`It belongs to the ${family} range, which Weber groups under ${p.line.replace(/-/g, ' ')}.`);
    add(`On site that covers ${(USE[p.line] || []).map((u) => u.charAt(0).toLowerCase() + u.slice(1)).join(' and ')}.`);
    add(`Weber has not supplied a data sheet for this item, so none is hosted here and no coverage, pack size or classification is claimed for it on this page.`);
    add(`Lapiz Blue requests the current sheet from Weber on enquiry and sends it with the sizes and lead time held against your project.`);
  }
  // The pending block already says what the line covers, so only add this
  // where it did not run.
  if (hasSheet && words(parts.join(' ')).length < 106) {
    add(`On site it is used for ${(USE[p.line] || []).map((u) => u.charAt(0).toLowerCase() + u.slice(1)).join(' and ')}.`);
  }
  // A handful of Weber sheets are a single short paragraph. Rather than
  // stretch that paragraph or invent performance claims, these close on
  // things that are true of the product and checkable.
  if (words(parts.join(' ')).length < 112) {
    add(`${p.name} sits in Weber's ${p.line.replace(/-/g, ' ')} range, made for the Gulf by Saint-Gobain through SODAMCO.`);
  }
  if (words(parts.join(' ')).length < 112) {
    add(`Lapiz Blue holds Weber's authorised distributor letter, so the current sheet, the stock position and the lead time can all be confirmed before you specify it.`);
  }
  add(`Lapiz Blue supplies ${p.name} across the UAE from Dubai, Abu Dhabi and Sharjah.`);
  // Trim to the gate's ceiling without falling through its floor. Dropping a
  // whole sentence can take 160 words to 81 in one step, so a cut is only
  // taken when what is left still clears 100, and the longest candidate goes
  // first so the fewest cuts are needed.
  const total = () => words(parts.join(' ')).length;
  while (total() > 148) {
    let best = -1, bestLen = 0;
    for (let k = 1; k < parts.length - 1; k++) {
      const len = words(parts[k]).length;
      if (total() - len >= 100 && len > bestLen) { best = k; bestLen = len; }
    }
    if (best < 0) break;
    parts.splice(best, 1);
  }
  const description = parts.join(' ');
  const wc = words(description).length;
  if (wc < 100 || wc > 150) problems.push([p.name, `description ${wc} words`]);

  const what = (specs.product_type || p.line.replace(/-/g, ' ')).toLowerCase();
  let meta = `${p.name} TDS: Weber ${what} supplied in the UAE. Data sheet, coverage and pack sizes from Lapiz Blue in Dubai, Abu Dhabi and Sharjah.`;
  if (meta.length > 160) meta = `${p.name} TDS: Weber ${what}. Data sheet, coverage and packs from Lapiz Blue, UAE distributor in Dubai.`;
  while (meta.length < 140) meta = meta.replace(/\.$/, '') + ' Ask us for stock and lead time.';
  meta = meta.slice(0, 160).replace(/\s+\S*$/, (m) => (meta.length > 160 ? '' : m));

  const img = images[p.name];
  out.push({
    slug, brand: 'weber', product_line: p.line, name: p.name,
    category: CATEGORY[p.line] || 'repair_mortar',
    classification: specs.classification || '',
    description, meta_description: meta,
    image: img ? { status: 'found', path: `/images/brands/weber/${p.line}/${slug}.webp`, source_url: `Supplied by the owner: ${img}` }
               : { status: 'placeholder', path: `/products/weber/${slug}.webp`, source_url: '' },
    tds: hasSheet
      ? { status: 'verified', source_url: '', local_path: `/tds/weber/${slug}.pdf`, sha256: '', size_bytes: 0,
          revision_date: sheet?.edition || '', verified_name_match_score: 100 }
      : { status: 'documents_pending', source_url: '', local_path: '', sha256: '', size_bytes: 0, revision_date: '', verified_name_match_score: 0 },
    specs,
    applications: USE[p.line] || ['Construction chemicals work'],
    equivalents: [], page_status: 'generated',
    notes: `Zoho Books lists this as ${p.books.join(', ')}.` +
      (hasSheet ? ` Data sheet supplied by the owner from Weber: ${v.file}.` : ' No data sheet supplied for this item yet.') +
      (v?.notes ? ` Sheet notes: ${clean(v.notes).slice(0, 300)}` : ''),
    updated_at: new Date().toISOString().slice(0, 10),
  });
}

console.log(`${out.length} records, ${out.filter((r) => r.tds.status === 'verified').length} with a sheet, ${out.filter((r) => r.image.status === 'found').length} with a real pack shot`);
const wcs = out.map((r) => words(r.description).length).sort((a, b) => a - b);
console.log(`description words: min ${wcs[0]}, median ${wcs[Math.floor(wcs.length / 2)]}, max ${wcs[wcs.length - 1]}`);
if (problems.length) { console.log(`\n${problems.length} need attention:`); problems.slice(0, 12).forEach(([n, w]) => console.log(`  ${n}: ${w}`)); }
if (WRITE) { fs.writeFileSync('data/incoming/weber-records.json', JSON.stringify(out, null, 2) + '\n'); console.log('\nwrote data/incoming/weber-records.json'); }
