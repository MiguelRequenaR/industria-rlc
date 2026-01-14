"use client"

import { useQuery } from "@tanstack/react-query"
import { getTeacherCourses } from "@/actions/teacher-actions"

export function useTeacherCourses() {
  return useQuery({
    queryKey: ["teacher-courses"],
    queryFn: () => getTeacherCourses(),
  })
}
