"use client"

import {
  BookOpen,
  Users,
  Activity,
  ArrowRight,
  Award,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react'
import { useTeacherStats } from '@/hooks/use-teacher-stats'
import { useProfileQuery } from '@/hooks/use-profile-query'
import Link from 'next/link'

export default function DocenteDashboardPage() {
  const { data: stats, isLoading } = useTeacherStats()
  const { profile } = useProfileQuery()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Buenos días'
    if (hour >= 12 && hour < 20) return 'Buenas tardes'
    return 'Buenas noches'
  }

  const detailedStats = [
    {
      label: 'Cursos Asignados',
      value: stats?.assignedCourses ?? 0,
      icon: BookOpen
    },
    {
      label: 'Actividad Semanal',
      value: stats?.recentActivity?.activeStudentsThisWeek ?? 0,
      icon: Activity,
      suffix: 'activos'
    }
  ]

  const quickActions = [
    {
      title: 'Ir a Cursos',
      description: 'Gestiona tus cursos y contenido',
      icon: BookOpen,
      href: '/docente/cursos',
      colorIcon: 'text-blue-500',
      bgAction: 'bg-blue-50'
    },
    {
      title: 'Ver Calificaciones',
      description: 'Administra las notas',
      icon: Award,
      href: '/docente/calificaciones',
      colorIcon: 'text-green-500',
      bgAction: 'bg-green-50'
    },
    {
      title: 'Seguimiento',
      description: 'Progreso de estudiantes',
      icon: ClipboardList,
      href: '/docente/seguimiento',
      colorIcon: 'text-purple-500',
      bgAction: 'bg-purple-50'
    }
  ]

  return (
    <div className="space-y-8 py-10 min-h-screen mx-5">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Panel del Docente
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            {getGreeting()}
            {profile?.full_name ? `, ${profile.full_name}. ` : ' '}
            Aquí está un resumen de tus cursos.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Estudiantes - card destacada */}
        <div className="col-span-2 bg-secondary/20 p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute right-6 bottom-6 opacity-30 pointer-events-none">
            <Users className="w-24 h-24 text-secondary/50" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-blue-200 rounded-full w-16 h-16 shadow-lg">
              <Users className="w-10 h-10 text-blue-500" />
            </div>
            <div>
              <h2 className="uppercase text-xl text-blue-500 font-semibold mb-1">
                Total Estudiantes
              </h2>
              {isLoading ? (
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
              ) : (
                <p className="text-4xl font-bold text-gray-700">
                  {stats?.totalStudents ?? 0}
                  <span className="text-lg ml-1 font-normal uppercase text-blue-600">
                    {stats?.totalStudents === 1 ? 'estudiante' : 'estudiantes'}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Estado del sistema */}
        <div className="p-6 bg-secondary/20 rounded-3xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg uppercase text-gray-700">Estado</h2>
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-16 bg-gray-200 rounded-3xl animate-pulse" />
                <div className="h-16 bg-gray-200 rounded-3xl animate-pulse" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {detailedStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 p-4 rounded-3xl bg-blue-50 transition-colors"
                    >
                      <div className="shrink-0">
                        <Icon className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[16px] uppercase text-blue-500">
                          {stat.label}: {stat.value}
                          {stat.suffix ? ` ${stat.suffix}` : ''}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="col-span-2 p-6 bg-secondary/20 rounded-3xl">
          <div>
            <h2 className="uppercase text-lg mb-4 text-gray-700">
              Actividad Reciente
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-24 bg-gray-200 rounded-3xl animate-pulse" />
                <div className="h-24 bg-gray-200 rounded-3xl animate-pulse" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-blue-50 border border-blue-100">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 uppercase">
                      Lecciones completadas esta semana
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats?.recentActivity?.completedLessonsThisWeek ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-3xl bg-green-50 border border-green-100">
                  <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 uppercase">
                      Estudiantes activos esta semana
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats?.recentActivity?.activeStudentsThisWeek ?? 0}
                    </p>
                  </div>
                </div>

                {stats &&
                  (stats.recentActivity?.activeStudentsThisWeek ?? 0) === 0 &&
                  (stats.recentActivity?.completedLessonsThisWeek ?? 0) === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-6 text-gray-500">
                      <Activity className="h-12 w-12 mb-3 text-gray-300" />
                      <p className="text-sm uppercase">No hay actividad registrada esta semana</p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="row-span-2 p-6 bg-secondary/20 rounded-3xl">
          <div>
            <h2 className="text-lg uppercase mb-4 text-gray-700">
              Accesos Rápidos
            </h2>
            <div className="flex flex-col gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className={`flex items-center gap-3 p-4 rounded-3xl ${action.bgAction} transition-all group border border-transparent hover:border-secondary/20`}
                  >
                    <div
                      className={`shrink-0 w-10 h-10 ${action.bgAction} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`h-5 w-5 ${action.colorIcon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-gray-700 uppercase block">
                        {action.title}
                      </span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-700 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
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
