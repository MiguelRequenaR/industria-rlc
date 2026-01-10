import { notFound } from "next/navigation"
import { getCourseBySlug, getAllCourseSlugs } from "@/lib/courses-data"
import CourseDetailPage from "@/components/courses/CourseDetailPage"
import type { Metadata } from "next"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generar metadata dinámica
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return {
      title: "Curso no encontrado - RLC Academy",
    }
  }

  return {
    title: `${course.title} - RLC Academy 360`,
    description: course.detailedDescription,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.imageCard],
    },
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = getAllCourseSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return <CourseDetailPage course={course} />
}
