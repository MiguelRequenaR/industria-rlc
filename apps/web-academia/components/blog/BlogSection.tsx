"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { getBlogsByCategory } from "@/lib/blog-data"
import { useState, useEffect } from "react"

interface BlogSectionProps {
  selectedCategory?: string
}

export default function BlogSection({ selectedCategory = "Todos" }: BlogSectionProps) {
  const [filteredPosts, setFilteredPosts] = useState(getBlogsByCategory(selectedCategory))

  useEffect(() => {
    setFilteredPosts(getBlogsByCategory(selectedCategory))
  }, [selectedCategory])

  const featuredBlog = filteredPosts.find(post => post.featured)
  const regularBlogs = filteredPosts.filter(post => !post.featured).slice(0, 3)

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      {featuredBlog && (
        <Link
          href={`/blog/${featuredBlog.slug}`}
          className="block mb-20 group"
          data-aos="fade-up"
        >
          {/* Desktop: Layout horizontal */}
          <div className="hidden lg:grid grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="relative h-auto">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4 text-sm text-tertiary">
                <span className="bg-secondary/10 text-primary px-4 py-1 rounded-full font-semibold">
                  {featuredBlog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredBlog.readTime}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                {featuredBlog.title}
              </h2>
              <p className="text-tertiary text-lg leading-relaxed">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{featuredBlog.author.name}</p>
                    <p className="text-sm text-tertiary">{featuredBlog.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold">
                  Leer más
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Layout vertical como los demás */}
          <div className="lg:hidden bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-64">
              <Image
                src={featuredBlog.image}
                alt={featuredBlog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-tertiary">
                <span className="bg-secondary/10 text-primary px-3 py-1 rounded-full font-semibold text-xs">
                  {featuredBlog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredBlog.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                {featuredBlog.title}
              </h3>
              <p className="text-tertiary text-sm line-clamp-3">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{featuredBlog.author.name}</p>
                    <p className="text-xs text-tertiary">{featuredBlog.date}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>
      )}

      {regularBlogs.length > 0 && (
        <>
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">
              Artículos Recientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-tertiary">
                      <span className="bg-secondary/10 text-primary px-3 py-1 rounded-full font-semibold text-xs">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-tertiary text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">{post.author.name}</p>
                          <p className="text-xs text-tertiary">{post.date}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-20" data-aos="fade-up">
          <p className="text-2xl text-tertiary">
            No hay artículos disponibles en esta categoría.
          </p>
        </div>
      )}
    </section>
  )
}
