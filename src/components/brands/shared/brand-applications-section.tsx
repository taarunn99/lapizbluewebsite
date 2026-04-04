import type { BrandApplication } from "@/data/brand-content/types";

interface BrandApplicationsSectionProps {
  applications: BrandApplication[];
  brandName: string;
  themeColor: string;
}

export function BrandApplicationsSection({ applications, brandName, themeColor }: BrandApplicationsSectionProps) {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-3 text-center">
          Where {brandName} Products Are Used
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          From residential projects to large-scale commercial developments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.sector}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ backgroundColor: `${themeColor}15` }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: themeColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[#23395B] mb-2">
                {app.sector}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
