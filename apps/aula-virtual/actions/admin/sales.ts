"use server"

import { createAdminClient } from "@/lib/supabase/server"

export interface SalesDataPoint {
  month: string
  revenue: number
  fullDate: string
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  price: number
  trend: "up" | "stable" | "down"
  sampleTrendPercent?: number
  stock: number
  minStock: number
  isLowStock: boolean
}

interface RawOrder {
  id: string
  total_amount: number
  status: string
  created_at: string
  items: { id: string; qty: number }[]
}

export async function getSalesTrends(
  days: 7 | 30 = 30
): Promise<SalesDataPoint[]> {
  const supabase = createAdminClient()
  const since = new Date()
  since.setDate(since.getDate() - days)
  since.setHours(0, 0, 0, 0)
  const sinceStr = since.toISOString().slice(0, 10)

  const { data: orders } = await (supabase as any)
    .from("orders")
    .select("total_amount, created_at, status")
    .eq("status", "completado")
    .gte("created_at", sinceStr)

  const byDay = new Map<string, number>()
  const dayLabels: string[] = []
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

  for (const o of (orders ?? []) as { total_amount: number; created_at: string }[]) {
    const d = new Date(o.created_at)
    const key = d.toISOString().slice(0, 10)
    byDay.set(key, (byDay.get(key) ?? 0) + o.total_amount)
  }

  const result: SalesDataPoint[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(since)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const revenue = byDay.get(key) ?? 0
    result.push({
      month: `${monthNames[d.getMonth()]} ${d.getDate()}`,
      revenue,
      fullDate: key,
    })
  }
  return result
}

/** Obtiene datos de ventas para un mes específico (día a día) */
export async function getSalesByMonth(
  year: number,
  month: number
): Promise<SalesDataPoint[]> {
  const supabase = createAdminClient()
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const sinceStr = firstDay.toISOString().slice(0, 10)
  const untilStr = lastDay.toISOString().slice(0, 10)

  const { data: orders } = await (supabase as any)
    .from("orders")
    .select("total_amount, created_at, status")
    .eq("status", "completado")
    .gte("created_at", sinceStr)
    .lte("created_at", untilStr)

  const byDay = new Map<string, number>()
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

  for (const o of (orders ?? []) as { total_amount: number; created_at: string }[]) {
    const d = new Date(o.created_at)
    const key = d.toISOString().slice(0, 10)
    byDay.set(key, (byDay.get(key) ?? 0) + o.total_amount)
  }

  const daysInMonth = lastDay.getDate()
  const result: SalesDataPoint[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d)
    const key = date.toISOString().slice(0, 10)
    const revenue = byDay.get(key) ?? 0
    result.push({
      month: `${monthNames[month - 1]} ${d}`,
      revenue,
      fullDate: key,
    })
  }
  return result
}

export async function getTopSellingProducts(limit = 4): Promise<{
  products: TopProduct[]
  lowStockCount: number
}> {
  const supabase = createAdminClient()

  const { data: orders } = await (supabase as any)
    .from("orders")
    .select("id, items, created_at, status")
    .eq("status", "completado")

  const salesByProduct = new Map<string, { qty: number; dates: string[] }>()
  for (const o of (orders ?? []) as RawOrder[]) {
    const items = o.items ?? []
    for (const item of items) {
      const existing = salesByProduct.get(item.id) ?? { qty: 0, dates: [] }
      existing.qty += item.qty
      existing.dates.push(o.created_at)
      salesByProduct.set(item.id, existing)
    }
  }

  const productIds = Array.from(salesByProduct.entries())
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, Math.max(limit, 20))
    .map(([id]) => id)

  if (productIds.length === 0) {
    return { products: [], lowStockCount: 0 }
  }

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, stock, min_stock")
    .in("id", productIds)

  const productsMap = new Map(
    (products ?? []).map((p: { id: string }) => [p.id, p])
  )

  const topProducts: TopProduct[] = []
  const sorted = Array.from(salesByProduct.entries()).sort((a, b) => b[1].qty - a[1].qty)

  for (let i = 0; i < Math.min(limit, sorted.length); i++) {
    const [productId, { qty }] = sorted[i]
    const p = productsMap.get(productId) as { name: string | null; price: number; stock: number; min_stock: number } | undefined
    if (!p) continue

    const isLowStock = p.stock <= p.min_stock
    const trendVals: ("up" | "stable" | "down")[] = ["up", "stable", "down"]
    const trendPercents = [12, 8, 0, -2]
    const trend = trendVals[i % 3] as "up" | "stable" | "down"
    const sampleTrendPercent = trendPercents[i % 4]

    topProducts.push({
      id: productId,
      name: p.name ?? "Producto",
      sales: qty,
      price: p.price,
      trend,
      sampleTrendPercent: trend === "stable" ? undefined : sampleTrendPercent,
      stock: p.stock,
      minStock: p.min_stock,
      isLowStock,
    })
  }

  const lowStockCount = topProducts.filter((t) => t.isLowStock).length

  return { products: topProducts, lowStockCount }
}
