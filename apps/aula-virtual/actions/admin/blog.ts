"use server"

import { createClient } from "@/lib/supabase/server"
import { BlogPostWithDetails, BlogCategory, BlogPost } from "@/types/database"

export async function getAllBlogPosts(): Promise<BlogPostWithDetails[]> {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(id, name, slug),
      author:profiles(id, full_name, avatar_url, email)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return posts as BlogPostWithDetails[]
}

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching blog categories:", error)
    return []
  }

  return categories || []
}

export async function createBlogCategory(
  name: string,
  slug: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para crear categorías" }
  }

  const { data: existing } = await supabase
    .from("blog_categories")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existing) {
    return { success: false, error: "Ya existe una categoría con ese slug" }
  }

  const { error } = await supabase
    .from("blog_categories")
    .insert({ name, slug })

  if (error) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt?: string
  image_url?: string
  category_id?: string
  author_id: string
  read_time?: string
  content: any
  is_featured?: boolean
  is_published?: boolean
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para crear posts" }
  }

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", data.slug)
    .single()

  if (existing) {
    return { success: false, error: "Ya existe un post con ese slug" }
  }

  const { error } = await supabase
    .from("blog_posts")
    .insert({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      image_url: data.image_url || null,
      category_id: data.category_id || null,
      author_id: data.author_id,
      read_time: data.read_time || "5 min de Lectura",
      content: data.content,
      is_featured: data.is_featured || false,
      is_published: data.is_published || false
    })

  if (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateBlogPost(
  postId: string,
  data: Partial<BlogPost>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para editar posts" }
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(data)
    .eq("id", postId)

  if (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteBlogPost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para eliminar posts" }
  }

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", postId)

  if (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
