import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Stability settings
  reactStrictMode: true,

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
    // Better tree-shaking for common packages
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
  },

  // Webpack optimizations for bundle splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split heavy libraries into separate chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Framer Motion in its own chunk
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 30,
              reuseExistingChunk: true,
            },
            // GSAP in its own chunk
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'gsap',
              priority: 30,
              reuseExistingChunk: true,
            },
            // React and React-DOM together
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Other vendor dependencies
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;

