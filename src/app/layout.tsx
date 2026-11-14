
// import type { Metadata } from "next";
// import "./globals.css";
// import Navbar from "@/components/Navbar";

// export const metadata: Metadata = {
//   title: "Lapiz Blue",
//   description: "World-Class Construction Materials",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <Navbar />
//         {/* push content below fixed navbar height (150px) */}
//         <div className="pt-[75px]">{children}</div>
//       </body>
//     </html>
//   );
// }
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Manrope, Outfit } from "next/font/google";
import SiteFooter from "@/components/SiteFooter.client";
import localFont from "next/font/local";
import TitleBlinker from "@/components/TitleBlinker.client";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollRotatingLogo from "@/components/ScrollRotatingLogo.client";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/ui/cookie-consent";

const GTM_ID = "GTM-TM86M7FS";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: "variable", // single variable file covers every weight used
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: "variable", // single variable file covers every weight used
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const horizon = localFont({
  src: "../../public/fonts/Horizon.woff2",
  display: "swap",
  variable: "--font-horizon",
  preload: false, // only used in the scroll logo section, keep it off the critical path
  fallback: ["system-ui", "arial"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lapizblue.com"),
  title: "Lapiz Blue - World-Class Construction Materials Suppliers",
  description: "Curated innovation and homegrown insight across the UAE.",
  keywords: ["Lapiz Blue", "Mapei", "waterproofing", "tile adhesives", "Dubai", "UAE", "GCC"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    'color-scheme': 'light only',
  },
  openGraph: {
    title: "Lapiz Blue",
    description: "World-Class Construction Materials Suppliers",
    url: "https://www.lapizblue.com/",
    siteName: "Lapiz Blue",
    images: [{ url: "/images/home/homepageimages/hero.webp", width: 1920, height: 1080, alt: "Lapiz Blue hero" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable} ${horizon.variable}`} suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        {/* Consent Mode v2 defaults + dataLayer init - must execute before GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Ads consent is denied until the visitor taps "I Agree" on the cookie bar
              // (CookieConsent updates it). Analytics stays on, first party only. Google
              // tags run cookieless until then, so no third party cookie is set up front.
              var lbConsent = false;
              try { lbConsent = localStorage.getItem('lapizblue-cookie-consent') === 'true'; } catch (e) {}
              gtag('consent', 'default', {
                'ad_storage': lbConsent ? 'granted' : 'denied',
                'ad_user_data': lbConsent ? 'granted' : 'denied',
                'ad_personalization': lbConsent ? 'granted' : 'denied',
                'analytics_storage': 'granted',
                'wait_for_update': 500
              });
            `,
          }}
        />
        {/* Recover marketing params from _lb_mktg cookie into dataLayer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var c = document.cookie.match(/_lb_mktg=([^;]+)/);
                if (c) {
                  var p = JSON.parse(decodeURIComponent(c[1]));
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: 'marketing_params_recovered', ...p });
                }
              } catch(e) {}
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Favicon links for all browsers including mobile */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-[var(--font-outfit)] antialiased m-0 p-0 bg-white" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />

        {/* Blink only when tab is hidden; restore on return */}
        <TitleBlinker
          visibleTitle="Lapiz Blue - World-Class Construction Materials Suppliers"
          hiddenMessages={["Get Free Quote", "Today!"]}
          intervalMs={1000}
          enabled={true}
        />

        <div className="pt-[75px]">{children}</div>
        <div className="mt-0">
          <SiteFooter />
        </div>
        <FloatingWhatsApp />
        <ScrollRotatingLogo />
        <Toaster position="top-right" richColors />
        <CookieConsent />
      </body>
    </html>
  );
}