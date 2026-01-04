'use client'

import { useState } from 'react'
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react'
import { sendReclamacionWhatsAppMessage } from '@/utils/whatsapp-message'

interface ReclamacionFormData {
  nombre: string
  email: string
  telefono: string
  dni: string
  
  tipoReclamacion: 'reclamo' | 'queja' | ''
  tipoBien: 'producto' | 'servicio' | ''
  montoReclamado: string
  descripcionBien: string
  
  detalleReclamacion: string
  pedidoReclamacion: string
  
  direccion: string
  departamento: string
  provincia: string
  distrito: string
}

export default function LibroReclamacionesPage() {
  const [formData, setFormData] = useState<ReclamacionFormData>({
    nombre: '',
    email: '',
    telefono: '',
    dni: '',
    tipoReclamacion: '',
    tipoBien: '',
    montoReclamado: '',
    descripcionBien: '',
    detalleReclamacion: '',
    pedidoReclamacion: '',
    direccion: '',
    departamento: '',
    provincia: '',
    distrito: ''
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
      sendReclamacionWhatsAppMessage(formData)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitStatus('success')
      
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        dni: '',
        tipoReclamacion: '',
        tipoBien: '',
        montoReclamado: '',
        descripcionBien: '',
        detalleReclamacion: '',
        pedidoReclamacion: '',
        direccion: '',
        departamento: '',
        provincia: '',
        distrito: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10" data-aos="fade-up">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Formulario de Reclamaciones
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Importante:</p>
                <p><strong>Reclamo:</strong> Disconformidad relacionada a los productos o servicios.</p>
                <p><strong>Queja:</strong> Disconformidad no relacionada a los productos o servicios, o malestar sobre la atención al público.</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos del Cliente */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              1. Datos del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
                  DNI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  maxLength={8}
                  pattern="[0-9]{8}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="12345678"
                />
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

              <div className="md:col-span-2">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Av. Ejemplo 123"
                />
              </div>

              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Lima"
                />
              </div>

              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-2">
                  Provincia <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Lima"
                />
              </div>

              <div>
                <label htmlFor="distrito" className="block text-sm font-medium text-gray-700 mb-2">
                  Distrito <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="distrito"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Miraflores"
                />
              </div>
            </div>
          </div>

          {/* Identificación del Bien Contratado */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              2. Identificación del Bien Contratado
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="tipoReclamacion" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tipoReclamacion"
                    name="tipoReclamacion"
                    value={formData.tipoReclamacion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="queja">Queja</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tipoBien" className="block text-sm font-medium text-gray-700 mb-2">
                    Bien contratado <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tipoBien"
                    name="tipoBien"
                    value={formData.tipoBien}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="producto">Producto</option>
                    <option value="servicio">Servicio</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="montoReclamado" className="block text-sm font-medium text-gray-700 mb-2">
                  Monto reclamado
                </label>
                <input
                  type="text"
                  id="montoReclamado"
                  name="montoReclamado"
                  value={formData.montoReclamado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="S/ 0.00"
                />
              </div>

              <div>
                <label htmlFor="descripcionBien" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del producto o servicio <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descripcionBien"
                  name="descripcionBien"
                  value={formData.descripcionBien}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe el producto o servicio contratado..."
                />
              </div>
            </div>
          </div>

          {/* Detalle de la Reclamación */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
              3. Detalle de la Reclamación
            </h3>
            <div className="space-y-5">
              <div>
                <label htmlFor="detalleReclamacion" className="block text-sm font-medium text-gray-700 mb-2">
                  Detalle del reclamo o queja <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="detalleReclamacion"
                  name="detalleReclamacion"
                  value={formData.detalleReclamacion}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe detalladamente tu reclamo o queja..."
                />
              </div>

              <div>
                <label htmlFor="pedidoReclamacion" className="block text-sm font-medium text-gray-700 mb-2">
                  Pedido del consumidor <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pedidoReclamacion"
                  name="pedidoReclamacion"
                  value={formData.pedidoReclamacion}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="¿Qué solución o acción esperas de parte de Industria RLC?"
                />
              </div>
            </div>
          </div>

          {/* Mensajes de estado */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-start gap-3">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">¡Reclamación enviada exitosamente!</p>
                <p>Hemos recibido tu reclamación. Nos comunicaremos contigo en un plazo máximo de 15 días hábiles.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Error al enviar</p>
                <p>Hubo un error al enviar tu reclamación. Por favor, intenta nuevamente.</p>
              </div>
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full overflow-hidden bg-primary text-white px-6 py-4 rounded-full cursor-pointer group transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Enviar Reclamación
                </>
              )}
            </span>
          </button>

          {/* Nota legal */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            <p>
              La formulación de la reclamación no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
            </p>
            <p className="mt-2">
              El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
