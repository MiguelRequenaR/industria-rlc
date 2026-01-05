import { Metadata } from "next";
import HeroLibroReclamaciones from '@/components/libro-reclamaciones/HeroLibroReclamaciones'
import LibroReclamacionesPage from '@/components/libro-reclamaciones/LibroReclamacionesPage'
import React from 'react'

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones - Industria RLC',
  description: 'Formulario de reclamaciones para clientes de Industria RLC. Responde a tus inquietudes y mejora nuestros servicios.',
  keywords: ['libro de reclamaciones', 'formularios', 'clientes', 'servicios eléctricos', 'construcción', 'automatización'],
  openGraph: {
    title: 'Libro de Reclamaciones en Industria RLC - Formulario de Reclamaciones',
    description: 'Formulario de reclamaciones para clientes de Industria RLC. Responde a tus inquietudes y mejora nuestros servicios.',
  }
}

export default function LibroReclamaciones() {
  return (
    <main>
      <HeroLibroReclamaciones />
      <LibroReclamacionesPage />
    </main>
  )
}
