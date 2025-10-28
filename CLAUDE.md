# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with **Next.js 14**, **TypeScript**, **React 18**, and **Tailwind CSS**. It showcases a developer's work with blog functionality, advanced animations (Framer Motion), and a fully accessible component system (Radix UI + shadcn/ui). The site is deployed on Vercel and features dynamic theming, MDX blog support with syntax highlighting, and performant animations.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Project Structure

### App Router (Next.js 14)
- **`app/layout.tsx`** - Root layout with global providers (ThemeProvider, TooltipProvider)
- **`app/page.tsx`** - Home page
- **`app/blog/page.tsx`** - Blog listing page
- **`app/blog/[slug]/page.tsx`** - Dynamic blog post pages
- **`app/globals.css`** - Global Tailwind styles

### Components
- **`components/ui/`** - 35+ shadcn/ui based components using CVA (Class Variance Authority) for styling
- **`components/theme-provider.tsx`** - next-themes integration for dark mode
- **`components/mdx.tsx`** - MDX component mappings for rendering custom components in blog posts
- **`components/site-navigation.tsx`** - Main navigation component
- All UI components follow accessible patterns (Radix UI primitives)

### Content & Utilities
- **`lib/blog.ts`** - Blog processing pipeline: MDX → HTML with rehype-pretty-code syntax highlighting, sanitization (rehype-sanitize), and copy-button transformers
- **`lib/resume.tsx`** - Resume data and structure
- **`lib/types.ts`** - TypeScript interfaces (Article, ArticleMetadata, FullArticle)
- **`lib/utils.ts`** - Common utility functions (cn for class merging)
- **`content/`** - MDX blog post files with frontmatter (title, publishedAt, tags, summary, image, published)

### Configuration
- **`next.config.mjs`** - Remote image patterns for Unsplash, Microlink, GitHub raw, Pinimg, etc.
- **`tailwind.config.ts`** - Tailwind configuration with CSS variables for theming
- **`tsconfig.json`** - TypeScript strict mode enabled, path alias `@/*` maps to root
- **`components.json`** - shadcn/ui configuration

## Architecture Patterns

### Type-Safe Development
- Strict TypeScript mode enabled
- Type guards for runtime safety (e.g., `isFullArticle()`)
- Comprehensive interfaces for blog articles, metadata, and components

### Server/Client Components
- Server Components for static content (SEO benefits)
- Client Components (`"use client"`) for interactive features (theme switching, navigation)
- Optimized bundle splitting through strategic component placement

### Blog Processing Pipeline
1. **MDX Files** → gray-matter (frontmatter extraction)
2. **Markdown** → remark-parse (parsing)
3. **HTML** → remark-rehype (conversion)
4. **Syntax Highlighting** → rehype-pretty-code (with copy button transformer)
5. **Sanitization** → rehype-sanitize (security)
6. **HTML Output** → rehype-stringify

Key sanitization rules:
- Allows code blocks, figures, standard HTML tags
- Allows `data-*` attributes for syntax highlighting metadata
- Restricts protocols (only http, https, mailto, tel, #)

### Component Styling
- CVA (Class Variance Authority) for type-safe component variants
- Tailwind CSS utility-first approach
- CSS variables for theming (light/dark modes)
- shadcn/ui as unstyled, accessible component base

### Animation Patterns
- Framer Motion for advanced animations
- Staggered animations with `BlurFade` wrapper component
- Spring animations for smooth transitions
- Motion variants for consistent animation language

## Key Dependencies

### UI & Styling
- `@radix-ui/*` - Accessible component primitives
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe component variants
- `tailwind-merge` - Merge Tailwind classes intelligently
- `tailwindcss-animate` - Animation utilities

### Content Processing
- `next-mdx-remote` - MDX support
- `gray-matter` - YAML frontmatter parsing
- `unified` - Text processing pipeline
- `rehype-pretty-code` - Syntax highlighting
- `rehype-sanitize` - Security sanitization
- `@rehype-pretty/transformers` - Code block transformers (copy button)

### Theming & Animation
- `next-themes` - Dark mode management
- `framer-motion` - Advanced animations
- `lucide-react` - Icon library

## TypeScript Path Aliases
- `@/*` resolves to project root - use for clean imports: `@/lib/utils`, `@/components/ui/button`

## ESLint Rules
Custom ESLint rules defined in `package.json`:
- `unicorn/prefer-node-protocol`: Use `node:` protocol (e.g., `import fs from "node:fs"`)
- `no-else-return`: Prevent unnecessary else blocks
- `no-restricted-globals`: Disallow `isNaN` (use `Number.isNaN` instead)

## Deployment
- Hosted on **Vercel** (https://marian-holly.vercel.app)
- Automatic deployments on git push
- Lighthouse scores: 95+ across all metrics

## Special Notes

### Theme Provider
The `ThemeProvider` uses next-themes with `suppressHydrationWarning` to prevent hydration mismatches when using system theme detection.

### Blog Frontmatter Schema
```yaml
title: string (required)
subtitle?: string
publishedAt: string (ISO date)
summary?: string
image?: string (URL)
tags: string | string[]
published: boolean (defaults to true)
```

### Remote Image Domains
Configured in `next.config.mjs`:
- images.unsplash.com
- api.microlink.io
- magicui.design
- raw.githubusercontent.com
- i.pinimg.com
- pub-83c5db439b40468498f97946200806f7.r2.dev

Update this when adding new external image sources.

### Speckit Integration
The project uses Speckit (found in `.specify/` and `.claude/commands/`) for structured planning and specification management. Custom commands available:
- `/speckit.specify` - Create/update feature specifications
- `/speckit.plan` - Execute implementation planning
- `/speckit.tasks` - Generate actionable task lists
- `/speckit.implement` - Execute implementation plans

## Common Development Tasks

### Add a Blog Post
1. Create new `.mdx` file in `content/` directory
2. Add frontmatter with required fields (title, publishedAt, tags, published)
3. Write markdown/MDX content
4. Syntax highlighting handled automatically by blog pipeline

### Add a New UI Component
1. Create component in `components/ui/`
2. Use Radix UI as primitive base
3. Apply Tailwind CSS with CVA for variants
4. Export from `components/ui/index.ts` if creating library component
5. Components should be composable and accept standard HTML props

### Customize Theme
- Edit `tailwind.config.ts` for CSS variable values
- Theme variables are used in global styles
- next-themes handles switching between light/dark mode
- System preference detection automatic

### Modify MDX Processing
- Edit `lib/blog.ts` for pipeline changes
- Adjust `rehypePrettyCode` options for syntax highlighting
- Update `sanitizeSchema` to allow/restrict HTML elements or attributes
- Transformers (like copy button) added in rehypePrettyCode config

## Performance Considerations
- Images optimized via Next.js Image component and remote patterns
- Code splitting at route level
- MDX processing done at build time
- CSS-in-JS minimized; Tailwind for static styles
- Server components reduce JavaScript payload
