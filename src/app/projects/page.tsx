import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Our Projects & Services - Ank Square',
  description: 'Explore Ank Square\'s comprehensive portfolio of digital services including merchant account management, website development, digital marketing, and marketplace optimization for Amazon, Flipkart, and more.',
  keywords: [
    'projects portfolio',
    'digital services',
    'merchant account management',
    'website development',
    'digital marketing',
    'marketplace services',
    'Amazon management',
    'Flipkart management',
    'e-commerce solutions'
  ],
  openGraph: {
    title: 'Our Projects & Services - Ank Square',
    description: 'Discover our expertise in digital transformation, marketplace management, and custom development solutions.',
    url: 'https://www.anksquare.in/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects & Services - Ank Square',
    description: 'Explore our comprehensive digital services portfolio and marketplace management expertise.',
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}