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
  Mail,
  BookOpen,
} from "lucide-react"
import { useProfileQuery } from "@/hooks/use-profile-query"
import { logoutAction } from "@/actions/auth-actions"

const menusByRole = {
  admin: {
    main: [
      { title: "Dashboard", url: "/admin", icon: Home },
      { title: "Usuarios", url: "/admin/usuarios", icon: Users },
      { title: "Cursos", url: "/admin/cursos", icon: GraduationCap },
      { title: "Invitaciones", url: "/admin/invitaciones", icon: Mail },
      { title: "Blog", url: "/admin/blog", icon: BookOpen },
    ],
  },
  docente: {
    main: [
      { title: "Dashboard", url: "/docente", icon: Home },
      { title: "Cursos", url: "/docente/cursos", icon: GraduationCap },
      { title: "Calificaciones", url: "/docente/calificaciones", icon: Award },
      { title: "Seguimiento", url: "/docente/seguimiento", icon: ClipboardList },
    ],
  },
  estudiante: {
    main: [
      { title: "Mis Cursos", url: "/estudiante", icon: GraduationCap },
      { title: "Calificaciones", url: "/estudiante/calificaciones", icon: Award },
    ],
  },
}

export function AppSidebar() {
  const pathname = usePathname()
  const { profile, loading } = useProfileQuery()

  const menu = profile?.role ? menusByRole[profile.role] : menusByRole.estudiante
  
  // URL de inicio según el rol
  const homeUrl = profile?.role ? `/${profile.role}` : "/estudiante"

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-center z-50">
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          <div className="w-32 h-4 bg-gray-200 rounded" />
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white rounded-2xl md:rounded-full max-w-7xl mx-auto flex items-center z-50 shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-1 md:px-6 flex items-center justify-between gap-6">
        {/* Logo y Marca */}
        <Link href={homeUrl} className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <p className="font-bold text-sm leading-tight" style={{ color: 'var(--primary)' }}>Aula Virtual</p>
            <p className="text-xs leading-tight" style={{ color: 'var(--secondary)' }}>Industrial RLC</p>
          </div>
        </Link>

        {/* Menú Principal */}
        <ul className="flex items-center gap-1 flex-1 justify-center">
          {menu.main.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.url
            return (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-secondary font-medium'
                      : 'text-secondary hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm hidden lg:inline">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Perfil del Usuario */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/perfil"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors"
          >
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.full_name || "Usuario"} 
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
                <User className="w-4 h-4" />
              </div>
            )}
            <div className="hidden xl:block">
              <p className="text-sm font-semibold truncate max-w-[120px] text-primary">
                {profile?.full_name || "Usuario"}
              </p>
              <p className="text-sm text-secondary font-bold truncate">
                {profile?.role || "Cargando..."}
              </p>
            </div>
          </Link>
          
          <button
            onClick={() => logoutAction()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium hidden xl:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
