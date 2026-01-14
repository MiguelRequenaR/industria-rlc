"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, CheckCircle2, Circle, PlayCircle, FileText, Video } from "lucide-react"
import { ModuleWithLessonsProgress } from "@/actions/student-actions"

interface CourseSidebarProps {
  modules: ModuleWithLessonsProgress[]
  currentLessonId: string | null
  onLessonClick: (lessonId: string) => void
}

export function CourseSidebar({ modules, currentLessonId, onLessonClick }: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Expandir el primer módulo por defecto
    const initial: Record<string, boolean> = {}
    if (modules.length > 0) {
      initial[modules[0].id] = true
    }
    return initial
  })

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const getLessonIcon = (lesson: { meeting_link: string | null; pdf_url: string | null }) => {
    if (lesson.meeting_link) return <Video className="h-4 w-4" />
    if (lesson.pdf_url) return <FileText className="h-4 w-4" />
    return <PlayCircle className="h-4 w-4" />
  }

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-primary">Contenido del Curso</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {modules.map((module) => (
          <div key={module.id} className="bg-white">
            {/* Header del módulo */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                {expandedModules[module.id] ? (
                  <ChevronDown className="h-5 w-5 text-secondary shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
                )}
                <span className="font-semibold text-sm text-left text-primary">
                  {module.title}
                </span>
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {module.lessons.filter(l => l.is_completed).length}/{module.lessons.length}
              </span>
            </button>

            {/* Lecciones del módulo */}
            {expandedModules[module.id] && (
              <div className="bg-gray-50">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonClick(lesson.id)}
                    className={`w-full px-4 py-3 pl-12 flex items-center gap-3 hover:bg-gray-100 transition-colors border-l-4 ${
                      currentLessonId === lesson.id
                        ? "border-secondary bg-blue-50"
                        : "border-transparent"
                    }`}
                  >
                    {/* Ícono de completado */}
                    <div className="shrink-0">
                      {lesson.is_completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    {/* Tipo de contenido */}
                    <div className="shrink-0 text-gray-500">
                      {getLessonIcon(lesson)}
                    </div>

                    {/* Título de la lección */}
                    <span
                      className={`text-sm text-left flex-1 ${
                        currentLessonId === lesson.id
                          ? "font-semibold text-secondary"
                          : lesson.is_completed
                          ? "text-gray-700"
                          : "text-gray-600"
                      }`}
                    >
                      {index + 1}. {lesson.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
