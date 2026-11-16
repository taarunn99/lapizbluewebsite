import Image from 'next/image';
import Link from 'next/link';
import type { ManifestRecord } from '@/lib/tds';
import { tdsHref } from '@/lib/tds';

interface RelatedProductsProps {
  products: ManifestRecord[];
  primaryColor: string;
}

export function RelatedProducts({ products, primaryColor }: RelatedProductsProps) {
  if (products.length === 0) return null;
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-8 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={tdsHref(p)}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4"
            >
              {p.image.path ? (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={p.image.path}
                    alt={`${p.name} pack`}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="font-semibold text-[#161925] truncate">{p.name}</p>
                {p.classification ? (
                  <p className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>
                    {p.classification}
                  </p>
                ) : null}
                <p className="text-sm text-gray-500 mt-1">View TDS and specifications</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
