import Image from "next/image";

export function LogoutOverlay() {
  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-linear-to-br from-blue-50 via-white to-orange-50"
      style={{ fontFamily: "var(--font-comfortaa)" }}
      role="status"
      aria-live="polite"
      aria-label="Cerrando sesión"
    >
      <Image
        src="/rlciconpetplano.png"
        alt=""
        width={300}
        height={300}
        className="animate-pulse"
      />
      <p className="text-xl font-semibold uppercase text-gray-700">
        Cerrando sesión...
      </p>
    </div>
  )
}