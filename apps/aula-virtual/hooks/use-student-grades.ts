"use client"

import { useQuery } from "@tanstack/react-query"
import { getStudentGrades, getStudentGradesByCourse } from "@/actions/student-actions"

export function useStudentGrades() {
  return useQuery({
    queryKey: ["student-grades"],
    queryFn: () => getStudentGrades(),
  })
}

export function useStudentGradesByCourse(courseId: string) {
  return useQuery({
    queryKey: ["student-grades", courseId],
    queryFn: () => getStudentGradesByCourse(courseId),
    enabled: !!courseId,
  })
}
