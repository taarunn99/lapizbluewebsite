'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RangeDrawer } from './range-drawer';
import type { RangeItem, RangeGroup } from './range-types';

interface ProductMarqueeProps {
  items: RangeItem[];
  groups: RangeGroup[];
  primaryColor: string;
  secondaryColor: string;
}

// Infinite product marquee on the brand colour band (Magic UI marquee
// pattern: duplicated track + CSS keyframe loop, pause on hover, edge fade
// masks per house rule, static scrollable row under prefers-reduced-motion).
// Tapping a product opens the range drawer preselected to its category.
export function ProductMarquee({ items, groups, primaryColor, secondaryColor }: ProductMarqueeProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const openWith = (category: string | null) => {
    setActiveCategory(category);
    setOpen(true);
  };

  const track = (ariaHidden: boolean) => (
    <div
      className="flex min-w-max shrink-0 items-stretch gap-5 pr-5 tds-marquee-track"
      aria-hidden={ariaHidden}
    >
      {items.map((item) => (
        <button
          key={`${ariaHidden ? 'b' : 'a'}-${item.href}`}
          type="button"
          tabIndex={ariaHidden ? -1 : 0}
          onClick={() => openWith(item.category)}
          className="group w-40 shrink-0 cursor-pointer text-left sm:w-48"
        >
          <div className="relative flex aspect-square items-center justify-center rounded-xl bg-white/95 p-4 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
            {item.image ? (
              <Image
                src={item.image}
                alt={`${item.name} pack`}
                fill
                sizes="192px"
                className="object-contain p-4"
                loading="eager"
              />
            ) : null}
          </div>
          <p className="mt-2 truncate text-xs font-bold uppercase tracking-wide text-white">
            {item.name}
          </p>
          <p className="truncate text-[11px] text-white/60">
            {item.classification || item.categoryLabel}
          </p>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <section
        className="relative overflow-hidden py-12 md:py-16"
        style={{
          background: `linear-gradient(120deg, ${secondaryColor} 0%, ${secondaryColor} 45%, ${primaryColor} 130%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 pb-8">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                The range. All {items.length}.
              </h2>
              <div className="mt-2 h-1 w-14 bg-[#FFCC00]" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={() => openWith(null)}
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:inline-flex"
            >
              Browse all
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Edge fade masked marquee */}
        <div className="tds-marquee-mask relative">
          <div className="tds-marquee flex">
            {track(false)}
            {track(true)}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-6 sm:hidden sm:px-6">
          <button
            type="button"
            onClick={() => openWith(null)}
            className="w-full cursor-pointer rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            Browse all products
          </button>
        </div>
      </section>

      <RangeDrawer
        items={items}
        groups={groups}
        open={open}
        onOpenChange={setOpen}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
    </>
  );
}
