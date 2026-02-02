"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { Profile, CourseWithTeacher, Invitation, UserRole, Lesson, BlogPostWithDetails, BlogCategory, BlogPost, CertificateWithDetails } from "@/types/database"
import { nanoid } from "nanoid"
import type { CourseDifficulty, CourseModality, TypedSupabaseClient } from "@/types/database"

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

  const { error } = await supabase
    .from("profiles")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) {
    console.error("Error archiving user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function activateUser(userId: string): Promise<{ success: boolean; error?: string }> {
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
    .update({ deleted_at: null })
    .eq("id", userId)

  if (error) {
    console.error("Error activating user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

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
  totalTrainingHoursDelivered: number
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

  const { data: certificates } = await supabase
    .from("certificates")
    .select("course:courses!course_id(duration_hours)")

  const totalTrainingHoursDelivered =
    certificates?.reduce((acc, c) => {
      const course = Array.isArray(c.course) ? c.course[0] : c.course
      return acc + (course?.duration_hours ?? 0)
    }, 0) ?? 0

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalAdmins,
    totalCourses,
    publishedCourses,
    totalEnrollments: enrollments || 0,
    totalModules: modules || 0,
    totalLessons: lessons || 0,
    totalTrainingHoursDelivered,
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

// ==================== CURSOS ====================

export async function createCourse(
  title: string,
  description?: string,
  imageUrl?: string,
  durationHours?: number,
  difficulty?: CourseDifficulty,
  modality?: CourseModality,
  courseCode?: string
): Promise<{ success: boolean; error?: string; slug?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar permisos (admin o docente)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = profile?.role === "docente"

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para crear cursos" }
  }
  // Caracteres válidos para el sufijo (0-9, A-Z)
  const RLC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  function generateCourseCode(): string {
    let suffix = ""
    for (let i = 0; i < 4; i++) {
      suffix += RLC_CHARS[Math.floor(Math.random() * RLC_CHARS.length)]
    }
    return `RLC-${suffix}`
  }

  async function generateUniqueCourseCode(supabase: TypedSupabaseClient): Promise<string> {
    const maxAttempts = 50
    for (let i = 0; i < maxAttempts; i++) {
      const code = generateCourseCode()
      const { data } = await supabase
        .from("courses")
        .select("id")
        .eq("course_code", code)
        .maybeSingle()
      if (!data) return code
    }
    // Fallback con timestamp si hubiera mucha colisión
    return `RLC-${Date.now().toString(36).toUpperCase().slice(-4).padStart(4, "0")}`
  }

  // Generar slug del título
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios por guiones
    .replace(/-+/g, "-") // Eliminar guiones múltiples

  // Verificar si el slug ya existe
  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existingCourse) {
    return { success: false, error: "Ya existe un curso con ese nombre" }
  }

  // Generar código único del curso (RLC-XXXX)
  const course_code = await generateUniqueCourseCode(supabase)

  // Crear el curso
  const { error } = await supabase
    .from("courses")
    .insert({
      title,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      teacher_id: isTeacher ? user.id : null, // Si es docente, asignarlo automáticamente
      is_published: false,
      duration_hours: durationHours ?? 0,
      difficulty: difficulty ?? "Basico",
      modality: modality ?? "Virtual",
      course_code,
    })

  if (error) {
    console.error("Error creating course:", error)
    return { success: false, error: error.message }
  }

  return { success: true, slug }
}

export async function updateCourse(
  courseId: string,
  title: string,
  description?: string,
  imageUrl?: string,
  durationHours?: number,
  difficulty?: CourseDifficulty,
  modality?: CourseModality,
  courseCode?: string
): Promise<{ success: boolean; error?: string; slug?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar permisos (admin o docente del curso)
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
    return { success: false, error: "No tienes permisos para editar este curso" }
  }

  // Generar nuevo slug del título
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios por guiones
    .replace(/-+/g, "-") // Eliminar guiones múltiples

  // Verificar si el slug ya existe en otro curso
  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .neq("id", courseId)
    .single()

  if (existingCourse) {
    return { success: false, error: "Ya existe otro curso con ese nombre" }
  }

  // Actualizar el curso (course_code no se modifica al editar)
  const { error } = await supabase
    .from("courses")
    .update({
      title,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      duration_hours: durationHours ?? 0,
      difficulty: difficulty ?? "Basico",
      modality: modality ?? "Virtual",
    })
    .eq("id", courseId)

  if (error) {
    console.error("Error updating course:", error)
    return { success: false, error: error.message }
  }

  return { success: true, slug }
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createClient()

  // Verificar que el usuario está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    console.error("Usuario no autenticado")
    return null
  }

  // Obtener el perfil del usuario para verificar su rol
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  // Obtener el curso con el teacher
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!teacher_id(*)
    `)
    .eq("slug", slug)
    .single()

  if (courseError) {
    console.error("Error fetching course:", courseError)
    return null
  }

  const isAdmin = profile?.role === "admin"
  const isTeacher = profile?.role === "docente" && course.teacher_id === user.id
  const isPublished = course.is_published

  if (!isAdmin && !isTeacher && !isPublished) {
    console.error("Usuario sin permisos para ver este curso")
    return null
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select(`
      *,
      lessons(*)
    `)
    .eq("course_id", course.id)
    .order("order_index", { ascending: true })

  if (modulesError) {
    console.error("Error fetching modules:", modulesError)
  }

  const modulesWithSortedLessons = modules?.map(module => ({
    ...module,
    lessons: ((module.lessons || []) as Lesson[]).sort((a, b) => {
      // Ordenar por order_index si existe, sino por id como fallback
      const aOrder = a.order_index ?? null
      const bOrder = b.order_index ?? null
      if (aOrder != null && bOrder != null) {
        return aOrder - bOrder
      }
      // Si alguna lección no tiene order_index, ordenar por id
      return a.id.localeCompare(b.id)
    })
  })) || []

  // Asegurar que los módulos estén ordenados correctamente
  const sortedModules = modulesWithSortedLessons.sort((a, b) => {
    // Primero por order_index
    if (a.order_index !== b.order_index) {
      return a.order_index - b.order_index
    }
    // Fallback por id si order_index es igual
    return a.id.localeCompare(b.id)
  })

  // Obtener estadísticas del curso
  const { count: enrollmentsCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", course.id)

  return {
    ...course,
    teacher: Array.isArray(course.teacher) ? course.teacher[0] || null : course.teacher || null,
    modules: sortedModules,
    enrollmentsCount: enrollmentsCount || 0
  }
}

export async function getAllTeachers(): Promise<Profile[]> {
  const supabase = await createClient()

  const { data: teachers, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "docente")
    .order("full_name", { ascending: true })

  if (error) {
    console.error("Error fetching teachers:", error)
    return []
  }

  return teachers || []
}

export async function assignTeacherToCourse(
  courseId: string,
  teacherId: string | null
): Promise<{ success: boolean; error?: string }> {
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
    .from("courses")
    .update({ teacher_id: teacherId })
    .eq("id", courseId)

  if (error) {
    console.error("Error assigning teacher:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export interface MostViewedCourse {
  id: string
  title: string
  duration_hours: number
  enrollmentsCount: number
  certificatesCount: number
}

export interface MostViewedCourse {
  id: string
  title: string
  duration_hours: number
  enrollmentsCount: number
  certificatesCount: number
}

export async function getMostViewedCourses(limit = 3): Promise<MostViewedCourse[]> {
  const supabase = await createClient()

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")

  if (!enrollments?.length) return []

  const countByCourse = new Map<string, number>()
  for (const e of enrollments) {
    countByCourse.set(e.course_id, (countByCourse.get(e.course_id) ?? 0) + 1)
  }

  const topCourseIds = Array.from(countByCourse.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id)

  if (topCourseIds.length === 0) return []

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, title, duration_hours")
    .in("id", topCourseIds)

  if (coursesError || !courses?.length) return []

  const { data: certificates } = await supabase
    .from("certificates")
    .select("course_id")
    .in("course_id", topCourseIds)

  const certsByCourse = new Map<string, number>()
  for (const c of certificates ?? []) {
    certsByCourse.set(c.course_id, (certsByCourse.get(c.course_id) ?? 0) + 1)
  }

  return topCourseIds.map(courseId => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return null
    return {
      id: course.id,
      title: course.title,
      duration_hours: course.duration_hours ?? 0,
      enrollmentsCount: countByCourse.get(courseId) ?? 0,
      certificatesCount: certsByCourse.get(courseId) ?? 0
    }
  }).filter(Boolean) as MostViewedCourse[]
}

// ==================== MÓDULOS ====================

export async function createModule(
  courseId: string,
  title: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar permisos (admin o docente del curso)
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
    return { success: false, error: "No tienes permisos para agregar módulos a este curso" }
  }

  // Obtener el siguiente order_index
  const { data: modules } = await supabase
    .from("modules")
    .select("order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: false })
    .limit(1)

  const nextOrderIndex = modules && modules.length > 0 ? modules[0].order_index + 1 : 0

  // Crear el módulo
  const { error } = await supabase
    .from("modules")
    .insert({
      course_id: courseId,
      title,
      order_index: nextOrderIndex
    })

  if (error) {
    console.error("Error creating module:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function createLesson(
  moduleId: string,
  title: string,
  meetingLink?: string,
  pdfUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener el curso del módulo para verificar permisos
  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

  // Verificar permisos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", module.course_id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para agregar lecciones a este módulo" }
  }

  // Obtener el siguiente order_index para la lección
  const { data: existingLessons } = await supabase
    .from("lessons")
    .select("order_index")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: false })
    .limit(1)

  const nextOrderIndex = existingLessons && existingLessons.length > 0
    ? (existingLessons[0].order_index ?? -1) + 1
    : 0

  // Crear la lección
  const { error } = await supabase
    .from("lessons")
    .insert({
      module_id: moduleId,
      title,
      meeting_link: meetingLink || null,
      pdf_url: pdfUrl || null,
      is_visible: true,
      order_index: nextOrderIndex
    })

  if (error) {
    console.error("Error creating lesson:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateModule(
  moduleId: string,
  title: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener el curso del módulo para verificar permisos
  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

  // Verificar permisos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", module.course_id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para editar este módulo" }
  }

  // Actualizar el módulo
  const { error } = await supabase
    .from("modules")
    .update({ title })
    .eq("id", moduleId)

  if (error) {
    console.error("Error updating module:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteModule(
  moduleId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener el curso del módulo para verificar permisos
  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

  // Verificar permisos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", module.course_id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para eliminar este módulo" }
  }

  // Eliminar el módulo (las lecciones se eliminarán en cascada)
  const { error } = await supabase
    .from("modules")
    .delete()
    .eq("id", moduleId)

  if (error) {
    console.error("Error deleting module:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateLesson(
  lessonId: string,
  title: string,
  meetingLink?: string,
  pdfUrl?: string,
  isVisible?: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener el módulo y curso de la lección para verificar permisos
  const { data: lesson } = await supabase
    .from("lessons")
    .select("module_id, modules(course_id)")
    .eq("id", lessonId)
    .single()

  if (!lesson) {
    return { success: false, error: "Lección no encontrada" }
  }

  // Verificar permisos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", (lesson.modules as any).course_id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para editar esta lección" }
  }

  // Actualizar la lección
  const { error } = await supabase
    .from("lessons")
    .update({
      title,
      meeting_link: meetingLink || null,
      pdf_url: pdfUrl || null,
      is_visible: isVisible !== undefined ? isVisible : true
    })
    .eq("id", lessonId)

  if (error) {
    console.error("Error updating lesson:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteLesson(
  lessonId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener el módulo y curso de la lección para verificar permisos
  const { data: lesson } = await supabase
    .from("lessons")
    .select("module_id, modules(course_id)")
    .eq("id", lessonId)
    .single()

  if (!lesson) {
    return { success: false, error: "Lección no encontrada" }
  }

  // Verificar permisos
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", (lesson.modules as any).course_id)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para eliminar esta lección" }
  }

  // Eliminar la lección
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", lessonId)

  if (error) {
    console.error("Error deleting lesson:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// ==================== INSCRIPCIONES ====================

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

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar permisos (admin o docente del curso)
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

  // Verificar si ya está inscrito
  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", courseId)
    .eq("student_id", studentId)
    .single()

  if (existingEnrollment) {
    return { success: false, error: "El estudiante ya está inscrito en este curso" }
  }

  // Inscribir al estudiante
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

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar permisos (admin o docente del curso)
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

  // Desinscribir al estudiante
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

// ==================== CONFIGURACIÓN DE CURSO ====================

export async function updateCourseSettings(
  courseId: string,
  settings: {
    is_published?: boolean
    deleted_at?: string | null
  }
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
    return { success: false, error: "No tienes permisos para modificar este curso" }
  }

  const payload = {
    ...settings,
    ...(settings.deleted_at ? { is_published: false } : {}),
  }

  const { error } = await supabase
    .from("courses")
    .update(payload)
    .eq("id", courseId)

  if (error) {
    console.error("Error updating course settings:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// ==================== BLOG ====================

export async function getAllBlogPosts(): Promise<BlogPostWithDetails[]> {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(id, name, slug),
      author:profiles(id, full_name, avatar_url, email)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return posts as BlogPostWithDetails[]
}

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching blog categories:", error)
    return []
  }

  return categories || []
}

export async function createBlogCategory(
  name: string,
  slug: string
): Promise<{ success: boolean; error?: string }> {
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
    return { success: false, error: "No tienes permisos para crear categorías" }
  }

  // Verificar si el slug ya existe
  const { data: existing } = await supabase
    .from("blog_categories")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existing) {
    return { success: false, error: "Ya existe una categoría con ese slug" }
  }

  // Crear categoría
  const { error } = await supabase
    .from("blog_categories")
    .insert({ name, slug })

  if (error) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt?: string
  image_url?: string
  category_id?: string
  author_id: string
  read_time?: string
  content: any
  is_featured?: boolean
  is_published?: boolean
}): Promise<{ success: boolean; error?: string }> {
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
    return { success: false, error: "No tienes permisos para crear posts" }
  }

  // Verificar si el slug ya existe
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", data.slug)
    .single()

  if (existing) {
    return { success: false, error: "Ya existe un post con ese slug" }
  }

  // Crear post
  const { error } = await supabase
    .from("blog_posts")
    .insert({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      image_url: data.image_url || null,
      category_id: data.category_id || null,
      author_id: data.author_id,
      read_time: data.read_time || "5 min de Lectura",
      content: data.content,
      is_featured: data.is_featured || false,
      is_published: data.is_published || false
    })

  if (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateBlogPost(
  postId: string,
  data: Partial<BlogPost>
): Promise<{ success: boolean; error?: string }> {
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
    return { success: false, error: "No tienes permisos para editar posts" }
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(data)
    .eq("id", postId)

  if (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteBlogPost(
  postId: string
): Promise<{ success: boolean; error?: string }> {
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
    return { success: false, error: "No tienes permisos para eliminar posts" }
  }

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", postId)

  if (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
