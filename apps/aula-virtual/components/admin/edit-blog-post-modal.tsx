"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BlogCategory, BlogPostWithDetails } from "@/types/database"
import { updateBlogPost } from "@/actions/admin-actions"
import { Trash2 } from "lucide-react"

interface EditBlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPostWithDetails
  categories: BlogCategory[]
  onSuccess: () => void
}

type ContentBlock = {
  type: "text" | "image" | "heading"
  value: string
}

export function EditBlogPostModal({ isOpen, onClose, post, categories, onSuccess }: EditBlogPostModalProps) {
  const [title, setTitle] = useState(post.title)
  const [excerpt, setExcerpt] = useState(post.excerpt || "")
  const [imageUrl, setImageUrl] = useState(post.image_url || "")
  const [categoryId, setCategoryId] = useState(post.category_id || "")
  const [readTime, setReadTime] = useState(post.read_time)
  const [isFeatured, setIsFeatured] = useState(post.is_featured)
  const [isPublished, setIsPublished] = useState(post.is_published)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
    Array.isArray(post.content) ? post.content : [{ type: "text", value: "" }]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setTitle(post.title)
    setExcerpt(post.excerpt || "")
    setImageUrl(post.image_url || "")
    setCategoryId(post.category_id || "")
    setReadTime(post.read_time)
    setIsFeatured(post.is_featured)
    setIsPublished(post.is_published)
    setContentBlocks(Array.isArray(post.content) ? post.content : [{ type: "text", value: "" }])
  }, [post])

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

    if (!title.trim()) {
      return
    }

    setIsSubmitting(true)

    const content = contentBlocks.filter(block => block.value.trim() !== "")

    const result = await updateBlogPost(post.id, {
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      image_url: imageUrl.trim() || null,
      category_id: categoryId || null,
      read_time: readTime,
      content,
      is_featured: isFeatured,
      is_published: isPublished
    })

    setIsSubmitting(false)

    if (result.success) {
      onSuccess()
    } else {
      alert(result.error || "Error al actualizar el post")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Editar Post</DialogTitle>
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
                  placeholder="Título del post"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                  disabled={isSubmitting}
                />
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
                  placeholder="Breve descripción del post..."
                  rows={3}
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary resize-none"
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
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
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
                    className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
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
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
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
                            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary resize-none text-sm"
                            disabled={isSubmitting}
                          />
                        ) : (
                          <input
                            type="text"
                            value={block.value}
                            onChange={(e) => updateContentBlock(index, e.target.value)}
                            placeholder={block.type === "heading" ? "Título de la sección" : "URL de la imagen"}
                            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary text-sm"
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
                  <span className="text-sm text-secondary">Publicado</span>
                </label>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="cursor-pointer"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
