import type { SupabaseClient } from "@supabase/supabase-js"

export type UserRole = "admin" | "docente" | "estudiante"
export type ContentType = "video" | "pdf" | "meet_link" | "quiz"

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  email: string
  created_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  image_url: string | null
  teacher_id: string | null
  is_published: boolean
  created_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  enrolled_at: string
  created_at: string
}

export interface Module {
  id: string
  course_id: string
  title: string
  order_index: number
  created_at: string
}

export interface Lesson {
  id: string
  module_id: string | null
  title: string
  meeting_link: string | null
  pdf_url: string | null
  is_visible: boolean
  order_index?: number
}

export interface Progress {
  student_id: string
  lesson_id: string
  is_completed: boolean
  completed_at: string
}

export interface Grade {
  id: string
  course_id: string
  student_id: string
  item_name: string
  score: number | null
  feedback: string | null
  created_at: string
}

export interface Invitation {
  id: string
  token: string
  role: UserRole
  course_id: string | null
  is_used: boolean
  created_by: string | null
  created_at: string
}

export interface CourseWithTeacher extends Course {
  teacher: Profile | null
}

export interface EnrollmentWithDetails extends Enrollment {
  student: Profile
  course: Course
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[]
}

export interface LessonWithProgress extends Lesson {
  progress: Progress | null
}

export interface CourseWithModules extends Course {
  modules: ModuleWithLessons[]
  teacher: Profile | null
}

export interface StudentProgress {
  student: Profile
  completed_lessons: number
  total_lessons: number
  percentage: number
}

export interface GradeWithStudent extends Grade {
  student: Profile
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Profile, "id" | "created_at">>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Course, "id" | "created_at">>
      }
      enrollments: {
        Row: Enrollment
        Insert: Omit<Enrollment, "id" | "enrolled_at"> & { id?: string }
        Update: Partial<Omit<Enrollment, "id" | "enrolled_at">>
      }
      modules: {
        Row: Module
        Insert: Omit<Module, "id" | "created_at"> & { 
          id?: string
          order_index?: number 
        }
        Update: Partial<Omit<Module, "id" | "created_at">>
      }
      lessons: {
        Row: Lesson
        Insert: Omit<Lesson, "id"> & { 
          id?: string
          is_visible?: boolean
          order_index?: number
        }
        Update: Partial<Omit<Lesson, "id">>
      }
      progress: {
        Row: Progress
        Insert: Omit<Progress, "completed_at"> & { 
          is_completed?: boolean 
        }
        Update: Partial<Omit<Progress, "student_id" | "lesson_id">>
      }
      grades: {
        Row: Grade
        Insert: Omit<Grade, "id" | "created_at"> & { id?: string }
        Update: Partial<Omit<Grade, "id" | "created_at">>
      }
      invitations: {
        Row: Invitation
        Insert: Omit<Invitation, "id" | "created_at"> & { 
          id?: string
          is_used?: boolean
          role: UserRole
        }
        Update: Partial<Omit<Invitation, "id" | "created_at">>
      }
    }
    Enums: {
      user_role: UserRole
      content_type: ContentType
    }
  }
}

export type CourseFormData = Omit<Course, "id" | "created_at" | "slug">
export type ModuleFormData = Omit<Module, "id" | "created_at">
export type LessonFormData = Omit<Lesson, "id" | "order_index">
export type GradeFormData = Omit<Grade, "id" | "created_at">

export type TypedSupabaseClient = SupabaseClient<Database>