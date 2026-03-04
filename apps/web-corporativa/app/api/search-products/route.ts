import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").trim()

  if (q.length < 2) {
    return NextResponse.json({ products: [] })
  }

  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("products")
      .select("id, name, description, slug, brand, category:categories(name)")
      .eq("is_active", true)
      .or(
        [
          `name.ilike.%${q}%`,
          `description.ilike.%${q}%`,
          `brand.ilike.%${q}%`,
          `sku.ilike.%${q}%`,
        ].join(",")
      )
      .limit(10)

    if (error) {
      console.error("Error searching products:", error)
      return NextResponse.json(
        { error: "Error al buscar productos", products: [] },
        { status: 500 }
      )
    }

    return NextResponse.json({ products: data || [] })
  } catch (e) {
    console.error("Unexpected error searching products:", e)
    return NextResponse.json(
      { error: "Error interno al buscar productos", products: [] },
      { status: 500 }
    )
  }
}

