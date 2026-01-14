"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"

type UserRole = "admin" | "docente" | "estudiante"

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  email: string
  created_at: string
}

export const profileKeys = {
  all: ["profile"] as const,
  current: () => [...profileKeys.all, "current"] as const,
}

async function fetchProfile(): Promise<UserProfile | null> {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error("No hay usuario autenticado")
  }

  const { data, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    throw new Error(profileError.message)
  }

  return {
    ...data,
    email: user.email || "",
  }
}

export function useProfileQuery() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: profileKeys.current(),
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
  })

  // Real-time subscription
  useEffect(() => {
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: profileKeys.current() })
    })

    // Obtener el usuario actual
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return

      // Subscription a cambios en el perfil
      const channel = supabase
        .channel("profile-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            console.log("Profile changed:", payload)
            // Invalidar la query para refrescar los datos
            queryClient.invalidateQueries({ queryKey: profileKeys.current() })
          }
        )
        .subscribe()

      return () => {
        channel.unsubscribe()
      }
    })

    return () => {
      authSubscription.unsubscribe()
    }
  }, [supabase, queryClient])

  return {
    profile: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  }
}
