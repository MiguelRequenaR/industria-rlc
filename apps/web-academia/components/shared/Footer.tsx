"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { sendNewsletterWhatsAppMessage } from '@/utils/whatsapp-message-academy';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      alert('Por favor, ingresa tu email');
      return;
    }

    sendNewsletterWhatsAppMessage({ email });
    
    setEmail('');
    
    alert('¡Gracias por suscribirte! Te contactaremos pronto.');
  };

  return (
    <footer className='bg-[#0B2838] text-white'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          <div>
            <h3 className='text-2xl font-bold mb-4'>
              RLC <span className='text-secondary'>Academy</span> 360
            </h3>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Formación técnica de excelencia para el mundo real. Tu futuro comienza aquí.
            </p>
          </div>

          <div>
            <h4 className='text-lg font-bold mb-4'>Enlaces Rápidos</h4>
            <ul>
              <li>
                <Link href='/' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href='/cursos' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Cursos
                </Link>
              </li>
              <li>
                <Link href='/nosotros' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href='/blog' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/contacto' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-bold mb-4'>Soporte</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/libro-reclamaciones' className='text-gray-300 hover:text-secondary transition-colors text-sm'>       
                  Libro de Reclamaciones
                </Link>
              </li>
              <li>
                <Link href='/terminos' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href='/privacidad' className='text-gray-300 hover:text-secondary transition-colors text-sm'>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-bold mb-4'>Boletín</h4>
            <p className='text-gray-300 text-sm mb-4'>
              Recibe novedades y ofertas especiales.
            </p>
            <form onSubmit={handleSubmit} className='flex'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Tu Email'
                className='flex-1 px-4 py-2 rounded-l-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary text-sm'
                required
              />
              <button
                type='submit'
                className='bg-secondary hover:bg-[#FFB300] text-primary px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center cursor-pointer'
                aria-label='Enviar'
              >
                <Send className='w-4 h-4' />
                <span className='ml-2 text-sm font-semibold'>Enviar</span>
              </button>
            </form>
          </div>
        </div>

        <div className='border-t-2 border-white my-6'></div>

        <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-300'>
          <p>
            © 2026 RLC Academy 360°. Todos los derechos reservados.
          </p>
          <p>
            Desarrollado por <Link href='https://groblestudio.com/' target='_blank' className='text-secondary hover:underline font-semibold'>Grobles Studio</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
