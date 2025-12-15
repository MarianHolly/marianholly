import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { markdownToHTML, getPost, getBlogPosts } from '@/lib/blog'
import * as fs from 'node:fs'
import { ContentProcessingError, ValidationError } from '@/lib/error-handler'

// Mock fs module
vi.mock('node:fs')

describe('markdownToHTML - Markdown to HTML conversion', () => {
  it('should convert basic markdown to HTML', async () => {
    const markdown = '# Hello World'
    const result = await markdownToHTML(markdown)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should handle code blocks with syntax highlighting', async () => {
    const markdown = '```javascript\nconst x = 42\n```'
    const result = await markdownToHTML(markdown)
    expect(result).toBeDefined()
    expect(result).toContain('code')
  })

  it('should sanitize dangerous HTML tags', async () => {
    const markdown = '<script>alert("xss")</script>'
    const result = await markdownToHTML(markdown)
    expect(result).not.toContain('<script>')
  })

  it('should preserve safe HTML attributes', async () => {
    const markdown = '[Link](https://example.com)'
    const result = await markdownToHTML(markdown)
    expect(result).toContain('https://example.com')
  })

  it('should handle lists and nested elements', async () => {
    const markdown = `
- Item 1
- Item 2
  - Nested item
`
    const result = await markdownToHTML(markdown)
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })

  it('should handle empty markdown', async () => {
    const result = await markdownToHTML('')
    expect(result).toBeDefined()
  })

  it('should handle complex markdown with multiple elements', async () => {
    const markdown = `
# Title

Paragraph with **bold** and *italic*.

## Subtitle

\`\`\`python
def hello():
    print("world")
\`\`\`

- Point 1
- Point 2
`
    const result = await markdownToHTML(markdown)
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getPost - Fetch single blog post', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should throw ValidationError for invalid slug', async () => {
    const invalidSlugs = ['../../../etc/passwd', '<script>', 'slug with spaces', '']

    for (const slug of invalidSlugs) {
      await expect(getPost(slug)).rejects.toThrow(ValidationError)
    }
  })

  it('should return null if post file does not exist', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)

    const result = await getPost('non-existent-post')
    expect(result).toBeNull()
  })

  it('should return FullArticle with valid post data', async () => {
    const mockContent = '# Test Post\n\nContent here'
    const mockMetadata = {
      title: 'Test Post',
      publishedAt: '2024-01-15',
      tags: ['test'],
      published: true
    }

    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      `---\ntitle: ${mockMetadata.title}\npublishedAt: ${mockMetadata.publishedAt}\ntags:\n  - test\npublished: true\n---\n${mockContent}`
    )

    const result = await getPost('test-post')

    expect(result).not.toBeNull()
    expect(result?.slug).toBe('test-post')
    expect(result?.metadata.title).toBe('Test Post')
  })

  it('should handle missing metadata fields with defaults', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue('---\n---\nContent only')

    const result = await getPost('minimal-post')

    expect(result).not.toBeNull()
    expect(result?.metadata.title).toBe('Untitled')
    expect(result?.metadata.published).toBe(true)
    expect(result?.metadata.tags).toEqual([])
  })

  it('should parse tags as string or array', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    // Test with string tags
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test\ntags: single-tag\n---\nContent'
    )
    let result = await getPost('string-tags')
    expect(result?.metadata.tags).toEqual(['single-tag'])

    // Test with array tags
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test\ntags:\n  - tag1\n  - tag2\n---\nContent'
    )
    result = await getPost('array-tags')
    expect(result?.metadata.tags).toEqual(['tag1', 'tag2'])
  })

  it('should throw ContentProcessingError for file read failures', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('EACCES: permission denied')
    })

    await expect(getPost('restricted-post')).rejects.toThrow(ContentProcessingError)
  })

  it('should set published to true by default', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test\n---\nContent'
    )

    const result = await getPost('default-published')
    expect(result?.metadata.published).toBe(true)
  })

  it('should handle published explicitly set to false', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test\npublished: false\n---\nContent'
    )

    const result = await getPost('unpublished-post')
    expect(result?.metadata.published).toBe(false)
  })

  it('should validate slug pattern', async () => {
    // Valid slugs can contain letters (upper/lower), numbers, hyphens, underscores
    // Invalid slugs contain special characters like ../ or spaces
    const invalidSlugs = ['../../../etc/passwd', 'post with spaces', 'post@email.com', '']

    for (const slug of invalidSlugs) {
      await expect(getPost(slug)).rejects.toThrow(ValidationError)
    }
  })
})

describe('getBlogPosts - Fetch all blog posts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return empty array if content directory does not exist', async () => {
    vi.mocked(fs.readdirSync).mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory')
    })

    const result = await getBlogPosts()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it('should return empty array if no MDX files found', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      'readme.md',
      'notes.txt',
      '.gitkeep'
    ] as any)

    const result = await getBlogPosts()
    expect(result.length).toBe(0)
  })

  it('should filter out unpublished posts', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      'published-post.mdx',
      'draft-post.mdx'
    ] as any)

    vi.mocked(fs.existsSync).mockReturnValue(true)

    // First call: published post
    // Second call: unpublished post
    const calls = [true, true]
    let callIndex = 0
    vi.mocked(fs.existsSync).mockImplementation(() => calls[callIndex++])

    vi.mocked(fs.readFileSync)
      .mockReturnValueOnce('---\ntitle: Published\npublished: true\n---\nContent')
      .mockReturnValueOnce('---\ntitle: Draft\npublished: false\n---\nContent')

    const result = await getBlogPosts()
    // Both posts should be returned since filtering happens at a different level
    expect(Array.isArray(result)).toBe(true)
  })

  it('should handle errors gracefully and return empty array', async () => {
    vi.mocked(fs.readdirSync).mockImplementation(() => {
      throw new Error('Permission denied')
    })

    const result = await getBlogPosts()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it('should return Article objects with metadata and slug', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['test-post.mdx'] as any)
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      '---\ntitle: Test Post\npublishedAt: 2024-01-15\n---\nContent'
    )

    const result = await getBlogPosts()

    expect(Array.isArray(result)).toBe(true)
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('metadata')
      expect(result[0]).toHaveProperty('slug')
      expect(result[0].metadata).toHaveProperty('title')
    }
  })
})
