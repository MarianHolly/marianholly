import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from '@rehype-pretty/transformers';

export interface BlogMetadata {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags: string[];
  published: boolean;
  [key: string]: unknown; 
}

export interface BlogPost {
  source: string;
  metadata: BlogMetadata;
  slug: string;
}

// Sanitization schema for safe HTML rendering
const sanitizeSchema = {
  allowDuplicateAttributeNames: false,
  allowDuplicateAttributeValues: true,
  allowDoctypes: false,
  tagNames: [
    // Standard HTML tags
    'p', 'div', 'span', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'pre', 'code', 'strong', 'em', 'u', 'strike', 's',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'table', 'thead', 'tbody', 
    'tr', 'th', 'td', 'img', 'a', 'abbr', 'acronym', 'address',
    // Code highlighting specific tags
    'figure', 'figcaption'
  ],
  attributes: {
    '*': [
      'className', 'id', 'style', 'title', 'lang', 'dir',
      'data-*', 'data-line', 'data-theme', 'data-line-numbers',
      'data-line-numbers-max-digits'
    ],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
    pre: ['tabIndex'],
    code: ['className', 'data-*'],
    span: ['style', 'className', 'data-*'],
    div: ['className', 'data-*']
  },
  protocols: {
    href: ['http', 'https', 'mailto', 'tel', '#'],
    src: ['http', 'https', 'data']
  }
};

// Get all MDX files in a directory
function getMDXFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

// Convert Markdown to HTML using unified.js
export async function markdownToHTML(markdown: string): Promise<string> {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype) 
      .use(rehypePrettyCode, {
        theme: {
          light: "one-dark-pro",
          dark: "one-dark-pro",
        },
        transformers: [
          transformerCopyButton({
            visibility: 'always',
            feedbackDuration: 3_000,
          }),
        ],
        keepBackground: false,
      })
      .use(rehypeSanitize, sanitizeSchema)
      .use(rehypeStringify);

    const result = await processor.process(markdown);
    return result.toString();
  } catch (error) {
    console.error('Error processing markdown:', error);
    throw new Error('Failed to process markdown content');
  }
}

// Get a single post by its slug
export async function getPost(slug: string): Promise<BlogPost | null> {
  // Validate slug to prevent directory traversal and injection
  if (!slug || typeof slug !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error('Invalid slug format');
  }

  try {
    const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
    
    // Check if file exists and is readable
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { content: rawContent, data } = matter(source);
    
    // Validate and type the metadata
    const metadata: BlogMetadata = {
      title: String(data.title || ''),
      subtitle: data.subtitle ? String(data.subtitle) : undefined,
      publishedAt: String(data.publishedAt || ''),
      summary: String(data.summary || ''),
      image: data.image ? String(data.image) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      published: Boolean(data.published),
      ...data // Include any additional frontmatter fields
    };

    // Validate required fields
    if (!metadata.title || !metadata.publishedAt) {
      throw new Error(`Missing required metadata in ${slug}.mdx`);
    }

    const content = await markdownToHTML(rawContent);
    
    return {
      source: content,
      metadata,
      slug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    if (error instanceof Error && error.message.includes('Invalid slug')) {
      throw error; 
    }
    return null;
  }
}

// Get all posts in a directory
async function getAllPosts(dir: string): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  const posts: BlogPost[] = [];

  // Process posts sequentially to avoid overwhelming the system
  for (const file of mdxFiles) {
    try {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug);
      if (post) {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  return posts;
}

// Get all posts in the content directory
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const contentDir = path.join(process.cwd(), "content");
    return await getAllPosts(contentDir);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}