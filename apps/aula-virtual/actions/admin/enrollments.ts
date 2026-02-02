"use server"

import { createClient } from "@/lib/supabase/server"
import { Profile } from "@/types/database"

export async function getAllStudents(): Promise<Profile[]> {
  const supabase = await createClient()

  const { data: students, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "estudiante")
    .order("full_name", { ascending: true })

  if (error) {
    console.error("Error fetching students:", error)
    return []
  }

  return students || []
}

export async function getCourseEnrollments(courseId: string): Promise<string[]> {
  const supabase = await createClient()

  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select("student_id")
    .eq("course_id", courseId)

  if (error) {
    console.error("Error fetching enrollments:", error)
    return []
  }

  return enrollments?.map(e => e.student_id) || []
}

export async function enrollStudent(
  courseId: string,
  studentId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para inscribir estudiantes" }
  }

  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", courseId)
    .eq("student_id", studentId)
    .single()

  if (existingEnrollment) {
    return { success: false, error: "El estudiante ya está inscrito en este curso" }
  }

  const { error } = await supabase
    .from("enrollments")
    .insert({
      course_id: courseId,
      student_id: studentId
    })

  if (error) {
    console.error("Error enrolling student:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function unenrollStudent(
  courseId: string,
  studentId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para desinscribir estudiantes" }
  }

  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("course_id", courseId)
    .eq("student_id", studentId)

  if (error) {
    console.error("Error unenrolling student:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
