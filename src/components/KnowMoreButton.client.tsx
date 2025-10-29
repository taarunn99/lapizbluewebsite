// src/components/KnowMoreButton.client.tsx
"use client";

import Link from "next/link";

export default function KnowMoreButton() {
  return (
    <Link
      href="/about"
      className="inline-flex items-center justify-center rounded-[10px]
                 text-white font-manrope text-center
                 transition-all duration-200 ease-out
                 bg-gradient-to-b from-[#23395B] to-[#406E8E]
                 hover:bg-gradient-to-b hover:from-[#406E8E] hover:to-[#23395B]
                 hover:scale-[1.02]
                 shadow-md hover:shadow-lg"
      style={{
        width: 'clamp(120px, 12vw, 180px)',
        height: 'clamp(40px, 4.5vw, 60px)',
        fontSize: 'clamp(0.75rem, 1.2vw, 1.1rem)',
        textShadow: '0px 1px 4px rgba(12, 12, 13, 0.05)'
      }}
    >
      Know more?
    </Link>
  );
}
