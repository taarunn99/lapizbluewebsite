import type { BrandConfig } from '@/data/brandConfigs';
import { kerakollProducts } from './kerakoll.products';

/*
  Kerakoll.

  The existing tiling and waterproofing copy is preserved exactly as it was.
  The four other lines are new, built from the Kerakoll Gulf catalogue.

  Product lists come from kerakoll.products.ts, generated from the manifest so
  the range on a page can never drift from the range that has pages.
*/


const BRANCHES = 'Dubai, Abu Dhabi and Sharjah';

/** Shared expectations, worded once and reused on every line. */
const trustSignals = {
  title: 'What you can expect',
  items: [
    { label: 'Authorisation', value: 'Supplied as an authorised Kerakoll distributor in the UAE' },
    { label: 'Coverage', value: `Supplied from ${BRANCHES}, UAE wide delivery` },
    { label: 'Documentation', value: 'Technical data sheets hosted on every product page' },
    { label: 'Technical guidance', value: 'Product selection against substrate, exposure and site conditions' },
    { label: 'Quotations', value: 'BOQ based quotations with practical alternatives where an item is on order' },
    { label: 'Range', value: '105 Kerakoll products across six product groups' },
  ],
};

const cta = (what: string, checklist: string[]) => ({
  title: `Need a recommendation or a quotation for ${what}?`,
  subtitle: 'Send your project details on WhatsApp or by email and we will come back the same day.',
  checklist,
});

export const kerakoll: BrandConfig = {
  slug: 'kerakoll',
  name: 'Kerakoll',
  layout: 'standard',
  logo: '/images/brands/logos/kerakoll-new.webp',
  website: 'https://gcc.kerakoll.com/',
  seoTitle: 'Kerakoll Supplier in Dubai & UAE | Lapiz Blue',
  h1: 'Kerakoll',
  theme: {
    primary: '#AFCDAF', // Sage Green
    secondary: '#1a1a1a', // Black
    accent: '#F0F5F0', // Light Green
  },
  hero: {
    type: 'image',
    src: '/images/brands/kerakoll/hero.webp',
    alt: 'Kerakoll eco-friendly tile adhesives and grout for sustainable building',
  },
  description: "Eco-friendly tile adhesives, decorative grouts, and mineral waterproofing - GreenBuilding certified products from Italy's leading green construction brand.",
  metaDescription: 'Kerakoll authorized distributor in UAE - Lapiz Blue supplies eco-friendly tile adhesives, grouts, and waterproofing systems for sustainable construction across Dubai, Abu Dhabi, and Sharjah.',
  category: 'brand',
  productLines: [
    {
      slug: 'tile-adhesives-and-grouts',
      name: 'Tile Adhesives and Grouts',
      description: 'Eco-sustainable tile adhesives and epoxy grouts.',
      metaDescription: 'Kerakoll tile adhesives UAE - Green building tile systems and eco-friendly grouts for Dubai sustainable projects.',
      images: ['/images/brands/kerakoll/tile-adhesives/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Tile Adhesives & Grouts UAE | Eco-Friendly Solutions',
        h1: 'Kerakoll Tile Adhesives and Grouts - Italian green technology for sustainable UAE projects',
        intro: 'Kerakoll brings Italian GreenLab innovation to UAE construction with tile fixing systems designed for both performance and environmental responsibility. The Biogel range delivers revolutionary gel technology that bonds any material to any substrate, while Fugalite Bio offers the first hypoallergenic grout - dermatologically tested at the University of Modena. Every Kerakoll product carries GreenBuilding certification, meeting the demands of sustainable construction projects across Dubai, Abu Dhabi, and the Emirates. Lapiz Blue supplies the complete Kerakoll tile fixing portfolio with guidance for green building specifications.',
        whySection: {
          title: 'Why Kerakoll Tile Adhesives and Grouts from Lapiz Blue?',
          bullets: [
            'Italian GreenLab innovation - products developed at Kerakoll research center with eco-sustainability as the foundation',
            'Biogel gel technology - revolutionary adhesive formulation with superior workability and bonding performance',
            'Hypoallergenic Fugalite Bio grout - dermatologically tested at University of Modena, safe for sensitive individuals',
            'GreenBuilding certified throughout - products designed for LEED and sustainable construction certification',
            'Low VOC emissions - healthier indoor air quality with minimal volatile organic compounds',
            'HACCP food hygiene compliant - Fugalite Bio approved for commercial kitchens and food processing areas'
          ]
        },
        applications: {
          title: 'Applications and Best-Fit Scenarios',
          items: [
            'Green certified buildings - GreenBuilding ideal products support LEED and sustainability certifications',
            'Healthcare and sensitive environments - hypoallergenic Fugalite Bio for hospitals, clinics, and care facilities',
            'Commercial kitchens and food areas - HACCP compliant grout meets food hygiene regulations',
            'Swimming pools and wet areas - chlorine-resistant Fugalite Bio handles permanent water exposure',
            'Large format and natural stone - Biogel No Limits bonds any material including moisture-sensitive stones',
            'Renovation over existing tiles - gel adhesives enable direct overlay without demolition'
          ]
        },
        howToChoose: {
          title: 'How to Choose the Right Kerakoll System',
          bullets: [
            'Identify sustainability requirements - GreenBuilding ideal products support green certification goals',
            'Consider occupant sensitivities - hypoallergenic Fugalite Bio eliminates dermatitis concerns',
            'Select adhesive by substrate - Biogel No Limits for challenging substrates, H40 Gel for standard applications',
            'Match grout to environment - Fugalite Bio for wet areas and kitchens, Fugalite Color for decorative needs',
            'Evaluate tile type - natural stone and moisture-sensitive materials need specific Biogel formulations',
            'Check food safety needs - HACCP compliance required for commercial food preparation areas',
            'Factor renovation conditions - gel technology allows application over existing coverings'
          ]
        },
        commonMistakes: {
          title: 'Common Mistakes to Avoid',
          bullets: [
            'Using standard adhesives on moisture-sensitive stone - green marble and agglomerate need Biogel formulations',
            'Specifying non-compliant grout for food areas - commercial kitchens require HACCP-certified Fugalite Bio',
            'Overlooking VOC requirements - green building projects need low-emission products; check specifications',
            'Applying grout too soon - Biogel adhesives need proper cure time before grouting despite fast initial set',
            'Ignoring hypoallergenic requirements in healthcare - hospitals and clinics benefit from dermatologically tested grouts'
          ]
        },
        trustSignals: {
          title: 'What You Can Expect',
          items: [
            { label: 'Certifications', value: 'GreenBuilding ideal, HACCP/EC 852/2004, dermatologically tested' },
            { label: 'Grout Colors', value: 'Fugalite Bio available in 23 natural shades for contemporary designs' },
            { label: 'Technology', value: 'Biogel gel adhesives, Fugalite water-based resin grouts' },
            { label: 'Testing', value: 'UV-stable (Catas), bacteriostatic (CSTB), marine use approved' },
            { label: 'UAE Coverage', value: 'Lapiz Blue supply from Dubai, Abu Dhabi, and Sharjah' },
            { label: 'Technical Support', value: 'Green building specification assistance and product selection' }
          ]
        },
        faqs: [
          {
            question: 'What makes Fugalite Bio hypoallergenic and why does it matter?',
            answer: 'Fugalite Bio was tested at the University of Modena dermatological clinic on 200 people with dermatitis, showing no allergic reactions. This makes it suitable for hospitals, schools, and environments where occupants have skin sensitivities. Standard epoxy grouts can cause reactions in sensitive individuals.'
          },
          {
            question: 'How does Biogel gel technology differ from standard tile adhesives?',
            answer: 'Biogel uses a unique gel formulation developed at Kerakoll GreenLab. The gel structure provides superior workability, extended open time, and exceptional bond strength. It bonds any material to any substrate - even challenging combinations like glass mosaic on timber or natural stone on metal.'
          },
          {
            question: 'Can Kerakoll products help achieve LEED certification?',
            answer: 'Yes. Kerakoll products carry GreenBuilding ideal certification with low VOC emissions, recycled content, and sustainable manufacturing. Technical data sheets document environmental credentials for green building certification submissions.'
          },
          {
            question: 'Is Fugalite Bio suitable for swimming pools?',
            answer: 'Yes. Fugalite Bio is chlorine-resistant and waterproof, making it ideal for swimming pools, spas, and water features. It maintains color stability and does not deteriorate with chemical exposure or permanent submersion.'
          },
          {
            question: 'What is the difference between Fugalite Bio and Fugalite Color?',
            answer: 'Fugalite Bio is a water-based hypoallergenic resin grout with 23 colors, designed for sensitive environments and food areas. Fugalite Color is a standard resin grout for general applications where hypoallergenic properties are not required but stain resistance is important.'
          },
          {
            question: 'Can I tile directly over existing ceramic tiles with Kerakoll?',
            answer: 'Yes. Biogel gel adhesives are specifically designed for renovation over existing tile coverings. The gel formula bonds effectively to glazed ceramic surfaces without requiring demolition, saving time and reducing construction waste.'
          },
          {
            question: 'Why choose Kerakoll for commercial kitchen tiling?',
            answer: 'Fugalite Bio is HACCP/EC 852/2004 compliant for food hygiene regulations. It is bacteriostatic (CSTB tested), easy to clean, and resistant to the aggressive cleaning chemicals used in commercial kitchens. This makes it the specification choice for restaurants, hotels, and food processing.'
          },
          {
            question: 'What colors are available in the Fugalite Bio range?',
            answer: 'Fugalite Bio offers 23 natural shades inspired by contemporary ceramic collections. Colors include White, Light Grey, Pearl Grey, Anthracite, Black, Jasmin, Ivory, Silver, Bahama Beige, and Ocean among others. Colors remain stable under UV exposure (Catas tested).'
          }
        ],
        cta: {
          title: 'Looking for eco-friendly tile fixing solutions?',
          subtitle: 'Contact us with your project requirements and sustainability goals. We will recommend the appropriate Kerakoll system and provide documentation for green building certifications.',
          checklist: [
            'Project type and sustainability certification targets',
            'Tile material (ceramic, porcelain, natural stone, mosaic)',
            'Installation environment (wet area, kitchen, healthcare)',
            'Grout color preference from 23 available shades',
            'Hypoallergenic or food hygiene requirements',
            'Renovation over existing tiles or new substrate'
          ]
        },
        brandCopy: {
          sections: [
            {
              title: 'Italian GreenLab Innovation',
              content: 'Kerakoll products originate from the GreenLab research center in Italy, where sustainability drives every development decision. Unlike brands that retrofit eco-credentials, Kerakoll designs products from the ground up to minimize environmental impact while maximizing performance. This commitment shows in low VOC emissions, recycled content, and manufacturing processes that reduce carbon footprint.'
            },
            {
              title: 'Biogel Gel Technology',
              content: 'The Biogel range represents Kerakoll revolutionary approach to tile adhesives. Traditional powder adhesives create dust and have limited working time. Biogel gel formulation eliminates dust, provides extended workability, and delivers structural bonding that handles extreme conditions. Biogel No Limits bonds any material to any substrate - the universal solution for complex installations.'
            },
            {
              title: 'Fugalite Bio Hypoallergenic Grout',
              content: 'Fugalite Bio is the world first hypoallergenic tile grout, tested at the University of Modena dermatological clinic. In studies with 200 dermatitis sufferers, Fugalite Bio caused no allergic reactions - a unique achievement in the grout market. For healthcare facilities, schools, and homes with sensitive occupants, this dermatological testing provides genuine peace of mind.'
            },
            {
              title: 'GreenBuilding Certification Support',
              content: 'Kerakoll products carry GreenBuilding ideal certification, designed specifically to support sustainable construction projects. Technical documentation includes VOC content, recycled material percentages, and environmental impact data required for LEED and other green building certification submissions. Lapiz Blue provides specification assistance for UAE green building projects.'
            },
            {
              title: 'Food Hygiene Compliance',
              content: 'Commercial kitchens, restaurants, and food processing facilities have specific hygiene requirements. Fugalite Bio is HACCP/EC 852/2004 compliant, meaning it meets European food safety standards for surfaces in contact with food preparation. The bacteriostatic properties (CSTB tested) inhibit bacterial growth, supporting commercial kitchen hygiene protocols.'
            },
            {
              title: 'Renovation Without Demolition',
              content: 'Kerakoll gel adhesives transform renovation projects by enabling tile installation directly over existing ceramic coverings. This eliminates demolition costs, reduces construction time, and minimizes waste sent to landfill. The gel formula bonds effectively to glazed surfaces that would defeat conventional adhesives.'
            },
            {
              title: 'Product Range Overview',
              content: 'The Kerakoll tile fixing range from Lapiz Blue includes: Biogel No Limits (universal structural gel), Biogel Revolution (accelerated adhesion gel), H40 Gel (eco-friendly standard set), Fugalite Bio (hypoallergenic resin grout, 23 colors), and Fugalite Color (standard resin grout). All products carry GreenBuilding certification for sustainable construction.'
            }
          ]
        },
        suggestedImages: [
          { description: 'Biogel gel adhesive application showing smooth workability', alt: 'Kerakoll Biogel gel tile adhesive application' },
          { description: 'Fugalite Bio grout in contemporary bathroom installation', alt: 'Kerakoll Fugalite Bio hypoallergenic grout in bathroom' },
          { description: 'Commercial kitchen tiling with HACCP compliant grout', alt: 'Kerakoll food hygiene compliant grout in commercial kitchen' },
          { description: 'Large format tile installation with Biogel No Limits', alt: 'Kerakoll Biogel No Limits for large format tiles' },
          { description: 'Swimming pool tiling with chlorine-resistant grout', alt: 'Kerakoll Fugalite Bio swimming pool grout' },
          { description: 'Natural stone installation with eco-friendly adhesive', alt: 'Kerakoll eco-friendly natural stone adhesive' },
          { description: 'Fugalite Bio color range showing 23 shade options', alt: 'Kerakoll Fugalite Bio grout color range' },
          { description: 'Renovation tiling over existing ceramic with gel adhesive', alt: 'Kerakoll overlay tiling renovation application' }
        ],
        featuredProducts: kerakollProducts['tile-adhesives-and-grouts'] ?? []
      }
    },
    {
      slug: 'waterproofing',
      name: 'Waterproofing',
      description: 'Eco-friendly waterproofing membranes and systems.',
      metaDescription: 'Kerakoll waterproofing UAE - Sustainable waterproofing solutions for green buildings in Dubai and UAE.',
      images: ['/images/brands/kerakoll/waterproofing/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Waterproofing UAE | Breathable Eco Membranes',
        h1: 'Kerakoll Waterproofing - Breathable membranes with end-of-life recyclability',
        intro: 'Kerakoll Aquastop waterproofing systems deliver protection with genuine environmental responsibility. These breathable membranes block water while allowing vapor transmission, preventing the trapped moisture problems that plague conventional systems. The Aquastop range carries GreenBuilding certification with very low VOC emissions, and at end of life, these membranes are recyclable as inert material - a sustainability feature unmatched by petroleum-based alternatives. Lapiz Blue supplies the complete Kerakoll waterproofing portfolio with technical guidance for sustainable UAE construction projects.',
        whySection: {
          title: 'Why Kerakoll Waterproofing from Lapiz Blue?',
          bullets: [
            'Breathable membrane technology - blocks liquid water while allowing moisture vapor to escape, preventing substrate damage',
            'GreenBuilding certified - very low VOC emissions and low CO2 manufacturing footprint for sustainable construction',
            'End-of-life recyclability - Aquastop membranes recyclable as inert material, reducing construction waste impact',
            'Anti-alkali and chlorine resistant - Aquastop Nanoflex handles aggressive environments including pools',
            'Apply over existing coverings - eliminate demolition by waterproofing directly over existing ceramic tiles',
            'Single and two-component options - flexible application choices for different project requirements'
          ]
        },
        applications: {
          title: 'Applications and Best-Fit Scenarios',
          items: [
            'Swimming pools and water features - chlorine-resistant Aquastop Nanoflex for permanent submersion',
            'Terraces and balconies - breathable Aquastop Green handles thermal movement and ponding water',
            'Bathroom wet areas - seamless membrane protection before tile installation',
            'Renovation over existing tiles - apply Aquastop directly on old ceramic without demolition',
            'Green building projects - GreenBuilding certified products for LEED and sustainability requirements',
            'Cracked substrates - Aquastop Green anti-cracking membrane bridges substrate defects'
          ]
        },
        howToChoose: {
          title: 'How to Choose the Right Kerakoll Waterproofing System',
          bullets: [
            'Evaluate substrate breathability needs - breathable membranes prevent trapped moisture on cementitious substrates',
            'Check chemical exposure - pools and water features need chlorine-resistant Aquastop Nanoflex',
            'Consider substrate condition - cracked supports require Aquastop Green anti-cracking formula',
            'Identify renovation scenarios - existing ceramic coverings can be waterproofed directly without removal',
            'Match to sustainability goals - GreenBuilding certification supports green building documentation',
            'Select component system - single-component for convenience, two-component for maximum performance',
            'Assess vapor pressure risk - substrates with potential vapor pressure need specialized treatment'
          ]
        },
        commonMistakes: {
          title: 'Common Mistakes to Avoid',
          bullets: [
            'Using non-breathable membranes on cementitious substrates - trapped moisture causes delamination and failure',
            'Skipping anti-cracking treatment on compromised supports - substrate cracks telegraph through standard membranes',
            'Applying over damp substrates without vapor management - moisture must be addressed before waterproofing',
            'Insufficient overlap at sheet joints - membrane continuity is essential for watertight performance',
            'Ignoring alkaline substrate conditions - pools and new concrete need anti-alkali formulations'
          ]
        },
        trustSignals: {
          title: 'What You Can Expect',
          items: [
            { label: 'Certifications', value: 'GreenBuilding ideal, low VOC, low CO2 emissions' },
            { label: 'Recyclability', value: 'End-of-life recyclable as inert material' },
            { label: 'Chemical Resistance', value: 'Anti-alkali and chlorine resistant (Aquastop Nanoflex)' },
            { label: 'Breathability', value: 'Vapor-permeable membranes prevent trapped moisture' },
            { label: 'UAE Coverage', value: 'Lapiz Blue supply from Dubai, Abu Dhabi, and Sharjah' },
            { label: 'Technical Support', value: 'Substrate assessment and system specification guidance' }
          ]
        },
        faqs: [
          {
            question: 'What makes Kerakoll waterproofing breathable and why does it matter?',
            answer: 'Aquastop membranes are mineral-based and allow water vapor to pass through while blocking liquid water. This prevents moisture from becoming trapped between the membrane and substrate, which causes delamination, efflorescence, and premature failure in conventional non-breathable systems.'
          },
          {
            question: 'Can I apply Aquastop over existing ceramic tiles?',
            answer: 'Yes. Aquastop membranes can be applied directly over existing dimensionally stable ceramic and marble tiles, eliminating the need for costly and time-consuming demolition. This is particularly valuable for renovation projects where minimizing disruption is important.'
          },
          {
            question: 'What does end-of-life recyclability mean for Aquastop?',
            answer: 'Aquastop membranes are recyclable as inert material at end of life. Unlike petroleum-based waterproofing that becomes construction waste, Kerakoll membranes can be processed and recycled, supporting circular economy principles and reducing landfill impact.'
          },
          {
            question: 'Which Aquastop product is best for swimming pools?',
            answer: 'Aquastop Nanoflex is the recommended choice for swimming pools. It is anti-alkali and chlorine-resistant, handles permanent water submersion, and bonds effectively to pool substrates. The breathable formula is compatible with typical pool construction methods.'
          },
          {
            question: 'How does Aquastop Green handle cracked substrates?',
            answer: 'Aquastop Green is specifically formulated as an anti-cracking waterproof membrane. It bridges existing substrate cracks and accommodates future movement without transferring cracks to the tile surface. This makes it suitable for imperfectly cured supports or substrates with existing damage.'
          },
          {
            question: 'What is the difference between Aquastop Nanoflex and Aquastop Flex?',
            answer: 'Aquastop Nanoflex is a single-component membrane with anti-alkali and chlorine resistance, ideal for pools and chemically demanding environments. Aquastop Flex is a two-component system offering maximum flexibility and adhesion for high-performance applications on terraces and balconies.'
          },
          {
            question: 'How does Kerakoll waterproofing support green building certification?',
            answer: 'Aquastop products carry GreenBuilding ideal certification with documented low VOC emissions and low CO2 manufacturing footprint. Technical data sheets provide the environmental credentials required for LEED and other green building certification submissions.'
          },
          {
            question: 'Can Aquastop handle substrates with vapor pressure?',
            answer: 'Aquastop Green is designed for substrates that might contain vapor pressure from imperfect curing or rising damp conditions. The breathable membrane allows vapor to escape while maintaining waterproof protection against liquid water intrusion.'
          }
        ],
        cta: {
          title: 'Need sustainable waterproofing for your project?',
          subtitle: 'Contact us with your project details and environmental goals. We will recommend the appropriate Kerakoll Aquastop system and provide documentation for green building specifications.',
          checklist: [
            'Application area (pool, terrace, bathroom, renovation)',
            'Substrate type and current condition',
            'Chemical exposure requirements',
            'Green building certification targets',
            'Renovation over existing tiles (yes/no)',
            'Project timeline and access conditions'
          ]
        },
        brandCopy: {
          sections: [
            {
              title: 'Breathable Membrane Technology',
              content: 'Conventional waterproofing membranes create a vapor barrier that traps moisture between the membrane and substrate. This trapped moisture causes efflorescence, delamination, and premature system failure. Kerakoll Aquastop membranes are breathable - they block liquid water while allowing water vapor to escape. This critical difference ensures long-term performance on cementitious substrates.'
            },
            {
              title: 'Aquastop Nanoflex Single-Component',
              content: 'Aquastop Nanoflex is a certified, eco-friendly, breathable mineral membrane for flexible waterproofing. The single-component formula simplifies application while delivering anti-alkali and chlorine resistance for demanding environments. Low CO2 emissions and very low VOC content make it the sustainable choice for green building projects.'
            },
            {
              title: 'Aquastop Flex Two-Component System',
              content: 'For maximum performance on terraces, balconies, and swimming pools, Aquastop Flex delivers two-component waterproofing with exceptional adhesion and flexibility. The system creates water-resistant barriers before ceramic tile installation, even over existing coverings, eliminating the need for costly demolition work.'
            },
            {
              title: 'Aquastop Green Anti-Cracking Formula',
              content: 'Substrates with existing cracks, imperfect curing, or potential vapor pressure require specialized treatment. Aquastop Green is an anti-cracking waterproof membrane that bridges substrate defects and accommodates movement. It creates watertight protection even on compromised supports that would defeat standard membranes.'
            },
            {
              title: 'End-of-Life Environmental Responsibility',
              content: 'Sustainability extends beyond installation to end-of-life disposal. Aquastop membranes are recyclable as inert material, unlike petroleum-based alternatives that become permanent construction waste. This circular economy approach reflects Kerakoll commitment to genuine environmental responsibility throughout the product lifecycle.'
            },
            {
              title: 'Renovation Without Demolition',
              content: 'Bathroom and kitchen renovations traditionally require demolishing existing tile coverings before waterproofing. Aquastop membranes can be applied directly over existing ceramic and marble tiles, dramatically reducing renovation time, cost, and construction waste. This overlay capability transforms the economics of waterproofing upgrades.'
            },
            {
              title: 'Product Range Overview',
              content: 'The Kerakoll waterproofing range from Lapiz Blue includes: Aquastop Nanoflex (single-component, anti-alkali, chlorine-resistant), Aquastop Flex (two-component, maximum flexibility), Aquastop Green (anti-cracking, vapor-permeable), Aquastop Extreme (high chemical resistance), and Aquastop Fix (accessory sealant). All products carry GreenBuilding certification.'
            }
          ]
        },
        suggestedImages: [
          { description: 'Aquastop Nanoflex application on swimming pool substrate', alt: 'Kerakoll Aquastop Nanoflex swimming pool waterproofing' },
          { description: 'Breathable membrane allowing vapor transmission', alt: 'Kerakoll breathable waterproofing membrane' },
          { description: 'Terrace waterproofing with Aquastop Flex system', alt: 'Kerakoll Aquastop Flex terrace waterproofing' },
          { description: 'Bathroom waterproofing before tile installation', alt: 'Kerakoll bathroom waterproofing membrane before tiling' },
          { description: 'Application over existing ceramic tiles renovation', alt: 'Kerakoll waterproofing overlay for renovation' },
          { description: 'Aquastop Green on cracked substrate', alt: 'Kerakoll anti-cracking waterproofing membrane' },
          { description: 'GreenBuilding certified product documentation', alt: 'Kerakoll GreenBuilding certified waterproofing' },
          { description: 'Completed waterproofed surface ready for tiling', alt: 'Kerakoll waterproofing ready for tiles' }
        ],
        featuredProducts: kerakollProducts['waterproofing'] ?? []
      }
    },
    {
      slug: 'flooring-systems',
      name: 'Flooring Systems',
      description:
        'Primers, self levelling compounds and adhesives for wood, resilient and textile floor coverings, built around low emission formulations.',
      metaDescription:
        'Kerakoll flooring systems in Dubai. Primers, self levellers and adhesives for wood, vinyl and textile floors, supplied by Lapiz Blue across the UAE.',
      images: ['/images/brands/kerakoll/flooring-systems/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Flooring Systems UAE | Lapiz Blue',
        h1: 'Kerakoll flooring systems, from the primer up',
        intro:
          'A floor covering is only as good as the layers under it. Kerakoll covers that build up: adhesion promoters and primers that control the suction of the slab, self levelling compounds that give a covering the flat plane it needs, and adhesives formulated for wood, vinyl, rubber and textile backings. The range is built around very low emission formulations, which matters in an occupied fit out where the building is handed over days after the floor goes down. Lapiz Blue supplies it from Dubai, Abu Dhabi and Sharjah. Tell us the covering, the substrate and the thickness you have to work in, and we will specify the layers rather than a single product.',
        applications: {
          title: 'Where it is used',
          items: [
            'Priming concrete and screed before a levelling compound',
            'Levelling slabs before vinyl, wood or textile coverings',
            'Bonding engineered and solid wood flooring',
            'Bonding vinyl, LVT and rubber in commercial interiors',
            'Occupied fit outs where emissions and odour matter',
            'Floors over underfloor heating',
          ],
        },
        howToChoose: {
          title: 'How to choose',
          bullets: [
            'Start with the covering. Wood, vinyl and textile each need a different adhesive chemistry.',
            'Prime first. Suction control is what stops a levelling compound drying out and dusting.',
            'Match the self leveller to the thickness you actually have at the thinnest point.',
            'Check the emission rating if the building will be occupied soon after handover.',
            'For underfloor heating, confirm the adhesive is rated for the temperature cycling.',
            'Let each layer reach the moisture level the sheet states before the next goes down.',
          ],
        },
        commonMistakes: {
          title: 'Common mistakes to avoid',
          bullets: [
            'Laying a levelling compound on an unprimed slab, which is the most common cause of failure.',
            'Using a wood adhesive under vinyl, or the reverse, because both were on the van.',
            'Fitting a covering before the substrate has reached its stated moisture content.',
            'Ignoring the emission rating in a building that is about to be occupied.',
          ],
        },
        trustSignals,
        faqs: [
          {
            question: 'Do I need a primer before a Kerakoll self leveller?',
            answer:
              'Almost always. A primer controls how fast the slab draws water out of the compound. Without it the compound dries before it has hydrated, leaving a weak dusty surface that takes the covering off with it later. The range includes adhesion promoters for difficult and non absorbent substrates as well as standard primers.',
          },
          {
            question: 'Which adhesive suits engineered wood flooring?',
            answer:
              'Wood moves with humidity, so the adhesive has to stay slightly elastic rather than set rigid. Kerakoll supplies adhesives formulated for wood specifically. Send the board type, the format and the substrate and we will confirm which grade, because solid and engineered boards behave differently.',
          },
          {
            question: 'What does the emission rating actually mean on site?',
            answer:
              'It describes how much volatile organic compound the product releases as it cures. On a fit out that hands over quickly, or in a school or hospital, that decides whether the space can be occupied. Kerakoll build their range around very low emission formulations, and we can supply the certification with a submittal.',
          },
        ],
        cta: cta('flooring systems', [
          'The floor covering going down',
          'The substrate and its condition',
          'Build up thickness available at the thinnest point',
          'Area in square metres',
          'Whether the floor is heated',
          'City and the date you need it on site',
        ]),
        featuredProducts: kerakollProducts['flooring-systems'] ?? [],
      },
    },
    {
      slug: 'plasters-and-masonry',
      name: 'Plasters and Masonry',
      description:
        'Natural hydraulic lime plasters, renders and finishes from the Biocalce range, for masonry that needs to breathe.',
      metaDescription:
        'Kerakoll Biocalce lime plasters and renders in Dubai. Vapour permeable natural hydraulic lime systems for masonry, from Lapiz Blue across the UAE.',
      images: ['/images/brands/kerakoll/plasters-and-masonry/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Biocalce Lime Plasters UAE | Lapiz Blue',
        h1: 'Kerakoll Biocalce, lime plasters for masonry that has to breathe',
        intro:
          'Biocalce is natural hydraulic lime, not cement, and that difference decides where it belongs. Lime is vapour permeable and slightly flexible, so moisture moves out through the plaster rather than being trapped behind it, and the plaster stays softer than the masonry it sits on. Cement does the opposite: it traps moisture and is harder than old masonry, which is why cement render on a historic wall pushes salts and damage back into the substrate. The range covers base coats, bedding mortars, fine finishes and mineral paints as one system. Lapiz Blue supplies it from Dubai, Abu Dhabi and Sharjah.',
        applications: {
          title: 'Where it is used',
          items: [
            'Plastering and rendering masonry that needs to stay vapour permeable',
            'Restoration and conservation work on older buildings',
            'Bedding mortars for stone and brick',
            'Fine finish coats and decorative lime finishes',
            'Mineral silicate paints over lime substrates',
            'Walls where salts or rising damp are present',
          ],
        },
        howToChoose: {
          title: 'How to choose',
          bullets: [
            'Decide lime or cement first. On old or damp masonry, lime is usually the correct answer.',
            'Build the system from one family. A lime base under a cement finish defeats the point.',
            'Match the finish grain to the look you want, from coarse base to fine skim.',
            'Use a mineral paint over lime, not a plastic film paint, or the wall stops breathing.',
            'Allow lime its curing time. It carbonates slowly and will not be hurried.',
            'Protect fresh work from direct sun and wind, which matter more here than in Europe.',
          ],
        },
        commonMistakes: {
          title: 'Common mistakes to avoid',
          bullets: [
            'Finishing a lime plaster with an acrylic paint, which seals in the moisture it was chosen to release.',
            'Applying a cement base coat under a lime finish.',
            'Rushing the cure, or applying in full sun without protection.',
            'Treating lime as a cosmetic choice when it is a technical one.',
          ],
        },
        trustSignals,
        faqs: [
          {
            question: 'Why use lime instead of cement?',
            answer:
              'Lime is vapour permeable and stays softer than the masonry behind it. Moisture passes out through the plaster instead of being trapped, and the plaster yields rather than cracking the substrate. Cement does neither, which is why it damages older masonry over time. On modern blockwork a cementitious plaster is usually the right choice; on old or damp masonry, lime is.',
          },
          {
            question: 'Can I paint over Biocalce with normal paint?',
            answer:
              'Not if you want the wall to keep breathing. A conventional film forming paint seals the surface and undoes the reason lime was specified. Use a mineral silicate paint, which bonds chemically with the lime and stays permeable. Kerakoll supply those in the same range.',
          },
          {
            question: 'Does lime plaster suit UAE conditions?',
            answer:
              'Yes, with care during application. Lime cures by carbonation rather than by hydration, and high temperature and wind can dry it before that gets going. Apply outside the hottest hours and protect fresh work. The payoff is a wall that handles salt and moisture better than cement does.',
          },
        ],
        cta: cta('lime plasters and masonry products', [
          'The substrate: old masonry, stone, brick or modern block',
          'Whether damp or salts are present',
          'Internal or external, and the total wall area',
          'The finish and texture you want',
          'Whether the wall will be painted, and with what',
          'City and the date you need it on site',
        ]),
        featuredProducts: kerakollProducts['plasters-and-masonry'] ?? [],
      },
    },
    {
      slug: 'surface-treatments',
      name: 'Surface Treatments and Finishes',
      description:
        'Mineral silicate paints, consolidants and finishing coats that stay vapour permeable over lime and mineral substrates.',
      metaDescription:
        'Kerakoll surface treatments in Dubai. Mineral silicate paints, consolidants and permeable finishes, supplied by Lapiz Blue across the UAE.',
      images: ['/images/brands/kerakoll/surface-treatments/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Mineral Paints and Finishes UAE | Lapiz Blue',
        h1: 'Kerakoll mineral finishes, which stay breathable',
        intro:
          'A mineral silicate paint is not a film laid on top of a wall. It reacts with a mineral substrate and becomes part of it, which is why it stays vapour permeable where a conventional paint seals the surface. That matters on lime plaster, on masonry carrying moisture, and on any wall where trapping damp behind a coating would push the problem back into the substrate. The range covers consolidants for weak surfaces, silicate primers and pure silicate paints. Lapiz Blue supplies it from Dubai, Abu Dhabi and Sharjah.',
        applications: {
          title: 'Where it is used',
          items: [
            'Painting lime plaster and mineral renders',
            'Consolidating weak or friable masonry surfaces',
            'Restoration work where breathability is specified',
            'External elevations exposed to sun and salt',
            'Any wall where a film forming paint would trap moisture',
          ],
        },
        howToChoose: {
          title: 'How to choose',
          bullets: [
            'Confirm the substrate is mineral. Silicate paint needs something to react with.',
            'Consolidate first where the surface is friable, or the paint takes the dust with it.',
            'Use the matching primer from the same family rather than a general purpose one.',
            'Do not overcoat a silicate system with an acrylic paint later.',
            'Allow the stated time between coats; the reaction is chemical, not just drying.',
          ],
        },
        commonMistakes: {
          title: 'Common mistakes to avoid',
          bullets: [
            'Applying silicate paint over an existing plastic paint, which gives it nothing to bond to.',
            'Skipping the consolidant on a chalky or friable surface.',
            'Treating a breathable system as a waterproofing layer.',
            'Painting in full sun, which flashes off the water before the reaction completes.',
          ],
        },
        trustSignals,
        faqs: [
          {
            question: 'What makes a silicate paint different?',
            answer:
              'It reacts chemically with a mineral substrate rather than forming a film on top of it. The result is a finish that is part of the wall, stays vapour permeable and does not peel in the way a film can. It only works on mineral surfaces, so an existing plastic paint has to come off first.',
          },
          {
            question: 'Can it be used over an old painted wall?',
            answer:
              'Only if the old coating is mineral or has been removed. Over an acrylic or vinyl paint there is nothing for the silicate to bond with, and it will fail. Tell us what is on the wall now and we will advise whether preparation or a different system is needed.',
          },
        ],
        cta: cta('mineral finishes', [
          'The substrate and what is currently on it',
          'Whether the surface is sound or friable',
          'Internal or external, and the area in square metres',
          'Whether breathability is a specification requirement',
          'City and the date you need it on site',
        ]),
        featuredProducts: kerakollProducts['surface-treatments'] ?? [],
      },
    },
    {
      slug: 'grouts-and-concrete-repair',
      name: 'Concrete Repair',
      description:
        'Geolite geo mortars for structural concrete repair, formulated around mineral binders rather than ordinary cement.',
      metaDescription:
        'Kerakoll Geolite concrete repair mortars in Dubai. Structural geo mortars for spalled and damaged concrete, from Lapiz Blue across the UAE.',
      images: ['/images/brands/kerakoll/grouts-and-concrete-repair/hero.webp'],
      content: {
        seoTitle: 'Kerakoll Geolite Concrete Repair UAE | Lapiz Blue',
        h1: 'Kerakoll Geolite, structural repair for damaged concrete',
        intro:
          'Geolite is a geo mortar, built on mineral binders rather than ordinary Portland cement, and designed to repair structural concrete without introducing the shrinkage and the chlorides that cause the next failure. The usual job is a spalled column or slab where the reinforcement has corroded and burst the cover off, and the repair has to carry load, bond to sound concrete and protect the steel for the rest of the structure life. Lapiz Blue supplies the range from Dubai, Abu Dhabi and Sharjah, with the data sheets a consultant needs for a submittal.',
        applications: {
          title: 'Where it is used',
          items: [
            'Structural repair of spalled columns, beams and slabs',
            'Reinstating cover over corroded reinforcement',
            'Repairs where low shrinkage is specified',
            'Work requiring a chloride free repair material',
            'Structures exposed to marine or saline ground conditions',
          ],
        },
        howToChoose: {
          title: 'How to choose',
          bullets: [
            'Break back to sound concrete first; a repair over damaged material fails with it.',
            'Clean and protect the exposed reinforcement before any mortar goes on.',
            'Match the mortar to the section depth and whether it is applied by hand or poured.',
            'Saturate the substrate so it does not draw water out of the repair.',
            'Confirm the strength class against what the structural engineer specified.',
          ],
        },
        commonMistakes: {
          title: 'Common mistakes to avoid',
          bullets: [
            'Patching over corroded steel without treating it, which simply delays the same failure.',
            'Applying to a dry substrate, so the slab drinks the mixing water.',
            'Exceeding the stated layer thickness in one pass.',
            'Choosing a repair mortar by price rather than by the specified strength class.',
          ],
        },
        trustSignals,
        faqs: [
          {
            question: 'What is a geo mortar?',
            answer:
              'It is a repair mortar built on mineral binders rather than ordinary Portland cement. The practical benefits are low shrinkage, good bond to existing concrete and a chloride free composition, which matters where the structure is already suffering from chloride driven corrosion.',
          },
          {
            question: 'Can you supply data sheets for a structural submittal?',
            answer:
              'Yes. Kerakoll publish their technical data sheets openly and we host the current revision on each product page, so you can download it directly. For a submittal we can also supply our authorisation documentation.',
          },
        ],
        cta: cta('concrete repair mortars', [
          'The element and the extent of the damage',
          'Section depth of the repair',
          'Condition of the exposed reinforcement',
          'Any specified strength class',
          'Volume needed',
          'City and the date you need it on site',
        ]),
        featuredProducts: kerakollProducts['grouts-and-concrete-repair'] ?? [],
      },
    },
  ],
  extendedContent: {
    brandStory: 'Kerakoll pioneers sustainable construction materials from their GreenLab innovation center in Italy. Their gel-technology adhesives, eco-friendly grouts, and waterproofing systems are designed to build better places to live while minimizing environmental impact. Every Kerakoll product reflects their commitment to green building practices and contemporary design.',
    whyLapizBlue: 'Lapiz Blue is your gateway to Kerakoll\'s eco-conscious building solutions in the UAE. We support architects and contractors committed to sustainable construction with technical guidance on green material specifications and LEED-compatible products.',
    uniqueSection: {
      type: 'green',
      title: 'GreenBuilding Commitment',
      subtitle: 'Building better places to live through sustainable innovation',
      items: [
        { name: 'Biogel Technology', description: 'Revolutionary gel adhesives that bond everything with superior performance' },
        { name: 'Eco-certified Products', description: 'Materials certified for environmental sustainability and green building standards' },
        { name: 'Low VOC Formulations', description: 'Healthier indoor air quality with low volatile organic compound products' },
        { name: 'Sustainable Sourcing', description: 'Responsibly sourced raw materials with minimal environmental footprint' },
      ],
    },
  },
};
