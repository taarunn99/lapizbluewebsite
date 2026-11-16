/**
 * Turn the Zoho Books item list into a product list.
 *
 * Zoho holds stock keeping units, not products. "KERABOND T 25KG WHITE MAPEI"
 * and "KERABOND T 25KG GREY MAPEI" are two SKUs of one product that needs one
 * page. This collapses the variants, keeps the pack sizes and colours it saw
 * as attributes of the product, and writes one discovery file per brand.
 *
 * Usage: npx tsx scripts/zoho-products.ts
 */

import fs from 'node:fs';
import path from 'node:path';

interface ZohoItem {
  item_id: string;
  name: string;
  brand?: string;
  rate?: number;
  stock_on_hand?: number;
  cf_product_type?: string;
  cf_category?: string;
  sku?: string;
}

/**
 * Product families per brand. Matching on the family word rather than the
 * brand field, because the brand field is populated on only a minority of
 * records while the product name always carries the family.
 */
const FAMILIES: Record<string, string[]> = {
  mapei: [
    'KERABOND', 'KERAFLEX', 'KERAPOXY', 'KERACOLOR', 'KERALASTIC', 'KERAQUICK', 'KERASET',
    'KERACRETE', 'KERADEFENSE', 'KERAFLOOR',
    'ULTRACOLOR', 'ULTRABOND', 'ULTRALITE', 'ULTRAPLAN', 'ULTRATOP', 'ULTRACARE',
    'MAPELASTIC', 'MAPEGROUT', 'MAPEFER', 'MAPEFLEX', 'MAPEBAND', 'MAPEGUM', 'MAPEPROOF',
    'MAPESIL', 'MAPEFILL', 'MAPEWRAP', 'MAPEFLOOR', 'MAPECOAT', 'MAPEFINISH', 'MAPETARD',
    'MAPESEAL', 'MAPEPLAST', 'MAPEQUICK', 'MAPEAIR', 'MAPELUX', 'MAPEPLAN', 'MAPENET',
    'MAPEDRAIN', 'MAPETEX', 'MAPEHEAT', 'MAPESONIC', 'MAPESTOP', 'MAPEGUARD',
    'PLANITOP', 'PLANICRETE', 'PLANISEAL', 'PLANIPATCH', 'PLANIBOND', 'PLANIPREP',
    'ADESILEX', 'TOPCEM', 'NIVORAPID', 'ECO PRIM', 'PRIMER G', 'IDROSILEX',
    'SILANCOLOR', 'ELASTOCOLOR', 'DURSILITE', 'QUARZOLITE', 'MONOFINISH', 'LAMPOSILEX',
    'FUGOLASTIC', 'GRANIRAPID', 'DYNAMON', 'ANTIPLUVIOL', 'KERABUILD', 'MAPEI',
  ],
  kerakoll: [
    'BIOGEL', 'FUGABELLA', 'FUGALITE', 'AQUASTOP', 'NANOFLEX', 'NANODEFENSE', 'AQUAFLEX',
    'GEOLITE', 'KERABUILD ECO', 'SLC ', 'H40', 'KERAKOLL', 'BIOCALCE', 'TEXBOND',
    'KERALASTIC T', 'RASOBUILD', 'KLIMAEXPERT', 'LEGANTE',
  ],
};

/** Pack sizes, containers, colours and noise that distinguish a SKU but not a product. */
const NOISE = [
  // "(box of 4)" and similar parentheticals first.
  /\(.*?\)/g,
  // Sizes.
  /\b\d+(?:\.\d+)?\s*(?:KG|KGS|GM|GMS|G|L|LT|LTR|LTRS|LITER|LITRE|LITERS|LITRES|ML|CC|MT|CM|MM|PCS|PC|NOS|SQM|SHEET)\b/gi,
  // Containers. "unit", "un.", "fust." and the rest describe the pack, not the product.
  /\b(?:UNIT|UNITS|UN|FUST|FUSTINI|FUSTINO|FS|BUCKET|BUCKETS|BAG|BAGS|PAIL|PAILS|DRUM|DRUMS|JERRYCAN|JERRY\s*CAN|CAN|CANS|TIN|TINS|TUBE|TUBES|SAUSAGE|SAUSAGES|CARTRIDGE|BOX|BOXES|CARTON|SACK|ROLL|ROLLS|SET|KIT|IBC|BULK|LOOSE|PART\s*[AB]|COMP\s*[AB]|[AB]\s*PART)\b\.?/gi,
  // RAL references are colour choices on the same product.
  /\bRAL\s*\d{3,4}\b/gi,
  // Colours.
  /\b(?:WHITE|GREY|GRAY|BLACK|BEIGE|IVORY|SAND|SILVER|ANTHRACITE|BROWN|CREAM|MANHATTAN|JASMINE|BAHAMA|CARAMEL|CHOCOLATE|MOON|SMOKE|VOLCANO|CEMENT|TORNADO|MUD|TITANIUM|BLUE|GREEN|RED|YELLOW|PINK|ORANGE|GOLD|BRONZE|COPPER|TRANSPARENT|CLEAR|NATURAL|NEUTRAL|CONDUCTIVE)\b/gi,
  /\bNO\.?\s*\d+\b/gi,
  /\b(?:MAPEI|KERAKOLL|LATICRETE|WEBER|FILA|PROFILPAS)\b/gi,
  /\b(?:UAE|DUBAI|IMPORTED|LOCAL|OFFER|PROMO|EXPIRED|SAMPLE|DEMO)\b/gi,
  /[-\u2013\u2014_,;:/]+/g,
];

function productName(raw: string): string {
  let s = ' ' + raw.toUpperCase() + ' ';
  for (const re of NOISE) s = s.replace(re, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

/** Title case, preserving short codes such as T, S1, S2, R2, 2K. */
function pretty(s: string): string {
  return s
    .split(' ')
    .map((w) => {
      if (/^\d/.test(w) || w.length <= 2 || /^(S[12]|R[12]|2K|1K|HP|LV|SP|WA|AE)$/i.test(w)) return w.toUpperCase();
      return w.charAt(0) + w.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Names that contain a family word but are not that manufacturer's product.
 * "BITUMEN ULTRABOND" and "JOTASHEILD ULTRABOND FILLER" are other suppliers'
 * goods that happen to share a word.
 */
const NOT_OURS = /\b(BITUMEN|JOTASHEILD|JOTASHIELD|JOTUN|DRAIN VERTICAL|ADAPTER|BLADE|TROWEL|SPATULA|GUN|NOZZLE|MIXER|BUCKET ONLY|SPARE)\b/i;

function familyOf(name: string, brand: string): string | null {
  if (NOT_OURS.test(name)) return null;
  const upper = name.toUpperCase();
  for (const fam of FAMILIES[brand]) if (upper.includes(fam)) return fam;
  return null;
}

function main() {
  const items: ZohoItem[] = JSON.parse(fs.readFileSync('/tmp/zoho-items.json', 'utf8'));
  const outDir = path.join(process.cwd(), 'data', 'discovery');
  fs.mkdirSync(outDir, { recursive: true });

  for (const brand of Object.keys(FAMILIES)) {
    const matched = items.filter((i) => familyOf(i.name, brand) !== null);

    const products = new Map<
      string,
      { name: string; family: string; skus: string[]; packs: Set<string>; categories: Set<string>; inStock: number; rates: number[] }
    >();

    for (const item of matched) {
      const key = productName(item.name);
      if (!key || key.length < 3) continue;
      const entry =
        products.get(key) ??
        { name: pretty(key), family: familyOf(item.name, brand)!, skus: [], packs: new Set<string>(), categories: new Set<string>(), inStock: 0, rates: [] };
      entry.skus.push(item.name);
      const pack = item.name.match(/\b(\d+(?:\.\d+)?\s*(?:KG|L|LT|LTR|LITER|LITRE|ML|GM|G|PCS|MT|M))\b/i);
      if (pack) entry.packs.add(pack[1].replace(/\s+/g, ' ').toUpperCase());
      if (item.cf_category) entry.categories.add(item.cf_category);
      entry.inStock += item.stock_on_hand ?? 0;
      if (item.rate) entry.rates.push(item.rate);
      products.set(key, entry);
    }

    // Second pass. A trailing number is a colour reference when the same stem
    // carries three or more different ones, which is what a colour chart looks
    // like. Two or fewer and it is part of the product name, so "Adesilex MT
    // 32" survives while "Keracolor FF 100" collapses to "Keracolor FF".
    const stems = new Map<string, Set<string>>();
    for (const key of products.keys()) {
      const m = key.match(/^(.*?)\s+(\d{1,3})$/);
      if (!m) continue;
      const set = stems.get(m[1]) ?? new Set<string>();
      set.add(m[2]);
      stems.set(m[1], set);
    }
    for (const [stem, codes] of stems) {
      if (codes.size < 3) continue;
      const target =
        products.get(stem) ??
        { name: pretty(stem), family: '', skus: [], packs: new Set<string>(), categories: new Set<string>(), inStock: 0, rates: [] };
      for (const code of codes) {
        const from = products.get(`${stem} ${code}`);
        if (!from) continue;
        target.family = target.family || from.family;
        target.skus.push(...from.skus);
        from.packs.forEach((v) => target.packs.add(v));
        from.categories.forEach((v) => target.categories.add(v));
        target.inStock += from.inStock;
        target.rates.push(...from.rates);
        products.delete(`${stem} ${code}`);
      }
      products.set(stem, target);
    }

    const list = [...products.values()]
      .map((p) => ({
        name: p.name,
        family: p.family,
        sku_count: p.skus.length,
        packs: [...p.packs],
        categories: [...p.categories],
        stock_on_hand: p.inStock,
        sample_skus: p.skus.slice(0, 4),
      }))
      .sort((a, b) => b.sku_count - a.sku_count || a.name.localeCompare(b.name));

    const out = path.join(outDir, `${brand}-zoho-products.json`);
    fs.writeFileSync(
      out,
      JSON.stringify({ brand, source: 'Zoho Books, Lapiz Blue General Trading LLC', generated: new Date().toISOString().slice(0, 10), sku_count: matched.length, product_count: list.length, products: list }, null, 2) + '\n',
    );
    console.log(`${brand}: ${matched.length} SKUs collapsed into ${list.length} products -> ${path.relative(process.cwd(), out)}`);
    console.log('   top by SKU count: ' + list.slice(0, 8).map((p) => `${p.name}(${p.sku_count})`).join(', '));
  }
}

main();
