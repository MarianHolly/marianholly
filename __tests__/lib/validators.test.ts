import { describe, it, expect } from 'vitest'
import {
  validateSlug,
  validateArticleMetadata,
  validateTags,
  validateEmail,
  validateUrl,
  validateStringLength,
} from '@/lib/validators'
import { ValidationError } from '@/lib/error-handler'

describe('validateSlug - Slug validation', () => {
  it('should accept valid slugs', () => {
    expect(validateSlug('my-post')).toBe('my-post')
    expect(validateSlug('post-123')).toBe('post-123')
    expect(validateSlug('test_post')).toBe('test_post')
  })

  it('should convert uppercase to lowercase', () => {
    expect(validateSlug('My-Post')).toBe('my-post')
    expect(validateSlug('TEST-SLUG')).toBe('test-slug')
  })

  it('should reject slugs with leading/trailing whitespace', () => {
    // Validation happens before trimming, so whitespace is rejected
    expect(() => validateSlug('  my-post  ')).toThrow(ValidationError)
    expect(() => validateSlug('\nslug\t')).toThrow(ValidationError)
  })

  it('should reject empty slug', () => {
    expect(() => validateSlug('')).toThrow(ValidationError)
    expect(() => validateSlug('   ')).toThrow(ValidationError)
  })

  it('should reject invalid characters', () => {
    expect(() => validateSlug('my post')).toThrow(ValidationError)
    expect(() => validateSlug('post@slug')).toThrow(ValidationError)
    expect(() => validateSlug('../escape')).toThrow(ValidationError)
  })

  it('should reject slugs longer than 100 characters', () => {
    const longSlug = 'a'.repeat(101)
    expect(() => validateSlug(longSlug)).toThrow(ValidationError)
  })

  it('should accept slugs up to 100 characters', () => {
    const maxSlug = 'a-'.repeat(50).slice(0, 100)
    expect(() => validateSlug(maxSlug)).not.toThrow()
  })
})

describe('validateArticleMetadata - Article metadata validation', () => {
  it('should accept valid metadata', () => {
    const metadata = {
      title: 'Test Post',
      publishedAt: '2024-01-15',
    }
    expect(() => validateArticleMetadata(metadata)).not.toThrow()
  })

  it('should reject non-object metadata', () => {
    expect(() => validateArticleMetadata(null)).toThrow(ValidationError)
    expect(() => validateArticleMetadata(undefined)).toThrow(ValidationError)
    expect(() => validateArticleMetadata('string')).toThrow(ValidationError)
  })

  it('should reject missing title', () => {
    expect(() => validateArticleMetadata({ publishedAt: '2024-01-15' })).toThrow(ValidationError)
    expect(() => validateArticleMetadata({ title: '', publishedAt: '2024-01-15' })).toThrow(ValidationError)
  })

  it('should reject missing publishedAt', () => {
    expect(() => validateArticleMetadata({ title: 'Test' })).toThrow(ValidationError)
    expect(() => validateArticleMetadata({ title: 'Test', publishedAt: '' })).toThrow(ValidationError)
  })

  it('should reject invalid date format', () => {
    expect(() => validateArticleMetadata({
      title: 'Test',
      publishedAt: 'not-a-date'
    })).toThrow(ValidationError)
  })

  it('should accept ISO 8601 date format', () => {
    expect(() => validateArticleMetadata({
      title: 'Test',
      publishedAt: '2024-01-15T10:30:00Z'
    })).not.toThrow()
  })
})

describe('validateTags - Tag validation', () => {
  it('should return empty array for null/undefined', () => {
    expect(validateTags(null)).toEqual([])
    expect(validateTags(undefined)).toEqual([])
  })

  it('should convert single string tag to array', () => {
    expect(validateTags('javascript')).toEqual(['javascript'])
    expect(validateTags('React')).toEqual(['react'])
  })

  it('should handle array of tags', () => {
    expect(validateTags(['JavaScript', 'React'])).toEqual(['javascript', 'react'])
  })

  it('should filter empty tags', () => {
    expect(validateTags(['', 'valid', '  ', 'tag'])).toEqual(['valid', 'tag'])
  })

  it('should trim and lowercase tags', () => {
    expect(validateTags(['  JavaScript  ', 'REACT'])).toEqual(['javascript', 'react'])
  })

  it('should return empty array for invalid input types', () => {
    expect(validateTags(123)).toEqual([])
    expect(validateTags({})).toEqual([])
  })

  it('should filter non-string array items', () => {
    expect(validateTags(['valid', 123, 'tag', null] as any)).toEqual(['valid', 'tag'])
  })
})

describe('validateEmail - Email validation', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('user@example.com')).toBe('user@example.com')
    expect(validateEmail('test.user@domain.co.uk')).toBe('test.user@domain.co.uk')
  })

  it('should convert to lowercase', () => {
    expect(validateEmail('User@EXAMPLE.COM')).toBe('user@example.com')
    expect(validateEmail('TEST@DOMAIN.COM')).toBe('test@domain.com')
  })

  it('should reject emails with whitespace', () => {
    // Validation happens before trimming, so whitespace is rejected
    expect(() => validateEmail('  user@example.com  ')).toThrow(ValidationError)
  })

  it('should reject empty email', () => {
    expect(() => validateEmail('')).toThrow(ValidationError)
    expect(() => validateEmail('   ')).toThrow(ValidationError)
  })

  it('should reject invalid email format', () => {
    expect(() => validateEmail('invalid')).toThrow(ValidationError)
    expect(() => validateEmail('user@')).toThrow(ValidationError)
    expect(() => validateEmail('@example.com')).toThrow(ValidationError)
  })
})

describe('validateUrl - URL validation', () => {
  it('should accept valid URLs', () => {
    expect(validateUrl('https://example.com')).toBe('https://example.com')
    expect(validateUrl('http://example.com/path')).toBe('http://example.com/path')
  })

  it('should reject URLs with whitespace', () => {
    // Validation happens before trimming, so whitespace is rejected
    expect(() => validateUrl('  https://example.com  ')).toThrow(ValidationError)
  })

  it('should reject empty URL', () => {
    expect(() => validateUrl('')).toThrow(ValidationError)
    expect(() => validateUrl('   ')).toThrow(ValidationError)
  })

  it('should reject invalid URL format', () => {
    expect(() => validateUrl('not a url')).toThrow(ValidationError)
    expect(() => validateUrl('example.com')).toThrow(ValidationError)
    expect(() => validateUrl('ftp://example.com')).toThrow(ValidationError)
  })

  it('should accept http and https protocols', () => {
    expect(() => validateUrl('http://example.com')).not.toThrow()
    expect(() => validateUrl('https://example.com')).not.toThrow()
  })
})

describe('validateStringLength - String length validation', () => {
  it('should accept strings within length constraints', () => {
    expect(validateStringLength('hello', 1, 10)).toBe('hello')
    expect(validateStringLength('x', 1, 100)).toBe('x')
  })

  it('should use default constraints', () => {
    expect(() => validateStringLength('')).toThrow(ValidationError)
    expect(() => validateStringLength('valid')).not.toThrow()
  })

  it('should reject strings below minimum length', () => {
    expect(() => validateStringLength('x', 2, 10)).toThrow(ValidationError)
    expect(() => validateStringLength('', 1, 100)).toThrow(ValidationError)
  })

  it('should reject strings exceeding maximum length', () => {
    expect(() => validateStringLength('hello', 1, 3)).toThrow(ValidationError)
    expect(() => validateStringLength('x'.repeat(1001), 1, 1000)).toThrow(ValidationError)
  })

  it('should accept strings at exact boundary lengths', () => {
    expect(() => validateStringLength('abc', 3, 3)).not.toThrow()
    expect(() => validateStringLength('x', 1, 1000)).not.toThrow()
  })

  it('should provide custom length limits', () => {
    const str = 'hello'
    expect(() => validateStringLength(str, 0, 5)).not.toThrow()
    expect(() => validateStringLength(str, 6, 10)).toThrow(ValidationError)
  })
})
