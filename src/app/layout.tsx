
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
import { Manrope, Outfit } from "next/font/google";
import TitleBlinker from "@/components/TitleBlinker.client";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300","400","500","600","700","800"],
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300","400","500","600","700","800","900"],
});
export const metadata: Metadata = {
  title: "Lapiz Blue - World-Class Construction Materials Suppliers",
  description: "Curated innovation and homegrown insight across the UAE.",
  keywords: ["Lapiz Blue", "Mapei", "waterproofing", "tile adhesives", "Dubai", "UAE", "GCC"],
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
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="font-[var(--font-outfit)] antialiased">
        <Navbar />

        {/* Blink only when tab is hidden; restore on return */}
        <TitleBlinker
          visibleTitle="Lapiz Blue - World-Class Construction Materials Suppliers"
          hiddenMessages={["Get Free Quote", "Today!"]}
          intervalMs={1000}
          enabled={true}
        />

        <div className="pt-[75px]">{children}</div>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}