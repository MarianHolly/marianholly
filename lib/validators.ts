import { VALIDATION } from "@/lib/constants";
import { ValidationError } from "@/lib/error-handler";

/**
 * Validate and sanitize blog post slug
 * @param slug - Slug to validate
 * @throws ValidationError if invalid
 * @returns Validated slug in lowercase
 * @example
 * validateSlug("my-post") // returns "my-post"
 * validateSlug("") // throws ValidationError
 */
export function validateSlug(slug: string): string {
  if (!slug) {
    throw new ValidationError("Slug cannot be empty");
  }

  if (!VALIDATION.SLUG_PATTERN.test(slug)) {
    throw new ValidationError(
      `Invalid slug format. Only alphanumeric characters, hyphens, and underscores allowed. Got: ${slug}`
    );
  }

  if (slug.length > 100) {
    throw new ValidationError("Slug cannot be longer than 100 characters");
  }

  return slug.toLowerCase().trim();
}

/**
 * Validate blog post metadata
 * @param metadata - Metadata object to validate
 * @throws ValidationError if invalid
 * @example
 * validateArticleMetadata({ title: "My Post", publishedAt: "2024-01-01" });
 */
export function validateArticleMetadata(
  metadata: unknown
): asserts metadata is Record<string, unknown> {
  if (!metadata || typeof metadata !== "object") {
    throw new ValidationError("Metadata must be an object");
  }

  const meta = metadata as Record<string, unknown>;

  if (typeof meta.title !== "string" || !meta.title.trim()) {
    throw new ValidationError("Article must have a valid title");
  }

  if (typeof meta.publishedAt !== "string" || !meta.publishedAt.trim()) {
    throw new ValidationError("Article must have a valid publishedAt date");
  }

  // Validate date format (ISO 8601)
  const date = new Date(meta.publishedAt);
  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(`Invalid date format: ${meta.publishedAt}`);
  }
}

/**
 * Validate article tags
 * @param tags - Tags to validate
 * @returns Validated tags array (lowercase, trimmed)
 * @example
 * validateTags("javascript") // returns ["javascript"]
 * validateTags(["React", "TypeScript"]) // returns ["react", "typescript"]
 * validateTags(null) // returns []
 */
export function validateTags(tags: unknown): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .filter((tag) => typeof tag === "string" && tag.trim())
      .map((tag) => tag.trim().toLowerCase());
  }

  if (typeof tags === "string") {
    return [tags.trim().toLowerCase()];
  }

  return [];
}

/**
 * Validate email address
 * @param email - Email to validate
 * @throws ValidationError if invalid
 * @returns Validated email in lowercase
 * @example
 * validateEmail("user@example.com") // returns "user@example.com"
 * validateEmail("") // throws ValidationError
 */
export function validateEmail(email: string): string {
  if (!email || !email.trim()) {
    throw new ValidationError("Email cannot be empty");
  }

  if (!VALIDATION.EMAIL_PATTERN.test(email)) {
    throw new ValidationError("Invalid email format");
  }

  return email.trim().toLowerCase();
}

/**
 * Validate URL
 * @param url - URL to validate
 * @throws ValidationError if invalid
 * @returns Validated URL
 * @example
 * validateUrl("https://example.com") // returns "https://example.com"
 * validateUrl("") // throws ValidationError
 */
export function validateUrl(url: string): string {
  if (!url || !url.trim()) {
    throw new ValidationError("URL cannot be empty");
  }

  if (!VALIDATION.URL_PATTERN.test(url)) {
    throw new ValidationError("Invalid URL format");
  }

  return url.trim();
}

/**
 * Validate string length
 * @param str - String to validate
 * @param min - Minimum length (default 1)
 * @param max - Maximum length (default 1000)
 * @throws ValidationError if invalid
 * @returns Validated string
 * @example
 * validateStringLength("hello", 1, 10) // returns "hello"
 * validateStringLength("x", 2, 10) // throws ValidationError
 */
export function validateStringLength(
  str: string,
  min: number = 1,
  max: number = 1000
): string {
  if (str.length < min) {
    throw new ValidationError(`String must be at least ${min} characters`);
  }

  if (str.length > max) {
    throw new ValidationError(`String cannot exceed ${max} characters`);
  }

  return str;
}
