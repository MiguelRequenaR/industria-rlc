"use client"

import { useState } from "react"

interface HeroBlogProps {
  onCategoryChange?: (category: string) => void
}

export default function HeroBlog({ onCategoryChange }: HeroBlogProps) {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const categories = [
    "Todos",
    "Seguridad Eléctrica",
    "Certificación",
    "Tutoriales",
    "Noticias"
  ]

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

  return (
    <section className='max-w-7xl mx-auto pt-20 md:pt-30 pb-10 px-4'>
      <div className="space-y-8" data-aos="fade-up">
        <div className='inline-flex items-center gap-2 bg-[#293038] text-secondary px-5 py-2 rounded-xl w-auto font-bold border border-secondary'>
          <span className="inline-block w-3 h-3 rounded-full shrink-0 bg-secondary"></span>
          Contenido Nuevo Diario
        </div>
        <h1 className='text-4xl md:text-6xl font-bold text-primary leading-tight'>
          Nuestro Blog
        </h1>
        <p className='text-tertiary text-lg max-w-3xl'>
          Mantente al día con las últimas noticias, tutoriales y consejos profesionales para electricistas.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary border border-gray-200 hover:border-primary hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
