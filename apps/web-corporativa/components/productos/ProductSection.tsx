import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Globe, Lightbulb, Phone, Plug2, CirclePower, Workflow, ShieldCheck, Hammer, Box, BatteryCharging } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Cables y Conductores',
    icon: <Plug2 />,
    image: '/cables-conductores.webp',
    bgColor: 'bg-primary'
  },
  {
    id: 2,
    name: 'Iluminación',
    icon: <Lightbulb />,
    image: '/iluminacion.webp',
    bgColor: 'bg-primary/80'
  },
  {
    id: 3,
    name: 'Interruptores y Tomacorrientes',
    icon: <CirclePower />,
    image: '/interruptores-tomacorriente.webp',
    bgColor: 'bg-orange-400/70'
  },
  {
    id: 4,
    name: 'Automatización y Control',
    icon: <Workflow />,
    image: '/automatizacion-control.webp',
    bgColor: 'bg-green-900/70'
  },
  {
    id: 5,
    name: 'Protección Electrica',
    icon: <ShieldCheck />,
    image: '/proteccion-electrica.webp',
    bgColor: 'bg-blue-900/70'
  },
  {
    id: 6,
    name: 'Puesta a Tierra',
    icon: <ShieldCheck />,
    image: '/puesta-tierra.webp',
    bgColor: 'bg-red-900/70'
  },
  {
    id: 7,
    name: 'Herramientas Electricas',
    icon: <Hammer />,
    image: '/herramientas.webp',
    bgColor: 'bg-purple-900/70'
  },
  {
    id: 8,
    name: 'Accesorios Consumibles',
    icon: <Box />,
    image: '/accesorios.webp',
    bgColor: 'bg-indigo-400'
  },
  {
    id: 9,
    name: 'Energía y Respaldo',
    icon: <BatteryCharging />,
    image: '/energia-respaldo.webp',
    bgColor: 'bg-orange-900/70'
  },
]

const marcas = [
  {
    id: 1,
    image: '/abbmarca.webp',
    name: 'ABB'
  },
  {
    id: 2,
    image: '/eatonmarca.webp',
    name: 'Eaton'
  },
  {
    id: 3,
    image: '/schnediermarca.webp',
    name: 'Schneider Electric'
  },
  {
    id: 4,
    image: '/legrandmarca.webp',
    name: 'Legrand'
  },
  {
    id: 5,
    image: '/philipsmarca.webp',
    name: 'Philips'
  },
  {
    id: 6,
    image: '/siemesmarca.webp',
    name: 'Siemens'
  },
  {
    id: 7,
    image: '/osrammarca.webp',
    name: 'Osram'
  },
  {
    id: 8,
    image: '/lselectricmarca.webp',
    name: 'Lselectric'
  }
]

export default function ProductSection() {
  return (
    <section className='max-w-7xl mx-auto py-10 md:py-20'>
      <div className="flex flex-col md:flex-row items-stretch md:items-start gap-4 md:gap-0" data-aos="fade-up">
        {/* Logo */}
        <div className="bg-white rounded-br-2xl shadow-[20px_20px_20px_0px_rgba(0,0,0,0.15)] flex justify-center items-center min-h-[120px] md:min-h-0 md:block md:w-auto w-full py-4 md:py-0">
          <Image
            src="/RLCLOGOCORP.png"
            alt="Logo de la empresa Industrial RLC"
            width={200}
            height={200}
            style={{ width: "auto", height: "auto" }}
            className="mx-auto md:mx-0 max-w-[128px] max-h-[128px] md:max-w-[200px] md:max-h-[200px] object-contain"
          />
        </div>
        {/* Info */}
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-primary p-5 md:p-7 rounded-none md:rounded-r-2xl">
            <h2 className="text-white text-2xl md:text-3xl font-semibold text-center md:text-left">
              Catálogo de Materiales Eléctricos
            </h2>
          </div>
          <div className="flex flex-col md:flex-row bg-primary p-4 md:p-6 rounded-none md:rounded-r-2xl gap-3 md:gap-2 md:space-x-6 space-x-0">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle2 className="text-white" />
              <p className="text-white text-lg md:text-xl font-semibold">
                Hogar
              </p>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle2 className="text-white" />
              <p className="text-white text-lg md:text-xl font-semibold">
                Comercial
              </p>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="text-white" />
              <a href="tel:+51940162009" className="text-white text-lg md:text-xl font-semibold">
                +51 940 162 009
              </a>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Globe className="text-white" />
              <a href="https://www.industrialrlc.com" className="text-white text-lg md:text-xl font-semibold break-all">
                www.industrialrlc.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-20 mx-4 md:mx-0' data-aos="fade-up" data-aos-delay={100}>
        {
          products.map((product) => (
            <div className='shadow-2xl rounded-2xl overflow-hidden group' key={product.id}>
              <div className={`flex items-center gap-2 ${product.bgColor} p-5`}>
                <span className='text-white'>
                  {product.icon}
                </span>
                <h3 className='text-white text-xl font-semibold'>
                  {product.name}
                </h3>
              </div>
              <div className="flex justify-center items-center p-4">
                <div className="overflow-hidden w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    loading='lazy'
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "auto" }}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 pt-20 space-y-4 md:space-y-0'>
        {
          marcas.map((marca) => (
            <div key={marca.id} className="flex justify-center items-center">
              <Image
                src={marca.image}
                alt={marca.name}
                width={200}
                height={200}
                loading='lazy'
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}
