"use client";

import Link from "next/link";

export default function HeroCtas() {
  return (
    <>
      <div className="absolute top-[400px] right-[450px] w-[249px] h-[85px] text-center text-3xl font-plus-jakarta-sans">
        <div className="absolute inset-0 rounded-[10px] [background:linear-gradient(182.54deg,_#110f11,_#23395b)] opacity-70 transition-opacity hover:opacity-90" />
        <Link href="/brands" className="absolute top-[21px] right-[14px] [text-shadow:0px_1px_4px_rgba(12,12,13,0.05)]">
          Explore Brands
        </Link>
      </div>

      <div className="absolute top-[397px] right-[146px] w-[249px] h-[85px] text-center text-3xl font-plus-jakarta-sans">
        <div className="absolute inset-0 rounded-[10px] [background:linear-gradient(180deg,_#110f11,_#131313)] opacity-70 transition-opacity hover:opacity-90" />
        <Link href="/blog" className="absolute top-[21px] right-[36px]">
          View Stories
        </Link>
      </div>
    </>
  );
}
