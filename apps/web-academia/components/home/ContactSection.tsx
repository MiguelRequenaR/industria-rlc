import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import FormContact from "@/components/shared/FormContact"

export default function ContactSection() {
  return (
    <section
    className="max-w-5xl mx-auto py-30">
      <div
      className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden mx-4 md:mx-0">
        <div className="bg-primary text-white p-5 md:p-10 space-y-5 flex flex-col h-full">
          <h2 className="text-4xl font-bold">Contáctanos</h2>
          <p className="text-lg">
            ¿Tienes dudas sobre nuestros cursos? <br />
            Escríbenos.
          </p>
          <div className="space-y-6 pt-10">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" />
              <span className="font-bold">Av. La Victoria 123, Lima, Perú</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-secondary" />
              <span className="font-bold">contacto@industriarlc.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6 text-secondary" />
              <span className="font-bold">(+51) 940 162 009</span>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-6 mt-8">
            <Facebook className="w-6 h-6 text-secondary" />
            <Instagram className="w-6 h-6 text-secondary" />
            <Linkedin className="w-6 h-6 text-secondary" />
          </div>
        </div>
        <div>
          <FormContact />
        </div>
      </div>
    </section>
  )
}
