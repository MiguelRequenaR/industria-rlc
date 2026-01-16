"use client"

import { useState, useEffect } from "react"
import { 
  Mail, 
  Plus, 
  Trash2, 
  Copy, 
  CheckCircle2,
  XCircle,
  UserCheck,
  GraduationCap,
  Users,
  AlertCircle,
  AlertTriangle
} from "lucide-react"
import { 
  createInvitation, 
  getAllInvitations, 
  deleteInvitation 
} from "@/actions/admin-actions"
import type { Invitation, UserRole } from "@/types/database"
import { toast } from "react-toastify"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  docente: "Docente",
  estudiante: "Estudiante"
}

const roleIcons: Record<UserRole, typeof Users> = {
  admin: Users,
  docente: UserCheck,
  estudiante: GraduationCap
}

const roleColors: Record<UserRole, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  docente: "bg-blue-100 text-blue-700 border-blue-200",
  estudiante: "bg-green-100 text-green-700 border-green-200"
}

export default function InvitacionesPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("estudiante")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [invitationToDelete, setInvitationToDelete] = useState<Invitation | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadInvitations()
  }, [])

  const loadInvitations = async () => {
    setLoading(true)
    const data = await getAllInvitations()
    setInvitations(data)
    setLoading(false)
  }

  const handleCreateInvitation = async () => {
    setCreating(true)
    setError(null)
    
    const result = await createInvitation(selectedRole)
    
    if (result.success && result.token) {
      await loadInvitations()
      setShowCreateModal(false)
      
      // Copiar automáticamente el token
      const inviteUrl = `${window.location.origin}/registro?token=${result.token}`
      await navigator.clipboard.writeText(inviteUrl)
      toast.success("Invitación creada y copiada al portapapeles")
      setCopiedToken(result.token)
      setTimeout(() => setCopiedToken(null), 3000)
    } else {
      const errorMsg = result.error || "Error al crear la invitación"
      setError(errorMsg)
      toast.error(errorMsg)
    }
    
    setCreating(false)
  }

  const handleDeleteInvitation = (invitation: Invitation) => {
    setInvitationToDelete(invitation)
    setDeleteModalOpen(true)
  }

  const confirmDeleteInvitation = async () => {
    if (!invitationToDelete) return

    setDeleting(true)
    const result = await deleteInvitation(invitationToDelete.id)
    
    if (result.success) {
      toast.success("Invitación eliminada correctamente")
      await loadInvitations()
      setDeleteModalOpen(false)
    } else {
      toast.error(result.error || "Error al eliminar la invitación")
    }
    setDeleting(false)
  }

  const copyToClipboard = async (token: string) => {
    const inviteUrl = `${window.location.origin}/registro?token=${token}`
    await navigator.clipboard.writeText(inviteUrl)
    toast.success("Enlace copiado al portapapeles")
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const activeInvitations = invitations.filter(inv => !inv.is_used)
  const usedInvitations = invitations.filter(inv => inv.is_used)

  return (
    <div className="space-y-8 pt-10 min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-2xl mx-4 md:mx-0">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-10 h-10 text-white" />
              <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                Gestión de Invitaciones
              </h1>
            </div>
            <p className="text-white text-sm md:text-lg">
              Crea y administra códigos de invitación con roles específicos
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-secondary rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus className="w-5 h-5" />
            Nueva Invitación
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Activas</p>
              <p className="text-3xl font-bold text-primary">{activeInvitations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Usadas</p>
              <p className="text-3xl font-bold text-primary">{usedInvitations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total</p>
              <p className="text-3xl font-bold text-primary">{invitations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de invitaciones activas */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-6">Invitaciones Activas</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando invitaciones...</p>
          </div>
        ) : activeInvitations.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hay invitaciones activas</p>
            <p className="text-gray-400 text-sm mt-2">Crea una nueva invitación para comenzar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeInvitations.map((invitation) => {
              const RoleIcon = roleIcons[invitation.role]
              const inviteUrl = `${window.location.origin}/registro?token=${invitation.token}`
              
              return (
                <div
                  key={invitation.id}
                  className="flex flex-col md:flex-row items-start justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${roleColors[invitation.role]} border-2`}>
                      <RoleIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-mono text-sm font-semibold text-gray-800">{invitation.token}</p>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${roleColors[invitation.role]} border`}>
                          {roleLabels[invitation.role]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Creado el {new Date(invitation.created_at).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:items-center pt-5">
                    <button
                      onClick={() => copyToClipboard(invitation.token)}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm font-semibold"
                    >
                      {copiedToken === invitation.token ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar Link
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteInvitation(invitation)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar invitación"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lista de invitaciones usadas */}
      {usedInvitations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-primary mb-6">Invitaciones Usadas</h2>
          <div className="space-y-3">
            {usedInvitations.map((invitation) => {
              const RoleIcon = roleIcons[invitation.role]
              
              return (
                <div
                  key={invitation.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 opacity-60"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${roleColors[invitation.role]} border-2 shrink-0`}>
                      <RoleIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-1">
                        <p className="font-mono text-sm font-semibold text-gray-800 line-through break-all">{invitation.token}</p>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${roleColors[invitation.role]} border`}>
                          {roleLabels[invitation.role]}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-200 text-gray-700">
                          Usada
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Creado el {new Date(invitation.created_at).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Modal para crear invitación */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Nueva Invitación</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Selecciona el rol para esta invitación:
              </label>
              <div className="space-y-3">
                {(["estudiante", "docente", "admin"] as UserRole[]).map((role) => {
                  const RoleIcon = roleIcons[role]
                  const isSelected = selectedRole === role
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `${roleColors[role]} border-current shadow-md`
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-white/50" : roleColors[role]
                      }`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`font-semibold ${isSelected ? "" : "text-gray-700"}`}>
                          {roleLabels[role]}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setError(null)
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                disabled={creating}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateInvitation}
                disabled={creating}
                className="flex-1 px-4 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creando..." : "Crear Invitación"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar Invitación */}
      {deleteModalOpen && invitationToDelete && (
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader onClose={() => setDeleteModalOpen(false)}>
              <DialogTitle>Eliminar Invitación</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-red-50 rounded-full w-16 h-16 mx-auto">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    ¿Estás seguro?
                  </h3>
                  <p className="text-red-600 font-medium">
                    Se eliminará esta invitación permanentemente.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${roleColors[invitationToDelete.role]} border-2`}>
                      {(() => {
                        const RoleIcon = roleIcons[invitationToDelete.role]
                        return <RoleIcon className="w-6 h-6" />
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold text-primary truncate">
                        {invitationToDelete.token}
                      </p>
                      <p className="text-sm text-gray-500">
                        {roleLabels[invitationToDelete.role]}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={confirmDeleteInvitation}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? "Eliminando..." : "Eliminar invitación"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
