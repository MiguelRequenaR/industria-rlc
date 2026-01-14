"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCourseBySlug, createModule, createLesson } from "@/actions/admin-actions"
import { toast } from "react-toastify"

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug),
  })
}

export function useCreateModule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, title }: { courseId: string; title: string }) =>
      createModule(courseId, title),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("Módulo creado correctamente")
        // Invalidar todas las queries de cursos para actualizar la UI
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al crear módulo")
      }
    },
    onError: () => {
      toast.error("Error al crear módulo")
    },
  })
}

export function useCreateLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      moduleId,
      title,
      meetingLink,
      pdfUrl,
    }: {
      moduleId: string
      title: string
      meetingLink?: string
      pdfUrl?: string
    }) => createLesson(moduleId, title, meetingLink, pdfUrl),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Lección creada correctamente")
        // Invalidar todas las queries de cursos para actualizar la UI
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al crear lección")
      }
    },
    onError: () => {
      toast.error("Error al crear lección")
    },
  })
}
