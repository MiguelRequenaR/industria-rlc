import { notFound } from "next/navigation"
import { getBlogBySlug, getAllBlogSlugs, getRegularBlogs } from "@/lib/blog-data"
import BlogDetailPage from "@/components/blog/BlogDetailPage"
import BlogStructuredData from "@/components/seo/BlogStructuredData"
import type { Metadata } from "next"

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generar metadata dinámica
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    return {
      title: "Artículo no encontrado",
    }
  }

  const blogUrl = `https://academia.industriarlc.com/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'blog electricidad', 'artículos técnicos', 'RLC Academy'],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: `${post.title} | Blog RLC Academy`,
      description: post.excerpt,
      url: blogUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: blogUrl,
    },
  }
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const [post, relatedPosts] = await Promise.all([
    getBlogBySlug(slug),
    getRegularBlogs(3)
  ])

  if (!post) {
    notFound()
  }

  // Filtrar posts relacionados (excluir el actual)
  const filteredRelatedPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <>
      <BlogStructuredData post={post} />
      <BlogDetailPage post={post} relatedPosts={filteredRelatedPosts} />
    </>
  )
}
