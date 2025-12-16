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
        images: ['/images/brands/profilpas/product-lines/cornerprofiles.webp'],
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
        metaDescription: 'Decorative listello trims by Profilpas for clean, premium tile finishes. UAE-wide supply with support from Lapiz Blue.',
        images: ['/images/brands/profilpas/product-lines/decorativeprofiles.webp'],
        content: {
          seoTitle: 'Profilpas Decorative Profiles | Tile Profiles UAE | Lapiz Blue',
          h1: 'Profilpas decorative profiles that make tile work look finished',
          intro: 'A good tile layout can still look incomplete if the edges, inserts, and junctions feel "raw." Profilpas decorative profiles solve that with slim, precise listello trims and design profiles that add definition, hide cut lines, and protect delicate edges. At Lapiz Blue, we help you choose the right profile material and finish for your space, then supply what you need for smooth installation and a clean final look. Whether you\'re working on bathrooms, feature walls, hotel lobbies, or retail displays, these details make the difference your client notices.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Feature bands on wall tiles: horizontal listello lines to break up large tile fields',
              'Niches and shower walls: highlight borders and transitions between finishes',
              'Lobby and retail walls: add a subtle "metal line" that looks high-end under lighting',
              'Kitchen backsplashes: clean separation between tile zones and colors',
              'Hotel and apartment upgrades: thin-layer decorative detail without changing the whole tile selection',
              'Matching with other finishes: coordinate decorative strips with threshold and transition profiles where wall and floor aesthetics need to feel connected'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Decorative Profile',
            bullets: [
              'Start with the tile body and grout width: decide if you want the profile to sit as a thin "line" or a more visible accent',
              'Pick material by environment: aluminium and stainless options are common for decorative listello trims, while brass is for premium statement detailing',
              'Choose finish by lighting: brushed finishes hide fingerprints and micro-scratches better than mirror-polished looks in busy areas',
              'Plan the layout like a "feature line," not a filler: align with sanitaryware heights, niche edges, or tile module lines so it looks intentional',
              'Avoid water traps in wet zones: where the profile creates a channel or recess, keep the joint properly filled and finished so water does not sit there',
              'Match decorative trims with the rest of the finishing kit: if the same space needs corner protection or tile edges, select a compatible family so heights and finishes align',
              'If your project includes LVT, parquet, or wood: keep the decorative wall line consistent with your threshold profiles and transition profiles so the whole space feels "one system"'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Choosing a mirror finish for high-touch zones without considering fingerprints and cleaning frequency',
              'Treating decorative trims as "last-minute" items and then compromising on alignment',
              'Not planning the grout line and tile cuts around the decorative strip',
              'Using the right look with the wrong adhesive or joint finishing in wet areas'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'In stock, usually available, project order, or on request depending on finish and series' },
              { label: 'Coverage', value: 'UAE-wide supply with GCC export support' },
              { label: 'Branches', value: 'Dubai, Abu Dhabi, Sharjah' },
              { label: 'Documentation', value: 'Product datasheets and selection support for spec and approvals' },
              { label: 'Technical Guidance', value: 'Help choosing profile height, finish, and installation approach for the tile system' },
              { label: 'Quotations', value: 'Fast quotes for BOQ-style requests or simple retail quantities' }
            ]
          },
          faqs: [
            {
              question: 'What are decorative profiles and listello trims used for?',
              answer: 'They add a clean design line, protect edges, and hide tile cut transitions so the wall finish looks intentional and complete.'
            },
            {
              question: 'Which Profilpas decorative series should I consider first?',
              answer: 'Cerfix Prolist is a strong "go-to" for wall coverings, while Prolist X Design is chosen when you want modern brushed finishes.'
            },
            {
              question: 'Are Prodecor C Design profiles only for luxury projects?',
              answer: 'Mostly yes. They\'re designed as premium decorative pieces in plated brass, with optional Swarovski® crystal variants.'
            },
            {
              question: 'Can I use decorative profiles inside showers or wet areas?',
              answer: 'Yes, but selection and finishing matter. In wet zones, joint finishing must be done properly to avoid recesses holding water, especially with channel-style profiles.'
            },
            {
              question: 'How do I match tile profiles with other floor finishing needs?',
              answer: 'If the same project includes parquet, LVT, or other floor coverings, we can align decorative wall profiles with threshold profiles and transition profiles so finishes stay consistent.'
            },
            {
              question: 'Do you only supply, or do you also help with selection?',
              answer: 'We support selection, documentation, and quantity planning so contractors and consultants can specify the right profile and finish confidently.'
            },
            {
              question: 'What should I share for an accurate quotation?',
              answer: 'Profile series name, finish, height, total linear meters, tile thickness, and site location for delivery planning.'
            },
            {
              question: 'Do you support export for large projects?',
              answer: 'Yes, we handle GCC export support depending on project requirements and lead times.'
            }
          ],
          cta: {
            title: 'Want us to recommend the right decorative profile finish and size?',
            subtitle: 'Send your tile size, tile thickness, preferred finish, and a photo or elevation on WhatsApp. Or email your BOQ and required series (Cerfix Prolist, Prolist X Design, Prodecor C Design, Prostyle C Design) for a fast quotation.',
            checklist: [
              'Series name and finish',
              'Height and length requirement (linear meters)',
              'Tile thickness and grout width',
              'Area type (dry wall, wet area, feature wall)',
              'Delivery city and timeline',
              'If you need matching items (corner protection, tile edges, threshold or transition profiles)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Listello Tile Trims and Decorative Profiles',
                content: 'Listello tile trims and decorative profiles are key elements that enhance any space, adding both light and elegance to your coverings. These finishing touches have the power to transform and elevate the appearance of a room. Profilpas offers a diverse range of listello tile trims, including options in stainless steel, aluminum, and brass. These trims are designed to complement various aesthetic styles, from classic to contemporary, and can be used in any setting—be it a kitchen, bathroom, living room, or commercial space.'
              },
              {
                title: 'The Cerfix® Prolist Collection',
                content: 'The Cerfix® Prolist collection features specialized tile edge trims that create striking visual effects on ceramic tiles. Available in an array of materials and colors, these trims can be seamlessly combined with other profiles from the Protrim, Proangle, and Proangle Q ranges for a truly sophisticated look. For a cohesive and stylish finish, consider coordinating with different tile edge trim options such as PVC or aluminum.'
              },
              {
                title: 'Elegant and Functional Tile Trim Solutions',
                content: 'Listello tile trims and decorative profiles by Profilpas are essential components for achieving a polished and professional finish in tiling projects. These trims serve not only as functional elements but also as design features that enhance the aesthetic appeal of any tiled surface. Available in a variety of materials, including aluminium, stainless steel, PVC, and brass, Profilpas offers a solution to suit every style and budget.'
              },
              {
                title: 'Aluminium and Stainless Steel Options',
                content: 'The aluminium tile edge trim is known for its durability and resistance to corrosion, making it ideal for both indoor and outdoor applications. Its sleek and modern design complements contemporary decor, ensuring that transitions between tiles are seamless and visually appealing. Stainless steel tile edge trims add a touch of elegance and sophistication. Their shiny finish reflects light beautifully, making them a popular choice for high-end installations, such as in luxury hotels and upscale residential spaces.'
              },
              {
                title: 'PVC and Brass Trim Options',
                content: 'For those seeking a more economical option, PVC tile edge trims are lightweight and versatile. They provide adequate protection for tile edges while offering a range of colors and finishes, making it easy to match them with existing decor. Brass tile edge trims bring a classic and warm touch to any tiling project. The natural patina that develops over time adds character and charm, making brass a favorite for vintage or rustic-themed interiors.'
              },
              {
                title: 'Available Across UAE',
                content: 'The availability of these listello tile trims in Abu Dhabi and Dubai makes it convenient for homeowners, contractors, and designers to source high-quality finishing materials. Lapiz Blue\'s distribution network in these regions ensures that customers can easily access Profilpas products, supported by knowledgeable staff who can assist in selecting the right trim for specific projects.'
              },
              {
                title: 'Quality and Design Flexibility',
                content: 'Whether it\'s for a residential renovation, a commercial fit-out, or a new construction project, Profilpas listello tile trims and decorative profiles stand out for their quality, variety, and design flexibility. With the right choice of trim, any tiled surface can be transformed into a stunning feature, showcasing the craftsmanship and care taken in the installation process.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Decorative listello hero wall - modern bathroom wall with a thin metallic line running horizontally', alt: 'Profilpas decorative listello profile on wall tiles' },
            { description: 'Cerfix Prolist close-up - macro showing aluminium vs steel finish options', alt: 'Cerfix Prolist decorative tile trim finish detail' },
            { description: 'Prolist X Design in brushed finish - installed on a feature wall with lighting', alt: 'Prolist X Design brushed decorative tile profile' },
            { description: 'Prodecor C Design luxury detail - plated brass profile with premium look', alt: 'Prodecor C Design decorative brass profile for tile walls' },
            { description: 'Prostyle C Design installation angle - corner or edge view showing how the profile sits flush', alt: 'Prostyle C Design decorative profile installed on wall tiles' },
            { description: 'Wet-area niche example - profile used to frame niche or border line', alt: 'Decorative tile profile for shower niche border' },
            { description: 'Commercial lobby wall feature - long listello line across large-format wall tile', alt: 'Decorative tile trim profile for commercial wall feature' },
            { description: 'Finish comparison grid - 4 small swatches photographed side-by-side', alt: 'Tile profile finish options for decorative trims' }
          ]
        }
      },
      {
        slug: 'bathroom-profiles',
        name: 'Bathroom Profiles',
        description: 'Specialized profiles for bathroom applications including shower and bathtub edges.',
        metaDescription: 'Floor-level shower drains, glass profiles and hygienic bathroom edge systems by Profilpas. UAE-wide supply with support from Lapiz Blue branches.',
        images: ['/images/brands/profilpas/product-lines/bathroomprofiles.webp'],
        content: {
          seoTitle: 'Profilpas Bathroom Profiles & Shower Drains UAE | Lapiz Blue',
          h1: 'Profilpas Bathroom Profiles and Shower Drainage Systems, supplied by Lapiz Blue',
          intro: 'Bathrooms fail at the details - slopes, joints, edges, and drainage. Profilpas bathroom profiles and systems are built to keep floor-level showers clean, safe, and visually sharp, with coordinated drainage channels, glass-fixing profiles, and silicone-free finishing options. If you\'re specifying for a villa bathroom, a hotel wet room, or a high-traffic facility wash area, Lapiz Blue helps you choose the right Profilpas system based on tile thickness, slope, grate style, and cleaning needs. We supply across the UAE and GCC, with practical technical guidance for installers and consultants.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Floor-level showers in villas, apartments, and penthouses',
              'Hotel bathrooms and serviced apartments where cleaning speed matters',
              'Commercial washrooms and gym locker areas with frequent water exposure',
              'Wet rooms, spa zones, and pool changing areas',
              'Glass partition showers where you need a crisp edge over a slope',
              'Renovations where floor build-up is limited and you need slimmer drainage choices'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Bathroom System',
            bullets: [
              'Start with the shower design: linear channel look vs point drain layout (aesthetic and maintenance preference)',
              'Confirm tile thickness and finish: Thin Drain channels are designed to suit tile thicknesses up to 12mm, with brushed or high-shine stainless steel grate options',
              'Check slope strategy early: glass-fixing profiles commonly work around a 2% slope condition in floor-level showers',
              'Decide grate style: stainless grate vs tile-insert "invisible" look (best for minimal interiors)',
              'Match usage intensity: guest bathroom vs hotel - choose systems that are easier to inspect and clean',
              'If waterproofing responsibility is split (tile contractor vs waterproofing applicator), insist on one documented installation approach',
              'For renovations, shortlist low-profile drainage options first (many "slim" systems are selected specifically for reduced build-up)'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Choosing the drain last - after tiles and slope are already fixed',
              'Ignoring tile thickness limits and ending up with proud grates or awkward cuts (Thin Drain references suitability up to 12mm tile thickness)',
              'No cleaning access plan - you want inspection-friendly components in high-usage bathrooms',
              'Mixing unrelated components from different systems without a clear waterproofing responsibility split',
              'Skipping glass edge detailing where slopes meet partitions (2% slope handling is a common design reality)'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'Stocked lines plus project-order finishes and lengths' },
              { label: 'Coverage', value: 'UAE-wide delivery and GCC export support' },
              { label: 'Branch Support', value: 'Dubai, Abu Dhabi, Sharjah' },
              { label: 'Documentation', value: 'Product datasheets, technical catalogue references, and specification support' },
              { label: 'On-Ground Guidance', value: 'Help choosing the right drain type, grate style, and profile detailing for site conditions' },
              { label: 'Quotations', value: 'Fast quotation support for tenders, BOQs, and project requirements' }
            ]
          },
          faqs: [
            {
              question: 'What are bathroom profiles and systems used for?',
              answer: 'They protect edges, manage water flow, finish shower junctions cleanly, and support hygienic detailing around wet areas.'
            },
            {
              question: 'What\'s the difference between Thin Drain and Slim Drain?',
              answer: 'Thin Drain focuses on tile compatibility and grate options (including stainless finishes and tile thickness guidance), while Slim Drain is often chosen when you want a flush look and renovation-friendly constraints.'
            },
            {
              question: 'Can Thin Drain work with my tile thickness?',
              answer: 'Thin Drain channels are specified as suitable for tile thicknesses up to 12mm.'
            },
            {
              question: 'Do these systems help reduce leak risk?',
              answer: 'The right system helps, but performance depends on correct installation and waterproofing continuity. Thin Drain also references an integrated waterproofing membrane to reduce seepage risk.'
            },
            {
              question: 'What is the Glass Profile used for in showers?',
              answer: 'It\'s used to finish and support glass partitions and can be specified in floor-level showers where a slope (commonly 2%) must be handled neatly.'
            },
            {
              question: 'Is Sanibord a replacement for silicone?',
              answer: 'Sanibord is designed to reduce reliance on silicone in key junctions and improve hygiene, but final detailing still depends on the site and specification.'
            },
            {
              question: 'Do you supply across the UAE and GCC?',
              answer: 'Yes - UAE-wide supply, plus GCC export support, with assistance from our Dubai, Abu Dhabi, and Sharjah branches.'
            },
            {
              question: 'Can you help us choose the right drain and grate for a hotel project?',
              answer: 'Yes - share tile thickness, shower layout, expected usage, and preferred finish, and we\'ll recommend the best-fit Profilpas options.'
            }
          ],
          cta: {
            title: 'Want the right Profilpas bathroom system picked in one go?',
            subtitle: 'Message us on WhatsApp with your shower size, tile thickness, and drain style preference (linear or point). Or email our team with your BOQ and site location, and we\'ll send options, datasheets, and a quotation.',
            checklist: [
              'Project location (UAE or GCC) and timeline',
              'Shower type: linear drain or point drain',
              'Shower size and layout drawing (even a marked photo is fine)',
              'Tile thickness and tile material (porcelain, stone, etc.)',
              'Preferred finish (brushed stainless, high-shine, tile-insert look)',
              'Quantity and lengths required (per bathroom type)',
              'Any consultant or authority requirements (if applicable)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Bathroom Profiles and Systems by Profilpas',
                content: 'Profilpas presents a wide range of solutions, specifically for bathrooms, which combine functionality and contemporary design. In particular, Profilpas presents bathroom profiles and systems for floor-level showers, with an extensive selection of drainage channels - like Thin Drain, Slim Drain and Smart Drain, all customizable with different stainless steel grates - and Q-Drains, of which there is also a wide range.'
              },
              {
                title: 'Glass Profile Line',
                content: 'The Profilpas dedicated bathroom range also includes the Glass Profile line which includes profiles for use when mounting glass partition walls or to finish shower floors, in particular to transition over a 2% slope. All elements are coordinating, to make the shower area aesthetically perfect and in harmony with trends in contemporary interior design.'
              },
              {
                title: 'Sanibord Hygienic Range',
                content: 'Profilpas has also designed and produced the Sanibord range, which features technical profiles for use between coverings and the bath or shower tray, so that silicone is not required and assuring excellent hygiene.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Profilpas bathroom range includes: PP Drain Aqua for comprehensive drainage solutions, Thin Drain for tile-compatible linear channels, Slim Drain for renovation-friendly flush installations, Smart Drain for modern minimal aesthetics, Q Drain for point drain applications, Glass Profile for shower partition support, and Sanibord for hygienic silicone-free junctions.'
              },
              {
                title: 'Coordinated System Approach',
                content: 'One coordinated bathroom system means drainage, edges, glass finishing, and hygiene details all match - no "mix and hope" on site. Floor-level shower drainage options suit modern design and renovation constraints, with Slim Drain designed for flush installation and often chosen for renovation-friendly builds.'
              },
              {
                title: 'Technical Specifications',
                content: 'Thin Drain offers multiple grate finishes and tile thickness compatibility up to 12mm, plus an integrated waterproofing membrane to reduce seepage risk. Glass Profile style solutions provide clean shower partitions and slope transitions, working around the industry standard 2% slope where required.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Floor-level shower with linear drain - installed drain with tile-insert look', alt: 'Profilpas linear shower drain installed in floor-level shower' },
            { description: 'Thin Drain close-up - grate options (brushed vs high-shine)', alt: 'Thin Drain stainless steel grate options for floor-level showers' },
            { description: 'Slim Drain in renovation setting - low build-up bathroom floor detail', alt: 'Slim Drain shower channel suitable for renovation projects' },
            { description: 'Smart Drain installed in modern bathroom - minimal grate and clean lines', alt: 'Smart Drain floor-level shower drainage system in modern bathroom' },
            { description: 'Q Drain point drain styles - multiple cover designs', alt: 'Q Drain point drain cover styles for floor-level showers' },
            { description: 'Glass Profile detail at shower partition - glass edge supported over slope', alt: 'Glass Profile supporting shower partition glass over sloped floor' },
            { description: 'Sanibord junction detail - bath or shower tray transition detail', alt: 'Sanibord profile for hygienic transition between covering and shower tray' },
            { description: 'System diagram image - drain + slope + waterproofing layers exploded visual', alt: 'Bathroom system layers showing slope, waterproofing, drain, and tile finish' }
          ]
        }
      },
      {
        slug: 'flooring-profiles',
        name: 'Flooring Profiles',
        description: 'Transition profiles and edge trims for all types of flooring installations.',
        metaDescription: 'Flooring profiles for same or different heights - clean transitions for tile, parquet, LVT and carpet. UAE-wide delivery + GCC export.',
        images: ['/images/brands/profilpas/product-lines/flooringprofiles.webp'],
        content: {
          seoTitle: 'Profilpas Flooring Profiles UAE - Lapiz Blue',
          h1: 'Profilpas Flooring Profiles for Seamless, Safe Floor Transitions',
          intro: 'Floor transitions are where projects either look premium or start failing - chipped edges, gaps, trip points, and messy joints usually begin here. Profilpas flooring profiles help you join different materials with a clean line, protect exposed edges, and smooth out small height differences between finishes like tile, parquet, LVT, carpet, marble, and granite. We supply from our Dubai, Abu Dhabi, and Sharjah branches with UAE-wide delivery and GCC export, and we help you choose the right profile height, finish, and fixing method so installers get it right the first time.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Tile to parquet or laminate transitions in villas, offices, and retail fit-outs',
              'Tile to LVT transitions in renovations where existing floors must stay',
              'Carpet to tile joins in commercial corridors and meeting areas',
              'Threshold and doorway transitions for cleaner room-to-room finishing',
              'Correcting small level differences between rooms without leaving a trip edge',
              'High-traffic areas where edge protection matters (trolleys, footfall, cleaning machines) - sloped transition designs for step-free joins'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Flooring Profile',
            bullets: [
              'Start with the heights: same level needs a flat join profile, different levels need a sloped or compensating profile',
              'Check the floor material behavior: parquet and laminate need movement allowance, so expansion-friendly transition solutions matter',
              'Match the traffic: entrances, corridors, and commercial floors need stronger edge protection and sturdier profiles',
              'Choose the finish based on exposure: wet cleaning, chemicals, and scratches need more durable finishes than a low-traffic bedroom',
              'Confirm the edge risk: if the higher floor edge is vulnerable (carpet, vinyl, laminate), pick a profile that protects that top edge',
              'Decide fixing method early: adhesive fit, mechanical fixing, or renovation-friendly options depending on whether the floor is new or existing',
              'For renovations: if no transition was installed during laying, sloped "retrofit style" profiles are a common solution approach'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Ignoring height differences and expecting a flat profile to work on uneven floors',
              'Not accounting for movement in wood and laminate floors, leading to buckling or gaps',
              'Choosing a finish that cannot handle wet cleaning or high traffic wear',
              'Installing profiles after flooring is complete without proper fixing allowance',
              'Skipping edge protection on vulnerable materials like carpet, vinyl, or laminate edges'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Branch Support', value: 'Available from Lapiz Blue branches in Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Coverage', value: 'UAE-wide delivery plus GCC export support (quote-based, project-based)' },
              { label: 'Selection Help', value: 'Share floor thicknesses, materials, and photos - we\'ll guide the right profile type and height' },
              { label: 'Documentation', value: 'Product references and finish options shared during quotation for smoother approvals' },
              { label: 'Trade-Friendly', value: 'BOQ-style requests, contractor quantities, and repeat site orders supported' }
            ]
          },
          faqs: [
            {
              question: 'What is a flooring profile used for?',
              answer: 'It creates a clean transition between floor finishes, protects exposed edges, and reduces trip risks at joints.'
            },
            {
              question: 'Do I need a profile if the two floors are the same height?',
              answer: 'Yes - equal-height joins still need a neat joint line, edge protection, and a cleaner finish at thresholds.'
            },
            {
              question: 'Which profile is best for floors of different heights?',
              answer: 'A sloped or compensating profile that bridges the height difference while protecting the higher edge.'
            },
            {
              question: 'Can I use these profiles for parquet and laminate floors?',
              answer: 'Yes - wood and laminate commonly need movement allowance, and transition profiles are designed with that in mind.'
            },
            {
              question: 'Are these profiles suitable for LVT and vinyl transitions?',
              answer: 'Yes - LVT transitions usually need edge protection and clean termination, especially in renovations.'
            },
            {
              question: 'What details should I share to get the right recommendation?',
              answer: 'Floor finish type on both sides, thickness of each finish, the height difference (if any), and whether it\'s new work or retrofit.'
            },
            {
              question: 'Do you supply for residential and commercial projects?',
              answer: 'Yes - from single-room renovations to full fit-outs, depending on required finish and quantity.'
            },
            {
              question: 'Can I order in bulk for a project?',
              answer: 'Yes - share your quantities and required finishes, and we\'ll quote based on availability (in stock or project order).'
            }
          ],
          cta: {
            title: 'Send us your floor details and we\'ll recommend the right profile',
            subtitle: 'WhatsApp us using the button on this page, or email us for BOQ and project quotations. We\'ll recommend the right Profilpas profile in minutes.',
            checklist: [
              'Floor type (tile, parquet, LVT, carpet) on each side',
              'Thickness on each side',
              'Level difference (if any)',
              'Area type (doorway, corridor, room edge)',
              'Preferred finish (aluminium, stainless, brass)',
              'Quantity required (linear meters)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'One Range for Both Situations',
                content: 'Profilpas flooring profiles cover both situations: profiles for floors of equal height and profiles for floors of different heights, so your transitions stay consistent across the project. This means you can specify from one supplier and maintain visual consistency throughout the space.'
              },
              {
                title: 'Profiles for Floors of Equal Height',
                content: 'When floor finishes are at the same level, you still need a clean joint line and edge protection. Product options include: Proangle, Proangle Flex, Proangle B, Prodecor DJ, Prodecor DJ Flex, Prodecor, Prostyle, Projoint U, Projoint, Projoint T, Projoint R, Projoint M, Proclassic R, and Proclassic F.'
              },
              {
                title: 'Profiles for Floors of Different Heights',
                content: 'When floor finishes have a height difference, you need a sloped or compensating profile to bridge the gap safely. Product options include: Pronivel N, Pronivel P, Pronivel L, Pronivel PB, Pronivel Flex, Pronivel Wood, Pronivel M, Prolevel High, Prolevel Medium, Prolevel Thin, and Prolock.'
              },
              {
                title: 'Cleaner Detailing at Doorways',
                content: 'Doorway and threshold transitions are the most visible floor joints in any space. Profilpas profiles help you avoid "unfinished" edges and reduce call-backs for cracked corners or loose edges. The right profile makes the difference between a professional finish and a problem area.'
              },
              {
                title: 'Better Coordination Across Materials',
                content: 'Modern projects often combine multiple floor finishes: tile to parquet, tile to LVT, carpet to tile, and stone transitions. Profilpas profiles help you manage these transitions without awkward steps or unsightly gaps, creating a seamless flow between spaces.'
              },
              {
                title: 'Practical Selection Support',
                content: 'You tell us the floor build-up and finish, we recommend the suitable profile type, height, and finish. Our team helps you avoid common specification mistakes and ensures the profile you order actually fits your site conditions.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Equal-height transition example (tile to parquet) - show a flush join in a doorway', alt: 'Profilpas profile for floors of equal height tile to parquet transition' },
            { description: 'Different-height transition example (tile to existing floor) - show a sloped, step-free join', alt: 'Profilpas profile for different height floors smooth transition' },
            { description: 'Close-up of T shape profile detail - show clean line and edge cover', alt: 'T shape profile floor transition detail' },
            { description: 'LVT threshold transition - show LVT meeting tile without gaps', alt: 'Threshold profiles for LVT and tile transition' },
            { description: 'Carpet to tile edge protection - show higher edge protected and tidy', alt: 'Floor profiles protecting carpet edge at tile transition' },
            { description: 'Finish options grid - brushed, polished, anodised looks', alt: 'Floor profiles finishes aluminium and stainless steel options' },
            { description: 'Installation context shot - installer fitting profile during floor laying', alt: 'Floor profiles installation during tiling and flooring work' },
            { description: 'High-traffic commercial corridor transition - show durable join line', alt: 'Floor profiles for high traffic areas transition protection' }
          ]
        }
      },
      {
        slug: 'movement-and-stairnosing',
        name: 'Movement and Stairnosing',
        description: 'Movement joints and stair nosing profiles for expansion control and safety.',
        metaDescription: 'Profilpas movement joints and stair nosing profiles for tiles, screed, ramps and stairs. UAE supply, technical support, and fast quotations from Lapiz Blue.',
        images: ['/images/brands/profilpas/product-lines/movementandstairnosing.webp'],
        content: {
          seoTitle: 'Profilpas Movement Joints & Stair Nosing UAE | Lapiz Blue',
          h1: 'Safer stairs and longer-lasting floors with Profilpas joints and nosings',
          intro: 'Cracked tiles near doorways, noisy joints, chipped stair edges and slippery steps usually come down to one thing - the detail work was skipped. Profilpas movement joints and stair nosing profiles are built for exactly these high-stress zones. Movement joints (also called expansion joints) absorb thermal and structural movement so finishes stay intact. Stair nosing profiles protect the step edge, improve grip, and deliver a cleaner finish between tread and riser. At Lapiz Blue, we help you choose the right joint cover or stair edge profile based on traffic, substrate, and finish - so your project looks sharp and holds up.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Movement joints: Large-format tile areas - malls, lobbies, corridors, and long runs where movement causes cracking',
              'Movement joints: Screed floors - to manage shrinkage, thermal swing, and substrate movement before it reflects on the finish',
              'Movement joints: Warehouses and service areas - where wheel loads and vibration stress the floor',
              'Movement joints: Car parks and ramps - where temperature change and traffic demand tougher joint detailing',
              'Stair nosing: Tiled stairs in residential and commercial projects',
              'Stair nosing: Public spaces where slip resistance and edge visibility matter',
              'Stair nosing: Renovations on worn stair edges - profiles that protect and tidy up imperfect edges',
              'Stair nosing: Wood and laminate stairs - where clean transitions and strong edge protection are needed'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Option',
            bullets: [
              'For movement joints - start with movement type: thermal expansion, substrate movement, or both',
              'Confirm joint location: perimeter, intermediate bays, transitions, or structural joints',
              'Choose by traffic: pedestrian vs wheeled loads changes the profile type you should use',
              'Check joint width and depth: select the right size so the insert can actually work',
              'For stair nosing - identify the finish: tile, porcelain, wood, laminate, or vinyl affects the profile design',
              'Prioritise grip: choose a non-slip or high-traction option for public steps and wet-adjacent zones',
              'Consider edge style: square edge vs bullnose look, and how it fits your design intent',
              'Colour and contrast: for public areas, a visible step edge can reduce accidents'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Installing tiles without planning movement joints, leading to cracking along long runs',
              'Using pedestrian-grade joints in areas with trolleys, pallet jacks, or service loads',
              'Choosing stair nosing based only on looks without considering slip resistance for the environment',
              'Not matching joint width to the actual gap - undersized profiles fail under movement',
              'Skipping end caps and corners on stair nosing, leaving exposed metal or unfinished edges',
              'Installing profiles on unsound substrate without proper preparation in renovation projects'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Coverage', value: 'UAE-wide delivery with GCC export support' },
              { label: 'Branch Support', value: 'Pickup and support from stores in Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Documentation', value: 'Datasheets, profile drawings, and finish references available on request' },
              { label: 'Technical Guidance', value: 'Help with joint placement logic, selection by traffic, and install do\'s and don\'ts' },
              { label: 'Quotation Support', value: 'Send drawings or a quick site sketch and we\'ll recommend suitable options with lead times' }
            ]
          },
          faqs: [
            {
              question: 'What are movement joints in floor tiles?',
              answer: 'Movement joints are planned gaps that allow tile finishes to expand and contract without cracking or debonding.'
            },
            {
              question: 'Are movement joints the same as expansion joints?',
              answer: 'Most people use both terms interchangeably. Practically, both refer to joints designed to absorb movement and protect finishes.'
            },
            {
              question: 'Do I need movement joints in screed floors too?',
              answer: 'Yes. Screed can shrink and move, and without joints that movement can show up as cracks that mirror into the final flooring.'
            },
            {
              question: 'Which movement joint is best for areas with wheel traffic?',
              answer: 'It depends on load and frequency. Share the traffic type (trolleys, pallet jacks, forklifts) and we\'ll recommend a profile designed for that duty.'
            },
            {
              question: 'What is a stair nosing profile used for?',
              answer: 'A stair nosing profile protects the step edge, improves safety with better grip, and gives a neat finish between the tread and riser.'
            },
            {
              question: 'Can stair nosing be installed on existing stairs?',
              answer: 'Often yes. Many stair edge profile solutions are suitable for renovation when the substrate is sound and properly prepared.'
            },
            {
              question: 'Do you have stair nosing profiles for laminate flooring?',
              answer: 'Yes - we can recommend a compatible stair nosing profile for laminate flooring based on thickness and edge detail.'
            },
            {
              question: 'How do I request the right joint cover or stair profile quickly?',
              answer: 'Send us the floor finish type, thickness, joint width, location, and a photo or drawing. We\'ll shortlist options and quote.'
            }
          ],
          cta: {
            title: 'Need help picking the right movement joint or stair nosing profile?',
            subtitle: 'Message us on WhatsApp with a photo, finish type, and measurements (joint width, tile thickness, stair edge detail). Or email our sales team with your drawing or BOQ and we\'ll reply with recommended options, availability, and pricing.',
            checklist: [
              'Floor finish type (tile, screed, wood, laminate)',
              'Tile or flooring thickness',
              'Joint width (for movement joints)',
              'Location (corridor, doorway, staircase, warehouse)',
              'Traffic type (pedestrian, trolleys, forklifts)',
              'Photo or drawing of the area',
              'Quantity required (linear meters)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'One Coordinated System',
                content: 'Profilpas offers movement joints, joint covers, stair nosing profiles, and accessories that work together on real sites. This means you can specify from one supplier and maintain consistency across movement joints and stair protection throughout the project.'
              },
              {
                title: 'Movement Joints and Joint Covers',
                content: 'The movement joint range includes: Projoint DIL NE, NJ, NL, NF, NAN, NPAN, NIN, NIL, NZA, NZS, NZS/A/40, NZS/L/, NTA, NTI, NTO, STA, STI, plus Procover Flex, Procover Fix, and Procover. Each is designed for specific joint widths, traffic loads, and substrate conditions.'
              },
              {
                title: 'Stair Nosing and Safety Solutions',
                content: 'The stair nosing range includes: Prostep SGA-SGI-SGN-SGK, Prostep SMA-SM, Protrim, Prostep SNG-SN, Prostep SAR-SIR, Prostep SIS, Prostep SIX, Prostep Wood, Prostep SP, Prostep SA-SB, Prostep Flex, plus the Protect series (111-75, 73-74-58, 87-370-373, 70-71, 130, 76-110, 124, 80, 72, 79-125, 78, 126, 150-151-152-154, 155, 156), Safety-Step, and Prostair.'
              },
              {
                title: 'Built for Traffic',
                content: 'Profilpas profiles are designed for real-world conditions - from pedestrian corridors to areas that see trolleys, pallet jacks, and service loads. The right profile choice means fewer callbacks and longer-lasting installations.'
              },
              {
                title: 'Cleaner Finishes',
                content: 'Movement joints and stair nosing profiles hide cut edges, protect vulnerable corners, and keep transitions looking intentional. The result is a professional finish that clients notice and appreciate.'
              },
              {
                title: 'Practical Selection Support',
                content: 'We\'ll map your joint width, movement expectation, and finish type before you order. Stock flexibility means fast-moving items are usually available, and specialty profiles can be arranged on project order.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Movement joint installed in large-format tiles - show a clean straight joint line', alt: 'Profilpas movement joints in floor tiles for expansion control' },
            { description: 'Expansion joint cross-section diagram - show insert and profile body', alt: 'Floor tile expansion joint profile cross section' },
            { description: 'Heavy-traffic joint in warehouse corridor - show wheeled load suitability', alt: 'Joint cover profile for wheeled traffic areas' },
            { description: 'Stair nosing on tiled steps - close-up of edge protection', alt: 'Stair nosing profile for tiled steps with edge protection' },
            { description: 'Non-slip stair profile detail - show grip surface', alt: 'Non-slip stair edge profile for public stairs' },
            { description: 'Bullnose style stair profile example - show rounded finish', alt: 'Bullnose stair nosing profile finish detail' },
            { description: 'Stair nosing for wood or laminate - show clean transition', alt: 'Stair nosing profile for laminate flooring transition detail' },
            { description: 'Accessory kit shot - end caps and corners laid out', alt: 'Stair nosing profile accessories end caps corners' },
            { description: 'Before-after staircase retrofit - chipped edge vs protected edge', alt: 'Stair edge protection retrofit using Profilpas profiles' }
          ]
        }
      },
      {
        slug: 'balcony-and-terrace-profiles',
        name: 'Balcony and Terrace Profiles',
        description: 'Weather-resistant profiles for outdoor applications on balconies and terraces.',
        metaDescription: 'Profilpas Protec balcony and terrace profiles for clean edges and rainwater control. UAE-wide supply with Dubai, Abu Dhabi, Sharjah branches.',
        images: ['/images/brands/profilpas/product-lines/balconyandterraceprofiles.webp'],
        content: {
          seoTitle: 'Profilpas Balcony & Terrace Profiles UAE | Lapiz Blue',
          h1: 'Profilpas Balcony and Terrace Profiles that Protect Edges and Guide Water Away',
          intro: 'Outdoor tiles and stone look great until the edge starts chipping, staining, or holding water. Profilpas balcony and terrace profiles are built to protect exposed borders, create a crisp finish, and help manage rainwater run-off at the perimeter. At Lapiz Blue, we supply the Profilpas Protec range for balconies, terraces, podiums, and external walkways, with guidance on profile shape, finish, and compatibility with your build-up and tile thickness. If you share your edge detail or drawing, we\'ll help you pick a clean, long-lasting solution that fits the site conditions.',
          applications: {
            title: 'Applications & Best-Fit Scenarios',
            items: [
              'Balcony edges where tile corners chip from foot traffic and moving furniture',
              'Terrace perimeters that need a clean border and controlled drip line',
              'Podium decks and external corridors where water must not creep back under the finish',
              'Renovations where you want a sharper edge without redoing the whole surface build-up',
              'Outdoor steps and landings where edge protection improves durability and finish quality',
              'Areas with frequent wash-down or exposure to rain and wind-driven dust'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Balcony or Terrace Profile',
            bullets: [
              'Start with the build-up: tile thickness, adhesive bed, and whether you need the profile to sit flush or create a visible drip edge',
              'Decide the water behaviour you want: "guide water away" edges vs simple border protection',
              'Choose material based on exposure: stainless steel for higher corrosion resistance, aluminium when you want more finish choices',
              'Check the edge condition: straight edge, rounded, or a detail that needs a specific section shape (helps avoid awkward cuts)',
              'Consider traffic and impact: balconies and shared terraces need stronger edge protection than light-use patios',
              'Plan your corners and terminations early: inside and outside corners look best when accessories and cuts are planned, not improvised',
              'If waterproofing is part of the assembly, ensure the edge detail supports the full terrace system approach (not a "profile-only" fix)'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Choosing a profile purely by looks and ignoring tile thickness and build-up',
              'Skipping the drip edge requirement on exposed terraces and then fighting water marks later',
              'Leaving corners and terminations to "site fixing" instead of planning accessories and cuts',
              'Mixing finishes across edges and transitions, making the job look patched',
              'Treating the profile as waterproofing instead of part of a complete terrace edge solution'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'Stocked mix of fast-moving items plus project order options for specific finishes and sizes' },
              { label: 'Branch Support', value: 'Dubai, Abu Dhabi, Sharjah shops for quick pickup, samples, and profile matching' },
              { label: 'Coverage', value: 'UAE-wide supply, plus GCC export support for bulk and project shipments' },
              { label: 'Documentation', value: 'Spec sheets, product references, and selection guidance for consultants and site teams' },
              { label: 'Quotations', value: 'BOQ and quantity-based quotes for contractors, retailers, and project procurement' },
              { label: 'Technical Guidance', value: 'Help choosing the right profile based on tile thickness, perimeter detail, drainage intent, and site exposure' }
            ]
          },
          faqs: [
            {
              question: 'What do balcony and terrace edge profiles actually do?',
              answer: 'They protect exposed edges from chipping and weathering, give a clean finish line, and help manage water run-off at the perimeter.'
            },
            {
              question: 'Do these profiles replace waterproofing?',
              answer: 'No. They support a better edge detail, but waterproofing should be designed and installed as a system.'
            },
            {
              question: 'Which is better: aluminium or stainless steel?',
              answer: 'Stainless steel is often preferred for tougher exposure and corrosion resistance. Aluminium gives more finish variety and is widely used when specified correctly.'
            },
            {
              question: 'How do I pick the correct profile size?',
              answer: 'Share your tile thickness and edge build-up (tile + adhesive). The right section depends on whether you need a flush edge or a drip edge.'
            },
            {
              question: 'Can I use balcony profiles with porcelain, stone, and outdoor slabs?',
              answer: 'Yes, but selection depends on thickness and the edge detail. Thicker finishes usually need profiles designed for that build-up.'
            },
            {
              question: 'Are these only for new builds, or can they be used in renovations?',
              answer: 'Both. Many projects use them to upgrade the edge finish during terrace refurbishment or re-tiling.'
            },
            {
              question: 'Do you supply across the UAE or only in one city?',
              answer: 'We supply UAE-wide, with branches in Dubai, Abu Dhabi, and Sharjah for support and pickup.'
            },
            {
              question: 'What should I send to get the right recommendation fast?',
              answer: 'Tile thickness, edge detail photo, approximate linear meters, and your preferred finish.'
            }
          ],
          cta: {
            title: 'Want the cleanest edge detail for your balcony or terrace?',
            subtitle: 'WhatsApp us your tile thickness, edge photo, and running meters, and we\'ll recommend the right Profilpas Protec option. Prefer email? Send your drawing or BOQ, and we\'ll reply with a quotation and availability for UAE-wide supply and GCC export.',
            checklist: [
              'Project location (UAE or GCC) and timeline',
              'Area type: balcony, terrace, podium, external corridor, steps',
              'Tile type and thickness (mm)',
              'Edge detail: flush, drip edge, or special border requirement',
              'Total running meters (approx) and number of corners',
              'Preferred material and finish (or "match tile tone")',
              'Photos or a simple drawing of the perimeter edge'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Profiles for Balconies and Terraces',
                content: 'Edging profiles for balconies and terraces by Profilpas guarantee excellent protection from the elements and embellish the outdoor space by framing the distinctive architectural features. The Protec range offers a wide range of products in various shapes, sizes and materials. There are many different edging profiles to protect the outer edges of terraces and balconies effectively and elegantly.'
              },
              {
                title: 'The Protec Range',
                content: 'The availability of different shapes and sections further extends the choice available to customers. The purpose of these elements is to carry away rainwater and help protect the underlying surfaces. The product range includes: Protec CPCV-CPCI, Protec CPCV/30/, Protec CPGVD/30, Protec CPNV, Protec CPGV, Protec CPQV, Protec CPEV-CPEI, Protec CPHA, and Protec CPLV.'
              },
              {
                title: 'Material Options',
                content: 'As regards the composition, the profiles come in aluminium and stainless steel. The aluminium versions are also available in a variety of different finishes, to bring a touch of elegance and originality to balconies and terraces. Stainless steel is often preferred for tougher exposure and corrosion resistance in coastal areas.'
              },
              {
                title: 'Outdoor-First Focus',
                content: 'These profiles are designed with outdoor conditions in mind - edging that supports perimeter finishing and water run-off control, not just decoration. The right profile choice protects your investment and reduces long-term maintenance issues from water damage and edge deterioration.'
              },
              {
                title: 'Practical Selection Support',
                content: 'Lapiz Blue provides practical selection help: matching the profile to tile thickness, build-up, and edge detail (flush vs drip). We also offer finish guidance for coastal and high-exposure areas, helping you choose between aluminium and stainless steel options based on your specific site conditions.'
              },
              {
                title: 'Complete System Approach',
                content: 'One place for profiles plus coordination with the rest of your tile edge and floor transition profiles, so details stay consistent across the project. We can help coordinate balcony profiles with your indoor flooring profiles for a cohesive finish throughout.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Balcony edge profile installed close-up - finished terrace edge showing drip line', alt: 'Profilpas balcony edge profile finishing outdoor tile perimeter' },
            { description: 'Terrace corner detail - inside and outside corners aligned cleanly', alt: 'Terrace corner finishing with Profilpas Protec profile' },
            { description: 'Water run-off illustration - simple diagram showing how the edge guides water away', alt: 'Terrace profile detail for rainwater run-off control' },
            { description: 'Material comparison - aluminium vs stainless steel finish swatches', alt: 'Aluminium and stainless steel balcony terrace profile finishes' },
            { description: 'Before and after terrace edge - chipped edge vs protected edge', alt: 'Before and after using terrace edging profile' },
            { description: 'On-site application photo - contractor setting the profile during tiling', alt: 'Installation of Profilpas terrace edging profile during outdoor tiling' },
            { description: 'Branch stock display - profiles on racks (showroom)', alt: 'Profilpas profiles available at Lapiz Blue branches' },
            { description: 'Protec range lineup graphic - grouped product family visual with labels', alt: 'Profilpas Protec range for balconies and terraces' }
          ]
        }
      },
      {
        slug: 'wooden-laminate-and-lvt-floor-profiles',
        name: 'Wooden Laminate and LVT Floor Profiles',
        description: 'Specialized profiles for laminate and LVT flooring transitions and finishing.',
        metaDescription: 'Profilpas LVT profiles UAE - Laminate and LVT floor transition profiles for residential and commercial UAE projects.',
        images: ['/images/brands/profilpas/product-lines/woodenlaminateandlvtfloorprofiles.webp'],
        content: {
          seoTitle: 'Profilpas Laminate & LVT Floor Profiles UAE | Lapiz Blue',
          h1: 'Clean transitions for laminate and LVT floors, done properly',
          intro: 'Laminate and LVT floors look great once down—but their edges, T-joints and room transitions need a proper finish. Profilpas profiles protect exposed board edges, hide gaps at doorways, and handle height changes between flooring types. For UAE apartments, retail fit-outs and hospitality spaces, that means faster installs with less call-backs for lifted flooring or ugly gaps. Whether you\'re finishing a single-room renovation or rolling out the same floor spec across an entire building, these profiles help the job go right the first time.',
          applications: {
            title: 'When do you need laminate and LVT profiles?',
            items: [
              'Room-to-room transitions (doorways, thresholds, corridors)',
              'Height changes between LVT and tile or carpet',
              'Edges at walls, glass partitions and sliding-door tracks',
              'T-joints where two laminate runs meet at a corridor or open plan area',
              'Stair nosing for laminate-clad steps',
              'Perimeter gaps around columns, built-ins and kitchen islands'
            ]
          },
          howToChoose: {
            title: 'What to check before ordering',
            bullets: [
              'Floor thickness: laminate is usually 7–12 mm, LVT is usually 2–5 mm—profile slot must match.',
              'Transition type: ramp (height change), T-bar (same-height join) or end-cap (edge finish).',
              'Movement allowance: floating floors expand—use profiles that let the floor slide, not lock.',
              'Traffic level: heavy-footfall areas need aluminium or robust PVC, not thin cosmetic strips.',
              'Colour match or contrast: wood-look anodised aluminium for continuity, or metal accent for modern looks.',
              'Fixing method: adhesive base, screw-down or clip-in—depends on subfloor and access requirements.'
            ]
          },
          commonMistakes: {
            title: 'Problems we help you avoid',
            bullets: [
              'Using tile trims on floating floors: laminate and LVT need room to move—rigid tile trims can jam the floor and cause buckling. Use profiles with built-in expansion gaps.',
              'Mismatched heights: wrong ramp profile leaves a trip hazard or a visible gap. Measure both floor surfaces before choosing.',
              'Skipping perimeter profiles: exposed laminate edges at walls or under glass partitions swell when exposed to moisture. Close them off properly.',
              'Wrong adhesive: some profiles stick down, others clip in. Using heavy adhesive on a click-in profile can make future repairs impossible.',
              'Colour after-thought: "any silver" doesn\'t always match your floor. Check our range of wood-look aluminium finishes before settling.'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'System Compatibility', value: 'Profilpas profiles integrate with most laminate and LVT brands without modification—tested across common UAE project specs.' },
              { label: 'Local Stock', value: 'Common sizes and finishes kept at our Dubai, Abu Dhabi and Sharjah branches—same-day collection or next-day delivery.' },
              { label: 'Expansion-Ready', value: 'Profiles designed for floating floors allow natural movement, so your floor stays flat through seasonal temperature swings.' }
            ]
          },
          faqs: [
            {
              question: 'Can I use the same profile for laminate and LVT?',
              answer: 'Sometimes—but check the slot depth. Laminate is usually thicker than LVT, so you may need different sizes or adjustable profiles. Ask us for the right match.'
            },
            {
              question: 'What if my laminate meets tile at a doorway?',
              answer: 'Use a ramp or reducer profile. The tile side sits lower or higher; the profile bridges the gap and lets the laminate expand without jamming.'
            },
            {
              question: 'Do I need special profiles for underfloor heating?',
              answer: 'Floating floors over UFH move more than usual. Choose clip-in or expansion-gap profiles, not glued-down types. We can advise per case.'
            },
            {
              question: 'How do I finish LVT at a glass partition?',
              answer: 'Use a neat end-cap profile that covers the raw edge and accommodates the floor\'s movement. We stock slim options that look cleaner than silicone.'
            },
            {
              question: 'Are there matching stair nosings?',
              answer: 'Yes—Profilpas has dedicated laminate stair nosings. We stock popular finishes; others available on order.'
            },
            {
              question: 'What finishes are available?',
              answer: 'Anodised aluminium in natural, champagne, bronze and black; wood-look aluminium; and matching PVC for budget-friendly jobs. Bring a floor sample to compare.'
            }
          ],
          cta: {
            title: 'Getting your laminate and LVT transitions right',
            subtitle: 'Before you order, check these off:',
            checklist: [
              'Floor thickness (laminate vs LVT)',
              'Type of transition (T-bar, ramp, end-cap)',
              'Colour match or accent preference',
              'Fixing method (adhesive, clip, screw-down)',
              'Quantity per doorway or edge length'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Wooden Laminate Profiles',
                content: 'Laminate flooring needs room to move. Unlike tile, it expands and contracts with temperature and humidity—so every doorway, wall edge and stair step needs a profile that accommodates that movement without looking unfinished. Profilpas wooden laminate profiles are engineered for floating floor installations. They sit over or alongside the laminate, holding it in place visually while leaving the gap the floor needs to breathe. Whether you\'re capping an edge at a sliding door, bridging a height difference to tile, or finishing a staircase in matching laminate, there\'s a profile designed for that exact job. In UAE residential and hospitality projects, laminate is a popular choice for its warmth and cost efficiency. The right profiles make it look intentional—not improvised. We stock common sizes in wood-look aluminium and neutral metallic finishes, and can order special colours or lengths for larger fit-outs.'
              },
              {
                title: 'LVT Profiles',
                content: 'Luxury Vinyl Tile (LVT) is thinner and more flexible than laminate, which changes how you finish edges and joints. The wrong profile can look clunky or fail to hold the edge down properly. Profilpas LVT profiles are slim, precise and designed for modern click-lock or glue-down LVT systems. They handle doorway transitions, perimeter edges, and height changes to tile or carpet—common in UAE retail, office and apartment projects. Because LVT is often used in wet-adjacent areas (kitchens, bathrooms, lobby entrances), we also carry profiles with moisture-resistant bases. These keep water from seeping under the floor edge, which is where most LVT failures start. Our team can help you match profiles to your specific LVT brand and thickness. Bring a sample or share your spec—we\'ll confirm what fits.'
              },
              {
                title: 'Wooden Laminate Profile Range',
                content: 'Our wooden laminate profile range includes: Prowood, Prostyle, Prostyle Fix, Prostyle Tech, Proslider, Proclassic, Probasic, Wood Line End Caps and Reducer, Prostair Wood, Proskirting, Alukap / Alustep, and Multiclip.'
              },
              {
                title: 'LVT Profile Range',
                content: 'Our LVT profile range includes: Zero Vinyl and Design profiles, Proangle Q Quart, Prolist, Prolistel, Projolly Quart, Proslider LVT, Ramp profiles LVT, T-junction profiles LVT, Prosmart LVT, Prostair LVT, Prointer LVT, Terminox LVT, Proskirting LVT, Profloor LVT, LVT accessories, Decotop, Multicurve, Prolux Line LVT, Metal Line LVT, Proplak LVT, and Projolly Aluminum Square LVT.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Laminate T-bar profile at doorway - shows clean join between two laminate floors', alt: 'Profilpas laminate T-bar transition profile at UAE apartment doorway' },
            { description: 'LVT to tile ramp profile - close-up of height transition between LVT and ceramic', alt: 'LVT floor reducer profile bridging to tile in Dubai retail space' },
            { description: 'End-cap profile at glass partition - laminate edge cleanly finished against glass', alt: 'Profilpas laminate end-cap profile at glass wall partition' },
            { description: 'Wood-look aluminium finish swatches - 4–5 finish options laid out', alt: 'Profilpas wood-look aluminium profile finishes for laminate floors' },
            { description: 'Stair nosing on laminate steps - full tread view showing installed nosing', alt: 'Laminate stair nosing profile installed on residential stairs' },
            { description: 'LVT perimeter edge at kitchen island - profile closing the gap around fixed furniture', alt: 'LVT floor perimeter profile around kitchen island base' },
            { description: 'Clip-in system diagram - simple visual showing how the base clips into the top', alt: 'Profilpas clip-in profile system for floating floors' },
            { description: 'On-site installation photo - contractor fitting a T-bar at doorway threshold', alt: 'Installer fitting Profilpas laminate transition profile on site' }
          ]
        }
      },
      {
        slug: 'skirting-boards',
        name: 'Skirting Boards',
        description: 'Modern skirting board systems in various materials and finishes.',
        metaDescription: 'Profilpas skirting boards in Metal Line and PVC Line. Clean finishes, durable protection, easy selection help. UAE-wide supply by Lapiz Blue.',
        images: ['/images/brands/profilpas/product-lines/skirtingboard.webp'],
        content: {
          seoTitle: 'Profilpas Skirting Boards UAE | Metal Line and PVC Line',
          h1: 'Profilpas Skirting Boards that finish spaces cleanly and last',
          intro: 'Skirting boards do more than "cover the gap" - they protect walls, tidy up floor edges, and make the whole room feel finished. Lapiz Blue supplies Profilpas skirting boards in two practical ranges: Metal Line for a sharp, architectural look, and PVC Line for high-impact, easy-maintenance projects. Whether you\'re fitting out a villa, retail space, office, hotel corridor, or a back-of-house area, we help you pick the right height, finish, and fixing method so it looks intentional and stays secure. Stock is supported from our Dubai, Abu Dhabi and Sharjah branches with UAE-wide and GCC supply.',
          whySection: {
            title: 'Why Profilpas Skirting Boards from Lapiz Blue?',
            bullets: [
              'Two clear choices - Metal Line when you want premium, crisp lines, PVC Line when you want shock resistance and fast install',
              'Better project outcomes - correct height and edge detailing reduces wall scuffs, cleaning marks, and premature repainting',
              'Finish control - multiple finishes and profiles so you can match tiles, wood, laminate, or LVT without "almost matching"',
              'Practical installation support - we guide on adhesive vs mechanical fixing, wall condition, corners, and end caps',
              'Commercial-ready durability - options suitable for high-traffic corridors and fit-outs where skirting takes daily hits',
              'Reliable availability - mix of in-stock and project-order items depending on profile and finish',
              'Documentation-ready - product selections supported with brand literature and clear quotations when you share project specs'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Hotels and offices - clean perimeter detailing, premium finishes, consistent height across long corridors',
              'Retail and malls - scuff protection in high footfall zones',
              'Homes and villas - tidy transitions between flooring and painted walls',
              'Kitchens, bathrooms, utility areas - moisture-prone zones where easy cleaning matters',
              'Fit-outs and renovations - quick upgrades that hide edge imperfections without redoing walls',
              'Warehouses and back-of-house - impact resistance and easy maintenance for service areas'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Option',
            bullets: [
              'Start with the space - hospitality and front-of-house often suit Metal Line, while service areas and schools often suit PVC for impact resistance',
              'Pick height based on wall exposure - higher skirting for corridors and trolleys, lower skirting for minimal interiors',
              'Match your floor build-up - tile, wood, laminate, and LVT all have different edge finishing needs',
              'Decide on fixing method - adhesive for clean walls, mechanical fixing where walls are uneven or high-impact',
              'Plan corners and terminations early - internal corners, external corners, end caps, and joins make or break the finish',
              'Think maintenance - kitchens and wet areas benefit from easy-clean surfaces and moisture-friendly materials',
              'If you need custom looks - PVC Line options can be customised with film finishes (PDS technology on selected models)',
              'Avoid "random finishing" - keep skirting finish consistent with door frames, thresholds, and transition profiles for a premium look'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Choosing skirting height after painting and flooring are complete',
              'Skipping corners and end caps, then "patching" joints on site',
              'Using the wrong adhesive for the wall condition or wet areas',
              'Mixing finishes across rooms without a consistent plan',
              'Not accounting for expansion gaps on floating floors'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'Fast-moving skirting profiles are typically available, with special finishes available on project order' },
              { label: 'Coverage', value: 'UAE-wide supply, plus GCC export support for project shipments' },
              { label: 'Branch Support', value: 'Stocked and supported from Dubai, Abu Dhabi and Sharjah' },
              { label: 'Documentation', value: 'Product selection guidance with manufacturer references and clear quotations' },
              { label: 'Technical Help', value: 'Advice on substrate prep, adhesives, corner accessories, and best-fit profile selection' },
              { label: 'Quotations', value: 'BOQ-friendly quotes when you share area, height, finish, and fixing preference' }
            ]
          },
          faqs: [
            {
              question: 'What\'s the difference between Metal Line and PVC Line skirting boards?',
              answer: 'Metal Line focuses on crisp architectural finishes (aluminium and metal aesthetics). PVC Line focuses on impact resistance, easy upkeep, and fast installation.'
            },
            {
              question: 'Are PVC skirting boards suitable for LVT and tiles?',
              answer: 'Yes - selected PVC Line profiles are suitable for ceramic tile floors and LVT floors.'
            },
            {
              question: 'Which skirting is better for high-traffic commercial corridors?',
              answer: 'Choose based on abuse level: Metal Line for premium look with strong protection, PVC Line for frequent impacts and quicker replacements in maintenance-heavy areas.'
            },
            {
              question: 'Can skirting boards help hide small edge imperfections near walls?',
              answer: 'Yes - a properly sized skirting line can cover minor cutting or perimeter finishing issues, improving the final look without rework.'
            },
            {
              question: 'Do you help choose the right height and finish?',
              answer: 'Yes - share floor type, wall finish, room use, and preferred look, and we\'ll recommend options that fit the space and budget.'
            },
            {
              question: 'Do you stock accessories like corners and end caps?',
              answer: 'For most commonly used profiles, yes. For specialised accessories, we can arrange based on profile selection.'
            },
            {
              question: 'Do competitor-style "cable channel" skirtings matter?',
              answer: 'Cable-management skirting exists in the market (some ranges include inspectable cable channels and even integrated LED concepts). If you need cable concealment, tell us upfront so we can guide you to the closest suitable Profilpas approach for your design intent.'
            },
            {
              question: 'Can PVC Line be customised in appearance?',
              answer: 'Selected PVC Line models can be personalised with film finishes (PDS technology), allowing pattern or decoration to be reproduced.'
            }
          ],
          cta: {
            title: 'Want the right Profilpas skirting in one go?',
            subtitle: 'Message us on WhatsApp with: site name, skirting height, floor type (tile, wood, laminate, LVT), and finish preference. Prefer email? Send your BOQ or drawings and we\'ll reply with options, availability, and a clean quotation.',
            checklist: [
              'Floor type: tile, wood, laminate, LVT',
              'Area type: residential, retail, office, hospitality, back-of-house',
              'Skirting height preference (or photos of reference)',
              'Finish preference (aluminium look, stainless look, colour, wood-effect film)',
              'Fixing method preference: adhesive or mechanical fixing',
              'Total running meters (or drawings/BOQ)',
              'Delivery location and timeline'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Metal Line Skirting Boards',
                content: 'Metal skirting boards are protective and decorative elements installed along the base of interior walls. They safeguard walls from damage while providing a sleek, contemporary finish that enhances the overall aesthetic of a space. Steel and aluminium are highly sought-after materials in the world of interior design, known for their elegance, durability, and ability to reflect light. Profilpas offers the Metal Line range of metal skirting boards, designed to embody these qualities while providing versatility and modern design.'
              },
              {
                title: 'Metal Line Features and Benefits',
                content: 'These metal skirting products are more than just functional—they protect walls and surfaces while adding a sophisticated touch to any space. Available in a wide range of finishes, Metal Line skirting boards cater to various requirements, from small rooms to expansive public areas. The extensive selection allows you to create custom profiles that seamlessly blend with any architectural or interior style, enhancing the overall aesthetic.'
              },
              {
                title: 'Metal Line Applications',
                content: 'Metal Line skirting boards are an excellent choice for adding durability and modern aesthetics to interiors, particularly for contemporary designs. The aluminium skirting profile is designed to seamlessly blend with various flooring types, including tile, wood, and laminate. Available in different finishes, these profiles enhance the overall design of the room while ensuring that walls are protected from impacts, moisture, and dirt. The flat aluminium skirting option is particularly popular for its minimalistic and modern appeal, providing a streamlined look that complements clean architectural lines.'
              },
              {
                title: 'Metal Line for Kitchens',
                content: 'In kitchens, the aluminium kitchen skirting is a practical solution for protecting the lower portion of kitchen walls, where moisture and dirt tend to accumulate. This type of skirting is easy to clean and provides long-term resistance to corrosion and other damage, ensuring that kitchens maintain their functionality and cleanliness over time.'
              },
              {
                title: 'Metal Line Product Range',
                content: 'The Metal Line range includes: Metal Line 90, Metal Line 790, Metal Line 89, Metal Line 89/613, Metal Line 105, Metal Line 87/6-88/6, Metal Line AF - M Design, Metal Line 100, Metal Line 101, Metal Line 92, Metal Line 93, Metal Line 95, Metal Line 98, and Metal Line 97.'
              },
              {
                title: 'PVC Line Skirting Boards',
                content: 'The PVC Line range of skirting boards by Profilpas was designed to meet any requirement: using a material like polyvinyl chloride, with a high resistance to shocks, means products protect walls and surfaces more efficiently. The availability of a range of different colours also brings to life a selection of original colour combinations.'
              },
              {
                title: 'PVC Line Features and Installation',
                content: 'One of the distinctive features of the PVC Line is the speed and ease of application: this characteristic makes the skirting boards particularly suited to both the professional and home improvement worlds. The offering is also wide and varied: some models can be personalised with PDS technology, allowing any pattern or decoration to be reproduced on film. The presence of multiple forms and sizes means the skirting boards will adapt perfectly to any type of floor.'
              },
              {
                title: 'PVC Line Flexibility and Applications',
                content: 'The PVC flexible skirting board option from Profilpas stands out due to its adaptability, making it a perfect choice for spaces with curved or irregular surfaces. Its flexibility allows for easy installation in areas where traditional rigid skirting boards would be difficult to apply. This feature makes it ideal for complex spaces, ensuring a clean and professional finish regardless of the room\'s shape. Available in various colors and finishes, Profilpas flexible skirting boards are designed to complement any flooring type, from tiles to laminate, providing both functionality and style.'
              },
              {
                title: 'PVC Line Practical Advantages',
                content: 'PVC skirting boards offer practical advantages, such as moisture resistance and easy maintenance, making them a popular choice for areas prone to spills or humidity, like kitchens, bathrooms, and utility rooms. These skirting boards protect walls from impacts, dirt, and water, ensuring longevity and a neat appearance over time. Profilpas PVC skirting boards are lightweight yet durable, and their smooth surfaces make them easy to clean, maintaining their appearance with minimal effort.'
              },
              {
                title: 'PVC Line Product Range',
                content: 'The PVC Line range includes: PVC Line 8605-8606, PVC Line 8615-8616, PVC Line 8608, PVC Line 8612, PVC Line 8613, PVC Line 8614, PVC Line 8600, PVC Line 8181, PVC Line 8596-8598, PVC Line 8602, PVC Line 8603, PVC Line 8607, PVC Line 148, and PVC Line 170-169-171.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Metal Line installed in modern lobby - aluminium skirting on polished floor, tight corners', alt: 'Profilpas Metal Line skirting board installed in commercial lobby' },
            { description: 'PVC Line installed in service corridor - scuff-resistant look, easy-clean finish', alt: 'Profilpas PVC skirting board for high-traffic corridor' },
            { description: 'Finish swatch grid - multiple Metal Line finishes and heights', alt: 'Profilpas Metal Line skirting finishes and size options' },
            { description: 'PVC Line close-up of edge and wall contact - show neat seal and easy wipe surface', alt: 'PVC skirting profile detail at wall and floor edge' },
            { description: 'Corner and end-cap accessories - internal and external corner detailing', alt: 'Skirting board accessories for clean corners and terminations' },
            { description: 'Before and after renovation - old messy edge vs finished skirting', alt: 'Skirting boards used to finish flooring perimeter neatly' },
            { description: 'Kitchen or wet-area application - skirting near moisture-prone area', alt: 'Skirting board solution for kitchens and wet areas' },
            { description: 'Project packing and delivery - bundled profiles labelled for site', alt: 'Profilpas skirting boards prepared for project delivery' }
          ]
        }
      },
      {
        slug: 'prolight-and-tile-trims',
        name: 'Prolight and Tile Trims',
        description: 'LED lighting profiles and standard tile trims for modern installations.',
        metaDescription: 'Profilpas LED light profiles and tile trims from Lapiz Blue. Get the right profile for edges, corners, steps and feature lighting. UAE delivery.',
        images: ['/images/brands/profilpas/product-lines/prolightandtiletrims.webp'],
        content: {
          seoTitle: 'Profilpas Prolight LED Profiles & Tile Trims - UAE',
          h1: 'Profilpas Prolight LED Profiles and Tile Trims for clean finishes',
          intro: 'Good tiles and good floors can still look unfinished if edges are exposed, corners chip, or lighting is added as an afterthought. Profilpas solves that with two practical product families: Prolight LED profiles for direct or indirect feature lighting, and tile trims that protect edges while keeping lines sharp and consistent. At Lapiz Blue, we help you choose the right profile for your tile thickness, corner type, traffic level, and the look you want, then supply it with the right accessories so installation stays clean. Available UAE-wide, with branches in Dubai, Abu Dhabi and Sharjah.',
          whySection: {
            title: 'Why Profilpas Prolight and Tile Trims from Lapiz Blue?',
            bullets: [
              'One supplier for finishing and light integration, so trims and LED profiles stay consistent across the project',
              'Proper edge protection to reduce chipping at corners, steps, and tile terminations',
              'Options across common materials like aluminium, stainless steel, brass and PVC to match budget and performance needs',
              'Guidance on choosing the right profile shape for internal corners, external corners, steps, and transitions',
              'Practical support for installers, including compatibility checks for tile thickness and accessory requirements',
              'Availability for fast site requirements, plus project order support for large quantities and special finishes',
              'System thinking, including lighting profiles designed to house LED strips and accessories like diffusers, helping achieve a continuous light line'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Feature lighting at wall cladding, niches, counters, and display zones using LED light profiles',
              'Step edge highlighting for safer movement on stairs and level changes',
              'Clean tile edge finishing at exposed ends, window reveals, and half-height wall tiles',
              'Internal and external corners where tile edges are most likely to chip',
              'High-moisture areas where a corrosion-resistant finish matters (bathrooms, kitchens, wash zones)',
              'Renovations where trims cover minor cut imperfections and tidy up transitions',
              'Commercial areas that need durable profiles for frequent traffic and cleaning'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Option',
            bullets: [
              'Start with the location: wall edge, floor edge, step, internal corner, or external corner',
              'Match the tile thickness to the profile depth so the edge sits flush and protected (many trim systems are defined by tile thickness)',
              'Choose the material by environment: stainless steel for heavy wear and wet zones, aluminium for versatile interiors, PVC for cost-effective and flexible needs, brass for premium detailing',
              'Decide the profile look: sharp square lines, softer rounded lines, or recessed styles that visually "frame" the tile',
              'For Prolight, decide lighting intent first: direct task lighting or indirect ambient glow, then pick diffuser and channel style accordingly',
              'Confirm installation method early: adhesive bed, mechanical fixings, or accessory-based systems, especially on steps and high-traffic areas',
              'If you have multiple transition points, pick a consistent family so corners, joins and terminations look intentional across the site',
              'For LVT and wood nearby, consider transition profiles so trims and thresholds align visually with the flooring system'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Selecting profile depth without measuring actual tile thickness',
              'Choosing material without considering moisture exposure and cleaning chemicals',
              'Installing LED profiles without planning for diffuser and end cap accessories',
              'Using different trim families across the same project, creating inconsistent lines',
              'Forgetting corner accessories and leaving exposed joints at internal/external corners'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Availability', value: 'UAE-wide supply, and support for GCC export depending on project requirements' },
              { label: 'Branches', value: 'Dubai, Abu Dhabi, Sharjah' },
              { label: 'Technical Guidance', value: 'Help selecting the correct profile by tile thickness, corner type, traffic level, and finish' },
              { label: 'Documentation', value: 'Product datasheets, product codes, and system guidance on request' },
              { label: 'Quotations', value: 'BOQ-friendly quoting with clear product coding for approvals and procurement' },
              { label: 'Site Support', value: 'Coordination for bulk orders, repeatable specifications, and phased deliveries when needed' }
            ]
          },
          faqs: [
            {
              question: 'What is the difference between tile trims and tile profiles?',
              answer: 'Tile trims usually refer to visible finishing pieces for edges and corners. Tile profiles is the broader term that includes trims, transitions, joints, and special-purpose profiles.'
            },
            {
              question: 'Which is better for bathrooms, aluminium or stainless steel trims?',
              answer: 'If moisture and cleaning chemicals are frequent, stainless steel is often the safer long-term option. Aluminium is a strong choice for many interiors when the right finish is selected.'
            },
            {
              question: 'Do LED profiles work in wet areas?',
              answer: 'Some integrated LED profile systems are recommended for indoor areas not in direct contact with water, so selection depends on location and protection strategy. Share the area details and we will guide you.'
            },
            {
              question: 'Can Prolight be used on steps?',
              answer: 'Yes, Prolight includes step-oriented options designed to integrate lighting along stair edges, useful for both design and visibility.'
            },
            {
              question: 'How do I pick the right size profile?',
              answer: 'The quickest method is tile thickness plus where it sits (edge, corner, step). If you share tile thickness and photos of the junction, selection becomes straightforward.'
            },
            {
              question: 'Do you stock PVC tile trims as well?',
              answer: 'Yes. PVC options are commonly used where flexibility, speed of installation, or budget is a priority.'
            },
            {
              question: 'Are these trims suitable for commercial traffic?',
              answer: 'Yes, but the material and profile type matter. High-traffic zones typically need tougher materials and shapes designed for different usage levels.'
            },
            {
              question: 'Can you help with matching finishes across skirting, trims, and corners?',
              answer: 'Yes. We can align the look across metal profiles for walls, floors, corners, and LED lines so the project stays consistent.'
            },
            {
              question: 'Can I buy small quantities, or only bulk?',
              answer: 'Both. We support small requirement pickups and bulk project supply.'
            }
          ],
          cta: {
            title: 'Want the right Profilpas profile the first time?',
            subtitle: 'WhatsApp us your tile thickness, area photo, and required finish, and we will shortlist the best Prolight and tile trim options. Prefer email? Send your BOQ or drawings and we will quote with clear product codes and suitable alternatives where needed.',
            checklist: [
              'Tile thickness (in mm)',
              'Location type: wall edge, floor edge, step, corner',
              'Area photos showing the junction',
              'Required finish (aluminium, stainless steel, PVC, brass)',
              'Lighting requirement (if applicable)',
              'Quantity needed (linear meters or BOQ)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Prolight LED Profiles',
                content: 'Prolight is Profilpas\'s range of LED-ready profiles designed to integrate lighting into architectural finishes. These profiles house LED strips and accessories like diffusers and end caps, creating continuous light lines for feature walls, niches, steps, and display areas. The system approach means you get a coordinated set of components rather than piecing together separate parts.'
              },
              {
                title: 'Prolight Product Range',
                content: 'The Prolight range includes: Prolight Prolist CLA, Prolight Proangle Q, Prolight Prolist, Prolight Prostep SGA/11L, Prolight Protect G/9/F, Prolight Protect 126/L/F, Prolight Metal Line 88/I6L/A, Prolight Metal Line 89, plus electrical components and accessories for complete installations.'
              },
              {
                title: 'Tile Trims Overview',
                content: 'Tile trims protect exposed tile edges, finish corners cleanly, and create a professional look at terminations. Without proper trims, tile edges chip over time, grout lines look unfinished, and the overall quality of the installation suffers. The right trim also makes maintenance easier by creating cleanable edges rather than exposed grout.'
              },
              {
                title: 'Aluminium Tile Trims',
                content: 'Aluminium trims are the most versatile option, suitable for most interior applications. Available in straight profiles, L-shaped edge profiles, and U-shaped recessed profiles (anodized), aluminium offers a good balance of durability, appearance, and cost. The anodized finish resists corrosion and maintains its appearance over time.'
              },
              {
                title: 'Stainless Steel Tile Trims',
                content: 'Stainless steel trims are the premium choice for high-moisture areas, commercial kitchens, and zones with frequent cleaning. The material resists corrosion from water and cleaning chemicals, making it ideal for bathrooms, shower areas, and food preparation zones where hygiene standards are high.'
              },
              {
                title: 'PVC Tile Trims',
                content: 'PVC trims offer flexibility and cost-effectiveness. They\'re particularly useful where curved surfaces need to be followed, where budget is a priority, or where quick installation matters. PVC is also a good choice for areas where impact damage might occur, as the material is more forgiving than metal.'
              },
              {
                title: 'Brass Tile Trims',
                content: 'Brass trims provide a premium, warm metallic finish for high-end residential and hospitality projects. The distinctive gold-toned appearance adds a luxury touch to tile installations, particularly effective in bathroom vanities, kitchen backsplashes, and feature walls where the trim becomes a design element.'
              },
              {
                title: 'Tile Trim Product Range',
                content: 'Our tile trim range includes: Straight aluminium profiles, L-shaped aluminium edge profiles, U-shaped aluminium profiles, U-shaped recessed anodized profiles, Stainless Steel tile trims, PVC tile trims, and Brass tile trims.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Prolight in a wall niche - indirect glow inside a recessed niche with diffuser cover', alt: 'Profilpas Prolight LED profile for indirect niche lighting' },
            { description: 'Prolight on stair edge - illuminated step edge with continuous light line', alt: 'Prolight LED stair profile for step edge visibility' },
            { description: 'Tile edge trims material comparison - aluminium, stainless steel, PVC, brass trims side-by-side', alt: 'Tile trims in aluminium stainless steel PVC and brass' },
            { description: 'External corner trim close-up - corner protection on a tiled wall edge', alt: 'External corner tile trim to protect tile edges' },
            { description: 'Recessed aluminium U-shaped profile installed - recessed channel look, flush finish', alt: 'Aluminium U-shaped recessed tile profile installed flush' },
            { description: 'L-shaped edge profile on wall tile termination - clean tile end near window reveal', alt: 'L-shaped tile edge profile for clean wall tile termination' },
            { description: 'Prolight product set with accessories - profile, diffuser, end caps, and LED strip example', alt: 'LED profile with diffuser and accessories for continuous light line' },
            { description: 'Project application collage - bathroom feature wall, kitchen backsplash edge, commercial corridor corner protection', alt: 'Tile trims and LED profiles across different interior applications' }
          ]
        }
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
        content: {
          seoTitle: 'Laticrete Tile Adhesives & Grouts UAE | Lapiz Blue',
          h1: 'Laticrete Tile Adhesives and Grouts - American engineering for UAE projects',
          intro: 'Laticrete brings over 60 years of American tile and stone installation expertise to UAE construction sites. From thin-set mortars for standard ceramic tiles to specialized adhesives for large-format porcelain and natural stone, Laticrete systems are built for performance and durability. The PERMACOLOR grout range delivers consistent color with advanced stain resistance, while SpectraLock epoxy grouts handle the toughest wet and commercial environments. At Lapiz Blue, we supply the full Laticrete adhesive and grout range with technical guidance, helping you select the right product for your substrate, tile type, and project conditions.',
          whySection: {
            title: 'Why Laticrete Tile Adhesives and Grouts from Lapiz Blue?',
            bullets: [
              'American engineering heritage - over 60 years of innovation in tile and stone installation systems',
              'PERMACOLOR grouts with WDT (Water Dispersion Technology) - 20% stronger and 30% more stain resistant than standard grouts',
              'Microban antimicrobial protection built into select products - inhibits growth of stain-causing mold and mildew',
              'Large format tile solutions - adhesives engineered for proper coverage on tiles up to 3m without voids',
              'SpectraLock epoxy grout for extreme conditions - swimming pools, commercial kitchens, and high-traffic wet areas',
              'UAE-wide supply from Lapiz Blue branches in Dubai, Abu Dhabi, and Sharjah with technical support'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Large format porcelain and gauged panels - specialized LHT (Large and Heavy Tile) mortars eliminate voids',
              'Swimming pools and fountains - SpectraLock epoxy grout resists chemicals, salt, and permanent submersion',
              'Commercial kitchens and food processing - antimicrobial protection meets hygiene requirements',
              'Hospitality bathrooms and wet areas - PERMACOLOR grouts resist staining from daily cleaning chemicals',
              'Residential villas and apartments - reliable thin-set mortars for ceramic, porcelain, and mosaic tiles',
              'Healthcare and education facilities - durable installations that handle high traffic and frequent cleaning'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Laticrete System',
            bullets: [
              'Start with tile size - standard tiles use regular thin-set, large format (60x60cm+) needs LHT mortar for proper coverage',
              'Check tile absorption - porcelain and glass tiles need polymer-modified adhesives for bond strength',
              'Consider substrate type - concrete, cement board, plywood, and existing tile each have specific adhesive requirements',
              'Evaluate moisture exposure - wet areas need waterproofing membrane plus appropriate grout (cementitious or epoxy)',
              'Match grout to traffic level - PERMACOLOR for residential and light commercial, SpectraLock for heavy-duty environments',
              'Plan color consistency - PERMACOLOR Select offers 40+ colors with consistent batch-to-batch matching',
              'Factor in installation speed - rapid-set options available for fast-track projects with tight timelines'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Using standard thin-set for large format tiles - causes voids and lippage; use LHT mortars instead',
              'Skipping primer on porous substrates - reduces bond strength and can cause adhesive failure',
              'Grouting before adhesive cures - minimum 24 hours for thin-set cure before grouting',
              'Using cementitious grout in pools - epoxy grout is required for permanent water exposure',
              'Not sealing cementitious grout - even PERMACOLOR benefits from sealer in high-stain environments'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Product Range', value: 'Full Laticrete adhesive and grout portfolio - thin-set, medium-bed, LHT mortars, PERMACOLOR, SpectraLock' },
              { label: 'Technical Support', value: 'Product selection guidance based on tile type, substrate, and project conditions' },
              { label: 'Color Matching', value: 'PERMACOLOR Select with 40+ standard colors and custom color matching available' },
              { label: 'Documentation', value: 'Technical data sheets, installation guides, and specification support' },
              { label: 'Branch Coverage', value: 'Dubai, Abu Dhabi, and Sharjah branches with UAE-wide delivery' },
              { label: 'Project Support', value: 'BOQ-friendly quotations and bulk order coordination for commercial projects' }
            ]
          },
          faqs: [
            {
              question: 'What makes PERMACOLOR grout different from standard grouts?',
              answer: 'PERMACOLOR uses Water Dispersion Technology (WDT) that produces grout joints up to 20% stronger with 30% greater stain resistance. It also includes Microban antimicrobial protection in select formulas.'
            },
            {
              question: 'When should I use SpectraLock epoxy grout instead of cementitious grout?',
              answer: 'Use SpectraLock for swimming pools, hot tubs, commercial kitchens, food processing areas, and anywhere with permanent water exposure or aggressive chemical cleaning. It is waterproof and does not require sealing.'
            },
            {
              question: 'Can Laticrete adhesives handle large format porcelain tiles?',
              answer: 'Yes. Laticrete LHT (Large and Heavy Tile) mortars are specifically engineered for tiles up to 3 meters. They provide proper coverage and eliminate voids under the tile.'
            },
            {
              question: 'Do I need to seal PERMACOLOR grout?',
              answer: 'PERMACOLOR has excellent stain resistance built-in, but sealing is still recommended for high-stain environments like kitchen countertops and floors near entry points.'
            },
            {
              question: 'What is Microban protection in Laticrete products?',
              answer: 'Microban is an antimicrobial technology built into select Laticrete adhesives and grouts. It inhibits the growth of stain-causing mold and mildew on the product surface.'
            },
            {
              question: 'How do I choose the right adhesive for glass mosaic tiles?',
              answer: 'Glass tiles require white polymer-modified thin-set to prevent color distortion and ensure proper bond. Laticrete 254 Platinum or Glass Tile Adhesive are ideal choices.'
            },
            {
              question: 'Can I use Laticrete products over existing tile?',
              answer: 'Yes, with proper preparation. Use Laticrete PRIME-N-BOND primer on clean, sound existing tile, then apply appropriate thin-set for the new tile installation.'
            },
            {
              question: 'What grout colors are available in PERMACOLOR Select?',
              answer: 'PERMACOLOR Select offers 40+ standard colors including popular UAE choices like Desert Khaki, Silverado, and Bright White. Custom color matching is also available for large projects.'
            }
          ],
          cta: {
            title: 'Need help selecting the right Laticrete adhesive and grout?',
            subtitle: 'WhatsApp us with your tile type, size, and installation area - we will recommend the right Laticrete system. For project quotations, email your BOQ or drawings and we will respond with product specifications and pricing.',
            checklist: [
              'Tile type (ceramic, porcelain, natural stone, glass)',
              'Tile size and thickness',
              'Substrate type (concrete, cement board, existing tile)',
              'Installation area (wet area, dry area, submerged)',
              'Grout color preference',
              'Quantity needed (coverage area in sqm)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Laticrete Tile Adhesives',
                content: 'Laticrete adhesives are formulated for the demands of modern tile installation. From standard ceramic to large-format gauged porcelain panels, there is a Laticrete mortar engineered for the job. The adhesive portfolio includes thin-set mortars for standard applications, medium-bed mortars for uneven substrates, and specialized LHT (Large and Heavy Tile) mortars that provide proper coverage on oversized tiles without voids or lippage.'
              },
              {
                title: 'Large Format Tile Solutions',
                content: 'Large format tiles (60x60cm and above) require specialized installation methods to prevent hollow spots and ensure long-term performance. Laticrete LHT mortars are engineered with advanced features that achieve proper coverage even on tiles up to 3 meters. The back-buttering technique combined with LHT mortar ensures full contact between tile and substrate.'
              },
              {
                title: 'PERMACOLOR Grout Technology',
                content: 'PERMACOLOR grouts use Water Dispersion Technology (WDT) that enhances water distribution during mixing. This produces grout joints that are up to 20% stronger and offer up to 30% greater stain resistance compared to standard cementitious grouts. Available in over 40 colors with consistent batch-to-batch matching, PERMACOLOR delivers reliable aesthetics across large projects.'
              },
              {
                title: 'SpectraLock Epoxy Grout',
                content: 'For environments that demand waterproof, chemical-resistant grout, SpectraLock epoxy grout is the professional choice. Swimming pools, commercial kitchens, food processing facilities, and healthcare environments all benefit from SpectraLock performance. Unlike cementitious grouts, SpectraLock does not require sealing and maintains its appearance even under harsh cleaning chemicals.'
              },
              {
                title: 'Microban Antimicrobial Protection',
                content: 'Select Laticrete adhesives and grouts include Microban antimicrobial product protection. This technology is built into the product during manufacturing and inhibits the growth of stain-causing mold and mildew on the product surface. For healthcare, hospitality, and residential bathrooms, Microban protection helps maintain cleaner installations over time.'
              },
              {
                title: 'Natural Stone Installation',
                content: 'Natural stone requires careful adhesive selection to prevent staining and ensure proper bond. Laticrete offers white thin-set mortars that prevent bleed-through on light-colored stones, along with specialized products for moisture-sensitive stones like green marble. The right adhesive protects your stone investment and ensures lasting performance.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Laticrete tile adhesive and grout range includes: 254 Platinum multipurpose thin-set, 257 Titanium for rapid setting, LHT mortars for large format tiles, Glass Tile Adhesive for transparent tiles, PERMACOLOR Select cementitious grout (40+ colors), and SpectraLock PRO epoxy grout for demanding environments.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Large format porcelain tile installation showing proper adhesive coverage', alt: 'Laticrete LHT mortar for large format tile installation UAE' },
            { description: 'PERMACOLOR grout color range showing multiple options', alt: 'Laticrete PERMACOLOR grout colors available in UAE' },
            { description: 'SpectraLock epoxy grout in swimming pool application', alt: 'Laticrete SpectraLock epoxy grout for pool tiling' },
            { description: 'Thin-set mortar being applied with notched trowel', alt: 'Laticrete thin-set adhesive application for tile installation' },
            { description: 'Glass mosaic tile installation with white adhesive', alt: 'Laticrete adhesive for glass mosaic tile Dubai' },
            { description: 'Commercial kitchen floor with epoxy grout', alt: 'Laticrete grout system for commercial kitchen floors' },
            { description: 'Natural stone installation showing proper technique', alt: 'Laticrete adhesive for natural stone installation UAE' },
            { description: 'Grout application showing color consistency', alt: 'PERMACOLOR grout installation with consistent color' }
          ]
        }
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Load-bearing waterproofing membranes and systems.',
        metaDescription: 'Laticrete waterproofing UAE - HYDRO BAN and waterproofing membranes for wet areas in Dubai, Abu Dhabi, Sharjah.',
        images: ['/images/brands/laticrete/waterproofing.jpg'],
        content: {
          seoTitle: 'Laticrete HYDRO BAN Waterproofing UAE | Lapiz Blue',
          h1: 'Laticrete Waterproofing Systems - HYDRO BAN technology for UAE wet areas',
          intro: 'Water damage starts where you least expect it - behind tiles, under floors, and through unsealed joints. Laticrete HYDRO BAN waterproofing systems provide thin, load-bearing membranes that protect substrates while allowing direct tile installation. Unlike traditional waterproofing that requires curing days, HYDRO BAN can be flood-tested in just 2 hours. The Microban antimicrobial protection inhibits mold and mildew growth, and the color-change indicator shows when the membrane is ready for tiling. At Lapiz Blue, we supply the complete HYDRO BAN range for bathrooms, pools, fountains, and commercial wet areas across the UAE.',
          whySection: {
            title: 'Why Laticrete Waterproofing from Lapiz Blue?',
            bullets: [
              '2-hour flood test capability - verify waterproofing integrity before tiling, not after problems appear',
              'Thin load-bearing membrane (0.5-0.8mm cured) - does not add significant build-up to floor heights',
              'Microban antimicrobial protection - inhibits stain-causing mold and mildew on the membrane surface',
              'Color-change indicator - HYDRO BAN turns dark green when dry, removing guesswork from application',
              'Seamless application - no fabric required in field areas, coves, or corners for faster installation',
              'Complete system range - liquid membranes, sheet membranes, shower pans, and accessories for any wet area'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Residential bathrooms and showers - thin membrane allows tile-ready surfaces without raising floor levels',
              'Swimming pools and spas - HYDRO BAN XP handles permanent submersion and chlorine exposure',
              'Commercial kitchens and food processing - chemical resistance meets hygiene requirements',
              'Steam rooms and steam showers - Sheet Membrane provides vapor barrier protection',
              'Fountains and water features - reliable waterproofing for decorative water installations',
              'Balconies and terraces - exterior-grade options for outdoor tiled surfaces in UAE climate'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right HYDRO BAN Product',
            bullets: [
              'Standard wet areas (bathrooms, showers) - HYDRO BAN liquid membrane is the go-to choice for most residential and commercial projects',
              'Extreme conditions (pools, fountains, exterior) - HYDRO BAN XP provides enhanced performance for permanent submersion',
              'Steam rooms and saunas - HYDRO BAN Sheet Membrane acts as both waterproofing and vapor barrier',
              'Fast-track projects - HYDRO BAN Quick Cure accelerates ready-to-tile time for tight schedules',
              'Pre-sloped showers - HYDRO BAN Shower Pan Kit provides complete waterproof shower base solution',
              'Large commercial projects - consider application method (roller, spray, trowel) and coverage rates for efficiency',
              'Crack isolation needs - HYDRO BAN provides crack isolation up to 1/8 inch (3mm) in addition to waterproofing'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Applying too thin - insufficient membrane thickness compromises waterproofing; follow minimum coverage rates',
              'Not waiting for color change - tiling before membrane fully cures (dark green) risks bond failure',
              'Skipping flood test - 2-hour flood test catches issues before tile installation hides problems',
              'Ignoring substrate preparation - dusty, oily, or unsound substrates cause membrane delamination',
              'Using wrong product for submersion - standard HYDRO BAN is for wet areas, not permanent submersion; use HYDRO BAN XP for pools'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Product Range', value: 'Complete HYDRO BAN family - liquid membranes, sheet membranes, shower pans, and accessories' },
              { label: 'Technical Support', value: 'Application guidance for substrate types, coverage rates, and curing requirements' },
              { label: 'Documentation', value: 'Technical data sheets, installation instructions, and warranty information' },
              { label: 'Branch Coverage', value: 'Dubai, Abu Dhabi, and Sharjah branches with UAE-wide delivery' },
              { label: 'Project Support', value: 'Coverage calculations and BOQ-friendly quotations for commercial projects' },
              { label: 'Training Resources', value: 'Access to Laticrete installation guides and best practice recommendations' }
            ]
          },
          faqs: [
            {
              question: 'How long does HYDRO BAN take to cure before tiling?',
              answer: 'HYDRO BAN can be flood-tested in 2 hours at 21°C (70°F) or higher. The membrane turns dark green when dry and ready for tile installation. In cooler conditions, allow additional curing time.'
            },
            {
              question: 'Can HYDRO BAN be used in swimming pools?',
              answer: 'For swimming pools and permanent submersion, use HYDRO BAN XP which is specifically formulated for extreme conditions including pools, fountains, and spas.'
            },
            {
              question: 'Do I need to use fabric with HYDRO BAN?',
              answer: 'No. HYDRO BAN is a self-curing liquid rubber polymer that does not require fabric in field areas, coves, or corners. This simplifies application and reduces material costs.'
            },
            {
              question: 'What is the Microban protection in HYDRO BAN?',
              answer: 'Microban antimicrobial technology is built into HYDRO BAN during manufacturing. It inhibits the growth of stain-causing mold and mildew on the membrane surface, helping maintain cleaner installations.'
            },
            {
              question: 'How thick should HYDRO BAN be applied?',
              answer: 'HYDRO BAN should cure to 0.5-0.8mm (0.020-0.030 inches) thickness. This typically requires 2-3 coats depending on application method and substrate porosity.'
            },
            {
              question: 'Can I use HYDRO BAN in steam showers?',
              answer: 'For steam showers and steam rooms, use HYDRO BAN Sheet Membrane which provides both waterproofing and vapor barrier protection against steam penetration.'
            },
            {
              question: 'What substrates can HYDRO BAN be applied to?',
              answer: 'HYDRO BAN bonds to concrete, cement backer board, cement plaster, gypsum board, plywood, and properly prepared existing tile. Always verify substrate suitability before application.'
            },
            {
              question: 'Is HYDRO BAN suitable for exterior balconies in UAE?',
              answer: 'Yes, HYDRO BAN XP is suitable for exterior applications including balconies and terraces. It handles UV exposure and the temperature variations typical in UAE climate.'
            }
          ],
          cta: {
            title: 'Need waterproofing for your next wet area project?',
            subtitle: 'WhatsApp us with your application type and area size - we will recommend the right HYDRO BAN product. For project quotations, email your drawings and we will calculate coverage and provide pricing.',
            checklist: [
              'Application type (bathroom, pool, steam room, exterior)',
              'Substrate type (concrete, cement board, plywood)',
              'Total area to be waterproofed (sqm)',
              'Special requirements (crack isolation, vapor barrier)',
              'Project timeline and schedule constraints',
              'Delivery location in UAE'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'HYDRO BAN Liquid Membrane',
                content: 'HYDRO BAN is a single-component, self-curing liquid rubber polymer that forms a flexible, seamless waterproofing membrane. Applied by roller, brush, or trowel, it bonds directly to substrates and allows tile installation once cured. The thin profile (0.5-0.8mm) means minimal build-up, making it ideal for renovation projects where floor height is a concern.'
              },
              {
                title: '2-Hour Flood Test Advantage',
                content: 'Unlike traditional waterproofing that requires days of curing before testing, HYDRO BAN can be flood-tested in just 2 hours at 21°C. This allows you to verify waterproofing integrity before tile installation, catching any issues while they are still easy to fix. The color-change indicator (dark green when cured) provides visual confirmation of readiness.'
              },
              {
                title: 'HYDRO BAN XP for Extreme Conditions',
                content: 'When standard waterproofing is not enough, HYDRO BAN XP delivers enhanced performance for the most demanding applications. Suitable for swimming pools, fountains, spas, and exterior installations, HYDRO BAN XP handles permanent submersion, chemical exposure, and UV radiation. It is the professional choice for water features and outdoor wet areas in UAE.'
              },
              {
                title: 'HYDRO BAN Sheet Membrane',
                content: 'For steam rooms, steam showers, and applications requiring vapor barrier protection, HYDRO BAN Sheet Membrane provides a polymeric waterproofing and vapor barrier in one product. Installed with LATICRETE thin-set, it protects against both liquid water and water vapor penetration.'
              },
              {
                title: 'Shower Pan Solutions',
                content: 'The HYDRO BAN Shower Pan Kit provides a complete waterproof shower base solution. Available in multiple sizes and site-sizable, it includes pre-sloped pan, waterproofing membrane, and accessories for a fully integrated system. Ideal for residential bathrooms, commercial facilities, and even pet washing stations.'
              },
              {
                title: 'Microban Antimicrobial Protection',
                content: 'HYDRO BAN includes Microban antimicrobial product protection built in during manufacturing. This technology inhibits the growth of stain-causing mold and mildew on the membrane surface. For bathrooms, commercial kitchens, and healthcare facilities, this protection helps maintain cleaner, more hygienic installations over time.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Laticrete waterproofing range includes: HYDRO BAN standard liquid membrane, HYDRO BAN XP for extreme conditions, HYDRO BAN Quick Cure for fast-track projects, HYDRO BAN Sheet Membrane for vapor barriers, HYDRO BAN Shower Pan Kits, and 9235 Waterproofing Membrane for specialized applications.'
              }
            ]
          },
          suggestedImages: [
            { description: 'HYDRO BAN liquid membrane being applied by roller in bathroom', alt: 'Laticrete HYDRO BAN waterproofing application in UAE bathroom' },
            { description: 'Flood testing shower area with HYDRO BAN membrane', alt: 'HYDRO BAN 2-hour flood test for waterproofing verification' },
            { description: 'Swimming pool waterproofed with HYDRO BAN XP before tiling', alt: 'Laticrete HYDRO BAN XP waterproofing for swimming pools UAE' },
            { description: 'Color change indicator showing dark green cured membrane', alt: 'HYDRO BAN color change indicator when ready for tiling' },
            { description: 'Sheet membrane installation in steam room', alt: 'Laticrete HYDRO BAN Sheet Membrane for steam room waterproofing' },
            { description: 'Commercial kitchen floor waterproofing', alt: 'Laticrete waterproofing system for commercial kitchen Dubai' },
            { description: 'Shower pan kit installed and ready for tile', alt: 'HYDRO BAN Shower Pan Kit for bathroom waterproofing' },
            { description: 'Balcony waterproofing with HYDRO BAN XP', alt: 'Exterior balcony waterproofing with Laticrete HYDRO BAN UAE' }
          ]
        }
      },
      {
        slug: 'self-leveling-and-screed',
        name: 'Self Leveling and Screed',
        description: 'Fast-setting self-leveling underlayments and screeds.',
        metaDescription: 'Laticrete self-leveling UAE - Fast-track floor leveling compounds and screeds for UAE construction projects.',
        images: ['/images/brands/laticrete/self-leveling.jpg'],
        content: {
          seoTitle: 'Laticrete Self-Leveling & Screed UAE | Lapiz Blue',
          h1: 'Laticrete Self-Leveling Underlayments - flat floors, fast schedules',
          intro: 'Uneven concrete, old adhesive residue, and substrate imperfections create problems that follow every floor covering installed on top. Laticrete self-leveling underlayments and screeds solve this by creating perfectly flat, smooth surfaces ready for tile, LVT, carpet, or other floor finishes. With formulas that are walkable in 2-3 hours and ready for floor coverings in as little as 12 hours, Laticrete accelerates project timelines without compromising quality. At Lapiz Blue, we supply the complete Laticrete leveling range including fire-rated options and antimicrobial formulations for commercial and residential projects across UAE.',
          whySection: {
            title: 'Why Laticrete Self-Leveling from Lapiz Blue?',
            bullets: [
              'Rapid schedule - walkable in 2-3 hours, floor coverings can be installed in as little as 12-16 hours',
              'Fire-rated options - NXT Level is UL-certified for up to 2-hour fire resistance in floor assemblies',
              'Antimicrobial protection - NXT Level Plus includes Microban to inhibit mold and mildew growth',
              'Flexible thickness - pour from 3mm to 76mm in a single lift depending on product selection',
              'Multiple application methods - pourable or pumpable for efficient coverage on large commercial floors',
              'Heated screed compatible - LEVEL MAXI formulation suitable for underfloor heating systems'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Commercial fit-outs - fast-track leveling for retail, office, and hospitality floor installations',
              'Renovation projects - correct uneven existing floors without demolition and rebuild',
              'Healthcare and education - fire-rated and antimicrobial options meet facility requirements',
              'Residential apartments - smooth substrates for tile, LVT, wood, and carpet installations',
              'Industrial facilities - durable underlayments for heavy traffic and equipment loads',
              'Multi-family construction - high-volume pumping capability speeds large floor areas'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Leveling Product',
            bullets: [
              'Determine required thickness - standard levelers handle 3-25mm, deep-fill options go to 76mm in single pour',
              'Check schedule requirements - NXT Level allows floor coverings in 16 hours, standard LEVEL in 24 hours',
              'Consider fire rating needs - NXT Level provides UL-certified 2-hour fire resistance for code compliance',
              'Evaluate antimicrobial requirements - NXT Level Plus includes Microban for healthcare and hospitality',
              'Plan application method - small areas can be poured manually, large floors benefit from pump application',
              'Confirm heated floor compatibility - LEVEL MAXI is formulated for underfloor heating systems',
              'Factor in substrate type - different primers may be required for concrete, plywood, or existing tile'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Skipping primer - self-leveling compounds require proper priming for bond and to control substrate porosity',
              'Incorrect mixing ratio - too much or too little water affects flow, strength, and curing time',
              'Pouring too thick in single lift - exceeding maximum thickness causes cracking; use deep-fill products or multiple lifts',
              'Not accounting for temperature - hot UAE conditions accelerate setting; plan pour timing accordingly',
              'Walking too early - even "rapid" products need proper cure time; verify walkability before foot traffic'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Product Range', value: 'Complete leveling portfolio - standard, rapid-set, fire-rated, antimicrobial, and deep-fill options' },
              { label: 'Technical Support', value: 'Product selection guidance based on thickness, schedule, and performance requirements' },
              { label: 'Coverage Calculations', value: 'Help determining quantities based on area, depth, and substrate conditions' },
              { label: 'Documentation', value: 'Technical data sheets, mixing guides, and fire rating certifications' },
              { label: 'Branch Coverage', value: 'Dubai, Abu Dhabi, and Sharjah branches with UAE-wide delivery' },
              { label: 'Project Support', value: 'BOQ-friendly quotations and coordination for commercial floor projects' }
            ]
          },
          faqs: [
            {
              question: 'How soon can I install floor coverings after leveling?',
              answer: 'With NXT Level, floor coverings can be installed in as little as 16 hours. Standard LEVEL products typically require 24 hours. Always verify moisture levels before installing moisture-sensitive coverings.'
            },
            {
              question: 'What is the maximum thickness I can pour in one lift?',
              answer: 'Standard products like LEVEL handle up to 25mm per lift. NXT Level can be poured up to 76mm (3 inches) in a single application, making it ideal for correcting severely uneven substrates.'
            },
            {
              question: 'Do I need to prime the substrate before leveling?',
              answer: 'Yes. Primer is essential for proper bond and to control substrate porosity. Use Laticrete PRIME-N-BOND or appropriate primer based on substrate type.'
            },
            {
              question: 'Can self-leveling be used over underfloor heating?',
              answer: 'Yes. LEVEL MAXI is specifically formulated for heated screed applications. Ensure heating system is properly installed and tested before pouring.'
            },
            {
              question: 'What makes NXT Level fire-rated?',
              answer: 'NXT Level is UL-certified for fire resistance up to 2 hours in floor-to-ceiling assemblies. This certification is important for commercial buildings requiring fire-rated floor construction.'
            },
            {
              question: 'Can I level over existing tile?',
              answer: 'Yes, with proper preparation. Clean the tile surface, ensure it is sound and well-bonded, then apply appropriate primer before pouring leveling compound.'
            },
            {
              question: 'What is Microban protection in NXT Level Plus?',
              answer: 'Microban antimicrobial technology is built into the product to inhibit growth of stain-causing mold and mildew in the underlayment. This is valuable for healthcare, hospitality, and humid environments.'
            },
            {
              question: 'How do I handle leveling in UAE summer heat?',
              answer: 'High temperatures accelerate setting time. Work in smaller sections, keep materials cool before mixing, and consider early morning application. Follow Laticrete guidelines for hot weather installation.'
            }
          ],
          cta: {
            title: 'Need floor leveling for your next project?',
            subtitle: 'WhatsApp us with your floor area, required depth, and schedule requirements - we will recommend the right Laticrete leveling system. For project quotations, email your floor plans and we will calculate coverage and provide pricing.',
            checklist: [
              'Total floor area (sqm)',
              'Required leveling depth (mm)',
              'Substrate type (concrete, plywood, existing tile)',
              'Floor covering to be installed',
              'Project timeline constraints',
              'Special requirements (fire rating, antimicrobial)',
              'Delivery location in UAE'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Laticrete Self-Leveling Technology',
                content: 'Laticrete self-leveling underlayments use advanced cement-based formulations that flow and self-level to create perfectly flat surfaces. When properly mixed and poured, the compound spreads to fill low spots and level out imperfections, producing a smooth, hard surface ready for floor coverings. This technology eliminates the labor-intensive process of traditional screeding.'
              },
              {
                title: 'NXT Level - Fire-Rated Performance',
                content: 'NXT Level is a high-strength cement-based self-leveling underlayment with UL certification for fire resistance up to 2 hours in floor-to-ceiling assemblies. Pourable or pumpable from 3mm to 76mm in a single lift, it is walkable in 2-3 hours and ready for floor coverings in just 16 hours. This combination of fire rating and rapid cure makes it ideal for commercial construction.'
              },
              {
                title: 'NXT Level Plus - Antimicrobial Protection',
                content: 'NXT Level Plus incorporates Microban antimicrobial product protection to fight the growth of stain-causing mold and mildew in the underlayment. This is particularly valuable for healthcare facilities, hospitality projects, and any environment where hygiene and cleanliness are priorities. The product maintains all the performance characteristics of standard NXT Level.'
              },
              {
                title: 'LEVEL and LEVEL MAXI',
                content: 'LEVEL is a cement-based, easy-to-use self-leveling underlayment for creating flat, smooth surfaces over various substrates including concrete and existing tile. LEVEL MAXI offers enhanced formulation for thicknesses up to 30mm and is compatible with heated screed systems, making it suitable for underfloor heating installations.'
              },
              {
                title: 'SUPERCAP High-Volume System',
                content: 'For large commercial floor projects, the SUPERCAP system combines patented pump truck technology with innovative products to deliver perfectly flat, dry floors at high volume. This system corrects uneven concrete, reduces moisture vapor emissions, and shortens build times - ideal for warehouse, retail, and industrial floor preparation.'
              },
              {
                title: 'Substrate Preparation',
                content: 'Successful self-leveling depends on proper substrate preparation. All surfaces must be clean, sound, and properly primed. Laticrete offers primers for different substrate types including concrete, plywood, and existing tile. Taking time for proper preparation ensures the leveling compound bonds correctly and performs as specified.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Laticrete self-leveling range includes: LEVEL standard underlayment, LEVEL MAXI for heated screeds, NXT Level fire-rated formula, NXT Level Plus with antimicrobial protection, NXT Level SP decorative wear surface, and SUPERCAP high-volume system for commercial applications.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Self-leveling compound being poured on commercial floor', alt: 'Laticrete self-leveling underlayment application UAE' },
            { description: 'Flat finished floor ready for tile installation', alt: 'Level floor surface after Laticrete self-leveling compound' },
            { description: 'Pump application on large warehouse floor', alt: 'Laticrete SUPERCAP system for high-volume floor leveling' },
            { description: 'Before and after floor leveling comparison', alt: 'Uneven concrete corrected with Laticrete leveling compound' },
            { description: 'NXT Level product packaging and mixing', alt: 'Laticrete NXT Level fire-rated self-leveling product' },
            { description: 'Floor primer application before leveling', alt: 'Substrate priming for Laticrete self-leveling installation' },
            { description: 'Commercial retail floor leveling project', alt: 'Laticrete floor leveling for commercial retail Dubai' },
            { description: 'Underfloor heating with compatible screed', alt: 'Laticrete LEVEL MAXI for heated floor systems UAE' }
          ]
        }
      },
      {
        slug: 'flooring',
        name: 'Flooring',
        description: 'Complete flooring installation systems including adhesives and preparation.',
        metaDescription: 'Laticrete flooring systems UAE - Professional flooring adhesives and installation solutions for Dubai projects.',
        images: ['/images/brands/laticrete/flooring.jpg'],
        content: {
          seoTitle: 'Laticrete Flooring Systems UAE | Industrial Floor Solutions Dubai',
          h1: 'Professional Flooring Installation Systems for Every Project',
          intro: 'Laticrete flooring systems deliver complete solutions from substrate preparation to final finish. Whether you are installing luxury vinyl, carpet, rubber, or decorative overlays, Laticrete provides the primers, adhesives, and moisture barriers that professional installers trust. With over 65 years of American engineering excellence, these systems are designed to handle UAE conditions - from high-traffic commercial lobbies to moisture-sensitive basements. Every component works together as a proven system, eliminating guesswork and ensuring installations that perform for decades.',
          whySection: {
            title: 'Why Choose Laticrete Flooring Systems?',
            bullets: [
              'Complete system approach: primers, levelers, adhesives, and moisture barriers designed to work together for guaranteed compatibility',
              'Moisture vapor control: MVB technology handles up to 25 lbs MVER without waiting months for concrete to dry',
              'Fast return to service: many products allow light traffic in 4-6 hours, full service in 24-48 hours',
              'Universal adhesives: single products that bond vinyl, rubber, carpet, cork, and linoleum without switching products',
              'Microban antimicrobial protection: built-in defense against mold and bacteria in moisture-prone installations',
              'UAE climate proven: formulated to perform in high humidity and temperature variations without failure'
            ]
          },
          applications: {
            title: 'Commercial and Industrial Applications',
            items: [
              'Office Buildings: Open-plan floors with carpet tiles, VCT, and luxury vinyl requiring pattern-matched installations',
              'Retail Spaces: Heavy foot traffic areas with vinyl, rubber, and decorative flooring needing fast turnaround',
              'Healthcare Facilities: Hygienic sheet vinyl and rubber flooring with seamless welded seams',
              'Hospitality: Hotel lobbies, corridors, and guest rooms with varied flooring types throughout',
              'Education: Schools and universities with durable, easy-clean flooring in classrooms and corridors',
              'Industrial: Warehouses and manufacturing with heavy loads and forklift traffic'
            ]
          },
          howToChoose: {
            title: 'Selecting the Right Flooring System',
            bullets: [
              'Test moisture levels: use calcium chloride (MVER) and relative humidity (RH) tests to determine if moisture mitigation is needed',
              'Identify substrate type: concrete age, condition, and any existing coatings affect primer and adhesive selection',
              'Consider floor covering: vinyl, carpet, rubber, and cork each have specific adhesive requirements',
              'Evaluate traffic load: foot traffic, rolling loads, and point loads determine adhesive strength requirements',
              'Check timeline: project schedule determines whether standard or rapid-cure products are needed',
              'Assess moisture conditions: below-grade, on-grade, and above-grade have different moisture control needs',
              'Review manufacturer requirements: floor covering manufacturers often specify or approve certain adhesives'
            ]
          },
          commonMistakes: {
            title: 'Common Flooring Installation Mistakes',
            bullets: [
              'Skipping moisture testing: installing over wet concrete causes adhesive failure, bubbling, and mold growth',
              'Using wrong adhesive open time: working past open time creates weak bonds that fail under traffic',
              'Ignoring substrate preparation: contaminated or rough surfaces prevent proper adhesive contact',
              'Incorrect trowel selection: wrong notch size applies too much or too little adhesive for the flooring type',
              'Rolling too early or too late: improper timing affects adhesive transfer and creates air pockets'
            ]
          },
          trustSignals: {
            title: 'Laticrete Flooring System Credentials',
            items: [
              { label: 'System Warranty', value: 'Up to 25 years' },
              { label: 'VOC Compliance', value: 'FloorScore certified' },
              { label: 'MVER Rating', value: 'Up to 25 lbs' },
              { label: 'Industry Approvals', value: 'CFI, INSTALL' },
              { label: 'Temperature Range', value: '50°F to 95°F (10°C to 35°C)' },
              { label: 'Technical Support', value: '24/7 hotline UAE' }
            ]
          },
          faqs: [
            {
              question: 'What is MVER and why does it matter for flooring installation in UAE?',
              answer: 'MVER (Moisture Vapor Emission Rate) measures how much moisture rises through concrete slabs. In UAE, new construction and high humidity can create MVER readings above safe levels for flooring adhesives. Standard adhesives fail at 3-5 lbs MVER, while Laticrete MVB systems handle up to 25 lbs, allowing installation on newer concrete without long drying periods.'
            },
            {
              question: 'Can I install flooring over existing tiles or coatings?',
              answer: 'Yes, with proper preparation. Laticrete primers can bond to many existing surfaces including old adhesive residue, ceramic tile, and certain coatings. The substrate must be sound and well-bonded. Testing with Laticrete technical support helps determine the right primer system for your specific overlay situation.'
            },
            {
              question: 'How soon can floors handle foot traffic after installation?',
              answer: 'Light foot traffic is typically allowed after 4-6 hours for most Laticrete flooring adhesives. Full traffic and furniture can usually be placed after 24-48 hours. Rolling loads like office chairs should wait 48-72 hours. Temperature and humidity affect cure times - cooler conditions extend these times.'
            },
            {
              question: 'What is the difference between pressure-sensitive and full-spread adhesives?',
              answer: 'Pressure-sensitive adhesives remain tacky and allow repositioning of materials like carpet tiles and luxury vinyl planks. Full-spread adhesives cure hard and provide permanent bonds for sheet vinyl, rubber, and heavy commercial applications. Your floor covering type and expected traffic determine which is appropriate.'
            },
            {
              question: 'Do I need a primer before installing flooring adhesive?',
              answer: 'Primers are recommended for porous concrete, dusty surfaces, or when applying moisture barriers. Laticrete primers improve adhesive bond strength and prevent adhesive absorption into the substrate. For MVB moisture barriers, the primer system is essential for proper performance.'
            },
            {
              question: 'How do Laticrete products handle UAE temperature extremes?',
              answer: 'Laticrete flooring systems are formulated for temperature variations common in UAE. Products maintain flexibility and bond strength through air conditioning cycles and seasonal changes. Storage and installation should occur between 10°C and 35°C, with substrates at similar temperatures for optimal results.'
            },
            {
              question: 'What warranty coverage is available for Laticrete flooring systems?',
              answer: 'Laticrete offers system warranties up to 25 years when complete systems are used together (primer, moisture barrier, adhesive). Single product warranties vary by product. Lapiz Blue provides full warranty support and documentation for UAE installations. Registration within 30 days of installation activates warranty coverage.'
            },
            {
              question: 'Can Laticrete adhesives be used with underfloor heating systems?',
              answer: 'Yes, many Laticrete adhesives are compatible with electric and hydronic underfloor heating. The heating system must be commissioned and cycled before flooring installation. Specific products are rated for elevated temperatures up to 85°F (29°C) continuous floor surface temperature.'
            }
          ],
          cta: {
            title: 'Ready for Professional Flooring Installation?',
            subtitle: 'Get complete Laticrete flooring systems from UAE\'s authorized distributor. Technical support, moisture testing guidance, and product selection assistance included.',
            checklist: [
              'Free substrate moisture assessment consultation',
              'Complete system specification for your project type',
              'Product data sheets and installation guides',
              'Technical support during installation',
              'Warranty registration assistance',
              'Bulk pricing for commercial projects',
              'Same-day availability for most products'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'The Complete System Advantage',
                content: 'Laticrete flooring solutions work as integrated systems rather than individual products. When you use Laticrete primers with Laticrete moisture barriers and Laticrete adhesives, you get guaranteed compatibility and the security of a single-source warranty. This system approach eliminates the finger-pointing that occurs when products from different manufacturers fail. For contractors, it means simpler specification writing and confident warranty claims.'
              },
              {
                title: 'Featured Products: MVB Moisture Vapor Barrier',
                content: 'The Laticrete MVB (Moisture Vapor Barrier) system revolutionizes installation schedules by allowing flooring over concrete with moisture vapor emission rates up to 25 lbs per 1000 sq ft per 24 hours. Traditional approach: wait 6-12 months for concrete to dry. Laticrete approach: install MVB and proceed with flooring in days. The two-component epoxy system also serves as a primer for adhesives, simplifying the installation process.'
              },
              {
                title: 'Universal Flooring Adhesive Technology',
                content: 'Laticrete 136 Premium Multi-Purpose Adhesive eliminates the need for multiple adhesive types on mixed-flooring projects. This single product bonds vinyl composition tile, luxury vinyl, rubber, linoleum, cork, and carpet with equal effectiveness. For installers managing projects with varied floor coverings across different zones, this simplifies inventory, reduces waste, and speeds up work.'
              },
              {
                title: 'Pressure-Sensitive Systems for Modular Flooring',
                content: 'For carpet tiles, luxury vinyl planks, and other modular flooring, Laticrete pressure-sensitive adhesives provide the repositionability installers need while maintaining permanent grab after placement. The tackifier remains active indefinitely, allowing tile replacement years later without new adhesive application. This is particularly valuable in office environments where carpet tiles need periodic rotation or replacement.'
              },
              {
                title: 'Healthcare and Clean Environment Solutions',
                content: 'Hospital corridors, operating rooms, and pharmaceutical facilities demand flooring that supports hygiene and infection control. Laticrete flooring adhesives with Microban antimicrobial protection inhibit bacteria and mold growth at the adhesive layer - where contamination can hide beneath floor coverings. Combined with seamless sheet vinyl welding, these systems support the cleanroom standards healthcare facilities require.'
              },
              {
                title: 'Fast-Track Commercial Installation',
                content: 'Retail renovations, hotel refurbishments, and office fit-outs often demand flooring installation on aggressive schedules. Laticrete rapid-setting adhesives and quick-cure primers reduce installation timelines significantly. Walk on floors in 4 hours instead of 24. Return to full service in 24-48 hours instead of 72. For businesses, this means less lost revenue from closures and faster returns on renovation investments.'
              },
              {
                title: 'Technical Support and Training',
                content: 'Every Laticrete flooring project comes with access to technical support from application specialists who understand UAE construction conditions. From moisture testing protocols to adhesive selection for specific floor coverings, support is available throughout your project. Lapiz Blue provides local training sessions, job site consultations, and troubleshooting assistance for contractors and specifiers throughout the Emirates.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Commercial office floor installation with carpet tiles and vinyl transitions', alt: 'Laticrete adhesive for commercial office flooring installation UAE' },
            { description: 'MVB moisture barrier application on concrete slab', alt: 'Laticrete MVB moisture vapor barrier system Dubai' },
            { description: 'Luxury vinyl plank installation in hospitality setting', alt: 'Laticrete LVP flooring adhesive hotel installation UAE' },
            { description: 'Healthcare sheet vinyl with welded seams', alt: 'Laticrete hospital flooring adhesive antimicrobial Dubai' },
            { description: 'Retail floor installation during fast-track renovation', alt: 'Laticrete rapid-cure flooring adhesive retail UAE' },
            { description: 'Moisture testing with calcium chloride kit on concrete', alt: 'MVER moisture testing Laticrete flooring systems Dubai' },
            { description: 'Trowel application of flooring adhesive showing notch pattern', alt: 'Laticrete flooring adhesive trowel application UAE' },
            { description: 'Completed commercial lobby with mixed flooring materials', alt: 'Laticrete complete flooring system commercial installation Dubai' }
          ]
        }
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
        content: {
          seoTitle: 'Weber Tile Adhesives & Grouts UAE | Saint-Gobain Solutions',
          h1: 'Weber Tile Adhesives and Grouts - European engineering excellence for UAE construction',
          intro: 'Weber brings 114 years of European tile fixing expertise to UAE construction projects. As a Saint-Gobain brand, Weber adhesives meet the strictest EN standards for performance classification, ensuring installers and specifiers know exactly what they are getting. The webercol range covers everything from basic ceramic installations to demanding large format porcelain and natural stone, while webercolor and weberepox grouts deliver lasting aesthetics in every environment. At Lapiz Blue, we supply the complete Weber tile fixing portfolio with technical guidance to match products to your project requirements.',
          whySection: {
            title: 'Why Weber Tile Adhesives and Grouts from Lapiz Blue?',
            bullets: [
              'Saint-Gobain heritage - 114 years of European construction material innovation backed by rigorous R&D',
              'EN12004 certified classifications - clear performance ratings (C2TE, C2TES1, C2TES2) eliminate guesswork in product selection',
              'S1/S2 deformability ratings - engineered flexibility for substrates with thermal movement and large format tiles',
              'Wide service temperature range - installations perform from -20°C to +70°C for UAE exterior applications',
              'weberepox easy epoxy grout - chemical and stain resistant with 12 color options for demanding environments',
              'Local UAE manufacturing and supply - consistent availability with technical support from Lapiz Blue'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Large format porcelain and gauged panels - webercol flex (C2TES2) provides maximum flexibility for tiles 60x120cm and larger',
              'Swimming pools and water features - weberepox easy resists pool chemicals, salt water, and permanent submersion',
              'Commercial high-traffic areas - webercol premium delivers durable bonds for malls, airports, and hospitality projects',
              'External facades and terraces - S1/S2 deformable adhesives accommodate thermal expansion in UAE climate',
              'Bathroom and wet area tiling - webercolor cementitious grouts with water-repellent properties',
              'Rapid turnaround projects - webercol premium F fast-setting adhesive enables grouting in hours, not days'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Weber System',
            bullets: [
              'Match EN classification to project needs - C2 for improved adhesives, T for reduced slip, E for extended open time, S1/S2 for deformability',
              'Select adhesive by tile size - webercol fix for standard tiles, webercol pro/premium for large format, webercol flex for extra-large panels',
              'Consider substrate movement - external applications and heated floors require S1 or S2 deformable adhesives',
              'Evaluate exposure conditions - permanent wet areas need webercol flex waterproof adhesive plus epoxy grout',
              'Check open time requirements - hot UAE conditions reduce open time; select E-rated adhesives for extended workability',
              'Choose grout type by environment - cementitious webercolor for standard areas, weberepox easy for chemical exposure',
              'Factor installation speed - webercol premium F enables same-day grouting for fast-track commercial projects'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Using C1 adhesives for porcelain - porcelain requires C2 improved adhesives; C1 bonds may fail under stress',
              'Ignoring deformability on external jobs - UAE thermal cycles demand S1 or S2 adhesives to prevent debonding',
              'Exceeding open time in hot conditions - ambient heat reduces open time dramatically; work in sections',
              'Using cementitious grout in pools - permanent water exposure requires epoxy grout; cementitious grouts will deteriorate',
              'Skipping primer on dusty substrates - weber primer ensures proper adhesive bond on concrete and screed surfaces'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Product Range', value: 'Complete Weber tile fixing portfolio - webercol adhesives (fix, pro, flex, premium), webercolor grouts, weberepox epoxy' },
              { label: 'Certifications', value: 'EN12004, EN12002, EN13888 certified with clear C2TE/S1/S2 classifications' },
              { label: 'Technical Support', value: 'Product selection guidance based on tile type, size, and installation environment' },
              { label: 'Documentation', value: 'Technical data sheets, system specifications, and application guides' },
              { label: 'UAE Coverage', value: 'Supply from Lapiz Blue branches in Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Project Support', value: 'BOQ assistance and specification writing for commercial tenders' }
            ]
          },
          faqs: [
            {
              question: 'What do Weber adhesive classifications like C2TES1 mean?',
              answer: 'EN12004 classifications describe adhesive performance: C = cementitious, 2 = improved adhesion, T = reduced slip, E = extended open time, S1 = deformable. So C2TES1 is an improved cementitious adhesive with reduced slip, extended open time, and deformability for substrates with movement.'
            },
            {
              question: 'Which Weber adhesive should I use for large format tiles?',
              answer: 'For tiles 60x60cm to 120x120cm, use webercol premium (C2TES1). For panels larger than 120x120cm or gauged porcelain, webercol flex (C2TES2) provides the highest deformability and coverage for proper support.'
            },
            {
              question: 'Can Weber adhesives handle UAE outdoor temperatures?',
              answer: 'Yes. Weber adhesives with S1 or S2 deformability ratings accommodate the thermal expansion typical of UAE external applications. Service temperature ranges from -20°C to +70°C, covering UAE climate extremes.'
            },
            {
              question: 'When should I use weberepox easy instead of cementitious grout?',
              answer: 'Use weberepox easy for swimming pools, commercial kitchens, food processing, laboratories, and anywhere with chemical exposure or aggressive cleaning. It is waterproof, stain-proof, and does not require sealing.'
            },
            {
              question: 'How do I choose between webercol pro, premium, and flex?',
              answer: 'webercol pro (C2TE) is the standard improved adhesive for most applications. webercol premium (C2TES1) adds deformability for external and large tile jobs. webercol flex (C2TES2) offers maximum flexibility for the most demanding applications.'
            },
            {
              question: 'Is webercol premium F faster than standard adhesives?',
              answer: 'Yes. webercol premium F is a rapid-setting variant that allows grouting within 4-6 hours instead of 24 hours. It maintains the same C2TES1 performance as standard premium while dramatically reducing project timelines.'
            },
            {
              question: 'Do Weber products work on heated floor systems?',
              answer: 'Yes. Use S1 or S2 deformable adhesives like webercol premium or webercol flex for heated floor installations. The system must be commissioned and cycled before tiling, and flexible grout should be used at perimeters.'
            },
            {
              question: 'What colors are available in weberepox easy epoxy grout?',
              answer: 'weberepox easy is available in 12 colors covering popular UAE specifications including white, grey, beige, and darker tones. Custom color matching may be available for large commercial projects.'
            }
          ],
          cta: {
            title: 'Need help selecting the right Weber tile system?',
            subtitle: 'Contact us with your tile details and installation requirements - we will recommend the appropriate Weber adhesive and grout combination. For project specifications, share your BOQ and we will provide technical documentation and pricing.',
            checklist: [
              'Tile type and size (ceramic, porcelain, natural stone)',
              'Installation area (internal, external, wet area, pool)',
              'Substrate type and condition',
              'Project timeline requirements',
              'Grout color preference',
              'Quantity needed (coverage area in sqm)'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Saint-Gobain Weber Heritage',
                content: 'Weber is a Saint-Gobain brand with 114 years of experience developing tile fixing and facade systems across Europe and worldwide. This heritage means rigorous research and development, consistent manufacturing standards, and products tested across diverse climates and applications. In the UAE, Weber systems bring European precision to regional construction demands.'
              },
              {
                title: 'Understanding EN12004 Classifications',
                content: 'Weber adhesives carry EN12004 classifications that precisely describe their performance. C indicates cementitious composition. 1 or 2 indicates normal or improved adhesion. T means reduced slip (thixotropic). E indicates extended open time for hot conditions. S1 or S2 indicates deformability levels for substrate movement. These clear classifications help specifiers match products to requirements without ambiguity.'
              },
              {
                title: 'webercol Adhesive Range',
                content: 'The webercol range covers every tile fixing scenario. webercol fix handles basic ceramic installations. webercol pro delivers improved C2TE performance for porcelain and larger tiles. webercol premium adds S1 deformability for external work and heated floors. webercol flex provides maximum S2 flexibility for the most demanding large-format and facade applications. webercol premium F offers rapid-setting for fast-track projects.'
              },
              {
                title: 'Large Format and Facade Solutions',
                content: 'Modern architecture increasingly specifies large format tiles and thin porcelain panels for walls and facades. Weber S2 adhesives like webercol flex provide the deformability these applications demand. Proper back-buttering combined with notched trowel application achieves full coverage, eliminating voids that cause cracking and debonding over time.'
              },
              {
                title: 'weberepox Epoxy Grout Systems',
                content: 'For environments where cementitious grouts cannot perform, weberepox easy delivers waterproof, stain-resistant joints. Swimming pools, commercial kitchens, hospitals, and industrial facilities benefit from epoxy grout that resists chemicals, bacteria, and aggressive cleaning. Available in 12 colors, weberepox easy installs like traditional grout but performs like epoxy.'
              },
              {
                title: 'webercolor Cementitious Grouts',
                content: 'For standard residential and commercial applications, webercolor cementitious grouts provide reliable performance at economical cost. Polymer-modified formulations improve flexibility and water resistance compared to basic grouts. The webercolor range covers joint widths from 1mm to 20mm with consistent color matching across batches.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Weber tile fixing range from Lapiz Blue includes: webercol fix (C1T basic), webercol pro (C2TE improved), webercol premium (C2TES1 deformable), webercol premium F (C2TES1 rapid), webercol flex (C2TES2 highly deformable), webercolor fine cementitious grout, webercolor premium polymer grout, and weberepox easy epoxy grout and adhesive.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Large format porcelain tile installation on external facade', alt: 'Weber webercol flex adhesive for large format facade tiles UAE' },
            { description: 'EN12004 certification label showing C2TES1 classification', alt: 'Weber EN12004 certified tile adhesive classification' },
            { description: 'weberepox easy epoxy grout application in swimming pool', alt: 'Weber epoxy grout for swimming pool tiling Dubai' },
            { description: 'Notched trowel adhesive application showing coverage pattern', alt: 'Weber tile adhesive application technique UAE' },
            { description: 'Commercial lobby floor tiling with large porcelain tiles', alt: 'Weber adhesive for commercial floor tiling projects' },
            { description: 'webercolor grout application showing joint filling', alt: 'Weber grout application for tile joints Dubai' },
            { description: 'External terrace tiling with S2 deformable adhesive', alt: 'Weber deformable adhesive for external tiles UAE' },
            { description: 'Color range display of weberepox easy options', alt: 'Weber epoxy grout color options available in UAE' }
          ]
        }
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Flexible waterproofing membranes and liquid-applied systems.',
        metaDescription: 'Weber waterproofing UAE - Flexible membranes and liquid waterproofing for bathrooms, terraces, and basements in Dubai.',
        images: ['/images/brands/weber/waterproofing.jpg'],
        content: {
          seoTitle: 'Weber Waterproofing Systems UAE | 50+ Year Protection',
          h1: 'Weber Waterproofing - Engineered for 50+ years of protection',
          intro: 'Weber waterproofing systems deliver documented longevity that sets the standard for UAE construction. The weberdry range combines polymer-modified cementitious membranes and polyurethane liquid systems to address every waterproofing challenge from bathroom wet areas to potable water tanks. With weberdry 110 FX offering a tested useful life expectancy exceeding 50 years, these systems represent long-term value rather than short-term savings. Lapiz Blue supplies the complete Weber waterproofing portfolio with technical guidance for substrate preparation, system selection, and proper application methods.',
          whySection: {
            title: 'Why Weber Waterproofing from Lapiz Blue?',
            bullets: [
              '50+ year useful life expectancy - weberdry 110 FX documented performance for genuine long-term waterproofing',
              'Potable water tank certification - approved for drinking water reservoirs, cisterns, and water storage facilities',
              'Dual pressure resistance - handles both positive and negative hydrostatic pressure for versatile applications',
              'Low VOC formulations - weberdry products contain less than 10 g/l VOC for healthier indoor application',
              'Crack-bridging capability - elastomeric membranes accommodate substrate movement without failure',
              'Multiple application methods - brush, roller, or spray application for efficient coverage on any project size'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Potable water tanks and reservoirs - weberdry 110 FX certification for safe drinking water storage',
              'Basement tanking and below-grade walls - negative pressure resistance keeps groundwater out',
              'Bathroom and wet room waterproofing - seamless membrane under tiles prevents moisture migration',
              'Swimming pools and water features - continuous barrier for permanent water contact',
              'Terraces and balconies - flexible membrane handles thermal movement and ponding water',
              'Canal linings and tunnels - industrial-grade protection for infrastructure projects'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Weber Waterproofing System',
            bullets: [
              'Identify water pressure direction - positive pressure (water pushing against membrane) vs negative pressure (water behind membrane) determines product selection',
              'Check potable water requirements - only certified products like weberdry 110 FX should contact drinking water',
              'Evaluate substrate condition - cementitious products bond to concrete; polyurethane handles varied substrates',
              'Consider crack movement - static cracks need different treatment than active movement joints',
              'Assess application access - spray systems cover large areas efficiently; brush/roller for detail work',
              'Factor UV exposure - exposed applications need UV-stable topcoats or covering',
              'Match system to tile finish - cementitious waterproofing under tiles, liquid membranes for exposed applications'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Applying over damp substrates - most waterproofing requires dry surfaces; check moisture content before application',
              'Insufficient thickness - thin spots fail first; maintain specified wet film thickness throughout',
              'Skipping reinforcement at corners - internal corners and pipe penetrations need fabric reinforcement',
              'Rushing between coats - allow proper cure time between layers for full membrane development',
              'Using non-certified products for water tanks - potable water contact requires specific certifications'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Documented Life', value: 'weberdry 110 FX: 50+ year tested useful life expectancy' },
              { label: 'Certifications', value: 'Potable water approved, low VOC (<10 g/l), EN standards compliant' },
              { label: 'Pressure Rating', value: 'Positive and negative hydrostatic pressure resistance' },
              { label: 'Technical Support', value: 'System selection and substrate preparation guidance' },
              { label: 'UAE Coverage', value: 'Lapiz Blue supply from Dubai, Abu Dhabi, and Sharjah' },
              { label: 'Application Training', value: 'Contractor training and job site support available' }
            ]
          },
          faqs: [
            {
              question: 'What does 50+ year life expectancy mean for weberdry 110 FX?',
              answer: 'Weber documents that weberdry 110 FX has a tested useful life expectancy exceeding 50 years under normal service conditions. This is based on accelerated aging tests and real-world performance data from installations across various climates and applications.'
            },
            {
              question: 'Can weberdry products be used for drinking water tanks?',
              answer: 'Yes. weberdry 110 FX is certified for contact with potable water, making it suitable for drinking water tanks, reservoirs, cisterns, and water supply infrastructure. Always verify certification requirements for your specific application.'
            },
            {
              question: 'What is the difference between weberdry 110 FX and weberdry 350 PU?',
              answer: 'weberdry 110 FX is a two-component polymer-modified cementitious coating ideal for concrete substrates, potable water, and below-grade applications. weberdry 350 PU is a single-component polyurethane membrane that bonds to varied substrates and is excellent for roofs and exposed applications.'
            },
            {
              question: 'How do Weber waterproofing products handle negative water pressure?',
              answer: 'weberdry 110 FX can resist both positive and negative hydrostatic pressure. This means it works for tanking applications where groundwater pushes against basement walls from outside, keeping moisture out of the structure.'
            },
            {
              question: 'Is fabric reinforcement required for Weber waterproofing?',
              answer: 'Fabric reinforcement is required at internal corners, external corners, pipe penetrations, and crack locations. For general field areas on stable substrates, weberdry can be applied without fabric, but corners and details always need reinforcement.'
            },
            {
              question: 'Can I tile directly over weberdry 110 FX?',
              answer: 'Yes. weberdry 110 FX provides an excellent bonding surface for tile adhesives. Allow the membrane to cure fully (typically 24-48 hours depending on conditions) before applying tile adhesive. Use compatible Weber adhesives for best results.'
            },
            {
              question: 'How does low VOC benefit waterproofing applications?',
              answer: 'Low VOC (less than 10 g/l in weberdry products) means safer application in enclosed spaces like basements, bathrooms, and occupied buildings. Applicators experience less exposure to fumes, and there is minimal odor during and after installation.'
            },
            {
              question: 'What substrate preparation is needed before waterproofing?',
              answer: 'Substrates must be clean, sound, and free from oil, dust, and loose material. Concrete should be fully cured. Surface defects and honeycombing must be repaired. weber.rep repair mortars can address substrate damage before waterproofing application.'
            }
          ],
          cta: {
            title: 'Need a waterproofing solution for your project?',
            subtitle: 'Contact us with your project details and we will recommend the appropriate Weber waterproofing system. For specifications and technical data, our team provides documentation support for architects and contractors.',
            checklist: [
              'Application area (bathroom, basement, tank, terrace)',
              'Substrate type and condition',
              'Water pressure direction (positive or negative)',
              'Potable water contact requirements',
              'Finish requirement (tiled or exposed)',
              'Project size and timeline'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Documented Long-Term Performance',
                content: 'Unlike products that simply claim durability, Weber documents specific useful life expectancy based on testing and field performance. weberdry 110 FX carries a documented 50+ year useful life expectancy, providing genuine confidence in long-term waterproofing performance. This documentation supports lifecycle cost analysis for building owners and developers.'
              },
              {
                title: 'weberdry 110 FX Cementitious System',
                content: 'weberdry 110 FX is a two-component polymer-modified cementitious coating consisting of powder and liquid components. When mixed and applied, it cures to form an elastomeric, waterproof membrane that bonds permanently to concrete and masonry substrates. The system handles both positive and negative hydrostatic pressure, making it versatile for tanking, wet areas, and water storage.'
              },
              {
                title: 'Potable Water Certification',
                content: 'Many waterproofing products cannot safely contact drinking water due to leaching or contamination concerns. weberdry 110 FX carries specific certification for potable water contact, making it suitable for drinking water tanks, reservoirs, and water supply infrastructure where other products would be prohibited.'
              },
              {
                title: 'weberdry 350 PU Polyurethane System',
                content: 'For applications requiring adhesion to varied substrates or exposed membrane systems, weberdry 350 PU delivers single-component convenience. This polyurethane liquid membrane applies by brush, roller, or spray, curing to form a continuous waterproof barrier. It bonds to concrete, metal, bitumen membranes, and acrylic paints.'
              },
              {
                title: 'Low VOC for Indoor Safety',
                content: 'Weber waterproofing products contain less than 10 g/l VOC, significantly below many competing products. This low emission formulation enables safer application in basements, bathrooms, and other enclosed spaces. For projects in occupied buildings or with indoor air quality requirements, Weber products meet stringent environmental standards.'
              },
              {
                title: 'Crack-Bridging and Movement Accommodation',
                content: 'Building substrates move due to thermal expansion, settlement, and structural loading. Weber waterproofing membranes incorporate elastomeric properties that bridge existing cracks and accommodate future movement without failure. This flexibility is essential for long-term waterproofing performance in the UAE climate.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Weber waterproofing range from Lapiz Blue includes: weberdry 110 FX (cementitious, potable water approved, 50+ year life), weberdry 110 FX-HE (high elasticity variant), weberdry 350 PU (polyurethane liquid membrane), weber joint seal PU (polyurethane sealant), and associated primers and fabric reinforcement materials.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Potable water tank interior with weberdry 110 FX coating', alt: 'Weber waterproofing for potable water tanks UAE' },
            { description: 'Basement tanking application showing negative pressure protection', alt: 'Weber basement waterproofing Dubai' },
            { description: 'Bathroom wet area waterproofing before tile installation', alt: 'Weber bathroom waterproofing membrane UAE' },
            { description: 'Swimming pool waterproofing application', alt: 'Weber waterproofing for swimming pools Dubai' },
            { description: 'Terrace waterproofing with fabric reinforcement at corners', alt: 'Weber terrace waterproofing system UAE' },
            { description: 'Roller application of liquid waterproofing membrane', alt: 'Weber liquid waterproofing application technique' },
            { description: 'Detail treatment at pipe penetration with reinforcement', alt: 'Weber waterproofing detail at pipe penetrations' },
            { description: 'Completed waterproofing membrane ready for tiling', alt: 'Weber waterproofing membrane cured and ready for tiles Dubai' }
          ]
        }
      },
      {
        slug: 'repair-and-anchoring',
        name: 'Repair and Anchoring',
        description: 'Concrete repair mortars and structural strengthening solutions.',
        metaDescription: 'Weber repair mortars UAE - Concrete repair, structural strengthening, and anchoring systems for UAE infrastructure.',
        images: ['/images/brands/weber/repair.jpg'],
        content: {
          seoTitle: 'Weber Concrete Repair & Anchoring UAE | Infrastructure Solutions',
          h1: 'Weber Repair and Anchoring - Restoring structural integrity across UAE',
          intro: 'Weber repair and anchoring systems address the concrete deterioration and structural challenges common in UAE infrastructure. From patch repairs on parking structures to full structural rehabilitation of bridges and buildings, the weberep range delivers proven performance backed by Saint-Gobain engineering. These mortars resist the chemical exposures, thermal stresses, and corrosion conditions specific to Gulf construction. Lapiz Blue supplies the complete Weber repair portfolio with technical support for damage assessment, product selection, and application specifications.',
          whySection: {
            title: 'Why Weber Repair and Anchoring from Lapiz Blue?',
            bullets: [
              'Chemical resistance - weberep mortars resist petroleum, oil, grease, acids, alkalis, solvents, and salt water',
              'Non-shrink formulations - weberep ST and weberep 311 MC deliver shrinkage-compensated repairs that stay bonded',
              'Fast-setting options - weberep epo 410 epoxy mortar enables rapid return to service for critical infrastructure',
              'Fiber-reinforced products - enhanced crack resistance for structural repairs under dynamic loading',
              'Ready-to-use convenience - weberep ST mixes with water only, reducing batching errors on site',
              '58 specialized products - Weber offers the largest technical repair portfolio for any UAE project requirement'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Concrete spalling and delamination repair - restore damaged facades, columns, and structural elements',
              'Exposed reinforcement treatment - corrosion protection and cover restoration on deteriorated concrete',
              'Structural void filling - weberep 311 MC micro-concrete for large section repairs and void grouting',
              'Anchor and dowel grouting - secure mechanical fixings with non-shrink cementitious or epoxy grouts',
              'Industrial floor repair - chemical-resistant repairs for manufacturing, warehouses, and processing facilities',
              'Marine and coastal structure rehabilitation - salt-resistant formulations for corrosive environments'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Weber Repair System',
            bullets: [
              'Assess damage depth - shallow repairs (under 25mm) use different products than deep section repairs',
              'Identify chemical exposure - petroleum, acids, or salt environments need weberep epo 410 epoxy mortar',
              'Consider structural loading - load-bearing repairs require fiber-reinforced or micro-concrete products',
              'Evaluate setting time needs - critical infrastructure may need fast-setting products for rapid return to service',
              'Check substrate bonding - cementitious mortars bond to concrete; epoxies bond to concrete, steel, and masonry',
              'Factor application method - hand-applied mortars versus pumpable grouts for different access conditions',
              'Match compressive strength - repair mortar strength should match or exceed parent concrete'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Insufficient substrate preparation - contaminated or unsound concrete causes bond failure; proper cleaning is essential',
              'Ignoring reinforcement corrosion - repairing concrete over corroding steel leads to repeat failure; treat steel first',
              'Wrong mortar for chemical exposure - standard cementitious mortars fail in petroleum or acid environments',
              'Mixing too much material - repair mortars have limited working time; mix only what can be applied within pot life',
              'Skipping primer on steel - exposed reinforcement needs corrosion-inhibiting primer before concrete repair'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Product Range', value: '58 technical repair mortars for every concrete restoration scenario' },
              { label: 'Chemical Resistance', value: 'weberep epo 410 resists petroleum, acids, alkalis, solvents, salt' },
              { label: 'Non-Shrink Performance', value: 'Shrinkage-compensated formulations for permanent bonded repairs' },
              { label: 'Fiber Reinforcement', value: 'Crack-resistant mortars for structural and dynamic loading' },
              { label: 'Technical Support', value: 'Damage assessment and repair specification assistance' },
              { label: 'UAE Coverage', value: 'Lapiz Blue supply from Dubai, Abu Dhabi, and Sharjah' }
            ]
          },
          faqs: [
            {
              question: 'What makes weberep epo 410 different from cementitious repair mortars?',
              answer: 'weberep epo 410 is a three-component fast-setting epoxy mortar with exceptional chemical resistance. It resists petroleum, oil, grease, acids, alkalis, solvents, and salt water where cementitious mortars would deteriorate. It also bonds to steel, concrete, and bricks with high adhesion.'
            },
            {
              question: 'How do I repair concrete with exposed rusting reinforcement?',
              answer: 'First, remove concrete around the steel to expose clean metal. Clean the reinforcement of rust by mechanical or chemical means. Apply weber corrosion-inhibiting primer. Then apply weberep repair mortar in layers, allowing each layer to set before the next. The repair restores both structural integrity and corrosion protection.'
            },
            {
              question: 'What is the difference between repair mortar and micro-concrete?',
              answer: 'Repair mortars like weberep ST are fine-aggregate products for surface repairs up to 50mm deep per layer. Micro-concrete like weberep 311 MC contains coarse aggregate for deep section repairs and void filling, suitable for repairs from 50mm to 100mm+ per pour.'
            },
            {
              question: 'Can Weber repair products be used for anchoring applications?',
              answer: 'Yes. Weber offers both cementitious and epoxy anchoring grouts. Cementitious grouts suit static anchors in dry conditions. Epoxy grouts like weberep epo 410 provide higher strength and chemical resistance for demanding anchor applications.'
            },
            {
              question: 'How long before repaired concrete can take load?',
              answer: 'Setting times vary by product and conditions. weberep ST achieves working strength in 24 hours for light loads. weberep epo 410 epoxy mortar sets rapidly for fast return to service. Consult technical data sheets for specific loading requirements and cure times.'
            },
            {
              question: 'Are Weber repair products suitable for UAE marine environments?',
              answer: 'Yes. Weber repair mortars include formulations resistant to chloride ingress and salt water exposure. weberep epo 410 specifically resists salt water for marine and coastal structure rehabilitation. Proper product selection is essential for corrosive environments.'
            },
            {
              question: 'What substrate preparation is required for concrete repair?',
              answer: 'Remove all loose, contaminated, and unsound concrete. Expose corroded reinforcement and treat appropriately. Clean surfaces with high-pressure water or mechanical methods. Apply bonding primer if specified. The prepared surface should be clean, sound, and at appropriate moisture content.'
            },
            {
              question: 'Can I apply Weber repair mortars overhead or on vertical surfaces?',
              answer: 'Yes. weberep ST and other thixotropic mortars are designed for overhead and vertical application without slumping. Application thickness per layer is typically limited to 25-50mm. For deeper repairs, apply multiple layers, allowing each to set before the next.'
            }
          ],
          cta: {
            title: 'Need concrete repair or anchoring solutions?',
            subtitle: 'Contact us with details about your concrete damage or anchoring requirements. Our technical team can recommend appropriate Weber products and provide specification support for structural repairs.',
            checklist: [
              'Type of damage (spalling, cracking, corrosion, voids)',
              'Repair depth and area',
              'Chemical exposure conditions',
              'Structural loading requirements',
              'Access conditions (horizontal, vertical, overhead)',
              'Timeline for return to service'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Concrete Deterioration in UAE Conditions',
                content: 'UAE structures face aggressive conditions that accelerate concrete deterioration. High temperatures, humidity cycling, chloride exposure from coastal air, and carbonation all contribute to reinforcement corrosion and concrete damage. Weber repair systems are formulated to address these specific challenges, providing durable repairs that resist the environmental factors that caused original damage.'
              },
              {
                title: 'weberep ST Ready-to-Use Mortar',
                content: 'weberep ST is a ready-to-use mortar made of sand, special cement, fibers, and additives. Simply add water and mix to achieve non-shrinking, high-strength, high-adhesion repair mortar. The convenience of single-bag mixing eliminates batching errors and ensures consistent performance across large repair projects.'
              },
              {
                title: 'weberep epo 410 Epoxy Mortar',
                content: 'For environments where cementitious mortars cannot survive, weberep epo 410 delivers three-component fast-setting epoxy performance. This mortar adheres to concrete, iron, and bricks with exceptional bond strength. Chemical resistance extends to petroleum products, oils, greases, acids, alkalis, solvents, and salt water.'
              },
              {
                title: 'weberep 311 MC Micro-Concrete',
                content: 'weberep 311 MC is a non-shrink micro-concrete for structural repairs and void filling requiring significant depth. The coarse aggregate formulation suits repairs from 50mm deep through full section replacement. Pumpable consistency enables efficient placement in confined spaces and complex geometry.'
              },
              {
                title: 'Reinforcement Protection',
                content: 'Successful concrete repair requires addressing reinforcement corrosion, not just cosmetic damage. Weber systems include corrosion-inhibiting primers that protect exposed steel before concrete cover is restored. This integrated approach prevents repeat failure by addressing the root cause of concrete deterioration.'
              },
              {
                title: 'Structural vs. Cosmetic Repair',
                content: 'Not all concrete damage requires structural repair, and applying the wrong system wastes money or creates risk. Weber offers products spanning cosmetic resurfacing to structural load-bearing repairs. Proper damage assessment determines whether surface treatments, standard mortars, or reinforced micro-concrete is appropriate.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Weber repair and anchoring range from Lapiz Blue includes: weberep ST (ready-mix repair mortar), weberep epo 410 (three-component epoxy mortar), weberep 311 MC (non-shrink micro-concrete), weber bonding primers, weber reinforcement protection coatings, and cementitious and epoxy anchoring grouts. Over 58 products address the full spectrum of concrete repair requirements.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Concrete spalling repair on building facade showing preparation', alt: 'Weber concrete spalling repair UAE' },
            { description: 'Exposed reinforcement treatment with primer application', alt: 'Weber reinforcement corrosion protection Dubai' },
            { description: 'weberep repair mortar application on vertical surface', alt: 'Weber vertical concrete repair mortar application' },
            { description: 'Structural column repair with micro-concrete', alt: 'Weber micro-concrete structural repair UAE' },
            { description: 'Anchor grouting in concrete with epoxy system', alt: 'Weber epoxy anchor grouting Dubai' },
            { description: 'Industrial floor repair with chemical-resistant mortar', alt: 'Weber industrial floor concrete repair UAE' },
            { description: 'Marine structure repair showing salt-resistant materials', alt: 'Weber marine concrete repair coastal Dubai' },
            { description: 'Completed repair showing restored concrete surface', alt: 'Weber concrete repair completed finish UAE' }
          ]
        }
      },
      {
        slug: 'self-leveling-and-microcement',
        name: 'Self Leveling and Microcement',
        description: 'Floor leveling compounds and decorative microcement finishes.',
        metaDescription: 'Weber self-leveling UAE - Floor screeds and microcement for seamless finishes in Dubai residential and commercial projects.',
        images: ['/images/brands/weber/self-leveling.jpg'],
        content: {
          seoTitle: 'Weber Self-Leveling & Microcement UAE | Fast Floor Solutions',
          h1: 'Weber Self-Leveling and Microcement - Rapid floor preparation and decorative finishes',
          intro: 'Weber flooring systems deliver fast, flat substrates and stunning decorative finishes for UAE residential and commercial projects. The weberfloor range includes self-leveling compounds that accept light traffic in 3-4 hours and floor coverings in just 24 hours, dramatically reducing project timelines. For exposed decorative floors, microcement creates seamless industrial-aesthetic surfaces in any color. Lapiz Blue supplies the complete Weber flooring portfolio with technical guidance for thickness selection, substrate preparation, and finish specification.',
          whySection: {
            title: 'Why Weber Self-Leveling and Microcement from Lapiz Blue?',
            bullets: [
              'Rapid drying - weberfloor 525 FD accepts light traffic in 3-4 hours, floor coverings in 24 hours',
              'Fiber-reinforced formulations - weberfloor 600 SCR screed includes fibers for enhanced crack resistance',
              'Wide thickness range - products covering 2mm smoothing through 50mm thick leveling in single application',
              'Ready-mixed convenience - weberfloor 600 SCR simply adds water, eliminating site batching errors',
              'Decorative microcement - seamless, colored finishes for contemporary residential and commercial interiors',
              '29 specialized products - Weber offers complete flooring preparation systems for any substrate challenge'
            ]
          },
          applications: {
            title: 'Applications and Best-Fit Scenarios',
            items: [
              'Fast-track commercial projects - weberfloor 525 FD enables floor coverings 24 hours after leveling',
              'Residential floor preparation - smooth substrates for vinyl, laminate, carpet, and tile installation',
              'Office and retail interiors - rapid installation minimizes business disruption during renovation',
              'Decorative exposed floors - microcement provides seamless industrial aesthetic without joints',
              'Uneven substrate correction - fill and level differences from 2mm to 30mm in single application',
              'Underfloor heating systems - compatible screeds that work with electric and hydronic heating'
            ]
          },
          howToChoose: {
            title: 'How to Choose the Right Weber Flooring System',
            bullets: [
              'Measure thickness requirements - weberfloor 525 FD handles 2-30mm, weberfloor 600 SCR handles up to 50mm per layer',
              'Identify floor covering type - vinyl and carpet need finer smoothing than tile; select appropriate product',
              'Consider drying time constraints - fast-track projects need weberfloor 525 FD rapid-drying compound',
              'Check substrate compatibility - absorbent substrates need primer; non-absorbent substrates need bonding agent',
              'Evaluate traffic requirements - high-traffic areas need products with superior compressive strength',
              'Factor underfloor heating - heated floors require specific products rated for thermal cycling',
              'Consider exposed finish - decorative microcement for visible surfaces, standard compounds under coverings'
            ]
          },
          commonMistakes: {
            title: 'Common Mistakes to Avoid',
            bullets: [
              'Skipping primer on absorbent substrates - unprimed concrete absorbs moisture from compound, causing defects',
              'Applying too thick in single layer - exceeding maximum layer thickness causes cracking and slow cure',
              'Installing floor coverings too soon - even fast-drying compounds need minimum cure time before covering',
              'Ignoring substrate moisture - high moisture content prevents proper compound cure and causes failures',
              'Mixing too much material - self-leveling compounds have limited working time; mix in manageable batches'
            ]
          },
          trustSignals: {
            title: 'What You Can Expect',
            items: [
              { label: 'Drying Speed', value: 'Light traffic 3-4 hours, floor coverings 24 hours (weberfloor 525 FD)' },
              { label: 'Thickness Range', value: '2mm smoothing to 50mm leveling depending on product' },
              { label: 'Product Range', value: '29 self-leveling compounds and screeds for all applications' },
              { label: 'Fiber Reinforcement', value: 'weberfloor 600 SCR includes fibers for crack resistance' },
              { label: 'Technical Support', value: 'Substrate assessment and product selection guidance' },
              { label: 'UAE Coverage', value: 'Lapiz Blue supply from Dubai, Abu Dhabi, and Sharjah' }
            ]
          },
          faqs: [
            {
              question: 'How quickly can I install floor coverings over Weber self-leveling compounds?',
              answer: 'weberfloor 525 FD allows floor covering installation after just 24 hours under standard conditions. This fast-drying compound enables rapid project turnaround compared to traditional screeds that may need days or weeks before covering.'
            },
            {
              question: 'What is the maximum thickness for Weber self-leveling in one application?',
              answer: 'weberfloor 525 FD handles 2-30mm in single application. For greater depths, weberfloor 600 SCR handles up to 50mm per layer. For very deep fills, apply multiple layers, allowing each to cure before the next.'
            },
            {
              question: 'Can Weber self-leveling products be used over underfloor heating?',
              answer: 'Yes. Weber offers products compatible with electric and hydronic underfloor heating systems. The heating system must be commissioned and tested before leveling. Follow specific guidelines for heating system turn-on after compound installation.'
            },
            {
              question: 'What is the difference between self-leveling compound and screed?',
              answer: 'Self-leveling compounds like weberfloor 525 FD are fluid and find their own level for smooth surfaces, typically 2-30mm thick. Screeds like weberfloor 600 SCR are stiffer, fiber-reinforced materials for thicker applications up to 50mm, requiring some troweling.'
            },
            {
              question: 'Do I need to prime the substrate before self-leveling?',
              answer: 'Generally yes. Absorbent substrates like concrete and screed need primer to prevent moisture absorption from the compound. Non-absorbent substrates like tiles need bonding agent for adhesion. Always follow product-specific priming requirements.'
            },
            {
              question: 'Can Weber microcement be used for bathrooms and wet areas?',
              answer: 'Microcement can be used in bathrooms with appropriate sealing. The decorative layer itself is not waterproof, so proper sealing with compatible sealers is essential for wet area durability. Consult technical support for wet area specifications.'
            },
            {
              question: 'How does fiber reinforcement benefit screeds?',
              answer: 'Fiber reinforcement in weberfloor 600 SCR provides crack resistance and reduces shrinkage cracking during cure. This is particularly valuable for larger floor areas and applications where the screed experiences thermal movement from heating systems.'
            },
            {
              question: 'What substrate preparation is needed before self-leveling?',
              answer: 'Substrates must be clean, sound, and free from dust, oil, and loose material. Cracks should be repaired. Moisture testing determines if the substrate is ready. Apply appropriate primer for substrate type. Poor preparation causes compound failure.'
            }
          ],
          cta: {
            title: 'Need floor leveling or decorative microcement?',
            subtitle: 'Contact us with your floor preparation requirements and we will recommend the appropriate Weber system. For specifications and technical data, our team provides documentation support for contractors and specifiers.',
            checklist: [
              'Floor area and current condition',
              'Required leveling thickness',
              'Final floor covering type',
              'Project timeline constraints',
              'Underfloor heating presence',
              'Decorative finish requirements'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Fast-Track Floor Preparation',
                content: 'Traditional screeds require days or weeks of drying before floor coverings can be installed. Weber self-leveling compounds dramatically compress this timeline. weberfloor 525 FD accepts light traffic in just 3-4 hours and floor coverings in 24 hours, enabling rapid project completion for commercial fit-outs and renovations where time is money.'
              },
              {
                title: 'weberfloor 525 FD Premium Compound',
                content: 'weberfloor 525 FD is a fast-drying, low-shrinking, self-leveling cementitious underlayment for internal floors. It smooths and levels differences from 2mm to 30mm on new or existing substrates. The fluid consistency finds its own level, creating flat surfaces ready for vinyl, laminate, carpet, or tile installation.'
              },
              {
                title: 'weberfloor 600 SCR Fiber Screed',
                content: 'weberfloor 600 SCR is a ready-mixed cementitious screed containing selected aggregates, additives, and fiber reinforcement. Simply add water on site for consistent performance. Maximum application thickness is 50mm per layer. Fiber reinforcement provides enhanced crack resistance for larger floor areas.'
              },
              {
                title: 'Substrate Compatibility',
                content: 'Weber flooring products work over concrete, sand-cement screeds, existing tiles, and other sound substrates. Proper priming ensures adhesion and prevents moisture migration. Non-absorbent substrates require bonding agents. Absorbent substrates need sealing primers. Always test substrate moisture before application.'
              },
              {
                title: 'Decorative Microcement Finishes',
                content: 'For exposed decorative floors, microcement creates seamless, joint-free surfaces with contemporary industrial aesthetic. Available in multiple colors and textures, microcement transforms concrete and existing floors into design features. Proper sealing protects the finish in residential and commercial environments.'
              },
              {
                title: 'Underfloor Heating Compatibility',
                content: 'Weber flooring products include options compatible with electric and hydronic underfloor heating systems. The heating must be commissioned and cycled before leveling compound application. Gradual temperature increase after installation prevents thermal shock. Follow product-specific guidelines for heated floor applications.'
              },
              {
                title: 'Product Range Overview',
                content: 'The Weber flooring range from Lapiz Blue includes: weberfloor 525 FD (fast-drying self-leveling, 2-30mm), weberfloor 600 SCR (fiber-reinforced screed, up to 50mm), weberfloor easy 625 (premium self-leveling), weber primers for absorbent substrates, weber bonding agents for non-absorbent substrates, and microcement decorative systems.'
              }
            ]
          },
          suggestedImages: [
            { description: 'Self-leveling compound flowing and finding level on floor', alt: 'Weber self-leveling compound application UAE' },
            { description: 'Rapid installation timeline showing 24-hour readiness', alt: 'Weber fast-drying floor compound Dubai' },
            { description: 'Fiber-reinforced screed application with pump', alt: 'Weber fiber screed floor leveling UAE' },
            { description: 'Decorative microcement floor in modern residential interior', alt: 'Weber microcement decorative floor Dubai' },
            { description: 'Floor preparation over underfloor heating system', alt: 'Weber self-leveling over underfloor heating UAE' },
            { description: 'Commercial office floor leveling during renovation', alt: 'Weber commercial floor leveling Dubai' },
            { description: 'Primer application on absorbent concrete substrate', alt: 'Weber floor primer substrate preparation UAE' },
            { description: 'Completed smooth floor ready for covering installation', alt: 'Weber leveled floor ready for vinyl carpet tiles Dubai' }
          ]
        }
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
            { description: 'Biogel gel adhesive application showing smooth workability', alt: 'Kerakoll Biogel gel tile adhesive application UAE' },
            { description: 'Fugalite Bio grout in contemporary bathroom installation', alt: 'Kerakoll Fugalite Bio hypoallergenic grout Dubai bathroom' },
            { description: 'Commercial kitchen tiling with HACCP compliant grout', alt: 'Kerakoll food hygiene compliant grout commercial kitchen UAE' },
            { description: 'Large format tile installation with Biogel No Limits', alt: 'Kerakoll Biogel No Limits large format tiles Dubai' },
            { description: 'Swimming pool tiling with chlorine-resistant grout', alt: 'Kerakoll Fugalite Bio swimming pool grout UAE' },
            { description: 'Natural stone installation with eco-friendly adhesive', alt: 'Kerakoll eco-friendly natural stone adhesive Dubai' },
            { description: 'Fugalite Bio color range showing 23 shade options', alt: 'Kerakoll Fugalite Bio grout colors UAE' },
            { description: 'Renovation tiling over existing ceramic with gel adhesive', alt: 'Kerakoll overlay tiling renovation Dubai' }
          ]
        }
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Eco-friendly waterproofing membranes and systems.',
        metaDescription: 'Kerakoll waterproofing UAE - Sustainable waterproofing solutions for green buildings in Dubai and UAE.',
        images: ['/images/brands/kerakoll/waterproofing.jpg'],
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
            { description: 'Aquastop Nanoflex application on swimming pool substrate', alt: 'Kerakoll Aquastop Nanoflex swimming pool waterproofing UAE' },
            { description: 'Breathable membrane allowing vapor transmission', alt: 'Kerakoll breathable waterproofing membrane Dubai' },
            { description: 'Terrace waterproofing with Aquastop Flex system', alt: 'Kerakoll Aquastop Flex terrace waterproofing UAE' },
            { description: 'Bathroom waterproofing before tile installation', alt: 'Kerakoll bathroom waterproofing membrane Dubai' },
            { description: 'Application over existing ceramic tiles renovation', alt: 'Kerakoll waterproofing overlay renovation UAE' },
            { description: 'Aquastop Green on cracked substrate', alt: 'Kerakoll anti-cracking waterproofing membrane Dubai' },
            { description: 'GreenBuilding certified product documentation', alt: 'Kerakoll GreenBuilding certified waterproofing UAE' },
            { description: 'Completed waterproofed surface ready for tiling', alt: 'Kerakoll waterproofing ready for tiles Dubai' }
          ]
        }
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
    metaDescription: 'Pidilite Puma UAE - Tile adhesives, waterproofing, and self-leveling systems for Dubai construction.',
    category: 'brand',
    productLines: [
      {
        slug: 'tile-adhesives-and-grouts',
        name: 'Tile Adhesives and Grouts',
        description: 'Reliable tile fixing adhesives and grouting solutions.',
        metaDescription: 'Pidilite Puma tile adhesives UAE - Trusted tile fixing systems and grouts for Dubai residential and commercial projects.',
        images: ['/images/brands/pidilite/tile-adhesives.jpg'],
        content: {
          seoTitle: 'Puma Tile Adhesives & Grouts UAE | Pegoland & Morcemcolor',
          h1: 'Professional Tile Installation with Puma Pegoland Adhesives',
          intro: 'Grupo Puma brings over 50 years of Spanish construction chemistry expertise to UAE tile installations. The Pegoland® adhesive range delivers EN-certified performance from standard ceramic tiling to demanding large-format porcelain and natural stone applications. Paired with Morcemcolor® grouts engineered for water resistance and anti-fungal protection, Puma systems provide complete tile installation solutions trusted by professionals across Europe and the Middle East. From residential bathrooms to commercial facades, Puma technology ensures lasting bonds that withstand UAE climate extremes.',
          whySection: {
            title: 'Why Choose Puma Tile Systems',
            bullets: [
              'Pegoland® adhesive range covering C1 to C2 TE S2 classifications for every tile type',
              'Extended open time formulations (TE) for large-format tiles in hot UAE conditions',
              'Morcemcolor® grouts with water-repellent (AW) and anti-mold (WA) properties',
              '50+ years of Spanish engineering heritage in construction chemistry',
              'Drypool integrated system for complete swimming pool installations',
              'EN 12004 certified adhesives meeting European quality standards',
              'Comprehensive technical support from Lapiz Blue experts',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Large-format porcelain tiles (60x120cm and larger) in commercial spaces',
              'Natural stone installations including marble and granite',
              'Swimming pool and wet area tiling with Drypool system',
              'Exterior facade cladding with high-deformability adhesives',
              'Underfloor heating systems requiring flexible bonds',
              'High-traffic commercial flooring installations',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right Puma Products',
            bullets: [
              'Standard ceramics: Pegoland® Uno C1 for basic wall and floor tiles',
              'Large format: Pegoland® Dos Plus C2 TE for tiles over 40x40cm',
              'Natural stone: Pegoland® Flex C2 TE S1 for marble and granite',
              'Pools/facades: Pegoland® Flex Record C2 TE S2 for maximum deformability',
              'General grouting: Morcemcolor® Universal CG2 AW for most applications',
              'Wet areas: Morcemcolor® Plus Flexible CG2 WA for bathrooms and kitchens',
              'Pools/commercial: Morcemcolor® Epoxy for chemical and stain resistance',
              'Extended work time: Choose TE-rated products for hot climate installations',
            ],
          },
          commonMistakes: {
            title: 'Common Installation Mistakes to Avoid',
            bullets: [
              'Using C1 adhesives for large-format tiles that require C2 deformability',
              'Insufficient back-buttering on tiles larger than 30x30cm',
              'Applying adhesive when substrate temperature exceeds recommended limits',
              'Using standard grout in swimming pools instead of epoxy-rated products',
              'Ignoring open time limits in UAE summer conditions',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust Puma',
            items: [
              { label: 'Heritage', value: '50+ Years Spanish Engineering' },
              { label: 'Certification', value: 'EN 12004 Compliant' },
              { label: 'Range', value: 'C1 to C2 S2 Classifications' },
              { label: 'System', value: 'Drypool Pool Installation' },
              { label: 'Support', value: 'Technical Guidance from Lapiz Blue' },
              { label: 'Coverage', value: 'Europe & Middle East Presence' },
            ],
          },
          faqs: [
            {
              question: 'What is the difference between Pegoland C1 and C2 adhesives?',
              answer: 'C1 adhesives like Pegoland Uno are standard cementitious adhesives suitable for ceramic tiles up to 30x30cm on stable substrates. C2 adhesives like Pegoland Dos Plus and Flex provide improved adhesion strength and are required for large-format tiles, porcelain, natural stone, and demanding applications like facades and pools.',
            },
            {
              question: 'Which Puma adhesive is best for large-format porcelain tiles?',
              answer: 'Pegoland® Dos Plus C2 TE is ideal for large-format porcelain up to 60x60cm. For even larger formats or exterior applications, Pegoland® Flex C2 TE S1 provides additional deformability. The TE (extended open time) rating is essential for UAE conditions, giving installers more working time in heat.',
            },
            {
              question: 'Can Puma products be used for swimming pool tiling?',
              answer: 'Yes, Puma offers the complete Drypool system specifically designed for pool installations. This includes Pegoland® Flex Record C2 TE S2 adhesive for maximum deformability, Morcemcolor® Epoxy grout for chemical resistance, and compatible waterproofing products for a fully integrated solution.',
            },
            {
              question: 'What is the coverage rate for Pegoland adhesives?',
              answer: 'Coverage varies by application method and tile size. Typically, Pegoland adhesives cover 3-5 kg/m² for wall tiles with thin-bed application and 4-6 kg/m² for floor tiles. Large-format tiles requiring back-buttering may use 6-8 kg/m². Our technical team can provide specific calculations for your project.',
            },
            {
              question: 'Why choose Morcemcolor grout over standard cement grouts?',
              answer: 'Morcemcolor® grouts incorporate advanced polymer technology for superior performance. The Universal CG2 AW provides water-repellent properties, while Plus Flexible CG2 WA adds anti-mold protection. Morcemcolor Epoxy offers complete waterproofing and chemical resistance for pools and commercial kitchens.',
            },
            {
              question: 'How long should I wait before grouting after tile installation?',
              answer: 'With Pegoland adhesives, grouting can typically begin after 24 hours under normal conditions. In UAE summer heat, adhesive curing may accelerate, but we recommend waiting the full 24 hours to ensure complete hydration. For pool installations, extended curing of 48-72 hours is recommended before filling.',
            },
            {
              question: 'Are Puma tile products suitable for underfloor heating systems?',
              answer: 'Yes, Pegoland® Flex S1 and S2 adhesives are specifically designed for heated floor applications. The S-rating indicates deformability that accommodates thermal expansion and contraction. Combined with flexible Morcemcolor Plus grout, this system prevents cracking over heating elements.',
            },
            {
              question: 'Does Lapiz Blue provide technical support for Puma products?',
              answer: 'Absolutely. As an authorized Grupo Puma distributor, Lapiz Blue offers comprehensive technical support including product selection guidance, system specifications, coverage calculations, and on-site consultation for complex projects. Contact our team for personalized recommendations.',
            },
          ],
          cta: {
            title: 'Specify Puma Tile Systems for Your Project',
            subtitle: 'Professional-grade adhesives and grouts backed by 50 years of innovation',
            checklist: [
              'Complete Pegoland® adhesive range from C1 to C2 S2',
              'Morcemcolor® grouts with water-repellent and anti-mold properties',
              'Drypool integrated swimming pool installation system',
              'EN 12004 certified products for specification compliance',
              'Expert technical support from Lapiz Blue',
              'Competitive pricing for contractors and developers',
              'Reliable stock availability across UAE',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'Pegoland® Adhesive Technology',
                content: 'The Pegoland® range represents Grupo Puma\'s flagship tile adhesive technology, developed through five decades of Spanish construction chemistry innovation. From the economical Pegoland Uno C1 for standard ceramics to the high-performance Flex Record C2 TE S2 for demanding facade applications, the range provides solutions for every installation scenario. Extended open time (TE) formulations are particularly valuable in UAE conditions, giving installers sufficient working time even in elevated temperatures.',
              },
              {
                title: 'Morcemcolor® Grout Systems',
                content: 'Morcemcolor® grouts complete the Puma tile installation system with advanced polymer-modified formulations. The Universal CG2 AW delivers water-repellent performance for general applications, while Plus Flexible CG2 WA incorporates anti-fungal agents for wet areas. For maximum durability in pools, kitchens, and commercial environments, Morcemcolor Epoxy provides complete waterproofing and chemical resistance with easy cleanability.',
              },
              {
                title: 'Drypool Complete System',
                content: 'The Drypool system represents Puma\'s integrated approach to swimming pool construction. Combining compatible waterproofing, adhesives, and grouts engineered to work together, Drypool eliminates compatibility issues that can lead to failures. The system includes primers, waterproof membranes, Pegoland Flex Record adhesive, and Morcemcolor Epoxy grout - all tested as a complete assembly for pool environments.',
              },
              {
                title: 'EN Classification Explained',
                content: 'European EN 12004 classification provides clear guidance for adhesive selection. C1 indicates standard cementitious adhesive suitable for most ceramic tiles. C2 denotes improved adhesives with higher bond strength for porcelain and stone. Additional designations include T (reduced slip), E (extended open time), and S1/S2 (deformability levels). Puma\'s clear product naming helps specifiers choose correctly for each application.',
              },
              {
                title: 'Climate-Adapted Formulations',
                content: 'Puma products distributed through Lapiz Blue are formulated for Middle East conditions. Extended open time variants account for accelerated drying in UAE heat. Grout formulations resist efflorescence common in humid coastal environments. Adhesive flexibility ratings accommodate thermal cycling from air-conditioned interiors to sun-exposed exteriors. This regional adaptation ensures reliable performance year-round.',
              },
              {
                title: 'Technical Support Network',
                content: 'Lapiz Blue provides comprehensive technical backing for Puma installations. Services include product selection assistance based on project requirements, specification writing support for architects and consultants, coverage calculations and material estimates, and troubleshooting guidance for installation challenges. Our technical team brings local experience to Puma\'s international expertise.',
              },
              {
                title: 'Quality Assurance Standards',
                content: 'Every Puma product undergoes rigorous testing at Grupo Puma\'s Spanish facilities before distribution. EN certification ensures consistent performance meeting European standards. Batch traceability provides quality documentation for project records. Combined with Lapiz Blue\'s proper storage and handling, this quality chain delivers reliable products to every UAE installation site.',
              },
            ],
          },
          suggestedImages: [
            { description: 'Large-format porcelain tile installation using Pegoland Dos Plus adhesive', alt: 'Large format tile installation with Puma adhesive in Dubai' },
            { description: 'Morcemcolor grout application on designer floor tiles', alt: 'Puma Morcemcolor grout application UAE' },
            { description: 'Swimming pool tiling with Drypool integrated system', alt: 'Swimming pool tile installation Drypool system' },
            { description: 'Natural stone facade installation with Pegoland Flex', alt: 'Stone facade cladding Puma adhesive' },
            { description: 'Installer applying adhesive with notched trowel technique', alt: 'Professional tile adhesive application technique' },
            { description: 'Range of Morcemcolor grout colors for design flexibility', alt: 'Puma grout color range UAE' },
            { description: 'Completed luxury bathroom with Puma tile system', alt: 'Bathroom tile installation Puma products Dubai' },
            { description: 'Commercial flooring project using Puma adhesives', alt: 'Commercial floor tiling Grupo Puma UAE' },
          ],
        },
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Waterproofing compounds for wet areas and basements.',
        metaDescription: 'Pidilite Puma waterproofing UAE - Water-resistant coatings for bathrooms, terraces, and basements in Dubai.',
        images: ['/images/brands/pidilite/waterproofing.jpg'],
        content: {
          seoTitle: 'Puma Waterproofing UAE | Morcem Dry & Elastic PM Systems',
          h1: 'Complete Waterproofing Solutions with Puma Morcem Technology',
          intro: 'Grupo Puma delivers comprehensive waterproofing systems engineered for UAE construction challenges. The Morcem® range includes polyurethane liquid membranes, cementitious coatings, and bituminous systems for applications from bathroom wet areas to exposed roof terraces. Puma waterproofing technology addresses the unique demands of Gulf climate - intense UV exposure, thermal cycling, and high humidity - with formulations proven across European and Middle Eastern projects. From single-component ease of application to dual-function waterproof-adhesive products, Puma provides solutions for every waterproofing requirement.',
          whySection: {
            title: 'Why Choose Puma Waterproofing Systems',
            bullets: [
              'Morcem® Elastic PM single-component polyurethane liquid membrane for seamless coverage',
              'Morcem® Dry range of cementitious waterproofing for wet areas and basements',
              'Impernet® bituminous systems for below-grade and roof applications',
              'Dual-function Morcem Dry Fix combining waterproofing with tile adhesive properties',
              'UV-resistant formulations for exposed terraces and roof decks',
              'Compatible with Drypool system for integrated pool waterproofing',
              'Proven performance in UAE climate conditions',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Bathroom and wet area waterproofing under tile installations',
              'Terrace and balcony waterproofing with UV exposure',
              'Swimming pool shells and water features',
              'Basement and below-grade moisture protection',
              'Flat roof waterproofing and repair',
              'Planter boxes and water-retaining structures',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right Puma Waterproofing',
            bullets: [
              'Bathrooms: Morcem® Dry Flex for flexible cementitious waterproofing under tiles',
              'Terraces: Morcem® Elastic PM polyurethane membrane for UV-exposed areas',
              'Basements: Morcem® Dry SF Plus for negative-side water pressure resistance',
              'Pools: Drypool system with compatible Morcem waterproofing components',
              'Quick turnaround: Morcem® Dry Fix for combined waterproofing and adhesive',
              'Roofs: Impernet® bituminous membranes for large-scale roof applications',
              'Planters: Morcem® Dry range with root-resistant additives',
              'Repairs: Morcem® Elastic PM for crack-bridging on existing surfaces',
            ],
          },
          commonMistakes: {
            title: 'Common Waterproofing Mistakes to Avoid',
            bullets: [
              'Insufficient membrane thickness - always follow minimum coverage requirements',
              'Poor substrate preparation leaving dust or loose material that compromises adhesion',
              'Applying waterproofing in direct sunlight causing flash curing and pinholes',
              'Skipping corner and penetration reinforcement with tape or fabric',
              'Tiling before waterproofing has fully cured to manufacturer specifications',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust Puma Waterproofing',
            items: [
              { label: 'Technology', value: 'Polyurethane & Cementitious Systems' },
              { label: 'Application', value: 'Single-Component Simplicity' },
              { label: 'Integration', value: 'Drypool Pool System Compatible' },
              { label: 'Durability', value: 'UV & Chemical Resistant' },
              { label: 'Heritage', value: '50+ Years Grupo Puma Innovation' },
              { label: 'Support', value: 'Lapiz Blue Technical Expertise' },
            ],
          },
          faqs: [
            {
              question: 'What is the difference between Morcem Elastic PM and Morcem Dry products?',
              answer: 'Morcem® Elastic PM is a single-component polyurethane liquid membrane that cures to form a seamless, highly elastic waterproof coating ideal for terraces and exposed applications. Morcem® Dry products are cementitious waterproofing compounds designed for under-tile applications in bathrooms and wet areas. The choice depends on whether the surface will be exposed or covered with tiles.',
            },
            {
              question: 'Can Puma waterproofing be applied over existing tiles?',
              answer: 'Morcem® Elastic PM can be applied over properly prepared existing tiles for terrace and balcony refurbishment without demolition. The surface must be cleaned, degreased, and any loose tiles secured. This provides a cost-effective renovation solution. For bathroom renovations, complete tile removal is typically recommended for best results.',
            },
            {
              question: 'How long before tiles can be installed over Puma waterproofing?',
              answer: 'Morcem® Dry products typically allow tiling after 24-48 hours depending on temperature and humidity. Morcem® Dry Fix, the dual-function product, is ready for tiling in similar timeframes. Always verify full cure by checking the surface is uniform in color without tacky areas. In UAE summer conditions, curing may accelerate but minimum wait times should still be observed.',
            },
            {
              question: 'Is Puma waterproofing suitable for swimming pools?',
              answer: 'Yes, the Drypool integrated system includes Puma waterproofing components specifically designed for pool shells. This system combines compatible primers, waterproof membranes, adhesives, and grouts tested together for permanent water immersion. The complete system approach eliminates compatibility issues that can cause pool waterproofing failures.',
            },
            {
              question: 'What coverage rate should I expect from Morcem waterproofing products?',
              answer: 'Coverage varies by product and application. Morcem® Elastic PM typically covers 1.0-1.5 kg/m² per coat with two coats recommended. Morcem® Dry products generally require 2-3 kg/m² depending on substrate porosity. Detailed technical data sheets provide specific coverage rates, and our team can help calculate quantities for your project.',
            },
            {
              question: 'Can Morcem Elastic PM be left exposed on terraces?',
              answer: 'Yes, Morcem® Elastic PM is formulated with UV stabilizers for permanent exposure on terraces, balconies, and roof decks. The polyurethane chemistry provides excellent weather resistance and maintains flexibility through thermal cycling. Available in multiple colors for aesthetic terrace finishes without requiring tile or paint overlay.',
            },
            {
              question: 'How does Morcem Dry Fix work as both waterproofing and adhesive?',
              answer: 'Morcem® Dry Fix is a dual-function cementitious product that provides waterproofing while serving as a tile adhesive. Applied in a single operation, it waterproofs the substrate and allows direct tile installation without a separate adhesive layer. This reduces installation steps and time while ensuring compatibility between waterproofing and adhesive.',
            },
            {
              question: 'Does Lapiz Blue provide waterproofing system recommendations?',
              answer: 'Absolutely. Lapiz Blue technical team offers comprehensive waterproofing consultation including system selection for specific applications, coverage calculations, application guidance, and specification support. We can recommend the appropriate Puma waterproofing system based on your project requirements, substrate conditions, and exposure environment.',
            },
          ],
          cta: {
            title: 'Protect Your Project with Puma Waterproofing',
            subtitle: 'Complete waterproofing systems from liquid membranes to cementitious coatings',
            checklist: [
              'Morcem® Elastic PM polyurethane liquid membrane for seamless protection',
              'Morcem® Dry cementitious range for under-tile applications',
              'Dual-function Morcem® Dry Fix waterproofing and adhesive',
              'Impernet® bituminous systems for roofs and basements',
              'Drypool integrated pool waterproofing system',
              'Technical specification support from Lapiz Blue',
              'Stock availability for UAE project timelines',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'Morcem® Elastic PM Technology',
                content: 'Morcem® Elastic PM represents Grupo Puma\'s advanced polyurethane liquid membrane technology. This single-component product cures by moisture reaction to form a seamless, highly elastic waterproof coating. The formulation includes UV stabilizers for permanent exposure applications and maintains flexibility through extreme temperature variations. Applied by roller or spray, Elastic PM creates monolithic coverage without joints or seams that can become weak points.',
              },
              {
                title: 'Morcem® Dry Cementitious Range',
                content: 'The Morcem® Dry range provides cementitious waterproofing solutions for various construction scenarios. Morcem® Dry Flex offers flexible waterproofing for bathrooms and wet areas with excellent crack-bridging capability. Morcem® Dry SF Plus delivers resistance to negative water pressure for basement applications. These products integrate seamlessly with Puma tile adhesives for reliable wet area construction.',
              },
              {
                title: 'Dual-Function Morcem® Dry Fix',
                content: 'Morcem® Dry Fix exemplifies Puma\'s integrated system philosophy by combining waterproofing and tile adhesive functions in a single product. Applied once, it waterproofs the substrate while providing the bonding layer for tile installation. This approach reduces application steps, eliminates compatibility concerns between separate products, and accelerates project timelines without compromising performance.',
              },
              {
                title: 'Impernet® Bituminous Systems',
                content: 'For heavy-duty waterproofing applications, the Impernet® range provides bituminous solutions proven in demanding environments. These products suit below-grade applications, flat roofs, and areas requiring robust protection against hydrostatic pressure. The bituminous chemistry offers excellent adhesion to concrete substrates and long-term durability in buried or exposed conditions.',
              },
              {
                title: 'Drypool Integration',
                content: 'Puma waterproofing products form an essential part of the Drypool swimming pool installation system. The integrated approach ensures all components - waterproofing, adhesives, and grouts - are tested together for compatibility in permanently submerged conditions. This system engineering eliminates the finger-pointing that can occur when different manufacturers\' products are combined on pool projects.',
              },
              {
                title: 'UAE Climate Adaptation',
                content: 'Puma waterproofing products distributed through Lapiz Blue address specific challenges of UAE construction. Formulations account for rapid moisture loss during application in hot conditions. UV-resistant versions withstand intense solar exposure on terraces and roofs. The products maintain performance through thermal cycling between air-conditioned interiors and sun-heated exteriors common in Gulf buildings.',
              },
              {
                title: 'Application Best Practices',
                content: 'Successful waterproofing installation requires attention to substrate preparation, environmental conditions, and proper technique. Puma provides detailed application guidelines for each product, and Lapiz Blue technical support can advise on specific project conditions. Key factors include surface cleanliness, appropriate primer selection, reinforcement of corners and penetrations, and observance of curing times before subsequent operations.',
              },
            ],
          },
          suggestedImages: [
            { description: 'Morcem Elastic PM application on terrace with roller', alt: 'Polyurethane waterproofing membrane application Dubai terrace' },
            { description: 'Bathroom waterproofing with Morcem Dry before tiling', alt: 'Bathroom waterproofing UAE wet area protection' },
            { description: 'Swimming pool shell waterproofing with Drypool system', alt: 'Pool waterproofing Puma Drypool system' },
            { description: 'Basement waterproofing against negative water pressure', alt: 'Basement moisture protection Morcem Dry SF' },
            { description: 'Corner and penetration reinforcement with waterproof tape', alt: 'Waterproofing detail corner reinforcement' },
            { description: 'Completed waterproof terrace ready for outdoor use', alt: 'Exposed waterproof terrace Morcem Elastic PM' },
            { description: 'Application of Morcem Dry Fix dual-function product', alt: 'Waterproof adhesive application UAE' },
            { description: 'Roof waterproofing with Impernet bituminous system', alt: 'Roof waterproofing bituminous membrane Dubai' },
          ],
        },
      },
      // DRAFT: Epoxy Repair product line - commented out for future use
      // Uncomment this section when ready to sell epoxy repair products
      /*
      {
        slug: 'epoxy-repair',
        name: 'Epoxy Repair',
        description: 'High-strength epoxy repair systems for concrete and steel.',
        metaDescription: 'Pidilite Puma epoxy UAE - Structural epoxy repair and bonding systems for Dubai infrastructure projects.',
        images: ['/images/brands/pidilite/epoxy.jpg'],
        content: {
          seoTitle: 'Puma Epoxy Repair UAE | Morcemrest & Implarest Systems',
          h1: 'Structural Concrete Repair with Puma Morcemrest Technology',
          intro: 'Grupo Puma provides comprehensive concrete repair and protection systems through the Morcemrest® and Implarest® product ranges. These Spanish-engineered solutions address structural rehabilitation challenges from crack injection to full concrete restoration. Puma epoxy systems meet the demands of UAE infrastructure projects where corrosion protection, structural bonding, and long-term durability are essential. From parking structures experiencing rebar corrosion to industrial facilities requiring chemical-resistant flooring, Puma repair technology restores and protects concrete assets.',
          whySection: {
            title: 'Why Choose Puma Epoxy Repair Systems',
            bullets: [
              'Morcemrest® comprehensive repair system for corrosion protection and concrete restoration',
              'Implarest® epoxy range including water-based formulations for eco-conscious projects',
              'Structural-grade bonding for new concrete to existing substrates',
              'Crack injection systems for structural crack stabilization',
              'Carbon fiber reinforcement compatibility for structural strengthening',
              'Chemical and abrasion resistant epoxy flooring options',
              '50+ years of Grupo Puma infrastructure expertise',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Parking structure repair and rebar corrosion protection',
              'Bridge and infrastructure concrete rehabilitation',
              'Industrial flooring requiring chemical resistance',
              'Structural crack injection and stabilization',
              'Bonding new concrete overlays to existing slabs',
              'Marine structure repair in corrosive environments',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right Puma Repair Products',
            bullets: [
              'Rebar corrosion: Morcemrest® system with primer, passivator, and repair mortar',
              'Crack injection: Implarest® Injection epoxy for structural crack filling',
              'Surface primer: Implarest® EPW water-based epoxy for concrete preparation',
              'Structural bonding: Implarest® epoxy adhesive for concrete-to-concrete bonds',
              'Industrial floors: Morcem® Floor Epoxi self-leveling epoxy coating',
              'Patch repair: Morcem® Renovex structural repair mortar',
              'Carbon fiber: Compatible Implarest® epoxies for CFRP reinforcement',
              'Marine environments: Specialized formulations for salt and humidity exposure',
            ],
          },
          commonMistakes: {
            title: 'Common Repair Mistakes to Avoid',
            bullets: [
              'Inadequate concrete preparation - sound substrate is essential for bond',
              'Skipping rebar treatment when corrosion is present leads to continued deterioration',
              'Incorrect epoxy mixing ratios compromising cure and strength development',
              'Applying epoxy outside temperature limits causing improper curing',
              'Insufficient repair mortar thickness for structural applications',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust Puma Repair Systems',
            items: [
              { label: 'System', value: 'Complete Morcemrest® Rehabilitation' },
              { label: 'Chemistry', value: 'Structural-Grade Epoxy' },
              { label: 'Innovation', value: 'Water-Based Eco Formulations' },
              { label: 'Compatibility', value: 'Carbon Fiber Reinforcement' },
              { label: 'Heritage', value: '50+ Years Infrastructure Experience' },
              { label: 'Support', value: 'Lapiz Blue Technical Guidance' },
            ],
          },
          faqs: [
            {
              question: 'What is the Morcemrest system for concrete repair?',
              answer: 'Morcemrest® is Grupo Puma\'s comprehensive concrete rehabilitation system addressing the full repair sequence. It includes concrete surface preparation products, rebar cleaning and passivation treatments, bonding primers, and repair mortars in various grades for different applications. The system approach ensures compatibility between all components for lasting repairs.',
            },
            {
              question: 'Can Puma epoxy products be used for structural crack injection?',
              answer: 'Yes, Implarest® Injection is specifically designed for structural crack injection. This low-viscosity epoxy penetrates fine cracks to restore monolithic structural action. For active cracks subject to movement, flexible injection resins are available. The choice depends on crack width, cause, and whether structural load transfer is required.',
            },
            {
              question: 'What is the advantage of water-based epoxy primers?',
              answer: 'Implarest® EPW water-based epoxy primer offers several advantages: lower VOC emissions for indoor applications, easier cleanup, and application to damp substrates. Water-based formulations are increasingly specified for sustainability compliance while maintaining the bonding performance needed for subsequent repair layers.',
            },
            {
              question: 'How do Puma repair mortars compare to standard concrete?',
              answer: 'Puma repair mortars like Morcem® Renovex are polymer-modified for superior adhesion to existing concrete without the need for bonding agents. They offer controlled shrinkage to prevent cracking, higher flexural strength than plain concrete, and can be formulated for rapid strength gain when fast return to service is needed.',
            },
            {
              question: 'Is Puma epoxy suitable for industrial floor coatings?',
              answer: 'Yes, Morcem® Floor Epoxi provides self-leveling epoxy flooring for industrial and commercial applications. This system creates seamless, chemical-resistant surfaces suitable for manufacturing facilities, food processing areas, and warehouses. The coating resists oils, solvents, and mechanical wear while providing easy-clean hygienic surfaces.',
            },
            {
              question: 'Can Puma products be used with carbon fiber reinforcement?',
              answer: 'Puma epoxy systems are compatible with carbon fiber reinforced polymer (CFRP) strengthening applications. Implarest® structural adhesives bond carbon fiber sheets and laminates to concrete for flexural and shear strengthening. This technique is increasingly used for bridge rehabilitation and building structural upgrades.',
            },
            {
              question: 'What preparation is needed before epoxy repair application?',
              answer: 'Proper surface preparation is critical for epoxy repair success. This typically includes removal of deteriorated concrete to sound substrate, cleaning to remove contaminants, and achieving appropriate surface profile. For rebar repair, rust removal and passivation treatment are essential. Puma technical data sheets specify preparation requirements for each product.',
            },
            {
              question: 'Does Lapiz Blue provide support for structural repair projects?',
              answer: 'Absolutely. Lapiz Blue technical team provides comprehensive support for concrete repair projects including system selection, material quantity calculations, application guidance, and troubleshooting. For complex structural repairs, we can coordinate with Puma technical specialists to develop project-specific solutions.',
            },
          ],
          cta: {
            title: 'Restore Concrete Structures with Puma Repair Systems',
            subtitle: 'Complete rehabilitation solutions from crack injection to structural restoration',
            checklist: [
              'Morcemrest® comprehensive concrete repair system',
              'Implarest® structural epoxy range including water-based options',
              'Crack injection solutions for structural stabilization',
              'Morcem® Floor Epoxi industrial flooring systems',
              'Carbon fiber reinforcement compatible adhesives',
              'Technical specification support from Lapiz Blue',
              'Infrastructure project experience across UAE',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'Morcemrest® Repair System',
                content: 'The Morcemrest® system represents Grupo Puma\'s integrated approach to concrete rehabilitation. Rather than isolated products, the system provides matched components for the complete repair sequence: surface preparation, rebar treatment, bonding, and repair mortar application. This compatibility eliminates the risk of product interactions that can compromise repairs when mixing different manufacturers\' materials.',
              },
              {
                title: 'Implarest® Epoxy Technology',
                content: 'The Implarest® range delivers structural-grade epoxy products for demanding applications. Formulations include standard two-component epoxies, water-based variants for sustainability-focused projects, and specialized injection resins for crack repair. These products meet the performance requirements of infrastructure rehabilitation while addressing modern environmental and health considerations.',
              },
              {
                title: 'Rebar Corrosion Protection',
                content: 'Rebar corrosion is a primary cause of concrete deterioration in UAE\'s humid, chloride-rich environment. The Morcemrest® system addresses this through rust removal, passivation treatment to halt active corrosion, and alkaline repair mortars that restore the protective environment around reinforcement. This systematic approach extends structure service life significantly.',
              },
              {
                title: 'Structural Crack Injection',
                content: 'Crack injection with Implarest® epoxy restores structural integrity in cracked concrete. The low-viscosity formulation penetrates fine cracks under pressure, bonding crack faces and transferring structural loads. For cracks subject to ongoing movement, flexible injection resins accommodate minor displacement without re-cracking. Proper crack assessment determines the appropriate injection approach.',
              },
              {
                title: 'Industrial Epoxy Flooring',
                content: 'Morcem® Floor Epoxi creates seamless, chemical-resistant flooring for industrial and commercial facilities. The self-leveling system produces flat, easy-clean surfaces resistant to oils, chemicals, and mechanical wear. Applications range from manufacturing plants and warehouses to food processing facilities requiring hygienic floor finishes.',
              },
              {
                title: 'CFRP Strengthening Applications',
                content: 'Carbon fiber reinforced polymer strengthening using Puma epoxy adhesives provides structural capacity increases without significant added weight. This technique suits bridges, buildings, and industrial structures requiring upgraded load capacity or repair of structural deficiencies. Implarest® adhesives provide the bond strength and durability needed for permanent CFRP installations.',
              },
              {
                title: 'UAE Infrastructure Applications',
                content: 'Puma repair systems address the specific challenges of UAE infrastructure: chloride-induced rebar corrosion from coastal environments, carbonation from atmospheric CO2, and thermal stress from temperature extremes. Products are formulated for application in hot conditions and provide long-term durability in the Gulf climate. Lapiz Blue brings local project experience to support successful applications.',
              },
            ],
          },
          suggestedImages: [
            { description: 'Concrete spall repair showing rebar treatment process', alt: 'Concrete repair rebar corrosion treatment UAE' },
            { description: 'Crack injection equipment and Implarest epoxy application', alt: 'Structural crack injection epoxy Dubai' },
            { description: 'Industrial epoxy floor coating in warehouse facility', alt: 'Industrial epoxy flooring Morcem Floor Epoxi' },
            { description: 'Carbon fiber reinforcement application on concrete beam', alt: 'CFRP strengthening concrete structure' },
            { description: 'Parking structure repair with Morcemrest system', alt: 'Parking garage concrete repair UAE' },
            { description: 'Marine structure repair in corrosive environment', alt: 'Marine concrete repair waterfront Dubai' },
            { description: 'Application of repair mortar with trowel finish', alt: 'Concrete repair mortar application technique' },
            { description: 'Completed structural repair showing restored surface', alt: 'Finished concrete repair Puma Morcemrest' },
          ],
        },
      },
      */
      {
        slug: 'self-leveling',
        name: 'Self Leveling',
        description: 'Self-leveling floor compounds for smooth finishes.',
        metaDescription: 'Pidilite Puma self-leveling UAE - Floor leveling compounds for residential and commercial flooring in Dubai.',
        images: ['/images/brands/pidilite/self-leveling.jpg'],
        content: {
          seoTitle: 'Puma Self Leveling UAE | Morcem Floor Auto Systems',
          h1: 'Precision Floor Leveling with Puma Morcem Floor Technology',
          intro: 'Grupo Puma\'s Morcem® Floor range delivers professional self-leveling compounds for creating perfectly flat floor surfaces across residential and commercial projects. From thin-coat renovation leveling to thick-build industrial screeds, Puma self-leveling technology provides the foundation for all flooring types. The pump-applicable formulations enable efficient coverage of large areas while maintaining consistent quality. Engineered for UAE construction schedules, fast-setting options allow rapid return to service, and underfloor heating compatible grades support modern building systems.',
          whySection: {
            title: 'Why Choose Puma Self-Leveling Systems',
            bullets: [
              'Morcem® Floor Auto standard self-leveling for general floor preparation',
              'Morcem® Floor Auto Plus fast-drying formula for accelerated project timelines',
              'Morcem® Floor Tech high-strength compound for industrial applications',
              'Pump-applicable formulations for efficient large-area coverage',
              'Compatible with underfloor heating systems for modern buildings',
              'Suitable substrate for all flooring types: tile, vinyl, carpet, and wood',
              'Consistent quality backed by 50+ years Grupo Puma innovation',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Residential floor renovation and new construction leveling',
              'Commercial office and retail flooring preparation',
              'Industrial warehouse and factory floor screeds',
              'Underfloor heating system coverage and leveling',
              'Substrate preparation for luxury vinyl tile (LVT) installation',
              'Hospital and healthcare facility floor systems',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right Puma Self-Leveling Product',
            bullets: [
              'General leveling: Morcem® Floor Auto for standard residential and commercial floors',
              'Fast turnaround: Morcem® Floor Auto Plus for projects requiring rapid flooring installation',
              'Industrial strength: Morcem® Floor Tech for high-load warehouses and factories',
              'Thin coats: Select products rated for 1-10mm thickness for renovation work',
              'Thick build: Choose products rated for 10-50mm for major leveling corrections',
              'Heated floors: Specify underfloor heating compatible grades',
              'Pump application: Confirm pumpability for large commercial projects',
              'Floor finish: Match leveling compound to final flooring type requirements',
            ],
          },
          commonMistakes: {
            title: 'Common Self-Leveling Mistakes to Avoid',
            bullets: [
              'Insufficient primer application leading to bubble formation and delamination',
              'Over-watering the mix which reduces strength and causes excessive shrinkage',
              'Pouring too thick in single application instead of building up in layers',
              'Working compound after initial set has begun causing surface defects',
              'Installing final flooring before self-leveler has fully cured',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust Puma Floor Systems',
            items: [
              { label: 'Range', value: 'Complete Morcem® Floor Portfolio' },
              { label: 'Application', value: 'Hand or Pump Applicable' },
              { label: 'Speed', value: 'Fast-Drying Options Available' },
              { label: 'Compatibility', value: 'Underfloor Heating Approved' },
              { label: 'Heritage', value: '50+ Years Grupo Puma Engineering' },
              { label: 'Support', value: 'Lapiz Blue Technical Assistance' },
            ],
          },
          faqs: [
            {
              question: 'What is the difference between Morcem Floor Auto and Floor Auto Plus?',
              answer: 'Morcem® Floor Auto is the standard self-leveling compound suitable for most applications with normal curing times. Morcem® Floor Auto Plus is a fast-drying formulation that allows floor covering installation significantly sooner - typically within 4-24 hours depending on thickness, compared to several days for standard products. Choose Plus when project schedules require rapid turnaround.',
            },
            {
              question: 'How thick can Puma self-leveling be applied in one pour?',
              answer: 'Maximum single-pour thickness varies by product. Generally, thin-pour products are designed for 1-10mm applications, while thick-pour variants can achieve 10-50mm in a single application. For greater depths, multiple pours with appropriate curing between layers are recommended. Product technical data sheets specify exact thickness limits for each formulation.',
            },
            {
              question: 'Can Puma self-leveling be used over underfloor heating?',
              answer: 'Yes, specific Morcem® Floor products are designed for underfloor heating systems. These formulations accommodate the thermal movement of heated floors without cracking. It is important to follow heating system commissioning procedures - gradually increasing temperature after the self-leveler has cured - to prevent thermal shock.',
            },
            {
              question: 'Is primer necessary before applying self-leveling compound?',
              answer: 'Yes, primer application is essential for successful self-leveling installation. The primer seals the substrate, prevents air bubbles rising through the leveling compound, and ensures proper adhesion. Skipping primer is a common cause of self-leveling failures. Puma provides compatible primers for various substrate types.',
            },
            {
              question: 'How soon can floor coverings be installed over Puma self-leveling?',
              answer: 'Timing depends on the product and thickness applied. Morcem® Floor Auto Plus allows floor covering installation within hours for thin applications. Standard products typically require 1-3 days depending on thickness. Moisture-sensitive floor coverings like wood require full moisture content reduction, which takes longer. Always verify residual moisture levels before installing sensitive flooring.',
            },
            {
              question: 'Can Puma self-leveling be pump applied?',
              answer: 'Yes, Morcem® Floor products are formulated for pump application, enabling efficient coverage of large commercial and industrial areas. Pump application ensures consistent mixing, reduces labor requirements, and speeds installation. For smaller residential projects, hand mixing and pouring is equally effective.',
            },
            {
              question: 'What substrates can Puma self-leveling be applied to?',
              answer: 'Puma self-leveling compounds can be applied to concrete, cement screeds, and various existing floor surfaces when properly prepared and primed. Substrates must be structurally sound, clean, and free of contaminants. For specific substrates like plywood or existing tiles, confirm compatibility and use appropriate primers from the Puma system.',
            },
            {
              question: 'Does Lapiz Blue provide self-leveling application support?',
              answer: 'Absolutely. Lapiz Blue technical team provides comprehensive support including product selection based on project requirements, coverage calculations, mixing and application guidance, and troubleshooting for any installation challenges. Contact us for specific recommendations for your flooring project.',
            },
          ],
          cta: {
            title: 'Create Perfect Floors with Puma Self-Leveling',
            subtitle: 'Professional floor preparation systems for any project scale',
            checklist: [
              'Morcem® Floor Auto standard self-leveling compound',
              'Morcem® Floor Auto Plus fast-drying formulation',
              'Morcem® Floor Tech industrial-grade leveling',
              'Pump-applicable for large commercial projects',
              'Underfloor heating compatible options',
              'Complete primer and accessory systems',
              'Technical support from Lapiz Blue experts',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'Morcem® Floor System Overview',
                content: 'The Morcem® Floor range represents Grupo Puma\'s comprehensive approach to floor preparation. From thin renovation coatings to heavy-duty industrial screeds, the range provides solutions for every flooring scenario. All products share consistent quality standards, compatible primers, and proven performance - the result of five decades of flooring system development.',
              },
              {
                title: 'Self-Leveling Technology',
                content: 'Puma self-leveling compounds use advanced polymer modification to achieve remarkable flow characteristics. When mixed correctly, the material spreads under its own weight to find level, filling depressions and creating flat surfaces without extensive troweling. This technology dramatically reduces labor compared to traditional screeding while delivering superior flatness.',
              },
              {
                title: 'Fast-Track Floor Solutions',
                content: 'Morcem® Floor Auto Plus addresses the reality of modern construction schedules where flooring often sits on the critical path. Fast-drying technology allows foot traffic and floor covering installation in a fraction of the time required by conventional products. This accelerated timeline benefits both new construction and renovation projects where occupancy deadlines are fixed.',
              },
              {
                title: 'Industrial Strength Applications',
                content: 'Morcem® Floor Tech delivers the higher compressive strength required in industrial environments. Warehouses, factories, and logistics facilities demand floors that withstand forklift traffic, pallet loads, and heavy equipment. This formulation provides the structural capacity for demanding industrial use while maintaining the self-leveling properties that ensure quality installation.',
              },
              {
                title: 'Underfloor Heating Integration',
                content: 'Modern buildings increasingly incorporate underfloor heating for energy efficiency and comfort. Puma self-leveling products designed for heated floors accommodate thermal cycling without cracking or delamination. Proper installation over heating elements, combined with appropriate system commissioning, ensures long-term performance of both the heating system and floor finish.',
              },
              {
                title: 'Pump Application Efficiency',
                content: 'For commercial and industrial projects, pump application of self-leveling compounds offers significant advantages. Consistent mechanical mixing ensures uniform product quality. Continuous delivery enables large areas to be poured seamlessly. Reduced manual handling improves worker productivity and safety. Puma formulations are specifically designed for reliable pump performance.',
              },
              {
                title: 'Substrate Preparation Importance',
                content: 'Successful self-leveling installation depends on proper substrate preparation. Surfaces must be structurally sound, free of contaminants, and appropriately primed. Puma provides specific guidance for various substrates including concrete, cement screeds, and renovation scenarios. Lapiz Blue technical support can advise on preparation requirements for specific project conditions.',
              },
            ],
          },
          suggestedImages: [
            { description: 'Self-leveling compound spreading across floor surface', alt: 'Self-leveling floor compound application UAE' },
            { description: 'Pump application of Morcem Floor in commercial space', alt: 'Pump applied self-leveling commercial flooring Dubai' },
            { description: 'Underfloor heating pipes covered with self-leveling', alt: 'Underfloor heating self-leveling compound' },
            { description: 'Industrial warehouse floor with Morcem Floor Tech', alt: 'Industrial floor leveling warehouse UAE' },
            { description: 'Primer application before self-leveling pour', alt: 'Floor primer application self-leveling preparation' },
            { description: 'Mixing self-leveling compound with paddle mixer', alt: 'Self-leveling compound mixing technique' },
            { description: 'Finished level floor ready for tile installation', alt: 'Level floor substrate tile installation ready' },
            { description: 'Large commercial floor leveling project in progress', alt: 'Commercial floor leveling project Dubai' },
          ],
        },
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
        content: {
          seoTitle: 'FILA Sealers UAE | Stone & Tile Protection | MP90 & FOB',
          h1: 'Professional Surface Protection with FILA Sealers',
          intro: 'FILA brings over 80 years of Italian surface care expertise to UAE projects through its comprehensive sealer range. From penetrating impregnators that protect without altering appearance to color-enhancing treatments that bring out natural stone beauty, FILA sealers address every protection requirement. Trusted by more than 240 leading tile and stone manufacturers worldwide, FILA technology safeguards marble, granite, porcelain, terracotta, and concrete against stains, water damage, and daily wear. Whether preserving the original look of polished surfaces or creating dramatic wet-look finishes, FILA delivers lasting protection.',
          whySection: {
            title: 'Why Choose FILA Sealers',
            bullets: [
              'FILAMP90 ECO PLUS penetrating sealer for natural stone, quartz, and polished porcelain',
              'FILAFOB ultimate protection for porous granite and natural stone surfaces',
              'FilaWET Eco color-enhancing protector for dramatic wet-look finishes',
              '80+ years Italian expertise in surface care chemistry',
              'Trusted by 240+ leading tile and stone manufacturers globally',
              'Both solvent-based (maximum performance) and water-based (eco-friendly) options',
              'Natural look and wet-look finish choices to match design intent',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Marble and granite countertops in kitchens and bathrooms',
              'Natural stone flooring in residential and commercial spaces',
              'Polished porcelain tiles requiring stain protection',
              'Exterior stone facades and cladding exposed to weather',
              'Terracotta and encaustic cement tile preservation',
              'Grout line protection against staining and discoloration',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right FILA Sealer',
            bullets: [
              'Polished marble/granite: FILAMP90 for invisible penetrating protection',
              'Porous natural stone: FILAFOB for maximum stain resistance',
              'Eco-conscious projects: FILAMP90 ECO PLUS water-based formula',
              'Wet-look finish: FilaWET Eco for color enhancement and protection',
              'Exterior stone: FILAW68 water-repellent sealer for weather exposure',
              'Unpolished surfaces: FILASTOP DIRT anti-dirt treatment',
              'Grout protection: Dedicated grout sealers for joint lines',
              'Food preparation areas: Food-safe certified sealer options',
            ],
          },
          commonMistakes: {
            title: 'Common Sealing Mistakes to Avoid',
            bullets: [
              'Applying sealer to dirty or contaminated surfaces - always clean thoroughly first',
              'Using wet-look sealers when natural appearance is desired',
              'Over-application causing surface residue and hazy appearance',
              'Sealing before grout has fully cured (wait minimum 48-72 hours)',
              'Neglecting to test sealer on inconspicuous area before full application',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust FILA',
            items: [
              { label: 'Heritage', value: '80+ Years Italian Expertise' },
              { label: 'Endorsement', value: '240+ Manufacturer Partners' },
              { label: 'Range', value: 'Natural & Wet-Look Options' },
              { label: 'Chemistry', value: 'Solvent & Water-Based' },
              { label: 'Surfaces', value: 'Stone, Tile, Concrete' },
              { label: 'Support', value: 'Lapiz Blue Technical Team' },
            ],
          },
          faqs: [
            {
              question: 'What is the difference between FILAMP90 and FILAFOB sealers?',
              answer: 'FILAMP90 is a penetrating impregnator ideal for polished and honed surfaces like marble, granite, and porcelain - it protects without changing the appearance. FILAFOB is designed for more porous materials like unpolished granite and natural stone, providing deeper penetration and stronger stain resistance. Both leave a natural finish without surface film.',
            },
            {
              question: 'Should I choose solvent-based or water-based FILA sealers?',
              answer: 'Solvent-based sealers like FILAMP90 offer maximum penetration and performance, ideal for professional applications and dense polished surfaces. Water-based options like FILAMP90 ECO PLUS are environmentally friendly, have lower odor, and are suitable for indoor applications where VOC concerns exist. Both provide excellent protection when properly applied.',
            },
            {
              question: 'How do I achieve a wet-look finish on natural stone?',
              answer: 'FilaWET Eco is specifically designed for color enhancement and wet-look finishes. It deepens the natural color of stone while providing stain protection. Apply to clean, dry stone and allow proper curing. For areas with higher wear, consider applying multiple thin coats for enhanced durability and color depth.',
            },
            {
              question: 'How often should FILA sealers be reapplied?',
              answer: 'Reapplication frequency depends on surface use and exposure. High-traffic floors may need resealing every 1-2 years, while countertops might last 3-5 years. Perform a water drop test - if water no longer beads on the surface, resealing is recommended. Regular cleaning with FILA neutral cleaners helps extend sealer life.',
            },
            {
              question: 'Can FILA sealers be used on polished porcelain tiles?',
              answer: 'Yes, FILAMP90 and FILAMP90 ECO PLUS are specifically formulated for polished porcelain as well as natural stone. While porcelain is less porous than natural stone, sealing provides additional stain protection and makes maintenance easier, especially for light-colored porcelain in high-use areas.',
            },
            {
              question: 'Is surface preparation required before sealing?',
              answer: 'Absolutely. Surfaces must be clean, dry, and free of any residues, waxes, or previous treatments. For new installations, use FILA cleaners to remove installation residues. For existing surfaces, deep clean first and allow complete drying - typically 24-48 hours. Proper preparation ensures optimal sealer penetration and performance.',
            },
            {
              question: 'Are FILA sealers safe for food preparation surfaces?',
              answer: 'Yes, once fully cured, FILA penetrating sealers like FILAMP90 are safe for food contact surfaces. The sealer absorbs into the stone rather than forming a surface coating, so there is no film to wear off into food. Always verify specific product certifications for your application.',
            },
            {
              question: 'Does Lapiz Blue provide guidance on FILA sealer selection?',
              answer: 'Yes, Lapiz Blue offers comprehensive technical support for FILA products. Our team can recommend the appropriate sealer based on your surface type, desired finish, usage conditions, and project requirements. We provide application guidance, coverage calculations, and troubleshooting support.',
            },
          ],
          cta: {
            title: 'Protect Your Surfaces with FILA Sealers',
            subtitle: 'Professional-grade protection trusted by 240+ manufacturers worldwide',
            checklist: [
              'FILAMP90 penetrating sealer for polished stone and porcelain',
              'FILAFOB ultimate protection for porous natural stone',
              'FilaWET Eco color-enhancing wet-look treatment',
              'FILAMP90 ECO PLUS water-based eco-friendly option',
              'Exterior and interior sealer formulations available',
              'Technical guidance from Lapiz Blue experts',
              'Stock availability across UAE',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'FILAMP90 Penetrating Technology',
                content: 'FILAMP90 represents FILA\'s flagship penetrating sealer technology. Rather than coating the surface, it absorbs deep into the material to create invisible protection that doesn\'t alter appearance or texture. The impregnating formula protects marble, granite, polished porcelain, and engineered quartz against oil and water-based stains while maintaining the natural breathability of stone.',
              },
              {
                title: 'FILAFOB Porous Stone Protection',
                content: 'FILAFOB addresses the challenge of protecting highly porous natural stones that readily absorb liquids and stains. Its advanced formula penetrates deeply into absorbent materials like unpolished granite, limestone, and sandstone, creating powerful water and oil repellency. Surfaces treated with FILAFOB resist spills and staining while maintaining their natural appearance.',
              },
              {
                title: 'Color Enhancement Options',
                content: 'For projects where design intent calls for enhanced stone color and depth, FILA offers wet-look sealers like FilaWET Eco. These products intensify the natural colors and veining of stone surfaces, creating the appearance of wet stone permanently. The water-based formula provides both aesthetic enhancement and practical stain protection in a single application.',
              },
              {
                title: 'Eco-Friendly Formulations',
                content: 'FILA\'s ECO PLUS range delivers professional-grade protection with reduced environmental impact. Water-based formulations meet increasingly strict VOC regulations while providing performance comparable to traditional solvent-based products. These options are particularly valuable for indoor applications in occupied buildings and projects targeting green building certifications.',
              },
              {
                title: 'Manufacturer Partnerships',
                content: 'FILA\'s credibility is demonstrated by partnerships with more than 240 leading tile and stone manufacturers who recommend FILA products for their materials. This industry endorsement reflects decades of proven performance across virtually every surface type. When manufacturers trust FILA to protect their products, specifiers can be confident in the technology.',
              },
              {
                title: '80 Years of Italian Innovation',
                content: 'Since 1943, FILA has focused exclusively on surface care, developing specialized chemistry for each material type. This singular focus has produced deep expertise in stone and tile protection that general construction chemical companies cannot match. Every FILA formulation reflects eight decades of research, testing, and refinement in Italian laboratories.',
              },
              {
                title: 'Application and Support',
                content: 'Successful sealing requires proper product selection, surface preparation, and application technique. Lapiz Blue provides comprehensive support for FILA sealer projects including product recommendations based on surface analysis, coverage calculations, application guidance, and troubleshooting. Our technical team brings local experience to FILA\'s international expertise.',
              },
            ],
          },
          suggestedImages: [
            { description: 'FILAMP90 application on polished marble surface', alt: 'Marble sealer application FILA MP90 UAE' },
            { description: 'Natural stone countertop protected with FILA sealer', alt: 'Kitchen countertop stone sealer Dubai' },
            { description: 'Before and after wet-look enhancement with FilaWET', alt: 'Wet look stone sealer color enhancement' },
            { description: 'FILAFOB application on porous granite flooring', alt: 'Granite floor sealer application UAE' },
            { description: 'Water beading on sealed natural stone surface', alt: 'Water repellent stone sealer test' },
            { description: 'Professional applying FILA sealer to exterior stone', alt: 'Exterior stone sealing professional application' },
            { description: 'Range of FILA sealer products for different surfaces', alt: 'FILA sealer product range UAE' },
            { description: 'Protected stone surface resisting coffee stain', alt: 'Stain resistant sealed stone surface' },
          ],
        },
      },
      {
        slug: 'cleaners',
        name: 'Cleaners',
        description: 'Specialized cleaning products for all types of surfaces and materials.',
        metaDescription: 'FILA cleaners UAE - Professional surface cleaning products for tiles, stone, wood, and concrete in Dubai.',
        images: ['/images/brands/fila/cleaners.jpg'],
        content: {
          seoTitle: 'FILA Cleaners UAE | PS87 PRO & Surface Care Products',
          h1: 'Specialized Surface Cleaning with FILA Professional Products',
          intro: 'FILA delivers targeted cleaning solutions developed through 80 years of Italian surface care expertise. Unlike generic cleaners, FILA formulations are engineered for specific surfaces and cleaning challenges - from post-installation residue removal to stubborn stain elimination. The range includes acidic descalers for cement and limescale, alkaline degreasers for oils and fats, and pH-neutral formulas safe for delicate natural stone. Trusted by over 240 tile and stone manufacturers, FILA cleaners restore surfaces without damaging the materials beneath, making them essential for both new installations and ongoing maintenance.',
          whySection: {
            title: 'Why Choose FILA Cleaners',
            bullets: [
              'PS87 PRO professional-grade degreasing cleaner for heavy-duty applications',
              'Cleaner PRO concentrated neutral detergent with flexible dilution ratios',
              'FILAZERO acidic cleaner for post-installation residue removal',
              'Surface-specific formulations for stone, tile, terracotta, and concrete',
              'Stain-targeted removers for organic stains, rust, and grout haze',
              '80+ years Italian expertise in surface care chemistry',
              'Trusted by 240+ leading tile and stone manufacturers globally',
            ],
          },
          applications: {
            title: 'Ideal Applications',
            items: [
              'Post-installation cleaning to remove grout residue and cement film',
              'Deep cleaning of heavily soiled commercial floors',
              'Routine maintenance of natural stone and tile surfaces',
              'Stain removal from organic spills like coffee, wine, and oil',
              'Descaling of limescale deposits in bathrooms and kitchens',
              'Restoration cleaning of neglected or dirty surfaces',
            ],
          },
          howToChoose: {
            title: 'How to Select the Right FILA Cleaner',
            bullets: [
              'Post-installation residue: FILAZERO acidic cleaner for cement and grout haze',
              'Heavy grease/dirt: PS87 PRO alkaline degreaser for deep cleaning',
              'Routine maintenance: Cleaner PRO neutral formula at high dilution (1:200)',
              'Epoxy grout film: FILASR95 specialized epoxy remover',
              'Limescale/hard water: FILADETERDEK acidic descaler',
              'Organic stains: FILANO SPOT for coffee, wine, and food marks',
              'Rust stains: FILACR10 metal stain remover',
              'Sensitive stone: Always use pH-neutral cleaners on marble and limestone',
            ],
          },
          commonMistakes: {
            title: 'Common Cleaning Mistakes to Avoid',
            bullets: [
              'Using acidic cleaners on acid-sensitive stones like marble and limestone',
              'Applying undiluted concentrated products when dilution is specified',
              'Allowing cleaning solutions to dry on surfaces before rinsing',
              'Using abrasive tools that scratch polished finishes',
              'Neglecting to test cleaners on inconspicuous areas first',
            ],
          },
          trustSignals: {
            title: 'Why Professionals Trust FILA Cleaners',
            items: [
              { label: 'Heritage', value: '80+ Years Italian Expertise' },
              { label: 'Endorsement', value: '240+ Manufacturer Partners' },
              { label: 'Chemistry', value: 'Acidic, Neutral, Alkaline' },
              { label: 'Formulas', value: 'Surface-Specific Solutions' },
              { label: 'Range', value: 'Post-Install to Maintenance' },
              { label: 'Support', value: 'Lapiz Blue Technical Team' },
            ],
          },
          faqs: [
            {
              question: 'What is the difference between acidic, neutral, and alkaline cleaners?',
              answer: 'Acidic cleaners like FILAZERO remove mineral deposits, cement residue, and limescale. Alkaline cleaners like PS87 PRO cut through grease, oils, and organic dirt. Neutral cleaners like Cleaner PRO are safe for all surfaces including acid-sensitive stones like marble. The choice depends on what you need to remove and what surface you are cleaning.',
            },
            {
              question: 'Can FILA acidic cleaners be used on marble?',
              answer: 'No, acidic cleaners should never be used on acid-sensitive stones like marble, limestone, travertine, or any polished calcium-based material. Acid will etch and damage these surfaces. Use only pH-neutral cleaners like Cleaner PRO for marble and limestone. FILA acidic products are designed for porcelain, ceramic, granite, and other acid-resistant surfaces.',
            },
            {
              question: 'How do I remove grout haze after tile installation?',
              answer: 'For cement-based grout residue, FILAZERO is the recommended solution. Apply diluted product to the affected area, allow brief contact time, agitate with a pad, then rinse thoroughly. For epoxy grout haze, use FILASR95 which is specifically formulated for epoxy film removal. Always complete cleaning within 7-10 days of grouting for best results.',
            },
            {
              question: 'What dilution ratio should I use for Cleaner PRO?',
              answer: 'Cleaner PRO is highly concentrated and dilution depends on cleaning intensity needed. For routine mopping, dilute 1:200 (no rinse required). For normal cleaning, use 1:100 to 1:50. For heavy soiling, use 1:30. The concentrated formula makes it economical - one liter can yield up to 200 liters of cleaning solution for regular maintenance.',
            },
            {
              question: 'How do I remove rust stains from stone or tile?',
              answer: 'FILACR10 is specifically formulated for rust and metal stain removal. Apply undiluted to the stain, allow contact time as specified, then rinse thoroughly. For stubborn stains, repeat application may be needed. Always test in an inconspicuous area first, and avoid use on acid-sensitive stones.',
            },
            {
              question: 'Can FILA cleaners damage sealed surfaces?',
              answer: 'When used correctly at recommended dilutions, FILA cleaners are safe for sealed surfaces. In fact, proper cleaning helps maintain sealer effectiveness. However, using harsh cleaners or incorrect products can degrade sealers over time. Neutral cleaners like Cleaner PRO are the safest choice for routine maintenance of sealed surfaces.',
            },
            {
              question: 'How often should professional deep cleaning be performed?',
              answer: 'Deep cleaning frequency depends on traffic and use. High-traffic commercial spaces may need quarterly deep cleaning with products like PS87 PRO. Residential spaces typically need deep cleaning annually. Regular maintenance with Cleaner PRO between deep cleans extends intervals and keeps surfaces looking their best.',
            },
            {
              question: 'Does Lapiz Blue provide guidance on FILA cleaner selection?',
              answer: 'Yes, Lapiz Blue offers comprehensive technical support for FILA cleaning products. Our team can recommend the appropriate cleaner based on your surface type, the type of soiling or stain, and your specific cleaning challenge. We provide dilution guidance, application techniques, and troubleshooting support.',
            },
          ],
          cta: {
            title: 'Clean and Restore Surfaces with FILA',
            subtitle: 'Professional-grade cleaners engineered for every surface and challenge',
            checklist: [
              'PS87 PRO heavy-duty degreasing cleaner',
              'Cleaner PRO concentrated neutral detergent',
              'FILAZERO post-installation residue remover',
              'Stain-specific removers for rust, organic, and epoxy',
              'FILADETERDEK acidic descaler for limescale',
              'Technical guidance from Lapiz Blue experts',
              'Full range available across UAE',
            ],
          },
          brandCopy: {
            sections: [
              {
                title: 'PS87 PRO Heavy-Duty Cleaning',
                content: 'PS87 PRO is FILA\'s professional-grade degreasing cleaner for challenging cleaning tasks. Its alkaline formula cuts through grease, oils, waxes, and heavy organic soiling on porcelain, ceramic, unpolished natural stone, and concrete. Available in concentrated form, it can be used diluted for regular cleaning or full strength for stubborn buildup. Professional contractors rely on PS87 PRO for post-construction cleaning and restoration projects.',
              },
              {
                title: 'Cleaner PRO Neutral Maintenance',
                content: 'Cleaner PRO represents FILA\'s solution for safe, effective routine maintenance across all surface types. Its pH-neutral formula cleans without attacking delicate materials like marble and limestone. The highly concentrated formula dilutes from 1:30 for heavy cleaning to 1:200 for daily mopping - at high dilution, no rinse is needed. This versatility and economy make it the foundation of professional maintenance programs.',
              },
              {
                title: 'Post-Installation Cleaning',
                content: 'New tile and stone installations require specialized cleaning to remove grout residue, cement film, and construction debris. FILAZERO acidic cleaner dissolves cement-based residues on acid-resistant surfaces. For epoxy grout installations, FILASR95 removes the characteristic film that standard cleaners cannot address. Proper post-installation cleaning is essential before sealing and occupancy.',
              },
              {
                title: 'Stain Removal Specialists',
                content: 'FILA offers targeted solutions for specific stain types. FILANO SPOT removes organic stains from coffee, wine, food, and similar sources. FILACR10 tackles rust and metal marks that standard cleaners cannot remove. FILADETERDEK descales limescale and hard water deposits in bathrooms. This targeted approach ensures effective stain removal without unnecessary surface exposure to harsh chemicals.',
              },
              {
                title: 'Surface Chemistry Expertise',
                content: 'FILA\'s 80 years of surface care focus has produced deep understanding of how different cleaners interact with various materials. This expertise prevents damage while maximizing cleaning effectiveness. Knowing that marble dissolves in acid, that grease requires alkaline chemistry, and that routine maintenance needs neutral pH allows FILA to engineer optimal solutions for each scenario.',
              },
              {
                title: 'Manufacturer Recommended',
                content: 'More than 240 leading tile and stone manufacturers recommend FILA products for care of their materials. This industry endorsement reflects confidence that FILA cleaners will maintain surface beauty without causing damage. When the companies that make surfaces trust FILA to clean them, specifiers and end users can share that confidence.',
              },
              {
                title: 'Application and Support',
                content: 'Effective cleaning requires matching the right product to the specific surface and soiling type. Lapiz Blue provides comprehensive support for FILA cleaning projects including product recommendations, dilution guidance, application techniques, and troubleshooting. Our technical team combines local experience with FILA\'s international expertise to solve UAE surface care challenges.',
              },
            ],
          },
          suggestedImages: [
            { description: 'PS87 PRO application on commercial tile floor', alt: 'Heavy duty tile floor cleaning UAE' },
            { description: 'Post-installation cleaning removing grout haze', alt: 'Grout residue removal FILA cleaners' },
            { description: 'Cleaner PRO dilution for routine maintenance', alt: 'Neutral floor cleaner dilution professional' },
            { description: 'Before and after stain removal on natural stone', alt: 'Stone stain removal FILA UAE' },
            { description: 'Bathroom descaling with FILADETERDEK', alt: 'Limescale removal bathroom tiles Dubai' },
            { description: 'Professional cleaning team using FILA products', alt: 'Professional surface cleaning FILA' },
            { description: 'Range of FILA cleaning products for different needs', alt: 'FILA cleaner product range UAE' },
            { description: 'Sparkling clean marble floor after FILA treatment', alt: 'Clean marble floor maintenance Dubai' },
          ],
        },
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
