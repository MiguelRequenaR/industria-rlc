import Image from "next/image"
import { CircleCheck } from "lucide-react"

export default function AboutSection() {
  return (
    <section
    className="bg-primary py-25">
      <div
      className="max-w-7xl mx-auto">
        <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center">
            <Image src="/images/rlciconpetwb.png" alt="Logo de RLC Academy 360" width={500} height={500} />
          </div>
          <div className="space-y-6 flex flex-col justify-center mx-4 md:mx-0">
            <span className="text-secondary uppercase font-bold">Sobre Nosotros</span>
            <h2 className="text-white text-2xl md:text-4xl font-bold">
              Innovando en la Educación Técnica
            </h2>
            <p className="text-white text-base md:text-lg font-light">
              RLC Academy 360 es el centro de capacitación de Industria Eléctrica y Construcción RLC. <br />
              Nos especializamos en la formación técnica en electricidad, orientada a personas que desean aprender de forma clara, práctica y profesional.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="w-6 h-6 text-secondary" />
                <span className="text-white">Instructores Certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="w-6 h-6 text-secondary" />
                <span className="text-white">Metodología 100% práctica y aplicable</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="w-6 h-6 text-secondary" />
                <span className="text-white">Comunidad de Aprendizaje</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
