import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Tags, TableProperties } from "lucide-react"
import type { Product, Category } from "@/types/database"

interface CategorySectionProps {
  products: Product[]
  categories: Category[]
}

export default function CategorySection({ products, categories }: CategorySectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-8 flex justify-between items-center" data-aos="fade-up" data-aos-delay="100">
        <div>
          <div className="flex items-center gap-2">
            <TableProperties className="w-12 h-12 text-secondary" />
            <h2 className="text-2xl text-primary uppercase">Categorías Destacadas</h2>
          </div>
          <p className="text-primary mt-2 max-w-2xl">
            Encuentra todas las categorías de productos que ofrecemos. Desde productos eléctricos hasta productos de construcción.
          </p>
        </div>
        <Link
          href="/productos/catalogo"
          className="inline-flex items-center gap-2 mt-4 text-secondary font-medium hover:underline"
        >
          Ver Todas las Categorías
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6" data-aos="fade-up" data-aos-delay="200">
        {categories.length === 0 ? (
          <p className="text-tertiary col-span-full">No hay categorías disponibles.</p>
        ) : (
          categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos/catalogo?categoria=${cat.slug}`}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden rounded-full">
                {cat.image_url ? (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-300 rounded-full hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tags className="w-12 h-12 text-primary" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-center text-primary uppercase group-hover:text-secondary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-center text-sm text-secondary mt-1">
                  {products.filter((p) => p.category_id === cat.id).length} producto(s)
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}
