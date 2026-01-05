import React from 'react'
import Image from 'next/image'

export default function ClientsSection() {
  // Array de logos de clientes
  const clients = [
    { name: 'INSN', logo: '/clients/insn.png' },
    { name: 'Poder Judicial del Perú', logo: '/clients/poder-judicial.png' },
    { name: 'Aceros Chilca', logo: '/clients/aceros-chilca.png' },
    { name: 'EPS SEDACUSCO', logo: '/clients/sedacusco.png' },
    { name: 'UAP', logo: '/clients/uap.png' },
    { name: 'Mitsui', logo: '/clients/mitsui.png' },
    { name: 'Indecopi', logo: '/clients/indecopi.png' },
    { name: 'Cliente 8', logo: '/clients/client-8.png' },
    { name: 'Faber-Castell', logo: '/clients/faber-castell.png' },
  ]

  return (
    <section className='w-full py-16 md:py-20'>
      <div className='max-w-7xl mx-auto px-4 md:px-0'>
        <div className='flex flex-col md:flex-row  overflow-hidden min-h-[400px]'>
          {/* Lado izquierdo - Fondo azul con texto */}
          <div className='bg-primary flex items-center justify-center p-12 md:p-16 lg:p-20 md:w-[35%] lg:w-[30%]' data-aos="fade-up">
            <h2 className='text-white text-4xl font-bold leading-tight'>
              Clientes que confían en nosotros
            </h2>
          </div>

          {/* Lado derecho - Grid de logos */}
          <div className='bg-white p-8 md:p-12 lg:p-16 flex-1 flex items-center' data-aos="fade-up" data-aos-delay="100">
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full'>
              {clients.map((client, index) => (
                <div
                  key={index}
                  className='flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100'
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={150}
                    height={80}
                    loading='lazy'
                    className='w-full h-auto object-contain max-h-16'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
