# TDS System Progress Log

Single source of truth for data: data/manifest.json. Read this file and the manifest at the start of every session. Handover spec: HANDOVER-TDS-SYSTEM.md in Tarun's Downloads.

## Locked decisions (2026-08-24, confirmed by Tarun)

- URL pattern: /brands/{brand}/{product-line}/{slug}
- WhatsApp CTA number for TDS pages: 971502814338 (src/lib/site-constants.ts)
- Slice 1 scope: FULL Mapei UAE tile adhesive and grout catalogue (30 products discovered)
- AI image generation: decorative assets only, never products or packaging
- PUSH RULE: never push without Tarun's explicit approval. Work, commit locally, present for review.

## Current state (end of 2026-08-24 session)

Steps 1 through 6 of 7 COMPLETE for the first shippable batch. All gates green.

- Manifest: 31 records (30 page targets + Mapegrout T60 ME held).
- TDS PDFs hosted and sha256 verified: 15 (14 verified at score 100, keraflex-maxi-s1-zero in needs_review, see MANUAL-QUEUE).
- 13 product pages generated and prerendered at /brands/mapei/tile-adhesives-and-grouts/{slug}: mapeset, keraset, keraflex, kerabond-plus is NOT yet in (no PDF), ultralite-s1, ultralite-s1-quick, ultralite-s2-flex, ultralite-s2-quick, granirapid, keralastic, kerapoxy, kerapoxy-adhesive, kerapoxy-easy-design, ultracolor-plus.
- Each page: single h1, Product + BreadcrumbList + FAQPage schema, hero facts, Download TDS CTA with revision note, WhatsApp CTA with lead logging, semantic spec table, applications, FAQ accordion, related products. Verified in WebKit iPhone profile, zero page bleed.
- OG images: 13 code generated cards at public/og/mapei/.
- Segmented sitemaps live in build: /sitemaps.xml index + /sitemaps/mapei.xml. Main /sitemap.xml untouched.
- IndexNow script extended to include TDS segment URLs.
- Product line page: featured cards link to TDS pages (View TDS), additive Technical Data Sheets index section lists all shippable products. Everything else unchanged.
- Search: 13 entries generated into src/data/tdsSearchEntries.json, spread into searchIndex.
- Gates: npm run gates = typecheck + tds:check (DoD) + build + audit-alts + audit-tds. All passing.
- 8 products ship with branded placeholder images (auto replaced when real pack shots are registered).

## Waiting on Tarun

1. Download the remaining 15 TDS PDFs and 30 product images from the click list (mapei-download-list.html, sent in chat). Then run: npx tsx scripts/register-downloads.ts && npx tsx scripts/extract.ts && npx tsx scripts/generate-og.ts && npm run gates. Skip Keraflex in the list, already registered.
2. MANUAL-QUEUE decisions (Keraflex Maxi S1 Zero naming, Kerabond T coverage).
3. Review the 13 pages at localhost:3000, then approve or reject the push.

## Batch log

- 2026-08-24: Seeded 8 records. Discovered full AE range (+24, then merged keraflex duplicate, net 31). Downloaded and verified 15 TDS PDFs. Wrote 13 descriptions. Built page template, OG pipeline, sitemaps, gates. 13 pages generated, all gates green. NOT pushed.

## Blockers

- None besides the waiting-on-Tarun items.
