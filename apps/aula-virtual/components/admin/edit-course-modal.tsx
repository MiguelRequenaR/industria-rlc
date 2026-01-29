"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUpdateCourse } from "@/hooks/use-courses"
import { CourseWithTeacher } from "@/types/database"

interface EditCourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: CourseWithTeacher | null
}

export function EditCourseModal({ isOpen, onClose, course }: EditCourseModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const updateCourseMutation = useUpdateCourse()

  useEffect(() => {
    if (course) {
      setTitle(course.title)
      setDescription(course.description || "")
      setImageUrl(course.image_url || "")
    }
  }, [course])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !course) {
      return
    }

    updateCourseMutation.mutate(
      {
        courseId: course.id,
        title: title.trim(),
        description: description.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
      },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!updateCourseMutation.isPending) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título del Curso <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Electricidad Básica para Principiantes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={updateCourseMutation.isPending}
                  autoFocus
                />
                {title && (
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /cursos/{title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Curso (Opcional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe brevemente de qué trata el curso..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  disabled={updateCourseMutation.isPending}
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  URL de Imagen (Opcional)
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={updateCourseMutation.isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enlace a una imagen de portada para el curso
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateCourseMutation.isPending}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateCourseMutation.isPending || !title.trim()}
              className="cursor-pointer"
            >
              {updateCourseMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {updateCourseMutation.isPending ? "Actualizando..." : "Actualizar Curso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
