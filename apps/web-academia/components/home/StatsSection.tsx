
const stats = [
  {
    id: 1,
    value: "+10",
    description: "Cursos Técnicos",
  },
  {
    id: 2,
    value: "24/7",
    description: "Acceso Virtual",
  },
  {
    id: 3,
    value: "+500",
    description: "Estudiantes",
  },
  {
    id: 4,
    value: "100%",
    description: "Certificado"
  }
]

export default function StatsSection() {
  return (
    <section className='bg-primary py-10'>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {
          stats.map((stat) => (
            <div
            key={stat.id}>
              <h3 className="text-4xl font-bold text-center text-white">
                {stat.value}
              </h3>
              <p className="text-lg font-bold text-center text-secondary">
                {stat.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>
  )
}
