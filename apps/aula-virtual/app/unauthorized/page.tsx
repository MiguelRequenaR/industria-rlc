import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <ShieldAlert className="h-24 w-24 text-red-600" />
        </div>
        
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-primary">
          Acceso No Autorizado
        </h1>
        
        <p className="mb-8 text-primary">
          No tienes permisos para acceder a esta página. Si crees que esto es un error, 
          por favor contacta con el administrador.
        </p>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
