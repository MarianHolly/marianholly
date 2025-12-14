# Portfolio Application Development Plan

**Project:** Portfolio Website Improvement & Professionalization  
**Developer:** Marian Holly  
**Version:** 1.0  
**Date:** December 2024  
**Estimated Total Time:** 50-60 hours across 3 phases

---

## 1. EXECUTIVE SUMMARY

### Current State Assessment
- **Overall Score:** 3.6/10
- **Live URL:** https://marianholly.vercel.app
- **Primary Issue:** Portfolio failing to convert applications into interviews
- **Critical Blockers:** No testing, mixed language content, production bugs, unprofessional presentation

### Target State
- **Target Score:** 8.2/10
- **Primary Goal:** Increase interview callback rate by 40-60%
- **Secondary Goals:** 
  - Demonstrate professional development practices
  - Showcase full-stack capabilities
  - Stand out in competitive junior developer market

### Technology Stack
- **Frontend:** Next.js 14.2.15, React 18, TypeScript 5
- **Styling:** Tailwind CSS 3.4, shadcn/ui
- **Content:** MDX, gray-matter
- **Animation:** Framer Motion 11
- **Deployment:** Vercel
- **New Additions:** Vitest, Testing Library, GitHub Actions

### Success Metrics
- Test coverage: 0% → 30%+
- Code quality: 4/10 → 8/10
- Documentation: 5/10 → 9/10
- Professionalism: 3/10 → 9/10
- Production bugs: 3+ → 0
- Language consistency: Mixed → 100% English

---

## 2. CRITICAL ISSUES ANALYSIS

### Dealbreaker #1: Zero Test Coverage
**Impact Level:** CRITICAL  
**Affected Hiring:** 60% of positions automatically reject  
**Current State:** No testing framework installed, no test files  
**Root Cause:** Portfolio built for speed, not professional standards

### Dealbreaker #2: Mixed Language Content
**Impact Level:** CRITICAL  
**Affected Hiring:** All international companies, 40% of local companies  
**Current State:** Code/docs in English, UI/content in Slovak  
**Root Cause:** Initially built for local audience, never internationalized

### Dealbreaker #3: Production Bugs
**Impact Level:** HIGH  
**Affected Hiring:** Shows lack of code review, QA process  
**Current State:** Duplicate href attributes, improper Next.js Link usage  
**Root Cause:** No linting enforcement, no pre-commit hooks

### Dealbreaker #4: Template-Style README
**Impact Level:** HIGH  
**Affected Hiring:** First impression failure, appears low-effort  
**Current State:** Generic "About Me" section, resume-style content  
**Root Cause:** Used boilerplate without customization

### Major Issue #5: No Error Handling
**Impact Level:** MEDIUM  
**Affected Hiring:** Suggests inexperience with production applications  
**Current State:** Missing error boundaries, loading states, fallbacks  
**Root Cause:** Happy-path-only development

### Major Issue #6: No CI/CD Pipeline
**Impact Level:** MEDIUM  
**Affected Hiring:** Modern development workflow not demonstrated  
**Current State:** Manual testing, no automated checks  
**Root Cause:** Solo development, no team process needed

---

## 3. IMPROVEMENT PHASES

### Phase 1: Critical Fixes (Stop the Bleeding)
**Timeline:** 16-20 hours  
**Goal:** Remove automatic rejection triggers  
**Impact:** Should increase callback rate by 40-60%  
**Focus:** Testing, language consistency, bug fixes, README

### Phase 2: Professional Polish
**Timeline:** 10-14 hours  
**Goal:** Meet professional development standards  
**Impact:** Move into "interview-worthy" tier  
**Focus:** CI/CD, error handling, type safety, documentation

### Phase 3: Competitive Edge
**Timeline:** 20-60 hours  
**Goal:** Stand out from other junior developers  
**Impact:** Compete for better positions, higher salary bands  
**Focus:** Python/Django project, advanced features, contributions

---

## 4. DETAILED FEATURE SPECIFICATIONS

### 4.1 Testing Infrastructure

#### Problem Statement
Portfolio has zero test coverage. Senior developers check for tests within first 30 seconds. No tests = automatic rejection from 60% of positions.

#### Solution Overview
Implement Vitest testing framework with React Testing Library. Achieve 30%+ coverage focusing on critical user-facing components and utility functions.

#### Technical Requirements
- Install Vitest as test runner (faster than Jest, Vite-native)
- Install @testing-library/react for component testing
- Install @testing-library/jest-dom for DOM assertions
- Install happy-dom as lightweight DOM environment
- Configure vitest.config.ts with Next.js path aliases
- Create __tests__ directory structure mirroring components/lib
- Setup package.json test scripts
- Add coverage reporting configuration

#### Files to Create
- `vitest.config.ts` - Test runner configuration
- `__tests__/setup.ts` - Global test setup
- `__tests__/components/ui/button.test.tsx` - Button component tests
- `__tests__/components/ui/card.test.tsx` - Card component tests
- `__tests__/components/github-repositories.test.tsx` - Complex component test
- `__tests__/lib/blog.test.ts` - Blog utility function tests
- `__tests__/lib/utils.test.ts` - Utility function tests

#### Files to Modify
- `package.json` - Add dependencies and test scripts
- `.gitignore` - Add coverage directory

#### Dependencies
None (first task to implement)

#### Acceptance Criteria
- [ ] Vitest runs successfully with `npm test`
- [ ] At least 5 component tests passing
- [ ] At least 3 utility function tests passing
- [ ] Coverage report generated with `npm run test:coverage`
- [ ] Coverage shows 30%+ overall
- [ ] All tests pass in CI environment
- [ ] Test files follow consistent naming convention

#### Time Estimate
6-8 hours

#### Priority
🔴 P0 (MUST)

---

### 4.2 Content Translation to English

#### Problem Statement
UI contains Slovak text while code and documentation are in English. This creates unprofessional appearance and signals inability to work in international teams.

#### Solution Overview
Translate all user-facing content to English. Update all Slovak strings in components, data files, and content. Maintain consistent language across entire application.

#### Technical Requirements
- Audit all files for Slovak content
- Translate UI strings (buttons, headers, descriptions)
- Translate repository data in resume.tsx
- Translate blog content metadata
- Ensure grammatically correct, professional English
- Maintain SEO-friendly descriptions
- Keep technical terms in English (no translation needed)

#### Files to Modify
- `components/github-repositories.tsx` - UI strings
- `lib/resume.tsx` - Repository descriptions, dates
- `content/*.mdx` - Blog post titles, summaries (if any in Slovak)
- `app/page.tsx` - Homepage content
- Any other components with user-facing text

#### Dependencies
None

#### Acceptance Criteria
- [ ] Zero Slovak text visible on live site
- [ ] All navigation labels in English
- [ ] All repository descriptions in English
- [ ] All blog metadata in English
- [ ] Grammar checked with Grammarly or similar
- [ ] Professional tone maintained
- [ ] No machine translation artifacts
- [ ] Consistent terminology used throughout

#### Time Estimate
3-4 hours

#### Priority
🔴 P0 (MUST)

---

### 4.3 Fix Production Bugs

#### Problem Statement
Production site has visible code bugs (duplicate href attributes) that suggest lack of code review and quality assurance.

#### Solution Overview
Audit all Link components for correct Next.js 14 usage. Fix duplicate href attributes. Ensure proper accessibility attributes. Add ESLint rules to prevent future occurrences.

#### Technical Requirements
- Remove redundant `<a>` tags inside Next.js Link components
- Use Link's built-in href handling only
- Ensure target="_blank" has rel="noopener noreferrer"
- Add aria-labels where needed for accessibility
- Configure ESLint to catch jsx-a11y issues
- Run full site audit for other potential bugs

#### Files to Modify
- `components/github-repositories.tsx` - Fix duplicate href
- Any other files with Link components
- `.eslintrc.json` - Add accessibility rules

#### Dependencies
None

#### Acceptance Criteria
- [ ] No duplicate href attributes anywhere in codebase
- [ ] All external links have proper rel attributes
- [ ] ESLint shows no errors
- [ ] Manual browser testing passes
- [ ] No console errors on production site
- [ ] Accessibility audit shows no critical issues
- [ ] Links work correctly on all pages

#### Time Estimate
1 hour

#### Priority
🔴 P0 (MUST)

---

### 4.4 Professional README Rewrite

#### Problem Statement
Current README reads like a resume/LinkedIn profile rather than a technical project showcase. First impression fails to demonstrate technical capability.

#### Solution Overview
Rewrite README following industry-standard open source project format. Lead with live demo, features, and tech stack. Include screenshots, performance metrics, and getting started guide.

#### Technical Requirements
- Remove "About Me" personal bio section
- Lead with live demo link and project description
- Add "Key Features" section with technical highlights
- Include screenshot or GIF of site in action
- Document tech stack with justifications
- Add "Performance" section with Lighthouse scores
- Include "Getting Started" with clear setup instructions
- Add "Project Structure" overview
- Include "Testing" section showing coverage
- Add badges for build status, coverage, deployment

#### Files to Modify
- `README.md` - Complete rewrite

#### Files to Create
- `.github/screenshots/` - Directory for images
- Store at least 2 screenshots showing key features

#### Dependencies
- Testing infrastructure (for coverage badge)
- CI/CD pipeline (for build status badge)

#### Acceptance Criteria
- [ ] No personal bio or resume content
- [ ] Live demo link prominent at top
- [ ] At least 2 screenshots included
- [ ] Tech stack clearly documented
- [ ] Getting started instructions tested on fresh clone
- [ ] Lighthouse scores documented with proof
- [ ] Professional tone throughout
- [ ] Proper markdown formatting
- [ ] Links all functional

#### Time Estimate
2 hours

#### Priority
🔴 P0 (MUST)

---

### 4.5 Error Handling Implementation

#### Problem Statement
Application lacks error boundaries, loading states, and graceful failure handling. This indicates inexperience with production-grade applications.

#### Solution Overview
Add React Error Boundaries for component-level error catching. Implement loading states for async operations. Add fallback UI for failed data fetching. Handle edge cases gracefully.

#### Technical Requirements
- Create global ErrorBoundary component
- Wrap app in error boundary at layout level
- Add Suspense boundaries with loading fallbacks
- Implement error states in blog post fetching
- Add try-catch blocks in async functions
- Create user-friendly error messages
- Add loading skeletons for dynamic content
- Handle 404 cases properly
- Consider toast notifications for errors

#### Files to Create
- `components/error-boundary.tsx` - Error boundary component
- `components/ui/loading-skeleton.tsx` - Loading state component
- `app/error.tsx` - Next.js error page

#### Files to Modify
- `app/layout.tsx` - Wrap in error boundary
- `app/blog/[slug]/page.tsx` - Add error handling
- `lib/blog.ts` - Add try-catch blocks
- Any async data fetching functions

#### Dependencies
None

#### Acceptance Criteria
- [ ] Error boundary catches and displays component errors
- [ ] Loading states shown during async operations
- [ ] Failed image loads handled gracefully
- [ ] 404 pages show user-friendly message
- [ ] No unhandled promise rejections in console
- [ ] Error messages are user-friendly, not technical
- [ ] App doesn't crash on network failures
- [ ] Suspense fallbacks implemented

#### Time Estimate
4-6 hours

#### Priority
🟠 P1 (SHOULD)

---

### 4.6 CI/CD Pipeline

#### Problem Statement
No automated testing or deployment checks. Modern development requires CI/CD to demonstrate professional workflow understanding.

#### Solution Overview
Implement GitHub Actions workflow for automated linting, testing, and build verification on every push and pull request.

#### Technical Requirements
- Create GitHub Actions workflow file
- Configure jobs for lint, test, build
- Setup Node.js environment correctly
- Use pnpm as package manager
- Cache dependencies for speed
- Run on push to main and all PRs
- Add status badge to README
- Configure Vercel preview deployments

#### Files to Create
- `.github/workflows/ci.yml` - Main CI pipeline
- `.github/workflows/deploy.yml` - Deployment checks (optional)

#### Files to Modify
- `README.md` - Add build status badge

#### Dependencies
- Testing infrastructure must be working
- All tests must pass

#### Acceptance Criteria
- [ ] CI runs on every push
- [ ] CI runs on every pull request
- [ ] Linting step passes
- [ ] Testing step passes
- [ ] Build step completes successfully
- [ ] Workflow completes in under 3 minutes
- [ ] Build status badge shows in README
- [ ] Failed builds block PR merge
- [ ] Vercel preview deploys work

#### Time Estimate
3-4 hours

#### Priority
🟠 P1 (SHOULD)

---

### 4.7 TypeScript Type Safety Improvements

#### Problem Statement
While TypeScript is used, type safety is inconsistent. Large data objects lack proper interfaces. Optional properties not clearly marked.

#### Solution Overview
Define proper interfaces for all major data structures. Add JSDoc comments to exported functions. Enable stricter TypeScript settings. Eliminate any implicit any types.

#### Technical Requirements
- Create interface for DATA object in resume.tsx
- Define types for blog post metadata
- Add JSDoc comments to all exported functions
- Enable strict mode in tsconfig.json if not already
- Remove any uses of implicit any
- Add type guards where needed
- Define union types for string literals
- Use const assertions appropriately

#### Files to Create
- `lib/types.ts` - Centralized type definitions

#### Files to Modify
- `lib/resume.tsx` - Add DATA interface
- `lib/blog.ts` - Add function JSDoc
- `tsconfig.json` - Enable strict mode
- Any files with implicit any types

#### Dependencies
None

#### Acceptance Criteria
- [ ] No TypeScript errors in build
- [ ] All data objects have defined interfaces
- [ ] Exported functions have JSDoc comments
- [ ] No implicit any types
- [ ] Strict mode enabled
- [ ] IDE shows proper type hints
- [ ] Type guards implemented where needed
- [ ] Union types used for string literals

#### Time Estimate
2-3 hours

#### Priority
🟠 P1 (SHOULD)

---

### 4.8 Performance Metrics Documentation

#### Problem Statement
Documentation claims "Lighthouse Score: 95+ across all metrics" but provides no proof. Claims without evidence are red flags.

#### Solution Overview
Run actual Lighthouse audits on production site. Generate bundle size analysis. Document real performance metrics with screenshots. Add to README.

#### Technical Requirements
- Run Lighthouse audit on production site
- Take screenshots of all four metric categories
- Install and configure @next/bundle-analyzer
- Generate bundle size report
- Document Core Web Vitals
- Measure actual load times
- Compare before/after if possible
- Store evidence in repository

#### Files to Create
- `.github/performance/` - Directory for evidence
- Store Lighthouse screenshots
- Store bundle analysis reports

#### Files to Modify
- `README.md` - Add performance section with proof
- `next.config.js` - Add bundle analyzer configuration
- `package.json` - Add analyze script

#### Dependencies
None

#### Acceptance Criteria
- [ ] Lighthouse audit screenshot for mobile
- [ ] Lighthouse audit screenshot for desktop
- [ ] Bundle size analysis report generated
- [ ] Performance section added to README
- [ ] Core Web Vitals documented
- [ ] Images stored in repository
- [ ] Claims backed by evidence
- [ ] Load time measurements included

#### Time Estimate
2-3 hours

#### Priority
🟠 P1 (SHOULD)

---

### 4.9 Blog Engagement Features

#### Problem Statement
Blog lacks interactive features that would demonstrate full-stack capabilities. Static blog doesn't show data handling or API skills.

#### Solution Overview
Add view counter using API routes and simple storage. Implement reading time calculator. Add table of contents for long posts. Include share buttons.

#### Technical Requirements
- Create API route for view counting
- Store view counts (Vercel KV or simple file-based)
- Calculate reading time from word count
- Generate table of contents from headings
- Add LinkedIn and Twitter share buttons
- Style components to match theme
- Ensure mobile responsive
- Consider rate limiting on view counter

#### Files to Create
- `app/api/views/[slug]/route.ts` - View counter API
- `components/reading-time.tsx` - Reading time component
- `components/table-of-contents.tsx` - TOC component
- `components/share-buttons.tsx` - Social sharing

#### Files to Modify
- `app/blog/[slug]/page.tsx` - Integrate new components
- `lib/blog.ts` - Add reading time calculation

#### Dependencies
None (Phase 2 enhancement)

#### Acceptance Criteria
- [ ] View counter increments on page load
- [ ] Reading time displays accurately
- [ ] Table of contents generated for posts with 3+ headings
- [ ] Share buttons work for LinkedIn and Twitter
- [ ] Components styled consistently
- [ ] Mobile responsive
- [ ] No console errors
- [ ] API route handles errors gracefully

#### Time Estimate
4-6 hours

#### Priority
🟡 P2 (NICE)

---

### 4.10 Python/Django REST API Project

#### Problem Statement
Portfolio claims full-stack and Python skills but shows no backend project. No database integration. No REST API demonstration.

#### Solution Overview
Build separate Python/Django REST API project demonstrating backend skills. Include PostgreSQL database, authentication, CRUD operations, and API documentation. Deploy to Heroku or Railway.

#### Technical Requirements
- Initialize Django project with best practices
- Setup PostgreSQL database
- Implement Django REST Framework
- Create at least 2 models with relationships
- Implement CRUD API endpoints
- Add JWT authentication
- Write API documentation with DRF spectacular
- Include unit tests for API endpoints
- Deploy to production
- Add to portfolio as featured project

#### Project Ideas
- Task management API
- Blog API with comments
- Recipe API with ingredients
- Bookmark manager API
- Any domain that interests you

#### Files to Create
Entire new repository separate from portfolio

#### Files to Modify
- Portfolio `lib/resume.tsx` - Add new project to projects array
- Create new repository with proper README

#### Dependencies
Complete Phase 1 and Phase 2 first

#### Acceptance Criteria
- [ ] Django project initialized with virtual environment
- [ ] PostgreSQL database configured
- [ ] At least 2 models with migrations
- [ ] CRUD endpoints functional
- [ ] Authentication working
- [ ] API documentation generated
- [ ] Unit tests written and passing
- [ ] Deployed to production
- [ ] README includes API documentation
- [ ] Added to portfolio site

#### Time Estimate
20-30 hours

#### Priority
🟡 P2 (NICE)

---

### 4.11 Security Best Practices Documentation

#### Problem Statement
Security practices not mentioned anywhere. Junior developer portfolios should demonstrate security awareness.

#### Solution Overview
Document existing security practices. Add Content Security Policy headers. Ensure environment variable handling is secure. Document HTTPS enforcement.

#### Technical Requirements
- Review and document current security measures
- Add CSP headers in Next.js config
- Ensure sensitive data in environment variables
- Document input sanitization (rehype-sanitize)
- Add security section to README
- Review dependencies for vulnerabilities
- Configure security headers in Vercel

#### Files to Modify
- `next.config.js` - Add security headers
- `README.md` - Add security section
- `.env.example` - Document required variables

#### Dependencies
None

#### Acceptance Criteria
- [ ] CSP headers configured
- [ ] Security section in README
- [ ] Environment variables documented
- [ ] No sensitive data in code
- [ ] Dependencies scanned for vulnerabilities
- [ ] HTTPS enforced
- [ ] Security headers visible in browser tools
- [ ] Input sanitization documented

#### Time Estimate
2 hours

#### Priority
🟡 P2 (NICE)

---

### 4.12 Analytics and Monitoring

#### Problem Statement
No visitor analytics or error monitoring. Professional sites track usage and errors.

#### Solution Overview
Add Vercel Analytics for performance tracking. Consider Sentry for error monitoring. Document in README to show business awareness.

#### Technical Requirements
- Enable Vercel Analytics
- Configure basic tracking
- Add analytics script to layout
- Consider error tracking service
- Document in README
- Respect user privacy (GDPR considerations)

#### Files to Modify
- `app/layout.tsx` - Add analytics
- `package.json` - Add @vercel/analytics if needed
- `README.md` - Document analytics

#### Dependencies
None

#### Acceptance Criteria
- [ ] Vercel Analytics enabled
- [ ] Analytics visible in Vercel dashboard
- [ ] No impact on performance
- [ ] Privacy-friendly implementation
- [ ] Documented in README
- [ ] Works in production

#### Time Estimate
1-2 hours

#### Priority
🟡 P2 (NICE)

---

## 5. TASK BREAKDOWN

### Phase 1: Critical Fixes (16-20 hours total)

#### Week 1: Testing & Quality (10-12 hours)

**Task 1.1: Setup Testing Infrastructure** (2h) - 🔴 P0
- [ ] Install Vitest, Testing Library, happy-dom
- [ ] Create vitest.config.ts
- [ ] Setup test directory structure
- [ ] Configure path aliases
- [ ] Add test scripts to package.json
- [ ] Verify basic test runs

**Task 1.2: Write Component Tests** (3-4h) - 🔴 P0
- [ ] Test Button component (variants, click handlers)
- [ ] Test Card component (composition, props)
- [ ] Test GitHubRepositories component (rendering, hover states)
- [ ] Test navigation components
- [ ] Test error states

**Task 1.3: Write Utility Tests** (2h) - 🔴 P0
- [ ] Test blog.ts functions (getBlogPosts, getPost)
- [ ] Test utils.ts functions (cn utility)
- [ ] Test date formatting functions
- [ ] Test type guards

**Task 1.4: Setup Coverage Reporting** (1h) - 🔴 P0
- [ ] Configure coverage in vitest.config.ts
- [ ] Generate initial coverage report
- [ ] Document coverage in README
- [ ] Set coverage thresholds

**Task 1.5: Fix Production Bugs** (1h) - 🔴 P0
- [ ] Audit all Link components
- [ ] Remove duplicate href attributes
- [ ] Add proper rel attributes for external links
- [ ] Test all links manually
- [ ] Add ESLint rules to prevent regression

**Task 1.6: Content Translation** (3-4h) - 🔴 P0
- [ ] Audit codebase for Slovak text
- [ ] Translate github-repositories.tsx UI
- [ ] Translate resume.tsx data
- [ ] Translate any blog metadata
- [ ] Grammar check all English content
- [ ] Manual review of entire site

#### Week 2: Documentation & Polish (6-8 hours)

**Task 1.7: Rewrite README** (2h) - 🔴 P0
- [ ] Remove personal bio section
- [ ] Add live demo and features section
- [ ] Create project screenshots
- [ ] Document tech stack with rationale
- [ ] Add getting started guide
- [ ] Include performance metrics
- [ ] Add project structure overview
- [ ] Professional tone throughout

**Task 1.8: Add Error Handling** (4-6h) - 🔴 P0
- [ ] Create ErrorBoundary component
- [ ] Add Suspense boundaries with fallbacks
- [ ] Implement loading skeletons
- [ ] Add try-catch in async functions
- [ ] Create error page
- [ ] Handle 404s gracefully
- [ ] Test error scenarios

---

### Phase 2: Professional Polish (10-14 hours total)

#### Week 3: Automation & Type Safety (8-10 hours)

**Task 2.1: Setup CI/CD Pipeline** (3-4h) - 🟠 P1
- [ ] Create .github/workflows/ci.yml
- [ ] Configure lint job
- [ ] Configure test job
- [ ] Configure build job
- [ ] Setup pnpm caching
- [ ] Test workflow on PR
- [ ] Add status badge to README
- [ ] Configure Vercel previews

**Task 2.2: Improve TypeScript Type Safety** (2-3h) - 🟠 P1
- [ ] Create centralized types.ts file
- [ ] Define interface for DATA object
- [ ] Add JSDoc to exported functions
- [ ] Enable strict mode
- [ ] Eliminate implicit any types
- [ ] Add type guards where needed
- [ ] Verify no TypeScript errors

**Task 2.3: Document Performance Metrics** (2-3h) - 🟠 P1
- [ ] Run Lighthouse audit (mobile)
- [ ] Run Lighthouse audit (desktop)
- [ ] Install bundle analyzer
- [ ] Generate bundle report
- [ ] Take screenshots of metrics
- [ ] Store in .github/performance/
- [ ] Update README with evidence
- [ ] Document Core Web Vitals

#### Week 4: Engagement Features (4-6 hours)

**Task 2.4: Add Blog Engagement Features** (4-6h) - 🟡 P2
- [ ] Create view counter API route
- [ ] Implement view count storage
- [ ] Add reading time calculation
- [ ] Create TableOfContents component
- [ ] Add share buttons
- [ ] Style components
- [ ] Test on mobile
- [ ] Ensure no console errors

---

### Phase 3: Competitive Edge (20-60 hours total)

#### Weeks 5-8: Backend Project (20-30 hours)

**Task 3.1: Plan Django Project** (2h) - 🟡 P2
- [ ] Choose project domain
- [ ] Design data model
- [ ] Plan API endpoints
- [ ] Create project specification
- [ ] Setup GitHub repository

**Task 3.2: Initialize Django Backend** (4-6h) - 🟡 P2
- [ ] Create virtual environment
- [ ] Install Django and DRF
- [ ] Configure PostgreSQL
- [ ] Create initial models
- [ ] Run migrations
- [ ] Create superuser

**Task 3.3: Implement API Endpoints** (6-8h) - 🟡 P2
- [ ] Setup DRF viewsets
- [ ] Implement CRUD operations
- [ ] Add serializers
- [ ] Configure URL routing
- [ ] Test endpoints with Postman
- [ ] Add filtering and pagination

**Task 3.4: Add Authentication** (3-4h) - 🟡 P2
- [ ] Setup JWT authentication
- [ ] Create user registration endpoint
- [ ] Add login endpoint
- [ ] Protect sensitive endpoints
- [ ] Test auth flow

**Task 3.5: Testing & Documentation** (3-4h) - 🟡 P2
- [ ] Write API endpoint tests
- [ ] Install drf-spectacular
- [ ] Generate API documentation
- [ ] Write comprehensive README
- [ ] Add postman collection

**Task 3.6: Deployment** (2-4h) - 🟡 P2
- [ ] Configure for production
- [ ] Setup Railway/Heroku
- [ ] Configure environment variables
- [ ] Deploy database
- [ ] Deploy application
- [ ] Test production deployment

**Task 3.7: Portfolio Integration** (1h) - 🟡 P2
- [ ] Add to portfolio projects list
- [ ] Create project screenshot
- [ ] Write project description
- [ ] Link to live API and repo

#### Additional Enhancement Tasks (variable hours)

**Task 3.8: Security Documentation** (2h) - 🟡 P2
- [ ] Document existing security
- [ ] Add CSP headers
- [ ] Security section in README
- [ ] Scan dependencies
- [ ] Configure Vercel security headers

**Task 3.9: Analytics & Monitoring** (1-2h) - 🟡 P2
- [ ] Enable Vercel Analytics
- [ ] Add to app layout
- [ ] Verify tracking works
- [ ] Document in README

**Task 3.10: Open Source Contribution** (variable) - 🟡 P2
- [ ] Find suitable project
- [ ] Read contribution guidelines
- [ ] Identify good first issue
- [ ] Submit pull request
- [ ] Add to portfolio

---

## 6. TESTING STRATEGY

### Testing Framework
**Tool:** Vitest  
**Rationale:** Faster than Jest, native Vite support, modern API, better TypeScript integration

### Test Types Distribution

#### Unit Tests (50% of tests)
**Target:** Utility functions, helpers, type guards  
**Coverage Goal:** 80%+  
**Focus Areas:**
- lib/blog.ts - Blog post processing functions
- lib/utils.ts - Utility functions
- Type guard functions
- Date formatting functions
- Data transformation functions

**Example Components:**
- Pure functions with no side effects
- Functions with clear input/output
- Edge case handling
- Error conditions

#### Component Tests (45% of tests)
**Target:** React components, UI elements  
**Coverage Goal:** 60%+  
**Focus Areas:**
- UI components (Button, Card, etc.)
- Feature components (GitHubRepositories)
- Layout components
- Navigation components

**Test Scenarios:**
- Rendering with different props
- User interactions (clicks, hovers)
- Conditional rendering
- Accessibility attributes
- Error states

#### Integration Tests (5% of tests)
**Target:** Page-level functionality  
**Coverage Goal:** 30%+  
**Focus Areas:**
- Blog post page rendering
- Navigation flow
- Data fetching and display

**Test Scenarios:**
- Full page render
- Data loading states
- Error handling
- Route changes

### Coverage Targets

**Overall Coverage:** 30%+ (Initial), 50%+ (Target)

**By File Type:**
- Utilities: 80%+
- Components: 60%+
- Pages: 30%+
- Config files: Not required

**Coverage Reporting:**
- Generate on every test run
- Include in CI pipeline
- Track trends over time
- Fail CI if coverage drops below 25%

### Testing Best Practices

**File Organization:**
- `__tests__/` directory mirrors `src` structure
- Test files named `[component].test.tsx` or `[file].test.ts`
- Setup files in `__tests__/setup.ts`
- Shared test utilities in `__tests__/utils/`

**Test Structure:**
- Use describe blocks for grouping
- Clear test names describing behavior
- Arrange-Act-Assert pattern
- One assertion per test when possible

**Mocking Strategy:**
- Mock external dependencies (fs, API calls)
- Mock Next.js router when needed
- Avoid over-mocking (test real behavior when safe)

**CI Integration:**
- Run tests on every push
- Run tests on every PR
- Fail builds on test failures
- Generate coverage reports
- Comment coverage diff on PRs

---

## 7. GIT WORKFLOW SPECIFICATIONS

### Branch Naming Convention

**Format:** `<type>/<short-description>`

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation only
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

**Examples:**
- `feature/add-testing-infrastructure`
- `fix/duplicate-href-github-repos`
- `refactor/improve-typescript-types`
- `docs/rewrite-readme`
- `test/add-blog-utils-tests`
- `chore/update-dependencies`

### Commit Message Format

**Structure:** `<type>: <subject>`

**Types (following Conventional Commits):**
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

**Rules:**
- Use imperative mood ("add" not "added")
- No period at the end
- Keep subject under 72 characters
- Reference issue numbers when applicable

**Examples:**
```
feat: add Vitest testing infrastructure
fix: remove duplicate href in GitHubRepositories component
test: add unit tests for blog utility functions
refactor: extract DATA type interface
docs: rewrite README with professional format
chore: update Next.js to 14.2.15
```

### Pull Request Process

**Self-Review Checklist (before merge):**
- [ ] All tests pass locally
- [ ] No console errors or warnings
- [ ] Code follows existing style
- [ ] No commented-out code
- [ ] Type safety maintained
- [ ] README updated if needed
- [ ] No merge conflicts
- [ ] Branch up to date with main

**PR Title Format:**
Same as commit messages: `<type>: <description>`

**PR Description Template:**
```markdown
## Changes
Brief description of what changed

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tested locally

## Related
Closes #issue-number (if applicable)
```

### Merge Strategy

**Approach:** Squash and merge  
**Rationale:** Keeps main branch history clean, one commit per feature

**Before Merging:**
- All CI checks must pass
- Self-review completed
- Code runs successfully in preview deployment

### Branch Lifecycle

**Feature Development:**
1. Create branch from `main`
2. Implement changes
3. Commit frequently with clear messages
4. Push to remote regularly
5. Open PR when ready
6. Self-review with checklist
7. Merge when all checks pass
8. Delete branch after merge

**Hotfix Process:**
1. Create `fix/` branch from `main`
2. Implement fix with test
3. Fast-track review
4. Merge immediately
5. Delete branch

### Version Tagging

**When to Tag:**
- After completing each major phase
- Before major deployments
- For portfolio milestones

**Tag Format:** `v<major>.<minor>.<patch>`

**Examples:**
- `v1.0.0` - After Phase 1 completion
- `v1.1.0` - After Phase 2 completion
- `v2.0.0` - After Phase 3 completion

### Pre-commit Standards

**Manual Checks (until pre-commit hooks added):**
- Run `npm run lint`
- Run `npm test`
- Run `npm run build`
- Check for console.log statements
- Verify no TypeScript errors

**Future Enhancement:**
Consider adding Husky for automated pre-commit hooks

---

## 8. SUCCESS METRICS & VALIDATION

### Code Quality Metrics

**Before Phase 1:**
- Test Coverage: 0%
- TypeScript Errors: 0 (but incomplete types)
- ESLint Errors: 2-3
- Production Bugs: 3+
- Language Consistency: Mixed (Slovak/English)

**After Phase 1 (Target):**
- Test Coverage: 30%+
- TypeScript Errors: 0
- ESLint Errors: 0
- Production Bugs: 0
- Language Consistency: 100% English

**After Phase 2 (Target):**
- Test Coverage: 40%+
- TypeScript Errors: 0 (with strict mode)
- CI/CD: Automated
- Documentation Quality: 9/10
- Error Handling: Comprehensive

**After Phase 3 (Target):**
- Test Coverage: 50%+
- Backend Project: Complete
- Portfolio Diversity: High
- Professional Score: 8.2/10

### Portfolio Assessment Scoring

**Category Breakdown (10 points each):**

**Code Quality (Current: 4/10, Target: 8/10)**
- Tests exist and pass
- No production bugs
- Clean, readable code
- Proper error handling
- TypeScript used correctly

**Testing (Current: 0/10, Target: 7/10)**
- Unit tests present
- Component tests present
- Reasonable coverage (30%+)
- Tests run in CI
- Coverage reported

**Documentation (Current: 5/10, Target: 9/10)**
- Professional README
- Clear setup instructions
- Performance metrics documented
- API documentation (for backend)
- Code comments where needed

**Professionalism (Current: 3/10, Target: 9/10)**
- Consistent language
- No template artifacts
- CI/CD implemented
- Proper git workflow
- Security considerations

**Completeness (Current: 6/10, Target: 8/10)**
- Full-stack demonstrated
- Backend project included
- Blog features complete
- Error states handled
- Loading states implemented

### Job Application Success Metrics

**Current State:**
- Application → Interview rate: ~10-15%
- Reason for rejection: "Not production-ready"

**Phase 1 Target:**
- Application → Interview rate: 40-50%
- Reason for rejection shifts to "Experience level"

**Phase 2 Target:**
- Application → Interview rate: 50-60%
- Competitive for junior positions

**Phase 3 Target:**
- Application → Interview rate: 60-70%
- Competitive for junior+ or mid-level

### Performance Benchmarks

**Lighthouse Scores (verify with evidence):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Bundle Size:**
- Initial JS: < 100KB
- Total Page Weight: < 500KB
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Validation Checklist

**After Phase 1:**
- [ ] All tests pass
- [ ] No Slovak text on site
- [ ] Zero console errors
- [ ] README professionally written
- [ ] Can deploy successfully
- [ ] All links functional

**After Phase 2:**
- [ ] CI pipeline passes all jobs
- [ ] Coverage report generated
- [ ] TypeScript strict mode enabled
- [ ] Error boundaries working
- [ ] Performance metrics documented

**After Phase 3:**
- [ ] Backend project deployed
- [ ] API documentation complete
- [ ] All projects in portfolio
- [ ] Open source contribution made
- [ ] Analytics enabled

---

## 9. DEPLOYMENT & ROLLOUT STRATEGY

### Development Environment

**Local Development:**
- Use `npm run dev` for hot reload
- Test in Chrome and Firefox
- Check mobile responsive (Chrome DevTools)
- Verify dark mode works
- Test on actual mobile device when possible

**Testing Environment:**
- Run full test suite before push
- Check for TypeScript errors
- Lint all code
- Build successfully
- Manual QA on key pages

### Deployment Pipeline

**Vercel Automatic Deployments:**

**On Push to Main:**
1. Vercel detects commit
2. Runs build process
3. Deploys to production
4. Production URL updated
5. Previous version retained

**On Pull Request:**
1. Vercel creates preview deployment
2. Unique URL generated
3. Test in production-like environment
4. Share preview URL for review

### Rollout Order

**Phase 1 Rollout:**
1. Complete all testing tasks locally
2. Translate content
3. Fix bugs
4. Rewrite README
5. Merge to main (one large PR or multiple small PRs)
6. Verify production deployment
7. Share updated portfolio

**Phase 2 Rollout:**
1. Setup CI/CD first (protects future changes)
2. Improve TypeScript incrementally
3. Document performance with evidence
4. Add blog features
5. Merge each feature separately
6. Verify CI passes

**Phase 3 Rollout:**
1. Build backend project in separate repo
2. Deploy backend independently
3. Add to portfolio when complete
4. Other enhancements as time allows

### Rollback Procedures

**If Production Breaks:**
1. Identify breaking commit via Vercel dashboard
2. Revert commit in git
3. Push revert to main
4. Vercel automatically redeploys
5. Fix issue in new branch
6. Redeploy fix

**If Tests Fail in CI:**
1. PR is blocked from merging
2. Fix tests locally
3. Push fix to feature branch
4. CI reruns automatically
5. Merge when green

**If Build Fails:**
1. Check Vercel logs
2. Reproduce locally
3. Fix TypeScript/dependency issues
4. Push fix
5. Verify build succeeds

### Monitoring Post-Deployment

**After Each Major Change:**
- [ ] Check live site loads
- [ ] Verify no console errors
- [ ] Test main navigation
- [ ] Check blog posts load
- [ ] Verify mobile responsive
- [ ] Test dark mode toggle
- [ ] Check Lighthouse scores
- [ ] Monitor Vercel Analytics (if enabled)

**Weekly Health Checks:**
- Review Vercel deployment logs
- Check for any error spikes
- Verify uptime (should be 99.9%+)
- Review analytics if available
- Check for security alerts on dependencies

---

## 10. RISK MITIGATION

### Technical Risks

**Risk: Tests may be difficult to write for certain components**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Start with simple components, learn testing patterns, ask for help in communities
- **Contingency:** Focus on utility function tests first, add component tests gradually

**Risk: CI/CD configuration may fail initially**
- **Probability:** Medium
- **Impact:** Low
- **Mitigation:** Use proven GitHub Actions templates, test locally first
- **Contingency:** Deploy without CI initially, add later when working

**Risk: Time estimates may be optimistic**
- **Probability:** High
- **Impact:** Medium
- **Mitigation:** Add 20% buffer to all estimates, track actual time
- **Contingency:** Prioritize P0 tasks, deprioritize P2 tasks

**Risk: Breaking changes during refactoring**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Make small incremental changes, test thoroughly
- **Contingency:** Use git revert, have backups

### Schedule Risks

**Risk: Job search taking longer than expected**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Complete Phase 1 ASAP to improve callback rate
- **Contingency:** Apply with Phase 1 complete, continue Phase 2/3 while interviewing

**Risk: Learning curve steeper than expected**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Research before starting, use documentation, ask for help
- **Contingency:** Simplify scope, focus on must-haves

**Risk: Getting hired before completion**
- **Probability:** Low (but ideal!)
- **Impact:** Positive
- **Mitigation:** None needed
- **Contingency:** Continue improvements while employed, shows continuous learning

### Quality Risks

**Risk: Test coverage insufficient**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:** Set minimum coverage thresholds, review regularly
- **Contingency:** Add more tests before applying to critical positions

**Risk: Translation errors in English content**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:** Use Grammarly, have native speaker review if possible
- **Contingency:** Iterate on feedback, improve over time

**Risk: Performance regression after changes**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:** Run Lighthouse before and after, monitor bundle size
- **Contingency:** Optimize images, code-split, lazy load

---

## 11. APPENDICES

### A. File Structure Changes

**New Directories:**
```
portfolio/
├── __tests__/                 # New testing directory
│   ├── setup.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.test.tsx
│   │   │   └── card.test.tsx
│   │   └── github-repositories.test.tsx
│   ├── lib/
│   │   ├── blog.test.ts
│   │   └── utils.test.ts
│   └── utils/                # Test utilities
│
├── .github/
│   ├── workflows/            # New CI/CD directory
│   │   └── ci.yml
│   ├── performance/          # New performance evidence
│   │   ├── lighthouse-mobile.png
│   │   └── lighthouse-desktop.png
│   └── screenshots/          # New screenshots
│       ├── homepage.png
│       └── blog.png
```

**New Files:**
```
vitest.config.ts              # Test configuration
.env.example                  # Environment variables template
components/error-boundary.tsx # Error handling
components/ui/loading-skeleton.tsx
app/error.tsx                 # Error page
lib/types.ts                  # Centralized types
```

**Modified Files:**
```
package.json                  # New dependencies and scripts
README.md                     # Complete rewrite
next.config.js                # Security headers, bundle analyzer
.eslintrc.json                # Additional rules
tsconfig.json                 # Strict mode
.gitignore                    # Coverage directory
components/github-repositories.tsx # Bug fixes, translations
lib/resume.tsx                # Translations, type interface
app/layout.tsx                # Error boundary, analytics
```

### B. Dependency Additions

**Development Dependencies:**
```json
{
  "vitest": "^1.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.0",
  "happy-dom": "^12.0.0",
  "@next/bundle-analyzer": "^14.0.0"
}
```

**Production Dependencies (optional):**
```json
{
  "@vercel/analytics": "^1.0.0"
}
```

### C. Reference Materials

**Testing Resources:**
- Vitest Documentation: https://vitest.dev
- Testing Library: https://testing-library.com
- Next.js Testing Guide: https://nextjs.org/docs/testing

**CI/CD Resources:**
- GitHub Actions: https://docs.github.com/en/actions
- Next.js CI/CD: https://nextjs.org/docs/deployment

**TypeScript Resources:**
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook
- Type Challenges: https://github.com/type-challenges/type-challenges

**Django Resources:**
- Django Documentation: https://docs.djangoproject.com
- Django REST Framework: https://www.django-rest-framework.org
- Deployment Guide: https://docs.railway.app/databases/postgresql

### D. Quick Reference Commands

**Development:**
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
```

**Testing:**
```bash
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI
```

**Analysis:**
```bash
npm run analyze          # Analyze bundle size
```

**Git:**
```bash
git checkout -b feature/task-name    # Create new branch
git add .                            # Stage changes
git commit -m "feat: description"    # Commit with message
git push origin feature/task-name    # Push to remote
```

---

## Document Revision History

| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 1.0 | 2024-12-14 | Initial specification created | Marian Holly |

---

**END OF DOCUMENT**

**Next Steps:**
1. Review this specification thoroughly
2. Set up development environment
3. Begin with Phase 1, Task 1.1
4. Track progress by checking off tasks
5. Update this document as needed
6. Celebrate wins along the way!

**Remember:** The goal is not perfection, but consistent progress. Each completed task moves you closer to landing that job. You've got this! 🚀
