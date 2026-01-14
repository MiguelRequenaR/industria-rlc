"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from "@/components/ui/dialog"
import { CheckCircle2, Circle } from "lucide-react"
import { useStudentLessonsProgress } from "@/hooks/use-student-progress"

interface StudentProgressModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  studentId: string
  studentName: string
}

export function StudentProgressModal({ 
  isOpen, 
  onClose, 
  courseId, 
  studentId, 
  studentName 
}: StudentProgressModalProps) {
  const { data: lessonsProgress, isLoading } = useStudentLessonsProgress(courseId, studentId)

  const completedCount = lessonsProgress?.filter(l => l.is_completed).length || 0
  const totalCount = lessonsProgress?.length || 0
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader onClose={onClose}>
          <div>
            <DialogTitle>Detalle de Progreso</DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Estudiante: <span className="font-semibold text-secondary">{studentName}</span>
            </p>
          </div>
        </DialogHeader>
        
        <DialogBody>

        {/* Resumen de progreso */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progreso general
            </span>
            <span className="text-2xl font-bold text-secondary">
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-linear-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedCount} de {totalCount} lecciones completadas
          </p>
        </div>

        {/* Lista de lecciones */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : lessonsProgress && lessonsProgress.length > 0 ? (
          <div className="space-y-2">
            {lessonsProgress.map((lessonProgress, index) => (
              <div
                key={lessonProgress.lesson.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  lessonProgress.is_completed
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {lessonProgress.is_completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    lessonProgress.is_completed ? "text-green-900" : "text-gray-900"
                  }`}>
                    {lessonProgress.lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Módulo: {lessonProgress.lesson.module_title}
                  </p>
                  {lessonProgress.is_completed && lessonProgress.completed_at && (
                    <p className="text-xs text-green-600 mt-1">
                      Completada el {new Date(lessonProgress.completed_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No hay lecciones en este curso</p>
          </div>
        )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
