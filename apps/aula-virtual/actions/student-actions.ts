"use server"

import { createClient } from "@/lib/supabase/server"
import { CourseWithTeacher, Grade, GradeWithStudent } from "@/types/database"

// ==================== CURSOS DEL ESTUDIANTE ====================

export interface EnrolledCourseWithProgress extends CourseWithTeacher {
  completed_lessons: number
  total_lessons: number
  progress_percentage: number
}

export async function getStudentEnrolledCourses(): Promise<EnrolledCourseWithProgress[]> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  // Obtener cursos inscritos
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from("enrollments")
    .select(`
      course_id,
      course:courses!course_id(
        *,
        teacher:profiles!teacher_id(*)
      )
    `)
    .eq("student_id", user.id)

  if (enrollmentsError || !enrollments) {
    console.error("Error fetching enrollments:", enrollmentsError)
    return []
  }

  // Procesar cada curso para calcular el progreso
  const coursesWithProgress: EnrolledCourseWithProgress[] = []

  for (const enrollment of enrollments) {
    const course = Array.isArray(enrollment.course) 
      ? enrollment.course[0] 
      : enrollment.course

    if (!course) continue

    // Obtener total de lecciones del curso
    const { data: modules } = await supabase
      .from("modules")
      .select("id")
      .eq("course_id", course.id)

    const moduleIds = modules?.map(m => m.id) || []

    let totalLessons = 0
    let completedLessons = 0

    if (moduleIds.length > 0) {
      const { data: lessons } = await supabase
        .from("lessons")
        .select("id")
        .in("module_id", moduleIds)
        .eq("is_visible", true)

      totalLessons = lessons?.length || 0
      const lessonIds = lessons?.map(l => l.id) || []

      if (lessonIds.length > 0) {
        // Contar lecciones completadas
        const { data: progress } = await supabase
          .from("progress")
          .select("lesson_id")
          .eq("student_id", user.id)
          .in("lesson_id", lessonIds)
          .eq("is_completed", true)

        completedLessons = progress?.length || 0
      }
    }

    const progressPercentage = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100) 
      : 0

    coursesWithProgress.push({
      ...course,
      teacher: Array.isArray(course.teacher) 
        ? course.teacher[0] || null 
        : course.teacher || null,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      progress_percentage: progressPercentage,
    })
  }

  return coursesWithProgress
}

// ==================== CONTENIDO DEL CURSO (AULA VIRTUAL) ====================

export interface LessonWithProgressStatus {
  id: string
  title: string
  meeting_link: string | null
  pdf_url: string | null
  is_visible: boolean
  is_completed: boolean
}

export interface ModuleWithLessonsProgress {
  id: string
  title: string
  order_index: number
  lessons: LessonWithProgressStatus[]
}

export interface CourseContentForStudent {
  course: CourseWithTeacher
  modules: ModuleWithLessonsProgress[]
  enrollmentsCount: number
}

export async function getCourseContentForStudent(slug: string): Promise<CourseContentForStudent | null> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  // Obtener el curso
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!teacher_id(*)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (courseError || !course) {
    console.error("Error fetching course:", courseError)
    return null
  }

  // Verificar que el estudiante esté inscrito
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", user.id)
    .eq("course_id", course.id)
    .single()

  if (!enrollment) {
    console.error("Student not enrolled in this course")
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
    return null
  }

  // Obtener progreso del estudiante
  const modulesWithProgress: ModuleWithLessonsProgress[] = []

  for (const module of modules || []) {
    const lessons = Array.isArray(module.lessons) ? module.lessons : []
    const lessonsWithProgress: LessonWithProgressStatus[] = []

    for (const lesson of lessons) {
      if (!lesson.is_visible) continue

      // Verificar si está completada
      const { data: progress } = await supabase
        .from("progress")
        .select("is_completed")
        .eq("student_id", user.id)
        .eq("lesson_id", lesson.id)
        .single()

      lessonsWithProgress.push({
        ...lesson,
        is_completed: progress?.is_completed || false,
      })
    }

    modulesWithProgress.push({
      id: module.id,
      title: module.title,
      order_index: module.order_index,
      lessons: lessonsWithProgress,
    })
  }

  // Obtener count de inscripciones
  const { count: enrollmentsCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", course.id)

  return {
    course: {
      ...course,
      teacher: Array.isArray(course.teacher) 
        ? course.teacher[0] || null 
        : course.teacher || null,
    },
    modules: modulesWithProgress,
    enrollmentsCount: enrollmentsCount || 0,
  }
}

// ==================== MARCAR LECCIÓN COMO COMPLETADA ====================

export async function markLessonAsCompleted(lessonId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  // Verificar si ya existe un registro de progreso
  const { data: existingProgress } = await supabase
    .from("progress")
    .select("*")
    .eq("student_id", user.id)
    .eq("lesson_id", lessonId)
    .single()

  if (existingProgress) {
    // Actualizar a completado
    const { error } = await supabase
      .from("progress")
      .update({ is_completed: true })
      .eq("student_id", user.id)
      .eq("lesson_id", lessonId)

    if (error) {
      console.error("Error updating progress:", error)
      return { success: false, error: error.message }
    }
  } else {
    // Crear nuevo registro
    const { error } = await supabase
      .from("progress")
      .insert({
        student_id: user.id,
        lesson_id: lessonId,
        is_completed: true,
      })

    if (error) {
      console.error("Error creating progress:", error)
      return { success: false, error: error.message }
    }
  }

  return { success: true }
}

// ==================== CALIFICACIONES DEL ESTUDIANTE ====================

export interface StudentGradesByCourse {
  course: CourseWithTeacher
  grades: Grade[]
  average: number
}

export async function getStudentGrades(): Promise<StudentGradesByCourse[]> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  // Obtener cursos inscritos
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      course_id,
      course:courses!course_id(
        *,
        teacher:profiles!teacher_id(*)
      )
    `)
    .eq("student_id", user.id)

  if (!enrollments) {
    return []
  }

  const gradesByCourse: StudentGradesByCourse[] = []

  for (const enrollment of enrollments) {
    const course = Array.isArray(enrollment.course) 
      ? enrollment.course[0] 
      : enrollment.course

    if (!course) continue

    // Obtener calificaciones del estudiante para este curso
    const { data: grades } = await supabase
      .from("grades")
      .select("*")
      .eq("student_id", user.id)
      .eq("course_id", course.id)
      .order("created_at", { ascending: false })

    const gradesList = grades || []
    
    // Calcular promedio
    let average = 0
    if (gradesList.length > 0) {
      const sum = gradesList.reduce((acc, grade) => acc + (grade.score || 0), 0)
      average = parseFloat((sum / gradesList.length).toFixed(2))
    }

    gradesByCourse.push({
      course: {
        ...course,
        teacher: Array.isArray(course.teacher) 
          ? course.teacher[0] || null 
          : course.teacher || null,
      },
      grades: gradesList,
      average,
    })
  }

  return gradesByCourse
}

export async function getStudentGradesByCourse(courseId: string): Promise<{ grades: Grade[]; average: number }> {
  const supabase = await createClient()

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { grades: [], average: 0 }
  }

  // Verificar que el estudiante esté inscrito
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", user.id)
    .eq("course_id", courseId)
    .single()

  if (!enrollment) {
    return { grades: [], average: 0 }
  }

  // Obtener calificaciones
  const { data: grades } = await supabase
    .from("grades")
    .select("*")
    .eq("student_id", user.id)
    .eq("course_id", courseId)
    .order("created_at", { ascending: false })

  const gradesList = grades || []
  
  // Calcular promedio
  let average = 0
  if (gradesList.length > 0) {
    const sum = gradesList.reduce((acc, grade) => acc + (grade.score || 0), 0)
    average = parseFloat((sum / gradesList.length).toFixed(2))
  }

  return { grades: gradesList, average }
}
