import { notFound } from "next/navigation"
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blog-data"
import BlogDetailPage from "@/components/blog/BlogDetailPage"
import type { Metadata } from "next"

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generar metadata dinámica
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    return {
      title: "Artículo no encontrado - RLC Academy",
    }
  }

  return {
    title: `${post.title} - Blog RLC Academy`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogDetailPage post={post} />
}
