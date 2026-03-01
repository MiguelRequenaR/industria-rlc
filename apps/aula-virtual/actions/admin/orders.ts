"use server"

import { createAdminClient } from "@/lib/supabase/server"
import type { Order, OrderItem, OrderItemRow, OrderStatus } from "@/types/database"

export interface OrderWithItemDetails extends Omit<Order, "items"> {
  items: OrderItem[]
}

interface OrderFromDb extends Omit<Order, "items"> {
  items: OrderItemRow[]
}

export async function getOrders(
  page = 1,
  pageSize = 10
): Promise<{ orders: OrderWithItemDetails[]; total: number }> {
  const supabase = createAdminClient()
  const fromIdx = (page - 1) * pageSize
  const toIdx = fromIdx + pageSize - 1

  const { data, error } = await supabase.from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .range(fromIdx, toIdx)

  const orders = (data ?? []) as OrderFromDb[]

  if (error) {
    console.error("Error fetching orders:", error)
    return { orders: [], total: 0 }
  }

  const { count } = await supabase.from("orders")
    .select("*", { count: "exact", head: true })

  const productIds = new Set<string>()
  for (const o of orders) {
    for (const i of o.items) {
      productIds.add(i.id)
    }
  }

  let productsMap: Record<string, { id: string; name: string | null; price: number }> = {}
  if (productIds.size > 0) {
    const { data: products } = await supabase
      .from("products")
      .select("id, name, price")
      .in("id", Array.from(productIds))
    const productsList = (products ?? []) as { id: string; name: string | null; price: number }[]
    for (const p of productsList) {
      productsMap[p.id] = p
    }
  }

  const enriched: OrderWithItemDetails[] = orders.map((o) => {
    const items: OrderItem[] = o.items.map((i) => {
      const prod = productsMap[i.id]
      return {
        id: i.id,
        qty: i.qty,
        name: prod?.name ?? "Producto desconocido",
        price: prod?.price ?? 0,
      }
    })
    return {
      ...o,
      items,
    }
  })

  return {
    orders: enriched,
    total: count ?? enriched.length,
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()
  const { error } = await (supabase as any).from("orders").update({ status }).eq("id", orderId)

  if (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: error.message }
  }
  return { success: true }
}
