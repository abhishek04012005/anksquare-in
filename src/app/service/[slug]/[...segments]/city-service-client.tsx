'use client';

import { useRouter } from 'next/navigation'
import Button from '@/components/button/Button'
import { EmojiEvents, Bolt, Business, TrackChanges } from '@mui/icons-material'
import styles from '../service-detail.module.css'
import cityStyles from './city-service.module.css'

interface City {
  name: string
  state: string
  country: string
}

interface Service {
  title: string
  slug: string
  features: string[]
  details: {
    overview: string
    benefits: Array<{ title: string; description: string }>
    process: Array<{ step: number; title: string; description: string }>
    faq: Array<{ question: string; answer: string }>
    pricing: Array<{ plan: string; price: string; features: string[] }>
  }
}

interface CityServiceClientProps {
  service: Service
  city: City | null
  citySlug: string
}

export default function CityServiceClient({ service, city, citySlug }: CityServiceClientProps) {
  const router = useRouter()

  const handleEnquiryClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedEnquiryService', service.title)
    }
    router.push('/enquiry')
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* Service Header - with or without city */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              {city && <div className={cityStyles.locationBadge}>{city.name}, {city.state}, {city.country}</div>}
              <h1 className={styles.title}>{city ? `${service.title} in ${city.name}, ${city.state}, ${city.country}` : service.title}</h1>
              <p className={styles.overview}>
                {service.details.overview} {city ? `Serving businesses in ${city.name} and across ${city.state}, ${city.country}.` : 'Professional services trusted by businesses worldwide.'}
              </p>
              <div className={styles.heroFeatures}>
                {service.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.ctaButtons}>
                <Button variant="primary" onClick={handleEnquiryClick}>Enquiry Now{city ? ` in ${city.name}` : ''}</Button>
                <Button variant="secondary" href={`/service/${service.slug}`}>View All Details</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Benefits Section - only if city is present */}
        {city && (
          <section className={cityStyles.localBenefits}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Why Choose Us in {city.name}?</h2>
              <div className={cityStyles.benefitsGrid}>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <EmojiEvents fontSize="large" />
                </div>
                <h3>Local Expertise</h3>
                <p>Deep understanding of {city!.name}'s market dynamics and business ecosystem in {city!.country}</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Bolt fontSize="large" />
                </div>
                <h3>Quick Response</h3>
                <p>Fast support and on-site assistance for businesses in {city!.name}, {city!.state}</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Business fontSize="large" />
                </div>
                <h3>Proven Track Record</h3>
                <p>Trusted by 100+ businesses in {city!.name}, {city!.state}, {city!.country}</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <TrackChanges fontSize="large" />
                </div>
                <h3>Tailored Solutions</h3>
                <p>Custom strategies for {city!.name} market conditions in {city!.country}</p>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Benefits Section from Service */}
        <section className={styles.benefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Benefits</h2>
            <div className={styles.benefitsGrid}>
              {service.details.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.details.process.length > 0 && (
          <section className={styles.process}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Our Process</h2>
              <div className={styles.processSteps}>
                {service.details.process.map((step, index) => (
                  <div key={step.step} className={styles.stepCard}>
                    <div className={styles.stepNumber}>{step.step}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {service.details.faq.length > 0 && (
          <section className={styles.faq}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions about {service.title}{city ? ` in ${city.name}` : ''}</h2>
              <div className={styles.faqList}>
                {service.details.faq.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Location CTA Section - only if city exists */}
        {city && (
        <section className={cityStyles.locationCta}>
          <div className={styles.container}>
            <h2>Ready to Grow Your Business in {city.name}?</h2>
            <p>
              Connect with our {service.title} experts in {city.name}. We understand the unique challenges and opportunities in {city.name}, {city.state}, {city.country}.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" onClick={handleEnquiryClick}>Enquiry Now</Button>
            </div>
          </div>
        </section>
        )}

        {/* Structured Data for Local Service - only if city exists */}
        {city && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: `Ank Square - ${service.title} in ${city.name}`,
              description: `Professional ${service.title} service in ${city.name}, ${city.state}, ${city.country}`,
              url: `https://www.anksquare.in/service/${service.slug}/${citySlug}`,
              telephone: '+91-XXXXXXXXXX',
              areaServed: {
                '@type': 'City',
                name: city.name,
                addressRegion: city.state,
                addressCountry: city.country
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: city.name,
                addressRegion: city.state,
                addressCountry: city.country
              },
              serviceType: service.title,
              priceRange: '$$',
              image: 'https://www.anksquare.in/logo.svg',
              sameAs: [
                'https://www.instagram.com/anksquare',
                'https://www.facebook.com/anksquare'
              ]
            }),
          }}
        />
        )}

        {/* Structured Data for Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title}${city ? ` in ${city.name}` : ''}`,
              description: service.details.overview,
              ...(city && {
                areaServed: {
                  '@type': 'City',
                  name: city.name
                }
              }),
              provider: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://www.anksquare.in'
              },
              serviceType: service.title,
              ...(service.details.pricing.length > 0 && {
                offers: service.details.pricing.map(plan => ({
                  '@type': 'Offer',
                  name: plan.plan,
                  price: plan.price.replace(/[^\d]/g, ''),
                  priceCurrency: 'INR',
                  description: plan.features.join(', ')
                }))
              })
            }),
          }}
        />
      </main>
    </>
  )
}
