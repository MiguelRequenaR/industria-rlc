import { createClient } from "@/lib/supabase/server"
import { getAllCategories } from "@/actions/admin-actions"
import { CategoriesTable } from "@/components/admin/categories-table"
import { redirect } from "next/navigation"

export default async function CategoriasPage() {
  const supabase = await createClient()

  const [categories, { data: { user } }] = await Promise.all([
    getAllCategories(),
    supabase.auth.getUser(),
  ])

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <CategoriesTable initialCategories={categories} />
    </div>
  )
}

