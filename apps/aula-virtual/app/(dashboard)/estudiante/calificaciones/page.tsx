"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { Award, TrendingUp, MessageCircle, FileText, Trophy } from "lucide-react"
import { useStudentGrades } from "@/hooks/use-student-grades"
import { CertificateButton } from "@/components/certificates/CertificateButton"
import { useProfileQuery } from "@/hooks/use-profile-query"

export default function EstudianteCalificacionesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const { data: gradesByCourse, isLoading } = useStudentGrades()
  const { profile } = useProfileQuery()

  const selectedCourse = gradesByCourse?.find(c => c.course.id === selectedCourseId)

  return (
    <div className="space-y-6 py-10 min-h-screen mx-5">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Mis Calificaciones
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Revisa tu rendimiento académico en cada curso
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
          {gradesByCourse?.map((item) => (
            <option key={item.course.id} value={item.course.id}>
              {item.course.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Contenido de calificaciones */}
      {selectedCourse && (
        <>
          {/* Sección de Certificado */}
          {profile?.full_name && (
            <CertificateButton 
              courseId={selectedCourse.course.id}
              courseName={selectedCourse.course.title}
              studentName={profile.full_name}
            />
          )}

          {/* Resumen del promedio */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border-2 border-blue-200">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Promedio General
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-blue-900">
                    {selectedCourse.average.toFixed(2)}
                  </span>
                  <span className="text-2xl text-blue-700">/20</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-blue-700">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {selectedCourse.grades.length} {selectedCourse.grades.length === 1 ? 'calificación' : 'calificaciones'}
                </span>
              </div>
            </div>
          </div>

          {/* Tabla de calificaciones */}
          {selectedCourse.grades.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border-2 border-secondary overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        Actividad
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider">
                        Nota
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        Retroalimentación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedCourse.grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 uppercase">
                                {grade.item_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-flex items-center gap-1 px-4 py-2 rounded-full font-bold text-lg ${
                            (grade.score || 0) >= 14
                              ? "bg-green-100 text-green-800"
                              : (grade.score || 0) >= 11
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            <Award className="h-4 w-4" />
                            {grade.score !== null ? grade.score.toFixed(2) : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {grade.feedback ? (
                            <div className="flex items-start gap-2 max-w-md">
                              <MessageCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {grade.feedback}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-700 uppercase">
                              Sin comentarios
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-700 uppercase">
                            {new Date(grade.created_at).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-secondary/20 rounded-3xl p-12 text-center">
              <Award className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                No hay calificaciones registradas
              </h3>
              <p className="text-gray-700 uppercase">
                Aún no tienes calificaciones en este curso
              </p>
            </div>
          )}
        </>
      )}

      {/* Estado inicial */}
      {!selectedCourseId && !isLoading && (
        <div className="bg-secondary/20 rounded-3xl p-12 text-center">
          <Award className="h-16 w-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-700 uppercase text-lg">
            Selecciona un curso para ver tus calificaciones
          </p>
        </div>
      )}

      {/* Vista de todos los cursos (resumen) */}
      {!selectedCourseId && gradesByCourse && gradesByCourse.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gradesByCourse.map((item) => (
            <button
              key={item.course.id}
              onClick={() => setSelectedCourseId(item.course.id)}
              className="bg-secondary/20 rounded-3xl p-6 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-700 uppercase line-clamp-1">
                    {item.course.title}
                  </h3>
                  <p className="text-sm text-gray-700 uppercase">
                    {item.grades.length} {item.grades.length === 1 ? 'nota' : 'notas'}
                  </p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-secondary">
                  {item.average > 0 ? item.average.toFixed(2) : "—"}
                </span>
                {item.average > 0 && (
                  <span className="text-lg text-gray-500">/20</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12 bg-secondary/20 rounded-3xl p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="text-gray-700 uppercase mt-4">Cargando calificaciones...</p>
        </div>
      )}
    </div>
  )
}
