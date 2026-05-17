import { Metadata } from 'next'
import { contact } from '@/data/details'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Ank Square Digital Services',
  description: 'Read our terms and conditions for using Ank Square service. Understand your rights and responsibilities when working with our digital solutions.',
  keywords: 'terms and conditions, service agreement, Ank Square terms, legal terms, service policies',
  openGraph: {
    title: 'Terms & Conditions - Ank Square',
    description: 'Legal terms and conditions for Ank Square digital service and client agreements.',
    url: 'https://www.anksquare.in/terms-and-conditions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions - Ank Square',
    description: 'Review our terms and conditions for digital service.',
  },
}

export default function TermsAndConditionsPage() {
  const lastUpdated = 'March 7, 2026'

  return (
    <>


      <main id="main-content" role="main">

        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgba(33, 63, 97, 0.05), #ffffff)',
            padding: '4rem 1.5rem',
            textAlign: 'center'
          }}
          aria-labelledby="terms-title"
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1
              id="terms-title"
              style={{
                fontSize: '2.5rem',
                color: '#213f61',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}
            >
              Terms & Conditions
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}
            >
              Please read these terms and conditions carefully before using our service.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section
          style={{
            padding: '4rem 1.5rem',
            background: '#fff',
            maxWidth: '800px',
            margin: '0 auto'
          }}
          aria-labelledby="content-heading"
        >
          <h2 id="content-heading" className="sr-only">Terms & Conditions Content</h2>

          <div style={{ lineHeight: '1.8', color: '#333' }}>
            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Acceptance of Terms</h3>
            <p style={{ marginBottom: '2rem' }}>
              By accessing and using Ank Square's service, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Services</h3>
            <p style={{ marginBottom: '2rem' }}>
              Ank Square provides digital service including merchant account management, website development, and digital marketing. All service are subject to availability and our standard terms.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>3. User Responsibilities</h3>
            <p style={{ marginBottom: '2rem' }}>
              You agree to provide accurate information and cooperate with our team to ensure successful service delivery. You are responsible for maintaining the confidentiality of any account information.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Payment Terms</h3>
            <p style={{ marginBottom: '2rem' }}>
              Payment terms will be specified in individual service agreements. All fees are due as agreed upon commencement of service.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Intellectual Property</h3>
            <p style={{ marginBottom: '2rem' }}>
              All content, features, and functionality of our service are owned by Ank Square and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Limitation of Liability</h3>
            <p style={{ marginBottom: '2rem' }}>
              Ank Square shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our service.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>7. Termination</h3>
            <p style={{ marginBottom: '2rem' }}>
              Either party may terminate the service agreement with written notice. Upon termination, your right to use the service will cease immediately.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>8. Governing Law</h3>
            <p style={{ marginBottom: '2rem' }}>
              These terms and conditions are governed by and construed in accordance with the laws of India.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>9. Changes to Terms</h3>
            <p style={{ marginBottom: '2rem' }}>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>10. Contact Information</h3>
            <p style={{ marginBottom: '2rem' }}>
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div style={{ background: 'rgba(33, 63, 97, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Address:</strong> {contact.address.street}, {contact.address.city}, {contact.address.state}, {contact.address.country} - {contact.address.zipCode}</p>
            </div>
          </div>
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Terms & Conditions - Ank Square',
              description: 'Legal terms and conditions for Ank Square digital service',
              url: 'https://www.anksquare.in/terms-and-conditions',
              mainEntity: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://www.anksquare.in',
                contactPoint: {
                  '@type': 'ContactPoint',
                  email: contact.email,
                  telephone: contact.phone,
                  contactType: 'customer service'
                }
              }
            }),
          }}
        />
      </main>
    </>
  )
}