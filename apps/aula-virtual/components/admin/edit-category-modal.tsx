"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateCategory } from "@/actions/admin-actions"
import type { Category } from "@/types/database"
import { toast } from "react-toastify"
import { CategoryImageUpload } from "./CategoryImageUpload"

interface EditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category: Category
  onSuccess: () => void
}

export function EditCategoryModal({
  isOpen,
  onClose,
  category,
  onSuccess,
}: EditCategoryModalProps) {
  const [name, setName] = useState(category.name)
  const [slug, setSlug] = useState(category.slug)
  const [imageUrl, setImageUrl] = useState<string | null>(category.image_url ?? null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setName(category.name)
    setSlug(category.slug)
    setImageUrl(category.image_url ?? null)
  }, [category])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanSlug = (slug || generateSlug(name)).trim()

    if (!cleanName || !cleanSlug) return

    setIsSubmitting(true)
    const result = await updateCategory(category.id, {
      name: cleanName,
      slug: cleanSlug,
      image_url: imageUrl,
    })
    setIsSubmitting(false)

    if (result.success) {
      toast.success("Categoría actualizada")
      onSuccess()
    } else {
      toast.error(result.error || "Error al actualizar la categoría")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(generateSlug(value))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Editar categoría</DialogTitle>
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
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">
                  Slug
                </label>
                <Input
                  type="text"
                  value={slug}
                  disabled
                />
              </div>
              <CategoryImageUpload
                categoryId={category.id}
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
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

