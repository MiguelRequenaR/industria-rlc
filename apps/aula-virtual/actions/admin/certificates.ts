"use server"

import { createClient } from "@/lib/supabase/server"
import { CertificateWithDetails } from "@/types/database"

export type CertificateForAdmin = CertificateWithDetails & { enrollmentDate?: string }

export async function getCertificatesByStudentId(
  studentId: string
): Promise<{ certificates: CertificateForAdmin[]; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { certificates: [], error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { certificates: [], error: "No tienes permisos para realizar esta acción" }
  }

  const { data: certificates, error: certError } = await supabase
    .from("certificates")
    .select(
      `
      *,
      course:courses!course_id(*)
    `
    )
    .eq("student_id", studentId)
    .order("issued_at", { ascending: false })

  if (certError) {
    console.error("Error fetching certificates:", certError)
    return { certificates: [], error: certError.message }
  }

  if (!certificates?.length) {
    return { certificates: [] }
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id, enrolled_at")
    .eq("student_id", studentId)

  const enrollmentByCourse = new Map(
    (enrollments ?? []).map((e) => [e.course_id, e.enrolled_at])
  )

  const withDates = certificates.map((c) => ({
    ...c,
    enrollmentDate: enrollmentByCourse.get(c.course_id) ?? undefined,
  })) as CertificateForAdmin[]

  return { certificates: withDates }
}

export async function getLatestCertificates(
  limit = 4
): Promise<CertificateForAdmin[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return []
  }

  const { data: certificates, error: certError } = await supabase
    .from("certificates")
    .select(
      `
      *,
      student:profiles!student_id(id, full_name, avatar_url),
      course:courses!course_id(id, title, duration_hours)
    `
    )
    .order("issued_at", { ascending: false })
    .limit(limit)

  if (certError || !certificates?.length) {
    return []
  }

  const normalized = certificates.map((c) => ({
    ...c,
    student: Array.isArray(c.student) ? c.student[0] ?? null : c.student,
    course: Array.isArray(c.course) ? c.course[0] ?? null : c.course,
  })) as CertificateForAdmin[]

  return normalized
}
