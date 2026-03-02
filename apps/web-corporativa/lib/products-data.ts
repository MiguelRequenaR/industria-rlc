import type { Product, Category } from "@/types/database"
import { createClient } from "./supabase/server"

export async function getProductsFromDb(): Promise<Product[]> {
  const supabase = createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug, image_url)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return (products || []) as Product[]
}

export async function getCategoriesFromDb(): Promise<Category[]> {
  const supabase = createClient()

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

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug, image_url)")
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    console.error("Error fetching product:", error)
    return null
  }

  return data as Product
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug, image_url)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    console.error("Error fetching product by slug:", error)
    return null
  }

  return data as Product
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit: number = 3
): Promise<Product[]> {
  if (!categoryId) return []

  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug, image_url)")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", productId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) return []

  return (data || []) as Product[]
}
