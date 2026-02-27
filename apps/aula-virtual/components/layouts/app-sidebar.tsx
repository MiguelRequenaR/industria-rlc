"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  LayoutDashboard,
  User,
  Users,
  ClipboardList,
  Award,
  LogOut,
  Mail,
  BookOpen,
  Box,
  Tag,
  ShoppingCart,
  CreditCard,
} from "lucide-react"
import { useProfileQuery } from "@/hooks/use-profile-query"
import { logoutAction } from "@/actions/auth-actions"

const menusByRole = {
  admin: {
    main: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Usuarios", url: "/admin/usuarios", icon: Users },
      { title: "Cursos", url: "/admin/cursos", icon: GraduationCap },
      { title: "Invitaciones", url: "/admin/invitaciones", icon: Mail },
      { title: "Blog", url: "/admin/blog", icon: BookOpen },
      { title: "Productos", url: "/admin/productos", icon: Box },
      { title: "Categorías", url: "/admin/categorias", icon: Tag },
      { title: "Pedidos", url: "/admin/pedidos", icon: ShoppingCart },
      { title: "Ventas", url: "/admin/ventas", icon: CreditCard },
    ],
  },
  docente: {
    main: [
      { title: "Dashboard", url: "/docente", icon: LayoutDashboard },
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
  
  const homeUrl = profile?.role ? `/${profile.role}` : "/estudiante"

  if (loading) {
    return (
      <>
        <nav className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-center z-50">
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
          </div>
        </nav>
        <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
          </div>
        </aside>
      </>
    )
  }

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center z-50">
        <div className="w-full max-w-7xl mx-auto rounded-xl shadow-lg bg-white px-1 md:px-6 flex items-center justify-between gap-1">
          <Link href={homeUrl} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="hidden md:block">
              <p className="font-bold text-sm leading-tight" style={{ color: 'var(--primary)' }}>Aula Virtual</p>
              <p className="text-xs leading-tight" style={{ color: 'var(--secondary)' }}>Industrial RLC</p>
            </div>
          </Link>
          <ul className="flex items-center flex-1 justify-center">
            {menu.main.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-orange-100 text-secondary font-medium' : 'text-secondary hover:bg-orange-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm hidden lg:inline">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/perfil" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name || "Usuario"} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="hidden xl:block">
                <p className="text-sm font-semibold truncate max-w-[120px] text-primary">{profile?.full_name || "Usuario"}</p>
                <p className="text-sm text-secondary font-bold truncate">{profile?.role || "Cargando..."}</p>
              </div>
            </Link>
            <button onClick={() => logoutAction()} className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Cerrar Sesión">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden xl:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col z-50">
        <div className="p-4">
          <Link href={homeUrl} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight uppercase text-gray-700">Aula Virtual</p>
              <p className="text-xs leading-tight uppercase text-secondary font-bold">Industrial RLC</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 bg-secondary/20 border border-secondary mx-3 rounded-[20px]">
          <ul className="flex flex-col gap-1">
            {menu.main.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-500 font-medium border border-blue-500' : 'text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm uppercase text-gray-700 font-bold">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-3 bg-secondary/20 border border-secondary m-3 rounded-[20px] space-y-1">
          <Link
            href="/perfil"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-100 transition-colors w-full"
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name || "Usuario"} className="w-8 h-8 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
                <User className="w-4 h-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate text-gray-700 uppercase">{profile?.full_name || "Usuario"}</p>
              <p className="text-xs text-blue-500 font-bold truncate uppercase">{profile?.role || "Cargando..."}</p>
            </div>
          </Link>
          <button
            onClick={() => logoutAction()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-100 border border-red-600 transition-colors cursor-pointer w-full"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium uppercase text-red-600">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
