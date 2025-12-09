
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
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter.client";
import { Manrope, Outfit, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";
import TitleBlinker from "@/components/TitleBlinker.client";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollRotatingLogo from "@/components/ScrollRotatingLogo.client";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300","400","500","600","700","800","900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  fallback: ["cursive", "system-ui"],
});
const horizon = localFont({
  src: "../../public/fonts/Horizon.otf",
  display: "swap",
  variable: "--font-horizon",
  preload: true,
  fallback: ["system-ui", "arial"],
});
export const metadata: Metadata = {
  title: "Lapiz Blue - World-Class Construction Materials Suppliers",
  description: "Curated innovation and homegrown insight across the UAE.",
  keywords: ["Lapiz Blue", "Mapei", "waterproofing", "tile adhesives", "Dubai", "UAE", "GCC"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.png",
    apple: { url: "/favicon.png", sizes: "180x180" },
  },
  other: {
    'color-scheme': 'light only',
  },
  openGraph: {
    title: "Lapiz Blue",
    description: "World - Class Construction Materials Suppliers",
    url: "https://www.lapizblue.com/",
    siteName: "Lapiz Blue",
    images: [{ url: "/images/home/homepageimages/hero.jpg", width: 1920, height: 1080, alt: "Lapiz Blue hero" }],
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
    <html lang="en" className={`${manrope.variable} ${outfit.variable} ${dancingScript.variable} ${horizon.variable}`} suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-[var(--font-outfit)] antialiased m-0 p-0 bg-white" suppressHydrationWarning>
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
      </body>
    </html>
  );
}