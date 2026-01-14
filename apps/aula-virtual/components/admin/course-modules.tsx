"use client"

import { ModuleWithLessons } from "@/types/database"
import { ChevronDown, ChevronRight, Plus, Video, FileText, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import { AddModuleModal } from "./add-module-modal"
import { AddLessonModal } from "./add-lesson-modal"

interface CourseModulesProps {
  modules: ModuleWithLessons[]
  courseId: string
}

export function CourseModules({ modules, courseId }: CourseModulesProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [showAddModule, setShowAddModule] = useState(false)
  const [showAddLesson, setShowAddLesson] = useState(false)
  const [selectedModule, setSelectedModule] = useState<{ id: string; name: string } | null>(null)

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev)
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId)
      } else {
        newSet.add(moduleId)
      }
      return newSet
    })
  }

  const getLessonIcon = (lesson: any) => {
    if (lesson.meeting_link) {
      return <LinkIcon className="w-4 h-4" />
    }
    if (lesson.pdf_url) {
      return <FileText className="w-4 h-4" />
    }
    return <Video className="w-4 h-4" />
  }

  const handleAddLesson = (moduleId: string, moduleName: string) => {
    setSelectedModule({ id: moduleId, name: moduleName })
    setShowAddLesson(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Módulos y Lecciones</h2>
          <p className="text-sm text-gray-500 mt-1">
            {modules.length} módulos • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lecciones
          </p>
        </div>
        <button 
          onClick={() => setShowAddModule(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Agregar Módulo
        </button>
      </div>

      {modules.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay módulos todavía</h3>
          <p className="text-gray-500 mb-6">Comienza agregando el primer módulo a este curso</p>
          <button 
            onClick={() => setShowAddModule(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
          >
            Agregar Primer Módulo
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((module, index) => {
            const isExpanded = expandedModules.has(module.id)
            
            return (
              <div key={module.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Module Header */}
                <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-300 text-primary font-semibold text-sm shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-primary">{module.title}</h3>
                      <p className="text-sm text-primary">
                        {module.lessons.length} {module.lessons.length === 1 ? "lección" : "lecciones"}
                      </p>
                    </div>

                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {module.lessons.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 text-sm mb-4">No hay lecciones en este módulo</p>
                        <button 
                          onClick={() => handleAddLesson(module.id, module.title)}
                          className="px-3 py-1.5 bg-primary text-white rounded text-xs font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
                        >
                          Agregar Lección
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-300 text-gray-600 font-medium text-xs shrink-0">
                              {lessonIndex + 1}
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                              {getLessonIcon(lesson)}
                            </div>

                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                {lesson.meeting_link && (
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    Meet Link
                                  </span>
                                )}
                                {lesson.pdf_url && (
                                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                    PDF
                                  </span>
                                )}
                                {!lesson.is_visible && (
                                  <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                                    Oculto
                                  </span>
                                )}
                              </div>
                            </div>

                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        
                        <div className="p-3">
                          <button 
                            onClick={() => handleAddLesson(module.id, module.title)}
                            className="w-full flex items-center justify-center gap-2 py-2 text-primary hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                          >
                            <Plus className="w-4 h-4" />
                            Agregar Lección
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Modales */}
      <AddModuleModal
        isOpen={showAddModule}
        onClose={() => setShowAddModule(false)}
        courseId={courseId}
      />

      {selectedModule && (
        <AddLessonModal
          isOpen={showAddLesson}
          onClose={() => {
            setShowAddLesson(false)
            setSelectedModule(null)
          }}
          moduleId={selectedModule.id}
          moduleName={selectedModule.name}
        />
      )}
    </div>
  )
}
