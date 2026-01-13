import { UsersTable } from "@/components/admin/users-table"
import { getAllUsers } from "@/actions/admin-actions"

export default async function UsuariosPage() {
  const users = await getAllUsers()

  return (
    <div className="p-6">
      <UsersTable users={users} />
    </div>
  )
}
