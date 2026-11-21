"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * The photograph beside the FAQ: a portrait frame that drifts a little with
 * the scroll and tilts toward the pointer (the 21st.dev tilt card idea,
 * copied in), with a cream running head and a brand blue rule that draws in.
 * Static under reduced motion.
 */
export type HubFaqPhoto = { base: string; alt: string; head?: string };

export function HubFaqPortrait({ slug, brandName, photo }: { slug?: string; brandName: string; photo?: HubFaqPhoto }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const base = photo?.base ?? `/images/brands/${slug}/faq`;
  const alt = photo?.alt ?? `${brandName} material being applied on a UAE project`;
  const head = photo?.head ?? `${brandName} on site`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 7);
    ry.set(px * 9);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div ref={ref} className="mt-10 [perspective:1200px]">
      <motion.figure
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl bg-[#161925] shadow-[0_30px_60px_-30px_rgba(22,25,37,0.55)]"
      >
        <motion.div style={reduced ? undefined : { y }} className="absolute -inset-y-[6%] inset-x-0">
          <picture>
            <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-960.avif 960w`} sizes="(max-width: 1024px) 100vw, 420px" />
            <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-960.webp 960w`} sizes="(max-width: 1024px) 100vw, 420px" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}-960.webp`} alt={alt} width={960} height={1440} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
          </picture>
        </motion.div>
        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[2/3]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161925]/80 to-transparent p-5">
          <p className="label-sh text-[#F3DFC1]">{head}</p>
          <motion.div
            className="mt-2 h-px bg-[#BFD7EA]"
            initial={reduced ? { width: "100%" } : { width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </motion.figure>
    </div>
  );
}
