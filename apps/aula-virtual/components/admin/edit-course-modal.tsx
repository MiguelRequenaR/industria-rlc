"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUpdateCourse } from "@/hooks/use-courses"
import type { CourseWithTeacher, CourseDifficulty, CourseModality } from "@/types/database"

interface EditCourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: CourseWithTeacher | null
}

const DIFFICULTY_OPTIONS: { value: CourseDifficulty; label: string }[] = [
  { value: "Basico", label: "Básico" },
  { value: "Intermedio", label: "Intermedio" },
  { value: "Avanzado", label: "Avanzado" },
]

const MODALITY_OPTIONS: { value: CourseModality; label: string }[] = [
  { value: "Virtual", label: "Virtual" },
  { value: "Presencial", label: "Presencial" },
  { value: "Semipresencial", label: "Semipresencial" },
]

export function EditCourseModal({ isOpen, onClose, course }: EditCourseModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [durationHours, setDurationHours] = useState(0)
  const [difficulty, setDifficulty] = useState<CourseDifficulty>("Basico")
  const [modality, setModality] = useState<CourseModality>("Virtual")
  const [courseCode, setCourseCode] = useState("")
  const updateCourseMutation = useUpdateCourse()

  useEffect(() => {
    if (course) {
      setTitle(course.title)
      setDescription(course.description || "")
      setImageUrl(course.image_url || "")
      setDurationHours(course.duration_hours ?? 0)
      setDifficulty(course.difficulty ?? "Basico")
      setModality(course.modality ?? "Virtual")
      setCourseCode(course.course_code || "")
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
        durationHours,
        difficulty,
        modality,
        courseCode: courseCode.trim() || undefined,
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
                <label htmlFor="title" className="block text-sm font-medium text-secondary mb-1">
                  Título del Curso <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Electricidad Básica para Principiantes"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={updateCourseMutation.isPending}
                  autoFocus
                />
                {title && (
                  <p className="text-xs text-secondary mt-1">
                    URL: /cursos/{title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-secondary mb-1">
                  Descripción del Curso (Opcional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe brevemente de qué trata el curso..."
                  rows={4}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary resize-none"
                  disabled={updateCourseMutation.isPending}
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-secondary mb-1">
                  URL de Imagen (Opcional)
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={updateCourseMutation.isPending}
                />
                <p className="text-xs text-secondary mt-1">
                  Enlace a una imagen de portada para el curso
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="durationHours" className="block text-sm font-medium text-secondary mb-1">
                  Duración (horas)
                </label>
                <input
                  id="durationHours"
                  type="number"
                  min={0}
                  value={durationHours === 0 ? "" : durationHours}
                  onChange={(e) => setDurationHours(e.target.value === "" ? 0 : Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={updateCourseMutation.isPending}
                />
              </div>
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-secondary mb-1">
                  Código del Curso
                </label>
                <input
                  id="courseCode"
                  type="text"
                  value={courseCode}
                  readOnly
                  disabled
                  className="w-full px-3 py-2 border border-secondary rounded-lg bg-gray-100 text-secondary cursor-not-allowed"
                />
                <p className="text-xs text-secondary mt-1">
                  El código no se puede editar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-secondary mb-1">
                  Dificultad
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as CourseDifficulty)}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={updateCourseMutation.isPending}
                >
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="modality" className="block text-sm font-medium text-secondary mb-1">
                  Modalidad
                </label>
                <select
                  id="modality"
                  value={modality}
                  onChange={(e) => setModality(e.target.value as CourseModality)}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={updateCourseMutation.isPending}
                >
                  {MODALITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
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
