"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Home,
  User,
  Users,
  ClipboardList,
  FolderOpen,
  Award,
  LogOut,
} from "lucide-react"
import { useUserProfile } from "@/hooks/use-user-profile"
import { logoutAction } from "@/actions/auth-actions"

const menusByRole = {
  admin: {
    main: [
      { title: "Dashboard", url: "/admin", icon: Home },
      { title: "Usuarios", url: "/admin/usuarios", icon: Users },
      { title: "Cursos", url: "/admin/cursos", icon: GraduationCap },
    ],
  },
  docente: {
    main: [
      { title: "Dashboard", url: "/docente", icon: Home },
      { title: "Mis Cursos", url: "/docente/cursos", icon: GraduationCap },
      { title: "Estudiantes", url: "/docente/estudiantes", icon: Users },
      { title: "Tareas", url: "/docente/tareas", icon: ClipboardList },
      { title: "Horarios", url: "/docente/horarios", icon: FolderOpen },
    ],
  },
  estudiante: {
    main: [
      { title: "Dashboard", url: "/estudiante", icon: Home },
      { title: "Mis Cursos", url: "/estudiante/cursos", icon: GraduationCap },
      { title: "Tareas", url: "/estudiante/tareas", icon: ClipboardList },
      { title: "Calificaciones", url: "/estudiante/calificaciones", icon: Award },
    ],
  },
}

export function AppSidebar() {
  const pathname = usePathname()
  const { profile, loading } = useUserProfile()

  const menu = profile?.role ? menusByRole[profile.role] : menusByRole.estudiante

  if (loading) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-lg mb-2" />
          <div className="w-32 h-4 bg-gray-200 rounded" />
        </div>
      </aside>
    )
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: 'var(--primary)' }}>Aula Virtual</p>
            <p className="text-xs" style={{ color: 'var(--secondary)' }}>Industrial RLC</p>
          </div>
        </Link>
      </div>
      {/* Content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Menú Principal */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Principal</p>
          <ul className="space-y-1">
            {menu.main.map((item) => {
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

      {/* Footer - Perfil del Usuario */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/perfil"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.full_name || "Usuario"} 
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
              <User className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold truncate">
              {profile?.full_name || "Usuario"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {profile?.role || "Cargando..."}
            </p>
          </div>
        </Link>
        
        <button
          onClick={() => logoutAction()}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}
