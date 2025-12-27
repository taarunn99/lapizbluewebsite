import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapeiGroutCalculator } from "@/components/brands/mapei-grout-calculator";

export const metadata: Metadata = {
  title: "Mapei Grout Calculator | Calculate Grout Quantity | Lapiz Blue UAE",
  description: "Free Mapei grout calculator for tile installations. Calculate exact grout quantity needed for Ultracolor Plus, Keracolor, Kerapoxy. Trusted by UAE contractors in Dubai, Abu Dhabi, Sharjah.",
  keywords: "mapei grout calculator, grout calculator UAE, tile grout calculator, epoxy grout calculator, cementitious grout calculator, grout quantity calculator, grout coverage calculator, mapei ultracolor plus calculator, kerapoxy calculator",
  alternates: {
    canonical: "https://www.lapizblue.com/mapei-grout-calculator",
  },
  openGraph: {
    title: "Mapei Grout Calculator | Free Online Tool | Lapiz Blue",
    description: "Calculate exact grout quantity for your tile project. Supports Ultracolor Plus, Keracolor, Kerapoxy and more Mapei products.",
    url: "https://www.lapizblue.com/mapei-grout-calculator",
    siteName: "Lapiz Blue",
    images: ["/images/brands/mapei/hero.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapei Grout Calculator | Free Online Tool",
    description: "Calculate exact grout quantity for your tile project. Supports Ultracolor Plus, Keracolor, Kerapoxy and more.",
    images: ["/images/brands/mapei/hero.webp"],
  },
};

// JSON-LD Structured Data
const jsonLdSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mapei Grout Calculator",
    "description": "Free online calculator to determine the exact quantity of Mapei grout needed for tile installations",
    "url": "https://www.lapizblue.com/mapei-grout-calculator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AED"
    },
    "provider": {
      "@type": "Organization",
      "name": "Lapiz Blue",
      "url": "https://www.lapizblue.com"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lapizblue.com" },
      { "@type": "ListItem", "position": 2, "name": "Brands", "item": "https://www.lapizblue.com/brands" },
      { "@type": "ListItem", "position": 3, "name": "Mapei", "item": "https://www.lapizblue.com/brands/mapei" },
      { "@type": "ListItem", "position": 4, "name": "Grout Calculator", "item": "https://www.lapizblue.com/mapei-grout-calculator" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate grout quantity for tile installation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter your tile dimensions (length, width, thickness), joint width, and total area in square meters. The calculator uses the formula ((A+B)/(A×B)) × C × D × density factor to determine kg/m² consumption, then multiplies by your total area and adds wastage to give bags needed."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between cementitious and epoxy grout?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cementitious grouts like Ultracolor Plus and Keracolor FF are cement-based, easier to work with, and suitable for most residential installations. Epoxy grouts like Kerapoxy and Kerapoxy CQ offer superior chemical resistance, stain resistance, and durability - ideal for commercial kitchens, hospitals, and wet areas."
        }
      },
      {
        "@type": "Question",
        "name": "How much wastage should I add for grout?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend adding 10-15% wastage for standard installations. For complex patterns, uneven substrates, or first-time installers, consider 15-20% wastage. The calculator allows you to adjust wastage from 0-30%."
        }
      },
      {
        "@type": "Question",
        "name": "Which Mapei grout should I use for swimming pools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For swimming pools, we recommend Kerapoxy Easy Design (epoxy) for its excellent water resistance, chemical resistance to pool chemicals, and long-term durability. For budget-conscious projects, Ultracolor Plus with its BioBlock technology also provides good mold and mildew resistance."
        }
      }
    ]
  }
];

export default function MapeiGroutCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#406E8E] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/brands"
              className="text-gray-500 hover:text-[#406E8E] transition-colors"
            >
              Brands
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/brands/mapei"
              className="text-gray-500 hover:text-[#406E8E] transition-colors"
            >
              Mapei
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-[#23395B]">Grout Calculator</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#23395B] to-[#1a2a45] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Mapei Logo */}
            <div className="flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <Image
                  src="/images/brands/logos/mapei-new.webp"
                  alt="Mapei Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Mapei Grout Calculator
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Calculate the exact quantity of Mapei grout needed for your tile installation.
                Supports Ultracolor Plus, Keracolor, Kerapoxy, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 md:py-12">
        <MapeiGroutCalculator />
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#23395B] text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-[#23395B] mb-2">
                How do I calculate grout quantity for tile installation?
              </h3>
              <p className="text-gray-600">
                Enter your tile dimensions (length, width, thickness), joint width, and total area in square meters.
                The calculator uses the formula ((A+B)/(A&times;B)) &times; C &times; D &times; density factor to determine
                kg/m&sup2; consumption, then multiplies by your total area and adds wastage to give bags needed.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-[#23395B] mb-2">
                What is the difference between cementitious and epoxy grout?
              </h3>
              <p className="text-gray-600">
                Cementitious grouts like Ultracolor Plus and Keracolor FF are cement-based, easier to work with,
                and suitable for most residential installations. Epoxy grouts like Kerapoxy and Kerapoxy CQ offer
                superior chemical resistance, stain resistance, and durability - ideal for commercial kitchens,
                hospitals, and wet areas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-[#23395B] mb-2">
                How much wastage should I add for grout?
              </h3>
              <p className="text-gray-600">
                We recommend adding 10-15% wastage for standard installations. For complex patterns, uneven
                substrates, or first-time installers, consider 15-20% wastage. The calculator allows you to
                adjust wastage from 0-30%.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-[#23395B] mb-2">
                Which Mapei grout should I use for swimming pools?
              </h3>
              <p className="text-gray-600">
                For swimming pools, we recommend Kerapoxy Easy Design (epoxy) for its excellent water resistance,
                chemical resistance to pool chemicals, and long-term durability. For budget-conscious projects,
                Ultracolor Plus with its BioBlock technology also provides good mold and mildew resistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#23395B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing the Right Grout?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our technical team can help you select the best Mapei grout for your project.
            Contact us for expert advice and competitive pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/971488855257?text=Hi%2C%20I%20need%20help%20selecting%20Mapei%20grout%20for%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#25D366] rounded-lg transition-all duration-200 hover:bg-[#128C7E] hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#23395B] bg-white rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/brands/mapei"
            className="inline-flex items-center text-gray-600 hover:text-[#406E8E] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mapei Products
          </Link>
        </div>
      </section>
    </main>
  );
}
