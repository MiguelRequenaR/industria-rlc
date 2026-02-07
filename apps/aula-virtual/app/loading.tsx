import Image from "next/image"

export default function RootLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 bg-linear-to-br from-blue-50 via-white to-orange-50"
      style={{ fontFamily: "var(--font-comfortaa)" }}
    >
      <Image src="/rlciconpetplano.png" alt="logo" width={300} height={300} className="animate-pulse" />
      <p className="text-xl font-semibold uppercase text-gray-700">
        Cargando aula virtual...
      </p>
    </div>
  )
}
