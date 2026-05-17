import { getSitemapChunk, getNumberOfSitemapChunks } from '@/lib/sitemap-utils'

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ segments: string[] }> }
) {
  try {
    // Resolve params
    const resolvedParams = await params
    const { segments } = resolvedParams

    // Expect format like ['1.xml'], ['2.xml'], etc.
    if (!segments || segments.length !== 1) {
      return new Response('Not Found', { status: 404 })
    }

    const segment = segments[0]
    const match = segment.match(/^(\d+)\.xml$/)
    
    if (!match) {
      return new Response('Not Found', { status: 404 })
    }

    const sitemapId = parseInt(match[1], 10)

    // Validate the sitemap ID
    if (isNaN(sitemapId) || sitemapId < 1) {
      return new Response('Not Found', { status: 404 })
    }

    // Check if sitemap exists
    const chunkCount = getNumberOfSitemapChunks(50000)
    if (sitemapId > chunkCount) {
      return new Response('Not Found', { status: 404 })
    }

    // Get the sitemap chunk
    const urls = getSitemapChunk(sitemapId, 50000)

    // If no URLs found for this chunk, return 404
    if (urls.length === 0) {
      return new Response('Not Found', { status: 404 })
    }

    // Convert to XML format with proper escaping
    const urlEntries = urls.map(url => `  <url>
    <loc>${escapeXml(url.url)}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap chunk:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}