import type { BrandConfig, ProductLine } from '@/data/brandConfigs';
import { vetonitProducts } from './vetonit.products';

/*
  Vetonit, a Saveto brand.

  Lapiz Blue holds a dealership certificate for Vetonit in the United Arab
  Emirates, issued by Saveto and valid to June 2027.

  Product lists come from vetonit.products.ts, which is generated from the
  manifest so the range on the page can never drift from the range that has
  pages. The copy below is written, not generated.
*/

const BRANCHES = 'Dubai, Abu Dhabi and Sharjah';

/** Shared expectations. Same promise on every line, worded once. */
const trustSignals = {
  title: 'What you can expect',
  items: [
    { label: 'Authorisation', value: 'Dealership certificate issued by Saveto, valid to June 2027' },
    { label: 'Coverage', value: `Supplied from ${BRANCHES}, UAE wide delivery` },
    { label: 'Documentation', value: 'Technical and safety data sheets supplied on request for every product' },
    { label: 'Technical guidance', value: 'Product selection against substrate, exposure and site conditions' },
    { label: 'Quotations', value: 'BOQ based quotations with practical alternatives where an item is on order' },
    { label: 'Range', value: '93 Vetonit products held across nine product groups' },
  ],
};

const cta = (what: string, checklist: string[]) => ({
  title: `Need a recommendation or a quotation for ${what}?`,
  subtitle: 'Send your project details on WhatsApp or by email and we will come back the same day.',
  checklist,
});

interface LineCopy {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  seoTitle: string;
  h1: string;
  intro: string;
  applications: string[];
  howToChoose: string[];
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  checklist: string[];
}

const COPY: LineCopy[] = [
  {
    slug: 'tile-adhesives-and-grouts',
    name: 'Tile Adhesives and Grouts',
    description:
      'Cementitious, epoxy and polyurethane tile adhesives and grouts for porcelain, ceramic, natural stone and mosaic, on floors and walls, inside and out.',
    metaDescription:
      'Vetonit tile adhesives and grouts in Dubai. C1 and C2 cementitious, epoxy and PU systems for porcelain, stone and mosaic, supplied by Lapiz Blue across the UAE.',
    seoTitle: 'Vetonit Tile Adhesives and Grouts UAE | Lapiz Blue',
    h1: 'Vetonit tile adhesives and grouts, matched to the tile and the substrate',
    intro:
      'The tile is the part people see. The adhesive under it and the grout between it decide whether the finish is still sound in five years. Vetonit covers that job from a straightforward C1 adhesive for absorbent ceramic through deformable C2 systems for large format porcelain and stone, to epoxy and polyurethane adhesives and grouts where chemicals, hygiene or constant water rule out cement. Lapiz Blue holds the range in Dubai, Abu Dhabi and Sharjah. Tell us the tile type, the tile size, what is underneath and where the area sits, and we will point you at the right product rather than the dearest one.',
    applications: [
      'Porcelain and ceramic on internal floors and walls',
      'Large format and heavy tiles, including tile over tile',
      'Natural stone, marble, granite and glass mosaic',
      'Wet areas, bathrooms and swimming pools',
      'External facades and terraces exposed to UAE summer temperatures',
      'Kitchens, laboratories and food production areas needing an epoxy joint',
      'Heated screeds and substrates that move',
    ],
    howToChoose: [
      'Match the class to the tile. Absorbent ceramic is happy on a C1. Porcelain absorbs almost nothing and needs a C2.',
      'Add deformability where the substrate moves. S1 for most large format work, S2 where movement is real, such as heated screeds or tile over tile.',
      'Read the T in C2TE as slip resistance. It is what keeps a heavy wall tile where you put it.',
      'Choose an epoxy adhesive and grout where the joint meets chemicals, constant water or a hygiene regime.',
      'Pick the grout by joint width first, then by colour. A sanded grout in a narrow joint will not compact properly.',
      'Check the open time against your conditions. Forty degrees and wind shorten every open time on the sheet.',
      'Prime absorbent or dusty substrates. It is cheaper than a failed bond.',
    ],
    commonMistakes: [
      'Spot fixing large format tiles instead of achieving full bed coverage, which leaves voids that crack under load.',
      'Using a C1 adhesive under porcelain because it is on the shelf.',
      'Grouting before the adhesive has set, which traps moisture and shows as efflorescence later.',
      'Ignoring movement joints and expecting the adhesive to absorb the movement.',
    ],
    faqs: [
      {
        question: 'Which Vetonit adhesive suits large format porcelain?',
        answer:
          'Large format porcelain needs a deformable C2 adhesive rather than a standard one, because porcelain is effectively non absorbent and the bond is mechanical rather than suction based. Vetoset CA545 is a two component C2TE S2 system for the most demanding of this work, including tile over tile and heated screeds. Porcelain Plus Green is a premixed deformable C2TES1 for the majority of large format jobs. Send the tile size and the substrate and we will confirm which fits.',
      },
      {
        question: 'When should I use an epoxy grout instead of a cementitious one?',
        answer:
          'Use epoxy where the joint will meet chemicals, constant water or a cleaning regime that would erode cement. Commercial kitchens, laboratories, food production areas and swimming pools are the usual cases. Epoxy costs more and takes longer to apply, so it is not the automatic choice for a domestic bathroom, where a good polymer modified cementitious grout performs well.',
      },
      {
        question: 'Do you supply Vetonit tile adhesive in Abu Dhabi and Sharjah?',
        answer:
          'Yes. Lapiz Blue supplies the Vetonit range from distribution centres in Dubai, Abu Dhabi and Sharjah, with delivery across the UAE. Stock position varies by product and pack size, so confirm quantities with us before you programme a pour or a tiling sequence.',
      },
      {
        question: 'Can I get the technical data sheet for a Vetonit adhesive?',
        answer:
          'Yes. Saveto issues technical and safety data sheets to its dealers rather than publishing them openly, so each product page carries a request button and we send the current revision straight back. If you are preparing a submittal, tell us and we will supply the data sheet, the safety data sheet and the authorisation letter together.',
      },
    ],
    checklist: [
      'Tile type and size, and whether it is porcelain, ceramic or stone',
      'Substrate: concrete, screed, plaster, existing tile or board',
      'Area in square metres and the joint width you want',
      'Where it sits: internal, external, wet area or submerged',
      'Whether the substrate is heated or expected to move',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'waterproofing',
    name: 'Waterproofing',
    description:
      'Cementitious, acrylic, polyurethane, epoxy and polyurea waterproofing for wet areas, roofs, tanks, basements and podiums.',
    metaDescription:
      'Vetonit waterproofing membranes in Dubai. Cementitious, acrylic, PU, epoxy and polyurea systems for roofs, wet areas, tanks and basements, from Lapiz Blue UAE.',
    seoTitle: 'Vetonit Waterproofing Membranes UAE | Lapiz Blue',
    h1: 'Vetonit waterproofing, chosen by where the water is and what sits on top',
    intro:
      'Waterproofing is the one trade where a small saving creates the largest bill. Vetonit spans the systems a UAE project actually needs: flexible cementitious coatings for wet areas and tanks, acrylic and hybrid membranes for roofs, liquid polyurethane where movement and UV meet, epoxy for potable and chemical tanks, and spray applied polyurea where speed and toughness decide it. Lapiz Blue holds the range in Dubai, Abu Dhabi and Sharjah. Tell us the element, the exposure and the finish going over it, and we will specify a system rather than a product.',
    applications: [
      'Bathrooms, showers and wet areas under tile',
      'Roofs, terraces and podium decks',
      'Water tanks, including potable water where the system allows it',
      'Basements, retaining walls and lift pits',
      'Swimming pools and water features',
      'Planters and landscaped areas over occupied space',
      'Rapid plugging of active leaks during construction',
    ],
    howToChoose: [
      'Start with the element. A roof that moves and bakes needs a different system from a bathroom floor that does not.',
      'Flexible cementitious suits wet areas and tanks, bonds to damp concrete and takes tile directly.',
      'Liquid polyurethane suits exposed roofs where UV and movement combine, provided the detailing is right.',
      'Use epoxy where the water is stored rather than shed, and check the certification for potable use.',
      'Polyurea is for speed and toughness, and needs the right equipment and a trained applicator.',
      'Every system stands or falls on the detailing. Budget for corner tape, upstands and penetration collars.',
      'Check what goes over the membrane before you choose. Some finishes need a specific primer.',
    ],
    commonMistakes: [
      'Applying a membrane to a substrate that is still green, contaminated or ponding water.',
      'Skipping the reinforcing tape at corners and junctions, which is where nearly all failures start.',
      'Applying one thick coat instead of the coats the sheet states, which never cures properly.',
      'Tiling over a membrane before it has cured, trapping moisture under the finish.',
    ],
    faqs: [
      {
        question: 'Which Vetonit system suits a bathroom under tile?',
        answer:
          'A flexible cementitious membrane is the usual answer. It bonds to damp concrete, bridges hairline cracks and accepts tile adhesive directly, so there is no extra primer stage. Vetoproof S and Vetoproof CM745 both cover this work. Detail the corners and the penetrations with reinforcing tape, and test the area before tiling.',
      },
      {
        question: 'What should I use on an exposed roof in the UAE?',
        answer:
          'An exposed roof has to survive UV, large daily temperature swings and movement, so a liquid applied polyurethane or hybrid membrane is usually right. If the roof is trafficked or carries equipment, say so, because the system then needs a protective or trafficable top coat rather than the membrane alone.',
      },
      {
        question: 'Can Vetonit waterproofing be used on a potable water tank?',
        answer:
          'Some products in the range are formulated for potable water and some are not, and the distinction matters. Tell us it is potable before you order and we will confirm against the current data sheet and supply the supporting certification for your submittal.',
      },
      {
        question: 'How much membrane do I need?',
        answer:
          'Coverage depends on the number of coats and the wet film thickness the sheet specifies, not on area alone. Where a product publishes a consumption rate, the product page calculates the quantity and the number of packs for you. Where it does not, send the area and the element and we will work it out against the data sheet.',
      },
    ],
    checklist: [
      'The element: roof, wet area, tank, basement, pool or planter',
      'Whether it is exposed to UV or covered by a finish',
      'What goes over the membrane, and whether it is trafficked',
      'Area in square metres, and the length of upstands and details',
      'Whether the structure moves or has existing cracks',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'sealants-and-joints',
    name: 'Sealants and Joints',
    description:
      'Polyurethane, epoxy urethane and polysulphide joint sealants for movement joints, trafficked joints and heavy duty industrial work.',
    metaDescription:
      'Vetonit joint sealants in Dubai. Polyurethane, epoxy urethane and polysulphide sealants for movement and trafficked joints, supplied by Lapiz Blue across the UAE.',
    seoTitle: 'Vetonit Joint Sealants UAE | Lapiz Blue',
    h1: 'Vetonit sealants for joints that have to keep moving',
    intro:
      'A movement joint exists because the structure moves. The sealant in it has to move too, for years, through a UAE summer, without losing adhesion to either face. Vetonit covers single component polyurethane for general construction joints, two component polyurethane and epoxy urethane where the joint is trafficked or heavily loaded, and polysulphide where chemical and fuel resistance decide it. Lapiz Blue supplies the range from Dubai, Abu Dhabi and Sharjah. Send the joint width, the expected movement and what runs over it.',
    applications: [
      'Movement and expansion joints in floors and walls',
      'Trafficked joints in car parks, warehouses and loading areas',
      'Perimeter joints around windows, doors and precast panels',
      'Joints exposed to fuel, oil or chemical spillage',
      'Wet area and sanitary joints',
      'Joints between dissimilar materials',
    ],
    howToChoose: [
      'Size the joint before you choose the sealant. Width, depth and expected movement decide the product.',
      'Keep the depth to width ratio the sheet states, and use a backing rod. A sealant bonded on three faces will tear.',
      'Single component polyurethane covers most general construction joints and is the simplest to apply.',
      'Use a two component system where the joint is trafficked or the cure has to be predictable.',
      'Polysulphide earns its place where fuel and chemicals are present.',
      'Prime the joint faces where the sheet calls for it, particularly on porous substrates.',
      'Check the movement capability against the real movement, not the nominal joint width.',
    ],
    commonMistakes: [
      'Omitting the backing rod, which lets the sealant bond to the joint base and tear as it moves.',
      'Filling a joint that is too narrow for the movement it has to take.',
      'Applying over damp, dusty or contaminated joint faces.',
      'Tooling the joint after the surface has already skinned.',
    ],
    faqs: [
      {
        question: 'How deep should a joint sealant be?',
        answer:
          'As a rule the depth is about half the width for most construction joints, with a backing rod controlling that depth and preventing three sided adhesion. Too deep and the sealant cannot stretch, too shallow and it tears. The data sheet for each product gives the ratio it was tested at, and we will send it with your quotation.',
      },
      {
        question: 'Which sealant suits a car park deck joint?',
        answer:
          'A trafficked joint needs a sealant that resists wheel loading and point loads without extruding, which usually means a two component polyurethane or an epoxy urethane rather than a general purpose single component product. Tell us the traffic type and the joint dimensions and we will match it.',
      },
      {
        question: 'Do you stock sealants in sausages and in kits?',
        answer:
          'Yes. The range covers 600 ml sausages for general work and 3 to 4 litre kits for two component systems. Pack size is listed on every product page, and we hold the common items in Dubai, Abu Dhabi and Sharjah.',
      },
    ],
    checklist: [
      'Joint width and depth, and the expected movement',
      'Whether the joint is trafficked, and by what',
      'The two substrate materials either side of the joint',
      'Exposure: internal, external, submerged, or chemical contact',
      'Total linear metres of joint',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'flooring-systems',
    name: 'Flooring Systems',
    description:
      'Self levelling underlayments, screeds, epoxy and polyurethane toppings, primers and floor hardeners for industrial and commercial floors.',
    metaDescription:
      'Vetonit flooring systems in Dubai. Self levelling underlayments, screeds, epoxy and PU toppings and floor hardeners, supplied by Lapiz Blue across the UAE.',
    seoTitle: 'Vetonit Flooring Systems UAE | Lapiz Blue',
    h1: 'Vetonit flooring, from the levelling layer to the wearing surface',
    intro:
      'A floor is a build up, not a product. Vetonit covers the whole of it: primers that control suction, self levelling underlayments from two millimetres up, screeds for heavier build ups, epoxy toppings for chemical resistance and hygiene, polyurethane systems where thermal shock and movement matter, and dry shake hardeners for concrete that simply has to take punishment. Lapiz Blue holds the range in Dubai, Abu Dhabi and Sharjah. Tell us the substrate, the thickness available and what the floor has to survive.',
    applications: [
      'Levelling existing slabs before tile, vinyl or carpet',
      'Industrial and warehouse floors under forklift traffic',
      'Food production and pharmaceutical areas needing a hygienic finish',
      'Workshops and plant rooms exposed to oils and chemicals',
      'Car parks and service areas',
      'Commercial interiors where a seamless finish is wanted',
      'Thin build ups where the finished level cannot change much',
    ],
    howToChoose: [
      'Start with the thickness you actually have. It rules products in and out faster than anything else.',
      'Prime first. Nearly every underlayment failure traces back to an unprimed or badly prepared slab.',
      'Match the topping to the attack: epoxy for chemicals and hygiene, polyurethane for thermal shock and movement.',
      'Check the compressive strength against the real loading, including point loads from racking.',
      'For heated floors or substrates that move, choose a system rated for it rather than hoping.',
      'Allow for the cure time in the programme. A fast floor that is walked on too early is a failed floor.',
      'Decide the finish and the slip resistance before you choose the system, not after.',
    ],
    commonMistakes: [
      'Pouring a self levelling compound onto a slab that has not been primed or mechanically prepared.',
      'Specifying a thin epoxy where thermal shock from hot washdown will lift it.',
      'Ignoring the moisture content of the slab before applying a sealed system.',
      'Running traffic on the floor before it has reached the strength the sheet states.',
    ],
    faqs: [
      {
        question: 'Which Vetonit underlayment suits a thin build up?',
        answer:
          'Vetotop CL530 is a premixed cementitious self levelling underlayment for two to ten millimetres, which covers most levelling work before tile or vinyl. Where the build up is deeper, Vetotop CL531 runs from eight to twenty millimetres and Vetotop CS536 covers thirty to one hundred. The decision is usually made by the level you have to match at the door threshold.',
      },
      {
        question: 'Epoxy or polyurethane for an industrial floor?',
        answer:
          'Epoxy gives excellent chemical resistance, hardness and a hygienic seamless finish, and suits most warehouse, workshop and production floors. Polyurethane handles thermal shock and movement far better, so it is the right answer where floors are steam cleaned or hot washed down, as in food production. If both matter, tell us and we will specify a hybrid build up.',
      },
      {
        question: 'Do I need a primer?',
        answer:
          'Almost always. A primer controls the suction of the slab, stops pinholing in the layer above and improves the bond. The range includes solvent based and solvent free epoxy primers and a universal option. Skipping it is the single most common cause of a floor having to be taken up and done again.',
      },
      {
        question: 'How long before the floor can take traffic?',
        answer:
          'It depends on the system and on site temperature, and the data sheet gives the figures for each product. As a general shape, foot traffic comes well before full chemical cure, and full mechanical loading comes last. We will send the sheet with your quotation so the programme can be built around real numbers.',
      },
    ],
    checklist: [
      'The substrate and its condition, including any existing coating',
      'The build up thickness available at the thinnest point',
      'What the floor has to resist: traffic, chemicals, heat or water',
      'Area in square metres and the shape of the pour',
      'The finish and slip resistance required',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'microcement-systems',
    name: 'Microcement Systems',
    description:
      'The Decofloor microcement system: penetrating primer, base coat, fine finish coat and UV resistant polyurethane sealer for walls and floors.',
    metaDescription:
      'Vetonit Decofloor microcement in Dubai. Primer, base coat, finish coat and UV resistant sealer for seamless walls and floors, supplied by Lapiz Blue in the UAE.',
    seoTitle: 'Vetonit Microcement Systems UAE | Lapiz Blue',
    h1: 'Vetonit Decofloor, a seamless microcement finish applied as a system',
    intro:
      'Microcement is sold as a look and delivered as a system. Decofloor is four products that have to be used together: a pure acrylic penetrating primer, a base coat at two to five millimetres, a fine finish coat up to two millimetres, and a UV resistant trafficable polyurethane sealer over the top. Leave one out and the finish will not last. Lapiz Blue supplies the full system from Dubai, Abu Dhabi and Sharjah, and will talk through the build up before you order, because this is a finish where the preparation decides the result.',
    applications: [
      'Seamless floors in apartments, villas and retail interiors',
      'Feature walls and vanity surfaces',
      'Bathrooms and wet rooms, over a suitable membrane',
      'Refurbishment over sound existing tile, avoiding demolition',
      'Commercial interiors wanting a continuous finish without joints',
      'Stairs and treads where a seamless look is wanted',
    ],
    howToChoose: [
      'Treat it as a system. The primer, base, finish and sealer are specified together for a reason.',
      'Check the substrate is sound, clean and flat. Microcement follows every defect underneath it.',
      'In wet areas, waterproof first. Microcement is a finish, not a membrane.',
      'Allow for the sealer in both cost and programme. It is what makes the floor trafficable and UV stable.',
      'Agree the colour and the finish with a sample on site, because application technique changes the look.',
      'For floors that take traffic, confirm the sealer coats against the expected wear.',
    ],
    commonMistakes: [
      'Applying microcement over an unprimed or dusty substrate.',
      'Treating the finish as waterproof and omitting the membrane underneath in a wet room.',
      'Skipping the sealer, or using fewer coats than the sheet states.',
      'Expecting a seamless finish to hide an uneven or moving substrate.',
    ],
    faqs: [
      {
        question: 'Can Decofloor microcement go over existing tiles?',
        answer:
          'Yes, provided the tiles are sound, well bonded and properly prepared. That is one of the main reasons people choose microcement for a refurbishment, because it avoids demolition and the dust and programme that come with it. Loose tiles must come up first, and the joints need treating so they do not telegraph through the finish.',
      },
      {
        question: 'Is microcement waterproof?',
        answer:
          'No, and treating it as waterproof is the most expensive mistake on this product. Microcement is a decorative finish that is water resistant once sealed. In a wet room or a bathroom, a waterproofing membrane goes underneath it, exactly as it would under tile.',
      },
      {
        question: 'How thick is the finished system?',
        answer:
          'The base coat runs from two to five millimetres and the finish coat up to two millimetres, so the build up is typically under eight millimetres plus the sealer. That is why it works over existing floors without changing door heights much, which is usually the deciding factor in a refurbishment.',
      },
    ],
    checklist: [
      'The substrate: concrete, screed, existing tile or board',
      'Whether the area is wet, and what waterproofing is already there',
      'Floor, wall or both, and the area in square metres',
      'The colour and finish you want, and whether you need a sample first',
      'Traffic level for the sealer specification',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'surface-treatments',
    name: 'Surface Treatments and Finishes',
    description:
      'Putties, skim coats, renders, crack fillers, water repellents, pore sealers, release agents and surface retarders.',
    metaDescription:
      'Vetonit surface treatments in Dubai. Putties, skim coats, renders, crack fillers, water repellents and release agents, supplied by Lapiz Blue across the UAE.',
    seoTitle: 'Vetonit Surface Treatments UAE | Lapiz Blue',
    h1: 'Vetonit surface treatments, the layer between the substrate and the finish',
    intro:
      'Most finishes are judged on the preparation underneath them. This part of the Vetonit range covers that work: water resistant cementitious putties and smooth coats for internal and external walls, gypsum jointing compounds, crack fillers, levelling renders, and the treatments that go onto concrete itself, including silane siloxane water repellents, pore sealers for limestone and masonry, formwork release agents and surface retarders for exposed aggregate. Lapiz Blue holds the range in Dubai, Abu Dhabi and Sharjah.',
    applications: [
      'Skimming internal and external walls before paint',
      'Jointing and finishing gypsum board',
      'Filling surface cracks before decoration',
      'Levelling and rendering blockwork and concrete',
      'Protecting limestone, masonry and natural stone from water ingress',
      'Formwork release on site and in precast yards',
      'Exposed aggregate finishes using a surface retarder',
    ],
    howToChoose: [
      'Match the putty to the exposure. External walls need a water resistant cementitious product, not an internal filler.',
      'For gypsum board, use a jointing compound made for it rather than a general filler.',
      'Choose a water repellent by substrate. Limestone, concrete and masonry do not behave the same.',
      'Check whether you need a penetrating sealer or a surface film. They solve different problems.',
      'For release agents, confirm whether the finish will be painted or exposed, because residue matters.',
      'Allow the correct drying time before decorating. Paint over a damp skim will fail.',
    ],
    commonMistakes: [
      'Using an internal putty on an external wall and watching it break down in the first rain.',
      'Applying a skim coat thicker than the sheet allows, which cracks as it dries.',
      'Sealing a wall that is still holding construction moisture.',
      'Using a release agent that leaves a residue the subsequent finish cannot bond to.',
    ],
    faqs: [
      {
        question: 'What is the difference between a putty and a render here?',
        answer:
          'A putty or skim coat is a thin finishing layer that gives a smooth surface for paint, usually a couple of millimetres. A render is a thicker levelling layer that corrects the geometry of the wall before that. Vetonit Render RND310 does the levelling work and the putties and smooth coats finish it. On a wall that is out of true, you need both.',
      },
      {
        question: 'Which water repellent suits natural stone?',
        answer:
          'For limestone, masonry and natural stone, a silicone based pore sealer or a water based silane siloxane repellent lets the substrate breathe while shedding water. The right one depends on the stone and on whether you want any change in appearance, so tell us the substrate and we will match it against the data sheet.',
      },
      {
        question: 'Can I use these products externally in UAE conditions?',
        answer:
          'Several are made specifically for it, and the names say so: the water resistant external range is marked WR EG. Summer application still needs care, because high temperatures shorten working times and rapid drying causes cracking. Apply outside the hottest part of the day and follow the curing guidance on the sheet.',
      },
    ],
    checklist: [
      'The substrate and whether it is internal or external',
      'The finish going on top, usually paint or a decorative coating',
      'Area in square metres and the condition of the surface',
      'Whether you are levelling, skimming, filling or protecting',
      'Any existing coating that has to be removed first',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'grouts-and-concrete-repair',
    name: 'Precision Grouts and Concrete Repair',
    description:
      'Non shrink cementitious and epoxy grouts, structural repair mortars, micro concrete, fairing coats and injection resins.',
    metaDescription:
      'Vetonit precision grouts and concrete repair in Dubai. Non shrink grouts, structural repair mortars, micro concrete and epoxy resins, from Lapiz Blue UAE.',
    seoTitle: 'Vetonit Grouts and Concrete Repair UAE | Lapiz Blue',
    h1: 'Vetonit precision grouts and concrete repair for load bearing work',
    intro:
      'Grouting a base plate and repairing a spalled column are both jobs where the material has to carry load and stop shrinking. Vetonit covers non shrink cementitious grouts for general and high strength work, three component epoxy grouts for dynamic loads, low viscosity epoxy injection resins for cracks, high strength structural repair mortars, flowable micro concrete for deeper sections, and fairing coats to finish the surface. Lapiz Blue supplies the range from Dubai, Abu Dhabi and Sharjah, with the data sheets needed for a structural submittal.',
    applications: [
      'Grouting machine bases, base plates and anchor bolts',
      'Dynamic load applications such as crane rails and presses',
      'Structural repair of spalled columns, beams and slabs',
      'Deeper reinstatement using flowable micro concrete',
      'Crack injection in structural concrete',
      'Fairing and making good before protective coating',
      'Anchoring starter bars and dowels',
    ],
    howToChoose: [
      'Decide whether the load is static or dynamic. Dynamic loads point at an epoxy grout, not a cementitious one.',
      'Check the gap and the pour depth. Flowability and maximum thickness both rule products in and out.',
      'Match compressive strength to the design requirement, and ask for the data sheet for the submittal.',
      'For repairs, choose by section depth: a repair mortar for shallow work, micro concrete for deeper reinstatement.',
      'Use a low viscosity injection resin for cracks, and confirm the crack is dormant before injecting.',
      'Finish with a fairing coat where a coating or a fair faced appearance follows.',
      'Plan the pour in UAE heat. Working times shorten sharply above thirty five degrees.',
    ],
    commonMistakes: [
      'Using a general purpose grout under a dynamically loaded base plate.',
      'Pouring beyond the maximum thickness on the sheet, which causes heat build up and cracking.',
      'Failing to saturate a cementitious substrate before a repair mortar, so the slab drinks the mixing water.',
      'Injecting a crack that is still moving without dealing with the cause.',
    ],
    faqs: [
      {
        question: 'Cementitious or epoxy grout for a machine base?',
        answer:
          'A non shrink cementitious grout handles most static machine bases and is simpler to place. Where the load is dynamic, as with reciprocating machinery, crane rails or presses, an epoxy grout is the right answer because it carries vibration and impact without breaking down. Vetogrout EG340 is the three component epoxy option in this range.',
      },
      {
        question: 'Which product suits a spalled concrete column?',
        answer:
          'For shallow spalling with exposed reinforcement, a high strength structural repair mortar such as Vetorep CR520 is applied by hand after the steel is cleaned and primed. Where the section is deeper or heavily congested with reinforcement, a flowable micro concrete like Vetorep CR521 is poured into formwork instead. Send photographs and the section depth and we will advise.',
      },
      {
        question: 'Can you supply data sheets for a structural submittal?',
        answer:
          'Yes. Saveto issues technical and safety data sheets to dealers rather than publishing them openly, so request them from any product page and we will send the current revision. For a submittal we will also supply the dealership certificate confirming Lapiz Blue is authorised for Vetonit in the UAE.',
      },
    ],
    checklist: [
      'Whether the load is static or dynamic',
      'The gap, pour depth or repair section depth',
      'Required compressive strength, if it is specified',
      'Condition of the existing concrete and any exposed reinforcement',
      'Volume needed, in litres or cubic metres',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'plasters-and-masonry',
    name: 'Plasters and Masonry',
    description:
      'Hand and spray applied cement plasters, gypsum plaster, thermal insulating plaster, decorative finish coats, masonry mortars and block adhesives.',
    metaDescription:
      'Vetonit plasters and masonry mortars in Dubai. Spray applied cement plaster, gypsum plaster, thermal and decorative finishes, supplied by Lapiz Blue in the UAE.',
    seoTitle: 'Vetonit Plasters and Masonry UAE | Lapiz Blue',
    h1: 'Vetonit plasters and masonry mortars, premixed for consistent site work',
    intro:
      'Site batched plaster is only as good as the last mix. Premixed plaster takes that variable out, which matters most on large elevations where a change in mix shows as a change in finish. Vetonit covers hand applied and sprayable cement plasters, gypsum plaster, lightweight acoustic and thermal insulating plasters, decorative textured finish coats, masonry mortars for concrete block, adhesive mortar for autoclaved aerated block, and the key coat that makes dense concrete accept plaster at all. Lapiz Blue supplies the range across Dubai, Abu Dhabi and Sharjah.',
    applications: [
      'Internal and external plaster on blockwork and concrete',
      'Spray applied plaster on large elevations',
      'Gypsum plaster for internal walls and ceilings',
      'Thermal insulating plaster on external walls and EIFS build ups',
      'Decorative textured finish coats at one to twenty millimetres',
      'Laying concrete masonry blocks and autoclaved aerated blocks',
      'Key coats on smooth dense concrete before plastering',
    ],
    howToChoose: [
      'Decide hand or spray first. Sprayable products are formulated for the pump and change the labour on site.',
      'Smooth dense concrete needs a key coat before plaster, or the plaster will not hold.',
      'Match the plaster to the block. Autoclaved aerated concrete needs its own adhesive mortar, not a standard one.',
      'For thermal performance, use the insulating plaster rather than adding thickness to a standard one.',
      'Choose the decorative finish by texture and thickness, then confirm the colour on a sample panel.',
      'Check coverage against the real wall area including returns and reveals, which are always underestimated.',
      'In summer, dampen substrates and protect fresh work, or rapid drying will craze the surface.',
    ],
    commonMistakes: [
      'Plastering straight onto smooth dense concrete without a key coat.',
      'Applying external plaster in the hottest hours and losing the mixing water before it cures.',
      'Using a standard mortar on autoclaved aerated blocks instead of the block adhesive.',
      'Building up thickness in one pass instead of the layers the sheet specifies.',
    ],
    faqs: [
      {
        question: 'Do I need a key coat before plastering concrete?',
        answer:
          'On smooth dense concrete, yes. The surface gives the plaster nothing to grip, and the usual result is hollow areas that sound drummy and eventually come away. Spatter Dash-MC SDM212 is the polymer modified key coat in this range, applied as a thin rough coat that the plaster then bonds to.',
      },
      {
        question: 'What is the advantage of a sprayable plaster?',
        answer:
          'Output and consistency. A pump places far more material per day than a hand gang, and because the product is premixed the mix does not change between batches, which shows on a long elevation. It requires the right pump and a trained operator, so it suits larger projects rather than small patches.',
      },
      {
        question: 'Which mortar suits autoclaved aerated concrete blocks?',
        answer:
          'Vetoblock Mortar AAC is made for it. Autoclaved aerated blocks are light and highly absorbent, and a standard sand cement mortar pulls water out of the joint too quickly and gives poor adhesion. The thin bed adhesive mortar is formulated around that absorbency.',
      },
    ],
    checklist: [
      'Substrate: concrete block, aerated block, concrete or existing plaster',
      'Hand applied or spray applied, and the pump if you have one',
      'Internal or external, and the total wall area',
      'The finish going on top, and whether it is decorative',
      'Any thermal or acoustic requirement',
      'City and the date you need it on site',
    ],
  },
  {
    slug: 'bonding-agents',
    name: 'Bonding Agents and Admixtures',
    description:
      'SBR, acrylic and PVA bonding agents, cement modifiers, waterproof mix enhancers, primers and polymeric soil stabilizer.',
    metaDescription:
      'Vetonit bonding agents and admixtures in Dubai. SBR, acrylic and PVA bonding agents, cement modifiers and soil stabilizer, supplied by Lapiz Blue across the UAE.',
    seoTitle: 'Vetonit Bonding Agents and Admixtures UAE | Lapiz Blue',
    h1: 'Vetonit bonding agents, for the joint between old work and new',
    intro:
      'New mortar does not bond to old concrete on its own. A bonding agent is what makes that joint work, and the same polymers improve the mortar they are mixed into. Vetonit covers multipurpose bonding agents and admixtures, low viscosity versions for tight work, PVA resin adhesives and sealers, SBR polymer for waterproof mix enhancement, acrylic cement modifiers, and a polymeric soil stabilizer for ground works. Lapiz Blue holds the range in Dubai, Abu Dhabi and Sharjah.',
    applications: [
      'Bonding new mortar, screed or render to existing concrete',
      'Improving the strength and adhesion of site mixed mortars',
      'Waterproof mix enhancement in screeds and renders',
      'Priming and sealing absorbent substrates before finishing',
      'Repair work where a feather edge has to hold',
      'Stabilising soil and unbound surfaces',
    ],
    howToChoose: [
      'Decide whether you are priming the substrate, modifying the mix, or both. Several products do both.',
      'SBR suits waterproof mix enhancement and external work. Acrylic and PVA suit internal work.',
      'Use PVA based products internally only. They re emulsify in persistent damp.',
      'Check whether the product is applied as a slurry coat or gauged into the mix, because dosage differs.',
      'Work while the bonding coat is still tacky unless the sheet says otherwise.',
      'Confirm dilution rates against the sheet rather than from habit, as they vary across the range.',
    ],
    commonMistakes: [
      'Using a PVA bonding agent in a permanently damp or external location.',
      'Letting the bonding coat dry fully before placing the mortar, so it acts as a release layer instead.',
      'Over diluting to stretch the drum and losing the bond entirely.',
      'Applying to a dusty substrate that was never properly cleaned.',
    ],
    faqs: [
      {
        question: 'SBR or PVA, which should I use?',
        answer:
          'SBR for anything external, permanently damp or structural, because it does not re emulsify in water. PVA is acceptable for internal work in dry conditions and is cheaper, which is why it gets used in the wrong places. If the area will ever be wet, use SBR.',
      },
      {
        question: 'Can bonding agents be added to the mix as well as painted on?',
        answer:
          'Several in this range do both, which is usually the most reliable approach: a slurry coat onto the prepared substrate and the same polymer gauged into the mortar so the two layers are chemically similar. Dosage rates differ by product, so follow the data sheet rather than a rule of thumb.',
      },
      {
        question: 'What is the soil stabilizer used for?',
        answer:
          'Vetobond PB436 is a polymeric soil stabilizer used to bind unbound surfaces, controlling dust and improving the load bearing behaviour of the ground. It is supplied in 20 and 200 litre drums. Tell us the area and the ground conditions and we will work out dilution and quantity against the sheet.',
      },
    ],
    checklist: [
      'Whether you are bonding, modifying a mix, priming or sealing',
      'The substrate and its condition',
      'Internal or external, and whether it will be permanently damp',
      'Area in square metres, or the mortar volume being modified',
      'Any structural requirement for the repair',
      'City and the date you need it on site',
    ],
  },
];

const productLines: ProductLine[] = COPY.map((c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description,
  metaDescription: c.metaDescription,
  images: [`/images/brands/vetonit/${c.slug}/hero.webp`],
  content: {
    seoTitle: c.seoTitle,
    h1: c.h1,
    intro: c.intro,
    applications: { title: 'Where it is used', items: c.applications },
    howToChoose: { title: 'How to choose', bullets: c.howToChoose },
    commonMistakes: { title: 'Common mistakes to avoid', bullets: c.commonMistakes },
    trustSignals,
    faqs: c.faqs,
    cta: cta(c.name.toLowerCase(), c.checklist),
    featuredProducts: vetonitProducts[c.slug] ?? [],
  },
}));

export const vetonit: BrandConfig = {
  slug: 'vetonit',
  name: 'Vetonit',
  layout: 'standard',
  logo: '/images/brands/logos/vetonit-new.webp',
  website: 'https://www.saveto.com/brand/vetonit',
  seoTitle: 'Vetonit Authorized Dealer in UAE | Lapiz Blue',
  h1: 'Vetonit authorized dealer in the UAE',
  theme: {
    primary: '#23395B',
    secondary: '#406E8E',
    accent: '#BFD7EA',
  },
  hero: {
    type: 'image',
    src: '/images/brands/vetonit/hero.webp',
    alt: 'Vetonit construction chemicals supplied by Lapiz Blue across the UAE',
  },
  description:
    'Lapiz Blue is an authorized Vetonit dealer in the UAE, holding a dealership certificate issued by Saveto. The range covers tile adhesives and grouts, waterproofing, sealants, flooring systems, microcement, surface treatments, precision grouts, concrete repair, plasters and bonding agents, supplied to contractors from Dubai, Abu Dhabi and Sharjah.',
  metaDescription:
    'Vetonit authorized dealer in the UAE. Lapiz Blue supplies tile adhesives, waterproofing, flooring, plasters and concrete repair from Dubai, Abu Dhabi and Sharjah.',
  category: 'brand',
  productLines,
  extendedContent: {
    brandStory:
      'Vetonit is the finishing materials brand of Saveto, a manufacturing group operating across the Middle East and North Africa with more than forty years in the industry. The range runs from the tile adhesive under a bathroom floor to the epoxy grout holding a machine base, and it is built around the conditions this region actually imposes: high summer temperatures, rapid drying, saline ground and substrates that move.',
    whyLapizBlue:
      'Lapiz Blue holds a dealership certificate for Vetonit in the United Arab Emirates, issued by Saveto and valid to June 2027. The range is stocked across three distribution centres in Dubai, Abu Dhabi and Sharjah, so a contractor can get material to site rather than wait on an import. Technical and safety data sheets are supplied on request for every product, including the supporting paperwork a consultant needs for a submittal.',
  },
};
