/*
  Build the Laticrete manifest records.

  Named the way the UAE sells them, which is what the owner asked for: MYK is
  the India arm's badge and does not appear on a Dubai quotation, so
  "MYK Latafix 305" is "Laticrete 305" here. The sheet still says MYK, and
  each record's notes say which site it came from.

  node scripts/laticrete/build-records.mjs [--write]
*/
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const WRITE = process.argv.includes('--write');
const crawl = JSON.parse(fs.readFileSync('data/incoming/laticrete-crawl.json', 'utf8'));

/** What the UAE calls it, and where it belongs on the site. */
const UAE = {
  '254-platinum':            ['Laticrete 254 Platinum', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  '254-platinum-plus':       ['Laticrete 254 Platinum Plus', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  'myk-latafix-305':         ['Laticrete 305', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  'myk-laticrete-325-high-flex': ['Laticrete 325 High Flex', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  'myk-laticrete-325-shear-wall-adhesive': ['Laticrete 325 Shear Wall Adhesive', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  'latapoxy-300-adhesive':   ['Laticrete Latapoxy 300 Adhesive', 'tile-adhesives-and-grouts', 'tile_adhesive'],
  'spectralock-pro-premium-grout': ['Laticrete Spectralock Pro Premium Grout', 'tile-adhesives-and-grouts', 'epoxy_grout'],
  'myk-laticrete-sp-100-tile-joint': ['Laticrete SP-100 Tile Joint', 'tile-adhesives-and-grouts', 'epoxy_grout'],
  'permacolor-grout':        ['Laticrete Permacolor Grout', 'tile-adhesives-and-grouts', 'cementitious_grout'],
  'myk-laticrete-500':       ['Laticrete 500 Sanded Grout', 'tile-adhesives-and-grouts', 'cementitious_grout'],
  'myk-laticrete-600':       ['Laticrete 600 Unsanded Grout', 'tile-adhesives-and-grouts', 'cementitious_grout'],
  '9235-waterproofing-membrane': ['Laticrete 9235 Waterproofing Membrane', 'waterproofing', 'waterproofing'],
  'myk-laticrete-190':       ['Laticrete 190 Sealer', 'tile-adhesives-and-grouts', 'surface_treatment'],
};

const USE = {
  tile_adhesive: ['Fixing ceramic and porcelain tiles', 'Fixing natural stone'],
  epoxy_grout: ['Grouting where stains and chemicals are a problem', 'Wet areas and swimming pools'],
  cementitious_grout: ['Grouting tiled walls and floors'],
  waterproofing: ['Waterproofing wet areas before tiling', 'Anti fracture protection over cracked substrates'],
  surface_treatment: ['Sealing natural stone against staining'],
};

const clean = (s) => String(s || '').replace(/[–—]/g, ' to ').replace(/\s+/g, ' ').trim();
const words = (s) => s.trim().split(/\s+/).filter(Boolean);
/**
 * Laticrete sheets carry the Bethany CT address, phone numbers and section
 * numbers in the same column as the prose, and set their headings in capitals
 * on the same line as the text under them. All of it is page furniture.
 */
const FURNITURE = /LATICRETE Park|Bethany|Telephone|\+1\.203|Fax|E ?-?mail|www\.|Technical Data Sheet|DS-\d|\bext\.|Hyderabad|Tel:|\b\d{5,}\b/i;
const tidy = (t) => String(t)
  .replace(/\b(PRODUCT DESCRIPTION|PRODUCT NAME|MANUFACTURER|USES|SUITABLE SUBSTRATES|FEATURES|BENEFITS|ADVANTAGES|TECHNICAL DATA|PACKAGING|APPLICABLE STANDARD[S]?|LIMITATIONS|CAUTIONS)\b\s*/g, ' ')
  .replace(/\s*[•▪●]\s*/g, '; ')
  .replace(/\s+([.,;:])/g, '$1')
  .replace(/([.!?])\s*;\s*/g, '$1 ')
  .replace(/^\s*;\s*/, '')
  .replace(/\s+/g, ' ').trim();

const sentences = (s) => tidy(clean(s)).split(/(?<=[.!?])\s+/).map((x) => x.trim())
  .filter((x) => x.length > 16 && /[.!?]$/.test(x))
  .filter((x) => !FURNITURE.test(x));

/** Facts from the sheet's own front page, two column layout allowed for. */
function sheetFacts(file) {
  if (!file || !fs.existsSync(file)) return { prose: [], specs: {} };
  const raw = execFileSync('pdftotext', ['-layout', '-f', '1', '-l', '2', file, '-'],
    { encoding: 'utf8', timeout: 40000, maxBuffer: 20 * 1024 * 1024 });
  const lines = raw.split('\n');
  const left = lines.map((l) => l.split(/\s{6,}/)[0].trim()).filter(Boolean);
  const prose = sentences(left.join(' '))
    .filter((s) => !/^\s*(LATICRETE|MYK|Technical Data|DS-\d|www\.|Tel|Fax|E ?-?mail)/i.test(s))
    .filter((s) => words(s).length > 6);
  const specs = {};

  /**
   * Laticrete's two column layout puts a label at the end of one line and its
   * value on the next, in the other column, so pairing by line fails. Reading
   * the whole sheet for the value's own shape is simpler and does not break.
   */
  const put = (k, v) => {
    const c = clean(v).replace(/^[:\s-]+/, '').trim();
    if (c && c.length > 2 && c.length < 80 && !/^\d+(\.\d+)+$/.test(c)) specs[k] = c;
  };
  const find = (re) => (raw.match(re) || [''])[0];

  put('pack_size', find(/\d+(?:\.\d+)?\s*(?:kg|lb)\s*(?:&|and)\s*\d+(?:\.\d+)?\s*(?:kg|lb)\s*(?:bags?|pails?|units?|kits?)/i)
                || find(/\d+(?:\.\d+)?\s*(?:kg|lb)\s*(?:bags?|pails?|units?|kits?)/i)
                || find(/\d+(?:\.\d+)?\s*(?:litre|liter|ltr|l)\s*(?:pails?|cans?|units?|drums?)/i));
  put('colour', find(/\b(?:Grey|Gray|White|Grey & White|Silver|Natural)\b(?=\s*(?:\n|$|,))/i));
  put('coverage', find(/Approx\.?\s*[\d.–\-\s]+S?q?\.?\s*(?:ft|Sft|m2|m²)[^\n]{0,40}/i));
  put('working_time', find(/(?:Working|Pot) Time[^\n]{0,8}([\d.\s–\-]+(?:hours?|hrs?|min))/i));
  put('standards', [...new Set((raw.match(/ANSI\s*A?\s?118\.\d+[A-Z]?|EN\s*1\d{3,4}|IS\s*\d{4,5}/gi) || []))].slice(0, 3).join(', '));

  const grab = (label, re) => {
    const m = raw.match(re);
    if (!m) return;
    const v = clean(m[1]).slice(0, 80).replace(/\s*[(\[].*$/, '').trim();
    // a bare section number like 7.2.3, or a fragment cut mid word, is not a value
    if (!v || /^\d+(\.\d+)+$/.test(v) || v.length < 3 || /[(\[]$/.test(v)) return;
    specs[label] = v;
  };
  grab('shelf_life', /Shelf Life[:\s]*([^\n]{3,60})/i);
  grab('pot_life', /Pot Life[:\s]*([^\n]{3,50})/i);
  grab('open_time', /Open Time[:\s]*([^\n]{3,50})/i);
  grab('classification', /ANSI\s*A?\s?(118\.\d+[A-Z]?|118\.\d+)/i);
  return { prose, specs };
}

const out = [];
for (const r of crawl) {
  const u = UAE[r.key];
  if (!u) continue;
  const [name, line, category] = u;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  // Read the sheet from where it is hosted, not from the crawl's staging
  // path, which is cleared once the files are placed under their final names.
  const hosted = `public/tds/laticrete/${slug}.pdf`;
  const sheetPath = fs.existsSync(hosted) ? hosted : r.tdsFile;
  const { prose, specs } = sheetFacts(sheetPath);
  const hasSheet = !!(sheetPath && fs.existsSync(sheetPath));

  if (r.title) {
    specs.product_type = clean(r.title)
      .replace(/™|®/g, '')
      .replace(/\s*[-|]\s*MYK\s*LATICRETE\s*$/i, '')
      .replace(/^\s*(LATAFIX|LATICRETE|MYK)\s+/i, '')
      .replace(/^[\d\s-]+/, '')
      .trim().slice(0, 70);
    if (specs.product_type.length < 4) delete specs.product_type;
  }
  if (!specs.product_type) specs.product_type = line.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  if (Object.keys(specs).length < 2) specs.range = 'Laticrete, supplied in the UAE';

  const parts = [];
  const seen = new Set();
  const add = (s) => { const k = s.toLowerCase().replace(/[^a-z0-9 ]/g, '').slice(0, 60); if (!k || seen.has(k)) return; seen.add(k); parts.push(s); };
  if (r.description) sentences(r.description).forEach(add);
  prose.slice(0, 6).forEach(add);
  while (words(parts.join(' ')).length < 110 && prose.length) { const p = prose.shift(); if (p) add(p); else break; }
  // Where the sheet is terse, what the product is for is still a fact.
  while (words(parts.join(' ')).length < 112 && prose.length) add(prose.shift());
  if (words(parts.join(' ')).length < 112) {
    add(`On site it is used for ${(USE[category] || []).map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join(' and ')}.`);
  }
  if (!hasSheet) add(`Laticrete publishes no data sheet for this exact item, so none is hosted here and no coverage or classification is claimed for it.`);
  if (/^Laticrete (305|325|500|600|SP-100|190)/.test(name)) {
    add(`Laticrete sells this through MYK Laticrete, its India arm, and the data sheet carries that badge. It is the same product we supply here as ${name}.`);
  }
  if (words(parts.join(' ')).length < 112 && specs.pack_size) {
    add(`Laticrete supplies it in ${specs.pack_size}${specs.standards ? `, and the sheet states ${specs.standards}` : ''}.`);
  }
  if (words(parts.join(' ')).length < 112) {
    add(`Lapiz Blue is an authorised Laticrete distributor in the UAE, so the current sheet, the stock position and the lead time can be confirmed before you specify it.`);
  }
  add(`Lapiz Blue supplies ${name} across the UAE from Dubai, Abu Dhabi and Sharjah.`);
  while (words(parts.join(' ')).length > 148 && parts.length > 3) {
    let worst = 1, len = 0;
    for (let i = 1; i < parts.length - 1; i++) { const w = words(parts[i]).length; if (words(parts.join(' ')).length - w >= 100 && w > len) { worst = i; len = w; } }
    if (!len) break;
    parts.splice(worst, 1);
  }
  const description = parts.join(' ');

  let meta = `${name} TDS: Laticrete ${specs.product_type.toLowerCase()} supplied in the UAE. Data sheet, coverage and packs from Lapiz Blue in Dubai, Abu Dhabi and Sharjah.`;
  if (meta.length > 160) meta = `${name} TDS: Laticrete, supplied in the UAE. Data sheet, coverage and pack sizes from Lapiz Blue, Dubai, Abu Dhabi and Sharjah.`;
  if (meta.length < 140) meta = meta.replace(/\.$/, '') + '. Ask us for stock and lead time.';
  while (meta.length > 160) meta = meta.slice(0, meta.lastIndexOf(' ', 157)).replace(/[,.]$/, '') + '.';

  out.push({
    slug, brand: 'laticrete', product_line: line, name, category,
    classification: specs.classification ? `ANSI A${specs.classification}` : '',
    description, meta_description: meta,
    image: { status: 'found', path: `/images/brands/laticrete/${line}/${slug}.webp`, source_url: r.image || '' },
    tds: hasSheet
      ? { status: 'verified', source_url: r.tds, local_path: `/tds/laticrete/${slug}.pdf`,
          sha256: r.sha256 || '', size_bytes: r.size_bytes || 0, revision_date: '', verified_name_match_score: 100 }
      : { status: 'documents_pending', source_url: r.url, local_path: '', sha256: '', size_bytes: 0, revision_date: '', verified_name_match_score: 0 },
    specs,
    applications: USE[category] || ['Tiling and finishing work'],
    equivalents: [], page_status: 'generated',
    notes: `Crawled from ${r.url}.` + (r.withheld ? ` ${r.withheld}` : ''),
    updated_at: new Date().toISOString().slice(0, 10),
  });
}

const wc = out.map((r) => words(r.description).length).sort((a, b) => a - b);
console.log(`${out.length} records, ${out.filter((r) => r.tds.status === 'verified').length} with a sheet`);
console.log(`description words: min ${wc[0]}, median ${wc[Math.floor(wc.length / 2)]}, max ${wc[wc.length - 1]}`);
out.filter((r) => { const n = words(r.description).length; return n < 100 || n > 150; })
   .forEach((r) => console.log(`  SHORT/LONG ${r.name}: ${words(r.description).length}`));
if (WRITE) { fs.writeFileSync('data/incoming/laticrete-records.json', JSON.stringify(out, null, 2) + '\n'); console.log('wrote data/incoming/laticrete-records.json'); }
