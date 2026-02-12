"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserPlus, UserCheck, UserMinus, Search } from "lucide-react"
import { getAllStudents, getCourseEnrollments, enrollStudent, unenrollStudent } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"

interface EnrollStudentsModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  onSuccess?: () => void
}

export function EnrollStudentsModal({ isOpen, onClose, courseId, onSuccess }: EnrollStudentsModalProps) {
  const [students, setStudents] = useState<any[]>([])
  const [enrolledStudentIds, setEnrolledStudentIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadData()
    }
  }, [isOpen])

  const loadData = async () => {
    setLoading(true)
    try {
      const [allStudents, enrolled] = await Promise.all([
        getAllStudents(),
        getCourseEnrollments(courseId)
      ])
      setStudents(allStudents)
      setEnrolledStudentIds(enrolled)
    } catch (error) {
      console.error("Error loading data:", error)
      toast.error("Error al cargar estudiantes")
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (studentId: string) => {
    setActionLoading(studentId)
    try {
      const result = await enrollStudent(courseId, studentId)
      if (result.success) {
        toast.success("Estudiante inscrito correctamente")
        setEnrolledStudentIds([...enrolledStudentIds, studentId])
        onSuccess?.()
      } else {
        toast.error(result.error || "Error al inscribir estudiante")
      }
    } catch (error) {
      toast.error("Error al inscribir estudiante")
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnenroll = async (studentId: string) => {
    setActionLoading(studentId)
    try {
      const result = await unenrollStudent(courseId, studentId)
      if (result.success) {
        toast.success("Estudiante desinscrito correctamente")
        setEnrolledStudentIds(enrolledStudentIds.filter(id => id !== studentId))
        onSuccess?.()
      } else {
        toast.error(result.error || "Error al desinscribir estudiante")
      }
    } catch (error) {
      toast.error("Error al desinscribir estudiante")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredStudents = students.filter((student) => {
    const name = student.full_name || ""
    const email = student.email || ""
    const search = searchTerm.toLowerCase()
    return name.toLowerCase().includes(search) || email.toLowerCase().includes(search)
  })

  const enrolledStudents = filteredStudents.filter(s => enrolledStudentIds.includes(s.id))
  const notEnrolledStudents = filteredStudents.filter(s => !enrolledStudentIds.includes(s.id))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader onClose={onClose}>
          <DialogTitle>Gestionar Estudiantes del Curso</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          <div className="space-y-4">
            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
              <Input
                type="text"
                placeholder="Buscar estudiante por nombre o correo electrónico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-gray-700"
              />
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                <p className="text-gray-700 uppercase mt-4">Cargando estudiantes...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Estudiantes inscritos */}
                <div>
                  <h3 className="font-semibold text-gray-700 uppercase mb-3 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    Estudiantes Inscritos ({enrolledStudents.length})
                  </h3>
                  {enrolledStudents.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {enrolledStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-3xl"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {student.avatar_url ? (
                              <img
                                src={student.avatar_url}
                                alt={student.full_name || "Usuario"}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                                {(student.full_name || "U").charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate uppercase">
                                {student.full_name || "Sin nombre"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{student.email}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleUnenroll(student.id)}
                            disabled={actionLoading === student.id}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 uppercase cursor-pointer"
                          >
                            {actionLoading === student.id ? (
                              "..."
                            ) : (
                              <>
                                <UserMinus className="h-4 w-4 mr-1" />
                                Quitar
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No hay estudiantes inscritos</p>
                  )}
                </div>

                {/* Estudiantes disponibles */}
                <div>
                  <h3 className="font-semibold text-gray-700 uppercase mb-3 flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    Estudiantes Disponibles ({notEnrolledStudents.length})
                  </h3>
                  {notEnrolledStudents.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notEnrolledStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-3xl hover:border-blue-500 transition-colors duration-500"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {student.avatar_url ? (
                              <img
                                src={student.avatar_url}
                                alt={student.full_name || "Usuario"}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                                {(student.full_name || "U").charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate uppercase">
                                {student.full_name || "Sin nombre"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{student.email}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleEnroll(student.id)}
                            disabled={actionLoading === student.id}
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700 uppercase cursor-pointer"
                          >
                            {actionLoading === student.id ? (
                              "..."
                            ) : (
                              <>
                                <UserPlus className="h-4 w-4 mr-1" />
                                Inscribir
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 uppercase italic">
                      {students.length === 0 
                        ? "No hay estudiantes registrados en el sistema" 
                        : "Todos los estudiantes están inscritos"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogBody>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer uppercase">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
