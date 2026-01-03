"use client"

import { servicesData } from "@/lib/services-data";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = servicesData;

  return (
    <section
      className="max-w-7xl mx-auto py-10 px-4 md:px-0">
      {
        services.map((service) => (
          <div key={service.id}
            className="mb-16">
            <h2
              className="text-center text-3xl font-light uppercase text-primary mb-4" data-aos="fade-up">
              {service.title}
            </h2>
            <p
              className="text-center text-lg text-primary mb-8" data-aos="fade-up" data-aos-delay="100">
              {service.description}
            </p>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="200">
              {
                service.subServices.map((subService) => (
                  <Link 
                    key={subService.id}
                    href={`/servicios/${subService.slug}`}
                    className="relative w-full h-[400px] overflow-hidden group cursor-pointer block"
                  >
                    <Image
                      src={subService.image}
                      alt={subService.title}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />

                    {/* Overlay con efecto hover */}
                    <span
                      className="
                        absolute inset-0 
                        bg-primary/80
                        translate-y-full
                        group-hover:translate-y-0
                        transition-transform duration-500 ease-in-out
                      "
                    />

                    {/* Contenido que se desliza hacia arriba en hover */}
                    <div className="absolute bottom-0 left-0 w-full z-10 group-hover:-translate-y-[120px] transition-transform duration-500 ease-in-out">
                      {/* Título - Siempre visible */}
                      <div className="relative bg-primary/80 text-white w-full py-4 px-4">
                        <h3 className="text-xl font-semibold text-center">
                          {subService.title}
                        </h3>
                      </div>

                      {/* Contenido adicional - Aparece en hover */}
                      <div className="
                        relative text-white mx-4 mt-4 flex flex-col items-center
                        opacity-0 max-h-0 overflow-hidden
                        group-hover:opacity-100 group-hover:max-h-60
                        transition-all duration-500 ease-in-out
                      ">
                        <p className="text-center text-sm tracking-wider">
                          {subService.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        ))
      }
    </section>
  )
}
