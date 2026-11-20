'use client';

import Link from 'next/link';
import { useQuoteList } from './use-quote-list';

/**
 * The quote list in the header.
 *
 * Always present, so a first time visitor learns the list exists before they
 * have used it. The count is only shown once the first effect has read
 * storage, because the server cannot know it and a wrong number on first
 * paint is worse than none. The link itself is in the prerendered HTML of
 * every page, which is a deliberate, baselined addition to the link graph.
 */
export function QuoteListLink({ className = '' }: { className?: string }) {
  const { count, ready } = useQuoteList();
  const filled = ready && count > 0;

  return (
    <Link
      href="/quote"
      className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 font-manrope text-sm font-semibold transition-opacity hover:opacity-90 ${
        filled ? 'bg-[#23395B] text-white' : 'text-[#161925] hover:bg-gray-100'
      } ${className}`}
      aria-label={filled ? `Your quote list, ${count} ${count === 1 ? 'pack' : 'packs'}` : 'Your quote list'}
      title="Quote list"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 4h2l2.6 11.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      {filled ? <span className="tabular-nums">{count}</span> : null}
    </Link>
  );
}
