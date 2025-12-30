"use client"

import Image from "next/image"

const experiencias = [
  {
    titulo: "Proyecto Eléctrico Industrial",
    lugar: "La Victoria - Lima",
    descripcion: "Instalación completa de sistemas eléctricos en planta de manufactura, incluyendo paneles de control y sistemas de respaldo.",
    fecha: "2024",
    image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    titulo: "Remodelación Comercial",
    lugar: "San Isidro - Lima",
    descripcion: "Renovación integral de espacios comerciales con acabados modernos, iluminación LED y sistemas de climatización.",
    fecha: "2023",
    image: "https://images.unsplash.com/photo-1562324771-4fb277001e1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    titulo: "Sistema de Automatización",
    lugar: "San Jerónimo - Huancayo",
    descripcion: "Implementación de sistema de domótica integral, cableado estructurado y seguridad electrónica de última generación.",
    fecha: "2023",
    image: "https://images.unsplash.com/photo-1645639417590-32e8778b2141?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    titulo: "Instalación de Sistema Fotovoltaico",
    lugar: "Pachacámac - Lima",
    descripcion: "Diseño e instalación de paneles solares en complejo residencial, optimizando el consumo energético y reduciendo la huella de carbono.",
    fecha: "2022",
    image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    titulo: "Obra Civil en Institución Educativa",
    lugar: "El Tambo - Huancayo",
    descripcion: "Construcción y acondicionamiento de aulas, sistemas eléctricos y de emergencia, asegurando ambientes seguros y modernos para los estudiantes.",
    fecha: "2021",
    image: "https://images.unsplash.com/photo-1562324771-4fb277001e1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    titulo: "Modernización de Iluminación Pública",
    lugar: "Cercado de Lima",
    descripcion: "Reemplazo de luminarias tradicionales por tecnología LED, aumentando la eficiencia energética y la seguridad en espacios públicos.",
    fecha: "2022",
    image: "https://images.unsplash.com/photo-1645639417590-32e8778b2141?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

interface ExperienceSectionProps {
  limit?: number
  showTitle?: boolean
}

export default function ExperienceSection({ limit, showTitle = true }: ExperienceSectionProps) {
  const experienciasToShow = limit ? experiencias.slice(0, limit) : experiencias

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
          {experienciasToShow.map((experiencia, index) => (
            <div
              key={index}
              className="relative w-full h-[400px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={experiencia.image}
                alt={experiencia.titulo}
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
                    {experiencia.titulo}
                  </h2>
                  <p className="text-sm text-center mt-1 opacity-90">
                    {experiencia.lugar}
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
                    {experiencia.descripcion}
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    {experiencia.fecha}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
