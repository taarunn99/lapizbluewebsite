// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { AwardBadgeHanger } from "@/components/AwardBadgeHanger.client";
import { graph, organizationNode, websiteNode, branchNodes } from '@/lib/org-schema';

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
        url: "/images/home/homepageimages/hero.webp",
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
    images: ["/images/home/homepageimages/hero.webp"],
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

// Organization, WebSite and the three branches, from the one shared description.
const jsonLd = graph([organizationNode(), websiteNode(), ...branchNodes()]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* LCP image preloads, scoped to the home page, priority hinted for mobile */}
      <link rel="preload" as="image" type="image/avif" fetchPriority="high" href="/images/home/homepageimages/hero-640.avif" media="(max-width: 640px)" />
      <link rel="preload" as="image" type="image/avif" fetchPriority="high" href="/images/home/homepageimages/hero-828.avif" media="(min-width: 641px) and (max-width: 828px)" />
      <link rel="preload" as="image" type="image/avif" fetchPriority="high" href="/images/home/homepageimages/hero-1200.avif" media="(min-width: 829px) and (max-width: 1200px)" />
      <link rel="preload" as="image" type="image/avif" fetchPriority="high" href="/images/home/homepageimages/hero-1440.avif" media="(min-width: 1201px) and (max-width: 1440px)" />
      <link rel="preload" as="image" type="image/avif" fetchPriority="high" href="/images/home/homepageimages/hero-1920.avif" media="(min-width: 1441px)" />
      <Hero />
      <AwardBadgeHanger />
    </>
  );
}
