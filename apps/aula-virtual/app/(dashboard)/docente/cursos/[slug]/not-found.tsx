import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Curso no encontrado</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        El curso que buscas no existe o no tienes permisos para verlo.
      </p>
      <Link
        href="/docente/cursos"
        className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
      >
        Volver a Mis Cursos
      </Link>
    </div>
  )
}
