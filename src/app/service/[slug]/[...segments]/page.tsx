import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  marketplaceServices,
  websiteTypes,
  digitalMarketingTypes,
  mainServices
} from '@/data/service'

import CityServiceClient from './city-service-client'

import { getCityFromPath } from '../../../../seo/cities'

import {
  extractServiceModifier,
  getModifiedServiceTitle,
  getModifiedServiceDescription
} from '@/seo/serviceModifiers'

interface Props {
  params: {
    slug: string
    segments: string[]
  }
}

// Combine all services for lookup
const allServices = [
  ...marketplaceServices,
  ...websiteTypes,
  ...digitalMarketingTypes,
  ...mainServices.map(service => ({
    ...service,
    slug: service.path.replace('/service/', ''),
    details: {
      overview: service.description,
      benefits: service.features.map(feature => ({
        title: feature,
        description: feature
      })),
      process: [],
      faq: [],
      pricing: []
    }
  }))
]

// India-only services - these services can only be accessed from India
// Full service slugs that are restricted to India only
const indiaOnlyServices = [
  'flipkart-account-management',
  'blinkit-account-management',
  'myntra-account-management',
  'ajio-account-management',
  'jiomart-account-management',
  'meesho-account-management',
  'nykaa-account-management'
]

// Helper function
function isRestrictedOutsideIndia(
  serviceSlug: string,
  city: {
    country: string
  } | null
) {
  return (
    indiaOnlyServices.includes(serviceSlug) &&
    city &&
    city.country.toLowerCase() !== 'india'
  )
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const resolvedParams = await params

  const { modifier, serviceSlug } = extractServiceModifier(
    resolvedParams.slug
  )

  const service = allServices.find(s => s.slug === serviceSlug)

  const cityPath = resolvedParams.segments.join('/')

  const city = cityPath
    ? getCityFromPath(cityPath)
    : null

  // Service not found
  if (!service) {
    return {
      title: 'Service Not Found - Ank Square',
      description:
        'The service you are looking for could not be found.'
    }
  }

  // Restrict India-only services
  if (isRestrictedOutsideIndia(serviceSlug, city)) {
    return {
      title: 'Page Not Found',
      description: 'This page does not exist.'
    }
  }

  const modifiedTitle = getModifiedServiceTitle(
    service.title,
    modifier
  )

  // City-based SEO
  if (city) {
    const title = `${modifiedTitle} Services in ${city.name}, ${city.state}, ${city.country} | Ank Square`

    const description =
      getModifiedServiceDescription(
        `Expert ${service.title} service in ${city.name}, ${city.state}, ${city.country}. Professional implementation with proven results. Trusted by local businesses.`,
        modifier,
        city.name
      )

    return {
      title,

      description,

      keywords: `
        ${modifiedTitle} in ${city.name},
        ${modifiedTitle} ${city.name},
        ${modifiedTitle} services ${city.state},
        ${modifiedTitle} in ${city.country},
        local ${modifiedTitle}
      `,

      openGraph: {
        title,
        description,
        url: `https://www.anksquare.in/service/${resolvedParams.slug}/${resolvedParams.segments.join('/')}`,
        type: 'website'
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description
      }
    }
  }

  // Without city
  const title = `${modifiedTitle} - Professional Services | Ank Square`

  const description = `
    ${modifiedTitle}.
    Professional implementation with proven results.
    Trusted by local businesses worldwide.
  `

  return {
    title,

    description,

    keywords: `
      ${modifiedTitle},
      professional services,
      business solutions
    `,

    openGraph: {
      title,
      description,
      url: `https://www.anksquare.in/service/${resolvedParams.slug}`,
      type: 'website'
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}

export function generateStaticParams() {
  // Dynamic city pages
  return []
}

export const dynamicParams = true

export default async function CityServicePage({
  params
}: Props) {
  const resolvedParams = await params

  const { modifier, serviceSlug } = extractServiceModifier(
    resolvedParams.slug
  )

  const service = allServices.find(
    s => s.slug === serviceSlug
  )

  const cityPath = resolvedParams.segments.join('/')

  const city = cityPath
    ? getCityFromPath(cityPath)
    : null

  // Service not found
  if (!service) {
    notFound()
  }

  // Restrict India-only services
  if (isRestrictedOutsideIndia(serviceSlug, city)) {
    notFound()
  }

  const modifiedTitle = getModifiedServiceTitle(
    service.title,
    modifier
  )

  // Serializable service object
  const serializableService = {
    title: modifiedTitle,
    slug: service.slug,
    features: service.features,
    details: service.details
  }

  // Serializable city object
  const serializableCity = city
    ? {
      name: city.name,
      state: city.state,
      country: city.country
    }
    : null

  return (
    <CityServiceClient
      service={serializableService}
      city={serializableCity}
      citySlug={resolvedParams.segments.join('/')}
    />
  )
}

