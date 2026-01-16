import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Industria RLC - Servicios Eléctricos Integrales en Huancayo, Perú',
    short_name: 'Industria RLC',
    description: 'Empresa peruana líder en servicios eléctricos integrales, construcción, automatización y gestión de proyectos. +10 de años de experiencia. Certificados y garantías.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1c2b38',
    icons: [
      {
        src: '/industriarlc512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}