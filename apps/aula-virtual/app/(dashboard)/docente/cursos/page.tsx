"use client"

import { useState } from "react"
import { Search, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useTeacherCourses } from "@/hooks/use-teacher-courses"
import Link from "next/link"

export default function DocenteCursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const { data: courses, isLoading } = useTeacherCourses()
  const currentCourses = courses || []

  const filteredCourses = currentCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "published" && course.is_published) ||
      (statusFilter === "unpublished" && !course.is_published)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 py-10 min-h-screen mx-5">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase flex items-center gap-2">
              <GraduationCap className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
              Mis Cursos
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Gestiona tus cursos y contenido educativo
            Aquí está un resumen de tus cursos.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 max-w-48"
        >
          <option value="all">Todos los cursos</option>
          <option value="published">Publicados</option>
          <option value="unpublished">No publicados</option>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              {currentCourses.length === 0 ? "No tienes cursos asignados" : "No se encontraron cursos"}
            </div>
          ) : (
            <>
              {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/docente/cursos/${course.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                {/* Imagen del curso */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
                      <span className="text-4xl font-bold text-white">
                        {course.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Badge de estado */}
                  <div className="absolute top-2 right-2">
                    {course.is_published ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                        No publicado
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenido de la card */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-700 uppercase line-clamp-2 group-hover:text-secondary transition-colors">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  )}
                </div>
              </Link>
              ))}
            </>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-700 uppercase">
        <div>
          Mostrando <span className="font-medium text-gray-900">{filteredCourses.length}</span> de{" "}
          <span className="font-medium text-gray-900">{currentCourses.length}</span> cursos
        </div>
        {searchTerm || statusFilter !== "all" ? (
          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>
    </div>
  )
}
