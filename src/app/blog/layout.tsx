import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Stories - Lapiz Blue",
  description:
    "Every story begins with a seat, a view, and a moment worth telling. Discover stories and solutions from Lapiz Blue.",
  openGraph: {
    title: "Blogs & Stories - Lapiz Blue",
    description: "Every story begins with a seat, a view, and a moment worth telling.",
    images: ["/images/blog/blogpageimages/blogpagehero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Stories - Lapiz Blue",
    description: "Every story begins with a seat, a view, and a moment worth telling.",
    images: ["/images/blog/blogpageimages/blogpagehero.webp"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
