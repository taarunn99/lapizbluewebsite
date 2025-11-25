import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandBySlug, getAllBrandSlugs } from "@/data/brands";
import { BrandDetailLayout } from "@/components/brands/brand-detail-layout";

// Site base URL - can be moved to env var or config
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lapizblue.com";

interface BrandPageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate static params for all brand pages
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for each brand page
 * Includes SEO tags, Open Graph, and Twitter Card metadata
 */
export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return {
      title: "Brand Not Found | Lapiz Blue",
      description: "The requested brand page could not be found.",
    };
  }

  const { seo } = brand;
  const canonicalUrl = `${SITE_URL}/brands/${brand.slug}`;
  const ogImageUrl = `${SITE_URL}${brand.ogImage}`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: canonicalUrl,
      siteName: "Lapiz Blue",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${brand.name} - ${brand.tagline}`,
        },
      ],
      locale: "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
      googleBot: {
        index: !seo.noIndex,
        follow: !seo.noIndex,
      },
    },
  };
}

/**
 * Enable ISR with 60-second revalidation
 */
export const revalidate = 60;

/**
 * Brand detail page component
 */
export default function BrandPage({ params }: BrandPageProps) {
  const brand = getBrandBySlug(params.slug);

  // Show 404 if brand not found
  if (!brand) {
    notFound();
  }

  return <BrandDetailLayout brand={brand} />;
}
