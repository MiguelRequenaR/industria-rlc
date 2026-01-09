import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import CourseSection from "@/components/shared/CourseSection"
import ServiceSection from "@/components/home/ServiceSection"
import AboutSection from "@/components/home/AboutSection"
import ContactSection from "@/components/home/ContactSection"

export default function page() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <CourseSection />
      <ServiceSection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
