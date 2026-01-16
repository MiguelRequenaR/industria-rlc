import type { Metadata } from "next"
import PageContact from "@/components/contact/PageContact"

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para más información sobre nuestros cursos de electricidad industrial, inscripciones, horarios y modalidades de pago. Estamos aquí para ayudarte en tu formación profesional.',
  openGraph: {
    title: 'Contacto | RLC Academy',
    description: 'Ponte en contacto con RLC Academy para información sobre cursos, inscripciones y consultas.',
    url: 'https://academia.industriarlc.com/contacto',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <main>
      <PageContact />
    </main>
  )
}
