"use client"

import { ModuleWithLessons } from "@/types/database"
import { ChevronDown, ChevronRight, Plus, Video, FileText, Link as LinkIcon, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { AddModuleModal } from "./add-module-modal"
import { AddLessonModal } from "./add-lesson-modal"
import { EditModuleModal } from "./edit-module-modal"
import { EditLessonModal } from "./edit-lesson-modal"
import { useDeleteModule, useDeleteLesson } from "@/hooks/use-course"

interface CourseModulesProps {
  modules: ModuleWithLessons[]
  courseId: string
  canEdit?: boolean
}

export function CourseModules({ modules, courseId, canEdit = false }: CourseModulesProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [showAddModule, setShowAddModule] = useState(false)
  const [showAddLesson, setShowAddLesson] = useState(false)
  const [selectedModule, setSelectedModule] = useState<{ id: string; name: string } | null>(null)
  
  // Estados para edición
  const [showEditModule, setShowEditModule] = useState(false)
  const [editingModule, setEditingModule] = useState<{ id: string; title: string } | null>(null)
  const [showEditLesson, setShowEditLesson] = useState(false)
  const [editingLesson, setEditingLesson] = useState<{
    id: string
    moduleName: string
    title: string
    meetingLink?: string
    pdfUrl?: string
    isVisible: boolean
  } | null>(null)
  
  // Estados para menús dropdown
  const [openModuleMenu, setOpenModuleMenu] = useState<string | null>(null)
  const [openLessonMenu, setOpenLessonMenu] = useState<string | null>(null)
  
  const deleteModuleMutation = useDeleteModule()
  const deleteLessonMutation = useDeleteLesson()

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

  const handleEditModule = (moduleId: string, moduleTitle: string) => {
    setEditingModule({ id: moduleId, title: moduleTitle })
    setShowEditModule(true)
    setOpenModuleMenu(null)
  }

  const handleDeleteModule = (moduleId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este módulo? Se eliminarán todas sus lecciones.")) {
      deleteModuleMutation.mutate(moduleId)
      setOpenModuleMenu(null)
    }
  }

  const handleEditLesson = (
    lessonId: string,
    moduleName: string,
    lessonData: {
      title: string
      meetingLink?: string | null
      pdfUrl?: string | null
      isVisible: boolean
    }
  ) => {
    setEditingLesson({
      id: lessonId,
      moduleName,
      title: lessonData.title,
      meetingLink: lessonData.meetingLink || undefined,
      pdfUrl: lessonData.pdfUrl || undefined,
      isVisible: lessonData.isVisible,
    })
    setShowEditLesson(true)
    setOpenLessonMenu(null)
  }

  const handleDeleteLesson = (lessonId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta lección?")) {
      deleteLessonMutation.mutate(lessonId)
      setOpenLessonMenu(null)
    }
  }

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenModuleMenu(null)
      setOpenLessonMenu(null)
    }

    if (openModuleMenu || openLessonMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [openModuleMenu, openLessonMenu])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Módulos y Lecciones</h2>
          <p className="text-sm text-gray-500 mt-1">
            {modules.length} módulos • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lecciones
          </p>
        </div>
        {canEdit && (
          <button 
            onClick={() => setShowAddModule(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-all duration-500 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Agregar Módulo
          </button>
        )}
      </div>

      {modules.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay módulos todavía</h3>
          <p className="text-gray-500 mb-6">
            {canEdit 
              ? "Comienza agregando el primer módulo a este curso" 
              : "Este curso aún no tiene módulos"
            }
          </p>
          {canEdit && (
            <button 
              onClick={() => setShowAddModule(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
            >
              Agregar Primer Módulo
            </button>
          )}
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

                  {canEdit && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenModuleMenu(openModuleMenu === module.id ? null : module.id)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>

                      {openModuleMenu === module.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditModule(module.id, module.title)
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteModule(module.id)
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {module.lessons.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-gray-500 text-sm mb-4">No hay lecciones en este módulo</p>
                        {canEdit && (
                          <button 
                            onClick={() => handleAddLesson(module.id, module.title)}
                            className="px-3 py-1.5 bg-primary text-white rounded text-xs font-medium hover:bg-secondary transition-all duration-500 cursor-pointer"
                          >
                            Agregar Lección
                          </button>
                        )}
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

                            {canEdit && (
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenLessonMenu(openLessonMenu === lesson.id ? null : lesson.id)
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>

                                {openLessonMenu === lesson.id && (
                                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleEditLesson(lesson.id, module.title, {
                                          title: lesson.title,
                                          meetingLink: lesson.meeting_link,
                                          pdfUrl: lesson.pdf_url,
                                          isVisible: lesson.is_visible,
                                        })
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                      <Pencil className="w-4 h-4" />
                                      Editar
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteLesson(lesson.id)
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Eliminar
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {canEdit && (
                          <div className="p-3">
                            <button 
                              onClick={() => handleAddLesson(module.id, module.title)}
                              className="w-full flex items-center justify-center gap-2 py-2 text-primary hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                            >
                              <Plus className="w-4 h-4" />
                              Agregar Lección
                            </button>
                          </div>
                        )}
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

      {editingModule && (
        <EditModuleModal
          isOpen={showEditModule}
          onClose={() => {
            setShowEditModule(false)
            setEditingModule(null)
          }}
          moduleId={editingModule.id}
          initialTitle={editingModule.title}
        />
      )}

      {editingLesson && (
        <EditLessonModal
          isOpen={showEditLesson}
          onClose={() => {
            setShowEditLesson(false)
            setEditingLesson(null)
          }}
          lessonId={editingLesson.id}
          moduleName={editingLesson.moduleName}
          initialData={{
            title: editingLesson.title,
            meetingLink: editingLesson.meetingLink,
            pdfUrl: editingLesson.pdfUrl,
            isVisible: editingLesson.isVisible,
          }}
        />
      )}
    </div>
  )
}
