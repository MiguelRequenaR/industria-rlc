"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllProducts } from "@/actions/admin-actions"
import type { Product } from "@/types/database"

export function useProducts(initialData?: Product[]) {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getAllProducts()
      return products
    },
    initialData: initialData ?? undefined,
  })
}

export function useInvalidateProducts() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: ["products"] })
}