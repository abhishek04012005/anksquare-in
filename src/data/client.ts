export interface ProjectWork {
  type: 'logo' | 'website' | 'visitingCard' | 'profile' | 'business' | 'letterHead'
  title: string
  description: string
  images?: string[]
  url?: string
  presentationUrl?: string
}

export interface Client {
  id: number
  name: string
  logo: string
  project: string
  testimonial: string
  slug: string
  workDone: ProjectWork[]
}

export const clients: Client[] = [
  {
    id: 1,
    name: 'Sharma Interiors',
    slug: 'sharma-interiors',
    logo: "/client1.png",
    project: 'Corporate Office Interior Design & Branding Solutions',
    testimonial: 'Ank Square transformed our corporate office with sleek, functional design that perfectly reflects our brand identity. Their team understood our vision for a modern workspace and delivered professional branding solutions that elevated our business image. Exceptional execution and attention to detail throughout the entire process.',
    workDone: [
      {
        type: 'logo',
        title: 'Professional Brand Identity & Logo Design',
        description: 'Custom logo design and complete brand identity system for Sharma Interiors. We created a modern, sophisticated visual identity that reflects the company\'s expertise in corporate interior design and architecture. The design emphasizes professionalism, precision, and innovation.',
        images: ["/client1.png"],
      },
      {
        type: 'website',
        title: 'Responsive Corporate Portfolio Website',
        description: 'Fully responsive website designed to showcase Sharma Interiors\' portfolio and expertise. Features an interactive project gallery, client testimonials section, service descriptions, and seamless navigation. Built with modern web technologies for optimal performance and search engine visibility.',
        images: ["/sharma-interiors/website.png"],
        url: 'https://interiorssharma.com/',
      },
      // {
      //   type: 'visitingCard',
      //   title: 'Professional Business Card & Stationery Design',
      //   description: 'Custom-designed business cards with premium finishes, incorporating the brand\'s visual identity. Features modern typography, elegant color scheme, and professional layout. Print-ready design with attention to every detail.',
      //   images: ["/sharma-interiors/visitingcard.png"],
      // },
      {
        type: 'profile',
        title: 'Comprehensive Company Profile Presentation',
        description: 'Professional company profile presentation showcasing Sharma Interiors\' service, portfolio, achievements, and client success stories. Includes detailed service descriptions, project case studies, and company vision.',
        presentationUrl: 'https://www.canva.com/design/DAGvBZodBng/_nXWUjFtxWzCTWjYi_ID_Q/view?embed',
      },
    ],
  },
  {
    id: 2,
    name: 'Sah Constructions',
    slug: 'sah-constructions',
    logo: "/client2.png",
    project: 'Laboratory Infrastructure & Construction Branding',
    testimonial: 'Sah Constructions needed precision and compliance for their laboratory infrastructure project, and Ank Square delivered perfectly. The complete branding solution combined with professional digital presence created an efficient, modern, and future-ready business identity. Outstanding quality and attention to technical specifications.',
    workDone: [
      {
        type: 'logo',
        title: 'Construction Industry Professional Logo Design',
        description: 'Strategic logo design for Sah Constructions emphasizing strength, reliability, and technical expertise in construction and infrastructure development. The design incorporates geometric elements representing precision and structural integrity, creating a strong professional presence.',
        images: ["/client2.png"],
      },
      {
        type: 'website',
        title: 'Dynamic Construction Portfolio Website',
        description: 'Professional website development showcasing Sah Constructions\' completed projects, construction capabilities, and technical expertise. Includes project galleries, detailed case studies, team information, and client testimonials. Optimized for search engines and mobile devices.',
        images: ["/sah-constructions/website.png"],
        url: 'https://www.sahconstructions.com',
      },
      {
        type: 'visitingCard',
        title: 'Premium Business Card & Professional Stationery',
        description: 'Professional business card design with premium finishes reflecting construction industry standards. Modern typography and sophisticated color palette create a memorable impression for client meetings and networking events.',
        images: ["/sah-constructions/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Professional Company Profile & Capabilities Document',
        description: 'Comprehensive company profile presentation detailing Sah Constructions\' experience, project portfolio, technical expertise, and construction capabilities. Designed to impress clients and partners with professional achievements and industry knowledge.',
        presentationUrl: 'https://www.canva.com/design/DAGwgeklyeU/IlGwBotTtDGvBn16-HdYUQ/view?embed',
      },
      {
        type: 'letterHead',
        title: 'Professional Company Letterhead Design',
        description: 'Custom-designed company letterhead featuring the Sah Constructions brand identity. Professional layout suitable for official correspondence, proposals, and formal documentation. Premium design that reinforces brand authority.',
        images: ["/sah-constructions/letterhead.png"],
      },
    ],
  },
  {
    id: 3,
    name: 'Achintya Enterprises',
    slug: 'achintya-enterprises',
    logo: "/client3.png",
    project: 'Ayurvedic Manufacturing & Traditional Brand Identity',
    testimonial: 'Ank Square demonstrated remarkable understanding of our Ayurvedic manufacturing business, perfectly blending traditional heritage with modern aesthetics. The branding captures our commitment to authentic Ayurvedic wellness while maintaining contemporary market appeal. Exceptional creative work that resonates with our target audience.',
    workDone: [
      {
        type: 'logo',
        title: 'Ayurvedic Brand Logo & Heritage Identity Design',
        description: 'Bespoke logo and brand identity for Achintya Enterprises combining traditional Ayurvedic elements with modern design principles. The visual identity reflects the brand\'s commitment to authentic Ayurvedic wellness products while appealing to contemporary consumers. Custom color palette and typography rooted in traditional aesthetics.',
        images: ["/client3.png"],
      },
      // {
      //   type: 'website',
      //   title: 'Construction Website',
      //   description: 'Full-featured online store with product catalog and ordering system.',
      //   images: ["./client/achintya-enterprises/website.png"],
      //   url: 'https://achintya-ayurveda.com',
      // },
      {
        type: 'visitingCard',
        title: 'Professional Business Card & Corporate Stationery Package',
        description: 'Complete corporate stationery design including premium business cards reflecting Achintya Enterprises\' brand identity. Professional design elements that convey authenticity, heritage, and wellness values across all business materials.',
        images: ["/achintya-enterprises/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Comprehensive Ayurvedic Product Catalog Presentation',
        description: 'Professional digital product catalog showcasing Achintya Enterprises\' complete range of Ayurvedic products, benefits, and wellness solutions. Beautifully designed presentation highlighting ingredient sourcing, traditional formulations, and health benefits for target wellness consumers.',
        presentationUrl: 'https://www.canva.com/design/DAGwC4sC8zE/UW060n74lo-LIMRwoDsNWQ/view?embed',
      },
    ],
  },
  {
    id: 4,
    name: 'SL Engineerings',
    slug: 'sl-engineerings',
    logo: "/client4.png",
    project: 'Healthcare Office Interior Design & Engineering Branding',
    testimonial: 'SL Engineerings required a healthcare office space that combined smart functional design with calming, welcoming aesthetics. Ank Square delivered a comprehensive branding and interior design solution creating a professional, patient-friendly environment. The team\'s technical expertise and design sensitivity resulted in outstanding results.',
    workDone: [
      {
        type: 'logo',
        title: 'Engineering Industry Professional Logo & Brand Identity',
        description: 'Technical and precise logo design for SL Engineerings emphasizing innovation, reliability, and engineering excellence. The design incorporates geometric precision and professional elements that communicate technical expertise and trustworthiness in the engineering sector.',
        images: ["/client4.png"],
      },
      // {
      //   type: 'website',
      //   title: 'Professional Website',
      //   description: 'Technical portfolio website with project case studies.',
      //   images: ["./client/sl-engineers/website.png"],
      //   url: 'https://sl-engineerings.com',
      // },
      {
        type: 'visitingCard',
        title: 'Professional Business Card & Executive Stationery Design',
        description: 'Premium business card and corporate stationery design reflecting SL Engineerings\' professional brand identity. Modern typography and clean design elements appropriate for the engineering and healthcare industries. Print-ready materials for client meetings and formal correspondence.',
        images: ["/sl-engineers/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Detailed Engineering Services & Business Profile',
        description: 'Comprehensive business profile presentation showcasing SL Engineerings\' technical capabilities, service offerings, completed projects, and expertise in healthcare facility design. Professional document highlighting engineering excellence and industry experience.',
        presentationUrl: 'https://www.canva.com/design/DAGwn1OnOZ0/oaWHELo73crylszVL19auQ/view?embed',
      },
    ],
  },
  {
    "id": 5,
    "name": "Rehas",
    "slug": "rehas",
    "logo": "/rehas/logo.svg",
    "project": "Spiritual Wellness Platform & Healing Content Branding",
    "testimonial": "Rehas required a calm, meaningful, and spiritually aligned digital platform to share knowledge about chakras, healing, and wellness. Ank Square delivered a peaceful and modern website with clear content structure and strong branding. The final result created a powerful online presence that connects with people seeking mindfulness, spiritual growth, and holistic health.",
    "workDone": [
      {
        "type": "logo",
        "title": "Spiritual Brand Identity & Healing Logo Design",
        "description": "Custom logo design and brand identity for Rehas focused on spiritual healing, chakra energy, and inner balance. The logo incorporates calming elements and symbolic colors representing spiritual growth, mindfulness, and holistic wellness.",
        "images": ["/rehas/logo.svg"]
      },
      {
        "type": "website",
        "title": "Spiritual Wellness & Chakra Knowledge Website",
        "description": "Designed and developed a modern spiritual wellness website for Rehas focused on chakra education, meditation guidance, and holistic healing practices. The platform features calming design aesthetics, structured chakra information, and responsive layout to create a peaceful and engaging user experience.",
        "images": ["/rehas/website.png"],
        "url": "https://rehas.in"
      },
      {
        "type": "visitingCard",
        "title": "Wellness Brand Business Card & Stationery Design",
        "description": "Minimal and calming business card design reflecting the Rehas spiritual wellness identity. The design uses soft colors, spiritual symbolism, and clean typography to represent healing, mindfulness, and holistic energy balance.",
        "images": ["/rehas/visitingcard.svg"]
      }
    ]
  },
  {
    "id": 6,
    "name": "Manish K Verma",
    "slug": "manish-k-verma",
    "logo": "/manishkverma/logo.png",
    "project": "Professional Personal Portfolio Website & Digital Identity",
    "testimonial": "Manish K Verma wanted a professional online portfolio to present his work, skills, and achievements in a clean and impactful way. Ank Square created a modern portfolio platform that effectively highlights his projects, experience, and personal brand. The result is a professional digital presence that supports career growth and networking opportunities.",
    "workDone": [
      {
        "type": "logo",
        "title": "Personal Brand Identity & Logo Design",
        "description": "Custom personal logo and brand identity design for Manish K Verma. The design reflects professionalism, creativity, and a strong digital presence. The logo helps establish a recognizable personal brand across the website, portfolio, and professional platforms.",
        "images": ["/manishkverma/logo.png"]
      },
      {
        "type": "website",
        "title": "Modern Personal Portfolio Website",
        "description": "Designed and developed a modern personal portfolio website for Manish K Verma showcasing professional skills, projects, achievements, and experience. The website features a clean UI, responsive design, and structured sections including about, portfolio, and contact to create a strong professional online presence.",
        "images": ["/manishkverma/website.png"],
        "url": "https://manishkverma.in"
      }
    ]
  }
]
