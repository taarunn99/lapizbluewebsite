/**
 * Build the footer brand logo set: transparent, trimmed RGBA PNGs at 96 px tall
 * in public/images/brands/logos/footer/<slug>.png.
 *
 * Three treatments:
 *   alpha    the source already has a transparent background, so only trim and resize
 *   key      the source sits on a flat background sampled at the four corners; alpha is
 *            computed from the colour distance to that background with a soft ramp so
 *            antialiased edges keep partial alpha, and the colour is un-premultiplied
 *   tile     the logo is an opaque coloured block with light text (Pidilite Puma, FILA,
 *            Laticrete). The block is kept, written as a white tile with the text knocked
 *            out to transparent so it reads on the navy footer, and the corners are rounded.
 *   knockout same white-with-cutouts treatment on a transparent source whose mark has white
 *            detail inside a coloured shape (Profilpas roundel), with no corner rounding
 *
 * Run: node scripts/logos-transparent.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "public/images/brands/logos";
const OUT = path.join(SRC, "footer");
const HEIGHT = 96;

const LOGOS = [
  { slug: "mapei", file: "mapei-new.png", mode: "alpha" },
  { slug: "kerakoll", file: "kerakoll-new.webp", mode: "alpha" },
  { slug: "weber", file: "weber-new.png", mode: "key" },
  { slug: "laticrete", file: "laticrete-new.webp", mode: "tile" },
  { slug: "pidilite-puma", file: "pidilite-puma-new.webp", mode: "tile" },
  { slug: "profilpas", file: "profilpas-new.webp", mode: "knockout" },
  { slug: "akzonobel", file: "akzonobel-new.webp", mode: "alpha" },
  { slug: "fila", file: "fila-new.webp", mode: "tile" },
  { slug: "kalinga-stone", file: "kalinga-stone.webp", mode: "alpha" },
];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

async function rawRgba(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Key out a flat background sampled at the four corners. */
function keyBackground({ data, width, height }, { lo = 18, hi = 96 } = {}) {
  const px = (x, y) => (y * width + x) * 4;
  const corners = [px(0, 0), px(width - 1, 0), px(0, height - 1), px(width - 1, height - 1)];
  const bg = [0, 1, 2].map((c) => corners.reduce((s, i) => s + data[i + c], 0) / 4);
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a0 = data[i + 3] / 255;
    const d = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
    const a = clamp01((d - lo) / (hi - lo)) * a0;
    if (a <= 0) { out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0; continue; }
    // Un-premultiply against the background so soft edges keep the logo colour, not a halo
    out[i] = Math.round(clamp01((r - (1 - a) * bg[0]) / a / 255) * 255);
    out[i + 1] = Math.round(clamp01((g - (1 - a) * bg[1]) / a / 255) * 255);
    out[i + 2] = Math.round(clamp01((b - (1 - a) * bg[2]) / a / 255) * 255);
    out[i + 3] = Math.round(a * 255);
  }
  return { data: out, width, height };
}

/**
 * White tile with the light text knocked out: dark or saturated block pixels become
 * opaque white, light pixels become transparent, with a soft ramp between.
 */
function knockoutTile({ data, width, height }, { lo = 0.55, hi = 0.85 } = {}) {
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255, a0 = data[i + 3] / 255;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const a = (1 - clamp01((lum - lo) / (hi - lo))) * a0;
    out[i] = out[i + 1] = out[i + 2] = 255;
    out[i + 3] = Math.round(a * 255);
  }
  return { data: out, width, height };
}

async function roundCorners(buf, radiusRatio = 0.12) {
  const meta = await sharp(buf).metadata();
  const r = Math.round(meta.height * radiusRatio);
  const mask = Buffer.from(
    `<svg width="${meta.width}" height="${meta.height}"><rect width="${meta.width}" height="${meta.height}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  return sharp(buf).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

await mkdir(OUT, { recursive: true });
for (const logo of LOGOS) {
  const src = path.join(SRC, logo.file);
  let img = await rawRgba(src);
  if (logo.mode === "key") img = keyBackground(img);
  if (logo.mode === "tile" || logo.mode === "knockout") img = knockoutTile(img);

  let buf = await sharp(img.data, { raw: { width: img.width, height: img.height, channels: 4 } })
    .png()
    .toBuffer();

  // Trim transparent padding. For tiles the block itself is opaque white, so trim keeps it.
  buf = await sharp(buf).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 }).png().toBuffer();

  if (logo.mode === "tile") {
    // Tiles trim to the block edge; round the corners on the full resolution image
    buf = await roundCorners(buf);
  }

  const out = path.join(OUT, `${logo.slug}.png`);
  const info = await sharp(buf)
    .resize({ height: HEIGHT, fit: "inside", kernel: "lanczos3" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log(`${logo.slug.padEnd(14)} ${logo.mode.padEnd(5)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} kB`);
}
