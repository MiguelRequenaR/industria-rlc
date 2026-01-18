import type { Metadata } from "next"
import TerminosCondiciones from "@/components/legal/TerminosCondiciones"

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de RLC Academy. Conoce los derechos y obligaciones al utilizar nuestros servicios educativos y plataforma virtual.',
  openGraph: {
    title: 'Términos y Condiciones | RLC Academy',
    description: 'Términos y condiciones de uso de los servicios educativos de RLC Academy.',
    url: 'https://academia.industriarlc.com/terminos',
    type: 'website',
  },
}

export default function TerminosPage() {
  return (
    <main>
      <TerminosCondiciones />
    </main>
  )
}
