import { BookOpen } from 'lucide-react'

export default function HeroLibroReclamaciones() {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-linear-to-br from-primary to-primary/90 text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
            <BookOpen size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Libro de Reclamaciones
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4">
            En Industria RLC valoramos tu opinión y estamos comprometidos con la mejora continua de nuestros servicios.
          </p>
          
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, este libro de reclamaciones está a tu disposición.
          </p>
        </div>
      </div>
    </section>
  )
}
