import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import CalltoAction from "@/components/shared/CalltoAction";
import QuickAccessBar from "@/components/shared/QuickAccessBar";
import AOSProvider from "@/components/shared/AOSProvider";
import OrganizationStructuredData from "@/components/seo/OrganizationStructuredData";
import "aos/dist/aos.css";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://academia.industriarlc.com'),
  title: {
    default: 'RLC Academy - Cursos de Electricidad Industrial | Formación Técnica Especializada',
    template: '%s | RLC Academy'
  },
  description: 'Academia técnica especializada en cursos de electricidad industrial, instalaciones eléctricas, sistemas de energía UPS y seguridad eléctrica. Certificaciones profesionales con instructores expertos.',
  keywords: ['cursos electricidad', 'electricidad industrial', 'instalaciones eléctricas', 'UPS', 'seguridad eléctrica', 'formación técnica', 'certificación eléctrica', 'RLC Academy', 'cursos técnicos Perú'],
  authors: [{ name: 'Industria RLC' }],
  creator: 'Industria RLC',
  publisher: 'RLC Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://academia.industriarlc.com',
    siteName: 'RLC Academy',
    title: 'RLC Academy - Cursos de Electricidad Industrial',
    description: 'Academia técnica especializada en cursos de electricidad industrial, instalaciones eléctricas y sistemas de energía. Certificaciones profesionales.',
    images: [
      {
        url: '/images/ogImageACA.png',
        width: 1200,
        height: 630,
        alt: 'RLC Academy - Formación Técnica en Electricidad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RLC Academy - Cursos de Electricidad Industrial',
    description: 'Academia técnica especializada en cursos de electricidad industrial y formación profesional.',
    images: ['/images/ogImageACA.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://academia.industriarlc.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <OrganizationStructuredData />
      </head>
      <body className={nunito.className}>
        <AOSProvider />
        <NavBar />
        <QuickAccessBar />
        {children}
        <CalltoAction />
        <Footer />
      </body>
    </html>
  );
}
