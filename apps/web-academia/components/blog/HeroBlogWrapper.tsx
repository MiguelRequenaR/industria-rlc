"use client"

import { useState } from "react"
import HeroBlog from "./HeroBlog"
import BlogSection from "./BlogSection"
import type { BlogPost } from "@/lib/types"

interface HeroBlogWrapperProps {
  initialPosts: BlogPost[]
  initialCategories: string[]
}

export default function HeroBlogWrapper({ initialPosts, initialCategories }: HeroBlogWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  // Filtrar posts según categoría seleccionada
  const filteredPosts = selectedCategory === "Todos" 
    ? initialPosts 
    : initialPosts.filter(post => post.category === selectedCategory)

  return (
    <>
      <HeroBlog 
        categories={initialCategories}
        onCategoryChange={setSelectedCategory} 
        activeCategory={selectedCategory}
      />
      <BlogSection posts={filteredPosts} />
    </>
  )
}
