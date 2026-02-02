"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Profile } from "@/types/database"
import { getAllTeachers, assignTeacherToCourse } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AssignInstructorModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  currentTeacherId?: string | null
  onSuccess?: () => void
}

export function AssignInstructorModal({
  isOpen,
  onClose,
  courseId,
  currentTeacherId,
  onSuccess
}: AssignInstructorModalProps) {
  const [teachers, setTeachers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(currentTeacherId || null)

  useEffect(() => {
    if (isOpen) {
      loadTeachers()
    }
  }, [isOpen])

  const loadTeachers = async () => {
    setLoading(true)
    const data = await getAllTeachers()
    setTeachers(data)
    setLoading(false)
  }

  const handleAssign = async () => {
    setAssigning(true)
    try {
      const result = await assignTeacherToCourse(courseId, selectedTeacherId)
      if (result.success) {
        toast.success("Instructor asignado correctamente")
        onSuccess?.()
        onClose()
      } else {
        toast.error(result.error || "Error al asignar instructor")
      }
    } catch (error) {
      toast.error("Error al asignar instructor")
    } finally {
      setAssigning(false)
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader onClose={onClose}>
          <div>
            <DialogTitle>Asignar Instructor</DialogTitle>
            <p className="text-sm text-gray-700 uppercase mt-1">
              Selecciona un docente para asignar al curso
            </p>
          </div>
        </DialogHeader>

        <DialogBody>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-700"
              />
            </div>
          </div>

          {/* Teachers List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {teachers.length === 0 
                    ? "No hay docentes registrados" 
                    : "No se encontraron docentes"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Opción para no asignar instructor */}
                <button
                  onClick={() => setSelectedTeacherId(null)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    selectedTeacherId === null
                      ? "border-secondary bg-secondary/10"
                      : "border-secondary/20 hover:bg-secondary/10"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-gray-700 text-lg">—</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-700 uppercase">Sin instructor</p>
                    <p className="text-sm text-gray-700 uppercase">No asignar ningún instructor al curso.</p>
                  </div>
                </button>

                {/* Lista de docentes */}
                {filteredTeachers.map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                      selectedTeacherId === teacher.id
                        ? "border-secondary bg-secondary/10"
                        : "border-secondary/20 hover:bg-secondary/10"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold shrink-0">
                      {teacher.full_name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">
                        {teacher.full_name || "Sin nombre"}
                      </p>
                      <p className="text-sm text-gray-500">{teacher.email}</p>
                    </div>
                    {currentTeacherId === teacher.id && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase">
                        Actual
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={assigning}
            className="cursor-pointer uppercase"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAssign}
            disabled={assigning || loading}
            className="cursor-pointer uppercase"
          >
            {assigning && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            )}
            {assigning ? "Asignando..." : "Asignar Instructor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
