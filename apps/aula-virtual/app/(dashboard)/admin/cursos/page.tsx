import { CoursesGrid } from "@/components/admin/courses-grid"
import { getAllCourses } from "@/actions/admin-actions"

export default async function CursosPage() {
  const courses = await getAllCourses()

  return (
    <div>
      <CoursesGrid initialCourses={courses} />
    </div>
  )
}
