# Performance Documentation Guide

This directory contains performance metrics and evidence for the portfolio website.

---

## 📋 How to Generate Performance Evidence

### Step 1: Run Lighthouse Audits

#### Desktop Audit
1. Open **Chrome browser** (incognito mode recommended)
2. Navigate to https://marianholly.vercel.app
3. Open **DevTools** (F12 or right-click → Inspect)
4. Click on **Lighthouse** tab
5. **Configuration**:
   - Mode: Navigation
   - Device: **Desktop**
   - Categories: Check all (Performance, Accessibility, Best Practices, SEO)
6. Click **"Analyze page load"**
7. **Wait for results** (~30-60 seconds)
8. **Take screenshot** of all 4 scores
9. Save as `lighthouse-desktop.png` in this directory
10. **Fill in `lighthouse-scores.md`** with actual scores

#### Mobile Audit
1. Same steps as desktop, but select **Device: Mobile**
2. Save screenshot as `lighthouse-mobile.png`
3. Fill in mobile section of `lighthouse-scores.md`

---

### Step 2: Document Core Web Vitals

#### Using PageSpeed Insights (Recommended)
1. Go to https://pagespeed.web.dev/
2. Enter: `https://marianholly.vercel.app`
3. Click **"Analyze"**
4. **Wait for results**
5. Note the 3 Core Web Vitals scores:
   - **LCP** (Largest Contentful Paint)
   - **FID** (First Input Delay) or **INP** (Interaction to Next Paint)
   - **CLS** (Cumulative Layout Shift)
6. Fill in `core-web-vitals.md` with actual values

---

### Step 3: Generate Bundle Analysis

#### Run Bundle Analyzer
```bash
# Generate bundle analysis
pnpm analyze

# This will:
# 1. Build the Next.js app
# 2. Open interactive bundle visualization in browser
# 3. Show bundle sizes for all pages
```

#### What to Document
1. **Take screenshot** of the bundle visualization
2. Save as `bundle-analysis.png`
3. Note the sizes shown in terminal output:
   - Route sizes
   - First Load JS
   - Shared chunks
4. **Fill in `bundle-analysis.md`** with actual sizes

**Terminal output example:**
```
Route (app)                   Size     First Load JS
┌ ○ /                        12.1 kB         162 kB
├ ○ /blog                    4.12 kB         157 kB
└ ● /blog/[slug]             185 B          99.1 kB
```

---

## 📊 Filling in the Templates

### lighthouse-scores.md
- Replace `[DATE]` with current date
- Replace `[SCORE]` with actual scores (0-100)
- Replace `[VALUE]` with actual metric values
- Add any notes about improvements made

### core-web-vitals.md
- Replace `[DATE]` with current date
- Replace `[VALUE]` with actual measurements
- Replace `[PASS/NEEDS IMPROVEMENT/POOR]` with actual status:
  - **PASS**: Green (LCP <2.5s, FID <100ms, CLS <0.1)
  - **NEEDS IMPROVEMENT**: Orange
  - **POOR**: Red
- Add analysis notes

### bundle-analysis.md
- Replace `[DATE]` with current date
- Replace `[SIZE]` with actual KB values
- List largest dependencies from analyzer
- Note any optimization opportunities discovered

---

## ✅ Checklist

After completing all steps, you should have:

- [ ] `lighthouse-desktop.png` - Desktop audit screenshot
- [ ] `lighthouse-mobile.png` - Mobile audit screenshot
- [ ] `lighthouse-scores.md` - Filled with actual scores
- [ ] `core-web-vitals.md` - Filled with actual metrics
- [ ] `bundle-analysis.png` - Bundle visualization screenshot
- [ ] `bundle-analysis.md` - Filled with actual sizes

---

## 🎯 Expected Results

Your portfolio should achieve:
- **Performance**: 90+ (desktop), 80+ (mobile)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100
- **Bundle Size**: < 200 KB total, < 100 KB first load
- **Core Web Vitals**: All passing (green)

---

## 📝 Next Steps

After documenting performance:
1. Commit all files in this directory
2. Update main README.md with performance section
3. Reference these evidence files in README
