"use client"

import { useState } from "react"
import HeroBlog from "@/components/blog/HeroBlog"
import BlogSection from "@/components/blog/BlogSection"

export default function PageBlog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  return (
    <main>
      <HeroBlog onCategoryChange={setSelectedCategory} />
      <BlogSection selectedCategory={selectedCategory} />
    </main>
  )
}
