import type { Metadata } from "next"
import HeroProducts from "@/components/productos/HeroProducts"
import CategorySection from "@/components/productos/CategorySection"
import { getProductsFromDb, getCategoriesFromDb } from "@/lib/products-data"
import ProductSection from "@/components/productos/ProductSection"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Productos - Industria RLC",
  description: "Productos de la empresa Industria RLC",
  keywords: ["productos", "empresa", "servicios eléctricos", "construcción", "automatización"],
  openGraph: {
    title: "Productos en Industria RLC - Productos de la empresa",
    description: "Descubre nuestros productos de la empresa Industria RLC. Certificados y garantías.",
  },
}

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([
    getProductsFromDb(),
    getCategoriesFromDb(),
  ])

  return (
    <main>
      <HeroProducts />
      <CategorySection products={products} categories={categories} />
      <ProductSection products={products} />
    </main>
  )
}
