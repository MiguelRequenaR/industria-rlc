"use client"

import { 
  BookOpen, 
  Clock,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'
import { useStudentCourses } from '@/hooks/use-student-courses'
import { useProfileQuery } from '@/hooks/use-profile-query'
import Link from 'next/link'

export default function EstudianteDashboardPage() {
  const { data: courses, isLoading } = useStudentCourses()
  const { profile } = useProfileQuery()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return "Buenos días"
    if (hour >= 12 && hour < 20) return "Buenas tardes"
    return "Buenas noches"
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "from-green-500 to-green-400"
    if (percentage >= 40) return "from-yellow-500 to-yellow-400"
    return "from-blue-500 to-blue-400"
  }

  const getProgressTextColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-blue-600"
  }

  return (
    <div className="space-y-8 p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header con saludo */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-10 w-10 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Estudiante'}
            </h1>
          </div>
          <p className="text-white text-lg">
            Continúa aprendiendo y alcanza tus metas
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      {/* Estadísticas rápidas */}
      {!isLoading && courses && courses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Cursos Inscritos
                </p>
                <p className="text-3xl font-bold text-primary">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Lecciones Completadas
                </p>
                <p className="text-3xl font-bold text-primary">
                  {courses.reduce((acc, c) => acc + c.completed_lessons, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Progreso Promedio
                </p>
                <p className="text-3xl font-bold text-primary">
                  {Math.round(courses.reduce((acc, c) => acc + c.progress_percentage, 0) / courses.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de cursos */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">Mis Cursos</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                <div className="bg-white border border-gray-200 rounded-b-2xl p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-secondary/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Imagen del curso */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
                      <span className="text-5xl font-bold text-white">
                        {course.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Badge de progreso */}
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                      course.progress_percentage === 100 
                        ? "bg-green-500 text-white" 
                        : "bg-white/90 backdrop-blur-sm " + getProgressTextColor(course.progress_percentage)
                    }`}>
                      {course.progress_percentage}%
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-primary line-clamp-2 group-hover:text-secondary transition-colors mb-2">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course.description}
                      </p>
                    )}
                  </div>

                  {/* Barra de progreso */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {course.completed_lessons} de {course.total_lessons} lecciones
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`bg-linear-to-r ${getProgressColor(course.progress_percentage)} h-full transition-all duration-500`}
                        style={{ width: `${course.progress_percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        {course.total_lessons} {course.total_lessons === 1 ? 'lección' : 'lecciones'}
                      </span>
                    </div>
                    {course.teacher && (
                      <span className="text-xs text-gray-500">
                        {course.teacher.full_name?.split(' ')[0] || 'Docente'}
                      </span>
                    )}
                  </div>

                  {/* Botón de acción */}
                  <Link
                    href={`/curso/${course.slug}`}
                    className="block w-full"
                  >
                    <button className="w-full bg-secondary text-white px-4 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                      {course.progress_percentage === 0 ? (
                        <>
                          <BookOpen className="h-5 w-5" />
                          Comenzar Curso
                        </>
                      ) : course.progress_percentage === 100 ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Revisar Curso
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-5 w-5" />
                          Continuar Aprendiendo
                        </>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-gray-100">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes cursos inscritos
            </h3>
            <p className="text-gray-500">
              Contacta con el administrador para inscribirte en un curso
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
