"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { SceneDef } from "@/data/scenes";

const SceneRenderer = dynamic(() => import("@/components/three/renderer.client"), { ssr: false });

export default function SceneBench({ scene, poster }: { scene: SceneDef; poster: boolean }) {
  const [ready, setReady] = useState(false);
  return (
    <div data-ready={ready ? "1" : "0"}>
      <SceneRenderer scene={scene} poster={poster} onReady={() => setReady(true)} />
    </div>
  );
}
