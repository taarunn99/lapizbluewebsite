import Image from 'next/image';
import type { ManifestRecord } from '@/lib/tds';
import {
  TDS_CATEGORY_LABELS,
  packFigure,
  usabilityChips,
  getPdfSizeMB,
  getSdsSizeMB,
  getTdsDocNumber,
  hasTdsDownload,
  hasSdsDownload,
} from '@/lib/tds';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';

interface TdsCoverProps {
  rec: ManifestRecord;
  brandName: string;
  productLineName: string;
}

// Editorial cover: the product presented as a dataset. Swiss grid, golden
// ratio column split, figures instead of sentences, one primary CTA.
// The heading floor has to come down for a long product name. At a 320px
// screen the content box is 288px, and an eleven character uppercase word at
// the 3rem floor measures about 363px, so "MORCEMCOLOR" and "MICROSILICATO"
// ran off the edge. Only names that would overflow get a smaller floor, so no
// page that already fitted changes, and 9vw still governs every width above
// about 533px, which leaves the desktop heading untouched. break-words on the
// element is the backstop for a name longer than anything stocked today.
function headingSize(name: string): string {
  const longest = name.split(/\s+/).reduce((a, b) => (b.length > a.length ? b : a), '');
  if (longest.length >= 12) return 'text-[clamp(2.125rem,9vw,6.5rem)]';
  if (longest.length >= 11) return 'text-[clamp(2.5rem,9vw,6.5rem)]';
  return 'text-[clamp(3rem,9vw,6.5rem)]';
}

export function TdsCover({ rec, brandName, productLineName }: TdsCoverProps) {
  const pack = packFigure(rec);
  const chips = usabilityChips(rec);
  const pdfMB = getPdfSizeMB(rec);
  const sdsMB = getSdsSizeMB(rec);
  const tdsReady = hasTdsDownload(rec);
  const sdsReady = hasSdsDownload(rec);
  const docNo = getTdsDocNumber(rec);
  const docRequestUrl =
    `https://api.whatsapp.com/send?phone=${TDS_WHATSAPP_NUMBER}&text=` +
    encodeURIComponent(
      `Hi Lapiz Blue, please send me the technical data sheet and safety data sheet for ${rec.name}.`,
    );


  return (
    <header className="bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kicker bar */}
        <div className="flex items-baseline justify-between border-b border-[#161925]/15 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          <span>
            {brandName}
            <span className="text-[#FFCC00] mx-2">/</span>
            {productLineName}
          </span>
          <span className="hidden sm:block tabular-nums">
            {docNo ? `TDS N° ${docNo}` : 'Technical Data Sheet'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-10 lg:gap-16 py-10 lg:py-16">
          {/* Left: the dataset */}
          <div className="flex flex-col justify-between order-2 lg:order-1">
            <div>
              <h1 className={`font-bold text-[#161925] leading-[0.95] tracking-tight uppercase break-words ${headingSize(rec.name)}`}>
                {rec.name}
                <span className="sr-only"> Technical Data Sheet (TDS)</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 font-medium">
                {TDS_CATEGORY_LABELS[rec.category]}
                {rec.classification ? (
                  <>
                    <span className="mx-2 text-gray-300">·</span>
                    Class <span className="text-[#23395B] font-bold">{rec.classification}</span>
                  </>
                ) : null}
              </p>
            </div>


            {/* Usability, only what the TDS states */}
            {chips.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="text-xs font-semibold uppercase tracking-wide text-[#23395B] border border-[#23395B]/25 rounded-full px-3.5 py-1.5"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Documents. One primary action. Where we host the
                manufacturer's sheet it is a direct download. Where the
                manufacturer gates it, the page asks for it rather than
                pretending to a file we do not have. */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              {tdsReady ? (
                <a
                  href={rec.tds.local_path}
                  download={`${rec.name} TDS.pdf`}
                  className="inline-flex items-center justify-center gap-3 bg-[#23395B] text-white font-semibold text-lg px-10 py-5 rounded-none hover:bg-[#1a2a45] transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download TDS (PDF)
                  {pdfMB ? <span className="text-white/60 font-normal text-base">{pdfMB} MB</span> : null}
                </a>
              ) : (
                <a
                  href={docRequestUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-3 bg-[#23395B] text-white font-semibold text-lg px-10 py-5 rounded-none hover:bg-[#1a2a45] transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Request the data sheet
                </a>
              )}

              {sdsReady ? (
                <a
                  href={rec.sds!.local_path}
                  download={`${rec.name} SDS.pdf`}
                  className="inline-flex items-center justify-center gap-2 border border-[#23395B] text-[#23395B] font-semibold px-7 py-5 rounded-none hover:bg-[#23395B] hover:text-white transition-colors duration-200"
                >
                  Safety data sheet
                  {sdsMB ? <span className="font-normal text-sm opacity-70">{sdsMB} MB</span> : null}
                </a>
              ) : null}

              <p className="text-xs text-gray-500 leading-relaxed max-w-[24ch]">
                {tdsReady
                  ? `${rec.tds.revision_date ? `Revision ${rec.tds.revision_date}, ` : ''}sourced from the manufacturer.`
                  : 'We hold the current sheet for this product and will send it straight back.'}
              </p>
            </div>
          </div>

          {/* Right: pack shot as an editorial figure */}
          {rec.image.path ? (
            <figure className="order-1 lg:order-2">
              <div className="bg-[#F1F2F4] flex items-center justify-center p-8 lg:p-10 h-64 sm:h-80 lg:h-full lg:min-h-[420px]">
                <div className="relative w-full h-full max-h-[420px]">
                  <Image
                    src={rec.image.path}
                    alt={`${rec.name} ${TDS_CATEGORY_LABELS[rec.category].toLowerCase()} pack`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 480px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <figcaption className="border-t border-[#161925]/15 pt-2 mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500 flex justify-between">
                <span>Fig. 01</span>
                <span>
                  {rec.name}
                  {packFigure(rec) ? `, ${packFigure(rec)!.value} ${packFigure(rec)!.unit}` : ''}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </header>
  );
}
