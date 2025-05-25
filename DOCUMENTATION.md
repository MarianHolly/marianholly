# Portfolio Website - Technical Documentation

## 🚀 Project Overview

A modern, performant portfolio website built with Next.js 14 and TypeScript, showcasing advanced React patterns, component architecture, and full-stack development capabilities.

**Live Demo:** [https://marianholly.vercel.app](https://marianholly.vercel.app)

## 🛠 Technology Stack

### Core Technologies
- **Next.js 14.2.15** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **React 18** - UI library with modern features
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Key Libraries & Tools
- **Framer Motion 11** - Advanced animations and gestures
- **Radix UI** - Accessible, unstyled UI components
- **MDX** - Markdown with JSX for blog content
- **shadcn/ui** - Re-usable component library
- **next-themes** - Theme management with dark mode

## 📁 Project Architecture

```
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── blog/               
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/         # Dynamic blog routes
│   └── globals.css         # Global styles with Tailwind
│
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx      # Typed, variant-based buttons
│   │   ├── card.tsx        # Composable card components
│   │   └── ...             # 30+ custom UI components
│   ├── mdx.tsx             # MDX component mappings
│   └── ...                 # Feature components
│
├── lib/                     # Utilities and helpers
│   ├── blog.ts             # Blog post processing
│   ├── utils.ts            # Common utilities
│   └── types.ts            # TypeScript definitions
│
└── content/                # MDX blog content
```

## 💡 Key Implementation Patterns

### 1. **Type-Safe Development**
```typescript
// Strong typing throughout the application
export interface ArticleMetadata {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary?: string;
  tags: string[];
  published: boolean;
}

// Type guards for runtime safety
export function isFullArticle(article: Article): article is FullArticle {
  return typeof article.source === 'string';
}
```

### 2. **Server/Client Component Architecture**
- Strategic use of `"use client"` directive
- Server Components for static content (SEO benefits)
- Client Components for interactive features
- Optimized bundle splitting

### 3. **Advanced Animation Patterns**
```typescript
// Staggered animations with Framer Motion
<BlurFade delay={BLUR_FADE_DELAY * index}>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 260 }}
  />
</BlurFade>
```

### 4. **Component Composition**
```typescript
// Flexible, composable components using CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        // ...
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        // ...
      }
    }
  }
)
```

### 5. **MDX Blog Implementation**
- Custom unified pipeline for MDX processing
- Syntax highlighting with rehype-pretty-code
- Sanitization for security
- Dynamic imports for optimal performance

### 6. **Performance Optimizations**
- Image optimization with Next.js Image
- Lazy loading for heavy components
- Code splitting at route level
- Efficient bundle size management

## 🎯 Notable Features

### Dynamic Theme System
- Seamless dark/light mode switching
- System preference detection
- CSS variables for consistent theming
- No flash on initial load

### Responsive Design
- Mobile-first approach
- Tailwind's responsive utilities
- Adaptive layouts for all screen sizes

### SEO & Accessibility
- Dynamic metadata generation
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support

### Blog System
- MDX support with custom components
- Syntax highlighting for code blocks
- Reading time calculation
- Tag-based filtering
- Published/draft states

## 🔧 Development Practices

### Code Quality
- ESLint configuration for consistent code style
- TypeScript strict mode enabled
- Component-based file structure
- Clear separation of concerns

### State Management
- React hooks for local state
- Context API for theme management
- URL state for filters and navigation

### Error Handling
- Graceful fallbacks for missing content
- Type-safe error boundaries
- User-friendly error messages

## 🚀 Performance Metrics

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Bundle Size:** Optimized with tree-shaking

## 📈 Scalability Considerations

1. **Component Library:** All UI components are built to be reusable across projects
2. **Type System:** Comprehensive TypeScript coverage ensures maintainability
3. **Content Management:** MDX allows for easy content updates without code changes
4. **Deployment:** Vercel integration for automatic deployments and previews

## 🔍 Code Examples

### Custom Hook Pattern
```typescript
export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
```

### Server Component Data Fetching
```typescript
export async function getBlogPosts(): Promise<Article[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return await getPost(slug);
    })
  );
}
```

## 🎨 Design System

- **Color Palette:** CSS variables for consistent theming
- **Typography:** System font stack with fallbacks
- **Spacing:** Tailwind's spacing scale
- **Components:** 30+ custom UI components
- **Animations:** Consistent motion principles

## 📝 Testing Approach

While formal tests aren't included in this portfolio project, the codebase demonstrates testable patterns:
- Pure functions for utilities
- Isolated component logic
- Clear props interfaces
- Separation of concerns

## 🚧 Future Enhancements

- Internationalization (i18n) support
- CMS integration for easier content management
- Advanced search functionality
- Analytics integration
- Performance monitoring

## 👨‍💻 Developer Experience

- Hot Module Replacement for rapid development
- TypeScript for IDE intelligence
- Consistent code formatting
- Clear file naming conventions
- Comprehensive type definitions

---

This portfolio demonstrates proficiency in modern web development practices, from architectural decisions to implementation details, showcasing readiness for professional development roles.