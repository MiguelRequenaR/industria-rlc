"use server"

import { createClient } from "@/lib/supabase/server"
import { Invitation, UserRole } from "@/types/database"
import { nanoid } from "nanoid"

export async function createInvitation(role: UserRole): Promise<{ success: boolean; token?: string; error?: string }> {
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

  const token = nanoid(12)

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      token,
      role,
      is_used: false,
      created_by: user.id,
      course_id: null
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating invitation:", error)
    return { success: false, error: error.message }
  }

  return { success: true, token }
}

export async function getAllInvitations(): Promise<Invitation[]> {
  const supabase = await createClient()

  const { data: invitations, error } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching invitations:", error)
    return []
  }

  return invitations || []
}

export async function deleteInvitation(invitationId: string): Promise<{ success: boolean; error?: string }> {
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
    .from("invitations")
    .delete()
    .eq("id", invitationId)

  if (error) {
    console.error("Error deleting invitation:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
