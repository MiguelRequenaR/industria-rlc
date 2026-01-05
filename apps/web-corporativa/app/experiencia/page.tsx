import { Metadata } from "next";
import HeroExperience from "@/components/experience/HeroExperience";
import ExperiencePage from "@/components/experience/ExperiencePage";

export const metadata: Metadata = {
  title: 'Experiencia - Industria RLC',
  description: 'Proyectos exitosos en servicios eléctricos, construcción y automatización. Certificaciones y clientes satisfechos.',
  keywords: ['experiencia en servicios eléctricos', 'proyectos exitosos', 'certificaciones', 'clientes satisfechos'],
  openGraph: {
    title: 'Experiencia en Industria RLC - Proyectos Exitosos',
    description: 'Descubre nuestros proyectos exitosos en servicios eléctricos, construcción y automatización. Certificaciones y clientes satisfechos.',
  }
}

export default function Experience() {
  return (
    <main>
      <HeroExperience />
      <ExperiencePage />
    </main>
  )
}
