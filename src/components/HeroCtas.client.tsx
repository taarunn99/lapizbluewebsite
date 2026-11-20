// src/components/HeroCtas.client.tsx
"use client";

import Link from "next/link";

/**
 * The two things a buyer does from the first screen: send the bill of
 * quantities, or find a data sheet. The second opens the site search, which
 * covers every product page, through the event the header listens for.
 */
export default function HeroCtas() {
  const look =
    "flex items-center justify-center rounded-[10px] text-white font-manrope text-center transition-all duration-200 ease-out bg-gradient-to-b from-[#110F11] to-[#131313] hover:bg-gradient-to-b hover:from-[#110F11] hover:to-[#23395B] hover:scale-[1.02]";
  const size = {
    width: "clamp(140px, 14vw, 200px)",
    height: "clamp(45px, 5vw, 70px)",
    opacity: 0.7,
    fontSize: "clamp(0.8rem, 1.4vw, 1.25rem)",
    textShadow: "0px 1px 4px rgba(12, 12, 13, 0.05)",
  } as const;

  return (
    <div className="absolute z-10 top-[43%] md:top-[38%]
                    left-1/2 -translate-x-1/2 md:left-auto md:right-[5%] md:translate-x-0
                    flex flex-row items-center justify-center md:justify-end gap-3
                    w-[90%] md:w-auto px-4 md:px-0">
      <Link href="/contact#enquiry" className={look} style={size}>
        Send a BOQ
      </Link>

      <button
        type="button"
        className={look}
        style={size}
        onClick={() => window.dispatchEvent(new CustomEvent("lapizblue:open-search"))}
      >
        Find a datasheet
      </button>
    </div>
  );
}
