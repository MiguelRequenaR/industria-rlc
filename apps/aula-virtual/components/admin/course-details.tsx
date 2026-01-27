"use client"

import { Course, Profile } from "@/types/database"

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
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                TÍTULO DEL CURSO
              </p>
              <h2 className="text-2xl font-bold text-primary">
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
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            DESCRIPCIÓN
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p>
              {course.description || "Sin descripción"}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-primary">Estadísticas del Curso</h3>
          
          <div className="space-y-4">
            {/* Total Students */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-primary">Estudiantes Inscritos</p>
                <p className="text-2xl font-bold text-primary">{course.enrollmentsCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary">Instructor</h3>
            {isAdmin && onAssignInstructorClick && (
              <button 
                onClick={onAssignInstructorClick}
                className="text-sm font-medium text-secondary hover:text-primary transition-all duration-500 cursor-pointer"
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
              <p className="text-gray-500 text-sm mb-4">No hay instructor asignado</p>
              {onAssignInstructorClick && (
                <button 
                  onClick={onAssignInstructorClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary"
                >
                  Asignar Instructor
                </button>
              )}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Fecha de creación</span>
            <span className="font-medium text-gray-900">
              {new Date(course.created_at).toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Visibilidad</span>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
              course.is_published 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700"
            }`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {course.is_published ? "Público" : "Privado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
