'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styles from './footer.module.css'
import { contact, social } from '@/data/details'
import { quickLinks, webdevelopment, accountmanagement } from '@/data/footer'



const Footer = () => {
    const year = new Date().getFullYear()

    const socialLinks = [
        { href: social.instagram, icon: <InstagramIcon /> },
        { href: social.pinterest, icon: <PinterestIcon /> },
        { href: social.youtube, icon: <YouTubeIcon /> }
    ]

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.companyInfo}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/logo.svg"
                                alt="Ank square"
                                width={1000}
                                height={1000}
                                className={styles.logoImage}
                            />
                        </Link>
                        <p className={styles.description}>
                            Empowering businesses with innovative digital solutions. Transform your vision into reality with our expertise.
                        </p>
                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <FiMail />
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FiPhone />
                                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FiMapPin />
                                <span>{contact.address.street}, {contact.address.city}, {contact.address.state}, {contact.address.country} - {contact.address.zipCode}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.linksSection}>
                        <div className={styles.linkColumn}>
                            <h3>Quick Links</h3>
                            <ul>
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h3>Website Development</h3>
                            <ul>
                                {webdevelopment.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.href}>{service.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h3>Account Management</h3>
                            <ul>
                                {accountmanagement.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.href}>{service.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © {year} <a href="https://www.anksquare.in" target='_blank' rel="noopener noreferrer">Ank Square Pvt. Ltd.</a> All rights reserved.
                    </div>
                    <div className={styles.social}>
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer