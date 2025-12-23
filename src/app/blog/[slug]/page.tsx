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
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-12 md:pb-16 lg:pb-20">
          {/* Category Badge */}
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 text-sm font-medium rounded-full mb-4 w-fit">
            {post.category}
          </span>

          {/* Title */}
          <h1
            className="font-outfit text-white font-medium
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              max-w-4xl leading-tight"
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-6 text-white/80 text-sm md:text-base">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span>Lapiz Blue</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#23395B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#23395B] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#23395B] font-medium truncate max-w-[200px]">
            {post.title}
          </span>
        </div>
      </nav>

      {/* Article Content */}
      <article className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt/Lead */}
          {post.excerpt && (
            <p className="font-manrope text-lg md:text-xl text-gray-600 leading-relaxed mb-8 font-medium">
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
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex justify-center">
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
