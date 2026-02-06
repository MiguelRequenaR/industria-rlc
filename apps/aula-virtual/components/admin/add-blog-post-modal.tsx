"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BlogCategory } from "@/types/database"
import { createBlogPost } from "@/actions/admin-actions"
import { useProfileQuery } from "@/hooks/use-profile-query"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "react-toastify"

interface AddBlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  categories: BlogCategory[]
  onSuccess: () => void
}

type ContentBlock = {
  type: "text" | "image" | "heading"
  value: string
}

export function AddBlogPostModal({ isOpen, onClose, categories, onSuccess }: AddBlogPostModalProps) {
  const { profile } = useProfileQuery()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [readTime, setReadTime] = useState("5 min de Lectura")
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { type: "text", value: "" }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const addContentBlock = (type: "text" | "image" | "heading") => {
    setContentBlocks([...contentBlocks, { type, value: "" }])
  }

  const removeContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index))
  }

  const updateContentBlock = (index: number, value: string) => {
    const updated = [...contentBlocks]
    updated[index].value = value
    setContentBlocks(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !profile) {
      return
    }

    setIsSubmitting(true)

    const slug = generateSlug(title)
    const content = contentBlocks.filter(block => block.value.trim() !== "")

    const result = await createBlogPost({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim() || undefined,
      image_url: imageUrl.trim() || undefined,
      category_id: categoryId || undefined,
      author_id: profile.id,
      read_time: readTime,
      content,
      is_featured: isFeatured,
      is_published: isPublished
    })

    setIsSubmitting(false)

    if (result.success) {
      toast.success("Post creado")
      setTitle("")
      setExcerpt("")
      setImageUrl("")
      setCategoryId("")
      setReadTime("5 min de Lectura")
      setIsFeatured(false)
      setIsPublished(false)
      setContentBlocks([{ type: "text", value: "" }])
      onSuccess()
      onClose()
    } else {
      toast.error(result.error || "Error al crear el post")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto uppercase">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Crear Nuevo Post</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              {/* Título */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-secondary mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Dominando el código electricista en 2025"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700"
                  disabled={isSubmitting}
                  autoFocus
                />
                {title && (
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{generateSlug(title)}
                  </p>
                )}
              </div>

              {/* Extracto */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-secondary mb-1">
                  Extracto / Descripción
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve descripción del post que se mostrará en las tarjetas..."
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Imagen y Categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-secondary mb-1">
                    URL de Imagen
                  </label>
                  <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-secondary mb-1">
                    Categoría
                  </label>
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700"
                    disabled={isSubmitting}
                  >
                    <option value="">Sin categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tiempo de lectura */}
              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-secondary mb-1">
                  Tiempo de Lectura
                </label>
                <input
                  id="readTime"
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min de Lectura"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700"
                  disabled={isSubmitting}
                />
              </div>

              {/* Contenido */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-secondary">
                    Contenido
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => addContentBlock("heading")}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      disabled={isSubmitting}
                    >
                      + Título
                    </button>
                    <button
                      type="button"
                      onClick={() => addContentBlock("text")}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                      disabled={isSubmitting}
                    >
                      + Texto
                    </button>
                    <button
                      type="button"
                      onClick={() => addContentBlock("image")}
                      className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                      disabled={isSubmitting}
                    >
                      + Imagen
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {contentBlocks.map((block, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-secondary mb-1 capitalize">
                          {block.type === "heading" ? "Título" : block.type === "text" ? "Texto" : "Imagen"}
                        </div>
                        {block.type === "text" ? (
                          <textarea
                            value={block.value}
                            onChange={(e) => updateContentBlock(index, e.target.value)}
                            placeholder="Escribe el contenido del párrafo..."
                            rows={3}
                            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700 resize-none text-sm"
                            disabled={isSubmitting}
                          />
                        ) : (
                          <input
                            type="text"
                            value={block.value}
                            onChange={(e) => updateContentBlock(index, e.target.value)}
                            placeholder={block.type === "heading" ? "Título de la sección" : "URL de la imagen"}
                            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700 text-sm"
                            disabled={isSubmitting}
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeContentBlock(index)}
                        className="mt-6 px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        disabled={isSubmitting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opciones */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-secondary">Post Destacado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-secondary">Publicar Ahora</span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Si no marcas "Publicar Ahora", el post se guardará como borrador y no será visible públicamente.
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {isSubmitting ? "Creando..." : "Crear Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
