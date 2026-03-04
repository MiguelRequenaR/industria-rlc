import type { CartItem } from "@/store/cart-store"
import { formatPrice } from "@/components/productos/ProductCard"

const WHATSAPP_NUMBER = "51940162009"

export interface OrderSummary {
  orderId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  ruc: string | null
  companyName: string | null
  totalAmount: number
  items: CartItem[]
}

export function buildOrderWhatsAppMessage(summary: OrderSummary): string {
  const lines = [
    "*NUEVO PEDIDO - Industria RLC*",
    "",
    `*Orden:* ${summary.orderId}`,
    `*Cliente:* ${summary.customerName}`,
    `*Teléfono:* ${summary.customerPhone}`,
    `*Dirección:* ${summary.customerAddress}`,
    summary.ruc ? `*RUC:* ${summary.ruc}` : "",
    summary.companyName ? `*Razón social:* ${summary.companyName}` : "",
    "",
    "*Productos:*",
    ...summary.items.map(
      (i) =>
        `• ${i.name} x ${i.qty} — S/. ${formatPrice(i.price * i.qty)}`
    ),
    "",
    `*Total: S/. ${formatPrice(summary.totalAmount)}*`,
  ]
  return lines.join("\n")
}

export function getCheckoutWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
