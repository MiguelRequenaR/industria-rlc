import Image from "next/image";
import Link from "next/link";
import { Clock, Signal, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    name: "Electricidad Básica",
    description: "Domina los circuitos de potencia, control de motores y normativas de seguridad eléctrica.",
    link: "/cursos/electricidad-basica",
    image: "https://images.unsplash.com/photo-1711722806211-740a6bdf1c69?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badgets: [
      {
        id: 1,
        span1: "40 horas",
        span2: "Intermedio"
      }
    ]
  }
]

export default function CourseSection() {
  return (
    <section
      className="max-w-7xl mx-auto py-20">
      <div className="text-center mb-10">
        <span className="text-secondary uppercase font-bold">
          Educación de Calidad
        </span>
        <h2 className="text-primary text-2xl md:text-3xl font-bold mt-3">
          Nuestros Cursos Destacados
        </h2>
        <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full" />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-4 md:mx-0">
        {
          courses.map((course) => (
            <div
              key={course.id} className="rounded-2xl overflow-hidden shadow-2xl">
              <div>
                <Image
                  src={course.image}
                  alt={course.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                {course.badgets.map((badget) => (
                  <div
                    key={badget.id}
                    className="flex justify-around items-center gap-2 my-2 text-tertiary"
                  >
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {badget.span1}</div>
                    <span className="flex items-center gap-2"><Signal className="w-4 h-4" /> {badget.span2}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-primary text-xl font-bold">
                  {course.name}
                </h3>
                <p className="text-tertiary">
                  {course.description}
                </p>
              </div>
              <div className="group pb-5">
                <Link href={course.link} className=" text-primary px-5 py-2 rounded-full flex items-center gap-2 font-bold">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}
