import React from 'react'

export default function HeroServices() {
  return (
    <section>
      <div className="w-full pb-10">
        <div
          className="relative md:w-[84%] h-[300px] md:rounded-br-2xl overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1596962677810-62375eba1de3?q=80&w=1488&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center p-5 md:p-0">
            <div className="flex items-start space-x-5">
              <div className="h-full w-1 bg-white rounded" style={{ minHeight: "80px" }} />
              <div>
                <h2 className="text-white text-4xl font-semibold">
                  Nuestros Servicios
                </h2>
                <p className="text-lg text-white font-semibold mt-5">
                  Nuestro compromiso es encontrar una solución acorde a tu necesidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
