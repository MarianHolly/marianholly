import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize"; 
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import type { Article, ArticleMetadata, FullArticle } from "@/lib/types";

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
      // Code highlighting attributes
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

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
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
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

// Interface for the raw frontmatter data
interface RawFrontmatter {
  title?: string;
  subtitle?: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
  tags?: string | string[];
  published?: boolean;
  // Allow other properties but make them unknown instead of any
  [key: string]: unknown;
}

export async function getPost(slug: string): Promise<FullArticle | null> {
  if (!slug || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error('Invalid slug format');
  }

  const filePath = path.join("content", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: rawMetadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  
  // Safely parse and structure the metadata
  const frontmatter = rawMetadata as RawFrontmatter;
  
  const metadata: ArticleMetadata = {
    title: frontmatter.title || 'Untitled',
    subtitle: frontmatter.subtitle,
    publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    summary: frontmatter.summary,
    image: frontmatter.image,
    tags: Array.isArray(frontmatter.tags) 
      ? frontmatter.tags 
      : typeof frontmatter.tags === 'string' 
        ? [frontmatter.tags] 
        : [],
    published: frontmatter.published !== false, // Default to true unless explicitly false
  };
  
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string): Promise<Article[]> {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug);
      if (!post) return null;
      
      // Return Article without source for the list
      return {
        metadata: post.metadata,
        slug: post.slug,
        // Don't include source in the list for better performance
      } as Article;
    })
  );
  
  // Filter out any null posts with proper typing
  return posts.filter((post): post is Article => post !== null);
}

export async function getBlogPosts(): Promise<Article[]> {
  return getAllPosts(path.join(process.cwd(), "content"));
}