"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Clock, Signal, Award, BookOpen, Users, Target, FileCheck, GraduationCap, ArrowLeft, Zap } from "lucide-react"
import type { Course } from "@/lib/types"
import { getRelatedCourses } from "@/lib/courses-data"

interface CourseDetailPageProps {
  course: Course
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const relatedCourses = getRelatedCourses(course.slug)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-white mb-8 hover:text-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a Cursos
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
              <div className="flex flex-wrap gap-4">
                {course.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">{badge.duration}</span>
                  </div>
                ))}
                {course.badges[0] && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <Signal className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">{course.badges[0].level}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">{course.modality}</span>
                </div>
              </div>
              <div className="pt-4">
                <div className="text-white/80 text-sm mb-2">Precio del curso:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-secondary">S/ {course.price}</span>
                  <span className="text-white/60">+ IGV</span>
                </div>
                <Link 
                  href={`/contacto?curso=${course.slug}`}
                  className="mt-6 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 transition-colors duration-300 text-primary rounded-xl px-8 py-4 font-bold text-lg"
                >
                  <Users className="w-5 h-5" />
                  Inscribirme Ahora
                </Link>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
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

      {/* What You Will Learn */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div data-aos="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary rounded-full p-3">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Objetivos del Curso</h2>
            </div>
            <div className="space-y-4">
              {course.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <p className="text-tertiary">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary rounded-full p-3">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Requisitos</h2>
            </div>
            <div className="space-y-4">
              {course.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></div>
                  <p className="text-tertiary">{requirement}</p>
                </div>
              ))}
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
              <div className="bg-secondary rounded-full w-40 h-40 mx-auto flex items-center justify-center">
                <Users className="w-20 h-20 text-primary" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-secondary uppercase font-bold text-sm">Tu Instructor</span>
                <h2 className="text-3xl font-bold mt-2">{course.instructor.name}</h2>
                <p className="text-white/80 mt-1">{course.instructor.experience}</p>
              </div>
              <p className="text-white/90 text-lg">
                {course.instructor.bio}
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.includes.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="bg-secondary/10 rounded-full p-2 shrink-0">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-tertiary font-medium">{item}</p>
              </div>
            ))}
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
              href={`/contacto?curso=${course.slug}`}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 transition-colors duration-300 text-primary rounded-xl px-8 py-4 font-bold text-lg"
            >
              <Users className="w-5 h-5" />
              Inscribirme Ahora
            </Link>
            <Link 
              href="/contacto"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300 text-white rounded-xl px-8 py-4 font-bold text-lg border-2 border-white/30"
            >
              Solicitar Más Información
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCourses.map((relatedCourse, index) => (
              <Link
                key={relatedCourse.id}
                href={`/cursos/${relatedCourse.slug}`}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative h-48">
                    <Image
                      src={relatedCourse.imageCard}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center gap-4 mb-3 text-sm text-tertiary">
                      {relatedCourse.badges[0] && (
                        <>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{relatedCourse.badges[0].duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Signal className="w-4 h-4" />
                            <span>{relatedCourse.badges[0].level}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-tertiary text-sm">
                      {relatedCourse.description}
                    </p>
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
