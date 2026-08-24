# TDS System Progress Log

Single source of truth for data: data/manifest.json. Read this file and the manifest at the start of every session. Handover spec: HANDOVER-TDS-SYSTEM.md in Tarun's Downloads.

## Locked decisions (2026-08-24, confirmed by Tarun)

- URL pattern: /brands/{brand}/{product-line}/{slug} (root scheme collides with legacy redirects)
- WhatsApp CTA number for TDS pages: 971502814338 (src/lib/site-constants.ts)
- Slice 1 scope: FULL Mapei UAE tile adhesive and grout catalogue, discovered by crawling, not just the 8 featured products
- AI image generation: decorative assets only, never products or packaging
- Line slug is the site slug tile-adhesives-and-grouts (one combined line)

## Current state (2026-08-24)

- Step 1 of 7 complete: foundation and seed.
  - src/lib/slugify.ts, src/lib/tds.ts (typed manifest loader), src/lib/site-constants.ts
  - scripts/seed-manifest.ts run: 8 Mapei records seeded, all tds.status pending, page_status pending
  - npm scripts added: typecheck, tds:seed, tds:crawl:mapei, tds:extract, tds:og, tds:check, gates

## Next up

- Step 2: crawlers/lib (politeFetch rate limiter, pdf downloader, image fetcher, manifest-io) plus crawlers/mapei.ts
  - Run --discover against mapei.com/ae tile adhesive and grout categories to enumerate the full UAE range
  - REPORT the discovered Slice 1 product count to Tarun before mass PDF download
  - Then TDS download batch (max 50 per session) and image crawl for discovered products
- Step 3: verification gate (unpdf, Levenshtein >= 90) and spec extraction
- Step 4: hand-written descriptions into manifest
- Step 5: product page template (src/app/brands/[slug]/[productLine]/[product]/)
- Step 6: OG images, segmented sitemaps, IndexNow, card links, search entries
- Step 7: gates and ship

## Batch log

- 2026-08-24: Seeded 8 Mapei tile-adhesives-and-grouts records (Kerabond T, Keraflex Maxi S1 Zero, Mapeset, Kerapoxy Adhesive, Kerapoxy Easy Design, Kerapoxy, Mapegrout T60 ME, Ultracolor Plus).

## Blockers

- None currently.
