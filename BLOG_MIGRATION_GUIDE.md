# Blog Migration Guide: WordPress to Next.js

This guide will help you migrate your WordPress blogs to this Next.js site.

## ✅ What's Already Set Up

- **Blog system using MDX/Markdown files**
- **Filter functionality** (Products, Brands, Solution)
- **File-based routing** for blog posts
- **Sample blog posts** in `/content/blog/`

---

## 📋 Migration Options

### **Option 1: MDX Files (Recommended - Already Implemented)**

**Best for:**
- Full control over content
- Version controlled (Git)
- Fast performance
- No database needed

**How it works:**
- Blog posts are stored as `.mdx` files in `/content/blog/`
- Each file has frontmatter (metadata) and content
- The system automatically reads and displays them

---

## 🔄 How to Migrate Your WordPress Content

### **Step 1: Export from WordPress**

**Method A: Using WordPress Export Tool (Manual)**

1. In WordPress admin: `Tools → Export`
2. Select "Posts"
3. Download the XML file

**Method B: Using Plugin (Automated - Recommended)**

Install this Node.js tool to automatically convert WordPress to Markdown:
```bash
npx wordpress-export-to-markdown
```

Follow the prompts:
- Enter your WordPress URL
- Choose output directory: `content/blog`
- Select post types: `posts`
- It will download all posts as Markdown files with images

---

### **Step 2: Format Your Blog Posts**

Each blog post should be a `.mdx` file in `/content/blog/` with this structure:

\`\`\`mdx
---
title: "Your Blog Post Title"
date: "2025-01-15"
excerpt: "A brief description (1-2 sentences)"
image: "/images/blog/your-image.jpg"
category: "Products"  # Options: "Products", "Brands", "Solution"
author: "Author Name"
---

# Your Blog Post Title

Your blog content here with **markdown** formatting...

## Subheadings work great

- Bullet points
- More points

1. Numbered lists
2. Also work

> Blockquotes look nice too

\`\`\`

---

### **Step 3: Handle Images**

1. **Export images from WordPress:**
   - Download your `wp-content/uploads/` folder

2. **Copy to Next.js:**
   ```bash
   # Place images in
   /public/images/blog/
   ```

3. **Update image paths in MDX:**
   ```markdown
   ![Alt text](/images/blog/your-image.jpg)
   ```

---

## 📝 Adding New Blog Posts

### Quick Method:

1. Create a new file: `/content/blog/my-new-post.mdx`
2. Add frontmatter (see template above)
3. Write your content in Markdown
4. Save and commit to Git
5. Deploy - Done! ✅

### Template for New Posts:

Create this file: `/content/blog/_template.mdx`
\`\`\`mdx
---
title: ""
date: "2025-01-30"
excerpt: ""
image: "/images/blog/.jpg"
category: "Products"
author: "Lapiz Blue Team"
---

#

Write your content here...
\`\`\`

---

## 🎨 Category Guidelines

**Products**: Blog posts about specific furniture products, features, or reviews
**Brands**: Content about partner brands, brand stories, collaborations
**Solution**: How-to guides, workspace solutions, design tips

---

## 🚀 Workflow for Regular Blogging

### For Technical Users:
1. Create new `.mdx` file in `/content/blog/`
2. Write content in VS Code or any text editor
3. Commit to Git
4. Push to GitHub
5. Auto-deploys to production

### For Non-Technical Users:

**Option A: Use a CMS (Recommended for teams)**

Install a headless CMS like:
- **Sanity** (free tier): Visual editor, great Next.js integration
- **Contentful** (free tier): User-friendly interface
- **Decap CMS** (free): Git-based, no backend needed

**Option B: Use GitHub UI**
1. Go to your GitHub repo
2. Navigate to `/content/blog/`
3. Click "Add file" → "Create new file"
4. Name it: `my-post.mdx`
5. Paste the template and fill in content
6. Commit directly to main branch
7. Auto-deploys

---

## 🛠️ Advanced Options

### Option 1: Keep WordPress as Headless CMS

If you want to keep using WordPress:

1. **Install WordPress REST API**
2. **Use WordPress only for content management**
3. **Next.js fetches content via API**

Update `/src/lib/blog.ts`:
\`\`\`typescript
export async function getAllPosts() {
  const res = await fetch('https://your-wp-site.com/wp-json/wp/v2/posts?_embed');
  const posts = await res.json();
  return posts.map(post => ({
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    category: post.categories[0], // Map WP categories to yours
  }));
}
\`\`\`

**Pros:**
- Keep familiar WordPress editor
- No migration needed
- Team can continue using WP

**Cons:**
- Must maintain WordPress installation
- Slower than static files
- Dependency on WordPress uptime

---

### Option 2: Use Sanity CMS (Modern Approach)

1. **Install Sanity:**
```bash
npm install @sanity/client next-sanity
npx sanity init
```

2. **Create blog schema in Sanity Studio**
3. **Migrate WordPress content to Sanity**
4. **Update Next.js to fetch from Sanity**

**Pros:**
- Modern, fast editing experience
- Real-time collaboration
- Great developer experience
- Free tier available

**Cons:**
- Initial setup time
- Learning curve for team

---

## 📊 Current Implementation Details

**File Structure:**
\`\`\`
/content/blog/           # Your blog posts (MDX files)
/src/lib/blog.ts         # Blog post fetching logic
/src/components/BlogContent.client.tsx  # Blog display + filters
/src/app/blog/page.tsx   # Blog page
\`\`\`

**Features:**
- ✅ Category filtering (Products, Brands, Solution)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Image optimization with Next.js
- ✅ Fast page loads (static generation)

**To Add:**
- [ ] Individual blog post pages (create `/src/app/blog/[slug]/page.tsx`)
- [ ] Search functionality
- [ ] Tags/keywords
- [ ] Related posts
- [ ] Comments (if needed)

---

## 🎯 Recommended Workflow

**For Your Use Case (WordPress → Next.js):**

1. **One-time migration:**
   - Use `wordpress-export-to-markdown` tool
   - Export all posts to `/content/blog/`
   - Copy images to `/public/images/blog/`
   - Review and commit

2. **For future posts:**
   - **Option A:** Write directly in MDX files (fastest)
   - **Option B:** Install Sanity CMS (best UX)
   - **Option C:** Use GitHub UI (easiest for non-technical)

---

## 🆘 Need Help?

**Common Issues:**

1. **Images not showing:**
   - Check image path starts with `/images/blog/`
   - Ensure image file exists in `/public/images/blog/`

2. **Post not appearing:**
   - Check filename ends with `.mdx` or `.md`
   - Verify frontmatter format is correct
   - Ensure `category` matches: "Products", "Brands", or "Solution"

3. **Date format:**
   - Use: `"2025-01-30"` (YYYY-MM-DD)
   - Not: `"30/01/2025"` or `"Jan 30, 2025"`

---

## ✅ Next Steps

1. Export your WordPress content using recommended tool
2. Review the 3 sample posts in `/content/blog/`
3. Copy your migrated posts to `/content/blog/`
4. Update image paths
5. Test locally: `npm run dev`
6. Deploy!

Your blog is now ready for content! 🚀
