"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { useCourseContent, useMarkLessonCompleted } from "@/hooks/use-course-content"
import { CourseSidebar } from "@/components/student/course-sidebar"
import { LessonContent } from "@/components/student/lesson-content"

export default function CoursePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const { data: courseData, isLoading } = useCourseContent(slug)
  const markCompletedMutation = useMarkLessonCompleted()

  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Seleccionar la primera lección al cargar
  useEffect(() => {
    if (courseData && !currentLessonId) {
      const firstLesson = courseData.modules
        .find(m => m.lessons.length > 0)
        ?.lessons[0]
      
      if (firstLesson) {
        setCurrentLessonId(firstLesson.id)
      }
    }
  }, [courseData, currentLessonId])

  const handleMarkCompleted = async () => {
    if (!currentLessonId) return

    await markCompletedMutation.mutateAsync({
      lessonId: currentLessonId,
      courseSlug: slug,
    })

    // Avanzar a la siguiente lección
    if (courseData) {
      const allLessons = courseData.modules.flatMap(m => m.lessons)
      const currentIndex = allLessons.findIndex(l => l.id === currentLessonId)
      
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        setCurrentLessonId(allLessons[currentIndex + 1].id)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-700 uppercase">Cargando curso...</p>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Curso no encontrado</h2>
          <p className="text-gray-500 mb-4">
            No tienes acceso a este curso o no existe
          </p>
          <Link
            href="/estudiante"
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Mis Cursos
          </Link>
        </div>
      </div>
    )
  }

  const currentLesson = courseData.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === currentLessonId)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/estudiante"
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="font-bold text-xl text-gray-700 uppercase line-clamp-1">
                {courseData.course.title}
              </h1>
              {courseData.course.teacher && (
                <p className="text-sm text-gray-700 uppercase">
                  Por: {courseData.course.teacher.full_name}
                </p>
              )}
            </div>
          </div>

          {/* Toggle sidebar en mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-secondary"
          >
            <BookOpen className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Layout de 2 columnas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Navegación de lecciones */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-80 bg-white transition-transform duration-300 md:border-r md:border-gray-200`}
        >
          <CourseSidebar
            modules={courseData.modules}
            currentLessonId={currentLessonId}
            onLessonClick={setCurrentLessonId}
          />
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            {currentLesson ? (
              <LessonContent
                lesson={currentLesson}
                onMarkCompleted={handleMarkCompleted}
                isMarkingCompleted={markCompletedMutation.isPending}
              />
            ) : (
              <div className="text-center py-12 bg-secondary/20 rounded-3xl p-12">
                <BookOpen className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-700 uppercase">
                  Selecciona una lección del menú lateral para comenzar
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
