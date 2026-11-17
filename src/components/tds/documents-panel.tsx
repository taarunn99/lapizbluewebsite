import type { ManifestRecord } from '@/lib/tds';
import { getPdfSizeMB, getSdsSizeMB, hasTdsDownload, hasSdsDownload } from '@/lib/tds';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';

const ask = (product: string, what: string) =>
  `https://api.whatsapp.com/send?phone=${TDS_WHATSAPP_NUMBER}&text=` +
  encodeURIComponent(`Hi Lapiz Blue, please send me the ${what} for ${product}.`);

/**
 * Every document for this product in one place: the technical sheet, the
 * safety sheet, and a request route for anything we do not host.
 *
 * A row is either a real download with a real file size, or an explicit
 * request. There is never a button that looks like a download and is not one.
 */
export function DocumentsPanel({ rec }: { rec: ManifestRecord }) {
  const tdsReady = hasTdsDownload(rec);
  const sdsReady = hasSdsDownload(rec);
  const tdsMB = getPdfSizeMB(rec);
  const sdsMB = getSdsSizeMB(rec);

  const rows: {
    title: string;
    /** Figures, set in mono: revision, size, file type. */
    meta?: string;
    detail: string;
    href: string;
    download?: string;
    cta: string;
    primary?: boolean;
  }[] = [
    tdsReady
      ? {
          title: 'Technical data sheet',
          meta: [rec.tds.revision_date ? `Revision ${rec.tds.revision_date}` : '', tdsMB ? `${tdsMB} MB` : '', 'PDF']
            .filter(Boolean)
            .join(' \u00b7 '),
          detail: `${rec.name} as the manufacturer publishes it, unaltered.`,
          href: rec.tds.local_path,
          download: `${rec.name} TDS.pdf`,
          cta: 'Download',
          primary: true,
        }
      : {
          title: 'Technical data sheet',
          detail: 'Issued by the manufacturer to its dealers. We hold the current revision and will send it straight back.',
          href: ask(rec.name, 'technical data sheet'),
          cta: 'Request',
          primary: true,
        },
    sdsReady
      ? {
          title: 'Safety data sheet',
          meta: [rec.sds?.revision_date ? `Revision ${rec.sds.revision_date}` : '', sdsMB ? `${sdsMB} MB` : '', 'PDF']
            .filter(Boolean)
            .join(' \u00b7 '),
          detail: 'For the method statement and the site file.',
          href: rec.sds!.local_path,
          download: `${rec.name} SDS.pdf`,
          cta: 'Download',
        }
      : {
          title: 'Safety data sheet',
          detail: 'Needed for a method statement or a site file. Ask and we will send it.',
          href: ask(rec.name, 'safety data sheet'),
          cta: 'Request',
        },
    {
      title: 'Submittal pack',
      detail:
        'Data sheet, safety data sheet and our authorisation letter together, for a consultant submittal.',
      href: ask(rec.name, 'full submittal pack including the authorisation letter'),
      cta: 'Request',
    },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <li
          key={row.title}
          className="flex flex-col rounded-xl border border-[#161925]/15 bg-white p-6"
        >
          <svg
            className="h-8 w-7 shrink-0 text-[var(--brand-ink)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h3 className="mt-4 font-manrope text-base font-bold text-[#161925]">{row.title}</h3>

          {/* The hard facts in mono, the explanation in prose. A card that says
              "0.7 MB PDF" is answering a different question from one that says
              why the sheet is not here. */}
          {row.meta ? <p className="spec-sh mt-2 text-[#161925]/70">{row.meta}</p> : null}
          <p className="mt-2 grow font-manrope text-sm leading-relaxed text-[#161925]/70">
            {row.detail}
          </p>

          <a
            href={row.href}
            {...(row.download
              ? { download: row.download }
              : { target: '_blank', rel: 'noopener' })}
            className={`mt-5 inline-flex min-h-[2.75rem] w-fit items-center justify-center gap-2 rounded-full px-5 font-manrope text-sm font-semibold uppercase tracking-[0.025em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)] ${
              row.primary
                ? 'bg-[var(--brand-ink)] text-white hover:opacity-90'
                : 'border border-[#161925]/25 text-[#161925] hover:border-[#161925] hover:bg-[#161925] hover:text-white'
            }`}
          >
            {row.cta}
          </a>
        </li>
      ))}
    </ul>
  );
}
