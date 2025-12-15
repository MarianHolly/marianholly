---
description: "Phase 1 Critical Fixes task list for testing, translation, bug fixes, README"
---

# Tasks: Phase 1 Critical Fixes

**Input**: Design documents from `/specs/001-phase1-critical-fixes/`
**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (required for user stories)

**Organization**: Tasks grouped by story phase to enable independent implementation of each story.

---

## Format: `[ID] [P?] [Phase] Description`

- **[ID]**: Task identifier (T001, T002, etc.)
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Phase]**: Which phase/story this task belongs to (Setup, BugFix, Translation, Testing, README)
- Include exact file paths in descriptions

---

## Phase 0: Foundation Setup (2 hours)

**Purpose**: Install dependencies and create test infrastructure
**GATE**: Must complete before Phase 1C (Test Writing)

- [x] T001 [P] [Setup] Install Vitest testing dependencies: `pnpm add -D vitest@^1.0.0 @testing-library/react@^14.0.0 @testing-library/jest-dom@^6.1.0 happy-dom@^12.0.0`
- [x] T002 [P] [Setup] Create `vitest.config.ts` with path aliases matching tsconfig.json, happy-dom environment, and coverage settings (threshold: 25%, report: coverage/)
- [x] T003 [P] [Setup] Create `__tests__/setup.ts` with Vitest imports, Testing Library matchers, and global test setup
- [x] T004 [P] [Setup] Add npm scripts to `package.json`: test, test:watch, test:ui, test:coverage
- [x] T005 [Setup] Create `.gitignore` entry for `coverage/` directory
- [x] T006 [Setup] Verify test infrastructure works: run `pnpm test` and confirm no errors (should show "0 test files")

**Checkpoint**: Test infrastructure working; developers can write tests

---

## Phase 1A: Production Bug Fixes (1 hour)

**Purpose**: Fix all known bugs before proceeding
**Can run parallel with**: Phase 0

- [x] T007 [P] [BugFix] Audit all Next.js Link components in `components/` for duplicate href attributes and improper usage
- [x] T008 [BugFix] Fix `components/github-repositories.tsx`: remove redundant `<a>` tags inside Link components, add proper `rel="noopener noreferrer"` to external links
- [x] T009 [P] [BugFix] Audit remaining components for Link component issues and fix any found
- [x] T010 [BugFix] Run `pnpm lint` and fix all reported ESLint errors in source files
- [x] T011 [BugFix] Run `pnpm build` and fix all TypeScript errors
- [x] T012 [BugFix] Manual testing: Click all navigation links, verify no 404s, no console errors, proper navigation flow

**Checkpoint**: Zero production bugs; ESLint and TypeScript both pass

---

## Phase 1B: Content Translation (3 hours)

**Purpose**: Translate all user-facing content to English
**Can run parallel with**: Phase 0, Phase 1A

- [x] T013 [P] [Translation] Audit codebase for Slovak content: grep for known Slovak patterns in `*.tsx`, `*.ts`, `*.mdx` files in `components/`, `lib/`, `content/`, `app/`
- [x] T014 [P] [Translation] Review `lib/resume.tsx` for Slovak repository descriptions, project names, and data; identify all that need translation
- [x] T015 [P] [Translation] Review `components/github-repositories.tsx` for Slovak UI labels, button text, and descriptions
- [x] T016 [P] [Translation] Review `app/page.tsx` and other pages for Slovak content
- [x] T017 [Translation] Translate all identified Slovak content to professional English (maintain technical terms)
- [x] T018 [Translation] Grammar check all translated content using Grammarly or equivalent; ensure professional business English
- [x] T019 [Translation] Verify consistency: same concepts use same terminology throughout
- [x] T020 [Translation] Manual review of live site at marianholly.vercel.app: scan for any remaining Slovak text

**Checkpoint**: Zero Slovak text in production; all English is professional and grammatically correct

---

## Phase 1C: Test Writing (7 hours)

**Purpose**: Write tests verifying code works correctly
**Dependencies**: Requires Phase 0 completion

**Test Writing Strategy**: Write failing test → implement minimal code → verify test passes

### Setup Phase 1C (Optional but recommended)

- [x] T021 [Testing] Read Vitest docs on running tests and coverage: https://vitest.dev
- [x] T022 [Testing] Review existing codebase structure to understand what functions/components are available to test

---

### Unit Tests - Utility Functions (4 hours)

**US1 (Testing Infrastructure)**: Test critical utility and blog functions

- [x] T023 [P] [Testing] Create `__tests__/lib/utils.test.ts` with test setup (describe blocks, test function imports)
- [x] T024 [P] [Testing] Write tests for `cn()` utility function in `__tests__/lib/utils.test.ts`:
  - Test merging multiple Tailwind classes correctly
  - Test conflicting classes resolve correctly (e.g., px-2 overrides px-4)
  - Test undefined/null inputs handled gracefully
  - Target: 80%+ coverage of utils.ts
- [x] T025 [P] [Testing] Write tests for blog utility functions in `__tests__/lib/blog.test.ts`:
  - Test blog post retrieval functions work
  - Test date parsing/formatting functions
  - Test type guard functions (if any, e.g., `isFullArticle()`)
  - Target: 80%+ coverage of blog.ts

---

### Component Tests - UI Components (3 hours)

**US1 (Testing Infrastructure)**: Test basic UI components and complex components

- [x] T026 [P] [Testing] Create `__tests__/components/ui/button.test.tsx` with Button component tests:
  - Test button renders with correct label
  - Test button accepts variant props
  - Test button click handler fires
  - Test disabled state prevents clicks
  - Aim for 70%+ Button component coverage

- [x] T027 [P] [Testing] Create `__tests__/components/ui/card.test.tsx` with Card component tests:
  - Test Card renders children correctly
  - Test Card accepts custom className
  - Test Card composition (header, content, footer if applicable)
  - Aim for 70%+ Card component coverage

- [x] T028 [Testing] Create `__tests__/components/github-repositories.test.tsx` with complex component tests:
  - Test repositories render with data
  - Test links point to correct URLs
  - Test no duplicate href attributes (post bug-fix)
  - Test accessibility attributes present
  - Aim for 60%+ coverage of github-repositories.tsx

---

### Coverage Verification (Phase 1C Checkpoint)

- [x] T029 [Testing] Run `pnpm test:coverage` and verify coverage report shows 30%+ overall
- [x] T030 [Testing] Run `pnpm test` and verify all tests pass (zero failures)
- [x] T031 [Testing] Review coverage report to identify gaps and document for Phase 2 expansion

**Checkpoint**: 30%+ overall coverage achieved; all tests passing; coverage report generated

---

## Phase 1D: README Rewrite (2 hours)

**Purpose**: Professional README following open-source standards
**Dependencies**: Requires Phase 1A (bug fixes), Phase 1B (translation) to be complete for accurate documentation

- [x] T032 [README] Backup current README.md to README.old.md
- [x] T033 [README] Create new README.md with following structure:

  **Section 1: Header (100px max)**
  - Project title: "Marian Holly Portfolio"
  - One-line description: "Modern, production-grade portfolio showcasing full-stack web development"
  - Live demo link (marianholly.vercel.app)
  - Build status badge placeholder (for Phase 2 CI/CD)

  **Section 2: Key Features (6 bullet points)**
  - Modern tech stack (Next.js, React, TypeScript)
  - High performance (90+ Lighthouse scores)
  - Responsive design with dark mode
  - Blog with syntax highlighting
  - Accessible component system (Radix UI, shadcn/ui)
  - Test coverage with Vitest

  **Section 3: Tech Stack (with rationale)**
  - Frontend: Next.js 14, React 18, TypeScript (modern, type-safe)
  - Styling: Tailwind CSS, shadcn/ui, CVA (utility-first, accessible)
  - Content: MDX, gray-matter, rehype-pretty-code (powerful content pipeline)
  - Animation: Framer Motion (smooth, professional animations)
  - Deployment: Vercel (zero-config, automatic deploys)
  - Testing: Vitest, React Testing Library (fast, modern testing)

  **Section 4: Performance (with actual evidence)**
  - Include Lighthouse scores or screenshots (Performance, Accessibility, Best Practices, SEO)
  - Include Core Web Vitals metrics if available
  - Include bundle size metrics

  **Section 5: Getting Started**
  - Clone: `git clone ...`
  - Install: `pnpm install`
  - Dev server: `pnpm dev` (opens http://localhost:3000)
  - Build: `pnpm build`
  - Test: `pnpm test`

  **Section 6: Project Structure**
  - Brief overview of `app/`, `components/`, `lib/`, `content/`, `__tests__/`

  **Section 7: Testing**
  - Vitest as test runner
  - React Testing Library for components
  - Coverage target: 30%+ (mention coverage/ directory)
  - Run tests: `pnpm test`

  **Section 8: Deployment**
  - Automatic to Vercel on main push
  - Preview deploys on PR
  - Live at marianholly.vercel.app

  **Section 9: Security (optional but recommended)**
  - Environment variables in `.env.local`
  - Input sanitization with rehype-sanitize
  - No sensitive data in commits

- [x] T034 [README] Remove all personal bio content, resume information, "about me" sections
- [x] T035 [README] Grammar check entire README: professional tone, consistent voice, no typos
- [x] T036 [README] Generate Lighthouse audit evidence:
  - Run Lighthouse audit (DevTools or PageSpeed Insights)
  - Screenshot desktop version
  - Screenshot mobile version
  - Store images in `.github/screenshots/` (create directory if needed)
  - Reference in README with alt text

- [x] T037 [README] Manual review: Have someone unfamiliar with the project read README and verify they understand the portfolio

**Checkpoint**: Professional README complete; hiring teams see technical credibility

---

## Phase 2: Integration & Verification (1 hour)

**Purpose**: Verify all phases work together
**Dependencies**: Requires all Phase 1A-1D completion

- [x] T038 [P] [Integration] Run full build: `pnpm build` - should complete successfully
- [x] T038 [P] [Integration] Run all tests: `pnpm test` - should show 30%+ coverage, all tests pass
- [x] T038 [P] [Integration] Run linting: `pnpm lint` - should show zero errors
- [x] T039 [Integration] Manual verification on production-like environment:
  - Deploy to Vercel preview
  - Verify all pages load without console errors
  - Verify no Slovak text anywhere
  - Verify all links work
  - Verify responsive design (mobile, tablet, desktop)
  - Verify dark mode toggle works

**Checkpoint**: All Phase 1 work integrated and verified

---

## Phase 3: Git & Documentation (30 min)

**Purpose**: Commit work and document completion
**Dependencies**: Requires Phase 2 verification passing

- [x] T040 [Git] Create branch `001-phase1-critical-fixes` (or check if already exists)
- [x] T041 [Git] Commit Phase 0 work: `git add . && git commit -m "test: setup Vitest testing infrastructure"`
- [x] T042 [Git] Commit Phase 1A work: `git add . && git commit -m "fix: remove duplicate href attributes and fix Link components"`
- [x] T043 [Git] Commit Phase 1B work: `git add . && git commit -m "docs: translate all content to English"`
- [x] T044 [Git] Commit Phase 1C work: `git add . && git commit -m "test: add unit and component tests for Phase 1"`
- [x] T045 [Git] Commit Phase 1D work: `git add . && git commit -m "docs: rewrite README with professional format and performance metrics"`
- [x] T046 [Git] Create PR from `001-phase1-critical-fixes` to `main` with summary of Phase 1 completion
- [x] T047 [Git] You review and merge PR when ready (author preference: squash and merge recommended)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0 (Setup)**: No dependencies - start immediately
- **Phase 1A (Bug Fixes)**: No dependencies on Phase 0 - can start immediately in parallel
- **Phase 1B (Translation)**: No dependencies - can start immediately in parallel
- **Phase 1C (Testing)**: Depends on Phase 0 completion - MUST wait for test infrastructure
- **Phase 1D (README)**: Depends on Phase 1A, 1B, 1C - write last to reference all changes
- **Phase 2 (Integration)**: Depends on all Phase 1A-1D completion
- **Phase 3 (Git)**: Depends on Phase 2 verification passing

### Parallelization Strategy

**Maximum parallelization** (if you work on multiple tasks simultaneously):

1. Start Phase 0 (test setup)
2. While Phase 0 is running:
   - Run Phase 1A tasks (bug fixes) in parallel - different files
   - Run Phase 1B tasks (translation) in parallel - different files
3. When Phase 0 completes:
   - Run Phase 1C tasks (testing) - depends on Phase 0
4. When Phase 1A, 1B, 1C complete:
   - Run Phase 1D (README) - write last to reference all changes
5. When Phase 1D completes:
   - Run Phase 2 (integration) - verify everything works together
6. When Phase 2 passes:
   - Run Phase 3 (git/commits)

**Sequential approach** (recommended for first-time implementation):

1. Complete Phase 0 (2 hours)
2. Complete Phase 1A (1 hour)
3. Complete Phase 1B (3 hours)
4. Complete Phase 1C (7 hours)
5. Complete Phase 1D (2 hours)
6. Complete Phase 2 (1 hour)
7. Complete Phase 3 (0.5 hours)
8. **Total: ~16.5 hours** (within 16-20 hour estimate)

---

## Success Criteria Checklist

**After completing all tasks, verify**:

### Testing Infrastructure (T001-T006)
- [x] `pnpm test` runs without errors
- [x] Coverage report generates with `pnpm test:coverage`
- [x] All npm scripts (test, test:watch, test:ui, test:coverage) work

### Bug Fixes (T007-T012)
- [x] No duplicate href attributes in any Link component
- [x] External links have `rel="noopener noreferrer"`
- [x] `pnpm lint` passes with zero errors
- [x] `pnpm build` succeeds with zero TypeScript errors
- [x] All links on live site work without console errors

### Translation (T013-T020)
- [x] Zero Slovak strings in production code
- [x] All UI labels and descriptions are English
- [x] Grammar check complete and professional
- [x] Live site displays 100% English text

### Tests (T023-T031)
- [x] All test files created and running
- [x] Utility tests cover 80%+ of utils.ts and blog.ts
- [x] Component tests cover 60%+ of button, card, github-repositories
- [x] Overall coverage: 30%+
- [x] `pnpm test` shows all tests passing

### README (T032-T037)
- [x] README has live demo link in first section
- [x] README has feature list (6+ bullets)
- [x] README documents tech stack with rationale
- [x] README includes "Getting Started" section
- [x] README includes performance metrics with evidence
- [x] README has NO personal bio or resume content
- [x] Grammar and professional tone verified

### Integration (T038-T039)
- [x] Full build succeeds
- [x] All tests pass (30%+ coverage)
- [x] ESLint passes (zero errors)
- [x] Production site loads without console errors
- [x] Zero Slovak text visible
- [x] All links functional
- [x] Responsive on mobile/tablet/desktop
- [x] Dark mode works

---

## Execution Notes

**Important Reminders**:

1. **Tests First**: When writing tests in Phase 1C:
   - Write test first (it will fail)
   - Implement minimal code to pass test
   - Refactor if needed
   - Don't over-test (focus on high-value scenarios)

2. **No Over-Engineering**: Keep implementations simple:
   - Don't refactor existing code unnecessarily
   - Don't add features not requested
   - Don't add comments to obvious code

3. **Manual Testing**: Despite having tests:
   - Click all links manually
   - Check responsive design on real devices if possible
   - Open DevTools and verify no console errors
   - Test dark mode toggle

4. **Git Commits**: Use Conventional Commits format:
   - `test: setup Vitest testing infrastructure`
   - `fix: remove duplicate href attributes`
   - `docs: translate all content to English`
   - `test: add unit and component tests`
   - `docs: rewrite README with professional format`

5. **Stop/Pause Points**: Can stop after any phase checkpoint:
   - After T006: Test infrastructure working (can start Phase 2 now)
   - After T012: Bug fixes done, site is production-ready
   - After T020: All content translated
   - After T031: Tests written and coverage achieved
   - After T037: README complete

---

## Next Steps After Phase 1 Completion

1. Merge PR to main (verify production site still works)
2. Tag version: `git tag v1.0.0-phase1` (optional but recommended)
3. Review hiring impact: Do portfolio links generate more interest?
4. Move to Phase 2 when ready: CI/CD pipeline, error handling, TypeScript improvements
5. Update DEV_PLAN with Phase 1 completion date and actual time spent

---

## Notes

- [P] tasks = can run in parallel (different files, no dependencies)
- Each phase has a checkpoint where you can pause/verify before proceeding
- Total estimated time: 16-17 hours (within 16-20 hour Phase 1 budget)
- After Phase 1, portfolio will be significantly more competitive in hiring market
