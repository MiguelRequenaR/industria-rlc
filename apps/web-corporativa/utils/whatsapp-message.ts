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

