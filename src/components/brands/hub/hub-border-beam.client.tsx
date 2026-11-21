"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A light travelling round the edge of a card, the Magic UI border beam
 * written in: a masked ring the width of the border, with a cream gradient
 * square carried along a rounded rect offset path. Still under reduced motion.
 */
export function BorderBeam({ size = 260, duration = 11, radius = 24 }: { size?: number; duration?: number; radius?: number }) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-[#F3DFC1] via-[#F3DFC1]/40 to-transparent"
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${radius}px)`, offsetDistance: "0%" }}
        animate={reduced ? undefined : { offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </div>
  );
}
