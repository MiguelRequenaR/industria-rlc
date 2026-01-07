import { experienceData } from "@/lib/experience-data";
import { Experience } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MapPin, Calendar, Building2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return experienceData.map((experience) => ({
    slug: experience.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const experience = experienceData.find((exp) => exp.slug === slug);

  if (!experience) {
    return {
      title: "Proyecto no encontrada",
    };
  }

  return {
    title: `${experience.title} | Experiencia`,
    description: experience.description,
  };
}

function findExperienceBySlug(slug: string): Experience | null {
  return experienceData.find((exp) => exp.slug === slug) || null;
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = findExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <main className="pt-40 md:pt-50">
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div>
            <Link
              href="/experiencia"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft size={20} />
              Volver a Proyectos
            </Link>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="bg-primary p-5 md:p-10 m-4 md:m-0 rounded-2xl" data-aos="fade-up">
          <div className="text-3xl font-light uppercase text-white flex items-center gap-2 mb-10">
            <div className="self-stretch w-1 bg-secondary"></div>
            {experience.title}
          </div>
          <div>
            <p className="text-white text-lg font-light mb-6">
              {experience.description}
            </p>
          </div>
          <div>
            {experience.features && experience.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-light uppercase text-white mb-6">
                  Alcances del Proyecto
                </h2>
                <ul className="space-y-4">
                  {experience.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-white shrink-0 mt-1" size={24} />
                      <span className="text-sm text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 md:p-10" data-aos="fade-up" data-aos-delay="100">
          <div className="mb-6">  
            <h2 className="text-2xl font-bold uppercase text-primary">
              Información <span className="text-secondary">General</span>
            </h2>
            <hr className="w-30 border-t-2 border-secondary" />
          </div>
          <div className="space-y-5 mb-5">
            {/* Project Info Cards */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex items-start gap-4">
              <Building2 className="text-primary shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Cliente</h3>
                <p className="text-xl font-semibold text-gray-800">{experience.client}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex items-start gap-4">
              <MapPin className="text-primary shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Ubicación</h3>
                <p className="text-xl font-semibold text-gray-800">{experience.location}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex items-start gap-4">
              <Calendar className="text-primary shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Fecha</h3>
                <p className="text-xl font-semibold text-gray-800">{experience.date}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-0 py-10 md:py-20" data-aos="fade-up" data-aos-delay="200">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold uppercase text-primary">
            Galeria de <span className="text-secondary">imágenes</span>
          </h2>
          <hr className="w-30 border-t-2 border-secondary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {experience.image.map((image, idx) => (
            <div
              key={`${image}-${idx}`}
              className="w-full h-[320px] rounded overflow-hidden flex items-center justify-center bg-gray-200"
            >
              <Image
                src={image}
                alt="Imagen del proyecto"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                style={{ minHeight: "200px", maxHeight: "320px" }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}