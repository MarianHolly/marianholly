/**
 * Custom error classes for better error handling
 */

export class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class ContentProcessingError extends ApplicationError {
  constructor(message: string, public originalError?: unknown) {
    super(message, "CONTENT_PROCESSING_ERROR", 500);
    this.name = "ContentProcessingError";
  }
}

export class FileSystemError extends ApplicationError {
  constructor(message: string, public originalError?: unknown) {
    super(message, "FILE_SYSTEM_ERROR", 500);
    this.name = "FileSystemError";
  }
}

/**
 * Safe error logging (doesn't expose sensitive info)
 */
export function logError(error: unknown, context?: string): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const timestamp = new Date().toISOString();

  if (process.env.NODE_ENV === "development") {
    console.error(`[${timestamp}] ${context || "Error"}:`, error);
  } else {
    console.error(`[${timestamp}] ${context || "Error"}: ${errorMessage}`);
  }
}

/**
 * Handle async errors gracefully
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  fallback: T,
  context?: string
): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    logError(error, context);
    return fallback;
  }
}

/**
 * Type guard for ApplicationError
 */
export function isApplicationError(error: unknown): error is ApplicationError {
  return error instanceof ApplicationError;
}

/**
 * Format error message for user display (safe)
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (isApplicationError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    // Don't expose system errors to users
    return "An unexpected error occurred. Please try again later.";
  }

  return "Unknown error occurred.";
}
