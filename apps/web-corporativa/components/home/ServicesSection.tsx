"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

const areasTrabajo = [
  {
    name: "Construcción",
    description: "Obras de construcción y mantenimiento, diseño de proyectos, remodelaciones en pintura, trabajos con drywall, etc.",
    image: "https://images.unsplash.com/photo-1591076787947-aaa4dec435d8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Industrial",
    description: "Instalaciones eléctricas, mantenimientos y reparaciones, sistemas de potencia, iluminación, instalación de paneles eléctricos, etc.",
    image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sistemas",
    description: "Instalaciones de sistemas de domótica y automatización, cableado estructurado, y seguridad electrónica, etc.",
    image: "https://images.unsplash.com/photo-1645639417590-32e8778b2141?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Residencial",
    description: "Diseño y planificación de proyectos, consultoría en ingeniería de proyectos, proyectos en eficiencia energética, etc.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
]

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerSlide, setCardsPerSlide] = useState(3)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1) // Móvil: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2) // Tablet: 2 cards
      } else {
        setCardsPerSlide(3) // Desktop: 3 cards
      }
      setCurrentSlide(0) // Reiniciar al primer slide cuando cambia el tamaño
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(areasTrabajo.length / cardsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="bg-[#f6f6f6] py-20">
      <div
        className="max-w-7xl mx-auto px-4 md:px-0">
        <div data-aos="fade-up">
          <h2 className="text-center text-primary text-3xl font-light uppercase">
            Sectores de Trabajo
          </h2>
        </div>

        <div className="relative mt-10" data-aos="fade-up" data-aos-delay="100">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-primary hover:text-white border-2 border-primary text-primary p-3 rounded-full shadow-lg transition-all z-20"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-primary hover:text-white border-2 border-primary text-primary p-3 rounded-full shadow-lg transition-all z-20"
                aria-label="Siguiente"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Cards Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className={`grid gap-4 ${
                    cardsPerSlide === 1 ? 'grid-cols-1' : 
                    cardsPerSlide === 2 ? 'grid-cols-2' : 
                    'grid-cols-3'
                  }`}>
                    {areasTrabajo
                      .slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide)
                      .map((areaTrabajo) => (
                        <div
                          key={areaTrabajo.name}
                          className="relative w-full h-[300px] overflow-hidden group cursor-pointer"
                        >
                          <Image
                            src={areaTrabajo.image}
                            alt={areaTrabajo.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width={500}
                            height={500}
                          />

                          <span
                            className="
                              absolute inset-0 
                              bg-primary/80
                              translate-y-full
                              group-hover:translate-y-0
                              transition-transform duration-500 ease-in-out
                            "
                          />

                          <div className="absolute bottom-0 left-0 w-full z-10 group-hover:-translate-y-[165px] transition-transform duration-500 ease-in-out">
                            <h3
                              className="relative bg-primary/80 text-white text-2xl font-light w-full py-4 text-center"
                            >
                              {areaTrabajo.name}
                            </h3>

                            <p className="
                              relative text-white text-center mx-4
                              opacity-0 max-h-0 overflow-hidden
                              group-hover:opacity-100 group-hover:max-h-40
                              transition-all duration-500 ease-in-out
                            ">
                              {areaTrabajo.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all ${index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-3"
                    }`}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className="max-w-7xl mx-auto py-15">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="bg-white row-span-2 rounded-2xl md:row-span-2 flex flex-col justify-center items-center py-10 md:py-0 px-4 space-y-10" data-aos="fade-up">
              <h3
              className="text-2xl font-semibold uppercase text-center text-primary">Servicios Destacados</h3>
              <p
              className="text-center text-primary text-lg">
                Nuestro compromiso es encontrar la solución perfecta acorde a las necesidades de tu proyecto.
              </p>
              <Link href="/servicios" 
                className="relative w-fit overflow-hidden bg-primary text-white px-5 py-2 uppercase cursor-pointer border border-primary group transition-colors duration-500 hover:text-primary rounded-full">
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
                <span className="relative z-10 transition-colors duration-500">
                  Ver Servicios
                </span>
              </Link>
            </div>
            <div className="rounded-2xl flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
              <Link
                href="/servicios"
                className="relative w-full flex justify-center group overflow-hidden cursor-pointer"
                aria-label="Servicios Eléctricos Integrales"
              >
                <Image
                  src="https://images.unsplash.com/photo-1576446470246-499c738d1c8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Servicios Eléctricos Integrales - Instalaciones eléctricas en alta y baja tensión"
                  loading="lazy"
                  width={370}
                  height={400}
                  className="rounded-2xl"
                />
                <h4 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rounded-2xl overflow-hidden">
                  <span className="absolute inset-0 bg-black/40 rounded-2xl z-0" />
                  <span className="absolute inset-0 bg-primary/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none rounded-2xl z-10" />
                  <span className="relative z-20 transition-colors duration-500 font-semibold uppercase">
                    Servicios Eléctricos Integrales
                  </span>
                </h4>
              </Link>
            </div>
            <div className="rounded-2xl flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/servicios"
                className="relative w-full flex justify-center group overflow-hidden cursor-pointer"
                aria-label="Construcción y Acabados"
              >
                <Image
                  src="https://images.unsplash.com/photo-1562324771-4fb277001e1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Construcción y Acabados - Obras civiles, remodelaciones y acabados de calidad"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="rounded-2xl w-full h-full object-cover"
                />
                <h4 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rounded-2xl overflow-hidden">
                  <span className="absolute inset-0 bg-black/40 rounded-2xl z-0" />
                  <span className="absolute inset-0 bg-primary/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none rounded-2xl z-10" />
                  <span className="relative z-20 transition-colors duration-500 font-semibold uppercase">
                    Construcción y Acabados
                  </span>
                </h4>
              </Link>
            </div>
            <div className="rounded-2xl flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
              <Link
                href="/servicios"
                className="relative w-full flex justify-center group overflow-hidden cursor-pointer"
                aria-label="Sistemas Eléctricos"
              >
                <Image
                  src="https://images.unsplash.com/photo-1584809923235-fabdba83d1df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Tecnología y Automatización - Domótica y sistemas inteligentes"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="rounded-2xl"
                />
                <h4 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rounded-2xl overflow-hidden">
                  <span className="absolute inset-0 bg-black/40 rounded-2xl z-0" />
                  <span className="absolute inset-0 bg-primary/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none rounded-2xl z-10" />
                  <span className="relative z-20 transition-colors duration-500 font-semibold uppercase">
                    Sistemas Eléctricos
                  </span>
                </h4>
              </Link>
            </div>
            <div className="rounded-2xl flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
              <Link
                href="/servicios"
                className="relative w-full flex justify-center group overflow-hidden cursor-pointer"
                aria-label="Ingeniería y Gestión de Proyectos"
              >
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Ingeniería y Gestión de Proyectos - Asesoría profesional y cumplimiento de normativas"
                  loading="lazy"
                  width={500}
                  height={500}
                  className="rounded-2xl"
                />
                <h4 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rounded-2xl overflow-hidden">
                  <span className="absolute inset-0 bg-black/40 rounded-2xl z-0" />
                  <span className="absolute inset-0 bg-primary/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none rounded-2xl z-10" />
                  <span className="relative z-20 transition-colors duration-500 font-semibold uppercase">
                    Ingeniería y Gestión de Proyectos
                  </span>
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
