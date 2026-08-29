'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from 'vaul';
import type { RangeItem, RangeGroup } from './range-types';

interface RangeDrawerProps {
  items: RangeItem[];
  groups: RangeGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

// FILA style range browser inside a vaul bottom sheet: category pills with
// coloured dots, search, ecom grid. Cards navigate to the TDS pages.
export function RangeDrawer({
  items,
  groups,
  open,
  onOpenChange,
  activeCategory,
  onCategoryChange,
}: RangeDrawerProps) {
  const [query, setQuery] = useState('');

  const visibleGroups = useMemo(
    () => groups.filter((g) => items.some((i) => i.category === g.category)),
    [groups, items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!activeCategory || i.category === activeCategory) &&
        (!q || i.name.toLowerCase().includes(q) || i.classification.toLowerCase().includes(q))
    );
  }, [items, activeCategory, query]);

  const dotFor = (category: string) =>
    groups.find((g) => g.category === category)?.dot ?? '#23395B';

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-[#161925]/60 backdrop-blur-[2px]" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed bottom-0 left-0 right-0 z-[70] flex h-[92svh] flex-col rounded-t-2xl bg-[#FAFAF8] outline-none"
        >
          {/* Grab handle */}
          <div className="mx-auto mt-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" aria-hidden="true" />

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[#161925]/10 py-5 md:flex-row md:items-end md:justify-between">
              <div>
                <Drawer.Title className="text-3xl font-bold uppercase tracking-tight text-[#161925] md:text-4xl">
                  The range. All {items.length}.
                </Drawer.Title>
                <div className="mt-2 h-1 w-14 bg-[#FFCC00]" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onCategoryChange(null)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    activeCategory === null
                      ? 'border-[#161925] bg-[#161925] text-white'
                      : 'border-gray-300 bg-white text-[#161925] hover:border-[#161925]'
                  }`}
                >
                  All
                </button>
                {visibleGroups.map((g) => (
                  <button
                    key={g.category}
                    type="button"
                    onClick={() =>
                      onCategoryChange(activeCategory === g.category ? null : g.category)
                    }
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                      activeCategory === g.category
                        ? 'border-[#161925] bg-[#161925] text-white'
                        : 'border-gray-300 bg-white text-[#161925] hover:border-[#161925]'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: g.dot }}
                      aria-hidden="true"
                    />
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="py-4">
              <label htmlFor="range-search" className="sr-only">
                Search products
              </label>
              <input
                id="range-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or class..."
                className="w-full max-w-md rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm outline-none transition-colors focus:border-[#23395B]"
              />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto overscroll-contain pb-10">
              {filtered.length === 0 ? (
                <p className="py-16 text-center text-gray-500">No products match.</p>
              ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {filtered.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group block cursor-pointer"
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="relative flex aspect-square items-center justify-center rounded-xl bg-[#EFEFEC] p-6 transition-colors duration-200 group-hover:bg-[#E7E9EC]">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={`${item.name} pack`}
                              fill
                              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                              className="object-contain p-5"
                              loading="lazy"
                            />
                          ) : null}
                          <span
                            className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: dotFor(item.category) }}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-3 text-sm font-bold uppercase tracking-tight text-[#161925] group-hover:text-[#23395B]">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {item.categoryLabel}
                          {item.classification ? ` · ${item.classification}` : ''}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
