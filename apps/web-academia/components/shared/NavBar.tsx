"use client"
import { useState } from "react"
import { Menu, X, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
//import Image from "next/image"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: "Inicio",
      link: "/",
    },
    {
      label: "Cursos",
      link: "/cursos",
    },
    {
      label: "Nosotros",
      link: "/nosotros",
    },
    {
      label: "Blog",
      link: "/blog"
    },
  ];

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto md:py-5 px-4 md:px-0">
        <div className="hidden md:grid md:grid-cols-3 items-center">
          {/* Logo - Izquierda */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center gap-2">
                {/* <Image 
                  src="/logoPNG.png" 
                  alt="Logo de Industria RLC - Servicios Eléctricos Integrales" 
                  width={80} 
                  height={80}
                  loading="lazy"
                /> */}
                <h1 className="text-tertiary">
                  RLC <span className="text-secondary">Academy</span> 360
                </h1>
              </div>
            </Link>
          </div>
          
          {/* Enlaces - Centro */}
          <nav className="flex justify-center">
            <ul className="text-tertiary flex flex-row gap-8">
              {links.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      className={`relative group transition-colors duration-500 cursor-pointer hover:text-secondary ${isActive ? 'text-secondary' : ''}`}
                    >
                      {item.label}
                      <span className={`absolute left-0 bottom-0 h-0.5 bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Botones - Derecha */}
          <div className="hidden md:flex items-center justify-end gap-5">
            <Link href="/cursos" className="text-tertiary hover:text-secondary transition-colors duration-300">
              Iniciar Sesión
            </Link>
            <Link href="/contacto" className="relative overflow-hidden bg-primary text-white hover:text-primary px-5 py-2 uppercase cursor-pointer group transition-colors duration-500 rounded-full">
              <span
                className="
                  absolute inset-0 
                  bg-secondary
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out pointer-events-none
                "
              />
              <span
                className="relative z-10 transition-colors duration-500"
              >
                Inscribirse
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="flex md:hidden flex-row justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <h1 className="text-tertiary">
                RLC <span className="text-secondary">Academy</span> 360
              </h1>
            </div>
          </Link>
          <button
            className="flex items-center justify-center text-primary"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile - Overlay */}
      <div
        className={`
          fixed top-0 right-0 w-full h-full bg-primary z-40 flex flex-col transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-5">
          <span className="text-2xl font-bold text-white uppercase">Industria RLC</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white"
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        {/* Mobile nav */}
        <nav className="flex-1 flex flex-col items-center justify-center px-5">

          <ul className="flex flex-col gap-8 text-white text-lg font-semibold">
            {links.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className={`relative group cursor-pointer transition-colors duration-300 hover:text-secondary ${isActive ? 'text-secondary' : ''}`}
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                    <span className={`absolute left-0 bottom-0 h-0.5 bg-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Contact info en móvil */}
          <div className="mt-10 text-white text-sm space-y-3">
            <a
              href="tel:+51940162009"
              className="flex items-center justify-center gap-2 hover:text-secondary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(+51) 940 162 009</span>
            </a>
            <a
              href="mailto:proyectos@industria-rlc.com"
              className="flex items-center justify-center gap-2 hover:text-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>proyectos@industria-rlc.com</span>
            </a>
          </div>
        </nav>
        <div className="flex flex-col gap-4 justify-center pb-8 px-5">
          <Link 
            href="/cursos" 
            onClick={() => setMenuOpen(false)}
            className="text-center text-white hover:text-secondary transition-colors duration-300 text-base font-semibold"
          >
            Iniciar Sesión
          </Link>
          <Link href="/contacto" onClick={() => setMenuOpen(false)}>
            <button
              className="w-full relative overflow-hidden bg-secondary px-8 py-3 uppercase cursor-pointer border border-secondary group transition-colors duration-500 hover:text-white text-base rounded-full"
            >
              <span
                className="
                  absolute inset-0 
                  bg-primary
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out pointer-events-none
                "
              />
              <span
                className="relative z-10 transition-colors duration-500"
              >
                Inscribirse
              </span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
