import type { Product } from "@/types/database"
import { Tags, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./ProductCard"

interface ProductSectionProps {
  products: Product[]
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="mb-8 flex justify-between items-center" data-aos="fade-up" data-aos-delay="100">
        <div>
          <div className="flex items-center gap-2">
            <Tags className="w-12 h-12 text-secondary" />
            <h2 className="text-2xl text-primary uppercase">Últimos Productos</h2>
          </div>
          <p className="text-primary mt-2 max-w-2xl">
            Encuentra nuestros últimos productos agregados a nuestro catálogo. Con ofertas especiales y descuentos.
          </p>
        </div>
        <Link
          href="/productos/catalogo"
          className="inline-flex items-center gap-2 mt-4 text-secondary font-medium hover:underline"
        >
          Ver Todos los Productos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-tertiary col-span-full text-gray-700 uppercase text-center" data-aos="fade-up" data-aos-delay="200">No hay productos disponibles.</p>
      )}
    </section>
  )
}
