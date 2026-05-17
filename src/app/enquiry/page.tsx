import { Metadata } from 'next'
import EnquiryForm from '@/components/enquiry/EnquiryForm'
import Heading from '@/components/heading/heading'
import { profile } from '@/data/details'
import styles from './enquiry.module.css'
import {
  Lightbulb,
  FlashOn,
  Work,
  TrendingUp,
  Phone,
  Email,
  Chat,
} from '@mui/icons-material'

export const metadata: Metadata = {
  title: 'Enquiry - Get Started with Ank Square Services',
  description: 'Contact Ank Square for professional e-commerce account management, website development, and digital marketing services. Get a free consultation today.',
  keywords: 'enquiry, contact, consultation, e-commerce services, digital marketing, web development, Ank Square',
  openGraph: {
    title: 'Enquiry - Get Started with Ank Square',
    description: 'Ready to grow your business? Contact us for expert e-commerce and digital marketing solutions.',
    url: 'https://www.anksquare.in/enquiry',
    type: 'website',
  },
}

export default function EnquiryPage() {
  return (
    <>
      {/* Main Content */}
      <main className={styles.mainContent}>
        <section className={styles.pageIntro}>
          <Heading
            subtitle="Get Started"
            title="Enquiry "
            titleHighlight=" Now"
          />
        </section>

        <div className={styles.contentGrid}>

          {/* Why Choose Us Section */}
          
            

          {/* Enquiry Form */}
          <section className={styles.enquiryFormSection}>
            <EnquiryForm />
          </section>

          

         
        </div>
      </main>
    </>
  )
}