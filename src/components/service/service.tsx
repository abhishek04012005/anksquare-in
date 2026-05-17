'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './service.module.css'
import Button from '../../components/button/Button'
import { mainServices, marketplaceServices, websiteTypes, digitalMarketingTypes, MainServiceProps, SubService } from '../../data/service'
import { StaticImageData } from 'next/image'

import Heading from '../../components/heading/heading'

interface MainServiceComponentProps {
    service: MainServiceProps;
    isReversed: boolean;
}

const MainService = ({  service, isReversed }: MainServiceComponentProps) => {
    const router = useRouter()

    const handleEnquiryClick = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('selectedEnquiryService', service.title)
        }
        router.push('/enquiry')
    }

    return (
        <div className={`${styles.mainService} ${isReversed ? styles.reversed : ''}`}>
            <div
                className={styles.imageSection}
            >
                <service.image />
            </div>

            <div
                className={styles.contentSection}
            >
                <h2 className={styles.mainTitle}>{service.title}</h2>
                <p className={styles.mainDescription}>{service.description}</p>
                <ul className={styles.mainFeatures}>
                    {service.features.map((feature, index) => (
                        <li
                            key={index}
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className={styles.mainButtons}>
                    <Button href={service.path} variant="primary">View More</Button>
                    <Button onClick={handleEnquiryClick} variant="secondary">Enquiry Now</Button>
                </div>
            </div>
        </div>
    )
}

const SubServiceCard = ({ service }: { service: SubService }) => {
    // normalize logo paths; Next/Image requires valid URLs or imported data
    const resolveLogo = (logo: string | StaticImageData) => {
        if (typeof logo === 'string') {
            // legacy relative paths were stored as "./service/xxx.png"; convert to public asset path
            if (logo.startsWith('./service/')) {
                return `/assets/services/${logo.substring('./service/'.length)}`
            }
            return logo
        }
        return logo
    }

    return (
        <div
            className={styles.subCard}
        >
            <div className={styles.logoContainer}>
                <Image
                    src={resolveLogo(service.logo)}
                    alt={service.title}
                    className={styles.serviceLogo}
                    height={60}
                    width={60}
                />
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <ul className={styles.cardFeatures}>
                {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <Button href={`/service/${service.slug}`} variant="primary" className={styles.viewDetails}>
                View Details
            </Button>
        </div>
    )
}
const Services = () => {
    return (
        <section className={styles.servicesSection}>
            <div className={styles.container}>
                <Heading
                    subtitle="Services"
                    title="End-to-End Ecommerce Solutions Powered By "
                    titleHighlight="Digital Expertise"
                />

                {mainServices.map((service, index) => (
                    <div key={service.id} className={styles.serviceBlock}>
                        <MainService
                            service={service}
                            isReversed={index % 2 !== 0}
                        />

                        <div className={styles.subServices}>
                            <h2 className={styles.subTitle}>
                                {index === 0 ? 'Marketplace Solutions' :
                                    index === 1 ? 'Website Solutions' :
                                        'Digital Marketing Solutions'}
                            </h2>
                            <div className={styles.cardGrid}>
                                {index === 0
                                    ? marketplaceServices.map(service => (
                                        <SubServiceCard key={service.id} service={service} />
                                    ))
                                    : index === 1
                                        ? websiteTypes.map(service => (
                                            <SubServiceCard key={service.id} service={service} />
                                        ))
                                        : digitalMarketingTypes.map(service => (
                                            <SubServiceCard key={service.id} service={service} />
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services