import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - Lapiz Blue",
    };
  }

  return {
    title: `${post.title} - Lapiz Blue`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-white text-[#161925]">
      {/* Hero Image Banner - Clean, no text overlay */}
      <section className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Title Section - Clean background, clear separation */}
      <section className="bg-[#161925] text-white">
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-10 md:py-14">
          {/* Category Badge */}
          <span className="inline-block bg-white/10 border border-white/20 text-white px-4 py-1.5 text-sm font-medium rounded-full mb-5">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-outfit font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-5 text-white/70 text-sm md:text-base">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>Lapiz Blue</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="px-6 md:px-12 lg:px-20 xl:px-32 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#23395B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#23395B] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#23395B] font-medium truncate max-w-[300px]">
            {post.title}
          </span>
        </div>
      </nav>

      {/* Article Content - Left aligned, wider layout */}
      <article className="px-6 md:px-12 lg:px-20 xl:px-32 py-12 md:py-16">
        <div className="max-w-4xl">
          {/* Excerpt/Lead */}
          {post.excerpt && (
            <p className="font-manrope text-lg md:text-xl text-gray-600 leading-relaxed mb-10 pb-8 border-b border-gray-200">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-outfit prose-headings:text-[#161925] prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#23395B] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#161925] prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:marker:text-[#23395B] prose-blockquote:border-l-[#23395B] prose-blockquote:text-gray-600 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-32 py-12 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-start">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#23395B] text-white px-8 py-3 rounded-full hover:bg-[#1a2a45] transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
