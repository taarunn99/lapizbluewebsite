import { getShippable, getBrandsWithShippablePages, tdsHref } from '@/lib/tds';
import { SITE_URL } from '@/lib/site-constants';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return getBrandsWithShippablePages().map((brand) => ({ segment: `${brand}.xml` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segment: string }> }
) {
  const { segment } = await params;
  const brand = segment.replace(/\.xml$/, '');
  const records = getShippable(brand);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${records
  .map(
    (rec) => `  <url>
    <loc>${SITE_URL}${tdsHref(rec)}</loc>
    <lastmod>${rec.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
