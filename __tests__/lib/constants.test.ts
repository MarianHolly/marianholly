import { describe, it, expect } from 'vitest'
import {
  ANIMATION,
  DATE_FORMAT,
  VALIDATION,
  UI,
  CONTENT,
  DEFAULTS,
} from '@/lib/constants'

describe('ANIMATION constants', () => {
  it('should define animation delays', () => {
    expect(ANIMATION.BLUR_FADE_DELAY).toBe(0.04)
    expect(ANIMATION.BLUR_FADE_TEXT_DELAY).toBe(0.08)
    expect(ANIMATION.TRANSITION_DURATION).toBe(0.15)
    expect(ANIMATION.STAGGER_DELAY).toBe(0.12)
  })

  it('should have positive delay values', () => {
    expect(ANIMATION.BLUR_FADE_DELAY).toBeGreaterThan(0)
    expect(ANIMATION.BLUR_FADE_TEXT_DELAY).toBeGreaterThan(0)
    expect(ANIMATION.TRANSITION_DURATION).toBeGreaterThan(0)
    expect(ANIMATION.STAGGER_DELAY).toBeGreaterThan(0)
  })
})

describe('DATE_FORMAT constants', () => {
  it('should define locale for date formatting', () => {
    expect(DATE_FORMAT.LOCALE).toBe('sk-SK')
  })

  it('should define date thresholds for relative dates', () => {
    expect(DATE_FORMAT.THRESHOLD_DAYS.TODAY).toBe(1)
    expect(DATE_FORMAT.THRESHOLD_DAYS.YESTERDAY).toBe(2)
    expect(DATE_FORMAT.THRESHOLD_DAYS.DAY_BEFORE_YESTERDAY).toBe(3)
    expect(DATE_FORMAT.THRESHOLD_DAYS.THIS_WEEK).toBe(7)
    expect(DATE_FORMAT.THRESHOLD_DAYS.TWO_WEEKS).toBe(14)
    expect(DATE_FORMAT.THRESHOLD_DAYS.THIS_MONTH).toBe(30)
    expect(DATE_FORMAT.THRESHOLD_DAYS.TWO_MONTHS).toBe(60)
    expect(DATE_FORMAT.THRESHOLD_DAYS.THIS_YEAR).toBe(365)
    expect(DATE_FORMAT.THRESHOLD_DAYS.TWO_YEARS).toBe(730)
  })

  it('should have increasing threshold days', () => {
    const thresholds = DATE_FORMAT.THRESHOLD_DAYS
    expect(thresholds.TODAY).toBeLessThan(thresholds.YESTERDAY)
    expect(thresholds.YESTERDAY).toBeLessThan(thresholds.DAY_BEFORE_YESTERDAY)
    expect(thresholds.DAY_BEFORE_YESTERDAY).toBeLessThan(thresholds.THIS_WEEK)
    expect(thresholds.THIS_WEEK).toBeLessThan(thresholds.TWO_WEEKS)
    expect(thresholds.TWO_WEEKS).toBeLessThan(thresholds.THIS_MONTH)
  })
})

describe('VALIDATION constants', () => {
  it('should define regex patterns for validation', () => {
    expect(VALIDATION.SLUG_PATTERN).toBeInstanceOf(RegExp)
    expect(VALIDATION.EMAIL_PATTERN).toBeInstanceOf(RegExp)
    expect(VALIDATION.URL_PATTERN).toBeInstanceOf(RegExp)
  })

  it('should validate slugs correctly', () => {
    expect(VALIDATION.SLUG_PATTERN.test('my-post')).toBe(true)
    expect(VALIDATION.SLUG_PATTERN.test('post_123')).toBe(true)
    expect(VALIDATION.SLUG_PATTERN.test('My-Post')).toBe(true)
    expect(VALIDATION.SLUG_PATTERN.test('my post')).toBe(false)
    expect(VALIDATION.SLUG_PATTERN.test('../escape')).toBe(false)
  })

  it('should validate emails correctly', () => {
    expect(VALIDATION.EMAIL_PATTERN.test('user@example.com')).toBe(true)
    expect(VALIDATION.EMAIL_PATTERN.test('test.user@domain.co.uk')).toBe(true)
    expect(VALIDATION.EMAIL_PATTERN.test('invalid')).toBe(false)
    expect(VALIDATION.EMAIL_PATTERN.test('user@')).toBe(false)
  })

  it('should validate URLs correctly', () => {
    expect(VALIDATION.URL_PATTERN.test('https://example.com')).toBe(true)
    expect(VALIDATION.URL_PATTERN.test('http://example.com')).toBe(true)
    expect(VALIDATION.URL_PATTERN.test('ftp://example.com')).toBe(false)
    expect(VALIDATION.URL_PATTERN.test('example.com')).toBe(false)
  })
})

describe('UI constants', () => {
  it('should define container width class', () => {
    expect(UI.CONTAINER_MAX_WIDTH).toBe('max-w-2xl')
  })

  it('should define prose class for markdown content', () => {
    expect(UI.PROSE_CLASS).toContain('prose')
    expect(UI.PROSE_CLASS).toContain('dark:prose-invert')
    expect(UI.PROSE_CLASS).toContain('max-w-3xl')
  })

  it('should define button icon size', () => {
    expect(UI.BUTTON_ICON_SIZE).toBe('h-5 w-5')
  })
})

describe('CONTENT constants', () => {
  it('should define content directory and extension', () => {
    expect(CONTENT.MDX_EXTENSION).toBe('.mdx')
    expect(CONTENT.CONTENT_DIR).toBe('content')
  })

  it('should define blog routes', () => {
    expect(CONTENT.BLOG_ROUTE).toBe('/blog')
    expect(CONTENT.HOME_ROUTE).toBe('/')
  })

  it('should define pagination limit', () => {
    expect(CONTENT.PAGINATION_LIMIT).toBe(10)
  })

  it('should have valid routes', () => {
    expect(CONTENT.BLOG_ROUTE).toMatch(/^\//)
    expect(CONTENT.HOME_ROUTE).toMatch(/^\//)
  })
})

describe('DEFAULTS constants', () => {
  it('should define default theme', () => {
    expect(DEFAULTS.THEME).toBe('system')
  })

  it('should define default sort order', () => {
    expect(DEFAULTS.SORT_ORDER).toBe('desc')
  })

  it('should define items per page', () => {
    expect(DEFAULTS.ITEMS_PER_PAGE).toBe(20)
  })

  it('should have positive items per page', () => {
    expect(DEFAULTS.ITEMS_PER_PAGE).toBeGreaterThan(0)
  })
})
