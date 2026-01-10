import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CalltoAction() {
  return (
    <section className='bg-[#0B202B] py-10 relative'>
      <div className='flex items-center justify-center'>
        <div data-aos="zoom-in">
          <Image 
            src="/images/rlciconpetwb.png" 
            alt="RLC Academy Background" 
            width={400} 
            height={400} 
            className='opacity-20'
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" data-aos="fade-up" data-aos-delay="100">
          <h2 className='text-white text-2xl md:text-4xl font-bold mb-4 uppercase'>
            ¿Listo para encender tu futuro?
          </h2>
          <p className='text-white mb-6'>
            Únete a miles de profesionales que ya están <br /> transformando su carrera con RLC Academy 360.
          </p>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <Link 
              href="/cursos" 
              className="relative overflow-hidden bg-secondary text-white hover:text-secondary px-4 py-2 rounded-lg uppercase cursor-pointer group transition-colors duration-500 w-60 text-center flex items-center justify-center"
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
                Ver todos los cursos
              </span>
            </Link>
            <Link 
              href="/contacto" 
              className="relative overflow-hidden bg-primary text-white hover:text-primary px-4 py-2 rounded-lg uppercase cursor-pointer group transition-colors duration-500 w-60 text-center flex items-center justify-center"
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
                Contáctanos
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
