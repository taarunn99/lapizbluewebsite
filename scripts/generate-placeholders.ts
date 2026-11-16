/*
  Branded placeholder images for shippable products that are still waiting on
  a real pack shot: brand logo plus product name on a clean card, per the
  handover. Code generated, never AI. Written to the product's final image
  path so the page ships now and the real photo replaces it in place later
  (register-downloads overwrites placeholders automatically).

  Usage: npx tsx scripts/generate-placeholders.ts
*/
import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import type { ManifestRecord } from '../src/lib/tds';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');
const manropeSemiBold = fs.readFileSync(path.join(REPO, 'scripts', 'assets', 'Manrope-SemiBold.ttf'));
const outfitBold = fs.readFileSync(path.join(REPO, 'scripts', 'assets', 'Outfit-Bold.ttf'));
const logoPng = fs.readFileSync(path.join(REPO, 'public', 'images', 'brands', 'logos', 'mapei-new.png'));
const logoDataUri = `data:image/png;base64,${logoPng.toString('base64')}`;

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const now = new Date().toISOString().slice(0, 10);
  let made = 0;
  for (const rec of manifest) {
    if (rec.brand !== 'mapei') continue;
    const shipping = rec.page_status === 'generated' || rec.page_status === 'live';
    if (!shipping || rec.image.status === 'found') continue;

    const element = {
      type: 'div',
      props: {
        style: {
          width: '800px',
          height: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '48px',
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F3F6FA 100%)',
          fontFamily: 'Manrope',
        },
        children: [
          {
            type: 'img',
            props: { src: logoDataUri, width: 320, style: { objectFit: 'contain' } },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '52px',
                fontFamily: 'Outfit',
                color: '#23395B',
                textAlign: 'center',
                padding: '0 60px',
                lineHeight: 1.15,
              },
              children: rec.name,
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '26px', color: '#8a97a8', letterSpacing: '2px' },
              children: 'PRODUCT IMAGE COMING SOON',
            },
          },
        ],
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svg = await satori(element as any, {
      width: 800,
      height: 800,
      fonts: [
        { name: 'Outfit', data: outfitBold, weight: 700, style: 'normal' },
        { name: 'Manrope', data: manropeSemiBold, weight: 600, style: 'normal' },
      ],
    });
    const png = new Resvg(svg).render().asPng();
    const dir = path.join(REPO, 'public', 'products', 'mapei');
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${rec.slug}.webp`);
    await sharp(png).webp({ quality: 90 }).toFile(out);
    rec.image = { status: 'placeholder', path: `/products/mapei/${rec.slug}.webp`, source_url: rec.image.source_url };
    rec.updated_at = now;
    made++;
    console.log(`placeholder: ${rec.slug}`);
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`${made} placeholders generated.`);
}

main();
