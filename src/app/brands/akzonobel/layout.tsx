import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dulux Paints UAE | Official Distributor - Lapiz Blue",
  description:
    "Get Dulux paints from Lapiz Blue, the official AkzoNobel distributor in UAE. Interior and exterior paints, colour consultation, and delivery across Dubai, Abu Dhabi, and Sharjah.",
  openGraph: {
    title: "Dulux Paints UAE | Official Distributor - Lapiz Blue",
    description:
      "Get Dulux paints from Lapiz Blue, the official AkzoNobel distributor in UAE. Interior and exterior paints with colour consultation.",
    images: ["/images/brands/akzonobel/hero.webp"],
    url: "/brands/akzonobel",
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
