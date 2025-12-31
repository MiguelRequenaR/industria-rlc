
import Link from "next/link"

export default function CallToAction() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-0 bg-primary text-white py-10 md:py-20 md:rounded-2xl mt-10">
      <div
      className="flex flex-col md:flex-row justify-between items-center px-4 md:px-30 gap-10">
        <div
        className="space-y-5">
          <h2
          className="text-2xl md:text-4xl font-bold text-center md:text-left">
            Industria RLC
          </h2>
          <p
          className="md:text-lg text-center md:text-left font-light">
            Somos una empresa peruana dedicada a la construcción y mantenimiento de infraestructuras eléctricas y de telecomunicaciones. Contáctanos para más información.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/contacto"
            className="relative w-fit overflow-hidden bg-primary text-white px-6 py-2 rounded-full cursor-pointer border border-white group transition-colors duration-500 hover:text-white"
          >
            <span
              className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
            />
            <span className="relative z-10 transition-colors duration-500 uppercase md:text-xl">
              Contáctanos
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
              Ver Servicios
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
