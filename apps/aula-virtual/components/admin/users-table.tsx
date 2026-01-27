"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, UserCheck, Mail, Calendar, Shield, AlertTriangle, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { UserWithEmail, updateUser, deleteUser } from "@/actions/admin-actions"
import { changeUserPasswordAction } from "@/actions/profile-actions"
import { useRouter } from "next/navigation"
import { UserRole } from "@/types/database"
import { toast } from "react-toastify"

interface UsersTableProps {
  users: UserWithEmail[]
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserWithEmail | null>(null)
  
  // Edit form states
  const [editFullName, setEditFullName] = useState("")
  const [editRole, setEditRole] = useState<UserRole>("estudiante")
  const [editPassword, setEditPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredUsers = users.filter((user) => {
    const userName = user.full_name || "Sin nombre"
    const matchesSearch =
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleViewUser = (user: UserWithEmail) => {
    setSelectedUser(user)
    setViewModalOpen(true)
  }

  const handleEditUser = (user: UserWithEmail) => {
    setSelectedUser(user)
    setEditFullName(user.full_name || "")
    setEditRole(user.role)
    setEditPassword("")
    setShowPassword(false)
    setEditModalOpen(true)
  }

  const handleDeleteUser = (user: UserWithEmail) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  const handleSubmitEdit = async () => {
    if (!selectedUser) return
    
    setIsSubmitting(true)
    try {
      // Si hay una nueva contraseña, cambiarla primero
      if (editPassword) {
        const passwordResult = await changeUserPasswordAction(selectedUser.id, editPassword)
        if (passwordResult.error) {
          toast.error(passwordResult.error)
          setIsSubmitting(false)
          return
        }
        toast.success("Contraseña actualizada correctamente")
      }

      // Actualizar el resto de los datos del usuario
      const result = await updateUser(selectedUser.id, {
        full_name: editFullName,
        role: editRole
      })

      if (result.success) {
        toast.success("Usuario actualizado correctamente")
        setEditModalOpen(false)
        setEditPassword("")
        router.refresh()
      } else {
        toast.error(result.error || "Error al actualizar el usuario")
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Error al actualizar el usuario")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitDelete = async () => {
    if (!selectedUser) return
    
    setIsSubmitting(true)
    try {
      const result = await deleteUser(selectedUser.id)

      if (result.success) {
        toast.success("Usuario eliminado correctamente")
        setDeleteModalOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || "Error al eliminar el usuario")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Error al eliminar el usuario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary">Gestión de Usuarios</h2>
          <p className="text-gray-500 text-sm mt-1">
            Administra los usuarios del sistema
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="flex-1 max-w-48"
        >
          <option value="all">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="docente">Docente</option>
          <option value="estudiante">Estudiante</option>
        </Select>
      </div>

      <div className="border-2 border-secondary rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-secondary">
                    {users.length === 0 ? "No hay usuarios registrados" : "No se encontraron usuarios"}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const userName = user.full_name || "Sin nombre"
                  const userInitial = userName.charAt(0).toUpperCase()
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={userName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                              {userInitial}
                            </div>
                          )}
                          <div className="font-medium text-primary">{userName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-primary">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={user.role}>
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "docente"
                            ? "Docente"
                            : "Estudiante"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-primary">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:bg-blue-50"
                            title="Ver perfil"
                            onClick={() => handleViewUser(user)}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:bg-blue-50"
                            title="Editar usuario"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Eliminar usuario"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Mostrando <span className="font-medium text-gray-900">{filteredUsers.length}</span> de{" "}
          <span className="font-medium text-gray-900">{users.length}</span> usuarios
        </div>
        {searchTerm || roleFilter !== "all" ? (
          <button
            onClick={() => {
              setSearchTerm("")
              setRoleFilter("all")
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      {/* Modal Ver Usuario */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setViewModalOpen(false)}>
            <DialogTitle>Perfil del Usuario</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  {selectedUser.avatar_url ? (
                    <img
                      src={selectedUser.avatar_url}
                      alt={selectedUser.full_name || "Usuario"}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                      {(selectedUser.full_name || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {selectedUser.full_name || "Sin nombre"}
                    </h3>
                    <Badge variant={selectedUser.role} className="mt-1">
                      {selectedUser.role === "admin"
                        ? "Administrador"
                        : selectedUser.role === "docente"
                        ? "Docente"
                        : "Estudiante"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary">Email</p>
                      <p className="text-primary">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary">Rol</p>
                      <p className="text-primary">
                        {selectedUser.role === "admin"
                          ? "Administrador"
                          : selectedUser.role === "docente"
                          ? "Docente"
                          : "Estudiante"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary">Fecha de registro</p>
                      <p className="text-primary">{formatDate(selectedUser.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <UserCheck className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary">ID de Usuario</p>
                      <p className="text-primary text-xs font-mono break-all">{selectedUser.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Usuario */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setEditModalOpen(false)}>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b">
                  {selectedUser.avatar_url ? (
                    <img
                      src={selectedUser.avatar_url}
                      alt={selectedUser.full_name || "Usuario"}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                      {(selectedUser.full_name || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Editando a</p>
                    <p className="font-medium text-primary">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Nombre completo
                    </label>
                    <Input
                      type="text"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      placeholder="Ingrese el nombre completo"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Rol
                    </label>
                    <Select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value as UserRole)}
                      disabled={isSubmitting}
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="docente">Docente</option>
                      <option value="admin">Administrador</option>
                    </Select>
                  </div>

                  <div className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-orange-600" />
                      <label className="block text-sm font-semibold text-orange-900">
                        Cambiar Contraseña (Opcional)
                      </label>
                    </div>
                    <p className="text-xs text-orange-700 mb-3">
                      Deja este campo vacío si no deseas cambiar la contraseña del usuario.
                    </p>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Nueva contraseña (mínimo 6 caracteres)"
                        disabled={isSubmitting}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitEdit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Eliminar Usuario */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader onClose={() => setDeleteModalOpen(false)}>
            <DialogTitle>Eliminar Usuario</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-red-50 rounded-full w-16 h-16 mx-auto">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    ¿Estás seguro?
                  </h3>
                  <p className="text-red-600 font-medium">
                    Se borrará todo el historial académico de este usuario.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    {selectedUser.avatar_url ? (
                      <img
                        src={selectedUser.avatar_url}
                        alt={selectedUser.full_name || "Usuario"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {(selectedUser.full_name || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary truncate">
                        {selectedUser.full_name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{selectedUser.email}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "Eliminando..." : "Eliminar usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
