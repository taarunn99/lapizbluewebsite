import type { Metadata } from "next";
import Image from "next/image";
import BlogContent from "@/components/BlogContent.client";

export const metadata: Metadata = {
  title: "Blog | Construction Insights & Tips | Lapiz Blue",
  description: "Expert articles on tile installation, waterproofing, and building materials. Practical tips for contractors and construction professionals in the UAE.",
  alternates: {
    canonical: "https://www.lapizblue.com/blog",
  },
  openGraph: {
    title: "Blog | Lapiz Blue",
    description: "Expert articles on tile installation, waterproofing, and building materials. Practical tips for UAE contractors.",
    url: "https://www.lapizblue.com/blog",
    siteName: "Lapiz Blue",
    images: ["/images/blog/blogpageimages/blogpagehero.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lapiz Blue",
    description: "Expert articles on tile installation, waterproofing, and building materials. Practical tips for UAE contractors.",
    images: ["/images/blog/blogpageimages/blogpagehero.webp"],
  },
};

// Import with dynamic to prevent SSR issues
async function getPosts() {
  try {
    const { getAllPosts } = await import("@/lib/blog");
    return getAllPosts();
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  // Fetch all posts (server-side)
  const posts = await getPosts();

  return (
    <main className="w-full bg-white text-[#23395B]">
      {/* Hero Section - One viewport height */}
      <section className="relative w-full h-[100vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/blog/blogpageimages/blogpagehero.webp"
            alt="Featured blog articles and industry insights"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.8 }}
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Hero Text - Dancing Script - Reduced size */}
          <h1
            className="font-[family-name:var(--font-dancing-script)] text-center text-[#ffffff] font-bold
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px]
              max-w-[90%] sm:max-w-[80%] md:max-w-[900px] lg:max-w-[1100px]
              leading-tight sm:leading-tight md:leading-tight lg:leading-[60px]"
          >
            Every story begins with a seat, a view, and a moment worth telling.
          </h1>
        </div>
      </section>

      {/* Blog Content with Filters (Client Component) */}
      <BlogContent posts={posts} />
    </main>
  );
}
