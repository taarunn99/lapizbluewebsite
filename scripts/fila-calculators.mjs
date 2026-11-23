#!/usr/bin/env node
// Gives the FILA products the same coverage calculator every other brand has.
//
// The Easy Guide prints coverage as square metres per litre; the site's
// calculator works in litres per square metre, so the printed figure is
// inverted here once, in data, rather than anywhere in the rendering. Only
// products whose coverage the guide actually prints in square metres get an
// entry; the linear metre products (grout pens and sprays) are left without
// one, the same way 85 other records already are.
//
// Usage: node scripts/fila-calculators.mjs
import fs from 'node:fs';

const INDEX = 'data/calculators/index.json';
const products = JSON.parse(fs.readFileSync('src/data/fila-products.json', 'utf8')).products;
const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));

/** "1 litre: boxes of 12" and "750 ml spray bottles in boxes of 12" to a pack. */
function pack(sizes) {
  for (const s of sizes || []) {
    const ml = s.match(/(\d+)\s*ml/i);
    if (ml) return { value: Number(ml[1]) / 1000, unit: 'litre', label: `${ml[1]} ml bottle` };
    const l = s.match(/(\d+(?:\.\d+)?)\s*(?:-)?\s*litre/i);
    if (l) return { value: Number(l[1]), unit: 'litre', label: Number(l[1]) >= 5 ? 'can' : 'bottle' };
  }
  return undefined;
}

const round4 = (n) => Math.round(n * 10000) / 10000;
let added = 0, skipped = [];

for (const p of products) {
  const key = `fila/${p.slug}`;
  const usable = (p.coverage || []).filter((c) => !/linear/i.test(c.note || ''));
  if (usable.length === 0) { skipped.push(p.slug); delete index[key]; continue; }

  const tiers = usable.map((c) => {
    const [lo, hi] = Array.isArray(c.sqmPerLitre) ? c.sqmPerLitre : [c.sqmPerLitre, c.sqmPerLitre];
    // Most square metres per litre is the least litres per square metre.
    return {
      label: c.surface,
      min: round4(1 / Math.max(lo, hi)),
      max: round4(1 / Math.min(lo, hi)),
      hint: `The guide prints ${Array.isArray(c.sqmPerLitre) ? `${lo} to ${hi}` : lo} m2 per litre${c.note ? `, ${c.note}` : ''}`,
    };
  });

  const printed = usable
    .map((c) => `${c.surface}: ${Array.isArray(c.sqmPerLitre) ? `${c.sqmPerLitre[0]} to ${c.sqmPerLitre[1]}` : c.sqmPerLitre} m2/litre${c.note ? ` (${c.note})` : ''}`)
    .join('; ');

  const protector = p.category === 'protector' || p.category === 'finish';
  index[key] = {
    model: 'tiered_area',
    source: `COVERAGE, FILA Easy Guide page ${p.page}: ${printed}`,
    unit: 'litre',
    tiers,
    defaultTier: 0,
    ...(protector ? { coats: { min: 1, max: 3, default: 2, label: 'Coats' } } : {}),
    ...(pack(p.packSizes) ? { pack: pack(p.packSizes) } : {}),
    caveat:
      'The guide prints coverage as square metres per litre; this works the other way round, in litres per square metre, so the two read as the same figure. Coverage on site moves with how absorbent and how rough the surface is, so treat the result as the order quantity to check against a test area. The technical data sheet governs.',
  };
  added++;
}

fs.writeFileSync(INDEX, JSON.stringify(index, null, 2) + '\n');
console.log(`${added} FILA calculators written, ${skipped.length} products left without one: ${skipped.join(', ')}`);
console.log(`${Object.keys(index).length} calculators in the index.`);
