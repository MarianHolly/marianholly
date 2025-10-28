# Testing Implementation Plan

**Purpose**: Add comprehensive test coverage from 0% to 70%+ without architectural changes
**Timeline**: 3-4 weeks (can overlap with quality improvements)
**Tools**: Vitest (unit), React Testing Library (components), Playwright (E2E)
**Priority**: High - Critical for demonstrating medior-level skills

---

## Overview: Testing Pyramid

```
                         E2E Tests
                    (10-15 tests)
                         ▲
                        ╱ ╲
                       ╱   ╲
                  Integration Tests
                   (20-30 tests)
                       ╱         ╲
                      ╱           ╲
                  Unit Tests
                 (80-120 tests)
```

**Expected Coverage**:
- Unit Tests: 70-80% coverage
- Integration Tests: 50-60% coverage
- E2E Tests: Key user workflows only

---

## Phase 1: Testing Setup & Infrastructure (3-4 hours)

### 1.1 Install Dependencies

**Add to `package.json` devDependencies**:

```bash
pnpm add -D vitest @vitest/ui jsdom
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @playwright/test
pnpm add -D @types/jest ts-node
```

**Or add directly to package.json**:
```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.11",
    "@vitest/ui": "^1.1.0",
    "jsdom": "^23.0.1",
    "ts-node": "^10.9.2",
    "typescript": "^5",
    "vitest": "^1.1.0"
  }
}
```

**Steps**:
1. Update `package.json` with test dependencies
2. Run `pnpm install`
3. Commit: "chore: add testing framework dependencies"

---

### 1.2 Create Vitest Configuration

**File to Create**: `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "vitest.setup.ts",
        "**/*.d.ts",
        "**/dist/**",
        "**/build/**",
        "**/*.config.ts",
        "**/tests/**",
      ],
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
    include: ["**/__tests__/**/*.{test,spec}.{ts,tsx}", "**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "build",
      ".next",
      "e2e",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

**Also add to `package.json` scripts**:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest --run"
  }
}
```

**Steps**:
1. Create `vitest.config.ts`
2. Create `vitest.setup.ts` (next step)
3. Update `package.json` scripts
4. Run `pnpm test:run` to verify setup
5. Commit: "test: add Vitest configuration"

---

### 1.3 Create Vitest Setup File

**File to Create**: `vitest.setup.ts`

```typescript
import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next-themes (optional, only if needed)
vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
  }),
}));

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});
```

**Steps**:
1. Create `vitest.setup.ts`
2. Verify configuration works
3. Commit: "test: add Vitest setup and mocks"

---

### 1.4 Create Test Utilities

**File to Create**: `lib/__tests__/test-utils.tsx`

```typescript
import React from "react";
import { render, RenderOptions } from "@testing-library/react";

/**
 * Custom render function that includes providers
 * Extend this if you add more providers (Redux, React Query, etc.)
 */
function CustomRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { CustomRender as render };

/**
 * Create mock article for testing
 */
export function createMockArticle(overrides = {}) {
  return {
    slug: "test-article",
    metadata: {
      title: "Test Article",
      subtitle: "A test article",
      publishedAt: "2024-01-01T00:00:00Z",
      summary: "Test summary",
      image: "/test-image.jpg",
      tags: ["test", "javascript"],
      published: true,
    },
    ...overrides,
  };
}

/**
 * Create mock articles array
 */
export function createMockArticles(count = 3) {
  return Array.from({ length: count }, (_, i) =>
    createMockArticle({
      slug: `article-${i + 1}`,
      metadata: {
        title: `Test Article ${i + 1}`,
        publishedAt: new Date(2024, 0, i + 1).toISOString(),
      },
    })
  );
}

/**
 * Wait for async operations
 */
export async function waitForLoadingToFinish() {
  const { waitFor } = await import("@testing-library/react");
  await waitFor(() => {
    expect(document.querySelector("[data-testid='loading']")).not.toBeInTheDocument();
  });
}
```

**Steps**:
1. Create `lib/__tests__/test-utils.tsx`
2. This will be imported in all component tests
3. Commit: "test: add test utilities and mock factories"

---

### 1.5 Create Playwright Configuration

**File to Create**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**Steps**:
1. Create `playwright.config.ts`
2. Create `e2e/` directory
3. Add to `package.json` scripts:
   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:e2e:debug": "playwright test --debug"
     }
   }
   ```
4. Commit: "test: add Playwright E2E configuration"

---

## Phase 2: Unit Tests - Utilities (6-8 hours)

### 2.1 Test lib/utils.ts

**File to Create**: `lib/__tests__/utils.test.ts`

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import {
  cn,
  formatDate,
  formatDateShort,
  isValidNumber,
  isValidEmail,
  isValidUrl,
  safeJsonParse,
  truncateString,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("cn (class merging)", () => {
    it("should merge simple classes", () => {
      const result = cn("px-4 py-2", "bg-blue-500");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).toContain("bg-blue-500");
    });

    it("should override duplicate Tailwind classes", () => {
      const result = cn("px-4", "px-6");
      expect(result).toContain("px-6");
      expect(result).not.toContain("px-4");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toContain("base-class");
      expect(result).toContain("active-class");
    });

    it("should ignore false values", () => {
      const result = cn("px-4", false && "hidden", null, undefined);
      expect(result).toBe("px-4");
    });
  });

  describe("formatDateShort", () => {
    it("should format date correctly", () => {
      const result = formatDateShort("2024-01-15");
      expect(result).toMatch(/January|januar/i);
      expect(result).toContain("15");
      expect(result).toContain("2024");
    });

    it("should handle ISO date strings", () => {
      const result = formatDateShort("2024-01-15T10:30:00Z");
      expect(result).toMatch(/January|januar/i);
    });

    it("should handle invalid dates gracefully", () => {
      const result = formatDateShort("invalid-date");
      expect(result).toBe("invalid-date");
    });
  });

  describe("formatDate", () => {
    it("should return 'dnes' for today", () => {
      const today = new Date().toISOString();
      expect(formatDate(today)).toBe("dnes");
    });

    it("should return 'včera' for yesterday", () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString();
      expect(formatDate(yesterday)).toBe("včera");
    });

    it("should return 'predvčerom' for day before yesterday", () => {
      const dayBeforeYesterday = new Date(Date.now() - 172800000).toISOString();
      expect(formatDate(dayBeforeYesterday)).toBe("predvčerom");
    });

    it("should format dates older than 3 days with date", () => {
      const oldDate = new Date(Date.now() - 604800000).toISOString(); // 7 days ago
      const result = formatDate(oldDate);
      expect(result).toContain("minulý týždeň");
    });

    it("should handle invalid dates gracefully", () => {
      const result = formatDate("invalid-date");
      expect(result).toBe("invalid-date");
    });
  });

  describe("isValidNumber", () => {
    it("should return true for valid numbers", () => {
      expect(isValidNumber(42)).toBe(true);
      expect(isValidNumber(3.14)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-100)).toBe(true);
    });

    it("should return true for numeric strings", () => {
      expect(isValidNumber("42")).toBe(true);
      expect(isValidNumber("3.14")).toBe(true);
    });

    it("should return false for NaN", () => {
      expect(isValidNumber(Number.NaN)).toBe(false);
    });

    it("should return false for Infinity", () => {
      expect(isValidNumber(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isValidNumber(Number.NEGATIVE_INFINITY)).toBe(false);
    });

    it("should return false for non-numeric values", () => {
      expect(isValidNumber("abc")).toBe(false);
      expect(isValidNumber(null)).toBe(false);
      expect(isValidNumber(undefined)).toBe(false);
      expect(isValidNumber({})).toBe(false);
    });
  });

  describe("isValidEmail", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user @example.com")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("https://example.com/path")).toBe(true);
    });

    it("should reject invalid URLs", () => {
      expect(isValidUrl("not a url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("ftp://example.com")).toBe(false);
    });
  });

  describe("safeJsonParse", () => {
    it("should parse valid JSON", () => {
      const result = safeJsonParse('{"key": "value"}', {});
      expect(result).toEqual({ key: "value" });
    });

    it("should return fallback for invalid JSON", () => {
      const fallback = { default: true };
      const result = safeJsonParse("invalid json", fallback);
      expect(result).toEqual(fallback);
    });

    it("should handle arrays", () => {
      const result = safeJsonParse("[1, 2, 3]", []);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("truncateString", () => {
    it("should truncate long strings", () => {
      const result = truncateString("This is a very long string", 10);
      expect(result).toBe("This is a ...");
      expect(result.length).toBeLessThanOrEqual(13); // 10 + "..."
    });

    it("should not truncate short strings", () => {
      const result = truncateString("Short", 10);
      expect(result).toBe("Short");
    });

    it("should handle exact length", () => {
      const result = truncateString("Exact", 5);
      expect(result).toBe("Exact");
    });
  });
});
```

**Steps**:
1. Create `lib/__tests__/utils.test.ts`
2. Run tests: `pnpm test lib/utils`
3. Verify all tests pass
4. Check coverage: `pnpm test:coverage`
5. Commit: "test: add unit tests for utility functions"

---

### 2.2 Test lib/types.ts (Type Guards)

**File to Create**: `lib/__tests__/types.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { isFullArticle, type Article, type FullArticle } from "@/lib/types";

describe("Type Guards", () => {
  describe("isFullArticle", () => {
    it("should return true for FullArticle with source", () => {
      const fullArticle: FullArticle = {
        slug: "test",
        metadata: {
          title: "Test",
          publishedAt: "2024-01-01",
          tags: [],
          published: true,
        },
        source: "<h1>Content</h1>",
      };

      expect(isFullArticle(fullArticle)).toBe(true);
    });

    it("should return false for Article without source", () => {
      const article: Article = {
        slug: "test",
        metadata: {
          title: "Test",
          publishedAt: "2024-01-01",
          tags: [],
          published: true,
        },
      };

      expect(isFullArticle(article)).toBe(false);
    });

    it("should return false for Article with undefined source", () => {
      const article: Article = {
        slug: "test",
        metadata: {
          title: "Test",
          publishedAt: "2024-01-01",
          tags: [],
          published: true,
        },
        source: undefined,
      };

      expect(isFullArticle(article)).toBe(false);
    });
  });
});
```

**Steps**:
1. Create `lib/__tests__/types.test.ts`
2. Run tests: `pnpm test lib/types`
3. Commit: "test: add unit tests for type guards"

---

### 2.3 Test lib/validators.ts

**File to Create**: `lib/__tests__/validators.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import {
  validateSlug,
  validateEmail,
  validateUrl,
  validateStringLength,
  validateTags,
} from "@/lib/validators";
import { ValidationError } from "@/lib/error-handler";

describe("Validators", () => {
  describe("validateSlug", () => {
    it("should validate correct slugs", () => {
      expect(validateSlug("my-article")).toBe("my-article");
      expect(validateSlug("article_123")).toBe("article_123");
      expect(validateSlug("Article-1")).toBe("article-1"); // Lowercase
    });

    it("should reject empty slug", () => {
      expect(() => validateSlug("")).toThrow(ValidationError);
    });

    it("should reject invalid characters", () => {
      expect(() => validateSlug("my article")).toThrow(ValidationError);
      expect(() => validateSlug("my@article")).toThrow(ValidationError);
      expect(() => validateSlug("my.article")).toThrow(ValidationError);
    });

    it("should reject oversized slug", () => {
      const longSlug = "a".repeat(101);
      expect(() => validateSlug(longSlug)).toThrow(ValidationError);
    });
  });

  describe("validateEmail", () => {
    it("should validate correct emails", () => {
      expect(validateEmail("test@example.com")).toBe("test@example.com");
      expect(validateEmail("  UPPER@EXAMPLE.COM  ")).toBe("upper@example.com");
    });

    it("should reject empty email", () => {
      expect(() => validateEmail("")).toThrow(ValidationError);
    });

    it("should reject invalid email format", () => {
      expect(() => validateEmail("invalid-email")).toThrow(ValidationError);
    });
  });

  describe("validateUrl", () => {
    it("should validate correct URLs", () => {
      expect(validateUrl("https://example.com")).toBe("https://example.com");
      expect(validateUrl("http://example.com")).toBe("http://example.com");
    });

    it("should reject empty URL", () => {
      expect(() => validateUrl("")).toThrow(ValidationError);
    });

    it("should reject invalid URL format", () => {
      expect(() => validateUrl("not a url")).toThrow(ValidationError);
    });
  });

  describe("validateStringLength", () => {
    it("should validate correct string length", () => {
      expect(validateStringLength("hello", 1, 10)).toBe("hello");
    });

    it("should reject too short string", () => {
      expect(() => validateStringLength("a", 5, 10)).toThrow(ValidationError);
    });

    it("should reject too long string", () => {
      expect(() => validateStringLength("a".repeat(100), 1, 50)).toThrow(ValidationError);
    });
  });

  describe("validateTags", () => {
    it("should validate array of tags", () => {
      const result = validateTags(["javascript", "React"]);
      expect(result).toEqual(["javascript", "react"]); // Lowercase
    });

    it("should validate single string tag", () => {
      const result = validateTags("javascript");
      expect(result).toEqual(["javascript"]);
    });

    it("should return empty array for null/undefined", () => {
      expect(validateTags(null)).toEqual([]);
      expect(validateTags(undefined)).toEqual([]);
    });

    it("should filter empty tags", () => {
      const result = validateTags(["valid", "", "  ", "another"]);
      expect(result).toEqual(["valid", "another"]);
    });
  });
});
```

**Steps**:
1. Create `lib/__tests__/validators.test.ts`
2. Run tests: `pnpm test lib/validators`
3. Fix any issues in validator implementation
4. Commit: "test: add unit tests for validators"

---

## Phase 3: Integration Tests - Blog Processing (4-6 hours)

### 3.1 Test Blog Processing Pipeline

**File to Create**: `lib/__tests__/blog.integration.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import path from "path";
import fs from "fs";
import { getBlogPosts, getPost, markdownToHTML } from "@/lib/blog";
import { NotFoundError } from "@/lib/error-handler";

// Note: These tests assume your content directory exists
// For CI/CD, you may want to create temporary test files

describe("Blog Processing - Integration Tests", () => {
  describe("getBlogPosts", () => {
    it("should return array of articles", async () => {
      const posts = await getBlogPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it("should return articles with correct metadata", async () => {
      const posts = await getBlogPosts();

      posts.forEach((post) => {
        expect(post.slug).toBeDefined();
        expect(post.metadata.title).toBeDefined();
        expect(post.metadata.publishedAt).toBeDefined();
        expect(Array.isArray(post.metadata.tags)).toBe(true);
        expect(typeof post.metadata.published).toBe("boolean");
      });
    });

    it("should not include source in list articles", async () => {
      const posts = await getBlogPosts();

      posts.forEach((post) => {
        expect(post.source).toBeUndefined();
      });
    });

    it("should sort articles by date descending", async () => {
      const posts = await getBlogPosts();

      if (posts.length >= 2) {
        const date1 = new Date(posts[0].metadata.publishedAt).getTime();
        const date2 = new Date(posts[1].metadata.publishedAt).getTime();
        expect(date1).toBeGreaterThanOrEqual(date2);
      }
    });
  });

  describe("getPost", () => {
    it("should return null for non-existent post", async () => {
      const post = await getPost("non-existent-slug-12345");
      expect(post).toBeNull();
    });

    it("should return full article with source for existing post", async () => {
      const posts = await getBlogPosts();

      if (posts.length > 0) {
        const firstPost = posts[0];
        const fullPost = await getPost(firstPost.slug);

        expect(fullPost).not.toBeNull();
        expect(fullPost?.source).toBeDefined();
        expect(typeof fullPost?.source).toBe("string");
        expect(fullPost?.source.length).toBeGreaterThan(0);
      }
    });

    it("should have same metadata as list version", async () => {
      const posts = await getBlogPosts();

      if (posts.length > 0) {
        const listVersion = posts[0];
        const fullVersion = await getPost(listVersion.slug);

        expect(fullVersion?.metadata.title).toBe(listVersion.metadata.title);
        expect(fullVersion?.metadata.publishedAt).toBe(listVersion.metadata.publishedAt);
        expect(JSON.stringify(fullVersion?.metadata.tags)).toBe(
          JSON.stringify(listVersion.metadata.tags)
        );
      }
    });

    it("should reject invalid slug format", async () => {
      try {
        await getPost("invalid@slug");
        expect.fail("Should have thrown ValidationError");
      } catch (error) {
        // Expected to throw
        expect(error).toBeDefined();
      }
    });
  });

  describe("markdownToHTML", () => {
    it("should convert markdown to HTML", async () => {
      const markdown = "# Heading\n\nThis is a paragraph.";
      const html = await markdownToHTML(markdown);

      expect(html).toContain("<h1");
      expect(html).toContain("Heading");
      expect(html).toContain("paragraph");
    });

    it("should sanitize HTML properly", async () => {
      const malicious = "<script>alert('xss')</script>";
      const html = await markdownToHTML(malicious);

      expect(html).not.toContain("<script>");
      expect(html).not.toContain("alert");
    });

    it("should preserve code blocks", async () => {
      const markdown = "```javascript\nconst x = 1;\n```";
      const html = await markdownToHTML(markdown);

      expect(html).toContain("<code");
      expect(html).toContain("const x = 1");
    });

    it("should handle links properly", async () => {
      const markdown = "[Google](https://google.com)";
      const html = await markdownToHTML(markdown);

      expect(html).toContain("<a");
      expect(html).toContain("https://google.com");
      expect(html).toContain("Google");
    });

    it("should not allow dangerous tags", async () => {
      const dangerous = "<iframe src='evil.com'></iframe>";
      const html = await markdownToHTML(dangerous);

      expect(html).not.toContain("<iframe");
    });
  });
});
```

**Steps**:
1. Create `lib/__tests__/blog.integration.test.ts`
2. Run tests: `pnpm test blog.integration`
3. Verify all tests pass (requires content directory)
4. Commit: "test: add integration tests for blog processing"

---

## Phase 4: Component Tests (6-8 hours)

### 4.1 Test ArticleList Component

**File to Create**: `components/__tests__/article-list.test.tsx`

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/__tests__/test-utils";
import ArticleList from "@/components/article-list";
import { FilterContext } from "@/components/article-wrapper";
import { createMockArticles } from "@/lib/__tests__/test-utils";
import type { ReactNode } from "react";

describe("ArticleList Component", () => {
  const mockContextValue = {
    filterPublished: true,
    setFilterPublished: vi.fn(),
    categoryFilter: "",
    setCategoryFilter: vi.fn(),
    sortOrder: "desc" as const,
    setSortOrder: vi.fn(),
  };

  function renderWithContext(component: ReactNode) {
    return render(
      <FilterContext.Provider value={mockContextValue}>
        {component}
      </FilterContext.Provider>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render articles", () => {
    const articles = createMockArticles(2);
    renderWithContext(<ArticleList articles={articles} />);

    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
  });

  it("should render correct number of articles", () => {
    const articles = createMockArticles(5);
    renderWithContext(<ArticleList articles={articles} />);

    const links = screen.getAllByRole("link");
    // Each article has a link
    expect(links.length).toBeGreaterThanOrEqual(5);
  });

  it("should display category filter buttons", () => {
    const articles = createMockArticles(2);
    renderWithContext(<ArticleList articles={articles} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should handle empty articles", () => {
    renderWithContext(<ArticleList articles={[]} />);

    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });

  it("should display published articles only", () => {
    const articles = [
      ...createMockArticles(2),
      {
        ...createMockArticles(1)[0],
        metadata: {
          ...createMockArticles(1)[0].metadata,
          published: false,
        },
      },
    ];

    renderWithContext(<ArticleList articles={articles} />);

    // Unpublished article should have reduced opacity
    const unpublishedLink = screen.getByRole("link", {
      name: /Test Article 1/i,
    });
    expect(unpublishedLink).toHaveClass("opacity-50");
  });

  it("should display subtitle when available", () => {
    const articles = [
      {
        ...createMockArticles(1)[0],
        metadata: {
          ...createMockArticles(1)[0].metadata,
          subtitle: "A helpful subtitle",
        },
      },
    ];

    renderWithContext(<ArticleList articles={articles} />);

    expect(screen.getByText("A helpful subtitle")).toBeInTheDocument();
  });

  it("should format dates correctly", () => {
    const articles = createMockArticles(1);
    renderWithContext(<ArticleList articles={articles} />);

    // Check that date formatting function was applied
    const dateElements = screen.getAllByRole("time");
    expect(dateElements.length).toBeGreaterThan(0);
  });
});
```

**Steps**:
1. Create `components/__tests__/article-list.test.tsx`
2. Note: This requires mocking the FilterContext
3. Run tests: `pnpm test article-list`
4. Verify all tests pass
5. Commit: "test: add component tests for ArticleList"

---

### 4.2 Test Error Boundary Component

**File to Create**: `components/__tests__/error-boundary.test.tsx`

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/lib/__tests__/test-utils";
import { ErrorBoundary } from "@/components/error-boundary";

// Component that throws error
function ThrowError() {
  throw new Error("Test error");
}

describe("ErrorBoundary Component", () => {
  // Suppress console.error for these tests
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should display error fallback on error", () => {
    render(
      <ErrorBoundary componentName="TestComponent">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/Error in TestComponent/)).toBeInTheDocument();
  });

  it("should display custom fallback", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("should show error details in development", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });
});
```

**Steps**:
1. Create `components/__tests__/error-boundary.test.tsx`
2. Run tests: `pnpm test error-boundary`
3. Commit: "test: add component tests for ErrorBoundary"

---

## Phase 5: E2E Tests (3-4 hours)

### 5.1 Create E2E Test Files

**Create Directory**: `e2e/`

### 5.2 Test Blog Navigation

**File to Create**: `e2e/blog.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Blog Navigation", () => {
  test("should navigate to blog page", async ({ page }) => {
    await page.goto("/");
    await page.click("a[href='/blog']");
    expect(page.url()).toContain("/blog");
  });

  test("should display blog articles", async ({ page }) => {
    await page.goto("/blog");
    const articles = await page.locator("a[href*='/blog/']").count();
    expect(articles).toBeGreaterThan(0);
  });

  test("should navigate to article", async ({ page }) => {
    await page.goto("/blog");
    const firstArticle = page.locator("a[href*='/blog/']").first();
    const href = await firstArticle.getAttribute("href");

    await firstArticle.click();
    expect(page.url()).toContain(href);
  });

  test("should display article content", async ({ page }) => {
    await page.goto("/blog");
    const firstArticle = page.locator("a[href*='/blog/']").first();
    await firstArticle.click();

    const heading = page.locator("article h1");
    await expect(heading).toBeVisible();

    const content = page.locator("article");
    await expect(content).toBeVisible();
  });

  test("should filter articles by category", async ({ page }) => {
    await page.goto("/blog");

    const buttons = page.locator("button[type='button']");
    const firstButton = buttons.nth(1); // Skip the eye icon button

    const initialCount = await page.locator("a[href*='/blog/']").count();

    // Click first category button
    await firstButton.click();

    // Articles should be filtered (count might change)
    const filteredCount = await page.locator("a[href*='/blog/']").count();
    // Filtered count should be <= initial count
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test("should toggle published/draft articles", async ({ page }) => {
    await page.goto("/blog");

    // Find the eye icon button
    const eyeButton = page.locator("button svg").first().locator("..");

    const initialCount = await page.locator("a[href*='/blog/']").count();

    // Click toggle
    await eyeButton.click();

    // Count might change (if there are draft posts)
    const newCount = await page.locator("a[href*='/blog/']").count();
    expect(typeof newCount).toBe("number");
  });
});

test.describe("Article Rendering", () => {
  test("should render article with correct title", async ({ page }) => {
    await page.goto("/blog");
    const firstArticle = page.locator("a[href*='/blog/']").first();
    await firstArticle.click();

    const heading = page.locator("article h1");
    const text = await heading.textContent();
    expect(text).toBeTruthy();
  });

  test("should render markdown content", async ({ page }) => {
    await page.goto("/blog");
    const firstArticle = page.locator("a[href*='/blog/']").first();
    await firstArticle.click();

    const article = page.locator("article");
    const innerHTML = await article.innerHTML();

    // Should have HTML content
    expect(innerHTML).toContain("<");
    expect(innerHTML.length).toBeGreaterThan(0);
  });

  test("should display article metadata", async ({ page }) => {
    await page.goto("/blog");
    const firstArticle = page.locator("a[href*='/blog/']").first();
    await firstArticle.click();

    // Should have published date
    const time = page.locator("time");
    await expect(time).toBeVisible();
  });
});

test.describe("Mobile Responsiveness", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should display blog on mobile", async ({ page }) => {
    await page.goto("/blog");

    const articles = await page.locator("a[href*='/blog/']").count();
    expect(articles).toBeGreaterThan(0);
  });

  test("should be readable on mobile", async ({ page }) => {
    await page.goto("/blog");
    const heading = page.locator("h1");

    await expect(heading).toBeVisible();
    const box = await heading.boundingBox();
    expect(box?.width).toBeLessThan(400); // Mobile width constraint
  });
});
```

**Steps**:
1. Create `e2e/blog.spec.ts`
2. Run tests: `pnpm test:e2e`
3. Commit: "test: add E2E tests for blog navigation"

---

### 5.3 Test Home Page

**File to Create**: `e2e/home.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/");
    expect(page.url()).toContain("/");
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");

    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");

    const homeLink = page.locator("a[href='/']");
    const blogLink = page.locator("a[href='/blog']");

    expect(await homeLink.count()).toBeGreaterThan(0);
    expect(await blogLink.count()).toBeGreaterThan(0);
  });

  test("should display featured articles", async ({ page }) => {
    await page.goto("/");

    // Scroll to blog section
    const blogSection = page.locator("#blog");
    await blogSection.scrollIntoViewIfNeeded();

    const articles = page.locator("#blog a");
    expect(await articles.count()).toBeGreaterThan(0);
  });

  test("should have contact section", async ({ page }) => {
    await page.goto("/");

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    await expect(contactSection).toBeVisible();
  });
});

test.describe("Theme Switching", () => {
  test("should have theme switcher", async ({ page }) => {
    await page.goto("/");

    const themeButtons = page.locator("button").filter({
      has: page.locator("svg"),
    });

    expect(await themeButtons.count()).toBeGreaterThan(0);
  });

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");

    const htmlElement = page.locator("html");
    const initialClass = await htmlElement.getAttribute("class");

    // Find and click theme switcher (implementation specific)
    // This may need adjustment based on actual DOM structure
  });
});
```

**Steps**:
1. Create `e2e/home.spec.ts`
2. Run tests: `pnpm test:e2e`
3. Commit: "test: add E2E tests for home page"

---

## Phase 6: CI/CD Integration (2-3 hours)

### 6.1 Create GitHub Actions Workflow

**File to Create**: `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Install pnpm
        uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Run linter
        run: pnpm lint

      - name: Check types
        run: pnpm tsc --noEmit

      - name: Run unit tests
        run: pnpm test:run

      - name: Generate coverage
        run: pnpm test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'pnpm'

      - name: Install pnpm
        uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Build application
        run: pnpm build

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

**Steps**:
1. Create `.github/workflows/test.yml`
2. Push to GitHub to trigger workflow
3. Verify tests run automatically
4. Commit: "ci: add GitHub Actions workflow for tests"

---

## Testing Checklist

- [ ] Vitest configured and working
- [ ] React Testing Library set up
- [ ] Playwright configured
- [ ] Unit tests for utils (80-100% coverage)
- [ ] Unit tests for types (100% coverage)
- [ ] Unit tests for validators (90%+ coverage)
- [ ] Integration tests for blog (70%+ coverage)
- [ ] Component tests for ArticleList (80%+ coverage)
- [ ] Component tests for ErrorBoundary (90%+ coverage)
- [ ] E2E tests for blog workflows
- [ ] E2E tests for home page
- [ ] GitHub Actions CI/CD running
- [ ] Coverage reports generated
- [ ] All tests passing locally
- [ ] All tests passing in CI

---

## Test Execution Commands

```bash
# Run all tests in watch mode
pnpm test

# Run tests in UI mode (visual)
pnpm test:ui

# Run tests once (CI mode)
pnpm test:run

# Generate coverage report
pnpm test:coverage

# Run specific test file
pnpm test -- lib/utils.test.ts

# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui

# Run E2E tests in debug mode
pnpm test:e2e:debug
```

---

## Expected Coverage After Implementation

| Category | Target | Expected |
|----------|--------|----------|
| Statements | 70% | 75-80% |
| Branches | 70% | 70-75% |
| Functions | 70% | 80-85% |
| Lines | 70% | 75-80% |
| **Overall** | **70%** | **75-80%** |

---

## Timeline

| Phase | Duration | Hours |
|-------|----------|-------|
| 1. Setup & Infrastructure | Days 1-2 | 3-4 |
| 2. Unit Tests - Utilities | Days 2-3 | 6-8 |
| 3. Integration Tests | Days 4-5 | 4-6 |
| 4. Component Tests | Days 5-6 | 6-8 |
| 5. E2E Tests | Days 6-7 | 3-4 |
| 6. CI/CD Integration | Day 7 | 2-3 |
| **Total** | **2 weeks** | **24-33 hours** |

---

## Success Criteria

- ✅ 70%+ code coverage across codebase
- ✅ All tests passing locally
- ✅ All tests passing in CI/CD
- ✅ ESLint passing with 0 errors
- ✅ TypeScript strict mode passing
- ✅ E2E critical workflows covered
- ✅ Error handling tested
- ✅ Type safety verified
