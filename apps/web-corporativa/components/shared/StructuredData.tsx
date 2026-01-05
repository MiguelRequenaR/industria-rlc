export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Industria RLC",
    "url": "https://industriarlc.com",
    "logo": "https://industriarlc.com/RLCLOGOCORP.png",
    "description": "Empresa peruana líder en servicios eléctricos integrales, construcción y automatización industrial",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PE",
      "addressLocality": "Huancayo",
      "addressRegion": "Junín"
    },
    "telephone": "+51940162009",
    "email": "proyectos@industriarlc.com",
    "sameAs": [
      "https://www.facebook.com/industriarlc",
      "https://www.linkedin.com/company/industriarlc"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Perú"
    },
    "foundingDate": "2015",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "50"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Industria RLC",
    "image": "https://industriarlc.com/RLCLOGOCORP.png",
    "telephone": "+51940162009",
    "email": "proyectos@industriarlc.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. de la Constitución, s/n",
      "addressLocality": "Huancayo",
      "addressRegion": "Junín",
      "addressCountry": "PE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "$$"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}