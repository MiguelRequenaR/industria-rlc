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
  image_url?: string | null
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
    image_url: data.image_url || null,
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
  if (data.image_url !== undefined) updatePayload.image_url = data.image_url
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

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const { supabase, error } = await ensureAdmin()

  if (error) {
    return { success: false, error }
  }

  const { error: deleteError } = await supabase.from("products").delete().eq("id", id)

  if (deleteError) {
    console.error("Error deleting product:", deleteError)
    return { success: false, error: deleteError.message }
  }

  return { success: true }
}