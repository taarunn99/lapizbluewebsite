// Rebuild a static hero set from a large source.
// Usage: node scripts/hero-set.mjs <source.png> <public/images/brands/<slug>/hero> [widths csv]
import sharp from "sharp";
const [src, out, widthsArg] = process.argv.slice(2);
const widths = (widthsArg || "640,828,1200,1440,1920").split(",").map(Number);
for (const w of widths) {
  const img = sharp(src).resize({ width: w, withoutEnlargement: true });
  await img.clone().webp({ quality: 82 }).toFile(`${out}-${w}.webp`);
  await img.clone().avif({ quality: 55 }).toFile(`${out}-${w}.avif`);
}
const largest = Math.max(...widths);
await sharp(src).resize({ width: largest, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${out}.webp`);
console.log("set written", out, widths.join(","));
