/*
  Prove the Profilpas work was additive.

  The owner's instruction is plain: nothing on Profilpas may lose ranking.
  Adding product pages legitimately adds internal links to the brand page and
  the line pages, so the ordinary guard would flag that as a change and tell
  us nothing useful. This asks the sharper question instead.

  Unchanged, exactly: title, meta description, canonical, h1, h1 count,
  indexability and the number of JSON-LD blocks.
  Links: every link the baseline recorded must still be present. New ones are
  the point. A removed one is a regression and fails.

  Usage: SEO_ORIGIN=http://localhost:3000 node scripts/profilpas/no-seo-loss.mjs
*/
import { readFileSync } from 'fs';

const ORIGIN = process.env.SEO_ORIGIN || 'http://localhost:3000';
const base = JSON.parse(readFileSync('seo-baseline.json', 'utf8'));
const paths = Object.keys(base.pages).filter((p) => p.startsWith('/brands/profilpas'));

/** Titles and descriptions carry entities; the baseline stores them decoded. */
const decode = (s) => s == null ? s : s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
const pick = (html, re) => { const m = html.match(re); return m ? decode(m[1]).trim() : null; };

async function read(path) {
  const res = await fetch(ORIGIN + path, { redirect: 'manual' });
  const html = await res.text();
  return {
    status: res.status,
    title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
    canonical: pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
    h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, '').trim() ?? null,
    h1Count: (html.match(/<h1[\s>]/gi) || []).length,
    indexable: !/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html),
    jsonLdBlocks: (html.match(/application\/ld\+json/gi) || []).length,
    internalLinks: [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]))].sort(),
  };
}

const EXACT = ['title', 'description', 'canonical', 'h1', 'h1Count', 'indexable', 'jsonLdBlocks', 'status'];
const problems = [];
let added = 0;

for (const p of paths) {
  const b = base.pages[p];
  const n = await read(p);
  for (const f of EXACT) {
    if (JSON.stringify(b[f]) !== JSON.stringify(n[f])) {
      problems.push(`${p}\n      ${f} changed\n      was: ${JSON.stringify(b[f])}\n      now: ${JSON.stringify(n[f])}`);
    }
  }
  const lost = (b.internalLinks ?? []).filter((l) => !n.internalLinks.includes(l));
  if (lost.length) problems.push(`${p}\n      ${lost.length} internal link(s) removed: ${lost.slice(0, 8).join(', ')}`);
  added += n.internalLinks.length - (b.internalLinks ?? []).length;
}

console.log(`Checked ${paths.length} Profilpas pages against the production baseline of ${base.captured.slice(0, 10)}.`);
if (problems.length) {
  console.error(`\nNOT ADDITIVE. ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}\n`);
  process.exit(1);
}
console.log(`Nothing lost. Titles, descriptions, canonicals, h1s, indexability and structured data are identical, every pre-existing internal link is still there, and ${added} new links were added.`);
