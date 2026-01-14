"use server"

import { createClient } from "@/lib/supabase/server"
import { CourseWithTeacher, Profile, Grade, StudentProgress } from "@/types/database"

// ==================== ESTADÍSTICAS DEL DASHBOARD ====================

export interface TeacherDashboardStats {
  totalStudents: number
  assignedCourses: number
  pendingGrades: number
  recentActivity: {
    completedLessonsThisWeek: number
    activeStudentsThisWeek: number
  }
}

export async function getTeacherDashboardStats(): Promise<TeacherDashboardStats> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return {
      totalStudents: 0,
      assignedCourses: 0,
      pendingGrades: 0,
      recentActivity: {
        completedLessonsThisWeek: 0,
        activeStudentsThisWeek: 0
      }
    }
  }

  // Obtener cursos asignados al docente
  const { data: courses } = await supabase
    .from("courses")
    .select("id")
    .eq("teacher_id", user.id)

  const courseIds = courses?.map(c => c.id) || []
  const assignedCourses = courseIds.length

  // Obtener estudiantes únicos inscritos en los cursos del docente
  let totalStudents = 0
  if (courseIds.length > 0) {
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("student_id")
      .in("course_id", courseIds)

    const uniqueStudents = new Set(enrollments?.map(e => e.student_id) || [])
    totalStudents = uniqueStudents.size
  }

  // Calcular actividad reciente (últimos 7 días)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const oneWeekAgoISO = oneWeekAgo.toISOString()

  let completedLessonsThisWeek = 0
  let activeStudentsThisWeek = 0

  if (courseIds.length > 0) {
    // Obtener todas las lecciones de los cursos del docente
    const { data: modules } = await supabase
      .from("modules")
      .select("id")
      .in("course_id", courseIds)

    const moduleIds = modules?.map(m => m.id) || []

    if (moduleIds.length > 0) {
      const { data: lessons } = await supabase
        .from("lessons")
        .select("id")
        .in("module_id", moduleIds)

      const lessonIds = lessons?.map(l => l.id) || []

      if (lessonIds.length > 0) {
        // Obtener progreso completado esta semana
        const { data: recentProgress } = await supabase
          .from("progress")
          .select("student_id, lesson_id")
          .in("lesson_id", lessonIds)
          .eq("is_completed", true)
          .gte("completed_at", oneWeekAgoISO)

        completedLessonsThisWeek = recentProgress?.length || 0
        const activeStudents = new Set(recentProgress?.map(p => p.student_id) || [])
        activeStudentsThisWeek = activeStudents.size
      }
    }
  }

  return {
    totalStudents,
    assignedCourses,
    pendingGrades: 0, // Por implementar cuando tengas entregas
    recentActivity: {
      completedLessonsThisWeek,
      activeStudentsThisWeek
    }
  }
}

// ==================== CURSOS DEL DOCENTE ====================

export async function getTeacherCourses(): Promise<CourseWithTeacher[]> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!teacher_id(*)
    `)
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching teacher courses:", error)
    return []
  }

  return courses.map(course => ({
    ...course,
    teacher: Array.isArray(course.teacher) ? course.teacher[0] || null : course.teacher || null
  })) as CourseWithTeacher[]
}

// ==================== CALIFICACIONES ====================

export interface StudentWithGrades {
  student: Profile
  grades: Grade[]
  student_id: string
  enrolled_at: string
  full_name: string | null
  email: string
  avatar_url: string | null
}

export async function getStudentsByCourse(courseId: string): Promise<StudentWithGrades[]> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
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
    console.error("No tienes permisos para ver los estudiantes de este curso")
    return []
  }

  // Obtener estudiantes inscritos con fecha de inscripción
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      student_id,
      created_at,
      student:profiles!student_id(*)
    `)
    .eq("course_id", courseId)

  if (!enrollments) {
    return []
  }

  // Obtener calificaciones de cada estudiante
  const studentsWithGrades: StudentWithGrades[] = []

  for (const enrollment of enrollments) {
    const student = Array.isArray(enrollment.student) 
      ? enrollment.student[0] 
      : enrollment.student

    if (!student) continue

    const { data: grades } = await supabase
      .from("grades")
      .select("*")
      .eq("course_id", courseId)
      .eq("student_id", enrollment.student_id)
      .order("created_at", { ascending: false })

    studentsWithGrades.push({
      student: student as Profile,
      grades: grades || [],
      student_id: enrollment.student_id,
      enrolled_at: enrollment.created_at,
      full_name: student.full_name,
      email: student.email,
      avatar_url: student.avatar_url
    })
  }

  return studentsWithGrades
}

export async function createGrade(
  courseId: string,
  studentId: string,
  itemName: string,
  score: number,
  feedback?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario es el docente del curso
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  if (!course || course.teacher_id !== user.id) {
    return { success: false, error: "No tienes permisos para calificar en este curso" }
  }

  // Verificar que el estudiante está inscrito
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("course_id", courseId)
    .eq("student_id", studentId)
    .single()

  if (!enrollment) {
    return { success: false, error: "El estudiante no está inscrito en este curso" }
  }

  // Crear la calificación
  const { error } = await supabase
    .from("grades")
    .insert({
      course_id: courseId,
      student_id: studentId,
      item_name: itemName,
      score,
      feedback: feedback || null
    })

  if (error) {
    console.error("Error creating grade:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateGrade(
  gradeId: string,
  updates: {
    item_name?: string
    score?: number
    feedback?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario es el docente del curso
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener la calificación para verificar permisos
  const { data: grade } = await supabase
    .from("grades")
    .select("course_id")
    .eq("id", gradeId)
    .single()

  if (!grade) {
    return { success: false, error: "Calificación no encontrada" }
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", grade.course_id)
    .single()

  if (!course || course.teacher_id !== user.id) {
    return { success: false, error: "No tienes permisos para modificar esta calificación" }
  }

  // Actualizar la calificación
  const { error } = await supabase
    .from("grades")
    .update(updates)
    .eq("id", gradeId)

  if (error) {
    console.error("Error updating grade:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteGrade(gradeId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar que el usuario es el docente del curso
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Obtener la calificación para verificar permisos
  const { data: grade } = await supabase
    .from("grades")
    .select("course_id")
    .eq("id", gradeId)
    .single()

  if (!grade) {
    return { success: false, error: "Calificación no encontrada" }
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", grade.course_id)
    .single()

  if (!course || course.teacher_id !== user.id) {
    return { success: false, error: "No tienes permisos para eliminar esta calificación" }
  }

  // Eliminar la calificación
  const { error } = await supabase
    .from("grades")
    .delete()
    .eq("id", gradeId)

  if (error) {
    console.error("Error deleting grade:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// ==================== SEGUIMIENTO DE ESTUDIANTES ====================

export async function getStudentsProgressByCourse(courseId: string): Promise<StudentProgress[]> {
  const supabase = await createClient()

  // Verificar que el usuario es el docente del curso
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  if (!course || course.teacher_id !== user.id) {
    console.error("No tienes permisos para ver el seguimiento de este curso")
    return []
  }

  // Obtener total de lecciones del curso
  const { data: modules } = await supabase
    .from("modules")
    .select("id")
    .eq("course_id", courseId)

  const moduleIds = modules?.map(m => m.id) || []

  if (moduleIds.length === 0) {
    return []
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id")
    .in("module_id", moduleIds)

  const totalLessons = lessons?.length || 0

  if (totalLessons === 0) {
    return []
  }

  const lessonIds = lessons?.map(l => l.id) || []

  // Obtener estudiantes inscritos
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      student_id,
      student:profiles!student_id(*)
    `)
    .eq("course_id", courseId)

  if (!enrollments) {
    return []
  }

  // Calcular progreso de cada estudiante
  const studentsProgress: StudentProgress[] = []

  for (const enrollment of enrollments) {
    const student = Array.isArray(enrollment.student) 
      ? enrollment.student[0] 
      : enrollment.student

    if (!student) continue

    // Contar lecciones completadas
    const { data: completedLessons } = await supabase
      .from("progress")
      .select("lesson_id")
      .eq("student_id", enrollment.student_id)
      .in("lesson_id", lessonIds)
      .eq("is_completed", true)

    const completedCount = completedLessons?.length || 0
    const percentage = Math.round((completedCount / totalLessons) * 100)

    studentsProgress.push({
      student: student as Profile,
      completed_lessons: completedCount,
      total_lessons: totalLessons,
      percentage
    })
  }

  // Ordenar por porcentaje (menor a mayor para ver quién se está quedando atrás)
  studentsProgress.sort((a, b) => a.percentage - b.percentage)

  return studentsProgress
}

export interface StudentLessonProgress {
  lesson: {
    id: string
    title: string
    module_title: string
  }
  is_completed: boolean
  completed_at: string | null
}

export async function getStudentLessonsProgress(
  courseId: string,
  studentId: string
): Promise<StudentLessonProgress[]> {
  const supabase = await createClient()

  // Verificar que el usuario es el docente del curso
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", courseId)
    .single()

  if (!course || course.teacher_id !== user.id) {
    console.error("No tienes permisos para ver el seguimiento de este curso")
    return []
  }

  // Obtener módulos y lecciones del curso
  const { data: modules } = await supabase
    .from("modules")
    .select(`
      id,
      title,
      lessons(*)
    `)
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })

  if (!modules) {
    return []
  }

  const lessonsProgress: StudentLessonProgress[] = []

  for (const module of modules) {
    const lessons = Array.isArray(module.lessons) ? module.lessons : []
    
    for (const lesson of lessons) {
      // Obtener progreso de esta lección para el estudiante
      const { data: progress } = await supabase
        .from("progress")
        .select("*")
        .eq("student_id", studentId)
        .eq("lesson_id", lesson.id)
        .single()

      lessonsProgress.push({
        lesson: {
          id: lesson.id,
          title: lesson.title,
          module_title: module.title
        },
        is_completed: progress?.is_completed || false,
        completed_at: progress?.completed_at || null
      })
    }
  }

  return lessonsProgress
}
