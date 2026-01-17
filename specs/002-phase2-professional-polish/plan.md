# Implementation Plan: Phase 2 Professional Polish

**Branch**: `002-phase2-professional-polish` | **Date**: 2025-12-14 | **Spec**: [Phase 2 Specification](spec.md)

**Input**: Feature specification from `/specs/002-phase2-professional-polish/spec.md`

**Note**: This implementation plan details the technical architecture, design decisions, and phased approach for Phase 2 professional polish (CI/CD, TypeScript improvements, performance documentation, blog engagement).

---

## Summary

Phase 2 elevates the portfolio from "production-ready" to "professionally architected." The implementation prioritizes automation and type safety first, then enhances blog features. Key deliverable: a CI/CD pipeline that runs on every push, preventing regressions.

**Core Technical Approach**:
1. **CI/CD Foundation First**: GitHub Actions workflow that runs linting, tests, and builds
2. **Type Safety**: Enable TypeScript strict mode, define interfaces, add JSDoc
3. **Performance Verification**: Run Lighthouse, document evidence, bundle analyze
4. **Blog Enhancement**: Reading time, table of contents, share buttons, view counter

---

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x, Next.js 14.x

**Primary Dependencies**:
- CI/CD: GitHub Actions (free, native to GitHub)
- TypeScript: Existing tsconfig.json (just enable strict mode)
- Performance: Lighthouse CLI (built into DevTools, no new dependencies)
- Blog: API route for view counter (simple file-based or Vercel KV)

**Storage**: File-based view counter (for MVP) or Vercel KV (production-grade)

**Testing**: Existing Vitest setup from Phase 1 (no new test runner)

**Target Platform**: Web (Next.js on Vercel, GitHub Actions CI)

**Project Type**: Single monolith web application

**Performance Goals**:
- Lighthouse 90+ Performance, 95+ Accessibility
- Initial JS < 100KB
- Total page < 500KB
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Constraints**:
- CI must complete in < 3 minutes
- Must not break Phase 1 functionality
- Blog features must be < 5KB additional code
- TypeScript strict mode must not introduce compilation errors

---

## Constitution Check

| Principle | Requirement | Phase 2 Implementation |
|-----------|-------------|----------------------|
| **I. Production-Ready Code** | Type-safe, error-free, tested | ✅ Strict mode + CI gates |
| **II. Quality-First Workflow** | Tests → types → code | ✅ Automated CI/CD enforces this |
| **III. Language Consistency** | 100% English | ✅ Maintained from Phase 1 |
| **IV. Evidence-Based Claims** | Proof for all claims | ✅ Lighthouse screenshots in repo |
| **V. CI/CD Automation** | Linting/testing automated | ✅ Full GitHub Actions implementation |

**Constitution Alignment**: Phase 2 fully implements Principle V and strengthens Principles I, II, IV.

---

## Project Structure

### Documentation

```
specs/002-phase2-professional-polish/
├── spec.md              # Feature specification
├── plan.md              # This file
├── tasks.md             # Task checklist (generated via /speckit.tasks)
└── checklists/
    └── requirements.md  # Quality validation
```

### Source Code Changes

```
# CI/CD
.github/
├── workflows/
│   └── ci.yml                          # GitHub Actions workflow (NEW)
└── performance/
    ├── lighthouse-mobile.png           # Evidence (NEW)
    ├── lighthouse-desktop.png          # Evidence (NEW)
    └── bundle-analysis.md              # Report (NEW)

# TypeScript Configuration
tsconfig.json                           # Enable strict mode (MODIFIED)
lib/types.ts                            # Centralized types (NEW/MODIFIED)
lib/resume.tsx                          # Add DATA interface (MODIFIED)

# Blog Engagement Features
app/api/views/[slug]/route.ts          # View counter API (NEW)
components/reading-time.tsx             # Reading time component (NEW)
components/table-of-contents.tsx        # TOC component (NEW)
components/share-buttons.tsx            # Share buttons (NEW)
app/blog/[slug]/page.tsx                # Integrate components (MODIFIED)
lib/blog.ts                             # Add heading extraction (MODIFIED)

# Documentation
README.md                               # Add CI badge, performance section (MODIFIED)
```

---

## Phase Breakdown

### Phase 0: CI/CD Foundation (3-4 hours)

**Objective**: Create and test GitHub Actions workflow

**Tasks**:
1. Create `.github/workflows/ci.yml` with:
   - Lint job (runs `pnpm lint`, fails if errors)
   - Test job (runs `pnpm test`, fails if test failures or coverage drops)
   - Build job (runs `pnpm build`, fails if TypeScript errors)
   - pnpm cache for speed (< 3 min total runtime)
   - Matrix: run on Node 18+
   - Trigger: on push to main, all PRs, manual trigger

2. Test workflow:
   - Push test commit to feature branch
   - Verify all jobs run in GitHub Actions UI
   - Verify jobs complete in < 3 minutes
   - Verify green checkmarks appear on PR

3. Configure branch protection:
   - Require CI to pass before PR merge
   - Require status checks passing
   - Dismiss stale reviews when code changes

4. Add build status badge to README:
   - Badge shows current workflow status (green = passing)
   - Links to GitHub Actions workflow

**Deliverable**: Automated CI/CD pipeline running on every commit

---

### Phase 1: TypeScript Strict Mode (2-3 hours)

**Objective**: Enable strict mode, fix all errors, define types

**Tasks**:
1. Enable TypeScript strict mode in `tsconfig.json`:
   - `"strict": true`
   - `"noImplicitAny": true`
   - `"strictNullChecks": true`
   - `"strictFunctionTypes": true`
   - `"noImplicitThis": true`

2. Run `pnpm build` and identify TypeScript errors (if any)
   - Most Phase 1 work should have already fixed errors
   - Fix any remaining implicit any types

3. Create/update `lib/types.ts` with centralized interfaces:
   - `type Article` (from existing code)
   - `type ArticleMetadata` (title, date, tags, etc.)
   - `type FullArticle` (article + content)
   - `type BlogPost` (for component props)
   - Any other shared types

4. Update `lib/resume.tsx`:
   - Define `interface DATA` for resume data structure
   - Apply interface to DATA object
   - Verify no TypeScript errors

5. Add JSDoc comments to all exported functions:
   - `lib/blog.ts`: Each function has JSDoc with parameters + return type
   - `lib/utils.ts`: Each utility function documented
   - `lib/types.ts`: Type definitions documented

6. Run `pnpm build` final verification: zero errors

**Deliverable**: TypeScript strict mode enabled, all types defined, no compilation errors

---

### Phase 2: Performance Documentation (2-3 hours)

**Objective**: Generate evidence and document performance

**Tasks**:
1. Run Lighthouse audits:
   - Open marianholly.vercel.app in Chrome
   - Chrome DevTools → Lighthouse
   - Audit for mobile (Mobile device throttling)
   - Audit for desktop (No throttling)
   - Take screenshots of all 4 metrics (Performance, Accessibility, Best Practices, SEO)

2. Document Core Web Vitals:
   - Use PageSpeed Insights (pagespeed.web.dev)
   - Enter marianholly.vercel.app
   - Record LCP, FID, CLS values
   - Capture screenshot

3. Bundle size analysis:
   - Install `@next/bundle-analyzer` as dev dependency
   - Add to `next.config.js`:
     ```javascript
     const withBundleAnalyzer = require('@next/bundle-analyzer')({
       enabled: process.env.ANALYZE === 'true',
     })
     export default withBundleAnalyzer({...})
     ```
   - Run `ANALYZE=true pnpm build`
   - Screenshot the analysis showing JS sizes
   - Document findings in `.github/performance/bundle-analysis.md`

4. Store evidence in repository:
   - Create `.github/performance/` directory
   - Store Lighthouse screenshots:
     - `lighthouse-mobile.png`
     - `lighthouse-desktop.png`
   - Store bundle analysis:
     - `bundle-analysis.md` with sizes and summary

5. Update README performance section:
   - Add heading "## Performance"
   - Reference Lighthouse evidence
   - Include actual scores (e.g., "Performance: 92, Accessibility: 98")
   - Document Core Web Vitals
   - Link to screenshot images in repo

**Deliverable**: Performance evidence stored in repo, README updated with proof

---

### Phase 3: Blog Engagement Features (4-6 hours)

**Objective**: Add reading time, table of contents, share buttons, view counter

**Strategy**: Build incrementally, verify each feature works before moving to next

#### 3A: Reading Time & Heading Extraction (1 hour)

**Tasks**:
1. Update `lib/blog.ts`:
   - Add function `calculateReadingTime(wordCount)` - returns "5 min read" format
   - Add function `extractHeadings(htmlContent)` - parses h2/h3 headings into structured array:
     ```typescript
     [
       { text: "Section 1", id: "section-1", level: 2 },
       { text: "Subsection 1.1", id: "subsection-11", level: 3 }
     ]
     ```

2. Create `components/reading-time.tsx`:
   - Props: `wordCount: number`
   - Display: "5 min read" or similar
   - Style to match blog post header

3. Test reading time:
   - Verify calculation (assume 200 words/min)
   - Test edge cases (0 words, 1 word, very long post)

**Deliverable**: Reading time displays on blog posts

#### 3B: Table of Contents (1 hour)

**Tasks**:
1. Create `components/table-of-contents.tsx`:
   - Props: `headings: Heading[]`
   - Render nested list of headings with links
   - Links use `#` to jump to section IDs
   - Style with indentation for h3 vs h2

2. Update `app/blog/[slug]/page.tsx`:
   - Extract headings from blog content
   - Pass to TableOfContents component
   - Conditionally show only if 3+ headings
   - Place near top of post (before content)

3. Test table of contents:
   - Verify links navigate to correct sections
   - Verify smooth scroll (browser default)
   - Test on mobile (readable and usable)

**Deliverable**: Table of contents navigates to headings

#### 3C: Share Buttons (1 hour)

**Tasks**:
1. Create `components/share-buttons.tsx`:
   - Props: `slug: string, title: string`
   - Render LinkedIn and Twitter share buttons
   - Use browser share APIs when available, fallback to URLs
   - LinkedIn share URL: `https://www.linkedin.com/sharing/share-offsite/?url=[encoded_url]`
   - Twitter share URL: `https://x.com/intent/tweet?text=[text]&url=[encoded_url]`

2. Update `app/blog/[slug]/page.tsx`:
   - Pass blog slug and title to ShareButtons
   - Place near top or bottom of post

3. Test share buttons:
   - Click LinkedIn share, verify dialog opens
   - Click Twitter share, verify dialog opens
   - Test on mobile (buttons visible, functional)

**Deliverable**: Share buttons functional and styled

#### 3D: View Counter API & Persistence (2 hours)

**Tasks**:
1. Choose storage approach:
   - **Option A (Simple)**: File-based in `.cache/views.json` (no external service)
   - **Option B (Production)**: Vercel KV if available

2. Create `app/api/views/[slug]/route.ts`:
   - GET: Retrieve view count for slug
   - POST: Increment view count for slug
   - Response: `{ slug, views, timestamp }`
   - Error handling: Graceful failures (return default count if error)

3. For file-based approach:
   - Create `.cache/views.json` (gitignored)
   - Lock writes to prevent concurrent issues (fs promises)
   - Format: `{ "blog-slug-1": 42, "blog-slug-2": 15 }`

4. Create `components/view-counter.tsx`:
   - Fetch from API on component mount
   - Display view count (e.g., "1,234 views")
   - Call POST API to increment count
   - Handle loading and error states gracefully

5. Update `app/blog/[slug]/page.tsx`:
   - Add ViewCounter component
   - Pass slug as prop
   - Place in header or footer

6. Test view counter:
   - Load blog post
   - Verify view count displays
   - Reload page and verify count increments
   - Check `.cache/views.json` file for persistence
   - Test on mobile and desktop

**Deliverable**: View counter tracks and persists blog post views

---

## Testing Strategy for Phase 2

**CI/CD**: Manual testing only
- Push test commit, verify GitHub Actions runs
- Create PR, verify checks block merge if test fails
- Merge to main, verify production deployment

**TypeScript**: Automated by CI/CD
- `pnpm build` runs in CI and fails if errors
- No additional test writing required

**Performance**: Manual verification
- Run Lighthouse audits locally and in production
- Document actual scores (not aspirational)

**Blog Features**: Manual testing of functionality
- Blog posts display reading time and TOC
- Share buttons work
- View counter increments and persists

---

## Code Quality Gates

### CI/CD Workflow Gates

```yaml
# All must pass before PR can merge:
- Lint: pnpm lint → zero errors
- Test: pnpm test → all tests pass, coverage maintained
- Build: pnpm build → zero TypeScript errors
- Time: All jobs complete in < 3 minutes
```

### TypeScript Gates

```typescript
// tsconfig.json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictFunctionTypes": true,
"noImplicitThis": true
```

### Performance Gates

```
Lighthouse Performance: 90+
Lighthouse Accessibility: 95+
Initial JS: < 100KB
Total page: < 500KB
Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

---

## Dependencies & Blockers

### Internal Dependencies
- Phase 0 (CI/CD) → Foundation for all subsequent work
- Phase 1 (TypeScript) → Independent but benefits from CI
- Phase 2 (Performance) → Independent of Phase 0/1
- Phase 3 (Blog Features) → Independent of Phase 0/1/2

### External Dependencies
- Phase 1 MUST complete before Phase 2 (CI requires passing tests)
- GitHub Actions available (free on public repos)
- Lighthouse API/CLI available (built into Chrome)

### Blockers for Phase 3
- Phase 2 MUST complete before Phase 3 (new features should pass CI)

---

## Success Criteria from Spec

**CI/CD**:
- ✅ GitHub Actions runs on every push
- ✅ All jobs pass in < 3 minutes
- ✅ Build status badge in README
- ✅ PR merge blocked if CI fails

**TypeScript**:
- ✅ Strict mode enabled
- ✅ Zero implicit any types
- ✅ All exported functions have JSDoc
- ✅ DATA object has interface
- ✅ Zero TypeScript errors

**Performance**:
- ✅ Lighthouse screenshots taken (mobile + desktop)
- ✅ Bundle analysis stored
- ✅ Core Web Vitals documented
- ✅ Evidence in `.github/performance/`
- ✅ README references proof

**Blog Features**:
- ✅ Reading time displays
- ✅ Table of contents works
- ✅ Share buttons functional
- ✅ View counter increments
- ✅ All features work on mobile/desktop

---

## Time Breakdown

| Phase | Hours | Notes |
|-------|-------|-------|
| Phase 0 - CI/CD Setup | 3-4 | GitHub Actions workflow |
| Phase 1 - TypeScript | 2-3 | Strict mode + types |
| Phase 2 - Performance | 2-3 | Audits + documentation |
| Phase 3 - Blog Features | 4-6 | Reading time, TOC, share, views |
| **Total** | **11-16 hours** | Within 10-14 hour budget |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| CI takes > 3 minutes | Medium | Medium | Optimize cache, parallel jobs if needed |
| Strict mode causes many errors | Low | Medium | Phase 1 work should have fixed most |
| Bundle size increased | Low | Low | Analyze and optimize dependencies |
| View counter has race conditions | Low | Low | Use fs promises locking (file-based) |
| Blog features cause performance regression | Low | Low | Test performance before merging |

---

## Notes

This plan keeps Phase 2 focused on professionalism and type safety. Blog features are enhancements (P2 priority) and can be deferred if time is tight.

**Critical Path**: CI/CD → TypeScript → Performance → Blog Features
**Can Skip**: Blog features if time is limited (still get 80% hiring impact from CI/CD + TypeScript)

**Next Steps**:
1. Generate task list via `/speckit.tasks`
2. Execute Phase 1 (16-17 hours)
3. Then execute Phase 2 (11-16 hours)
4. Then plan Phase 3 (backend project)
