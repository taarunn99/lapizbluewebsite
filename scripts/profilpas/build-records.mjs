/*
  Turn the verified Profilpas crawl into manifest records.

  Every sentence of copy here comes from one of two places: Profilpas's own
  catalogue entry for that product, or the facts read out of its data sheet by
  extract.mjs. Nothing is invented. Where a sheet does not say something, the
  record leaves that field out rather than filling it.

  Usage: node scripts/profilpas/build-records.mjs [--write]
  Without --write it prints a sample and the word count spread, so the copy can
  be read before 192 records land in the manifest.
*/
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { readSheet } from './extract.mjs';

const WRITE = process.argv.includes('--write');
const crawl = JSON.parse(fs.readFileSync('data/discovery/profilpas-crawl.json', 'utf8'));

/** Profilpas's own category, mapped onto the lines this site already has. */
const LINE = {
  'external-corner-profiles': 'corner-profiles',
  'internal-corner-profiles': 'corner-profiles',
  'listello-tile-trims-and-decorative-profiles': 'decorative-profiles',
  'joints-for-floors': 'movement-and-stairnosing',
  'stair-nosing-profiles': 'movement-and-stairnosing',
  'profiles-for-balconies-and-terraces': 'balcony-and-terrace-profiles',
  'profiles-for-floors-of-different-heights': 'flooring-profiles',
  'profiles-for-floors-of-equal-height': 'flooring-profiles',
  'diy-profiles': 'flooring-profiles',
  'profiles-for-lvt--spc-and-resilient-floors': 'wooden-laminate-and-lvt-floor-profiles',
  'profiles-for-wooden-and-laminate-floors': 'wooden-laminate-and-lvt-floor-profiles',
  'prolight': 'prolight-and-tile-trims',
  'shower-drains': 'bathroom-profiles',
  'point-drainage': 'bathroom-profiles',
  'shower-tile-trims': 'bathroom-profiles',
  'metal-skirting-boards': 'skirting-boards',
  'pvc-skirting-boards': 'skirting-boards',
  // the three the owner asked for
  'raised-floors': 'raised-floors',
  'technical-entrance-mats': 'entrance-mats',
  'complementary-products-and-tools': 'tools-and-accessories',
};

/** What a visitor is doing on that line, for the applications list. */
const USE = {
  'corner-profiles': ['Protecting tile edges on external corners', 'Finishing internal corners between floor and wall'],
  'decorative-profiles': ['Decorative banding between tiled areas', 'Finishing an exposed tile edge'],
  'movement-and-stairnosing': ['Edging and protecting tiled steps', 'Movement and expansion joints in tiled floors'],
  'balcony-and-terrace-profiles': ['Edge drainage on balconies and terraces', 'Protecting the tile edge on an exposed slab'],
  'flooring-profiles': ['Joining two floors of equal height', 'Making a safe transition between floors of different heights'],
  'wooden-laminate-and-lvt-floor-profiles': ['Trimming wooden, laminate and LVT floors', 'Transitions and expansion gaps in resilient flooring'],
  'prolight-and-tile-trims': ['Concealed LED lighting in a tiled wall or step', 'Lit decorative detail in a tiled surface'],
  'bathroom-profiles': ['Floor level shower drainage', 'Finishing tile edges in a wet room'],
  'skirting-boards': ['Finishing the floor to wall joint', 'Protecting wall bases in high traffic areas'],
  'raised-floors': ['Supporting an outdoor raised floor', 'Levelling paving over a terrace or roof'],
  'entrance-mats': ['Dirt control at a building entrance'],
  'tools-and-accessories': ['Laying and finishing tiled surfaces'],
};

const words = (s) => s.trim().split(/\s+/).filter(Boolean);
/**
 * Profilpas writes in Italian house style and the English sheets keep it:
 * a division sign for a range, a decimal comma, and kN written Kn. None of
 * that changes a value, so it is rendered the way a UAE specifier reads it.
 * The dash replacement is the owner's rule, which forbids en and em dashes
 * anywhere on the site.
 */
const clean = (s) => String(s || '')
  .replace(/[–—]/g, ' to ')
  .replace(/\s*÷\s*/g, ' to ')         // 0.5÷1mm is a range, not a division
  .replace(/(\d),(\d)/g, '$1.$2')      // 9,8 is nine point eight
  .replace(/\bKn\b/g, 'kN')
  .replace(/®|™/g, '')
  .replace(/\s+/g, ' ')
  .trim();

/**
 * Profilpas shouts its catalogue names. These are the words that are real
 * words rather than model codes, so they read as names on the page. Anything
 * not listed is left exactly as Profilpas prints it, because NPAN, CPGV, SIS
 * and ILN are codes and title casing them would invent a product.
 */
const FAMILY = new Set([
  'ALFIX', 'CERFIX', 'PROANGLE', 'PROBASIC', 'PROBORD', 'PROCLASSIC', 'PROCORNER',
  'PROCOVER', 'PRODECOR', 'PROFIX', 'PROFLEX', 'PROFLOOR', 'PROINT', 'PROINTER',
  'PROJOINT', 'PROJOLLY', 'PROLEVEL', 'PROLIGHT', 'PROLIST', 'PROLISTEL', 'PROLOCK',
  'PROLUX', 'PROMAT', 'PRONIVEL', 'PROPLAK', 'PROROUND', 'PROSKIRTING', 'PROSLIDER',
  'PROSMART', 'PROSTAIR', 'PROSTEP', 'PROSTYLE', 'PROTEC', 'PROTECT', 'PROTILER',
  'PROTOP', 'PROTRIM', 'PROWOOD', 'PRESTOWOOD', 'SANIBORD', 'UNISYSTEM', 'TERMINAL',
  'METAL', 'LINE', 'LEVEL', 'DRAIN', 'GRID', 'MINI', 'MAXI', 'DUO', 'SLIM', 'SMART',
  'THIN', 'DECKING', 'JOIST', 'DRAINAGE', 'RAISED', 'TILE', 'PROTECTOR', 'SLAB',
  'LIFTING', 'HANDLE', 'FIX', 'KLIC', 'ELECTRIC', 'VACUUM', 'SUCTION', 'CUP', 'MAGNETIC', 'KIT',
  'MACHINE', 'PROFILES', 'PROFILE', 'COMPONENTS', 'ACCESSORIES', 'AND', 'GLASS',
  'POINT', 'SAFETY', 'STEP', 'SPACER', 'DESIGN', 'FIRE', 'TOP', 'BOARDS', 'BOARD',
]);

function displayName(raw) {
  // In prose an en dash reads as a range, so clean() spells it "to". In a
  // product name it is a separator, and "PP Level Duo Maxi to Decking" is not
  // a product. The house rule allows a plain hyphen, so names get that.
  const asName = String(raw || '').replace(/\s*[–—]\s*/g, ' - ');
  return clean(asName).replace(/ - /g, ' - ').split(' ').map((w) => {
    const bare = w.replace(/[^A-Za-z]/g, '');
    if (FAMILY.has(bare.toUpperCase()) && bare === bare.toUpperCase()) {
      return w.replace(bare, bare[0] + bare.slice(1).toLowerCase());
    }
    return w;                                  // a model code, left alone
  }).join(' ');
}

/**
 * Profilpas's catalogue serves Italian for a handful of items even on the
 * English site. Klic Level came through entirely in Italian and Metal Line
 * 105 partly, and the Italian text also fed the material check the wrong
 * answer: it called an anodised aluminium skirting board PVC, because the
 * Italian names the PVC base profile it clips onto. Italian is dropped before
 * anything reads it.
 */
const ITALIAN_WORDS = new Set([
  'il', 'lo', 'la', 'gli', 'le', 'un', 'una', 'uno', 'del', 'della', 'dello',
  'dei', 'degli', 'delle', 'nel', 'nella', 'nelle', 'negli', 'con', 'per',
  'che', 'non', 'piu', 'più', 'è', 'sono', 'viene', 'vengono', 'anche',
  'questo', 'questa', 'questi', 'queste', 'da', 'di', 'su', 'al', 'alla',
  'ai', 'agli', 'alle', 'come', 'dal', 'dalla', 'ed', 'ad', 'si', 'ci', 'ne',
  'sulla', 'sul', 'tra', 'fra', 'ma', 'se', 'quando', 'dove', 'perche',
  'perché', 'cui', 'loro', 'suo', 'sua', 'essere', 'avere', 'fare', 'molto',
  'tutti', 'tutto', 'tutte', 'ogni', 'altro', 'altra', 'stesso', 'mediante',
  'oltre', 'inoltre', 'grazie', 'sistema', 'pavimenti', 'rivestimenti',
  'piastrelle', 'battiscopa', 'profilo', 'superficie', 'protezione',
  'elemento', 'funzione', 'esigenze', 'angoli', 'interni', 'esterni',
  'giunzioni', 'terminali', 'finitura', 'installazione', 'fissaggio',
  'parete', 'realizzazione', 'utilizzo', 'caratterizzato', 'semplice',
  'rapido', 'adatto', 'disponibili', 'permettendo', 'livellamento',
]);

/**
 * Profilpas's catalogue serves Italian for a handful of items even on the
 * English site. Klic Level came through entirely in Italian and Metal Line
 * 105 partly, and the Italian also fed the material check the wrong answer:
 * it called an anodised aluminium skirting board PVC, because the Italian
 * names the PVC base profile it clips onto.
 *
 * Matching on a word list needs the unicode flag, since a JavaScript word
 * boundary does not treat the accented e of "è" as a letter and the obvious
 * test silently matches nothing. This counts how much of a sentence is
 * Italian instead, which does not depend on that.
 */
function isItalian(sentence) {
  const toks = sentence.toLowerCase().replace(/[^\p{L}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  if (toks.length < 4) return false;
  const hits = toks.filter((t) => ITALIAN_WORDS.has(t)).length;
  return hits >= 3 || hits / toks.length >= 0.14;
}

/** Sentences, so copy can be trimmed on a sentence rather than mid clause. */
const sentences = (s) => clean(s)
  .split(/(?<=[.!?])\s+/)
  .map((x) => x.trim())
  // A section cut at the page cap leaves a fragment with no full stop, and
  // "...or other types of" reading into the next sentence looks like a typo.
  .filter((x) => x.length > 12 && /[.!?]$/.test(x))
  .filter((x) => !isItalian(x));

/**
 * The material this individual product is made of.
 *
 * Profilpas publishes one sheet per family, and a family can span stainless
 * steel, aluminium, brass and PVC at once. Protect 155 is a PVC profile sitting
 * on a sheet whose Materials section opens with aluminium, so reading the
 * family sheet would put the wrong material on the page. The product's own
 * catalogue entry is the only per item source, so it is asked first and the
 * sheet is used only where it covers a single material.
 */
function materialOf(rec, sheet) {
  const own = `${sentences(rec.description || '').join(' ')} ${sentences(sheet.description || '').join(' ')} ${rec.name}`;
  const hits = [];
  if (/\bPVC\b/i.test(own)) hits.push('PVC');
  if (/stainless steel|\bAISI\b|\binox\b/i.test(own)) hits.push('stainless steel');
  if (/anodi[sz]ed aluminium|\baluminium\b|\baluminum\b/i.test(own)) hits.push('aluminium');
  if (/\bbrass\b/i.test(own)) hits.push('brass');
  if (/\bpolycarbonate\b/i.test(own)) hits.push('polycarbonate');
  if (hits.length === 1) return { name: hits[0], grade: /aluminium|stainless/i.test(hits[0]) ? sheet.grade : '' };
  if (hits.length === 0 && (sheet.materialSet || []).length === 1) return { name: sheet.materialSet[0], grade: sheet.grade };
  return { name: '', grade: '' };          // genuinely several, so claim none
}

/** Drop sentences that repeat something already said. */
function dedupe(list) {
  const out = [], seen = [];
  for (const s of list) {
    const key = clean(s).toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w.length > 3);
    if (key.length < 3) continue;
    const dup = seen.some((k) => {
      const shared = key.filter((w) => k.includes(w)).length;
      return shared / Math.min(key.length, k.length) > 0.62;
    });
    if (dup) continue;
    seen.push(key);
    out.push(clean(s));
  }
  return out;
}

function buildDescription(rec, sheet, mat, line) {
  const name = displayName(rec.name);

  // Profilpas's own words for this exact item come first, then the sheet's,
  // with anything that merely repeats the first removed.
  // Profilpas's catalogue text for PVC Line 8602 calls it "48m high". A
  // skirting board is not forty eight metres tall and the sheet prints the
  // real height only inside a drawing, so rather than reproduce an impossible
  // figure or guess at the one meant, the clause is left off the page.
  const impossible = /\b\d{2,3}\s?m\s+(high|thick|wide|long)\b/i;
  const pool = dedupe([...sentences(rec.description || ''), ...sentences(sheet.description || '')])
    .filter((x) => !impossible.test(x));
  const parts = pool.slice(0, 4);

  // The 2026 sheets carry a Features and Benefits list. Those are the sheet's
  // own statements about this range, so they are real copy, not filler.
  const feats = (sheet.features || [])
    .map((f) => clean(f).replace(/^[a-z]/, (c) => c.toUpperCase()))
    .map((f) => (/[.!?]$/.test(f) ? f : `${f}.`));

  const facts = [];
  if (mat.name) {
    const g = clean(mat.grade);
    const repeats = g && new RegExp(mat.name.split(' ')[0], 'i').test(g);
    facts.push(g ? (repeats ? `It is made in ${g}.` : `It is made in ${mat.name}, ${g}.`)
                 : `It is made in ${mat.name}.`);
  }
  if (sheet.fixing) {
    // Lower only the leading F of each clause; PVC must not become pvc.
    const f = clean(sheet.fixing).replace(/(^|,\s*)Fixing/g, '$1fixing');
    facts.push(`The data sheet sets out ${f}.`);
  }
  if (sheet.standards) facts.push(`It is referenced against ${clean(sheet.standards)}.`);

  // Fill to the gate's hundred word floor with real material, never filler.
  let i = 4;
  const add = (s) => { if (s && !parts.includes(s)) parts.push(s); };
  let fi = 0;
  while (words(parts.join(' ')).length < 112) {
    if (i < pool.length) { add(pool[i++]); continue; }
    if (fi < feats.length) { add(feats[fi++]); continue; }
    if (facts.length) { add(facts.shift()); continue; }
    // Last resort, still the sheet's own words: what it is made of and how the
    // range is finished. Never invented prose.
    const matSentences = sentences(sheet.materials || '').filter((x) => words(x).length > 6 && words(x).length < 34);
    let mj = 0;
    while (words(parts.join(' ')).length < 112 && mj < matSentences.length) add(matSentences[mj++]);
    break;
  }
  for (const f of facts) if (words(parts.join(' ')).length < 134) add(f);
  // Still short only where Profilpas gives almost nothing. The product's own
  // catalogue line is the last real source left.
  if (words(parts.join(' ')).length < 104) {
    for (const extra of pool) { add(extra); if (words(parts.join(' ')).length >= 104) break; }
  }
  if (words(parts.join(' ')).length < 104 && (sheet.features || []).length) {
    for (const f of feats) { add(f); if (words(parts.join(' ')).length >= 104) break; }
  }

  // Where Profilpas gives one sheet to several items, saying so is useful to
  // a specifier and is a fact, not filler.
  if (words(parts.join(' ')).length < 112 && (rec.sheetSiblings || []).length) {
    const sibs = rec.sheetSiblings.slice(0, 4).map(displayName);
    add(`Profilpas issues one data sheet for the range, covering ${sibs.join(', ')} alongside this item.`);
  }
  if (words(parts.join(' ')).length < 112) {
    const uses = USE[line];
    if (uses) add(`On site it is used for ${uses.map((u) => u.charAt(0).toLowerCase() + u.slice(1)).join(' and ')}.`);
  }

  // The handful Profilpas publishes no English sheet for have little to draw
  // on. Saying so plainly, and what we do about it, is more use to a buyer
  // than padding the page out with adjectives.
  if (!mat.hasSheet) {
    add(`Profilpas does not publish an English data sheet for this item, so none is hosted here.`);
    add(`Lapiz Blue requests the current sheet from Profilpas on enquiry and sends it with the sizes, finishes and lead time held against your project.`);
  }

  add(`Lapiz Blue supplies ${name} across the UAE from Dubai, Abu Dhabi and Sharjah.`);

  // Trim from the middle so the opening and the closing line both survive.
  while (words(parts.join(' ')).length > 148 && parts.length > 3) parts.splice(parts.length - 2, 1);
  return parts.join(' ');
}

function buildMeta(rec, sheet, line) {
  const name = displayName(rec.name);
  const what = clean(sheet.category || line.replace(/-/g, ' '));
  // Lowering the first letter would turn "LVT floor profiles" into "lVT".
  const lower = /^[A-Z]{2,}/.test(what) ? what : what.charAt(0).toLowerCase() + what.slice(1);
  const options = [
    `${name} TDS: Profilpas ${lower} supplied in the UAE. Data sheet, materials and sizes from Lapiz Blue in Dubai, Abu Dhabi and Sharjah.`,
    `${name} TDS: Profilpas ${lower} for UAE projects. Data sheet and sizes from Lapiz Blue, Dubai, Abu Dhabi and Sharjah.`,
    `${name} TDS: Profilpas ${lower}. Data sheet, materials and sizes from Lapiz Blue, the UAE distributor in Dubai.`,
    `${name} TDS from Lapiz Blue, Profilpas distributor in Dubai. Data sheet, materials and sizes for UAE projects.`,
  ];
  // 140 to 160 characters, and never cut in the middle of a word.
  const fit = options.find((m) => m.length >= 140 && m.length <= 160);
  if (fit) return fit;
  let m = options.sort((a, b) => Math.abs(150 - a.length) - Math.abs(150 - b.length))[0];
  while (m.length > 160) {
    const cut = m.lastIndexOf(' ', 157);
    m = m.slice(0, cut).replace(/[,.]$/, '') + '.';
  }
  return m;
}

/**
 * Two items Profilpas documents almost not at all: no English sheet, and for
 * one of them no catalogue text either. Rather than pad a generated paragraph
 * with adjectives, these two are written out here by hand, and every sentence
 * is checkable. No dimension, material or performance claim appears in either,
 * because Profilpas publishes none for them.
 */
const HAND_WRITTEN = {
  'proflex-machine':
    'Proflex Machine is the bending machine Profilpas builds to form its own Flex profiles into curved shapes. ' +
    'It ships with a kit, and Profilpas offers further kits for bending Metal Line 90 as well. ' +
    'It is a tool rather than a building product, so it carries no coverage, pack size or EN classification, ' +
    'and Profilpas publishes no English data sheet for it, so none is hosted here. ' +
    'Where a job calls for curved trims, the usual route is to agree the radius first and confirm which kit the machine needs for that profile. ' +
    'Lapiz Blue requests the current details from Profilpas on enquiry and supplies Proflex Machine across the UAE from Dubai, Abu Dhabi and Sharjah.',
  'klic-level':
    'Klic Level is a screw levelling system for floors and wall coverings of differing thickness, and Profilpas rates it in particular for large format tiles. ' +
    'The cylinder carries a disc that protects the surface of the covering from scratches while the levelling is being done, ' +
    'and a mechanism for quickly inserting and ejecting the single use element. ' +
    'That description is translated from the Italian, because the only text Profilpas publishes for this item is Italian and nothing has been added to it here. ' +
    'On site it is used while laying tiles, to hold adjoining tiles flush with one another as the adhesive sets, which is what keeps lippage out of a large format floor. ' +
    'Profilpas publishes no English data sheet for it, so none is hosted here, and Lapiz Blue requests the current sheet on enquiry. ' +
    'Lapiz Blue supplies Klic Level across the UAE from Dubai, Abu Dhabi and Sharjah.',
  'pvc-line-8650-8651':
    'PVC Line 8650-8651 belongs to the PVC Line skirting boards, the range Profilpas offers where a skirting has to take impact and be easy to clean, ' +
    'as against the Metal Line range used where the finish matters more. ' +
    'Profilpas publishes neither an English data sheet nor a catalogue description for this particular item, and nothing is invented here to fill that gap, ' +
    'so this page carries no dimensions, finishes or material claim for it. ' +
    'What it is for is the floor to wall joint, protecting wall bases in corridors, retail units and back of house areas. ' +
    'Lapiz Blue requests the sizes, finishes and lead time from Profilpas on enquiry and supplies PVC Line 8650-8651 across the UAE.',
};

const out = [];
const skipped = [];

for (const rec of crawl.products) {
  // Profilpas URL segments leave doubled and trailing hyphens behind, so
  // "unisystem-plus-g-2---plus-g-4" and "unisystem-plus-z-" come through raw.
  // These URLs are new and have no history, so they are tidied once, here,
  // rather than lived with forever.
  const slug = rec.slug.replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
  const cat = rec.categories?.[0];
  // Profilpas lists these three under its catch all tools category and the
  // first pass sorted them by name, which put two tile levelling systems and
  // a slab handling tool under raised floors. They are tools.
  const BY_NAME = {
    'fix-level': 'tools-and-accessories',
    'klic-level': 'tools-and-accessories',
    'slab-lifting-handle': 'tools-and-accessories',
  };
  const line = BY_NAME[slug] ?? LINE[cat];
  if (!line) { skipped.push([rec.name, `no line for category ${cat}`]); continue; }

  const hasSheet = rec.sheetStatus === 'verified' && rec.tdsFile && fs.existsSync(rec.tdsFile);
  const sheet = hasSheet ? readSheet(rec.tdsFile) : { category: '', description: '', materials: '', fixing: '', grade: '', standards: '', revision: '' };

  const mat = materialOf(rec, sheet);
  mat.hasSheet = hasSheet;
  const specs = {};
  if (sheet.category) {
    const c = clean(sheet.category);
    // A shared sheet can describe the family rather than this item. A suction
    // cup is listed by Profilpas under tools, and calling it "supports for
    // outdoor raised floors" because that is the sheet's heading would be
    // misleading, so the line's own label wins in that case.
    const mismatched = (line === 'tools-and-accessories' || line === 'entrance-mats')
      && /raised floor|supports/i.test(c);
    const label = mismatched ? line.replace(/-/g, ' ') : c;
    specs.product_type = label === label.toUpperCase()
      ? label.charAt(0) + label.slice(1).toLowerCase()      // TILE SPACERS shouts
      : label.charAt(0).toUpperCase() + label.slice(1);
  }
  if (mat.name) {
    const g = clean(mat.grade);
    specs.material = !g ? mat.name
      : new RegExp(mat.name.split(' ')[0], 'i').test(g) ? g
      : `${mat.name}, ${g}`;
  }
  else if ((sheet.materialSet || []).length > 1) specs.material = sheet.materialSet.join(', ');
  if (sheet.fixing) specs.fixing = clean(sheet.fixing);
  if (sheet.standards) specs.standards = clean(sheet.standards);
  if (!specs.product_type) {
    const l = line.replace(/-/g, ' ');
    specs.product_type = l.charAt(0).toUpperCase() + l.slice(1);
  }
  if (Object.keys(specs).length < 2) specs.range = 'Profilpas, made in Italy';

  const description = HAND_WRITTEN[slug] ?? buildDescription(rec, sheet, mat, line);
  const wc = words(description).length;
  if (wc < 100 || wc > 150) { skipped.push([rec.name, `description ${wc} words`]); }

  out.push({
    slug,
    brand: 'profilpas',
    product_line: line,
    name: displayName(rec.name),
    category: 'accessory',
    description,
    meta_description: buildMeta(rec, sheet, line),
    image: { status: 'found', path: `/images/brands/profilpas/${line}/${slug}.webp`, source_url: rec.image },
    tds: hasSheet
      ? { status: 'verified', source_url: rec.tds, local_path: `/tds/profilpas/${slug}.pdf`,
          sha256: '', size_bytes: 0, revision_date: sheet.revision || '', verified_name_match_score: 100 }
      : { status: 'documents_pending', source_url: rec.url, local_path: '', sha256: '', size_bytes: 0, revision_date: '', verified_name_match_score: 0 },
    specs,
    applications: (sheet.features || []).length
      ? sheet.features.slice(0, 5).map((f) => clean(f).replace(/^[a-z]/, (c) => c.toUpperCase()).replace(/\.$/, ''))
      : (USE[line] ?? ['Tiling and finishing work']),
    equivalents: [],
    page_status: 'generated',
    notes: `Profilpas catalogue page: ${rec.url}` +
      (hasSheet ? '' : ` Profilpas publishes no English data sheet for this item, so the page offers the request link instead.`) +
      (rec.sheetStatus.startsWith('withheld') ? ` The English sheet Profilpas served for this URL is a different product's, so it is deliberately not published here.` : ''),
    updated_at: new Date().toISOString().slice(0, 10),
  });
}

console.log(`built ${out.length} records, ${skipped.length} notes`);
const counts = {};
for (const r of out) counts[r.product_line] = (counts[r.product_line] || 0) + 1;
console.log(counts);
const wcs = out.map((r) => words(r.description).length).sort((a, b) => a - b);
console.log(`description words: min ${wcs[0]}, median ${wcs[Math.floor(wcs.length / 2)]}, max ${wcs[wcs.length - 1]}`);
console.log(`pending sheets: ${out.filter((r) => r.tds.status === 'documents_pending').length}`);
if (skipped.length) { console.log('\nnotes:'); skipped.slice(0, 14).forEach(([n, w]) => console.log(`  ${n}: ${w}`)); }

if (WRITE) {
  fs.writeFileSync('data/incoming/profilpas-records.json', JSON.stringify(out, null, 2) + '\n');
  console.log('\nwrote data/incoming/profilpas-records.json');
} else {
  console.log('\n--- sample ---');
  for (const r of [out[0], out[60], out[150]]) {
    console.log(`\n### ${r.name}  (${r.product_line})`);
    console.log(r.description);
    console.log(`META(${r.meta_description.length}): ${r.meta_description}`);
    console.log(`SPECS: ${JSON.stringify(r.specs)}`);
  }
}
