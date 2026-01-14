"use client"

import { Course } from "@/types/database"
import { useState } from "react"

interface CourseSettingsProps {
  course: Course
}

export function CourseSettings({ course }: CourseSettingsProps) {
  const [isPublished, setIsPublished] = useState(course.is_published)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configuración del Curso</h2>
        <p className="text-sm text-gray-500 mt-1">
          Administra la configuración y visibilidad del curso
        </p>
      </div>

      {/* Visibilidad */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Visibilidad del Curso</h3>
          <p className="text-sm text-gray-500">
            Controla si el curso es visible para los estudiantes
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">Publicar Curso</h4>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                isPublished 
                  ? "bg-green-100 text-green-700" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                {isPublished ? "Publicado" : "Borrador"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {isPublished 
                ? "El curso es visible para todos los estudiantes" 
                : "El curso solo es visible para administradores y docentes"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Información General */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Información General</h3>
          <p className="text-sm text-gray-500">
            Información básica del curso
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug del Curso
            </label>
            <input
              type="text"
              value={course.slug}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: /cursos/{course.slug}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID del Curso
            </label>
            <input
              type="text"
              value={course.id}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Creación
            </label>
            <input
              type="text"
              value={new Date(course.created_at).toLocaleString("es-ES")}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Acciones Peligrosas */}
      <div className="bg-white rounded-lg border border-red-200 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Zona de Peligro</h3>
          <p className="text-sm text-red-600">
            Acciones irreversibles que afectan permanentemente al curso
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Eliminar Curso</h4>
              <p className="text-sm text-gray-500">
                Elimina permanentemente este curso y todos sus datos
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Botón de Guardar */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Guardar Cambios
        </button>
      </div>
    </div>
  )
}
