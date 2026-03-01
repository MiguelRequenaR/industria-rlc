import { createClient } from "@/lib/supabase/server"
import { getOrders } from "@/actions/admin-actions"
import { OrdersPanel } from "@/components/admin/orders-panel"
import { redirect } from "next/navigation"

export default async function PedidosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { orders, total } = await getOrders(1, 10)

  return (
    <div className="mx-5 py-10">
      <OrdersPanel initialOrders={orders} initialTotal={total} />
    </div>
  )
}
