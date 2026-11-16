import Link from 'next/link';
import type { ManifestRecord } from '@/lib/tds';
import { getShippable, tdsHref } from '@/lib/tds';

interface TdsLineIndexProps {
  brandSlug: string;
  productLineSlug: string;
  primaryColor: string;
  extraRecords?: ManifestRecord[];
}

// Dense, crawlable text index of every product with a hosted, verified TDS.
// This is the SEO backbone: the range drawer above is client rendered, so
// these plain anchors are what search engines follow. Kept low on the page.
export function TdsLineIndex({
  brandSlug,
  productLineSlug,
  primaryColor,
  extraRecords = [],
}: TdsLineIndexProps) {
  const records = [...getShippable(brandSlug, productLineSlug), ...extraRecords];
  const seen = new Set<string>();
  const unique = records.filter((r) => {
    const key = tdsHref(r);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (unique.length === 0) return null;

  return (
    <section className="py-10 md:py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-[#161925] uppercase tracking-tight mb-5">
          All technical data sheets
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
          {unique.map((rec) => (
            <li key={tdsHref(rec)} className="border-b border-gray-100">
              <Link
                href={tdsHref(rec)}
                className="flex items-baseline justify-between gap-3 py-2 text-sm group"
              >
                <span className="font-medium text-gray-700 group-hover:text-[#406E8E] transition-colors truncate">
                  {rec.name}
                </span>
                <span
                  className="flex-shrink-0 text-xs font-semibold tabular-nums"
                  style={{ color: primaryColor }}
                >
                  {rec.classification || 'TDS'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
