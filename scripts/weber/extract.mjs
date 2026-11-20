/*
  Read the facts out of a Weber (Saint-Gobain) technical data sheet.

  Weber sets its brand as a logo, so pdftotext sees "col Pro" where the page
  reads "webercol Pro", and "ad 225 MB" for "weberad 225 MB". Everything here
  allows for that rather than relying on the product name being present.

  Every sheet carries the same blocks: the product line in the top right, a
  PRODUCT paragraph, SCOPE OF USE, a CHARACTERISTICS table, a PACKAGING table
  broken down by country, TEST RESULTS and APPLICABLE STANDARDS. The UAE
  column of the packaging table is the pack we actually sell.

  node scripts/weber/extract.mjs <pdf>
*/
import { execFileSync } from 'child_process';

const LINES = ['TILE FIXING','WATERPROOFING','TECHNICAL PRODUCTS','FLOORING','FACADE',
  'PREMIXED PLASTERS','MOUNTING MORTARS','ADMIXTURES','SEALANTS','TILE SETTING'];

export function readSheet(file) {
  const raw0 = execFileSync('pdftotext', ['-layout', file, '-'],
    { encoding: 'utf8', timeout: 60000, maxBuffer: 40 * 1024 * 1024 });
  const raw = raw0;
  /**
   * Weber sets its own name as a logo glyph, which pdftotext returns as the
   * control character 0x1f. Left alone the sheets read "col Pro" and
   * "ad 225 MB". Putting the word back is what makes the prose usable.
   */
  const restored = raw.replace(/\x1f\s?/g, 'weber');
  const lines = restored.split('\n');
  const flat = restored.replace(/\s+/g, ' ');

  const category = LINES.find((l) => new RegExp(l.replace(/ /g, '\\s+'), 'i').test(raw)) || '';

  // The first line carries "<product>   <CATEGORY>"; the product half is the
  // name minus the weber logo.
  const first = (lines.find((l) => l.trim()) || '').trim();
  const stem = first.replace(new RegExp(`\\s*(${LINES.join('|')})\\s*$`, 'i'), '').trim();

  /**
   * Weber prints two columns. pdftotext keeps them on one line separated by a
   * run of spaces, so reading the whole line pulls the right column into the
   * prose and "ANSI A118.4" arrives as a stray "A". Taking only the left of
   * the first wide gap keeps each column to itself.
   */
  /**
   * Where the right hand column starts, found once for the whole sheet rather
   * than guessed per line. Guessing per line fails because the weber logo is
   * an image, so "ANSI A118.4. webercol Pro" comes back with a gap in the
   * middle of a sentence and a per line split cuts the sentence in half.
   */
  const gapAt = (() => {
    const tally = new Map();
    for (const l of lines) {
      for (const m of l.matchAll(/\s{4,}\S/g)) {
        const col = m.index + m[0].length - 1;
        if (col > 45) tally.set(col, (tally.get(col) || 0) + 1);
      }
    }
    let best = 0, n = 0;
    for (const [col, c] of tally) if (c > n) { best = col; n = c; }
    return n >= 6 ? best - 4 : 999;        // only trust a divider the page repeats
  })();
  const leftOf = (line) => line.slice(0, gapAt).replace(/\s+$/, '').trim();

  const block = (name, stops) => {
    const i = lines.findIndex((l) => new RegExp(`^\\s*${name}\\b`, 'i').test(l));
    if (i < 0) return '';
    const out = [];
    for (let j = i + 1; j < lines.length; j++) {
      const t = leftOf(lines[j]);
      if (!t) continue;
      if (stops.some((s) => new RegExp(`^${s}\\b`, 'i').test(t))) break;
      if (/^\d\/\d Technical data sheet|^www\./i.test(t)) continue;
      out.push(t);
      if (out.join(' ').length > 1500) break;
    }
    return tidy(out.join(' '));
  };

  /**
   * Weber prints sub headings in capitals on the same line as the text that
   * follows, so a block arrives as "...water retention. PRODUCT weberbloc fix
   * is...". Those headings and the packaging table's country row are page
   * furniture, not sentences, and neither belongs in a description.
   */
  function tidy(text) {
    return String(text)
      .replace(/\b(PRODUCT PREPARATION|SUBSTRATE PREPARATION|SURFACE PREPARATION|INSTRUCTIONS FOR USE|SCOPE OF USE|APPLICABLE STANDARDS|TEST RESULTS|CHARACTERISTICS|PACKAGING|CONSUMPTION|COVERAGE|PROPERTIES|ADVANTAGES|APPLICATION|PRECAUTIONS|DISCLAIMER|STORAGE|CLEANING|ADMISSIBLE SUBSTRATES|ADMISSIBLE SUPPORTS|FIELD OF USE|PRODUCT|YIELD|NOTE)\b\s*/g, ' ')
      .replace(/\b(Leb|Lebanon)\b[^.]{0,80}?\b(Oman|KSA|Kuwait)\b/gi, ' ')
      // Bullet markers read as debris in a paragraph. The clause itself is
      // real copy, so the marker goes and the clause is punctuated.
      .replace(/\s*[•▪●]\s*/g, '; ')
      // Tighten spacing before punctuation first, or the rule below never
      // sees the semicolon it is meant to remove.
      .replace(/\s+([.,;:])/g, '$1')
      .replace(/;\s*;/g, ';')
      .replace(/([.!?])\s*;\s*/g, '$1 ')
      .replace(/^\s*;\s*/, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const STOPS = ['SCOPE OF USE','CHARACTERISTICS','PACKAGING','TEST RESULTS','APPLICABLE STANDARDS',
    'INSTRUCTIONS FOR USE','PRODUCT PREPARATION','SURFACE PREPARATION','PRECAUTIONS','STORAGE','ADVANTAGES'];
  const description = block('PRODUCT', STOPS.filter((s) => s !== 'PRODUCT'));
  const scope = block('SCOPE OF USE', STOPS);
  const advantages = block('ADVANTAGES', STOPS);

  /**
   * A catch all for the sheets that head their sections differently. Takes
   * every line in the left column that reads like prose rather than a table
   * row or a heading, so there is always something real to draw on.
   */
  const allProse = lines
    .map((l) => leftOf(l))
    .filter((t) => t.length > 34 && /[a-z]{4}/.test(t)
      && !/^[A-Z][A-Z0-9 /&-]{3,}$/.test(t)
      && !/^\d\/\d |^www\.|Saint Gobain|unauthorized disclosure|prior notice|legal pursuit/i.test(t)
      && (t.match(/\s/g) || []).length > 5
      // the packaging table's country header is a row of place names, not prose
      && !/\b(Leb|Lebanon)\b.*\b(UAE|KSA|Oman|Qatar|Kuwait)\b/i.test(t)
      // and a table row is mostly numbers and units
      && (t.replace(/[^A-Za-z]/g, '').length / t.length) > 0.55)
    .join(' ')
    .replace(/\s+/g, ' ')
    // A heading sits on the same line as the sentence under it on some sheets,
    // so "PRODUCT weberbloc fix is..." arrives as one string. Drop the heading.
    .replace(/\b(PRODUCT|SCOPE OF USE|CHARACTERISTICS|ADVANTAGES|CONSUMPTION|COVERAGE|PACKAGING|STORAGE|INSTRUCTIONS FOR USE|SURFACE PREPARATION|PRODUCT PREPARATION|APPLICATION|CLEANING|PRECAUTIONS|YIELD|NOTE|DISCLAIMER)\b\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 3000);
  const howto = block('INSTRUCTIONS FOR USE', ['STORAGE','SAFETY','PRECAUTIONS','NOTE','DISCLAIMER','PACKAGING','CLEANING','CONSUMPTION']);

  /**
   * The CHARACTERISTICS table is two columns of label then value, printed
   * beside an unrelated right hand column. Reading it line by line and
   * cutting at the run of spaces keeps the pairs together.
   */
  /**
   * The CHARACTERISTICS table sits in the left column on some sheets and the
   * right on others, so it is found wherever it is and then read from its own
   * column onward. Reading whole lines instead pulls in whatever the other
   * column happens to say on the same row.
   */
  function tableFrom(heading) {
    const i = lines.findIndex((l) => new RegExp(`\\b${heading}\\b`, 'i').test(l));
    if (i < 0) return {};
    const col = Math.max(0, lines[i].search(new RegExp(heading, 'i')) - 1);
    const found = {};
    let carry = '';
    for (let j = i + 1; j < Math.min(i + 46, lines.length); j++) {
      const seg = lines[j].slice(col);
      const t = seg.replace(/\s+$/, '');
      if (!t.trim()) { if (Object.keys(found).length) continue; else continue; }
      if (/^\s*(PACKAGING|TEST RESULTS|APPLICABLE|INSTRUCTIONS|CONSUMPTION|NOTE|PRECAUTIONS|STORAGE|www\.|\d\/\d Technical)/i.test(t)) break;
      const m = t.match(/^\s{0,10}([A-Za-z][A-Za-z0-9 ()%°±.,/*+><=-]{2,44}?)\s{2,}(.+?)\s*$/);
      if (m) {
        let [, k, v] = m;
        k = (carry ? carry + ' ' : '') + k.replace(/\*/g, '').trim();
        carry = '';
        v = v.split(/\s{6,}/)[0].trim();
        if (v && v.length <= 90) found[k.trim()] = v;
      } else if (/^\s{0,10}[a-z]/.test(t) && Object.keys(found).length) {
        // a label that wrapped onto its own line, like "at standard condition"
        const keys = Object.keys(found);
        const last = keys[keys.length - 1];
        if (t.trim().length < 46) found[last + ' ' + t.trim()] = found[last], delete found[last];
      }
    }
    return found;
  }

  const specs = { ...tableFrom('CHARACTERISTICS'), ...tableFrom('TECHNICAL DATA'), ...tableFrom('PROPERTIES') };

  /**
   * Consumption is a table row on some sheets and its own heading on others,
   * with the figure on the line below it in the same column.
   */
  function blockValue(heading) {
    const i = lines.findIndex((l) => new RegExp(`^\\s*${heading}\\s*$|\\s{3,}${heading}\\s*$`, 'i').test(l));
    if (i < 0) return '';
    const col = Math.max(0, lines[i].search(new RegExp(heading, 'i')) - 1);
    const out = [];
    for (let j = i + 1; j < Math.min(i + 7, lines.length); j++) {
      const t = lines[j].slice(col).split(/\s{6,}/)[0].trim();
      if (!t) { if (out.length) break; else continue; }
      if (/^[A-Z][A-Z ]{3,}$/.test(t)) break;
      out.push(t);
      if (out.join(' ').length > 150) break;
    }
    return out.join(' ').replace(/\s+/g, ' ').trim();
  }

  // The UAE column of the packaging table is the pack we actually sell here.
  let pack = '';
  const pi = lines.findIndex((l) => /\bLeb\b.*\bUAE\b/i.test(l));
  if (pi >= 0) {
    const col = lines[pi].indexOf('UAE');
    for (let j = pi + 1; j < Math.min(pi + 5, lines.length); j++) {
      const near = lines[j].slice(Math.max(0, col - 9), col + 13).replace(/\s+/g, ' ').trim();
      const m = near.match(/\d+(?:\.\d+)?\s*(kg|kgs|l|lt|ltr|litre)\b/i);
      if (m) { pack = m[0]; break; }
    }
  }
  if (!pack) pack = (flat.match(/\b\d+(?:\.\d+)?\s*(?:kg|ltr|lt|l)\s*(?:bag|pail|drum|sack|can|kit)/i) || [''])[0];
  if (!pack) pack = specs['Packaging'] || specs['Pack'] || '';

  const standards = [...new Set((flat.match(/\b(?:EN|ISO|ANSI|ASTM|BS)\s?[A-Z]?\s?\d{3,5}(?:[-:]\d{1,4})?/g) || []))].slice(0, 6).join(', ');
  const classification = (flat.match(/\b(C[12]\s?T?E?\s?S[12]?|C[12]TE?S?[12]?|R[12]\s?T?|D[12]\s?TE?)\b(?=\s|,|\.)/) || [''])[0].trim();
  const edition = (flat.match(/Edition:\s*([\w.\-]+)/i) || [,''])[1];

  return { category, stem, description, scope, advantages, howto, allProse, specs, pack, standards, classification, edition,
           coverage: specs['Coverage'] || specs['Consumption'] || specs['Yield']
                     || blockValue('CONSUMPTION') || blockValue('COVERAGE') || blockValue('YIELD') || '' };
}

if (process.argv[1]?.endsWith('extract.mjs') && process.argv[2]) {
  const r = readSheet(process.argv[2]);
  for (const [k, v] of Object.entries(r)) {
    if (k === 'specs') { console.log('specs:'); for (const [a,b] of Object.entries(v)) console.log(`   ${a} = ${b}`); }
    else console.log(`${k.padEnd(14)} ${String(v).slice(0, 190)}`);
  }
}
