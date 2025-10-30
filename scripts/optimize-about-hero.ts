import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public/images/about/aboutpageimages/hero-flowers-original.png');
const outputDir = path.join(process.cwd(), 'public/images/about/aboutpageimages');

async function optimizeHeroImage() {
  console.log('Optimizing about page hero image...');

  const sizes = [
    { width: 828, name: 'hero-flowers-828.jpg' },
    { width: 1200, name: 'hero-flowers-1200.jpg' },
    { width: 1920, name: 'hero-flowers-1920.jpg' },
  ];

  for (const size of sizes) {
    await sharp(inputPath)
      .resize(size.width, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(outputDir, size.name));
    console.log(`✓ Created ${size.name}`);
  }

  console.log('✓ Hero image optimization complete!');
}

optimizeHeroImage().catch(console.error);
