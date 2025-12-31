import HeroAbout from "@/components/about/HeroAbout"
import AboutSection from "@/components/about/AboutSection"
import HistorySection from "@/components/about/HistorySection"
import ClientSection from "@/components/about/ClientSection"

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
