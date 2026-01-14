"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  getStudentsByCourse, 
  createGrade, 
  updateGrade, 
  deleteGrade 
} from "@/actions/teacher-actions"
import { toast } from "react-toastify"

export function useStudentsByCourse(courseId: string) {
  return useQuery({
    queryKey: ["students-grades", courseId],
    queryFn: () => getStudentsByCourse(courseId),
    enabled: !!courseId,
  })
}

export function useCreateGrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      courseId,
      studentId,
      itemName,
      score,
      feedback,
    }: {
      courseId: string
      studentId: string
      itemName: string
      score: number
      feedback?: string
    }) => createGrade(courseId, studentId, itemName, score, feedback),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("Calificación agregada correctamente")
        queryClient.invalidateQueries({ queryKey: ["students-grades", variables.courseId] })
      } else {
        toast.error(result.error || "Error al agregar calificación")
      }
    },
    onError: () => {
      toast.error("Error al agregar calificación")
    },
  })
}

export function useUpdateGrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      gradeId,
      courseId,
      updates,
    }: {
      gradeId: string
      courseId: string
      updates: {
        item_name?: string
        score?: number
        feedback?: string
      }
    }) => updateGrade(gradeId, updates),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("Calificación actualizada correctamente")
        queryClient.invalidateQueries({ queryKey: ["students-grades", variables.courseId] })
      } else {
        toast.error(result.error || "Error al actualizar calificación")
      }
    },
    onError: () => {
      toast.error("Error al actualizar calificación")
    },
  })
}

export function useDeleteGrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      gradeId,
      courseId,
    }: {
      gradeId: string
      courseId: string
    }) => deleteGrade(gradeId),
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("Calificación eliminada correctamente")
        queryClient.invalidateQueries({ queryKey: ["students-grades", variables.courseId] })
      } else {
        toast.error(result.error || "Error al eliminar calificación")
      }
    },
    onError: () => {
      toast.error("Error al eliminar calificación")
    },
  })
}
