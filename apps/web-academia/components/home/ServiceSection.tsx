import { GraduationCap, Laptop, Brain } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Capacitación In-Company",
    description: "Llevamos nuestros expertos y equipos a tu empresa para formar a tu personal técnico con programas a medida.",
    icon: GraduationCap
  },
  {
    id: 2,
    name: "Campus Virtual 24/7",
    description: "Plataforma educativa de última generación accesible desde cualquier dispositivo, en cualquier momento.",
    icon: Laptop
  },
  {
    id: 3,
    name: "Consultoría Técnica",
    description: "Asesoramiento especializado en proyectos de ingeniería eléctrica y optimización de procesos.",
    icon: Brain
  }
]

export default function ServiceSection() {
  return (
    <section className="max-w-7xl mx-auto py-20">
      <div className="text-center mb-10" data-aos="fade-up">
        <span className="text-secondary uppercase font-bold">
          Qué Ofrecemos
        </span>
        <h2 className="text-primary text-2xl md:text-3xl font-bold mt-3">
          Servicios Integrales
        </h2>
        <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full" />
      </div>
      <div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-4 md:mx-0" data-aos="fade-up" data-aos-delay="100">
        {
          services.map((service) => (
            <div
            key={service.id} className="bg-[#F8FAFC] p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="bg-secondary p-2 w-fit rounded-lg">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-primary text-xl font-bold">
                  {service.name}
                </h3>
                <p className="text-tertiary">
                  {service.description}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}
