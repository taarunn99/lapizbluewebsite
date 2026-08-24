import { getBrandsWithShippablePages } from '@/lib/tds';
import { SITE_URL } from '@/lib/site-constants';

export const dynamic = 'force-static';

// Sitemap index for the per brand TDS product sitemaps. The main /sitemap.xml
// is untouched; this index exists so each brand's product pages can be
// tracked separately in Search Console.
export async function GET() {
  const brands = getBrandsWithShippablePages();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${brands
  .map(
    (brand) => `  <sitemap>
    <loc>${SITE_URL}/sitemaps/${brand}.xml</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
