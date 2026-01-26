import Image from "next/image"

const team = [
  {
    id: 1,
    name: "Ing. Juan Perez",
    rol: "Director Academico",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Especialista en sistemas de potencia con 15 años de experiencia en el sector."
  },
  {
    id: 2,
    name: "Ing. Miguel Angel",
    rol: "Coordinador Academica",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Especialista en sistemas de potencia con 15 años de experiencia en el sector."
  },
  {
    id: 3,
    name: "Ing. Carlos Lopez",
    rol: "Profesor de Electricidad",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Especialista en sistemas de potencia con 15 años de experiencia en el sector."
  }
]

export default function TeamSection() {
  return (
    <section className="max-w-7xl mx-auto py-20">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-primary text-2xl md:text-3xl font-bold mt-3">
          Expertos que Inspiran
        </h2>
        <hr className="w-40 border-t-3 mx-auto border-secondary rounded-full" />
        <p className="text-primary pt-5 font-bold text-lg mx-4 md:mx-0">
          Nuestro equipo combina experiencia de campo con pasión pedagógica. Aprende de los mejores del sector.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-4 md:mx-0" data-aos="fade-up" data-aos-delay="100">
        {
          team.map((item) => (
            <div key={item.id} className="space-y-5 rounded-2xl shadow-2xl p-10">
              <div className="flex items-center justify-center">
                <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-center text-primary">
                {item.name}
              </h3>
              <p className="text-[#055CFF] uppercase font-bold text-center text-base md:text-xl">
                {item.rol}
              </p>
              <p className="text-tertiary text-base md:text-lg text-center">
                {item.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  )
}
