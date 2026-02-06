"use client"

import { Course } from "@/types/database"
import { useEffect, useState } from "react"
import { updateCourseSettings } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"

interface CourseSettingsProps {
  course: Course
}

export function CourseSettings({ course }: CourseSettingsProps) {
  const [isPublished, setIsPublished] = useState(course.is_published)
  const [isSaving, setIsSaving] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [isUnarchiving, setIsUnarchiving] = useState(false)
  const queryClient = useQueryClient()
  const isArchived = !!course.deleted_at

  useEffect(() => {
    setIsPublished(course.deleted_at ? false : course.is_published)
  }, [course.is_published, course.deleted_at])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateCourseSettings(course.id, { is_published: isPublished })
      if (result.success) {
        toast.success("Configuración actualizada correctamente")
        queryClient.invalidateQueries({ queryKey: ["course", course.slug] })
        queryClient.invalidateQueries({ queryKey: ["courses"] })
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] })
      } else {
        toast.error(result.error || "Error al actualizar configuración")
        setIsPublished(course.is_published)
      }
    } catch (error) {
      toast.error("Error al actualizar configuración")
      setIsPublished(course.is_published)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsPublished(course.is_published)
    toast.info("Cambios descartados")
  }

  const hasChanges = isPublished !== course.is_published

  const handleArchiveCourse = async () => {
    const confirmed = window.confirm(
      "¿Seguro que quieres archivar este curso?\n\n" +
      "El curso dejará de ser visible para los estudiantes, " +
      "pero se conservarán matrículas, progreso, notas y certificados."
    )
    if (!confirmed) return

    setIsArchiving(true)
    try {
      const result = await updateCourseSettings(course.id, {
        is_published: false,
        deleted_at: new Date().toISOString()
      })

      if (result.success) {
        toast.success("Curso archivado correctamente")
        queryClient.invalidateQueries({ queryKey: ["course", course.slug] })
        queryClient.invalidateQueries({ queryKey: ["courses"] })
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] })
      } else {
        toast.error(result.error || "No se pudo archivar el curso")
      }
    } catch (error) {
      toast.error("Error al archivar el curso")
    } finally {
      setIsArchiving(false)
    }
  }

  const handleUnarchiveCourse = async () => {
    const confirmed = window.confirm(
      "¿Seguro que quieres desarchivar este curso?\n\n" +
      "El curso volverá a estar activo. Quedará como borrador hasta que lo publiques."
    )
    if (!confirmed) return

    setIsUnarchiving(true)
    try {
      const result = await updateCourseSettings(course.id, {
        deleted_at: null,
        is_published: false,
      })

      if (result.success) {
        toast.success("Curso desarchivado correctamente")
        setIsPublished(false)
        queryClient.invalidateQueries({ queryKey: ["course", course.slug] })
        queryClient.invalidateQueries({ queryKey: ["courses"] })
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] })
      } else {
        toast.error(result.error || "No se pudo desarchivar el curso")
      }
    } catch (error) {
      toast.error("Error al desarchivar el curso")
    } finally {
      setIsUnarchiving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-700 uppercase">Configuración del Curso</h2>
        <p className="text-sm text-gray-700 uppercase mt-1">
          Administra la configuración y visibilidad del curso
        </p>
      </div>

      {/* Visibilidad */}
      <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 uppercase mb-1">Visibilidad del Curso</h3>
          <p className="text-sm text-gray-700 uppercase">
            {isArchived
              ? "Este curso está archivado y no puede publicarse."
              : "Controla si el curso es visible para los estudiantes"}
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-700 uppercase">Publicar Curso</h4>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${
                isArchived
                  ? "bg-red-100 text-red-700"
                  : isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
              }`}>
                {isArchived ? "Archivado" : isPublished ? "Publicado" : "Borrador"}
              </span>
            </div>
            <p className="text-sm text-gray-700 uppercase mt-1">
              {isArchived
                ? "El curso no es visible para estudiantes y no admite cambios de visibilidad."
                : isPublished
                  ? "El curso es visible para todos los estudiantes"
                  : "El curso solo es visible para administradores y docentes"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              disabled={isArchived}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Información General */}
      <div className="bg-secondary/20 rounded-3xl p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 uppercase mb-1">Información General</h3>
          <p className="text-sm text-gray-700 uppercase">
            Información básica del curso
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Slug del Curso
            </label>
            <input
              type="text"
              value={course.slug}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-700 mt-1">
              URL: /cursos/{course.slug}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Código del Curso
            </label>
            <input
              type="text"
              value={course.course_code ?? "—"}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Duración (horas)
            </label>
            <input
              type="text"
              value={course.duration_hours ?? 0}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Dificultad
            </label>
            <input
              type="text"
              value={course.difficulty ?? "—"}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Modalidad
            </label>
            <input
              type="text"
              value={course.modality ?? "—"}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              ID del Curso
            </label>
            <input
              type="text"
              value={course.id}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">
              Fecha de Creación
            </label>
            <input
              type="text"
              value={new Date(course.created_at).toLocaleString("es-ES")}
              disabled
              className="w-full px-3 py-2 rounded-3xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Acciones Peligrosas */}
      <div className={`bg-red-100 rounded-3xl p-6 space-y-4 ${isArchived ? "border-yellow-200" : "border-red-200"}`}>
        <div>
          <h3 className={`font-semibold mb-1 ${isArchived ? "text-yellow-900" : "text-red-700"} uppercase`}>
            Zona de Peligro
          </h3>
          <p className={`text-sm ${isArchived ? "text-yellow-700" : "text-red-600"} uppercase`}>
            {isArchived
              ? "Este curso está archivado. Puedes activarlo nuevamente (quedará como borrador)."
              : "Acciones irreversibles que afectan permanentemente al curso"}
          </p>
        </div>

        <div className="space-y-3">
          {isArchived ? (
            <div className="flex items-center justify-between p-4 border border-red-500 rounded-lg">
              <div>
                <h4 className="font-medium text-red-700 uppercase">Desarchivar Curso</h4>
                <p className="text-sm text-gray-700 uppercase">
                  Reactiva el curso. Luego podrás publicarlo manualmente si lo deseas.
                </p>
              </div>
              <button
                onClick={handleUnarchiveCourse}
                disabled={isUnarchiving}
                className={`px-4 py-2 rounded-lg text-sm font-medium uppercase ${
                  isUnarchiving
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                }`}
              >
                {isUnarchiving ? "Activando..." : "Activar Curso"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-red-600 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-700 uppercase">Archivar Curso</h4>
                <p className="text-sm text-gray-700 uppercase">
                  El curso dejará de ser visible para estudiantes, pero se conservará el historial.
                </p>
              </div>
              <button
                onClick={handleArchiveCourse}
                disabled={isArchiving}
                className={`px-4 py-2 rounded-lg text-sm font-medium uppercase ${
                  isArchiving
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                }`}
              >
                {isArchiving ? "Archivando..." : "Archivar"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Botón de Guardar */}
      {hasChanges && (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 font-medium uppercase">
            Tienes cambios sin guardar
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed uppercase cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 uppercase cursor-pointer"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
