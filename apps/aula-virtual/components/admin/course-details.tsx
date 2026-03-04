"use client"

import { Course, Profile } from "@/types/database"
import { Users } from "lucide-react"

interface CourseDetailsProps {
  course: Course & {
    teacher: Profile | null
    enrollmentsCount: number
  }
  onEditClick?: () => void
  onAssignInstructorClick?: () => void
  isAdmin?: boolean
}

export function CourseDetails({ course, onEditClick, onAssignInstructorClick, isAdmin = true }: CourseDetailsProps) {
  const isArchived = !!course.deleted_at
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contenido principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Imagen del curso */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="relative w-full h-64 bg-gray-100">
            {course.image_url ? (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary to-blue-600">
                <span className="text-6xl font-bold text-white">
                  {course.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Información del curso */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Título del curso
              </p>
              <h2 className="text-2xl font-bold text-gray-700 uppercase">
                {course.title}
              </h2>
            </div>
            {onEditClick && (
              <button
                onClick={onEditClick}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {/* Descripción */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Descripción
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p>
              {course.description || "Sin descripción"}
            </p>
          </div>
        </div>

        {/* Información adicional del curso */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Información del curso
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                Fecha de inicio
              </p>
              <p className="mt-1 font-medium uppercase">
                {course.start_date
                  ? new Date(course.start_date).toLocaleDateString("es-ES")
                  : "Sin definir"}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                Fecha de finalización
              </p>
              <p className="mt-1 font-medium uppercase">
                {course.end_date
                  ? new Date(course.end_date).toLocaleDateString("es-ES")
                  : "Sin definir"}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                Precio
              </p>
              <p className="mt-1 font-medium uppercase">
                {typeof course.price === "number"
                  ? course.price.toLocaleString("es-PE", {
                      style: "currency",
                      currency: "PEN",
                      minimumFractionDigits: 2,
                    })
                  : "Sin definir"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-700 uppercase">Estadísticas del Curso</h3>

          <div className="space-y-4">
            {/* Total Students */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-gray-700 uppercase">Estudiantes Inscritos</p>
                <p className="text-2xl font-bold text-gray-700">{course.enrollmentsCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 uppercase">Instructor</h3>
            {isAdmin && onAssignInstructorClick && (
              <button
                onClick={onAssignInstructorClick}
                className="text-sm font-medium text-gray-700 uppercase border border-gray-700 rounded-lg px-4 py-2 cursor-pointer"
              >
                Cambiar Instructor
              </button>
            )}
          </div>

          {course.teacher ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
                  {course.teacher.avatar_url ? (
                    <img
                      src={course.teacher.avatar_url}
                      alt={course.teacher.full_name || "Instructor"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl font-bold">
                      {course.teacher.full_name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-primary">
                  {course.teacher.full_name || "Sin nombre"}
                </h4>
                <p className="text-sm text-primary">
                  {course.teacher.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-700 uppercase text-sm mb-4">
                {isArchived ? "Curso archivado. No se puede asignar instructor." : "No hay instructor asignado"}
              </p>
              {onAssignInstructorClick && (
                <button
                  onClick={!isArchived ? onAssignInstructorClick : undefined}
                  disabled={isArchived}
                  className={`px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto transition-all duration-500 uppercase
                    ${isArchived
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                      : "text-gray-700 border border-gray-700 cursor-pointer"
                    }`}
                >
                  Asignar Instructor
                </button>
              )}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-secondary/20 rounded-3xl p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700 uppercase">Fecha de creación</span>
            <span className="font-medium text-gray-700 uppercase">
              {new Date(course.created_at).toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 uppercase">Visibilidad</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                isArchived
                  ? "bg-yellow-100 text-yellow-700"
                  : course.is_published
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isArchived
                    ? "bg-yellow-400"
                    : course.is_published
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              ></span>
              {isArchived ? "Archivado" : course.is_published ? "Público" : "Privado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
