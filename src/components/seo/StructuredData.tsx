import { details } from '@/data/details';
import FAQSchema, { ankSquareFAQs } from './FAQSchema';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": details.profile.nameCompany,
    "url": "https://www.anksquare.in",
    "logo": "https://www.anksquare.in/logo.svg",
    "description": details.about.missionStatement,
    "founder": {
      "@type": "Person",
      "name": details.profile.name,
      "jobTitle": details.profile.title
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": details.social.phone,
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      details.social.instagram,
      details.social.pinterest
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": details.profile.nameCompany,
    "description": details.about.missionStatement,
    "url": "https://www.anksquare.in",
    "telephone": details.social.phone,
    "email": details.social.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.5941", // Patna coordinates
      "longitude": "85.1376"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Services",
    "description": "Comprehensive digital solutions including merchant account management, website development, and digital marketing",
    "provider": {
      "@type": "Organization",
      "name": details.profile.nameCompany
    },
    "serviceType": "Digital Marketing",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.service.merchantAccountManagement.title,
            "description": details.service.merchantAccountManagement.features.join(", ")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.service.websiteDevelopment.title,
            "description": details.service.websiteDevelopment.features.join(", ")
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": details.service.digitalMarketing.title,
            "description": details.service.digitalMarketing.features.join(", ")
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": details.profile.nameCompany,
    "url": "https://www.anksquare.in",
    "description": details.about.missionStatement,
    "publisher": {
      "@type": "Organization",
      "name": details.profile.nameCompany
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.anksquare.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <FAQSchema faqs={ankSquareFAQs} />
    </>
  );
}