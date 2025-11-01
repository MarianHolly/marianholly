# Quick Commands Reference

**For when you're resuming development and need quick access to commands**

---

## 🚀 Quick Start (When Returning)

```bash
# 1. Navigate to project
cd C:\Users\maria\Documents\GitHub\marianholly

# 2. Check git status
git status

# 3. View what changed
git diff

# 4. Open in editor
code .

# 5. Read next phase
code DEVELOPMENT_CHECKPOINT.md
```

---

## 📦 Installation & Setup

```bash
# Install dependencies (if needed)
npm install
# or
pnpm install

# Update dependencies
npm update
# or
pnpm update
```

---

## 🧪 Development Commands

```bash
# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Start production server
npm run start
# or
pnpm start
```

---

## 🔍 Code Quality Commands

```bash
# Run ESLint (shows issues)
npm run lint
# or
pnpm lint

# Auto-fix ESLint issues
npm run lint -- --fix
# or
pnpm lint --fix

# Check TypeScript types
npx tsc --noEmit

# Combined check (lint + types)
npm run lint && npx tsc --noEmit
# or
pnpm lint && npx tsc --noEmit
```

---

## 🧪 Testing Commands (When Set Up)

```bash
# Run unit tests in watch mode
npm run test
# or
pnpm test

# Run tests once (CI mode)
npm run test:run
# or
pnpm test:run

# Run tests with UI
npm run test:ui
# or
pnpm test:ui

# Generate coverage report
npm run test:coverage
# or
pnpm test:coverage

# Run E2E tests
npm run test:e2e
# or
pnpm test:e2e
```

---

## 📝 Git Commands

### Check Status
```bash
git status
git log --oneline
git diff
git diff --staged
```

### Stage & Commit
```bash
# Stage all changes
git add .

# Stage specific file
git add path/to/file.ts

# Commit with message
git commit -m "refactor: [description]"

# Amend last commit (if not pushed)
git commit --amend
```

### Branches
```bash
# Current branch
git branch

# Switch branch
git checkout main
git checkout refactoring

# Create new branch
git checkout -b feature/name

# Delete branch
git branch -d branch-name
```

### Push & Pull
```bash
# Push to remote
git push origin refactoring

# Push with set upstream
git push -u origin refactoring

# Pull latest
git pull origin main

# Fetch without merging
git fetch origin
```

---

## 📂 File Navigation Commands

```bash
# List files in current directory
ls
# or (on Windows)
dir

# List all files including hidden
ls -la
# or
ls -a

# Navigate to directory
cd path/to/directory

# Go back one directory
cd ..

# Go to project root
cd C:\Users\maria\Documents\GitHub\marianholly

# Print current directory
pwd
```

---

## 🔧 Development File Locations

```bash
# View lib/constants.ts
code lib/constants.ts

# View ESLint config
code .eslintrc.json

# View main page
code app/page.tsx

# View article list
code components/article-list.tsx

# View article filter
code components/article-wrapper.tsx

# View utils
code lib/utils.ts
```

---

## 📚 Documentation Files

```bash
# Current checkpoint (START HERE)
code DEVELOPMENT_CHECKPOINT.md

# Quality improvements guide
code IMPLEMENTATION_QUALITY.md

# Testing guide
code IMPLEMENTATION_TESTING.md

# Quick start
code IMPLEMENTATION_QUICK_START.md

# Full analysis
code ANALYSIS.md

# Development guidelines
code CLAUDE.md
```

---

## 🎯 Common Workflows

### When Starting a New Phase

```bash
# 1. Check current state
git status

# 2. Read the phase documentation
code IMPLEMENTATION_QUALITY.md  # or IMPLEMENTATION_TESTING.md

# 3. Create the file mentioned
code lib/error-handler.ts  # or whatever you're creating

# 4. Copy code from documentation
# (Copy from the document into your file)

# 5. Check for errors
npm run lint
npx tsc --noEmit

# 6. Commit
git add .
git commit -m "refactor: [description of what you did]"
```

### When Fixing Issues

```bash
# 1. See what's wrong
npm run lint

# 2. Let ESLint fix it
npm run lint -- --fix

# 3. Fix remaining issues manually
code file-with-issues.ts

# 4. Check again
npm run lint
npx tsc --noEmit

# 5. Commit
git add .
git commit -m "fix: [what you fixed]"
```

### When Adding Tests

```bash
# 1. Create test file
code lib/__tests__/utils.test.ts

# 2. Copy test code from IMPLEMENTATION_TESTING.md
# (Paste test examples)

# 3. Run tests
npm run test -- lib/utils.test.ts

# 4. Fix failing tests
# (Update code or tests)

# 5. Check coverage
npm run test:coverage

# 6. Commit
git add .
git commit -m "test: add unit tests for [component]"
```

---

## 🐛 Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Next.js cache
rm -rf .next
npm run build

# Check Node version
node --version

# Check npm version
npm --version

# Check pnpm version
pnpm --version
```

---

## 📊 Useful Info Commands

```bash
# See available npm scripts
cat package.json | grep -A 20 '"scripts"'

# See installed dependencies
npm list

# See outdated packages
npm outdated

# See package info
npm info package-name

# Search npm registry
npm search search-term
```

---

## ⚡ Pro Tips

### Run Multiple Commands
```bash
# Run in sequence (stop if first fails)
npm run lint && npm run build && npm run test:run

# Run in sequence (continue even if fails)
npm run lint ; npm run build ; npm run test:run
```

### Run Commands in Background
```bash
# Start dev server in background (Windows)
start npm run dev

# Start dev server in background (Mac/Linux)
npm run dev &
```

### Save Time with Aliases

Add to your shell profile:
```bash
alias mdev="npm run dev"
alias mbuild="npm run build"
alias mlint="npm run lint"
alias mtest="npm run test"
alias mcheck="npm run lint && npx tsc --noEmit"
```

Then use:
```bash
mdev      # instead of npm run dev
mcheck    # instead of npm run lint && npx tsc --noEmit
```

---

## 📞 Command Help

```bash
# Help for npm
npm help

# Help for git
git --help

# Help for specific git command
git commit --help

# Help for specific npm command
npm install --help
```

---

## 🎯 Phase-Specific Commands

### Phase 1 (Setup) - DONE
```bash
npm run lint        # Check ESLint
npx tsc --noEmit   # Check types
git commit -m "refactor: add ESLint rules and constants"
```

### Phase 2 (Error Handling) - START HERE
```bash
code lib/error-handler.ts        # Create file
code lib/blog.ts                 # Edit file
npm run lint -- --fix            # Fix issues
npx tsc --noEmit                 # Check types
git commit -m "refactor: add error handling"
```

### Phase 3 (Utilities)
```bash
code lib/utils.ts                # Edit file
npm run lint -- --fix
npx tsc --noEmit
git commit -m "refactor: improve utility functions"
```

### Phase 4 (Validators)
```bash
code lib/validators.ts           # Create file
npm run lint -- --fix
npx tsc --noEmit
git commit -m "refactor: add input validation"
```

### Phase 5 (Error Boundary)
```bash
code components/error-boundary.tsx  # Create file
npm run lint -- --fix
npx tsc --noEmit
git commit -m "refactor: add error boundary"
```

### Phase 6 (Environment)
```bash
code .env.example                # Create file
npm run lint
npx tsc --noEmit
git commit -m "chore: add environment configuration"
```

---

## ✅ Pre-Push Checklist

Before pushing to GitHub:

```bash
# 1. Check status
git status

# 2. Review changes
git diff

# 3. Lint check
npm run lint

# 4. Type check
npx tsc --noEmit

# 5. Build check
npm run build

# 6. All good?
git push origin refactoring
```

Or run all at once:
```bash
npm run lint && npx tsc --noEmit && npm run build && git push origin refactoring
```

---

## 💾 Save This File

You're reading this right now, so good job! Bookmark or save:
- This file: `COMMANDS_REFERENCE.md`
- Development Checkpoint: `DEVELOPMENT_CHECKPOINT.md`
- Implementation Guide: `IMPLEMENTATION_QUALITY.md`

When you return, start with:
```bash
code DEVELOPMENT_CHECKPOINT.md
```

---

**Tip**: Print this page or save it to your notes for quick reference! 🚀
