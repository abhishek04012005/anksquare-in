import { Metadata } from 'next';
import { generateSEO, seoConfigs } from '@/lib/seo';
import About from '@/components/about/about';
import { details } from '@/data/details';

export const metadata: Metadata = generateSEO({
  ...seoConfigs.about,
  url: 'https://www.anksquare.in/about',
  image: '/og-image-about.jpg',
});

// AboutPage structured data
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Ank Square - Digital Services Expert",
  "description": details.about.missionStatement,
  "url": "https://www.anksquare.in/about",
  "mainEntity": {
    "@type": "Organization",
    "name": details.profile.nameCompany,
    "description": details.about.longBio,
    "founder": {
      "@type": "Person",
      "name": details.profile.name,
      "jobTitle": details.profile.title,
      "description": details.about.shortBio
    },
    "foundingDate": "2019", // Based on 5+ years experience
    "url": "https://www.anksquare.in",
    "sameAs": [
      details.social.instagram,
      details.social.pinterest,
      details.social.youtube
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.anksquare.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://www.anksquare.in/about"
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}