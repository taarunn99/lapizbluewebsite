import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SCENES, getScene } from "@/data/scenes";
import SceneBench from "./bench.client";

/**
 * The bench the posters are rendered from. Not indexed, not in the sitemap,
 * not linked. `?poster=1` draws the fixed poster frame with no controls, which
 * is what scripts/render-3d-posters.mjs screenshots.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return SCENES.map((s) => ({ scene: s.slug }));
}

export default async function SceneBenchPage({ params, searchParams }: { params: Promise<{ scene: string }>; searchParams: Promise<{ poster?: string }> }) {
  const { scene: slug } = await params;
  const { poster } = await searchParams;
  const scene = getScene(slug);
  if (!scene) notFound();
  return (
    <main className="bg-white p-6">
      <div style={{ width: 1200, maxWidth: "100%" }}>
        <SceneBench scene={scene} poster={poster === "1"} />
      </div>
      {poster !== "1" && (
        <p className="mt-6 font-manrope text-sm text-[#161925]/70">
          {scene.title}. {scene.intro}
        </p>
      )}
    </main>
  );
}
