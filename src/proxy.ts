import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Exact paths that should return HTTP 410 Gone
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
  // WordPress system URLs
  '/wp-json',
  '/wp-json/',
  '/feed',
  '/feed/',
  '/xmlrpc.php',
  // Non-construction products (spam/old WordPress)
  '/product/smart-watches-wood-edition',
  '/product/smart-watches-wood-edition/',
  '/product/wooden-single-drawer',
  '/product/wooden-single-drawer/',
  '/product/eames-lounge-chair',
  '/product/eames-lounge-chair/',
  '/product/eames-plastic-side-chair',
  '/product/eames-plastic-side-chair/',
  '/product/panton-tunior-chair',
  '/product/panton-tunior-chair/',
  '/product/iphone-dock',
  '/product/iphone-dock/',
  '/product/augue-adipiscing-euismod',
  '/product/augue-adipiscing-euismod/',
  // Misc
  '/product-images',
  '/product-images/',
  '/pro',
]);

// Prefix patterns for 410 (matches path and anything under it)
const gone410Prefixes = [
  '/wp-json/',
  // Non-construction product categories
  '/product-category/toys',
  '/product-category/clocks',
  '/product-category/cooking',
  '/product-category/furniture',
  '/product-category/lighting',
  '/product-category/accessories',
  '/product-category/test-products',
  // All /shop pages
  '/shop',
];

function isGoneUrl(pathname: string): boolean {
  // Exact matches
  if (gone410Pages.has(pathname)) return true;

  // Prefix matches (handles both exact prefix and sub-paths)
  for (const prefix of gone410Prefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + '/') || pathname === prefix + '/') {
      return true;
    }
  }

  // Feed suffix: any path ending in /feed or /feed/
  if (pathname.endsWith('/feed') || pathname.endsWith('/feed/')) return true;

  return false;
}

const MARKETING_PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Capture marketing params into a first-party cookie before any redirect can strip them
  const marketingParams: Record<string, string> = {};
  for (const key of MARKETING_PARAMS) {
    const val = url.searchParams.get(key);
    if (val) marketingParams[key] = val;
  }

  if (Object.keys(marketingParams).length > 0) {
    const response = isGoneUrl(pathname)
      ? new NextResponse(
          '<html><body><h1>410 Gone</h1><p>This page has been permanently removed.</p></body></html>',
          {
            status: 410,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'X-Robots-Tag': 'noindex',
            },
          },
        )
      : NextResponse.next();
    response.cookies.set('_lb_mktg', JSON.stringify(marketingParams), {
      path: '/',
      maxAge: 90 * 24 * 60 * 60, // 90 days (matches Google's gclid window)
      sameSite: 'lax',
      secure: true,
      httpOnly: false, // GTM needs to read this client-side
    });
    return response;
  }

  if (isGoneUrl(pathname)) {
    return new NextResponse(
      '<html><body><h1>410 Gone</h1><p>This page has been permanently removed.</p></body></html>',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex',
        },
      },
    );
  }

  return NextResponse.next();
}

// Configure which paths the proxy runs on - all pages so gclid/utm are
// captured regardless of which page Google Ads lands users on.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|images|logos|fonts|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff2?|otf|ttf|json|xml|txt|webmanifest)).*)',
  ],
};
