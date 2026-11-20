"use client";

import { useRef, useState } from "react";

/**
 * A card with a soft light that follows the pointer, the React Bits idea
 * written in forty lines so nothing new ships. Touch and keyboard users get
 * the plain card; the light is decoration, not information.
 */
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setPos(null)}
      className={`relative overflow-hidden rounded-2xl border border-[#161925]/10 bg-white ${className}`}
    >
      {pos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(191,215,234,0.45), transparent 60%)` }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
