import { Metadata } from "next"
import HeroProducts from "@/components/productos/HeroProducts"
import ProductSection from "@/components/productos/ProductSection"

export const metadata: Metadata = {
  title: 'Productos - Industria RLC',
  description: 'Productos de la empresa Industria RLC',
  keywords: ['productos', 'empresa', 'servicios eléctricos', 'construcción', 'automatización'],
  openGraph: {
    title: 'Productos en Industria RLC - Productos de la empresa',
    description: 'Descubre nuestros productos de la empresa Industria RLC. Certificados y garantías.',
  }
}

export default function page() {
  return (
    <main>
      <HeroProducts />
      <ProductSection />
    </main>
  )
}
