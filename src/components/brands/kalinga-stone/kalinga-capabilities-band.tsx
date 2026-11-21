import Image from "next/image";
import Link from "next/link";
import type { CapabilityItem, StatItem } from "@/data/brandConfigs";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { KalingaParallax } from "./kalinga-reveal.client";
import { ScrollRuleList, ScrollRuleItem } from "@/components/brands/hub/scroll-rule.client";

/**
 * One navy editorial band for the Kalinga Stone hub. It replaces the three
 * template sections that used to sit here (the icon stats on white, the
 * centred capabilities with 600 px of air, and the swatch explorer on cream)
 * with the same figures, the same copy and the same four line page links,
 * laid out tight: a stat ribbon, a photograph column against a numbered
 * list, and the four swatches in a row.
 */

const GCB = "/images/brands/kalinga-stone/gcb";

/** The four line pages, in the order and with the names the explorer used. */
const PRODUCTS = [
  { name: "ELIXIR", slug: "elixir", image: "/images/brands/kalinga-stone/elixir.webp" },
  { name: "QUARTZ", slug: "engineered-quartz", image: "/images/brands/kalinga-stone/quartz.webp" },
  { name: "TERRAZZO", slug: "terrazzo", image: "/images/brands/kalinga-stone/terrazzo.webp" },
  { name: "MARBLE", slug: "engineered-marble", image: "/images/brands/kalinga-stone/marble.webp" },
];


const iconProps = { width: 22, height: 22, viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function CompassIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      <path d="M32 8v8M32 48v8M8 32h8M48 32h8M32 32 20 20" />
      <path d="M32 32l12 12" strokeDasharray="3 4" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M8 54V26l14 8V26l14 8V26l14 8v20H8Z" />
      <path d="M14 10h6v16h-6zM44 14h6v12h-6z" />
      <path d="M18 44h6M30 44h6M42 44h6" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M32 6 54 24 32 58 10 24 32 6Z" />
      <path d="M10 24h44M22 6l-6 18 16 34M42 6l6 18-16 34M32 6v18" strokeOpacity="0.55" strokeWidth="1.5" />
    </svg>
  );
}

const CAPABILITY_ICONS = [CompassIcon, PlantIcon, DiamondIcon];

/** Big cream figure; numeric values count up once in view, the real value is in the markup for a crawler. */
function Figure({ value }: { value: string }) {
  const numeric = /^\d+$/.test(value);
  const cls = "block font-outfit text-5xl font-light leading-none text-[#F3DFC1] sm:text-6xl lg:text-7xl";
  if (!numeric) return <span className={cls}>{value}</span>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        <AnimatedCounter end={Number(value)} duration={1600} className={cls} />
      </span>
    </>
  );
}

function ProductionLinePicture() {
  const base = `${GCB}/quartz-decor-production-line`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1200.avif 1200w, ${base}-1600.avif 1600w`} sizes="(max-width: 1024px) 120vw, 1600px" />
      <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w`} sizes="(max-width: 1024px) 120vw, 1600px" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-1200.webp`} alt="Quartz slab on the automated production line at the Classic Marble Company plant, Silvassa" width={1200} height={509} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
    </picture>
  );
}

function RacksPicture() {
  const base = `${GCB}/home-about-racks`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-640.avif`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}-640.webp`} alt="Kalinga Stone slabs on the racks at the Al Sajaa warehouse, Sharjah" width={640} height={853} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
    </picture>
  );
}

/** Vertical caption down the left edge of a photograph frame. */
function RunningHead({ children }: { children: string }) {
  return (
    <span className="label-sh pointer-events-none absolute left-3 top-3 z-10 rounded-sm bg-[#161925]/70 px-1.5 py-2.5 text-[#F3DFC1] [writing-mode:vertical-rl] sm:left-4 sm:top-4">
      {children}
    </span>
  );
}

export function KalingaCapabilitiesBand({ stats, capabilities }: { stats: StatItem[]; capabilities: { intro: string; items: CapabilityItem[] } }) {
  return (
    <section className="w-full overflow-hidden bg-[#161925] py-16 text-white lg:py-24" aria-labelledby="kalinga-band-heading">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* 1. Stat ribbon */}
        <dl className="grid grid-cols-2 border-y border-white/15 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col gap-3 py-6 lg:py-8",
                i % 2 === 1 ? "border-l border-white/15 pl-5" : "pr-5",
                i >= 2 ? "border-t border-white/15 lg:border-t-0" : "",
                i === 2 ? "lg:border-l lg:border-white/15" : "",
                i > 0 ? "lg:pl-8" : "",
              ].join(" ")}
            >
              <dd className="order-1 m-0">
                <Figure value={stat.value} />
              </dd>
              <dt className="label-sh order-2 text-[#BFD7EA]">{stat.label}</dt>
            </div>
          ))}
        </dl>

        {/* 2. Photographs against the numbered capabilities */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1.618fr] lg:gap-16">
          <div className="grid grid-cols-[1.618fr_1fr] gap-3 lg:block">
            <KalingaParallax className="aspect-[4/5] rounded-sm">
              <RunningHead>Silvassa, India</RunningHead>
              <ProductionLinePicture />
            </KalingaParallax>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:mt-4 lg:aspect-[4/3] lg:w-[62%]">
              <RunningHead>Al Sajaa, Sharjah</RunningHead>
              <RacksPicture />
            </div>
          </div>

          <div>
            <p className="label-sh text-[#BFD7EA]">Manufacturing and supply</p>
            <h2 id="kalinga-band-heading" className="mt-3 max-w-2xl font-outfit text-2xl font-light leading-snug text-white sm:text-3xl">
              {capabilities.intro}
            </h2>
            <ScrollRuleList className="mt-8 border-t border-white/15">
              {capabilities.items.map((item, i) => {
                const Icon = CAPABILITY_ICONS[i] ?? DiamondIcon;
                return (
                  <ScrollRuleItem key={item.title} className="border-b border-white/15 py-7 pl-6 sm:pl-8" bulletTop="2.1rem">
                    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[3rem_1fr]">
                      <span className="spec-sh text-[#F3DFC1]">0{i + 1}</span>
                      <div>
                        <p className="label-sh flex items-center gap-3 text-[#BFD7EA]">
                          <span className="text-[#F3DFC1]"><Icon /></span>
                          <span>{item.subtitle}</span>
                        </p>
                        <h3 className="mt-3 font-outfit text-2xl font-medium leading-tight text-white sm:text-[1.75rem]">{item.title}</h3>
                        <p className="mt-3 max-w-prose font-manrope text-[15px] leading-relaxed text-white/72 sm:text-base">{item.content}</p>
                      </div>
                    </div>
                  </ScrollRuleItem>
                );
              })}
            </ScrollRuleList>
          </div>
        </div>

      </div>
    </section>
  );
}
