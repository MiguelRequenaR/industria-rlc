import { getBlogPostsFromDb, getBlogCategoriesFromDb } from "@/lib/blog-data"
import HeroBlogWrapper from "@/components/blog/HeroBlogWrapper"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Blog | RLC Academy 360",
  description: "Mantente al día con las últimas noticias, tutoriales y consejos profesionales para electricistas.",
  keywords: ["blog electricidad", "tutoriales eléctricos", "noticias industriales", "consejos profesionales"],
  openGraph: {
    title: "Blog | RLC Academy 360",
    description: "Mantente al día con las últimas noticias, tutoriales y consejos profesionales para electricistas.",
    url: "https://academia.industriarlc.com/blog",
    type: "website",
  },
}

export default async function PageBlog() {
  const [posts, categories] = await Promise.all([
    getBlogPostsFromDb(),
    getBlogCategoriesFromDb()
  ])

  return (
    <main>
      <HeroBlogWrapper initialPosts={posts} initialCategories={categories} />
    </main>
  )
}
