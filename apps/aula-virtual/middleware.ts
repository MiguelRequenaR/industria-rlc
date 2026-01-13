import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Primero actualizar la sesión de Supabase
  const response = await updateSession(request);
  
  // Si hay una redirección, retornarla inmediatamente
  if (response.status === 307 || response.status === 308) {
    return response;
  }

  const path = request.nextUrl.pathname;
  const userRole = request.cookies.get('user_role')?.value;

  // Proteger rutas según rol
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  if (path.startsWith('/docente') && userRole !== 'docente' && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (path.startsWith('/estudiante') && userRole !== 'estudiante' && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}