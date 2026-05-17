import { Metadata } from 'next'
import Clients from '@/components/clients/clients'

export const metadata: Metadata = {
  title: 'Our Clients - Successful Projects by Ank Square',
  description: 'Discover the diverse portfolio of clients we have worked with. From startups to established businesses, see how Ank Square delivered exceptional digital solutions.',
  keywords: 'client portfolio, case studies, successful projects, business solutions, Ank Square clients, design portfolio, web development projects',
  openGraph: {
    title: 'Our Clients - Ank Square Portfolio',
    description: 'Explore our client success stories and completed projects. See the impact of our digital service.',
    url: 'https://www.anksquare.in/client',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Clients - Ank Square',
    description: 'Browse our successful client projects and portfolio work.',
  },
}

export default function ClientsPage() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* Clients Component */}
        <Clients isSlider={false} />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Ank Square Clients',
              description: 'Portfolio of successful projects and clients served by Ank Square',
              url: 'https://www.anksquare.in/client',
              mainEntity: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://www.anksquare.in',
                description: 'Digital service company providing merchant account management, website development, and digital marketing solutions',
                logo: 'https://www.anksquare.in/logo.svg'
              }
            }),
          }}
        />
      </main>
    </>
  )
}