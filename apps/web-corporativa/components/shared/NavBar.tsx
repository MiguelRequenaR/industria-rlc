"use client"
import { useState } from "react"
import { Menu, X, Mail, Phone} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      label: "Inicio",
      link: "/",
    },
    {
      label: "Nosotros",
      link: "/nosotros",
    },
    {
      label: "Servicios",
      link: "/servicios",
    },
    {
      label: "Experiencia",
      link: "/experiencia"
    },
    {
      label: "Academia",
      link: "/academia",
    }
  ];

  return (
    <header className="bg-primary relative">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto flex flex-col justify-between items-center py-5 px-4 md:px-0">
        <div className="flex items-center justify-between gap-4 w-full md:w-auto md:justify-start">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/RLCLOGOCORP.png" alt="Logo de Industria RLC - Servicios Eléctricos Integrales" width={64} height={64} />
              <span className="text-2xl font-bold text-white uppercase">Industria RLC</span>
            </div>
          </Link>
          
          {/* Botón hamburguesa para móvil */}
          <button
            className="md:hidden flex items-center justify-center text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-7 h-7" />
          </button>

          <div className="hidden md:flex bg-secondary rounded-full items-center">
            <input type="text" placeholder="Buscar..." className="w-100 bg-white h-10 rounded-full border border-white px-4 text-secondary focus:outline-none" />
            <span className="text-white px-4 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+51940162009"
                className="hover:underline flex items-center gap-1"
              >
                (+51) 940 162 009
              </a>
              -
              <Mail className="w-4 h-4" />
              <a
                href="mailto:proyectos@industria-rlc.com"
                className="hover:underline flex items-center gap-1"
              >
                proyectos@industriarlc.com
              </a>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <nav className="hidden md:block">
            <ul className="text-white flex gap-20 font-semibold">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="relative group transition-colors duration-500 cursor-pointer hover:text-secondary uppercase"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block ml-20">
            <Link href="/contacto">
              <button
                className="relative overflow-hidden bg-primary text-white px-5 py-2 uppercase cursor-pointer border border-white group transition-colors duration-500 rounded-full"
              >
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
                  Cotizar Servicio
                </span>
              </button>
            </Link>
          </div>
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
        <nav className="flex-1 flex flex-col items-center justify-center">
          <ul className="flex flex-col gap-8 text-white text-2xl font-semibold">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className="relative group cursor-pointer transition-colors duration-300 hover:text-secondary uppercase"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
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
        <div className="flex justify-center pb-8 px-5">
          <Link href="/contacto" onClick={() => setMenuOpen(false)}>
            <button
              className="relative overflow-hidden bg-secondary px-8 py-3 uppercase cursor-pointer border border-secondary group transition-colors duration-500 hover:text-white text-base rounded-full"
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
                Cotizar Servicio
              </span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
