"use client"
import { useEffect, useRef, useState } from "react"

const stats = [
  {
    id: 1,
    value: 500,
    prefix: "+",
    description: "Servicios Realizados"
  },
  {
    id: 2,
    value: 15,
    prefix: "+",
    description: "Soluciones Integrales"
  },
  {
    id: 3,
    value: 100,
    prefix: "+",
    description: "Clientes Satisfechos"
  },
  {
    id: 4,
    value: 10,
    prefix: "+",
    description: "Años de Experiencia"
  }
]

function AnimatedCounter({ value, prefix = "+", duration = 1200 }: { value: number, prefix?: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let frame: number
    let start: number | null = null
    function animateCounter(now: number) {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        frame = requestAnimationFrame(animateCounter)
      } else {
        setCount(value)
      }
    }
    frame = requestAnimationFrame(animateCounter)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])
  return (
    <span ref={ref}>
      {prefix}{count}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      className="bg-[#f6f6f6] mx-4 md:mx-0">
      <div
      className="max-w-7xl mx-auto px-4 md:px-0 bg-primary text-white py-15 rounded-2xl mt-10 shadow-lg">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {
            stats.map((stat) => (
              <div
                key={stat.id}>
                <h2
                  className="text-4xl font-bold text-center">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </h2>
                <p
                  className="text-xl font-light text-center">
                  {stat.description}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
