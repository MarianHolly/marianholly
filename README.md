# Marian Holly - Full-Stack Developer Portfolio

A modern, performant portfolio website built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Showcasing projects, blog articles, and technical expertise with production-grade code quality and comprehensive test coverage.

**Live Site:** [https://marianholly.vercel.app](https://marianholly.vercel.app)

## 🎯 About Me

I'm a self-taught frontend developer who has expanded into full-stack development through structured learning and hands-on experience. My journey began with JavaScript, React, and Next.js, and I've since completed formal training in Python, SQL, and Django. Currently, I'm actively seeking junior developer opportunities where I can apply my skills while continuing to grow professionally.

My approach to development focuses on:
- Building solid foundations in key technologies
- Progressive expertise expansion across the development stack
- Writing clean, maintainable, and well-tested code
- Creating user-centric interfaces with excellent performance

## 🚀 Project Highlights

### Performance Metrics
- **Lighthouse Scores:** 95+ across all metrics (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size:** ~85KB gzipped (JavaScript optimized through code splitting)
- **Core Web Vitals:** All passing (LCP, FID, CLS)
- **Build Time:** <30 seconds for production builds
- **Test Coverage:** 170+ unit and component tests with 79.54% library coverage

### Key Features
- ✨ Advanced animations with Framer Motion (staggered BlurFade effects)
- 🎨 Dark mode support via next-themes with system preference detection
- 📝 MDX blog with syntax highlighting via rehype-pretty-code
- 🔍 Full content sanitization with rehype-sanitize
- ♿ Fully accessible (WCAG 2.1 AA standard) using Radix UI primitives
- 📱 Responsive design across all devices
- ⚡ Server-side rendering for optimal SEO
- 🧪 Comprehensive test suite with Vitest

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14** - App Router with server/client components
- **React 18** - Component library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3** - Utility-first styling

### UI & Components
- **shadcn/ui** - 35+ accessible component library
- **Radix UI** - Unstyled, accessible primitives
- **CVA (Class Variance Authority)** - Type-safe component variants
- **Lucide React** - Icon library

### Content & Animation
- **Framer Motion** - Advanced animations
- **next-mdx-remote** - MDX support with server-side rendering
- **gray-matter** - YAML frontmatter parsing
- **rehype-pretty-code** - Syntax highlighting with copy button
- **unified** - Text processing pipeline

### Development & Testing
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing
- **@vitest/coverage-v8** - Code coverage reporting
- **ESLint with Unicorn plugin** - Code quality

### Deployment
- **Vercel** - Automatic CI/CD deployments
- **GitHub Actions** ready for custom workflows

## 📁 Project Structure

```
marianholly/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global Tailwind styles
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic blog post pages
│
├── components/                   # React components
│   ├── ui/                      # 35+ shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   └── ... (30+ more)
│   ├── card-blog.tsx            # Blog card component
│   ├── card-project.tsx         # Project card component
│   ├── github-repositories.tsx  # GitHub projects showcase
│   ├── mdx.tsx                  # MDX component mappings
│   ├── theme-provider.tsx       # next-themes integration
│   └── site-navigation.tsx      # Main navigation
│
├── lib/                         # Utilities & business logic
│   ├── blog.ts                 # Blog processing pipeline (96% tested)
│   ├── utils.ts                # Utility functions (85% tested)
│   ├── validators.ts           # Input validation (100% tested)
│   ├── error-handler.ts        # Error management (100% tested)
│   ├── constants.ts            # App constants (100% tested)
│   ├── resume.tsx              # Resume/portfolio data
│   └── types.ts                # TypeScript interfaces
│
├── content/                     # MDX blog posts
│   ├── object-oriented-programming.mdx
│   └── ... (more posts)
│
├── __tests__/                   # Test suite (170 tests)
│   ├── lib/
│   │   ├── utils.test.ts       # 32 tests
│   │   ├── blog.test.ts        # 21 tests
│   │   ├── validators.test.ts  # 36 tests
│   │   ├── error-handler.test.ts # 29 tests
│   │   └── constants.test.ts   # 42 tests
│   ├── components/
│   │   └── ui/ (button, card, badge, avatar tests)
│   └── setup.ts                # Global test setup
│
├── public/                      # Static assets
│   ├── avatar.jpg
│   └── videos/
│
└── Configuration files
    ├── next.config.mjs          # Next.js configuration
    ├── tailwind.config.ts       # Tailwind theme
    ├── tsconfig.json            # TypeScript strict mode
    ├── vitest.config.ts         # Test runner config
    └── package.json             # Dependencies & scripts
```

## 🧪 Testing & Code Quality

### Test Coverage
```
✅ 170 tests across 10 test files
✅ 79.54% library code coverage
✅ 100% coverage on: constants.ts, error-handler.ts, validators.ts
✅ Unit tests: utilities, validators, error handling
✅ Component tests: Button, Card, Badge, Avatar
✅ Integration tests: blog processing, markdown conversion
```

### Available Test Commands
```bash
npm run test          # Run tests once
npm run test:watch   # Watch mode
npm run test:ui      # UI dashboard
npm run test:coverage # Coverage report
```

### Code Quality Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Custom rules (unicorn/prefer-node-protocol, no-else-return, no-isNaN)
- **Type Guards**: Runtime safety for external data
- **Error Handling**: Custom error classes with proper status codes
- **Input Validation**: Comprehensive validators for all user inputs

## 📊 Performance

### Lighthouse Scores (Production)
| Metric | Score | Status |
|--------|-------|--------|
| Performance | 95+ | ✅ Excellent |
| Accessibility | 95+ | ✅ Excellent |
| Best Practices | 95+ | ✅ Excellent |
| SEO | 100 | ✅ Perfect |

### Page Load Metrics
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **First Input Delay (FID):** <100ms
- **Cumulative Layout Shift (CLS):** <0.1

### Optimizations Applied
- ✅ Server-side rendering for initial content
- ✅ Image optimization with Next.js Image component
- ✅ CSS code splitting and minification
- ✅ JavaScript code splitting at route level
- ✅ Build-time blog post processing
- ✅ Sanitized HTML to prevent XSS attacks
- ✅ Remote image domains whitelisted for security

## 🔧 Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run tests
npm run test              # Run once
npm run test:watch      # Watch mode
npm run test:ui         # UI dashboard
npm run test:coverage   # Coverage report
```

## 📚 Blog Features

### Content Pipeline
MDX files → gray-matter (frontmatter) → remark-parse → remark-rehype → rehype-pretty-code (syntax highlighting) → rehype-sanitize (security) → rehype-stringify

### Frontmatter Schema
```yaml
title: string (required)
subtitle: string (optional)
publishedAt: string (ISO date, required)
summary: string (optional)
image: string (optional, URL)
tags: string | string[] (optional)
published: boolean (defaults to true)
```

### Features
- ✨ Syntax highlighting with copy buttons
- 🔒 Sanitized HTML (prevents XSS)
- 📱 Responsive code blocks
- 🎨 Light/dark theme support
- 🔍 SEO-friendly metadata

## 🔐 Security

- **XSS Prevention**: rehype-sanitize with strict allowlist
- **CSRF Protection**: Next.js built-in protections
- **Input Validation**: Comprehensive validators for all inputs
- **Error Masking**: User-friendly errors, detailed logs in dev mode
- **Image Whitelisting**: Remote image domains explicitly configured

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Quality Goals

This portfolio represents production-ready code with:
- **Comprehensive Testing**: 170 tests ensuring reliability
- **Type Safety**: Full TypeScript strict mode
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: 95+ Lighthouse scores
- **Code Organization**: Clear structure and patterns
- **Documentation**: Well-commented code and comprehensive README

## 🚀 Next Steps

### Phase 2: Advanced Features
- GitHub Actions CI/CD pipeline
- Enhanced TypeScript patterns
- Performance documentation
- Additional blog features
- E2E testing with Playwright

### Deployment
Deployed automatically to Vercel on every push to main branch.

## 👤 About the Developer

**Marian Holly** - Full-Stack Developer

- 📍 **Location:** Slovakia 🇸🇰
- 💼 **Seeking:** Junior developer positions
- 🎓 **Background:** Self-taught frontend + formal Python training
- 📧 **Email:** [marian.holly7117@gmail.com](mailto:marian.holly7117@gmail.com)
- 🔗 **LinkedIn:** [Profile](https://www.linkedin.com/in/marian-holly-291b62306/)
- 💻 **GitHub:** [MarianHolly](https://github.com/MarianHolly)
- 🌐 **Portfolio:** [marianholly.vercel.app](https://marianholly.vercel.app)

### Technical Proficiencies
- **Frontend:** JavaScript, React, Next.js, TypeScript, Tailwind CSS
- **Backend:** Python, Django, Node.js
- **Databases:** SQL, PostgreSQL
- **Tools:** Git, GitHub, Vercel, ESLint, Vitest, React Testing Library

### Specializations
- Building accessible, performant web applications
- Creating responsive user interfaces
- Writing clean, maintainable code
- Test-driven development
- Full-stack development with JavaScript and Python

## 📝 License

This project is open source. Feel free to fork, modify, and learn from the code.

---

**Last Updated:** December 2024
**Version:** 1.0.0 (Production Ready)
