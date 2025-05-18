import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize"; 
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from '@rehype-pretty/transformers'

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

export async function getPost(slug: string) {
  if (!slug || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error('Invalid slug format');
  }

  const filePath = path.join("content", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
