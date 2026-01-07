export default function HeroProducts() {
  return (
    <section data-aos="fade-right" className="pt-24 md:pt-40">
      <div className="w-full">
        <div
          className="relative md:w-[84%] h-75 md:rounded-br-2xl overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1660330590022-9f4ff56b63f6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-primary/90" />
          <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center p-5 md:p-0">
            <div className="flex items-start space-x-5">
              <div className="h-full w-1 bg-secondary rounded" style={{ minHeight: "80px" }} />
              <div>
                <h1 className="text-secondary text-4xl font-semibold">
                  Nuestro Catálogo de Productos
                </h1>
                <p className="text-lg text-white font-semibold mt-5">
                  Explora nuestra amplia gama de productos diseñados para satisfacer tus necesidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
