"use client"

import Image from "next/image"

const ventajas = [
  {
    titulo: "+10 Años de Experiencia",
    descripcion: "Brindando soluciones de alta calidad desde 2015, respaldados por un equipo profesional comprometido con la excelencia.",
    image: "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "row-span-2"
  },
  {
    titulo: "Equipo Certificado",
    descripcion: "Profesionales altamente capacitados y certificados en las últimas tecnologías del sector.",
    image: "https://images.unsplash.com/photo-1597502310092-31cdaa35b46d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  },
  {
    titulo: "Tecnología Avanzada",
    descripcion: "Utilizamos equipos y herramientas de última generación para garantizar resultados óptimos.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  },
  {
    titulo: "Calidad Garantizada",
    descripcion: "Todos nuestros proyectos cuentan con garantía y seguimiento post-instalación.",
    image: "https://images.unsplash.com/photo-1660330590022-9f4ff56b63f6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  },
  {
    titulo: "Precios Competitivos",
    descripcion: "Ofrecemos las mejores soluciones al mejor precio del mercado, sin comprometer la calidad.",
    image: "https://images.unsplash.com/photo-1660330589487-39cc0177ba89?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  },
  {
    titulo: "Atención Personalizada",
    descripcion: "Cada proyecto es único y recibe atención personalizada según sus necesidades específicas.",
    image: "https://images.unsplash.com/photo-1566417110090-6b15a06ec800?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  },
  {
    titulo: "Respaldo y Confianza",
    descripcion: "Cientos de clientes satisfechos nos respaldan y confían en nuestro trabajo.",
    image: "https://images.unsplash.com/photo-1596962677810-62375eba1de3?q=80&w=1488&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: ""
  }
]

export default function AdvantageSection() {
  return (
    <section
    className="bg-[#f6f6f6] py-20">
      <div
      className="max-w-7xl mx-auto px-4 md:px-0" data-aos="fade-up">
        <div>
          <h2 className="text-center text-primary text-3xl font-bold uppercase">
            Nuestras <span className="text-secondary">Ventajas</span>
          </h2>
          <hr className="w-50 border-t-2 mx-auto border-secondary mb-10" />
        </div>
        <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]" data-aos="fade-up" data-aos-delay="100">
          {ventajas.map((ventaja, index) => (
            <div
              key={index}
              className={`${ventaja.span} group perspective-1000 cursor-pointer`}
              style={{ perspective: "1000px" }}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image 
                    src={ventaja.image} 
                    alt={ventaja.titulo} 
                    width={500} 
                    height={500} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-2xl font-semibold text-center px-4 uppercase">
                    {ventaja.titulo}
                  </h3>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 w-full h-full bg-primary rounded-2xl flex items-center justify-center px-6"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <p className="text-white text-center text-sm md:text-base">
                    {ventaja.descripcion}
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
