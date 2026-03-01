import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { checkoutBodySchema } from "@/lib/checkout-schema"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = checkoutBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { customer_name, customer_phone, customer_address, total_amount, items } =
      parsed.data

    const supabase = createAdminClient()
    const { data: orderId, error } = await supabase.rpc("process_checkout", {
      p_customer_name: customer_name,
      p_customer_phone: customer_phone,
      p_customer_address: customer_address,
      p_total_amount: total_amount,
      p_items: items,
    })

    if (error) {
      console.error("process_checkout error:", error)
      return NextResponse.json(
        { error: error.message || "Error al procesar el pedido" },
        { status: 422 }
      )
    }

    return NextResponse.json({ orderId: orderId as string })
  } catch (e) {
    console.error("Checkout API error:", e)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
