"use server"

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({message: "Email inválido"}),
  password: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres"}),
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
    return { error: error.message }
  }

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}