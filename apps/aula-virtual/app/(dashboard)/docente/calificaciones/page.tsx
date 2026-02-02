"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, FileText, Award } from "lucide-react"
import { useTeacherCourses } from "@/hooks/use-teacher-courses"
import { useStudentsByCourse, useDeleteGrade } from "@/hooks/use-grades"
import { AddGradeModal } from "@/components/teacher/add-grade-modal"
import { EditGradeModal } from "@/components/teacher/edit-grade-modal"
import { Grade } from "@/types/database"

export default function DocenteCalificacionesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [showAddGradeModal, setShowAddGradeModal] = useState(false)
  const [showEditGradeModal, setShowEditGradeModal] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [selectedStudentName, setSelectedStudentName] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)

  const { data: courses } = useTeacherCourses()
  const { data: studentsWithGrades, isLoading } = useStudentsByCourse(selectedCourseId)
  const deleteGradeMutation = useDeleteGrade()

  const handleAddGrade = (studentId: string, studentName: string) => {
    setSelectedStudentId(studentId)
    setSelectedStudentName(studentName)
    setShowAddGradeModal(true)
  }

  const handleEditGrade = (grade: Grade, studentName: string) => {
    setSelectedGrade(grade)
    setSelectedStudentName(studentName)
    setShowEditGradeModal(true)
  }

  const handleDeleteGrade = async (gradeId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta calificación?")) {
      await deleteGradeMutation.mutateAsync({
        gradeId,
        courseId: selectedCourseId,
      })
    }
  }

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return 0
    const sum = grades.reduce((acc, grade) => acc + (grade.score || 0), 0)
    return (sum / grades.length).toFixed(2)
  }

  return (
    <div className="space-y-6 py-10 min-h-screen mx-5">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase flex items-center gap-2">
              <Award className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
              Calificaciones
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Gestiona las notas de tus estudiantes
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

      {/* Tabla de estudiantes con calificaciones */}
      {selectedCourseId && (
        <div className="bg-secondary/20 rounded-lg border-2 border-secondary overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="text-gray-700 uppercase mt-4">Cargando estudiantes...</p>
            </div>
          ) : studentsWithGrades && studentsWithGrades.length > 0 ? (
            <div className="overflow-x-auto shadow-2xl">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Estudiante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Calificaciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Promedio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsWithGrades.map((item) => (
                    <tr key={item.student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.student.avatar_url ? (
                            <img
                              src={item.student.avatar_url}
                              alt={item.student.full_name || "Usuario"}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                              {item.student.full_name?.charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-700 uppercase">
                              {item.student.full_name || "Sin nombre"}
                            </div>
                            <div className="text-xs text-gray-700">{item.student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.grades.length > 0 ? (
                          <div className="space-y-2">
                            {item.grades.map((grade) => (
                              <div
                                key={grade.id}
                                className="flex items-center justify-between gap-2 p-2 bg-secondary/20 rounded-3xl px-4"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-700 uppercase">
                                    {grade.item_name}
                                  </p>
                                  {grade.feedback && (
                                    <p className="text-xs text-gray-700 mt-1 line-clamp-1 uppercase">
                                      {grade.feedback}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-secondary">
                                    {grade.score}
                                  </span>
                                  <button
                                    onClick={() => handleEditGrade(grade, item.student.full_name || "Usuario")}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteGrade(grade.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Eliminar"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Sin calificaciones</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-2xl font-bold text-secondary">
                          {calculateAverage(item.grades)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          onClick={() => handleAddGrade(item.student.id, item.student.full_name || "Usuario")}
                          className="bg-secondary text-white hover:bg-secondary/90 uppercase"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Nota
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay estudiantes inscritos en este curso</p>
            </div>
          )}
        </div>
      )}

      {!selectedCourseId && (
        <div className="bg-secondary/20 rounded-3xl p-12 text-center">
          <FileText className="h-16 w-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-700 uppercase text-lg">
            Selecciona un curso para ver las calificaciones
          </p>
        </div>
      )}

      {/* Modales */}
      {showAddGradeModal && (
        <AddGradeModal
          isOpen={showAddGradeModal}
          onClose={() => setShowAddGradeModal(false)}
          courseId={selectedCourseId}
          studentId={selectedStudentId}
          studentName={selectedStudentName}
        />
      )}

      {showEditGradeModal && selectedGrade && (
        <EditGradeModal
          isOpen={showEditGradeModal}
          onClose={() => setShowEditGradeModal(false)}
          courseId={selectedCourseId}
          grade={selectedGrade}
          studentName={selectedStudentName}
        />
      )}
    </div>
  )
}
