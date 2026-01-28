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
            <div className='pt-4'>
              <p>Síguenos en nuestras redes:</p>
              <div className='flex items-center gap-2 pt-2'>
                <a
                  href="https://www.facebook.com/profile.php?id=61586886613195"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de RLC Academy 360"
                >
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2021%2F06%2F15%2F12%2F51%2Ffacebook-6338508_1280.png&f=1&nofb=1&ipt=4f3040e83e629ea57628a2a63207c14be5bd3a3282a7301acd60c3ff6b5236ca" alt="Logo de Facebook de RLC Academy 360" className='w-7 h-7' />
                </a>
                <a
                  href="https://www.tiktok.com/@rlccentrodecapacitacion"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de RLC Academy 360"
                >
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FTikTok-Logo-2016-present.png&f=1&nofb=1&ipt=8fa3d48e081e27f0f9fc9a0d493039834aef3d3d18f11fb5b808704fb13caf0f" alt="Logo de TikTok de RLC Academy 360" className='h-7' />
                </a>
                <a
                  href="https://www.youtube.com/@rlc-centrodecapacitaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube de RLC Academy 360"
                >
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.gXDAsM3eyXW3wlU8IMGrfgHaHa%3Fpid%3DApi&f=1&ipt=ed4bcead4a3d8177f4946392cc7ad1586c3138f83e430ce819866517beb76ef6" alt="Logo de YouTube de RLC Academy 360" className='w-7 h-7 rounded-full' />
                </a>
              </div>
            </div>
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
