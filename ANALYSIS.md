# Marianholly Portfolio Application - Comprehensive Analysis

**Date**: October 27, 2025
**Purpose**: Blueprint for future improvements, refactoring to Next.js 15, backend migration to FastAPI, dockerization, and testing strategy

---

## 1. Executive Summary

### Current State
The **marianholly** portfolio is a modern, well-structured **Next.js 14** application serving as a portfolio and blog platform. It demonstrates solid React patterns, proper TypeScript usage, and good UX with animations and dark mode support. The application is fully functional, performant (Lighthouse 95+), and deployed on Vercel.

### Key Findings
- **Architecture**: Clean separation between server/client components with proper data flow
- **Code Quality**: Strong TypeScript usage, type guards, and accessible UI patterns
- **Primary Gaps**: No automated testing, limited error handling, no backend infrastructure, manual deployment
- **Performance**: Excellent frontend metrics; static content generation optimized
- **Security**: Basic security in place (sanitization, input validation); CORS not configured yet (no API)

### Strategic Concerns
1. **No Backend Infrastructure**: Currently 100% static/client-side; future features require backend
2. **Manual Data Management**: Resume/projects data hardcoded in `lib/resume.tsx`
3. **No Testing Layer**: Zero test coverage; no test framework configured
4. **Deployment**: Single-vendor deployment (Vercel); no containerization
5. **Content Limitations**: MDX blog limited to local file system; no CMS integration

---

## 2. Architecture Overview

### 2.1 Application Structure

```
marianholly/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (hero, projects, blog, contact)
│   ├── blog/
│   │   ├── page.tsx              # Blog listing with filters
│   │   └── [slug]/page.tsx       # Dynamic blog post view
│   ├── fonts/                    # Custom fonts
│   └── globals.css               # Global Tailwind styles
│
├── components/                    # React Components (35 files)
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx            # CVA-based button
│   │   ├── card.tsx              # Card component
│   │   ├── avatar.tsx            # Avatar with fallback
│   │   ├── badge.tsx             # Badge/tag component
│   │   ├── blur-fade.tsx         # Animation wrapper
│   │   ├── blur-fade-text.tsx    # Text animation
│   │   ├── shiny-button.tsx      # Animated button
│   │   ├── tooltip.tsx           # Radix tooltip
│   │   └── [~30 more components]
│   ├── mdx.tsx                   # MDX component mappings
│   ├── theme-provider.tsx        # next-themes wrapper
│   ├── theme-switcher.tsx        # Dark mode toggle
│   ├── site-navigation.tsx       # Main navigation
│   ├── article-list.tsx          # Blog listing (client)
│   ├── article-wrapper.tsx       # Blog filters context (client)
│   ├── card-blog.tsx             # Blog card component
│   ├── card-project.tsx          # Project card component
│   ├── github-repositories.tsx  # GitHub repos display
│   └── hover-mail.tsx            # Email hover card
│
├── lib/                          # Utilities & Logic
│   ├── blog.ts                   # MDX processing pipeline
│   ├── resume.tsx                # Hardcoded content/data
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions
│
├── content/                      # MDX blog posts
│   └── object-oriented-programming.mdx
│
├── public/                       # Static assets
│   ├── avatar.jpg
│   ├── dev-icon.svg
│   ├── images/
│   └── videos/
│
├── Configuration Files
│   ├── next.config.mjs           # Next.js config
│   ├── tailwind.config.ts        # Tailwind setup
│   ├── tsconfig.json             # TypeScript strict mode
│   ├── postcss.config.mjs        # PostCSS (Tailwind)
│   ├── components.json           # shadcn/ui config
│   └── .eslintrc.json            # ESLint config
```

### 2.2 Data Flow & State Management

#### Server-Side Data Flow
```
app/blog/page.tsx
  ↓ (Server Component)
getBlogPosts() [lib/blog.ts]
  ↓
Read .mdx files → Parse frontmatter (gray-matter)
  ↓
Article[] (metadata only)
  ↓
ArticleList component (client)
```

#### Dynamic Blog Post Flow
```
app/blog/[slug]/page.tsx
  ↓
generateStaticParams() → Pre-render at build time
getPost(slug) [lib/blog.ts]
  ↓
Read .mdx → gray-matter → markdownToHTML()
  ↓
MDX Processing Pipeline:
  1. remark-parse (markdown → AST)
  2. remark-rehype (transform)
  3. rehype-pretty-code (syntax highlighting)
  4. rehype-sanitize (security)
  5. rehype-stringify (HTML output)
  ↓
FullArticle (with rendered HTML)
  ↓
MDXRemote component renders with custom handlers
```

#### Client-Side State (Article Filters)
```
FilterContext (React Context API)
  ├── filterPublished: boolean (show draft posts?)
  ├── categoryFilter: string (tag-based filtering)
  └── sortOrder: "asc" | "desc" (not used currently)

Used by:
  - ArticleList (reads filters, manages UI)
  - Article filters UI (toggle eye icon, category buttons)
```

### 2.3 Server vs. Client Components

| Component | Type | Purpose | Rationale |
|-----------|------|---------|-----------|
| `app/page.tsx` | Server | Home page rendering | Static content, SEO |
| `app/blog/page.tsx` | Server | Blog listing | Fetches articles at build/request time |
| `app/blog/[slug]/page.tsx` | Server | Blog post view | Static generation, metadata |
| `ArticleList` | Client | Filter & display articles | Interactive filtering |
| `ArticleFilterWrapper` | Client | Filter state management | React Context |
| `ThemeProvider` | Client | Theme management | Needs client-side theme detection |
| `SiteNavigation` | Client (likely) | Navigation menu | Interactions |

**Note**: `ThemeProvider` uses `next-themes` which is client-only due to hydration warnings.

---

## 3. Technology Stack Analysis

### 3.1 Core Framework
- **Next.js 14.2.15** → *Target: Migrate to 15.x*
  - App Router fully adopted (no pages directory)
  - Server Components with Suspense boundaries (partial)
  - Static Generation (blog posts) with ISR capable
  - No API routes currently (pure static/client)

- **React 18**
  - Modern hooks (useState, useContext, useMemo, useCallback)
  - No state management library (Context API used)
  - Suspense for code splitting (basic usage)

- **TypeScript 5**
  - Strict mode enabled: `"strict": true`
  - Type guards (e.g., `isFullArticle()`)
  - Good coverage except for some `any` type usage

### 3.2 Styling & UI
- **Tailwind CSS 3.4.1**
  - Utility-first approach
  - CSS variables for theming
  - Dark mode via `class` strategy

- **Radix UI** (multiple components)
  - Accessible primitives (Avatar, Tooltip, Dialog, etc.)
  - Unstyled components + Tailwind
  - Good accessibility patterns (ARIA labels)

- **shadcn/ui** (component library built on Radix)
  - Pre-built Tailwind components
  - CVA (Class Variance Authority) for variants
  - Copyable, customizable components

- **Framer Motion 11.11.8**
  - Advanced animations (BlurFade, staggered animations)
  - Motion variants for consistency
  - Lightweight alternative to React Spring

### 3.3 Content & Markdown
- **next-mdx-remote 5.0.0**
  - Server-side MDX compilation
  - Custom component mappings
  - No build-time compilation (runtime processing)

- **gray-matter 4.0.3**
  - YAML frontmatter extraction
  - Manual parsing (not via unified pipeline)

- **Unified Ecosystem** (rehype/remark)
  - remark-parse: Markdown parsing
  - remark-rehype: Transform to HTML AST
  - rehype-pretty-code: Syntax highlighting
  - rehype-sanitize: Security sanitization
  - rehype-stringify: HTML output

- **Shiki 1.22.0**
  - Syntax highlighting engine (used by rehype-pretty-code)
  - Theme: "one-dark-pro"

### 3.4 Other Key Dependencies
- **next-themes 0.3.0**: Dark mode management with system preference
- **lucide-react 0.452.0**: Icon library (30+ icons used)
- **clsx 2.1.1**: Class name utilities
- **tailwind-merge 2.5.3**: Merge Tailwind classes intelligently
- **cmdk 1.0.0**: Command palette library (not used in current app)
- **react-markdown 9.0.1**: Markdown rendering (home page summaries)

### 3.5 Development Tools
- **ESLint 8** with Next.js config
  - Custom rules in package.json (unicorn, no-else-return, no-restricted-globals)
  - Very minimal configuration

- **TypeScript 5** (strict mode)
  - No additional plugins
  - Standard tsconfig paths

### 3.6 Package Manager & Build
- **pnpm** (used in CI based on lock file)
- **Next.js build system**: `pnpm build` → static export capable
- **Vercel deployment**: Automatic via git integration

---

## 4. Current Functionality & Features

### 4.1 Primary Features (Implemented)
1. **Home Page**
   - Hero section with avatar
   - About section (Markdown rendering with react-markdown)
   - Projects showcase with videos/images
   - GitHub repositories display
   - Featured articles preview
   - Contact section with email hover card

2. **Blog System**
   - MDX-based blog posts
   - Frontmatter metadata (title, date, tags, summary, image)
   - Dynamic routing with `[slug]`
   - Published/draft status
   - Tag-based filtering
   - Reading time (calculated, not shown)
   - Syntax highlighting in code blocks with copy button
   - JSON-LD structured data for SEO

3. **User Experience**
   - Dark mode toggle (system preference + manual)
   - Smooth animations (BlurFade, staggered transitions)
   - Responsive design (mobile-first)
   - Accessible components (Radix UI + ARIA labels)
   - Custom fonts (Geist)

4. **Technical Features**
   - Static site generation (blog posts pre-rendered)
   - Image optimization (Next.js Image component)
   - Remote image support (7 domains configured)
   - SEO metadata (Open Graph, Twitter cards, JSON-LD)
   - Internationalization (Slovak language used throughout)

### 4.2 Partial/Missing Features
- ❌ Testing framework (no tests)
- ❌ Backend API (no server-side logic)
- ❌ Authentication (public portfolio)
- ❌ Database (hardcoded data)
- ❌ CMS integration (manual MDX files)
- ❌ Comments/interactions on blog
- ❌ Analytics integration
- ❌ Form submissions (email contact)
- ❌ Containerization/Docker
- ⚠️ Error boundaries (minimal implementation)
- ⚠️ Error handling (relies on Next.js defaults)
- ⚠️ Logging (no structured logging)

---

## 5. Code Quality & Patterns Analysis

### 5.1 Strengths

#### Type Safety
```typescript
// Good: Type guards for runtime safety
export function isFullArticle(article: Article): article is FullArticle {
  return typeof article.source === 'string';
}

// Good: Strong typing for interfaces
export interface ArticleMetadata {
  title: string;
  publishedAt: string;
  tags: string[];
  published: boolean;
}
```

#### Component Composition
```typescript
// Good: CVA-based variants for type-safe styling
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  { variants: { variant: {...}, size: {...} } }
)
```

#### Context API Usage
```typescript
// Good: Custom hook with error boundary
export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
```

#### Content Processing Pipeline
```typescript
// Good: Unified pipeline for MDX processing
const p = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, {...})
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeStringify)
  .process(markdown);
```

### 5.2 Weaknesses & Code Smells

#### Hardcoded Data
```typescript
// Weakness: All content hardcoded in resume.tsx
export const DATA = {
  name: "Marián Hollý",
  projects: [...],
  repositories: [...],
  // 100+ lines of hardcoded data
}
```
**Impact**: Not scalable; requires code changes to update content

#### Missing Error Handling
```typescript
// Weakness: Minimal error handling in blog.ts
export async function getBlogPosts(): Promise<Article[]> {
  return getAllPosts(path.join(process.cwd(), "content"));
  // No try-catch; assumes content directory exists
}
```
**Impact**: Crashes on missing files; poor user experience

#### Type Inconsistencies
```typescript
// Weakness: Loosely typed MDX image props
function RoundedImage(props: React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
  width?: number | string;  // Mixed types
  height?: number | string;
}) { ... }
```
**Impact**: Runtime errors possible if wrong type passed

#### Locale-Hardcoded Formatting
```typescript
// Weakness: Slovak locale hardcoded in utils
const fullDate = new Date(dateWithTime).toLocaleString("sk-SK", { ... })
```
**Impact**: Not internationalization-friendly; locale-specific (OK for portfolio, but not best practice)

#### Magic Constants
```typescript
// Weakness: Magic numbers in components
const BLUR_FADE_DELAY = 0.04;  // Used in 20+ places
```
**Impact**: Difficult to maintain; inconsistent if changed in only some places

#### Key Generation Issues
```typescript
// Weakness: Weak key generation
{articles.map((article, id) => (
  <div key={article.slug}>  // Better than index, but could be more stable
))}

// In table component:
<th key={`header-${header}`}>{header}</th>  // Better approach
```
**Impact**: If articles reordered, React re-renders unnecessarily

#### No Suspense Boundaries
```typescript
// Partial: Blog post view has Suspense but no fallback
<Suspense fallback={<p className="h-5" />}>
  <p>{formatDate(post.metadata.publishedAt)}</p>
</Suspense>
```
**Impact**: Minimal benefit; format is synchronous

#### No Input Validation
```typescript
// Weakness: Slug validation exists but limited
if (!slug || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
  throw new Error('Invalid slug format');
}
// But returned as string, not validated type
```

#### Unused Code
```typescript
// In article-wrapper.tsx:
// const resetFilters = () => { ... }  // Commented out
// const toggleSortOrder = () => { ... }  // Commented out
```
**Impact**: Clutters code; confuses future developers

---

## 6. Security Analysis

### 6.1 Implemented Security Measures

#### Input Sanitization
```typescript
const sanitizeSchema = {
  tagNames: ['p', 'div', 'h1', ...],  // Whitelist tags
  attributes: {
    '*': ['className', 'id', 'style', ...],
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height'],
  },
  protocols: {
    href: ['http', 'https', 'mailto', 'tel', '#'],
    src: ['http', 'https', 'data']
  }
};
```
**Status**: ✅ Good - rehype-sanitize prevents XSS

#### Content Security Policy (CSP)
**Status**: ❌ Not configured - No CSP headers set

#### CORS
**Status**: N/A - No API endpoints; static content only

#### HTTPS
**Status**: ✅ Vercel enforces HTTPS

#### Dependency Management
**Status**: ⚠️ Partial
- pnpm-lock.yaml present (good for reproducibility)
- No dependency auditing visible
- No automated security scanning in CI/CD

### 6.2 Security Gaps

| Issue | Severity | Impact | Solution |
|-------|----------|--------|----------|
| No CSP headers | High | Potential XSS vulnerabilities | Configure CSP in `next.config.mjs` |
| No input validation on contact form | Medium | Email injection (if form added) | Add validation layer |
| Hardcoded sensitive data potential | Medium | Could leak info if moved to backend | Use environment variables |
| No rate limiting | Medium | DDoS (if API added) | Implement in middleware/backend |
| No CORS configuration | Medium | Issues when API is added | Configure CORS headers |
| Missing security.md | Low | No vulnerability reporting process | Create proper SECURITY.md |
| No helmet/security headers | Medium | Missing X-Frame-Options, X-Content-Type-Options | Configure via next.config or middleware |

---

## 7. Performance Analysis

### 7.1 Current Performance Metrics
- **Lighthouse Score**: 95+ (reported in DOCUMENTATION.md)
- **FCP (First Contentful Paint)**: < 1s
- **LCP (Largest Contentful Paint)**: < 2.5s (typical)
- **TTI (Time to Interactive)**: < 2s
- **Bundle Size**: Optimized with tree-shaking

### 7.2 Performance Strengths
1. ✅ Static generation for blog posts (fast)
2. ✅ Image optimization via Next.js Image
3. ✅ Code splitting at route level
4. ✅ Minimal external dependencies
5. ✅ Vercel CDN distribution
6. ✅ CSS-in-JS minimized (Tailwind for static)

### 7.3 Performance Optimization Opportunities
| Area | Current | Potential Improvement | Priority |
|------|---------|----------------------|----------|
| MDX Processing | Runtime | Pre-compile at build time | High |
| Data Fetching | File system | Database/API caching | High |
| Analytics | Not implemented | Lightweight analytics (Vercel Analytics) | Low |
| Fonts | Custom font file | Self-hosted (already done) | N/A |
| Component Library | 35 components | Tree-shake unused | Medium |
| Images | Optimized | WebP support | Low |

---

## 8. Testing & Quality Assurance

### 8.1 Current State
- ❌ No test framework configured
- ❌ No test files (*.test.tsx, *.spec.tsx)
- ❌ No CI/CD testing pipeline
- ❌ No pre-commit hooks for linting
- ❌ No type checking in CI

### 8.2 Testing Gaps
```
What should be tested:
├── Unit Tests
│   ├── lib/blog.ts (MDX processing, formatting)
│   ├── lib/utils.ts (date formatting, className utilities)
│   └── lib/types.ts (type guards)
├── Integration Tests
│   ├── Blog post generation (full pipeline)
│   ├── Filter context + ArticleList interaction
│   └── Theme switching
└── E2E Tests
    ├── Blog navigation
    ├── Filtering/sorting
    └── Blog post rendering
```

### 8.3 Recommended Testing Strategy
```
Unit Testing:
  Framework: Vitest (Vite-native, fast)
  Component Testing: React Testing Library
  Snapshot Testing: For components

Integration Testing:
  Testing Library (already mentions React Testing Library)
  Next.js built-in testing capabilities

E2E Testing:
  Framework: Playwright or Cypress
  Coverage: User workflows (blog navigation, filtering)
```

---

## 9. Deployment & Infrastructure

### 9.1 Current Deployment
- **Platform**: Vercel
- **Trigger**: Git push to main branch
- **Environment**: Automatic
- **Status**: Working well (excellent Lighthouse scores)

### 9.2 Deployment Gaps
- ❌ No containerization (Docker)
- ❌ No local development environment standardization
- ❌ No staging environment
- ❌ No environment variables management
- ❌ No CI/CD pipeline (beyond Vercel default)
- ❌ No monitoring/observability

---

## 10. Database & Content Management

### 10.1 Current Approach
- **Blog Content**: MDX files in `content/` directory
- **Static Data**: Hardcoded in `lib/resume.tsx`
- **Storage**: Git repository
- **Versioning**: Via git commits

### 10.2 Limitations
1. No CMS interface (manual file editing)
2. No revision history (git commits only)
3. No drafts workflow (published flag)
4. No user authentication
5. No analytics on posts
6. No comments/interactions

### 10.3 Future Database Considerations
For proposed features (posts-messages template, project documentation):
```
Potential Solutions:
├── Headless CMS (Strapi, Contentful) - Overkill for portfolio
├── Simple Database (PostgreSQL + FastAPI) - Good for future backend
├── Firebase - Quick but vendor lock-in
├── Markdown + GitHub API - Works with GitHub-stored content
└── SQLite + Python (FastAPI) - Lightweight option
```

---

## 11. Roadmap Evaluation: Your Three Proposed Changes

### 11.1 Migration: Next.js 14 → 15

**Assessment**: ✅ **RECOMMENDED & STRAIGHTFORWARD**

**Why Now**:
- Next.js 15 released (2024), stable
- Incremental migration path available
- No major breaking changes for your use case
- Improves performance and stability

**Effort**:
- **Low-Medium** (~4-8 hours)
- Update package.json
- Run `next lint --fix`
- Test blog post generation
- Update CLAUDE.md

**Key Changes in Next.js 15**:
- React 19 support (optional)
- Improved Server Component handling
- Better error messages
- Performance improvements

**Potential Issues**:
- React version updates (peer dependency)
- Framer Motion compatibility (check)
- Animation libraries interaction

**Recommendation**: Do this **FIRST** before other changes. It's low-risk, well-documented, and provides foundation for other improvements.

---

### 11.2 Backend Migration: FastAPI Backend

**Assessment**: ✅ **RECOMMENDED BUT REQUIRES PLANNING**

**Why You Need It**:
- Proposed features (posts-messages) need data persistence
- Dynamic content management
- Future authentication/admin panel
- Scalability

**Architecture Proposal**:
```
Frontend (Next.js 15)          Backend (FastAPI)
   ↓                               ↓
   ├─→ Static pages            ├─→ REST API
   ├─→ Blog (MDX still)        ├─→ Projects endpoint
   └─→ API calls               ├─→ Posts/Messages
                               ├─→ File uploads
                               └─→ Admin endpoints

Database: PostgreSQL (or SQLite for simplicity)
```

**Design Decisions**:
1. **Keep MDX or Move to DB?**
   - **Option A**: Keep MDX files, use FastAPI to serve metadata
   - **Option B**: Move all content to PostgreSQL
   - **Recommendation**: Option A (hybrid) - simpler migration, MDX still works

2. **API Routes**:
   - `/api/posts` - Get all blog posts (metadata)
   - `/api/posts/[slug]` - Get single post (if DB-stored)
   - `/api/projects` - Get projects list (currently hardcoded)
   - `/api/messages` - Post/get messages (new feature)
   - `/api/admin/*` - Admin endpoints (with auth)

3. **Database Schema**:
   ```sql
   Projects (
     id, title, description, image_url,
     github_url, website_url, technologies[], dates
   )

   PostsMessages (
     id, type (post|message|read), title,
     description, image_url, link, tags[], created_at
   )

   BlogMetadata (
     slug, title, publishedAt, tags[],
     summary, image_url, published
   )
   ```

4. **CORS Setup**:
   ```python
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://marianholly.vercel.app"],
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

**Effort**:
- **High** (~20-40 hours)
- Set up FastAPI project structure
- Design database schema
- Create endpoints
- Set up PostgreSQL/SQLite
- Integrate with Next.js frontend
- Environment variables
- Testing (crucial)

**Potential Issues**:
- CORS complexity
- Deployment coordination
- Database migrations
- Connection pooling

**Recommendation**: Do this **SECOND**, after Next.js 15 migration. Plan database schema carefully.

---

### 11.3 Dockerization

**Assessment**: ✅ **RECOMMENDED FOR COMPLETE SOLUTION**

**Benefits**:
- Local development consistency
- Easy deployment to any platform
- Isolates dependencies
- Enables multi-environment setup

**Proposed Docker Architecture**:
```
docker-compose.yml
├── marianholly-frontend (Next.js 15)
│   ├── Node.js 20
│   ├── pnpm install
│   └── next build && next start
│
├── marianholly-backend (FastAPI)
│   ├── Python 3.11+
│   ├── FastAPI app
│   ├── Uvicorn server
│   └── Alembic migrations
│
├── postgres-db
│   ├── PostgreSQL 15+
│   └── Volume for persistence
│
└── nginx (optional)
    └── Reverse proxy
```

**Implementation Files Needed**:
```
Dockerfile (frontend)
  ├── Multi-stage build
  ├── Production vs dev
  └── Optimized layers

Dockerfile (backend)
  ├── Python slim image
  ├── Dependency caching
  └── Non-root user

docker-compose.yml
  ├── All services
  ├── Networks
  ├── Environment variables
  └── Volume management

.dockerignore / .dockerignore.backend

docker-entrypoint.sh (for migrations)

GitHub Actions CI/CD
  ├── Build images
  ├── Run tests
  └── Push to registry (optional)
```

**Effort**:
- **Low-Medium** (~10-15 hours)
- Write Dockerfiles (both services)
- Create docker-compose.yml
- Test locally
- Update CI/CD (GitHub Actions)

**Recommendation**: Do this **THIRD**, after backend is working. Requires stable FastAPI setup first.

---

## 12. Testing Strategy & Recommendations

### 12.1 Testing Pyramid for Your App

```
                        E2E Tests (Playwright)
                    /                          \
                Integration Tests
            /                          \
        Unit Tests
    /                              \
Linting & Type Checking
```

### 12.2 Recommended Testing Setup

#### Phase 1: Unit Tests (First)
```typescript
// Example: lib/utils.test.ts
import { formatDate, formatDateShort, cn, isValidNumber } from '@/lib/utils'

describe('formatDate', () => {
  it('returns "dnes" for today', () => {
    const today = new Date().toISOString()
    expect(formatDate(today)).toBe('dnes')
  })

  it('returns "včera" for yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString()
    expect(formatDate(yesterday)).toBe('včera')
  })
})

describe('cn (class merging)', () => {
  it('merges Tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-6')
    expect(result).toContain('px-6')  // Later class wins
    expect(result).not.toContain('px-4')
  })
})
```

#### Phase 2: Component Tests
```typescript
// Example: components/ArticleList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ArticleList from '@/components/article-list'
import { FilterContext } from '@/components/article-wrapper'

describe('ArticleList', () => {
  it('renders articles', () => {
    const articles = [
      {
        slug: 'test-post',
        metadata: {
          title: 'Test Post',
          publishedAt: '2024-01-01',
          tags: ['test'],
          published: true,
        },
      },
    ]

    render(
      <FilterContext.Provider value={mockContextValue}>
        <ArticleList articles={articles} />
      </FilterContext.Provider>
    )

    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })

  it('filters articles by category', () => {
    // Test filtering logic
  })
})
```

#### Phase 3: Integration Tests
```typescript
// Example: lib/blog.test.ts
import { getBlogPosts, getPost, markdownToHTML } from '@/lib/blog'

describe('Blog Processing', () => {
  describe('getBlogPosts', () => {
    it('returns array of articles', async () => {
      const posts = await getBlogPosts()
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
    })

    it('filters published posts', async () => {
      const posts = await getBlogPosts()
      const filtered = posts.filter(p => p.metadata.published)
      expect(filtered.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('getPost', () => {
    it('returns full article with HTML content', async () => {
      const post = await getPost('object-oriented-programming')
      expect(post).toBeDefined()
      expect(post?.source).toContain('<')
      expect(post?.metadata.title).toBeDefined()
    })

    it('returns null for non-existent post', async () => {
      const post = await getPost('non-existent-post')
      expect(post).toBeNull()
    })
  })

  describe('markdownToHTML', () => {
    it('converts markdown to HTML', async () => {
      const html = await markdownToHTML('# Test Heading')
      expect(html).toContain('<h1>')
    })

    it('sanitizes HTML properly', async () => {
      const malicious = '<script>alert("xss")</script>'
      const html = await markdownToHTML(malicious)
      expect(html).not.toContain('<script>')
    })
  })
})
```

#### Phase 4: E2E Tests
```typescript
// Example: tests/e2e/blog.spec.ts (Playwright)
import { test, expect } from '@playwright/test'

test('blog navigation workflow', async ({ page }) => {
  // Navigate to blog
  await page.goto('/')
  await page.click('a[href="/blog"]')
  expect(page.url()).toContain('/blog')

  // Check articles render
  const articles = await page.locator('a[href*="/blog/"]')
  expect(await articles.count()).toBeGreaterThan(0)

  // Click first article
  await articles.first().click()
  expect(page.url()).toContain('/blog/')

  // Verify content
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('article')).toBeVisible()
})

test('blog filtering works', async ({ page }) => {
  await page.goto('/blog')

  // Toggle draft posts
  const filterBtn = page.locator('button[role="button"]').first()
  await filterBtn.click()

  // Verify articles rerender
  const articles = await page.locator('a[href*="/blog/"]')
  expect(await articles.count()).toBeGreaterThanOrEqual(0)
})
```

### 12.3 Test Coverage Goals

| Area | Current | Target | Priority |
|------|---------|--------|----------|
| Utilities (lib/utils.ts) | 0% | 100% | High |
| Type guards (lib/types.ts) | 0% | 100% | High |
| Blog processing (lib/blog.ts) | 0% | 90% | High |
| Components (ArticleList, etc.) | 0% | 70% | High |
| UI Components | 0% | 50% | Medium |
| E2E Workflows | 0% | 80% | Medium |
| **Overall** | **0%** | **75%** | - |

### 12.4 Testing Tools & Setup

**Recommended Stack**:
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "jsdom": "^23.0.0",
    "@playwright/test": "^1.40.0",
    "playwright": "^1.40.0"
  }
}
```

**Configuration Files Needed**:
```
vitest.config.ts (unit/integration)
playwright.config.ts (e2e)
coverage.config.ts (coverage reporting)
```

---

## 13. Security Hardening Checklist

### Before Production with Backend/Dockerization:

- [ ] Configure Content Security Policy (CSP) in next.config.mjs
- [ ] Add security headers (X-Frame-Options, X-Content-Type-Options, HSTS)
- [ ] Implement CORS properly for FastAPI + Next.js
- [ ] Set up environment variables (.env.local, .env.production)
- [ ] Add rate limiting to FastAPI endpoints
- [ ] Implement request validation (Pydantic models)
- [ ] Add authentication/authorization for admin endpoints
- [ ] Use HTTPS only (already done on Vercel)
- [ ] Implement input sanitization on forms
- [ ] Add logging and monitoring
- [ ] Update SECURITY.md with vulnerability reporting policy
- [ ] Set up dependency scanning (Dependabot)
- [ ] Add pre-commit hooks for security scanning

---

## 14. Code Refactoring Priorities

### Phase 1: Quality Foundation (Before Backend)
1. ✅ Migrate Next.js to 15
2. ✅ Add basic linting rules
3. ✅ Extract magic constants to constants file
4. ✅ Remove commented-out code
5. ✅ Add error boundaries to pages
6. ✅ Improve error handling in blog.ts
7. ✅ Add input validation helpers

### Phase 2: Testing (Parallel with Backend)
1. ✅ Set up Vitest + React Testing Library
2. ✅ Add unit tests for utilities
3. ✅ Add integration tests for blog processing
4. ✅ Add component tests for ArticleList
5. ✅ Set up Playwright for E2E
6. ✅ Configure CI/CD (GitHub Actions)

### Phase 3: Backend & Infrastructure (Concurrent)
1. ✅ Scaffold FastAPI project
2. ✅ Design database schema
3. ✅ Create API endpoints
4. ✅ Dockerize both services
5. ✅ Set up docker-compose
6. ✅ Configure environment management

### Phase 4: Advanced Features
1. ✅ Extract hardcoded data to database
2. ✅ Add posts-messages feature
3. ✅ Implement admin panel (if needed)
4. ✅ Add analytics/monitoring
5. ✅ Deploy to alternative platform (AWS, DigitalOcean, etc.)

---

## 15. Detailed Gap Analysis

### 15.1 Not Yet Explored
Due to tooling limitations, the following areas require manual inspection:

- ⚠️ **Actual test file count** (confirmed 0)
- ⚠️ **CI/CD configuration** (Vercel default, no GitHub Actions)
- ⚠️ **GitHub-specific features** (Actions, workflows)
- ⚠️ **Environment variable usage** (none currently)
- ⚠️ **API endpoints** (none currently)
- ⚠️ **Database setup** (none currently)
- ⚠️ **Docker configuration** (none currently)
- ⚠️ **Pre-commit hooks** (none configured)
- ⚠️ **Logging/monitoring** (none implemented)
- ⚠️ **Performance profiling results** (Lighthouse scores assumed correct)

### 15.2 Assumptions Made
1. All performance metrics from DOCUMENTATION.md are accurate
2. Vercel deployment is the only deployment method
3. Content directory structure is static
4. No backend processing occurs
5. No authentication is needed currently
6. pnpm is the package manager (based on pnpm-lock.yaml)

---

## 16. Recommendations Summary

### Short-Term (Next 2-4 weeks)
1. **Migrate to Next.js 15** ✅ DO THIS FIRST
   - Low effort, high confidence
   - Establishes modern foundation
   - Better error messages for debugging

2. **Add Basic Tests** ✅ PARALLEL
   - Unit tests for utilities (2-3 hours)
   - Integration tests for blog (3-4 hours)
   - Small, manageable chunks

3. **Code Quality Improvements** ✅ PARALLEL
   - Remove commented code
   - Extract magic constants
   - Add error boundaries
   - Improve error handling

### Medium-Term (Weeks 4-12)
1. **Backend Setup (FastAPI)** ✅ WELL-PLANNED
   - Clear database schema
   - Incremental API migration
   - Start with non-critical endpoints

2. **Comprehensive Testing** ✅ SYSTEMATIC
   - Achieve 70%+ code coverage
   - Set up CI/CD (GitHub Actions)
   - E2E test blog workflows

3. **Dockerization** ✅ CLEAN SETUP
   - Multi-service docker-compose
   - Environment consistency
   - Local dev environment docs

### Long-Term (Weeks 12+)
1. **Advanced Features**
   - Posts-messages template
   - Project documentation
   - Admin panel (if needed)

2. **Deployment Alternatives**
   - AWS, DigitalOcean, Heroku
   - Container registry setup
   - Multi-environment strategy

3. **Monitoring & Analytics**
   - Application monitoring
   - Error tracking (Sentry)
   - User analytics (Posthog)

---

## 17. Risk Assessment

| Change | Risk | Mitigation | Confidence |
|--------|------|-----------|------------|
| Next.js 14→15 | Low | Test on branch, gradual rollout | Very High |
| FastAPI Backend | Medium | Start with non-critical endpoints | High |
| Docker | Low-Medium | Local testing before deploy | High |
| Testing Framework | Low | Vitest mature & stable | Very High |
| Database Setup | Medium | Clear schema, migrations | High |
| Env Management | Low | Template .env files | Very High |

---

## 18. Conclusion

The **marianholly** portfolio is a **well-designed, modern React application** with solid fundamentals. The proposed roadmap (Next.js 15 → FastAPI backend → Dockerization → Comprehensive Testing) is **achievable, logical, and follows industry best practices**.

### Key Strengths to Preserve
- Clean component architecture
- Strong TypeScript usage
- Accessible UI patterns
- Performance optimization
- Good separation of concerns

### Key Areas to Improve
- Add automated testing (0% → 75%)
- Implement error handling throughout
- Extract hardcoded data to database
- Add backend infrastructure
- Containerize for consistency
- Implement CI/CD pipeline

### Strategic Value
This refactoring will transform the portfolio from a **static showcase** into a **production-ready, scalable platform** that demonstrates **mid-level (medior) engineering skills**:
- Architectural thinking (layered, service separation)
- Infrastructure understanding (Docker, databases)
- Code quality practices (testing, error handling)
- DevOps awareness (CI/CD, containerization)
- Security considerations (CORS, validation, sanitization)

The application will be **more professional, reliable, maintainable, and impressive** to potential employers.

---

**Analysis Date**: October 27, 2025
**Status**: Complete - Ready for implementation planning
