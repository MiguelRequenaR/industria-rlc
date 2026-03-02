import { MetadataRoute } from "next"
import { servicesData } from "@/lib/services-data"
import { experienceData } from "@/lib/experience-data"
import { getProductsFromDb } from "@/lib/products-data"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://industriarlc.com"
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiencia`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/libro-reclamaciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/productos/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const servicePages = servicesData.flatMap(service => 
    service.subServices.map(subService => ({
      url: `${baseUrl}/servicios/${subService.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const experiencePages = experienceData.map(exp => ({
    url: `${baseUrl}/experiencia/${exp.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const products = await getProductsFromDb()
  const productPages = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${baseUrl}/productos/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

  return [...staticPages, ...servicePages, ...experiencePages, ...productPages]
}