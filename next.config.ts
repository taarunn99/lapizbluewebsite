import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Stability settings
  reactStrictMode: true,

  // Note: productionBrowserSourceMaps disabled - causes Next.js 16 invariant error

  // SEO Redirects - WordPress to Next.js migration
  async redirects() {
    return [
      // ===== CORE PAGES =====
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/blogs/', destination: '/blog', permanent: true },
      { source: '/career', destination: '/contact', permanent: true },
      { source: '/career/', destination: '/contact', permanent: true },
      { source: '/gallery', destination: '/about', permanent: true },
      { source: '/gallery/', destination: '/about', permanent: true },
      { source: '/introduction', destination: '/', permanent: true },
      { source: '/introduction/', destination: '/', permanent: true },
      { source: '/manufacturers', destination: '/brands', permanent: true },
      { source: '/manufacturers/', destination: '/brands', permanent: true },

      // ===== BRAND PAGES =====
      // Mapei (26 backlinks)
      { source: '/mapei', destination: '/brands/mapei', permanent: true },
      { source: '/mapei/', destination: '/brands/mapei', permanent: true },
      // Montolit (2 backlinks)
      { source: '/montolit', destination: '/tools/montolit', permanent: true },
      { source: '/montolit/', destination: '/tools/montolit', permanent: true },
      // Dulux -> AkzoNobel
      { source: '/dulux', destination: '/brands/akzonobel', permanent: true },
      { source: '/dulux/', destination: '/brands/akzonobel', permanent: true },
      { source: '/brands/dulux', destination: '/brands/akzonobel', permanent: true },
      { source: '/brands/dulux/:path*', destination: '/brands/akzonobel/:path*', permanent: true },
      // Lapiz Blue Marble -> Granimarmo Classic
      { source: '/lapiz-blue-marble', destination: '/brands/granimarmo-classic', permanent: true },
      { source: '/lapiz-blue-marble/', destination: '/brands/granimarmo-classic', permanent: true },
      // Removed brands -> /brands (preserve backlinks)
      { source: '/exeed-dry-mortar', destination: '/brands', permanent: true },
      { source: '/exeed-dry-mortar/', destination: '/brands', permanent: true },
      { source: '/exceed-litercrete', destination: '/brands', permanent: true },
      { source: '/exceed-litercrete/', destination: '/brands', permanent: true },

      // ===== MAPEI PRODUCT PAGES =====
      { source: '/mapei/adhesive-and-grouts', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/mapei/adhesive-and-grouts/', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/waterproofing', destination: '/brands/mapei/waterproofing', permanent: true },
      { source: '/waterproofing/', destination: '/brands/mapei/waterproofing', permanent: true },
      { source: '/flooring', destination: '/brands/mapei/flooring-systems', permanent: true },
      { source: '/flooring/', destination: '/brands/mapei/flooring-systems', permanent: true },
      { source: '/sealers-cleaners', destination: '/brands/mapei/sealants-and-anchoring', permanent: true },
      { source: '/sealers-cleaners/', destination: '/brands/mapei/sealants-and-anchoring', permanent: true },
      { source: '/concrete-repair', destination: '/brands/mapei/concrete-additives-and-repair-systems', permanent: true },
      { source: '/concrete-repair/', destination: '/brands/mapei/concrete-additives-and-repair-systems', permanent: true },
      // Mapei products
      { source: '/product/kerapoxy', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/product/kerapoxy/', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/product/kerapoxy-adhesive', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/product/kerapoxy-adhesive/', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/product/mapelastic-smart', destination: '/brands/mapei/waterproofing', permanent: true },
      { source: '/product/mapelastic-smart/', destination: '/brands/mapei/waterproofing', permanent: true },
      { source: '/product/ultracolour-plus', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },
      { source: '/product/ultracolour-plus/', destination: '/brands/mapei/tile-adhesives-and-grouts', permanent: true },

      // ===== PROFILPAS PRODUCT PAGES =====
      { source: '/metal-line-skirting-boards', destination: '/brands/profilpas/skirting-boards', permanent: true },
      { source: '/metal-line-skirting-boards/', destination: '/brands/profilpas/skirting-boards', permanent: true },
      { source: '/pvc-line-skirting-boards', destination: '/brands/profilpas/skirting-boards', permanent: true },
      { source: '/pvc-line-skirting-boards/', destination: '/brands/profilpas/skirting-boards', permanent: true },
      { source: '/profiles-for-floors-of-different-heights', destination: '/brands/profilpas/flooring-profiles', permanent: true },
      { source: '/profiles-for-floors-of-different-heights/', destination: '/brands/profilpas/flooring-profiles', permanent: true },
      { source: '/profiles-for-floors-of-equal-height', destination: '/brands/profilpas/flooring-profiles', permanent: true },
      { source: '/profiles-for-floors-of-equal-height/', destination: '/brands/profilpas/flooring-profiles', permanent: true },
      { source: '/profiles-for-wooden-and-laminate-floors', destination: '/brands/profilpas/wooden-laminate-and-lvt-floor-profiles', permanent: true },
      { source: '/profiles-for-wooden-and-laminate-floors/', destination: '/brands/profilpas/wooden-laminate-and-lvt-floor-profiles', permanent: true },
      { source: '/profiles-for-lvt-floors', destination: '/brands/profilpas/wooden-laminate-and-lvt-floor-profiles', permanent: true },
      { source: '/profiles-for-lvt-floors/', destination: '/brands/profilpas/wooden-laminate-and-lvt-floor-profiles', permanent: true },
      { source: '/profiles-for-balconies-and-terraces', destination: '/brands/profilpas/balcony-and-terrace-profiles', permanent: true },
      { source: '/profiles-for-balconies-and-terraces/', destination: '/brands/profilpas/balcony-and-terrace-profiles', permanent: true },
      { source: '/stair-nosing-profiles', destination: '/brands/profilpas/movement-and-stairnosing', permanent: true },
      { source: '/stair-nosing-profiles/', destination: '/brands/profilpas/movement-and-stairnosing', permanent: true },
      { source: '/bathroom-profiles-and-systems', destination: '/brands/profilpas/bathroom-profiles', permanent: true },
      { source: '/bathroom-profiles-and-systems/', destination: '/brands/profilpas/bathroom-profiles', permanent: true },
      { source: '/external-corner-profiles', destination: '/brands/profilpas/corner-profiles', permanent: true },
      { source: '/external-corner-profiles/', destination: '/brands/profilpas/corner-profiles', permanent: true },
      { source: '/internal-corner-profiles', destination: '/brands/profilpas/corner-profiles', permanent: true },
      { source: '/internal-corner-profiles/', destination: '/brands/profilpas/corner-profiles', permanent: true },
      { source: '/movement-joints', destination: '/brands/profilpas/movement-and-stairnosing', permanent: true },
      { source: '/movement-joints/', destination: '/brands/profilpas/movement-and-stairnosing', permanent: true },
      { source: '/prolight', destination: '/brands/profilpas/prolight-and-tile-trims', permanent: true },
      { source: '/prolight/', destination: '/brands/profilpas/prolight-and-tile-trims', permanent: true },
      { source: '/high-quality-tile-profiles-trims', destination: '/brands/profilpas', permanent: true },
      { source: '/high-quality-tile-profiles-trims/', destination: '/brands/profilpas', permanent: true },
      { source: '/profilpas-dubai-catalog', destination: '/brands/profilpas', permanent: true },
      { source: '/profilpas-dubai-catalog/', destination: '/brands/profilpas', permanent: true },

      // ===== MONTOLIT TOOL PAGES =====
      { source: '/electric-tile-cutting-saws', destination: '/tools/montolit/large-format-and-electrical-tools', permanent: true },
      { source: '/electric-tile-cutting-saws/', destination: '/tools/montolit/large-format-and-electrical-tools', permanent: true },
      { source: '/tile-drill-bits-drilling-tool', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/tile-drill-bits-drilling-tool/', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/large-format-tiles-and-porcelain-slabs-handling', destination: '/tools/montolit/large-format-and-electrical-tools', permanent: true },
      { source: '/large-format-tiles-and-porcelain-slabs-handling/', destination: '/tools/montolit/large-format-and-electrical-tools', permanent: true },
      { source: '/tiles-cutting-for-manual-used', destination: '/tools/montolit/tile-cutters-and-blades', permanent: true },
      { source: '/tiles-cutting-for-manual-used/', destination: '/tools/montolit/tile-cutters-and-blades', permanent: true },
      { source: '/masterpiuma-power-5-montolit', destination: '/tools/montolit/tile-cutters-and-blades', permanent: true },
      { source: '/masterpiuma-power-5-montolit/', destination: '/tools/montolit/tile-cutters-and-blades', permanent: true },
      { source: '/diamond-blades-and-cutting-discs', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/diamond-blades-and-cutting-discs/', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/tile-finishing-tools', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/tile-finishing-tools/', destination: '/tools/montolit/accessories', permanent: true },
      { source: '/discover-scx-dna-technology', destination: '/tools/montolit', permanent: true },
      { source: '/discover-scx-dna-technology/', destination: '/tools/montolit', permanent: true },

      // ===== BLOG POSTS (WordPress root -> /blog/) =====
      // Mapei posts
      { source: '/mapei-waterproofing-solutions-uae', destination: '/blog/mapei-waterproofing-solutions-uae', permanent: true },
      { source: '/mapei-concrete-repair-products-uae', destination: '/blog/mapei-concrete-repair-products-uae', permanent: true },
      { source: '/mapei-epoxy-grout-vs-cementitious-grout-which-to-choose', destination: '/blog/mapei-epoxy-grout-vs-cementitious-grout-which-to-choose', permanent: true },
      { source: '/mapei-waterproofing-in-uae-the-smart-builders-choice-for-long-lasting-results', destination: '/blog/mapei-waterproofing-in-uae-the-smart-builders-choice-for-long-lasting-results', permanent: true },
      { source: '/upgrade-your-surfaces-with-top-mapei-sealants', destination: '/blog/upgrade-your-surfaces-with-top-mapei-sealants', permanent: true },
      { source: '/fix-concrete-cracks-easily-with-mapei-concrete-repair-solutions', destination: '/blog/fix-concrete-cracks-easily-with-mapei-concrete-repair-solutions', permanent: true },
      { source: '/mapei-sports-flooring-enhances-durability-and-safety', destination: '/blog/mapei-sports-flooring-enhances-durability-and-safety', permanent: true },
      { source: '/is-your-shower-grout-changing-colour-how-mapei-tile-grout-can-help', destination: '/blog/is-your-shower-grout-changing-colour-how-mapei-tile-grout-can-help', permanent: true },
      { source: '/guide-to-maintaining-microtopping-flooring', destination: '/blog/guide-to-maintaining-microtopping-flooring', permanent: true },
      { source: '/how-mapei-waterproofing-prevents-costly-repairs-from-water-damage', destination: '/blog/how-mapei-waterproofing-prevents-costly-repairs-from-water-damage', permanent: true },
      { source: '/mapei-ultracolor-plus', destination: '/blog/mapei-ultracolor-plus', permanent: true },
      { source: '/why-property-owners-prefer-mapei-epoxy-flooring-over-concrete', destination: '/blog/why-property-owners-prefer-mapei-epoxy-flooring-over-concrete', permanent: true },
      { source: '/mapei-grout-suppliers-guide-to-finding-the-right-grout-for-your-project', destination: '/blog/mapei-grout-suppliers-guide-to-finding-the-right-grout-for-your-project', permanent: true },
      { source: '/mapei-concrete-repair-products-in-modern-construction', destination: '/blog/mapei-concrete-repair-products-in-modern-construction', permanent: true },
      // Profilpas posts
      { source: '/why-aluminium-tile-trim-gets-damaged-and-how-to-prevent-it', destination: '/blog/why-aluminium-tile-trim-gets-damaged-and-how-to-prevent-it', permanent: true },
      { source: '/how-to-cut-install-maintain-stainless-steel-tile-trims', destination: '/blog/how-to-cut-install-maintain-stainless-steel-tile-trims', permanent: true },
      { source: '/how-to-choose-the-right-tile-trims', destination: '/blog/how-to-choose-the-right-tile-trims', permanent: true },
      { source: '/top-trends-in-aluminium-tile-trims-for-dubai-interiors', destination: '/blog/top-trends-in-aluminium-tile-trims-for-dubai-interiors', permanent: true },
      { source: '/why-profilpas-tile-trims-make-a-difference-in-your-renovation', destination: '/blog/why-profilpas-tile-trims-make-a-difference-in-your-renovation', permanent: true },
      { source: '/6-sleek-linear-lighting-ideas-to-transform-any-modern-interior-with-led-profiles-led-trims', destination: '/blog/6-sleek-linear-lighting-ideas-to-transform-any-modern-interior-with-led-profiles-led-trims', permanent: true },
      { source: '/everything-you-need-to-know-about-led-light-profiles-and-light-trims-for-modern-interiors', destination: '/blog/everything-you-need-to-know-about-led-light-profiles-and-light-trims-for-modern-interiors', permanent: true },
      { source: '/fix-bad-tile-trim-installation', destination: '/blog/fix-bad-tile-trim-installation', permanent: true },
      { source: '/fix-height-differences-between-floors-easily-with-transition-strips', destination: '/blog/fix-height-differences-between-floors-easily-with-transition-strips', permanent: true },
      { source: '/prevent-slips-with-stair-nosing-for-tiled-step', destination: '/blog/prevent-slips-with-stair-nosing-for-tiled-step', permanent: true },
      { source: '/addressing-common-issues-with-pvc-tile-edge-trim-installation', destination: '/blog/addressing-common-issues-with-pvc-tile-edge-trim-installation', permanent: true },
      { source: '/beginners-guide-to-floor-tile-movement-joints', destination: '/blog/beginners-guide-to-floor-tile-movement-joints', permanent: true },
      { source: '/ways-to-use-led-light-profiles-for-any-space', destination: '/blog/ways-to-use-led-light-profiles-for-any-space', permanent: true },
      { source: '/adding-floor-tile-movement-joints-to-existing-tile-floors', destination: '/blog/adding-floor-tile-movement-joints-to-existing-tile-floors', permanent: true },
      { source: '/transition-strips-perfect-finishing-touch-for-any-floor', destination: '/blog/transition-strips-perfect-finishing-touch-for-any-floor', permanent: true },
      { source: '/how-metal-skirting-enhances-modern-interior-design', destination: '/blog/how-metal-skirting-enhances-modern-interior-design', permanent: true },
      { source: '/led-light-profiles-transforming-the-modern-interiors', destination: '/blog/led-light-profiles-transforming-the-modern-interiors', permanent: true },
      // Additional blog posts from GSC data
      { source: '/10-stunning-glass-mosaic-tile-designs-for-modern-homes', destination: '/blog/10-stunning-glass-mosaic-tile-designs-for-modern-homes', permanent: true },
      { source: '/transforming-your-home-with-italian-glass-mosaic-tiles', destination: '/blog/transforming-your-home-with-italian-glass-mosaic-tiles', permanent: true },
      { source: '/choosing-design-mosaic-tiles', destination: '/blog/choosing-design-mosaic-tiles', permanent: true },
      { source: '/role-of-premium-glass-mosaic-tiles', destination: '/blog/role-of-premium-glass-mosaic-tiles', permanent: true },

      // ===== WILDCARD PATTERNS =====
      // Product categories -> Brands
      { source: '/product-category/:path*', destination: '/brands', permanent: true },
      // WordPress categories -> Blog
      { source: '/category/:path*', destination: '/blog', permanent: true },
      // Tags -> Blog
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      // Author -> About
      { source: '/author/:path*', destination: '/about', permanent: true },
      // WP uploads (PDFs, images) -> Brands
      { source: '/wp-content/uploads/:path*', destination: '/brands', permanent: true },
      // WP admin -> Home (temporary, not permanent)
      { source: '/wp-admin/:path*', destination: '/', permanent: false },
      // Generic product -> Brands (catch-all for remaining products)
      { source: '/product/:path*', destination: '/brands', permanent: true },
    ];
  },

  // Reduce HMR crashes during development
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    // Configure allowed quality values for Next.js Image optimization
    // Values used: 80 (Hero), 85 (gallery, sliders), 90 (brand pages), 95 (hero), 100 (MD)
    qualities: [75, 80, 85, 90, 95, 100],
    // Optimize device sizes for LCP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long-term caching for optimized images (1 year)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lapizblue.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(process.cwd()),

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental optimizations for CSS and package imports
  experimental: {
    // Inline critical CSS to reduce render-blocking
    optimizeCss: true,
    // Better tree-shaking for common packages (Next.js handles chunking automatically)
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons', 'gsap'],
  },

  // Webpack config - only add necessary customizations, let Next.js handle splitChunks
  webpack: (config) => {
    // Return config without overriding splitChunks to avoid module loading conflicts
    return config;
  },
};

export default nextConfig;

