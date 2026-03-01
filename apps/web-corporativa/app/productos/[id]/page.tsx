import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ProductDetail from "@/components/productos/ProductDetail"
import { getProductById, getRelatedProducts } from "@/lib/products-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return { title: "Producto no encontrado" }
  return {
    title: `${product.name} - Industria RLC`,
    description: product.description ?? `Producto ${product.name} de Industria RLC`,
    openGraph: {
      title: `${product.name} - Industria RLC`,
      description: product.description ?? undefined,
      images: product.image_urls?.[0] ? [product.image_urls[0]] : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(
    id,
    product.category_id ?? null,
    3
  )

  return (
    <main>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-secondary">Inicio</Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-secondary">Productos</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link
                  href={`/productos/catalogo?categoria=${product.category.slug}`}
                  className="hover:text-secondary"
                >
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-primary font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </main>
  )
}
