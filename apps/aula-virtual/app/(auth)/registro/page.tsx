"use client"

import { useState, useEffect, Suspense } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Key } from "lucide-react"
import { registerAction } from "@/actions/auth-actions"
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
      {pending ? "Registrando..." : "Registrarse"}
    </button>
  )
}

function RegistroForm() {
  const [state, formAction] = useActionState(registerAction, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get("token") || ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-blue-100 py-12 px-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--primary)' }}>
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2" style={{ color: 'var(--primary)' }}>
            Crear Cuenta
          </h1>
          <p className="text-lg font-medium" style={{ color: 'var(--secondary)' }}>
            Completa el formulario para unirte al aula virtual
          </p>
        </div>
        
        <form action={formAction} className="space-y-5">
          {/* Nombre Completo */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--secondary)' }} />
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Juan Pérez"
                required
                autoComplete="name"
                className="w-full border-2 rounded-md pl-11 pr-3 py-2 focus:outline-none focus:ring-2 transition font-medium"
                style={{
                  borderColor: 'var(--secondary)',
                  color: 'var(--secondary)'
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--secondary)' }} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border-2 rounded-md pl-11 pr-3 py-2 focus:outline-none focus:ring-2 transition font-medium"
                style={{
                  borderColor: 'var(--secondary)',
                  color: 'var(--secondary)'
                }}
              />
            </div>
          </div>
          
          {/* Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--secondary)' }} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="w-full border-2 rounded-md pl-11 pr-11 py-2 focus:outline-none focus:ring-2 transition font-medium"
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
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
          </div>

          {/* Código de Invitación */}
          <div className="space-y-2">
            <label htmlFor="inviteToken" className="text-sm font-semibold uppercase block" style={{ color: 'var(--primary)' }}>
              Código de Invitación
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--secondary)' }} />
              <input
                id="inviteToken"
                name="inviteToken"
                type="text"
                placeholder="Ingresa tu código de invitación"
                required
                defaultValue={tokenFromUrl}
                className="w-full border-2 rounded-md pl-11 pr-3 py-2 focus:outline-none focus:ring-2 transition font-mono font-semibold"
                style={{
                  borderColor: 'var(--secondary)',
                  color: 'var(--secondary)'
                }}
              />
            </div>
            {tokenFromUrl && (
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Código detectado automáticamente
              </p>
            )}
          </div>

          {state?.error && (
            <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200">
              <p className="text-sm text-red-600 font-semibold text-center">
                {state.error}
              </p>
            </div>
          )}

          <SubmitButton />

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link 
                href="/login" 
                className="font-semibold hover:underline transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--primary)' }}>
              ℹ️ ¿Necesitas un código de invitación?
            </h3>
            <p className="text-xs text-gray-600">
              Contacta con el administrador del sistema para obtener un código de invitación válido. 
              El código determina tu rol en la plataforma (estudiante, docente o administrador).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RegistroPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-blue-100 py-12 px-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--primary)' }}>
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--secondary)' }}>
              Cargando...
            </p>
          </div>
        </div>
      </div>
    }>
      <RegistroForm />
    </Suspense>
  )
}
