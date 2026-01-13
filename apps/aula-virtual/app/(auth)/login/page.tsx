"use client"

import { useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Eye, EyeOff } from "lucide-react"
import { loginAction } from "@/actions/auth-actions"

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

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-blue-100 py-20 px-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2" style={{ color: 'var(--primary)' }}>
            Bienvenido
          </h1>
          <p className="text-lg font-medium" style={{ color: 'var(--secondary)' }}>
            Ingresa tus credenciales para acceder al aula virtual
          </p>
        </div>
        
        <form action={formAction} className="space-y-6">
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
              <p className="text-sm text-red-600 font-semibold text-center">
                {state.error}
              </p>
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
