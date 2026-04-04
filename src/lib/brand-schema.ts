import type { BrandConfig, ProductLineFAQ } from "@/data/brandConfigs";

export function generateBrandJsonLd(brand: BrandConfig, slug: string, faqs?: ProductLineFAQ[]) {
  const url = `https://www.lapizblue.com/brands/${slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.lapizblue.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Brands",
        item: "https://www.lapizblue.com/brands",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brand.name,
        item: url,
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lapiz Blue",
    url: "https://www.lapizblue.com",
    logo: "https://www.lapizblue.com/images/lapiz-blue-logo.png",
    brand: {
      "@type": "Brand",
      name: brand.name,
      ...(brand.website ? { url: brand.website } : {}),
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Lapiz Blue",
    url: "https://www.lapizblue.com",
    telephone: "+971544423334",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Quoz Industrial Area 3",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: brand.seoTitle ?? `${brand.name} Products | Lapiz Blue UAE`,
    description: brand.metaDescription,
    url,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [breadcrumb, organization, localBusiness, webPage];

  if (faqs && faqs.length > 0) {
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
    schemas.push(faqPage);
  }

  return schemas;
}
