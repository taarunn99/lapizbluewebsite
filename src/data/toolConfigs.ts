/**
 * Tool Configuration System
 * Follows same structure as brands but for tools category
 */

import type { BrandConfig, ProductLine } from './brandConfigs';

export const toolConfigs: Record<string, BrandConfig> = {
  // Tools will have same product line structure
  // Placeholders - you can add actual tool data later
  montolit: {
    slug: 'montolit',
    name: 'Montolit',
    layout: 'standard',
    logo: '/images/tools/montolit-logo.png',
    theme: {
      primary: '#FF6B00', // Placeholder
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/montolit/hero.jpg',
      alt: 'Montolit - Professional Tile Cutting Tools',
    },
    description: 'Italian manufacturer of professional tile cutting and installation tools.',
    metaDescription: 'Montolit UAE - Professional tile cutters, manual cutters, and installation tools for contractors in Dubai, Abu Dhabi, Sharjah.',
    category: 'tool',
    productLines: [],
  },

  hilti: {
    slug: 'hilti',
    name: 'Hilti',
    layout: 'standard',
    logo: '/images/tools/hilti-logo.png',
    theme: {
      primary: '#E2001A', // Placeholder
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/hilti/hero.jpg',
      alt: 'Hilti - Professional Power Tools',
    },
    description: 'Leading manufacturer of professional power tools and equipment.',
    metaDescription: 'Hilti UAE - Professional power tools, drilling equipment, and construction tools for contractors in Dubai.',
    category: 'tool',
    productLines: [],
  },

  bihui: {
    slug: 'bihui',
    name: 'Bihui',
    layout: 'standard',
    logo: '/images/tools/bihui-logo.png',
    theme: {
      primary: '#1E6BA8', // Placeholder
      secondary: '#406E8E',
    },
    hero: {
      type: 'image',
      src: '/images/tools/bihui/hero.jpg',
      alt: 'Bihui - Tile Installation Tools',
    },
    description: 'Specialist in tile installation tools and accessories.',
    metaDescription: 'Bihui UAE - Tile installation tools, leveling systems, and tiling accessories for Dubai contractors.',
    category: 'tool',
    productLines: [],
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
