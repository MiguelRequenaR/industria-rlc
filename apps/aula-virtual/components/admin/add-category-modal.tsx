"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { CategoryImageUpload } from "./CategoryImageUpload"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(value)
    setSlugManuallyEdited(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanSlug = (slug || generateSlug(name)).trim()

    if (!cleanName || !cleanSlug) return

    setIsSubmitting(true)
    const result = await createCategory(cleanName, cleanSlug, imageUrl)
    setIsSubmitting(false)

    if (result.success) {
      toast.success("Categoría creada")
      setName("")
      setSlug("")
      setImageUrl(null)
      onSuccess()
      onClose()
    } else {
      toast.error(result.error || "Error al crear la categoría")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Crear nueva categoría</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Herramientas manuales"
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">
                  Slug
                </label>
                <Input
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="herramientas-manuales"
                  disabled={isSubmitting}
                />
                {name && (
                  <p className="text-xs text-gray-500 mt-1">
                    URL sugerida: /categorias/{generateSlug(name) || "slug"}
                  </p>
                )}
              </div>
              <CategoryImageUpload
                categoryId={null}
                currentUrl={imageUrl}
                onUrlChange={setImageUrl}
                disabled={isSubmitting}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="cursor-pointer uppercase"
            >
              {isSubmitting ? "Creando..." : "Crear categoría"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

