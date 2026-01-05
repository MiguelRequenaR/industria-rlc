import { Metadata } from "next";
import ContactPage from '@/components/contact/ContactPage'
import HeroContact from '@/components/contact/HeroContact'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contacto - Industria RLC',
  description: 'Formulario de contacto para clientes de Industria RLC. Responde a tus inquietudes y mejora nuestros servicios.',
  keywords: ['contacto', 'formularios', 'clientes', 'servicios eléctricos', 'construcción', 'automatización'],
  openGraph: {
    title: 'Contacto en Industria RLC - Formulario de Contacto',
    description: 'Formulario de contacto para clientes de Industria RLC. Responde a tus inquietudes y mejora nuestros servicios.',
  }
}

export default function Contact() {
  return (
    <main>
      <HeroContact />
      <ContactPage />
    </main>
  )
}
