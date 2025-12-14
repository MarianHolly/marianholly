<!--
Sync Impact Report
- Version change: INITIAL → 1.0.0 (new constitution)
- New principles: 5 core principles aligned with portfolio development goals
- New sections: Quality Standards, Development Workflow, Deployment Strategy
- All templates require verification: plan-template.md ✅ compatible, spec-template.md ✅ compatible, tasks-template.md ✅ compatible
- No deprecated references found in templates
-->

# Marian Holly Portfolio Constitution

Constitution for portfolio website development establishing principles, quality standards, and governance for achieving professional-grade code quality and hiring success.

## Core Principles

### I. Production-Ready Code (NON-NEGOTIABLE)

Every feature must pass production readiness criteria before merge. No feature reaches users without:
- **Zero known production bugs**: All identified issues fixed
- **Type-safe implementation**: Full TypeScript strict mode compliance, no implicit any
- **Comprehensive error handling**: Error boundaries, fallback UI, graceful degradation
- **Tested thoroughly**: Minimum 30% test coverage overall, 80%+ for utilities, 60%+ for components
- **Performance verified**: Lighthouse audit run, bundle size analyzed, Core Web Vitals documented

**Rationale**: Junior developer portfolios are evaluated by hiring teams within 30 seconds. A single production bug triggers automatic rejection from 60% of positions. Quality is the primary differentiator in competitive market.

---

### II. Quality-First Workflow (NON-NEGOTIABLE)

Implementation follows strict ordering: tests first, then code, then documentation. No exceptions.

- **Test-Driven Development**: Write failing test → implement code → verify test passes → refactor
- **Type-First Design**: Define types/interfaces before implementation
- **Documentation-As-Requirement**: READMEs, comments, and guides written alongside code, not after
- **Pre-Merge Verification**: All tests pass, linting succeeds, build completes, manual testing confirms

**Rationale**: TDD prevents scope creep and ensures implementation correctness. Early documentation captures intent and reduces future maintenance burden. This demonstrates professional engineering discipline that hiring teams expect.

---

### III. Language Consistency & Professional Communication (MANDATORY)

All user-facing content, documentation, and git communication must be in English at production-grade quality. No mixing of languages, no template artifacts, no low-effort copy.

- **Content**: 100% English across UI, component labels, data descriptions, blog metadata
- **Grammar & Style**: Professional business English, proofread, consistent terminology throughout
- **Git Communication**: Clear commit messages following Conventional Commits format
- **Documentation**: READMEs, guides, and technical docs written for professional audience, not personal blog

**Rationale**: Mixed-language portfolios signal inability to work in international teams. Generic template text signals low effort and lack of care. Professional communication demonstrates business awareness—critical for junior developers in competitive market.

---

### IV. Evidence-Based Claims (MANDATORY)

All claims about capabilities must be backed by demonstrable proof. No assertions without evidence.

- **Performance Claims**: Lighthouse screenshots, bundle analysis reports, Core Web Vitals metrics stored in repository
- **Test Coverage**: Coverage reports generated and published, thresholds enforced in CI
- **Security Practices**: Security headers visible, input sanitization documented, vulnerability scanning configured
- **Feature Completeness**: User-facing features match documentation, all happy paths and error states functional

**Rationale**: Unsubstantiated claims are red flags in hiring. Proof demonstrates integrity and attention to detail. Storing evidence in repository shows professional practices and builds trust with hiring teams.

---

### V. Continuous Integration & Automation (MANDATORY)

All quality checks must run automatically. No manual verification required. CI/CD pipeline is mandatory before Phase 2 completion.

- **Automated Linting**: ESLint runs on every push, blocks merge on failures
- **Automated Testing**: Tests run on every push, coverage reported, failures block merge
- **Automated Builds**: Build process runs on every push, catches TypeScript errors
- **Continuous Deployment**: Production deploys automatically on main branch push, rollback on failure

**Rationale**: Automated workflows prevent human error and demonstrate understanding of professional development practices. Hiring teams expect CI/CD implementation—its absence signals inexperience with team environments.

---

## Quality Standards

### Test Coverage Requirements

- **Overall minimum**: 30%+ (Phase 1), target 50%+ (Phase 3)
- **By category**:
  - Utilities/helpers: 80%+ (functions with clear input/output)
  - UI components: 60%+ (rendering, props, interactions)
  - Integration: 30%+ (page-level functionality, data flow)
- **CI enforcement**: Build fails if coverage drops below thresholds

### Code Quality Gates

- **TypeScript**: Strict mode enabled, zero implicit any types
- **ESLint**: Zero errors on merge (warnings permitted)
- **Performance**: Lighthouse 90+ on Performance metric, all Core Web Vitals passing
- **Bundle size**: Initial JS < 100KB, total page < 500KB
- **Accessibility**: WCAG 2.1 AA compliance minimum (tested with axe or similar)

### Documentation Requirements

- **README.md**: Professional format, live demo link, features, tech stack, getting started, performance metrics
- **Technical documentation**: API documentation (if applicable), architecture decisions, deployment guide
- **Code comments**: Complex logic explained, not obvious code, JSDoc for exported functions
- **Commit messages**: Conventional Commits format, clear intent, references to issues

---

## Development Workflow

### Branch Strategy

**Format**: `<type>/<short-description>`
- `feature/` - New features or enhancements
- `fix/` - Bug fixes for production issues
- `refactor/` - Code restructuring without behavior change
- `docs/` - Documentation only (no code changes)
- `test/` - Test additions or improvements
- `chore/` - Maintenance, dependencies, tooling

### Commit Message Format

**Structure**: `<type>: <subject>` (Conventional Commits)

Types: `feat`, `fix`, `test`, `refactor`, `docs`, `style`, `chore`, `perf`

Rules:
- Imperative mood ("add" not "added")
- No period at end
- Keep subject under 72 characters
- Reference issue numbers when applicable

### Pull Request Process

1. **Pre-submission**: Run `pnpm lint`, `pnpm test`, `pnpm build` locally
2. **Create PR**: Use template, describe changes, reference issues
3. **Self-review**: Verify tests pass, no console errors, code style consistent
4. **Merge criteria**: All CI checks pass, self-review complete, no merge conflicts
5. **Post-merge**: Delete branch, verify production deployment succeeds

### Merge Strategy

Squash and merge to keep main branch history clean (one commit per feature/fix).

---

## Deployment Strategy

### Stages

**Development**: `pnpm dev` → localhost:3000, hot reload, full errors

**Preview**: Vercel automatic preview on every PR, production-like environment

**Production**: Vercel automatic deploy on push to main, URL: marianholly.vercel.app

### Pre-Deployment Checks

All items required before pushing to main:
- ✅ Tests pass locally
- ✅ No TypeScript errors
- ✅ ESLint passes
- ✅ Build succeeds locally
- ✅ Manual testing on key pages completed
- ✅ No console errors in DevTools
- ✅ Mobile responsive verified
- ✅ Dark mode toggle tested

### Post-Deployment Verification

- [ ] Live site loads without errors
- [ ] Main navigation functions correctly
- [ ] Blog posts render properly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Lighthouse audit scores acceptable (90+)
- [ ] No new console errors

---

## Governance

### Constitution Authority

This constitution defines non-negotiable standards for all portfolio development work. All implementation decisions must align with these principles. Ambiguity resolved in favor of production quality.

### Amendment Process

**Minor amendments** (clarifications, wording fixes, non-semantic changes):
- Document change in constitution
- No voting required
- Increment PATCH version

**Significant amendments** (new principle, materially changed requirement, removed constraint):
- Document change with rationale
- Reference issue number
- Increment MINOR version

**Major amendments** (principle removal/redefinition, workflow overhaul):
- Document comprehensive change
- Explain migration path
- Increment MAJOR version

### Compliance Verification

- **Code reviews**: Verify principle alignment before merge
- **CI validation**: Automated checks enforce technical standards
- **Pre-deployment**: Manual verification confirms quality gates met
- **Monthly review**: Assess effectiveness, identify friction points, propose improvements

### Guidance & Reference

For runtime development guidance and task execution, refer to `.specify/` templates and commands. Constitution defines the "what and why", while templates define the "how".

---

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2025-12-14 | Initial constitution created from DEV_PLAN | Ratified |

---

**Version**: 1.0.0 | **Ratified**: 2025-12-14 | **Last Amended**: 2025-12-14
