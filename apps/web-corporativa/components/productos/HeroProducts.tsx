import Link from "next/link"
import Image from "next/image"

export default function HeroProducts() {
  return (
    <section className="bg-primary max-w-7xl mx-auto mt-50 rounded-3xl overflow-hidden" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="p-10 space-y-10">
          <span className="text-xs text-secondary border border-secondary px-2 py-1 rounded-full">Nuestro Catálogo de Productos</span>
          <h1 className="text-white text-5xl font-regular pt-10 uppercase">
            Potencia tu Siguiente <br /> <span className="text-secondary font-bold">Gran Proyecto</span> 
          </h1>
          <p className="text-white text-lg">
            Suministros eléctricos de alta calidad para profesionales y empresas. Con la mejor tecnología y el mejor servicio.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/contacto"
              className="relative w-fit overflow-hidden bg-primary text-white px-6 py-2 rounded-full cursor-pointer border border-white group transition-colors duration-500 hover:text-white"
            >
              <span
                className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
              />
              <span className="relative z-10 transition-colors duration-500 uppercase md:text-xl">
                Comprar Ahora
              </span>
            </Link>
            <Link
              href="/servicios"
              className="relative w-fit overflow-hidden bg-secondary text-white px-6 py-2 rounded-full cursor-pointer border border-white group transition-colors duration-500 hover:text-primary"
            >
              <span
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
              />
              <span className="relative z-10 transition-colors duration-500 uppercase md:text-xl">
                Ver Catálogo
              </span>
            </Link>
          </div>
        </div>
        <div>
          <Image src="https://images.unsplash.com/photo-1646233494386-0b8b2066bb16?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Productos" width={500} height={500} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
