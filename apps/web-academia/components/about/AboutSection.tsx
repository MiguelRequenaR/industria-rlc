import { Eye, GraduationCap, Heart } from "lucide-react"

const identity = [
  {
    id: 1,
    title: "Misión",
    icon: <GraduationCap />,
    description: "Democratizar la educación técnica de alta calidad, proporcionando herramientas accesibles y prácticas que potencien el desarrollo profesional."
  },
  {
    id: 2,
    title: "Visión",
    icon: <Eye />,
    description: "Ser la academia referente en Latinoamérica para la formación técnica online, reconocida por nuestra innovación pedagógica."
  },
  {
    id: 3,
    title: "Valores",
    icon: <Heart />,
    description: "Integridad, excelencia técnica, innovación constante y compromiso. Creemos que la energía se comparte."
  }
]

export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto py-20">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-primary text-2xl md:text-3xl font-bold mt-3">
          Nuestra Esencia
        </h2>
        <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full" />
        <p className="text-primary pt-5 font-bold text-lg">
          Construimos sobre pilares sólidos que garantizan no solo aprendizaje, sino transformación profesional.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-4 md:mx-0" data-aos="fade-up" data-aos-delay="100">
        {
          identity.map((item) => (
            <div key={item.id} className="bg-[#F8FAFC] p-6 space-y-4">
              <div className="bg-secondary p-2 w-fit rounded-lg text-primary">
                {item.icon}
              </div>
              <h3 className="text-primary text-xl md:text-2xl font-bold">
                {item.title}
              </h3>
              <p className="text-tertiary text-base md:text-lg">
                {item.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  )
}
