import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const imagesToConvert = [
  // About page images
  'public/images/about/aboutpageimages/aboutus1.png',
  'public/images/about/aboutpageimages/aboutus3.png',
  'public/images/about/aboutpageimages/aboutus5.png',
  'public/images/about/aboutpageimages/image3.png',

  // Mesh gradient
  'public/images/meshgradientbase.png',

  // Projects
  'public/images/projects/ibis-hotel.jpg',
  'public/images/projects/nehru-stadium.jpg',
  'public/images/projects/damac-lagoons.jpg',

  // Office
  'public/images/office/office-2.jpg',

  // Contact/Careers
  'public/images/contactus/contactuspageimages/careerspage2.png',
];

async function convertToWebP(inputPath: string) {
  try {
    const ext = path.extname(inputPath);
    const outputPath = inputPath.replace(ext, '.webp');

    console.log(`Converting: ${inputPath} → ${outputPath}`);

    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);

    const savedKB = ((inputStats.size - outputStats.size) / 1024).toFixed(2);
    const savedPercent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

    console.log(`✓ Saved ${savedKB}KB (${savedPercent}%)`);
    console.log(`  Before: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  After:  ${(outputStats.size / 1024 / 1024).toFixed(2)}MB\n`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error);
  }
}

async function main() {
  console.log('🖼️  Converting images to WebP format...\n');

  let totalSavedBytes = 0;
  let totalOriginalBytes = 0;

  for (const imagePath of imagesToConvert) {
    try {
      const fullPath = path.join(process.cwd(), imagePath);
      await convertToWebP(fullPath);

      const originalSize = (await fs.stat(fullPath)).size;
      const webpPath = imagePath.replace(path.extname(imagePath), '.webp');
      const webpSize = (await fs.stat(path.join(process.cwd(), webpPath))).size;

      totalOriginalBytes += originalSize;
      totalSavedBytes += (originalSize - webpSize);
    } catch (error: any) {
      console.error(`Error processing ${imagePath}:`, error.message);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`Total space saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Reduction: ${((totalSavedBytes / totalOriginalBytes) * 100).toFixed(1)}%`);
  console.log('\n✅ Conversion complete!');
}

main();
