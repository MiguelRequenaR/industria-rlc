"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Camera, Loader2, User } from "lucide-react"
import { toast } from "react-toastify"

interface AvatarUploadProps {
  userId: string
  currentUrl?: string | null
  onUploadComplete: (url: string) => void
}

export default function AvatarUpload({ userId, currentUrl, onUploadComplete }: AvatarUploadProps) {

  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      if (!file.type.startsWith("image/")) {
        toast.error("El archivo debe ser una imagen")
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("La imagen no debe pesar más de 2MB")
        return
      }
      setUploading(true)
      const supabase = createClient()
      const fileExt = file.name.split(".").pop()

      const filePath = `${userId}/avatar.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '0',
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath)

      const urlWithCacheBuster = `${publicUrl}?t=${Date.now()}`
      
      setPreview(urlWithCacheBuster)
      onUploadComplete(urlWithCacheBuster)
      toast.success("Imagen subida correctamente")
    } catch (error) {
      console.log(error)
      toast.error("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative flex items-center justify-center">

          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          ) : preview ? (
            <Image
              src={preview}
              alt="Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-gray-400" />
          )}

          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="h-8 w-8 text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>
      <p className="text-xs text-gray-700 uppercase">
        Click en la imagen para cambiar
      </p>
    </div>
  )
}
