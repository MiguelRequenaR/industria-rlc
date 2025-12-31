import { AwardIcon, CheckCircleIcon, EyeIcon, UserIcon, UsersIcon } from "lucide-react"
import Image from "next/image"

const principles = [
  {
    id: 1,
    icon: <UserIcon />,
    title: "Integridad",
  },
  {
    id: 2,
    icon: <CheckCircleIcon />,
    title: "Compromiso"
  },
  {
    id: 3,
    icon: <UsersIcon />,
    title: "Colaboración"
  },
  {
    id: 4,
    icon: <EyeIcon />,
    title: "Transparencia"
  },
  {
    id: 5,
    icon: <AwardIcon />,
    title: "Reconocimiento"
  }
]

const substats = [
  {
    id: 1,
    title: "+150MVA",
    description: "Intervenidos acumulados"
  },
  {
    id: 2,
    title: "+100km",
    description: "En cables instalados"
  },
  {
    id: 3,
    title: "+10000und",
    description: "Equipos intervenidos"
  }
]

export default function ClientSection() {
  return (
    <section
    className="bg-[#f6f6f6] py-20">
      <div
      className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl text-center text-primary uppercase font-light">
            Principios
          </h2>
        </div>
        <div
        className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {
            principles.map((principle) => (
              <div
              key={principle.id}
              className="flex flex-col justify-center items-center gap-2 pt-10">
                <div
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
                  {principle.icon}
                </div>
                <div>
                  <h3 className="text-xl font-light text-center text-primary">
                    {principle.title}
                  </h3>
                </div>
              </div>
            ))
          }
        </div>
        <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center py-20">
          <div
          className="space-y-5">
            <h2
            className="text-3xl text-center text-primary uppercase font-light">
              Carta a nuestros clientes
            </h2>
            <p
            className="text-primary text-lg font-light text-center md:text-left mx-4 md:mx-0">
              Parte de nuestra misión es desarrollar sistemas eléctricos confiables, mantenerlo optimizado con nuevas tecnologías, a través de una atención personalizada y eficiente.
              <br /> <br />
              Priorizamos entender tu necesidad para sugerirte nuestras mejores propuestas de solución y elaborar una a tu medida, porque siempre nos gustaría ser tu socio de confianza.
              <br /> <br />
              Para tu tranquilidad y la nuestra, iniciamos los trabajos luego de firmar el contrato - u orden de compra - y aterrizamos el alcance en el primer día de trabajo.
              <br /> <br />
              Enfocamos nuestro esfuerzo en brindar soluciones que cumplan con los estándares más altos de seguridad, eficiencia y sostenibilidad.
              <br /> <br />
              Finalizamos los trabajos luego de una revisión exhaustiva y entrega de documentación, para que puedas estar tranquilo de que todo está en orden.
              <br /> <br />
              Con aprecio,
              <br /> <br />
              <span className="font-bold">
                Indutria RLC
              </span>
            </p>
          </div>
          <div>
            <Image src="https://images.unsplash.com/photo-1683295083329-4d4738291f3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Carta a nuestros clientes" width={500} height={500} className="md:rounded-2xl"/>
          </div>
        </div>
        <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-primary p-10 rounded-2xl mx-4 md:mx-0">
          {
            substats.map((substat) => (
              <div
              key={substat.id}>
                <div>
                  <h3 className="text-3xl font-semibold text-center text-white">
                    {substat.title}
                  </h3>
                </div>
                <div>
                  <p className="text-white text-lg font-light text-center">
                    {substat.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
