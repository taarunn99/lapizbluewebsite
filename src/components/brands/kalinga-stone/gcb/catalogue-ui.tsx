import Link from "next/link";
import { Reveal } from "./gcb-motion.client";
import { BRAND_SLUG, lineHref, rangeHref, shadeHref, shadesOf, swatchSrcSet, type MaterialEntry, type Range, type Shade } from "./catalogue";

/**
 * The pieces the KalingaStone range and shade pages share with the three
 * material line pages: swatch cards, the pills, the breadcrumb, the Global
 * Classic stock partner band, the closing bar and the WhatsApp circle. All
 * server rendered; only Reveal is a client component. The palette and type are
 * gcbuae.com's: limestone ground, Cormorant headlines, verde and midnight.
 */

export const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12";
export const serif = "font-[family-name:var(--font-cormorant)] font-light";
export const eyebrowLight = "label-sh text-[#355E4D]";
export const eyebrowDark = "label-sh text-[#6F8F78]";
export const h2Light = `${serif} text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.1] text-[#0C1510] mt-3`;
export const h2Dark = `${serif} text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.1] text-[#F7F8F5] mt-3`;
export const muted = "text-[#0C1510]/66";
export const buttonDark = "inline-flex min-h-[3rem] items-center rounded-full bg-[#0C1510] px-7 label-sh text-[#F7F8F5] transition-opacity hover:opacity-85";
export const buttonOutline = "inline-flex min-h-[3rem] items-center rounded-full border border-[#0C1510]/25 px-7 label-sh text-[#0C1510] transition-colors hover:border-[#0C1510]";

/* ------------------------------------------------------------------------ */
/* Swatches                                                                  */
/* ------------------------------------------------------------------------ */

export function SwatchPicture({ shade, sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", priority = false, className = "" }: { shade: Shade; sizes?: string; priority?: boolean; className?: string }) {
  const src = swatchSrcSet(shade);
  return (
    <picture>
      <source type="image/avif" srcSet={src.avif} sizes={sizes} />
      <source type="image/webp" srcSet={src.webp} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src.fallback}
        alt={shade.swatchAlt}
        width={960}
        height={640}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`block h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}

/** Series, format, Microban and NEW, as small pills. */
export function Pills({ shade, dark = false, withFormat = true }: { shade: Shade; dark?: boolean; withFormat?: boolean }) {
  const base = `inline-flex min-h-[1.75rem] items-center rounded-full border px-2.5 spec-sh ${dark ? "border-[#F7F8F5]/25 text-[#F7F8F5]/80" : "border-[#0C1510]/15 text-[#0C1510]/70"}`;
  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label="Specification">
      <li className={`list-none ${base}`}>{shade.series}</li>
      {withFormat && <li className={`list-none ${base}`}>{shade.format}</li>}
      {shade.microban && <li className={`list-none ${base} ${dark ? "border-[#6F8F78] text-[#BFD7EA]" : "border-[#355E4D]/50 text-[#355E4D]"}`}>Microban</li>}
      {shade.isNew && <li className={`list-none ${base} ${dark ? "border-[#F7F8F5] text-[#F7F8F5]" : "border-[#0C1510] text-[#0C1510]"}`}>New</li>}
    </ul>
  );
}

export function ShadeCard({ shade, delay = 0, animate = true }: { shade: Shade; delay?: number; animate?: boolean }) {
  const inner = (
    <Link href={shadeHref(shade)} className="group block min-w-0">
      <div className="overflow-hidden rounded-xl border border-[#D2D4C8] bg-[#D2D4C8]/30" style={{ aspectRatio: "3 / 2" }}>
        <SwatchPicture shade={shade} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <h3 className={`${serif} mt-3 text-xl leading-none text-[#0C1510] group-hover:text-[#355E4D]`}>{shade.name}</h3>
      <p className="mt-1.5 spec-sh text-[#0C1510]/60">
        {shade.series} <span aria-hidden="true">&middot;</span> {shade.format}
      </p>
      {(shade.microban || shade.isNew) && (
        <div className="mt-2">
          <Pills shade={shade} withFormat={false} />
        </div>
      )}
    </Link>
  );
  return animate ? <Reveal delay={delay}>{inner}</Reveal> : inner;
}

export function ShadeGrid({ shades, animate = true, className = "" }: { shades: Shade[]; animate?: boolean; className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {shades.map((s, i) => (
        <li key={s.slug} className="list-none min-w-0">
          <ShadeCard shade={s} delay={(i % 4) * 0.06} animate={animate} />
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------------ */
/* Ranges                                                                    */
/* ------------------------------------------------------------------------ */

/** The row of range cards: every colour range or collection of a material, each with its own page. */
export function RangeCards({ entry, current, heading }: { entry: MaterialEntry; current?: string; heading?: string }) {
  const ranges = entry.ranges;
  return (
    <div>
      {heading && <p className={`${eyebrowLight}`}>{heading}</p>}
      <ul className={`mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 ${ranges.length >= 5 ? "lg:grid-cols-5" : ranges.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {ranges.map((r, i) => {
          const first = shadesOf(r).slice(0, 3);
          const isCurrent = r.slug === current;
          return (
            <li key={r.slug} className="list-none min-w-0">
              <Link
                href={rangeHref(entry.line, r.slug)}
                aria-current={isCurrent ? "page" : undefined}
                className={`group flex h-full flex-col rounded-xl border p-4 transition-colors ${isCurrent ? "border-[#355E4D] bg-[#355E4D]/5" : "border-[#D2D4C8] bg-white hover:border-[#355E4D]"}`}
              >
                <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">
                  {first.map((s) => (
                    <div key={s.slug} className="bg-[#D2D4C8]/40" style={{ aspectRatio: "1 / 1" }}>
                      <SwatchPicture shade={s} sizes="(max-width: 640px) 30vw, 10vw" />
                    </div>
                  ))}
                </div>
                <span className="mt-3 spec-sh text-[#355E4D]">{String(i + 1).padStart(2, "0")}</span>
                <span className={`${serif} mt-1 text-xl leading-tight text-[#0C1510]`}>{r.name}</span>
                <span className="mt-1 text-xs text-[#0C1510]/60">
                  {r.kind === "fluting" ? `${r.samples?.length ?? 0} catalogued samples` : `${r.shades.length} shades`}
                  <span aria-hidden="true"> &rarr;</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The full catalogue of a material grouped by range, for the line page. The
 * first ten shades of each range are open; the rest sit inside a native
 * details element, so every one of the links is in the HTML.
 */
export function CatalogueByRange({ entry, open = 10 }: { entry: MaterialEntry; open?: number }) {
  return (
    <div className="mt-14 space-y-16">
      {entry.ranges
        .filter((r) => r.kind !== "fluting")
        .map((r) => {
          const shades = shadesOf(r);
          const head = shades.slice(0, open);
          const rest = shades.slice(open);
          return (
            <section key={r.slug} aria-labelledby={`range-${r.slug}`}>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-[#0C1510]/12 pt-6">
                <div>
                  <p className={eyebrowLight}>{entry.rangeWord}</p>
                  <h3 id={`range-${r.slug}`} className={`${serif} mt-2 text-[1.75rem] leading-none text-[#0C1510] sm:text-[2rem]`}>
                    <Link href={rangeHref(entry.line, r.slug)} className="transition-colors hover:text-[#355E4D]">
                      {r.name}
                    </Link>
                  </h3>
                </div>
                <Link href={rangeHref(entry.line, r.slug)} className="label-sh text-[#355E4D] underline underline-offset-4">
                  {shades.length} shades, the {r.name} page &rarr;
                </Link>
              </div>
              <ShadeGrid shades={head} className="mt-8" />
              {rest.length > 0 && (
                <details className="group mt-8">
                  <summary className={`${buttonOutline} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
                    <span className="group-open:hidden">Show all {shades.length} {r.name} shades</span>
                    <span className="hidden group-open:inline">Show fewer {r.name} shades</span>
                  </summary>
                  <ShadeGrid shades={rest} className="mt-8" animate={false} />
                </details>
              )}
            </section>
          );
        })}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Furniture                                                                 */
/* ------------------------------------------------------------------------ */

export function GcbBreadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={`${wrap} pt-7 lg:pt-10`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 label-sh text-[#0C1510]/60">
        {items.map((it, i) => (
          <li key={`${it.name}-${i}`} className="flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-[#355E4D]">
                {it.name}
              </Link>
            ) : (
              <span className="text-[#0C1510]" aria-current="page">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Stock partner: Global Classic, Al Sajaa. The same band the line pages carry. */
export function GlobalClassicBand({ materialWord }: { materialWord: string }) {
  return (
    <section className="bg-[#355E4D] text-[#F7F8F5]" aria-labelledby="gcb-heading">
      <div className={`${wrap} grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.618fr_1fr] lg:gap-16 lg:py-24`}>
        <Reveal>
          <p className="label-sh text-[#D2D4C8]">Stock partner</p>
          <h2 id="gcb-heading" className={`${serif} mt-3 text-[2rem] leading-[1.1] text-[#F7F8F5] sm:text-[2.25rem] lg:text-[2.75rem] max-w-[20ch]`}>Held in stock by Global Classic, Al Sajaa.</h2>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-[#F7F8F5]/85">
            Global Classic Building Materials is the place to see KalingaStone {materialWord} before you buy it. Our sister company holds the full slabs on racks at its warehouse and showroom in Al Sajaa Industrial Area, Sharjah, beside the Lapiz Blue Sharjah branch, and is certified through the official KalingaStone channel as the authorised reseller for the Northern Emirates. Visit, view the exact slabs and lot under daylight, tag them for your project, and Lapiz Blue quotes, reserves and delivers to site or to the workshop.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="https://www.gcbuae.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[3rem] items-center rounded-full bg-[#F7F8F5] px-7 label-sh text-[#0C1510] transition-opacity hover:opacity-90">gcbuae.com</a>
            <a href="#kalinga-quote" className="inline-flex min-h-[3rem] items-center rounded-full border border-[#F7F8F5]/40 px-7 label-sh text-[#F7F8F5] transition-colors hover:border-[#F7F8F5]">Request a quotation</a>
            <Link href={`/brands/${BRAND_SLUG}`} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#F7F8F5]/85 underline underline-offset-4 transition-colors hover:text-[#F7F8F5]">Kalinga Stone at Lapiz Blue</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center justify-center rounded-xl border border-[#F7F8F5]/20 bg-[#F7F8F5] p-8 sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brands/kalinga-stone/global-classic-logo.svg" alt="Global Classic Building Materials, Al Sajaa, Sharjah" width={368} height={261} className="h-auto w-full max-w-[260px]" loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingBar({ title, back, backHref }: { title: string; back: string; backHref: string }) {
  return (
    <section className="bg-[#0C1510] text-[#F7F8F5]">
      <div className={`${wrap} flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between`}>
        <div>
          <p className={`${serif} text-2xl`}>{title}</p>
          <p className="mt-1 text-sm text-[#F7F8F5]/66">Slab availability, samples and AED pricing from Al Sajaa stock, usually within one working day.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href="#kalinga-quote" className="inline-flex min-h-[3rem] items-center rounded-full bg-[#F7F8F5] px-6 label-sh text-[#0C1510] transition-opacity hover:opacity-90">Request availability</a>
          <Link href="/contact" className="inline-flex min-h-[3rem] items-center rounded-full border border-[#F7F8F5]/35 px-6 label-sh text-[#F7F8F5] transition-colors hover:border-[#F7F8F5]">Email the Dubai desk</Link>
          <Link href={backHref} className="inline-flex min-h-[3rem] items-center px-2 label-sh text-[#F7F8F5]/85 underline underline-offset-4 hover:text-[#F7F8F5]">{back}</Link>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href="https://wa.me/971502814338"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#F7F8F5]/20 bg-[#0C1510] text-[#F7F8F5] shadow-lg transition-transform hover:scale-105"
    >
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/** The line switcher under a header: Quartz, Marble, Terrazzo, Elixir. */
export function LineSwitcher({ current }: { current: string }) {
  const lines: [string, string][] = [
    ["elixir", "Elixir"],
    ["engineered-quartz", "Quartz"],
    ["engineered-marble", "Marble"],
    ["terrazzo", "Terrazzo"],
  ];
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#0C1510]/12 pt-5 label-sh text-[#0C1510]/60">
      <span>KalingaStone lines</span>
      {lines.map(([slug, label]) => (
        <Link key={slug} href={lineHref(slug)} aria-current={slug === current ? "page" : undefined} className={`transition-colors hover:text-[#355E4D] ${slug === current ? "text-[#0C1510] underline underline-offset-4 decoration-[#355E4D]" : ""}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}
