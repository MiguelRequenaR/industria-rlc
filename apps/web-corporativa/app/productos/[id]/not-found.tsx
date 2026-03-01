import Link from "next/link"

export default function ProductNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Producto no encontrado
      </h1>
      <p className="text-gray-600 mb-6">
        El producto que buscas no existe o ya no está disponible.
      </p>
      <Link
        href="/productos/catalogo"
        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-medium rounded-xl hover:bg-secondary/90 transition-colors"
      >
        Ver catálogo de productos
      </Link>
    </div>
  )
}
