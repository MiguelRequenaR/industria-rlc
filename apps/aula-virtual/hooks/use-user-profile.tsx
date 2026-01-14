"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type UserRole = "admin" | "docente" | "estudiante"

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  email: string
  created_at: string
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          setError("No hay usuario autenticado")
          setLoading(false)
          return
        }

        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) {
          setError(profileError.message)
          setLoading(false)
          return
        }

        // Agregar el email del usuario de auth
        setProfile({
          ...data,
          email: user.email || "",
        })
        setError(null)
      } catch (err) {
        setError("Error al cargar el perfil")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadProfile()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { profile, loading, error }
}
