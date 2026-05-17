import { Metadata } from 'next'
import Contact from '@/components/contact/contact'

export const metadata: Metadata = {
  title: 'Contact Ank Square - Get Your Digital Services Quote Today',
  description: 'Ready to grow your business? Contact Ank Square for expert merchant account management, website development, and digital marketing service. Call us or fill the contact form.',
  keywords: 'contact Ank Square, digital service quote, business consultation, merchant account help, website development inquiry',
  openGraph: {
    title: 'Contact Ank Square - Digital Services Support',
    description: 'Get in touch with our team for digital solutions. Quick response time and personalized service.',
    url: 'https://www.anksquare.in/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Ank Square',
    description: 'Reach out to Ank Square for digital service consultation and support.',
  },
}

export default function ContactPage() {
  return (
    <>
      
      <main id="main-content" role="main">

        {/* Contact Component */}
        <Contact />

        {/* Structured Data for Contact Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Ank Square - Contact Us',
              description: 'Contact form and information for Ank Square digital service company',
              url: 'https://www.anksquare.in/contact',
              mainEntity: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://www.anksquare.in',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-9939337638',
                  contactType: 'customer service',
                  email: 'contact@anksquare.com',
                  availableLanguage: 'English'
                },
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ank Square Pvt. Ltd., Ramjaipal Road, Opp. Gola Road, Near Hotel Magadh Palace',
                  addressLocality: 'Patna',
                  addressRegion: 'Bihar',
                  postalCode: '801503',
                  addressCountry: 'IN'
                }
              }
            }),
          }}
        />
      </main>
    </>
  )
}
