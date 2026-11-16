import type { ManifestRecord } from '@/lib/tds';

interface DownloadTdsCtaProps {
  rec: ManifestRecord;
  primaryColor: string;
}

export function DownloadTdsCta({ rec, primaryColor }: DownloadTdsCtaProps) {
  return (
    <div className="w-full sm:w-auto">
      <a
        href={rec.tds.local_path}
        download={`${rec.name} TDS.pdf`}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
        style={{ backgroundColor: primaryColor }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download TDS (PDF)
      </a>
      <p className="mt-2 text-xs text-gray-500">
        {rec.tds.revision_date
          ? `TDS revision ${rec.tds.revision_date}, sourced from the manufacturer.`
          : 'Sourced from the manufacturer.'}
      </p>
    </div>
  );
}
