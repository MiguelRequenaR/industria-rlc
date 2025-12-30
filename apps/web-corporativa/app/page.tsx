import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import ServicesSection from "@/components/home/ServicesSection"
import ExperienceHome from "@/components/home/ExperienceHome"
import AdvantageSection from "@/components/home/AdvantageSection"
import ClientsSection from "@/components/home/ClientsSection"

export default function page() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <ExperienceHome />
      <AdvantageSection />
      <ClientsSection />
    </div>
  )
}
