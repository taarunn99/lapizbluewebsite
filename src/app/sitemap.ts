import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { brandConfigs } from '@/data/brandConfigs';
import { toolConfigs } from '@/data/toolConfigs';
import { getShippable } from '@/lib/tds';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lapizblue.com';

  // Get all blog posts
  const posts = getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Generate brand URLs dynamically
  const brandUrls: MetadataRoute.Sitemap = [];
  Object.values(brandConfigs).forEach((brand) => {
    // Main brand page
    brandUrls.push({
      url: `${baseUrl}/brands/${brand.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    });
    // Product line pages
    brand.productLines?.forEach((productLine) => {
      brandUrls.push({
        url: `${baseUrl}/brands/${brand.slug}/${productLine.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    });
  });

  // Product pages. Every one of these was missing from the sitemap, across
  // every brand, so none of the product record pages were being offered to a
  // crawler at all. They carry their own canonical, title and Product schema,
  // so they belong here.
  const productUrls: MetadataRoute.Sitemap = getShippable().map((rec) => ({
    url: `${baseUrl}/brands/${rec.brand}/${rec.product_line}/${rec.slug}`,
    lastModified: rec.updated_at ? new Date(rec.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Generate tool URLs dynamically
  const toolUrls: MetadataRoute.Sitemap = [];
  Object.values(toolConfigs).forEach((tool) => {
    // Main tool page
    toolUrls.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
    // Product line pages
    tool.productLines?.forEach((productLine) => {
      toolUrls.push({
        url: `${baseUrl}/tools/${tool.slug}/${productLine.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    });
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/construction-chemicals-dubai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/waterproofing-supplier-dubai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/concrete-repair-supplier-dubai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/epoxy-flooring-supplier-dubai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tile-adhesive-supplier-dubai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...brandUrls, ...productUrls, ...toolUrls, ...blogUrls];
}
