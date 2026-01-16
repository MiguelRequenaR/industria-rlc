import type { Metadata } from "next"
import HeroAbout from "@/components/about/HeroAbout"
import StatsAboutSection from "@/components/about/StatsAboutSection"
import AboutSection from "@/components/about/AboutSection"
import HistorySection from "@/components/about/HistorySection"
import TeamSection from "@/components/about/TeamSection"

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce RLC Academy, nuestra misión de formar profesionales técnicos de excelencia en electricidad industrial. Conoce nuestro equipo de instructores expertos con años de experiencia en el sector.',
  openGraph: {
    title: 'Sobre Nosotros | RLC Academy',
    description: 'Academia líder en formación técnica especializada en electricidad industrial con instructores certificados y experiencia comprobada.',
    url: 'https://academia.industriarlc.com/nosotros',
    type: 'website',
  },
}

export default function page() {
  return (
    <main>
      <HeroAbout />
      <StatsAboutSection />
      <AboutSection />
      <HistorySection />
      <TeamSection />
    </main>
  )
}
