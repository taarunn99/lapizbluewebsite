"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SceneDef } from "@/data/scenes";

/**
 * The island that decides when three.js is allowed to load.
 *
 * Never on first paint. On a tap always; on scroll into view only when the
 * frame says it may (below the fold, after the page has loaded and gone idle).
 * Under prefers-reduced-motion the control is not offered, and without WebGL
 * it is not offered either, so the poster is what those visitors get.
 */
const SceneRenderer = dynamic(() => import("./renderer.client"), { ssr: false, loading: () => null });

interface Props {
  scene: SceneDef;
  autoload?: boolean;
  /** The poster markup, rendered on the server, that this island replaces on load. */
  children: React.ReactNode;
}

function canWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function SceneIsland({ scene, autoload = false, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offered, setOffered] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !canWebGL()) return;
    setOffered(true);
    if (!autoload || !ref.current) return;

    // In view, after load, when the main thread is quiet.
    let armed = false;
    const arm = () => {
      armed = true;
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        const go = () => {
          if (!armed) return setTimeout(go, 300);
          setLive(true);
          io.disconnect();
        };
        const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
        if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1500 });
        else setTimeout(go, 200);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [autoload]);

  return (
    <div ref={ref}>
      {live ? (
        <SceneRenderer scene={scene} />
      ) : (
        <div className="relative">
          {children}
          {offered && (
            <button
              type="button"
              onClick={() => setLive(true)}
              className="absolute bottom-4 left-4 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-[#161925] px-5 font-manrope text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Turn it in 3D
            </button>
          )}
        </div>
      )}
    </div>
  );
}
