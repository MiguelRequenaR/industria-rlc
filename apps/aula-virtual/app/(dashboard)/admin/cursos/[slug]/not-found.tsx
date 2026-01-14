import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Curso no encontrado</h1>
          <p className="text-gray-500">
            El curso que buscas no existe o ha sido eliminado
          </p>
        </div>

        <Link
          href="/admin/cursos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Cursos
        </Link>
      </div>
    </div>
  )
}
