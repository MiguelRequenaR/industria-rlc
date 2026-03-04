"use server"

import { createClient } from "@/lib/supabase/server"
import { Profile, CourseWithTeacher, Lesson } from "@/types/database"
import type { CourseDifficulty, CourseModality, TypedSupabaseClient } from "@/types/database"

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

export interface MostViewedCourse {
  id: string
  title: string
  duration_hours: number
  enrollmentsCount: number
  certificatesCount: number
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

function generateCourseCode(): string {
  const RLC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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
  return `RLC-${Date.now().toString(36).toUpperCase().slice(-4).padStart(4, "0")}`
}

export async function createCourse(
  title: string,
  description?: string,
  imageUrl?: string,
  durationHours?: number,
  difficulty?: CourseDifficulty,
  modality?: CourseModality,
  courseCode?: string,
  startDate?: string,
  endDate?: string,
  price?: number
): Promise<{ success: boolean; error?: string; slug?: string }> {
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

  const isAdmin = profile?.role === "admin"
  const isTeacher = profile?.role === "docente"

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para crear cursos" }
  }

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existingCourse) {
    return { success: false, error: "Ya existe un curso con ese nombre" }
  }

  const course_code = await generateUniqueCourseCode(supabase)

  const { error } = await supabase
    .from("courses")
    .insert({
      title,
      slug,
      description: description || null,
      image_url: imageUrl || null,
      teacher_id: isTeacher ? user.id : null,
      is_published: false,
      duration_hours: durationHours ?? 0,
      difficulty: difficulty ?? "Basico",
      modality: modality ?? "Virtual",
      course_code,
      start_date: startDate || null,
      end_date: endDate || null,
      price: price ?? 0,
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
  courseCode?: string,
  startDate?: string,
  endDate?: string,
  price?: number
): Promise<{ success: boolean; error?: string; slug?: string }> {
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
    return { success: false, error: "No tienes permisos para editar este curso" }
  }

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .neq("id", courseId)
    .single()

  if (existingCourse) {
    return { success: false, error: "Ya existe otro curso con ese nombre" }
  }

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
      start_date: startDate || null,
      end_date: endDate || null,
      price: price ?? 0,
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    console.error("Usuario no autenticado")
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

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
      const aOrder = a.order_index ?? null
      const bOrder = b.order_index ?? null
      if (aOrder != null && bOrder != null) {
        return aOrder - bOrder
      }
      return a.id.localeCompare(b.id)
    })
  })) || []

  const sortedModules = modulesWithSortedLessons.sort((a, b) => {
    if (a.order_index !== b.order_index) {
      return a.order_index - b.order_index
    }
    return a.id.localeCompare(b.id)
  })

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
