# Kerakoll, Laticrete and Pidilite Puma: calculators rebuilt from the sheets

34 entries in `patch-others.json`. 16 rewrite an entry that already existed, 18 are for
products that had no entry at all. Every figure below was read off the PDF in
`public/tds/<brand>/<slug>.pdf` with `pdftotext -layout`. Nothing is carried from a sibling
product.

Counts: 5 gained more than one tier, 10 stayed a single labelled tier with a hint and a
caveat, 10 moved to a non area model (5 joint_volume, 3 volume_fill, 2 batch_dose), 9 are
`none` with a printed reason.

## Kerakoll

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| grintak-m | Coverage approx. 350 - 500 g/m2. Application names spreader no. 3 or a roller. Pack 5 / 18 kg buckets | tiered_area, 1 tier | One range for the whole spreader choice, no row per notch. Tier now carries the sheet's own spreader number as a hint and the caveat says the sheet publishes no breakdown |
| r3-plus | Coverage approx. 250 - 350 g/m2. Application names spreader no. 1 or no. 3, or a roller. Pack 18 / 5 kg / 750 g | tiered_area, 1 tier | Same: a single published range, both spreaders inside it. Hint names them, caveat says there is no breakdown |
| primer-uni | Coverage approx. 0.1 - 0.2 kg/m2. Dilutions by substrate: as is, 1:2, 1:3 plus a second coat, 1:4. Pack 5 kg buckets, 25 kg cans | tiered_area, 1 tier, 1 to 2 coats | The sheet tables dilutions, not consumption, so the hint carries the dilutions and the single range stays one row. Second coat offered because the sheet calls for one on powdery gypsum or anhydrite |
| supersoap | Coverage using MOP approx. 10 g/m2, dilution approx. 1 cap in 3 l of water. Pack 1.5 l bottle | tiered_area, 1 tier, 0.01 kg/m2 | Was `none`. The rate is published, so it is now calculated. No `pack` is set on purpose: coverage is by weight, the bottle is by volume and the sheet gives no specific weight, so bottles cannot be worked out |
| keraplast-p6 | Recommended ratios: concrete and mortar approx. 10 - 30% of the weight of cement; slurry key 1 : 1 : 2.5. Instructions repeat the 10 to 30 percent bound. Pack 25 / 5 / 1 kg cans | batch_dose, basis cement | Was `none`. A latex dosed against the cement weight, which is exactly what batch_dose asks for: 10 to 30 kg per 100 kg of cement. Caveat carries the sheet's three worked cases, 30, 20 and 10 percent |
| fugaflex | Recommended dosage: Fugabella Color approx. 0.35 kg / 3 kg bag and approx. 2.25 kg / 20 kg bag; Fugarok approx. 2 kg / 20 kg bag. Coverage: see dosages. Pack 5 / 1 kg cans | batch_dose, basis bag | Was `none`. Dosed against the bag of grout it goes into. The control counts 20 kg bags, where the two grouts bracket 2 to 2.25 kg; the 3 kg bag figure is a different unit and is in the caveat, not the sum |
| biocalce-muratura | Coverage approx. 1.7 kg/dm3. Grading 0 - 2.5 mm. 25 kg bag with about 4.4 l water. EN 998/2 G/M5 | volume_fill, 1.7 kg per litre | Was `none`. A cubic decimetre is a litre, so the published figure is a density and volume_fill is the model the house already uses for kg/dm3 sheets (epofill, kerarep, lamposilex-me). The three dimensions are the void you measure; the caveat says plainly that the sheet prints no bed thickness, perpend or block size |
| biocalce-muratura-fino | Coverage approx. 1.7 kg/dm3. Grading 0 - 1.5 mm. 25 kg bag with about 4.8 l water. EN 998-2 G/M10. Wet mortar approx. 2.01 kg/dm3 | volume_fill, 1.7 kg per litre | As above. The wet density cross checks the coverage: 25 kg plus 4.8 l at 2.01 kg/dm3 is 14.8 litres, which is 1.69 kg of powder per litre |
| biocalce-pietra | Coverage approx. 1.7 kg/dm3. Grading 0 - 1.4 mm. 25 kg bag with about 4.5 l water. Up to 20 percent by weight of a 1 to 4 mm local inert may be added | volume_fill, 1.7 kg per litre | As above, and the caveat says to rake out and measure the joints for pointing, or take the bed volume off the drawing for exposed walls |

## Laticrete

All Laticrete sheets quote coverage as an area per pack, most of them in imperial. Every rate
below is the inverse, with the conversion written into the caveat and the printed imperial
figure kept in `source`. A square foot is taken as 0.09290304 m2.

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| laticrete-254-platinum | 80-95 ft2 (7.4-8.8 m2) per 22.7 kg bag with a 6 x 6 mm notch; 60-70 ft2 (5.6-6.5 m2) with 6 x 9 mm; 35-40 ft2 (3.2-3.7 m2) with 12 x 12 mm. Pack 50 lb (22.7 kg) bag | tiered_area, 3 tiers | Three published rows, so one tier each: 2.58 to 3.068, 3.492 to 4.054 and 6.135 to 7.094 kg/m2. The sheet names no default trowel, so the middle row is the calculator's choice and the caveat says so |
| laticrete-254-platinum-plus | The same three rows per 25 lb (11.3 kg) bag, plus a fourth for setting over a membrane, 105-115 ft2 (9.7-10.6 m2) with a 6 x 5 mm notch | tiered_area, 4 tiers | Four published rows. The rates are about half those of 254 Platinum because the bag is: the sheet says 11.3 kg covers what a 50 lb bag of traditional mortar does |
| laticrete-305 | Approx. 55-60 Sft per 20 Kg pack, 6 x 6 mm square notch, 3 mm bed. Pack 20 kg and 50 kg bags | tiered_area, 1 tier | One trowel and one bed published, nothing to break out. 20 kg over 5.11 to 5.57 m2 is 3.588 to 3.914 kg/m2 |
| laticrete-325-high-flex | Approx. 55-60 Sft per 20 kg pack, 6 x 6 mm square notch, 3 mm bed, usable up to a 12 mm bed. Pack 5, 20 and 50 kg bags | tiered_area, 1 tier | Same single row. The 12 mm bed the sheet allows has no published rate, which the caveat states; glass mosaic at a 2 mm bed is in the hint |
| laticrete-325-shear-wall-adhesive | A table per 50 kg bag: 6 x 6 mm notch, 3 mm bed, 137-150 ft2; 9 x 9 mm, 4.5 mm bed, 87-100 ft2; 12 x 12 mm, 6 mm bed, 67-80 ft2 | tiered_area, 3 tiers | Three published rows with the sheet's own trowel and bed labels: 3.588 to 3.929, 5.382 to 6.186 and 6.727 to 8.033 kg/m2. The sheet's columns are headed minimum and maximum coverage, which is area, so its minimum is this calculator's maximum |
| laticrete-190-sealer | 1 litre covers approximately 75 - 100 sft depending on porosity. One application suits most work, a second and third may be needed on highly porous substrates. Pack 1, 5 and 20 litre | tiered_area, 1 tier, 1 to 3 applications | One range tied to porosity, no table by stone, so one labelled tier. Inverted: 0.108 to 0.144 litre/m2, both ends rounded up so an order is never short |
| laticrete-latapoxy-300-adhesive | Four rows per #2 unit: 1.5 mm V notch 11.6-12.5 m2; 4 mm V notch 3.7-4.6 m2; 3 x 3 mm square 5.6-6.5 m2; 6 x 6 mm square 2.8-3.3 m2. Unit is 1.0 kg A plus 1.9 kg B plus 8.2 kg C | tiered_area, 4 tiers | Four published rows. The unit weight of 11.1 kg is the sheet's own three components added up, which the caveat states, because the sheet prints no total. Default is the 6 x 6 mm square notch, the heaviest row and the standard tiling trowel |
| laticrete-permacolor-grout | A full coverage chart, ft2 and m2 per 3.6 kg and per 11.3 kg bag, by tile size and joint width at 1/16, 1/8, 3/16, 1/4, 3/8 and 1/2 inch. Ideal for joints of 1.5 to 12 mm | joint_volume, k = 1.509 | The chart is a tile size and joint width table, which is the joint formula. k was fitted to the printed chart: 29 of 138 cells exact to the printed square foot, 78 within 2 percent, 113 within 5 percent. The chart scales by the imperial joint width, so its millimetre headings are rounded and the fit used the exact inch widths. The caveat warns that 1 and 2 inch mosaics at wide joints run up to 40 percent above the formula and should be read off the chart |
| laticrete-sp-100-tile-joint | Coverage: refer to the coverage chart, which is not on the sheet. The mix density of SP-100 grout is 1710 kg/m3. Units of 1.0, 5.0 and 10.0 kg | joint_volume, k = 1.71 | The joint volume of a square metre is ((L + W) / (L x W)) x tile thickness x joint width in millimetres, which comes out in litres, so k is just the density. 1.71 is the sheet's own measured figure, not a constant fitted to a table, and the caveat says so |
| laticrete-spectralock-pro-premium-grout | Coverage chart lives on Data Sheet 254.3 APD. Density 15 lbs/gal (1.8 g/ml). Unit yields: Mini 0.7 L, Full 3.0 L, Commercial 12.0 L. Part C 4.0 kg in a Full unit | joint_volume, k = 1.8 | Same reasoning: the density is the constant the joint sum needs. The 5.4 kg pack is 3.0 litres at 1.8 kg per litre, stated as arithmetic in the caveat because the sheet gives A and B by volume and prints no total weight. The sheet's 10 percent wastage and the extra 10 to 15 percent for unglazed quarry tile are named in the caveat and not folded into the number |

### Stale duplicate keys

Six keys in `g10-laticrete.json` have no row in `data/manifest.json`, so they render nowhere:
`myk-latafix-305`, `myk-laticrete-325-high-flex`, `myk-laticrete-190`,
`myk-laticrete-sp-100-tile-joint`, `spectralock-pro-premium-grout`,
`9235-waterproofing-membrane`. The live pages are the `laticrete-*` slugs. The patch gives
each stale key the same entry as its live twin so the two cannot drift, but they should
probably be deleted from the index instead.

## Pidilite Puma

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| pegoland-elastic | Coverage 1.5 - 1.9 m2 per 4 kg pack at a 1.5 mm bed with a 3 x 3 mm notch; 0.74 - 0.93 m2 per 4 kg pack at a 3 mm bed with a 6 x 6 mm notch. PACKAGING AND STORAGE: 8 Kg two component pail | tiered_area, 2 tiers | Rebuilt. The arithmetic the entry already carried is right, it was only rounded: 4 divided by 1.9 and 1.5 is 2.105 to 2.667 kg/m2, and 4 divided by 0.93 and 0.74 is 4.301 to 5.405. Those exact figures are now in the tiers, each hint shows the division, and the caveat states both units plainly: coverage is quoted against a 4 kg pack while the pail is 8 kg, so one pail is two printed units, and the pail count is worked on the 8 kg pail |

### The spec audit flag on pegoland-elastic

`npm run audit:spec` (scripts/audit-spec-vs-calc.mjs) flags this page, but the calculator is
not the wrong number. The audit extracts candidate rates from the manifest spec string and
its `candidates()` only inverts an area when the quantity is a volume, matching
"1 litre per N m2". It has no pattern for "N m2 per K kg", which is how both Pidilite Puma
and Laticrete print coverage, so the only numbers it can pull out of
"1.5 - 1.9 m2/ 4 kg pack" are 1.5, 1.9 and 4, none of which is a kg/m2 rate. Nothing that
can be written into a calculator entry will satisfy it. The fix is one of:

- add a weight per area pattern to `candidates()` in `scripts/audit-spec-vs-calc.mjs`, or
- restate `specs.coverage` in `data/manifest.json` as kg/m2.

Both are outside the two files this pass was allowed to write. The same flag will now appear
for `laticrete/laticrete-305`, for exactly the same reason ("Approx. 55-60 Sft per 20 Kg
pack"), so it is worth fixing the parser rather than the entries.

## Where the sheet publishes nothing

Nine `none` entries. Each one states the closest printed line and why there is no sum, so the
page says it instead of being blank.

| Product | Closest printed line | Why no calculator |
|---|---|---|
| laticrete-500-sanded-grout | "Coverage: Please refer the coverage chart as it depends on the tile size, joint width and depth" | The chart is not on the sheet and not hosted. The only litre figure, 1.75 l of 1776 or water per 10 kg of powder, is mixing liquid and not a yield, so it cannot become a rate or a density |
| laticrete-600-unsanded-grout | The same line, plus 3.75 l of water or 1776 per 10 kg and an estimated 3.30 to 3.70 l for non absorbent tiles | Same: those are mixing liquid, not yield. No density is printed either, so unlike SP-100 there is no honest route to the joint formula |
| laticrete-9235-waterproofing-membrane | "Approximate Coverage: See data sheets for the specific latex based Membrane" | The sheet hosted on this page is the Waterproofing and Anti Fracture Fabric sheet, DS-237.0, not the liquid membrane. It publishes a 300 ft2 (27.8 m2) roll 965 mm wide and a 75 ft (23 m) roll 150 mm wide, which are in the reason, but a roll calculator on a page selling the liquid would answer the wrong question |
| kerakoll/spacers | Product type "PVC spacers" | A laying accessory. No rate exists and no sheet is hosted |
| kerakoll/sponges | "Sponges, felt pads and accessories for grouting ... with Fugabella Eco mineral grouts and Fugalite organic grouts" | A cleaning accessory, ordered per piece |
| kerakoll/spreader-for-grouting | "Steel spreaders to lay ceramic tiles and natural stone with eco-friendly adhesives" | A hand tool |
| kerakoll/spreaders-for-hardwood-floors-and-resilient-materials-laying | "Metal spreaders to apply organic mineral adhesives" | A hand tool |
| kerakoll/spreaders-for-laying-ceramic-tiles | "Steel spreaders to lay ceramic tiles and natural stone with adhesives" | A hand tool |

All five Kerakoll tools have no file in `public/tds/kerakoll`, so `build-calculator-index.ts`
will set `dosage: false` and the page will hide the section rather than print an empty one.
That is the right outcome; the reason is there if a sheet ever appears.

## Reviewed and deliberately left alone

These were on the list but the existing entry is already the right answer, so the patch does
not touch them.

- `kerakoll/b3`: coverage approx. 30 g per metre of tongue and groove joint. A rate by length,
  and the house keeps those as `none` with the figure in the reason (same as
  mapei/ultrabond-turf-pu-1k, mapei/mapeguard-wp-adhesive).
- `kerakoll/aquastop-fix`: approx. 0.6 kg per linear metre, and the sheet marks it an average
  from site experience that varies with the geometry of drains and details. Same reason.
- `kerakoll/top-latex`: "Coverage: see dosages characteristics of adhesive". The dose is set by
  the adhesive's own sheet and the abstract leaves the figure blank, so there is genuinely
  nothing here to dose against.
- `kerakoll/aquaform-d`, `-d-small`, `-d-plus`: painted aluminium drip edging in 2.7 m bars
  with separate corners and connectors. Counted off the drawing, not a roll and not a rate.
- `kerakoll/aquaform-od-od-plus`: a polypropylene drain, ordered per piece.
- `kerakoll/aquaform-r`, `aquaform-sd-vd`, `kerakoll/joint`: no sheet on disk at all, so no
  figure can be quoted. Section stays hidden.
- `kerakoll/fuga-remove`: a tungsten carbide scraper for 1 to 5 mm joints. A tool.
- `pidilite-puma/morcem-dry-sf-plus`: the sheet prints the build up and no rate. Total
  thickness including the fabric 2 to 2.5 mm, minimum 2 mm, not more than 2 mm of wet film per
  layer, 25 kg powder plus 10 kg latex. No kg/m2, no kg/m2 per mm and no density anywhere, so
  any quantity would be invented.

## Two notes for whoever merges this

1. **`model: none` shape.** The brief asked for `{"model":"none","source":...,"unit":...,"caveat":...}`.
   That is not the shape the code accepts. `NoCalc` in `src/lib/calc-types.ts` has `reason`,
   `scripts/verify-calculators.ts` fails any none entry without a non empty `reason`, the
   product page renders `calc.reason`, and all 85 existing none entries are
   `{model, reason, dosage}`. This patch follows the code and puts the printed line and the
   explanation inside `reason`. If other agents on this pass wrote `source` and `caveat`
   instead, their none entries will fail verification and render an empty section.
2. **No model clashes.** `build-calculator-index.ts` stops the build when two group files give
   one key different non none models. Every entry here either keeps the model the index
   already had or upgrades a `none`, which the script handles as an upgrade, so merging this
   file cannot clash. Checked: zero clashes against the current index.
