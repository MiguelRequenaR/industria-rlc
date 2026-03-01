"use server"

import { createClient } from "@/lib/supabase/server"
import { type Product } from "@/types/database"

export interface ProductCreateData {
  name: string
  sku?: string | null
  description?: string | null
  category_id?: string | null
  brand?: string | null
  unit_measure?: string | null
  location?: string | null
  stock?: number
  min_stock?: number
  price: number
  image_urls?: string[]
  is_active?: boolean
}

export interface ProductUpdateData extends Partial<ProductCreateData> {}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return (products || []) as Product[]
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

export async function createProduct(
  data: ProductCreateData
): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const { error: insertError } = await supabase.from("products").insert({
    name: data.name,
    sku: data.sku || null,
    description: data.description || null,
    category_id: data.category_id || null,
    brand: data.brand || null,
    unit_measure: data.unit_measure || null,
    location: data.location || null,
    stock: data.stock ?? 0,
    min_stock: data.min_stock ?? 0,
    price: data.price ?? 0,
    image_urls: data.image_urls ?? [],
    is_active: data.is_active ?? true,
  })

  if (insertError) {
    console.error("Error creating product:", insertError)
    return { success: false, error: insertError.message }
  }

  return { success: true }
}

export async function updateProduct(
  id: string,
  data: ProductUpdateData
): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const updatePayload: Record<string, unknown> = {}
  if (data.name !== undefined) updatePayload.name = data.name
  if (data.sku !== undefined) updatePayload.sku = data.sku
  if (data.description !== undefined) updatePayload.description = data.description
  if (data.category_id !== undefined) updatePayload.category_id = data.category_id
  if (data.brand !== undefined) updatePayload.brand = data.brand
  if (data.unit_measure !== undefined) updatePayload.unit_measure = data.unit_measure
  if (data.location !== undefined) updatePayload.location = data.location
  if (data.stock !== undefined) updatePayload.stock = data.stock
  if (data.min_stock !== undefined) updatePayload.min_stock = data.min_stock
  if (data.price !== undefined) updatePayload.price = data.price
  if (data.image_urls !== undefined) updatePayload.image_urls = data.image_urls
  if (data.is_active !== undefined) updatePayload.is_active = data.is_active

  const { error: updateError } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id)

  if (updateError) {
    console.error("Error updating product:", updateError)
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

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const BUCKET = "products"
  const PRODUCTS_FOLDER = "products"

  const { data: product } = await supabase
    .from("products")
    .select("image_urls")
    .eq("id", id)
    .single()

  if (product?.image_urls?.length) {
    const pathsToRemove: string[] = []
    for (const url of product.image_urls) {
      const path = getStoragePathFromUrl(url, BUCKET)
      if (path) pathsToRemove.push(path)
    }
    if (pathsToRemove.length > 0) {
      const { error: storageError } = await supabase.storage.from(BUCKET).remove(pathsToRemove)
      if (storageError) {
        console.error("Error deleting product images from storage:", storageError)
      }
    }
  }

  const { data: folderFiles } = await supabase.storage
    .from(BUCKET)
    .list(`${PRODUCTS_FOLDER}/${id}`)

  if (folderFiles?.length) {
    const folderPaths = folderFiles.map((f) => `${PRODUCTS_FOLDER}/${id}/${f.name}`)
    await supabase.storage.from(BUCKET).remove(folderPaths)
  }

  const { error: deleteError } = await supabase.from("products").delete().eq("id", id)

  if (deleteError) {
    console.error("Error deleting product:", deleteError)
    return { success: false, error: deleteError.message }
  }

  return { success: true }
}