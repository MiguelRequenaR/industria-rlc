"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Settings as SettingsIcon, Layers } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { CourseDetails } from "./course-details"
import { CourseModules } from "./course-modules"
import { CourseSettings } from "./course-settings"
import { AssignInstructorModal } from "./assign-instructor-modal"
import Link from "next/link"
import { useCourse } from "@/hooks/use-course"

interface CourseDetailPageProps {
  initialCourse: any
  slug: string
}

export function CourseDetailPage({ initialCourse, slug }: CourseDetailPageProps) {
  const [showAssignInstructor, setShowAssignInstructor] = useState(false)
  const { data: course } = useCourse(slug)
  
  // Usar el curso actualizado si existe, sino usar el inicial
  const currentCourse = course || initialCourse

  const handleAssignSuccess = () => {
    // La query se invalida automáticamente en el hook
  }

  const tabs = [
    {
      id: "details",
      label: "Detalles",
      icon: <BookOpen className="w-4 h-4" />,
      content: <CourseDetails course={currentCourse} onAssignInstructorClick={() => setShowAssignInstructor(true)} />
    },
    {
      id: "modules",
      label: "Módulos",
      icon: <Layers className="w-4 h-4" />,
      content: <CourseModules modules={currentCourse.modules} courseId={currentCourse.id} />
    },
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/cursos"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{currentCourse.title}</h1>
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAssignInstructor(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-base font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
              >
                Asignar Instructor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs tabs={tabs} defaultTab="details" />
      </div>

      {/* Assign Instructor Modal */}
      <AssignInstructorModal
        isOpen={showAssignInstructor}
        onClose={() => setShowAssignInstructor(false)}
        courseId={currentCourse.id}
        currentTeacherId={currentCourse.teacher_id}
        onSuccess={handleAssignSuccess}
      />
    </div>
  )
}
