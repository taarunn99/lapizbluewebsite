// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Lapiz Blue | Premium Construction Materials Supplier in UAE & GCC",
  description:
    "Authorized distributor of Mapei, Weber, AkzoNobel Dulux, Laticrete & Profilpas in UAE. Premium tile adhesives, waterproofing, grouts, epoxy flooring & construction tools. Serving Dubai, Abu Dhabi, Sharjah & GCC since 2008.",
  keywords: [
    "construction materials UAE",
    "building materials Dubai",
    "Mapei distributor UAE",
    "tile adhesives Dubai",
    "waterproofing solutions UAE",
    "grout supplier Abu Dhabi",
    "construction chemicals GCC",
    "Weber UAE",
    "AkzoNobel Dulux paint UAE",
    "Laticrete UAE",
    "Profilpas tile profiles",
    "epoxy flooring Dubai",
    "building materials Sharjah",
    "construction supplier Middle East",
    "tile installation products UAE",
  ],
  openGraph: {
    title: "Lapiz Blue | Premium Construction Materials Supplier in UAE & GCC",
    description:
      "Authorized distributor of 25+ world-class construction brands. Premium tile adhesives, waterproofing, paints & tools across UAE, Saudi Arabia & GCC region.",
    url: "https://www.lapizblue.com",
    siteName: "Lapiz Blue",
    images: [
      {
        url: "/images/home/homepageimages/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Lapiz Blue - Premium Construction Materials Supplier UAE",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lapiz Blue | Premium Construction Materials UAE",
    description:
      "Authorized distributor of Mapei, Weber, AkzoNobel & more. Premium construction materials across UAE & GCC.",
    images: ["/images/home/homepageimages/hero.jpg"],
  },
  alternates: {
    canonical: "https://www.lapizblue.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}
