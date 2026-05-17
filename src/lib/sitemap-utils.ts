import { MetadataRoute } from 'next'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { cities, getCitySlug } from '@/data/cities'
import { blogPosts } from '@/data/blog'

export interface SitemapUrl {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate all sitemap URLs for the website
 */
export function generateAllSitemapUrls(): SitemapUrl[] {
  const baseUrl = 'https://www.anksquare.in'

  // Static pages
  const staticPages: SitemapUrl[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Service pages
  const servicePages: SitemapUrl[] = [
    ...marketplaceServices,
    ...websiteTypes,
    ...digitalMarketingTypes,
    ...mainServices.map(service => ({
      ...service,
      slug: service.path.replace('/service/', ''),
    }))
  ].map(service => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // City service pages
  const cityServicePages: SitemapUrl[] = []

  // Services that have city pages: all except merchant-management and web-development
  const servicesWithCityPages = [
    ...marketplaceServices,
    ...websiteTypes,
    ...digitalMarketingTypes,
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing'
    }
  ]

  // Generate city pages for each service
  servicesWithCityPages.forEach(service => {
    cities.forEach(city => {
      const citySlug = getCitySlug(city.name)
      cityServicePages.push({
        url: `${baseUrl}/service/${service.slug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  // Client project pages
  const clientPages: SitemapUrl[] = [
    'sharma-interiors',
    'sah-constructions',
    'achintya-enterprises',
    'sl-engineerings'
  ].map(client => ({
    url: `${baseUrl}/client/${client}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Blog pages
  const blogPages: SitemapUrl[] = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...cityServicePages,
    ...clientPages,
    ...blogPages,
  ]
}

/**
 * Split URLs into chunks for multiple sitemaps
 * Each sitemap can have up to 50,000 URLs
 */
export function chunkSitemapUrls(urls: SitemapUrl[], chunkSize: number = 50000): SitemapUrl[][] {
  const chunks: SitemapUrl[][] = []
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize))
  }
  return chunks
}

/**
 * Get the number of sitemap chunks needed
 */
export function getNumberOfSitemapChunks(): number {
  const allUrls = generateAllSitemapUrls()
  const chunks = chunkSitemapUrls(allUrls)
  return chunks.length
}

/**
 * Get a specific chunk of URLs by index (1-based)
 */
export function getSitemapChunk(chunkIndex: number): SitemapUrl[] {
  const allUrls = generateAllSitemapUrls()
  const chunks = chunkSitemapUrls(allUrls)
  
  if (chunkIndex < 1 || chunkIndex > chunks.length) {
    return []
  }
  
  return chunks[chunkIndex - 1]
}

/**
 * Convert SitemapUrl to MetadataRoute.Sitemap format
 */
export function convertToMetadataRoute(urls: SitemapUrl[]): MetadataRoute.Sitemap {
  return urls.map(url => ({
    url: url.url,
    lastModified: url.lastModified,
    changeFrequency: url.changeFrequency,
    priority: url.priority,
  }))
}
