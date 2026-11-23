# Mapei calculator patch

`data/calculators/patch-mapei.json` holds 76 keys. Every figure in it was read off the PDF in
`public/tds/mapei/` with `pdftotext -layout`. Nothing is carried from a sibling product.

| Outcome | Pages |
|---|---|
| A page that rendered no calculator now has one | 17 |
| A single row that now carries the sheet's own label and guidance | 18 |
| `none` with a stated reason, because no sheet is on file | 41 |

Verification run (`node -e`, see the bottom of this file for what it asserts): all 76 entries pass.
Models in the patch: 29 `tiered_area`, 2 `thickness_area`, 2 `batch_dose`, 1 `joint_volume`,
1 `volume_fill`, 41 `none`.

## A. layer_schedule, which renders no calculator at all, converted

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| Mapefloor FC 200 ME | Two complete systems. Roll coat or structured finish: 1st coat 0.32 kg/m2, finishing coat 0.32 kg/m2. Non slip: 1st coat 0.35 to 0.40 kg/m2 broadcast with Quartz 0.5 at 0.5 to 1.0, finishing coat 0.35 to 0.40 | `tiered_area`, 2 tiers, coats 1 to 2 default 2 | One tier per system. Both coats of this product are at the same rate in each system, so the rate is per coat and the coats control carries the build up. Primer SN at 0.15 to 0.25 kg/m2 and the quartz broadcast are named in the caveat |
| Mapefloor I 300 SL ME | One system, smooth self levelling at an average 2 mm: Primer SN 0.3 kg/m2, Mapefloor I 300 SL ME 3.7 kg/m2 | `tiered_area`, 1 tier at 3.7 | Only one row belongs to this product. The 0.3 kg/m2 line is the primer and would have been twelve times too small. The at least 2.5 to 3.5 kg/m2 total from the application section is in the hint, and the disagreement with 3.7 is in the caveat |
| Mapefloor PU 406 | Two systems. Car park wear layer 1.0 kg/m2. Terrazzo crack suppressant membrane: optional neat layer 0.7 to 0.8, first layer 0.5 to 0.7 | `tiered_area`, 3 tiers | The two layers of system 2 carry different rates, so a coats control cannot express them. Each printed layer of this product is its own row. Quartz 0.25 at 0.3 and the 4.0 kg/m2 broadcast stay in the caveat |
| Mapefloor PU 410 | One system, Mapefloor Parking System WD: Mapefloor PU 410 with Mapecolor Paste 1.0 kg/m2 | `tiered_area`, 1 tier at 1.0 | One printed layer of this product. Quartz 0.25 ME at 0.3 and the Quartz 0.5, 0.9 or 1.2 broadcast at 4.0 are in the caveat, with the 5.3 kg/m2 system total so the 1.0 is not mistaken for the whole floor |
| Mapefloor Decor 700 | From 1 to 1.5 kg/m2 per layer, and an application section whose system is two layers for a 1.5 to 3 mm finished thickness | `tiered_area`, 1 tier 1 to 1.5, coats 1 to 2 default 2 | The printed rate is explicitly per layer, so the coats control does the rest. Eporip, Primer SN, the Mapefloor Finish top coats and the Mapelux wax carry no rate on this sheet and are named in the caveat |
| Mapefloor I 500 W | Three systems. 51 at 3 mm: base 2.5, finish 0.7. 52 at 5 mm: base 2.5, intermediate 2.5, finish 0.7. 53 smooth self levelling 2 to 4 mm: 2 kg/m2 per mm | `tiered_area`, 3 tiers at 3.2, 5.7 and 4 to 8 | One tier per system, each the sum of only the Mapefloor I 500 W layers in it, because the layers inside one system have different rates. Every printed layer is listed in that tier's hint so the sum is checkable. Mapecoat I 600 W at 0.15 to 0.50 is the primer, not this floor's rate, and is in the caveat |

## B. No calculator before, a working one now

| Product | What the sheet prints | Model | Why |
|---|---|---|---|
| MapeWrap 21 | A full CONSUMPTION table in g/m2 by fabric, across the MapeWrap C carbon, G glass and B basalt ranges, from 800 to 900 g/m2 for BI-AX 230 to 2700 to 2800 for UNI-AX 1200 | `tiered_area`, 15 tiers | Fifteen printed rows, grouped exactly as the sheet groups them. The g/m2 figures are shown in kg/m2 |
| MapeWrap 31 | The same table shape with its own figures, from 850 to 950 g/m2 for MapeWrap G UNI-AX 300 to 1950 to 2050 for MapeWrap B UNI-AX 600 | `tiered_area`, 13 tiers | Thirteen printed rows. This sheet prints no UNI-AX 1200 or QUADRI-AX 760 row, so neither is offered, which is why the tier counts differ from MapeWrap 21 |
| MapeWrap 31 SP | One estimate: 950 g/m2 based on presaturation of a 900 g fibre sheet | `tiered_area`, 1 tier at 0.95 | A single printed figure, labelled with the fabric weight it belongs to. The caveat flags that the printed 5 kg unit splits as 3.75 plus 1.75, which adds to 5.5 |
| Mapefloor Finish 451 | Theoretical consumption 0.2 to 0.8 kg/m2 depending on the selected system | `tiered_area`, 1 tier | The same wording and the same shape as Mapefloor Finish 450 ME and 460 ME, which already calculate on this site. A four to one band is wide, so the caveat says so and keeps the sheet's call for preliminary tests |
| Planicrete | DOSAGE AND COVERAGE TABLE, seven uses, consumption in g/m2 per mm of thickness, with a thickness band on two of them | `thickness_area`, 0.04 to 0.05 kg/m2 per mm over 10 to 35 mm | A rate per millimetre, so `thickness_area`. No model holds tiers and a thickness together, so the calculator follows the bonding screed row, the first of the only two rows the sheet gives a thickness band for, and all seven rows with their dilutions are printed in the caveat |
| Mapegrout PT ME | A 25 kg bag yields approximately 16 to 17 litres of grout, and a minimum application thickness of 2 mm | `thickness_area` with `byVolume`, 1.471 to 1.563 kg per litre | A yield in litres per bag. One square metre at one millimetre is one litre, so the same rate serves the area mode and the pocket mode. It fills cable ducts and cracks, so the volume mode is the honest way in. The 50 mm ceiling and the 10 mm default are the calculator's own and the caveat says so |
| Mapeflex PU 65 | 1.2 kg per litre, components A and B only, and a note to take the sealant section from the road joint manufacturer | `volume_fill`, 1.2 kg per litre of void | Kilogrammes per litre of void is exactly this model. The sheet publishes no joint section, so the 20 by 20 mm starting figures are flagged in the caveat as the calculator's own |
| UltraTop EasyColor | One 1.5 litre can every 5 kg of Ultratop Loft F or Ultratop Loft W | `batch_dose`, basis `bag`, 1.5 litre per unit | A dose against another product, not an area. The control reads as 5 kg units of Ultratop Loft and the label says so |
| Mapecolor Metallic | Approximately 3 per cent on the envisaged amount of Kerapoxy Easy Design, and a 90 g sachet equal to 3 per cent by weight of a 3 kg drum | `batch_dose`, basis `bag`, 0.09 kg per 3 kg drum | A pigment dosed by weight. The sheet caps the dose at 3 per cent, so the figure is a ceiling as well as a recommendation, which the caveat states |
| Flexcolor 4 LVT | A kg/m2 consumption table by plate format and joint width, plus the variables of its own formula, A, B, C and D in mm | `joint_volume`, k 1.6 | The grout sum. k 1.6 reproduces every printed cell and is the sheet's own density of 1.6 g/cm3. The cell for 300 by 600 by 2 mm at a 2 mm joint is misprinted as 0.32 where the formula gives 0.03, and the caveat says so |
| UltraCare Rain Protector W | Indicative consumption 10 to 30 m2 per litre for one coat, maximum yield on low absorbency surfaces such as porcelain | `tiered_area`, 1 tier 0.0333 to 0.1 litre/m2, coats 1 to 2 | An area per litre inverted into litres per square metre, the same treatment as UltraCare Stain Protector W. No pack, because the sheet quotes the yield in litres and the pack in kilogrammes |

## C. One printed range, now labelled and hinted from the sheet

Eighteen entries kept their verified figure and single tier and gained the sheet's own label plus a
`hint` naming the variable the sheet itself names. Where the caveat did not already say so, one
sentence was added: the sheet publishes no breakdown, so this is its one printed row.

| Product | What the sheet prints | Variable the hint now names |
|---|---|---|
| Ultrabond Eco Fast Track | approx. 200 to 400 g/m2, MAPEI trowel 1/2 or TKB A2/B1 | Uniformity of the substrate, the back of the flooring, the trowel |
| Primer G | Normal consumption between 0.08 and 0.15 kg/m2 | Porosity and absorption of the surface |
| Eco Prim Grip Plus | Varies between 0.20 and 0.30 kg/m2 | Absorption of the substrate |
| Eco Prim T Plus | Varies from 30 to 150 g/m2 | Porosity of the substrate and how it is applied, with the sheet's four dilutions |
| Ultratop Base Coat | 50 to 80 g/m2 | Porosity and absorption of the substrate, do not dilute |
| Silancolor Primer | Approx. 0.10 to 0.15 kg/m2 in normal conditions | Absorbency of the substrate, normal conditions only |
| Silancolor Primer Plus | Approx. 0.10 to 0.15 kg/m2 in normal conditions | Absorbency of the substrate, normal conditions only |
| Mapecoat I 600 W | 0.15 to 0.50 kg/m2 | Absorption, roughness, dilution, method of application, with the three printed dilutions |
| Mapefloor CPU+ Primer | approx. 0.3 to 0.4 kg/m2 | Roughness and absorption of the substrate, plus site conditions |
| Mapefloor Finish 415 ME | Theoretical 0.3 to 0.8 kg/m2 by system | Particle size of the broadcast quartz, substrate at +15 to +35 degrees C |
| Mapefloor Finish 450 ME | Theoretical 0.2 to 0.5 kg/m2 by system | Preliminary tests, rubber trowel against steel |
| Mapefloor Finish 460 ME | Theoretical 0.2 to 0.5 kg/m2 by system | Preliminary tests, substrate at +15 to +35 degrees C |
| Mapefloor Finish 52 W | 50 to 150 g/m2 per coat | Characteristics of the substrate, 6 to 24 hour wait between coats |
| Mapefloor Finish 53 W | 0.1 to 0.2 kg/m2 per coat | Characteristics of the substrate, second coat sanded if overdue |
| Mapefloor Finish 58 W | 0.1 to 0.2 kg/m2 per coat | Roughness and porosity, one or two coats by roller or airless spray |
| Mapefloor Finish HTR | 0.050 to 0.150 kg/m2 per coat | Type of substrate, one or two coats by roller or airless spray |
| Mapelux Lucida | 50 g/m2 | One figure, one method: second coat at right angles to the first |
| Mapelux Opaca | 50 g/m2 | One figure, one method: second coat at right angles to the first |

## D. The sheet has nothing to calculate from, so the entry stays `none`

These thirty two already carry a correct, verified reason in `index.json`. Each PDF was re-read and
nothing on it supports a calculator, so they are **not** in the patch and nothing about them changes.

Consumption stated only as a dilution or as varying with the dirt: `ultracare-acid-cleaner`,
`ultracare-keranet`, `ultracare-kerapoxy-cleaner`, `ultracare-fuga-fresca`, `mapefloor-cleaner-ed`
(1 to 3 per cent, 100 to 300 g in 10 litres of water, which is a dose against wash water and no
model holds that basis).

Published per linear metre, which no model holds: `ultrabond-575` (325 ml every 12 metres),
`ultrabond-turf-pu-1k` and `ultrabond-turf-pu-1k-lc` (0.23 to 0.26 kg per metre of 30 cm seaming
tape), `mapeguard-wp-adhesive` (100, 250 and 400 g/m on three named details), `mapefer` (120 g/m on
8 mm rebar, 240 g/m on 16 mm, a rate that moves with the bar diameter), `mapeproof-swell`
(320 ml per 3 metres of bead, with no section to size).

`ultrabond-turf-2-stars` and `ultrabond-turf-2-stars-pro` were looked at hard and deliberately left
as `none`. Their primary rate is per linear metre of seaming tape. The one per square metre row on
each sheet, 1 to 2 kg/m2, is for bonding prefabricated rubber sports mats such as Mapecomfort R, a
different system, and promoting it to a tier would also put an unlabelled "Consumption 1 to 2 kg/m2"
in the hero spec bar of a turf seaming adhesive. On a 1000 m2 pitch that reads as a hundredfold
over order. The existing reasons already print all three published rows.

No figure at all on the sheet: `ultratop-stucco` (according to the micro-porosities present),
`mapegrout-aggregate` (dependant on the type of use, consult MAPEI), `quartz` and `quartz-1-2-me`
(dependant on type of use, take it from the resin's sheet), `mapeglitter` (according to the effect
required), `fugolastic` (depends on the consumption of Keracolor), `mapestone-pfs-2-visco` (depends
on the stone and the joint), `mapefix-ep` and `mapefix-ve-sf` (according to the volume of the hole,
with the hole schedule in separately published attachment tables).

Counted as pieces, panels or rolls with no published rate or lap: `mapelevel-prowdg` and
`mapelevel-easy-spacer-l-i` (a wedges per 10 m2 table against two tile dimensions, in pieces),
`mapesilent` (75 tiles per pallet covering 75 m2), `mapeguard-board` (panel sizes and pack
quantities only), `mapeband-gasket` (preformed pieces; the rolls on that sheet are the tape, which
has its own calculator), `mapeplan-t-af` and `mapeplan-tu-s` (2.10 m wide rolls, 20 m or 15 m, but
the sheets print no welded lap width, and `roll_goods` cannot be honest without one),
`mapewrap-c-fiocco` (10 m rolls, diameters not printed), `mapewrap-c-uni-ax` (50 m rolls, thirteen
weights, heights never printed; its consumption table belongs to the epoxy system, not the fabric).

Dosed against something no model holds: `mapeair-foam` (one litre in 50 litres of water makes about
1000 litres of foam at 50 kg/m3, but how much foam a mix takes is not tabulated and the sheet asks
for site trials).

## E. No data sheet on file, so `none` with the reason stated

Forty one keys in the patch are `none` because there is no PDF in `public/tds/mapei/` to read. All
are `page_status: pending` in the manifest, so nothing renders today, and
`scripts/build-calculator-index.ts` will set `dosage: false` on them, which keeps the section hidden
until a sheet lands. The reason is written now so the page explains itself the day it goes live.

`adesilex-lc-r`, `dynamon-pc-1100`, `elastocolor-paint-zero`, `mapefer-1k-zero`, `mapeflex-ps-p`,
`mapefloor-filler`, `mapefloor-i-320-sl`, `mapegrout-thixotropic`, `mapei-fiber`,
`mapeplan-ads-100`, `mapeplan-ads-200`, `mapeplan-ads-300`, `mapeplan-b`, `mapeplan-d`,
`mapeplan-t-b`, `mapeplan-t-cleaner`, `mapeplan-t-cord`, `mapeplan-t-d`, `mapeplan-t-m`,
`mapeplan-t-seam-preparator`, `mapeplan-t-wt`, `mapeplan-tape-pvc`, `mapetex-tape`,
`ultrabond-eco-170`, `ultrabond-eco-4-lvt-zero`, `ultrabond-eco-remove`, `ultrabond-eco-tack`,
`ultrabond-eco-tack-4-lvt`, `ultracare-anti-mould-protector-spray`,
`ultracare-concentrated-tile-and-grout-cleaner`, `ultracare-grout-cleaner-spray`,
`ultracare-mould-remover-spray`, `ultracare-penetrating-plus-sb-dense-stone-sealer`,
`ultracare-smooth-silicone-spray`, `ultraplan-fast-track`, `ultraplan-fiber`,
`ultraplan-maxi-fibre`, `ultratop-binder`, `ultratop-color-paste`, `ultratop-outdoor`, and
`ultraplan-eco`.

The suggestion that Ultraplan and Ultratop publish a rate per millimetre, that Mapegrout
Thixotropic needs the thickness model with a pocket mode, and that Mapefer 1K Zero publishes a rate
per metre of rebar is almost certainly right, and the reasons say what each product is so the shape
is obvious once the sheet arrives. None of it can be written yet: the only acceptable source for a
figure is the product's own sheet, and taking 1.6 kg/m2 per mm from Ultraplan for Ultraplan Fast
Track, or Mapefer's 120 g/m from Mapefer for Mapefer 1K Zero, is the one thing these entries exist
to prevent.

### ultraplan-eco: the wrong sheet is filed

`public/tds/mapei/ultraplan-eco.pdf` is headed **ULTRAPLAN**, and the manifest records its source as
`1_00501_ultraplan_en-ae...pdf`, yet the manifest marks it `verified` with a name match score of
100. The 1.6 kg/m2 per mm it prints is Ultraplan's, not Ultraplan Eco's. It is left as `none` with
that stated. Filing the Ultraplan Eco sheet turns it into a one line `thickness_area`.

## Two things for whoever merges this

**1. Six keys will stop `build-calculator-index.ts`.** The script treats a key claimed by two group
files with two different models as a clash and exits 1. The nine `none` upgrades and the
eighteen same model edits are handled automatically, and `patch-mapei.json` sorts last so it wins.
The six `layer_schedule` to `tiered_area` conversions do not, and their old entries have to be
removed from their group files first:

| Key | Old entry lives in |
|---|---|
| `mapei/mapefloor-fc-200-me` | `g2-surface-treat.json` |
| `mapei/mapefloor-i-300-sl-me` | `g2-surface-treat.json` |
| `mapei/mapefloor-pu-406` | `g6-levelling-repair.json` |
| `mapei/mapefloor-pu-410` | `g6-levelling-repair.json` |
| `mapei/mapefloor-decor-700` | `g8-floor-seal-acc.json` |
| `mapei/mapefloor-i-500-w` | `g8-floor-seal-acc.json` |

**2. The three spec audit flags are false positives, and nothing in the patch can fix them.**
Checked line by line against the PDFs, all three calculators already agree with their own sheets:

| Page | Sheet | Calculator | Verdict |
|---|---|---|---|
| `ultracare-grout-release` | Up to 40 m2 of surface with 1 litre, one coat | 0.025 litre/m2 | 1 divided by 40 is 0.025. Correct |
| `ultracare-rust-remover` | One 125 ml bottle cleans approximately 0.5 m2 | 250 ml/m2 | 125 divided by 0.5 is 250. Correct |
| `ultracare-stain-protector-w` | 10 to 20 m2 per litre, one coat | 0.05 to 0.1 litre/m2 | 1 divided by 20 and by 10. Correct |

The disagreement is in `scripts/audit-spec-vs-calc.mjs`. Its inversion regex requires the `m2` to be
followed immediately by `per`, `with`, `using` or `/`, and all three spec strings read
"40 m2 **of surface** with 1 litre", so the area per litre is never inverted and only the raw
numbers 40, 1, 125 and 0.5 are compared. Two of the three spec strings also lost their superscript
in parsing and read "0.5 m" and "10 to 20 m", which defeats the `m[²2]` branch as well. The fix is
one optional clause in that regex, in `audit-spec-vs-calc.mjs`, not a change to any figure. Changing
the calculators to match what the audit expects would make them disagree with Mapei.

## What the verification asserts

`node -e` loads the patch and checks, for every entry: the model is one of the ten in
`src/lib/calc-types.ts`; the unit is one of `kg`, `litre`, `ml`, `m`; `tiered_area` has a non empty
`tiers` array where every row has a label, a hint and `0 < min <= max`, and `defaultTier` is a valid
index; `coats.min <= coats.default <= coats.max`; `thickness_area` has a positive `ratePerMm`,
`ratePerMmMax >= ratePerMm` where present, and `thickness.min <= thickness.default <=
thickness.max`; `joint_volume`, `volume_fill` and `batch_dose` have positive constants and positive
defaults; every `pack` has a positive value and a unit; every `none` has a non empty `reason`; and
no string anywhere contains an em or en dash.
