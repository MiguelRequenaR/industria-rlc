

import Image from 'next/image'
import { Check, Zap } from 'lucide-react'

export default function HeroAbout() {
  return (
    <section className='min-h-screen flex items-center justify-center pt-20 md:pt-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>
          <div className='space-y-10 mx-4 md:mx-0' data-aos="fade-right">
            <div className="flex justify-center md:justify-start">
              <div className='inline-flex items-center gap-2 bg-[#293038] text-secondary px-5 py-2 rounded-xl w-auto font-bold border border-secondary'>
              <span className="inline-block w-3 h-3 rounded-full shrink-0 bg-secondary"></span>
                Quiénes Somos
              </div>
            </div>
            <h1 className='text-4xl md:text-7xl font-bold text-primary leading-snug text-center md:text-left'>
              Somos la <br /> <span
                className='bg-primary text-secondary inline-block px-4'
                style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}
              >Energía</span> que te <br /> impulsa
            </h1>
            <p className='text-tertiary text-lg'>
              En RLC Academy 360, no solo enseñamos electricidad y tecnología; formamos líderes técnicos del mañana con una metodología práctica, moderna y 100% online.
            </p>
            <div>
            <div className="flex gap-4 mt-4">
              <a
                href="/nosotros"
                className="relative overflow-hidden bg-primary text-white hover:text-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors duration-300 shadow text-center w-40 group"
              >
                <span
                  className="
                    absolute inset-0 
                    bg-secondary
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-500 ease-in-out pointer-events-none
                  "
                />
                <span className="relative z-10 transition-colors duration-500">
                  Nosotros
                </span>
              </a>
              <a
                href="/trayectoria"
                className="relative overflow-hidden bg-secondary text-primary hover:text-secondary px-6 py-2 rounded-xl font-bold border border-primary hover:bg-secondary/80 transition-colors duration-300 shadow text-center w-40 group"
              >
                <span
                  className="
                    absolute inset-0 
                    bg-primary
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-500 ease-in-out pointer-events-none
                  "
                />
                <span className="relative z-10 transition-colors duration-500">
                  Trayectoria
                </span>
              </a>
            </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative" data-aos="zoom-in">
            {/* Badge Certificación Oficial - Top Right */}
            <div className="absolute top-0 right-0 md:top-10 md:right-10 bg-white rounded-2xl px-6 py-3 shadow-xl z-10 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2 shrink-0">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Prácticas</p>
                  <p className="text-lg font-bold text-gray-900">100% Reales</p>
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
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">+500 alumnos</p>
                  <p className="text-lg font-bold text-gray-900">Certificados</p>
                </div>
              </div>
            </div>

            <Image src="/images/rlciconlupa.png" alt="Hero" width={500} height={500} className="relative z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
