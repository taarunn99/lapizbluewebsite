import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  /** Last substantive edit, for dateModified. Defaults to date. */
  updated: string;
  excerpt: string;
  image: string;
  category: 'Guides' | 'Products' | 'Brands' | 'Solution' | 'Mapei' | 'Profilpas';
  /** Who wrote it, for the byline and the Article schema. */
  author: string;
  /** Questions answered at the end of the post, also emitted as FAQPage schema. */
  faqs: BlogFaq[];
  /** Slug of a 3D scene the post embeds, so the index can show its poster. */
  scene?: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory does not exist:', blogDirectory);
      return [];
    }

    // Get file names under /content/blog
    const fileNames = fs.readdirSync(blogDirectory);

    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          // Remove ".mdx" or ".md" from file name to get slug
          const slug = fileName.replace(/\.(mdx|md)$/, '');

          // Read markdown file as string
          const fullPath = path.join(blogDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Use gray-matter to parse the post metadata section
          const { data, content } = matter(fileContents);

          const faqs: BlogFaq[] = Array.isArray(data.faqs)
            ? data.faqs
                .filter((f: unknown) => f && typeof f === 'object' && 'question' in f && 'answer' in f)
                .map((f: { question: string; answer: string }) => ({ question: String(f.question), answer: String(f.answer) }))
            : [];
          return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString().split('T')[0],
            updated: data.updated || data.date || new Date().toISOString().split('T')[0],
            excerpt: data.excerpt || '',
            image: data.image || '/images/about/aboutpageimages/aboutus4.jpg',
            category: data.category || 'Products',
            author: data.author || 'Lapiz Blue',
            faqs,
            scene: typeof data.scene === 'string' ? data.scene : undefined,
            content,
          } as BlogPost;
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}
