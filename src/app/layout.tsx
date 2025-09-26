
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
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Lapiz Blue - World-Class Construction Materials",
  description: "Curated innovation and homegrown insight across the UAE.",
  keywords: ["Lapiz Blue", "Mapei", "waterproofing", "tile adhesives", "Dubai", "UAE", "GCC"],
  openGraph: {
    title: "Lapiz Blue",
    description: "World-Class Construction Materials",
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
    <html lang="en" className={outfit.variable}>
      <body>
        <Navbar />
        {/* push content below fixed 75px navbar */}
        <div className="pt-[75px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

