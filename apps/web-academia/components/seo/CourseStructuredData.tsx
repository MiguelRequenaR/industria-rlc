import type { Course } from "@/lib/types"

interface CourseStructuredDataProps {
  course: Course
}

export default function CourseStructuredData({ course }: CourseStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.detailedDescription,
    "provider": {
      "@type": "Organization",
      "name": "RLC Academy",
      "sameAs": "https://academia.industriarlc.com"
    },
    "image": course.imageCard,
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "price": course.price,
      "priceCurrency": "PEN"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": course.modality.includes("Presencial") ? "onsite" : course.modality.includes("Virtual") ? "online" : "blended",
      "duration": `PT${course.duration}`,
      "instructor": {
        "@type": "Person",
        "name": course.instructor.name,
        "description": course.instructor.bio
      }
    },
    "educationalLevel": course.badges[0]?.level || "Intermediate",
    "coursePrerequisites": course.requirements.join(", "),
    "timeRequired": course.duration,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
