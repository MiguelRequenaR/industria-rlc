"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCreateLesson } from "@/hooks/use-course"

interface AddLessonModalProps {
  isOpen: boolean
  onClose: () => void
  moduleId: string
  moduleName: string
}

export function AddLessonModal({
  isOpen,
  onClose,
  moduleId,
  moduleName,
}: AddLessonModalProps) {
  const [title, setTitle] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const createLessonMutation = useCreateLesson()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    createLessonMutation.mutate(
      {
        moduleId,
        title: title.trim(),
        meetingLink: meetingLink.trim() || undefined,
        pdfUrl: pdfUrl.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTitle("")
          setMeetingLink("")
          setPdfUrl("")
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!createLessonMutation.isPending) {
      setTitle("")
      setMeetingLink("")
      setPdfUrl("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <div>
              <DialogTitle>Agregar Nueva Lección</DialogTitle>
              <p className="text-sm text-gray-700 uppercase mt-1">
                Módulo: {moduleName}
              </p>
            </div>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm uppercase font-medium text-gray-700 mb-1">
                  Título de la Lección <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Conceptos básicos de voltaje"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={createLessonMutation.isPending}
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="meetingLink" className="block text-sm uppercase font-medium text-gray-700 mb-1">
                  Enlace de Reunión (Opcional)
                </label>
                <input
                  id="meetingLink"
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={createLessonMutation.isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enlace a Google Meet, Zoom u otra plataforma
                </p>
              </div>

              <div>
                <label htmlFor="pdfUrl" className="block text-sm uppercase font-medium text-gray-700 mb-1">
                  URL del PDF (Opcional)
                </label>
                <input
                  id="pdfUrl"
                  type="url"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={createLessonMutation.isPending}
                />
                <p className="text-xs text-gray-700 uppercase mt-1">
                  Enlace al material de lectura en PDF
                </p>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createLessonMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createLessonMutation.isPending || !title.trim()}
            >
              {createLessonMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {createLessonMutation.isPending ? "Creando..." : "Crear Lección"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
