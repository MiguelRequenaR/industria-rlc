"use server"

import { createClient } from "@/lib/supabase/server"
import { Profile, UserRole } from "@/types/database"

export interface UserWithEmail extends Profile {
  email: string
}

export async function getAllUsers(): Promise<UserWithEmail[]> {
  const supabase = await createClient()

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (profilesError) {
    console.error("Error fetching profiles:", profilesError)
    return []
  }

  if (!profiles || profiles.length === 0) {
    return []
  }

  return profiles as UserWithEmail[]
}

export async function updateUser(
  userId: string,
  updates: { full_name?: string; role?: UserRole }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)

  if (error) {
    console.error("Error updating user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) {
    console.error("Error archiving user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function activateUser(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "No autenticado" }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    return { success: false, error: "No tienes permisos para realizar esta acción" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ deleted_at: null })
    .eq("id", userId)

  if (error) {
    console.error("Error activating user:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
