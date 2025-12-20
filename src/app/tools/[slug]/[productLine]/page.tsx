import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolConfig, getToolProductLine, getAllTools } from "@/data/toolConfigs";
import { BrandProductNavResponsive } from "@/components/ui/brand-product-nav";
import { BackButton } from "@/components/ui/back-button";
import { Manrope } from "next/font/google";
import { ProductLineFAQSection } from "@/components/brands/product-line-faq-section";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Generate static params for all product lines
export async function generateStaticParams() {
  const tools = getAllTools();
  const params: Array<{ slug: string; productLine: string }> = [];

  tools.forEach((tool) => {
    tool.productLines.forEach((pl) => {
      params.push({
        slug: tool.slug,
        productLine: pl.slug,
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productLine: string }>;
}): Promise<Metadata> {
  const { slug, productLine: productLineSlug } = await params;
  const tool = getToolConfig(slug);
  const productLine = getToolProductLine(slug, productLineSlug);

  if (!tool || !productLine) {
    return {
      title: "Product Not Found - Lapiz Blue",
    };
  }

  // Use custom SEO title if available
  const title = productLine.content?.seoTitle || `${productLine.name} - ${tool.name} | Lapiz Blue`;

  return {
    title,
    description: productLine.metaDescription,
    openGraph: {
      title: productLine.content?.seoTitle || `${productLine.name} - ${tool.name}`,
      description: productLine.metaDescription,
      images: productLine.images.length > 0 ? [productLine.images[0]] : [],
      url: `/tools/${slug}/${productLineSlug}`,
    },
    alternates: {
      canonical: `/tools/${slug}/${productLineSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(tool: ReturnType<typeof getToolConfig>, productLine: ReturnType<typeof getToolProductLine>, slug: string, productLineSlug: string) {
  const baseUrl = 'https://lapizblue.ae';
  const schemas = [];

  // BreadcrumbList Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${baseUrl}/tools` },
      { '@type': 'ListItem', position: 3, name: tool?.name, item: `${baseUrl}/tools/${slug}` },
      { '@type': 'ListItem', position: 4, name: productLine?.name, item: `${baseUrl}/tools/${slug}/${productLineSlug}` },
    ],
  });

  // WebPage Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: productLine?.content?.seoTitle || `${productLine?.name} - ${tool?.name}`,
    description: productLine?.metaDescription,
    url: `${baseUrl}/tools/${slug}/${productLineSlug}`,
    isPartOf: { '@type': 'WebSite', name: 'Lapiz Blue', url: baseUrl },
  });

  // FAQPage Schema (if FAQs exist)
  if (productLine?.content?.faqs && productLine.content.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: productLine.content.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  // Organization Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lapiz Blue',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-4-888-55257',
      contactType: 'sales',
      areaServed: 'AE',
      availableLanguage: ['en', 'ar'],
    },
  });

  // LocalBusiness Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lapiz Blue',
    image: `${baseUrl}/images/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    telephone: '+971-4-888-55257',
    url: baseUrl,
    priceRange: '$$',
  });

  return schemas;
}

export default async function ToolProductLinePage({
  params,
}: {
  params: Promise<{ slug: string; productLine: string }>;
}) {
  const { slug, productLine: productLineSlug } = await params;
  const tool = getToolConfig(slug);
  const productLine = getToolProductLine(slug, productLineSlug);

  if (!tool || !productLine) {
    notFound();
  }

  const content = productLine.content;
  const hasRichContent = !!content;
  const jsonLdSchemas = generateJsonLd(tool, productLine, slug, productLineSlug);

  // Dynamic tool colors - use tool theme or fallback to Lapiz Blue defaults
  const primaryColor = tool.theme.primary || '#23395B';
  const secondaryColor = tool.theme.secondary || '#1E6BA8';
  const accentColor = tool.theme.accent || '#BFD7EA';

  return (
    <main className={`${manrope.className} bg-white text-[#23395B]`}>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/brands#construction-tools"
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                Construction Tools
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/tools/${tool.slug}`}
                className="text-gray-500 hover:text-[#406E8E] transition-colors"
              >
                {tool.name}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium" style={{ color: primaryColor }}>{productLine.name}</span>
            </div>
            <BackButton href={`/tools/${tool.slug}`} label="Back" />
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced for rich content */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className={`${hasRichContent ? 'max-w-4xl' : 'max-w-3xl'} mx-auto ${hasRichContent ? 'text-left md:text-center' : 'text-center'}`}>
            {/* Tool Logo */}
            <div className={`mb-6 flex ${hasRichContent ? 'justify-start md:justify-center' : 'justify-center'}`}>
              <div className="rounded-xl bg-white p-4 shadow-md border border-gray-100">
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Line Title - Use H1 from content if available */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#23395B] leading-tight mb-6">
              {content?.h1 || productLine.name}
            </h1>

            {/* Intro/Description - Use intro from content if available */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
              {content?.intro || productLine.description}
            </p>

            {/* Official Website Link */}
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: `${primaryColor}15`,
                  color: primaryColor,
                  borderWidth: '1px',
                  borderColor: `${primaryColor}30`,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit {tool.name} Official Website
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Product Line Navigation - Static, No Scroll Animation */}
      <div className="relative -mt-8 pb-12">
        <BrandProductNavResponsive
          brand={tool}
          currentProductLine={productLineSlug}
          basePath="/tools"
        />
      </div>

      {/* Image Gallery Section */}
      {productLine.images && productLine.images.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid gap-6 ${
                productLine.images.length === 1
                  ? "grid-cols-1 max-w-4xl mx-auto"
                  : productLine.images.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {productLine.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={image}
                    alt={content?.suggestedImages?.[index]?.alt || `${productLine.name} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    quality={85}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Section - Bullet Points */}
      {content?.whySection && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
              {content.whySection.title || `Why ${tool.name} at Lapiz Blue`}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {content.whySection.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    fill={secondaryColor}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Applications Section - Scannable List */}
      {content?.applications && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
              {content.applications.title || 'Applications & Best-Fit Scenarios'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {content.applications.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Choose Section - Mini Guide */}
      {content?.howToChoose && (
        <section
          className="py-12 md:py-16 text-white"
          style={{ background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryColor}dd)` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {content.howToChoose.title || 'How to Choose the Right Option'}
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {content.howToChoose.bullets.map((bullet, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-white/90 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Common Mistakes Section - Soft Warning Style */}
      {content?.commonMistakes && (
        <section className="py-12 md:py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
                {content.commonMistakes.title || 'Common Mistakes to Avoid'}
              </h2>
            </div>
            <ul className="max-w-3xl mx-auto space-y-3">
              {content.commonMistakes.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-400"
                >
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Trust Signals Section */}
      {content?.trustSignals && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
              {content.trustSignals.title || 'What You Can Expect'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {content.trustSignals.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2" style={{ color: primaryColor }}>
                    {item.label}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section (legacy - if no rich content) */}
      {!hasRichContent && productLine.features && productLine.features.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {productLine.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    fill={primaryColor}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {content?.faqs && content.faqs.length > 0 && (
        <ProductLineFAQSection faqs={content.faqs} brandColor={primaryColor} />
      )}

      {/* Brand Copy Section */}
      {content?.brandCopy && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {content.brandCopy.sections.map((section, index) => (
              <div key={index} className={index > 0 ? 'mt-10' : ''}>
                <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Downloads Section (if available) */}
      {productLine.downloads && productLine.downloads.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: primaryColor }}>
              Technical Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {productLine.downloads.map((download, index) => (
                <a
                  key={index}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <svg
                    className="w-10 h-10 flex-shrink-0"
                    fill={primaryColor}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold" style={{ color: primaryColor }}>{download.title}</h3>
                    <p className="text-sm text-gray-500">{download.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Enhanced with checklist */}
      <section className="py-16 md:py-20" style={{ backgroundColor: accentColor || `${primaryColor}15` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: primaryColor }}>
              {content?.cta?.title || 'Need Expert Guidance?'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content?.cta?.subtitle || `Our technical team is here to help you choose the right ${productLine.name.toLowerCase()} for your project. Get in touch for personalized recommendations and quotations.`}
            </p>
          </div>

          {/* Request Checklist */}
          {content?.cta?.checklist && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md mb-8">
              <h3 className="font-semibold mb-4 text-center" style={{ color: primaryColor }}>
                What we offer:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {content.cta.checklist.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill={primaryColor} viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/971488855257"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#25D366] rounded-lg transition-all duration-200 hover:bg-[#128C7E] hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Tool Link */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center text-gray-600 hover:opacity-80 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {tool.name} Product Lines
          </Link>
        </div>
      </section>
    </main>
  );
}
