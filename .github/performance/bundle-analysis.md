# Bundle Analysis

**Site**: https://marianholly.vercel.app
**Last Updated**: [DATE]
**Tool**: @next/bundle-analyzer

---

## Bundle Size Summary

### Total JavaScript

| Metric | Size | Status |
|--------|------|--------|
| **Total JS** | [SIZE] KB | Target: < 200 KB |
| **First Load JS** | [SIZE] KB | Target: < 100 KB |
| **Gzipped** | [SIZE] KB | Compressed size |

---

## Page-by-Page Breakdown

### Homepage (/)
| Resource | Size | First Load JS |
|----------|------|---------------|
| Page bundle | [SIZE] KB | [SIZE] KB |
| Shared chunks | [SIZE] KB | - |
| **Total** | **[SIZE] KB** | **[SIZE] KB** |

### Blog Listing (/blog)
| Resource | Size | First Load JS |
|----------|------|---------------|
| Page bundle | [SIZE] KB | [SIZE] KB |
| Shared chunks | [SIZE] KB | - |
| **Total** | **[SIZE] KB** | **[SIZE] KB** |

### Blog Post (/blog/[slug])
| Resource | Size | First Load JS |
|----------|------|---------------|
| Page bundle | [SIZE] KB | [SIZE] KB |
| Shared chunks | [SIZE] KB | - |
| **Total** | **[SIZE] KB** | **[SIZE] KB** |

---

## Largest Dependencies

| Package | Size | Purpose |
|---------|------|---------|
| next | [SIZE] KB | Framework |
| react/react-dom | [SIZE] KB | UI library |
| framer-motion | [SIZE] KB | Animations |
| @radix-ui/* | [SIZE] KB | UI components |
| [OTHER] | [SIZE] KB | [Purpose] |

---

## Shared Chunks

| Chunk | Size | Used By |
|-------|------|---------|
| framework | [SIZE] KB | All pages |
| main | [SIZE] KB | All pages |
| [chunk-id] | [SIZE] KB | [Pages] |

---

## Optimization Opportunities

### Already Implemented
- ✅ Code splitting at route level
- ✅ Dynamic imports for heavy components
- ✅ Tree shaking enabled
- ✅ Minification enabled

### Future Improvements
- [ ] [Potential optimization 1]
- [ ] [Potential optimization 2]
- [ ] [Potential optimization 3]

---

## Comparison to Targets

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| First Load JS | [SIZE] KB | < 100 KB | ✅/⚠️/❌ |
| Total Bundle | [SIZE] KB | < 200 KB | ✅/⚠️/❌ |
| Largest Page | [SIZE] KB | < 150 KB | ✅/⚠️/❌ |

---

## Evidence

Screenshot: `bundle-analysis.png`

To regenerate this analysis:
```bash
ANALYZE=true pnpm build
```
