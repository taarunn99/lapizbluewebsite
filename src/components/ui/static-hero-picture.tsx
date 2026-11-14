// Static responsive hero image: pre-encoded AVIF/WebP variants served straight
// from /public, so the LCP image never waits on the on-demand image optimizer
// (which is cold after every deploy). Pair with <HeroPreload> in the same page
// so the browser fetches the right variant before CSS and fonts.
//
// Expects files named `${base}-${w}.avif` and `${base}-${w}.webp` for each width.

const DEFAULT_WIDTHS = [640, 828, 1200, 1440, 1920];

type Props = {
  base: string; // e.g. "/images/brands/mapei/hero"
  alt: string;
  widths?: number[];
  className?: string; // applied to the <img>, defaults to a cover fill
  fetchPriority?: "high" | "low" | "auto";
};

function mediaFor(widths: number[], i: number): string | undefined {
  // The largest step has no media query so it is the fallback source.
  return i < widths.length - 1 ? `(max-width: ${widths[i]}px)` : undefined;
}

export function StaticHeroPicture({
  base,
  alt,
  widths = DEFAULT_WIDTHS,
  className = "absolute inset-0 w-full h-full object-cover",
  fetchPriority = "high",
}: Props) {
  const largest = widths[widths.length - 1];
  return (
    <picture>
      {widths.map((w, i) => (
        <source key={`avif-${w}`} type="image/avif" media={mediaFor(widths, i)} srcSet={`${base}-${w}.avif`} />
      ))}
      {widths.map((w, i) => (
        <source key={`webp-${w}`} type="image/webp" media={mediaFor(widths, i)} srcSet={`${base}-${w}.webp`} />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}-${largest}.webp`}
        alt={alt}
        className={className}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}

// Priority hinted preload links for the AVIF variants, one per viewport band.
// React hoists these <link> elements into <head>.
export function HeroPreload({ base, widths = DEFAULT_WIDTHS }: { base: string; widths?: number[] }) {
  return (
    <>
      {widths.map((w, i) => {
        const min = i === 0 ? 0 : widths[i - 1] + 1;
        const media =
          i === 0
            ? `(max-width: ${w}px)`
            : i === widths.length - 1
              ? `(min-width: ${min}px)`
              : `(min-width: ${min}px) and (max-width: ${w}px)`;
        return (
          <link
            key={w}
            rel="preload"
            as="image"
            type="image/avif"
            fetchPriority="high"
            href={`${base}-${w}.avif`}
            media={media}
          />
        );
      })}
    </>
  );
}
