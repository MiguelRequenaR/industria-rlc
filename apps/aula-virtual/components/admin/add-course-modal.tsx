"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCreateCourse } from "@/hooks/use-courses"
import type { CourseDifficulty, CourseModality } from "@/types/database"

interface AddCourseModalProps {
  isOpen: boolean
  onClose: () => void
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

const RLC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function generatePreviewCode(): string {
  let suffix = ""
  for (let i = 0; i < 4; i++) {
    suffix += RLC_CHARS[Math.floor(Math.random() * RLC_CHARS.length)]
  }
  return `RLC-${suffix}`
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [durationHours, setDurationHours] = useState(0)
  const [difficulty, setDifficulty] = useState<CourseDifficulty>("Basico")
  const [modality, setModality] = useState<CourseModality>("Virtual")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [price, setPrice] = useState(0)
  const [previewCode, setPreviewCode] = useState("")
  const createCourseMutation = useCreateCourse()

  useEffect(() => {
    if (isOpen) {
      setPreviewCode(generatePreviewCode())
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    createCourseMutation.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        durationHours,
        difficulty,
        modality,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        price,
      },
      {
        onSuccess: () => {
          setTitle("")
          setDescription("")
          setImageUrl("")
          setDurationHours(0)
          setDifficulty("Basico")
          setModality("Virtual")
          setStartDate("")
          setEndDate("")
          setPrice(0)
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!createCourseMutation.isPending) {
      setTitle("")
      setDescription("")
      setImageUrl("")
      setDurationHours(0)
      setDifficulty("Basico")
      setModality("Virtual")
      setStartDate("")
      setEndDate("")
      setPrice(0)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl uppercase">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Crear Nuevo Curso</DialogTitle>
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
                  disabled={createCourseMutation.isPending}
                  autoFocus
                />
                {title && (
                  <p className="text-xs text-gray-500 mt-1">
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
                  disabled={createCourseMutation.isPending}
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
                  disabled={createCourseMutation.isPending}
                />
                <p className="text-xs text-secondary mt-1">
                  Enlace a una imagen de portada para el curso
                </p>
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
                    disabled={createCourseMutation.isPending}
                  />
                </div>
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-medium text-secondary mb-1">
                    Código del Curso
                  </label>
                  <input
                    id="courseCode"
                    type="text"
                    value={previewCode}
                    readOnly
                    disabled
                    className="w-full px-3 py-2 border border-secondary rounded-lg bg-gray-100 text-secondary cursor-not-allowed"
                  />
                  <p className="text-xs text-secondary mt-1">
                    El código es generado de manera aleatoria.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-secondary mb-1">
                    Fecha de inicio
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                    disabled={createCourseMutation.isPending}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-secondary mb-1">
                    Fecha de finalización
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                    disabled={createCourseMutation.isPending}
                  />
                </div>
              </div>

              <div className="mt-1">
                <label htmlFor="price" className="block text-sm font-medium text-secondary mb-1">
                  Precio
                </label>
                <input
                  id="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={price === 0 ? "" : price}
                  onChange={(e) => setPrice(e.target.value === "" ? 0 : Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={createCourseMutation.isPending}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-secondary mb-1">
                    Dificultad
                  </label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as CourseDifficulty)}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                    disabled={createCourseMutation.isPending}
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
                    disabled={createCourseMutation.isPending}
                  >
                    {MODALITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> El curso se creará como borrador. Podrás agregar módulos, lecciones y configurarlo antes de publicarlo.
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createCourseMutation.isPending}
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createCourseMutation.isPending || !title.trim()}
              className="cursor-pointer uppercase"
            >
              {createCourseMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {createCourseMutation.isPending ? "Creando..." : "Crear Curso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
