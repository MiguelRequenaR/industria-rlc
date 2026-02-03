"use client"

import { useProfileQuery } from "@/hooks/use-profile-query"
import { ProfileView } from "@/components/profile/profile-view"
import { Loader2 } from "lucide-react"

export default function PerfilPage() {
  const { profile, loading } = useProfileQuery()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-700 uppercase mb-2">Cargando perfil...</h2>
          <p className="text-gray-700 uppercase">Por favor, espere un momento</p>
          <div className="flex justify-center mt-6">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No se pudo cargar el perfil
          </h2>
          <p className="text-gray-600">
            Por favor, intenta recargar la página
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-700 mb-8 uppercase">Mi Perfil</h1>
      <ProfileView profile={profile} />
    </div>
  )
}
