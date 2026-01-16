"use client"

import { useState } from "react"
import HeroBlog from "@/components/blog/HeroBlog"
import BlogSection from "@/components/blog/BlogSection"

// Note: metadata export no funciona en client components
// Se debe manejar con next/head o convertir a server component con client children

export default function PageBlog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  return (
    <main>
      <HeroBlog onCategoryChange={setSelectedCategory} />
      <BlogSection selectedCategory={selectedCategory} />
    </main>
  )
}
