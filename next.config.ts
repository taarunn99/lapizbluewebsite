import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Stability settings
  reactStrictMode: true,

  // Redirects for brand aliases (Dulux -> AkzoNobel)
  async redirects() {
    return [
      {
        source: '/dulux',
        destination: '/brands/akzonobel',
        permanent: true,
      },
      {
        source: '/brands/dulux',
        destination: '/brands/akzonobel',
        permanent: true,
      },
      {
        source: '/brands/dulux/:path*',
        destination: '/brands/akzonobel/:path*',
        permanent: true,
      },
    ];
  },

  // Enable source maps in production for better debugging and Lighthouse scores
  productionBrowserSourceMaps: true,

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
    // Preserve v15 image caching behavior (v16 default is 4 hours)
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
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

