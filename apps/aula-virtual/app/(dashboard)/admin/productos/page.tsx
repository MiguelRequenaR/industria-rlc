import { createClient } from "@/lib/supabase/server"
import { getAllProducts, getAllCategories } from "@/actions/admin-actions"
import { ProductsTable } from "@/components/admin/products-table"
import { redirect } from "next/navigation"

export default async function ProductosPage() {
  const supabase = await createClient()

  const [products, categories, { data: { user } }] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    supabase.auth.getUser(),
  ])

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <ProductsTable initialProducts={products} categories={categories} />
    </div>
  )
}