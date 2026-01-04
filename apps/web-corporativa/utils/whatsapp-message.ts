import { servicesData } from '@/lib/services-data'

export interface FormData {
  nombre: string
  email: string
  empresa: string
  ruc: string
  servicio: string
  telefono: string
  mensaje: string
}

const WHATSAPP_NUMBER = '51940162009'

function getServiceName(serviceId: string): string {
  if (!serviceId) return 'No especificado'
  
  for (const service of servicesData) {
    const subService = service.subServices.find(sub => sub.id === serviceId)
    if (subService) {
      return `${service.title} - ${subService.title}`
    }
  }
  return 'No especificado'
}

export function formatWhatsAppMessage(data: FormData): string {
  const serviceName = getServiceName(data.servicio)
  
  let message = '*Solicitud de Cotización - Industria RLC*\n\n'
  message += '*Información del Cliente*\n'
  message += `Nombre: ${data.nombre}\n`
  message += `Email: ${data.email}\n`
  message += `Teléfono: ${data.telefono}\n`
  
  if (data.empresa) {
    message += `Empresa: ${data.empresa}\n`
  }
  
  if (data.ruc) {
    message += `RUC: ${data.ruc}\n`
  }
  
  message += `\n*Servicio de Interés*\n`
  message += `${serviceName}\n`
  
  message += `\n*Mensaje*\n`
  message += `${data.mensaje}\n`
  
  message += `\n─────────────────\n`
  message += `_Este mensaje fue enviado desde el formulario de contacto de Industria RLC_`
  
  return message
}

export function generateWhatsAppUrl(data: FormData): string {
  const message = formatWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function sendWhatsAppMessage(data: FormData): void {
  const url = generateWhatsAppUrl(data)
  window.open(url, '_blank')
}

// Tipos e interfaces para Libro de Reclamaciones
export interface ReclamacionFormData {
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

export function formatReclamacionWhatsAppMessage(data: ReclamacionFormData): string {
  const tipoTexto = data.tipoReclamacion === 'reclamo' ? 'RECLAMO' : 'QUEJA'
  const bienTexto = data.tipoBien === 'producto' ? 'Producto' : 'Servicio'
  
  let message = `*LIBRO DE RECLAMACIONES - Industria RLC*\n\n`
  message += `*TIPO: ${tipoTexto}*\n\n`
  
  message += `*DATOS DEL CLIENTE*\n`
  message += `Nombre: ${data.nombre}\n`
  message += `DNI: ${data.dni}\n`
  message += `Teléfono: ${data.telefono}\n`
  message += `Email: ${data.email}\n`
  message += `Dirección: ${data.direccion}\n`
  message += `Ubicación: ${data.distrito}, ${data.provincia}, ${data.departamento}\n`
  
  message += `\n*BIEN CONTRATADO*\n`
  message += `Tipo: ${bienTexto}\n`
  
  if (data.montoReclamado) {
    message += `Monto Reclamado: ${data.montoReclamado}\n`
  }
  
  message += `Descripción: ${data.descripcionBien}\n`
  
  message += `\n*DETALLE DE LA RECLAMACIÓN*\n`
  message += `${data.detalleReclamacion}\n`
  
  message += `\n*PEDIDO DEL CONSUMIDOR*\n`
  message += `${data.pedidoReclamacion}\n`
  
  message += `\n${'─'.repeat(30)}\n`
  message += `_Reclamación registrada según el Código de Protección y Defensa del Consumidor_\n`
  message += `_Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}_`
  
  return message
}

export function generateReclamacionWhatsAppUrl(data: ReclamacionFormData): string {
  const message = formatReclamacionWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function sendReclamacionWhatsAppMessage(data: ReclamacionFormData): void {
  const url = generateReclamacionWhatsAppUrl(data)
  window.open(url, '_blank')
}

