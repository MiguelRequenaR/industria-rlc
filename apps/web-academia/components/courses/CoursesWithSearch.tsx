"use client"

import { useState } from "react"
import HeroCourses from "./HeroCourses"
import CourseSection from "@/components/shared/CourseSection"
import type { Course } from "@/lib/types"

interface CoursesWithSearchProps {
  courses: Course[]
}

export default function CoursesWithSearch({ courses }: CoursesWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return (
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term)
    )
  })

  return (
    <>
      <HeroCourses searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CourseSection courses={filteredCourses} />
    </>
  )
}
