'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  QUOTE_CHANGED_EVENT,
  QUOTE_STORAGE_KEY,
  type QuoteItem,
  addToQuoteList,
  clearQuoteList,
  readQuoteList,
  removeFromQuoteList,
  setQuoteQuantity,
} from '@/lib/quote-list';

/**
 * The quote list, kept in step across every component and every tab.
 *
 * It starts empty rather than reading storage during render, because the server
 * has no storage and a mismatch between the two would be a hydration error. The
 * first effect fills it in, which is also why callers get `ready`: a count of
 * zero before that effect runs is not the same as an empty list.
 */
export function useQuoteList() {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readQuoteList());
    setReady(true);

    const sync = () => setItems(readQuoteList());
    // Same tab, and other tabs.
    window.addEventListener(QUOTE_CHANGED_EVENT, sync);
    const onStorage = (e: StorageEvent) => {
      if (e.key === QUOTE_STORAGE_KEY || e.key === null) sync();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(QUOTE_CHANGED_EVENT, sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const add = useCallback((item: QuoteItem) => setItems(addToQuoteList(item)), []);
  const remove = useCallback((brand: string, slug: string) => setItems(removeFromQuoteList(brand, slug)), []);
  const setQuantity = useCallback(
    (brand: string, slug: string, quantity: number) => setItems(setQuoteQuantity(brand, slug, quantity)),
    [],
  );
  const clear = useCallback(() => setItems(clearQuoteList()), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const has = useCallback(
    (brand: string, slug: string) => items.some((i) => i.brand === brand && i.slug === slug),
    [items],
  );

  return { items, count, ready, has, add, remove, setQuantity, clear };
}
