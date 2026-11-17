'use client';

import Link from 'next/link';
import { useQuoteList } from './use-quote-list';

/**
 * The quote list count in the header.
 *
 * It renders nothing at all until the list has something in it. That is partly
 * restraint, and partly necessary: the server has no storage, so anything shown
 * on the first paint would be wrong, and a link that appeared in the prerendered
 * HTML of every page would change the internal link count on the pages that
 * already rank.
 */
export function QuoteListLink({ className = '' }: { className?: string }) {
  const { count, ready } = useQuoteList();
  if (!ready || count === 0) return null;

  return (
    <Link
      href="/quote"
      className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-[#23395B] px-4 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      aria-label={`Your quote list, ${count} ${count === 1 ? 'pack' : 'packs'}`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 4h2l2.6 11.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </Link>
  );
}
