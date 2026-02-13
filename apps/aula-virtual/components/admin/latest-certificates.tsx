"use client"

import { useState } from "react"
import { Download, Loader2, User } from "lucide-react"
import { pdf } from "@react-pdf/renderer"
import { CertificateDocument } from "@/components/certificates/CertificateDocument"
import { type CertificateForAdmin } from "@/actions/admin-actions"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Hace un momento"
  if (diffMins < 60) return `Hace ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`
  if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`
  if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? "semana" : "semanas"}`
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
}

interface LatestCertificatesProps {
  certificates: CertificateForAdmin[]
}

export function LatestCertificates({ certificates }: LatestCertificatesProps) {
  const [downloadingCertId, setDownloadingCertId] = useState<string | null>(null)

  const downloadCertificate = async (cert: CertificateForAdmin) => {
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
      const studentName = cert.student?.full_name || "Estudiante"

      const blob = await pdf(
        <CertificateDocument
          studentName={studentName}
          courseName={courseName}
          issueDate={issueDate}
          certificateCode={cert.certificate_code}
          durationHours={durationHours}
          note={cert.final_grade ?? 0}
          periodStartDate={periodStartDate}
          periodEndDate={issueDate}
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

  if (certificates.length === 0) {
    return (
      <p className="text-sm text-gray-500">No hay certificados emitidos aún.</p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {certificates.map((cert) => {
        const student = cert.student
        const studentName = student?.full_name || "Estudiante"
        const courseName = cert.course?.title || "Curso"
        const timeAgo = getTimeAgo(new Date(cert.issued_at))

        return (
          <div
            key={cert.id}
            className="flex items-center gap-3 p-3 rounded-3xl bg-blue-50"
          >
            <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {student?.avatar_url ? (
                <img
                  src={student.avatar_url}
                  alt={studentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] uppercase text-blue-500 truncate">
                {studentName}
              </p>
              <p className="text-sm uppercase text-blue-500 truncate">
                {courseName}
              </p>
              <p className="text-xs text-gray-700 uppercase">{timeAgo}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 bg-blue-100 border border-blue-500 cursor-pointer"
              disabled={downloadingCertId !== null}
              onClick={() => downloadCertificate(cert)}
            >
              {downloadingCertId === cert.id ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              ) : (
                <Download className="w-4 h-4 text-blue-500" />
              )}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
