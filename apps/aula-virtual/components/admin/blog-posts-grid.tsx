"use client"

import { useState } from "react"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { BlogPostWithDetails, BlogCategory } from "@/types/database"
import { AddBlogPostModal } from "./add-blog-post-modal"
import { EditBlogPostModal } from "./edit-blog-post-modal"
import { deleteBlogPost } from "@/actions/admin-actions"
import { useRouter } from "next/navigation"

interface BlogPostsGridProps {
  initialPosts: BlogPostWithDetails[]
  categories: BlogCategory[]
}

export function BlogPostsGrid({ initialPosts, categories }: BlogPostsGridProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showAddPost, setShowAddPost] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPostWithDetails | null>(null)
  const [posts, setPosts] = useState(initialPosts)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "published" && post.is_published) ||
      (statusFilter === "unpublished" && !post.is_published) ||
      (statusFilter === "featured" && post.is_featured)
    const matchesCategory = 
      categoryFilter === "all" || 
      post.category_id === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = async (postId: string) => {
    if (!confirm("¿Estás seguro de eliminar este post?")) return

    const result = await deleteBlogPost(postId)
    if (result.success) {
      setPosts(posts.filter(p => p.id !== postId))
      router.refresh()
    } else {
      alert(result.error || "Error al eliminar el post")
    }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary">Gestión de Blog</h2>
          <p className="text-gray-500 text-sm mt-1">
            Administra los posts del blog
          </p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por título o extracto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 max-w-48"
        >
          <option value="all">Todos los posts</option>
          <option value="published">Publicados</option>
          <option value="unpublished">No publicados</option>
          <option value="featured">Destacados</option>
        </Select>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="flex-1 max-w-48"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center py-12 text-gray-500">
            {posts.length === 0 ? "No hay posts registrados. ¡Crea el primero!" : "No se encontraron posts con esos filtros"}
          </div>
        ) : (
          <>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Imagen del post */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-orange-400 to-orange-600">
                      <span className="text-4xl font-bold text-white">
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {post.is_published && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                        Publicado
                      </span>
                    )}
                    {post.is_featured && (
                      <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenido de la card */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {post.category && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {post.category.name}
                      </span>
                    )}
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.author && (
                    <p className="text-xs text-gray-500 mt-2">
                      Autor: {post.author.full_name || "Sin nombre"}
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="p-4 border-t flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center cursor-pointer justify-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {/* Card para agregar nuevo post */}
            <button 
              onClick={() => setShowAddPost(true)}
              className="group relative h-full min-h-[300px] border-2 border-dashed border-secondary rounded-lg hover:border-secondary hover:bg-secondary/10 transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                <Plus className="h-8 w-8 text-primary group-hover:text-secondary" />
              </div>
              <span className="text-lg font-medium text-primary group-hover:text-secondary">
                Agregar Post
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Mostrando <span className="font-medium text-gray-900">{filteredPosts.length}</span> de{" "}
          <span className="font-medium text-gray-900">{posts.length}</span> posts
        </div>
        {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setCategoryFilter("all")
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Modales */}
      <AddBlogPostModal
        isOpen={showAddPost}
        onClose={() => setShowAddPost(false)}
        categories={categories}
        onSuccess={() => router.refresh()}
      />

      {editingPost && (
        <EditBlogPostModal
          isOpen={true}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          categories={categories}
          onSuccess={() => {
            setEditingPost(null)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}
