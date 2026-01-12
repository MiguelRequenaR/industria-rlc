"use client"

import { useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Eye, EyeOff } from "lucide-react"
import { loginAction } from "@/actions/auth-actions"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Input,
  Label
} from "@repo/ui"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors cursor-pointer uppercase"
      disabled={pending}
    >
      {pending ? "Iniciando sesión..." : "Iniciar sesión"}
    </Button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 p-4">
      <Card className="w-full max-w-lg py-20 px-10 rounded-2xl shadow-2xl border-primary/10 border-2 bg-white">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-3xl font-bold text-center text-primary uppercase tracking-tight">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-center text-secondary text-lg font-medium">
            Ingresa tus credenciales para acceder al aula virtual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6 pt-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-primary uppercase">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border-secondary text-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-primary uppercase">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full border-secondary text-secondary rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-secondary/80 transition-colors"
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
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30">
                <p className="text-sm text-destructive font-semibold text-center">
                  {state.error}
                </p>
              </div>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
