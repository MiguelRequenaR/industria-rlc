import Image from "next/image"

export default function AboutSection() {
  return (
    <section
    className="max-w-7xl mx-auto">
      <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
        className="flex justify-center items-center">
          <Image src="/RLCLOGOCORP.png" alt="logo" width={300} height={300} />
        </div>
        <div
        className="flex flex-col justify-center items-center">
          <p
          className="text-primary text-lg font-light text-center md:text-left mx-4 md:mx-0">
            Somos un equipo multidisciplinario de profesionales, comprometidos con soluciones de ingeniería complejas y confiables que van desde el diseño hasta la puesta en marcha, mantenimiento y optimización de instalaciones eléctricas, mecánicas y especialidades complementarias. <br />
            Nuestras operaciones destacan por el enfoque en prevención de riesgos, exigentes normas técnicas y plazos desafiantes.
          </p>
        </div>
      </div>
      <div className="pt-20">
        <h2 className="text-3xl text-center text-primary uppercase font-light">
          Nuestra Misión y Visión
        </h2>
      </div>
      <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 mx-4 md:mx-0">
        <div
        className="bg-primary p-10 rounded-2xl">
          <h2
          className="text-white text-2xl font-semibold text-center uppercase">
            Misión
          </h2>
          <p
          className="text-white text-lg font-light">
            Nuestra misión es brindar soluciones de ingeniería de alta calidad que cumplan con los estándares más altos de seguridad, eficiencia y sostenibilidad.
          </p>
        </div>
        <div
        className="bg-primary p-10 rounded-2xl">
          <h2
          className="text-white text-2xl font-semibold text-center uppercase">
            Visión
          </h2>
          <p
          className="text-white text-lg font-light">
            Nuestra visión es ser líderes en la ingeniería de soluciones eléctricas, mecánicas y especialidades complementarias, brindando soluciones de alta calidad que cumplan con los estándares más altos de seguridad, eficiencia y sostenibilidad.
          </p>
        </div>
      </div>
    </section>
  )
}
