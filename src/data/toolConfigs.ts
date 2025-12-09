/**
 * Tool Configuration System
 * Follows same structure as brands but for tools category
 */

import type { BrandConfig, ProductLine } from './brandConfigs';

export const toolConfigs: Record<string, BrandConfig> = {
  montolit: {
    slug: 'montolit',
    name: 'Montolit',
    layout: 'custom',
    logo: '/images/construction-tools/montolit.png',
    website: 'https://www.montolit.com',
    theme: {
      primary: '#FF6B00',
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/montolit/hero.jpg',
      alt: 'Montolit - Professional Tile Cutting Tools',
    },
    description: 'Italian manufacturer of professional tile cutting and installation tools. Industry-leading precision and durability for contractors.',
    metaDescription: 'Montolit UAE - Professional tile cutters, manual cutters, and installation tools for contractors in Dubai, Abu Dhabi, Sharjah.',
    category: 'tool',
    productLines: [
      {
        slug: 'tile-cutters-and-blades',
        name: 'Tile Cutters and Blades',
        description: 'Professional tile cutters and diamond blades for precise cutting of ceramic, porcelain, and natural stone tiles.',
        metaDescription: 'Montolit tile cutters and blades UAE - Professional tile cutting tools for ceramic, porcelain, and stone in Dubai.',
        images: ['/images/tools/montolit/tile-cutters.jpg'],
      },
      {
        slug: 'large-format-and-electrical-tools',
        name: 'Large Format and Electrical Tools',
        description: 'Specialized tools for large format tiles and electric cutting systems for high-volume professional work.',
        metaDescription: 'Montolit large format tile tools UAE - Electric cutters and large format tile handling systems for Dubai contractors.',
        images: ['/images/tools/montolit/large-format.jpg'],
      },
      {
        slug: 'accessories',
        name: 'Accessories',
        description: 'Essential accessories including scoring wheels, breaking systems, and replacement parts for Montolit tools.',
        metaDescription: 'Montolit accessories UAE - Scoring wheels, replacement parts, and tool accessories in Dubai.',
        images: ['/images/tools/montolit/accessories.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Montolit products including transport systems, workstations, and specialized installation tools.',
        metaDescription: 'Montolit other products UAE - Transport systems, workstations, and specialized tools in Dubai.',
        images: ['/images/tools/montolit/others.jpg'],
      },
    ],
  },

  dewalt: {
    slug: 'dewalt',
    name: 'DeWalt',
    layout: 'custom',
    logo: '/images/construction-tools/dewalt.png',
    website: 'https://www.dewalt.com',
    theme: {
      primary: '#FEBD17',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/dewalt/hero.jpg',
      alt: 'DeWalt - Professional Power Tools',
    },
    description: 'American manufacturer of professional-grade power tools, hand tools, and accessories trusted by contractors worldwide.',
    metaDescription: 'DeWalt UAE - Professional power tools, hand tools, and accessories for contractors in Dubai, Abu Dhabi, Sharjah.',
    category: 'tool',
    productLines: [
      {
        slug: 'hand-tools',
        name: 'Hand Tools',
        description: 'Professional hand tools including hammers, screwdrivers, pliers, and measuring tools built for durability.',
        metaDescription: 'DeWalt hand tools UAE - Professional hand tools for construction and renovation in Dubai.',
        images: ['/images/tools/dewalt/hand-tools.jpg'],
      },
      {
        slug: 'accessories',
        name: 'Accessories',
        description: 'Tool accessories including drill bits, saw blades, sanding discs, and storage solutions.',
        metaDescription: 'DeWalt accessories UAE - Drill bits, saw blades, and tool accessories in Dubai.',
        images: ['/images/tools/dewalt/accessories.jpg'],
      },
      {
        slug: 'anchors-and-fasteners',
        name: 'Anchors and Fasteners',
        description: 'Professional anchoring systems and fasteners for concrete, masonry, and steel applications.',
        metaDescription: 'DeWalt anchors and fasteners UAE - Professional anchoring systems for construction in Dubai.',
        images: ['/images/tools/dewalt/anchors.jpg'],
      },
      {
        slug: 'drills-and-grinders',
        name: 'Drills and Grinders',
        description: 'High-performance drills, impact drivers, and angle grinders for professional applications.',
        metaDescription: 'DeWalt drills and grinders UAE - Professional drilling and grinding tools in Dubai.',
        images: ['/images/tools/dewalt/drills.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional DeWalt products including saws, vacuums, lighting, and jobsite equipment.',
        metaDescription: 'DeWalt other products UAE - Saws, vacuums, and jobsite equipment in Dubai.',
        images: ['/images/tools/dewalt/others.jpg'],
      },
    ],
  },

  hilti: {
    slug: 'hilti',
    name: 'Hilti',
    layout: 'custom',
    logo: '/images/construction-tools/hilti.png',
    website: 'https://www.hilti.com',
    theme: {
      primary: '#E2001A',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/hilti/hero.jpg',
      alt: 'Hilti - Professional Power Tools',
    },
    description: 'Leading manufacturer of professional power tools, anchoring systems, and construction equipment for the building industry.',
    metaDescription: 'Hilti UAE - Professional power tools, drilling equipment, and construction tools for contractors in Dubai.',
    category: 'tool',
    productLines: [
      {
        slug: 'power-tools',
        name: 'Power Tools',
        description: 'Professional power tools including rotary hammers, demolition tools, and cordless systems.',
        metaDescription: 'Hilti power tools UAE - Professional rotary hammers and cordless systems in Dubai.',
        images: ['/images/tools/hilti/power-tools.jpg'],
      },
      {
        slug: 'anchoring',
        name: 'Anchoring',
        description: 'Advanced anchoring systems including mechanical anchors, chemical anchors, and direct fastening.',
        metaDescription: 'Hilti anchoring UAE - Mechanical and chemical anchoring systems for Dubai construction.',
        images: ['/images/tools/hilti/anchoring.jpg'],
      },
      {
        slug: 'laser-measuring-tools-and-scanners',
        name: 'Laser Measuring Tools and Scanners',
        description: 'Precision laser measuring, leveling, and detection tools for accurate layout and scanning.',
        metaDescription: 'Hilti laser tools UAE - Laser measuring and scanning equipment in Dubai.',
        images: ['/images/tools/hilti/laser.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Hilti products including firestop systems, installation channels, and modular support.',
        metaDescription: 'Hilti other products UAE - Firestop and installation systems in Dubai.',
        images: ['/images/tools/hilti/others.jpg'],
      },
    ],
  },

  peygran: {
    slug: 'peygran',
    name: 'Peygran',
    layout: 'custom',
    logo: '/images/construction-tools/peygran.png',
    website: 'https://www.peygran.com',
    theme: {
      primary: '#00A651',
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/peygran/hero.jpg',
      alt: 'Peygran - Tile Installation Systems',
    },
    description: 'Spanish manufacturer of innovative tile leveling systems and installation accessories for perfect tile installations.',
    metaDescription: 'Peygran UAE - Tile leveling systems, spacers, and installation tools for contractors in Dubai.',
    category: 'tool',
    productLines: [
      {
        slug: 'levelling',
        name: 'Levelling',
        description: 'Professional tile leveling systems for lippage-free installations on floors and walls.',
        metaDescription: 'Peygran leveling systems UAE - Tile leveling clips and wedges for Dubai contractors.',
        images: ['/images/tools/peygran/levelling.jpg'],
      },
      {
        slug: 'spacers',
        name: 'Spacers',
        description: 'Precision tile spacers in various sizes for consistent grout joints and professional results.',
        metaDescription: 'Peygran spacers UAE - Tile spacers for consistent grout lines in Dubai.',
        images: ['/images/tools/peygran/spacers.jpg'],
      },
      {
        slug: 'cement-tools',
        name: 'Cement Tools',
        description: 'Professional cement and grouting tools for tile installation and finishing.',
        metaDescription: 'Peygran cement tools UAE - Grouting and cement tools for tile installation in Dubai.',
        images: ['/images/tools/peygran/cement-tools.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Peygran products including knee pads, buckets, and installation accessories.',
        metaDescription: 'Peygran other products UAE - Installation accessories and tools in Dubai.',
        images: ['/images/tools/peygran/others.jpg'],
      },
    ],
  },

  bihui: {
    slug: 'bihui',
    name: 'Bihui',
    layout: 'custom',
    logo: '/images/construction-tools/bihui.png',
    website: 'https://www.bihuitools.com',
    theme: {
      primary: '#009999',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/bihui/hero.jpg',
      alt: 'Bihui - Tile Installation Tools',
    },
    description: 'Specialist in professional tile installation tools, power tools, and accessories for modern construction.',
    metaDescription: 'Bihui UAE - Tile installation tools, leveling systems, and tiling accessories for Dubai contractors.',
    category: 'tool',
    productLines: [
      {
        slug: 'power-tools',
        name: 'Power Tools',
        description: 'Professional power tools designed specifically for tile and stone installation work.',
        metaDescription: 'Bihui power tools UAE - Professional tile installation power tools in Dubai.',
        images: ['/images/tools/bihui/power-tools.jpg'],
      },
      {
        slug: 'laser-measuring-tools-and-scanners',
        name: 'Laser Measuring Tools and Scanners',
        description: 'Precision laser measuring and layout tools for accurate tile positioning and alignment.',
        metaDescription: 'Bihui laser tools UAE - Laser measuring equipment for tile installation in Dubai.',
        images: ['/images/tools/bihui/laser.jpg'],
      },
      {
        slug: 'tile-and-marble-grinders',
        name: 'Tile and Marble Grinders',
        description: 'Specialized grinders for tile edge profiling, marble polishing, and surface preparation.',
        metaDescription: 'Bihui tile grinders UAE - Tile and marble grinding tools in Dubai.',
        images: ['/images/tools/bihui/grinders.jpg'],
      },
      {
        slug: 'cement-tools',
        name: 'Cement Tools',
        description: 'Professional cement mixing, application, and finishing tools for tile installation.',
        metaDescription: 'Bihui cement tools UAE - Cement mixing and application tools in Dubai.',
        images: ['/images/tools/bihui/cement-tools.jpg'],
      },
    ],
  },

  keiser: {
    slug: 'keiser',
    name: 'Keiser',
    layout: 'custom',
    logo: '/images/construction-tools/keiser.png',
    website: 'https://www.keiser-tools.com',
    theme: {
      primary: '#1E6BA8',
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/keiser/hero.jpg',
      alt: 'Keiser - Professional Finishing Tools',
    },
    description: 'Professional finishing tools including paint sprayers, plaster tools, and surface preparation equipment.',
    metaDescription: 'Keiser UAE - Electric paint sprayers, plaster tools, and finishing equipment for Dubai contractors.',
    category: 'tool',
    productLines: [
      {
        slug: 'electric-paint-sprayers',
        name: 'Electric Paint Sprayers',
        description: 'Professional electric paint sprayers for interior and exterior coating applications.',
        metaDescription: 'Keiser paint sprayers UAE - Electric paint spraying equipment in Dubai.',
        images: ['/images/tools/keiser/paint-sprayers.jpg'],
      },
      {
        slug: 'plaster-tools',
        name: 'Plaster Tools',
        description: 'Professional plastering tools including trowels, floats, and finishing equipment.',
        metaDescription: 'Keiser plaster tools UAE - Professional plastering equipment in Dubai.',
        images: ['/images/tools/keiser/plaster-tools.jpg'],
      },
      {
        slug: 'grinders-and-polishing',
        name: 'Grinders and Polishing',
        description: 'Surface grinders and polishing tools for concrete, stone, and floor finishing.',
        metaDescription: 'Keiser grinders UAE - Surface grinding and polishing tools in Dubai.',
        images: ['/images/tools/keiser/grinders.jpg'],
      },
      {
        slug: 'mixing-applications',
        name: 'Mixing Applications',
        description: 'Professional mixing tools and stations for paint, plaster, and construction materials.',
        metaDescription: 'Keiser mixing tools UAE - Professional mixing equipment in Dubai.',
        images: ['/images/tools/keiser/mixing.jpg'],
      },
    ],
  },
};

// Helper function to get tool by slug
export function getToolConfig(slug: string): BrandConfig | null {
  return toolConfigs[slug] || null;
}

// Helper function to get all tools
export function getAllTools(): BrandConfig[] {
  return Object.values(toolConfigs).filter(t => t.category === 'tool');
}

// Helper function to get product line from tool
export function getToolProductLine(toolSlug: string, productLineSlug: string): ProductLine | null {
  const tool = getToolConfig(toolSlug);
  if (!tool) return null;
  return tool.productLines.find(pl => pl.slug === productLineSlug) || null;
}
