import { notFound } from "next/navigation"
import {
  getCourseBySlug,
  getAllCourseSlugs,
  getRelatedCourses,
} from "@/lib/courses-data"
import CourseDetailPage from "@/components/courses/CourseDetailPage"
import CourseStructuredData from "@/components/seo/CourseStructuredData"
import type { Metadata } from "next"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generar metadata dinámica
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    return {
      title: "Curso no encontrado",
    }
  }

  const courseUrl = `https://academia.industriarlc.com/cursos/${slug}`

  return {
    title: course.title,
    description: course.detailedDescription,
    keywords: [
      course.title,
      "curso electricidad",
      "formación técnica",
      "certificación profesional",
      course.modality,
      course.badges[0]?.level || "curso técnico",
    ],
    openGraph: {
      title: `${course.title} | RLC Academy`,
      description: course.description,
      url: courseUrl,
      type: "website",
      images: [
        {
          url: course.imageCard,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | RLC Academy`,
      description: course.description,
      images: [course.imageCard],
    },
    alternates: {
      canonical: courseUrl,
    },
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const [course, relatedCourses] = await Promise.all([
    getCourseBySlug(slug),
    getRelatedCourses(slug, 3),
  ])

  if (!course) {
    notFound()
  }

  return (
    <>
      <CourseStructuredData course={course} />
      <CourseDetailPage course={course} relatedCourses={relatedCourses} />
    </>
  )
}
