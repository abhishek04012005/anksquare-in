// Quick test file to verify sitemap generation works
import { 
  generateAllSitemapUrls, 
  chunkSitemapUrls, 
  getNumberOfSitemapChunks,
  getSitemapChunk 
} from '@/lib/sitemap-utils'

async function testSitemaps() {
  console.log('Testing Sitemap Generation:\n')
  
  const allUrls = generateAllSitemapUrls()
  console.log(`✅ Total URLs generated: ${allUrls.length}`)
  
  const numberOfChunks = getNumberOfSitemapChunks()
  console.log(`✅ Number of sitemaps needed: ${numberOfChunks}`)
  
  // Test getting specific chunks
  for (let i = 1; i <= numberOfChunks; i++) {
    const chunk = getSitemapChunk(i)
    console.log(`✅ Sitemap ${i}: ${chunk.length} URLs`)
  }
  
  // Sample URLs from first sitemap
  const firstChunk = getSitemapChunk(1)
  console.log(`\n📝 Sample URLs from Sitemap 1:`)
  firstChunk.slice(0, 5).forEach((url, index) => {
    console.log(`  ${index + 1}. ${url.url}`)
  })
  
  console.log(`\n✨ Sitemaps are ready to be served at:`)
  console.log(`   - https://www.anksquare.in/sitemap.xml (index)`)
  for (let i = 1; i <= numberOfChunks; i++) {
    console.log(`   - https://www.anksquare.in/sitemap-${i}.xml`)
  }
}

// Note: This test file is for documentation purposes
// In a real Next.js app, these functions are used in the route handlers
export { testSitemaps }
