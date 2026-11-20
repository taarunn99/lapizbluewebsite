import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/dev/'],
      },
    ],
    sitemap: ['https://www.lapizblue.com/sitemap.xml', 'https://www.lapizblue.com/sitemaps.xml'],
  };
}
