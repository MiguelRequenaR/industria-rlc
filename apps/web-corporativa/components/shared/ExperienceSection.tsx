"use client"

import Image from "next/image"
import Link from "next/link"
import { experienceData } from "@/lib/experience-data"

interface ExperienceSectionProps {
  limit?: number
  showTitle?: boolean
}

export default function ExperienceSection({ limit, showTitle = true }: ExperienceSectionProps) {
  const experienciasToShow = limit ? experienceData.slice(0, limit) : experienceData

  return (
    <section
    className="bg-[#f6f6f6] pb-10">
      <div
      className="max-w-7xl mx-auto px-4 md:px-0">
        {showTitle && (
          <div>
            <h2 className="text-center text-primary text-3xl font-light uppercase mb-10">
              Nuestra Experiencia
            </h2>
          </div>
        )}
        <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experienciasToShow.map((experiencia) => (
            <Link
              key={experiencia.id}
              href={`/experiencia/${experiencia.slug}`}
              className="relative w-full h-100 overflow-hidden group cursor-pointer"
            >
              <Image
                src={experiencia.image[0] || ""}
                alt={experiencia.title}
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />

              {/* Overlay con efecto hover */}
              <span
                className="
                  absolute inset-0 
                  bg-primary/80
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out
                "
              />

              {/* Contenido que se desliza hacia arriba en hover */}
              <div className="absolute bottom-0 left-0 w-full z-10 group-hover:-translate-y-[120px] transition-transform duration-500 ease-in-out">
                {/* Título y Lugar - Siempre visibles */}
                <div className="relative bg-primary/80 text-white w-full py-4 px-4">
                  <h2 className="text-xl font-semibold text-center">
                    {experiencia.title}
                  </h2>
                  <p className="text-sm text-center mt-1 opacity-90">
                    {experiencia.location}
                  </p>
                </div>

                {/* Descripción y Fecha - Aparecen en hover */}
                <div className="
                  relative text-white mx-4 mt-4 flex flex-col items-center
                  opacity-0 max-h-0 overflow-hidden
                  group-hover:opacity-100 group-hover:max-h-60
                  transition-all duration-500 ease-in-out
                ">
                  <p className="text-center mb-3">
                    {experiencia.description}
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    {experiencia.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
