/*
  Register downloaded TDS PDFs and product images into the manifest.

  Reads data/discovery/mapei-harvest.jsonl (source URLs harvested from mapei.com
  via a browser session on 2026-08-24). For each manifest record it looks in
  ~/Downloads for either the canonical rename (tds-mapei-{slug}.pdf /
  img-mapei-{slug}.png) or the original DAM basename from the source URL.
  Found PDFs are copied to public/tds/mapei/{slug}.pdf with sha256 recorded and
  tds.status set to downloaded. Found images are converted to webp (max 1200px)
  at public/products/mapei/{slug}.webp. Classification is derived from the
  harvested badge SVG filename. Idempotent, run any number of times.

  Usage: npx tsx scripts/register-downloads.ts
*/
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import sharp from 'sharp';
import type { ManifestRecord } from '../src/lib/tds';

const REPO = process.cwd();
const MANIFEST_PATH = path.join(REPO, 'data', 'manifest.json');
const HARVEST_PATH = path.join(REPO, 'data', 'discovery', 'mapei-harvest.jsonl');
const DOWNLOADS = path.join(os.homedir(), 'Downloads');
const TDS_DIR = path.join(REPO, 'public', 'tds', 'mapei');
const IMG_DIR = path.join(REPO, 'public', 'products', 'mapei');

interface HarvestRow {
  slug: string;
  tds?: string;
  img?: string;
  cls?: string[];
  tds_note?: string;
  note?: string;
}

function classificationFromSvgs(svgs: string[] | undefined): string {
  if (!svgs || svgs.length === 0) return '';
  const found: string[] = [];
  for (const svg of svgs) {
    const base = svg.toLowerCase();
    let m = base.match(/iso-13007-\d-([a-z0-9-]+?)(?:-in)?_/);
    if (!m) m = base.match(/ce-en-12004---([a-z0-9-]+?)(?:-in)?_/);
    if (!m && /(^|_)5_r2t?_/.test(base)) m = [base, 'r2t'] as unknown as RegExpMatchArray;
    if (!m && /13888-1-rg/.test(base)) m = [base, 'rg'] as unknown as RegExpMatchArray;
    if (m && m[1]) {
      const code = m[1].toUpperCase().replace(/-/g, ' ').trim();
      if (!found.includes(code)) found.push(code);
    }
  }
  return found.join(', ');
}

function findDownload(candidates: string[]): string | null {
  for (const c of candidates) {
    const p = path.join(DOWNLOADS, c);
    if (fs.existsSync(p) && fs.statSync(p).size > 1000) return p;
  }
  return null;
}

async function main() {
  const manifest: ManifestRecord[] = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const harvest: HarvestRow[] = fs
    .readFileSync(HARVEST_PATH, 'utf8')
    .trim()
    .split('\n')
    .map((l) => JSON.parse(l));
  const bySlug = new Map(harvest.map((h) => [h.slug, h]));

  fs.mkdirSync(TDS_DIR, { recursive: true });
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const now = new Date().toISOString().slice(0, 10);
  let pdfOk = 0;
  let pdfMissing = 0;
  let imgOk = 0;
  const missing: string[] = [];

  for (const rec of manifest) {
    if (rec.brand !== 'mapei') continue;
    const h = bySlug.get(rec.slug);
    if (!h) continue;

    if (h.cls && h.cls.length > 0 && !rec.classification) {
      rec.classification = classificationFromSvgs(h.cls);
    }

    if (h.tds && rec.tds.status !== 'verified') {
      const damName = h.tds.split('/').pop()!.split('?')[0];
      const src = findDownload([`tds-mapei-${rec.slug}.pdf`, damName]);
      if (src) {
        const dest = path.join(TDS_DIR, `${rec.slug}.pdf`);
        const buf = fs.readFileSync(src);
        if (buf.subarray(0, 4).toString() !== '%PDF') {
          console.log(`SKIP ${rec.slug}: file is not a PDF (${src})`);
        } else {
          fs.writeFileSync(dest, buf);
          rec.tds.local_path = `/tds/mapei/${rec.slug}.pdf`;
          rec.tds.source_url = h.tds;
          rec.tds.sha256 = crypto.createHash('sha256').update(buf).digest('hex');
          if (rec.tds.status === 'pending' || rec.tds.status === 'found') {
            rec.tds.status = 'downloaded';
          }
          rec.updated_at = now;
          pdfOk++;
        }
      } else {
        pdfMissing++;
        missing.push(`PDF ${rec.slug} (expected tds-mapei-${rec.slug}.pdf or ${damName})`);
      }
    }

    if (h.img) {
      const damName = h.img.split('/').pop()!.split('?')[0];
      const webpDest = path.join(IMG_DIR, `${rec.slug}.webp`);
      const already = fs.existsSync(webpDest) && rec.image.status === 'found';
      const src = findDownload([`img-mapei-${rec.slug}.png`, `img-mapei-${rec.slug}.jpg`, damName]);
      if (src && !already) {
        await sharp(src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 90 }).toFile(webpDest);
        rec.image = { status: 'found', path: `/products/mapei/${rec.slug}.webp`, source_url: h.img };
        rec.updated_at = now;
        imgOk++;
      } else if (already) {
        if (rec.image.path !== `/products/mapei/${rec.slug}.webp` && rec.image.status !== 'found') {
          rec.image = { status: 'found', path: `/products/mapei/${rec.slug}.webp`, source_url: h.img };
        }
        imgOk++;
      } else if (!rec.image.path) {
        rec.image.source_url = h.img;
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`PDFs registered: ${pdfOk}, still missing: ${pdfMissing}, images ready: ${imgOk}`);
  if (missing.length > 0) {
    console.log('Missing files:');
    for (const m of missing) console.log(`  ${m}`);
  }
}

main();
