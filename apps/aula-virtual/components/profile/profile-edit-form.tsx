"use client"

import { useState } from "react"
import { User, Loader2, X, Check } from "lucide-react"
import { useProfileMutation } from "@/hooks/use-profile-mutation"
import AvatarUpload from "./AvatarUpload"

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: "admin" | "docente" | "estudiante"
  email?: string
  created_at: string
}

interface ProfileEditFormProps {
  profile: Profile
  onCancel: () => void
  onSuccess: () => void
}

export function ProfileEditForm({
  profile,
  onCancel,
  onSuccess,
}: ProfileEditFormProps) {
  const mutation = useProfileMutation()
  const [localError, setLocalError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    avatar_url: profile.avatar_url || "",
  })

  const handleUploadComplete = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
    setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    mutation.mutate(
      {
        profileId: profile.id,
        data: {
          full_name: formData.full_name || null,
          avatar_url: formData.avatar_url || null,
        },
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            onSuccess()
          }, 500)
        },
        onError: (error) => {
          setLocalError(error.message)
        },
      }
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 uppercase">Editar Perfil</h2>
        <p className="text-secondary mt-1 uppercase">
          Actualiza tu información personal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary mb-3 uppercase">
            Foto de Perfil
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
            <AvatarUpload
              userId={profile.id}
              currentUrl={formData.avatar_url}
              onUploadComplete={handleUploadComplete}
            />

            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-gray-700 uppercase mb-1">
                Sube una nueva foto
              </p>
              <p className="text-xs text-gray-700 uppercase max-w-xs">
                Se recomienda una imagen cuadrada de al menos 400x400px.
                Formatos permitidos: JPG, PNG o WebP.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-secondary mb-2 uppercase"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        {(localError || mutation.isError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">
              {localError || mutation.error?.message || "Error al actualizar el perfil"}
            </p>
          </div>
        )}

        {mutation.isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              Perfil actualizado correctamente
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={mutation.isPending}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <span>Guardar Cambios</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
