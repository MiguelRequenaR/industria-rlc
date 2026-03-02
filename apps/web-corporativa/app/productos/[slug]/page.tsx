import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import ProductDetail from "@/components/productos/ProductDetail"
import { getProductById, getProductBySlug, getRelatedProducts } from "@/lib/products-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Producto no encontrado - Industria RLC",
    }
  }

  return {
    title: `${product.name} - Industria RLC`,
    description: product.description ?? `Producto ${product.name} en Industria RLC`,
    openGraph: {
      title: `${product.name} - Industria RLC`,
      description: product.description ?? `Producto ${product.name} en Industria RLC`,
      images: product.image_urls?.length ? [{ url: product.image_urls[0] }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  if (UUID_REGEX.test(slug)) {
    const byId = await getProductById(slug)
    if (!byId) notFound()
    redirect(`/productos/${encodeURIComponent(byId.slug || byId.id)}`)
  }

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.id, product.category_id, 3)

  return (
    <main>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </main>
  )
}

