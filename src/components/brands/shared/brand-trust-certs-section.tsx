interface BrandTrustCertsSectionProps {
  brandName: string;
  themeColor: string;
  certifications?: string[];
  trustSignals?: Array<{ title: string; description: string }>;
  branches?: Array<{ city: string; address: string }>;
  customSections?: Array<{ id: string; title: string; content: string }>;
}

export function BrandTrustCertsSection({
  brandName,
  themeColor,
  certifications,
  trustSignals,
  branches,
  customSections,
}: BrandTrustCertsSectionProps) {
  const hasContent = certifications?.length || trustSignals?.length || branches?.length || customSections?.length;
  if (!hasContent) return null;

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] mb-10 text-center">
          Why Choose Lapiz Blue for {brandName}
        </h2>

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <div className="mb-10 space-y-8">
            {customSections.map((section) => (
              <div key={section.id} className="max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-[#23395B] mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Trust Signals */}
        {trustSignals && trustSignals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {trustSignals.map((signal) => (
              <div
                key={signal.title}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${themeColor}15` }}
                >
                  <svg
                    className="w-4 h-4"
                    style={{ color: themeColor }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#23395B] text-sm mb-1">
                    {signal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-[#23395B] mb-4 text-center">
              Certifications & Standards
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
                  style={{
                    borderColor: `${themeColor}30`,
                    color: themeColor,
                    backgroundColor: `${themeColor}08`,
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {branches && branches.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-[#23395B] mb-4 text-center">
              Our Locations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {branches.map((branch) => (
                <div
                  key={branch.city}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <p className="font-semibold text-[#23395B] mb-1">
                    {branch.city}
                  </p>
                  <p className="text-gray-600 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
