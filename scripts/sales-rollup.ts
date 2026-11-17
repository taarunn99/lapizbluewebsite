/**
 * Roll SKU level sales up to products, and decide which deserve a page.
 *
 * Zoho holds stock keeping units, not products. "Kerabond T Grey bag 25kg" and
 * "Kerabond T White bag 25kg" are two SKUs of one product that needs one page,
 * and the Mapefloor colour matrix is seventy SKUs of one product. So movement
 * has to be judged on the product, not the SKU: a colour that never sold does
 * not make the product dead if another colour sells every week.
 *
 * The owner's rule is to drop anything that sold 10 units or fewer since 2020.
 * Applying that needs real units, not invoice counts, and the difference is not
 * academic: Mapegrout Aggregate 2 moved 250 bags on a single invoice and Mapei
 * Fiber moved 586 pieces across nine. An invoice count cut would have killed
 * both. So units are counted exactly wherever the answer is close to the line,
 * and only assumed where the item is so clearly moving that no count could
 * change the decision.
 *
 * Usage: npx tsx scripts/sales-rollup.ts
 */
import fs from 'node:fs';
import path from 'node:path';

const SALES_DIR = 'data/discovery/sales';
const CUTOFF = 10;
/** Above this, an item is a mover and its units were deliberately not counted. */
const CLEARLY_MOVING = 20;

interface SkuSales {
  item_id: string;
  name: string;
  sku?: string;
  stock_on_hand?: number;
  invoice_count?: number;
  units?: number | null;
  method?: string;
  error?: string;
}

/** Everything that varies between SKUs of one product and must be stripped. */
const NOISE: RegExp[] = [
  /\b\d+(?:\.\d+)?\s?(?:KG|GM|G|ML|LT|L|MT|M|CM|MM|PCS|PC|SQM|SM)\b/gi,
  /\b(?:BAG|BUCKET|PAIL|DRUM|CRT|CARTRIDGE|CAN|TIN|BOX|ROLL|SACHET|UNIT|JERRYCAN|TUB|KIT|PACK|BOARD|FUST|BOTTLE)S?\b/gi,
  /\(\s*(?:box\s*)?of\s*\d+\s*\)/gi,
  /\(\s*[a-z]\s*\)/gi,
  /\bPZ\b/gi,
  /\bRAL\s*\d{3,4}\b/gi,
  /\b(?:WHITE|GREY|GRAY|BLACK|BEIGE|IVORY|SAND|SILVER|ANTHRACITE|BROWN|CREAM|MANHATTAN|JASMINE|BAHAMA|CARAMEL|CHOCOLATE|MOON|SMOKE|VOLCANO|CEMENT|TORNADO|MUD|TITANIUM|BLUE|GREEN|RED|YELLOW|PINK|ORANGE|GOLD|BRONZE|COPPER|TRANSPARENT|CLEAR|NATURAL|NEUTRAL|CONDUCTIVE|SWISS)\b/gi,
  /\bNO\.?\s*\d+\b/gi,
  /\b(?:MAPEI|KERAKOLL|LATICRETE|WEBER|FILA|PROFILPAS)\b/gi,
  /\b(?:UAE|DUBAI|IMPORTED|LOCAL|OFFER|PROMO|EXPIRED|SAMPLE|DEMO)\b/gi,
  /[-–—_,;:/]+/g,
];

function productKey(raw: string): string {
  let s = ` ${raw.toUpperCase()} `;
  for (const re of NOISE) s = s.replace(re, ' ');
  // Stripping a pack size out of the middle of a name leaves orphan
  // punctuation and stray decimals behind, as in "0,3 KG/PZ" becoming ".0 PZ".
  s = s.replace(/\s[.,]\d+\s/g, ' ').replace(/[.,]+/g, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function pretty(s: string): string {
  return s
    .split(' ')
    .map((w) =>
      /^\d/.test(w) || w.length <= 2 || /^(S[12]|R[12]|2K|1K|HP|LV|SP|WA|AE|ME|TX|PT|FB|UM|WP)$/i.test(w)
        ? w.toUpperCase()
        : w.charAt(0) + w.slice(1).toLowerCase(),
    )
    .join(' ');
}

function readAll(): SkuSales[] {
  const byId = new Map<string, SkuSales>();
  for (const file of fs.readdirSync(SALES_DIR).sort()) {
    if (!file.endsWith('.json') || file.startsWith('pending')) continue;
    const parsed = JSON.parse(fs.readFileSync(path.join(SALES_DIR, file), 'utf8'));
    for (const item of parsed.items ?? []) {
      const existing = byId.get(item.item_id);
      // The units files are a later, better pass over the same SKUs, so a real
      // unit count always beats a null left by the first pass.
      if (!existing) byId.set(item.item_id, item);
      else if (typeof item.units === 'number' && typeof existing.units !== 'number') {
        byId.set(item.item_id, { ...existing, ...item });
      }
    }
  }
  return [...byId.values()];
}

interface Product {
  product: string;
  skus: number;
  units: number;
  /** SKUs whose units were never counted because they are clearly moving. */
  assumedMoving: number;
  invoices: number;
  stock: number;
  decision: 'keep' | 'drop';
  why: string;
}

/**
 * Collapse shade codes.
 *
 * A grout is one product in many colours, and the colour is a number:
 * "Ultracolor Plus 100", "Ultracolor Plus 103", "Kerapoxy 110". Left alone,
 * those become forty one separate products needing forty one pages, when the
 * catalogue and the site both treat them as one.
 *
 * The rule has to be careful, because a number in a name is not always a
 * shade: "Adesilex P9", "Mapefix EP 385" and "Planigrout 300 ME" are distinct
 * products. So a trailing number is only treated as a shade when at least
 * three siblings share the same stem with different numbers. One or two is a
 * product family; a dozen is a colour chart.
 */
/**
 * Collapse a colour range onto the page the site already publishes for it.
 *
 * The manifest is the authority here, not a guess. If the site ships one page
 * called "Ultracolor Plus", then "Ultracolor Plus 100 Alu" and its forty
 * siblings are that page, and counting them as forty one products needing
 * forty one pages is simply wrong. The longest matching manifest name wins, so
 * "Keraflex Maxi S1 Zero" goes to its own page and not to "Keraflex", and the
 * same three sibling guard applies: a stem shared by one or two SKUs is a
 * product family, a stem shared by a dozen is a colour chart.
 */
function collapseToManifest(keys: string[]): Map<string, string> {
  const records: { brand: string; name: string }[] = JSON.parse(
    fs.readFileSync('data/manifest.json', 'utf8'),
  );
  const names = records
    .filter((r) => r.brand === 'mapei')
    .map((r) => productKey(r.name))
    .filter((n) => n.length >= 6);

  const target = new Map<string, string>();
  for (const key of keys) {
    const hits = names.filter((n) => n === key || key.startsWith(`${n} `));
    const best = hits.sort((a, b) => b.length - a.length)[0];
    if (best && best !== key) target.set(key, best);
  }

  const tally = new Map<string, number>();
  for (const t of target.values()) tally.set(t, (tally.get(t) ?? 0) + 1);

  const collapsed = new Map<string, string>();
  for (const key of keys) {
    const t = target.get(key);
    collapsed.set(key, t && (tally.get(t) ?? 0) >= 3 ? t : key);
  }
  return collapsed;
}

function collapseShades(keys: string[]): Map<string, string> {
  const stems = new Map<string, Set<string>>();
  for (const key of keys) {
    const m = key.match(/^(.*?)\s+(\d{2,4})(?:\s+[A-Z][A-Z0-9]*)?$/);
    if (!m) continue;
    const stem = m[1].trim();
    if (!stem) continue;
    stems.set(stem, (stems.get(stem) ?? new Set()).add(m[2]));
  }
  const collapsed = new Map<string, string>();
  for (const key of keys) {
    const m = key.match(/^(.*?)\s+(\d{2,4})(?:\s+[A-Z][A-Z0-9]*)?$/);
    const stem = m?.[1]?.trim();
    collapsed.set(key, stem && (stems.get(stem)?.size ?? 0) >= 3 ? stem : key);
  }
  return collapsed;
}

function main() {
  const skus = readAll();
  const firstPass = new Map<string, SkuSales[]>();
  for (const s of skus) {
    const key = productKey(s.name);
    if (!key) continue;
    firstPass.set(key, [...(firstPass.get(key) ?? []), s]);
  }

  // Two passes, cheapest signal last. The manifest knows which ranges the site
  // already treats as one page; the shade heuristic catches the rest.
  const manifestMap = collapseToManifest([...firstPass.keys()]);
  const stage = new Map<string, SkuSales[]>();
  for (const [key, members] of firstPass) {
    const merged = manifestMap.get(key) ?? key;
    stage.set(merged, [...(stage.get(merged) ?? []), ...members]);
  }

  const shadeMap = collapseShades([...stage.keys()]);
  const groups = new Map<string, SkuSales[]>();
  for (const [key, members] of stage) {
    const merged = shadeMap.get(key) ?? key;
    groups.set(merged, [...(groups.get(merged) ?? []), ...members]);
  }

  const products: Product[] = [];
  for (const [key, members] of groups) {
    const invoices = members.reduce((n, m) => n + (m.invoice_count ?? 0), 0);
    const assumedMoving = members.filter((m) => (m.invoice_count ?? 0) >= CLEARLY_MOVING).length;
    const units = members.reduce((n, m) => n + (typeof m.units === 'number' ? m.units : 0), 0);
    const stock = members.reduce((n, m) => n + (m.stock_on_hand ?? 0), 0);

    let decision: Product['decision'];
    let why: string;
    if (assumedMoving > 0) {
      decision = 'keep';
      why = `${assumedMoving} of its ${members.length} SKUs are on ${CLEARLY_MOVING} or more invoices`;
    } else if (units > CUTOFF) {
      decision = 'keep';
      why = `${units} units sold since 2020`;
    } else if (invoices === 0) {
      decision = 'drop';
      why = 'never invoiced since 2020';
    } else {
      decision = 'drop';
      why = `only ${units} units across ${invoices} invoices since 2020`;
    }

    products.push({ product: pretty(key), skus: members.length, units, assumedMoving, invoices, stock, decision, why });
  }

  products.sort((a, b) => (b.assumedMoving - a.assumedMoving) || (b.units - a.units) || a.product.localeCompare(b.product));

  const keep = products.filter((p) => p.decision === 'keep');
  const drop = products.filter((p) => p.decision === 'drop');
  const uncounted = skus.filter((s) => {
    const n = s.invoice_count ?? 0;
    return n >= 1 && n < CLEARLY_MOVING && typeof s.units !== 'number';
  });

  fs.writeFileSync(
    'data/discovery/mapei-sales-rollup.json',
    `${JSON.stringify({ brand: 'mapei', generated: new Date().toISOString().slice(0, 10),
      cutoff_units: CUTOFF, skus: skus.length, products: products.length,
      keep: keep.length, drop: drop.length, items: products }, null, 1)}\n`,
  );

  console.log(`${skus.length} SKUs rolled up into ${products.length} products\n`);
  console.log(`  keep : ${keep.length}`);
  console.log(`  drop : ${drop.length}`);
  if (uncounted.length) console.log(`\n  WARNING: ${uncounted.length} SKUs in the 1 to ${CLEARLY_MOVING - 1} band still have no real unit count`);
  console.log('\n  top of the keep list:');
  for (const p of keep.slice(0, 12)) {
    console.log(`    ${p.product.slice(0, 34).padEnd(34)} ${String(p.skus).padStart(3)} SKUs  ${String(p.invoices).padStart(5)} inv  ${p.why}`);
  }
  console.log('\n  a sample of the drop list:');
  for (const p of drop.slice(0, 10)) {
    console.log(`    ${p.product.slice(0, 34).padEnd(34)} ${String(p.skus).padStart(3)} SKUs  stock ${String(p.stock).padStart(5)}  ${p.why}`);
  }
}

main();
