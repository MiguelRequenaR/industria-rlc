import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - Carrito",
  description: "Confirma tu pedido y envíalo por WhatsApp.",
  robots: { index: false, follow: true },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
