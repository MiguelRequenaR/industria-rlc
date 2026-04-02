import { Metadata } from "next";
import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import ServicesSection from "@/components/home/ServicesSection"
import ExperienceHome from "@/components/home/ExperienceHome"
import AdvantageSection from "@/components/home/AdvantageSection"

export const metadata: Metadata = {
  title: "Industria RLC - Servicios Eléctricos Integrales en Lima, Perú",
  description: "Empresa peruana líder en servicios eléctricos integrales, construcción, automatización y gestión de proyectos. +10 de años de experiencia. Certificados y garantías.",
}

export default function page() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <ExperienceHome />
      <AdvantageSection />
    </div>
  )
}
