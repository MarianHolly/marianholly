# Feature Specification: Phase 1 Critical Fixes

**Feature Branch**: `001-phase1-critical-fixes`
**Created**: 2025-12-14
**Status**: Draft
**Input**: Consolidate Phase 1 critical features: testing infrastructure, language translation, production bug fixes, README rewrite

---

## User Scenarios & Testing

### User Story 1 - Setup Testing Infrastructure (Priority: P1)

**Actor**: Developer implementing the portfolio feature
**Journey**: As a developer, I need to run tests to ensure my code works correctly and prevent regressions. Without a testing framework, every deployment risks breaking existing functionality.

**Why this priority**: Testing is a dealbreaker for hiring teams—60% of positions automatically reject portfolios with zero test coverage. This blocks all subsequent work.

**Independent Test**: Can be fully tested by running `pnpm test` locally, seeing test suite execute, and verifying coverage report is generated. Delivers: confidence that code changes don't break existing functionality.

**Acceptance Scenarios**:

1. **Given** Vitest is installed, **When** I run `pnpm test`, **Then** test suite executes successfully and all tests pass
2. **Given** test files exist for components and utilities, **When** I run `pnpm test:coverage`, **Then** coverage report is generated showing 30%+ overall coverage
3. **Given** tests are failing, **When** I run `pnpm test:watch`, **Then** tests rerun automatically on file changes
4. **Given** a component test exists, **When** I open Vitest UI with `pnpm test:ui`, **Then** I can visually inspect tests and coverage

---

### User Story 2 - Translate Content to English (Priority: P1)

**Actor**: Hiring team reviewing the portfolio
**Journey**: As a hiring team member evaluating a junior developer, I visit the portfolio and encounter mixed-language content. Mixed language signals inability to work in international teams and lack of professionalism.

**Why this priority**: Mixed-language portfolios are rejected by 40% of companies and all international companies. This is a dealbreaker.

**Independent Test**: Can be fully tested by visiting the live site and verifying zero Slovak text appears anywhere (UI, navigation, descriptions, metadata). Delivers: professional impression that developer can communicate globally.

**Acceptance Scenarios**:

1. **Given** I visit the live portfolio site, **When** I inspect the homepage UI, **Then** all buttons, labels, and text are in English
2. **Given** I view the GitHub repositories section, **When** I read repository descriptions, **Then** all descriptions are in professional English (not Slovak)
3. **Given** I navigate to blog posts, **When** I read post titles and summaries, **Then** all blog metadata is in English
4. **Given** I inspect the resume/projects section, **When** I read dates and descriptions, **Then** all content is in English with proper grammar
5. **Given** I run a search for Slovak text patterns, **When** I scan all .tsx, .ts, and .mdx files, **Then** zero Slovak strings are found in user-facing content

---

### User Story 3 - Fix Production Bugs (Priority: P1)

**Actor**: Code reviewer or hiring team member inspecting source code
**Journey**: As a code reviewer, I audit the production code and find duplicate href attributes and improper Link component usage. This signals lack of code review process and quality assurance.

**Why this priority**: Production bugs are immediate rejection triggers—suggests developer ships without testing or code review. This blocks all subsequent work.

**Independent Test**: Can be fully tested by running linting rules and manually verifying all Link components use correct Next.js 14 patterns with no duplicate attributes. Delivers: production code that passes professional code quality standards.

**Acceptance Scenarios**:

1. **Given** I audit all Next.js Link components, **When** I inspect each usage, **Then** no duplicate href attributes exist
2. **Given** a Link component has `target="_blank"`, **When** I check the attributes, **Then** it includes `rel="noopener noreferrer"`
3. **Given** ESLint is configured with jsx-a11y rules, **When** I run `pnpm lint`, **Then** zero accessibility errors are reported
4. **Given** I manually test all links on the site, **When** I click each link, **Then** navigation works correctly with no console errors
5. **Given** I run the build process, **When** the build completes, **Then** no TypeScript errors or warnings are present

---

### User Story 4 - Rewrite README Professionally (Priority: P1)

**Actor**: Hiring team member or potential employer visiting the portfolio
**Journey**: As a hiring team evaluating a junior developer, I visit the GitHub repository and read the README. The README is my first impression of the developer's communication skills and professionalism.

**Why this priority**: README is the single most important marketing asset—it's read within 5 seconds before deciding whether to explore further. Current template-style README signals low effort and poor communication.

**Independent Test**: Can be fully tested by having someone unfamiliar with the project read the README and verify they understand: what the project does, why it's impressive, how to run it locally, and what technologies are used. Delivers: professional first impression that increases conversion from portfolio viewer to interview callback.

**Acceptance Scenarios**:

1. **Given** I open the README, **When** I read the first section, **Then** I immediately understand what this portfolio demonstrates (not a personal bio)
2. **Given** I scroll down, **When** I look for the live demo link, **Then** it's prominent and clickable
3. **Given** I want to understand the tech stack, **When** I read the technology section, **Then** I see justified choices (not just a list)
4. **Given** I want to run the project locally, **When** I follow the "Getting Started" section, **Then** I can clone and run it with 3 commands
5. **Given** I'm interested in performance, **When** I read the performance section, **Then** I see Lighthouse scores with supporting screenshots
6. **Given** I'm reviewing the project structure, **When** I read the architecture overview, **Then** I understand how components are organized

---

### Edge Cases

- What happens when a developer runs tests for the first time and all tests fail? (Test setup should provide clear error messages)
- How does the system handle if some content is correctly translated but a few strings remain in Slovak? (Content audit should be comprehensive)
- What happens if ESLint finds 50+ errors during the bug fix phase? (Errors should be fixed systematically, not ignored)
- How are performance metrics handled if they're below target (Lighthouse < 90)? (Document actual scores, not aspirational ones)

---

## Requirements

### Functional Requirements

**Testing Infrastructure**
- **FR-001**: System MUST support running tests via `pnpm test` command
- **FR-002**: System MUST generate coverage reports showing per-file coverage percentages
- **FR-003**: System MUST provide watch mode for TDD workflow (`pnpm test:watch`)
- **FR-004**: System MUST support component testing with React Testing Library assertions
- **FR-005**: System MUST support utility function testing with standard test assertions
- **FR-006**: System MUST achieve minimum 30% overall code coverage, enforced in CI

**Content Translation**
- **FR-007**: System MUST display 100% English text in all UI components (no Slovak)
- **FR-008**: System MUST display English in all repository descriptions and metadata
- **FR-009**: System MUST display English in all blog post titles, summaries, and content
- **FR-010**: System MUST maintain grammatically correct, professional English throughout

**Bug Fixes & Code Quality**
- **FR-011**: System MUST have zero duplicate href attributes in Link components
- **FR-012**: System MUST have all external links with proper `rel="noopener noreferrer"`
- **FR-013**: System MUST pass ESLint with zero errors (warnings acceptable)
- **FR-014**: System MUST pass TypeScript strict mode compilation with zero errors
- **FR-015**: System MUST load production site with zero console errors

**Documentation**
- **FR-016**: README MUST include live demo link in first section
- **FR-017**: README MUST document project features and technical stack
- **FR-018**: README MUST include "Getting Started" section with setup instructions
- **FR-019**: README MUST include performance metrics with Lighthouse evidence
- **FR-020**: README MUST NOT include personal bio or resume content
- **FR-021**: README MUST use professional tone throughout

### Key Entities

- **TestSuite**: Represents the testing infrastructure (Vitest configuration, test files, coverage settings)
- **ContentItem**: Any user-facing text (UI string, description, metadata, blog post)
- **CodeQualityRule**: Linting and TypeScript rules that enforce code standards
- **Documentation**: README and supporting technical documentation

---

## Success Criteria

### Measurable Outcomes

**Testing Infrastructure Success**
- **SC-001**: Test suite runs successfully locally and in CI environment (0 failed runs)
- **SC-002**: Minimum 30% code coverage achieved and reported (verified by coverage command)
- **SC-003**: All component tests pass (5+ component tests with 100% pass rate)
- **SC-004**: All utility tests pass (3+ utility tests with 100% pass rate)
- **SC-005**: Coverage threshold enforced in CI (build fails if coverage drops below 25%)

**Content Translation Success**
- **SC-006**: Zero Slovak strings found in production code or UI (automated scan + manual verification)
- **SC-007**: All navigation labels, buttons, and descriptions are professional English (manual review)
- **SC-008**: Grammar check passes on all user-facing content (Grammarly or equivalent)
- **SC-009**: Consistent terminology used throughout (same concepts use same words)
- **SC-010**: Live site displays 100% English text when visited

**Bug Fixes Success**
- **SC-011**: ESLint passes with zero errors on all commits
- **SC-012**: TypeScript compilation succeeds with zero errors
- **SC-013**: Production site loads with zero console errors (verified in DevTools)
- **SC-014**: All links functional and navigate correctly (manual testing)
- **SC-015**: Accessibility audit shows no critical issues (axe audit or equivalent)

**README Success**
- **SC-016**: First section clearly explains what the portfolio demonstrates (no bio content)
- **SC-017**: Live demo link is visible within first 100px of scroll
- **SC-018**: "Getting Started" section allows fresh clone to run with 3 commands
- **SC-019**: Performance section includes actual Lighthouse screenshots and Core Web Vitals
- **SC-020**: Fresh clone successfully builds and runs without errors
- **SC-021**: Hiring team feedback indicates professional impression (+40% perceived professionalism)

---

## Assumptions

- Testing will use Vitest as the primary test runner (modern, fast, Vite-native)
- Component testing uses React Testing Library (industry standard)
- Coverage tool is built into Vitest (no additional tool needed)
- Fresh clone of repository can be tested without complex setup
- All Slovak content is limited to known files (components, resume, blog metadata)
- Lighthouse target of 90+ on Performance metric is achievable with current stack
- Hiring teams evaluate portfolio within 5 seconds, requiring immediate professional impression

---

## Dependencies & Constraints

**Blocking Dependencies**
- Testing infrastructure must be completed before other work can be verified
- Bug fixes must be completed before deployment (security/quality concern)
- Content translation must be 100% complete (partial translation is worse than none)

**Technical Constraints**
- Must use existing Next.js 14 and TypeScript setup
- Must not introduce breaking changes to existing components
- Coverage threshold must be enforced in CI (non-negotiable per constitution)

**Timeline Constraints**
- Phase 1 must complete within 16-20 hours total (per DEV_PLAN estimates)
- High priority for rapid hiring impact

---

## Clarifications Needed

[No critical clarifications required - user provided detailed DEV_PLAN with clear scope and requirements]

---

## Notes

**Alignment with Constitution**
- **Principle I (Production-Ready Code)**: Tests and bug fixes ensure zero production bugs and type safety
- **Principle II (Quality-First Workflow)**: Testing infrastructure enables TDD, tests written first
- **Principle III (Language Consistency)**: Content translation ensures 100% English professional communication
- **Principle IV (Evidence-Based Claims)**: README with actual Lighthouse scores and evidence
- **Principle V (CI/CD Automation)**: Test infrastructure foundation for automated checks

**Next Steps**
1. Generate implementation plan detailing architecture and technical decisions
2. Generate task list with ordered, parallelizable work items
3. Execute Phase 1 tasks in priority order
