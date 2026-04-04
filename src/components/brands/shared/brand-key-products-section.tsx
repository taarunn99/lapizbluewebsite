import type { BrandKeyProduct } from "@/data/brand-content/types";

interface BrandKeyProductsSectionProps {
  products: BrandKeyProduct[];
  brandName: string;
  themeColor: string;
}

export function BrandKeyProductsSection({ products, brandName, themeColor }: BrandKeyProductsSectionProps) {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-3 text-center">
          Key {brandName} Products
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Explore the most popular {brandName} products available through Lapiz Blue.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ backgroundColor: themeColor }}
              />
              <h3 className="font-semibold text-[#23395B] mb-2 text-sm leading-snug">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
