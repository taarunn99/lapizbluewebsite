"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BRANDS = [
  { slug: "mapei", name: "Mapei" },
  { slug: "kerakoll", name: "Kerakoll" },
  { slug: "weber", name: "Weber Saint-Gobain" },
  { slug: "laticrete", name: "Laticrete" },
  { slug: "pidilite-puma", name: "Pidilite Puma" },
  { slug: "profilpas", name: "Profilpas" },
  { slug: "akzonobel", name: "AkzoNobel Dulux" },
  { slug: "fila", name: "FILA" },
  { slug: "kalinga-stone", name: "Kalinga Stone" },
] as const;

const LINES = [
  { href: "/construction-chemicals-dubai", label: "Construction chemicals in Dubai" },
  { href: "/trade-account", label: "Open a trade account" },
  { href: "/credentials", label: "Appointment letters" },
] as const;

export function BrandsShowcaseSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shown = reduced || isInView;

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-white flex items-center justify-center px-6 sm:px-8 lg:px-16 py-20"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-outfit font-bold text-[#161925] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Explore
          </h2>
          <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            The nine manufacturers Lapiz Blue is appointed to distribute in the UAE, and the lines each one covers on site.
          </p>
        </motion.div>

        {/* Content Grid - Mobile: Stack, Desktop: golden ratio, lede left and photograph right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={reduced ? false : { opacity: 0, x: -40 }}
            animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="label-sh text-[#406E8E]">Construction chemicals distributor in Dubai, Abu Dhabi and Sharjah</p>
            <h3 className="font-outfit font-semibold text-[#161925] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] mt-4">
              Nine authorised brands,
              <br />
              one quote, data sheet attached.
            </h3>
            <p className="font-manrope font-normal text-[#161925] text-base sm:text-lg md:text-xl leading-relaxed mt-6 max-w-[62ch]">
              Lapiz Blue General Trading LLC is the authorised distributor of Mapei, Kerakoll, Weber Saint-Gobain, Laticrete,
              Pidilite Puma, Profilpas, AkzoNobel Dulux, FILA and Kalinga Stone across Dubai, Abu Dhabi and Sharjah. Tile
              adhesives, grouts, waterproofing, self levelling, epoxy flooring, concrete repair, sealants, profiles, coatings,
              stone care and engineered stone ship from three distribution centres in Al Quoz, Mussafah and Al Sajaa, with the
              data sheet on every quote and trade or BOQ pricing for contractors, consultants and resellers.
            </p>

            <p className="label-sh text-[#23395B] mt-8">The brands</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2" aria-label="Brand pages">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="font-outfit font-semibold text-lg sm:text-xl text-[#161925] underline-offset-[6px] decoration-[#BFD7EA] decoration-2 hover:underline hover:text-[#406E8E] transition-colors"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3" aria-label="Where to go next">
              {LINES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-manrope text-sm font-semibold text-[#406E8E] underline underline-offset-4 hover:text-[#23395B]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="order-1 lg:order-2 relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={reduced ? undefined : { scale: 1.02 }}
          >
            <Image
              src="/images/brands/brandspageimages/brand-product.webp"
              alt="Bathroom finished with tile adhesive, grout and profiles from the brands Lapiz Blue distributes in the UAE"
              width={1200}
              height={1795}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
