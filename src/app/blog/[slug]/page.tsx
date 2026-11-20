import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SceneFrame from "@/components/three/scene-frame";
import { ORG_ID, LOGO_URL, SITE, faqPageNode, standalone, jsonLd as toJsonLd } from "@/lib/org-schema";
import type { ReactNode } from "react";

/** Where a post sends the reader next. Thirty one posts had no internal links at all. */
const RELATED: Record<string, { label: string; href: string }[]> = {
  Mapei: [
    { label: 'Mapei distributor in the UAE', href: '/brands/mapei' },
    { label: 'Mapei tile adhesives and grouts', href: '/brands/mapei/tile-adhesives-and-grouts' },
    { label: 'Mapei waterproofing', href: '/brands/mapei/waterproofing' },
    { label: 'Mapei grout calculator', href: '/mapei-grout-calculator' },
  ],
  Profilpas: [
    { label: 'Profilpas tile profiles in the UAE', href: '/brands/profilpas' },
    { label: 'Corner profiles', href: '/brands/profilpas/corner-profiles' },
    { label: 'Movement joints and stair nosings', href: '/brands/profilpas/movement-and-stairnosing' },
    { label: 'Skirting boards', href: '/brands/profilpas/skirting-boards' },
  ],
  Guides: [
    { label: 'Construction chemicals distributor in Dubai', href: '/construction-chemicals-dubai' },
    { label: 'Tile adhesive supplier in Dubai', href: '/tile-adhesive-supplier-dubai' },
    { label: 'Waterproofing supplier in Dubai', href: '/waterproofing-supplier-dubai' },
    { label: 'Open a trade account', href: '/trade-account' },
  ],
};
const RELATED_DEFAULT = [
  { label: 'Every brand we distribute', href: '/brands' },
  { label: 'Mapei', href: '/brands/mapei' },
  { label: 'Kerakoll', href: '/brands/kerakoll' },
  { label: 'Weber Saint-Gobain', href: '/brands/weber' },
  { label: 'Laticrete', href: '/brands/laticrete' },
  { label: 'Construction chemicals distributor in Dubai', href: '/construction-chemicals-dubai' },
];

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

  const canonicalUrl = `https://www.lapizblue.com/blog/${slug}`;

  return {
    title: `${post.title} | Lapiz Blue`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Lapiz Blue',
      images: [
        {
          url: post.image.startsWith('http') ? post.image : `https://www.lapizblue.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: ['Lapiz Blue'],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image.startsWith('http') ? post.image : `https://www.lapizblue.com${post.image}`],
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

  // JSON-LD structured data for SEO
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE,
    },
    publisher: {
      '@id': ORG_ID,
      '@type': 'Organization',
      name: 'Lapiz Blue',
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/blog/${slug}`,
    },
  };
  const faqLd = post.faqs.length > 0 ? standalone(faqPageNode(`${SITE}/blog/${slug}#faq`, post.faqs)) : null;

  // A fenced block whose language is "3d" embeds the named scene: the poster
  // ships in the HTML, the model loads behind a tap. The fence body is the
  // scene slug and nothing else.
  const isSceneFence = (node: ReactNode): string | null => {
    if (!node || typeof node !== 'object' || !('props' in node)) return null;
    const p = (node as { props: { className?: string; children?: ReactNode } }).props;
    if (!p?.className || !/language-3d\b/.test(p.className)) return null;
    const text = Array.isArray(p.children) ? p.children.join('') : String(p.children ?? '');
    return text.trim();
  };

  return (
    <main className="w-full bg-white text-[#161925]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
      />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqLd) }} />}
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
            <span>{post.author}</span>
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // The page template already renders the post title as the
                // single h1; markdown-level "# " headings become h2 tags
                // styled to match the prose h1 look.
                h1: ({ ...props }) => (
                  <h2
                    className="text-[2.6667em] font-extrabold mt-0 mb-[0.8333em] leading-none"
                    {...props}
                  />
                ),
                // Markdown tables scroll inside their own box on a phone instead of pushing the page sideways.
                table: ({ children, ...props }) => (
                  <div className="overflow-x-auto">
                    <table {...props}>{children}</table>
                  </div>
                ),
                pre: ({ children, ...props }) => {
                  const slug = isSceneFence(children);
                  if (slug) {
                    return (
                      <div className="not-prose my-10">
                        <SceneFrame scene={slug} sizes="(max-width: 1024px) 100vw, 896px" />
                      </div>
                    );
                  }
                  return <pre {...props}>{children}</pre>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.faqs.length > 0 && (
            <section className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="post-faq-heading">
              <h2 id="post-faq-heading" className="font-outfit font-semibold text-2xl md:text-3xl text-[#161925]">
                Questions this guide answers
              </h2>
              <ol className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                {post.faqs.map((f) => (
                  <li key={f.question} className="py-5">
                    <h3 className="font-outfit font-semibold text-lg md:text-xl text-[#161925]">{f.question}</h3>
                    <p className="font-manrope text-gray-700 leading-relaxed mt-2">{f.answer}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </article>

      {/* Where to go next: the catalogue pages this post is really about */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-12 md:pb-16" aria-labelledby="post-related-heading">
        <div className="max-w-4xl border-t border-gray-200 pt-10">
          <p className="label-sh text-[#161925]/60">Read next</p>
          <h2 id="post-related-heading" className="font-outfit font-semibold text-2xl md:text-3xl text-[#161925] mt-2">
            The pages this guide points to
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {(RELATED[post.category] ?? RELATED_DEFAULT).map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-manrope text-base font-semibold text-[#406E8E] underline underline-offset-4 hover:text-[#161925]">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
