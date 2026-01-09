---
description: "Phase 2 Professional Polish task list for CI/CD, TypeScript, Performance, Blog engagement"
---

# Tasks: Phase 2 Professional Polish

**Input**: Design documents from `/specs/002-phase2-professional-polish/`
**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for user stories)

**Organization**: Tasks grouped by user story phase to enable independent implementation of each story.

---

## Format: `[ID] [P?] [Phase] Description`

- **[ID]**: Task identifier (T001, T002, etc.)
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Phase]**: Which phase/story this task belongs to (Foundation, CI/CD, TypeScript, Performance, Blog)
- Include exact file paths in descriptions

---

## Phase 0: Prerequisites Check (30 min)

**Purpose**: Verify Phase 1 completion before starting Phase 2
**GATE**: Must pass before proceeding to Phase 1

- [x] T001 [Foundation] Verify Phase 1 complete: `pnpm test` passes with 30%+ coverage
- [x] T002 [Foundation] Verify Phase 1 complete: `pnpm lint` passes with zero ESLint errors
- [x] T003 [Foundation] Verify Phase 1 complete: `pnpm build` succeeds with zero TypeScript errors
- [x] T004 [Foundation] Verify Phase 1 complete: Live site at marianholly.vercel.app loads without console errors
- [x] T005 [Foundation] Verify Phase 1 complete: All content is 100% English (no Slovak text visible)

**Checkpoint**: Phase 1 fully complete; ready for Phase 2 work

---

## Phase 1: CI/CD Pipeline Foundation (3-4 hours)

**Purpose**: Implement automated quality checks on every push/PR
**GATE**: Must complete before other Phase 2 work (all subsequent work benefits from CI)

- [x] T006 [P] [CI/CD] Create `.github/workflows/ci.yml` with job structure for lint, test, build
- [x] T007 [P] [CI/CD] Configure lint job in ci.yml: runs `pnpm lint`, fails on ESLint errors, timeout 10m
- [x] T008 [P] [CI/CD] Configure test job in ci.yml: runs `pnpm test`, fails on test failures, timeout 10m
- [x] T009 [P] [CI/CD] Configure build job in ci.yml: runs `pnpm build`, fails on TypeScript errors, timeout 10m
- [x] T010 [CI/CD] Setup pnpm caching in ci.yml: cache pnpm modules and store (saves time in subsequent runs)
- [x] T011 [CI/CD] Configure workflow triggers in ci.yml: runs on `push` to main and all PRs, add manual trigger option
- [ ] T012 [CI/CD] Verify workflow file is valid: push to feature branch and check GitHub Actions tab for successful run
- [ ] T013 [CI/CD] Verify all jobs complete in under 3 minutes: check workflow run times in GitHub Actions UI
- [ ] T014 [CI/CD] Configure branch protection rules: require all status checks passing before PR merge
- [x] T015 [CI/CD] Add build status badge to README.md: add GitHub Actions workflow status badge in header
- [ ] T016 [CI/CD] Test CI blocking PR merge: create PR with intentional lint/test/build failure, verify merge blocked
- [ ] T017 [CI/CD] Test CI unblocking PR merge: fix the failure, verify PR now shows passing checks

**Checkpoint**: Automated CI/CD pipeline working; all commits/PRs checked automatically

---

## Phase 2: TypeScript Type Safety (2-3 hours)

**Purpose**: Enable strict mode and define clear types throughout codebase
**Dependencies**: Requires Phase 1 CI/CD (CI will validate TypeScript in subsequent phases)

- [x] T018 [P] [TypeScript] Enable TypeScript strict mode in `tsconfig.json`: set `"strict": true`
- [x] T019 [P] [TypeScript] Enable all strictness flags in `tsconfig.json`:
  - `"noImplicitAny": true`
  - `"strictNullChecks": true`
  - `"strictFunctionTypes": true`
  - `"noImplicitThis": true`
- [x] T020 [TypeScript] Run `pnpm build` and identify any TypeScript errors introduced by strict mode
- [x] T021 [TypeScript] Fix all TypeScript errors in source code (should be minimal from Phase 1)
- [ ] T022 [P] [TypeScript] Create/review `lib/types.ts` with centralized type definitions:
  - `type Article` (blog post with metadata)
  - `type ArticleMetadata` (title, date, tags, summary, etc.)
  - `type FullArticle` (article + content)
  - Any other shared types used across components
- [ ] T023 [TypeScript] Update `lib/resume.tsx`: create and apply `interface DATA` to resume data object
- [ ] T024 [TypeScript] Verify resume.tsx interface: no TypeScript errors, IDE shows correct types on hover
- [ ] T025 [P] [TypeScript] Add JSDoc comments to all exported functions in `lib/blog.ts`:
  - Document each parameter with type
  - Document return type
  - Add brief description of what function does
- [ ] T026 [P] [TypeScript] Add JSDoc comments to all exported functions in `lib/utils.ts`:
  - Document each parameter with type
  - Document return type
  - Add brief description
- [ ] T027 [P] [TypeScript] Add JSDoc comments to exported functions in `lib/types.ts` if any
- [ ] T028 [TypeScript] Search codebase for implicit any: grep for "any" type usage
- [ ] T029 [TypeScript] Fix or document any remaining implicit any types (should be zero)
- [ ] T030 [TypeScript] Run `pnpm build` final verification: zero TypeScript errors
- [ ] T031 [TypeScript] Push to feature branch and verify CI passes (lint, test, build all green)

**Checkpoint**: TypeScript strict mode enabled, all types defined, CI passing

---

## Phase 3: Performance Documentation (2-3 hours)

**Purpose**: Generate and document actual performance evidence
**Dependencies**: Independent (can run in parallel with Phase 2 if desired)

- [ ] T032 [P] [Performance] Create `.github/performance/` directory for storing performance evidence
- [ ] T033 [Performance] Run Lighthouse audit for desktop:
  - Open marianholly.vercel.app in Chrome
  - DevTools → Lighthouse
  - Select "Desktop" device
  - Run audit for Performance, Accessibility, Best Practices, SEO
  - Take screenshot showing all scores
  - Save as `.github/performance/lighthouse-desktop.png`
- [ ] T034 [Performance] Run Lighthouse audit for mobile:
  - Open marianholly.vercel.app in Chrome
  - DevTools → Lighthouse
  - Select "Mobile" device
  - Run audit for all metrics
  - Take screenshot showing all scores
  - Save as `.github/performance/lighthouse-mobile.png`
- [ ] T035 [P] [Performance] Document actual Lighthouse scores in `.github/performance/lighthouse-scores.md`:
  - Desktop Performance score (aim 90+)
  - Desktop Accessibility score (aim 95+)
  - Desktop Best Practices score (aim 95+)
  - Desktop SEO score (should be 100)
  - Same for mobile
  - Include date of audit
- [ ] T036 [Performance] Measure Core Web Vitals:
  - Use PageSpeed Insights (pagespeed.web.dev)
  - Enter marianholly.vercel.app URL
  - Record LCP, FID, CLS values
  - Document in `.github/performance/core-web-vitals.md`
- [ ] T037 [P] [Performance] Install @next/bundle-analyzer: `pnpm add -D @next/bundle-analyzer`
- [ ] T038 [Performance] Configure bundle analyzer in `next.config.js`:
  - Import withBundleAnalyzer
  - Wrap Next.js config with analyzer
  - Configure to run when ANALYZE=true env var set
- [ ] T039 [Performance] Generate bundle analysis:
  - Run `ANALYZE=true pnpm build`
  - Review output showing JS chunk sizes
  - Take screenshot of bundle analysis
  - Save as `.github/performance/bundle-analysis.png`
- [ ] T040 [P] [Performance] Document bundle size findings in `.github/performance/bundle-analysis.md`:
  - Initial JS bundle size (aim < 100KB)
  - Total page size (aim < 500KB)
  - Largest chunks and their purposes
  - Any opportunities for optimization noted
- [ ] T041 [Performance] Update README.md with performance section:
  - Add heading "## Performance"
  - Include actual Lighthouse scores (not aspirational targets)
  - Reference stored evidence: "See [Lighthouse report](/.github/performance/lighthouse-desktop.png)"
  - Include Core Web Vitals metrics
  - Include bundle size information
  - Add links to evidence images/reports
- [ ] T042 [Performance] Verify all evidence files exist and are readable:
  - `.github/performance/lighthouse-desktop.png`
  - `.github/performance/lighthouse-mobile.png`
  - `.github/performance/core-web-vitals.md`
  - `.github/performance/bundle-analysis.md`
  - All referenced in README.md

**Checkpoint**: Performance evidence documented with proof; README references actual metrics

---

## Phase 4: Blog Engagement Features (4-6 hours)

**Purpose**: Add reading time, table of contents, share buttons, view counter to blog
**Dependencies**: Independent but benefits from Phase 1 CI/CD (tests will pass in CI)

### 4A: Reading Time & Heading Extraction (1 hour)

- [ ] T043 [P] [Blog] Update `lib/blog.ts`: add function `calculateReadingTime(wordCount: number): string`
  - Calculate reading time at 200 words per minute
  - Return format: "5 min read" or "1 min read"
  - Handle edge cases: 0 words, 1 word

- [ ] T044 [P] [Blog] Update `lib/blog.ts`: add function `extractHeadings(htmlContent: string): Heading[]`
  - Parse HTML content for h2 and h3 headings
  - Extract text content and generate ID (slug from text)
  - Return array of `{ text, id, level }`
  - Example: `[{ text: "Introduction", id: "introduction", level: 2 }]`

- [ ] T045 [Blog] Create `components/reading-time.tsx` component:
  - Props: `wordCount: number`
  - Display: "5 min read" formatted nicely
  - Style to match blog post typography
  - Position in blog post header

- [ ] T046 [Blog] Integrate reading time into blog post:
  - Update `app/blog/[slug]/page.tsx`
  - Calculate word count from blog content
  - Render ReadingTime component in post header
  - Test on sample blog posts

**Checkpoint**: Reading time displays on blog posts

---

### 4B: Table of Contents (1 hour)

- [ ] T047 [P] [Blog] Create `components/table-of-contents.tsx` component:
  - Props: `headings: Heading[]`
  - Render nested list of headings as links
  - Links use `#heading-id` to jump to sections
  - Indent h3 items under h2 items
  - Style with proper spacing and typography

- [ ] T048 [Blog] Update `app/blog/[slug]/page.tsx`:
  - Extract headings from blog content
  - Conditionally render TableOfContents (only if 3+ headings)
  - Place near top of post (before or after intro)
  - Test jumping to sections works

- [ ] T049 [Blog] Test table of contents:
  - Open blog post with 3+ headings
  - Verify TOC appears
  - Click heading link, verify page scrolls to section
  - Test on mobile (readable, usable)
  - Test on blog post with < 3 headings (TOC should not appear)

**Checkpoint**: Table of contents navigates to headings

---

### 4C: Share Buttons (1 hour)

- [ ] T050 [P] [Blog] Create `components/share-buttons.tsx` component:
  - Props: `slug: string, title: string`
  - Render LinkedIn and Twitter share buttons
  - Use share intent URLs:
    - LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=[url]`
    - Twitter: `https://x.com/intent/tweet?text=[text]&url=[url]`
  - Style buttons nicely (small icons or text buttons)

- [ ] T051 [Blog] Update `app/blog/[slug]/page.tsx`:
  - Get blog slug and title
  - Render ShareButtons component (near top or bottom)
  - Ensure URLs are properly encoded

- [ ] T052 [Blog] Test share buttons:
  - Click LinkedIn share button
  - Verify share dialog opens or redirect happens
  - Click Twitter share button
  - Verify Twitter dialog appears
  - Test on mobile (buttons visible, functional)
  - Verify no console errors

**Checkpoint**: Share buttons functional on blog posts

---

### 4D: View Counter API (2 hours)

- [ ] T053 [P] [Blog] Create `app/api/views/[slug]/route.ts` API route:
  - Implement GET handler: retrieve view count for slug, return `{ slug, views, timestamp }`
  - Implement POST handler: increment view count for slug, return updated count
  - Error handling: graceful failures (return 0 if error, don't break page)
  - CORS: allow requests from own domain

- [ ] T054 [Blog] Choose view persistence approach:
  - **Option A (Simple)**: File-based `.cache/views.json` (gitignored)
  - **Option B (Production)**: Vercel KV if available
  - For file-based: implement write locking to prevent concurrent issues

- [ ] T055 [Blog] Implement view counter storage in `.cache/views.json`:
  - Create file if doesn't exist
  - Format: `{ "blog-slug-1": 42, "blog-slug-2": 15 }`
  - Increment on POST, return count on GET
  - Add .cache/ to .gitignore

- [ ] T056 [P] [Blog] Create `components/view-counter.tsx` component:
  - Props: `slug: string`
  - On mount: fetch view count from API via GET
  - Display view count (e.g., "1,234 views")
  - Call POST API to increment count on first load
  - Handle loading state gracefully
  - Handle errors gracefully (show default message)

- [ ] T057 [Blog] Update `app/blog/[slug]/page.tsx`:
  - Get blog slug
  - Render ViewCounter component
  - Place in header or footer area

- [ ] T058 [Blog] Test view counter:
  - Load blog post
  - Verify view count displays (e.g., "1 views")
  - Reload page
  - Verify count incremented (now shows "2 views")
  - Check `.cache/views.json` file for persistence
  - Test on different browser/tab (views persist)
  - Test on mobile and desktop
  - Verify no console errors

- [ ] T059 [Blog] Verify view counter API is safe:
  - Test concurrent requests (rapid page reloads)
  - Verify counts don't get corrupted
  - Test with invalid slug (graceful error)
  - Test with missing .cache directory (creates if needed)

**Checkpoint**: View counter tracks and persists blog post views

---

## Phase 5: Blog Integration & Testing (1 hour)

**Purpose**: Verify all blog features work together
**Dependencies**: Requires Phase 4 completion

- [ ] T060 [P] [Blog] Verify all blog features on multiple posts:
  - Open 3+ blog posts
  - Verify reading time displays
  - Verify table of contents appears (for posts with 3+ headings)
  - Verify share buttons visible and functional
  - Verify view counter displays and increments
  - Verify no console errors

- [ ] T061 [P] [Blog] Test blog features on mobile and desktop:
  - Mobile: all components visible, readable, tappable
  - Desktop: all components well-spaced, professional
  - Dark mode: verify components styled correctly in dark theme

- [ ] T062 [Blog] Run `pnpm test` to verify Phase 1 tests still pass
- [ ] T063 [Blog] Run `pnpm lint` to verify no new ESLint errors
- [ ] T064 [Blog] Run `pnpm build` to verify no new TypeScript errors
- [ ] T065 [Blog] Push to feature branch and verify CI passes (all jobs green)

**Checkpoint**: All blog features integrated and CI passing

---

## Phase 6: Phase 2 Integration & Verification (1 hour)

**Purpose**: Verify all Phase 2 work completes and works together
**Dependencies**: Requires all Phase 1-5 completion

- [ ] T066 [P] [Integration] Verify CI/CD pipeline working:
  - Commit passes linting
  - All tests pass
  - Build succeeds
  - All jobs complete in < 3 minutes

- [ ] T067 [P] [Integration] Verify TypeScript improvements:
  - `pnpm build` shows zero TypeScript errors
  - `tsconfig.json` has strict mode enabled
  - All exported functions have JSDoc

- [ ] T068 [P] [Integration] Verify performance documented:
  - `.github/performance/` directory exists with evidence
  - README references performance metrics
  - Lighthouse scores documented (actual, not aspirational)

- [ ] T069 [P] [Integration] Verify blog features complete:
  - All blog posts show reading time
  - TOC appears for posts with 3+ headings
  - Share buttons functional
  - View counter working

- [ ] T070 [Integration] Deploy to production and verify live site:
  - Push to main branch
  - Verify Vercel deployment succeeds
  - Test live site at marianholly.vercel.app
  - Verify no console errors
  - Verify all features work

**Checkpoint**: All Phase 2 work complete and verified

---

## Phase 7: Git & Completion (30 min)

**Purpose**: Commit work and prepare for Phase 3
**Dependencies**: Requires Phase 6 verification passing

- [ ] T071 [Git] Create branch `002-phase2-professional-polish` (if not already exists)
- [ ] T072 [Git] Commit Phase 1 work: `git add . && git commit -m "ci: setup GitHub Actions CI/CD pipeline"`
- [ ] T073 [Git] Commit Phase 2 work: `git add . && git commit -m "refactor: enable TypeScript strict mode and add type definitions"`
- [ ] T074 [Git] Commit Phase 3 work: `git add . && git commit -m "docs: document performance metrics with Lighthouse evidence"`
- [ ] T075 [Git] Commit Phase 4 work: `git add . && git commit -m "feat: add blog engagement features (reading time, TOC, share, views)"`
- [ ] T076 [Git] Create PR from `002-phase2-professional-polish` to `main` with summary of Phase 2 changes
- [ ] T077 [Git] You review PR and merge when ready (recommend squash and merge)
- [ ] T078 [Git] Tag version after merge: `git tag v1.1.0` (Phase 2 complete)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Prerequisites)**: Requires Phase 1 complete - verify before starting Phase 2
- **Phase 1 (CI/CD)**: No dependencies - start immediately
- **Phase 2 (TypeScript)**: Can start after Phase 1 (benefits from CI validating changes)
- **Phase 3 (Performance)**: Independent - can run parallel with Phase 2
- **Phase 4 (Blog)**: Independent - can run parallel with Phase 2/3
- **Phase 5 (Integration)**: Requires Phase 4 complete
- **Phase 6 (Verification)**: Requires Phase 1-5 complete
- **Phase 7 (Git)**: Requires Phase 6 verification passing

### Parallelization Strategy

**Maximum parallelization**:

1. Start Phase 1 (CI/CD setup) - 3-4 hours
2. While Phase 1 running, start Phase 3 (Performance) - different files, no dependencies
3. When Phase 1 completes, start Phase 2 (TypeScript) - benefits from CI
4. While Phase 2 running, start Phase 4 (Blog) - different files, no dependencies
5. When Phase 2 completes, Phase 3/4 should be near completion
6. When Phase 3/4 complete, run Phase 5 (Integration)
7. When Phase 5 passes, run Phase 6 (Verification)
8. When Phase 6 passes, run Phase 7 (Git)

**Sequential approach** (recommended for first implementation):

1. Phase 0: Verify Phase 1 complete (30 min)
2. Phase 1: CI/CD setup (3-4 hours)
3. Phase 2: TypeScript improvements (2-3 hours)
4. Phase 3: Performance documentation (2-3 hours)
5. Phase 4: Blog features (4-6 hours)
6. Phase 5: Integration testing (1 hour)
7. Phase 6: Verification (1 hour)
8. Phase 7: Git and completion (30 min)

**Total: 14-20 hours** (within 10-14 hour estimate with buffer)

---

## Success Criteria Checklist

**After completing all tasks, verify**:

### CI/CD Pipeline (T006-T017)
- [ ] GitHub Actions workflow runs on every push
- [ ] All jobs (lint, test, build) pass and complete in < 3 minutes
- [ ] Build status badge visible in README
- [ ] PR merge blocked if CI fails
- [ ] Branch protection rules configured

### TypeScript Improvements (T018-T031)
- [ ] Strict mode enabled in tsconfig.json
- [ ] Zero TypeScript errors on `pnpm build`
- [ ] All exported functions have JSDoc comments
- [ ] DATA object has type interface
- [ ] Zero implicit any types found
- [ ] CI passes (lint, test, build all green)

### Performance Documentation (T032-T042)
- [ ] Lighthouse screenshots stored in .github/performance/
- [ ] Actual scores documented (not aspirational)
- [ ] Core Web Vitals documented
- [ ] Bundle analysis completed and stored
- [ ] README references performance evidence

### Blog Engagement Features (T043-T065)
- [ ] Reading time displays on all blog posts
- [ ] Table of contents appears for posts with 3+ headings
- [ ] TOC links navigate to correct sections
- [ ] Share buttons visible and functional
- [ ] View counter increments on page load
- [ ] Views persist across sessions
- [ ] All features work on mobile and desktop
- [ ] No console errors

### Phase 2 Complete (T066-T078)
- [ ] CI/CD pipeline fully operational
- [ ] TypeScript strict mode enforced
- [ ] Performance documented with evidence
- [ ] Blog features complete and tested
- [ ] All commits merged to main
- [ ] Version tagged (v1.1.0)

---

## Execution Notes

**Important Reminders**:

1. **CI/CD is foundation**: Complete Phase 1 before others (all subsequent work validated by CI)
2. **Performance is proof**: Use actual scores, not targets; credibility depends on honesty
3. **Blog features enhance**: P2 priority; can skip if time tight (CI/CD + TypeScript are critical)
4. **Parallel where possible**: Performance and Blog can run parallel with TypeScript
5. **Stop at checkpoints**: Verify work before proceeding to next phase

---

## Next Steps After Phase 2 Completion

1. Merge PR to main (verify production deployment succeeds)
2. Tag version: `git tag v1.1.0`
3. Review hiring impact: Are callback rates increasing?
4. Plan Phase 3 when ready: Backend project in Django/Python
5. Celebrate Phase 2 completion! 🎉

---

## Notes

- [P] tasks = can run in parallel (different files, no dependencies)
- Each phase has a checkpoint where you can pause/verify before proceeding
- Total estimated time: 14-20 hours (depends on blog feature scope)
- After Phase 2, portfolio is interview-ready with professional practices demonstrated
