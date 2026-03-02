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
  slug: string
}

export type OrderStatus = "pendiente" | "completado" | "cancelado"

export interface OrderItemRow {
  id: string
  qty: number
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string | null
  total_amount: number
  items: OrderItemRow[]
  status: OrderStatus
  created_at: string
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
      orders: {
        Row: Order
        Insert: Omit<Order, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Order, "id" | "created_at">>
      }
    }
    Functions: {
      process_checkout: {
        Args: {
          p_customer_name: string
          p_customer_phone: string
          p_customer_address: string
          p_total_amount: number
          p_items: { id: string; qty: number }[]
        }
        Returns: string
      }
    }
  }
}

export type TypedSupabaseClient = SupabaseClient<Database>
