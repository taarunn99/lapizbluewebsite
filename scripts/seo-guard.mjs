#!/usr/bin/env node
/**
 * SEO guard.
 *
 * Fetches the pages that earn the traffic and records everything a search
 * engine actually reads: the title, the meta description, the canonical, the
 * h1, whether the page is indexable, how many structured data blocks it
 * carries, and which internal links it points at.
 *
 * `npm run seo:baseline` writes that snapshot to seo-baseline.json.
 * `npm run seo:check` fetches again and fails if anything moved.
 *
 * The point is that a deploy meant to change a animation or a layout can be
 * proved to have changed nothing a ranking depends on. Run it after a deploy.
 * When a change to a title or description is intentional, re-run the baseline
 * in the same commit, so the diff shows the intent.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const ORIGIN = process.env.SEO_ORIGIN || 'https://www.lapizblue.com';
const BASELINE = new URL('../seo-baseline.json', import.meta.url).pathname;

// The pages that carry the rankings. Add to this when a new page starts to matter.
const PAGES = [
  '/', '/about', '/contact', '/brands', '/blog', '/tools',
  '/construction-chemicals-dubai',
  '/waterproofing-supplier-dubai',
  '/tile-adhesive-supplier-dubai',
  '/epoxy-flooring-supplier-dubai',
  '/concrete-repair-supplier-dubai',
  '/brands/mapei', '/brands/laticrete', '/brands/weber',
  // Mapei product lines. These rank, and the product page system changed the
  // template they render through, so they are guarded explicitly rather than
  // trusted because the brand page above them passed.
  '/brands/mapei/tile-adhesives-and-grouts',
  '/brands/mapei/waterproofing',
  '/brands/mapei/flooring-systems',
  '/brands/mapei/sealants-and-anchoring',
  '/brands/mapei/self-leveling-and-microcement',
  '/brands/mapei/concrete-additives-and-repair-systems',
  '/brands/kerakoll', '/brands/pidilite-puma', '/brands/fila', '/brands/akzonobel',
];

const pick = (html, re) => { const m = html.match(re); return m ? m[1].trim() : null; };
const decode = (s) => s == null ? null : s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

async function snapshot(path) {
  const res = await fetch(ORIGIN + path, { redirect: 'manual' });
  const html = res.status === 200 ? await res.text() : '';
  // Internal links are the part of the link graph this site controls, so a
  // dropped one is a real ranking change rather than a cosmetic one.
  const links = [...html.matchAll(/href="(\/[^"#?]*)"/g)]
    .map((m) => m[1].replace(/\/$/, '') || '/')
    .filter((h) => !h.startsWith('/_next') && !h.startsWith('/api'));
  return {
    status: res.status,
    title: decode(pick(html, /<title>([^<]*)<\/title>/)),
    description: decode(pick(html, /<meta name="description" content="([^"]*)"/)),
    canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
    h1: decode(pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/))?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() ?? null,
    h1Count: (html.match(/<h1[\b >]/g) || []).length,
    indexable: !/noindex/i.test(html),
    jsonLdBlocks: (html.match(/application\/ld\+json/g) || []).length,
    internalLinks: [...new Set(links)].sort(),
  };
}

async function snapshotAll() {
  const out = {};
  for (const path of PAGES) {
    out[path] = await snapshot(path);
    process.stdout.write('.');
  }
  process.stdout.write('\n');
  return out;
}

const mode = process.argv[2] === 'baseline' ? 'baseline' : 'check';
const now = await snapshotAll();

if (mode === 'baseline') {
  writeFileSync(BASELINE, JSON.stringify({ origin: ORIGIN, captured: new Date().toISOString(), pages: now }, null, 2) + '\n');
  console.log(`Baseline written for ${PAGES.length} pages against ${ORIGIN}`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error('No seo-baseline.json. Run: npm run seo:baseline');
  process.exit(2);
}

const base = JSON.parse(readFileSync(BASELINE, 'utf8')).pages;
const problems = [];

for (const path of PAGES) {
  const b = base[path], n = now[path];
  if (!b) { console.log(`new page, not in baseline: ${path}`); continue; }

  if (n.status !== 200) problems.push(`${path}: returns ${n.status}, was ${b.status}`);
  for (const field of ['title', 'description', 'canonical', 'h1']) {
    if (b[field] !== n[field]) problems.push(`${path}: ${field} changed\n    was: ${b[field]}\n    now: ${n[field]}`);
  }
  if (b.indexable && !n.indexable) problems.push(`${path}: became noindex`);
  if (n.h1Count !== b.h1Count) problems.push(`${path}: h1 count ${b.h1Count} -> ${n.h1Count}`);
  if (n.jsonLdBlocks < b.jsonLdBlocks) problems.push(`${path}: structured data blocks ${b.jsonLdBlocks} -> ${n.jsonLdBlocks}`);

  const lost = b.internalLinks.filter((l) => !n.internalLinks.includes(l));
  if (lost.length) problems.push(`${path}: internal links removed: ${lost.join(', ')}`);
}

if (problems.length) {
  console.error(`\nSEO GUARD FAILED, ${problems.length} regression(s) against ${ORIGIN}:\n`);
  problems.forEach((p) => console.error('  - ' + p));
  console.error('\nIf a change was intended, re-run `npm run seo:baseline` in the same commit.');
  process.exit(1);
}

console.log(`SEO guard passed. ${PAGES.length} pages unchanged on titles, descriptions, canonicals, h1s, indexability, structured data and internal links.`);
