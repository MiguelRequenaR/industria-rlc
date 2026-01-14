import { getCourseBySlug } from "@/actions/admin-actions"
import { CourseDetailPage } from "@/components/admin/course-detail-page"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return <CourseDetailPage initialCourse={course} slug={slug} />
}
