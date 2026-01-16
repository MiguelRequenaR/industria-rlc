"use client"
import { useState } from "react"
import { Menu, X, Mail, Phone, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { servicesData } from "@/lib/services-data"
import { experienceData } from "@/lib/experience-data"

interface SearchResult {
  type: 'service' | 'experience';
  title: string;
  description: string;
  slug: string;
  parentSlug?: string;
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Función para cerrar los resultados con un pequeño delay
  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  // Función de búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Buscar en servicios
    servicesData.forEach(service => {
      service.subServices.forEach(subService => {
        if (
          subService.title.toLowerCase().includes(lowerQuery) ||
          subService.description.toLowerCase().includes(lowerQuery) ||
          subService.detailedDescription?.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'service',
            title: subService.title,
            description: subService.description,
            slug: subService.slug,
            parentSlug: service.slug
          });
        }
      });
    });

    // Buscar en experiencias
    experienceData.forEach(experience => {
      if (
        experience.title.toLowerCase().includes(lowerQuery) ||
        experience.description.toLowerCase().includes(lowerQuery) ||
        experience.client.toLowerCase().includes(lowerQuery) ||
        experience.location.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'experience',
          title: experience.title,
          description: experience.description,
          slug: experience.slug
        });
      }
    });

    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  // Navegar al resultado seleccionado
  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'service') {
      router.push(`/servicios/${result.slug}`);
    } else {
      router.push(`/experiencia/${result.slug}`);
    }
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const links = [
    {
      label: "Inicio",
      link: "/",
    },
    {
      label: "Nosotros",
      link: "/nosotros",
    },
    {
      label: "Servicios",
      link: "/servicios",
    },
    {
      label: "Experiencia",
      link: "/experiencia"
    },
    {
      label: "Productos",
      link: "/productos",
    },
  ];

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto flex flex-col justify-between items-center md:py-5 px-4 md:px-0">
        <div className="flex items-center justify-between gap-4 w-full md:w-auto md:justify-start">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/industriarlc512.png"
                alt="Logo de Industria RLC - Servicios Eléctricos Integrales"
                width={80}
                height={80}
                loading="lazy"
              />
            </div>
          </Link>

          {/* Botón hamburguesa para móvil */}
          <button
            className="md:hidden flex items-center justify-center text-primary"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-7 h-7" />
          </button>

          <div className="hidden md:flex items-center gap-4">
            {/* Barra de búsqueda */}
            <div className="relative">
              <div className="flex items-center rounded-full border border-secondary ">
                <Search className="w-4 h-4 text-secondary mx-3" />
                <input
                  type="text"
                  placeholder="Buscar servicios o experiencias..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  onBlur={handleBlur}
                  className="w-80  h-10 rounded-fullpx-3 text-secondary focus:outline-none"
                />
              </div>

              {/* Resultados de búsqueda */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 border border-gray-200">
                  {searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.slug}-${index}`}
                      onClick={() => handleResultClick(result)}
                      className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${result.type === 'service'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                          }`}>
                          {result.type === 'service' ? 'Servicio' : 'Experiencia'}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-secondary text-sm mb-1">
                            {result.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Información de contacto */}
            <span className="text-white px-4 flex items-center gap-2 bg-secondary rounded-full h-10">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+51940162009"
                className="hover:underline flex items-center gap-1"
              >
                (+51) 940 162 009
              </a>
              -
              <Mail className="w-4 h-4" />
              <a
                href="mailto:proyectos@industria-rlc.com"
                className="hover:underline flex items-center gap-1"
              >
                proyectos@industriarlc.com
              </a>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <nav className="hidden md:block">
            <ul className="text-primary flex gap-15 font-semibold">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="relative group transition-colors duration-500 cursor-pointer hover:text-secondary uppercase"
                  >
                    {item.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex ml-16 gap-4 items-center">
            <a href="https://industria-rlc-web-academia.vercel.app/" target="_blank" rel="noopener noreferrer">
              <span className="inline-block relative overflow-hidden bg-white text-primary border-2 border-secondary px-6 py-2 rounded-full font-semibold uppercase transition-all duration-300 hover:text-white hover:shadow-md cursor-pointer group">
                <span
                  className="
                    absolute inset-0 
                    bg-secondary
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-500 ease-in-out pointer-events-none
                  "
                />
                <span className="relative z-10 transition-colors duration-500">
                  Academia
                </span>
              </span>
            </a>
            <Link href="/contacto">
              <span className="inline-block relative overflow-hidden bg-secondary text-white px-6 py-2 rounded-full font-semibold uppercase transition-all duration-300 hover:text-white hover:shadow-md cursor-pointer group">
                <span
                  className="
                    absolute inset-0 
                    bg-primary
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-500 ease-in-out pointer-events-none
                  "
                />
                <span className="relative z-10 transition-colors duration-500">
                  Cotizar Servicio
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile - Overlay */}
      <div
        className={`
          fixed top-0 right-0 w-full h-full bg-primary z-40 flex flex-col transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        {/* Close button */}
        <div className="flex justify-between items-center p-5">
          <span className="text-2xl font-bold text-white uppercase">Industria RLC</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white"
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        {/* Mobile nav */}
        <nav className="flex-1 flex flex-col items-center justify-center px-5">
          {/* Barra de búsqueda móvil */}
          <div className="w-full mb-8">
            <div className="relative">
              <div className="flex items-center bg-white rounded-full border border-white">
                <Search className="w-4 h-4 text-secondary ml-3" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  onBlur={handleBlur}
                  className="w-full bg-white h-10 rounded-full px-3 text-secondary focus:outline-none"
                />
              </div>

              {/* Resultados de búsqueda móvil */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto z-50 border border-gray-200">
                  {searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.slug}-mobile-${index}`}
                      onClick={() => {
                        handleResultClick(result);
                        setMenuOpen(false);
                      }}
                      className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${result.type === 'service'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                          }`}>
                          {result.type === 'service' ? 'Servicio' : 'Experiencia'}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-secondary text-sm mb-1">
                            {result.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ul className="flex flex-col gap-8 text-white text-lg font-semibold">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className="relative group cursor-pointer transition-colors duration-300 hover:text-secondary"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact info en móvil */}
          <div className="mt-10 text-white text-sm space-y-3">
            <a
              href="tel:+51940162009"
              className="flex items-center justify-center gap-2 hover:text-secondary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(+51) 940 162 009</span>
            </a>
            <a
              href="mailto:proyectos@industria-rlc.com"
              className="flex items-center justify-center gap-2 hover:text-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>proyectos@industria-rlc.com</span>
            </a>
          </div>
        </nav>
        <div className="flex flex-col gap-4 justify-center pb-8 px-5">
          <a href="https://industria-rlc-web-academia.vercel.app/" target="_blank" rel="noopener noreferrer">
            <button
              className="relative overflow-hidden bg-white text-primary px-8 py-3 uppercase cursor-pointer border-2 border-secondary group transition-colors duration-500 hover:text-white text-base rounded-full w-full"
            >
              <span
                className="
                  absolute inset-0 
                  bg-secondary
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out pointer-events-none
                "
              />
              <span
                className="relative z-10 transition-colors duration-500 font-semibold"
              >
                Academia
              </span>
            </button>
          </a>
          <Link href="/contacto" onClick={() => setMenuOpen(false)}>
            <button
              className="relative overflow-hidden bg-secondary px-8 py-3 uppercase cursor-pointer border border-secondary group transition-colors duration-500 hover:text-white text-base rounded-full w-full"
            >
              <span
                className="
                  absolute inset-0 
                  bg-primary
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform duration-500 ease-in-out pointer-events-none
                "
              />
              <span
                className="relative z-10 transition-colors duration-500 font-semibold"
              >
                Cotizar Servicio
              </span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
