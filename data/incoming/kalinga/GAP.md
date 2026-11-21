# Kalinga Stone: gcbuae.com versus lapizblue.com

Fetched 21 November 2026 from https://www.gcbuae.com (Global Classic Building Materials Trading LLC, sister company, fetch authorised). Compared against `src/data/brandConfigs.ts` lines 7040 to 7520, `src/data/brand-content/kalinga-stone.ts` and (because it feeds the live hub) `src/data/brand-hub/kalinga-stone.ts`.

Sources saved in this folder: `pages/` (156 Markdown pages, URL at the top of each), `assets.json` (314 asset URLs), `files/` (3 PDFs, logo SVG, 40 images), `download-log.json`.

## 1. Factual conflicts (gcbuae figure first, lapizblue second)

| Topic | gcbuae.com says | lapizblue.com says | Verdict |
|---|---|---|---|
| Brand spelling | KalingaStone (one word, matches the manufacturer and the reseller letter) | Kalinga Stone (two words) everywhere, including URL `/brands/kalinga-stone` | Keep the URL. Consider "KalingaStone" in body copy and JSON-LD `brand.name`; title tags can carry both. |
| Shade count | 128 shades stocked in Sharjah: 69 quartz, 35 marble, 24 terrazzo | "100+ shades", "over 100 designs" (brandConfigs, brand-content) and "128 shades ex-stock" (brandConfigs line 7216 area, brandStory) | lapizblue is internally inconsistent. Use 69 / 35 / 24 = 128 and name the split. |
| Quartz slab size | Three formats, all 20 mm: 3150 x 1450 mm (55 shades), 3250 x 1650 mm (13 shades), 3300 x 2000 mm superjumbo (Carrara Marmi only) | "3200 x 1600 mm jumbo format" on every page, FAQ and brand-hub | 3200 x 1600 does not exist in the gcbuae catalogue. Per-shade format is listed on gcbuae. |
| Quartz thickness | 20 mm only, every shade | 12, 15, 20 and 30 mm; "30 mm premium chunky edge", "12 mm for cladding" | Unverified on gcbuae. Either source a CMC datasheet or drop 12/15/30. |
| Marble slab size | One format for all 35 shades: 304 x 125 cm | 3200 x 1600 mm in 12/15/20/30 mm (brand-hub, line 47) | Conflict. |
| Terrazzo slab size | 304 x 125 cm, supplied as tiles, full slabs or cut to size; no tile size stated | "slabs up to 3200 x 1600 mm and tiles 600 x 600 and 800 x 800 mm" | Tile sizes unverified on gcbuae. |
| Manufacturer | Classic Marble Company (CMC), 200,000 m2 plant in Silvassa, India; SIMEC (Italy) polishing lines with 36 heads; fully automated; 80,000 m2 of quartz per month | "India's foremost engineered quartz manufacturer", "one of Asia's largest production facilities", "single factory in Rajasthan", "Italian Breton technology and German engineering" | Rajasthan is wrong (Silvassa). Breton is not mentioned anywhere on gcbuae; SIMEC is. CMC is never named on lapizblue. |
| Export reach | 66 countries (hub, quartz, home, profile PDF "66+") | "exports to over 40 countries" | Use 66. |
| Design count | "150+ designs and shades across the brand" (quartz page); profile PDF "500+ exquisite designs" | "100+" | Use 128 for UAE stock, 150+ for the brand if a figure is needed. |
| Certifications | NSF food safe (quartz only), ISO 9001, ISO 14001, BS OHSAS 45001, Microban on 8 quartz, 8 marble (optional), 4 terrazzo shades | "NSF/ANSI 51, Greenguard, ISO 9001:2015", "NSF / GREENGUARD" on quartz and Elixir | Greenguard not on gcbuae. NSF is claimed for marble on lapizblue in effect (marble FAQ says non-porous kitchen use); gcbuae says marble has no NSF listing and quartz is the worktop material. |
| Fire class | Quartz: EN 13501-1 B-s1-d0 wall, B-fl-S1 floor, ASTM E84 Class A. Marble: B. Terrazzo: A1-S1-d0 wall, A1-fl-S1 floor | Not stated | Add. A1 terrazzo is a specifier argument for UAE lift lobbies and cladding. |
| Exterior use | Terrazzo: manufacturer positions structured finishes for exterior cladding. Quartz: "confirm the application with our technical team first" | "Facade Cladding: exterior-grade options available" under the quartz-led applications | Move the facade claim to terrazzo. |
| Heat | Boiling water / high temperature NEMA LD3-3.5/3.6 pass; no degree figure | "heat resistant up to 150 C for brief exposure" | 150 C is unsourced. |
| Quartz content | Profile PDF: "90-95% crushed natural quartz" (generic); vs Caesarstone blog: "around 90 percent mineral content" | "93% natural quartz" | Soften to "over 90%". |
| Marble content | Not stated | "85-90% natural marble aggregate" | Unsourced. |
| Warranty | None mentioned anywhere | "10-year limited manufacturer warranty" (Elixir and quartz FAQs) | Unsourced. Remove or get it in writing from CMC. |
| Where stock is held | Al Sajaa warehouse, Sharjah (Plus Code 9M62+45M, Al Jlail). Showroom and warehouse are the same site. Nothing in Dubai | brand-content FAQ: "showroom in Al Quoz"; brand-hub: selection at Al Sajaa, quotation from three Lapiz Blue branches; brandConfigs: "Visit our showroom" | Al Quoz showroom claim conflicts with Al Sajaa. Align: slabs at Al Sajaa, quotation from Lapiz Blue branches. |
| Who fabricates and installs | "We supply, we do not cut or fabricate. Application through sister company 60 Newton and authorised applicators" | "Lapiz Blue coordinates fabrication and installation", "We deliver and install", "5-7 working days from template", "templated and installed within 7-10 working days" | Different service promises from two group companies. Decide one line (likely: supply plus coordination through Sixty Newton Technical Services LLC and fabricator partners). |
| Lead time | Ex-stock on stocked shades; unstocked shades 4-6 weeks from Silvassa; AED quote usually within one working day | "2-4 weeks" (brand-content FAQ), "7-10 working days" and "4-6 weeks custom" (brandConfigs) | Three different numbers on lapizblue. Use ex-stock plus 4-6 weeks restock. |
| Minimum order and payment | No formal minimum; new customers pay in full before delivery; approved trade accounts up to 30 days; samples free for trade | "No minimum for retail customers" | lapizblue speaks retail; gcbuae speaks trade only. |
| Buyer | Contractors, developers, fabricators, decor and interior design companies, consultants; wholesale, BOQ pricing | Homeowners, designers, "retail customers", luxury villas and penthouses, plus architects | The rebuild brief (contractors, developers, fit out, fabricators) matches gcbuae, not current lapizblue copy. |
| Elixir | No Elixir page, shade or mention on any of the 147 KalingaStone pages. Profile PDF (page 5) lists "ELIXIR: Elixir Marble is nature's most fluid masterpiece" as a fourth engineered collection | A full product line page: "premium curated quartz collection", designs Grand Antique, Bianco Lasa, Noir Desir, Verde Botanic Classico, 10-year warranty | Material type conflicts (marble on gcbuae profile, quartz on lapizblue) and none of the four named designs appear in gcbuae's 128. Verify with CMC before keeping `/brands/kalinga-stone/elixir` as is; the URL must stay. |
| Named key products | 128 named shades. Milano is a grey quartz shade | "Venata Series", "Calacatta Gold", "Terrazzo Milano", "Engineered Marble Collection" | Venata Series, Calacatta Gold and Terrazzo Milano do not exist in the catalogue. Bianco Classic, Repen, Vetro Bianco, Classic Beige do (all quartz, Series 3, 3150 x 1450 x 20 mm; three of them carry Microban). |
| Terrazzo collection definitions | Roma and Cafe = Series 6 (7 shades), Palladiana and Venetian = Series 7 (6), Elite = Series 8 (11, "a class mix of big and small mosaic patterns") | "Venetian uses fine chips; Elite uses medium chips" | Elite definition conflicts. |
| Palladiana | A terrazzo collection within the block range | "large irregular marble pieces set in a contrasting cement or resin matrix" (describes poured palladiana) | Reword to block-form slab. |
| Group dates | Global Classic est. 2024 | Hub figure "2020 supplying since" (that is Lapiz Blue's founding year, allowed) | Not a conflict, but do not imply Kalinga stock since 2020. |
| Hardness | Quartz Mohs 6-7, marble 4-5, terrazzo 3-4 | Not stated | Add. |

## 2. Content gcbuae has that lapizblue lacks

1. Buyer sections: wholesale supply block on every range page ("Stocked in Sharjah. Delivered to every Emirate"), trade FAQ on home (BOQ pricing, minimum, payment terms, samples, delivery, visit), WhatsApp first CTA with Mon-Sat 8:00-18:00, project enquiry line "usually within one working day".
2. Per-shade pages: 128 shade pages, each with series, exact slab format, colour family, Microban flag, applications, finishes, previous/next and related shades, Product JSON-LD. Plus 9 colour family pages (5 quartz, 4 marble), 3 terrazzo collection pages, 1 fluting page.
3. Technical data in HTML (no PDF): quartz 22 properties, marble 25, terrazzo 19, each with the test standard (ASTM C 97, EN 14617 series, EN 13501-1, DIN 51130 R9, ASTM C 1028). Caveat printed on gcbuae: values transcribed from the printed catalogue, asterisked items ambiguous, confirm against the manufacturer datasheet for contractual use.
4. Finishes: quartz Polished plus Distress, Leather, Honed, Nalico; marble Polished plus Honed, Graffiato, Leather, Distress, Silken (Graffiato and Silken marble only); terrazzo Polished plus Distress, Honed, River Wash, Urban, Leather. Finish photos exist for all (`kalingastone/*/finishes/*.webp`).
5. Twenty-one edge profiles listed for quartz (straight eased to cove dupont).
6. Microban lists: 8 quartz shades, 8 marble option shades, 4 terrazzo shades, with the USA exclusion note.
7. Comparison tables: quartz vs granite vs marble vs porcelain; marble vs terrazzo vs quartz (gloss, repolishable, Mohs, absorption, fire class, NSF, shade count); terrazzo vs quartz.
8. Marble repolishable lifecycle story (polished, worn, repolished in situ, revived) and >85% gloss claim.
9. Fluting programme: 9 catalogued fluted terrazzo samples (Ceppo I, II, III, Forum, Imperiale, Docks Grey, Deluxe White, Exotic Green, Gold Dust), with images.
10. Applications lists per range (quartz 10, marble 10, terrazzo 5 plus manufacturer note on counters, vanities, exterior).
11. Manufacturer facts: CMC, Silvassa 200,000 m2, SIMEC 36-head lines, automated "no hands" line, 80,000 m2 per month, ISO 9001 / 14001 / BS OHSAS 45001, Go Green >90% recycled and water re-use, 66 countries.
12. Named projects: Burj Khalifa International and Il Villaggio (Dubai), Pullman twin towers (Doha), hotels from Bahrain to Kuwait; profile PDF adds Netflix Headquarters Los Angeles (terrazzo), Gaomad Mall Beijing (marble), Hong Kong Airport (quartz).
13. Certificates: KalingaStone authorized reseller letter for the Northern Emirates (PDF, scanned image, 1 page, 3328 x 4624 px) and FILA Preferred UAE Distributor 2026. lapizblue only says "authorized distributor" with no document.
14. Pricing: AED 250 to 500 per m2 supply only (2026), a slab covers 4 to 5 m2, designer shades and superjumbo above the band; KalingaStone vs Caesarstone comparison.
15. Care cross-sell: FILA MP90 ECO XTREME, MARBLE REFRESH, PW10 named per range.
16. Process for fabricators: full slabs on racks, view and tag exact slabs and lot before purchase, delivery to site or fabrication workshop, collection from Al Sajaa, supply only pricing versus supply and fix, slab count planning, edges and cutouts billed by the workshop.

## 3. Content lapizblue has that gcbuae lacks (keep only if verifiable)

Elixir line and its four designs; 12/15/30 mm thicknesses; 3200 x 1600 slab; terrazzo tiles 600 and 800; Breton; Greenguard; 10-year warranty; 93% quartz and 85-90% marble aggregate; 150 C heat figure; Al Quoz showroom; installation service and 5-7 or 7-10 day fit timelines; Venata Series, Calacatta Gold, Terrazzo Milano. Three branches and Dubai / Abu Dhabi quotation desks are Lapiz Blue facts and stay.

## 4. Assets

- Catalogue PDF: none on gcbuae.com. TDS PDF: none. Test certificates PDF: none. All specs are HTML tables transcribed from the printed catalogue.
- PDFs that do exist: `/certificates/kalingastone-authorized-reseller.pdf`, `/certificates/fila-preferred-distributor.pdf`, `/profile/global-classic-profile.pdf` (15 pages, generic, contains the "Elixir Marble" line and selected projects).
- Logo: `/brands/kalingastone.svg` (downloaded as `files/kalingastone-logo.svg`). lapizblue already has `public/images/brands/logos/kalinga-stone.svg` and `.webp`.
- Images: 69 quartz swatches, 35 marble swatches, 24 terrazzo swatches (all `/kalingastone/<range>/swatches*/<slug>.webp`), 45 quartz lifestyle, 14 terrazzo lifestyle, 8 marble lifestyle, 9 fluting (small, 438 x 252), 14 finish macros, 3 range heroes (3200 px wide, A-frame rack photography), 3 Next.js hero posters, 2 Microban visuals, 2 certificate scans, home material balls and scenes. Five mp4 clips (quartz kitchen, marble vein, terrazzo light, slab procession, brass water) are listed in assets.json but not downloaded.
- Downloaded 40 images: the three heroes, both certificate scans, production line, sample stack, Microban pair, six home material shots, warehouse racks, all nine fluting samples, eight marble lifestyle, seven terrazzo lifestyle. Swatches were skipped because all 128 are already catalogued in assets.json and can be pulled by slug when the shade pages are built.
- Failures: none in the final run (the first background run failed on all 44 because the background shell had no network; `download-log.json` is the successful run).

## 5. Page list fetched (156)

Hub and ranges: `/kalingastone`, `/kalingastone/quartz`, `/kalingastone/marble`, `/kalingastone/terrazzo`, `/kalingastone/terrazzo/fluting`.
Colour pages (9): quartz white, marble-look, beige, grey, black; marble white, cream-beige, grey, gold-brown.
Collections (3): terrazzo roma-cafe, palladiana-venetian, elite.
Shade pages (128): 69 quartz, 35 marble, 24 terrazzo (see `pages/kalingastone--<range>--<slug>.md`).
Site pages (3): home, `/products`, `/about`.
Blog (8): kalingastone-price-uae, kalingastone-vs-caesarstone, quartz-slab-sizes-thickness, engineered-stone-vs-porcelain-slabs, terrazzo-tiles-vs-slabs, engineered-marble-complete-guide, quartz-countertops-complete-guide, terrazzo-flooring-complete-guide.
