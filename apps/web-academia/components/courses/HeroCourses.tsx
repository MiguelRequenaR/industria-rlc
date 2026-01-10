
import Image from 'next/image'
import { Search, Check, Zap } from 'lucide-react'

export default function HeroCourses() {
  return (
    <section className='bg-primary min-h-screen flex items-center justify-center'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>
          <div className='space-y-10 mx-4 md:mx-0' data-aos="fade-right">
            <div className='inline-flex items-center gap-2 bg-[#293038] text-secondary px-5 py-2 rounded-xl w-auto font-bold border border-secondary'>
              <span className="inline-block w-3 h-3 rounded-full shrink-0 bg-secondary"></span>
              Nuevos Cursos Disponibles
            </div>
            <h1 className='text-4xl md:text-7xl font-bold text-white leading-snug text-center md:text-left'>
              Domina la <span
                className='bg-secondary text-primary inline-block px-4'
                style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}
              >Energía</span> del <br /> Futuro
            </h1>
            <p className='text-white text-lg'>
              Capacitación técnica especializada en electricidad, instalaciones eléctricas, seguridad y riesgo eléctrico. <br />
              Únete a la comunidad de expertos de RLC Academy 360.
            </p>
            <div>
              <form className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 w-full md:w-[90%]">
                <input
                  type="text"
                  placeholder="¿Qué quieres aprender hoy?"
                  className="flex-1 bg-transparent px-2 py-2 outline-none text-tertiary placeholder:text-gray-400 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-300 text-white rounded-xl px-4 py-2 font-bold cursor-pointer shrink-0"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Buscar</span>
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center relative" data-aos="fade-left">
            {/* Badge Certificación Oficial - Top Right */}
            <div className="absolute top-0 right-0 md:top-10 md:right-10 bg-white rounded-2xl px-6 py-3 shadow-xl z-10 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2 shrink-0">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Certificación</p>
                  <p className="text-lg font-bold text-gray-900">Oficial</p>
                </div>
              </div>
            </div>

            {/* Badge Prácticas Reales - Bottom Left */}
            <div className="absolute bottom-0 left-0 md:bottom-10 md:left-10 bg-white rounded-2xl px-6 py-3 shadow-xl z-10 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 rounded-full p-2 shrink-0">
                  <Zap className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Prácticas</p>
                  <p className="text-lg font-bold text-gray-900">100% Reales</p>
                </div>
              </div>
            </div>

            <Image src="/images/rlciconpet.jpeg" alt="Hero" width={500} height={500} className="relative z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
