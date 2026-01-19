"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Settings as SettingsIcon, Layers, UserPlus, Users } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { CourseDetails } from "./course-details"
import { CourseModules } from "./course-modules"
import { CourseSettings } from "./course-settings"
import { CourseStudents } from "./course-students"
import { AssignInstructorModal } from "./assign-instructor-modal"
import { EnrollStudentsModal } from "./enroll-students-modal"
import Link from "next/link"
import { useCourse } from "@/hooks/use-course"
import { useProfileQuery } from "@/hooks/use-profile-query"

interface CourseDetailPageProps {
  initialCourse: any
  slug: string
}

export function CourseDetailPage({ initialCourse, slug }: CourseDetailPageProps) {
  const [showAssignInstructor, setShowAssignInstructor] = useState(false)
  const [showEnrollStudents, setShowEnrollStudents] = useState(false)
  const { data: course } = useCourse(slug)
  const { profile } = useProfileQuery()
  
  // Usar el curso actualizado si existe, sino usar el inicial
  const currentCourse = course || initialCourse
  const isAdmin = profile?.role === "admin"
  const isTeacher = profile?.role === "docente"

  const handleAssignSuccess = () => {
    // La query se invalida automáticamente en el hook
  }

  const tabs = [
    {
      id: "details",
      label: "Detalles",
      icon: <BookOpen className="w-4 h-4" />,
      content: <CourseDetails 
        course={currentCourse} 
        onAssignInstructorClick={isAdmin ? () => setShowAssignInstructor(true) : undefined}
        isAdmin={isAdmin}
      />
    },
    {
      id: "modules",
      label: "Módulos",
      icon: <Layers className="w-4 h-4" />,
      content: <CourseModules modules={currentCourse.modules} courseId={currentCourse.id} />
    },
    // Tab de Estudiantes (solo para docente)
    ...(isTeacher ? [{
      id: "students",
      label: "Estudiantes",
      icon: <Users className="w-4 h-4" />,
      content: <CourseStudents courseId={currentCourse.id} />
    }] : []),
    {
      id: "settings",
      label: "Configuración",
      icon: <SettingsIcon className="w-4 h-4" />,
      content: <CourseSettings course={currentCourse} />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Info header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={isAdmin ? "/admin/cursos" : "/docente/cursos"}
                className="self-start sm:self-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 wrap-break-word">{currentCourse.title}</h1>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                    currentCourse.is_published 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {currentCourse.is_published ? "PUBLICADO" : "BORRADOR"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Administra el contenido, inscripciones y configuración de este curso.
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {isAdmin && (
                <button
                  onClick={() => setShowAssignInstructor(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-base font-medium hover:bg-secondary transition-all duration-500 cursor-pointer w-full sm:w-auto"
                >
                  Asignar Instructor
                </button>
              )}
              {(isAdmin || isTeacher) && (
                <button
                  onClick={() => setShowEnrollStudents(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-base font-medium hover:bg-secondary transition-all duration-500 cursor-pointer w-full sm:w-auto"
                >
                  <UserPlus className="w-5 h-5" />
                  Inscribir Estudiantes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs tabs={tabs} defaultTab="details" />
      </div>

      {/* Assign Instructor Modal */}
      {isAdmin && (
        <AssignInstructorModal
          isOpen={showAssignInstructor}
          onClose={() => setShowAssignInstructor(false)}
          courseId={currentCourse.id}
          currentTeacherId={currentCourse.teacher_id}
          onSuccess={handleAssignSuccess}
        />
      )}

      {/* Enroll Students Modal */}
      {(isAdmin || isTeacher) && (
        <EnrollStudentsModal
          isOpen={showEnrollStudents}
          onClose={() => setShowEnrollStudents(false)}
          courseId={currentCourse.id}
          onSuccess={handleAssignSuccess}
        />
      )}
    </div>
  )
}
