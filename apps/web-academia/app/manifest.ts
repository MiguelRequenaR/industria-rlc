import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RLC Academy - Cursos de Electricidad Industrial | Formación Técnica Especializada',
    short_name: 'RLC Academy',
    description: 'Cursos de Electricidad Industrial | Formación Técnica Especializada',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1c2b38',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}