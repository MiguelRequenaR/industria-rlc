import type { Course as DbCourse } from "@/types/database";
import type { Course } from "./types";
import { createClient } from "./supabase/server";

const PLACEHOLDER_IMAGE =
  "https://i.ibb.co/Lz7kqHCg/electricidadbasica.jpg";

function mapDbCourseToCourse(row: DbCourse): Course {
  const img = row.image_url || PLACEHOLDER_IMAGE;
  const durationLabel = row.duration_hours > 0 
    ? `${row.duration_hours} ${row.duration_hours === 1 ? 'hora' : 'horas'}` 
    : null;
  
  const modalityLabel = row.modality ?? null;
  const badges = [
    ...(durationLabel ? [{ id: "duration", duration: durationLabel, level: "" }] : []),
    { id: "difficulty", duration: "", level: row.difficulty ?? "Curso" },
    ...(modalityLabel ? [{ id: "modality", duration: "", level: "", modality: modalityLabel }] : []),
  ].filter(Boolean) as { id: string; duration: string; level: string; modality?: string }[];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    imageCard: img,
    imageDetail: img,
    description: row.description ?? "",
    detailedDescription: row.description ?? "",
    badges: badges,
    duration: durationLabel ?? "-",
    modality: row.modality ?? "Por definir",
    objectives: [],
    requirements: [],
    price: 0,
    instructor: { name: "-", cargo: undefined },
    syllabus: [],
    certificate: true,
    includes: [],
  };
}

function mapDbCourseToCourseWithDetails(row: any): Course {
  const img = row.image_url || PLACEHOLDER_IMAGE;
  
  const syllabus = (row.modules || [])
    .sort((a: any, b: any) => a.order_index - b.order_index)
    .map((module: any) => {
      const lessons = (module.lessons || [])
        .filter((lesson: any) => lesson.is_visible)
        .sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
      
      return {
        id: module.id,
        module: module.title,
        duration: `${lessons.length} lecciones`,
        topics: lessons.map((lesson: any) => lesson.title),
      };
    });

  const instructor = row.teacher
    ? {
        name: row.teacher.full_name || "Por asignar",
        cargo: row.teacher.cargo || undefined,
        avatar: row.teacher.avatar_url || undefined,
      }
    : { name: "Por asignar", cargo: undefined };

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    imageCard: img,
    imageDetail: img,
    description: row.description ?? "",
    detailedDescription: row.description ?? "",
    badges: [{ id: "1", duration: "-", level: "Curso" }],
    objectives: [],
    requirements: [],
    duration: "-",
    modality: "Por definir",
    price: 0,
    instructor,
    syllabus,
    certificate: true,
    includes: [],
  };
}


export async function getCoursesFromDb(): Promise<Course[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  return (data as DbCourse[]).map(mapDbCourseToCourse);
}


export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!courses_teacher_id_fkey(
        id,
        full_name,
        avatar_url,
        cargo
      ),
      modules(
        id,
        title,
        order_index,
        lessons(
          id,
          title,
          meeting_link,
          pdf_url,
          is_visible,
          order_index
        )
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    console.error("Error fetching course:", error);
    return null;
  }

  return mapDbCourseToCourseWithDetails(data as any);
}


export async function getAllCourseSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("slug")
    .eq("is_published", true)
    .is("deleted_at", null);

  if (error) {
    console.error("Error fetching course slugs:", error);
    return [];
  }

  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export async function getRelatedCourses(
  currentSlug: string,
  limit: number = 3
): Promise<Course[]> {
  const courses = await getCoursesFromDb();
  return courses.filter((c) => c.slug !== currentSlug).slice(0, limit);
}
