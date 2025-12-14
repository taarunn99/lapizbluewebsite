/**
 * Brand Configuration System
 * Defines layout types, product lines, and theming for all brands
 */

export type LayoutType = 'custom' | 'standard';

export interface ProductLineFAQ {
  question: string;
  answer: string;
}

export interface ProductLineContent {
  seoTitle?: string; // Custom SEO title (max ~60 chars)
  h1?: string; // Custom H1 heading
  intro?: string; // Above-the-fold intro (80-120 words)
  whySection?: {
    title?: string;
    bullets: string[];
  };
  applications?: {
    title?: string;
    items: string[];
  };
  howToChoose?: {
    title?: string;
    bullets: string[];
  };
  commonMistakes?: {
    title?: string;
    bullets: string[];
  };
  trustSignals?: {
    title?: string;
    items: Array<{
      label: string;
      value: string;
    }>;
  };
  faqs?: ProductLineFAQ[];
  cta?: {
    title?: string;
    subtitle?: string;
    checklist?: string[];
  };
  brandCopy?: {
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  suggestedImages?: Array<{
    description: string;
    alt: string;
  }>;
}

export interface ProductLine {
  slug: string;
  name: string;
  description: string;
  metaDescription: string;
  images: string[];
  features?: string[];
  downloads?: Array<{
    title: string;
    type: string;
    url: string;
  }>;
  content?: ProductLineContent; // Rich content for detailed product line pages
}

export interface UniqueSectionItem {
  name: string;
  description: string;
  icon?: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconType: 'stones' | 'wood' | 'home' | 'building';
}

export interface CapabilityItem {
  title: string;
  subtitle: string;
  content: string;
  image?: string;
}

export interface ExtendedContent {
  brandStory: string;
  whyLapizBlue: string;
  uniqueSection?: {
    type: 'systems' | 'green' | 'expertise' | 'gallery';
    title: string;
    subtitle: string;
    items: UniqueSectionItem[];
  };
  stats?: StatItem[];
  capabilities?: {
    intro: string;
    items: CapabilityItem[];
  };
}

export interface BrandConfig {
  slug: string;
  name: string;
  layout: LayoutType;
  logo: string;
  website?: string; // Official brand website URL
  theme: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  hero: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  };
  description: string;
  productLines: ProductLine[];
  metaDescription: string;
  category: 'brand' | 'tool';
  extendedContent?: ExtendedContent; // For standard layout brands
  hideProductNav?: boolean; // Hide product line navigation
  hideProductGrid?: boolean; // Hide product line grid cards
}

// BRANDS & PARTNERS
export const brandConfigs: Record<string, BrandConfig> = {
  // ===== CUSTOM LAYOUT BRANDS =====
  mapei: {
    slug: 'mapei',
    name: 'Mapei',
    layout: 'custom',
    logo: '/images/brands/logos/mapei-new.png',
    website: 'https://www.mapei.com',
    theme: {
      primary: '#23395B', // Lapiz Blue primary
      secondary: '#1E6BA8', // Lapiz Blue accent
      accent: '#BFD7EA', // Lapiz Blue light
    },
    hero: {
      type: 'image',
      src: '/images/brands/mapei/hero.jpg',
      alt: 'Mapei - Building the Future',
    },
    description: 'World leader in adhesives, sealants and chemical products for building.',
    metaDescription: 'Mapei UAE - Leading supplier of tile adhesives, grouts, waterproofing, flooring systems, and construction chemicals in Dubai, Abu Dhabi, and Sharjah.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'High-performance tile adhesives and grouts for all types of ceramic, porcelain, and natural stone installations.',
        metaDescription: 'Shop Mapei tile adhesives and grouts in the UAE. Cementitious and epoxy grout options, documentation support, and UAE-wide delivery from Lapiz Blue.',
        images: ['/images/brands/mapei/tile-adhesives.jpg'],
        content: {
          seoTitle: 'Mapei Tile Adhesives & Grouts UAE | Lapiz Blue',
          h1: 'Mapei tile adhesives and grouts that keep finishes clean, strong, and long-lasting',
          intro: 'A good tile job is more than straight lines. It\'s the bond under the tile and the grout in the joint that decides whether the surface stays solid, stain-free, and easy to maintain. At Lapiz Blue, we supply Mapei tile adhesives and grouts for everyday residential projects and demanding commercial sites. You can enquire for the right option for porcelain tiles, large-format tiles, and natural stone, plus grout choices that suit wet areas, high footfall, and hygiene-sensitive spaces. Share your tile type, tile size, substrate, and area conditions, and we\'ll guide you to a suitable system.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Bathrooms, kitchens, and wet areas where joints must stay clean and water exposure is frequent',
              'Large-format floors and walls where full coverage and stable setting matters',
              'Porcelain tiles where low absorption needs the right bonding approach',
              'Marble and natural stone installations where careful selection avoids avoidable issues',
              'Lobbies, retail, and high-traffic zones where grout needs long-term colour stability',
              'Commercial kitchens, food areas, and industrial spaces where epoxy grout is preferred for hygiene and chemical resistance'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Option',
            bullets: [
              'Start with the tile: ceramic, porcelain, marble, or mosaic each behaves differently',
              'Match the adhesive to the format: tile adhesive for large format tiles needs better coverage control and handling',
              'For dense tiles: tile adhesive for porcelain tiles should be chosen to suit low absorption and site demands',
              'For stone: Tile Adhesive for Marbles and Tile Glue for Marbles should be selected with the stone type and application area in mind',
              'Pick grout by exposure, not only colour: choose Mapei cementitious grout for most interiors, and epoxy grout where staining, chemicals, or strict hygiene is expected',
              'Confirm joint width and cleaning routine early, especially for feature tiles and high-visibility areas',
              'For faster handovers, ask for quick-setting and faster-ready options where suitable',
              'If you are searching "Mapei Tile Adhesive UAE" for a live site requirement, send tile size, substrate, and area details so we shortlist the right options quickly'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Treating grout as only a colour choice, then struggling with stains and maintenance later',
              'Using a generic adhesive for porcelain or large-format tiles without checking suitability',
              'Skipping substrate preparation, then blaming the adhesive for hollow spots or debonding',
              'Grouting too early or washing too aggressively, leading to patchy joints and weakened grout lines'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery with export support on request' },
              { label: 'Availability', value: 'In stock, usually available, project order, and on request depending on the specific Mapei product and colour requirement' },
              { label: 'Branch Support', value: 'Dubai, Abu Dhabi, and Sharjah supply coordination' },
              { label: 'Technical Guidance', value: 'Selection support for adhesives and grouts based on tile type, substrate, and exposure' },
              { label: 'Documentation', value: 'TDS, SDS, and supporting submittal documents available when required' },
              { label: 'Quotations', value: 'BOQ-based quotations for contractors, consultants, retailers, and homeowners, with practical alternatives if one item is temporarily unavailable' }
            ]
          },
          faqs: [
            {
              question: 'Are you Mapei grout suppliers?',
              answer: 'Yes. Lapiz Blue supplies Mapei grout options and helps you choose the right type for your site conditions and maintenance expectations.'
            },
            {
              question: 'What is the difference between Mapei cementitious grout and Mapei Epoxy Grout?',
              answer: 'Cementitious grout is common for many residential and general commercial areas. Epoxy grout is typically selected where chemical resistance, hygiene, and long-term durability are priorities.'
            },
            {
              question: 'Do you supply Mapei tile grout for high-traffic projects?',
              answer: 'Yes. Share the area type and cleaning routine, and we\'ll suggest a grout option suited for heavy use and frequent cleaning.'
            },
            {
              question: 'I\'m looking for "Mapei glue Dubai". Can you help urgently?',
              answer: 'Yes. WhatsApp your tile type, tile size, substrate, and whether it\'s wall or floor. We\'ll guide you to a suitable Mapei option and share availability.'
            },
            {
              question: 'Which tile adhesive should I use for porcelain tiles or large-format tiles?',
              answer: 'Porcelain and large-format tiles generally need a stronger, more suitable adhesive choice than small ceramic tiles. Share tile size, substrate, and exposure (wet or dry), and we\'ll shortlist options for your job.'
            },
            {
              question: 'Can you recommend Tile Adhesive for Marbles?',
              answer: 'Yes. Natural stone needs careful selection. Tell us the stone type, thickness, and where it will be installed, and we\'ll advise a suitable option.'
            },
            {
              question: 'Do you support BOQ and consultant submittals?',
              answer: 'Yes. We can provide quotations and the supporting technical documents typically requested for approvals.'
            },
            {
              question: 'Do you also supply Carpet Adhesive UAE or Parquet Adhesive UAE?',
              answer: 'Yes. We support broader flooring adhesive requirements, including Carpet Glue UAE, carpet adhesive UAE, Parquet Adhesive UAE, and parquet glue UAE. If you\'re fixing carpet on marble surfaces, share the use-case and we\'ll advise a suitable carpet glue for marbles scenario.'
            }
          ],
          cta: {
            title: 'Need a recommendation or a quotation today?',
            subtitle: 'WhatsApp us or email with your project details for a quick response.',
            checklist: [
              'Tile type and size (porcelain, ceramic, marble)',
              'Area and usage (bathroom, lobby, kitchen, exterior)',
              'Approx quantity (m²) and joint width',
              'Substrate type (concrete, screed, existing tile, waterproofed surface)',
              'City and timeline for delivery',
              'Preferred grout type (cementitious or epoxy) and colour requirement if decided'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Enhancing Construction Projects with Mapei Tile Adhesives and Grout',
                content: 'From DIY homeowners to seasoned contractors, our customers rely on Lapiz Blue for Mapei UAE distributor services. Products like Mapei Ultracolor Plus and Kerapoxy grout offer lasting strength and visual appeal, while Mapelastic Smart waterproofing provides unmatched protection. These materials are a staple in projects managed by top Mapei dealers in Abu Dhabi and beyond.'
              },
              {
                title: 'Achieving Flawless Tiling Projects with Premium Mapei Tile Grout',
                content: 'As one of the leading Mapei grout suppliers, we know that detail makes all the difference. Our extensive grout range fills the gaps with precision and endurance, ensuring clean, flawless finishes for bathrooms, kitchens, lobbies, and more. Whether you\'re a Mapei dealer in Dubai or a contractor working on a niche project, we\'re your one-stop solution.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - Mapei tiling application on site showing installer applying adhesive and setting tiles with proper technique', alt: 'Mapei tile adhesives and grouts for reliable site installations' },
            { description: 'Mapei grout range - Ultracolor Plus bags/boxes with a clean tiled surface close-up', alt: 'Mapei Ultracolor Plus Mapei tile grout for clean joints' },
            { description: 'Epoxy grout highlight - Kerapoxy pack shot plus a tight joint finish close-up in a commercial setting', alt: 'Mapei epoxy grout Kerapoxy for durable, hygienic joints' },
            { description: 'Porcelain tile installation detail showing large porcelain tile back-buttering or trowel ridges on floor', alt: 'Tile adhesive for porcelain tiles with full coverage installation' },
            { description: 'Large-format tile installation showing large-format floor or wall tiling in progress', alt: 'Tile adhesive for large format tiles used on modern interiors' },
            { description: 'Marble and natural stone setting detail with clean edges and alignment', alt: 'Tile adhesive for marbles and tile glue for marbles on premium finishes' },
            { description: 'Lapiz Blue proof - warehouse stock showing Mapei pallets or shelf stock', alt: 'Mapei tile adhesive UAE stock at Lapiz Blue' },
            { description: 'Documentation support visual with TDS and SDS available graphic', alt: 'Mapei documentation support for BOQ and submittals' }
          ]
        }
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Complete waterproofing systems for bathrooms, balconies, terraces, and below-grade applications.',
        metaDescription: 'Explore Mapei waterproofing in the UAE. Membranes and cementitious coatings with documentation support, quotations, and UAE-wide delivery from Lapiz Blue.',
        images: ['/images/brands/mapei/waterproofing.jpg'],
        content: {
          seoTitle: 'Mapei Waterproofing UAE | Membranes & Coatings - Lapiz Blue',
          h1: 'Mapei waterproofing that stops leaks early and protects your build long-term',
          intro: 'Water damage rarely shows up all at once. It starts as hairline cracks, damp patches, peeling paint, or tile grout turning dark, then becomes expensive repairs. Lapiz Blue supplies Mapei Waterproofing Solutions that help you build a reliable barrier at the right stage of the project, from wet areas and balconies to rooftops and below-grade protection. You can enquire for suitable options based on your substrate, exposure, and whether the area needs crack bridging, high flexibility, or a cementitious finish under tiles. Share your site condition and timeline and we\'ll guide you to the right Mapei moisture barrier UAE approach with the required documentation.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Bathrooms, kitchens, and wet areas under tiles where water exposure is frequent',
              'Balconies and terraces where movement and cracking risk is higher',
              'Rooftops and parapets where weather exposure needs a continuous barrier',
              'Foundations and below-grade zones where damp proofing is critical',
              'Swimming pools, basins, and water-exposed structures where watertight detailing matters',
              'Repair and refurbishment jobs where the goal is to stop recurring leaks without repeated patchwork'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Waterproofing System',
            bullets: [
              'Identify where the water pressure comes from: surface splash, ponding, or below-grade dampness',
              'Confirm the substrate: concrete, screed, blockwork, plaster, cement board, or previously coated surfaces',
              'Decide the system type you need: flexible membrane vs cementitious coating under tiles',
              'Check movement risk: balconies, terraces, and roof details often need higher flexibility and crack-bridging behaviour',
              'Consider the finish: under tile, exposed, or protected with screed, and plan compatibility accordingly',
              'Plan details early: corners, joints, drains, pipe penetrations, and terminations are where failures usually start',
              'Align with programme: curing time, coat thickness, and application conditions should match your site timeline',
              'If your intent is damp proofing, tell us the location and exposure and we\'ll guide you to a suitable Mapei Damp Proof UAE option without over-specifying'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Treating waterproofing as a single coat instead of a complete system including detailing and terminations',
              'Applying over dusty or weak substrates, then blaming the product when adhesion fails',
              'Skipping slope and drainage planning on roofs and balconies, leading to ponding and premature failure',
              'Waterproofing after tiling problems appear, instead of protecting wet areas before finishes',
              'Mixing systems without checking compatibility, especially at primers, repair mortars, and top finishes'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery with export support on request' },
              { label: 'Availability', value: 'In stock, usually available, project order, and on request depending on the Mapei waterproofing system and quantity' },
              { label: 'Branch Support', value: 'Supply coordination from Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Technical Guidance', value: 'Help selecting the right system for wet areas, balconies, roofs, and below-grade zones based on site conditions' },
              { label: 'Documentation', value: 'TDS, SDS, and submittal support available where required' },
              { label: 'Quotations', value: 'BOQ-based quotations for contractors, consultants, retailers, and homeowners, with practical alternatives if a specific item is temporarily unavailable' }
            ]
          },
          faqs: [
            {
              question: 'What are Mapei Waterproofing Solutions used for?',
              answer: 'They\'re used to create a protective barrier that helps prevent leaks, dampness, and water ingress in areas like wet rooms, balconies, terraces, roofs, and water-exposed structures.'
            },
            {
              question: 'Do you supply Mapei waterproofing for wet areas under tiles?',
              answer: 'Yes. Tell us the area, substrate, and whether it\'s a shower, kitchen, or utility space and we\'ll recommend a suitable under-tile system and the right detailing approach.'
            },
            {
              question: 'I\'m seeing damp patches and paint peeling. Do I need a moisture barrier or full waterproofing?',
              answer: 'It depends on the source of moisture and where it\'s entering. Share photos, location, and whether it\'s external or internal and we\'ll advise the right Mapei moisture barrier UAE direction for your case.'
            },
            {
              question: 'Do you stock Mapei waterproofing products or is it only on order?',
              answer: 'Both. Many items are in stock or usually available, and we also support project orders and on-request sourcing for specific site requirements.'
            },
            {
              question: 'Can you help consultants with approvals and submittals?',
              answer: 'Yes. We can provide datasheets, SDS, and supporting documentation for BOQ, approvals, and consultant sign-off.'
            },
            {
              question: 'What information should I share to choose the right waterproofing system?',
              answer: 'Area type, substrate, whether it\'s under tiles or exposed, water exposure level, any visible cracks, approximate quantity, and timeline.'
            },
            {
              question: 'Do you deliver across the UAE?',
              answer: 'Yes. We deliver UAE-wide and can also support export requests depending on the order and documentation needs.'
            },
            {
              question: 'Can you recommend waterproofing for pools or basins?',
              answer: 'Yes. Certain systems are designed for basins, pools, and wet areas. Share the structure type and finish plan and we\'ll guide you to a suitable option (for example, Mapelastic Smart is indicated for balconies, basins, swimming pools and wet areas).'
            }
          ],
          cta: {
            title: 'Need to stop leaks or specify a system with confidence?',
            subtitle: 'WhatsApp us with your project details or email us your BOQ for suitable Mapei options, availability, documentation, and a quotation.',
            checklist: [
              'Area type: bathroom, balcony, roof, basement, pool, tank, parapet',
              'Substrate: concrete, screed, blockwork, plaster, cement board, existing coating',
              'Finish: under tiles, exposed, protected by screed, or landscaped',
              'Issue type (if repair): seepage location, cracks, ponding, previous system used',
              'Approx quantity: m² or running meters for joints and details',
              'City and timeline for delivery',
              'Any consultant specification or approval requirement'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Safeguarding Buildings with Mapei Waterproofing Solutions',
                content: 'Moisture is the silent enemy of buildings. That\'s why we offer high-performance Mapei waterproofing products—from flexible membranes to cementitious coatings. As a long-standing Mapei authorized distributor in the UAE, we deliver materials that prevent leaks, reduce maintenance costs, and extend building lifespans.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - clean on-site waterproofing application on a slab or wet area with proper detailing at corners', alt: 'Mapei waterproofing application for long-term leak protection' },
            { description: 'System visual - close-up of corner detailing, drain termination, or pipe penetration sealing', alt: 'Waterproofing detailing at corners and penetrations to prevent leaks' },
            { description: 'Cementitious waterproofing being applied before tiling', alt: 'Cementitious waterproofing coating under tiles for wet areas' },
            { description: 'Balcony slab waterproofing in progress, before screed or tiles', alt: 'Waterproofing for balconies and terraces to resist movement and seepage' },
            { description: 'Roof waterproofing coat application with parapet edge detailing', alt: 'Roof waterproofing to reduce water ingress and maintenance' },
            { description: 'Bathroom waterproofing staged before tiling, including wall-floor joint', alt: 'Wet area waterproofing before tiles for bathrooms and kitchens' },
            { description: 'Mapei waterproofing pallets or shelf stock in warehouse', alt: 'Mapei waterproofing products stocked at Lapiz Blue UAE' },
            { description: 'TDS and SDS available visual with sample pages blurred', alt: 'Waterproofing documentation support for BOQ and submittals' },
            { description: 'BOQ and drawing table shot with waterproofing area marked', alt: 'Waterproofing quotation and BOQ support for UAE projects' }
          ]
        }
      },
      {
        slug: 'flooring-systems',
        name: 'Flooring Systems',
        description: 'Comprehensive flooring solutions including screeds, adhesives, and finishing products.',
        metaDescription: 'Explore Mapei flooring systems in the UAE. Epoxy, polyurethane and cementitious solutions with technical guidance, documents, and fast quotations from Lapiz Blue.',
        images: ['/images/brands/mapei/flooring.jpg'],
        content: {
          seoTitle: 'Mapei Flooring Systems UAE | Epoxy & Cementitious - Lapiz Blue',
          h1: 'Mapei flooring systems built for busy sites, heavy traffic, and easy maintenance',
          intro: 'Flooring is one of those decisions you only notice when it goes wrong, dusting, staining, peeling, or turning slippery under pressure. Lapiz Blue supplies Mapei flooring systems designed for real-world wear, from warehouses and workshops to retail, kitchens, and back-of-house areas. Mapei offers systems for epoxy, polyurethane and cementitious floors, so you can match the finish to your site\'s traffic, cleaning routine, and exposure to chemicals or moisture. Tell us where the floor is used and what the substrate is, and we\'ll guide you toward a practical system with the right documentation for approvals and quotation.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Warehouses and logistics areas with forklift and pallet traffic',
              'Factories and workshops exposed to oils, chemicals, and abrasion',
              'Retail, showrooms, and lobbies where appearance matters but durability still comes first',
              'Commercial kitchens, wash zones, and back-of-house areas that need frequent cleaning',
              'Parking areas, ramps, and service corridors where slip resistance may be required',
              'Refurbishment works where you need to upgrade an existing concrete floor with minimal downtime'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Flooring System',
            bullets: [
              'Start with use: warehouse, food area, retail, workshop, or parking changes the system requirement',
              'Confirm traffic type: foot only, trolleys, forklifts, or heavy loads',
              'Note chemical exposure: oils, cleaning agents, battery charging areas, or process chemicals',
              'Check moisture conditions: rising damp risk, wash-down areas, or humid environments',
              'Decide the finish: smooth, textured, anti-slip, decorative, or easy-clean',
              'Assess the substrate: new concrete, old concrete, damaged surface, or previously coated floor',
              'Align with your programme: curing time and return-to-service matters for live sites',
              'For comparison decisions, match the performance requirement first, then choose the Mapei system that fits your finish and budget'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Picking a floor only by appearance, then struggling with wear or cleaning after handover',
              'Skipping surface preparation and expecting the coating to "fix" weak or dusty concrete',
              'Ignoring moisture conditions, which can cause blistering or debonding later',
              'Not planning slip resistance for wet or ramp areas until after complaints start',
              'Mixing products without confirming compatibility between primer, body coat, and top coat'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery and export support on request' },
              { label: 'Availability', value: 'In stock, usually available, project order, and on request depending on the selected Mapei flooring system' },
              { label: 'Branch Support', value: 'Supply coordination from Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Technical Guidance', value: 'Help choosing the right flooring system based on traffic, exposure, and finish requirement' },
              { label: 'Documentation', value: 'TDS, SDS, and submittal support available when required' },
              { label: 'Quotations', value: 'BOQ and scope-based quotations with system suggestions, lead times, and supply planning for project schedules' }
            ]
          },
          faqs: [
            {
              question: 'What are Mapei flooring systems used for?',
              answer: 'They\'re used to upgrade concrete floors with systems suited for wear, cleaning, chemicals, and moisture, depending on the area and performance need.'
            },
            {
              question: 'Do you supply Mapei epoxy flooring for industrial areas?',
              answer: 'Yes. Share the site use, traffic type, and substrate details and we\'ll recommend a suitable epoxy system approach with the right finish options.'
            },
            {
              question: 'What\'s the difference between epoxy, polyurethane, and cementitious flooring systems?',
              answer: 'Epoxy is commonly chosen for durability and chemical resistance. Polyurethane is often selected where flexibility or comfort is important. Cementitious systems are used when a more mineral finish or specific performance is needed. The right choice depends on exposure and use.'
            },
            {
              question: 'Can you help me select a floor for wet cleaning areas or kitchens?',
              answer: 'Yes. Tell us the cleaning routine, slip-risk, and whether the floor is always wet or only washed periodically, and we\'ll suggest a suitable system and texture approach.'
            },
            {
              question: 'Is a flooring system suitable for both warehouses and showrooms?',
              answer: 'Sometimes, but requirements differ. Warehouses focus on impact and traffic, while showrooms balance looks with easy maintenance. We\'ll help you match the system to each zone.'
            },
            {
              question: 'Do you support consultant approvals and submittals?',
              answer: 'Yes. We can share datasheets, SDS, and supporting documents needed for consultant review and approvals.'
            },
            {
              question: 'What information should I share to get the right recommendation?',
              answer: 'Area use, traffic type, chemical exposure, moisture condition, substrate state, approximate m², and your timeline for return-to-service.'
            },
            {
              question: 'Are these systems available ex-stock or only on order?',
              answer: 'Both. Many requirements can be supported from stock or usual availability, and we also arrange project orders and on-request sourcing for specific system builds.'
            }
          ],
          cta: {
            title: 'Need the right floor system without guesswork?',
            subtitle: 'WhatsApp us with your project details or email your BOQ for a suitable Mapei flooring system direction, availability, documentation support, and a quotation.',
            checklist: [
              'Area type and use: warehouse, workshop, kitchen, retail, parking, corridor',
              'Traffic: foot, trolley, forklift, heavy loads',
              'Exposure: oils, chemicals, cleaning agents, moisture, hot water wash',
              'Substrate: new concrete, old concrete, damaged, previously coated',
              'Finish needs: smooth, textured, anti-slip, decorative, easy-clean',
              'Quantity: approximate m² and zones if multiple areas',
              'City and timeline: delivery date and installation schedule',
              'Any consultant specification or approval requirement'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Functional and Aesthetic Flooring with Mapei Epoxy and Cementitious Solutions',
                content: 'Our Mapei epoxy flooring and cementitious coatings are ideal for high-traffic environments, combining beauty with performance. As trusted Mapei suppliers UAE wide, we help our clients implement flooring systems that are resistant to wear, chemicals, and moisture, backed by reliable support from a certified Mapei dealer UAE.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - a clean warehouse or facility floor with traffic in the background', alt: 'Mapei flooring systems for high-traffic industrial spaces' },
            { description: 'System application - roller or squeegee application on prepared concrete', alt: 'Mapei epoxy flooring application on prepared concrete substrate' },
            { description: 'Surface preparation - grinding or shot blasting prep', alt: 'Concrete surface preparation before resin flooring installation' },
            { description: 'Decorative commercial flooring - showroom or retail floor with a premium finish', alt: 'Decorative Mapei resin flooring finish for commercial interiors' },
            { description: 'Texture and anti-slip close-up - textured surface detail or aggregate broadcast', alt: 'Textured floor finish for slip resistance in wet cleaning zones' },
            { description: 'Chemical resistance context - workshop or industrial zone with equipment and clean floors', alt: 'Durable flooring system for chemical and abrasion exposure' },
            { description: 'Mapei pallets or racking with visible brand presence in warehouse', alt: 'Mapei flooring system materials stocked at Lapiz Blue UAE' },
            { description: 'TDS and SDS available visual with sample pages blurred', alt: 'Flooring system documentation support for BOQ and approvals' },
            { description: 'Floor plan or site markup showing different zones and finishes', alt: 'Flooring system zoning for warehouses, kitchens, and corridors' }
          ]
        }
      },
      {
        slug: 'sealants-and-anchoring',
        name: 'Sealants and Anchoring',
        description: 'Professional sealants and chemical anchoring systems for construction applications.',
        metaDescription: 'Buy Mapei sealants, primers and anchoring solutions in the UAE. Get technical guidance, documentation, and BOQ-based quotations from Lapiz Blue.',
        images: ['/images/brands/mapei/sealants.jpg'],
        content: {
          seoTitle: 'Mapei Sealants and Anchoring UAE | Primers - Lapiz Blue',
          h1: 'Seal, bond, and anchor with the right Mapei system for your site details',
          intro: 'Sealants and anchoring are small line items that decide whether a project stays problem-free after handover. A joint that cracks, a gap around a penetration, or a fixing that loosens can trigger leaks, stains, callbacks, and rework. At Lapiz Blue, we supply Mapei Sealant UAE solutions, Mapei Primers UAE, and anchoring products to help you finish confidently, especially on wet areas, façades, and high-movement details. Share the substrate, exposure (interior, wet, exterior), and joint or fixing detail, and we\'ll guide you to a suitable option with technical documentation and a clear quotation.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Movement and expansion joints in floors, walls, and façades',
              'Wet areas: bathrooms, kitchens, balconies, pool surrounds and service penetrations',
              'Perimeter sealing around frames, cladding edges, skirting transitions and thresholds',
              'Joints where paintability matters, or where UV and weather exposure are high',
              'Chemical anchoring for threaded rods, brackets, handrails, equipment supports and steel plates',
              'Fixing into concrete and masonry where mechanical anchors alone are not suitable',
              'Priming before coatings, membranes, adhesives, sealants, or when bonding is inconsistent',
              'Marbles cleaners and marbles sealers for protection against stains, moisture and daily wear'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Sealant or Anchoring System',
            bullets: [
              'Identify movement: is the joint static or does it expand and contract with heat and vibration?',
              'Confirm exposure: interior dry, wet area, exterior weather, UV, or cleaning chemicals',
              'Check substrate: concrete, blockwork, metal, glass, tile, stone, painted surfaces',
              'Decide on finish needs: colour matching, paintability, and clean joint aesthetics',
              'For wet areas, prioritise hygiene and durability - mould resistance and long-term elasticity matter',
              'For anchoring, define load and substrate condition (light fixture vs structural bracket)',
              'Confirm installation conditions: surface moisture, temperature, curing time and access for proper prep',
              'Use primers when required to improve adhesion and reduce edge lift or early failures'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery and export support' },
              { label: 'Branch Availability', value: 'Dubai, Abu Dhabi and Sharjah' },
              { label: 'Support', value: 'Technical guidance for joint prep, backer rod sizing, substrate compatibility, and anchoring basics' },
              { label: 'Documentation', value: 'TDS and SDS support for submittals when required' },
              { label: 'Quotations', value: 'BOQ and drawing-based quotations, with practical alternatives if a specific item is temporarily unavailable' }
            ]
          },
          faqs: [
            {
              question: 'What does a construction sealant actually do?',
              answer: 'It seals gaps and joints to help prevent water, air, and contaminants entering while accommodating movement where needed. Choosing the right type depends on the detail.'
            },
            {
              question: 'Which is better - silicone or polyurethane sealant?',
              answer: 'Neither is "better" universally. Silicone is often chosen for high flexibility and wet areas, while polyurethane is often selected where strength, durability, and paintability are required. The right choice depends on movement, exposure, and substrate.'
            },
            {
              question: 'Do you supply mould-resistant Mapei sealants for wet areas?',
              answer: 'Yes. Mapei has mould-resistant silicone options designed for damp environments and strong, elastic seals.'
            },
            {
              question: 'What info do you need to recommend a sealant?',
              answer: 'Send joint location, approximate joint width and depth, substrate, wet or dry exposure, and whether it\'s interior or exterior.'
            },
            {
              question: 'What is chemical anchoring used for?',
              answer: 'Chemical anchoring is used to fix threaded rods or rebar into concrete or masonry for brackets, rails, supports, and fixings where load reliability matters.'
            },
            {
              question: 'What info do you need for anchoring recommendations?',
              answer: 'Substrate type, anchor diameter, embedment depth, load type, and whether it\'s cracked or non-cracked concrete, plus quantity and site conditions.'
            },
            {
              question: 'Do I always need a primer before sealing or bonding?',
              answer: 'Not always, but primers can improve adhesion on tricky surfaces and help reduce early failures. We\'ll advise based on your substrate and application.'
            },
            {
              question: 'Can you support consultant submittals and approvals?',
              answer: 'Yes. We can share supporting technical documents and provide BOQ-based quotations.'
            }
          ],
          cta: {
            title: 'Need the right sealant or anchoring option for your detail?',
            subtitle: 'WhatsApp us a photo of the joint or fixing point, plus substrate and exposure. Or email your BOQ or drawings for suitable Mapei options, availability, documentation, and a quotation.',
            checklist: [
              'Joint location and type (expansion, perimeter, wet area)',
              'Joint width and depth (approximate)',
              'Substrate: concrete, blockwork, metal, glass, tile, stone',
              'Exposure: interior dry, wet area, exterior, UV',
              'Finish needs: colour matching, paintability',
              'For anchoring: substrate type, anchor diameter, load type',
              'Quantity and site conditions',
              'Any consultant specification or approval requirement'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Mapei Primers & Sealants UAE | Marble Sealers & Cleaners for Lasting Protection',
                content: 'Stone, concrete, and substrate finishes deserve expert protection. At Lapiz Blue, we bring you high-performance Mapei primers, advanced Mapei sealant UAE products, and professional marble cleaners and marble sealers designed for the unique climate and construction demands of the UAE.'
              },
              {
                title: 'Built for Harsh Gulf Environments',
                content: 'Every product we distribute, from Mapei primers to flexible sealants, is engineered for extreme heat, saline exposure, and high humidity, supporting long-term durability in the UAE\'s harsh climate.'
              },
              {
                title: 'Marble Cleaners & Sealers for Stone Surfaces',
                content: 'Lift grime, residues, and everyday buildup with our pH-balanced marble cleaners, formulated to clean thoroughly without damaging natural stone finishes. Preserve elegance while protecting against moisture, oils, and stains with our marble sealers - ideal for hotels, homes, malls, and high-footfall interiors that demand beauty with durability.'
              },
              {
                title: 'Mapei Primers for High-Performance Bonding',
                content: 'From concrete to gypsum, Mapei primers create a high-bond interface for waterproofing, tiling, and coatings, reducing failures and improving finish consistency. With fast-drying, moisture-tolerant options, our primers keep your project moving even in challenging site conditions.'
              },
              {
                title: 'Flexible Sealants for Structural Joints',
                content: 'Mapei silicone sealants can be mould-resistant and are designed for elastic sealing in damp environments. Use confidently around marble, granite, or glass - we\'ll guide you on suitable sealant approaches for stain-sensitive finishes. Whether combined with membranes or primers, sealants help complete protection at the details that usually fail first.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - clean façade or floor expansion joint detail', alt: 'Mapei sealant UAE for movement joints and long-term sealing' },
            { description: 'Wet area sealing - shower threshold or basin perimeter', alt: 'Mould-resistant silicone sealing for wet areas' },
            { description: 'Anchoring detail - drilled hole, cleaned hole, threaded rod installation', alt: 'Chemical anchoring for secure fixings in concrete' },
            { description: 'Primer application - roller/brush priming on screed or concrete', alt: 'Mapei primers UAE for improved adhesion and system performance' },
            { description: 'Stone care - marble surface cleaning and sealing scenario', alt: 'Marbles cleaners and marbles sealers for stone protection' },
            { description: 'Warehouse authenticity - Mapei cartons and sealant cartridges in stock', alt: 'Genuine Mapei products stocked by Lapiz Blue UAE' },
            { description: 'Detail checklist graphic - What to share for a quote (joint width, substrate, exposure)', alt: 'Request a quotation checklist for sealants and anchoring' },
            { description: 'Documentation visual - TDS and SDS icons', alt: 'Technical datasheets available for Mapei sealants and primers' }
          ]
        }
      },
      {
        slug: 'self-leveling-and-microcement',
        name: 'Self Leveling and Microcement',
        description: 'Self-leveling compounds and microcement for seamless floor finishes.',
        metaDescription: 'Get Mapei self levelling and microcement style finishes from Lapiz Blue. Smooth, seamless surfaces with technical support and UAE-wide delivery.',
        images: ['/images/brands/mapei/self-leveling.jpg'],
        content: {
          seoTitle: 'Mapei Self Levelling and Microcement UAE | Lapiz Blue',
          h1: 'Mapei self levelling and microcement style finishes, supplied right in the UAE',
          intro: 'Uneven slabs, rushed timelines, and finish complaints usually come down to one thing, the substrate wasn\'t prepared properly. On this page you\'ll find Lapiz Blue\'s Mapei self levelling and decorative cement finish options that help you get flat, clean, ready-to-cover floors and seamless, design-forward surfaces. If you\'re specifying a retail space, renovating a villa, or building a back-of-house area that needs to stay durable under traffic, we\'ll help you pick the right system and the right thickness, then back it with documentation, quantities, and practical site guidance across Dubai and the UAE.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Flattening interior floors before LVT, vinyl, carpet, parquet, or tiles',
              'Correcting thickness differences when you need a clean, uniform plane (common in renovations)',
              'High-traffic interiors such as hospitals, hotels, schools, and shopping areas, where a stable base matters',
              'Retail, hospitality, showrooms, feature walls, and modern villas where a continuous surface is the goal',
              'Spaces that need a thin-build decorative finish rather than a thick screed rebuild'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right System',
            bullets: [
              'Start with the finish: are you preparing for tiles, resilient floors, carpet, parquet, or a decorative seamless finish?',
              'Confirm thickness: pick a levelling compound that matches your real thickness range (don\'t guess)',
              'Interior vs exterior: many fast levellers are designed for interiors, confirm exposure before specifying',
              'Check substrate condition: weak screeds, dusty slabs, and contaminated surfaces need prep and priming first',
              'Time pressure: if you need fast return-to-service, choose a fast-drying leveller designed for quick covering',
              'Decorative requirement: if you want "microcement look", choose a decorative cementitious system (texture, trowel finish, nuvolato effect) instead of forcing a leveller to be a finish coat',
              'Site reality: moisture, temperature, and crew method matter, we\'ll help you match product + method to avoid callbacks',
              'Always follow the datasheet system approach (primer + compound + finish), not random mixing across brands'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Picking a leveller without confirming the real thickness range on site',
              'Skipping primer on dusty or absorbent substrates',
              'Overwatering the mix to "make it flow", then getting weak surfaces',
              'Treating a leveller as the final decorative finish (wrong expectation)',
              'Covering too early without respecting drying and readiness guidance'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'In-stock, usually available, and project order options depending on the exact Mapei item' },
              { label: 'Coverage', value: 'UAE-wide delivery with export support on request' },
              { label: 'Branch Support', value: 'Supply and coordination via Lapiz Blue network' },
              { label: 'Documentation', value: 'Technical datasheets and safety datasheets available for submittals' },
              { label: 'Technical Guidance', value: 'Help choosing system build-up, thickness, and prep steps before ordering' },
              { label: 'Quotations', value: 'Fast quotes for BOQ lists, area-based estimation, and phased deliveries' }
            ]
          },
          faqs: [
            {
              question: 'What does "self levelling" actually do?',
              answer: 'It smooths and levels the floor to remove highs and lows, giving you a flat base before the final floor covering.'
            },
            {
              question: 'Can I use Mapei self levelling for thick build-ups?',
              answer: 'Some variants handle higher thickness ranges, so we\'ll match the product to your required build-up instead of overloading a thin leveller.'
            },
            {
              question: 'Is this only for new slabs, or renovations too?',
              answer: 'Both. Many self levelling compounds are used on new or existing substrates once the surface is properly prepared.'
            },
            {
              question: 'What is "microcement" in practical terms?',
              answer: 'In projects it usually means a seamless, thin-build decorative cement look. With Mapei, that look is achieved through decorative cementitious systems and finishes rather than a basic levelling compound.'
            },
            {
              question: 'Where is a decorative seamless finish commonly used?',
              answer: 'Retail, hospitality, feature walls, and modern interiors where a continuous surface and custom aesthetic is important.'
            },
            {
              question: 'How do I avoid pinholes, debonding, or curling?',
              answer: 'Use the correct primer, follow mixing water limits, and choose a compound designed for your thickness and timeline. We can guide this before you purchase.'
            },
            {
              question: 'Do you help with approvals and submittals?',
              answer: 'Yes. We can share documentation and help structure a clean submittal pack for consultants and main contractors.'
            },
            {
              question: 'Can I get a quotation based on area in m²?',
              answer: 'Yes. Share area, thickness range, substrate type, and finish requirement, and we\'ll quote a practical system.'
            }
          ],
          cta: {
            title: 'Need the right system fast?',
            subtitle: 'WhatsApp us with your area (m²), thickness range (mm), and the final floor finish, and we\'ll recommend a suitable Mapei option and quantities. Prefer email? Send your BOQ or site requirement and we\'ll share pricing, availability, and datasheets for approval.',
            checklist: [
              'Area (m²) and location',
              'Substrate type (concrete, screed, tiles, gypsum, etc.)',
              'Thickness range needed (min and max in mm)',
              'Final finish (tile, LVT, carpet, parquet, decorative seamless look)',
              'Timeline (when you need it ready for traffic or covering)',
              'Any special conditions (wet areas, heavy traffic, chemicals, underfloor heating)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Surface Preparation for Lasting Results',
                content: 'Treatment of concrete while casting with properly selected form release agents and curing compounds saves efforts and costs in further stages of work, along to selected specialty chemicals for primers and bonding. It works by removing loose and friable parts, surface contaminants, opens up surface porosity and roughen the surface. This method is ideal before broadcasting and self-levelling systems, resin mortar screed and CPU systems subject to medium to high traffic exposure.'
              },
              {
                title: 'When Durability Meets Design',
                content: 'When durability meets design, the result is flawless flooring. At Lapiz Blue, we bring you advanced Mapei flooring solutions, ideal for creating high-performance surfaces in commercial, industrial, and residential spaces across Dubai and the UAE. From microtopping flooring for seamless aesthetics to heavy-duty epoxy flooring built to withstand extreme loads, our systems deliver both function and visual appeal.'
              },
              {
                title: 'Complete Flooring Solutions',
                content: 'Whether you\'re looking for Mapei screed UAE options, decorative Microcement flooring, or self-leveling compounds for ultra-flat finishes, we offer cutting-edge materials backed by Mapei\'s global expertise and local service support.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - Seamless modern floor finish, microcement style living or retail interior', alt: 'Seamless microcement style floor finish using Mapei decorative system' },
            { description: 'Before vs after levelling - uneven slab vs flat substrate', alt: 'Before and after using Mapei self levelling compound to flatten floors' },
            { description: 'Product close-up - Mapei Ultraplan bag clean product shot', alt: 'Mapei Ultraplan self levelling smoothing compound' },
            { description: 'Application shot - installer using gauge rake or trowel', alt: 'Applying self levelling compound for an ultra-flat finish' },
            { description: 'Decorative finish shot - Ultratop Loft texture, trowel or nuvolato effect', alt: 'Mapei Ultratop Loft W decorative cementitious coating texture' },
            { description: 'System diagram visual - primer + leveller + finish layers', alt: 'Floor preparation system build-up primer leveller finish' },
            { description: 'High-traffic interior scenario - mall corridor or hotel lobby', alt: 'Substrate preparation for high-traffic interiors using Mapei levelling systems' },
            { description: 'Maintenance visual - gentle cleaning on decorative surface', alt: 'Maintenance and cleaning for decorative cementitious flooring finish' }
          ]
        }
      },
      {
        slug: 'concrete-additives-and-repair-systems',
        name: 'Concrete Additives and Repair Systems',
        description: 'Advanced concrete additives, repair mortars, and structural strengthening systems.',
        metaDescription: 'Mapei concrete repair UAE - Concrete additives, repair mortars, and structural strengthening solutions for UAE construction projects.',
        images: ['/images/brands/mapei/concrete-repair.jpg'],
        content: {
          seoTitle: 'Mapei Concrete Repair and Additives UAE | Lapiz Blue',
          h1: 'Concrete additives and repair systems that keep structures strong',
          intro: 'Concrete is only as good as its pour, cure, and aftercare. Whether you\'re improving fresh concrete workability, protecting rebar from chloride attack, or restoring cracked slabs and columns, Mapei concrete systems help you intervene at the right stage with the right product. At Lapiz Blue, we supply Mapei Concrete Additives UAE and Mapei Concrete Repair UAE solutions for new builds, refurbishment, and infrastructure maintenance. Share your scope, substrate condition, exposure, and structural intent and we\'ll guide you toward a practical system with documentation support.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'New concrete: improving workability, early strength, and reducing water demand with Mapei Admixtures',
              'Corrosion protection: protecting reinforcement in chloride-exposed or carbonated concrete environments',
              'Surface repair: patching spalled concrete, honeycombs, and surface defects with non-shrink repair mortar',
              'Structural repair: restoring sections of beams, columns, slabs with structural-grade mortars',
              'Crack injection: addressing cracks in concrete with injection resins or grouts for structural or waterproofing intent',
              'Anchoring and bonding: preparing substrate and bonding new concrete to old with bonding agents and primers',
              'Protective coatings: sealing repaired surfaces to resist further carbonation and moisture ingress'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right System',
            bullets: [
              'Identify the stage: are you working with fresh concrete (admixtures) or hardened concrete (repair)?',
              'Define the intent: structural restoration, surface repair, waterproofing, crack treatment, or corrosion prevention',
              'Confirm the substrate: is it carbonated, chloride-contaminated, cracked, or structurally compromised?',
              'Assess exposure: interior dry, wet, exterior, marine, or chemical environment',
              'Match product class: non-shrink mortar for general repair, structural mortar for load-bearing elements, injection for cracks',
              'Plan surface prep: cleaning, roughening, priming, and rebar treatment often determine long-term success',
              'Coordinate with coatings: protective finishes and anti-carbonation coatings may be needed after repair',
              'Document properly: for consultant approvals and asset owners, use products with clear TDS, test data, and EN/BS compliance'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Skipping rebar treatment when corrosion is present, leading to re-cracking after repair',
              'Using generic patching mortar for structural repairs that need engineered mortars',
              'Ignoring substrate prep (cleaning, wetting, priming) and expecting adhesion to just work',
              'Selecting admixtures without confirming compatibility with cement type and mix design',
              'Repairing without protective coating, leaving the repaired area exposed to the same attack that caused the damage'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery with export support on request' },
              { label: 'Availability', value: 'In stock, usually available, project order, and on request depending on the Mapei product and quantity' },
              { label: 'Branch Support', value: 'Supply coordination from Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Technical Guidance', value: 'Help selecting products based on substrate condition, exposure, and repair intent' },
              { label: 'Documentation', value: 'TDS, SDS, EN/BS compliance references, and submittal support available' },
              { label: 'Quotations', value: 'BOQ-based quotations with system suggestions, alternatives if needed, and lead time clarity' }
            ]
          },
          faqs: [
            {
              question: 'What are Mapei concrete admixtures used for?',
              answer: 'Mapei admixtures improve fresh concrete properties like workability, strength development, and durability. They\'re added during batching to achieve specific performance without changing mix proportions drastically.'
            },
            {
              question: 'What is a non-shrink repair mortar and when do I use it?',
              answer: 'Non-shrink repair mortar is designed to fill voids and repair surface defects without shrinking away from the substrate. Use it for cosmetic repairs, honeycombs, and shallow patching where structural performance isn\'t the priority.'
            },
            {
              question: 'When do I need structural repair mortar instead?',
              answer: 'When the repair must carry load or restore structural integrity, e.g. beam soffits, column corners, or slab sections. Structural mortars meet higher strength and bonding requirements.'
            },
            {
              question: 'How do I treat corroded rebar before repair?',
              answer: 'Expose the rebar, remove rust and loose concrete, clean thoroughly, then apply a protective primer or passivating coat before applying repair mortar. Skipping this step risks re-corrosion.'
            },
            {
              question: 'Do you supply crack injection products?',
              answer: 'Yes. Mapei offers injection resins and grouts for structural crack bonding or waterproofing. Share crack width, depth, and intent (structural or sealing) and we\'ll guide you to the right approach.'
            },
            {
              question: 'Can you help with consultant approvals?',
              answer: 'Yes. We provide TDS, SDS, EN/BS compliance data, and can help prepare submittal packages for consultant and client review.'
            },
            {
              question: 'What information should I share to get the right recommendation?',
              answer: 'Substrate type and condition, damage description, exposure (interior/exterior/marine), structural or non-structural intent, quantity, and timeline.'
            },
            {
              question: 'Do you deliver across the UAE?',
              answer: 'Yes. We deliver UAE-wide with export support available on request.'
            }
          ],
          cta: {
            title: 'Need a concrete repair or admixture solution?',
            subtitle: 'WhatsApp us with your project scope and we\'ll guide you to the right Mapei system. Or email your BOQ for pricing, availability, documentation, and delivery planning.',
            checklist: [
              'Type of work: new pour (admixtures), repair, crack treatment, corrosion protection',
              'Substrate condition: carbonated, chloride-exposed, cracked, spalled',
              'Structural or non-structural intent',
              'Exposure: interior, exterior, marine, industrial',
              'Quantity (volume or area) and site location',
              'Any consultant specification or compliance requirement'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'A System Approach to Concrete Repair',
                content: 'Mapei doesn\'t just sell repair mortars, they engineer systems. From diagnosis to surface prep, rebar treatment, repair application, and final protection, Mapei concrete repair products are designed to work together. That\'s why specifiers and contractors trust Mapei for infrastructure, parking structures, bridges, and building restoration, projects where "patch and hope" isn\'t good enough.'
              },
              {
                title: 'Admixtures That Support Better Concrete',
                content: 'Mapei concrete admixtures are formulated to improve workability, reduce water demand, accelerate or retard setting, and enhance durability, without compromising the mix design intent. Whether you\'re pouring in extreme heat, need early stripping, or want better pumpability, there\'s a Mapei admixture that fits.'
              },
              {
                title: 'Corrosion Protection and Long-Term Durability',
                content: 'Chloride attack and carbonation are the two biggest threats to reinforced concrete in the UAE. Mapei offers rebar primers, inhibitors, and protective coatings that extend service life and reduce future maintenance. If you\'re repairing today, protect for tomorrow.'
              },
              {
                title: 'Documentation and Compliance Support',
                content: 'Mapei products come with detailed TDS, SDS, and EN/BS compliance data. For projects with consultant oversight, asset owner requirements, or authority approvals, we help you assemble submittals that meet expectations.'
              },
              {
                title: 'Trust Lapiz Blue for Mapei Concrete Systems',
                content: 'As an authorized Mapei distributor in the UAE, Lapiz Blue supplies concrete additives, repair mortars, injection systems, and protective coatings with technical guidance and documentation support. We help you move from diagnosis to solution, not just technically, but commercially with clear quotations and delivery coordination.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Hero - Concrete repair in progress, e.g. column or beam restoration on site', alt: 'Mapei concrete repair system application on structural element' },
            { description: 'Rebar treatment - exposed rebar being cleaned and primed before repair', alt: 'Rebar corrosion treatment before concrete repair mortar application' },
            { description: 'Repair mortar application - trowel or spray application of repair mortar', alt: 'Applying Mapei structural repair mortar to damaged concrete' },
            { description: 'Crack injection - injection of resin into concrete crack', alt: 'Mapei crack injection for structural bonding or waterproofing' },
            { description: 'Admixture visual - concrete batching or pour with admixture use', alt: 'Mapei concrete admixtures for improved workability and durability' },
            { description: 'Protective coating - anti-carbonation or waterproof coating application', alt: 'Protective coating over repaired concrete surface' },
            { description: 'Warehouse stock - Mapei concrete repair products in Lapiz Blue stock', alt: 'Mapei concrete repair products stocked at Lapiz Blue UAE' },
            { description: 'Documentation visual - TDS and compliance icons', alt: 'Technical documentation support for Mapei concrete systems' }
          ]
        }
      },
    ],
  },

  profilpas: {
    slug: 'profilpas',
    name: 'Profilpas',
    layout: 'custom',
    logo: '/images/brands/logos/profilpas-new.webp',
    website: 'https://www.profilpas.com',
    theme: {
      primary: '#406E8E', // Profilpas blue-grey
      secondary: '#395c56', // Profilpas teal/sage
      accent: '#E8F0EE', // Light sage tint
    },
    hero: {
      type: 'image',
      src: '/images/brands/profilpas/hero.jpg',
      alt: 'Profilpas - Italian Tile Profiles',
    },
    description: 'Italian manufacturer of tile trims, profiles, and finishing accessories.',
    metaDescription: 'Profilpas UAE - Premium Italian tile trims, profiles, movement joints, and stair nosings. Available in Dubai, Abu Dhabi, Sharjah.',
    category: 'brand',
    productLines: [
      {
        slug: 'corner-profiles',
        name: 'Corner Profiles',
        description: 'Protective and decorative corner profiles for wall edges and corners.',
        metaDescription: 'Buy Profilpas tile profiles for internal and external corners. Cleaner finishes, stronger edges, expert support from Lapiz Blue.',
        images: ['/images/brands/profilpas/corner-profiles.jpg'],
        content: {
          seoTitle: 'Profilpas Corner Profiles UAE - Internal and External',
          h1: 'Clean corners, protected edges - Profilpas corner profiles from Lapiz Blue',
          intro: 'Corners are where tile work usually fails first - chipped edges, stained joints, and messy finishing lines. Profilpas corner profiles solve that by protecting vulnerable edges and giving you a consistent, professional look on walls and floors. At Lapiz Blue, we supply a full range of internal and external corner profiles in practical materials and finishes, so you can match the profile to your tile thickness, traffic level, and cleaning requirements. Whether you need a rounded safety edge, a crisp square finish, or a hygienic cove between floor and wall, we\'ll help you select the right profile and accessories.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'External corners: Wall tile outside corners in bathrooms, corridors, lobbies, and lift surrounds',
              'External corners: Stair nosing style edge protection on tiled steps and platforms',
              'External corners: Finishing edges on wall cladding where tile corners are exposed',
              'Internal corners: Floor-to-wall junctions where hygiene and easy cleaning matter (kitchens, clinics, wet areas)',
              'Internal corners: Renovations where you need a clean cove without breaking existing tiles',
              'Hygienic spaces: Hospitals, food plants, beauty spas, swimming pools, and commercial kitchens'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Corner Profile',
            bullets: [
              'Pick the shape first: Square external corners for a crisp architectural look, rounded external corners if safety and softer edges matter',
              'Match tile thickness to profile height: Many external corner profiles are offered in multiple heights (example: 3mm to 15mm)',
              'Choose material based on exposure: PVC for cost-effective, shock-resistant corners; stainless steel where cleaning chemicals or hygiene pressure is high',
              'Consider AISI 316 stainless for higher chemical stress and coastal environments vs standard 304',
              'Decide installation timing: During tiling (classic embedded profiles) or after tiling (retrofit internal solutions for upgrades)',
              'For hygiene-critical spaces, use cove-style internal corners: Profiles like Proround M and Proround P remove the 90° inside corner',
              'If you need 45° cut tile edges, use a profile designed for that detail (example: Protrim IP)',
              'Always confirm profile height accounts for actual tile thickness plus adhesive bed'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Choosing profile height without confirming actual tile thickness plus adhesive bed',
              'Skipping matching corner pieces and ending up with visible gaps',
              'Using the wrong metal grade in aggressive cleaning or coastal environments',
              'Leaving profile-to-tile joints ungrouted, which can trap moisture and dirt over time'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'In stock, usually available, project order, and on request depending on finish and size' },
              { label: 'Coverage', value: 'UAE-wide supply with GCC export support' },
              { label: 'Branch Support', value: 'Stock checks, fast quotations, and site coordination from Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Technical Guidance', value: 'Help selecting profile height, material grade, and accessories' },
              { label: 'Documentation', value: 'Technical data sheets and product references available for submittals' }
            ]
          },
          faqs: [
            {
              question: 'What\'s the difference between internal and external corner profiles?',
              answer: 'External profiles protect outside tile edges from chipping. Internal profiles create a cleaner junction between floor and wall and can improve cleanability.'
            },
            {
              question: 'Are rounded corner profiles only for looks?',
              answer: 'No. Rounded profiles can also act as a safety edge around corners and help reduce sharp impact points.'
            },
            {
              question: 'Which profile is better for kitchens or healthcare spaces?',
              answer: 'Cove-style internal corners are commonly used because they remove the sharp 90° corner where dirt can build up.'
            },
            {
              question: 'Can I add an internal corner profile after tiles are already installed?',
              answer: 'Yes. Some internal corner profiles are designed for post-install application and are used for renovations or retrofits.'
            },
            {
              question: 'How do I pick the right height?',
              answer: 'Start with tile thickness, then account for adhesive bed. Many external corner profiles come in multiple heights.'
            },
            {
              question: 'Do you have corner pieces and end caps?',
              answer: 'Yes, many Profilpas corner profile systems have matching accessories (inside corners, outside corners, junctions, end caps) for a cleaner finish.'
            },
            {
              question: 'Do corner profiles work with LVT or parquet floors?',
              answer: 'Profilpas makes profiles for floors and coverings that work with materials like wood and LVT, including solutions that also finish internal and external corners.'
            },
            {
              question: 'Can you help me choose between stainless 304 and 316?',
              answer: 'Yes. In general, 316 is often recommended for higher chemical stress and coastal exposure compared to standard stainless options.'
            }
          ],
          cta: {
            title: 'Want the right corner profile in one shot?',
            subtitle: 'WhatsApp us your tile thickness, a quick corner photo, and approximate running meters. Or email us your BOQ or drawing and we\'ll reply with a quotation and the best-fit options.',
            checklist: [
              'Tile thickness and material (ceramic, porcelain, stone)',
              'Profile type (internal or external) and preferred shape (square or rounded)',
              'Finish preference (aluminium, stainless, PVC, color-coated)',
              'Total running meters and how many corners and end caps needed',
              'Site type (bathroom, kitchen, hospital, villa, retail) and whether it\'s new work or renovation'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'External Corner Profiles - Protect and Enhance',
                content: 'Profilpas external corner profiles are innovative solutions designed to protect and enhance the external corners of walls, tiles, and other surfaces, ensuring durability while maintaining an elegant finish. These profiles provide structural protection from impacts, reducing wear and tear on vulnerable edges, particularly in high-traffic areas. Crafted from premium materials like aluminium, stainless steel, and PVC, they offer robust protection, preventing chipping and cracking over time.'
              },
              {
                title: 'Versatile Finishes for Every Design',
                content: 'The Profilpas range includes various finishes and sizes, making them adaptable to different design aesthetics and functional needs. Whether for a residential bathroom or a commercial project, Profilpas external corner profiles seamlessly integrate into the space, offering both aesthetic appeal and practical benefits. The wide range of finishes allows for a customized look that matches the tiles, walls, or overall décor.'
              },
              {
                title: 'Easy Installation for New and Retrofit Projects',
                content: 'External corner profiles from Profilpas are easy to fit and can be used for new projects or retrofitting during renovations. Their precise design ensures they align perfectly with the surfaces, creating a smooth and polished finish. They not only protect tiles but also contribute to the longevity of construction work by shielding edges from moisture, which can lead to long-term damage.'
              },
              {
                title: 'Corrosion-Resistant for Challenging Environments',
                content: 'Profilpas external corner profiles are corrosion-resistant, making them ideal for use in humid environments such as bathrooms, kitchens, or outdoor spaces. This durability ensures that once installed, they will remain intact and aesthetically pleasing for many years, even in challenging conditions. The corrosion resistance also minimizes the need for maintenance, making them a cost-effective solution for long-term use.'
              },
              {
                title: 'Internal Corner Profiles - Hygiene and Clean Lines',
                content: 'Profilpas offers multiple solutions for customers wishing to eliminate right angles between floor and wall. Internal corner profiles were specifically designed for this purpose and can be used on both new and existing floors - they are ideal for all spaces, both public and private, in which hygiene is a priority. For example hospitals, food plants, beauty spas, swimming pools and commercial kitchens.'
              },
              {
                title: 'Durable Materials, Easy to Clean',
                content: 'Internal corner profiles by Profilpas are made of durable materials that are easy to clean, like aluminium, stainless steel and PVC. Furthermore, their design meets European health and hygiene regulations which require all 90-degree angles in which dirt and bacteria can build up to be eliminated. Internal corner profiles by Profilpas are therefore an ideal solution for all spaces in which high hygienic standards must be maintained.'
              },
              {
                title: 'Professional Finish at Every Junction',
                content: 'In addition to protecting tile edges, internal corner profiles contribute to the overall structure of a tiled surface. They help to create clean, crisp lines, reducing the risk of chipping and cracking that can occur at vulnerable corners. This protective feature is crucial in maintaining the integrity of the installation over time, ensuring that the corners remain smooth and visually appealing.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Corner Profiles Hero - clean tiled wall corner with profile close-up', alt: 'Profilpas corner profiles for clean tile edges' },
            { description: 'External Corner, Square Finish - square aluminium external corner detail', alt: 'Square external corner profile for tile walls' },
            { description: 'External Corner, Rounded Finish - rounded edge external corner in a corridor', alt: 'Rounded external corner tile profile for impact protection' },
            { description: 'Internal Cove Corner in Wet Area - floor-to-wall cove in bathroom or kitchen', alt: 'Internal corner profile for easy cleaning and hygiene' },
            { description: 'Material Comparison Strip - aluminium vs stainless vs PVC samples', alt: 'Profilpas profiles in aluminium stainless steel and PVC' },
            { description: 'Accessories Layout - end caps, inside corners, outside corners arranged neatly', alt: 'Corner profile accessories end caps and corner pieces' },
            { description: 'Renovation Retrofit Example - internal corner profile applied on existing tiles', alt: 'Retrofit internal corner profile for renovations' },
            { description: 'Finish Options Grid - 6 to 12 finish swatches', alt: 'Profilpas finishes for tile profiles and trims' }
          ]
        }
      },
      {
        slug: 'decorative-profiles',
        name: 'Decorative Profiles',
        description: 'Stylish decorative profiles for creative tile installations and design accents.',
        metaDescription: 'Profilpas decorative profiles UAE - Designer tile trims and profiles for luxury projects in Dubai, Abu Dhabi, Sharjah.',
        images: ['/images/brands/profilpas/decorative.jpg'],
      },
      {
        slug: 'bathroom-profiles',
        name: 'Bathroom Profiles',
        description: 'Specialized profiles for bathroom applications including shower and bathtub edges.',
        metaDescription: 'Profilpas bathroom profiles UAE - Shower trims, bathtub edges, and bathroom tile profiles for UAE projects.',
        images: ['/images/brands/profilpas/bathroom.jpg'],
      },
      {
        slug: 'flooring-profiles',
        name: 'Flooring Profiles',
        description: 'Transition profiles and edge trims for all types of flooring installations.',
        metaDescription: 'Profilpas flooring profiles UAE - Transition strips, edge trims, and floor finishing profiles for Dubai projects.',
        images: ['/images/brands/profilpas/flooring-profiles.jpg'],
      },
      {
        slug: 'movement-and-stairnosing',
        name: 'Movement and Stairnosing',
        description: 'Movement joints and stair nosing profiles for expansion control and safety.',
        metaDescription: 'Profilpas movement joints UAE - Expansion joints, stair nosings, and safety profiles for commercial buildings in UAE.',
        images: ['/images/brands/profilpas/movement-stair.jpg'],
      },
      {
        slug: 'balcony-and-terrace-profiles',
        name: 'Balcony and Terrace Profiles',
        description: 'Weather-resistant profiles for outdoor applications on balconies and terraces.',
        metaDescription: 'Profilpas balcony profiles UAE - Outdoor tile trims and terrace profiles for Dubai balconies and terraces.',
        images: ['/images/brands/profilpas/balcony.jpg'],
      },
      {
        slug: 'wooden-laminate-and-lvt-floor-profiles',
        name: 'Wooden Laminate and LVT Floor Profiles',
        description: 'Specialized profiles for laminate and LVT flooring transitions and finishing.',
        metaDescription: 'Profilpas LVT profiles UAE - Laminate and LVT floor transition profiles for residential and commercial UAE projects.',
        images: ['/images/brands/profilpas/lvt-profiles.jpg'],
      },
      {
        slug: 'skirting-boards',
        name: 'Skirting Boards',
        description: 'Modern skirting board systems in various materials and finishes.',
        metaDescription: 'Profilpas skirting boards UAE - Contemporary skirting systems and baseboards for Dubai residential and commercial projects.',
        images: ['/images/brands/profilpas/skirting.jpg'],
      },
      {
        slug: 'prolight-and-tile-trims',
        name: 'Prolight and Tile Trims',
        description: 'LED lighting profiles and standard tile trims for modern installations.',
        metaDescription: 'Profilpas Prolight UAE - LED tile profiles and standard tile trims for architectural lighting in Dubai projects.',
        images: ['/images/brands/profilpas/prolight.jpg'],
      },
    ],
  },

  akzonobel: {
    slug: 'akzonobel',
    name: 'AkzoNobel',
    layout: 'custom',
    logo: '/images/brands/logos/akzonobel-new.webp',
    website: 'https://www.akzonobel.com',
    theme: {
      primary: '#FF6200', // Placeholder
      secondary: '#003B5C',
    },
    hero: {
      type: 'image',
      src: '/images/brands/akzonobel/hero.jpg',
      alt: 'AkzoNobel - Paint the Future',
    },
    description: 'Global leader in paints and coatings for buildings and infrastructure.',
    metaDescription: 'AkzoNobel paints UAE - Premium floor paints, wall coatings, and metal paints for Dubai, Abu Dhabi, Sharjah construction projects.',
    category: 'brand',
    productLines: [
      {
        slug: 'flooring',
        name: 'Flooring',
        description: 'High-performance floor paints and coatings for industrial and commercial applications.',
        metaDescription: 'AkzoNobel floor paints UAE - Industrial and commercial floor coatings for warehouses, factories, and commercial buildings in Dubai.',
        images: ['/images/brands/akzonobel/flooring.jpg'],
      },
      {
        slug: 'walls',
        name: 'Walls',
        description: 'Interior and exterior wall paints and protective coatings.',
        metaDescription: 'AkzoNobel wall paints UAE - Interior and exterior wall coatings for residential and commercial buildings in UAE.',
        images: ['/images/brands/akzonobel/walls.jpg'],
      },
      {
        slug: 'metal-paints',
        name: 'Metal Paints',
        description: 'Protective and decorative coatings for metal surfaces and structures.',
        metaDescription: 'AkzoNobel metal paints UAE - Protective coatings for steel structures, metal facades, and industrial equipment in Dubai.',
        images: ['/images/brands/akzonobel/metal.jpg'],
      },
    ],
  },

  laticrete: {
    slug: 'laticrete',
    name: 'Laticrete',
    layout: 'custom',
    logo: '/images/brands/logos/laticrete-new.webp',
    website: 'https://laticrete.com',
    theme: {
      primary: '#0072CE', // Laticrete Blue (brighter than Mapei)
      secondary: '#FFFFFF', // White
      accent: '#E6F3FF', // Light Blue
    },
    hero: {
      type: 'image',
      src: '/images/brands/laticrete/hero.jpg',
      alt: 'Laticrete - Tile and Stone Installation Systems',
    },
    description: 'American manufacturer of tile and stone installation systems.',
    metaDescription: 'Laticrete UAE - Premium tile adhesives, grouts, waterproofing, and self-leveling systems for Dubai construction projects.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'Advanced tile setting adhesives and high-performance grouts.',
        metaDescription: 'Laticrete tile adhesives UAE - Professional tile installation systems and grouts for ceramic, porcelain, and natural stone in Dubai.',
        images: ['/images/brands/laticrete/tile-adhesives.jpg'],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Load-bearing waterproofing membranes and systems.',
        metaDescription: 'Laticrete waterproofing UAE - HYDRO BAN and waterproofing membranes for wet areas in Dubai, Abu Dhabi, Sharjah.',
        images: ['/images/brands/laticrete/waterproofing.jpg'],
      },
      {
        slug: 'self-leveling-and-screed',
        name: 'Self Leveling and Screed',
        description: 'Fast-setting self-leveling underlayments and screeds.',
        metaDescription: 'Laticrete self-leveling UAE - Fast-track floor leveling compounds and screeds for UAE construction projects.',
        images: ['/images/brands/laticrete/self-leveling.jpg'],
      },
      {
        slug: 'flooring',
        name: 'Flooring',
        description: 'Complete flooring installation systems including adhesives and preparation.',
        metaDescription: 'Laticrete flooring systems UAE - Professional flooring adhesives and installation solutions for Dubai projects.',
        images: ['/images/brands/laticrete/flooring.jpg'],
      },
    ],
  },

  weber: {
    slug: 'weber',
    name: 'Weber (Saint-Gobain)',
    layout: 'custom',
    logo: '/images/brands/logos/weber-new.webp',
    website: 'https://www.middleeast.weber/',
    theme: {
      primary: '#FFCC00', // Weber Yellow
      secondary: '#1A1A1A', // Black
      accent: '#FFF3B0', // Light Yellow
    },
    hero: {
      type: 'image',
      src: '/images/brands/weber/hero.webp',
      alt: 'Weber - Building Solutions',
    },
    description: 'Saint-Gobain Weber - World leader in construction mortars and facade systems.',
    metaDescription: 'Weber UAE - Saint-Gobain tile adhesives, waterproofing, repair mortars, and self-leveling systems for Dubai construction.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'Professional tile fixing systems and jointing materials.',
        metaDescription: 'Weber tile adhesives UAE - Saint-Gobain tile fixing systems and grouts for all tile types in Dubai projects.',
        images: ['/images/brands/weber/tile-adhesives.jpg'],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Flexible waterproofing membranes and liquid-applied systems.',
        metaDescription: 'Weber waterproofing UAE - Flexible membranes and liquid waterproofing for bathrooms, terraces, and basements in Dubai.',
        images: ['/images/brands/weber/waterproofing.jpg'],
      },
      {
        slug: 'repair-and-anchoring',
        name: 'Repair and Anchoring',
        description: 'Concrete repair mortars and structural strengthening solutions.',
        metaDescription: 'Weber repair mortars UAE - Concrete repair, structural strengthening, and anchoring systems for UAE infrastructure.',
        images: ['/images/brands/weber/repair.jpg'],
      },
      {
        slug: 'self-leveling-and-microcement',
        name: 'Self Leveling and Microcement',
        description: 'Floor leveling compounds and decorative microcement finishes.',
        metaDescription: 'Weber self-leveling UAE - Floor screeds and microcement for seamless finishes in Dubai residential and commercial projects.',
        images: ['/images/brands/weber/self-leveling.jpg'],
      },
    ],
  },

  // ===== STANDARD LAYOUT BRANDS =====
  kerakoll: {
    slug: 'kerakoll',
    name: 'Kerakoll',
    layout: 'standard',
    logo: '/images/brands/logos/kerakoll-new.webp',
    website: 'https://gcc.kerakoll.com/',
    theme: {
      primary: '#AFCDAF', // Sage Green
      secondary: '#1a1a1a', // Black
      accent: '#F0F5F0', // Light Green
    },
    hero: {
      type: 'image',
      src: '/images/brands/kerakoll/hero.jpg',
      alt: 'Kerakoll - Building Better Together',
    },
    description: 'Italian leader in eco-friendly adhesives and building materials.',
    metaDescription: 'Kerakoll UAE - Eco-friendly tile adhesives, grouts, and waterproofing systems for sustainable construction in Dubai.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'Eco-sustainable tile adhesives and epoxy grouts.',
        metaDescription: 'Kerakoll tile adhesives UAE - Green building tile systems and eco-friendly grouts for Dubai sustainable projects.',
        images: ['/images/brands/kerakoll/tile-adhesives.jpg'],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Eco-friendly waterproofing membranes and systems.',
        metaDescription: 'Kerakoll waterproofing UAE - Sustainable waterproofing solutions for green buildings in Dubai and UAE.',
        images: ['/images/brands/kerakoll/waterproofing.jpg'],
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
  },

  'pidilite-puma': {
    slug: 'pidilite-puma',
    name: 'Pidilite Puma',
    layout: 'standard',
    logo: '/images/brands/logos/pidilite-puma-new.webp',
    website: 'https://www.grupopuma.com/en-AE',
    theme: {
      primary: '#0284c3', // Puma Blue
      secondary: '#001830', // Dark Blue
      accent: '#E8F4FC', // Light Blue
    },
    hero: {
      type: 'image',
      src: '/images/brands/pidilite/hero.jpg',
      alt: 'Pidilite Puma - Technical Solutions',
    },
    description: 'Trusted construction chemicals and integrated building systems.',
    metaDescription: 'Pidilite Puma UAE - Tile adhesives, waterproofing, epoxy repair, and self-leveling systems for Dubai construction.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'Reliable tile fixing adhesives and grouting solutions.',
        metaDescription: 'Pidilite Puma tile adhesives UAE - Trusted tile fixing systems and grouts for Dubai residential and commercial projects.',
        images: ['/images/brands/pidilite/tile-adhesives.jpg'],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Waterproofing compounds for wet areas and basements.',
        metaDescription: 'Pidilite Puma waterproofing UAE - Water-resistant coatings for bathrooms, terraces, and basements in Dubai.',
        images: ['/images/brands/pidilite/waterproofing.jpg'],
      },
      {
        slug: 'epoxy-repair',
        name: 'Epoxy Repair',
        description: 'High-strength epoxy repair systems for concrete and steel.',
        metaDescription: 'Pidilite Puma epoxy UAE - Structural epoxy repair and bonding systems for Dubai infrastructure projects.',
        images: ['/images/brands/pidilite/epoxy.jpg'],
      },
      {
        slug: 'self-leveling',
        name: 'Self Leveling',
        description: 'Self-leveling floor compounds for smooth finishes.',
        metaDescription: 'Pidilite Puma self-leveling UAE - Floor leveling compounds for residential and commercial flooring in Dubai.',
        images: ['/images/brands/pidilite/self-leveling.jpg'],
      },
    ],
    extendedContent: {
      brandStory: 'Grupo Puma brings decades of construction expertise to the Middle East, offering integrated building solutions that professionals trust. From tile adhesives and waterproofing to specialized flooring systems, Puma products are engineered for performance in demanding conditions. Their comprehensive range includes pre-mix mortars, decorative plasters, and advanced repair systems that meet the highest industry standards.',
      whyLapizBlue: 'As an authorized Grupo Puma partner in the UAE, Lapiz Blue delivers reliable construction chemical solutions backed by technical expertise. Our team provides product recommendations, system specifications, and on-site support for projects across the region.',
      uniqueSection: {
        type: 'systems',
        title: 'Integrated Building Systems',
        subtitle: 'Complete solutions engineered for demanding construction environments',
        items: [
          { name: 'Drypool System', description: 'Complete pool installation system with waterproofing, adhesives, and finishing' },
          { name: 'Residential Flooring', description: 'Integrated flooring solutions for homes and apartments' },
          { name: 'EIFS/ETICS Insulation', description: 'External thermal insulation composite systems for energy efficiency' },
          { name: 'Concrete Repair', description: 'Structural repair and protection systems for infrastructure' },
        ],
      },
    },
  },

  fila: {
    slug: 'fila',
    name: 'FILA',
    layout: 'standard',
    logo: '/images/brands/logos/fila-new.webp',
    website: 'https://www.filasolutions.com/mee/',
    theme: {
      primary: '#FFD100', // FILA Yellow
      secondary: '#1D1D1B', // Dark Gray
      accent: '#FFFBEB', // Light Yellow
    },
    hero: {
      type: 'image',
      src: '/images/brands/fila/hero.jpg',
      alt: 'FILA - Surface Care Solutions',
    },
    description: 'Italian leader in surface treatment, protection, and maintenance products.',
    metaDescription: 'FILA UAE - Professional tile sealers, stone cleaners, and surface protection products for Dubai projects.',
    category: 'brand',
    productLines: [
      {
        slug: 'sealers',
        name: 'Sealers',
        description: 'Professional sealers and protective treatments for tiles and natural stone.',
        metaDescription: 'FILA sealers UAE - Tile and natural stone sealers for protection and stain resistance in Dubai projects.',
        images: ['/images/brands/fila/sealers.jpg'],
      },
      {
        slug: 'cleaners',
        name: 'Cleaners',
        description: 'Specialized cleaning products for all types of surfaces and materials.',
        metaDescription: 'FILA cleaners UAE - Professional surface cleaning products for tiles, stone, wood, and concrete in Dubai.',
        images: ['/images/brands/fila/cleaners.jpg'],
      },
    ],
    extendedContent: {
      brandStory: 'FILA Solutions has protected and maintained surfaces across the globe for over 80 years. Their professional-grade cleaners, sealers, and surface treatments are trusted by more than 240 leading tile and stone manufacturers. From porcelain to natural stone, concrete to resin, FILA offers specialized care solutions for every surface type.',
      whyLapizBlue: 'Lapiz Blue provides complete FILA surface care solutions in the UAE. Whether you need pre-installation sealers, post-installation cleaners, or long-term maintenance products, our team helps you select the right FILA solution for your specific surface.',
      uniqueSection: {
        type: 'expertise',
        title: 'Surface Care Expertise',
        subtitle: 'Specialized solutions for every material and application',
        items: [
          { name: 'Porcelain & Ceramic', description: 'Cleaning and protection solutions for modern porcelain and ceramic tiles' },
          { name: 'Natural Stone', description: 'Sealers and treatments designed for marble, granite, and limestone' },
          { name: 'Concrete Surfaces', description: 'Industrial-strength protection and maintenance for concrete floors' },
          { name: 'Specialty Materials', description: 'Care solutions for terracotta, resin, and other unique surfaces' },
        ],
      },
    },
  },

  'granimarmo-classic': {
    slug: 'granimarmo-classic',
    name: 'Granimarmo Classic',
    layout: 'standard',
    logo: '/images/brands/logos/grani-marmo.svg',
    website: 'https://www.marmoclassic.ae/',
    theme: {
      primary: '#C5A572', // Gold
      secondary: '#161925', // Black
      accent: '#F5F5F5', // Light Grey
    },
    hero: {
      type: 'image',
      src: '/images/brands/granimarmo/hero.webp',
      alt: 'Granimarmo Classic - Premium Natural Stone Collection',
    },
    description: 'Premium natural marble and decorative stone supplier.',
    metaDescription: 'Granimarmo Classic UAE - Premium marble, granite, and decorative natural stones for luxury projects in Dubai.',
    category: 'brand',
    hideProductNav: true,
    hideProductGrid: true,
    productLines: [
      {
        slug: 'marbles',
        name: 'Marbles',
        description: 'Exquisite natural marble in various colors and finishes.',
        metaDescription: 'Granimarmo marble UAE - Imported Italian and exotic marble slabs and tiles for Dubai luxury residential and commercial projects.',
        images: ['/images/brands/granimarmo/marble.jpg'],
      },
      {
        slug: 'decorative-stones',
        name: 'Decorative Stones',
        description: 'Unique decorative stones for feature walls and statement pieces.',
        metaDescription: 'Granimarmo decorative stones UAE - Exotic natural stones for feature walls and luxury interiors in Dubai.',
        images: ['/images/brands/granimarmo/decorative.jpg'],
      },
    ],
    extendedContent: {
      brandStory: 'Granimarmo Classic curates exceptional natural stones for discerning architects and interior designers. Their collection features premium marbles, exotic granites, and decorative stones sourced from renowned quarries worldwide. Each slab is selected for its unique veining, color depth, and timeless elegance.',
      whyLapizBlue: 'Lapiz Blue offers exclusive access to Granimarmo Classic\'s premium stone collection in the UAE. Our specialists assist with material selection, custom cutting specifications, and project coordination for luxury residential and commercial interiors.',
      stats: [
        { value: '200+', label: 'Artificial Stones', iconType: 'stones' },
        { value: '300+', label: 'Natural Stones', iconType: 'wood' },
        { value: '670+', label: 'Luxury homes built with our stones', iconType: 'home' },
        { value: '420+', label: 'B2B Projects (MENA)', iconType: 'building' },
      ],
      capabilities: {
        intro: 'As one of the UAE\'s leading suppliers of marble, natural and engineered stones, travertine, terrazzo, and quartz, Grani Marmo Classic has built an impressive portfolio serving luxury residential and commercial developments across the region.',
        items: [
          {
            title: 'Precision Craftsmanship',
            subtitle: 'Where Vision Meets Mastery',
            content: 'Our team of master craftsmen transforms raw stone into works of art. From chamfered edges and book-matched designs to unique bespoke installations, we bring your vision to life with meticulous attention to detail.',
          },
          {
            title: 'State of the Art Facility',
            subtitle: '100,000 sq ft Lifestyle Gallery',
            content: 'Step into our exclusive lifestyle gallery spanning 100,000 square feet—a private sanctuary where you can explore and select from over 1 million square feet of premium stones. View exotic slabs in book-match patterns and visualize the natural beauty inherent in each piece.',
            image: '/images/brands/granimarmo/facility.webp',
          },
          {
            title: 'Only the Finest Stones',
            subtitle: 'Curated Luxury from World-Class Quarries',
            content: 'We maintain exacting standards in sourcing stones from quarries worldwide. Each slab passes through our rigorous internal quality checklist, ensuring only the highest echelon of stone quality enters our production facility.',
          },
        ],
      },
      uniqueSection: {
        type: 'gallery',
        title: 'Stone Gallery',
        subtitle: 'Timeless elegance from the world\'s finest quarries',
        items: [
          { name: 'Italian Marbles', description: 'Classic Carrara, Calacatta, and Statuario from renowned Italian quarries' },
          { name: 'Exotic Granites', description: 'Rare and striking granites from Brazil, India, and beyond' },
          { name: 'Onyx & Travertine', description: 'Translucent onyx and textured travertine for dramatic interiors' },
          { name: 'Decorative Slabs', description: 'Unique statement pieces for feature walls and artistic installations' },
        ],
      },
    },
  },
};

// Helper function to get brand by slug
export function getBrandConfig(slug: string): BrandConfig | null {
  return brandConfigs[slug] || null;
}

// Helper function to get product line
export function getProductLine(brandSlug: string, productLineSlug: string): ProductLine | null {
  const brand = getBrandConfig(brandSlug);
  if (!brand) return null;
  return brand.productLines.find(pl => pl.slug === productLineSlug) || null;
}

// Helper function to get all brands
export function getAllBrands(): BrandConfig[] {
  return Object.values(brandConfigs).filter(b => b.category === 'brand');
}

// Helper function to get custom layout brands
export function getCustomLayoutBrands(): BrandConfig[] {
  return Object.values(brandConfigs).filter(b => b.layout === 'custom' && b.category === 'brand');
}

// Helper function to get standard layout brands
export function getStandardLayoutBrands(): BrandConfig[] {
  return Object.values(brandConfigs).filter(b => b.layout === 'standard' && b.category === 'brand');
}
