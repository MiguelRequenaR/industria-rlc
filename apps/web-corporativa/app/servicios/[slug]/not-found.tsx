import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Servicio no encontrado
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, el servicio que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a Servicios
        </Link>
      </div>
    </main>
  );
}

