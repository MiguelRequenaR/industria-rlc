"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUpdateModule } from "@/hooks/use-course"

interface EditModuleModalProps {
  isOpen: boolean
  onClose: () => void
  moduleId: string
  initialTitle: string
}

export function EditModuleModal({
  isOpen,
  onClose,
  moduleId,
  initialTitle,
}: EditModuleModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const updateModuleMutation = useUpdateModule()

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle)
    }
  }, [isOpen, initialTitle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    updateModuleMutation.mutate(
      { moduleId, title: title.trim() },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!updateModuleMutation.isPending) {
      setTitle(initialTitle)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Editar Módulo</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm uppercase font-medium text-gray-700 mb-1">
                  Título del Módulo <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Introducción a la Electricidad"
                  className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  disabled={updateModuleMutation.isPending}
                  autoFocus
                />
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateModuleMutation.isPending}
              className="uppercase cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateModuleMutation.isPending || !title.trim()}
              className="uppercase cursor-pointer"
            >
              {updateModuleMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {updateModuleMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
