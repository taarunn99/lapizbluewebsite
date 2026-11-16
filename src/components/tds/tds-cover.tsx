import Image from 'next/image';
import type { ManifestRecord } from '@/lib/tds';
import {
  TDS_CATEGORY_LABELS,
  coverageRange,
  packFigure,
  usabilityChips,
  getPdfSizeMB,
  getTdsDocNumber,
} from '@/lib/tds';

interface TdsCoverProps {
  rec: ManifestRecord;
  brandName: string;
  productLineName: string;
}

// Editorial cover: the product presented as a dataset. Swiss grid, golden
// ratio column split, figures instead of sentences, one primary CTA.
export function TdsCover({ rec, brandName, productLineName }: TdsCoverProps) {
  const coverage = coverageRange(rec);
  const pack = packFigure(rec);
  const chips = usabilityChips(rec);
  const pdfMB = getPdfSizeMB(rec);
  const docNo = getTdsDocNumber(rec);
  const joint = rec.specs.joint_width?.match(/(\d+(?:\.\d+)?)\s*(?:to|-)?\s*(\d+(?:\.\d+)?)?\s*mm/);

  const stats: { value: string; unit: string; label: string }[] = [];
  if (coverage) stats.push({ value: coverage, unit: 'kg/m²', label: 'Coverage' });
  if (joint) {
    stats.push({
      value: joint[2] ? `${joint[1]}-${joint[2]}` : `≥ ${joint[1]}`,
      unit: 'mm',
      label: 'Joint width',
    });
  }
  if (pack) stats.push({ value: pack.value, unit: pack.unit, label: 'Pack' });
  if (rec.tds.revision_date) stats.push({ value: rec.tds.revision_date, unit: '', label: 'TDS revision' });

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
              <h1 className="font-bold text-[#161925] leading-[0.95] tracking-tight text-[clamp(3rem,9vw,6.5rem)] uppercase">
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

            {/* Stat band */}
            {stats.length > 0 ? (
              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-y border-[#161925]/15 divide-x divide-[#161925]/10">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="py-5 pr-4 pl-4 first:pl-0">
                    <dd className="text-3xl md:text-4xl font-bold text-[#161925] tabular-nums tracking-tight">
                      {s.value}
                      {s.unit ? (
                        <span className="text-base md:text-lg font-semibold text-gray-400 ml-1">
                          {s.unit}
                        </span>
                      ) : null}
                    </dd>
                    <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}

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

            {/* Single primary CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
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
              <p className="text-xs text-gray-500 leading-relaxed max-w-[22ch]">
                {rec.tds.revision_date ? `Revision ${rec.tds.revision_date}, ` : ''}sourced from the
                manufacturer.
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
