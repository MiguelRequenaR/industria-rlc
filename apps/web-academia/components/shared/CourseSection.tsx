import Image from "next/image";
import Link from "next/link";
import { Clock, Signal, Monitor, ArrowRight, GraduationCap } from "lucide-react";
import type { Course } from "@/lib/types";

interface CourseSectionProps {
  courses: Course[];
  limit?: number;
  showViewAllButton?: boolean;
}

export default function CourseSection({
  courses,
  limit,
  showViewAllButton = false,
}: CourseSectionProps) {
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  return (
    <section
      className="max-w-7xl mx-auto py-20">
      <div className="text-center mb-20" data-aos="fade-up">
        <span className="text-secondary uppercase font-bold">
          Educación de Calidad
        </span>
        <h2 className="text-primary text-2xl md:text-3xl font-bold mt-3">
          Nuestros Cursos
        </h2>
        <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full" />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-4 md:mx-0" data-aos="fade-up" data-aos-delay="100">
        {
          displayedCourses.map((course) => (
            <Link
              key={course.id}
              href={`/cursos/${course.slug}`}
              className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col group h-[480px]"
            >
              <div className="relative h-64 w-full shrink-0">
                <Image
                  src={course.imageCard}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                {course.badges.map((badge) => (
                  (badge.duration || badge.level || badge.modality) && (
                    <span
                      key={badge.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm text-tertiary"
                    >
                      {badge.duration && (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          {badge.duration}
                        </>
                      )}
                      {badge.level && (
                        <>
                          <Signal className="w-3.5 h-3.5" />
                          {badge.level}
                        </>
                      )}
                      {badge.modality && (
                        <>
                          <Monitor className="w-3.5 h-3.5" />
                          {badge.modality}
                        </>
                      )}
                    </span>
                  )
                ))}
              </div>
              <div className="space-y-2 px-5 grow flex flex-col">
                <h3 className="text-primary text-xl font-bold group-hover:text-secondary transition-colors duration-300 line-clamp-2 overflow-hidden">
                  {course.title}
                </h3>
                <p className="text-tertiary line-clamp-3 overflow-hidden text-ellipsis">
                  {course.description}
                </p>
              </div>
              <div className="pb-5 px-5 shrink-0">
                <div className="text-primary flex items-center gap-2 font-bold">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      {showViewAllButton && (
        <div className="flex justify-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/cursos"
            className="flex items-center gap-2 bg-primary hover:bg-secondary transition-colors duration-500 text-white hover:text-primary rounded-full px-8 py-3 font-bold text-lg shadow-lg hover:shadow-xl group"
          >
            <GraduationCap className="w-5 h-5" />
            Ver Catálogo Completo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      )}
    </section>
  )
}
