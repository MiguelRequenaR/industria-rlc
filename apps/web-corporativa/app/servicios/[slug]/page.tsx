import { servicesData } from "@/lib/services-data";
import { SubService } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RelatedServices from "@/components/services/RelatedServices";

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  
  servicesData.forEach((service) => {
    service.subServices.forEach((subService) => {
      slugs.push({ slug: subService.slug });
    });
  });
  
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = findSubServiceBySlug(slug);
  
  if (!result) {
    return {
      title: "Servicio no encontrado",
    };
  }
  
  const { subService, serviceTitle } = result;
  
  return {
    title: `${subService.title} | ${serviceTitle}`,
    description: subService.detailedDescription || subService.description,
  };
}

function findSubServiceBySlug(slug: string): { subService: SubService; serviceTitle: string } | null {
  for (const service of servicesData) {
    const subService = service.subServices.find((sub) => sub.slug === slug);
    if (subService) {
      return { subService, serviceTitle: service.title };
    }
  }
  return null;
}

export default async function SubServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = findSubServiceBySlug(slug);
  
  if (!result) {
    notFound();
  }
  
  const { subService, serviceTitle } = result;

  return (
    <main className="min-h-screen">
      <section className="relative h-125 w-full">
        <Image
          src={subService.image}
          alt={subService.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            {subService.title}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl">
            {subService.description}
          </p>
        </div>
      </section>

      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div>
            <Link 
              href="/servicios" 
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft size={20} />
              Volver a Servicios
            </Link>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-0 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-6">
              <span className="text-sm uppercase tracking-wider text-gray-500">
                {serviceTitle}
              </span>
            </div>
            <h2 className="text-2xl font-light uppercase text-primary mb-6">
              Descripción del Servicio
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {subService.detailedDescription || subService.description}
            </p>
          </div>

          {subService.benefits && subService.benefits.length > 0 && (
            <div>
              <h2 className="text-2xl font-light uppercase text-primary mb-6">
                Beneficios
              </h2>
              <ul className="space-y-4">
                {subService.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary shrink-0 mt-1" size={24} />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {subService.applications && subService.applications.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light uppercase text-primary mb-8 text-center">
              Aplicaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subService.applications.map((application, index) => (
                <div 
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    {application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-primary text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas más información?
          </h2>
          <p className="text-xl mb-8">
            Contáctanos para obtener una cotización personalizada
          </p>
          <Link
            href="/contacto"
            className="inline-block relative w-fit overflow-hidden bg-white text-primary px-8 py-3 rounded-full font-semibold group transition-colors duration-500 hover:text-white uppercase"
          >
            <span
              className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none rounded-lg"
            />
            <span className="relative z-10 transition-colors duration-500">
              Solicitar Cotización
            </span>
          </Link>
        </div>
      </section>

      <RelatedServices currentSlug={slug} />
    </main>
  );
}

