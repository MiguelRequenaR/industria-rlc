'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Clock, Send, Book } from 'lucide-react'

export default function Footer() {
  const [mensaje, setMensaje] = useState('')

  const handleEnviarWhatsApp = () => {
    if (mensaje.trim()) {
      const numeroWhatsApp = '+51940162009'
      const textoMensaje = encodeURIComponent(`Sugerencia/Denuncia: ${mensaje}`)
      window.open(`https://wa.me/${numeroWhatsApp}?text=${textoMensaje}`, '_blank')
      setMensaje('')
    }
  }

  const enlaces = [
    { nombre: 'Inicio', url: '/' },
    { nombre: 'Nosotros', url: '/nosotros' },
    { nombre: 'Servicios', url: '/servicios' },
    { nombre: 'Experiencia', url: '/experiencia' },
    { nombre: 'Contacto', url: '/contacto' },
  ]

  const redesSociales = [
    { nombre: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { nombre: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { nombre: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { nombre: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  ]

  return (
    <footer className="bg-primary text-white py-12 md:py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6" data-aos="fade-down">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Columna 1: Logo y Nombre */}
          <div className="flex flex-col items-center md:items-start md:text-left">
            <div className="mb-4 flex justify-center md:justify-start w-full">
              <Image
                src="/RLCLOGOCORP.png"
                alt="RLC Logo"
                width={120}
                height={120}
                className="w-24 h-24 object-contain mx-auto md:mx-0"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center md:text-left">
              Industria RLC
            </h3>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Soluciones industriales de calidad para tu empresa
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-center md:text-left">Enlaces Rápidos</h4>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              {enlaces.map((enlace, index) => (
                <li key={index}>
                  <Link 
                    href={enlace.url}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {enlace.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Horario, Redes Sociales y Libro de Reclamaciones */}
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Clock size={20} />
                Horario de Atención
              </h4>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Lunes a Viernes: 8:00 AM - 6:00 PM
              </p>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Sábados: 9:00 AM - 1:00 PM
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 text-center md:text-left">Síguenos</h4>
              <div className="flex gap-3 justify-center md:justify-start">
                {redesSociales.map((red, index) => {
                  const Icon = red.icon
                  return (
                    <a
                      key={index}
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                      aria-label={red.nombre}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                href="/libro-reclamaciones"
                className="inline-block bg-transparent text-white px-4 py-2 rounded-full border border-white cursor-pointer overflow-hidden relative group items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  <Book size={18} />
                  Libro de Reclamaciones
                </span>
              </Link>
            </div>
          </div>

          {/* Columna 4: Sugerencias o Denuncias */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-center md:text-left">Sugerencias o Denuncias</h4>
            <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
              Envíanos tus comentarios o denuncias de forma confidencial
            </p>
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all duration-200 resize-none"
                rows={4}
              />
              <button
                onClick={handleEnviarWhatsApp}
                disabled={!mensaje.trim()}
                className="w-full bg-transparent text-white px-4 py-2.5 rounded-full border border-white cursor-pointer overflow-hidden relative group flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  <Send size={18} />
                  Enviar por WhatsApp
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Industria RLC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
