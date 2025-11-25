/**
 * Brand Feature - represents a key feature or benefit of a brand
 */
export interface BrandFeature {
  title: string;
  description: string;
  icon?: string; // Lucide icon name, e.g., "Shield", "Zap"
}

/**
 * Brand Product - represents a product or product line
 */
export interface BrandProduct {
  name: string;
  description: string;
  image?: string;
  href?: string;
}

/**
 * Brand SEO - all SEO-related metadata for a brand page
 */
export interface BrandSEO {
  metaTitle: string; // 50-60 chars ideal
  metaDescription: string; // 150-160 chars ideal
  keywords?: string[];
  ogTitle?: string; // Falls back to metaTitle
  ogDescription?: string; // Falls back to metaDescription
  noIndex?: boolean; // For draft brands
}

/**
 * Product Line - represents a product category/line within a brand
 * (Structure ready for future implementation of nested routes)
 */
export interface ProductLine {
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

/**
 * Brand Data - complete data structure for a brand
 */
export interface BrandData {
  // Identity & Routing
  slug: string; // URL segment, lowercase, hyphenated
  name: string; // Display name
  tagline: string; // Short tagline for cards and hero

  // SEO
  seo: BrandSEO;

  // Images (all paths relative to /public)
  logo: string; // Brand logo, ideally SVG
  heroImage: string; // Hero background/featured image
  heroImageAlt: string; // Alt text for hero
  ogImage: string; // 1200x630 for social sharing

  // Content
  description: string; // Main brand description (can be multiple paragraphs)
  features?: BrandFeature[]; // Optional features/benefits list
  products?: BrandProduct[]; // Optional product highlights

  // Product Lines (for future nested routes)
  productLines?: ProductLine[];

  // Structured Data
  website?: string; // Official brand website
  foundedYear?: number;
  headquarters?: string;

  // Internal
  isPublished: boolean; // Only published brands appear on site
  updatedAt: string; // ISO date string for sitemap lastmod
}
