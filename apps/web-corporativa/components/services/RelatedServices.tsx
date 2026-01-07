"use client"

import { servicesData } from "@/lib/services-data";
import { SubService } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface RelatedServicesProps {
  currentSlug: string;
  limit?: number;
}

export default function RelatedServices({ currentSlug, limit = 3 }: RelatedServicesProps) {
  const allSubServices: (SubService & { serviceTitle: string })[] = [];
  
  servicesData.forEach((service) => {
    service.subServices.forEach((subService) => {
      if (subService.slug !== currentSlug) {
        allSubServices.push({
          ...subService,
          serviceTitle: service.title,
        });
      }
    });
  });
  
  const relatedServices = allSubServices.slice(0, limit);
  
  if (relatedServices.length === 0) {
    return null;
  }
  
  return (
    <section className="bg-gray-50 py-16" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold uppercase text-primary">
            Otros <span className="text-secondary">Servicios</span>
          </h2>
          <hr className="w-30 border-t-2 border-secondary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedServices.map((subService) => (
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

              <span
                className="
                  absolute inset-0 
                  bg-primary/80
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out
                "
              />

              <div className="absolute bottom-0 left-0 w-full z-10 group-hover:-translate-y-[120px] transition-transform duration-500 ease-in-out">
                <div className="relative bg-primary/80 text-white w-full py-4 px-4">
                  <h3 className="text-xl font-semibold text-center">
                    {subService.title}
                  </h3>
                  <p className="text-sm text-center mt-1 opacity-90">
                    {subService.serviceTitle}
                  </p>
                </div>

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
          ))}
        </div>
      </div>
    </section>
  );
}

