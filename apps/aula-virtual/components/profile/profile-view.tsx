"use client"

import { useState } from "react"
import { User, Mail, Calendar, Shield, Edit2, X } from "lucide-react"
import { ProfileEditForm } from "./profile-edit-form"

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: "admin" | "docente" | "estudiante"
  email?: string
  created_at: string
}

interface ProfileViewProps {
  profile: Profile
}

const roleLabels = {
  admin: "Administrador",
  docente: "Docente",
  estudiante: "Estudiante",
}

export function ProfileView({ profile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isEditing) {
    return (
      <ProfileEditForm
        profile={profile}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header con Avatar */}
      <div className="relative h-32 bg-linear-to-r from-primary to-secondary rounded-t-xl">
        <div className="absolute -bottom-16 left-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || "Usuario"}
              className="w-32 h-32 rounded-xl border-4 border-white object-cover shadow-lg"
            />
            ) : (
              <div className="w-32 h-32 rounded-xl border-4 border-white bg-primary flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
            )}
        </div>
      </div>

      {/* Contenido del Perfil */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 uppercase">
              {profile.full_name || "Sin nombre"}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700 uppercase">
                {roleLabels[profile.role]}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-500 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span className="uppercase">Editar Perfil</span>
          </button>
        </div>

        {/* Información del Perfil */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Email */}
          {profile.email && (
            <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-500 uppercase">
                  Correo Electrónico
                </p>
                <p className="text-base text-gray-700 mt-1">{profile.email}</p>
              </div>
            </div>
          )}

          {/* Rol */}
          <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-500 uppercase">Rol</p>
              <p className="text-base text-gray-700 mt-1">
                {roleLabels[profile.role]}
              </p>
            </div>
          </div>

          {/* Fecha de Registro */}
          <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-500 uppercase">
                Miembro desde
              </p>
              <p className="text-base text-gray-900 mt-1">
                {formatDate(profile.created_at)}
              </p>
            </div>
          </div>

          {/* ID de Usuario */}
          <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
            <div className="p-2 bg-white rounded-lg">
              <User className="w-5 h-5 text-blue-500" />
            </div>
              <div>
                <p className="text-sm font-medium text-blue-500 uppercase">ID de Usuario</p>
                <p className="text-xs text-gray-900 mt-1 font-mono">
                  {profile.id}
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
