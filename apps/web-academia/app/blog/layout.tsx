import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos, guías y recursos sobre electricidad industrial, instalaciones eléctricas, seguridad, tecnología y tendencias del sector eléctrico. Aprende con los expertos de RLC Academy.',
  keywords: ['blog electricidad', 'artículos técnicos', 'guías electricidad', 'tendencias sector eléctrico', 'seguridad industrial'],
  openGraph: {
    title: 'Blog | RLC Academy',
    description: 'Artículos y recursos sobre electricidad industrial, instalaciones y seguridad eléctrica.',
    url: 'https://academia.industriarlc.com/blog',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
