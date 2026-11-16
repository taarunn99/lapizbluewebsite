'use client';

import { useId, useState, type ReactNode } from 'react';

export interface ProductTab {
  id: string;
  label: string;
  /** Large display heading inside the panel. */
  heading: string;
  /** The quieter line under it. */
  subheading: string;
  content: ReactNode;
}

/**
 * The product detail, organised as tabs rather than one long scroll.
 *
 * A product page serves two people with opposite needs. A contractor wants
 * the quantity and the data sheet and nothing else; a consultant wants the
 * full specification and the clause. Tabs let the page carry everything
 * without either of them wading through the other's section.
 *
 * Every panel stays in the DOM and is hidden with the hidden attribute
 * rather than removed, so the whole page is still one crawlable document and
 * in-page search finds text in a tab that is not open.
 */
export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const uid = useId();
  const [active, setActive] = useState(tabs[0]?.id);

  if (tabs.length === 0) return null;

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].id);
    document.getElementById(`${uid}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div>
      {/* Tab strip. Scrolls sideways on a phone rather than wrapping, so the
          row never becomes two ragged lines. */}
      <div className="border-b border-[#161925]/15 overflow-x-auto">
        <div role="tablist" aria-label="Product detail" className="flex min-w-max gap-1">
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`${uid}-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative px-5 py-4 font-manrope text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#406E8E] ${
                  selected ? 'text-[#23395B]' : 'text-[#161925]/55 hover:text-[#161925]'
                }`}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-0.5 ${selected ? 'bg-[#23395B]' : 'bg-transparent'}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${uid}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="pt-10 md:pt-14"
        >
          <h2 className="font-outfit font-bold text-[#161925] tracking-tight text-3xl sm:text-4xl">
            {tab.heading}
          </h2>
          <p className="mt-2 font-manrope text-lg text-[#161925]/55">{tab.subheading}</p>
          <div className="mt-8">{tab.content}</div>
        </div>
      ))}
    </div>
  );
}
