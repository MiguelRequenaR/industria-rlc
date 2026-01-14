"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCourseContentForStudent, markLessonAsCompleted } from "@/actions/student-actions"
import { toast } from "react-toastify"

export function useCourseContent(slug: string) {
  return useQuery({
    queryKey: ["course-content", slug],
    queryFn: () => getCourseContentForStudent(slug),
    enabled: !!slug,
  })
}

export function useMarkLessonCompleted() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lessonId, courseSlug }: { lessonId: string; courseSlug: string }) => 
      markLessonAsCompleted(lessonId),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("¡Lección completada!")
        // Invalidar queries relacionadas
        queryClient.invalidateQueries({ queryKey: ["course-content", variables.courseSlug] })
        queryClient.invalidateQueries({ queryKey: ["student-courses"] })
      } else {
        toast.error(result.error || "Error al marcar la lección como completada")
      }
    },
    onError: () => {
      toast.error("Error al marcar la lección como completada")
    },
  })
}
