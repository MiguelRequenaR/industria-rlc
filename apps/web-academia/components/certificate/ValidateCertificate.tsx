"use client"

import React, { useState, useEffect, useRef } from "react"
import { pdf } from "@react-pdf/renderer"
import { validateCertificateByCode } from "@/lib/certificate-data"
import { CertificateDocument } from "./CertificateDocument"
import { formatModulesDescription } from "@/lib/certificate-utils"
import type { CertificateWithDetails } from "@/types/database"

function formatIssueDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatIssueDateForPdf(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function ValidateCertificate() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [certificate, setCertificate] = useState<CertificateWithDetails | null>(null)
  const [enrollmentDate, setEnrollmentDate] = useState<string | null>(null)
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const blobUrlRef = useRef<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCertificate(null)
    setEnrollmentDate(null)
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
    setGeneratedPdfUrl(null)
    setLoading(true)
    try {
      const result = await validateCertificateByCode(code)
      if (result.success) {
        setCertificate(result.certificate)
        setEnrollmentDate(result.enrollmentDate ?? null)
      } else {
        setError(result.error)
      }
    } finally {
      setLoading(false)
    }
  }

  // Generar PDF en cliente cuando no hay pdf_url
  useEffect(() => {
    if (!certificate || certificate.pdf_url) {
      setGeneratedPdfUrl(null)
      setPdfGenerating(false)
      return
    }
    let cancelled = false
    setPdfGenerating(true)
    setGeneratedPdfUrl(null)
    const issueDateFormatted = formatIssueDateForPdf(certificate.issued_at)
    const periodStartDate = enrollmentDate
      ? formatIssueDateForPdf(enrollmentDate)
      : issueDateFormatted
    const studentName = certificate.student.full_name ?? "—"
    const courseName = certificate.course.title
    const durationHours = certificate.course.duration_hours ?? 0
    const note = certificate.final_grade ?? 0
    const modality = certificate.course.modality ?? "Virtual"
    const modulesDescription = formatModulesDescription(certificate.course.modules)
    pdf(
      <CertificateDocument
        studentName={studentName}
        courseName={courseName}
        issueDate={issueDateFormatted}
        certificateCode={certificate.certificate_code}
        durationHours={durationHours}
        note={note}
        periodStartDate={periodStartDate}
        periodEndDate={issueDateFormatted}
        modality={modality}
        modulesDescription={modulesDescription}
      />
    )
      .toBlob()
      .then((blob: Blob) => {
        if (cancelled) return
        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
        const url = URL.createObjectURL(blob)
        blobUrlRef.current = url
        setGeneratedPdfUrl(url)
      })
      .catch((err: unknown) => {
        if (!cancelled) console.error("Error generando PDF:", err)
      })
      .finally(() => {
        if (!cancelled) setPdfGenerating(false)
      })
    return () => {
      cancelled = true
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
        blobUrlRef.current = null
      }
    }
  }, [certificate, enrollmentDate])

  function handleDownloadGeneratedPdf() {
    if (!generatedPdfUrl || !certificate) return
    const link = document.createElement("a")
    link.href = generatedPdfUrl
    link.download = `Certificado-${certificate.course.title.replace(/\s+/g, "-")}-${certificate.certificate_code}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="max-w-7xl mx-auto py-30">
      <div className="bg-secondary p-10 rounded-2xl space-y-5 mx-4 md:mx-0">
        <h2 className="text-2xl font-bold text-primary">Validar Certificado</h2>
        <p className="text-primary">
          Valida tu certificado para garantizar su autenticidad y vigencia, asegurando que fue emitido por nuestra institución. Para prevenir fraudes, y brindar confianza en el uso de documentos oficiales y transacciones digitales.
        </p>
      </div>
      <div className="mt-20 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mx-4 md:mx-0">
          <div>
            <label htmlFor="certificate-number" className="text-primary">
              Código de Certificado<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="certificate-number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              className="w-full p-2 rounded-md border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary text-primary disabled:opacity-70"
              placeholder="Ejemplo: CERT-202X-AAAAAAAA"
            />
          </div>
          {error && (
            <p className="mt-2 text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-xl mt-5 cursor-pointer hover:bg-secondary transition-colors duration-500 hover:text-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando…" : "Validar Certificado"}
          </button>
        </form>

        {certificate && (
          <div className="mt-12 space-y-6 mx-4 md:mx-0">
            <div className="bg-secondary/20 p-6 rounded-2xl border border-secondary/40 space-y-3">
              <h3 className="text-xl font-bold text-primary">Certificado válido</h3>
              <dl className="grid gap-2 text-primary">
                <div>
                  <dt className="font-semibold text-sm text-primary/80">Nombre</dt>
                  <dd>{certificate.student.full_name ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-primary/80">Curso</dt>
                  <dd>{certificate.course.title}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-primary/80">Código del certificado</dt>
                  <dd className="font-mono">{certificate.certificate_code}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-primary/80">Fecha de emisión</dt>
                  <dd>{formatIssueDate(certificate.issued_at)}</dd>
                </div>
              </dl>
            </div>

            {certificate.pdf_url ? (
              <div className="rounded-2xl overflow-hidden border border-secondary/40 bg-white">
                <div className="flex items-center justify-between p-3 bg-secondary/20">
                  <p className="text-primary text-sm font-semibold">
                    Documento del certificado
                  </p>
                  <a
                    href={certificate.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm underline hover:no-underline"
                  >
                    Abrir PDF en nueva pestaña
                  </a>
                </div>
                <iframe
                  src={certificate.pdf_url}
                  title="Certificado en PDF"
                  className="w-full aspect-297/210"
                />
              </div>
            ) : pdfGenerating ? (
              <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-12 text-center text-primary">
                <p className="font-semibold">Generando PDF del certificado…</p>
                <p className="text-sm mt-1">Un momento, por favor.</p>
              </div>
            ) : generatedPdfUrl ? (
              <div className="rounded-2xl overflow-hidden border border-secondary/40 bg-white">
                <div className="flex items-center justify-between p-3 bg-secondary/20">
                  <p className="text-primary text-sm font-semibold">
                    Documento del certificado
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadGeneratedPdf}
                    className="text-primary text-sm underline hover:no-underline font-semibold cursor-pointer"
                  >
                    Descargar PDF
                  </button>
                </div>
                <iframe
                  src={generatedPdfUrl}
                  title="Certificado en PDF"
                  className="w-full aspect-297/210"
                />
              </div>
            ) : (
              <p className="text-primary/80 text-sm">
                No se pudo generar la vista previa del certificado.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
