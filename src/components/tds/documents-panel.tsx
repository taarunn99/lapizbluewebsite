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
    detail: string;
    href: string;
    download?: string;
    cta: string;
    primary?: boolean;
  }[] = [
    tdsReady
      ? {
          title: 'Technical data sheet',
          detail: [rec.tds.revision_date ? `Revision ${rec.tds.revision_date}` : '', tdsMB ? `${tdsMB} MB PDF` : 'PDF']
            .filter(Boolean)
            .join(', '),
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
          detail: [rec.sds?.revision_date ? `Revision ${rec.sds.revision_date}` : '', sdsMB ? `${sdsMB} MB PDF` : 'PDF']
            .filter(Boolean)
            .join(', '),
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
    <ul className="border-t border-[#161925]/12">
      {rows.map((row) => (
        <li
          key={row.title}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-4 border-b border-[#161925]/12 py-6"
        >
          <div>
            <h3 className="font-outfit font-bold text-lg text-[#161925]">{row.title}</h3>
            <p className="mt-1.5 font-manrope text-sm leading-relaxed text-[#161925]/65 max-w-[62ch]">
              {row.detail}
            </p>
          </div>
          <a
            href={row.href}
            {...(row.download
              ? { download: row.download }
              : { target: '_blank', rel: 'noopener' })}
            className={`inline-flex shrink-0 items-center justify-center px-6 py-3 font-manrope font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E] ${
              row.primary
                ? 'bg-[#23395B] text-white hover:bg-[#1a2a45]'
                : 'border border-[#161925]/20 text-[#161925] hover:border-[#406E8E] hover:text-[#406E8E]'
            }`}
          >
            {row.cta}
          </a>
        </li>
      ))}
    </ul>
  );
}
