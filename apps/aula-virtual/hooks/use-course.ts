"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  getCourseBySlug, 
  createModule, 
  createLesson, 
  updateModule, 
  deleteModule,
  updateLesson,
  deleteLesson
} from "@/actions/admin-actions"
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

export function useUpdateModule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ moduleId, title }: { moduleId: string; title: string }) =>
      updateModule(moduleId, title),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Módulo actualizado correctamente")
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al actualizar módulo")
      }
    },
    onError: () => {
      toast.error("Error al actualizar módulo")
    },
  })
}

export function useDeleteModule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (moduleId: string) => deleteModule(moduleId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Módulo eliminado correctamente")
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al eliminar módulo")
      }
    },
    onError: () => {
      toast.error("Error al eliminar módulo")
    },
  })
}

export function useUpdateLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      lessonId,
      title,
      meetingLink,
      pdfUrl,
      isVisible,
    }: {
      lessonId: string
      title: string
      meetingLink?: string
      pdfUrl?: string
      isVisible?: boolean
    }) => updateLesson(lessonId, title, meetingLink, pdfUrl, isVisible),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Lección actualizada correctamente")
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al actualizar lección")
      }
    },
    onError: () => {
      toast.error("Error al actualizar lección")
    },
  })
}

export function useDeleteLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (lessonId: string) => deleteLesson(lessonId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Lección eliminada correctamente")
        queryClient.invalidateQueries({ queryKey: ["course"] })
      } else {
        toast.error(result.error || "Error al eliminar lección")
      }
    },
    onError: () => {
      toast.error("Error al eliminar lección")
    },
  })
}
