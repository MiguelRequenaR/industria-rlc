"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllBlogPosts, getAllBlogCategories } from "@/actions/admin-actions"
import type { BlogPostWithDetails, BlogCategory } from "@/types/database"

export function useBlogPosts(initialData?: {
  posts: BlogPostWithDetails[]
  categories: BlogCategory[]
}) {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const [posts, categories] = await Promise.all([
        getAllBlogPosts(),
        getAllBlogCategories(),
      ])
      return { posts, categories }
    },
    initialData: initialData
      ? { posts: initialData.posts, categories: initialData.categories }
      : undefined,
  })
}

export function useInvalidateBlogPosts() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ["blog-posts"] })
}
