import Link from 'next/link';
import type { ManifestRecord } from '@/lib/tds';

interface EquivalentsSectionProps {
  rec: ManifestRecord;
}

// STRICT MODE per the handover: this section renders only when every listed
// equivalent carries the exact same classification code as this product.
// The check runs again at render time so bad data can never slip through.
export function EquivalentsSection({ rec }: EquivalentsSectionProps) {
  if (rec.equivalents.length === 0) return null;
  const exact = rec.equivalents.filter(
    (e) => e.classification !== '' && e.classification === rec.classification
  );
  if (exact.length !== rec.equivalents.length || exact.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-2 text-center">
          Equivalent Products
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Products with the exact same {rec.classification} classification.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {exact.map((e) => (
            <Link
              key={`${e.brand}-${e.slug}`}
              href={`/brands/${e.brand}/${rec.product_line}/${e.slug}`}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="font-semibold text-[#161925]">{e.name}</p>
              <p className="text-sm text-gray-500 mt-1 capitalize">{e.brand}</p>
              <p className="text-xs font-medium text-[#406E8E] mt-1">{e.classification}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
