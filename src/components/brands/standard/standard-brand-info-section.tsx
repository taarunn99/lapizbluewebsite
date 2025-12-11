import { ExtendedContent } from "@/data/brandConfigs";

interface StandardBrandInfoSectionProps {
  brandName: string;
  extendedContent: ExtendedContent;
  themeColor: string;
}

export function StandardBrandInfoSection({
  brandName,
  extendedContent,
  themeColor,
}: StandardBrandInfoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Brand Story Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-start gap-6 md:gap-8">
            {/* Icon */}
            <div
              className="flex-shrink-0 hidden sm:flex w-16 h-16 md:w-20 md:h-20 rounded-2xl items-center justify-center"
              style={{ backgroundColor: `${themeColor}15` }}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10"
                style={{ color: themeColor }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-[2px]"
                  style={{ backgroundColor: themeColor }}
                />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  About {brandName}
                </span>
              </div>

              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                {extendedContent.brandStory}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px bg-gray-200 mb-16 md:mb-20">
          <div
            className="absolute left-0 top-0 h-full w-1/4"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Why Lapiz Blue Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Title and Checkmarks */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-8 h-[2px]"
                style={{ backgroundColor: themeColor }}
              />
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: themeColor }}
              >
                Partnership
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Lapiz Blue for {brandName}?
            </h2>

            {/* Checkmarks */}
            <div className="space-y-4">
              {[
                "Authorized Distributor",
                "Expert Technical Support",
                "UAE-Wide Coverage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
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
                  <span className="text-gray-600 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content Card */}
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
              style={{ backgroundColor: themeColor }}
            />
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg">
              {/* Decorative element */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-full"
                style={{ backgroundColor: themeColor }}
              />

              <div className="relative">
                {/* Shield Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: themeColor }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {extendedContent.whyLapizBlue}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-8 h-1 rounded-full w-2/5"
                  style={{ backgroundColor: themeColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
