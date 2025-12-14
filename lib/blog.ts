import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import type { Article, ArticleMetadata, FullArticle } from "@/lib/types";
import { VALIDATION, CONTENT } from "@/lib/constants";
import {
  ValidationError,
  FileSystemError,
  ContentProcessingError,
  logError,
} from "@/lib/error-handler";

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

/**
 * Get all MDX files from a directory
 * @throws FileSystemError if directory cannot be read
 */
function getMDXFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === CONTENT.MDX_EXTENSION);
  } catch (error) {
    logError(error, `Failed to read MDX files from ${dir}`);
    throw new FileSystemError(`Cannot read content directory: ${dir}`);
  }
}

/**
 * Convert markdown to sanitized HTML with syntax highlighting
 * @param markdown - Raw markdown string
 * @returns HTML string with syntax highlighting and sanitization
 * @throws ContentProcessingError if markdown processing fails
 */
export async function markdownToHTML(markdown: string): Promise<string> {
  try {
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
            visibility: "always",
            feedbackDuration: 3_000,
          }),
        ],
        keepBackground: false,
      })
      .use(rehypeSanitize, sanitizeSchema)
      .use(rehypeStringify)
      .process(markdown);

    return p.toString();
  } catch (error) {
    logError(error, "Failed to convert markdown to HTML");
    throw new ContentProcessingError("Failed to process markdown content", error);
  }
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

/**
 * Get a single blog post by slug
 * @param slug - URL-friendly post identifier
 * @returns FullArticle object or null if post not found
 * @throws ValidationError if slug format is invalid
 * @throws ContentProcessingError if markdown processing fails
 * @throws FileSystemError if file cannot be read
 */
export async function getPost(slug: string): Promise<FullArticle | null> {
  if (!slug || !VALIDATION.SLUG_PATTERN.test(slug)) {
    throw new ValidationError(`Invalid slug format: ${slug}`);
  }

  try {
    const filePath = path.join(CONTENT.CONTENT_DIR, `${slug}${CONTENT.MDX_EXTENSION}`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { content: rawContent, data: rawMetadata } = matter(source);
    const content = await markdownToHTML(rawContent);

    // Safely parse and structure the metadata
    const frontmatter = rawMetadata as RawFrontmatter;

    const metadata: ArticleMetadata = {
      title: frontmatter.title || "Untitled",
      subtitle: frontmatter.subtitle,
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      summary: frontmatter.summary,
      image: frontmatter.image,
      tags: Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : typeof frontmatter.tags === "string"
          ? [frontmatter.tags]
          : [],
      published: frontmatter.published !== false, // Default to true unless explicitly false
    };

    return {
      source: content,
      metadata,
      slug,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    logError(error, `Failed to process MDX for slug: ${slug}`);
    throw new ContentProcessingError(
      `Failed to process blog post: ${slug}`,
      error
    );
  }
}

/**
 * Get all published blog posts from a directory
 * @param dir - Directory containing MDX files
 * @returns Array of Article objects
 */
async function getAllPosts(dir: string): Promise<Article[]> {
  try {
    const mdxFiles = getMDXFiles(dir);
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = path.basename(file, path.extname(file));
        try {
          const post = await getPost(slug);
          if (!post) return null;

          // Return Article without source for the list
          return {
            metadata: post.metadata,
            slug: post.slug,
            // Don't include source in the list for better performance
          } as Article;
        } catch (error) {
          logError(error, `Failed to load post: ${slug}`);
          return null;
        }
      })
    );

    // Filter out any null posts with proper typing
    return posts.filter((post): post is Article => post !== null);
  } catch (error) {
    logError(error, "Failed to get all posts");
    // Return empty array instead of crashing
    console.warn("Using empty article list due to content loading error");
    return [];
  }
}

/**
 * Get all published blog posts from the content directory
 * @returns Array of Article objects, empty array if loading fails
 */
export async function getBlogPosts(): Promise<Article[]> {
  return getAllPosts(path.join(process.cwd(), CONTENT.CONTENT_DIR));
}