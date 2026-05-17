# Multiple Sitemaps Implementation Guide

## Overview

Your website has been converted from a single sitemap to a multi-sitemap structure that supports unlimited URLs (up to 50,000 per sitemap). This addresses the XML sitemap size limitations and improves SEO by allowing search engines to efficiently crawl all your content.

## Implementation Details

### Architecture

```
/src/lib/sitemap-utils.ts              - Utility functions for generating and chunking URLs
/src/app/sitemap.xml/route.ts          - Sitemap index (backward compatible with /sitemap.xml)
/src/app/sitemap-index/route.ts        - Alternative sitemap index endpoint
/src/app/sitemap-[id]/route.ts         - Individual sitemap routes
/src/app/[[...sitemap]]/route.ts       - Catch-all dynamic route for flexible URL matching
/public/robots.txt                     - Updated to point to new sitemap endpoints
/src/app/sitemap.ts                    - Deprecated (references new implementation)
```

### Available Endpoints

1. **Sitemap Index (Primary)**
   - `https://www.anksquare.in/sitemap.xml` - Returns XML sitemap index
   - `https://www.anksquare.in/sitemap-index` - Alternative sitemap index endpoint

2. **Individual Sitemaps**
   - `https://www.anksquare.in/sitemap-1.xml` - First chunk of URLs (up to 50,000)
   - `https://www.anksquare.in/sitemap-2.xml` - Second chunk of URLs (up to 50,000)
   - `https://www.anksquare.in/sitemap-N.xml` - Nth chunk of URLs (dynamically generated)

### Sitemap Structure

Each sitemap includes:
- **Static Pages** (7 URLs)
  - Home page
  - About
  - Services
  - Contact
  - Testimonial
  - Privacy Policy
  - Terms and Conditions

- **Service Pages** (~17 URLs)
  - Individual service pages for each marketplace and website type

- **City Service Pages** (~34,000+ URLs)
  - City-specific pages for each service (e.g., `/service/amazon-account-management/delhi`)
  - Generated for all services except merchant-management and web-development
  - Covers all 2,000+ cities in your database

- **Client Project Pages** (4 URLs)
  - Individual client showcase pages

- **Blog Pages** (Variable)
  - Individual blog post pages

### Key Features

✅ **Unlimited URLs** - Supports any number of URLs by splitting into chunks  
✅ **Automatic Chunking** - URLs are automatically distributed across multiple sitemaps  
✅ **SEO Optimized** - Includes priority and change frequency metadata  
✅ **Caching** - HTTP caching configured for performance  
✅ **Backward Compatible** - Old `/sitemap.xml` endpoint still works  
✅ **Dynamic Generation** - Sitemaps are generated on-the-fly from your data  

### URL Tracking

**Total URLs:** Based on your current data:
- Static pages: 7
- Service pages: ~17
- City service pages: ~34,000+ (varies based on services with city pages)
- Client pages: 4
- Blog pages: (depends on number of blog posts)

**Total: ~34,000+ URLs** (split across multiple sitemaps)

## Utility Functions

### `generateAllSitemapUrls()`
Generates all sitemap URLs from your site data.

```typescript
const allUrls = generateAllSitemapUrls()
console.log(`Total URLs: ${allUrls.length}`)
```

### `chunkSitemapUrls(urls, chunkSize)`
Splits URLs into chunks (default 50,000 per chunk).

```typescript
const chunks = chunkSitemapUrls(allUrls)
console.log(`Number of sitemaps needed: ${chunks.length}`)
```

### `getNumberOfSitemapChunks()`
Returns the number of sitemap files needed.

```typescript
const count = getNumberOfSitemapChunks()
console.log(`Sitemaps: ${count}`)
```

### `getSitemapChunk(chunkIndex)`
Gets URLs for a specific sitemap (1-based index).

```typescript
const chunk1Urls = getSitemapChunk(1)
const chunk2Urls = getSitemapChunk(2)
```

## Deployment Instructions

### 1. Push Changes to Production
```bash
git add .
git commit -m "feat: Implement multi-sitemap structure for scalable SEO"
git push
```

### 2. Update Search Console

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Select your property (anksquare.com)
3. Navigate to Sitemaps section
4. Remove old `/sitemap.xml` if previously submitted
5. Submit new sitemaps:
   - `https://www.anksquare.in/sitemap.xml` (sitemap index)
   - OR submit individual sitemaps: `https://www.anksquare.in/sitemap-1.xml`, etc.

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmaster
2. Select your site
3. Go to Sitemaps section
4. Add sitemap: `https://www.anksquare.in/sitemap.xml`

### 3. Verify Robots.txt
The robots.txt has been updated with:
```
Sitemap: https://www.anksquare.in/sitemap-index
```

## Testing

### Test Sitemap Endpoints

```bash
# Test sitemap index
curl -I https://www.anksquare.in/sitemap.xml

# Test first sitemap
curl -I https://www.anksquare.in/sitemap-1.xml

# Test second sitemap
curl -I https://www.anksquare.in/sitemap-2.xml

# Verify sitemap validity
# Use: https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

### Local Testing

```typescript
// Test in your app
import { getNumberOfSitemapChunks, getSitemapChunk } from '@/lib/sitemap-utils'

const chunks = getNumberOfSitemapChunks()
console.log(`Total sitemaps: ${chunks}`)

const chunk1 = getSitemapChunk(1)
console.log(`Chunk 1 URLs: ${chunk1.length}`)
```

## Monitoring

### Performance Metrics to Track
- Sitemap crawl frequency in Search Console
- URLs indexed from each sitemap
- Crawl errors related to sitemap
- Page discovery rate

### Cache Strategy
Each sitemap has:
- `s-maxage=3600` - 1 hour CDN cache
- `stale-while-revalidate=86400` - 24 hour stale cache

## Maintenance

### Adding New Cities
The sitemap will automatically include new cities added to your `cities` data file.

### Adding New Services
New services will automatically be included in the next sitemap generation.

### Monitoring Sitemap Size
Run this to check current sitemap statistics:

```typescript
import { getNumberOfSitemapChunks, generateAllSitemapUrls } from '@/lib/sitemap-utils'

const allUrls = generateAllSitemapUrls()
const chunks = getNumberOfSitemapChunks()

console.log(`Total URLs: ${allUrls.length}`)
console.log(`Number of sitemaps: ${chunks}`)
console.log(`URLs per sitemap: ${Math.ceil(allUrls.length / chunks)}`)
```

## Troubleshooting

### Sitemap Not Found (404)
- Verify the endpoint URL is correct
- Check that Next.js is running
- Clear browser cache
- Restart the development/production server

### Search Console Not Finding Sitemaps
- Wait 24-48 hours for indexing
- Ensure robots.txt is accessible
- Verify sitemap XML is valid using validator
- Check for SSL/HTTPS errors

### Too Many URLs Still
- Modify `chunkSize` parameter in `sitemap-utils.ts` from 50,000 to a lower value
- Split services into separate sitemaps using the same approach

## Migration Notes

- **Old sitemap.ts file**: No longer actively used but kept for reference
- **robots.txt**: Updated to point to new sitemap endpoints
- **Backward Compatibility**: Old `/sitemap.xml` endpoint still provides sitemap index
- **No Breaking Changes**: All existing functionality preserved

## Next Steps

1. ✅ Test all sitemap endpoints locally
2. ✅ Deploy to production
3. ✅ Submit to Google Search Console
4. ✅ Monitor Search Console for indexing
5. ✅ Wait 2-4 weeks for full indexing
6. ✅ Verify crawl statistics in Search Console

---

## File Locations Summary

| File | Purpose |
|------|---------|
| `src/lib/sitemap-utils.ts` | Core utility functions |
| `src/app/sitemap.xml/route.ts` | Backward-compatible index |
| `src/app/sitemap-index/route.ts` | Primary index endpoint |
| `src/app/sitemap-[id]/route.ts` | Individual sitemap template |
| `src/app/[[...sitemap]]/route.ts` | Flexible dynamic routing |
| `public/robots.txt` | Updated robots file |
| `src/app/sitemap.ts` | Deprecated reference |

---

**Last Updated:** April 2026  
**Implementation:** Multi-Sitemap Structure  
**URL Capacity:** Unlimited (50,000 per sitemap)
