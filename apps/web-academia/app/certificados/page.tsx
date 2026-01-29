import type { Metadata } from "next"
import ValidateCertificate from "@/components/certificate/ValidateCertificate"

export const metadata: Metadata = {
  title: 'Certificados',
  description: 'Certificados de los cursos de RLC Academy',
}

export default function CertificatesPage() {
  return (
    <main>
      <ValidateCertificate />
    </main>
  )
}
