export default function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "RLC Academy",
    "alternateName": "Industria RLC Academia",
    "url": "https://academia.industriarlc.com",
    "logo": "https://academia.industriarlc.com/logoPNG.png",
    "description": "Academia técnica especializada en cursos de electricidad industrial, instalaciones eléctricas, sistemas de energía UPS y seguridad eléctrica. Certificaciones profesionales con instructores expertos.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PE",
      "addressLocality": "Lima"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Admissions",
      "availableLanguage": ["Spanish"]
    },
    "sameAs": [
      "https://www.facebook.com/industriarlc",
      "https://www.instagram.com/industriarlc",
      "https://www.linkedin.com/company/industriarlc"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "5",
      "lowPrice": "350",
      "highPrice": "580",
      "priceCurrency": "PEN"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
