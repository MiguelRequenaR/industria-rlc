"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { BlogPostWithDetails, BlogCategory } from "@/types/database"
import { AddBlogPostModal } from "./add-blog-post-modal"
import { EditBlogPostModal } from "./edit-blog-post-modal"
import { deleteBlogPost } from "@/actions/admin-actions"
import { useBlogPosts, useInvalidateBlogPosts } from "@/hooks/use-blog-posts"
import { toast } from "react-toastify"

interface BlogPostsGridProps {
  initialPosts: BlogPostWithDetails[]
  categories: BlogCategory[]
}

export function BlogPostsGrid({ initialPosts, categories }: BlogPostsGridProps) {
  const { data } = useBlogPosts({ posts: initialPosts, categories })
  const invalidateBlogPosts = useInvalidateBlogPosts()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showAddPost, setShowAddPost] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPostWithDetails | null>(null)

  const posts = data?.posts ?? initialPosts
  const categoriesList = data?.categories ?? categories

  const handleInvalidate = () => {
    invalidateBlogPosts()
  }

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
      toast.success("Post eliminado")
      handleInvalidate()
    } else {
      toast.error(result.error || "Error al eliminar el post")
    }
  }

  return (
    <div className="space-y-4 mx-5 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Blog
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Gestiona los posts de tu blog, para la web academia
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="flex gap-3 flex-wrap pt-5">
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
          {categoriesList.map((cat) => (
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
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl"
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
                      <span className="bg-blue-50 text-gray-700 border border-blue-500 text-xs px-2 py-1 rounded uppercase">
                        Publicado
                      </span>
                    )}
                    {post.is_featured && (
                      <span className="bg-orange-50 text-gray-700 border border-secondary text-xs px-2 py-1 rounded uppercase">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenido de la card */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {post.category && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-500 text-xs px-2 py-1 rounded uppercase">
                        {post.category.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-700 uppercase">{post.read_time}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-700 line-clamp-2 uppercase">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.author && (
                    <p className="text-xs text-blue-500 mt-2 uppercase">
                      Autor: {post.author.full_name || "Sin nombre"}
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="p-4 border-t flex gap-2">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors uppercase"
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
              <span className="text-lg font-medium text-gray-700 uppercase group-hover:text-secondary">
                Agregar Post
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 uppercase">
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
        categories={categoriesList}
        onSuccess={handleInvalidate}
      />

      {editingPost && (
        <EditBlogPostModal
          isOpen={true}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          categories={categoriesList}
          onSuccess={() => {
            setEditingPost(null)
            handleInvalidate()
          }}
        />
      )}
    </div>
  )
}
