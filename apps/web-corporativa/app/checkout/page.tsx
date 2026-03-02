"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { useCartStore } from "@/store/cart-store"
import { buildOrderWhatsAppMessage, getCheckoutWhatsAppUrl } from "@/lib/whatsapp-message"
import { formatPrice } from "@/components/productos/ProductCard"
import { ShoppingCart, Loader2, Trash2, Minus, Plus } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, setQty, removeItem, totalAmount, getItemsForCheckout, clear } =
    useCartStore()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          total_amount: totalAmount(),
          items: getItemsForCheckout(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al procesar el pedido")
      return data.orderId as string
    },
    onSuccess: (orderId) => {
      const message = buildOrderWhatsAppMessage({
        orderId,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        totalAmount: totalAmount(),
        items,
      })
      clear()
      window.location.href = getCheckoutWhatsAppUrl(message)
    },
  })

  useEffect(() => {
    if (items.length === 0 && !mutation.isPending) {
      router.replace("/productos/catalogo")
    }
  }, [items.length, mutation.isPending, router])

  if (items.length === 0 && !mutation.isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-primary uppercase">Redirigiendo al catálogo...</p>
      </div>
    )
  }

  const total = totalAmount()

  return (
    <div className="max-w-7xl mx-auto px-4 pt-50 pb-16">
      <h1 className="text-2xl font-bold text-primary uppercase mb-8" data-aos="fade-up">
        Checkout — Confirmar pedido
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <section data-aos="fade-up">
          <h2 className="text-lg font-semibold text-primary uppercase mb-4">
            Tus datos
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate()
            }}
          >
            <div>
              <label className="block text-sm font-medium text-primary mb-1 uppercase">
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1 uppercase">
                Teléfono (WhatsApp)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Ej. 940 162 009"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1 uppercase">
                Dirección de envío
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                placeholder="Dirección completa para el envío"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-white hover:text-secondary border border-transparent hover:border-secondary transition-all duration-300 disabled:opacity-60 uppercase cursor-pointer"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                {mutation.isPending ? "Procesando..." : "Solicitar Pedido"}
              </button>
              <Link
                href="/productos/catalogo"
                className="px-6 py-3 border border-secondary text-primary font-semibold rounded-xl hover:bg-gray-50 uppercase"
              >
                Seguir comprando
              </Link>
            </div>
            {mutation.isError && (
              <p className="text-red-600 text-sm">
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Error al procesar el pedido"}
              </p>
            )}
          </form>
        </section>

        <section data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-lg font-semibold text-primary uppercase mb-4">
            Resumen del carrito
          </h2>
          <div className="shadow-2xl rounded-2xl overflow-hidden bg-white">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 p-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        —
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary truncate">{item.name}</p>
                    <p className="text-sm text-secondary">
                      S/. {formatPrice(item.price)} c/u
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setQty(item.productId, item.qty - 1)}
                        className="p-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer"
                        aria-label="Menos"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.productId, item.qty + 1)}
                        className="p-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer"
                        aria-label="Más"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded ml-2 cursor-pointer"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-primary">
                      S/. {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-primary uppercase">Total</span>
              <span className="text-xl font-bold text-secondary">
                S/. {formatPrice(total)}
              </span>
            </div>
          </div>
          <p className="text-sm text-primary mt-5 mx-5">
            Al solicitar el pedido se reservará el stock y serás redirigido a
            WhatsApp para confirmar con nosotros.
          </p>
        </section>
      </div>
    </div>
  )
}
