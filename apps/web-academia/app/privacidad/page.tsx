import type { Metadata } from "next"
import PoliticaPrivacidad from "@/components/legal/PoliticaPrivacidad"

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de RLC Academy. Conoce cómo protegemos, recopilamos y utilizamos tu información personal en cumplimiento con la Ley de Protección de Datos Personales.',
  openGraph: {
    title: 'Política de Privacidad | RLC Academy',
    description: 'Política de privacidad y protección de datos personales de RLC Academy.',
    url: 'https://academia.industriarlc.com/privacidad',
    type: 'website',
  },
}

export default function PrivacidadPage() {
  return (
    <main>
      <PoliticaPrivacidad />
    </main>
  )
}
