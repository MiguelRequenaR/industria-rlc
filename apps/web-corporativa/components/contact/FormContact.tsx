'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { servicesData } from '@/lib/services-data'
import { sendWhatsAppMessage } from '@/utils/whatsapp-message'

export default function FormContact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    ruc: '',
    servicio: '',
    telefono: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Enviar mensaje por WhatsApp
      sendWhatsAppMessage(formData)
      
      // Simular un pequeño delay para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitStatus('success')
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        ruc: '',
        servicio: '',
        telefono: '',
        mensaje: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4 md:p-10 shadow-lg rounded-2xl">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Ingresa tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
          Empresa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Nombre de tu empresa"
        />
      </div>

      <div>
        <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-2">
          RUC <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ruc"
          name="ruc"
          value={formData.ruc}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="12345678901"
        />
      </div>

      <div>
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
          Servicio de interés <span className="text-red-500">*</span>
        </label>
        <select
          id="servicio"
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
        >
          <option value="">Selecciona un servicio</option>
          {servicesData.map((service) => (
            <optgroup key={service.id} label={service.title}>
              {service.subServices.map((subService) => (
                <option key={subService.id} value={subService.id}>
                  {subService.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="(+51) 999 999 999"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full overflow-hidden bg-primary text-white px-6 py-3 rounded-full cursor-pointer group transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
        <span className="relative z-10 transition-colors duration-500 uppercase font-semibold flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              Cotizar Servicio
            </>
          )}
        </span>
      </button>
    </form>
  )
}

