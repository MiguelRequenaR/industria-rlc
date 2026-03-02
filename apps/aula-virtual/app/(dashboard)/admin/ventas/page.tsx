import { createClient } from "@/lib/supabase/server"
import {
  getSalesByMonth,
  getTopSellingProducts,
} from "@/actions/admin-actions"
import { SalesDashboard } from "@/components/admin/sales-dashboard"
import { redirect } from "next/navigation"

export default async function VentasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const now = new Date()
  const [salesTrends, { products: topProducts, lowStockCount }] = await Promise.all([
    getSalesByMonth(now.getFullYear(), now.getMonth() + 1),
    getTopSellingProducts(4),
  ])

  return (
    <div className="mx-5 py-10">
      <SalesDashboard
        initialTrends={salesTrends}
        initialTopProducts={topProducts}
        initialLowStockCount={lowStockCount}
      />
    </div>
  )
}
