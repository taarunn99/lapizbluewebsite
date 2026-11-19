/*
  Pull the facts out of a Profilpas sheet.

  Profilpas ships two sheet formats. The older one uses title case headings
  (Description, Materials, Fixing) and a footer reading "dd.mm.yy | Category |
  Product". The 2026 rewrite uses capitalised headings (DESCRIPTION, FEATURES
  AND BENEFITS, MATERIALS, INSTALLATION) and a plain dd/mm/yyyy date. Both are
  read here, because only handling the first left a third of the range with
  almost nothing to say.

  Nothing in here guesses. A field the sheet does not state comes back empty.

  Runnable on one file to eyeball it:
    node scripts/profilpas/extract.mjs <pdf>
*/
import { execFileSync } from 'child_process';

const CHROME = /profilpas s\.p\.a|via einstein|^italy$|^tel\.|^fax\.|^email:|^\d+\/\d+$|price list catalogue/i;

/** Every heading either format uses, so a section knows where to stop. */
const HEADINGS = [
  'description', 'features and benefits', 'materials', 'material',
  'fixing', 'installation', 'care and maintenance', 'maintenance',
  'general note on metals', 'general note', 'accessories', 'packaging',
  'technical specifications', 'warnings', 'certifications',
];

const isHeading = (t) => {
  const k = t.trim().toLowerCase().replace(/[^a-z ]/g, '').trim();
  return HEADINGS.includes(k) || /^fixing with |^mechanical fixing|^installation with /i.test(t.trim());
};

export function readSheet(file) {
  const raw = execFileSync('pdftotext', ['-layout', file, '-'], {
    encoding: 'utf8', timeout: 60000, maxBuffer: 40 * 1024 * 1024,
  });
  const lines = raw.split('\n').map((l) => l.replace(/\s+$/, ''));
  const body = lines.filter((l) => l.trim() && !CHROME.test(l.trim()));

  // Revision date and category. Old format puts both in the footer; the new
  // one prints the date alone and the category above the description.
  let revision = '', category = '', name = '';
  for (const l of lines) {
    const m = l.trim().match(/^(\d{2})\.(\d{2})\.(\d{2})\s*\|\s*([^|]+?)\s*\|\s*(.+?)\s*\d*$/);
    if (m) { revision = `${m[1]}.${m[2]}.20${m[3]}`; category = m[4].trim(); name = m[5].trim(); break; }
  }
  if (!revision) {
    const m = raw.match(/\b(\d{2})\/(\d{2})\/(\d{4})\b/);
    if (m) revision = `${m[1]}.${m[2]}.${m[3]}`;
  }
  if (!category) {
    // In the 2026 format the category sits just above DESCRIPTION, but the
    // same slot can hold a wrapped sentence from the page above it. Only take
    // a line that actually reads like a category: a short noun phrase ending
    // in the kind of thing Profilpas makes, and never one that is clearly the
    // tail of a sentence.
    const i = body.findIndex((l) => isHeading(l) && /description/i.test(l));
    const looksLikeCategory = (t) =>
      t.length > 5 && t.length < 70 &&
      !/[.,;:]$/.test(t) &&
      !/^(and|or|for|with|the|to|in|of)\b/i.test(t) &&
      /(profiles?|boards?|drains?|floors?|mats?|systems?|supports?|trims?|joints?|accessories|skirting|nosing|spacers?|tools?)\s*$/i.test(t);
    for (let j = i - 1; j >= 0 && j > i - 6; j--) {
      const t = body[j].trim();
      if (looksLikeCategory(t)) { category = t; break; }
    }
    if (!name && i >= 1) name = body[i - 1].trim();
  }

  const section = (names) => {
    const i = body.findIndex((l) => {
      const k = l.trim().toLowerCase().replace(/[^a-z ]/g, '').trim();
      return names.includes(k);
    });
    if (i < 0) return '';
    const out = [];
    for (let j = i + 1; j < body.length; j++) {
      if (isHeading(body[j])) break;
      out.push(body[j].trim());
      if (out.join(' ').length > 1600) break;
    }
    return out.join(' ').replace(/\s+/g, ' ').trim();
  };

  const description = section(['description']);
  const materials = section(['materials', 'material']);

  // Bullet points, the single most useful thing the 2026 sheets added.
  const featuresRaw = section(['features and benefits']);
  const features = featuresRaw
    .split(/\s*▪\s*|\s*•\s*|\s*●\s*/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length > 14 && s.length < 180);

  const fixing = [...new Set(
    body.filter((l) => /^Fixing with |^Mechanical fixing|^Installation with /i.test(l.trim()))
        .map((l) => l.trim().replace(/^Installation with/i, 'Fixing with'))
  )].join(', ');

  const materialSet = [];
  if (/stainless steel|AISI\s*3\d{2}/i.test(materials)) materialSet.push('stainless steel');
  if (/anodi[sz]ed aluminium|colour\s*-?\s*coated aluminium|Al-Mg-Si|6060\s*T\d/i.test(materials)) materialSet.push('aluminium');
  if (/\bbrass\b/i.test(materials)) materialSet.push('brass');
  if (/\bPVC\b/i.test(materials)) materialSet.push('PVC');
  if (/\bpolycarbonate\b/i.test(materials)) materialSet.push('polycarbonate');

  const aisi = (materials.match(/AISI\s*3\d{2}\s*(?:-\s*DIN\s*1\.\d{4})?/i) || [])[0] || '';
  const alloy = (materials.match(/Al-Mg-Si[^.]{0,40}?\(\s*6060\s*T\d\s*\)|6060\s*T\d/i) || [])[0] || '';
  const grade = materialSet.length === 1 ? (aisi || alloy || '') : '';

  const standards = [...new Set(
    [...raw.matchAll(/\b(DIN\s*\d{4,5}(?:-\d)?|UNI\s*EN\s*\d{3,5}|EN\s*\d{3,5}(?:-\d)?|ISO\s*\d{3,5})\b/g)].map((m) => m[0].replace(/\s+/g, ' '))
  )].slice(0, 4).join(', ');

  return { category, name, description, materials, materialSet, features, fixing, grade, standards, revision };
}

if (process.argv[1]?.endsWith('extract.mjs') && process.argv[2]) {
  const r = readSheet(process.argv[2]);
  for (const [k, v] of Object.entries(r)) {
    console.log(`${k.padEnd(12)} ${(Array.isArray(v) ? v.join(' | ') : String(v)).slice(0, 230)}`);
  }
}
