"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText, Video, ExternalLink, Info, Download } from "lucide-react"
import { LessonWithProgressStatus } from "@/actions/student-actions"

interface LessonContentProps {
  lesson: LessonWithProgressStatus
  onMarkCompleted: () => void
  isMarkingCompleted: boolean
}

function getDriveFileId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

function getDriveDownloadUrl(pdfUrl: string): string {
  const fileId = getDriveFileId(pdfUrl)
  return fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : pdfUrl
}

export function LessonContent({ lesson, onMarkCompleted, isMarkingCompleted }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-700 uppercase mb-2">{lesson.title}</h1>
          {lesson.is_completed && (
            <div className="flex items-center gap-2 text-green-600 uppercase">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Lección completada</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido de la lección */}
      <div className="space-y-6">
        {/* Video/Contenido multimedia */}
        {lesson.meeting_link && (
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border-2 border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 uppercase">Clase en Vivo</h3>
                <p className="text-blue-700 uppercase">Únete a la sesión de Google Meet</p>
              </div>
            </div>
            <a
              href={lesson.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors uppercase"
            >
              <ExternalLink className="h-5 w-5" />
              Unirse a la Reunión
            </a>
          </div>
        )}

        {/* PDF/Material */}
        {lesson.pdf_url && (
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border-2 border-purple-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 uppercase">Material de Estudio</h3>
                <p className="text-purple-700 uppercase">Descarga o visualiza el contenido</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={lesson.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors uppercase"
              >
                <ExternalLink className="h-5 w-5" />
                Ver PDF
              </a>
              <a
                href={getDriveDownloadUrl(lesson.pdf_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors uppercase"
              >
                <Download className="h-5 w-5" />
                Descargar PDF
              </a>
            </div>
          </div>
        )}

        {/* Si no hay contenido específico */}
        {!lesson.meeting_link && !lesson.pdf_url && (
          <div className="bg-secondary/20 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 uppercase mb-2">
              Contenido no disponible
            </h3>
            <p className="text-gray-700 uppercase">
              El contenido de esta lección estará disponible próximamente
            </p>
          </div>
        )}
      </div>

      {!lesson.is_completed && (
        <div className="pt-6 border-t border-gray-200">
          <Button
            onClick={onMarkCompleted}
            disabled={isMarkingCompleted}
            className="w-full md:w-auto bg-green-600 text-white hover:bg-green-700 px-8 py-3 text-lg cursor-pointer"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {isMarkingCompleted ? "Marcando..." : "Marcar como Completada"}
          </Button>
        </div>
      )}

      {!lesson.is_completed && (
        <div className="flex items-center gap-2 text-secondary">
          <Info className="h-5 w-5" />
          Recuerda marcar la lección como completada para obtener el certificado.
        </div>
      )}
    </div>
  )
}
