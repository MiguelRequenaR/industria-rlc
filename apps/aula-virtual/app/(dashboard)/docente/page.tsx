"use client"

import { 
  BookOpen, 
  Users, 
  Activity, 
  Plus,
  ArrowRight,
  Award,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { useTeacherStats } from '@/hooks/use-teacher-stats'
import { useProfileQuery } from '@/hooks/use-profile-query'
import Link from 'next/link'

export default function DocenteDashboardPage() {
  const { data: stats, isLoading } = useTeacherStats()
  const { profile } = useProfileQuery()

  // Obtener el saludo según la hora del día
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return "Buenos días"
    if (hour >= 12 && hour < 20) return "Buenas tardes"
    return "Buenas noches"
  }

  const mainStats = [
    {
      title: 'Total Estudiantes',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Cursos Asignados',
      value: stats?.assignedCourses || 0,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Actividad Semanal',
      value: stats?.recentActivity.activeStudentsThisWeek || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: 'estudiantes activos',
    },
  ]

  const quickActions = [
    { 
      title: 'Ir a Cursos', 
      description: 'Gestiona tus cursos y contenido',
      icon: BookOpen, 
      href: '/docente/cursos',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    { 
      title: 'Ver Calificaciones', 
      description: 'Administra las notas de tus estudiantes',
      icon: Award, 
      href: '/docente/calificaciones',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    { 
      title: 'Seguimiento', 
      description: 'Revisa el progreso de tus estudiantes',
      icon: ClipboardList, 
      href: '/docente/seguimiento',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="space-y-8 p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header con saludo personalizado */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Docente'}
            </h1>
          </div>
          <p className="text-white text-lg">
            ¿Qué tengo pendiente hoy?
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      {/* KPIs principales */}
      <div className="grid gap-6 md:grid-cols-3">
        {mainStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-secondary/20"
            >
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-4xl font-semibold text-primary mt-1">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Actividad reciente */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Actividad Reciente</h2>
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">
                      Lecciones completadas esta semana
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats?.recentActivity.completedLessonsThisWeek || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">
                      Estudiantes activos esta semana
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats?.recentActivity.activeStudentsThisWeek || 0}
                    </p>
                  </div>
                </div>

                {stats && stats.recentActivity.activeStudentsThisWeek === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No hay actividad registrada esta semana</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-xl font-bold text-primary mb-4">Accesos Rápidos</h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-secondary/10 transition-all group border border-transparent hover:border-secondary/20"
                  >
                    <div className={`shrink-0 w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-primary group-hover:text-secondary block">
                        {action.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {action.description}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-secondary mt-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
