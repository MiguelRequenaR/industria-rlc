"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllCourses, createCourse } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
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
    }: {
      title: string
      description?: string
      imageUrl?: string
    }) => createCourse(title, description, imageUrl),
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
