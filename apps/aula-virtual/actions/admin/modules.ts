"use server"

import { createClient } from "@/lib/supabase/server"

export async function createModule(
  courseId: string,
  title: string
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
    return { success: false, error: "No tienes permisos para agregar módulos a este curso" }
  }

  const { data: modules } = await supabase
    .from("modules")
    .select("order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: false })
    .limit(1)

  const nextOrderIndex = modules && modules.length > 0 ? modules[0].order_index + 1 : 0

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

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

  const { data: existingLessons } = await supabase
    .from("lessons")
    .select("order_index")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: false })
    .limit(1)

  const nextOrderIndex = existingLessons && existingLessons.length > 0
    ? (existingLessons[0].order_index ?? -1) + 1
    : 0

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: module } = await supabase
    .from("modules")
    .select("course_id")
    .eq("id", moduleId)
    .single()

  if (!module) {
    return { success: false, error: "Módulo no encontrado" }
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: lesson } = await supabase
    .from("lessons")
    .select("module_id, modules(course_id)")
    .eq("id", lessonId)
    .single()

  if (!lesson) {
    return { success: false, error: "Lección no encontrada" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const moduleData = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
  const courseId = (moduleData as { course_id: string } | null)?.course_id
  if (!courseId) {
    return { success: false, error: "Módulo no encontrado" }
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para editar esta lección" }
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: lesson } = await supabase
    .from("lessons")
    .select("module_id, modules(course_id)")
    .eq("id", lessonId)
    .single()

  if (!lesson) {
    return { success: false, error: "Lección no encontrada" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const moduleData = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
  const courseId = (moduleData as { course_id: string } | null)?.course_id
  if (!courseId) {
    return { success: false, error: "Módulo no encontrado" }
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  const isAdmin = profile?.role === "admin"
  const isTeacher = course?.teacher_id === user.id

  if (!isAdmin && !isTeacher) {
    return { success: false, error: "No tienes permisos para eliminar esta lección" }
  }

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
