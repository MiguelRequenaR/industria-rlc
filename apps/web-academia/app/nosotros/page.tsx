import HeroAbout from "@/components/about/HeroAbout"
import StatsAboutSection from "@/components/about/StatsAboutSection"
import AboutSection from "@/components/about/AboutSection"
import HistorySection from "@/components/about/HistorySection"
import TeamSection from "@/components/about/TeamSection"

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
