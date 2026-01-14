"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { TrendingDown, TrendingUp, User, Eye } from "lucide-react"
import { useTeacherCourses } from "@/hooks/use-teacher-courses"
import { useStudentsProgress } from "@/hooks/use-student-progress"
import { Button } from "@/components/ui/button"
import { StudentProgressModal } from "@/components/teacher/student-progress-modal"

export default function DocenteSeguimientoPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [selectedStudentName, setSelectedStudentName] = useState("")

  const { data: courses } = useTeacherCourses()
  const { data: studentsProgress, isLoading } = useStudentsProgress(selectedCourseId)

  const handleViewDetails = (studentId: string, studentName: string) => {
    setSelectedStudentId(studentId)
    setSelectedStudentName(studentName)
    setShowProgressModal(true)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 70) return "from-green-500 to-green-400"
    if (percentage >= 40) return "from-yellow-500 to-yellow-400"
    return "from-red-500 to-red-400"
  }

  const getProgressIcon = (percentage: number) => {
    if (percentage >= 70) return <TrendingUp className="h-5 w-5 text-green-600" />
    return <TrendingDown className="h-5 w-5 text-red-600" />
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Seguimiento de Estudiantes</h2>
        <p className="text-gray-500 text-sm mt-1">
          Monitorea el progreso de tus estudiantes y identifica quién necesita apoyo
        </p>
      </div>

      {/* Selector de curso */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona un curso
        </label>
        <Select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="max-w-md"
        >
          <option value="">-- Seleccionar curso --</option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Lista de estudiantes con progreso */}
      {selectedCourseId && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="text-gray-500 mt-4">Cargando progreso...</p>
            </div>
          ) : studentsProgress && studentsProgress.length > 0 ? (
            <div className="p-6 space-y-4">
              {/* Leyenda */}
              <div className="flex items-center gap-6 text-xs text-gray-600 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Avanzado (≥70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>En progreso (40-69%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Rezagado (&lt;40%)</span>
                </div>
              </div>

              {studentsProgress.map((studentProgress) => (
                <div
                  key={studentProgress.student.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-secondary/30 hover:shadow-md transition-all"
                >
                  {/* Avatar y nombre */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {studentProgress.student.avatar_url ? (
                      <img
                        src={studentProgress.student.avatar_url}
                        alt={studentProgress.student.full_name || "Usuario"}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                        {studentProgress.student.full_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {studentProgress.student.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {studentProgress.student.email}
                      </p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        {studentProgress.completed_lessons} de {studentProgress.total_lessons} lecciones
                      </span>
                      <div className="flex items-center gap-1">
                        {getProgressIcon(studentProgress.percentage)}
                        <span className={`text-sm font-bold ${getProgressColor(studentProgress.percentage)}`}>
                          {studentProgress.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`bg-linear-to-r ${getProgressBgColor(studentProgress.percentage)} h-full transition-all duration-500`}
                        style={{ width: `${studentProgress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Botón de detalle */}
                  <Button
                    onClick={() => handleViewDetails(
                      studentProgress.student.id,
                      studentProgress.student.full_name || "Usuario"
                    )}
                    className="bg-secondary text-white hover:bg-secondary/90"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalle
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay estudiantes inscritos en este curso</p>
            </div>
          )}
        </div>
      )}

      {!selectedCourseId && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            Selecciona un curso para ver el seguimiento de estudiantes
          </p>
        </div>
      )}

      {/* Modal de detalle */}
      {showProgressModal && (
        <StudentProgressModal
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          courseId={selectedCourseId}
          studentId={selectedStudentId}
          studentName={selectedStudentName}
        />
      )}
    </div>
  )
}
