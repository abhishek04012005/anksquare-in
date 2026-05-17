import Logo from '../../public/logo.svg'

export const details = {
  // Basic Information
  profile: {
    id: 'founder-mukesh-kumar',
    name: 'Mukesh Kumar',
    nameCompany: "Ank Square",
    title: 'Founder & Visionary',
    subtitle: 'Digital Services Innovator',
    imageAlt: 'Mukesh Kumar - Founder of Ank Square',
    logo: Logo,
    badge: 'Our Visionary',
  },

  // About and Credentials
  about: {
    shortBio:
      'With extensive experience in digital service, Mukesh Kumar founded Ank Square to provide comprehensive digital solutions that empower businesses to thrive in the online world.',
    longBio:
      `Mukesh Kumar is a dynamic entrepreneur and digital service expert with a passion for leveraging technology to drive business growth. He founded Ank Square to offer end-to-end digital solutions including merchant account management, website development, and digital marketing. His commitment to innovation and client success has helped numerous businesses establish a strong online presence and achieve their digital goals. Mukesh believes in combining technical expertise with strategic thinking to deliver results that matter.`,
    missionStatement:
      'To empower businesses with innovative digital solutions that drive growth, enhance online presence, and deliver measurable results.',
    visionStatement:
      'A digital landscape where every business, regardless of size, has access to world-class digital service that fuel their success and growth.',
  },

  // Services Offered
  service: {
    merchantAccountManagement: {
      title: 'Merchant Account Management',
      features: [
        'Multi-Platform Integration',
        'Account Setup & Optimization',
        'Sales & Performance Analytics',
        'Inventory Management',
        'Customer Service Support'
      ],
      icon: '🛒'
    },
    websiteDevelopment: {
      title: 'Website Development',
      features: [
        'Custom Design & Development',
        'Responsive UI',
        'SEO Optimization',
        'Performance Tuning',
        'Ongoing Support'
      ],
      icon: '💻'
    },
    digitalMarketing: {
      title: 'Digital Marketing',
      features: [
        'Search Engine Optimization (SEO)',
        'Social Media Marketing',
        'Google & Meta Ads',
        'Content Strategy',
        'Performance Analytics'
      ],
      icon: '🚀'
    }
  },

  // Social Media Links
  social: {
    instagram: 'https://www.instagram.com/anksquare/',
    // linkedin: 'https://linkedin.com/company/anksquare',
    pinterest: 'https://in.pinterest.com/anksquare/',
    // facebook: 'https://facebook.com/anksquare',
    youtube: 'https://www.youtube.com/@anksquare',
    website: 'https://www.anksquare.in',
    email: 'contact@anksquare.com',
    phone: '+91-9939337638',
    whatsapp: '919939337638',
  },
  // Contact Information
  contact: {
    email: 'contact@anksquare.com',
    phone: '+91-9939337638',
    address: {
      street: 'Ank Square Pvt. Ltd., Ramjaipal Road, Opp. Gola Road, Near Hotel Magadh Palace',
      city: 'Patna',
      state: 'Bihar',
      country: 'India',
      zipCode: '801503',
    },
    timezone: 'IST (Indian Standard Time)',
    bookingUrl: 'https://www.anksquare.in/contact',
  },


};

// Export individual sections for easier access
export const {
  profile,
  about,
  service,
  social,
  contact,
} = details;
