import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import FormContact from "@/components/shared/FormContact"

interface ContactSectionProps {
  courses: { id: string; title: string }[]
}

export default function ContactSection({ courses }: ContactSectionProps) {
  return (
    <section
      className="max-w-5xl mx-auto py-30" data-aos="zoom-in">
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
              <span className="font-bold">Av. Bosque Huanca #1188 - El Agustino - Lima</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-secondary" />
              <a
                href="mailto:capacitaciones@industriarlc.com"
                className="font-bold underline hover:text-secondary transition-colors"
              >
                capacitaciones@industriarlc.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6 text-secondary" />
              <a
                href="tel:+51940162009"
                className="font-bold underline hover:text-secondary transition-colors"
              >
                (+51) 940 162 009
              </a>
            </div>
          </div>
          <div className="flex-1" />
          <div className='flex items-center gap-2 pt-2'>
            <a
              href="https://www.facebook.com/profile.php?id=61586886613195"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de RLC Academy 360"
            >
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2021%2F06%2F15%2F12%2F51%2Ffacebook-6338508_1280.png&f=1&nofb=1&ipt=4f3040e83e629ea57628a2a63207c14be5bd3a3282a7301acd60c3ff6b5236ca" alt="Logo de Facebook de RLC Academy 360" className='w-7 h-7' />
            </a>
            <a
              href="https://www.tiktok.com/@rlccentrodecapacitacion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de RLC Academy 360"
            >
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FTikTok-Logo-2016-present.png&f=1&nofb=1&ipt=8fa3d48e081e27f0f9fc9a0d493039834aef3d3d18f11fb5b808704fb13caf0f" alt="Logo de TikTok de RLC Academy 360" className='h-7' />
            </a>
            <a
              href="https://www.youtube.com/@rlc-centrodecapacitaciones"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube de RLC Academy 360"
            >
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.gXDAsM3eyXW3wlU8IMGrfgHaHa%3Fpid%3DApi&f=1&ipt=ed4bcead4a3d8177f4946392cc7ad1586c3138f83e430ce819866517beb76ef6" alt="Logo de YouTube de RLC Academy 360" className='w-7 h-7 rounded-full' />
            </a>
          </div>
        </div>
        <div>
          <FormContact courses={courses} />
        </div>
      </div>
    </section>
  )
}
