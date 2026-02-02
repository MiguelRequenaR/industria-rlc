"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Plus, EllipsisVertical, Edit, GraduationCap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { CourseWithTeacher } from "@/types/database"
import Link from "next/link"
import { AddCourseModal } from "./add-course-modal"
import { EditCourseModal } from "./edit-course-modal"
import { useCourses } from "@/hooks/use-courses"

interface CoursesGridProps {
  initialCourses: CourseWithTeacher[]
}

export function CoursesGrid({ initialCourses }: CoursesGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [showEditCourse, setShowEditCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseWithTeacher | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Usar React Query para obtener cursos actualizados
  const { data: courses } = useCourses()
  const currentCourses = courses || initialCourses

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEditCourse = (course: CourseWithTeacher) => {
    setSelectedCourse(course)
    setShowEditCourse(true)
    setOpenMenuId(null)
  }

  const toggleMenu = (courseId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenuId(openMenuId === courseId ? null : courseId)
  }

  const filteredCourses = currentCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "published" && course.is_published && !course.deleted_at) ||
      (statusFilter === "unpublished" && !course.is_published && !course.deleted_at) ||
      (statusFilter === "archived" && !!course.deleted_at)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 min-h-screen mx-5 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Cursos
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Gestiona los cursos de tu plataforma
          </p>
        </div>
        {/* Decorative elements */}
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
          <option value="archived">Archivados</option>
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
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
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
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    {
                      course.deleted_at ? (
                        <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                          Archivado
                        </span>
                      ) : course.is_published ? (
                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                          Publicado
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                          No publicado
                        </span>
                      )
                    }
                    <button
                      onClick={(e) => toggleMenu(course.id, e)}
                      className="p-1 rounded-full text-gray-600 bg-white transition-colors cursor-pointer"
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </button>
                    
                    {openMenuId === course.id && (
                      <div 
                        ref={menuRef}
                        className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
                      >
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenido de la card */}
                <Link
                  href={`/admin/cursos/${course.slug}`}
                  className="block p-4 space-y-2 group-hover:text-secondary transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-700 uppercase line-clamp-2 group-hover:text-secondary transition-colors">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {course.description}
                    </p>
                  )}
                  {course.teacher && (
                    <p className="text-xs text-gray-500 mt-2">
                      Docente: {course.teacher.full_name || "Sin nombre"}
                    </p>
                  )}
                </Link>
              </div>
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
        <div className="uppercase">
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

      {/* Modal para editar curso */}
      <EditCourseModal
        isOpen={showEditCourse}
        onClose={() => {
          setShowEditCourse(false)
          setSelectedCourse(null)
        }}
        course={selectedCourse}
      />
    </div>
  )
}
