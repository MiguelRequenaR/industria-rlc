import type { SupabaseClient } from "@supabase/supabase-js"

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  image_url: string | null
}

export interface Product {
  id: string
  sku: string | null
  description: string | null
  category_id: string | null
  name: string
  brand: string | null
  unit_measure: string | null
  location: string | null
  stock: number
  min_stock: number
  price: number
  image_urls: string[]
  is_active: boolean
  created_at: string
  category?: Category
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Product, "id" | "created_at">>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Category, "id" | "created_at">>
      }
    }
  }
}

export type TypedSupabaseClient = SupabaseClient<Database>
