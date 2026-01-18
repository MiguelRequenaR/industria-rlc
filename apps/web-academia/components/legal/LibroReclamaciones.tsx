"use client";

import React, { useState, FormEvent } from 'react';
import { FileText, User, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { sendLibroReclamacionesWhatsAppMessage } from '@/utils/whatsapp-message-academy';

export default function LibroReclamaciones() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoReclamo: 'queja',
    detalleReclamo: '',
    pedido: '',
    aceptaTerminos: false
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    if (formData.detalleReclamo.length < 20) {
      alert('El detalle del reclamo debe tener al menos 20 caracteres');
      return;
    }

    sendLibroReclamacionesWhatsAppMessage({
      tipoDocumento: formData.tipoDocumento,
      numeroDocumento: formData.numeroDocumento,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      tipoReclamo: formData.tipoReclamo,
      detalleReclamo: formData.detalleReclamo,
      pedido: formData.pedido
    });
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        direccion: '',
        tipoReclamo: 'queja',
        detalleReclamo: '',
        pedido: '',
        aceptaTerminos: false
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-gray-50 to-white py-25'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-4'>
            <div className='bg-primary p-4 rounded-full'>
              <FileText className='w-12 h-12 text-white' />
            </div>
          </div>
          <h1 className='text-4xl font-bold text-primary mb-4'>
            Libro de Reclamaciones
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            En RLC Academy valoramos tu opinión. Este formulario te permite registrar tus quejas o reclamos de manera formal conforme a la normativa peruana.
          </p>
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='w-6 h-6 text-blue-600 shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold text-blue-900 mb-2'>Información Importante</h3>
              <ul className='text-sm text-blue-800 space-y-1'>
                <li>• <strong>Queja:</strong> Disconformidad no relacionada con el servicio contratado.</li>
                <li>• <strong>Reclamo:</strong> Disconformidad relacionada con el servicio contratado.</li>
                <li>• Recibirás una respuesta en un plazo máximo de 30 días hábiles.</li>
                <li>• La presentación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante INDECOPI.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <h2 className='text-2xl font-bold text-primary mb-6 flex items-center gap-2'>
                <User className='w-6 h-6' />
                Datos del Consumidor
              </h2>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Tipo de Documento *
                  </label>
                  <select
                    name='tipoDocumento'
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  >
                    <option value='DNI'>DNI</option>
                    <option value='CE'>Carnet de Extranjería</option>
                    <option value='Pasaporte'>Pasaporte</option>
                    <option value='RUC'>RUC</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Número de Documento *
                  </label>
                  <input
                    type='text'
                    name='numeroDocumento'
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Nombres *
                  </label>
                  <input
                    type='text'
                    name='nombres'
                    value={formData.nombres}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Apellidos *
                  </label>
                  <input
                    type='text'
                    name='apellidos'
                    value={formData.apellidos}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <Mail className='w-4 h-4 inline mr-1' />
                    Email *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <Phone className='w-4 h-4 inline mr-1' />
                    Teléfono *
                  </label>
                  <input
                    type='tel'
                    name='telefono'
                    value={formData.telefono}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>
              </div>

              <div className='mt-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Dirección *
                </label>
                <input
                  type='text'
                  name='direccion'
                  value={formData.direccion}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
            </div>

            <div className='pt-6 border-t border-gray-200'>
              <h2 className='text-2xl font-bold text-primary mb-6'>
                Detalles del Reclamo
              </h2>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Tipo *
                  </label>
                  <div className='flex gap-6'>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='tipoReclamo'
                        value='queja'
                        checked={formData.tipoReclamo === 'queja'}
                        onChange={handleChange}
                        className='mr-2'
                      />
                      <span className='text-gray-700'>Queja</span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='tipoReclamo'
                        value='reclamo'
                        checked={formData.tipoReclamo === 'reclamo'}
                        onChange={handleChange}
                        className='mr-2'
                      />
                      <span className='text-gray-700'>Reclamo</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Número de Pedido / Matrícula (opcional)
                  </label>
                  <input
                    type='text'
                    name='pedido'
                    value={formData.pedido}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    placeholder='Ej: MAT-2026-001'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Detalle de tu Queja o Reclamo *
                  </label>
                  <textarea
                    name='detalleReclamo'
                    value={formData.detalleReclamo}
                    onChange={handleChange}
                    rows={6}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
                    placeholder='Describe detalladamente tu queja o reclamo...'
                    required
                  />
                  <p className='text-sm text-gray-500 mt-2'>
                    Mínimo 20 caracteres. Sé lo más específico posible.
                  </p>
                </div>

                <div className='flex items-start gap-3'>
                  <input
                    type='checkbox'
                    name='aceptaTerminos'
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    className='mt-1'
                    id='terminos'
                  />
                  <label htmlFor='terminos' className='text-sm text-gray-700'>
                    Acepto que mis datos sean tratados de acuerdo a la{' '}
                    <a href='/privacidad' className='text-primary hover:underline font-semibold'>
                      Política de Privacidad
                    </a>{' '}
                    y autorizo su uso para dar seguimiento a mi reclamo. *
                  </label>
                </div>
              </div>
            </div>

            <div className='pt-6'>
              <button
                type='submit'
                className='w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer'
              >
                <FileText className='w-5 h-5' />
                Enviar Reclamo
              </button>

              {isSubmitted && (
                <div className='mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 px-4 rounded-lg border border-green-200 animate-in fade-in slide-in-from-top-2 duration-300'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-sm font-medium'>¡Reclamo enviado exitosamente! Recibirás respuesta en un plazo máximo de 30 días hábiles.</span>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className='mt-8 bg-gray-50 rounded-lg p-6 text-center'>
          <p className='text-gray-700'>
            <strong>RLC Academy 360°</strong>
          </p>
          <p className='text-gray-600 text-sm mt-2'>
            Para consultas adicionales, contáctanos a través de nuestra{' '}
            <a href='/contacto' className='text-primary hover:underline font-semibold'>
              página de contacto
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
