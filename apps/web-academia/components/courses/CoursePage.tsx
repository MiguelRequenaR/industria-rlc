import CourseSection from "@/components/shared/CourseSection"
import { getCoursesFromDb } from "@/lib/courses-data"

export default async function CoursePage() {
  const courses = await getCoursesFromDb()
  return (
    <section className="max-w-7xl mx-auto">
      <CourseSection courses={courses} />
    </section>
  )
}
