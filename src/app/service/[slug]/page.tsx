import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import ServiceDetailClient from './service-detail-client'
import { extractServiceModifier, getModifiedServiceTitle } from '@/seo/serviceModifiers'
import styles from './service-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

// Combine all service for lookup - handle mainServices differently since they have different structure
const allServices = [
  ...marketplaceServices, 
  ...websiteTypes, 
  ...digitalMarketingTypes,
  // Transform mainServices to match the expected structure
  ...mainServices.map(service => ({
    ...service,
    slug: service.path.replace('/service/', ''),
    details: {
      overview: service.description,
      benefits: service.features.map(feature => ({ title: feature, description: feature })),
      process: [],
      faq: [],
      pricing: []
    }
  }))
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const { modifier, serviceSlug } = extractServiceModifier(resolvedParams.slug)
  const service = allServices.find(s => s.slug === serviceSlug)

  if (!service) {
    return {
      title: 'Service Not Found - Ank Square',
      description: 'The service you are looking for could not be found.',
    }
  }

  const modifiedTitle = getModifiedServiceTitle(service.title, modifier)

  return {
    title: `${modifiedTitle} Services - Professional Solutions by Ank Square`,
    description: `Expert ${modifiedTitle} service for businesses. ${service.details.overview} Professional implementation with proven results.`,
    keywords: `${modifiedTitle}, ${modifiedTitle} service, e-commerce solutions, digital marketing, web development, Ank Square`,
    openGraph: {
      title: `${modifiedTitle} Services - Ank Square`,
      description: service.details.overview,
      url: `https://www.anksquare.in/service/${resolvedParams.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Ank Square`,
      description: service.details.overview,
    },
  }
}

export function generateStaticParams() {
  // Return empty array for dynamic rendering
  return []
}

export const dynamicParams = true

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const { modifier, serviceSlug } = extractServiceModifier(resolvedParams.slug)
  const service = allServices.find(s => s.slug === serviceSlug)

  if (!service) {
    notFound()
  }

  const modifiedTitle = getModifiedServiceTitle(service.title, modifier)

  // Create a serializable version of the service without functions
  const serializableService = {
    title: modifiedTitle,
    slug: service.slug,
    features: service.features,
    details: service.details
  }

  return <ServiceDetailClient service={serializableService} />
}