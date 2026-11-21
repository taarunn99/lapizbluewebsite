import Link from "next/link";
import type { BrandConfig } from "@/data/brandConfigs";
import { ProductMarquee } from "@/components/tds/product-marquee";
import type { RangeItem } from "@/components/tds/range-types";
import { RANGE_GROUPS, TDS_CATEGORY_LABELS, getShippable, tdsHref } from "@/lib/tds";

/**
 * The brand's products, on the brand page.
 *
 * Two layers. The marquee and drawer the line pages already use, fed with
 * every product of the brand, so a visitor can get from the hub to any data
 * sheet in two taps. Under it, a crawlable index per product line, so the
 * links from the hub to the product pages are in the HTML for a search engine
 * as well as on screen. Brands without sheets on the site render nothing.
 */
export function BrandHubProducts({ brand }: { brand: BrandConfig }) {
  const recs = getShippable(brand.slug);
  if (recs.length === 0) return null;
  const items: RangeItem[] = recs.map((rec) => ({
    name: rec.name,
    href: tdsHref(rec),
    image: rec.image.path,
    classification: rec.classification,
    category: rec.category,
    categoryLabel: TDS_CATEGORY_LABELS[rec.category],
  }));
  const lines = brand.productLines.filter((pl) => recs.some((r) => r.product_line === pl.slug));
  const primary = brand.theme.primary || "#23395B";
  const secondary = brand.theme.secondary || "#1E6BA8";
  const short = brand.name.replace(/\s*\(.*?\)\s*/g, " ").trim();

  return (
    <section aria-labelledby="hub-products-heading" className="bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24">
        <p className="font-manrope text-[#406E8E] text-sm uppercase tracking-widest">Every {short} product we stock</p>
        <h2 id="hub-products-heading" className="font-outfit font-semibold text-3xl sm:text-4xl lg:text-5xl mt-2 leading-tight text-[#161925] max-w-[22ch]">
          {recs.length} {short} products, each with its data sheet
        </h2>
        <p className="font-manrope text-[#161925]/80 text-lg mt-5 max-w-[62ch]">
          Tap any pack to open the range, or go straight to a product page for the technical data sheet, the consumption
          calculator, the BOQ clause and a WhatsApp enquiry.
        </p>
      </div>

      <div className="mt-10">
        <ProductMarquee items={items} groups={RANGE_GROUPS} primaryColor={primary} secondaryColor={secondary} trackLimit={24} />
      </div>

      {/* Crawlable index: every product line and its first products are in the HTML; on screen each line is a row that opens. */}
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 py-14 lg:py-20">
        <p className="label-sh text-[#161925]/60">By product line, {lines.length} lines, tap any row</p>
        <div className="mt-4 -mx-3 sm:-mx-5 divide-y divide-[#161925]/10 border-y border-[#161925]/10">
          {lines.map((pl, i) => {
            const inLine = recs.filter((r) => r.product_line === pl.slug);
            const shown = inLine.slice(0, 8);
            return (
              <details key={pl.slug} className="group">
                <summary className="group/sum relative flex cursor-pointer list-none items-baseline gap-4 overflow-hidden px-3 py-5 outline-none sm:gap-6 sm:px-5 [&::-webkit-details-marker]:hidden before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-[#406E8E] before:transition-transform before:duration-[450ms] before:ease-out hover:before:scale-x-100 focus-visible:before:scale-x-100 group-open:before:scale-x-100">
                  <span className="relative font-outfit font-semibold text-2xl text-[#406E8E] tabular-nums leading-none transition-colors duration-300 group-hover/sum:text-[#F3DFC1] group-focus-visible/sum:text-[#F3DFC1] group-open:text-[#F3DFC1]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative font-outfit font-semibold text-xl sm:text-2xl text-[#161925] leading-tight transition-colors duration-300 group-hover/sum:text-white group-focus-visible/sum:text-white group-open:text-white">{pl.name}</span>
                  <span className="spec-sh relative text-[#161925]/60 transition-colors duration-300 group-hover/sum:text-white/70 group-focus-visible/sum:text-white/70 group-open:text-white/70">{inLine.length}</span>
                  <span className="relative ml-auto shrink-0 font-manrope text-xs uppercase tracking-widest text-[#406E8E] transition-colors duration-300 group-hover/sum:text-white group-focus-visible/sum:text-white group-open:hidden">Open</span>
                  <span className="relative ml-auto hidden shrink-0 font-manrope text-xs uppercase tracking-widest text-white group-open:inline">Close</span>
                </summary>
                <div className="px-3 pb-6 sm:px-5 sm:pl-[4.75rem]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 divide-y divide-[#161925]/10 sm:divide-y-0">
                    {shown.map((r) => (
                      <li key={r.slug} className="flex items-baseline justify-between gap-4 py-2 sm:border-b sm:border-[#161925]/10">
                        <Link href={tdsHref(r)} className="font-manrope text-sm text-[#161925] underline-offset-4 hover:text-[#406E8E] hover:underline">
                          {r.name}
                        </Link>
                        {r.classification ? <span className="spec-sh min-w-0 shrink text-right text-[#161925]/60 break-words">{r.classification}</span> : null}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/brands/${brand.slug}/${pl.slug}`} className="mt-4 inline-block font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4">
                    {inLine.length > shown.length ? `All ${inLine.length} in ${pl.name}` : `Open ${pl.name}`}
                  </Link>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
