// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Lapiz Blue | Premium Building Materials Supplier in UAE",
  description:
    "Authorized distributor of Mapei, Weber, AkzoNobel & more. Quality construction chemicals, tile adhesives & tools across Dubai, Abu Dhabi & Sharjah since 2020.",
  openGraph: {
    title: "Lapiz Blue | Premium Building Materials Supplier in UAE",
    description:
      "Authorized distributor of 25+ world-class construction brands. Quality tile adhesives, waterproofing, paints & tools across UAE.",
    url: "https://www.lapizblue.com",
    siteName: "Lapiz Blue",
    images: [
      {
        url: "/images/home/homepageimages/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Lapiz Blue - Premium Building Materials Supplier UAE",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lapiz Blue | Building Materials Supplier UAE",
    description:
      "Authorized distributor of Mapei, Weber, AkzoNobel & more. Quality construction materials across UAE.",
    images: ["/images/home/homepageimages/hero.jpg"],
  },
  alternates: {
    canonical: "https://www.lapizblue.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization and WebSite JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.lapizblue.com/#organization',
      name: 'Lapiz Blue',
      url: 'https://www.lapizblue.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.lapizblue.com/logos/lapizbluelogodarkblue.svg',
      },
      description: 'Premium building materials distributor in UAE since 2020',
      foundingDate: '2020',
      numberOfEmployees: '21',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '14-4 Street Al Quoz Industrial 4',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Shop 2 Musaffah Industrial 40',
          addressLocality: 'Abu Dhabi',
          addressCountry: 'AE',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Al Sajaa Industrial',
          addressLocality: 'Sharjah',
          addressCountry: 'AE',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+971-4-885-5257',
        contactType: 'sales',
        email: 'info@lapizblue.com',
        areaServed: ['AE', 'SA', 'OM', 'QA', 'KW', 'BH'],
        availableLanguage: ['en', 'ar'],
      },
      sameAs: [
        'https://www.instagram.com/lapizblue.dxb',
        'https://www.facebook.com/LapizBlueLLC',
        'https://www.linkedin.com/company/lapizblue',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.lapizblue.com/#website',
      url: 'https://www.lapizblue.com',
      name: 'Lapiz Blue',
      publisher: { '@id': 'https://www.lapizblue.com/#organization' },
      inLanguage: 'en-AE',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.lapizblue.com/#localbusiness',
      name: 'Lapiz Blue',
      image: 'https://www.lapizblue.com/logos/lapizbluelogodarkblue.svg',
      telephone: '+971-4-885-5257',
      email: 'info@lapizblue.com',
      url: 'https://www.lapizblue.com',
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
    </>
  );
}
