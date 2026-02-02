"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUpdateGrade } from "@/hooks/use-grades"
import { Grade } from "@/types/database"

interface EditGradeModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  grade: Grade
  studentName: string
}

export function EditGradeModal({ isOpen, onClose, courseId, grade, studentName }: EditGradeModalProps) {
  const [itemName, setItemName] = useState(grade.item_name)
  const [score, setScore] = useState(grade.score?.toString() || "")
  const [feedback, setFeedback] = useState(grade.feedback || "")

  const updateGradeMutation = useUpdateGrade()

  useEffect(() => {
    setItemName(grade.item_name)
    setScore(grade.score?.toString() || "")
    setFeedback(grade.feedback || "")
  }, [grade])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const scoreNumber = parseFloat(score)
    if (isNaN(scoreNumber)) {
      return
    }

    await updateGradeMutation.mutateAsync({
      gradeId: grade.id,
      courseId,
      updates: {
        item_name: itemName,
        score: scoreNumber,
        feedback: feedback || undefined,
      },
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader onClose={onClose}>
          <DialogTitle>Editar Calificación</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          <p className="text-sm text-gray-700 uppercase mb-4">
            Estudiante: <span className="font-semibold text-secondary">{studentName}</span>
          </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              Concepto <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ej: Examen Final, Tarea 1, Proyecto..."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              Nota <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              max="20"
              placeholder="0 - 20"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              Retroalimentación (Opcional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-700 text-sm"
              rows={3}
              placeholder="Comentarios sobre el desempeño del estudiante..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateGradeMutation.isPending}
              className="flex-1 bg-secondary text-white hover:bg-secondary/90 cursor-pointer uppercase"
            >
              {updateGradeMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
