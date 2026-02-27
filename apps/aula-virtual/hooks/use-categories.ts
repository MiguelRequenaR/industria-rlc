"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCategories } from "@/actions/admin-actions"
import type { Category } from "@/types/database"

export function useCategories(initialData?: Category[]) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await getAllCategories()
      return categories
    },
    initialData: initialData ?? undefined,
  })
}

export function useInvalidateCategories() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ["categories"] })
}

