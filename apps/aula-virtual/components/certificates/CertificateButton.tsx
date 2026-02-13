"use client"

import { useState, useEffect } from "react"
import { Download, Award, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { pdf } from '@react-pdf/renderer'
import { CertificateDocument } from "./CertificateDocument"
import { 
  checkCertificateEligibility, 
  generateCertificate, 
  getStudentCertificate 
} from "@/actions/student-actions"
import { Button } from "@/components/ui/button"

interface CertificateButtonProps {
  courseId: string
  courseName: string
  studentName: string
}

export function CertificateButton({ courseId, courseName, studentName }: CertificateButtonProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isEligible, setIsEligible] = useState(false)
  const [hasCertificate, setHasCertificate] = useState(false)
  const [eligibilityInfo, setEligibilityInfo] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [certificate, setCertificate] = useState<any>(null)
  const [enrollmentDate, setEnrollmentDate] = useState<string>("")

  useEffect(() => {
    checkEligibility()
  }, [courseId])

  const checkEligibility = async () => {
    setIsChecking(true)
    const info = await checkCertificateEligibility(courseId)
    setEligibilityInfo(info)
    setIsEligible(info.isEligible)
    setHasCertificate(info.hasCertificate)
    
    // Si ya tiene certificado, obtenerlo
    if (info.hasCertificate) {
      const result = await getStudentCertificate(courseId)
      setCertificate(result.certificate)
      setEnrollmentDate(result.enrollmentDate || "")
    }
    
    setIsChecking(false)
  }

  const handleGenerateCertificate = async () => {
    setIsGenerating(true)
    
    const result = await generateCertificate(courseId)
    
    if (result.success && result.certificate) {
      setCertificate(result.certificate)
      setEnrollmentDate(result.enrollmentDate || "")
      setHasCertificate(true)
      setIsEligible(false)
      
      // Descargar automáticamente después de generar
      await downloadCertificate(result.certificate, result.enrollmentDate || "")
    } else {
      alert(result.error || "Error al generar certificado")
    }
    
    setIsGenerating(false)
  }

  const downloadCertificate = async (cert: any = certificate, enrollDate: string = enrollmentDate) => {
    if (!cert) return
    
    setIsDownloading(true)
    
    try {
      const issueDate = new Date(cert.issued_at).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })

      const periodStartDate = enrollDate
        ? new Date(enrollDate).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : issueDate

      const durationHours = cert.course?.duration_hours ?? 0

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

      // Descargar el archivo
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Certificado-${courseName.replace(/\s+/g, '-')}-${cert.certificate_code}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading certificate:", error)
      alert("Error al descargar el certificado")
    }
    
    setIsDownloading(false)
  }

  if (isChecking) {
    return (
      <div className="bg-secondary/20 rounded-3xl p-6">
        <div className="flex items-center justify-center gap-2 text-gray-700 uppercase">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-gray-700 uppercase">Verificando elegibilidad...</span>
        </div>
      </div>
    )
  }

  // Si ya tiene certificado
  if (hasCertificate && certificate) {
    return (
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg border-2 border-green-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900 uppercase">
              ¡Certificado Obtenido!
            </h3>
            <p className="text-sm text-green-700 uppercase">
              Código: {certificate.certificate_code}
            </p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-3xl p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700 uppercase">Emitido el:</p>
              <p className="font-semibold text-gray-900 uppercase">
                {new Date(certificate.issued_at).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-700 uppercase">Nota Final:</p>
              <p className="font-semibold text-gray-900 uppercase">
                {certificate.final_grade?.toFixed(2)} / 20
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => downloadCertificate()}
          disabled={isDownloading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Descargando...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Descargar Certificado
            </>
          )}
        </Button>
      </div>
    )
  }

  // Si es elegible para obtener certificado
  if (isEligible) {
    return (
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border-2 border-blue-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900">
              ¡Felicidades! Puedes obtener tu certificado
            </h3>
            <p className="text-sm text-blue-700">
              Has cumplido todos los requisitos
            </p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Progreso:</p>
              <p className="font-semibold text-green-700">
                ✓ {eligibilityInfo.completionPercentage}% Completado
              </p>
            </div>
            <div>
              <p className="text-gray-600">Promedio Final:</p>
              <p className="font-semibold text-green-700">
                ✓ {eligibilityInfo.finalGrade.toFixed(2)} / 20
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerateCertificate}
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generando Certificado...
            </>
          ) : (
            <>
              <Award className="h-5 w-5" />
              Generar Certificado
            </>
          )}
        </Button>
      </div>
    )
  }

  // No es elegible
  return (
    <div className="bg-secondary/20 rounded-3xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gray-400 rounded-xl flex items-center justify-center shadow-lg">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-700 uppercase">
            Certificado No Disponible
          </h3>
          <p className="text-sm text-gray-700 uppercase">
            Debes cumplir los siguientes requisitos:
          </p>
        </div>
      </div>
      
      <div className="bg-white/80 rounded-3xl p-4 mb-4">
        <ul className="space-y-2 text-sm text-gray-700 uppercase">
          {eligibilityInfo?.reasons.map((reason: string, index: number) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-red-500 mt-0.5">●</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 rounded-3xl p-4">
        <p className="text-sm text-blue-800 uppercase">
          <strong>Estado actual:</strong>
        </p>
        <div className="mt-2 space-y-1 text-sm text-blue-700 uppercase">
          <p>• Progreso: {eligibilityInfo?.completionPercentage}%</p>
          <p>• Promedio: {eligibilityInfo?.finalGrade.toFixed(2)} / 20</p>
        </div>
      </div>
    </div>
  )
}
