"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUpdateLesson } from "@/hooks/use-course"

interface EditLessonModalProps {
  isOpen: boolean
  onClose: () => void
  lessonId: string
  moduleName: string
  initialData: {
    title: string
    meetingLink?: string
    pdfUrl?: string
    isVisible: boolean
  }
}

export function EditLessonModal({
  isOpen,
  onClose,
  lessonId,
  moduleName,
  initialData,
}: EditLessonModalProps) {
  const [title, setTitle] = useState(initialData.title)
  const [meetingLink, setMeetingLink] = useState(initialData.meetingLink || "")
  const [pdfUrl, setPdfUrl] = useState(initialData.pdfUrl || "")
  const [isVisible, setIsVisible] = useState(initialData.isVisible)
  const updateLessonMutation = useUpdateLesson()

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title)
      setMeetingLink(initialData.meetingLink || "")
      setPdfUrl(initialData.pdfUrl || "")
      setIsVisible(initialData.isVisible)
    }
  }, [isOpen, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    updateLessonMutation.mutate(
      {
        lessonId,
        title: title.trim(),
        meetingLink: meetingLink.trim() || undefined,
        pdfUrl: pdfUrl.trim() || undefined,
        isVisible,
      },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!updateLessonMutation.isPending) {
      setTitle(initialData.title)
      setMeetingLink(initialData.meetingLink || "")
      setPdfUrl(initialData.pdfUrl || "")
      setIsVisible(initialData.isVisible)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <div>
              <DialogTitle>Editar Lección</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Módulo: {moduleName}
              </p>
            </div>
          </DialogHeader>

          <DialogBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la Lección <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Conceptos básicos de voltaje"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={updateLessonMutation.isPending}
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700 mb-1">
                  Enlace de Reunión (Opcional)
                </label>
                <input
                  id="meetingLink"
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={updateLessonMutation.isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enlace a Google Meet, Zoom u otra plataforma
                </p>
              </div>

              <div>
                <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  URL del PDF (Opcional)
                </label>
                <input
                  id="pdfUrl"
                  type="url"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={updateLessonMutation.isPending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enlace al material de lectura en PDF
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="isVisible"
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  disabled={updateLessonMutation.isPending}
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
                  Visible para estudiantes
                </label>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateLessonMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateLessonMutation.isPending || !title.trim()}
            >
              {updateLessonMutation.isPending && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {updateLessonMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
