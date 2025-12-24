import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Pages that should return HTTP 410 Gone (intentionally removed content)
const gone410Pages = new Set([
  // Removed brands
  '/m-mosaics',
  '/m-mosaics/',
  // Removed vacuum elevator pages
  '/vaccum-elevator',
  '/vaccum-elevator/',
  '/pneumatic-vaccum-elevators',
  '/pneumatic-vaccum-elevators/',
  '/pve-30',
  '/pve-30/',
  '/pve-37',
  '/pve-37/',
  // Spam pages (furniture, kitchen products unrelated to business)
  '/product/eames-lounge-chair',
  '/product/eames-lounge-chair/',
  '/product/panton-tunior-chair',
  '/product/panton-tunior-chair/',
  // Product categories for removed/spam content
  '/product-category/cooking',
  '/product-category/cooking/',
  '/product-category/clocks',
  '/product-category/clocks/',
  '/product-category/test-products',
  '/product-category/test-products/',
  '/product-category/accessories',
  '/product-category/accessories/',
  // WordPress system URLs that should not exist
  '/wp-json',
  '/wp-json/',
  '/feed',
  '/feed/',
  '/xmlrpc.php',
]);

// Patterns for 410 pages (prefix matching)
const gone410Prefixes = [
  '/wp-json/',
  '/feed/',
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check exact matches first
  if (gone410Pages.has(pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex',
      },
    });
  }

  // Check prefix matches
  for (const prefix of gone410Prefixes) {
    if (pathname.startsWith(prefix)) {
      return new NextResponse('Gone', {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex',
        },
      });
    }
  }

  return NextResponse.next();
}

// Configure which paths the proxy runs on
export const config = {
  matcher: [
    // Match specific 410 pages
    '/m-mosaics/:path*',
    '/vaccum-elevator/:path*',
    '/pneumatic-vaccum-elevators/:path*',
    '/pve-30/:path*',
    '/pve-37/:path*',
    '/product/eames-lounge-chair/:path*',
    '/product/panton-tunior-chair/:path*',
    '/product-category/cooking/:path*',
    '/product-category/clocks/:path*',
    '/product-category/test-products/:path*',
    '/product-category/accessories/:path*',
    '/wp-json/:path*',
    '/feed/:path*',
    '/xmlrpc.php',
  ],
};
