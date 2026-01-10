import Image from "next/image";
import Link from "next/link";
import { Clock, Signal, ArrowRight } from "lucide-react";
import { coursesData } from "@/lib/courses-data";

export default function CourseSection() {
  const courses = coursesData;

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
          courses.map((course) => (
            <Link
              key={course.id}
              href={`/cursos/${course.slug}`}
              className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 block group"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={course.imageCard}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                {course.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex justify-around items-center gap-2 my-2 text-tertiary"
                  >
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {badge.duration}</div>
                    <span className="flex items-center gap-2"><Signal className="w-4 h-4" /> {badge.level}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-primary text-xl font-bold group-hover:text-secondary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-tertiary">
                  {course.description}
                </p>
              </div>
              <div className="pb-5 px-5">
                <div className="text-primary flex items-center gap-2 font-bold">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </section>
  )
}
