/**
 * Brand Configuration System
 * Defines layout types, product lines, and theming for all brands
 */

export type LayoutType = 'custom' | 'standard';

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
}

export interface UniqueSectionItem {
  name: string;
  description: string;
  icon?: string;
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
      primary: '#E2001A', // Mapei red (placeholder - will be updated)
      secondary: '#000000',
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
        metaDescription: 'Mapei tile adhesives and grouts in UAE - Professional solutions for ceramic, porcelain, and natural stone installations. Available in Dubai, Abu Dhabi, Sharjah.',
        images: ['/images/brands/mapei/tile-adhesives.jpg'],
      },
      {
        slug: 'waterproofing',
        name: 'Waterproofing',
        description: 'Complete waterproofing systems for bathrooms, balconies, terraces, and below-grade applications.',
        metaDescription: 'Mapei waterproofing systems UAE - Bathroom, balcony, terrace, and basement waterproofing solutions. Trusted by contractors in Dubai and UAE.',
        images: ['/images/brands/mapei/waterproofing.jpg'],
      },
      {
        slug: 'flooring-systems',
        name: 'Flooring Systems',
        description: 'Comprehensive flooring solutions including screeds, adhesives, and finishing products.',
        metaDescription: 'Mapei flooring systems UAE - Screeds, adhesives, and finishing products for commercial and residential projects in Dubai, Abu Dhabi, Sharjah.',
        images: ['/images/brands/mapei/flooring.jpg'],
      },
      {
        slug: 'sealants-and-anchoring',
        name: 'Sealants and Anchoring',
        description: 'Professional sealants and chemical anchoring systems for construction applications.',
        metaDescription: 'Mapei sealants and anchoring UAE - Professional construction sealants and chemical anchors for structural applications in UAE.',
        images: ['/images/brands/mapei/sealants.jpg'],
      },
      {
        slug: 'self-leveling-and-microcement',
        name: 'Self Leveling and Microcement',
        description: 'Self-leveling compounds and microcement for seamless floor finishes.',
        metaDescription: 'Mapei self-leveling and microcement UAE - Premium floor leveling compounds and decorative microcement finishes for UAE projects.',
        images: ['/images/brands/mapei/self-leveling.jpg'],
      },
      {
        slug: 'concrete-additives-and-repair-systems',
        name: 'Concrete Additives and Repair Systems',
        description: 'Advanced concrete additives, repair mortars, and structural strengthening systems.',
        metaDescription: 'Mapei concrete repair UAE - Concrete additives, repair mortars, and structural strengthening solutions for UAE construction projects.',
        images: ['/images/brands/mapei/concrete-repair.jpg'],
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
      primary: '#1E6BA8', // Placeholder
      secondary: '#406E8E',
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
        metaDescription: 'Profilpas corner profiles UAE - Protective wall edge and corner trims for commercial and residential projects in Dubai and UAE.',
        images: ['/images/brands/profilpas/corner-profiles.jpg'],
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
      primary: '#8B7355', // Warm Stone
      secondary: '#2C2420', // Dark Brown
      accent: '#F5F0E8', // Cream
    },
    hero: {
      type: 'image',
      src: '/images/brands/granimarmo/hero.jpg',
      alt: 'Granimarmo Classic - Premium Natural Stone',
    },
    description: 'Premium natural marble and decorative stone supplier.',
    metaDescription: 'Granimarmo Classic UAE - Premium marble, granite, and decorative natural stones for luxury projects in Dubai.',
    category: 'brand',
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
