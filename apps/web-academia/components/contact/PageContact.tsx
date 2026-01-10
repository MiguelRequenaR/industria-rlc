import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import FormContact from "../shared/FormContact"

export default function PageContact() {
  return (
    <section className='max-w-7xl mx-auto py-30'>
      <div className="flex flex-col items-center justify-center" data-aos="fade-up">
        <div className='inline-flex items-center gap-2 bg-[#293038] text-secondary px-5 py-2 rounded-xl w-auto font-bold border border-secondary'>
          <span className="inline-block w-3 h-3 rounded-full shrink-0 bg-secondary"></span>
          Contáctanos
        </div>
        <h1 className='text-4xl md:text-7xl font-bold text-primary leading-snug text-center md:text-left'>
          Hablemos de tu futuro
        </h1>
        <p className='text-tertiary text-lg text-center'>
          Estamos aquí para resolver tus inquietudes sobre nuestros cursos de electricidad. <br />¡Impulsa tu carrera hoy mismo!
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-20'>
        <div className="space-y-5 mx-4 md:mx-0" data-aos="fade-right" data-aos-delay="100">
          <h2 className='text-3xl font-bold text-primary'>
            Contáctanos
          </h2>
          <p className='text-tertiary text-lg'>
            ¿Tienes dudas sobre nuestros cursos? <br />
            Estamos aquí para ayudarte.
          </p>
          <div className="flex items-center gap-2">
            <Phone size={26} className="text-secondary"/>
            <a href="tel:+51940162009" className="text-primary hover:underline font-bold text-lg">(+51) 940 162 009</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={26} className="text-secondary"/>
            <a href="mailto:proyectos@industria-rlc.com" className="text-primary hover:underline font-bold text-lg">proyectos@industria-rlc.com</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={26} className="text-secondary"/>
            <span className="text-primary font-bold text-lg">Av. de la Constitución, s/n</span>
          </div>
          <Image src="/images/rlciconpetduda.png" alt="Mapa" width={500} height={500} />
        </div>
        <div className="bg-white shadow-2xl h-fit rounded-2xl mx-4 md:mx-0" data-aos="fade-left" data-aos-delay="100">
          <FormContact />
        </div>
      </div>
    </section>
  )
}
