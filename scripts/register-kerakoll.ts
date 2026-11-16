/**
 * Build Kerakoll manifest records from the harvested catalogue.
 *
 * Unlike Saveto, Kerakoll publishes its data sheets openly, so this does the
 * whole job in one pass: downloads the official image, downloads and verifies
 * the technical data sheet, extracts specs from the PDF, and writes the
 * record. Products whose sheet is missing are still registered, as
 * documents_pending, because an accessory without a sheet is still a product
 * someone searches for.
 *
 * It does not write product descriptions. Those are original copy and belong
 * to a content pass.
 *
 * Usage: npx tsx scripts/register-kerakoll.ts [--limit N]
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { getDocumentProxy, extractText } from 'unpdf';
import { slugify } from '../src/lib/slugify';
import type { ManifestRecord, TdsCategory } from '../src/lib/tds';
import { verifyNameInPageText, extractRevisionDate } from './lib/verify';

const REPO = process.cwd();
const BRAND = 'kerakoll';
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');

interface Harvested {
  name: string;
  product_url: string;
  line: string;
  category: string;
  image_url: string;
  tds_url: string;
  classification: string;
  description: string;
}

/**
 * Kerakoll's own category wording mapped onto the product lines this site
 * uses. Matched longest first so a specific phrase wins over a general one.
 */
const LINE_RULES: { match: RegExp; line: string; folder: string; category: TdsCategory }[] = [
  { match: /waterproofing/i, line: 'waterproofing', folder: 'waterproofing', category: 'waterproofing' },
  { match: /grout|grouting/i, line: 'tile-adhesives-and-grouts', folder: 'tile-adhesives', category: 'cementitious_grout' },
  { match: /gel adhesive|adhesives for ceramic|mineral and organic adhesives/i, line: 'tile-adhesives-and-grouts', folder: 'tile-adhesives', category: 'tile_adhesive' },
  { match: /hardwood|resilient|textile/i, line: 'flooring-systems', folder: 'flooring', category: 'resilient_adhesive' },
  { match: /self.?level|screed|smoothing/i, line: 'flooring-systems', folder: 'flooring', category: 'self_leveling' },
  { match: /sealant/i, line: 'sealants-and-joints', folder: 'sealants', category: 'sealant' },
  { match: /primer|preparation coating/i, line: 'flooring-systems', folder: 'flooring', category: 'primer' },
  { match: /lime.based|plaster|render|mineral mortar/i, line: 'plasters-and-masonry', folder: 'plasters', category: 'plaster' },
  { match: /paint|covering|coating/i, line: 'surface-treatments', folder: 'surface-treatments', category: 'surface_treatment' },
  { match: /repair|structural|reinforc/i, line: 'grouts-and-concrete-repair', folder: 'grouts-repair', category: 'repair_mortar' },
  { match: /accessor|spacer|sponge|spreader/i, line: 'tile-adhesives-and-grouts', folder: 'tile-adhesives', category: 'tile_adhesive' },
];

function routeFor(h: Harvested) {
  const text = `${h.category} ${h.line} ${h.classification}`;
  for (const rule of LINE_RULES) if (rule.match.test(text)) return rule;
  return { line: 'tile-adhesives-and-grouts', folder: 'tile-adhesives', category: 'tile_adhesive' as TdsCategory };
}

/**
 * Pull the figures Kerakoll states, from the sheet text.
 *
 * Their sheets use a consistent shape: a label, a colon, then either a value
 * or a set of dashed variant lines.
 *
 *   Coverage per mm thickness:
 *   - Grey (mixing ratio 32%) = 1.25 kg/m2
 *   Open time at +23 C:
 *   - Grey = 30 min. EN 12004-2
 *
 * So each field is read by its label and the first value that follows it.
 * Everything is passed through tidy(), which replaces the approximately sign
 * and the en dashes Kerakoll uses in ranges, because the manifest gate
 * rejects en and em dashes outright.
 */
const tidy = (v: string) =>
  v
    .replace(/[\u2248~]/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00b0/g, ' deg ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s:=-]+/, '')
    .replace(/[\s.;]+$/, '')
    .trim();

/** First value following a label, skipping variant bullets. */
function after(text: string, label: RegExp, max = 90): string | undefined {
  // The label may contain an alternation, so it is wrapped before the value
  // group is appended, or the alternation would swallow the rest of the pattern.
  const m = text.match(new RegExp('(?:' + label.source + ')\\s*:?\\s*([^\\n]{1,' + max + '})', 'i'));
  if (!m) return undefined;
  const v = tidy(m[1]);
  return v.length >= 2 ? v.slice(0, 120) : undefined;
}

function specsFrom(text: string, h: Harvested): Record<string, string> {
  const t = text.replace(/\r/g, '').replace(/[ \t]+/g, ' ');
  const out: Record<string, string> = {};

  if (h.classification) out.product_type = tidy(h.classification).slice(0, 180);

  // Classification codes appear against their standard.
  const cls =
    t.match(/\b(C[12]\s?[A-Z]{1,3}\s?S[12])\b/) ??
    t.match(/\b(C[12]\s?[A-Z]{1,3})\b/) ??
    t.match(/\b(CG\s?[12]\s?[A-Z]{0,2}|RG|R2T)\b/) ??
    t.match(/\b(EN\s?1504-\d)\b/) ??
    t.match(/\b(CT\s?C\d{1,3}\s?F\d{1,2})\b/);
  if (cls) out.classification = tidy(cls[1]).toUpperCase();

  // A pack size must carry a quantity. Reading the line after "Packaging"
  // blindly picked up storage warnings, so the value has to match a number
  // and a unit or it is not a pack size.
  // Kerakoll label the field "Pack", not "Packaging". The longer word also
  // appears inside the shelf life sentence, so it must not be matched first.
  const packLine = after(t, /\bPack\b(?!aging)/, 60);
  const packPattern = /(\d+(?:[.,]\d+)?)\s*(kg|g|ml|l|lt|ltr|litres?|liters?)\b\s*(bags?|pails?|buckets?|cans?|drums?|cartridges?|tubs?|sausages?|rolls?|units?|pcs)?/i;
  // Only the packaging line counts. Searching the whole sheet found the first
  // number and unit anywhere, which was usually the coverage rate, and a wrong
  // pack size on a product page is worse than none.
  const packMatch = packLine ? packLine.match(packPattern) : null;
  if (packMatch) {
    const unit = packMatch[2].toLowerCase().replace(/^lt?r?$|^liters?$/, 'litre');
    out.pack_size = tidy(`${packMatch[1].replace(',', '.')} ${unit}${packMatch[3] ? ' ' + packMatch[3].toLowerCase() : ''}`);
  }

  // Coverage. Kerakoll states it per millimetre for most mortars.
  const perMm = t.match(/Coverage per mm thickness[^\n]*\n?[^\n]*?(\d+(?:[.,]\d+)?)\s*kg\/m\s*2/i);
  if (perMm) out.coverage = `${perMm[1].replace(',', '.')} kg/m2 per mm`;
  else {
    const flat = t.match(/Coverage[^\n]{0,40}?(\d+(?:[.,]\d+)?(?:\s*-\s*\d+(?:[.,]\d+)?)?)\s*(kg|l|ml)\s*\/\s*m\s*2/i);
    if (flat) out.coverage = tidy(`${flat[1]} ${flat[2]}/m2`);
  }

  const mix = t.match(/mixing ratio[^\n]{0,20}?(\d+(?:[.,]\d+)?\s*%)/i) ?? t.match(/(\d+(?:[.,]\d+)?\s*%)\s*(?:water|mixing)/i);
  if (mix) out.mixing_ratio = tidy(mix[1]);

  const open = t.match(/Open time[^\n]*\n?[^\n]*?(\d+(?:\s*-\s*\d+)?\s*(?:min|minutes|h|hours))/i);
  if (open) out.open_time = tidy(open[1]);

  const pot = t.match(/(?:Pot life|Workability|Working time)[^\n]*\n?[^\n]*?(\d+(?:\s*-\s*\d+)?\s*(?:min|minutes|h|hours))/i);
  if (pot) out.pot_life = tidy(pot[1]);

  const adjust = t.match(/Adjustability[^\n]*\n?[^\n]*?(\d+(?:\s*-\s*\d+)?\s*(?:min|minutes|h|hours))/i);
  if (adjust) out.adjustment_time = tidy(adjust[1]);

  const foot = t.match(/(?:Foot traffic|Set to light foot traffic|Ready for use)[^\n]*\n?[^\n]*?(\d+(?:\s*-\s*\d+)?\s*(?:h|hours|days?))/i);
  if (foot) out.set_time = tidy(foot[1]);

  const shelf = t.match(/(?:Shelf life|Storage)[^\n]{0,60}?(\d+\s*months?)/i);
  if (shelf) out.storage_shelf_life = tidy(shelf[1]);

  const temp = t.match(/(?:Application temperature|Temperature range)[^\n]{0,40}?([+\-]?\d+\s*(?:deg|\u00b0)?\s*C\s*(?:to|-|\/)\s*[+\-]?\d+\s*(?:deg|\u00b0)?\s*C)/i);
  if (temp) out.application_temperature = tidy(temp[1]);

  const thick = t.match(/(?:Thickness|applied at)[^\n]{0,40}?(\d+(?:[.,]\d+)?\s*(?:-|to)\s*\d+(?:[.,]\d+)?\s*mm)/i);
  if (thick) out.thickness = tidy(thick[1]);

  const colours = after(t, /Appearance|Colours?/, 60);
  if (colours && !/^\d/.test(colours)) out.colours = colours;

  return out;
}

async function get(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const limitArg = process.argv.indexOf('--limit');
  const limit = limitArg === -1 ? 0 : Number(process.argv[limitArg + 1]);

  const cat: { products: Harvested[] } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'data', 'discovery', 'kerakoll-catalogue.json'), 'utf8'),
  );
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);

  const items = limit ? cat.products.slice(0, limit) : cat.products;
  let created = 0, refreshed = 0, images = 0, sheets = 0, nameFails = 0;

  for (const [i, h] of items.entries()) {
    const slug = slugify(h.name);
    const route = routeFor(h);

    // Image
    const imgRel = `/images/brands/kerakoll/${route.folder}/${slug}.webp`;
    const imgAbs = path.join(REPO, 'public', imgRel.replace(/^\//, ''));
    let hasImage = fs.existsSync(imgAbs);
    if (!hasImage && h.image_url) {
      const buf = await get(h.image_url);
      if (buf) {
        fs.mkdirSync(path.dirname(imgAbs), { recursive: true });
        await sharp(buf)
          .resize(600, 600, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .webp({ quality: 90, effort: 6 })
          .toFile(imgAbs);
        hasImage = true;
        images++;
      }
    }

    // Technical data sheet
    let tds: ManifestRecord['tds'] = {
      status: 'documents_pending',
      source_url: h.product_url,
      local_path: '',
      sha256: '',
      revision_date: '',
      verified_name_match_score: 0,
    };
    let sheetSpecs: Record<string, string> = {};

    if (h.tds_url) {
      const pdfRel = `/tds/${BRAND}/${slug}.pdf`;
      const pdfAbs = path.join(REPO, 'public', pdfRel.replace(/^\//, ''));
      let buf: Buffer | null = fs.existsSync(pdfAbs) ? fs.readFileSync(pdfAbs) : await get(h.tds_url);

      if (buf && buf.subarray(0, 4).toString() === '%PDF') {
        const pdf = await getDocumentProxy(new Uint8Array(buf));
        const { text: pages } = await extractText(pdf, { mergePages: false });
        const page1 = Array.isArray(pages) ? pages[0] : String(pages);
        const full = Array.isArray(pages) ? pages.join('\n') : String(pages);
        const check = verifyNameInPageText(h.name, page1);

        // The same gate the other brands use: a sheet filed against the wrong
        // product is worse than none, because someone will mix to it.
        if (check.score >= 90 && !check.suffixTrap) {
          fs.mkdirSync(path.dirname(pdfAbs), { recursive: true });
          fs.writeFileSync(pdfAbs, buf);
          tds = {
            status: 'verified',
            source_url: h.tds_url,
            local_path: pdfRel,
            sha256: crypto.createHash('sha256').update(buf).digest('hex'),
            size_bytes: buf.length,
            revision_date: extractRevisionDate(full),
            verified_name_match_score: check.score,
          };
          sheetSpecs = specsFrom(full, h);
          sheets++;
        } else {
          nameFails++;
          tds.source_url = h.product_url;
        }
      }
    }

    const specs = { ...specsFrom('', h), ...sheetSpecs };
    const existing = manifest.find((r) => r.brand === BRAND && r.slug === slug);

    if (existing) {
      existing.product_line = route.line;
      existing.category = route.category;
      existing.specs = { ...existing.specs, ...specs };
      if (specs.classification) existing.classification = specs.classification;
      if (tds.status === 'verified') existing.tds = tds;
      if (hasImage) existing.image = { status: 'found', path: imgRel, source_url: h.image_url };
      existing.updated_at = now;
      refreshed++;
    } else {
      manifest.push({
        slug,
        brand: BRAND,
        product_line: route.line,
        name: h.name,
        category: route.category,
        classification: specs.classification ?? '',
        description: '',
        meta_description: '',
        image: hasImage
          ? { status: 'found', path: imgRel, source_url: h.image_url }
          : { status: 'missing', path: imgRel, source_url: '' },
        tds,
        specs,
        applications: [],
        equivalents: [],
        page_status: 'pending',
        notes: `Catalogue page: ${h.product_url}`,
        updated_at: now,
      });
      created++;
    }

    if ((i + 1) % 10 === 0 || i === items.length - 1) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
      console.log(`  ${i + 1}/${items.length}  images ${images}, sheets ${sheets}, name checks failed ${nameFails}`);
    }
    await sleep(250);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    `\n${BRAND}: ${created} created, ${refreshed} refreshed, ${images} images, ${sheets} verified data sheets, ${nameFails} sheets rejected on the name check.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
