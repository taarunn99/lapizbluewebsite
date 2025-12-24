import type { Metadata } from "next";
import { ConstructionToolsSection } from '@/components/ui/construction-tools-section';
import { ScrollPositionRestorer } from '@/components/ui/scroll-position-restorer';

export const metadata: Metadata = {
  title: "Construction Tools | Montolit, DeWalt, Hilti & More | Lapiz Blue",
  description: "Professional construction tools from Montolit, DeWalt, Hilti, Peygran, Keiser & Bihui. Authorized distributor serving UAE contractors in Dubai, Abu Dhabi & Sharjah.",
  keywords: ["construction tools UAE", "Montolit tile cutters", "DeWalt tools Dubai", "Hilti power tools", "tile cutting tools", "professional tools UAE"],
  alternates: {
    canonical: "https://www.lapizblue.com/tools",
  },
  openGraph: {
    title: "Construction Tools | Lapiz Blue UAE",
    description: "Professional construction tools from Montolit, DeWalt, Hilti, Peygran, Keiser & Bihui. Authorized distributor serving UAE contractors.",
    url: "https://www.lapizblue.com/tools",
    siteName: "Lapiz Blue",
    images: ["/images/construction-tools/montolit.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Tools | Lapiz Blue UAE",
    description: "Professional construction tools from Montolit, DeWalt, Hilti, Peygran, Keiser & Bihui. Authorized distributor serving UAE contractors.",
    images: ["/images/construction-tools/montolit.png"],
  },
};

export default function ToolsPage() {
  return (
    <main className="w-full">
      <ScrollPositionRestorer />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-[#161925] to-[#2a3142] flex items-center justify-center px-6 sm:px-8 lg:px-16 py-20">
        <div className="w-full max-w-[1400px] mx-auto text-center">
          <p className="font-outfit text-sm tracking-[0.3em] text-white/60 mb-4 uppercase">
            Professional Grade Equipment
          </p>
          <h1 className="font-outfit font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Construction Tools <br />
            <span className="text-[#406E8E]">& Equipment</span>
          </h1>
          <p className="font-outfit text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            From precision tile cutters to heavy-duty power tools - we supply industry-leading brands trusted by professionals across the UAE.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <ConstructionToolsSection />

      {/* CTA Section */}
      <section className="w-full bg-[#161925] py-20 px-6 sm:px-8 lg:px-16">
        <div className="w-full max-w-[1400px] mx-auto text-center">
          <h2 className="font-outfit font-bold text-white text-3xl sm:text-4xl md:text-5xl mb-6">
            Need Help Choosing the Right Tools?
          </h2>
          <p className="font-outfit text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Our technical team can recommend the best equipment for your specific project requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=971502814338&text=Hello!%20I%27m%20interested%20in%20your%20construction%20tools."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-outfit font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Back to Brands Button */}
      <section className="w-full bg-white py-12 px-6 sm:px-8 lg:px-16">
        <div className="w-full max-w-[1400px] mx-auto text-center">
          <a
            href="/brands"
            className="inline-flex items-center gap-2 text-[#161925] hover:text-[#406E8E] font-outfit font-medium text-lg transition-colors duration-300 group"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Brands & Materials
          </a>
        </div>
      </section>
    </main>
  );
}
