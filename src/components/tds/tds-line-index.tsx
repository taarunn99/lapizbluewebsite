import Link from 'next/link';
import { getShippable, tdsHref } from '@/lib/tds';

interface TdsLineIndexProps {
  brandSlug: string;
  productLineSlug: string;
  primaryColor: string;
}

// Additive section on the product line page linking every product in the
// line that has a hosted, verified TDS. This is the crawlable internal
// linking backbone for products that have no featured card.
export function TdsLineIndex({ brandSlug, productLineSlug, primaryColor }: TdsLineIndexProps) {
  const records = getShippable(brandSlug, productLineSlug);
  if (records.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: primaryColor }}>
            Technical Data Sheets
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download the manufacturer TDS PDF and view full specifications for each product.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((rec) => (
            <li key={rec.slug}>
              <Link
                href={tdsHref(rec)}
                className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-[#161925] truncate">{rec.name}</span>
                  {rec.classification ? (
                    <span className="block text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                      {rec.classification}
                    </span>
                  ) : null}
                </span>
                <span
                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  TDS
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
