"use client"

import { useState } from "react"
import Image from "next/image"

interface HistoryItem {
  year: number
  title: string
  description: string
  image: string
}

const historyData: HistoryItem[] = [
  {
    year: 2018,
    title: "Inicio de operaciones",
    description: "Fundación de Industria RLC con la visión de brindar soluciones de ingeniería de alta calidad. Comenzamos nuestras operaciones con un equipo comprometido y especializado.",
    image: "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    year: 2019,
    title: "Expansión de servicios",
    description: "Ampliación de nuestros servicios para incluir instalaciones eléctricas, mecánicas y especialidades complementarias. Establecimiento de alianzas estratégicas.",
    image: "https://images.unsplash.com/photo-1597502310092-31cdaa35b46d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    year: 2020,
    title: "Crecimiento y consolidación",
    description: "Consolidación en el mercado peruano con proyectos de gran envergadura. Implementación de sistemas de gestión de calidad y seguridad más estrictos.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    year: 2021,
    title: "Innovación tecnológica",
    description: "Inversión en tecnología y equipamiento de última generación. Certificaciones y reconocimientos por nuestro compromiso con la excelencia operativa.",
    image: "https://images.unsplash.com/photo-1660330590022-9f4ff56b63f6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    year: 2022,
    title: "Expansión nacional",
    description: "Ampliación de operaciones a nivel nacional. Nuevos proyectos en diversas regiones del país, consolidando nuestra presencia en el mercado peruano.",
    image: "https://images.unsplash.com/photo-1660330589487-39cc0177ba89?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    year: 2023,
    title: "Liderazgo en el sector",
    description: "Reconocimiento como empresa líder en soluciones de ingeniería. Continuamos innovando y estableciendo nuevos estándares en el sector industrial.",
    image: "https://images.unsplash.com/photo-1566417110090-6b15a06ec800?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export default function HistorySection() {
  const [selectedYear, setSelectedYear] = useState<number>(2018)
  
  const selectedHistory = historyData.find(item => item.year === selectedYear) ?? historyData[0]
  
  if (!selectedHistory) {
    return null
  }

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div>
        <h2 className="text-3xl text-primary mb-4 text-center pb-5 uppercase font-light">
          Nuestra Historia
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Lista de años - Izquierda */}
        <div className="flex flex-col md:shrink-0 md:w-auto">
          <div className="overflow-y-auto max-h-[600px] pr-4">
            <div className="flex flex-col gap-3">
              {historyData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`
                    px-20 py-4 rounded-full font-semibold text-left transition-all duration-300 whitespace-nowrap
                    border-primary border
                    ${
                      selectedYear === item.year
                        ? "bg-primary text-white"
                        : "bg-white text-secondary "
                    }
                  `}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido - Derecha */}
        <div className="flex flex-col justify-center flex-1">
          <div className="bg-white overflow-hidden">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <Image
                src={selectedHistory.image}
                alt={selectedHistory.title}
                fill
                className="object-cover rounded-2xl"
                sizes="100% 100%"
              />
            </div>
            <div className="py-4 md:py-0 md:p-8">
              <h3 className="text-3xl font-light text-primary mb-4">
                {selectedHistory.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedHistory.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
