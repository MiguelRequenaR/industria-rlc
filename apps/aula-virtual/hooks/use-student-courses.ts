"use client"

import { useQuery } from "@tanstack/react-query"
import { getStudentEnrolledCourses } from "@/actions/student-actions"

export function useStudentCourses() {
  return useQuery({
    queryKey: ["student-courses"],
    queryFn: () => getStudentEnrolledCourses(),
  })
}
