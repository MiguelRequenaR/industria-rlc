import type { Metadata } from "next"
import HeroProducts from "@/components/productos/HeroProducts"
import ProductsCatalog from "@/components/productos/ProductsCatalog"
import { getProductsFromDb, getCategoriesFromDb } from "@/lib/products-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Catálogo de Productos - Industria RLC",
  description: "Explora todo nuestro catálogo de productos. Filtra por categoría, marca y más.",
  keywords: ["catálogo", "productos", "empresa", "servicios eléctricos", "construcción"],
  openGraph: {
    title: "Catálogo de Productos - Industria RLC",
    description: "Explora todo nuestro catálogo de productos. Filtra por categoría, marca y más.",
  },
}

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([
    getProductsFromDb(),
    getCategoriesFromDb(),
  ])

  return (
    <main>
      <HeroProducts />
      <ProductsCatalog products={products} categories={categories} />
    </main>
  )
}
