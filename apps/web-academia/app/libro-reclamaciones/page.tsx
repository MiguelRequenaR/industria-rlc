import type { Metadata } from "next"
import LibroReclamaciones from "@/components/legal/LibroReclamaciones"

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description: 'Libro de Reclamaciones de RLC Academy. Presenta tu queja o reclamo sobre nuestros servicios educativos de forma segura y confidencial.',
  openGraph: {
    title: 'Libro de Reclamaciones | RLC Academy',
    description: 'Sistema de atención de quejas y reclamos de RLC Academy conforme a la normativa peruana.',
    url: 'https://academia.industriarlc.com/libro-reclamaciones',
    type: 'website',
  },
}

export default function LibroReclamacionesPage() {
  return (
    <main>
      <LibroReclamaciones />
    </main>
  )
}
