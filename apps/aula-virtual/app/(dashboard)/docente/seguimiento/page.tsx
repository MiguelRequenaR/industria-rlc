"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { TrendingDown, TrendingUp, User, Eye, ClipboardList } from "lucide-react"
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
    <div className="space-y-6 py-10 min-h-screen mx-5">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Seguimiento de Estudiantes
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Monitorea el progreso de tus estudiantes y identifica quién necesita apoyo
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      {/* Selector de curso */}
      <div className="bg-secondary/20 rounded-3xl p-6">
        <label className="block text-lg font-medium text-gray-700 uppercase mb-2">
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
        <div className="rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="text-gray-700 uppercase mt-4">Cargando progreso...</p>
            </div>
          ) : studentsProgress && studentsProgress.length > 0 ? (
            <div className="p-6 space-y-4">
              {/* Leyenda */}
              <div className="flex items-center gap-6 text-xs text-gray-600 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 uppercase">Avanzado (≥70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-700 uppercase">En progreso (40-69%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-700 uppercase">Rezagado (&lt;40%)</span>
                </div>
              </div>

              {studentsProgress.map((studentProgress) => (
                <div
                  key={studentProgress.student.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-secondary/20 rounded-3xl"
                >
                  {/* Avatar y nombre */}
                  <div className="flex items-center gap-3 flex-1 min-w-0 mb-2 sm:mb-0">
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
                      <p className="text-lg font-medium text-gray-700 uppercase truncate">
                        {studentProgress.student.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-gray-700 truncate">
                        {studentProgress.student.email}
                      </p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="flex-1 max-w-full sm:max-w-md w-full mb-2 sm:mb-0">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-1 gap-1 xs:gap-0">
                      <span className="text-xs text-gray-700 uppercase">
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
                  <div className="flex justify-end sm:justify-center">
                    <Button
                      onClick={() => handleViewDetails(
                        studentProgress.student.id,
                        studentProgress.student.full_name || "Usuario"
                      )}
                      className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto uppercase cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalle
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-secondary/20 rounded-3xl">
              <User className="h-12 w-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-700 uppercase">No hay estudiantes inscritos en este curso</p>
            </div>
          )}
        </div>
      )}

      {!selectedCourseId && (
        <div className="bg-secondary/20 rounded-3xl p-12 text-center">
          <User className="h-16 w-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-700 uppercase text-lg">
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
