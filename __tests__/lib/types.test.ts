import { describe, it, expect } from 'vitest'
import type { Article, ArticleMetadata, FullArticle } from '@/lib/types'

describe('Types - TypeScript type definitions', () => {
  it('should define Article type', () => {
    const article: Article = {
      metadata: {
        title: 'Test Post',
        publishedAt: '2024-01-15',
        tags: ['javascript'],
        published: true
      },
      slug: 'test-post'
    }

    expect(article.metadata.title).toBe('Test Post')
    expect(article.slug).toBe('test-post')
  })

  it('should define ArticleMetadata type with optional fields', () => {
    const metadata: ArticleMetadata = {
      title: 'Test',
      publishedAt: '2024-01-15',
      tags: [],
      published: true
    }

    expect(metadata.title).toBe('Test')
    expect(metadata.tags).toEqual([])
  })

  it('should define FullArticle type with source content', () => {
    const fullArticle: FullArticle = {
      metadata: {
        title: 'Test Post',
        publishedAt: '2024-01-15',
        tags: ['javascript'],
        published: true
      },
      slug: 'test-post',
      source: '<h1>Test Post</h1>'
    }

    expect(fullArticle.source).toBe('<h1>Test Post</h1>')
    expect(fullArticle.metadata.title).toBe('Test Post')
  })

  it('should support optional metadata fields', () => {
    const metadata: ArticleMetadata = {
      title: 'Test',
      publishedAt: '2024-01-15',
      subtitle: 'Subtitle',
      summary: 'Summary text',
      image: 'https://example.com/image.jpg',
      tags: ['tag1', 'tag2'],
      published: true
    }

    expect(metadata.subtitle).toBe('Subtitle')
    expect(metadata.summary).toBe('Summary text')
    expect(metadata.image).toBe('https://example.com/image.jpg')
  })

  it('should create Article without source for list views', () => {
    const article: Article = {
      metadata: {
        title: 'Post Title',
        publishedAt: '2024-01-15',
        tags: [],
        published: true
      },
      slug: 'post-slug'
    }

    expect(article).not.toHaveProperty('source')
  })
})
