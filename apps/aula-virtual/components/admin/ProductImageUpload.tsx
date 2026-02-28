"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Camera, Loader2, X } from "lucide-react"
import { toast } from "react-toastify"
import { nanoid } from "nanoid"

const BUCKET = "products"
const MAX_SIZE_MB = 5
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024

interface ProductImageUploadProps {
  productId: string | null
  currentUrls: string[]
  onUrlsChange: (urls: string[]) => void
  disabled?: boolean
}

export function ProductImageUpload({
  productId,
  currentUrls,
  onUrlsChange,
  disabled = false,
}: ProductImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

      const files = Array.from(e.target.files)
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name}: debe ser una imagen`)
          continue
        }
        if (file.size > MAX_SIZE) {
          toast.error(`${file.name}: no debe pesar más de ${MAX_SIZE_MB}MB`)
          continue
        }
      }

      setUploading(true)
      const supabase = createClient()
      const newUrls: string[] = []

      for (const file of files) {
        if (!file.type.startsWith("image/") || file.size > MAX_SIZE) continue

        const fileExt = file.name.split(".").pop() || "jpg"
        const uniqueId = nanoid(10)
        const filePath = productId
          ? `${productId}/${uniqueId}.${fileExt}`
          : `temp/${uniqueId}.${fileExt}`

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
        newUrls.push(urlWithCacheBuster)
      }

      if (newUrls.length > 0) {
        onUrlsChange([...currentUrls, ...newUrls])
        toast.success(
          newUrls.length === 1 ? "Imagen subida" : `${newUrls.length} imágenes subidas`
        )
      }

      e.target.value = ""
    } catch (error) {
      console.error(error)
      toast.error("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  const removeUrl = (index: number) => {
    if (disabled) return
    const next = currentUrls.filter((_, i) => i !== index)
    onUrlsChange(next)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-secondary mb-1 uppercase">
        Imágenes del producto
      </label>
      <div className="flex flex-wrap gap-3">
        {currentUrls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative h-24 w-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-100 group"
          >
            <Image
              src={url}
              alt={`Producto ${index + 1}`}
              fill
              className="object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => removeUrl(index)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                aria-label="Quitar imagen"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        {!disabled && (
          <label className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:bg-gray-50 transition-colors">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            ) : (
              <>
                <Camera className="h-8 w-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1 uppercase">Añadir</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500 uppercase">
        JPG, PNG o WebP. Máx. {MAX_SIZE_MB}MB por imagen. Puedes seleccionar varias.
      </p>
    </div>
  )
}
