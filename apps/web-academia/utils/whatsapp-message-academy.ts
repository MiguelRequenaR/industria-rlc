export interface FormContactData {
  nombre: string
  telefono: string
  email: string
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