"use server"

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({message: "Email inválido"}),
  password: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres"}),
});

const registerSchema = z.object({
  email: z.string().email({message: "Email inválido"}),
  password: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres"}),
  fullName: z.string().min(2, {message: "El nombre completo debe tener al menos 2 caracteres"}),
  inviteToken: z.string().min(1, {message: "El código de invitación es requerido"}),
});

type FormState = {
  error?: string;
} | undefined;

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Error de validación" }
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const message =
      error.message === "Invalid login credentials"
        ? "Email o contraseña incorrectos"
        : error.message
    return { error: message }
  }

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Error de validación" }
  }

  const { email, password, fullName, inviteToken } = parsed.data;

  const supabase = await createClient();

  const { data: invitation, error: invitationError } = await supabase
    .from("invitations")
    .select("*")
    .eq("token", inviteToken)
    .eq("is_used", false)
    .single();

  if (invitationError || !invitation) {
    return { error: "Código de invitación inválido o ya utilizado" }
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        invite_token: inviteToken,
      }
    }
  });

  if (signUpError) {
    return { error: signUpError.message }
  }
  redirect("/login?registered=true");
}