"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface UpdateProfileData {
  full_name: string | null
  avatar_url: string | null
}

export async function updateProfileAction(
  profileId: string,
  data: UpdateProfileData
) {
  try {
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { error: "No estás autenticado" }
    }

    // Verificar permisos (el usuario debe ser el dueño o admin)
    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return { error: "Error al verificar permisos" }
    }

    // Solo puede editar su propio perfil o un admin puede editar cualquiera
    if (user.id !== profileId && currentProfile.role !== "admin") {
      return { error: "No tienes permisos para editar este perfil" }
    }

    // Actualizar perfil
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        avatar_url: data.avatar_url,
      })
      .eq("id", profileId)

    if (updateError) {
      console.error("Error updating profile:", updateError)
      return { error: "Error al actualizar el perfil: " + updateError.message }
    }

    // Revalidar las rutas necesarias
    revalidatePath("/perfil")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error in updateProfileAction:", error)
    return { error: "Error inesperado al actualizar el perfil" }
  }
}
