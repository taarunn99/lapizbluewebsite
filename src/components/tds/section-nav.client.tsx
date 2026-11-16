'use client';

import { useEffect, useState } from 'react';

export interface PageSection {
  id: string;
  label: string;
}

/**
 * On this page.
 *
 * A chip bar of same page anchors, not tabs. Every section it points at is
 * rendered on the page at the same time; this only scrolls to them. That
 * matters: a product page is a reference document, and a specifier wants to
 * read it top to bottom or print it as often as they want to jump. Hiding
 * four fifths of it behind a tab would fight both.
 *
 * The chip for the section currently in view is marked with aria-current, so
 * the bar tells you where you are as well as where you can go.
 */
export function SectionNav({ sections }: { sections: PageSection[] }) {
  const [current, setCurrent] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // The top sixth of the viewport decides what counts as current, so a
    // heading scrolled just under the bar is what gets marked.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="border-y border-[#161925]/12 bg-[#F6F8FA] print:hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap gap-2.5 py-5">
          {sections.map((s) => {
            const active = s.id === current;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active ? 'true' : undefined}
                  className={`inline-flex min-h-[2.75rem] items-center rounded-full border px-5 font-manrope text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E] ${
                    active
                      ? 'border-[#23395B] bg-[#23395B] text-white'
                      : 'border-[#161925]/20 text-[#161925] hover:border-[#23395B] hover:bg-[#23395B] hover:text-white'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
