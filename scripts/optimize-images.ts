// scripts/optimize-images.ts
// Production-grade image optimization for HOME page
// Generates WebP/AVIF variants with zero visual quality loss

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

// Configuration: High quality settings for perceptually lossless output
const CONFIG = {
  webp: { quality: 90, effort: 6 },
  avif: { quality: 85, effort: 9 },
  jpeg: { quality: 90, mozjpeg: true },
  png: { quality: 90, compressionLevel: 9 },
};

interface ImageTask {
  input: string;
  outputs: Array<{
    path: string;
    width?: number;
    height?: number;
    format: 'webp' | 'avif' | 'jpeg' | 'png';
  }>;
}

const TASKS: ImageTask[] = [
  // 1. Hero image (2000×2000 → 1920×1920, multiple formats)
  {
    input: 'public/images/home/homepageimages/hero.jpg',
    outputs: [
      { path: 'public/images/home/homepageimages/hero-1920.webp', width: 1920, height: 1920, format: 'webp' },
      { path: 'public/images/home/homepageimages/hero-1920.avif', width: 1920, height: 1920, format: 'avif' },
      { path: 'public/images/home/homepageimages/hero-1200.webp', width: 1200, height: 1200, format: 'webp' },
      { path: 'public/images/home/homepageimages/hero-1200.avif', width: 1200, height: 1200, format: 'avif' },
      { path: 'public/images/home/homepageimages/hero-828.webp', width: 828, height: 828, format: 'webp' },
      { path: 'public/images/home/homepageimages/hero-828.avif', width: 828, height: 828, format: 'avif' },
      { path: 'public/images/home/homepageimages/hero-640.webp', width: 640, height: 640, format: 'webp' },
      { path: 'public/images/home/homepageimages/hero-640.avif', width: 640, height: 640, format: 'avif' },
    ],
  },

  // 2. Bathroom image (1536×1024 PNG → responsive WebP/AVIF)
  {
    input: 'public/images/home/homepageimages/homepagebathroom.png',
    outputs: [
      { path: 'public/images/home/homepageimages/homepagebathroom-1920.webp', width: 1920, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagebathroom-1920.avif', width: 1920, format: 'avif' },
      { path: 'public/images/home/homepageimages/homepagebathroom-1200.webp', width: 1200, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagebathroom-1200.avif', width: 1200, format: 'avif' },
      { path: 'public/images/home/homepageimages/homepagebathroom-828.webp', width: 828, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagebathroom-828.avif', width: 828, format: 'avif' },
      { path: 'public/images/home/homepageimages/homepagebathroom-640.webp', width: 640, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagebathroom-640.avif', width: 640, format: 'avif' },
    ],
  },

  // 3. Location pin (1192×360 → 122×122 for retina display at 61×61)
  {
    input: 'public/images/home/homepageimages/homepagelocationpin.jpg',
    outputs: [
      { path: 'public/images/home/homepageimages/homepagelocationpin-122.webp', width: 122, height: 122, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagelocationpin-122.avif', width: 122, height: 122, format: 'avif' },
      { path: 'public/images/home/homepageimages/homepagelocationpin-61.webp', width: 61, height: 61, format: 'webp' },
      { path: 'public/images/home/homepageimages/homepagelocationpin-61.avif', width: 61, height: 61, format: 'avif' },
    ],
  },

  // 4. Mesh gradient (3840×2160 → 1920×1080, optimized)
  {
    input: 'public/images/meshgradientbase.png',
    outputs: [
      { path: 'public/images/meshgradientbase-1920.webp', width: 1920, height: 1080, format: 'webp' },
      { path: 'public/images/meshgradientbase-1920.avif', width: 1920, height: 1080, format: 'avif' },
      { path: 'public/images/meshgradientbase-1200.webp', width: 1200, height: 675, format: 'webp' },
      { path: 'public/images/meshgradientbase-1200.avif', width: 1200, height: 675, format: 'avif' },
      { path: 'public/images/meshgradientbase-828.webp', width: 828, height: 466, format: 'webp' },
      { path: 'public/images/meshgradientbase-828.avif', width: 828, height: 466, format: 'avif' },
    ],
  },

  // 5. MD portrait (already optimized at 451×558, just convert formats)
  {
    input: 'public/images/md.png',
    outputs: [
      { path: 'public/images/md-451.webp', width: 451, height: 558, format: 'webp' },
      { path: 'public/images/md-451.avif', width: 451, height: 558, format: 'avif' },
    ],
  },
];

async function optimizeImage(task: ImageTask): Promise<void> {
  console.log(`\n📸 Processing: ${task.input}`);

  for (const output of task.outputs) {
    try {
      let pipeline = sharp(task.input);

      // Resize if dimensions specified
      if (output.width || output.height) {
        pipeline = pipeline.resize(output.width, output.height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true,
        });
      }

      // Apply format-specific encoding
      switch (output.format) {
        case 'webp':
          pipeline = pipeline.webp(CONFIG.webp);
          break;
        case 'avif':
          pipeline = pipeline.avif(CONFIG.avif);
          break;
        case 'jpeg':
          pipeline = pipeline.jpeg(CONFIG.jpeg);
          break;
        case 'png':
          pipeline = pipeline.png(CONFIG.png);
          break;
      }

      // Ensure output directory exists
      const outputDir = path.dirname(output.path);
      await fs.mkdir(outputDir, { recursive: true });

      // Write optimized image
      await pipeline.toFile(output.path);

      // Log file size
      const stats = await fs.stat(output.path);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`  ✅ ${output.path} → ${sizeKB} KB`);
    } catch (error) {
      console.error(`  ❌ Failed: ${output.path}`, error);
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization for HOME page...\n');
  console.log('Quality settings:');
  console.log(`  - WebP: q=${CONFIG.webp.quality}, effort=${CONFIG.webp.effort}`);
  console.log(`  - AVIF: q=${CONFIG.avif.quality}, effort=${CONFIG.avif.effort}`);
  console.log('  - Perceptually lossless output\n');

  const startTime = Date.now();

  // Process all tasks sequentially to avoid memory issues
  for (const task of TASKS) {
    await optimizeImage(task);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ Optimization complete in ${duration}s`);
  console.log('\nNext steps:');
  console.log('  1. Restart dev server: npm run dev');
  console.log('  2. Check browser Network tab for optimized images');
  console.log('  3. Run Lighthouse audit to verify LCP improvements');
}

main().catch(console.error);
