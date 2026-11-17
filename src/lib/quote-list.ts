/**
 * The quote list.
 *
 * A visitor collects products across pages and sends the whole lot once, rather
 * than enquiring one product at a time. On a distributor site that is the thing
 * that actually produces an enquiry: nobody buys one bag of adhesive.
 *
 * It lives in localStorage and nowhere else. No account, no server, no cookie.
 * That keeps it honest about what it is, and it means the list survives a
 * reload and a tab close without anything to administer.
 *
 * Every read is wrapped, because localStorage throws rather than returns null
 * in a private window and when site data is blocked. A visitor who has it
 * disabled simply gets no list, and the rest of the page is unaffected.
 */

export const QUOTE_STORAGE_KEY = 'lapizblue-quote-list';

/** Fired on the window so every mounted component updates in the same tab. */
export const QUOTE_CHANGED_EVENT = 'lapizblue:quote-changed';

export interface QuoteItem {
  /** Brand slug, so the item can link back to its page. */
  brand: string;
  brandName: string;
  productLine: string;
  slug: string;
  name: string;
  /** What we sell it in, as the page shows it. Free text, may be empty. */
  pack: string;
  quantity: number;
}

const isBrowser = () => typeof window !== 'undefined';

function parse(raw: string | null): QuoteItem[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    // Anything that does not carry the fields we need is dropped rather than
    // trusted, because this string is editable by the visitor.
    return value.filter(
      (item): item is QuoteItem =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as QuoteItem).slug === 'string' &&
        typeof (item as QuoteItem).brand === 'string' &&
        typeof (item as QuoteItem).name === 'string' &&
        Number.isFinite((item as QuoteItem).quantity),
    );
  } catch {
    return [];
  }
}

export function readQuoteList(): QuoteItem[] {
  if (!isBrowser()) return [];
  try {
    return parse(window.localStorage.getItem(QUOTE_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function writeQuoteList(items: QuoteItem[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // A full or blocked store is not worth breaking the page over.
  }
  window.dispatchEvent(new CustomEvent(QUOTE_CHANGED_EVENT));
}

const sameProduct = (a: QuoteItem, b: Pick<QuoteItem, 'brand' | 'slug'>) =>
  a.brand === b.brand && a.slug === b.slug;

/** Add, or raise the quantity if the product is already on the list. */
export function addToQuoteList(item: QuoteItem): QuoteItem[] {
  const items = readQuoteList();
  const existing = items.find((i) => sameProduct(i, item));
  const next = existing
    ? items.map((i) => (sameProduct(i, item) ? { ...i, quantity: i.quantity + item.quantity } : i))
    : [...items, item];
  writeQuoteList(next);
  return next;
}

export function removeFromQuoteList(brand: string, slug: string): QuoteItem[] {
  const next = readQuoteList().filter((i) => !sameProduct(i, { brand, slug }));
  writeQuoteList(next);
  return next;
}

export function setQuoteQuantity(brand: string, slug: string, quantity: number): QuoteItem[] {
  if (quantity < 1) return removeFromQuoteList(brand, slug);
  const next = readQuoteList().map((i) =>
    sameProduct(i, { brand, slug }) ? { ...i, quantity } : i,
  );
  writeQuoteList(next);
  return next;
}

export function clearQuoteList(): QuoteItem[] {
  writeQuoteList([]);
  return [];
}

/**
 * The whole list as one WhatsApp message.
 *
 * Plain lines rather than a table, because WhatsApp renders no table and a
 * salesperson reads this on a phone.
 */
export function quoteListMessage(items: QuoteItem[]): string {
  if (items.length === 0) return 'Hello Lapiz Blue, I would like a quotation.';
  const lines = items.map((i) => {
    const pack = i.pack ? ` (${i.pack})` : '';
    return `${i.quantity} x ${i.name}${pack}, ${i.brandName}`;
  });
  return [
    'Hello Lapiz Blue, please quote the following:',
    '',
    ...lines,
    '',
    'Please confirm price, availability and lead time.',
  ].join('\n');
}
