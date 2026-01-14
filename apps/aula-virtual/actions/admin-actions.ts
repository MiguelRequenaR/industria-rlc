"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { Profile, CourseWithTeacher, Invitation, UserRole } from "@/types/database"
import { nanoid } from "nanoid"

export interface UserWithEmail extends Profile {
  email: string
}

export async function getAllUsers(): Promise<UserWithEmail[]> {
  const supabase = await createClient()

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (profilesError) {
    console.error("Error fetching profiles:", profilesError)
    return []
  }

  if (!profiles || profiles.length === 0) {
    return []
  }

  return profiles as UserWithEmail[]
}

export async function updateUser(
  userId: string, 
  updates: { full_name?: string; role?: UserRole }
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

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)

  if (error) {
    console.error("Error updating user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario actual es admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  // Usar el cliente admin para eliminar el usuario del auth
  const adminClient = createAdminClient()
  const { error } = await adminClient.auth.admin.deleteUser(userId)

  if (error) {
    console.error("Error deleting user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getAllCourses(): Promise<CourseWithTeacher[]> {
  const supabase = await createClient()

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!teacher_id(*)
    `)
    .order("created_at", { ascending: false })

  if (coursesError) {
    console.error("Error fetching courses:", coursesError)
    return []
  }

  if (!courses || courses.length === 0) {
    return []
  }

  return courses.map(course => ({
    ...course,
    teacher: Array.isArray(course.teacher) ? course.teacher[0] || null : course.teacher || null
  })) as CourseWithTeacher[]
}

export interface DashboardStats {
  totalUsers: number
  totalStudents: number
  totalTeachers: number
  totalAdmins: number
  totalCourses: number
  publishedCourses: number
  totalEnrollments: number
  totalModules: number
  totalLessons: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from("profiles")
    .select("role")

  const totalUsers = profiles?.length || 0
  const totalStudents = profiles?.filter(p => p.role === "estudiante").length || 0
  const totalTeachers = profiles?.filter(p => p.role === "docente").length || 0
  const totalAdmins = profiles?.filter(p => p.role === "admin").length || 0

  const { data: courses } = await supabase
    .from("courses")
    .select("is_published")

  const totalCourses = courses?.length || 0
  const publishedCourses = courses?.filter(c => c.is_published).length || 0

  const { count: enrollments } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })

  const { count: modules } = await supabase
    .from("modules")
    .select("*", { count: "exact", head: true })

  const { count: lessons } = await supabase
    .from("lessons")
    .select("*", { count: "exact", head: true })

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalAdmins,
    totalCourses,
    publishedCourses,
    totalEnrollments: enrollments || 0,
    totalModules: modules || 0,
    totalLessons: lessons || 0
  }
}

// ==================== INVITACIONES ====================

export async function createInvitation(role: UserRole): Promise<{ success: boolean; token?: string; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario es admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  // Generar token único
  const token = nanoid(12)

  // Crear invitación
  const { data, error } = await supabase
    .from("invitations")
    .insert({
      token,
      role,
      is_used: false,
      created_by: user.id,
      course_id: null
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating invitation:", error)
    return { success: false, error: error.message }
  }

  return { success: true, token }
}

export async function getAllInvitations(): Promise<Invitation[]> {
  const supabase = await createClient()

  const { data: invitations, error } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching invitations:", error)
    return []
  }

  return invitations || []
}

export async function deleteInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario es admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", invitationId)

  if (error) {
    console.error("Error deleting invitation:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
