"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { Profile, CourseWithTeacher, Invitation, UserRole, Lesson, BlogPostWithDetails, BlogCategory, BlogPost } from "@/types/database"
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

// ==================== CURSOS ====================

export async function createCourse(
  title: string,
  description?: string,
  imageUrl?: string
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

  // Crear el curso
  const { error } = await supabase
    .from("courses")
    .insert({
      title,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      teacher_id: isTeacher ? user.id : null, // Si es docente, asignarlo automáticamente
      is_published: false
    })

  if (error) {
    console.error("Error creating course:", error)
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

  // Verificar permisos según RLS:
  // - Admin puede ver todos los cursos
  // - Teacher puede ver sus propios cursos
  // - Estudiantes solo pueden ver cursos publicados
  const isAdmin = profile?.role === "admin"
  const isTeacher = profile?.role === "docente" && course.teacher_id === user.id
  const isPublished = course.is_published

  if (!isAdmin && !isTeacher && !isPublished) {
    console.error("Usuario sin permisos para ver este curso")
    return null
  }

  // Obtener módulos con lecciones
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

  // Ordenar las lecciones de cada módulo por order_index
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
