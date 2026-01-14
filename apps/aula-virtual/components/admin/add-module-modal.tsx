"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCreateModule } from "@/hooks/use-course"

interface AddModuleModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
}

export function AddModuleModal({
  isOpen,
  onClose,
  courseId,
}: AddModuleModalProps) {
  const [title, setTitle] = useState("")
  const createModuleMutation = useCreateModule()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    createModuleMutation.mutate(
      { courseId, title: title.trim() },
      {
        onSuccess: () => {
          setTitle("")
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!createModuleMutation.isPending) {
      setTitle("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Agregar Nuevo Módulo</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título del Módulo <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Introducción a la Electricidad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={createModuleMutation.isPending}
                  autoFocus
                />
              </div>

              <p className="text-sm text-gray-500">
                El módulo se agregará al final de la lista. Podrás reordenarlo después.
              </p>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createModuleMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createModuleMutation.isPending || !title.trim()}
            >
              {createModuleMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {createModuleMutation.isPending ? "Creando..." : "Crear Módulo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
