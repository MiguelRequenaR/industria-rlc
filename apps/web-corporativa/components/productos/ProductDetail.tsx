"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/database"
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react"
import { formatPrice } from "./ProductCard"
import { useCartStore } from "@/store/cart-store"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const images = product.image_urls ?? []
  const mainImage = images[selectedImageIndex] ?? images[0]
  const inStock = product.stock > 0

  const specs = [
    { label: "Código SKU", value: product.sku ?? "—" },
    { label: "Marca", value: product.brand ?? "—" },
    { label: "Categoría", value: product.category?.name ?? "—" },
    { label: "Unidad", value: product.unit_measure ?? "—" },
    { label: "Stock disponible", value: String(product.stock) },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 pt-25 md:pt-45 pb-10">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2" data-aos="fade-up">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-square">
              {inStock && (
                <span className="absolute top-4 left-4 z-10 bg-green-600/20 text-green-600 border border-green-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  En stock
                </span>
              )}
              {images.length ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
                  Sin imagen
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-4 border-t border-gray-200 overflow-x-auto">
                {images.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-3 transition-colors ${
                      i === selectedImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6" data-aos="fade-up" data-aos-delay="100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight uppercase">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">(—)</span>
              {product.sku && (
                <span className="text-sm text-blue-600 font-medium">
                  Código SKU # {product.sku}
                </span>
              )}
            </div>
            {product.description && (
              <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              S/. {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span
              className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-gray-600">
              {inStock
                ? `En stock - ${product.stock} unidades disponibles`
                : "Agotado"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10)
                  const safeValue = Number.isNaN(value) || value <= 0 ? 1 : value
                  setQuantity(Math.min(product.stock, Math.max(1, safeValue)))
                }}
                min={1}
                max={product.stock}
                className="w-14 text-center border-x border-gray-300 py-2 text-sm font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="p-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={!inStock}
              onClick={() =>
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.image_urls?.[0] ?? null,
                  stock: product.stock,
                  qty: quantity,
                })
              }
              className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-medium rounded-xl hover:bg-white hover:text-secondary border border-transparent hover:border-secondary transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase"
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir al carrito
            </button>
          </div>

          <div className="flex shadow-2xl rounded-2xl overflow-hidden divide-x divide-gray-200">
            <div className="flex-1 flex items-center gap-3 p-4">
              <Truck className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Envío</p>
                <p className="text-sm font-medium text-primary">Consulta disponibilidad</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 p-4">
              <ShieldCheck className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Garantía</p>
                <p className="text-sm font-medium text-primary">Calidad garantizada</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 shadow-2xl">
              <p className="text-xs font-bold text-gray-700 uppercase mb-1">Marca</p>
              <p className="text-lg font-bold text-secondary">{product.brand ?? "—"}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 shadow-2xl">
              <p className="text-xs font-bold text-gray-700 uppercase mb-1">Categoría</p>
              <p className="text-lg font-bold text-secondary">{product.category?.name ?? "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4 uppercase">
              <span className="w-1 h-8 bg-secondary rounded-full" />
              Especificaciones técnicas
            </h2>
            <div className="shadow-2xl rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((s, i) => (
                    <tr
                      key={s.label}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-gray-600 w-1/3">
                        {s.label}
                      </td>
                      <td className="px-6 py-4 text-primary">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <span className="w-1 h-8 bg-secondary rounded-full" />
              Descripción
            </h2>
            <div className="prose prose-gray max-w-none">
              {product.description ? (
                <>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </>
              ) : (
                <p className="text-gray-500">Sin descripción adicional.</p>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4 uppercase">
              Productos relacionados
            </h2>
            <div className="space-y-4 bg-white rounded-2xl shadow-2xl p-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${encodeURIComponent(p.slug)}`}
                  className="flex gap-4 group hover:bg-secondary/10 rounded-xl p-4"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {p.image_urls?.length ? (
                      <Image
                        src={p.image_urls[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        —
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-primary group-hover:text-secondary transition-colors line-clamp-2 uppercase">
                      {p.name}
                    </h3>
                    <p className="text-sm font-bold text-secondary mt-0.5">
                      S/. {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href="/productos/catalogo"
                className="block text-center py-3 text-secondary font-medium hover:underline"
              >
                Ver todos los productos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
