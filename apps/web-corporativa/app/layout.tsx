import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar"
import CallToAction from "@/components/shared/CallToAction";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import AOSProvider from "@/components/shared/AOSProvider";
import StructuredData from "@/components/shared/StructuredData";
import QueryProvider from "@/components/providers/QueryProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://industriarlc.com/'),
  title: {
    default: "Industria RLC - Servicios Eléctricos Integrales en Lima, Perú",
    template: "%s | Industria RLC",
  },
  description: "Empresa peruana líder en servicios eléctricos integrales, construcción, automatización y gestión de proyectos. +10 de años de experiencia. Certificados y garantías.",
  keywords: ["servicios eléctricos Lima", "construcción Perú", "automatización industrial", "instalaciones eléctricas", "cableado estructurado", "domótica", "paneles eléctricos"],
  authors: [
    {
      name: "Industria RLC",
      url: "https://industriarlc.com/",
    },
    {
      name: "Miguel Requena - Grobles Studio",
      url: "https://miguel-paris.netlify.app/"
    }
  ],
  creator: "Industria RLC",
  publisher: "Industria RLC",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://industriarlc.com/",
    siteName: "Industria RLC",
    title: "Industria RLC - Servicios Eléctricos Integrales en Lima, Perú",
    description: "Empresa peruana líder en servicios eléctricos integrales, construcción, automatización y gestión de proyectos. +10 de años de experiencia.",
    images: [
      {
        url: "/ogImageRLC.png",
        width: 1200,
        height: 630,
        alt: "Industria RLC - Servicios Eléctricos Integrales en Lima, Perú",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Industria RLC - Servicios Eléctricos Integrales en Lima, Perú",
    description: "Empresa peruana líder en servicios eléctricos integrales, construcción, automatización y gestión de proyectos. +10 de años de experiencia.",
    images: ['/ogImageRLC.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={nunito.className}>
        <StructuredData />
        <QueryProvider>
          <AOSProvider />
          <NavBar />
          {children}
        <CallToAction />
          <Footer />
          <WhatsAppButton />
        </QueryProvider>
      </body>
    </html>
  );
}
