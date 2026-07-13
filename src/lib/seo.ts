export const SITE_URL = "https://sanctusproperty.in";

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Which is the best construction company in Coimbatore?",
    a: "Sanctus Property OPC Pvt Ltd is a Coimbatore-based construction and real-estate company known for quality residential and commercial construction. With in-house architects, engineers and project teams, we deliver homes, villas and commercial spaces on time and on budget — from foundation to finishing detail.",
  },
  {
    q: "Does Sanctus Property handle both construction and real estate in Coimbatore?",
    a: "Yes. We offer residential and commercial construction, approved residential and commercial plots, ready-to-move villas, resale villas, and electrical & plumbing services — everything under one roof.",
  },
  {
    q: "Where does Sanctus Property take up projects?",
    a: "We are based in Coimbatore, Tamil Nadu, and take up construction and real-estate projects across Coimbatore and nearby areas of Tamil Nadu.",
  },
  {
    q: "Can I buy a ready-to-move or resale villa through Sanctus Property?",
    a: "Yes. We offer fully finished ready-to-move villas with complete documentation, and verified resale villas with transparent ownership history and fair market valuation.",
  },
  {
    q: "How do I get a construction quote or start a project with Sanctus Property?",
    a: "Tap the Enquiry button on this website and share your requirement — our team responds within one business day. You can also call +91 78458 40069 or email sanctuspropertyopc@gmail.com.",
  },
  {
    q: "Who leads Sanctus Property?",
    a: "Sanctus Property OPC Pvt Ltd was founded by A. Charles Sandeep, our Chief Executive Officer, who leads every project with a commitment to craftsmanship, transparency and lasting value.",
  },
];

const SERVICES = [
  "Residential Construction",
  "Commercial Construction",
  "Residential Plots",
  "Commercial Plots",
  "Ready to Move Villas",
  "Resale Villas",
  "Electrical & Plumbing",
];

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "RealEstateAgent"],
  "@id": SITE_URL + "/#business",
  name: "Sanctus Property",
  legalName: "Sanctus Property OPC Pvt Ltd",
  url: SITE_URL,
  logo: SITE_URL + "/icons/icon-512.png",
  image: SITE_URL + "/og-image.jpg",
  description:
    "Construction and real-estate company in Coimbatore, Tamil Nadu — residential & commercial construction, approved plots, ready-to-move and resale villas, and electrical & plumbing services.",
  telephone: "+91 78458 40069",
  email: "sanctuspropertyopc@gmail.com",
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    name: "A. Charles Sandeep",
    jobTitle: "Founder & Chief Executive Officer",
    url: SITE_URL + "/ceo",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0168,
    longitude: 76.9558,
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction & Real Estate Services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        areaServed: "Coimbatore",
      },
    })),
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sanctus Property",
  alternateName: "Sanctus Property Coimbatore",
  url: SITE_URL,
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "A. Charles Sandeep",
  jobTitle: "Founder & Chief Executive Officer",
  telephone: "+91 96298 73298",
  worksFor: {
    "@type": "Organization",
    name: "Sanctus Property OPC Pvt Ltd",
    url: SITE_URL,
  },
  url: SITE_URL + "/ceo",
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export const jsonLd = (obj: object) => JSON.stringify(obj);
