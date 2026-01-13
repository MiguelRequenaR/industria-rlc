"use server"

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database";

export type UserWithEmail = Profile & {
  email: string;
};

export async function getUsersAction(): Promise<{ users?: UserWithEmail[], error?: string }> {
  try {
    const supabase = await createClient();
    
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      return { error: "No autenticado" };
    }

    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentUser.id)
      .single();

    if (currentProfile?.role !== "admin") {
      return { error: "No tienes permisos para ver los usuarios" };
    }

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      return { error: profilesError.message };
    }

    const usersWithEmail: UserWithEmail[] = profiles.map(profile => ({
      ...profile,
      email: "No disponible"
    }));

    return { users: usersWithEmail };
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return { error: "Error al obtener los usuarios" };
  }
}

export async function deleteUserAction(userId: string): Promise<{ success?: boolean, error?: string }> {
  try {
    const supabase = await createClient();
    
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      return { error: "No autenticado" };
    }

    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentUser.id)
      .single();

    if (currentProfile?.role !== "admin") {
      return { error: "No tienes permisos para eliminar usuarios" };
    }

    if (userId === currentUser.id) {
      return { error: "No puedes eliminarte a ti mismo" };
    }

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return { error: "Error al eliminar el usuario" };
  }
}
