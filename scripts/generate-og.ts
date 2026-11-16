/*
  Pre-render OG images for shippable TDS product pages: 1200x630 PNG per
  product at public/og/{brand}/{slug}.png. Navy brand template with product
  name, brand eyebrow, classification badge and the Lapiz Blue wordmark.
  Deterministic and code generated (never AI), skips existing files unless
  --force. Salespeople share these links on WhatsApp, so the card must read
  clearly at thumbnail size.

  Usage: npx tsx scripts/generate-og.ts [--force] [--only slug]
*/
import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { ManifestRecord } from '../src/lib/tds';
import { TDS_CATEGORY_LABELS } from '../src/lib/tds';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');
const force = process.argv.includes('--force');
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : undefined;

const outfitBold = fs.readFileSync(path.join(REPO, 'scripts', 'assets', 'Outfit-Bold.ttf'));
const manropeRegular = fs.readFileSync(path.join(REPO, 'scripts', 'assets', 'Manrope-Regular.ttf'));
const manropeSemiBold = fs.readFileSync(path.join(REPO, 'scripts', 'assets', 'Manrope-SemiBold.ttf'));

function ogElement(rec: ManifestRecord, brandName: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#23395B',
        backgroundImage: 'linear-gradient(135deg, #161925 0%, #23395B 60%, #2c4a75 100%)',
        padding: '64px',
        fontFamily: 'Manrope',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '28px',
                    fontFamily: 'ManropeSemiBold',
                    color: '#BFD7EA',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    marginBottom: '20px',
                  },
                  children: `${brandName} ${TDS_CATEGORY_LABELS[rec.category]}`,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: rec.name.length > 18 ? '72px' : '88px',
                    fontFamily: 'Outfit',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.05,
                    marginBottom: '28px',
                  },
                  children: rec.name,
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '14px' },
                  children: [
                    ...(rec.classification
                      ? rec.classification.split(',').slice(0, 3).map((code) => ({
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              backgroundColor: '#FFCC00',
                              color: '#161925',
                              fontFamily: 'ManropeSemiBold',
                              fontSize: '30px',
                              padding: '10px 26px',
                              borderRadius: '999px',
                            },
                            children: code.trim(),
                          },
                        }))
                      : []),
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          border: '2px solid #BFD7EA',
                          color: '#BFD7EA',
                          fontFamily: 'ManropeSemiBold',
                          fontSize: '30px',
                          padding: '10px 26px',
                          borderRadius: '999px',
                        },
                        children: 'TDS PDF',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '30px', color: '#FFFFFF', fontFamily: 'Outfit', fontWeight: 700 },
                  children: 'Lapiz Blue',
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '24px', color: '#BFD7EA' },
                  children: 'Technical Data Sheet, UAE',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const targets = manifest.filter(
    (r) =>
      (r.page_status === 'generated' || r.page_status === 'live') &&
      r.tds.status === 'verified' &&
      (!only || r.slug === only)
  );
  let made = 0;
  let skipped = 0;
  for (const rec of targets) {
    const dir = path.join(REPO, 'public', 'og', rec.brand);
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${rec.slug}.png`);
    if (fs.existsSync(out) && !force) {
      skipped++;
      continue;
    }
    const brandName = rec.brand.charAt(0).toUpperCase() + rec.brand.slice(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svg = await satori(ogElement(rec, brandName) as any, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Outfit', data: outfitBold, weight: 700, style: 'normal' },
        { name: 'Manrope', data: manropeRegular, weight: 400, style: 'normal' },
        { name: 'ManropeSemiBold', data: manropeSemiBold, weight: 600, style: 'normal' },
      ],
    });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    fs.writeFileSync(out, png);
    made++;
    console.log(`og: ${rec.brand}/${rec.slug}.png (${Math.round(png.length / 1024)} KB)`);
  }
  console.log(`OG images: ${made} generated, ${skipped} already present.`);
}

main();
