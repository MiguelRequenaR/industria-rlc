import { Metadata } from "next";
import HeroAbout from "@/components/about/HeroAbout"
import AboutSection from "@/components/about/AboutSection"
import HistorySection from "@/components/about/HistorySection"
import ClientSection from "@/components/about/ClientSection"

export const metadata: Metadata = {
  title: 'Nosotros - Industria RLC',
  description: 'Conoce Industria RLC, empresa peruana con +10 años de experiencia en servicios eléctricos y construcción. Equipo certificado y tecnología avanzada.',
  openGraph: {
    title: 'Sobre Industria RLC - Nuestra Historia',
    description: 'Conoce nuestra trayectoria y compromiso con la calidad.',
  },
  keywords: ['nosotros', 'historia', 'empresa', 'servicios eléctricos', 'construcción', 'automatización'],
}

export default function About() {
  return (
    <main>
      <HeroAbout />
      <AboutSection />
      <HistorySection />
      <ClientSection />
    </main>
  )
}
