/*
  Writes public/llms.txt from the manifest and the brand configs.

  The file used to be hand maintained and had drifted: it named Vetonit, which
  we no longer sell, counted 225 Mapei pages when 274 ship, and left out Weber,
  Laticrete, AkzoNobel, FILA and Kalinga Stone entirely. Answer engines read
  this file as the site's own summary, so it has to match what the site is.

  Usage: npx tsx scripts/build-llms.ts
*/
import fs from 'fs';
import path from 'path';
import { brandConfigs } from '../src/data/brandConfigs';
import { getShippable, TDS_CATEGORY_LABELS, type ManifestRecord } from '../src/lib/tds';
import { getAllPosts } from '../src/lib/blog';

const SITE = 'https://www.lapizblue.com';

// Hubs in the order a buyer meets them, then the brands with sheets, then the rest.
const TDS_BRANDS = ['mapei', 'kerakoll', 'weber', 'laticrete', 'pidilite-puma', 'profilpas'];
const OTHER_BRANDS = ['akzonobel', 'fila', 'kalinga-stone'];

const BRAND_LINE: Record<string, string> = {
  mapei: 'Lapiz Blue is an authorised Mapei distributor in the UAE.',
  kerakoll: 'Lapiz Blue is an authorised Kerakoll dealer in the UAE; GCC names (Pragma, H40, Biogel Extreme) are used throughout.',
  weber: 'Lapiz Blue is an appointed Weber Saint-Gobain distributor in the UAE.',
  laticrete: 'Lapiz Blue is an authorised Laticrete distributor in the UAE; products are named the way the UAE sells them.',
  'pidilite-puma': 'Lapiz Blue is an appointed Pidilite Puma distributor in the UAE.',
  profilpas: 'Lapiz Blue distributes Profilpas tile profiles, movement joints, skirting and stair nosings in the UAE.',
};

function lineName(brand: string, lineSlug: string): string {
  const cfg = brandConfigs[brand as keyof typeof brandConfigs];
  const pl = cfg?.productLines?.find((l) => l.slug === lineSlug);
  return pl?.name ?? lineSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function kind(rec: ManifestRecord): string {
  const label = TDS_CATEGORY_LABELS[rec.category] ?? rec.category;
  return label.toLowerCase();
}

function brandSection(brand: string): string {
  const cfg = brandConfigs[brand as keyof typeof brandConfigs];
  const recs = getShippable(brand);
  if (!cfg || recs.length === 0) return '';
  const out: string[] = [];
  out.push(`## ${cfg.name} products`, '');
  out.push(`${BRAND_LINE[brand] ?? ''} ${recs.length} ${cfg.name} product pages, grouped by product line. Brand page: [${cfg.name}](${SITE}/brands/${brand}).`.trim(), '');
  const byLine = new Map<string, ManifestRecord[]>();
  for (const r of recs) {
    if (!byLine.has(r.product_line)) byLine.set(r.product_line, []);
    byLine.get(r.product_line)!.push(r);
  }
  // Keep the config's line order, then anything the config does not list.
  const order = (cfg.productLines ?? []).map((l) => l.slug).filter((s) => byLine.has(s));
  for (const s of byLine.keys()) if (!order.includes(s)) order.push(s);
  for (const lineSlug of order) {
    const items = byLine.get(lineSlug)!;
    const name = lineName(brand, lineSlug);
    out.push(`### ${cfg.name} ${name}`, '');
    out.push(`- [${cfg.name} ${name}](${SITE}/brands/${brand}/${lineSlug}): product line overview, ${items.length} product pages`);
    for (const r of items) {
      out.push(`- [${r.name} TDS](${SITE}/brands/${brand}/${lineSlug}/${r.slug}): ${kind(r)}`);
    }
    out.push('');
  }
  return out.join('\n');
}

function guidesSection(): string {
  const guides = getAllPosts().filter((p) => p.category === 'Guides');
  if (guides.length === 0) return '';
  const out = ['## Guides', '', 'Written for the people who specify, buy and install: question based, with a 3D section of the system and a FAQ.', ''];
  for (const g of guides) out.push(`- [${g.title}](${SITE}/blog/${g.slug}): ${g.excerpt}`);
  out.push('');
  return out.join('\n');
}

function otherBrandSection(): string {
  const out: string[] = ['## Other brands', ''];
  for (const brand of OTHER_BRANDS) {
    const cfg = brandConfigs[brand as keyof typeof brandConfigs];
    if (!cfg) continue;
    out.push(`- [${cfg.name}](${SITE}/brands/${brand}): ${cfg.metaDescription}`);
    for (const l of cfg.productLines ?? []) {
      out.push(`  - [${cfg.name} ${l.name}](${SITE}/brands/${brand}/${l.slug}): ${l.metaDescription}`);
    }
  }
  out.push('');
  return out.join('\n');
}

function main() {
  const total = getShippable().length;
  const head = `# Lapiz Blue

> Lapiz Blue General Trading LLC is a construction chemicals and building materials distributor in the UAE (Dubai, Abu Dhabi, Sharjah), authorised for Mapei, Kerakoll, Weber Saint-Gobain, Laticrete, Pidilite Puma, Profilpas, AkzoNobel Dulux and FILA, and a supplier of Kalinga Stone surfaces and Montolit and Hilti tools. Rated 4.7 from 179 Google reviews. Named Outstanding Construction Material Wholesaler in the 2026 Dubai Local Awards. Three branches: Al Quoz Industrial Area 4 in Dubai (+971 4 885 5257), Mussafah Industrial Area 40 in Abu Dhabi (+971 2 886 7753), Al Sajaa Industrial Area in Sharjah (+971 6 569 5001). Every quotation includes the manufacturer's technical and safety data sheets; trade pricing and credit accounts for contractors, applicators and resellers; project pricing on a bill of quantities.

## Key pages

- [Home](${SITE}/): company overview and brands
- [About](${SITE}/about): leadership, group companies, certificates, awards
- [Construction chemicals distributor in Dubai](${SITE}/construction-chemicals-dubai): what Lapiz Blue supplies, brands it is authorized for, Dubai, Abu Dhabi and Sharjah branches, FAQ
- [Waterproofing supplier in Dubai](${SITE}/waterproofing-supplier-dubai): Mapei, Laticrete, Weber and Kerakoll waterproofing membranes by application area, brands, branches, FAQ
- [Concrete repair supplier in Dubai](${SITE}/concrete-repair-supplier-dubai): Mapei and Weber repair mortars, grouts, admixtures and anchoring by defect type, brands, branches, FAQ
- [Epoxy flooring supplier in Dubai](${SITE}/epoxy-flooring-supplier-dubai): Mapei and Laticrete epoxy, polyurethane and quartz flooring systems, AkzoNobel coatings, by space, brands, branches, FAQ
- [Tile adhesive supplier in Dubai](${SITE}/tile-adhesive-supplier-dubai): Mapei, Laticrete, Weber and Kerakoll tile adhesives and grouts by class and job, brands, branches, FAQ
- [Brands](${SITE}/brands): every brand and product line stocked
- [Mapei](${SITE}/brands/mapei): authorised Mapei distributor in the UAE, tile adhesives, grouts, waterproofing, flooring, repair, technical data sheets
- [Kerakoll](${SITE}/brands/kerakoll): authorised Kerakoll dealer in the UAE, GreenBuilding adhesives, grouts, waterproofing, plasters
- [Weber Saint-Gobain](${SITE}/brands/weber): Weber distributor in the UAE, tile adhesives, waterproofing, repair, renders, sealants
- [Laticrete](${SITE}/brands/laticrete): Laticrete distributor in the UAE, 254 Platinum, Hydro Ban, Spectralock, Latalevel
- [Pidilite Puma](${SITE}/brands/pidilite-puma): Pidilite Puma distributor in the UAE, Pegoland adhesives, waterproofing, self levelling
- [Profilpas](${SITE}/brands/profilpas): Profilpas tile profiles, movement joints, stair nosings, skirting in the UAE
- [AkzoNobel Dulux](${SITE}/brands/akzonobel): Dulux interior, exterior, flooring and metal coatings
- [FILA](${SITE}/brands/fila): FILA sealers and cleaners for stone, tile and grout
- [Kalinga Stone](${SITE}/brands/kalinga-stone): engineered quartz, engineered marble and terrazzo surfaces
- [Tools](${SITE}/tools): Montolit, Hilti and other tool brands stocked
- [Trade account](${SITE}/trade-account): trade pricing, project pricing against a BOQ, credit accounts on approval, application form
- [Credentials](${SITE}/credentials): trade licence, TRN, manufacturer appointment letters for Mapei, Kerakoll, Weber, Laticrete, Pidilite Puma and AkzoNobel, vendor registration pack
- [Mapei grout calculator](${SITE}/mapei-grout-calculator): bags of grout from tile size, joint width and area
- [Blog](${SITE}/blog): guides for the people who specify, buy and install
- [Contact](${SITE}/contact): phone +971 4 885 5257, WhatsApp, branch addresses

Every product page below carries the manufacturer's technical data sheet, a consumption calculator where the sheet publishes a rate, a BOQ clause for quantity surveyors, and a WhatsApp enquiry. ${total} product pages in total.

`;
  const body = TDS_BRANDS.map(brandSection).filter(Boolean).join('\n') + '\n' + otherBrandSection() + '\n' + guidesSection();
  const tail = `## Machine readable

- [Sitemap](${SITE}/sitemap.xml): every page
- [Product sitemaps](${SITE}/sitemaps.xml): sitemap index with one file per brand
- [Robots](${SITE}/robots.txt)
`;
  const text = head + body + tail;
  if (/[–—]/.test(text)) throw new Error('dash found in llms.txt output');
  if (/Grani Marmo/i.test(text)) throw new Error('forbidden name in llms.txt output');
  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), text);
  console.log(`llms.txt written: ${text.length} chars, ${text.split('\n').length} lines, ${total} product pages`);
}

main();
