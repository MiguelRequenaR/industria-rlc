"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/types/database"
import { Tag, ShoppingCart } from "lucide-react"
import { ProductImageHover } from "./ProductImageHover"
import { useCartStore } from "@/store/cart-store"

interface ProductCardProps {
  product: Product
}

export function formatPrice(price: number) {
  return Number(price).toFixed(2)
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const items = useCartStore((s) => s.items)
  const [maxReached, setMaxReached] = useState(false)
  const inStock = product.stock > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return
    const existing = items.find((i) => i.productId === product.id)
    const currentQty = existing?.qty ?? 0
    if (currentQty >= product.stock) {
      setMaxReached(true)
      setTimeout(() => setMaxReached(false), 5000)
      return
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_urls?.[0] ?? null,
      stock: product.stock,
      qty: 1,
    })
  }

  return (
    <div className="relative p-5 rounded-3xl border border-secondary bg-white">
      <Link
        href={`/productos/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver ${product.name}`}
      />
      <div className="absolute top-3 left-3 z-10 rounded-full bg-secondary/90 p-2 text-white pointer-events-none">
        <Tag className="w-4 h-4" />
      </div>
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <ProductImageHover
          imageUrls={product.image_urls ?? []}
          alt={product.name}
        />
      </div>
      <div className="py-5">
        <p className="text-sm text-secondary mt-1">{product.category?.name}</p>
        <h3 className="text-sm md:text-xl text-primary uppercase">{product.name}</h3>
        <div className="flex justify-between items-center gap-2">
          <p className="text-xs md:text-sm text-primary mt-1">Marca: {product.brand ?? "—"}</p>
          <p className="text-sm text-green-500 mt-1">({product.stock})</p>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-secondary mt-1">
          S/. {formatPrice(product.price)}
        </h3>
      </div>
      <div className="space-y-1">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="relative z-10 w-full h-12 rounded-xl text-secondary border border-secondary hover:bg-secondary/20 flex items-center justify-center gap-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden md:block">Añadir al carrito</span>
        </button>
        {maxReached && (
          <p className="text-[11px] text-red-600 text-center uppercase mt-2">
            Stock máximo alcanzado ({product.stock} unidades)
          </p>
        )}
      </div>
    </div>
  )
}
