"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { CourseWithTeacher } from "@/types/database"
import Link from "next/link"
import { AddCourseModal } from "./add-course-modal"
import { useCourses } from "@/hooks/use-courses"

interface CoursesGridProps {
  initialCourses: CourseWithTeacher[]
}

export function CoursesGrid({ initialCourses }: CoursesGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddCourse, setShowAddCourse] = useState(false)
  
  // Usar React Query para obtener cursos actualizados
  const { data: courses } = useCourses()
  const currentCourses = courses || initialCourses

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary">Gestión de Cursos</h2>
          <p className="text-gray-500 text-sm mt-1">
            Administra los cursos del sistema
          </p>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Cards de cursos */}
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {currentCourses.length === 0 ? "No hay cursos registrados" : "No se encontraron cursos"}
          </div>
        ) : (
          <>
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/admin/cursos/${course.slug}`}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
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
                </div>

                {/* Contenido de la card */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {course.description}
                    </p>
                  )}
                  {course.teacher && (
                    <p className="text-xs text-gray-500 mt-2">
                      Docente: {course.teacher.full_name || "Sin nombre"}
                    </p>
                  )}
                </div>
              </Link>
            ))}
            {/* Card para agregar nuevo curso */}
            <button 
              onClick={() => setShowAddCourse(true)}
              className="group relative h-full min-h-[300px] border-2 border-dashed border-secondary rounded-lg hover:border-secondary hover:bg-secondary/10 transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Plus className="h-8 w-8 text-primary group-hover:text-secondary" />
              </div>
              <span className="text-lg font-medium text-primary group-hover:text-secondary">
                Agregar Curso
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
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

      {/* Modal para agregar curso */}
      <AddCourseModal
        isOpen={showAddCourse}
        onClose={() => setShowAddCourse(false)}
      />
    </div>
  )
}
