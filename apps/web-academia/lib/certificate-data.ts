"use server"

import type { CertificateWithDetails } from "@/types/database"
import { createClient } from "./supabase/server"

export type ValidateCertificateResult =
  | { success: true; certificate: CertificateWithDetails }
  | { success: false; error: string }

export async function validateCertificateByCode(
  code: string
): Promise<ValidateCertificateResult> {
  const trimmed = code?.trim()
  if (!trimmed) {
    return { success: false, error: "Ingresa el código del certificado." }
  }

  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_certificate_by_code", {
    code: trimmed,
  })

  if (error) {
    console.error("Error validando certificado:", error)
    return { success: false, error: "Error al verificar el certificado. Intenta de nuevo." }
  }

  if (!data || typeof data !== "object") {
    return { success: false, error: "No se encontró un certificado con ese código." }
  }

  const raw = data as Record<string, unknown>
  if (!raw.student || !raw.course) {
    return { success: false, error: "Datos del certificado incompletos." }
  }

  const certificate: CertificateWithDetails = {
    id: raw.id as string,
    student_id: raw.student_id as string,
    course_id: raw.course_id as string,
    certificate_code: raw.certificate_code as string,
    issued_at: raw.issued_at as string,
    completion_percentage: raw.completion_percentage as number,
    final_grade: raw.final_grade as number | null,
    pdf_url: raw.pdf_url as string | null,
    created_at: raw.created_at as string,
    student: raw.student as CertificateWithDetails["student"],
    course: raw.course as CertificateWithDetails["course"],
  }

  return { success: true, certificate }
}
