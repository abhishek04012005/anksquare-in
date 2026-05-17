import { getNumberOfSitemapChunks, generateSitemapUrlsGenerator } from '@/lib/sitemap-utils'

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str.replace(/[<>&'"]/g, char => {
    switch (char) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return char
    }
  })
}

/**
 * Main sitemap endpoint - returns all URLs in single or multiple sitemaps
 * If URLs exceed 50,000, returns a sitemap index
 */
export async function GET(request: Request) {
  try {
    const chunkCount = getNumberOfSitemapChunks(50000)
    
    // If only one chunk, return all URLs directly
    if (chunkCount === 1) {
      const urlEntries: string[] = []
      
      for (const url of generateSitemapUrlsGenerator()) {
        urlEntries.push(`  <url>
    <loc>${escapeXml(url.url)}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`)
      }

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
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
    const sitemapIndexEntries: string[] = []
    
    for (let i = 1; i <= chunkCount; i++) {
      sitemapIndexEntries.push(`  <sitemap>
    <loc>${baseUrl}/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`)
    }
    
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries.join('\n')}
</sitemapindex>`

    return new Response(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
