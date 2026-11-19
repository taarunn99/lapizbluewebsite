import Image from 'next/image';
import type { ManifestRecord } from '@/lib/tds';
import {
  TDS_CATEGORY_LABELS,
  packFigure,
  getPdfSizeMB,
  getTdsDocNumber,
  hasTdsDownload,
} from '@/lib/tds';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';
import { KeySpecsBar } from './key-specs-bar';
import { AddToQuote } from '@/components/quote/add-to-quote.client';

interface TdsCoverProps {
  rec: ManifestRecord;
  brandName: string;
  productLineName: string;
  /** Where this product sits in its line, for the No. N / M counter. */
  position: { index: number; total: number };
}

/**
 * The product record.
 *
 * Image left and sticky, data right and scrolling. The right column runs in a
 * fixed order on every product so the page can be learned once and then read
 * without looking: what it is, what it is called, what it does, where it goes,
 * how to get the sheet, then the figures. Nothing is reordered per product and
 * nothing moves when a field is missing, it simply is not there.
 *
 * The shape follows the reference the owner specified. The colours are the
 * manufacturer's, taken from the --brand variables set on the page wrapper, so
 * this component never names a brand colour itself.
 */
export function TdsCover({ rec, brandName, productLineName, position }: TdsCoverProps) {
  const pack = packFigure(rec);
  const pdfMB = getPdfSizeMB(rec);
  const docNo = getTdsDocNumber(rec);
  const tdsReady = hasTdsDownload(rec);
  const categoryLabel = TDS_CATEGORY_LABELS[rec.category];

  const docRequestUrl = `https://wa.me/${TDS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Lapiz Blue, please send the technical data sheet for ${rec.name} (${brandName}).`,
  )}`;
  const askUrl = `https://wa.me/${TDS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Lapiz Blue, I would like to enquire about ${rec.name} (${brandName}).`,
  )}`;

  // The bold line under the name. The sheet's own product type where there is
  // one, otherwise what the classification means in words.
  const subtitle =
    rec.specs.product_type ||
    (rec.classification
      ? `${categoryLabel} to ${rec.classification}.`
      : `${brandName} ${categoryLabel.toLowerCase()}.`);

  // The opening sentences of the copy, not the whole thing. The rest is under
  // the heading further down the page.
  const lead = rec.description.split(/(?<=\.)\s+/).slice(0, 2).join(' ');

  const packCaption = pack
    ? `${brandName}'s own picture. The pack we stock: ${pack.value} ${pack.unit}.`
    : `${brandName}'s own picture of ${rec.name}.`;

  const quoteItem = {
    brand: rec.brand,
    brandName,
    productLine: rec.product_line,
    slug: rec.slug,
    name: rec.name,
    pack: rec.specs.pack_size ?? '',
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pb-20 print:pb-4 print:pt-0">
        {/* On paper the two columns come back at a much smaller image, because
            a full width pack shot is most of the first side of A4 and the
            figures are what somebody printed this for. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-start lg:gap-16 print:grid-cols-[150px_1fr] print:gap-6">
          {/* Left: the pack, held while the data scrolls beside it. */}
          <div className="lg:sticky lg:top-40 print:static">
            {rec.image.path ? (
              <figure>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[#161925]/15 bg-white">
                  <Image
                    src={rec.image.path}
                    alt={`${rec.name} ${categoryLabel.toLowerCase()} pack`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-contain p-6 sm:p-10"
                    priority
                  />
                </div>
                <figcaption className="spec-sh mt-3 text-[#161925]/70">{packCaption}</figcaption>
              </figure>
            ) : null}
          </div>

          {/* Right: the data. */}
          <div>
            <p className="label-sh flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[#161925]/70">
              <span>
                {brandName} <span aria-hidden="true">·</span> {categoryLabel}
              </span>
              <span className="spec-sh tracking-normal normal-case">
                No. {String(position.index).padStart(2, '0')} / {position.total}
              </span>
            </p>

            <h1 className="mt-4 font-outfit font-extrabold uppercase leading-[1.08] tracking-tight text-[clamp(1.7rem,5vw,2.75rem)] text-[var(--brand-ink)] break-words">
              {rec.name}
              <span className="sr-only"> Technical Data Sheet (TDS)</span>
            </h1>

            <div className="mt-6 h-px max-w-md bg-[#161925]/15" />

            <p className="mt-6 max-w-2xl font-manrope text-xl font-bold leading-snug text-[var(--brand-ink)]">
              {subtitle}
            </p>

            <p className="mt-5 max-w-2xl font-manrope text-base leading-relaxed text-[#161925]">
              {lead}
            </p>

            {rec.applications.length > 0 ? (
              <ul className="mt-7 space-y-2.5">
                {rec.applications.map((use) => (
                  <li key={use} className="flex gap-3 font-manrope text-base font-semibold leading-snug">
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-ink)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {/* The quote list is a screen thing. On paper it is a button that
                  cannot be pressed, so it comes off the printed sheet. */}
              <span className="print:hidden">
                <AddToQuote item={quoteItem} />
              </span>

              {tdsReady ? (
                <a
                  href={rec.tds.local_path}
                  download={`${rec.name} TDS.pdf`}
                  className="inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full bg-[var(--brand-ink)] px-5 font-manrope text-sm font-semibold uppercase tracking-[0.025em] text-white transition-opacity hover:opacity-90"
                >
                  Data sheet
                  {pdfMB ? <span className="font-normal normal-case">{pdfMB} MB</span> : null}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m7 10 5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <a
                  href={docRequestUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full bg-[var(--brand-ink)] px-5 font-manrope text-sm font-semibold uppercase tracking-[0.025em] text-white transition-opacity hover:opacity-90"
                >
                  Request the data sheet
                </a>
              )}
            </div>

            {/* Off the printed sheet with the quote button it belongs to: on
                paper it points at a button that is not there and a link whose
                address does not print. */}
            <p className="mt-3 font-manrope text-sm leading-relaxed text-[#161925]/70 print:hidden">
              Build a list across products and send it once, or{' '}
              <a
                href={askUrl}
                target="_blank"
                rel="noopener"
                className="underline underline-offset-4 hover:text-[var(--brand-ink)]"
              >
                ask about {rec.name} on WhatsApp now
              </a>
              .
            </p>

            <KeySpecsBar rec={rec} />

            {docNo ? (
              <p className="spec-sh mt-6 text-[#161925]/70">
                {brandName} document {docNo}
                {rec.tds.revision_date ? ` · revision ${rec.tds.revision_date}` : ''}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
