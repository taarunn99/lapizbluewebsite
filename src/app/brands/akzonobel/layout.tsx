import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AkzoNobel Dulux Paints UAE | Official Distributor - Lapiz Blue",
  description:
    "AkzoNobel Dulux paints UAE - Official distributor Lapiz Blue. EasyClean, Velvet Touch, Weathershield, Stucco wall putty. Interior, exterior, flooring & metal coatings. Dubai, Abu Dhabi, Sharjah delivery.",
  keywords: [
    "AkzoNobel UAE",
    "Dulux UAE",
    "Dulux paints Dubai",
    "AkzoNobel paints Dubai",
    "Dulux EasyClean UAE",
    "Dulux Weathershield UAE",
    "Dulux Stucco UAE",
    "Dulux Velvet Touch",
    "interior paint Dubai",
    "exterior paint UAE",
    "paint supplier Dubai",
    "Lapiz Blue"
  ],
  openGraph: {
    title: "AkzoNobel Dulux Paints UAE | Official Distributor - Lapiz Blue",
    description:
      "AkzoNobel Dulux paints from Lapiz Blue - official UAE distributor. EasyClean, Weathershield, Stucco & professional paints. Dubai, Abu Dhabi, Sharjah.",
    images: ["/images/brands/akzonobel/hero.webp"],
    url: "/brands/akzonobel",
    type: "website",
    siteName: "Lapiz Blue",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkzoNobel Dulux Paints UAE | Lapiz Blue",
    description:
      "Official AkzoNobel Dulux distributor in UAE. EasyClean, Weathershield, Stucco wall putty & professional paints. Dubai, Abu Dhabi, Sharjah.",
    images: ["/images/brands/akzonobel/hero.webp"],
  },
  alternates: {
    canonical: "/brands/akzonobel",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AkzoNobelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
