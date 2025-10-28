# Code Quality Implementation Plan

**Purpose**: Improve code quality, maintainability, and robustness without major architectural changes
**Timeline**: 2-3 weeks (can be done in parallel with testing)
**Priority**: High - Foundation for all other improvements

---

## Phase 1: Project Setup & Configuration (2-3 hours)

### 1.1 Add ESLint Rules Enhancement

**Current State**: Minimal ESLint config
**Goal**: Add comprehensive linting rules

**File to Edit**: `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "no-eval": "error",
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "curly": "error",
    "brace-style": ["error", "1tbs"],
    "no-trailing-spaces": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "comma-spacing": "error",
    "keyword-spacing": "error",
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never" }],
    "arrow-spacing": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-types": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "react/display-name": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "overrides": [
    {
      "files": ["**/*.test.ts", "**/*.test.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

**Steps**:
1. Update `.eslintrc.json` with rules above
2. Run `pnpm lint` to identify issues
3. Run `pnpm lint --fix` to auto-fix issues
4. Commit: "style: add comprehensive ESLint rules"

---

### 1.2 Create Constants File

**Purpose**: Extract magic numbers and strings
**File to Create**: `lib/constants.ts`

```typescript
// Animation constants
export const ANIMATION = {
  BLUR_FADE_DELAY: 0.04,
  BLUR_FADE_TEXT_DELAY: 0.08,
  TRANSITION_DURATION: 0.15,
  STAGGER_DELAY: 0.12,
} as const;

// Date formatting constants
export const DATE_FORMAT = {
  LOCALE: "sk-SK",
  THRESHOLD_DAYS: {
    TODAY: 1,
    YESTERDAY: 2,
    DAY_BEFORE_YESTERDAY: 3,
    THIS_WEEK: 7,
    TWO_WEEKS: 14,
    THIS_MONTH: 30,
    TWO_MONTHS: 60,
    THIS_YEAR: 365,
    TWO_YEARS: 730,
  },
} as const;

// Validation constants
export const VALIDATION = {
  SLUG_PATTERN: /^[a-zA-Z0-9_-]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_PATTERN: /^https?:\/\/.+/,
} as const;

// UI constants
export const UI = {
  CONTAINER_MAX_WIDTH: "max-w-2xl",
  PROSE_CLASS: "prose dark:prose-invert max-w-3xl mx-auto text-sm",
  BUTTON_ICON_SIZE: "h-5 w-5",
} as const;

// API/Content constants
export const CONTENT = {
  MDX_EXTENSION: ".mdx",
  CONTENT_DIR: "content",
  BLOG_ROUTE: "/blog",
  HOME_ROUTE: "/",
  PAGINATION_LIMIT: 10,
} as const;

// Application defaults
export const DEFAULTS = {
  THEME: "system" as const,
  SORT_ORDER: "desc" as const,
  ITEMS_PER_PAGE: 20,
} as const;
```

**Steps**:
1. Create `lib/constants.ts` with content above
2. Update files to use constants:
   - `components/article-list.tsx` - ANIMATION, VALIDATION
   - `components/article-wrapper.tsx` - ANIMATION, DEFAULTS
   - `app/page.tsx` - ANIMATION, UI
   - `lib/utils.ts` - DATE_FORMAT, VALIDATION
3. Update imports in each file
4. Run linter to verify
5. Commit: "refactor: extract magic constants to constants file"

---

### 1.3 Create Error Handling Utilities

**File to Create**: `lib/error-handler.ts`

```typescript
/**
 * Custom error classes for better error handling
 */

export class ApplicationError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500) {
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
```

**Steps**:
1. Create `lib/error-handler.ts` with code above
2. Update `lib/blog.ts` to use error handling
3. Commit: "refactor: add comprehensive error handling utilities"

---

### 1.4 Update lib/blog.ts with Error Handling

**Current Issue**: No error handling for file operations
**Goal**: Robust error handling

**Changes to `lib/blog.ts`**:

```typescript
import { ApplicationError, FileSystemError, ContentProcessingError, NotFoundError, logError } from "@/lib/error-handler";
import { VALIDATION, CONTENT } from "@/lib/constants";

function getMDXFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter(
      (file) => path.extname(file) === CONTENT.MDX_EXTENSION
    );
  } catch (error) {
    logError(error, `Failed to read MDX files from ${dir}`);
    throw new FileSystemError(`Cannot read content directory: ${dir}`);
  }
}

export async function getPost(slug: string): Promise<FullArticle | null> {
  // Validate slug format
  if (!slug || !VALIDATION.SLUG_PATTERN.test(slug)) {
    throw new ValidationError(`Invalid slug format: ${slug}`);
  }

  try {
    const filePath = path.join(CONTENT.CONTENT_DIR, `${slug}${CONTENT.MDX_EXTENSION}`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");

    try {
      const { content: rawContent, data: rawMetadata } = matter(source);
      const content = await markdownToHTML(rawContent);

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
        published: frontmatter.published !== false,
      };

      return {
        source: content,
        metadata,
        slug,
      };
    } catch (error) {
      logError(error, `Failed to process MDX for slug: ${slug}`);
      throw new ContentProcessingError(
        `Failed to process blog post: ${slug}`,
        error
      );
    }
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw error;
    }
    logError(error, `Unexpected error reading post: ${slug}`);
    throw new FileSystemError(`Failed to read post: ${slug}`, error);
  }
}

export async function getBlogPosts(): Promise<Article[]> {
  try {
    return getAllPosts(path.join(process.cwd(), CONTENT.CONTENT_DIR));
  } catch (error) {
    logError(error, "Failed to get blog posts");
    // Return empty array instead of crashing
    console.warn("Using empty article list due to content loading error");
    return [];
  }
}
```

**Steps**:
1. Update `lib/blog.ts` with error handling
2. Test blog loading in dev mode
3. Verify errors are logged without crashing
4. Commit: "refactor: add comprehensive error handling to blog.ts"

---

## Phase 2: Component Quality Improvements (4-5 hours)

### 2.1 Remove Commented Code & Clean Up

**Files to Update**:
- `components/article-wrapper.tsx` - Remove commented toggleSortOrder and resetFilters
- Other files with commented code

**Changes**:
```typescript
// REMOVE these entire blocks:
// const resetFilters = () => {
//   setFilterPublished(true);
//   setCategoryFilter("");
//   setSortOrder("desc");
// };

// const toggleSortOrder = () => {
//   setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
// };
```

**Steps**:
1. Search for all `//` commented lines
2. Evaluate if they're needed
3. Delete unused code or add as TODO if planned
4. Commit: "refactor: remove commented-out code"

---

### 2.2 Improve Type Safety in MDX Component

**File**: `components/mdx.tsx`
**Issue**: Loosely typed image props, unsafe heading generation

```typescript
// IMPROVED: Stricter typing
interface RoundedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

function RoundedImage({
  src,
  alt = "",
  width,
  height,
  className,
  ...restProps
}: RoundedImageProps): React.ReactElement | null {
  if (!src) {
    console.warn("RoundedImage: missing src attribute");
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={`rounded-lg ${className || ""}`.trim()}
      width={width ?? 800}
      height={height ?? 400}
      {...restProps}
    />
  );
}

// IMPROVED: Type-safe heading factory
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6): React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>> {
  const Heading = ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slugifyText = typeof children === "string" ? children : "";
    const slug = slugify(slugifyText);

    const sizeClasses: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
      1: "text-4xl font-bold",
      2: "text-3xl font-semibold",
      3: "text-2xl font-medium",
      4: "text-xl font-normal",
      5: "text-lg font-light",
      6: "text-base font-light",
    };

    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: sizeClasses[level],
        ...rest
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
          "aria-label": `Link to ${slugifyText}`,
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}
```

**Steps**:
1. Update `components/mdx.tsx` with improved types
2. Test blog post rendering
3. Run type checker: `tsc --noEmit`
4. Commit: "refactor: improve type safety in MDX components"

---

### 2.3 Add Proper PropTypes Validation (Optional but Recommended)

**For Critical Components**: Add JSDoc comments with type hints

```typescript
/**
 * ArticleList component displays a filterable list of blog articles
 * @param articles - Array of articles to display
 * @returns Rendered article list with filtering capabilities
 */
interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps): React.ReactElement {
  // Component code
}
```

**Steps**:
1. Add JSDoc comments to all component props
2. Focus on exported components first
3. Commit: "docs: add JSDoc comments to components"

---

### 2.4 Extract Re-used Component Logic

**Issue**: BLUR_FADE_DELAY constant used in 10+ places with same value

**Solution**: Create custom hook

**File to Create**: `hooks/useAnimationDelay.ts`

```typescript
import { ANIMATION } from "@/lib/constants";

/**
 * Hook to provide animation delay multipliers for staggered animations
 * @param multiplier - Multiplier for base delay (default 1)
 * @returns Animation delay value
 */
export function useAnimationDelay(multiplier: number = 1): number {
  return ANIMATION.BLUR_FADE_DELAY * multiplier;
}

/**
 * Hook to generate sequential animation delays for array items
 * @param itemCount - Number of items to animate
 * @param multiplier - Base multiplier (default 0.5)
 * @returns Array of delay values
 */
export function useSequentialDelays(itemCount: number, multiplier: number = 0.5): number[] {
  return Array.from({ length: itemCount }, (_, i) =>
    ANIMATION.BLUR_FADE_DELAY * (i + 1) * multiplier
  );
}
```

**Usage**:
```typescript
// Before
const BLUR_FADE_DELAY = 0.04;
<BlurFade delay={BLUR_FADE_DELAY * 4}>

// After
const delay = useAnimationDelay(4);
<BlurFade delay={delay}>
```

**Steps**:
1. Create `hooks/useAnimationDelay.ts`
2. Update major components (app/page.tsx, article-list.tsx)
3. Test animations still work
4. Commit: "refactor: extract animation delay logic to custom hook"

---

## Phase 3: Utility Functions Improvements (3-4 hours)

### 3.1 Improve lib/utils.ts

**Current Issues**:
- Date formatting mixed with UI utilities
- Missing JSDoc comments
- No test coverage

**Improved `lib/utils.ts`**:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_FORMAT, VALIDATION } from "@/lib/constants";

/**
 * Merge Tailwind CSS classes intelligently
 * @param inputs - CSS class values to merge
 * @returns Merged class string
 * @example cn("px-4", "px-6") // Returns "px-6"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format date to short format (e.g., "January 15, 2024")
 * @param date - ISO date string or date with T
 * @returns Formatted date string in Slovak locale
 */
export function formatDateShort(date: string): string {
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;

  try {
    const fullDate = new Date(dateWithTime).toLocaleString(
      DATE_FORMAT.LOCALE,
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    return fullDate;
  } catch (error) {
    console.warn(`Invalid date format: ${date}`, error);
    return date; // Return original if formatting fails
  }
}

/**
 * Format date with relative time (e.g., "Today", "Yesterday", "2 days ago")
 * @param date - ISO date string or date with T
 * @returns Relative date string in Slovak locale
 */
export function formatDate(date: string): string {
  try {
    const currentDate = new Date().getTime();
    const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;
    const targetDate = new Date(dateWithTime).getTime();
    const timeDifference = Math.abs(currentDate - targetDate);
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const fullDate = new Date(dateWithTime).toLocaleString(
      DATE_FORMAT.LOCALE,
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    const thresholds = DATE_FORMAT.THRESHOLD_DAYS;

    if (daysAgo < thresholds.TODAY) {
      return "dnes";
    }

    if (daysAgo < thresholds.YESTERDAY) {
      return "včera";
    }

    if (daysAgo < thresholds.DAY_BEFORE_YESTERDAY) {
      return "predvčerom";
    }

    if (daysAgo < thresholds.THIS_WEEK) {
      return `${fullDate} (minulý týždeň)`;
    }

    if (daysAgo < thresholds.TWO_WEEKS) {
      return `${fullDate} (pred ${daysAgo} dňami)`;
    }

    if (daysAgo < thresholds.THIS_MONTH) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return `${fullDate} (pred ${weeksAgo} týždňami)`;
    }

    if (daysAgo < thresholds.TWO_MONTHS) {
      return "minulý mesiac";
    }

    if (daysAgo < thresholds.THIS_YEAR) {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `${fullDate} (pred ${monthsAgo} mesiacmi)`;
    }

    if (daysAgo < thresholds.TWO_YEARS) {
      return "minulý rok";
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (pred ${yearsAgo} rokmi)`;
  } catch (error) {
    console.warn(`Invalid date format: ${date}`, error);
    return date; // Return original if formatting fails
  }
}

/**
 * Validate if a value is a valid number
 * @param value - Value to validate
 * @returns True if value is a valid finite number
 */
export function isValidNumber(value: unknown): value is number {
  const numValue = Number(value);
  return !Number.isNaN(numValue) && Number.isFinite(numValue);
}

/**
 * Validate if a string matches email pattern
 * @param email - Email string to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_PATTERN.test(email);
}

/**
 * Validate if a string matches URL pattern
 * @param url - URL string to validate
 * @returns True if URL format is valid
 */
export function isValidUrl(url: string): boolean {
  return VALIDATION.URL_PATTERN.test(url);
}

/**
 * Safely parse JSON with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return fallback;
  }
}

/**
 * Truncate string to max length with ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}
```

**Steps**:
1. Update `lib/utils.ts` with improved code
2. Add test coverage (Phase 4)
3. Commit: "refactor: improve and expand utility functions"

---

## Phase 4: Input Validation Utilities (2-3 hours)

### 4.1 Create Validation Helpers

**File to Create**: `lib/validators.ts`

```typescript
import { VALIDATION } from "@/lib/constants";
import { ValidationError } from "@/lib/error-handler";

/**
 * Validate and sanitize blog post slug
 * @param slug - Slug to validate
 * @throws ValidationError if invalid
 * @returns Validated slug
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
 * @returns Validated metadata
 */
export function validateArticleMetadata(metadata: unknown): asserts metadata is Record<string, unknown> {
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
 * @returns Validated tags array
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
 * @returns Validated email
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
 * @param min - Minimum length
 * @param max - Maximum length
 * @throws ValidationError if invalid
 * @returns Validated string
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
```

**Steps**:
1. Create `lib/validators.ts`
2. Update `lib/blog.ts` to use validators
3. Test validation error handling
4. Commit: "refactor: add comprehensive input validation"

---

## Phase 5: Error Boundaries & Fallbacks (2-3 hours)

### 5.1 Create Error Boundary Component

**File to Create**: `components/error-boundary.tsx`

```typescript
"use client";

import React from "react";
import { logError } from "@/lib/error-handler";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError(error, `Error in ${this.props.componentName || "component"}`);
    console.error("Error boundary details:", errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
            <h3 className="font-semibold">Something went wrong</h3>
            <p className="text-sm">
              {this.props.componentName ? `Error in ${this.props.componentName}` : "An unexpected error occurred"}
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="mt-2 overflow-auto text-xs">
                {this.state.error.message}
              </pre>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Hook version of error boundary for functional components
 */
export function useErrorHandler(error: Error | null): void {
  React.useEffect(() => {
    if (error) {
      logError(error, "Error caught by useErrorHandler");
    }
  }, [error]);
}
```

**Steps**:
1. Create `components/error-boundary.tsx`
2. Wrap critical sections in app/page.tsx:
   ```typescript
   import { ErrorBoundary } from "@/components/error-boundary";

   export default function Home() {
     return (
       <main className="...">
         <ErrorBoundary componentName="BlogSection">
           <section id="blog">
             {/* Blog content */}
           </section>
         </ErrorBoundary>
       </main>
     );
   }
   ```
3. Commit: "refactor: add error boundary for graceful error handling"

---

## Phase 6: Environment Configuration (1-2 hours)

### 6.1 Create Environment Template

**File to Create**: `.env.example`

```env
# Application Environment
NODE_ENV=development

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API Configuration (for future use)
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Analytics (optional)
# NEXT_PUBLIC_GA_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_COMMENTS=false
```

**File to Create**: `.env.local` (add to .gitignore)

**File to Update**: `.gitignore` (ensure .env.local is present)

**Steps**:
1. Create `.env.example`
2. Ensure `.env.local` is in `.gitignore`
3. Create `.env.local` locally with development values
4. Update `next.config.mjs` to use environment variables (if needed)
5. Commit: "chore: add environment configuration template"

---

## Quality Checklist

After completing all phases, verify:

- [ ] ESLint passes: `pnpm lint`
- [ ] TypeScript strict mode: `tsc --noEmit`
- [ ] No console errors or warnings in development
- [ ] All constants extracted from magic numbers
- [ ] All error handling implemented
- [ ] Error boundaries in critical sections
- [ ] JSDoc comments on public functions/components
- [ ] Commented code removed
- [ ] Validation utilities applied
- [ ] Environment variables configured

---

## Commit Message Template

Use conventional commits:
```
type(scope): description

- Detailed explanation
- Lists specific changes made
- Related issue numbers if applicable
```

**Examples**:
```
refactor(constants): extract magic numbers to constants file

- Added lib/constants.ts with animation, validation, UI, and content constants
- Updated all components to use extracted constants
- Improved maintainability and consistency

refactor(error): add comprehensive error handling utilities

- Created lib/error-handler.ts with custom error classes
- Updated lib/blog.ts to use error handling
- Added safe async operation helpers

refactor(validation): add input validation utilities

- Created lib/validators.ts with type-safe validators
- Added validation to blog post processing
- Improved data integrity
```

---

## Timeline Summary

| Phase | Task | Hours | Priority |
|-------|------|-------|----------|
| 1 | Project Setup & Config | 2-3 | High |
| 2 | Component Quality | 4-5 | High |
| 3 | Utility Functions | 3-4 | High |
| 4 | Input Validation | 2-3 | Medium |
| 5 | Error Boundaries | 2-3 | High |
| 6 | Environment Config | 1-2 | Medium |
| **Total** | | **15-20 hours** | - |

**Can be done in parallel with testing phase**

---

## Success Metrics

After implementation:
- ✅ 0 ESLint errors
- ✅ 0 TypeScript errors
- ✅ All functions/components have JSDoc
- ✅ All magic numbers extracted
- ✅ All error paths handled
- ✅ Error boundaries active
- ✅ Input validation in place
- ✅ 90%+ code quality score
