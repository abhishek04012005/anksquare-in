'use client';

import { useRouter } from 'next/navigation'
import Button from '@/components/button/Button'
import Heading from '@/components/heading/heading'
import styles from './service-detail.module.css'

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

interface ServiceDetailClientProps {
  service: Service
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
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

      <main id="main-content" role="main">
        {/* Service Header */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>Professional Digital Service</span>
              <h1 className={styles.title}>{service.title} Service</h1>
              <p className={styles.overview}>{service.details.overview}</p>
              <div className={styles.heroFeatures}>
                {service.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.ctaButtons}>
                <Button variant="primary" onClick={handleEnquiryClick}>Enquiry Now</Button>
                <Button variant="secondary" href="/service">View All Services</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefits}>
          <div className={styles.container}>
            <Heading
              subtitle="Key Benefits"
              title="Why Choose "
              titleHighlight={service.title}
            />
            <div className={styles.benefitsGrid}>
              {service.details.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <span className={styles.benefitNumber}>{String(index + 1).padStart(2, '0')}</span>
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
              <Heading
                subtitle="How We Work"
                title="Our Proven "
                titleHighlight="Process"
              />
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
              <Heading
                subtitle="FAQ"
                title="Frequently Asked "
                titleHighlight="Questions"
              />
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

        {/* CTA Section */}
        <section id="contact" className={styles.cta}>
          <div className={styles.container}>
            <Heading
              subtitle="Ready to Grow?"
              title="Start Your "
              titleHighlight="Enquiry Today"
              theme="light"
            />
            <p className={styles.ctaDescription}>
              Contact us today to discuss your {service.title} requirements and get a customized solution tailored to your business goals.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" onClick={handleEnquiryClick}>Enquiry Now</Button>
              <Button variant="secondary" href="/service">View All Services</Button>
            </div>
          </div>
        </section>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} Services`,
              description: service.details.overview,
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
