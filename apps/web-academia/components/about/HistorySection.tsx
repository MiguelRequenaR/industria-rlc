import Image from 'next/image'

export default function HistorySection() {
  const timeline = [
    {
      id: 1,
      year: "2024",
      title: "El Inicio",
      description: "Fundación de RLC con un pequeño taller presencial enfocado en instalaciones básicas.",
      color: "bg-green-500"
    },
    {
      id: 2,
      year: "2025",
      title: "Digitalización",
      description: "Lanzamiento de nuestra plataforma online, alcanzando estudiantes fuera de la ciudad.",
      color: "bg-secondary"
    },
    {
      id: 3,
      year: "2025",
      title: "RLC Academy 360",
      description: "Renovación total de marca e introducción de tecnologías inmersivas para el aprendizaje.",
      color: "bg-primary"
    }
  ]

  return (
    <section className='max-w-7xl mx-auto py-20 px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <div data-aos="fade-right">
          <Image 
            src="/images/rlciconpet.jpeg" 
            alt="History" 
            width={500} 
            height={500}
          />
        </div>
        <div data-aos="fade-left">
          <h2 className='text-2xl md:text-4xl font-bold text-primary mb-10'>
            Nuestra Historia
          </h2>
          <div className='relative'>
            <div className='absolute left-[15px] top-0 bottom-0 w-1 bg-secondary'></div>
            
            <div className='space-y-12'>
              {timeline.map((item) => (
                <div key={item.id} className='relative flex gap-6'>
                  <div className={`${item.color} w-8 h-8 rounded-full shrink-0 z-10 border-4 border-white shadow-lg`}></div>
                  
                  <div className='pb-4'>
                    <h3 className='text-lg md:text-2xl font-bold text-primary mb-2'>
                      {item.year} - {item.title}
                    </h3>
                    <p className='text-tertiary text-base md:text-lg'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
