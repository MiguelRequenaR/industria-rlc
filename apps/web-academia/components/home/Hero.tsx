import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, User } from 'lucide-react'

export default function Hero() {
  return (
    <section className='max-w-7xl mx-auto min-h-screen flex items-center justify-center pt-20 md:pt-0'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>
        <div className='space-y-10 mx-4 md:mx-0' data-aos="fade-right">
          <div className="flex justify-center md:justify-start">
            <div className='inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl w-auto font-bold uppercase'>
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 shrink-0"></span>
              Nueva Plataforma 360°
            </div>
          </div>
          <h1 className='text-4xl md:text-7xl font-bold text-primary leading-snug text-center md:text-left'>
            Domina la <span
              className='bg-primary text-secondary inline-block px-4'
              style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}
            >Electricidad</span> y <br /> Automatización
          </h1>
          <p className='text-tertiary text-lg'>
            Únete a RLC Academy 360 y potencia tu carrera técnica con cursos interactivos, clases interactvias y certificaciones. <br />
            Aprende con los expertos.
          </p>
          <div className='flex items-center gap-4'>
            <Link href="/cursos" className='flex items-center gap-2 bg-primary hover:bg-primary/80 transition-colors duration-300 text-white rounded-xl px-5 py-2 font-bold text-lg'>
              <GraduationCap className='w-5 h-5' />
              Ver Cursos
            </Link>
            <Link href="/contacto" className='flex items-center gap-2 bg-secondary hover:bg-secondary/90 transition-colors duration-300 text-white rounded-xl px-5 py-2 font-bold text-lg'>
              <User className='w-5 h-5' />
              Inscribirse
            </Link>
          </div>
          <div className='flex items-center gap-4 justify-center md:justify-start'>
            <div className="relative w-14 h-6 shrink-0">
              <span className='bg-primary w-6 h-6 rounded-full absolute left-0 top-0'></span>
              <span className='bg-secondary w-6 h-6 rounded-full absolute left-3 top-0'></span>
              <span className='bg-tertiary w-6 h-6 rounded-full absolute left-6 top-0'></span>
            </div>
            <p className='text-tertiary text-lg font-bold'>+500 Estudiantes activos</p>
          </div>
        </div>
        <div className="flex items-center justify-center" data-aos="fade-left">
          <Image src="/images/rlciconpet.jpeg" alt="Hero" width={500} height={500} />
        </div>
      </div>
    </section>
  )
}
