"use server"

import { createClient, createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface UpdateProfileData {
  full_name: string | null
  avatar_url: string | null
  cargo: string | null
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
        cargo: data.cargo,
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

export async function changeUserPasswordAction(
  userId: string,
  newPassword: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { error: "No estás autenticado" }
    }

    // Verificar que el usuario actual es admin
    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError || currentProfile.role !== "admin") {
      return { error: "Solo los administradores pueden cambiar contraseñas" }
    }

    // Validar contraseña
    if (newPassword.length < 6) {
      return { error: "La contraseña debe tener al menos 6 caracteres" }
    }

    // Usar el cliente admin para cambiar la contraseña
    const adminClient = createAdminClient()
    const { error: updateError } = await adminClient.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    )

    if (updateError) {
      console.error("Error updating password:", updateError)
      return { error: "Error al cambiar la contraseña: " + updateError.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in changeUserPasswordAction:", error)
    return { error: "Error inesperado al cambiar la contraseña" }
  }
}
