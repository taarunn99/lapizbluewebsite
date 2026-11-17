'use client';

import Link from 'next/link';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';
import { quoteListMessage } from '@/lib/quote-list';
import { useQuoteList } from './use-quote-list';

/**
 * The quote list itself.
 *
 * Quantities are in packs, because that is how the material is bought and how
 * the calculator hands its answer over. Sending composes every line into one
 * message rather than opening a conversation per product, which is the whole
 * reason the list exists.
 */
export function QuoteListPanel() {
  const { items, ready, setQuantity, remove, clear } = useQuoteList();

  if (!ready) {
    // The server has no storage, so the first paint cannot know the list. Say
    // nothing rather than flash an empty state at someone who has ten items.
    return <p className="font-manrope text-base text-[#161925]/70">Loading your list.</p>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[60ch]">
        <p className="font-manrope text-base leading-relaxed text-[#161925]/85">
          Your quote list is empty. Add products from any product page and they will
          collect here, so you can send the whole job in one message instead of asking
          about one product at a time.
        </p>
        <Link
          href="/brands"
          className="mt-8 inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full bg-[#23395B] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Browse the brands
        </Link>
      </div>
    );
  }

  const message = quoteListMessage(items);
  const whatsapp = `https://wa.me/${TDS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const email = `mailto:info@lapizblue.com?subject=${encodeURIComponent(
    'Quotation request',
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div>
      <ul className="border-t border-[#161925]/15">
        {items.map((item) => (
          <li
            key={`${item.brand}-${item.slug}`}
            className="grid grid-cols-1 gap-4 border-b border-[#161925]/15 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div className="min-w-0">
              <Link
                href={`/brands/${item.brand}/${item.productLine}/${item.slug}`}
                className="font-outfit text-lg font-bold text-[#161925] underline-offset-4 hover:underline"
              >
                {item.name}
              </Link>
              <p className="label-sh mt-1.5 text-[#161925]/70">
                {item.brandName}
                {item.pack ? <span className="spec-sh ml-3 normal-case tracking-normal">{item.pack}</span> : null}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="label-sh text-[#161925]/70" htmlFor={`qty-${item.slug}`}>
                Packs
              </label>
              <input
                id={`qty-${item.slug}`}
                type="number"
                min={1}
                step={1}
                value={item.quantity}
                onChange={(e) => setQuantity(item.brand, item.slug, Number(e.target.value))}
                className="spec-sh w-20 rounded-md border border-[#161925]/25 px-3 py-2 text-center text-base tabular-nums focus:border-[#23395B] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => remove(item.brand, item.slug)}
                className="font-manrope text-sm font-semibold text-[#161925]/65 underline underline-offset-4 hover:text-[#161925]"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full bg-[#075E54] px-7 font-manrope text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Send the list on WhatsApp
        </a>
        <a
          href={email}
          className="inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full border-[1.5px] border-[#161925]/50 px-7 font-manrope text-sm font-semibold text-[#161925] transition-colors hover:border-[#161925] hover:bg-[#161925] hover:text-white"
        >
          Send it by email
        </a>
        <button
          type="button"
          onClick={clear}
          className="font-manrope text-sm font-semibold text-[#161925]/65 underline underline-offset-4 hover:text-[#161925]"
        >
          Clear the list
        </button>
      </div>

      <p className="mt-6 max-w-[62ch] font-manrope text-sm leading-relaxed text-[#161925]/70">
        We will come back with price, availability and lead time, and say plainly where a
        product is on order rather than in stock. The list is kept on this device only.
      </p>
    </div>
  );
}
