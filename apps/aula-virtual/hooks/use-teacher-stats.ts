"use client"

import { useQuery } from "@tanstack/react-query"
import { getTeacherDashboardStats } from "@/actions/teacher-actions"

export function useTeacherStats() {
  return useQuery({
    queryKey: ["teacher-stats"],
    queryFn: () => getTeacherDashboardStats(),
    refetchInterval: 60000, // Refrescar cada minuto
  })
}
