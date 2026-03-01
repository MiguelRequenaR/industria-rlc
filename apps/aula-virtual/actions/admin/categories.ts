"use server"

import { createClient } from "@/lib/supabase/server"
import { type Category } from "@/types/database"

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return categories || []
}

async function ensureAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { supabase, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { supabase, error: "No tienes permisos para realizar esta acción" }
  }

  return { supabase, error: null }
}

export async function createCategory(
  name: string,
  slug: string,
  image_url?: string | null
): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existing) {
    return { success: false, error: "Ya existe una categoría con ese slug" }
  }

  const { error: insertError } = await supabase.from("categories").insert({
    name,
    slug,
    image_url: image_url ?? null,
  })

  if (insertError) {
    console.error("Error creating category:", insertError)
    return { success: false, error: insertError.message }
  }

  return { success: true }
}

export async function updateCategory(
  id: string,
  data: Pick<Category, "name" | "slug" | "image_url">
): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const payload: Record<string, unknown> = {
    name: data.name,
    slug: data.slug,
  }
  if (data.image_url !== undefined) payload.image_url = data.image_url

  const { error: updateError } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)

  if (updateError) {
    console.error("Error updating category:", updateError)
    return { success: false, error: updateError.message }
  }

  return { success: true }
}

function getStoragePathFromUrl(url: string, bucket: string): string | null {
  try {
    const match = url.match(new RegExp(`/storage/v1/object/public/${bucket}/([^?]+)`))
    return match ? match[1] : null
  } catch {
    return null
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const BUCKET = "products"
  const CATEGORIES_FOLDER = "categories"

  const { data: category } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single()

  if (category?.image_url) {
    const path = getStoragePathFromUrl(category.image_url, BUCKET)
    if (path) {
      const { error: storageError } = await supabase.storage.from(BUCKET).remove([path])
      if (storageError) {
        console.error("Error deleting category image from storage:", storageError)
      }
    }
  }

  const { data: folderFiles } = await supabase.storage
    .from(BUCKET)
    .list(`${CATEGORIES_FOLDER}/${id}`)

  if (folderFiles?.length) {
    const folderPaths = folderFiles.map((f) => `${CATEGORIES_FOLDER}/${id}/${f.name}`)
    await supabase.storage.from(BUCKET).remove(folderPaths)
  }

  const { error: deleteError } = await supabase.from("categories").delete().eq("id", id)

  if (deleteError) {
    console.error("Error deleting category:", deleteError)
    return { success: false, error: deleteError.message }
  }

  return { success: true }
}

