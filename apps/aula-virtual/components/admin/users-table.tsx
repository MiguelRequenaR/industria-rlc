"use client"

import { useState, useEffect } from "react"
import { Search, Edit, Trash2, UserCheck, Mail, Calendar, Shield, AlertTriangle, Lock, Eye, EyeOff, Archive, Award, Download, Loader2, RotateCcw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { UserWithEmail, updateUser, deleteUser, activateUser, getCertificatesByStudentId, type CertificateForAdmin } from "@/actions/admin-actions"
import { changeUserPasswordAction } from "@/actions/profile-actions"
import { useRouter } from "next/navigation"
import { UserRole, UserStatus } from "@/types/database"
import { toast } from "react-toastify"
import { pdf } from "@react-pdf/renderer"
import { CertificateDocument } from "@/components/certificates/CertificateDocument"
import { formatModulesDescription } from "@/lib/certificate-utils"

interface UsersTableProps {
  users: UserWithEmail[]
  currentUserIsOwner?: boolean
}

export function UsersTable({ users, currentUserIsOwner = false }: UsersTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [page, setPage] = useState(1)

  const pageSize = 100

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

  const [certificates, setCertificates] = useState<CertificateForAdmin[]>([])
  const [loadingCertificates, setLoadingCertificates] = useState(false)
  const [downloadingCertId, setDownloadingCertId] = useState<string | null>(null)

  const filteredUsers = users.filter((user) => {
    const userName = user.full_name || "Sin nombre"
    const matchesSearch =
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  useEffect(() => {
    // Cuando cambian los filtros, volvemos siempre a la primera página
    setPage(1)
  }, [searchTerm, roleFilter])

  const getStatus = (user: UserWithEmail): UserStatus =>
    user.is_active && !user.deleted_at ? "activo" : "archivado"

  const getRoleBadge = (user: UserWithEmail) => {
    if (user.role === "admin" && user.is_owner === true)
      return { variant: "super_admin" as const, label: "Superadministrador" }
    if (user.role === "admin") return { variant: "admin" as const, label: "Administrador" }
    if (user.role === "docente") return { variant: "docente" as const, label: "Docente" }
    return { variant: "estudiante" as const, label: "Estudiante" }
  }

  useEffect(() => {
    if (!viewModalOpen || !selectedUser) {
      setCertificates([])
      return
    }
    if (selectedUser.role !== "estudiante") {
      setCertificates([])
      return
    }
    let cancelled = false
    setLoadingCertificates(true)
    getCertificatesByStudentId(selectedUser.id).then(({ certificates: data, error }) => {
      if (cancelled) return
      setLoadingCertificates(false)
      if (error) {
        toast.error(error)
        setCertificates([])
        return
      }
      setCertificates(data)
    })
    return () => {
      cancelled = true
    }
  }, [viewModalOpen, selectedUser?.id, selectedUser?.role])

  const downloadCertificate = async (cert: CertificateForAdmin) => {
    if (!selectedUser) return
    setDownloadingCertId(cert.id)
    try {
      const issueDate = new Date(cert.issued_at).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      const periodStartDate = cert.enrollmentDate
        ? new Date(cert.enrollmentDate).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : issueDate
      const durationHours = cert.course?.duration_hours ?? 0
      const courseName = cert.course?.title ?? "Curso"
      const courseWithModules = cert.course as { modality?: string; modules?: unknown } | null
      const modality = courseWithModules?.modality ?? "Virtual"
      const modulesDescription = formatModulesDescription(courseWithModules?.modules)

      const blob = await pdf(
        <CertificateDocument
          studentName={selectedUser.full_name || "Estudiante"}
          courseName={courseName}
          issueDate={issueDate}
          certificateCode={cert.certificate_code}
          durationHours={durationHours}
          note={cert.final_grade ?? 0}
          periodStartDate={periodStartDate}
          periodEndDate={issueDate}
          modality={modality}
          modulesDescription={modulesDescription}
        />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `Certificado-${courseName.replace(/\s+/g, "-")}-${cert.certificate_code}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast.success("Certificado descargado")
    } catch (e) {
      console.error(e)
      toast.error("Error al descargar el certificado")
    } finally {
      setDownloadingCertId(null)
    }
  }

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

  const handleSubmitArchiveOrActivate = async () => {
    if (!selectedUser) return

    const isArchived = getStatus(selectedUser) === "archivado"
    setIsSubmitting(true)
    try {
      const result = isArchived
        ? await activateUser(selectedUser.id)
        : await deleteUser(selectedUser.id)

      if (result.success) {
        toast.success(isArchived ? "Usuario activado correctamente" : "Usuario archivado correctamente")
        setDeleteModalOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || (isArchived ? "Error al activar el usuario" : "Error al archivar el usuario"))
      }
    } catch (error) {
      console.error(isArchived ? "Error activating user:" : "Error archiving user:", error)
      toast.error(isArchived ? "Error al activar el usuario" : "Error al archivar el usuario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 mx-5 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Usuarios
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Gestiona los usuarios de tu plataforma
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="flex gap-3 pt-5">
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
                  Estado
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
                  <td colSpan={6} className="px-6 py-8 text-center text-secondary">
                    {users.length === 0 ? "No hay usuarios registrados" : "No se encontraron usuarios"}
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
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
                          <div className="font-medium text-gray-700 uppercase text-sm">{userName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap uppercase">
                        <Badge variant={getRoleBadge(user).variant}>
                          {getRoleBadge(user).label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${getStatus(user) === "activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {getStatus(user) === "activo" ? "Activo" : "Archivado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {(!user.is_owner || currentUserIsOwner) ? (
                          <div className="flex items-center justify-end gap-2 cursor">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-600 hover:bg-blue-100 cursor-pointer"
                              title="Ver perfil"
                              onClick={() => handleViewUser(user)}
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:bg-green-100 cursor-pointer"
                              title="Editar usuario"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={
                                getStatus(user) === "archivado"
                                  ? "h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                                  : "h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                              }
                              title={getStatus(user) === "archivado" ? "Activar usuario" : "Archivar usuario"}
                              onClick={() => handleDeleteUser(user)}
                            >
                              {getStatus(user) === "archivado" ? (
                                <RotateCcw className="h-4 w-4" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ) : null}
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
        <div className="uppercase">
          Mostrando{" "}
          <span className="font-medium text-gray-900">
            {filteredUsers.length === 0 ? 0 : startIndex + 1}-
            {Math.min(endIndex, filteredUsers.length)}
          </span>{" "}
          de{" "}
          <span className="font-medium text-gray-900">{filteredUsers.length}</span> usuarios
        </div>
        <div className="flex items-center gap-4">
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
          {filteredUsers.length > pageSize && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                Anterior
              </Button>
              <span className="text-xs text-gray-600">
                Página{" "}
                <span className="font-medium text-gray-900">
                  {currentPage} / {totalPages}
                </span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
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
                    <h3 className="text-2xl font-bold text-gray-700 uppercase">
                      {selectedUser.full_name || "Sin nombre"}
                    </h3>
                    <Badge variant={getRoleBadge(selectedUser).variant} className="mt-1 uppercase">
                      {getRoleBadge(selectedUser).label}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-3xl">
                    <Mail className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary uppercase">Email</p>
                      <p className="text-gray-700">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-3xl">
                    <Shield className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary uppercase">Rol</p>
                      <p className="text-gray-700">{getRoleBadge(selectedUser).label}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-3xl">
                    <Archive className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary uppercase">Estado</p>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${getStatus(selectedUser) === "activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {getStatus(selectedUser) === "activo" ? "Activo" : "Archivado"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-3xl">
                    <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary uppercase">Fecha de registro</p>
                      <p className="text-gray-700">{formatDate(selectedUser.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-3xl">
                    <UserCheck className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-secondary uppercase">ID de Usuario</p>
                      <p className="text-gray-700 text-xs font-mono break-all">{selectedUser.id}</p>
                    </div>
                  </div>

                  {selectedUser.role === "estudiante" && (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-5 w-5 text-secondary" />
                        <p className="text-sm font-medium text-secondary uppercase">Certificados</p>
                      </div>
                      {loadingCertificates ? (
                        <div className="flex items-center gap-2 py-6 text-gray-700 uppercase">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Cargando certificados...</span>
                        </div>
                      ) : certificates.length === 0 ? (
                        <p className="text-sm text-gray-500 py-4">No tiene certificados.</p>
                      ) : (
                        <div className="space-y-3">
                          {certificates.map((cert) => {
                            const courseName = cert.course?.title ?? "Curso"
                            return (
                              <div
                                key={cert.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-secondary/20 rounded-3xl border border-gray-100"
                              >
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-700 uppercase truncate">{courseName}</p>
                                  <p className="text-xs text-blue-500">
                                    Código: {cert.certificate_code} · Emitido{" "}
                                    {formatDate(cert.issued_at)}
                                    {cert.final_grade != null && (
                                      <> · Nota {cert.final_grade.toFixed(2)} / 20</>
                                    )}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="shrink-0 w-full sm:w-auto cursor-pointer uppercase text-blue-500"
                                  disabled={downloadingCertId !== null}
                                  onClick={() => downloadCertificate(cert)}
                                >
                                  {downloadingCertId === cert.id ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                                      Descargando...
                                    </>
                                  ) : (
                                    <>
                                      <Download className="h-4 w-4 mr-1.5" />
                                      Descargar
                                    </>
                                  )}
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)} className="cursor-pointer uppercase">
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
                {getStatus(selectedUser) === "archivado" && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    No se pueden editar usuarios archivados. Reactívalo primero para modificar sus datos.
                  </p>
                )}
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
                    <p className="text-sm text-gray-700 uppercase">Editando a</p>
                    <p className="font-medium text-primary">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 uppercase">
                      Nombre completo
                    </label>
                    <Input
                      type="text"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      placeholder="Ingrese el nombre completo"
                      disabled={isSubmitting || getStatus(selectedUser) === "archivado"}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 uppercase">
                      Rol
                    </label>
                    <Select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value as UserRole)}
                      disabled={isSubmitting || getStatus(selectedUser) === "archivado"}
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="docente">Docente</option>
                      <option value="admin">Administrador</option>
                    </Select>
                  </div>

                  <div className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-orange-600" />
                      <label className="block text-sm font-semibold text-orange-900 uppercase">
                        Cambiar Contraseña (Opcional)
                      </label>
                    </div>
                    <p className="text-xs text-orange-700 mb-3 uppercase">
                      Deja este campo vacío si no deseas cambiar la contraseña del usuario.
                    </p>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Nueva contraseña (mínimo 6 caracteres)"
                        disabled={isSubmitting || getStatus(selectedUser) === "archivado"}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800"
                        disabled={isSubmitting || getStatus(selectedUser) === "archivado"}
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
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitEdit}
              disabled={isSubmitting || (!!selectedUser && getStatus(selectedUser) === "archivado")}
              className="cursor-pointer uppercase"
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
            <DialogTitle>
              {selectedUser && getStatus(selectedUser) === "archivado"
                ? "Activar Usuario"
                : "Archivar Usuario"}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selectedUser && (
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-center p-4 rounded-full w-16 h-16 mx-auto ${getStatus(selectedUser) === "archivado"
                      ? "bg-green-50"
                      : "bg-red-50"
                    }`}
                >
                  {getStatus(selectedUser) === "archivado" ? (
                    <RotateCcw className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  )}
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700 uppercase">
                    {getStatus(selectedUser) === "archivado"
                      ? "¿Activar este usuario?"
                      : "¿Archivar este usuario?"}
                  </h3>
                  <p
                    className={
                      getStatus(selectedUser) === "archivado"
                        ? "text-green-700 font-medium uppercase text-sm"
                        : "text-red-600 font-medium uppercase text-sm"
                    }
                  >
                    {getStatus(selectedUser) === "archivado"
                      ? "El usuario volverá a poder acceder al sistema y recuperará el acceso a sus cursos."
                      : "El usuario no podrá acceder al sistema, pero se conservará su historial académico."}
                  </p>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
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

                <p className="text-sm text-gray-700 uppercase text-center">
                  {getStatus(selectedUser) === "archivado"
                    ? "Podrás volver a archivarlo si lo necesitas."
                    : "Podrás reactivarlo más adelante desde la vista de usuarios archivados."}
                </p>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isSubmitting}
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitArchiveOrActivate}
              disabled={isSubmitting}
              className={
                selectedUser && getStatus(selectedUser) === "archivado"
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer uppercase"
                  : "bg-red-600 hover:bg-red-700 text-white cursor-pointer uppercase"
              }
            >
              {selectedUser && getStatus(selectedUser) === "archivado"
                ? isSubmitting
                  ? "Activando..."
                  : "Activar usuario"
                : isSubmitting
                  ? "Archivando..."
                  : "Archivar usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
