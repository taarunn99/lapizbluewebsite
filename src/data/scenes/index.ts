/**
 * The 3D explainers, as data.
 *
 * A scene is a stack of layers, bottom first, each with a name, the product
 * that fills that layer where we sell one, a thickness in millimetres and a
 * palette tone. One renderer draws every layered scene; a profile scene is an
 * extruded cross section drawn by the same renderer from a path. Nothing in
 * here is a mesh, so a new scene is a new entry, not new code.
 *
 * Colours are the six house tones and white, so a diagram on a brand page
 * reads as part of the site rather than a render dropped into it.
 */

export type Tone = "navy" | "deep" | "brand" | "light" | "cream" | "paper" | "white";

export const TONE_HEX: Record<Tone, string> = {
  navy: "#161925",
  deep: "#23395B",
  brand: "#406E8E",
  light: "#BFD7EA",
  cream: "#F3DFC1",
  paper: "#F6F8FA",
  white: "#FFFFFF",
};

export interface SceneLayer {
  /** What the layer is, in the words a specification uses. */
  name: string;
  /** The product we sell for it, where there is one. */
  product?: string;
  /** Nominal thickness, millimetres. Drives the rendered height. */
  mm: number;
  tone: Tone;
  /** One line a buyer needs to know. */
  note?: string;
  /** Draw as a thin sheet rather than a solid slab (membranes, tapes). */
  sheet?: boolean;
  /** Draw as tiles with joints rather than a slab. */
  tiled?: boolean;
}

export type SceneKind = "stack" | "wall" | "shell" | "apron" | "column" | "roof" | "joint" | "profile" | "sealant" | "pour" | "resin" | "facade";

export interface SceneDef {
  slug: string;
  /** How the layers are drawn: a floor stack, a wall section stood on its side, a shell that turns the corner, or a worktop with an apron. */
  kind?: SceneKind;
  title: string;
  /** Under the poster and as the image alt. */
  caption: string;
  /** Two or three sentences a buyer reads next to the model. */
  intro: string;
  layers: SceneLayer[];
  /** Brand slug this variant belongs to, when it names that brand's products. */
  brand?: string;
}

const screed = (mm = 50): SceneLayer => ({ name: "Sand and cement screed", mm, tone: "paper", note: "Cured, dry and sound before anything goes on it." });
const slab: SceneLayer = { name: "Concrete slab", mm: 150, tone: "navy", note: "The structure. Everything above is finishes." };

export const SCENES: SceneDef[] = [
  {
    slug: "tile-system",
    title: "What goes under a tiled floor",
    caption: "A tiled floor in section: slab, screed, primer, adhesive, tile, grout",
    intro:
      "A tile does not sit on concrete. It sits on a screed, a primer, an adhesive bed and a grout, and each has a class and a thickness the specification can name. Turn the model and tap a layer to see what fills it.",
    layers: [
      slab,
      screed(),
      { name: "Primer", mm: 1, tone: "light", sheet: true, note: "Binds the dust and evens the suction of the screed." },
      { name: "Adhesive bed, C2 TE S1", mm: 6, tone: "brand", note: "Six millimetres under a notched trowel, back buttered for large format." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "600 by 600 or larger needs S1 or S2 deformability under it." },
      { name: "Grout, CG2 WA", mm: 10, tone: "deep", note: "Fills the joint to the full tile depth; three millimetres is the UAE norm." },
    ],
  },
  {
    slug: "tile-system-mapei",
    brand: "mapei",
    title: "A Mapei tiled floor in section",
    caption: "Mapei tiling system: Primer G, Keraflex Maxi S1 Zero, porcelain, Ultracolor Plus",
    intro:
      "The Mapei system we quote most for porcelain over a screed. Each layer below names the Mapei product that fills it and the class the specification asks for.",
    layers: [
      slab,
      screed(),
      { name: "Primer", product: "Primer G", mm: 1, tone: "light", sheet: true, note: "Water based acrylic primer on absorbent screed." },
      { name: "Adhesive bed, C2 TE S1", product: "Keraflex Maxi S1 Zero", mm: 6, tone: "brand", note: "Deformable, extended open time for a hot slab." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "Back buttered above 600 by 600." },
      { name: "Grout, CG2 WA", product: "Ultracolor Plus", mm: 10, tone: "deep", note: "Fast setting, water repellent, no efflorescence." },
    ],
  },
  {
    slug: "tile-system-kerakoll",
    brand: "kerakoll",
    title: "A Kerakoll tiled floor in section",
    caption: "Kerakoll tiling system: Primer A Eco, H40 Gel, porcelain, Fugabella Color",
    intro:
      "The Kerakoll GreenBuilding system for porcelain over a screed, with the GCC product names. Tap a layer for the product and its class.",
    layers: [
      slab,
      screed(),
      { name: "Primer", product: "Primer Uni", mm: 1, tone: "light", sheet: true, note: "Eco compatible primer on absorbent substrates." },
      { name: "Adhesive bed, C2 TE S1", product: "H40 Gel", mm: 6, tone: "brand", note: "Gel adhesive, one bag for every tile and substrate on the job." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "Large format with back buttering." },
      { name: "Grout, CG2 WA", product: "Fugabella Color", mm: 10, tone: "deep", note: "Resin cement grout, fifty colours, two to twenty millimetre joints." },
    ],
  },
  {
    slug: "tile-system-laticrete",
    brand: "laticrete",
    title: "A Laticrete tiled floor in section",
    caption: "Laticrete tiling system: 254 Platinum, porcelain, Spectralock Pro",
    intro:
      "The Laticrete system as the UAE buys it: 254 Platinum under porcelain, Spectralock Pro in the joint where chemicals or water demand an epoxy.",
    layers: [
      slab,
      screed(),
      { name: "Adhesive bed, ANSI A118.4 and A118.15", product: "Laticrete 254 Platinum", mm: 6, tone: "brand", note: "Polymer fortified thin set for large format and exterior." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "Also gauged porcelain panels and stone." },
      { name: "Epoxy grout", product: "Laticrete Spectralock Pro Premium Grout", mm: 10, tone: "deep", note: "Stain proof, chemical resistant, no sealing." },
    ],
  },
  {
    slug: "tile-system-weber",
    brand: "weber",
    title: "A Weber tiled floor in section",
    caption: "Weber tiling system: webercol Pro, porcelain, weberjoint",
    intro:
      "The Weber Saint-Gobain system made in the region for the region: webercol Pro under porcelain, weberjoint in the joint, over a cured screed.",
    layers: [
      slab,
      screed(),
      { name: "Adhesive bed, C2 TE", product: "webercol Pro", mm: 6, tone: "brand", note: "Polymer modified, slip resistant, extended open time." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "Step up to webercol Flex, C2 TE S2, for facades and large slabs." },
      { name: "Grout, CG class 1", product: "weberjoint", mm: 10, tone: "deep", note: "Cementitious grout, one to six millimetre joints." },
    ],
  },
  {
    slug: "tile-system-pidilite-puma",
    brand: "pidilite-puma",
    title: "A Pidilite Puma tiled floor in section",
    caption: "Pidilite Puma tiling system: Pegoland Flex, porcelain, Morcemcolor Plus Flexible",
    intro:
      "The Pegoland system manufactured in the UAE: Pegoland Flex under porcelain, Morcemcolor in the joint, short lead times for pallet quantities.",
    layers: [
      slab,
      screed(),
      { name: "Adhesive bed, C2 TE S1", product: "Pegoland Flex", mm: 6, tone: "brand", note: "Deformable adhesive for porcelain and stone." },
      { name: "Porcelain tile", mm: 10, tone: "cream", tiled: true, note: "Pegoland Superflex, C2 TE S2, for large slabs." },
      { name: "Grout, CG2 A W", product: "Morcemcolor Plus Flexible", mm: 10, tone: "deep", note: "Flexible, water repellent cement grout." },
    ],
  },
  {
    slug: "wet-area-waterproofing",
    title: "Waterproofing under the tiles in a wet area",
    caption: "Wet area in section: screed, primer, two coats of membrane, tape in the corner, adhesive, tile",
    intro:
      "In a bathroom or a plant room the waterproofing sits between the screed and the tile, not under the slab. Two coats of a cementitious or liquid membrane, a tape in every corner and upstand, then the tile system on top.",
    layers: [
      slab,
      screed(40),
      { name: "Primer", mm: 1, tone: "light", sheet: true, note: "Where the membrane asks for one." },
      { name: "Membrane, first coat", mm: 1, tone: "brand", sheet: true, note: "Brushed or rolled; wet on wet with the tape at corners." },
      { name: "Membrane, second coat", mm: 1, tone: "deep", sheet: true, note: "Cross direction, to the total thickness on the data sheet." },
      { name: "Adhesive bed, C2 TE S1", mm: 6, tone: "brand", note: "Compatible with the membrane; confirm on both sheets." },
      { name: "Tile", mm: 10, tone: "cream", tiled: true, note: "Falls to the drain are made in the screed, not the adhesive." },
    ],
  },
  {
    slug: "wet-area-waterproofing-weber",
    brand: "weber",
    title: "A Weber wet area in section",
    caption: "Weber wet area: weberdry 116 FX two coats, weber Band at corners, webercol Pro, tile",
    intro:
      "The Weber wet area system: two coats of weberdry 116 FX over the screed, weber Band in the corners and upstands, then webercol Pro and the tile.",
    layers: [
      slab,
      screed(40),
      { name: "Membrane, first coat", product: "weberdry 116 FX", mm: 1, tone: "brand", sheet: true, note: "Two component flexible cementitious membrane." },
      { name: "Membrane, second coat", product: "weberdry 116 FX", mm: 1, tone: "deep", sheet: true, note: "Cross direction, with weber Band at every corner." },
      { name: "Adhesive bed, C2 TE", product: "webercol Pro", mm: 6, tone: "brand", note: "Bonds to the cured membrane." },
      { name: "Tile", mm: 10, tone: "cream", tiled: true, note: "Grouted with weberjoint." },
    ],
  },
  {
    slug: "basement-waterproofing",
    title: "Basement and podium waterproofing systems",
    caption: "Below ground wall in section: structure, waterproofing, protection board, backfill",
    intro:
      "Below ground the membrane goes on the outside of the structure, against the water, with a protection board so the backfill cannot damage it. The podium deck is the same idea laid flat, with the screed and finish on top.",
    layers: [
      { name: "Backfill", mm: 120, tone: "paper", note: "Compacted in layers after the protection board is on." },
      { name: "Protection board", mm: 6, tone: "light", sheet: true, note: "Keeps the backfill off the membrane." },
      { name: "Waterproofing membrane", mm: 2, tone: "brand", sheet: true, note: "Bitumen, polyurethane or cementitious, to the data sheet thickness." },
      { name: "Primer", mm: 1, tone: "deep", sheet: true, note: "On a dry, cured, sound substrate." },
      { name: "Reinforced concrete wall", mm: 250, tone: "navy", note: "The structure, with construction joints detailed first." },
    ],
  },
  {
    slug: "floor-build-up",
    kind: "pour",
    title: "A floor build up before the finish",
    caption: "Floor in section: slab, screed, primer, self levelling compound, resilient finish",
    intro:
      "Vinyl, LVT, carpet and thin tile all want a flat floor. The self levelling compound is the layer that gives it to them, pumped or poured over a primed screed to the thickness the flatness demands.",
    layers: [
      slab,
      screed(),
      { name: "Primer", mm: 1, tone: "light", sheet: true, note: "Stops pinholes and lets the compound flow." },
      { name: "Self levelling compound, CT C25 F6", mm: 5, tone: "brand", note: "Three to ten millimetres in one pass; fibre reinforced for weak substrates." },
      { name: "Adhesive", mm: 1, tone: "deep", sheet: true, note: "Resilient or wood flooring adhesive for the finish." },
      { name: "Resilient finish", mm: 3, tone: "cream", note: "LVT, vinyl or rubber." },
    ],
  },
  {
    slug: "epoxy-flooring-stack",
    kind: "resin",
    title: "Epoxy flooring systems by thickness",
    caption: "Resin floor in section: slab, primer, body coat, broadcast, top coat",
    intro:
      "A coating is a few hundred microns, a self levelling resin is two to four millimetres, a mortar is six and more. The stack is the same; the body coat decides the thickness and the duty.",
    layers: [
      { name: "Concrete slab, prepared", mm: 150, tone: "navy", note: "Diamond ground or shot blasted; moisture tested." },
      { name: "Epoxy primer", mm: 0.3, tone: "light", sheet: true, note: "Penetrates and seals the slab." },
      { name: "Self levelling epoxy body coat", mm: 3, tone: "brand", note: "Two to four millimetres for warehouses, plant and kitchens." },
      { name: "Quartz broadcast", mm: 1, tone: "cream", sheet: true, note: "Optional, for slip resistance and build." },
      { name: "Polyurethane top coat", mm: 0.2, tone: "deep", sheet: true, note: "UV stable, colour fast, cleanable." },
    ],
  },
  {
    slug: "concrete-repair-section",
    kind: "column",
    title: "Repairing spalled concrete under EN 1504",
    caption: "Repair in section: sound concrete, cleaned bar, bonding slurry, repair mortar, fairing coat, protective coating",
    intro:
      "A structural repair is a sequence, not a bag of mortar. Break out to sound concrete, clean and prime the bar, bond, fill with an R3 or R4 mortar, fair, then protect against carbonation.",
    layers: [
      { name: "Sound concrete, saw cut edges", mm: 150, tone: "navy", note: "Breakout to twenty millimetres behind the bar." },
      { name: "Bar primer and bonding slurry", mm: 1, tone: "light", sheet: true, note: "Anti corrosion primer on the steel, bonding coat on the concrete." },
      { name: "Repair mortar, R4", mm: 40, tone: "brand", note: "Thixotropic for vertical and overhead; flowable for formed repairs." },
      { name: "Fairing coat", mm: 2, tone: "cream", sheet: true, note: "Levels the surface for the coating." },
      { name: "Protective anti carbonation coating", mm: 0.3, tone: "deep", sheet: true, note: "EN 1504-2 principle PI, MC and IR." },
    ],
  },
  {
    slug: "movement-joint",
    title: "A movement joint in a tiled floor",
    caption: "Movement joint in section: screed broken through, backer, sealant or prefabricated joint profile between tiles",
    intro:
      "Every tiled floor moves. The joint lets it: a break through the screed and the adhesive, carried through the tile with a prefabricated profile or a sealant on a backer. Spacing and width come from the floor, not the tile.",
    layers: [
      slab,
      screed(),
      { name: "Adhesive bed", mm: 6, tone: "brand", note: "Stopped either side of the joint." },
      { name: "Movement joint profile", mm: 10, tone: "deep", note: "Aluminium or stainless flanks with a flexible insert, tile height." },
      { name: "Tile", mm: 10, tone: "cream", tiled: true, note: "The joint runs through to the slab, never bridged." },
    ],
  },
  {
    slug: "profile-cross-section",
    kind: "profile",
    title: "A tile profile matched to tile thickness",
    caption: "Tile edge in section: adhesive, tile, profile flange under the tile, profile edge flush with the surface",
    intro:
      "A profile is sized to the tile, not the other way round. The perforated flange goes into the adhesive under the tile, and the visible edge finishes flush with or one millimetre above the tile face.",
    layers: [
      screed(),
      { name: "Adhesive bed", mm: 6, tone: "brand", note: "The profile flange is bedded here." },
      { name: "Profile flange, perforated", mm: 1, tone: "light", sheet: true, note: "Anchors the profile in the adhesive." },
      { name: "Tile", mm: 10, tone: "cream", tiled: true, note: "Profile height is the tile thickness plus one millimetre." },
      { name: "Profile edge, aluminium or stainless", mm: 11, tone: "deep", note: "Protects the arris; the colour and finish are the design decision." },
    ],
  },
  {
    slug: "coating-build-up",
    title: "An exterior wall coating build up",
    caption: "Rendered wall in section: block, render, filler, primer, two coats of exterior paint",
    intro:
      "A paint system is a build up: render, filler, sealer and two finish coats, each with a coverage the data sheet gives. Specify the whole stack and the colour lasts through a Gulf summer.",
    layers: [
      { name: "Blockwork", mm: 200, tone: "navy", note: "Cured and dry before rendering." },
      { name: "Cement render", mm: 15, tone: "paper", note: "Cured 28 days before coating." },
      { name: "Skim and filler", mm: 2, tone: "light", sheet: true, note: "Levels and fills before the sealer." },
      { name: "Alkali resisting primer", mm: 0.1, tone: "brand", sheet: true, note: "Seals the render and evens the finish." },
      { name: "Exterior finish, two coats", mm: 0.2, tone: "cream", sheet: true, note: "Weather resistant acrylic, applied at the data sheet spreading rate." },
    ],
  },
  {
    slug: "stone-care-layers",
    title: "Protecting and cleaning a stone floor",
    caption: "Stone floor in section: adhesive, stone, grout, impregnating sealer in the pores, maintenance cleaner on top",
    intro:
      "Stone care is two steps after the tiling: the post installation clean that lifts grout haze, and the impregnating sealer that sits in the pores rather than on the face. Then a neutral cleaner for the life of the floor.",
    layers: [
      screed(),
      { name: "Adhesive bed", mm: 6, tone: "brand", note: "Light coloured adhesive under light stone." },
      { name: "Natural stone or porcelain", mm: 20, tone: "cream", tiled: true, note: "Porous stone takes the sealer; porcelain takes a grout protector." },
      { name: "Impregnating sealer, in the pores", mm: 1, tone: "light", sheet: true, note: "Invisible, breathable, stain resistant." },
      { name: "Maintenance cleaner", mm: 0.5, tone: "deep", sheet: true, note: "Neutral pH, diluted, for the facility team." },
    ],
  },
  {
    slug: "large-format-slab",
    title: "An engineered stone worktop in section",
    caption: "Worktop in section: carcass, substrate, adhesive, engineered quartz slab with mitred edge",
    intro:
      "Engineered quartz and marble arrive as large slabs and are fabricated to the project. The section shows the support, the bonding and the slab thickness the fabricator specifies for a vanity or a counter.",
    layers: [
      { name: "Carcass or steel frame", mm: 40, tone: "navy", note: "Level and rigid; the slab is not structural." },
      { name: "Plywood or cement board substrate", mm: 18, tone: "paper", note: "Under a 12 millimetre slab; 20 millimetre slabs can span unsupported." },
      { name: "Polyurethane or epoxy adhesive", mm: 2, tone: "brand", sheet: true, note: "Flexible, colour matched at the joints." },
      { name: "Engineered quartz slab", mm: 20, tone: "cream", note: "20 millimetre slabs, 3150 by 1450 up to the 3300 by 2000 superjumbo." },
    ],
  },
  {
    slug: "pool-section",
    title: "A swimming pool shell in section",
    caption: "Pool wall in section: concrete, render, two coat membrane, epoxy adhesive, mosaic, epoxy grout",
    intro:
      "A pool is a wet area that never dries. Cementitious render to shape it, two coats of membrane, then an adhesive and a grout that hold up under water and pool chemistry, which usually means epoxy in the joint.",
    layers: [
      { name: "Reinforced concrete shell", mm: 250, tone: "navy", note: "Water tested before any finish." },
      { name: "Waterproof render", mm: 15, tone: "paper", note: "Shapes the shell and takes the membrane." },
      { name: "Membrane, two coats", mm: 2, tone: "brand", sheet: true, note: "Flexible cementitious, tape at every joint." },
      { name: "Adhesive bed, C2 TE S1 or epoxy", mm: 5, tone: "deep", note: "Epoxy for mosaic and for chemical exposure." },
      { name: "Mosaic or porcelain", mm: 6, tone: "cream", tiled: true, note: "Grouted with an epoxy, RG class." },
    ],
  },
  {
    slug: "facade-tiling",
    kind: "facade",
    title: "External tiling in Gulf heat",
    caption: "Facade in section: block, render, deformable adhesive, large format porcelain, movement joints",
    intro:
      "Outside, the tile sees sixty degree surface temperatures and thermal movement every day. The adhesive must be S1 or S2, applied with open time to spare, and the joints must let the facade move.",
    layers: [
      { name: "Blockwork and render", mm: 215, tone: "navy", note: "Render cured and keyed." },
      { name: "Primer", mm: 1, tone: "light", sheet: true, note: "Where the render is dusty or very absorbent." },
      { name: "Adhesive bed, C2 TE S2", mm: 8, tone: "brand", note: "Full bed, back buttered, no voids behind an external tile." },
      { name: "Large format porcelain", mm: 10, tone: "cream", tiled: true, note: "Mechanical fixing above the height the adhesive maker states." },
      { name: "Movement joints and flexible grout", mm: 10, tone: "deep", note: "Every three to four metres externally." },
    ],
  },
  {
    slug: "plaster-render",
    title: "A plaster and render system on blockwork",
    caption: "Wall in section: block, spatterdash key, base coat render, skim coat",
    intro:
      "A render is three coats doing three jobs: a spatterdash to key the block, a base coat for thickness and flatness, and a skim for the finish the paint goes on.",
    layers: [
      { name: "Blockwork", mm: 200, tone: "navy", note: "Joints raked, wall wetted before the key coat." },
      { name: "Spatterdash key coat", mm: 3, tone: "light", sheet: true, note: "Rough, for the base coat to grip." },
      { name: "Base coat render", mm: 12, tone: "paper", note: "Polymer modified for the Gulf; cured damp." },
      { name: "Skim coat", mm: 2, tone: "cream", sheet: true, note: "Fine finish, ready for primer and paint." },
    ],
  },
  {
    slug: "sealant-joint",
    kind: "sealant",
    title: "A sealed expansion joint in section",
    caption: "Joint in section: concrete either side, backer rod, primer on the faces, polyurethane or polysulphide sealant",
    intro:
      "A sealant joint works when the depth is half the width, the backer rod sets that depth, the faces are primed, and the sealant is one that moves. Width is set by the movement, not the gap you were left with.",
    layers: [
      { name: "Concrete, both faces", mm: 150, tone: "navy", note: "Clean, dry, primed." },
      { name: "Closed cell backer rod", mm: 15, tone: "paper", note: "Sets the sealant depth and stops three sided adhesion." },
      { name: "Primer on the joint faces", mm: 0.5, tone: "light", sheet: true, note: "Where the data sheet requires it." },
      { name: "Sealant, polyurethane or polysulphide", mm: 10, tone: "brand", note: "Depth half the width, tooled to a concave face." },
    ],
  },
  {
    slug: "bonding-agent",
    title: "Bonding new to old with an SBR or epoxy bonding agent",
    caption: "Overlay in section: old concrete, bonding agent, new screed or mortar",
    intro:
      "New mortar does not bond to old concrete on its own. A bonding agent, SBR for screeds and renders or epoxy for structural overlays, is brushed on and the new material goes on while it is tacky.",
    layers: [
      { name: "Existing concrete, prepared", mm: 150, tone: "navy", note: "Scabbled, cleaned, damp but not wet." },
      { name: "Bonding agent, SBR slurry or epoxy", mm: 1, tone: "brand", sheet: true, note: "Applied as the new material is placed." },
      { name: "New screed, mortar or overlay", mm: 40, tone: "paper", note: "SBR modified mix for thin sections." },
    ],
  },
  {
    slug: "facade-kerakoll",
    brand: "kerakoll",
    kind: "wall",
    title: "A Kerakoll facade in section",
    caption: "Kerakoll facade system stood on its side: render, Primer A Eco, H40 Tech C2 TE S2, porcelain slab, Fugabella Color",
    intro:
      "Outside, in Gulf sun, the adhesive has to move with the slab every day. The Kerakoll facade build up uses an S2 gel adhesive over a primed render, a large format slab, and a flexible resin cement grout. Seen as a wall section, finishes toward you.",
    layers: [
      { name: "Blockwork and render", mm: 215, tone: "navy", note: "Cured 28 days, keyed, dry." },
      { name: "Primer", product: "Primer Uni", mm: 1, tone: "light", sheet: true, note: "Evens suction on a hot render." },
      { name: "Adhesive bed, C2 TE S2", product: "H40 Tech", mm: 8, tone: "brand", note: "Full bed, back buttered, no voids outside." },
      { name: "Large format porcelain", mm: 10, tone: "cream", tiled: true, note: "Mechanical fixing above the height the data sheet states." },
      { name: "Grout, CG2 WA", product: "Fugabella Color", mm: 10, tone: "deep", note: "Flexible resin cement grout; movement joints every 3 to 4 metres." },
    ],
  },
  {
    slug: "pool-laticrete",
    brand: "laticrete",
    kind: "shell",
    title: "A Laticrete pool shell in section",
    caption: "Laticrete pool system turning the corner: shell, render, Laticrete 9235 membrane, Latapoxy 300, mosaic, Spectralock Pro",
    intro:
      "A pool is a wet area that never dries, so the whole stack has to work under water and under pool chemistry. The Laticrete system we quote: 9235 membrane over the render, Latapoxy 300 under the mosaic, Spectralock Pro in the joint. The model turns the corner from floor to wall.",
    layers: [
      { name: "Reinforced concrete shell", mm: 250, tone: "navy", note: "Water tested before any finish." },
      { name: "Waterproof render", mm: 15, tone: "paper", note: "Shapes the shell and takes the membrane." },
      { name: "Waterproofing membrane", product: "Laticrete 9235 Waterproofing Membrane", mm: 2, tone: "light", sheet: true, note: "Fabric reinforced, to the data sheet thickness." },
      { name: "Epoxy adhesive", product: "Laticrete Latapoxy 300 Adhesive", mm: 4, tone: "brand", note: "For mosaic and chemical exposure." },
      { name: "Glass mosaic", mm: 6, tone: "cream", tiled: true, note: "Grouted with an epoxy, RG class." },
      { name: "Epoxy grout", product: "Laticrete Spectralock Pro Premium Grout", mm: 6, tone: "deep", note: "Stain proof, chlorine resistant, no sealing." },
    ],
  },
  {
    slug: "wall-tiling-pidilite-puma",
    brand: "pidilite-puma",
    kind: "wall",
    title: "A Pidilite Puma wall tiling section",
    caption: "Pidilite Puma wall system stood on its side: render, Pegoland Dos Plus, ceramic tile, Morcemcolor Universal Grout",
    intro:
      "On a wall the adhesive has to hold the tile without slip while it sets, which is what the T in C2 TE buys. The Pegoland wall system made in the UAE: Pegoland Dos Plus over render, ceramic or porcelain tile, Morcemcolor in the joint.",
    layers: [
      { name: "Blockwork and render", mm: 215, tone: "navy", note: "Plumb, cured, dust free." },
      { name: "Adhesive bed, C2 TE", product: "Pegoland Dos Plus", mm: 6, tone: "brand", note: "Slip resistant with extended open time." },
      { name: "Wall tile", mm: 9, tone: "cream", tiled: true, note: "Pegoland Flex, C2 TE S1, for porcelain and stone." },
      { name: "Grout, CG2 A W", product: "Morcemcolor Universal Grout", mm: 9, tone: "deep", note: "Water repellent cement grout, 1 to 15 millimetre joints." },
    ],
  },
  {
    slug: "coating-akzonobel",
    brand: "akzonobel",
    kind: "wall",
    title: "A Dulux exterior coating build up",
    caption: "AkzoNobel Dulux exterior system stood on its side: block, render, filler, primer, two coats of Weathershield",
    intro:
      "A coating system is a build up: render, filler, sealer and two finish coats, each at the spreading rate on the data sheet. Specify the whole stack and the colour holds through a Gulf summer. Seen as a wall section, finish coat toward you.",
    layers: [
      { name: "Blockwork", mm: 200, tone: "navy", note: "Cured and dry before rendering." },
      { name: "Cement render", mm: 15, tone: "paper", note: "Cured 28 days before coating." },
      { name: "Skim and filler", product: "Stucco wall putty", mm: 2, tone: "light", sheet: true, note: "Levels and fills before the sealer." },
      { name: "Alkali resisting primer", mm: 0.1, tone: "brand", sheet: true, note: "Seals the render and evens the finish." },
      { name: "Exterior finish, two coats", product: "Weathershield", mm: 0.2, tone: "cream", sheet: true, note: "Weather resistant acrylic, two coats at the data sheet rate." },
    ],
  },
  {
    slug: "worktop-kalinga-stone",
    brand: "kalinga-stone",
    kind: "apron",
    title: "An engineered quartz worktop with a mitred apron",
    caption: "Kalinga Stone worktop section with the slab dropping over the front edge: frame, substrate, adhesive, quartz slab",
    intro:
      "Engineered quartz arrives as a 20 millimetre slab, 3150 by 1450 or larger, and is fabricated to the project. The section shows the frame, the substrate under a thin slab, the bonding, and the mitred apron that makes a 20 millimetre slab read as a 60 millimetre edge.",
    layers: [
      { name: "Carcass or steel frame", mm: 40, tone: "navy", note: "Level and rigid; the slab is not structural." },
      { name: "Plywood or cement board substrate", mm: 18, tone: "paper", note: "Under the slab at spans and overhangs; the fabricator decides where." },
      { name: "Polyurethane or epoxy adhesive", mm: 2, tone: "brand", sheet: true, note: "Flexible, colour matched at the joints." },
      { name: "Engineered quartz slab", mm: 20, tone: "cream", note: "Mitred apron glued and polished on site or in the workshop." },
    ],
  },
  {
    slug: "stone-care-fila",
    brand: "fila",
    kind: "stack",
    title: "Protecting and cleaning a stone floor with FILA",
    caption: "FILA stone care in section: adhesive, natural stone, grout, impregnating sealer in the pores, maintenance cleaner on top",
    intro:
      "Stone care is two steps after the tiling: the post installation clean that lifts grout haze, and the impregnating sealer that sits in the pores rather than on the face. Then a neutral cleaner for the life of the floor.",
    layers: [
      screed(),
      { name: "Adhesive bed", mm: 6, tone: "brand", note: "Light coloured adhesive under light stone." },
      { name: "Natural stone", mm: 20, tone: "cream", tiled: true, note: "Porous stone takes the sealer; porcelain takes a grout protector." },
      { name: "Post installation cleaner", product: "DETERDEK PRO", mm: 0.5, tone: "paper", sheet: true, note: "Lifts grout haze and site residue before sealing." },
      { name: "Impregnating sealer, in the pores", product: "MP90 ECO PLUS", mm: 1, tone: "light", sheet: true, note: "Invisible, breathable, stain resistant." },
      { name: "Maintenance cleaner", product: "Cleaner PRO", mm: 0.5, tone: "deep", sheet: true, note: "Neutral pH, diluted, for the facility team." },
    ],
  },
  {
    slug: "wet-area-weber-shell",
    brand: "weber",
    kind: "shell",
    title: "A Weber wet area turning the corner",
    caption: "Weber wet area system from floor to upstand: screed, weberdry 116 FX two coats, weber Band in the corner, webercol Pro, tile",
    intro:
      "The membrane is only as good as its corner. The Weber wet area system: two coats of weberdry 116 FX over the screed, carried up the wall with weber Band in the angle, then webercol Pro and the tile on both faces. The model turns the corner so the upstand is in view.",
    layers: [
      slab,
      screed(40),
      { name: "Membrane, first coat", product: "weberdry 116 FX", mm: 1, tone: "brand", sheet: true, note: "Two component flexible cementitious membrane." },
      { name: "Membrane, second coat", product: "weberdry 116 FX", mm: 1, tone: "deep", sheet: true, note: "Cross direction, with weber Band at every corner." },
      { name: "Adhesive bed, C2 TE", product: "webercol Pro", mm: 6, tone: "brand", note: "Bonds to the cured membrane." },
      { name: "Tile", mm: 10, tone: "cream", tiled: true, note: "Grouted with weberjoint." },
    ],
  },
  {
    slug: "grout-joint",
    kind: "joint",
    title: "Filling a tile joint",
    caption: "A tile joint close up: screed, adhesive, two tiles, the grout being floated into the joint",
    intro:
      "Grout quantity comes from four numbers: tile length and width, tile thickness and joint width. The model shows the joint at full tile depth with the float working the grout in, which is why the formula uses the tile thickness and not the joint alone.",
    layers: [
      screed(),
      { name: "Adhesive bed", mm: 6, tone: "brand", note: "Ridges collapsed to a full bed under the tile." },
      { name: "Porcelain tile", mm: 10, tone: "cream", note: "The joint is the full tile thickness deep." },
      { name: "Grout, CG2 WA", mm: 10, tone: "deep", note: "Worked diagonally across the joint with a rubber float, then washed." },
    ],
  },
  {
    slug: "grout-joint-laticrete",
    brand: "laticrete",
    kind: "joint",
    title: "A Laticrete joint, Spectralock Pro going in",
    caption: "Laticrete joint close up: 254 Platinum under the tile, Spectralock Pro epoxy grout floated into the joint",
    intro:
      "The Laticrete system we quote most for pools, kitchens and hospitals: 254 Platinum under the tile and Spectralock Pro Premium Grout in the joint, an epoxy that is stain proof and never needs sealing. Tap the grout to see why the float matters.",
    layers: [
      screed(),
      { name: "Adhesive bed, ANSI A118.4 and A118.15", product: "Laticrete 254 Platinum", mm: 6, tone: "brand", note: "Polymer fortified thin set, full bed." },
      { name: "Porcelain tile", mm: 10, tone: "cream", note: "Joint at full depth, no adhesive in the joint." },
      { name: "Epoxy grout", product: "Laticrete Spectralock Pro Premium Grout", mm: 10, tone: "deep", note: "Three part epoxy, worked in and washed within its pot life." },
    ],
  },
  {
    slug: "concrete-repair-weber",
    brand: "weber",
    kind: "column",
    title: "A Weber concrete repair on a column",
    caption: "Weber concrete repair: breakout to sound concrete, bar protection and bonding, weberep repair mortar, fairing coat, protective coating",
    intro:
      "A spalled column is repaired in a sequence, not with a bag of mortar. Break out to sound concrete, clean and protect the bar, bond, fill with a weberep mortar, fair the surface, then coat against carbonation. Tap each step on the column.",
    layers: [
      { name: "Sound concrete, breakout saw cut", mm: 150, tone: "paper", note: "Twenty millimetres behind the bar, edges cut square." },
      { name: "Bar primer and bonding slurry", product: "weberep 314 RD", mm: 1, tone: "light", sheet: true, note: "Corrosion protection on the steel, bond on the concrete." },
      { name: "Repair mortar, R4", product: "weberep 331 TX", mm: 40, tone: "brand", note: "Thixotropic, built up in layers on a vertical face." },
      { name: "Fairing coat", product: "weberep 332 FR", mm: 2, tone: "cream", sheet: true, note: "Fills pinholes and levels for the coating." },
      { name: "Protective coating", product: "weberdry 150 BLC", mm: 0.3, tone: "deep", sheet: true, note: "Anti carbonation, EN 1504-2." },
    ],
  },
  {
    slug: "roof-kerakoll",
    brand: "kerakoll",
    kind: "roof",
    title: "A Kerakoll roof waterproofed to the parapet",
    caption: "Kerakoll roof: slab, screed to falls, Aquastop Nanoflex in two coats carried up the parapet, the drain",
    intro:
      "A roof fails at the upstand and the drain, not in the middle. The Kerakoll system takes the membrane up the parapet and down into the outlet in one skin: screed to falls, two coats of Aquastop Nanoflex with the tape in every angle, then the protection the finish needs.",
    layers: [
      { name: "Concrete roof slab", mm: 150, tone: "navy", note: "Parapets cast with the slab." },
      { name: "Screed to falls", mm: 50, tone: "paper", note: "Falls made here, to the outlet." },
      { name: "Primer", product: "Primer Uni", mm: 1, tone: "light", sheet: true, note: "Where the screed is dusty or absorbent." },
      { name: "Membrane, first coat", product: "Aquastop Nanoflex", mm: 1, tone: "brand", sheet: true, note: "Brushed into the angles with the tape." },
      { name: "Membrane, second coat", product: "Aquastop Nanoflex", mm: 1, tone: "deep", sheet: true, note: "Cross direction, up the parapet, into the drain." },
    ],
  },
  {
    slug: "pour-pidilite-puma",
    brand: "pidilite-puma",
    kind: "pour",
    title: "Pidilite Puma self levelling before the finish",
    caption: "Pidilite Puma floor: slab, screed, Paviland Primer R, Paviland SL 10 poured and spreading, resilient finish",
    intro:
      "Vinyl, LVT and thin tile want a flat floor, and the self levelling compound is what gives it to them. The Paviland system made in the UAE: prime the screed, pour and spread Paviland SL 10 to the thickness the flatness demands, then the finish goes down.",
    layers: [
      slab,
      screed(),
      { name: "Primer", product: "Paviland Primer R", mm: 1, tone: "light", sheet: true, note: "Stops pinholes and lets the compound flow." },
      { name: "Self levelling compound, CT C20 F6", product: "Paviland SL 10", mm: 5, tone: "brand", note: "Three to ten millimetres in one pass." },
      { name: "Resilient finish", mm: 3, tone: "cream", note: "LVT or vinyl, bonded with the matching adhesive." },
    ],
  },
];

export const SCENE_BY_SLUG: Record<string, SceneDef> = Object.fromEntries(SCENES.map((s) => [s.slug, s]));

export function getScene(slug: string): SceneDef | undefined {
  return SCENE_BY_SLUG[slug];
}

/** The explainer each brand hub shows. */
export const BRAND_SCENE: Record<string, string> = {
  mapei: "tile-system-mapei",
  kerakoll: "roof-kerakoll",
  weber: "concrete-repair-weber",
  laticrete: "grout-joint-laticrete",
  "pidilite-puma": "pour-pidilite-puma",
  akzonobel: "coating-akzonobel",
  fila: "stone-care-fila",
  "kalinga-stone": "worktop-kalinga-stone",
};

/** Product line pages that have no photograph get the matching system poster. */
export const LINE_SCENE: Record<string, string> = {
  "weber/plasters-and-renders": "plaster-render",
  "weber/sealants": "sealant-joint",
  "weber/admixtures-and-bonding-agents": "bonding-agent",
};
