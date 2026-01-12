"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  FileText,
  CheckSquare,
  User,
} from "lucide-react"

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Mis Cursos", url: "/cursos", icon: GraduationCap },
  { title: "Calendario", url: "/calendario", icon: Calendar },
  { title: "Mensajes", url: "/mensajes", icon: MessageSquare, badge: "3" },
]

const academicNavItems = [
  { title: "Tareas", url: "/tareas", icon: CheckSquare },
  { title: "Calificaciones", url: "/calificaciones", icon: FileText },
  { title: "Recursos", url: "/recursos", icon: BookOpen },
]

const settingsNavItems = [
  { title: "Configuración", url: "/configuracion", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>Aula Virtual</p>
            <p className="text-xs" style={{ color: 'var(--secondary)' }}>Industrial RLC</p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Principal */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Principal</p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Académico */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Académico</p>
          <ul className="space-y-1">
            {academicNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Configuración */}
        <div>
          <ul className="space-y-1">
            {settingsNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/perfil"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Nombre Usuario</p>
            <p className="text-xs text-gray-500">usuario@email.com</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
