import ExperienceSection from "@/components/shared/ExperienceSection"
import Link from "next/link"

export default function ExperienceHome() {
  return (
    <section className="bg-[#f6f6f6]">
      <ExperienceSection limit={3} showTitle={true} />
      <div className="max-w-7xl mx-auto px-4 md:px-0 pb-20 flex justify-center">
        <Link href="/experiencia"
          className="relative w-fit overflow-hidden bg-primary text-white px-5 py-2 uppercase cursor-pointer border border-primary group transition-colors duration-500 hover:text-primary rounded-full">
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
          <span className="relative z-10 transition-colors duration-500">
            Conocer Más
          </span>
        </Link>
      </div>
    </section>
  )
}
