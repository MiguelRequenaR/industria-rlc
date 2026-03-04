"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCourses, createCourse, updateCourse } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import type { CourseDifficulty, CourseModality } from "@/types/database"

type UpdateCourseVariables = {
  courseId: string
  title: string
  description?: string
  imageUrl?: string
  durationHours?: number
  difficulty?: CourseDifficulty
  modality?: CourseModality
  courseCode?: string
  startDate?: string
  endDate?: string
  price?: number
}

type CreateCourseVariables = {
  title: string
  description?: string
  imageUrl?: string
  durationHours?: number
  difficulty?: CourseDifficulty
  modality?: CourseModality
  courseCode?: string
  startDate?: string
  endDate?: string
  price?: number
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof updateCourse>>, unknown, UpdateCourseVariables>({
    mutationFn: (params: UpdateCourseVariables) =>
      updateCourse(
        params.courseId,
        params.title,
        params.description,
        params.imageUrl,
        params.durationHours,
        params.difficulty,
        params.modality,
        params.courseCode,
        params.startDate,
        params.endDate,
        params.price
      ),
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

  return useMutation<Awaited<ReturnType<typeof createCourse>>, unknown, CreateCourseVariables>({
    mutationFn: (params: CreateCourseVariables) =>
      createCourse(
        params.title,
        params.description,
        params.imageUrl,
        params.durationHours,
        params.difficulty,
        params.modality,
        params.courseCode,
        params.startDate,
        params.endDate,
        params.price
      ),
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
