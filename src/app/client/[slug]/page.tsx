import { Metadata } from 'next'
import ClientProjectView from '@/components/clientprojects/clientprojects'
import { clients } from '@/data/client'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const client = clients.find(c => c.slug === resolvedParams.slug)

  if (!client) {
    return {
      title: 'Project Not Found - Ank Square',
      description: 'The project you are looking for could not be found.',
    }
  }

  return {
    title: `${client.name} - Client Project by Ank Square`,
    description: `Explore the ${client.project} project completed by Ank Square. ${client.testimonial}`,
    keywords: `${client.name}, ${client.project}, case study, project portfolio, web design, digital service`,
    openGraph: {
      title: `${client.name} - Ank Square Project`,
      description: client.testimonial,
      url: `https://www.anksquare.in/client/${client.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${client.name} - Ank Square`,
      description: client.testimonial,
    },
  }
}

export function generateStaticParams() {
  // Return empty - all client project pages will be dynamic
  return []
}

export const dynamicParams = true

export default async function ClientProjectPage({ params }: Props) {
  const resolvedParams = await params
  return (
    <>

      <main id="main-content" role="main">
        <ClientProjectView slug={resolvedParams.slug} />

        {/* Structured Data for Project */}
        {(() => {
          const client = clients.find(c => c.slug === resolvedParams.slug)
          if (!client) return null

          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'CreativeWork',
                  name: `${client.name} - ${client.project}`,
                  description: client.testimonial,
                  url: `https://www.anksquare.in/client/${client.slug}`,
                  creator: {
                    '@type': 'Organization',
                    name: 'Ank Square',
                    url: 'https://www.anksquare.in'
                  },
                  image: `https://www.anksquare.in/assets/client${client.logo}`,
                  client: {
                    '@type': 'Organization',
                    name: client.name
                  }
                }),
              }}
            />
          )
        })()}
      </main>
    </>
  )
}