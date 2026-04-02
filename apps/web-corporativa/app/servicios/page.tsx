import { Metadata } from "next";
import HeroServices from "@/components/services/HeroServices"
import ServicesPage from "@/components/services/ServicesPage"

export const metadata: Metadata = {
  title: 'Servicios - Industria RLC',
  description: 'Servicios eléctricos integrales, construcción y acabados, domótica, automatización industrial y gestión de proyectos. Certificados y con garantía.',
  keywords: ['servicios eléctricos', 'construcción Lima', 'domótica Perú', 'automatización', 'cableado estructurado'],
  openGraph: {
    title: 'Servicios en Industria RLC - Eléctricos, Construcción y Automatización',
    description: 'Descubre nuestros servicios eléctricos integrales, construcción y automatización. Certificados y garantías.',
  }
}

export default function Services() {
  return (
    <main>
      <HeroServices />
      <ServicesPage />
    </main>
  )
}
