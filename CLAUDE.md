# lapizblue.com working rules

Next.js 16 App Router, React 19, Tailwind v4, framer-motion. Production deploys from `main` on Vercel. Owner: Tarun Shukla.

## Palette (use these, nothing else)

| Token | Hex | Use |
|---|---|---|
| Navy | `#161925` | dark sections, headings on light, cards that need weight |
| Deep blue | `#23395B` | secondary text, legal row |
| Brand blue | `#406E8E` | eyebrows, links, accents, map and award sections |
| Light blue | `#BFD7EA` | eyebrows on dark, soft accents |
| Cream | `#F3DFC1` | the single CTA on dark, highlight figures |
| Paper | `#F6F8FA` | alternating light sections |

Fonts: Outfit for headings and figures (`font-outfit`), Manrope for body (`font-manrope`), Dancing Script only on the About and Blog hero lines. Both main fonts load once from the root layout as variable files. Never add a page level `next/font` instance.

## Design principles (what the owner approves)

- Magazine editorial, not template. Golden ratio columns (`1.618fr_1fr`), numbers shown as big figures with a short label under them, one primary CTA per hero.
- Compose new pages from the sections the site already has (brand grid, UAE location map, projects carousel, certificates, awards) so every page looks like the same family.
- Real photography from `public/images` (stores, office, projects, brand heroes). No stock clip art.
- No opening animations on the first screen. In view animations below the fold are fine. Respect reduced motion.
- Zero bleed on mobile: nothing cut by the screen edge. Verify in Playwright WebKit with an iPhone profile.
- Do not change the look of existing pages, remove elements, or drop font weights without being asked.

## Copy rules

- No em dashes or en dashes anywhere, including alt text, metadata and JSON-LD. Use a plain hyphen or rewrite.
- Exact entity name: Lapiz Blue General Trading LLC. Group: Lapiz Group of Companies. Sister companies: Global Classic Building Materials (gcbuae.com), Sixty Newton Technical Services LLC (60newton.com).
- Never mention "Grani Marmo Classic".
- Only state figures that appear on the About, Brands or award pages (4.7 rating, 179 reviews, founded 2020, three distribution centres).

## SEO rules (zero rank loss)

- Never change or remove an existing URL. Additive edits only on pages that already rank. Schema and canonicals only as supersets.
- One query, one page. `/construction-chemicals-dubai` owns "construction chemicals distributor in Dubai" and its emirate variants.
- Every new page: title under 60 characters with the query first, meta description 140 to 160 characters with one geo signal, self contained answer block in the first 100 words, question based H2s, FAQ with self contained answers, JSON-LD (WebPage, BreadcrumbList, Service or Product, FAQPage), entry in `src/app/sitemap.ts` and `public/llms.txt`.
- After every deploy run `npm run indexnow`.

## Performance gates

`npm run typecheck && npm run build`, then Lighthouse mobile and desktop on the changed pages. Target 100 in every category. Hero images are static AVIF/WebP sets via `StaticHeroPicture` plus `HeroPreload`, never the on demand optimizer. Embedded bitmap SVGs are rasterised to WebP.

## Deploy etiquette

Push the feature branch freely. Push `main` only with the owner's explicit yes, every time. Report the Vercel deployment state after each push.
