"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Award, Users, GraduationCap, ArrowLeft, Zap, Info, ArrowRight, Tag, Calendar } from "lucide-react"
import type { Course } from "@/lib/types"

interface CourseDetailPageProps {
  course: Course
  relatedCourses: Course[]
}

export default function CourseDetailPage({ course, relatedCourses }: CourseDetailPageProps) {

  const formatDate = (value?: string | null) => {
    if (!value) return null
    const iso = value.split("T")[0]
    const parts = iso.split("-")
    if (parts.length !== 3) return null
    const [year, month, day] = parts
    if (!year || !month || !day) return null
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
  }

  const formattedStartDate = formatDate(course.startDate)
  const formattedEndDate = formatDate(course.endDate)
  const formattedPrice =
    typeof course.price === "number"
      ? course.price.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
        })
      : null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-white mb-8 hover:text-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a Cursos
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-xl font-bold">
                <GraduationCap className="w-5 h-5" />
                Curso Especializado
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              <p className="text-white/90 text-lg">
                {course.detailedDescription}
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                <div className="bg-secondary text-primary rounded-xl p-5 flex flex-col gap-2 hover:bg-primary hover:text-secondary border border-transparent hover:border-secondary transition-all duration-300 group cursor-pointer">
                  <p className="text-sm font-semibold uppercase">
                    Fecha de inicio:
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary group-hover:text-secondary transition-all duration-300" />
                    <p className="text-xl font-semibold">
                      {formattedStartDate ?? "Por definir"}
                    </p>
                  </div>
                </div>
                <div className="bg-secondary text-primary rounded-xl p-5 flex flex-col gap-2 hover:bg-primary hover:text-secondary border border-transparent hover:border-secondary transition-all duration-300 group cursor-pointer">
                  <p className="text-sm font-semibold uppercase">
                    Inversión:
                  </p>
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary group-hover:text-secondary transition-all duration-300" />
                    <p className="text-xl font-semibold">
                      {formattedPrice ?? "Consultar"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href={`/contacto`}
                  className="mt-6 inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-secondary border border-transparent hover:border-secondary transition-all duration-300 text-primary rounded-xl px-8 py-4 font-bold text-lg"
                >
                  <Users className="w-5 h-5" />
                  Inscribirme Ahora
                </Link>
              </div>
            </div>
            <div className="relative mx-4 md:mx-0" data-aos="zoom-in">
              <Image
                src={course.imageDetail}
                alt={course.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              {course.certificate && (
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary rounded-full p-3">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Incluye</p>
                      <p className="text-lg font-bold text-primary">Certificado</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-secondary uppercase font-bold">Contenido del Curso</span>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mt-3">
              Temario Detallado
            </h2>
            <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full mt-4" />
          </div>
          <div className="space-y-6">
            {course.syllabus.map((module, index) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary rounded-xl p-3 shrink-0">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{module.module}</h3>
                      <div className="flex items-center gap-2 text-tertiary text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-20">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-secondary shrink-0 mt-1" fill="currentColor" />
                      <span className="text-tertiary">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="bg-linear-to-br from-primary to-primary/90 rounded-3xl p-10 text-white" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="bg-secondary rounded-full w-40 h-40 mx-auto flex items-center justify-center overflow-hidden">
                {course.instructor.avatar ? (
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={160}
                    height={160}
                    className="w-40 h-40 object-cover"
                  />
                ) : (
                  <Users className="w-20 h-20 text-primary" />
                )}
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-secondary uppercase font-bold text-sm">Tu Instructor</span>
                <h2 className="text-3xl font-bold mt-2">{course.instructor.name}</h2>
                {course.instructor.cargo && (
                  <p className="text-white/80 mt-1 text-xl">
                    {course.instructor.cargo}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-secondary uppercase font-bold">Todo Incluido</span>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mt-3">
              ¿Qué Incluye el Curso?
            </h2>
            <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
            {/* Certificado de finalización */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-all duration-500">
              <h3 className="text-xl font-bold text-secondary mb-1">Certificado de Finalización</h3>
              <p className="text-gray-600 text-center">Obtén un certificado digital al completar el curso para potenciar tu perfil profesional.</p>
            </div>
            {/* Material de estudio */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-all duration-500" >
              <h3 className="text-xl font-bold text-secondary mb-1">Material de Estudio</h3>
              <p className="text-gray-600 text-center">Acceso a apuntes, PDFs y recursos descargables para que no te pierdas ningún contenido.</p>
            </div>
            {/* Clases en vivo */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-all duration-500" >
              <h3 className="text-xl font-bold text-secondary mb-1">Clases en Vivo</h3>
              <p className="text-gray-600 text-center">Participa en clases en vivo y resuelve tus dudas directamente con el instructor y tus compañeros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Comenzar tu Transformación Profesional?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Únete a cientos de profesionales que han potenciado su carrera con RLC Academy 360
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/contacto`}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 transition-colors duration-300 text-primary rounded-xl px-8 py-4 font-bold text-lg"
            >
              <Users className="w-5 h-5" />
              Inscribirse
            </Link>
            <Link
              href="/contacto"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300 text-white rounded-xl px-8 py-4 font-bold text-lg border-2 border-white/30"
            >
              <Info className="w-5 h-5" />
              Información
            </Link>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto py-20 px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="text-secondary uppercase font-bold">Más Opciones</span>
            <h2 className="text-primary text-3xl md:text-4xl font-bold mt-3">
              Cursos Relacionados
            </h2>
            <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10" data-aos="fade-up">
            {relatedCourses.map((relatedCourse, index) => (
              <Link
                key={relatedCourse.id}
                href={`/cursos/${relatedCourse.slug}`}
                className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col group h-[450px]"
              >
                <div className="relative h-64 w-full shrink-0">
                  <Image
                    src={relatedCourse.imageCard}
                    alt={relatedCourse.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-5 grow flex flex-col">
                  <h3 className="text-primary text-xl font-bold group-hover:text-secondary transition-colors duration-300 line-clamp-2 overflow-hidden">
                    {relatedCourse.title}
                  </h3>
                  <p className="text-tertiary line-clamp-3 overflow-hidden text-ellipsis">
                    {relatedCourse.description}
                  </p>
                </div>
                <div className="pb-5 px-5 shrink-0">
                  <div className="text-primary flex items-center gap-2 font-bold">
                    Ver Detalles
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
