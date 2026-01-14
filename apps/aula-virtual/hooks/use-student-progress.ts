"use client"

import { useQuery } from "@tanstack/react-query"
import { 
  getStudentsProgressByCourse, 
  getStudentLessonsProgress 
} from "@/actions/teacher-actions"

export function useStudentsProgress(courseId: string) {
  return useQuery({
    queryKey: ["students-progress", courseId],
    queryFn: () => getStudentsProgressByCourse(courseId),
    enabled: !!courseId,
  })
}

export function useStudentLessonsProgress(courseId: string, studentId: string) {
  return useQuery({
    queryKey: ["student-lessons-progress", courseId, studentId],
    queryFn: () => getStudentLessonsProgress(courseId, studentId),
    enabled: !!courseId && !!studentId,
  })
}
