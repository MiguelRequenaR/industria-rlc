import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-secondary">404</h1>
          <h2 className="text-4xl font-bold text-white">Artículo No Encontrado</h2>
          <p className="text-white/80 text-lg">
            Lo sentimos, el artículo que buscas no existe o ha sido removido de nuestro blog.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 transition-colors duration-300 text-primary rounded-xl px-8 py-4 font-bold text-lg"
          >
            <BookOpen className="w-5 h-5" />
            Ver Todos los Artículos
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300 text-white rounded-xl px-8 py-4 font-bold text-lg border-2 border-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
