import { BlogPostsGrid } from "@/components/admin/blog-posts-grid"
import { getAllBlogPosts, getAllBlogCategories } from "@/actions/admin-actions"

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllBlogCategories()
  ])

  return (
    <div>
      <BlogPostsGrid initialPosts={posts} categories={categories} />
    </div>
  )
}
