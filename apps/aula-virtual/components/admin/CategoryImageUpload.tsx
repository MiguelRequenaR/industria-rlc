"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Camera, Loader2, Tags } from "lucide-react"
import { toast } from "react-toastify"
import { nanoid } from "nanoid"

const BUCKET = "products"
const FOLDER = "categories"
const MAX_SIZE_MB = 5
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024

interface CategoryImageUploadProps {
  categoryId: string | null
  currentUrl?: string | null
  onUrlChange: (url: string | null) => void
  disabled?: boolean
}

export function CategoryImageUpload({
  categoryId,
  currentUrl,
  onUrlChange,
  disabled = false,
}: CategoryImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)

  useEffect(() => {
    setPreview(currentUrl || null)
  }, [currentUrl])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      if (!file.type.startsWith("image/")) {
        toast.error("El archivo debe ser una imagen")
        return
      }
      if (file.size > MAX_SIZE) {
        toast.error(`La imagen no debe pesar más de ${MAX_SIZE_MB}MB`)
        return
      }

      setUploading(true)
      const supabase = createClient()
      const fileExt = file.name.split(".").pop() || "jpg"
      const filePath = categoryId
        ? `${FOLDER}/${categoryId}/image.${fileExt}`
        : `${FOLDER}/temp/${nanoid(10)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
          upsert: true,
          cacheControl: "0",
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath)

      const urlWithCacheBuster = `${publicUrl}?t=${Date.now()}`
      setPreview(urlWithCacheBuster)
      onUrlChange(urlWithCacheBuster)
      toast.success("Imagen subida correctamente")
    } catch (error) {
      console.error(error)
      toast.error("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-secondary mb-1 uppercase">
        Imagen de la categoría
      </label>
      <div className="flex flex-wrap gap-3">
        {preview && (
          <div className="relative h-24 w-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
            <Image
              src={preview}
              alt="Categoría"
              fill
              className="object-cover"
            />
          </div>
        )}
        {!disabled && (
          <label className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:bg-gray-50 transition-colors">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            ) : (
              <>
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1 uppercase">
                  {preview ? "Cambiar" : "Añadir"}
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500 uppercase">
        JPG, PNG o WebP. Máx. {MAX_SIZE_MB}MB.
      </p>
    </div>
  )
}
