import { Metadata } from 'next'
import { contact } from '@/data/details'

export const metadata: Metadata = {
  title: 'Privacy Policy - Ank Square Digital Services',
  description: 'Learn how Ank Square protects your privacy and handles your personal information. Our comprehensive privacy policy covers data collection, usage, and protection practices.',
  keywords: 'privacy policy, data protection, Ank Square privacy, personal information, data security, privacy rights',
  openGraph: {
    title: 'Privacy Policy - Ank Square',
    description: 'Your privacy matters to us. Read our privacy policy to understand how we protect your data.',
    url: 'https://www.anksquare.in/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Ank Square',
    description: 'Learn about our privacy practices and data protection measures.',
  },
}

export default function PrivacyPolicyPage() {
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
          aria-labelledby="privacy-title"
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1
              id="privacy-title"
              style={{
                fontSize: '2.5rem',
                color: '#213f61',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
          <h2 id="content-heading" className="sr-only">Privacy Policy Content</h2>

          <div style={{ lineHeight: '1.8', color: '#333' }}>
            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Information We Collect</h3>
            <p style={{ marginBottom: '2rem' }}>
              We collect information you provide directly to us, such as when you contact us, subscribe to our service, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>2. How We Use Your Information</h3>
            <p style={{ marginBottom: '2rem' }}>
              We use the information we collect to provide, maintain, and improve our service, communicate with you, and comply with legal obligations. We may also use your information to send you updates about our service and respond to your inquiries.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Information Sharing</h3>
            <p style={{ marginBottom: '2rem' }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Data Security</h3>
            <p style={{ marginBottom: '2rem' }}>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Your Rights</h3>
            <p style={{ marginBottom: '2rem' }}>
              You have the right to access, update, or delete your personal information. If you have any questions about this Privacy Policy or our practices, please contact us at {contact.email}.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Changes to This Policy</h3>
            <p style={{ marginBottom: '2rem' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h3 style={{ color: '#213f61', marginBottom: '1rem', fontSize: '1.5rem' }}>7. Contact Us</h3>
            <p style={{ marginBottom: '2rem' }}>
              If you have any questions about this Privacy Policy, please contact us:
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
              name: 'Privacy Policy - Ank Square',
              description: 'Privacy policy and data protection information for Ank Square digital service',
              url: 'https://www.anksquare.in/privacy-policy',
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