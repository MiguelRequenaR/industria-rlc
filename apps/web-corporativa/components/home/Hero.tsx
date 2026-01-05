"use client"
import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"

const carouselImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Servicios \n Eléctricos \nIntegrales",
    description: "Soluciones integrales en alta y baja tensión para hogares y empresas.",
    buttonLink: "/productos",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1562324771-4fb277001e1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Construcción y\nAcabados",
    description: "Ejecución de obras civiles, remodelaciones y acabados de calidad.",
    buttonLink: "/servicios",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1584809923235-fabdba83d1df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tecnología\ny Automatización",
    description: "Modernización de espacios con domótica y conectividad.",
    buttonLink: "/servicios",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Ingeniería y\n Gestión de \nProyectos",
    description: "Asesoría profesional y cumplimiento de normativas vigentes.",
    buttonLink: "/servicios",
  },
]

export default function HeroHome() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    )
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      )
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="relative w-full h-[70vh] min-h-80 flex items-center overflow-hidden pt-24">
      {/* Contenedor de slides */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {carouselImages.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full shrink-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={slide.id === 1}
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex justify-center w-full h-full" data-aos="fade-up">
              <div className="flex flex-col max-w-7xl w-full px-4 md:px-0 justify-center">
                <h2 className="text-white text-3xl md:text-7xl font-bold mb-4 drop-shadow-lg uppercase whitespace-pre-line">
                  {slide.title}
                </h2>
                <p className="text-white text-2xl mb-6 drop-shadow whitespace-pre-line">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="relative w-fit overflow-hidden bg-primary text-white px-5 py-2 uppercase cursor-pointer border border-white group transition-colors duration-500 hover:text-white rounded-full"
                >
                  <span
                    className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
                  />
                  <span className="relative z-10 transition-colors duration-500">
                    Conoce Más
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition cursor-pointer"
        aria-label="Anterior"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition cursor-pointer"
        aria-label="Siguiente"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {carouselImages.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full border border-white transition-all ${
              currentIndex === index ? "bg-white w-4" : "bg-white/40"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
