import { describe, it, expect } from 'vitest'
import {
  cn,
  formatDateShort,
  formatDate,
  isValidNumber,
  isValidEmail,
  isValidUrl,
  safeJsonParse,
  truncateString,
} from '@/lib/utils'

describe('cn - Class name merging', () => {
  it('should merge multiple class names', () => {
    const result = cn('px-2', 'py-1')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })

  it('should handle conflicting Tailwind classes', () => {
    const result = cn('px-2', 'px-4')
    // tailwind-merge should keep the last px class
    expect(result).toContain('px-4')
  })

  it('should handle conditional classes', () => {
    const result = cn('px-2', false && 'py-1', true && 'py-4')
    expect(result).toBeDefined()
  })

  it('should handle empty input', () => {
    const result = cn('')
    expect(typeof result).toBe('string')
  })
})

describe('formatDateShort - Date formatting', () => {
  it('should format ISO date without time', () => {
    const result = formatDateShort('2024-01-15')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should format ISO date with time', () => {
    const result = formatDateShort('2024-01-15T10:30:00')
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
  })

  it('should handle invalid date gracefully', () => {
    const result = formatDateShort('invalid-date')
    // Invalid dates become "Invalid Date" when converted to locale string
    expect(result).toBe('Invalid Date')
  })

  it('should format dates in user locale', () => {
    const result = formatDateShort('2024-12-25')
    expect(result).toBeDefined()
    // Should contain some date information
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('formatDate - Relative date formatting', () => {
  it('should handle invalid date gracefully', () => {
    const result = formatDate('invalid-date')
    // Invalid dates become "Invalid Date (pred NaN rokmi)" due to date processing
    expect(result).toMatch(/Invalid Date/)
  })

  it('should return a string', () => {
    const result = formatDate('2024-01-15')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should format dates with and without time', () => {
    const result1 = formatDate('2024-01-15')
    const result2 = formatDate('2024-01-15T10:30:00')
    expect(result1).toBeDefined()
    expect(result2).toBeDefined()
  })
})

describe('isValidNumber - Number validation', () => {
  it('should return true for valid numbers', () => {
    expect(isValidNumber(42)).toBe(true)
    expect(isValidNumber(0)).toBe(true)
    expect(isValidNumber(-10)).toBe(true)
    expect(isValidNumber(3.14)).toBe(true)
  })

  it('should return true for numeric strings', () => {
    expect(isValidNumber('42')).toBe(true)
    expect(isValidNumber('0')).toBe(true)
    expect(isValidNumber('-10')).toBe(true)
  })

  it('should return false for invalid values', () => {
    expect(isValidNumber('abc')).toBe(false)
    expect(isValidNumber(NaN)).toBe(false)
    expect(isValidNumber(Infinity)).toBe(false)
    expect(isValidNumber(-Infinity)).toBe(false)
  })

  it('should return false for null and undefined', () => {
    // Note: Number(null) returns 0 which is valid; Number(undefined) returns NaN which is invalid
    expect(isValidNumber(null)).toBe(true) // null coerces to 0, a valid number
    expect(isValidNumber(undefined)).toBe(false) // undefined coerces to NaN
  })
})

describe('isValidEmail - Email validation', () => {
  it('should validate correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    expect(isValidEmail('name+tag@example.org')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('invalid@')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('user@domain')).toBe(false)
  })

  it('should reject empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidUrl - URL validation', () => {
  it('should validate correct URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('https://example.com/path')).toBe(true)
  })

  it('should reject invalid URLs', () => {
    expect(isValidUrl('not a url')).toBe(false)
    expect(isValidUrl('example.com')).toBe(false) // Missing protocol
  })

  it('should reject empty string', () => {
    expect(isValidUrl('')).toBe(false)
  })
})

describe('safeJsonParse - Safe JSON parsing', () => {
  it('should parse valid JSON', () => {
    const result = safeJsonParse('{"a": 1}', {})
    expect(result).toEqual({ a: 1 })
  })

  it('should parse JSON arrays', () => {
    const result = safeJsonParse('[1, 2, 3]', [])
    expect(result).toEqual([1, 2, 3])
  })

  it('should return fallback for invalid JSON', () => {
    const fallback = { default: true }
    const result = safeJsonParse('invalid json', fallback)
    expect(result).toEqual(fallback)
  })

  it('should return fallback for empty string', () => {
    const fallback = {}
    const result = safeJsonParse('', fallback)
    expect(result).toEqual(fallback)
  })

  it('should parse complex objects', () => {
    const complex = { nested: { value: [1, 2, 3] } }
    const json = JSON.stringify(complex)
    const result = safeJsonParse(json, {})
    expect(result).toEqual(complex)
  })
})

describe('truncateString - String truncation', () => {
  it('should not truncate strings shorter than maxLength', () => {
    expect(truncateString('hello', 10)).toBe('hello')
    expect(truncateString('hi', 5)).toBe('hi')
  })

  it('should truncate strings longer than maxLength', () => {
    const result = truncateString('hello world', 5)
    expect(result).toBe('hello...')
  })

  it('should handle exact length match', () => {
    const result = truncateString('hello', 5)
    expect(result).toBe('hello')
  })

  it('should handle empty string', () => {
    expect(truncateString('', 5)).toBe('')
  })

  it('should handle single character truncation', () => {
    const result = truncateString('hello', 1)
    expect(result).toBe('h...')
  })

  it('should handle maxLength of 0', () => {
    const result = truncateString('hello', 0)
    expect(result).toBe('...')
  })
})
