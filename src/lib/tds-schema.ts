import type { ManifestRecord } from './tds';
import { TDS_CATEGORY_LABELS, tdsHref } from './tds';
import { SITE_URL } from './site-constants';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildProductJsonLd(rec: ManifestRecord, brandName: string) {
  const url = `${SITE_URL}${tdsHref(rec)}`;
  const image = rec.image.path ? `${SITE_URL}${rec.image.path}` : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: rec.name,
    description: rec.description,
    ...(image ? { image } : {}),
    brand: { '@type': 'Brand', name: brandName },
    manufacturer: { '@type': 'Organization', name: brandName },
    category: TDS_CATEGORY_LABELS[rec.category],
    url,
    mainEntityOfPage: url,
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function jsonLdString(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
