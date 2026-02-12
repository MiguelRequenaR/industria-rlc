"use client"

import { useStudentsByCourse } from "@/hooks/use-grades"
import { Mail, User, Calendar, CheckCircle, AlertCircle } from "lucide-react"

interface CourseStudentsProps {
  courseId: string
}

export function CourseStudents({ courseId }: CourseStudentsProps) {
  const { data: students, isLoading } = useStudentsByCourse(courseId)

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="bg-secondary/20 rounded-3xl p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="text-gray-700 uppercase mt-4">Cargando estudiantes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!students || students.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-secondary/20 rounded-3xl p-12">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center bg-secondary/20 rounded-full justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 uppercase mb-2">
              No hay estudiantes inscritos
            </h3>
            <p className="text-gray-700 uppercase">
              Este curso aún no tiene estudiantes inscritos. Usa el botón "Inscribir Estudiantes" para agregar estudiantes.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-700 uppercase">Estudiantes Inscritos</h2>
          <p className="text-sm text-gray-700 uppercase mt-1">
            {students.length} {students.length === 1 ? "estudiante inscrito" : "estudiantes inscritos"} en este curso
          </p>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="bg-white rounded-lg border-2 border-secondary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Fecha de Inscripción
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
                  Calificaciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {student.avatar_url ? (
                        <img
                          src={student.avatar_url}
                          alt={student.full_name || "Usuario"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {(student.full_name || "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700 uppercase">
                          {student.full_name || "Sin nombre"}
                        </p>
                        <p className="text-xs text-gray-500">ID: {student.student_id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="h-4 w-4 text-secondary" />
                      {student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="h-4 w-4 text-secondary" />
                      {student.enrolled_at 
                        ? new Date(student.enrolled_at).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      {student.grades && student.grades.length > 0 ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {student.grades.length}
                          </span>
                          <span className="text-xs text-gray-700 uppercase">
                            {student.grades.length === 1 ? "calificación" : "calificaciones"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-700 uppercase">Sin calificaciones</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary/20 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg text-blue-500 uppercase">Total Estudiantes</p>
              <p className="text-2xl font-bold text-blue-500">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-lg text-green-500 uppercase">Con Calificaciones</p>
              <p className="text-2xl font-bold text-green-500">
                {students.filter(s => s.grades && s.grades.length > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-lg text-orange-500 uppercase">Sin Calificaciones</p>
              <p className="text-2xl font-bold text-orange-500">
                {students.filter(s => !s.grades || s.grades.length === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
