import { getNumberOfSitemapChunks, generateAllSitemapUrls, chunkSitemapUrls } from '@/lib/sitemap-utils'

/**
 * Main sitemap endpoint - returns all URLs in single or multiple sitemaps
 * If URLs exceed 50,000, returns a sitemap index
 */
export async function GET(request: Request) {
  try {
    const allUrls = generateAllSitemapUrls()
    const chunks = chunkSitemapUrls(allUrls)
    
    // If only one chunk, return all URLs directly
    if (chunks.length === 1) {
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks[0].map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

      return new Response(sitemapXml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      })
    }
    
    // If multiple chunks, return sitemap index
    const baseUrl = 'https://www.anksquare.in'
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: chunks.length }, (_, index) => `  <sitemap>
    <loc>${baseUrl}/sitemap/${index + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

    return new Response(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
