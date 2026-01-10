
const stats = [
  {
    id: 1,
    value: "+10",
    description: "Años de Experiencia",
  },
  {
    id: 2,
    value: "+10",
    description: "Cursos Técnicos",
  },
  {
    id: 3,
    value: "98%",
    description: "Satisfacción",
  },
  {
    id: 4,
    value: "24/7",
    description: "Soporte Académico"
  }
]

export default function StatsSection() {
  return (
    <section className='bg-white py-10 shadow-2xl mx-4 md:mx-0 rounded-2xl md:rounded-none mt-20 md:mt-0' data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {
          stats.map((stat) => (
            <div
            key={stat.id}>
              <h3 className="text-4xl font-bold text-center text-primary">
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
