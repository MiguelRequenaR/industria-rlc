import { MetadataRoute } from 'next'
import { getAllCourseSlugs } from '@/lib/courses-data'
import { getAllBlogSlugs } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://academia.industriarlc.com'
  
  // Páginas estáticas principales
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
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Páginas dinámicas de cursos
  const courseSlugs = getAllCourseSlugs()
  const coursePages = courseSlugs.map((slug) => ({
    url: `${baseUrl}/cursos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Páginas dinámicas de blog
  const blogSlugs = getAllBlogSlugs()
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...coursePages, ...blogPages]
}
