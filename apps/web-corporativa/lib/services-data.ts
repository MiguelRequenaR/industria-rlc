import type { Service } from "./types";

export const servicesData: Service[] = [
  {
    id: "electricidad",
    title: "Electricidad Industrial",
    slug: "electricidad",
    description: "Soluciones eléctricas para la industria.",
    subServices: [
      {
        id: "subestaciones",
        title: "Subestaciones",
        slug: "subestaciones",
        description: "Diseño, construcción y mantenimiento de subestaciones eléctricas.",
        image: "https://images.unsplash.com/photo-1596962677810-62375eba1de3?q=80&w=1488&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Ofrecemos servicios especializados en el diseño, construcción y mantenimiento de subestaciones eléctricas de media y alta tensión. Nuestro equipo cuenta con amplia experiencia en proyectos industriales y comerciales, garantizando instalaciones seguras y eficientes que cumplen con todas las normativas vigentes.",
        benefits: [
          "Diseño personalizado según necesidades específicas",
          "Cumplimiento de normativas nacionales e internacionales",
          "Equipos de alta calidad y durabilidad",
          "Mantenimiento preventivo y correctivo",
          "Optimización del consumo energético",
          "Soporte técnico 24/7"
        ],
        applications: [
          "Plantas industriales",
          "Centros comerciales",
          "Hospitales y clínicas",
          "Edificios corporativos",
          "Complejos residenciales",
          "Instalaciones mineras"
        ]
      },
      {
        id: "tableros-electricos",
        title: "Tableros Eléctricos",
        slug: "tableros-electricos",
        description: "Fabricación e instalación de tableros eléctricos industriales.",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Diseñamos y fabricamos tableros eléctricos de control, distribución y automatización para aplicaciones industriales y comerciales. Utilizamos componentes de primera calidad y seguimos estrictos controles de calidad en todo el proceso de fabricación.",
        benefits: [
          "Diseño personalizado y modular",
          "Componentes de marcas reconocidas",
          "Certificaciones de calidad",
          "Pruebas rigurosas antes de entrega",
          "Documentación técnica completa",
          "Garantía extendida"
        ],
        applications: [
          "Automatización industrial",
          "Sistemas de bombeo",
          "Líneas de producción",
          "Sistemas de climatización",
          "Equipos de refrigeración",
          "Máquinas CNC"
        ]
      },
      {
        id: "instalaciones-electricas",
        title: "Instalaciones Eléctricas",
        slug: "instalaciones-electricas",
        description: "Instalaciones eléctricas completas para proyectos de cualquier escala.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Realizamos instalaciones eléctricas integrales para todo tipo de proyectos, desde pequeñas oficinas hasta grandes complejos industriales. Nuestro servicio incluye diseño, ingeniería, instalación y puesta en marcha, garantizando sistemas eléctricos seguros y eficientes.",
        benefits: [
          "Ingeniería y diseño especializado",
          "Personal técnico certificado",
          "Materiales de primera calidad",
          "Cumplimiento de plazos",
          "Garantía de instalación",
          "Mantenimiento post-instalación"
        ],
        applications: [
          "Edificios comerciales",
          "Plantas industriales",
          "Centros educativos",
          "Hospitales",
          "Hoteles",
          "Centros de datos"
        ]
      }
    ]
  },
  {
    id: "construccion",
    title: "Construcción",
    slug: "construccion",
    description: "Soluciones de construcción para la industria.",
    subServices: [
      {
        id: "construccion-industrial",
        title: "Construcción Industrial",
        slug: "construccion-industrial",
        description: "Proyectos de construcción industrial de alta complejidad.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Ejecutamos proyectos de construcción industrial de cualquier magnitud, desde el diseño inicial hasta la entrega final. Contamos con un equipo multidisciplinario de ingenieros, arquitectos y maestros de obra especializados en construcción industrial.",
        benefits: [
          "Gestión integral de proyectos",
          "Equipo multidisciplinario",
          "Tecnología de construcción avanzada",
          "Control de calidad estricto",
          "Cumplimiento de normativas de seguridad",
          "Entrega en tiempo y forma"
        ],
        applications: [
          "Naves industriales",
          "Almacenes y depósitos",
          "Plantas de producción",
          "Talleres especializados",
          "Centros logísticos",
          "Instalaciones mineras"
        ]
      },
      {
        id: "remodelacion",
        title: "Remodelación",
        slug: "remodelacion",
        description: "Servicios de remodelación y renovación de espacios.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Transformamos espacios existentes en ambientes modernos y funcionales. Nuestro servicio de remodelación abarca desde pequeñas renovaciones hasta proyectos de gran envergadura, siempre con acabados de primera calidad.",
        benefits: [
          "Diseño arquitectónico moderno",
          "Mínima interrupción de operaciones",
          "Acabados de alta calidad",
          "Optimización de espacios",
          "Presupuestos transparentes",
          "Asesoría en diseño de interiores"
        ],
        applications: [
          "Oficinas corporativas",
          "Locales comerciales",
          "Restaurantes",
          "Clínicas y consultorios",
          "Viviendas",
          "Espacios educativos"
        ]
      },
      {
        id: "obra-civil",
        title: "Obra Civil",
        slug: "obra-civil",
        description: "Servicios de obra civil para proyectos de infraestructura.",
        image: "https://images.unsplash.com/photo-1562324771-4fb277001e1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detailedDescription: "Desarrollamos proyectos de obra civil e infraestructura con los más altos estándares de calidad. Nuestro equipo técnico especializado garantiza estructuras sólidas y duraderas que cumplen con todas las normativas de construcción.",
        benefits: [
          "Ingeniería estructural especializada",
          "Materiales certificados",
          "Maquinaria moderna",
          "Estudios de suelos",
          "Supervisión técnica permanente",
          "Garantía estructural"
        ],
        applications: [
          "Cimentaciones",
          "Pavimentación",
          "Muros de contención",
          "Obras de drenaje",
          "Estructuras de concreto",
          "Urbanizaciones"
        ]
      }
    ]
  }
]