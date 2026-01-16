"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, GraduationCap, Users, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuickAccessBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col">
      {/* Botón de apertura para móvil cuando está cerrado */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden bg-secondary hover:bg-[#e5ad00] transition-all duration-300 w-12 h-12 flex items-center justify-center shadow-lg rounded-l-lg"
          aria-label="Abrir menú rápido"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
      )}

      {/* Contenedor del menú con transición suave */}
      <div
        className={`
          flex flex-col shadow-lg
          transition-all duration-500 ease-in-out
          lg:translate-x-0 lg:opacity-100 lg:flex
          ${isOpen ? 'translate-x-0 opacity-100 flex' : 'translate-x-full opacity-0 hidden'}
        `}
      >
        {/* Botón de flecha para móvil - en la parte superior del menú */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden bg-secondary hover:bg-[#e5ad00] transition-all duration-300 w-20 h-12 flex items-center justify-center border-b-2 border-white"
          aria-label="Cerrar menú rápido"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>

        {/* Ubicanos */}
        <Link
          href="https://www.google.com/maps/@-12.0686083,-75.2100758,18.84z?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="bg-secondary hover:bg-[#e5ad00] transition-colors duration-300 w-20 h-24 flex flex-col items-center justify-center gap-2 border-b-2 border-white group"
        >
          <MapPin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-primary text-center leading-tight">
            Ubicanos
          </span>
        </Link>

        {/* Alumnos */}
        <Link
          href="https://aula.industriarlc.com/login"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="bg-secondary hover:bg-[#e5ad00] transition-colors duration-300 w-20 h-24 flex flex-col items-center justify-center gap-2 border-b-2 border-white group"
        >
          <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-primary text-center leading-tight">
            Alumnos
          </span>
        </Link>

        {/* Docentes */}
        <Link
          href="https://aula.industriarlc.com/login"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="bg-secondary hover:bg-[#e5ad00] transition-colors duration-300 w-20 h-24 flex flex-col items-center justify-center gap-2 group"
        >
          <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-semibold text-primary text-center leading-tight">
            Docentes
          </span>
        </Link>
      </div>
    </div>
  );
}
