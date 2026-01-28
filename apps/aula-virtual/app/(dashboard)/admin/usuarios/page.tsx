import { createClient } from "@/lib/supabase/server"
import { UsersTable } from "@/components/admin/users-table"
import { getAllUsers } from "@/actions/admin-actions"

export default async function UsuariosPage() {
  const supabase = await createClient()
  const [users, { data: { user } }] = await Promise.all([
    getAllUsers(),
    supabase.auth.getUser(),
  ])
  let currentUserIsOwner = false
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_owner")
      .eq("id", user.id)
      .single()
    currentUserIsOwner = profile?.is_owner === true
  }

  return (
    <div className="p-6">
      <UsersTable users={users} currentUserIsOwner={currentUserIsOwner} />
    </div>
  )
}
