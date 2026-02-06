"use client"

import { useState, Suspense } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { loginAction } from "@/actions/auth-actions"
import Link from "next/link"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      className="w-full py-3 rounded-md font-semibold uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      style={{
        backgroundColor: 'var(--primary)',
        color: 'white'
      }}
      disabled={pending}
    >
      {pending ? "Iniciando sesión..." : "Iniciar sesión"}
    </button>
  )
}

function LoginForm() {
  const [state, formAction] = useActionState(loginAction, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl py-20 px-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-700 uppercase">
            Bienvenido
          </h1>
          <p className="text-sm font-medium text-secondary uppercase">
            Ingresa tus credenciales para acceder al aula virtual
          </p>
        </div>
        
        <form action={formAction} className="space-y-6">
          {registered && (
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="text-sm font-semibold">
                  ¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              autoComplete="email"
              className="w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition font-bold text-lg"
              style={{
                borderColor: 'var(--secondary)',
                color: 'var(--secondary)'
              }}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full border-2 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 transition"
                style={{
                  borderColor: 'var(--secondary)',
                  color: 'var(--secondary)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--secondary)' }}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {state?.error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 font-semibold text-center uppercase">
                {state.error}
              </p>
            </div>
          )}

          <SubmitButton />

          <div className="text-center pt-4">
            <p className="text-sm text-gray-700 uppercase">
              ¿No tienes una cuenta?{" "}
              <Link 
                href="/registro" 
                className="font-semibold hover:underline transition-colors"
                style={{ color: 'var(--secondary)' }}
              >
                Regístrate aquí.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-blue-100 py-20 px-10">
          <div className="text-center">
            <p className="text-lg font-medium" style={{ color: 'var(--secondary)' }}>
              Cargando...
            </p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
