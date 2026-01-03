import { Phone, Mail, MapPin, Clock } from "lucide-react"
import FormContact from "./FormContact"

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-4 md:mx-0">
        <div className="bg-primary text-white p-5 md:p-10 rounded-2xl h-fit">
          <div className="space-y-7">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">
                Estamos a un clic de distancia
              </h2>
              <p className="text-base font-light">
                Estamos para ayudarte. Contacta con nosotros para obtener más información sobre nuestros servicios.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
                <Phone size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Llámanos</h3>
                <p className="text-base font-light">(+51) 940 162 009</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
                <Mail size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Correo</h3>
                <p className="text-base font-light break-all">proyectos@industriarlc.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
                <Clock size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Horario</h3>
                <p className="text-base font-light">
                  Lunes a Viernes: 8:00 AM - 6:00 PM <br />
                  Sábados: 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
                <MapPin size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Ubicación</h3>
                <p className="text-base font-light">Av. de la Constitución, s/n</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FormContact />
        </div>
      </div>
    </section>
  )
}
