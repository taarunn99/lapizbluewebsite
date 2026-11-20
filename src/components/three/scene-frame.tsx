import posters from "@/data/scenes/posters.json";
import { getScene } from "@/data/scenes";
import SceneIsland from "./scene.client";

/**
 * A 3D explainer as the page ships it: a poster.
 *
 * The poster is an ordinary responsive picture, AVIF then WebP, rendered once
 * at build from the live scene and committed. three.js arrives only through
 * the island, on a tap or below the fold after load. A scene with no poster
 * on disk renders nothing at all, which keeps a half finished scene off the
 * site; the index is written by scripts/render-3d-posters.mjs and only lists
 * files that exist.
 */

type PosterIndex = Record<string, { widths: number[]; version: string }>;
const INDEX = posters as PosterIndex;

export function hasPoster(slug: string): boolean {
  return Boolean(INDEX[slug]);
}

export function posterSrc(slug: string, width = 1200, ext: "webp" | "avif" = "webp"): string {
  return `/images/3d/${slug}-${width}.${ext}`;
}

interface Props {
  scene: string;
  /** Load the live scene when it scrolls into view. On by default; off only where the frame is the LCP. */
  autoload?: boolean;
  /** The poster is above the fold on this page: fetch it eagerly. Never combine with autoload. */
  priority?: boolean;
  /** Pixel width the frame is laid out at, for the sizes attribute. */
  sizes?: string;
  className?: string;
  /** Hide the caption under the poster (the page supplies its own). */
  bare?: boolean;
}

export default function SceneFrame({ scene: slug, autoload = true, priority = false, sizes = "(max-width: 1024px) 100vw, 800px", className = "", bare = false }: Props) {
  const scene = getScene(slug);
  const entry = INDEX[slug];
  if (!scene || !entry) return null;
  const widths = entry.widths;
  const largest = Math.max(...widths);
  const v = entry.version ? `?v=${entry.version}` : "";
  const set = (ext: "avif" | "webp") => widths.map((w) => `${posterSrc(slug, w, ext)}${v} ${w}w`).join(", ");

  return (
    <figure className={className}>
      <SceneIsland scene={scene} autoload={autoload && !priority}>
        <picture>
          <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
          <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${posterSrc(slug, largest)}${v}`}
            alt={scene.caption}
            width={largest}
            height={Math.round(largest * 0.75)}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="block aspect-[4/3] w-full rounded-2xl bg-white object-cover"
          />
        </picture>
      </SceneIsland>
      {!bare && <figcaption className="spec-sh mt-3 text-[#161925]/70">{scene.caption}</figcaption>}
    </figure>
  );
}
