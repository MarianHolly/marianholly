import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  ApplicationError,
  ValidationError,
  NotFoundError,
  ContentProcessingError,
  FileSystemError,
  logError,
  safeAsync,
  isApplicationError,
  getUserFriendlyErrorMessage,
} from '@/lib/error-handler'

describe('ApplicationError - Base error class', () => {
  it('should create an ApplicationError with message', () => {
    const error = new ApplicationError('Test error', 'TEST_ERROR', 500)
    expect(error.message).toBe('Test error')
    expect(error.code).toBe('TEST_ERROR')
    expect(error.statusCode).toBe(500)
    expect(error.name).toBe('ApplicationError')
  })

  it('should extend Error class', () => {
    const error = new ApplicationError('Test', 'TEST', 500)
    expect(error instanceof Error).toBe(true)
  })

  it('should use default statusCode of 500', () => {
    const error = new ApplicationError('Test', 'TEST')
    expect(error.statusCode).toBe(500)
  })
})

describe('ValidationError - Validation error class', () => {
  it('should create ValidationError with correct properties', () => {
    const error = new ValidationError('Invalid input')
    expect(error.message).toBe('Invalid input')
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.statusCode).toBe(400)
    expect(error.name).toBe('ValidationError')
  })

  it('should extend ApplicationError', () => {
    const error = new ValidationError('Test')
    expect(error instanceof ApplicationError).toBe(true)
    expect(error instanceof Error).toBe(true)
  })
})

describe('NotFoundError - Not found error class', () => {
  it('should create NotFoundError with default message', () => {
    const error = new NotFoundError()
    expect(error.message).toBe('Resource not found')
    expect(error.code).toBe('NOT_FOUND')
    expect(error.statusCode).toBe(404)
    expect(error.name).toBe('NotFoundError')
  })

  it('should create NotFoundError with custom message', () => {
    const error = new NotFoundError('User not found')
    expect(error.message).toBe('User not found')
    expect(error.code).toBe('NOT_FOUND')
    expect(error.statusCode).toBe(404)
  })
})

describe('ContentProcessingError - Content processing error class', () => {
  it('should create ContentProcessingError with message', () => {
    const error = new ContentProcessingError('Failed to process content')
    expect(error.message).toBe('Failed to process content')
    expect(error.code).toBe('CONTENT_PROCESSING_ERROR')
    expect(error.statusCode).toBe(500)
    expect(error.name).toBe('ContentProcessingError')
  })

  it('should capture original error', () => {
    const originalError = new Error('Original')
    const error = new ContentProcessingError('Failed', originalError)
    expect(error.originalError).toBe(originalError)
  })
})

describe('FileSystemError - File system error class', () => {
  it('should create FileSystemError with message', () => {
    const error = new FileSystemError('Cannot read file')
    expect(error.message).toBe('Cannot read file')
    expect(error.code).toBe('FILE_SYSTEM_ERROR')
    expect(error.statusCode).toBe(500)
    expect(error.name).toBe('FileSystemError')
  })

  it('should capture original error', () => {
    const originalError = new Error('EACCES: permission denied')
    const error = new FileSystemError('Failed to read', originalError)
    expect(error.originalError).toBe(originalError)
  })
})

describe('logError - Error logging', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should log error with context in development', () => {
    process.env.NODE_ENV = 'development'
    const error = new Error('Test error')
    logError(error, 'TestContext')
    expect(console.error).toHaveBeenCalled()
  })

  it('should log error without context', () => {
    process.env.NODE_ENV = 'development'
    const error = new Error('Test error')
    logError(error)
    expect(console.error).toHaveBeenCalled()
  })

  it('should handle non-Error types', () => {
    process.env.NODE_ENV = 'development'
    logError('String error', 'Context')
    expect(console.error).toHaveBeenCalled()
  })

  it('should log different types in production vs development', () => {
    // In production, it should only log the message
    process.env.NODE_ENV = 'production'
    const error = new Error('Test error')
    logError(error, 'TestContext')
    expect(console.error).toHaveBeenCalled()
  })
})

describe('safeAsync - Safe async error handling', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return resolved promise value', async () => {
    const promise = Promise.resolve('success')
    const result = await safeAsync(promise, 'fallback')
    expect(result).toBe('success')
  })

  it('should return fallback on rejected promise', async () => {
    const promise = Promise.reject(new Error('Failed'))
    const result = await safeAsync(promise, 'fallback')
    expect(result).toBe('fallback')
  })

  it('should log error when promise rejects', async () => {
    const promise = Promise.reject(new Error('Test error'))
    await safeAsync(promise, 'fallback', 'TestContext')
    expect(console.error).toHaveBeenCalled()
  })

  it('should handle different fallback types', async () => {
    const numberPromise = Promise.reject(new Error('Failed'))
    const numberResult = await safeAsync(numberPromise, 0)
    expect(numberResult).toBe(0)

    const arrayPromise = Promise.reject(new Error('Failed'))
    const arrayResult = await safeAsync(arrayPromise, [])
    expect(arrayResult).toEqual([])
  })
})

describe('isApplicationError - Type guard', () => {
  it('should return true for ApplicationError instances', () => {
    const error = new ApplicationError('Test', 'TEST', 500)
    expect(isApplicationError(error)).toBe(true)
  })

  it('should return true for ValidationError instances', () => {
    const error = new ValidationError('Test')
    expect(isApplicationError(error)).toBe(true)
  })

  it('should return true for NotFoundError instances', () => {
    const error = new NotFoundError()
    expect(isApplicationError(error)).toBe(true)
  })

  it('should return false for regular Error instances', () => {
    const error = new Error('Test')
    expect(isApplicationError(error)).toBe(false)
  })

  it('should return false for non-Error types', () => {
    expect(isApplicationError('string')).toBe(false)
    expect(isApplicationError(123)).toBe(false)
    expect(isApplicationError(null)).toBe(false)
    expect(isApplicationError(undefined)).toBe(false)
  })
})

describe('getUserFriendlyErrorMessage - User friendly error messages', () => {
  it('should return ApplicationError message as-is', () => {
    const error = new ValidationError('Invalid email')
    const message = getUserFriendlyErrorMessage(error)
    expect(message).toBe('Invalid email')
  })

  it('should return NotFoundError message as-is', () => {
    const error = new NotFoundError('User not found')
    const message = getUserFriendlyErrorMessage(error)
    expect(message).toBe('User not found')
  })

  it('should hide regular Error message from users', () => {
    const error = new Error('EACCES: permission denied')
    const message = getUserFriendlyErrorMessage(error)
    expect(message).toBe('An unexpected error occurred. Please try again later.')
  })

  it('should handle unknown error types', () => {
    const message = getUserFriendlyErrorMessage('unknown')
    expect(message).toBe('Unknown error occurred.')
  })

  it('should handle null and undefined', () => {
    expect(getUserFriendlyErrorMessage(null)).toBe('Unknown error occurred.')
    expect(getUserFriendlyErrorMessage(undefined)).toBe('Unknown error occurred.')
  })
})
