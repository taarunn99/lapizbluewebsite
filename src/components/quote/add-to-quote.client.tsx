'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { QuoteItem } from '@/lib/quote-list';
import { useQuoteList } from './use-quote-list';

interface AddToQuoteProps {
  item: Omit<QuoteItem, 'quantity'>;
  /** How many packs to add. The hero adds one, the calculator adds its order. */
  quantity?: number;
  /** Overrides the resting label, so the calculator can say what it is adding. */
  label?: string;
  variant?: 'ghost' | 'solid';
  className?: string;
}

/**
 * Put a product on the quote list.
 *
 * After a click it says so for a few seconds and offers the list, because the
 * list lives on another page and a button that silently succeeds leaves people
 * clicking it again.
 */
export function AddToQuote({
  item,
  quantity = 1,
  label = 'Add to quote list',
  variant = 'ghost',
  className = '',
}: AddToQuoteProps) {
  const { add, has, ready } = useQuoteList();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 4000);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const onList = ready && has(item.brand, item.slug);

  const base =
    'inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full px-7 font-manrope text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]';
  const look =
    variant === 'solid'
      ? 'bg-[var(--brand)] text-white hover:opacity-90'
      : 'border-[1.5px] border-[#161925]/50 text-[#161925] hover:border-[#161925] hover:bg-[#161925] hover:text-white';

  if (justAdded) {
    return (
      <span className={`flex flex-wrap items-center gap-3 ${className}`}>
        <span className={`${base} border-[1.5px] border-[var(--brand)] text-[var(--brand-ink)]`}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Added
        </span>
        <Link
          href="/quote"
          className="font-manrope text-sm font-semibold text-[var(--brand-ink)] underline underline-offset-4"
        >
          View quote list
        </Link>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add({ ...item, quantity });
        setJustAdded(true);
      }}
      className={`${base} ${look} ${className}`}
    >
      {onList ? 'Add again' : label}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
