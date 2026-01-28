import type { Metadata } from "next"
import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import CourseSection from "@/components/shared/CourseSection"
import ServiceSection from "@/components/home/ServiceSection"
import AboutSection from "@/components/home/AboutSection"
import ContactSection from "@/components/home/ContactSection"
import { getCoursesFromDb } from "@/lib/courses-data"

export const metadata: Metadata = {
  title: 'RLC Academy - Formación Técnica en Electricidad Industrial',
  description: 'RLC Academy ofrece cursos especializados en electricidad industrial, instalaciones eléctricas, sistemas UPS y seguridad eléctrica. Fórmate con los mejores instructores y obtén certificaciones profesionales reconocidas.',
  openGraph: {
    title: 'RLC Academy - Formación Técnica en Electricidad Industrial',
    description: 'Cursos especializados en electricidad industrial, instalaciones eléctricas y sistemas de energía con certificación profesional.',
    url: 'https://academia.industriarlc.com',
    type: 'website',
  },
}

export default async function page() {
  const courses = await getCoursesFromDb()
  const courseOptions = courses.map((c) => ({ id: c.id, title: c.title }))
  return (
    <div>
      <Hero />
      <StatsSection />
      <CourseSection courses={courses} limit={3} showViewAllButton={true} />
      <ServiceSection />
      <AboutSection />
      <ContactSection courses={courseOptions} />
    </div>
  )
}
