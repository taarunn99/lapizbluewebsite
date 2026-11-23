# Weber calculators, read back off the data sheets

All 83 Weber records in `data/manifest.json`, each one decided from `public/tds/weber/<slug>.pdf`
read with `pdftotext -layout`. The result is `data/calculators/patch-weber.json`, same shape as
the index. Nothing in it is carried over from a sibling product, and every figure is quoted in
`source` with the heading it came from.

## What changed

| | count |
|---|---|
| Entries written | 83 |
| Products that had no entry at all before, so the page showed nothing and said nothing | 6 |
| Products that showed no calculator before and now have a working one | 20 |
| Products that keep the model they had, with the figures corrected against the sheet | 54 |
| Entries with more than one published row, a coats control, or the pocket volume mode | 22 |
| Entries that stay one row because that is all the sheet prints | 52 |
| Entries that stay `none`, with the reason now printed on the page | 9 |
| Packaging line set from the sheet's own table | 74, every entry that has a pack |

Of the 22 richer entries: 5 have more than one published row (weberfloor 4716 with three,
weberfloor 4850 VR, weberdry 110 FX, weberdry 130 PR and weberdry prime WB with two each),
11 have a coats or layers control the sheet itself names, and 7 offer the repair pocket as a
volume. Five more span a published rate range rather than a single figure (webercol epo plus,
weberep 314 RD, webertec 301, weberfloor rapid, weberdry gum).

Model moves, all of them upgrades rather than disagreements:

- `none` to `thickness_area`: weberbloc fix, fix A, fix LW, weberep 314 RD, 331 TX, 345 NSM,
  350 NSG, ST, webertec 301, 311 MC, MC1
- `none` to `batch_dose`: weberad 210 PV, 220 SBR, 225 MB
- `none` to `linear_joint`: weber seal PS 1000 GG, PS 1000 PG
- `none` to `roll_goods`: weber band, weberdry swellbar RB 20x10, webertherm mesh
- `none` to `volume_fill`: weberdry 150 BLC
- no entry to `none`: the six products with no sheet on file

## Figures the old index had wrong

Worth listing, because these were reaching customers:

| Product | Old index | The sheet | Now |
|---|---|---|---|
| weberdry roof | 750 to 750 kg/m2 | 0.8 kg/m2 at 750 micron wet film | 0.8 per coat, 2 coats |
| webercol prime | 100 to 300 kg/m2 | 100 to 300 ml/m2 | 100 to 300, unit ml |
| weberdry prime 338 | 100 to 300 kg/m2 | 100 to 300 ml/m2 | 100 to 300, unit ml |
| webertec bond | 100 to 300 litre/m2 | 100 to 300 ml/m2 | 100 to 300, unit ml |
| weberdry 360 PU | 1 to 1 kg/m2 (read off "1 mm") | 1.4 kg/m2 at 1 mm dry film | 0.7 per layer, 2 layers |
| weberdry bitumen | 4 to 5 kg/m2 (an area per litre, not inverted) | 4 to 5 m2 per litre per coat | 0.2 to 0.25 litre/m2 |
| webercol epo plus | 5 to 6 kg/m2 per mm | 5 to 6 kg/m2 over 3 mm | 1.67 to 2 kg/m2 per mm |
| weberdry RBV | second tier 240 to 300 (microns) | 2 to 2.5 m2 per litre per coat | 0.4 to 0.5 litre/m2 |
| weberad cure Y 20 | 0.2 kg/m2 | app. 0.2 lit/m2 | 0.2, unit litre |
| weberdry prime SB | 0.2 to 0.3 kg/m2 | 0.2 to 0.3 L/m2 per coat | 0.2 to 0.3, unit litre |
| weberfloor epocoat | default row was the anti slip sand, 0.5 to 1 | 5 m2 per litre at 200 micron per coat | 0.2 litre/m2, 2 coats |
| weberfloor 4716 | three garbled rows, one mixing concentrate with diluted | two tables, three real rows | 3 rows, concentrate only |
| weberdry 136 FX | 0.5 to 1.6 kg/m2 per mm | 1.6 kg/m2 at 1 mm | 1.6 per mm |
| 31 thickness products | thickness fixed at 1 to 20 mm, default 3 | each sheet prints its own range | each sheet's own range |

## Every product

"Sheet" quotes the figure as printed; the full sentence and its heading are in the entry's `source`.

### Tile fixing

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| webercol fix | Coverage 3 to 7 kg/m2; notched trowel, 2 to 3 mm minimum | tiered_area, 1 row | One range only. Row labelled from the application text and a caveat says the sheet publishes no breakdown by trowel or tile size. Pack 20 kg |
| webertile fix | Coverage 3 to 7 kg/m2; notched trowel to suit the tile | tiered_area, 1 row | Same. This is the product the owner asked about: Weber prints no trowel table at all, so one labelled row plus the caveat is the honest answer. Pack 25 kg |
| webercol plus | Coverage 3 to 7 kg/m2; 2 to 3 mm minimum | tiered_area, 1 row | One range only. Pack 25 kg |
| webercol premium | Consumption 3 to 6 kg/m2; back buttering for external and large tiles | tiered_area, 1 row | One range only, 3 to 6 not 3 to 7. Pack 25 kg |
| webercol pro | Coverage 3 to 7 kg/m2; 2 to 3 mm minimum, depends on tile type and size | tiered_area, 1 row | One range only. Pack 25 kg |
| webercol wp | Coverage 3 to 7 kg/m2 | tiered_area, 1 row | One range only. Pack 25 kg in the UAE, 20 kg elsewhere |
| webercol flex | Coverage 3 to 7 kg/m2; mix pre-packed liquid and powder | tiered_area, 1 row | One range only; rate is for the mixed product, pack is the 19.5 kg UAE unit |
| webercol prime | Coverage 100 to 300 ml/m2; extremely porous substrates may need two priming coats | tiered_area, 1 row, coats 1 to 2 | Unit corrected to ml; the second coat is the sheet's own, so it is a control. Pack 5 litre can as 5000 ml |
| webercol epo plus | Consumption 5 to 6 kg over 3 mm; uniform 3 to 5 mm maximum | thickness_area | Per mm is 5 to 6 divided by 3, so 1.67 to 2, which gives the printed figure back at 3 mm. Old entry was three times too high |
| weberjoint | Consumption table plus C = 0.18 x E x H x [(L+W)/(LxW)] | joint_volume | k = 1.8, the sheet's own 0.18 with the tile sides in mm instead of cm. Reproduces every printed cell except the mosaic row, which the sheet's own formula also misses |
| weberjoint deco | Same formula and table | joint_volume | k = 1.8 |
| weberepox easy | Same formula and table, plus 3.5 to 10 kg/m2 as an adhesive | joint_volume | k = 1.8; the adhesive use is a different sum and is named in the caveat |

### Plasters, renders and facade

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| weberpremix skim coat | Consumption 1.5 kg/m2/1 mm; 2 to 5 mm in one layer | thickness_area | Thickness range now the sheet's own, 2 to 5 |
| weberpremix SP-11 | Approximately 1.6 kg/m2 per mm; 10 to 20 mm in one layer | thickness_area | 10 to 20 mm. Qatar sheet, so the 50 kg pack is the only one it prints |
| weberpremix SP-33 | Approximately 1.6 kg/m2 per mm; 10 to 20 mm | thickness_area | 10 to 20 mm |
| weberpremix SP-5 | Approximately 1.6 kg/m2 per mm; 10 to 20 mm | thickness_area | 10 to 20 mm |
| weberpremix SRC-1 | Around 4 kg/m2, depending on the substrate and the application method | tiered_area, 1 row | One figure. The hint carries the sheet's own substrate table, the caveat says there is no breakdown |
| weberpremix SRC-2 | Around 4 kg/m2 | tiered_area, 1 row | Same, for fair faced concrete |
| weberpremix SRC-S | Around 4 kg/m2 | tiered_area, 1 row | Same, for dense concrete with SCMs |
| webertherm base | Coverage 3 to 4 kg/m2 per coat; 3 mm then a second layer to a 6 mm sandwich | tiered_area, 1 row, coats 1 to 2 default 2 | The sheet's figure is per coat and its system is two coats, so two are preselected and the default reads 6 to 8 kg/m2 |
| webertherm glue | Coverage 4 kg/m2, depending on irregularity, board size and method; 2 to 5 mm layer | tiered_area, 1 row | One figure, no table by board or method |
| webertherm mesh | Standard width 100 or 110 cm, roll length 50 m, 160 g/m2 | roll_goods, area basis | Nothing is spread. Roll 1 m by 50 m, which is the 50 m2 the UAE sells. See the deviation note on the 10 cm lap |

### Repair, anchoring and technical mortars

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| weberep 314 RD | Yield 13 litres per 25 kg as mortar, 20 litres as micro concrete with 15 kg of 3/8 aggregate | thickness_area 1.25 to 1.92, pocket volume | Two published yields, so two ends of the rate: 25/13 and 25/20. Above 30 mm the sheet mixes the micro concrete |
| weberep 331 TX | Yield 12.5 litres per 25 kg; thickness 5 to 50 mm in one coat | thickness_area 2.0, pocket volume | Yield inverted, one litre per m2 per mm. Was showing no calculator |
| weberep ST | Yield 12.5 litres per 25 kg, 25 per 50 kg; 5 to 50 mm | thickness_area 2.0, pocket volume | Same. Was showing no calculator |
| weberep 332 FR | Consumption 2 kg/m2 per mm; yield 13 litres per 25 kg; 2 to 20 mm | thickness_area 2.0 | Both printed figures agree to 4 per cent. Thin repair, so no pocket mode |
| weberep 345 NSM | Yield 30 litres per 59.2 kg kit; thickness up to 6 mm | thickness_area 1.97 | Two component; rate is for the mixed kit, pack is the 59.2 kg UAE kit. Was showing no calculator |
| weberep 350 NSG | Yield approximately 12 litres per 25 kg; 3 to 10 mm, from 2 mm locally | thickness_area 2.08 | Yield inverted. Was showing no calculator |
| weberep 360 FFR | Consumption 1.3 kg/m2 per mm; 1 mm minimum, 3 mm maximum per coat | thickness_area 1.3 | Thickness now 1 to 3. No UAE pack printed, so the 20 kg bag is flagged in the caveat |
| weberep 370 PF | Around 2 kg/m2/mm as a bonding agent, variable on steel | thickness_area 2.0 | The sheet prints no thickness range, so the bounds are declared as input limits. Steel coating cannot be read off an area and the caveat says so |
| weberep EPO 412 CRY plus | Consumption 1.7 kg/m2 at 1 mm; re-profiling up to 3 mm | thickness_area 1.7 | Thickness now 1 to 3 |
| weberep EPO 420 SC | 2 kg/m2 for 1 mm; yield 14 litres per 28 kg kit; up to 50 mm | thickness_area 2.0, pocket volume | Consumption and yield agree. Patching to 50 mm is a volume, so the pocket mode is offered |
| webertec EPO 430 GRT plus | Consumption 2 kg/m2/mm; admissible thickness 3 mm to 450 mm | thickness_area 2.0 | Thickness now 3 to 450. A base plate pocket is a volume and the caveat gives the arithmetic, 2000 kg per cubic metre |
| webertec 301 | 25 kg gives approximately 12.5 litres in place at plastic consistency, 13 at fluid; jacketing to 10 cm; pile head around 30 mm | thickness_area 1.92 to 2, pocket volume | The two printed consistencies are the two ends of the rate. Was showing no calculator |
| webertec 311 MC | 78 kg kit plus 6 litres gives around 34.5 litres; 50 to 300 mm per layer, 500 mm by design | thickness_area 2.26, pocket volume | Yield inverted. Was showing no calculator |
| webertec MC1 | 25 kg plus 2.5 litres gives around 11.5 litres; 30 to 200 mm per layer, 300 mm by design | thickness_area 2.17, pocket volume | Yield inverted. Was showing no calculator |
| webertec bond | Coverage 100 to 300 ml/m2; two priming coats on extremely porous substrates | tiered_area, 1 row, coats 1 to 2 | Unit corrected to ml from litre, which was out by a thousand |

### Flooring

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| weberfloor 255 SC | Consumption 0.150 litres/m2 for two coats | tiered_area, 1 row, coats 1 to 2 default 2 | Stored per coat at 0.075 so the headline and the calculator both give the printed two coat figure back |
| weberfloor 4716 | Two tables: concentrate 0.033 to 0.066 (1:5) then 0.05 to 0.1 (1:3) over two coats on a dry porous surface, 0.0375 on dense concrete; plus the same rows including dilution water | tiered_area, 3 rows | One row per published row, all of them the concentrate. The diluted figures are in the caveat because that is what goes in the bucket |
| weberfloor 4850 VR | A1 toothing spatula 200 to 250 g/m2, A2 250 to 350 | tiered_area, 2 rows | A real two row table by spatula notching, in kg. The sheet makes no recommendation, so the finer notch is preselected |
| weberfloor 525 FD | Coverage 1.7 kg/m2 at 1 mm; 2 to 30 mm | thickness_area 1.7 | Thickness now 2 to 30 |
| weberfloor 535 FD | Coverage 1.7 kg/m2 per mm; 2 to 30 mm | thickness_area 1.7 | Thickness now 2 to 30 |
| weberfloor 628 LD | 19 kg/m2 per cm; recommended layer 30 to 80 mm | thickness_area 1.9 | Per cm divided by ten; thickness now 30 to 80 |
| weberfloor 630 TSC | 22 kg/m2 per cm; recommended layer 30 to 80 mm | thickness_area 2.2 | Per cm divided by ten; thickness now 30 to 80 |
| weberfloor easy 625 | Approximately 42 kg/m2 per 20 mm; 20 to 60 mm, 100 mm at spots | thickness_area 2.1 | 42 divided by 20; thickness now 20 to 60 |
| weberfloor rapid | 18 to 20 kg/m2 per cm; bed 25 mm bonded, 50 unbonded, 65 floating, all to 100 mm | thickness_area 1.8 to 2.0 | Per cm divided by ten; thickness now 25 to 100 and the three bed types are in the caveat |
| weberfloor smooth FD | Coverage 1.7 kg/m2 per mm; 1 to 10 mm | thickness_area 1.7 | Thickness now 1 to 10; the 20 mm sanded mix is a different mix design and is named in the caveat |
| weberfloor epocoat RAL 7040 | Approximately 5 m2 per litre at 200 micron dry film per coat; base coat then top coat | tiered_area, 1 row, coats 1 to 2 default 2 | Area per litre inverted to 0.2 litre/m2. The old default row was the anti slip sand, which is a separate product |
| weberfloor epo prime | Consumption 0.15 kg/m2, might increase with porosity | tiered_area, 1 row | One figure. Pack is the 12 kg kit, 9.6 plus 2.4, where the old entry had only part A |

### Waterproofing

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| weberdry 110 FX | Consumption 2 to 4 kg/m2; base coat 1 to 2 kg/m2 at 1 mm wet film; first and second layers 0.5 to 1 kg/m2 each | tiered_area, 2 rows | Row one is the whole system as the sheet totals it, row two the base coat alone. The rows add up to the printed 2 to 4 |
| weberdry 116 FX | Coverage 2 to 3 kg/m2, approximately 1.8 kg/m2 per mm dry film; two layers, a third if needed, at least 1.5 mm | tiered_area, 1 row | The 2 to 3 is the whole coating, so no coat control. The per mm figure is in the caveat as the cross check |
| weberdry 130 PR | First layer 1 kg/m2, later layers 0.5 to 1; reservoirs 2 kg/m2 total; tunnels under high negative pressure 2 to 3 kg/m2 | tiered_area, 2 rows | One row per published application, both of them totals. The old entry had four overlapping rows and defaulted to the fourth |
| weberdry 136 FX | Coverage 1.6 kg/m2 at 1 mm; first layer 1 kg/m2, later layers 0.5 to 1 | thickness_area 1.6 | Kept as thickness, which is the printed COVERAGE line; the layer rates are in the caveat with the note that the two do not quite line up |
| weberdry 150 BLC | 1.7 kg plugs a 1 litre volume | volume_fill 1.7 | The only honest model for a leak plug: a chase measured and filled. Was showing no calculator |
| weberdry 360 PU | Around 1.4 kg/m2 for the 1 mm minimum dry film; layers of 0.5 mm, never more | tiered_area, 1 row at 0.7, coats default 2 | Half the printed figure per layer, two layers preselected, so the default gives 1.4 back |
| weberdry bitumen | 4 to 5 m2 per litre per coat | tiered_area, 1 row, coats 1 to 3 default 1 | Area per litre inverted. The sheet gives no number of coats, so the control starts at one |
| weberdry gum | 1.5 to 1.7 kg/m2 per mm wet film; finished membrane over 1 mm | thickness_area 1.5 to 1.7 | Thickness now 1 to 3 with the upper bound declared as an input limit |
| weberdry prime 338 | Coverage 100 to 300 ml/m2 | tiered_area, 1 row | Unit corrected to ml; pack is the 5 kg pail read as about 5 litres at the sheet's own density |
| weberdry prime SB | Coverage around 0.2 to 0.3 L/m2 per coat | tiered_area, 1 row | Unit corrected to litre. No coat control because the sheet names no number of coats |
| weberdry prime WB | Up to 10 m2 per litre on smooth steel, 2 to 5 m2 per litre on concrete; second coat allowed | tiered_area, 2 rows, coats 1 to 2 | Two published substrates, both inverted into litres per m2 |
| weberdry RBE | 1 to 3 m2 per litre per coat; two coat application recommended | tiered_area, 1 row, coats default 2 | Inverted, and the recommended two coats are preselected |
| weberdry RBV | 400 to 500 micron wet film, 240 to 300 dry, 2 to 2.5 m2 per litre | tiered_area, 1 row, coats 1 to 3 default 1 | Inverted. The old entry had the micron figures as a kg/m2 row |
| weberdry roof | Spreading rate approximately 0.8 kg/m2 at 750 micron wet film; finished thickness 1.5 mm | tiered_area, 1 row at 0.8, coats default 2 | Two coats to reach the 1.5 mm the sheet asks for. The old entry read the 750 microns as the rate |
| weber band | 10 linear metre roll of 120 mm width | roll_goods, length basis | Nothing is spread. No lap printed, so the lap is zero and the caveat says to allow for it |
| weberdry swellbar RB 20x10 | 25 m x 2 rolls, 50 m per box; strips overlapped at least 75 mm | roll_goods, length basis, 75 mm lap | Measured by the metre of construction joint, with the sheet's own lap |
| weber seal PS 1000 GG | Length of joint per litre, by depth 10 to 25 mm and width 10 to 30 mm; joints 5 to 50 mm wide | linear_joint | Width times depth in mm is ml per metre, which reproduces every printed cell. Was showing no calculator |
| weber seal PS 1000 PG | Same combined sheet | linear_joint | Same, pouring grade |

### Admixtures, curing and masonry

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| weberad cure Y 20 | Consumption app. 0.2 lit/m2 | tiered_area, 1 row | Unit corrected to litre, pack added |
| weberad 210 PV | Plaster, mortar and grout at 5 to 10 per cent of cement weight; key coat around 4 kg per 50 kg cement; bonding slurry 1 part to 1 part water | batch_dose, cement | The percentage is kg per 100 kg of cement. The other two uses are in the caveat because the model carries one dose |
| weberad 220 SBR | 2 to 10 per cent of cement weight | batch_dose, cement | One printed range covering mortars and slurries alike. Density 1, so a litre is a kilogramme |
| weberad 225 MB | 2 to 8 per cent for bonding slurries, 7 to 17 per cent for enhanced mortars | batch_dose, cement | The enhanced mortars row is modelled; the slurry row is in the caveat, because batch_dose carries one range |
| weberbloc fix | 50 kg bag = 27 litres of mortar; bed 1 to 2 cm after laying | thickness_area 1.85 | Yield inverted. The caveat warns the area is the bed area, not the wall face. Was showing no calculator |
| weberbloc fix A | 50 kg bag = 30 litres; bed 1 to 2 cm | thickness_area 1.67 | Same. Was showing no calculator |
| weberbloc fix LW | 50 kg bag = approximately 36 litres; notched trowel, 3 to 5 mm | thickness_area 1.39 | Same, with the sheet's own thin bed. Was showing no calculator |

## Where the sheet genuinely has nothing

Nine entries stay `none`. Three of them print real data that is simply not an area rate, so the
page prints that instead; six have no sheet at all.

Published data, but not a rate per square metre:

1. **weber ANC 405 BFX** and **weber ANC 405 BFX Gun** - the sheet publishes millilitres per
   centimetre of embedment for thirteen rebar and hole diameters, and works its own example
   through to 14 anchorings per 400 ml cartridge. That is per anchor, not per area, and no model
   here reproduces it: the printed volumes run about 50 per cent above the bare annulus between
   bar and hole, so it cannot be computed geometrically either. The whole table is printed on the
   page as the reason.
2. **weber seal mastic** - the sheet prints no consumption figure and no joint size table at all.
   Its only quantity is a density of 1.45 g/cc and a 20 kg pail, so the reason tells the reader to
   measure the joint volume and allow about 1.45 kg per litre, and warns that this one cures by
   releasing solvent and loses a little volume.

No data sheet on file. All six are `tds.status: documents_pending` in the manifest, with no file in
`public/tds/weber/`. Each now says so, names the pack Zoho Books actually sells, and says which
calculator it will get once the sheet arrives:

3. **weberep 331 HCS** - repair mortar, 50 kg bag. Will take the thickness and pocket volume model
   once its yield in litres per bag is on file. Nothing is borrowed from 331 TX.
4. **webertec 301 PC** - 25 kg bag. Will take the thickness and pocket volume model. Nothing is
   borrowed from webertec 301, which is a different product.
5. **weber jointseal PU 300** - polyurethane sealant, sold by the piece in four colours. Will take
   the linear joint model once its joint table and cartridge volume are on file.
6. **weberfloor 4717** - 5 litre pack. Will take a primer calculator. Nothing is borrowed from
   weberfloor 4716.
7. **weberdry fabric FX** - sold by the linear metre, 300 lm and 50 lm rolls. Will take the roll
   model once its width and lap are on file.
8. **webertec EPO 450 PC** - 27.8 kg three part kit. Will take a thickness calculator.

One thing to know about those six: `scripts/build-calculator-index.ts` sets `dosage` from whether
the manifest has a `tds.local_path`, and the product page only renders the coverage section when
that is true. So these six will still hide the section until a sheet is on file. The entries are
written anyway so that nothing is silently missing from the index, and so the reason is ready the
moment the PDF lands.

## Conventions followed

- `source` quotes the sheet verbatim, with the heading it came from, so a salesperson can turn to
  the PDF and find the same words. No em or en dashes anywhere, including inside quotes.
- A rate derived by arithmetic from a published figure (a yield in litres per bag, a figure per
  centimetre, an area per litre, a two coat total) is always stated as arithmetic in the `caveat`,
  with both numbers, so it can be checked.
- `pack` is the UAE column of the sheet's own packaging table. Where that column is blank the
  caveat says so and names which country's pack was used: weberdry 110 FX (Kuwait, 15 kg kit),
  weberep 360 FFR (Syria, Jordan, Kuwait, KSA, 20 kg), weberdry prime SB (KSA, 18 and 200 litre),
  weberpremix SP-11 (Qatar, 50 kg).
- Two component and three component products carry the whole kit as the pack and say in the caveat
  that the rate is for the mixed product.
- A `coats` control only exists where the sheet itself names more than one coat or layer. Where the
  sheet quotes a total for a finished system (weberdry 116 FX, weberdry 130 PR) there is no coat
  control, because multiplying a total by coats would double count.
- `byVolume` is only on repair products whose sheet describes material filling a cut out or formed
  void: weberep 314 RD, 331 TX, ST, EPO 420 SC, webertec 301, 311 MC, MC1. Thin skims and renders
  do not get it. webertec EPO 430 GRT Plus is a base plate bedding grout rather than a repair, so
  it has the arithmetic in its caveat instead of a second mode.

## Three judgement calls to flag

1. **`none` entries use `reason`, not `source` plus `unit` plus `caveat`.** The brief asked for the
   latter, but `NoCalc` in `src/lib/calc-types.ts` has only `reason` and `dosage`, and
   `src/app/brands/[slug]/[productLine]/[product]/page.tsx` renders `<DosageNote reason={calc.reason} />`.
   An entry with `source` and `caveat` would fail the type and print an empty note, so the quoted
   line and the explanation are both inside `reason`, which is what the page shows.
2. **webertherm mesh takes its 10 cm lap from the webertherm base sheet.** The mesh sheet prints
   the roll and no lap. The lap is printed on the sheet for the base coat the mesh is bedded into,
   which asks for meshes to overlap each other by 10 to 15 cm. It is the one figure in this patch
   that comes from a companion sheet, it is named as such in both `source` and `caveat`, and the
   alternative was a zero lap that would under order by about a tenth. Say the word and it goes to
   zero with a note instead.
3. **The three grouts move k from 1.786 to 1.8.** 1.8 is the sheet's own constant: its printed
   formula is 0.18 with the tile sides in centimetres, which is 1.8 with everything in
   millimetres, and it reproduces every printed cell. The change moves a quantity by under one per
   cent.

## Build note

`patch-weber.json` is in `data/calculators/`, so `scripts/build-calculator-index.ts` will pick it up
as a group file next time it runs. It sorts after `g9-weber.json`, and for every key where the two
agree on the model the later file wins quietly, while every key where `g9` said `none` is treated as
an upgrade. No key in this patch disagrees with `g9-weber.json` on a model other than from `none`,
so the builder has nothing to stop on. `data/calculators/index.json` was not touched.
