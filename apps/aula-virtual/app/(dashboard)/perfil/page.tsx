"use client"

import { useProfileQuery } from "@/hooks/use-profile-query"
import { ProfileView } from "@/components/profile/profile-view"
import Image from "next/image"

export default function PerfilPage() {
  const { profile, loading } = useProfileQuery()

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 bg-linear-to-br from-blue-50 via-white to-orange-50"
        style={{ fontFamily: "var(--font-comfortaa)" }}
      >
        <Image src="/rlciconpetplano.png" alt="logo" width={300} height={300} className="animate-pulse" />
        <p className="text-xl font-semibold uppercase text-gray-700">
          Cargando perfil...
        </p>
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
