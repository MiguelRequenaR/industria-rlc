import type { Metadata } from "next"
import CoursesWithSearch from "@/components/courses/CoursesWithSearch"
import { getCoursesFromDb } from "@/lib/courses-data"

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Cursos',
  description: 'Explora nuestros cursos especializados: Electricidad Básica, Electricidad Industrial, Instalaciones Eléctricas, Seguridad y Riesgo Eléctrico, Sistemas UPS y más. Certificaciones profesionales reconocidas.',
  keywords: ['cursos electricidad', 'electricidad industrial', 'instalaciones eléctricas', 'UPS', 'seguridad eléctrica', 'certificación técnica'],
  openGraph: {
    title: 'Cursos de Electricidad Industrial | RLC Academy',
    description: 'Cursos técnicos especializados en electricidad con certificación profesional. Modalidades presencial e híbrida.',
    url: 'https://academia.industriarlc.com/cursos',
    type: 'website',
  },
}

export default async function Courses() {
  const courses = await getCoursesFromDb()
  return (
    <main>
      <CoursesWithSearch courses={courses} />
    </main>
  )
}
