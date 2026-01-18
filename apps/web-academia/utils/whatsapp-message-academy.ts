export interface FormContactData {
  nombre: string
  telefono: string
  email: string
  curso: string
  mensaje: string
}

const WHATSAPP_NUMBER = '51940162009'

export function formatWhatsAppMessage(data: FormContactData): string {
  let message = '*Solicitud de Contacto - Academia RLC*\n\n'
  message += '*Información del Estudiante*\n'
  message += `Nombre: ${data.nombre}\n`
  message += `Teléfono: ${data.telefono}\n`
  message += `Email: ${data.email}\n`
  message += `Mensaje: ${data.mensaje}\n`
  message += `\n─────────────────\n`
  message += `_Este mensaje fue enviado desde el formulario de contacto de Academia RLC_`
  return message
}

export function generateWhatsAppUrl(data: FormContactData): string {
  const message = formatWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function sendWhatsAppMessage(data: FormContactData): void {
  const url = generateWhatsAppUrl(data)
  window.open(url, '_blank')
}

export interface NewsletterData {
  email: string
}

export function formatNewsletterWhatsAppMessage(data: NewsletterData): string {
  let message = '*Nueva Suscripción al Boletín - Academia RLC*\n\n'
  message += '*Información del Suscriptor*\n'
  message += `Email: ${data.email}\n`
  message += `Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}\n`
  message += `\n─────────────────\n`
  message += `_Este mensaje fue enviado desde el formulario de suscripción del footer de Academia RLC_`
  return message
}

export function generateNewsletterWhatsAppUrl(data: NewsletterData): string {
  const message = formatNewsletterWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function sendNewsletterWhatsAppMessage(data: NewsletterData): void {
  const url = generateNewsletterWhatsAppUrl(data)
  window.open(url, '_blank')
}

export interface LibroReclamacionesData {
  tipoDocumento: string
  numeroDocumento: string
  nombres: string
  apellidos: string
  email: string
  telefono: string
  direccion: string
  tipoReclamo: string
  detalleReclamo: string
  pedido: string
}

export function formatLibroReclamacionesWhatsAppMessage(data: LibroReclamacionesData): string {
  let message = '*Libro de Reclamaciones - Academia RLC*\n\n'
  message += `*Tipo:* ${data.tipoReclamo === 'queja' ? 'QUEJA' : 'RECLAMO'}\n\n`
  message += '*Datos del Consumidor*\n'
  message += `${data.tipoDocumento}: ${data.numeroDocumento}\n`
  message += `Nombre: ${data.nombres} ${data.apellidos}\n`
  message += `Email: ${data.email}\n`
  message += `Teléfono: ${data.telefono}\n`
  message += `Dirección: ${data.direccion}\n`
  
  if (data.pedido) {
    message += `Nro. Pedido/Matrícula: ${data.pedido}\n`
  }
  
  message += `\n*Detalle del ${data.tipoReclamo === 'queja' ? 'Queja' : 'Reclamo'}*\n`
  message += `${data.detalleReclamo}\n`
  message += `\n*Fecha y Hora*\n`
  message += `${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}\n`
  message += `\n─────────────────\n`
  message += `_Este ${data.tipoReclamo} fue enviado desde el Libro de Reclamaciones oficial de Academia RLC_\n`
  message += `_Se dará respuesta en un plazo máximo de 30 días hábiles._`
  return message
}

export function generateLibroReclamacionesWhatsAppUrl(data: LibroReclamacionesData): string {
  const message = formatLibroReclamacionesWhatsAppMessage(data)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function sendLibroReclamacionesWhatsAppMessage(data: LibroReclamacionesData): void {
  const url = generateLibroReclamacionesWhatsAppUrl(data)
  window.open(url, '_blank')
}