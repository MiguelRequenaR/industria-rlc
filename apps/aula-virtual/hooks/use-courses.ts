"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCourses, createCourse, updateCourse } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import type { CourseDifficulty, CourseModality } from "@/types/database"

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      courseId,
      title,
      description,
      imageUrl,
      durationHours,
      difficulty,
      modality,
      courseCode,
    }: {
      courseId: string
      title: string
      description?: string
      imageUrl?: string
      durationHours?: number
      difficulty?: CourseDifficulty
      modality?: CourseModality
      courseCode?: string
    }) => updateCourse(courseId, title, description, imageUrl, durationHours, difficulty, modality, courseCode),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Curso actualizado correctamente")
        queryClient.invalidateQueries({ queryKey: ["courses"] })
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] })
        if (result.slug) {
          queryClient.invalidateQueries({ queryKey: ["course", result.slug] })
        } else {
          queryClient.invalidateQueries({ queryKey: ["course"] })
        }
      } else {
        toast.error(result.error || "Error al actualizar curso")
      }
    },
    onError: () => {
      toast.error("Error al actualizar curso")
    },
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      title,
      description,
      imageUrl,
      durationHours,
      difficulty,
      modality,
      courseCode,
    }: {
      title: string
      description?: string
      imageUrl?: string
      durationHours?: number
      difficulty?: CourseDifficulty
      modality?: CourseModality
      courseCode?: string
    }) => createCourse(title, description, imageUrl, durationHours, difficulty, modality, courseCode),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Curso creado correctamente")
        // Invalidar la lista de cursos
        queryClient.invalidateQueries({ queryKey: ["courses"] })
        // Redirigir al curso recién creado
        if (result.slug) {
          router.push(`/admin/cursos/${result.slug}`)
        }
      } else {
        toast.error(result.error || "Error al crear curso")
      }
    },
    onError: () => {
      toast.error("Error al crear curso")
    },
  })
}
