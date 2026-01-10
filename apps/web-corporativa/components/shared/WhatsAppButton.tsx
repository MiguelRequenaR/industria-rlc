"use client"

import Image from 'next/image'

const WHATSAPP_NUMBER = '51940162009'

export default function WhatsAppButton() {

  const handleClick = () => {
    const message = '¡Hola! Me gustaría solicitar información sobre sus servicios.'
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className='bg-green-600 relative p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-500 focus:outline-none group cursor-pointer'
        aria-label="Contactar por WhatsApp"
      >
        {/* Badge */}
        <span
          className="
            pointer-events-none
            absolute right-[110%] top-1/2 -translate-y-1/2
            opacity-0 group-hover:opacity-100
            group-hover:translate-x-0
            -translate-x-2
            transition-all duration-300
            bg-green-600
            text-white
            px-3 py-1 
            rounded-full
            text-xs
            font-semibold
            shadow-lg
            whitespace-nowrap
            z-50
          "
        >
          Contactar por WhatsApp
        </span>
        <Image src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className='w-full h-full object-contain' />
      </button>
    </div>
  )
}
