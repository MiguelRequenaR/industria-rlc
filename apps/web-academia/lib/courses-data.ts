import type { Course } from "./types";

export const coursesData: Course[] = [
  {
    id: "electricidad-basica",
    title: "Electricidad Básica",
    slug: "electricidad-basica",
    imageCard: "https://i.ibb.co/Lz7kqHCg/electricidadbasica.jpg",
    imageDetail: "https://i.ibb.co/Lz7kqHCg/electricidadbasica.jpg",
    description: "Domina los fundamentos de la electricidad y circuitos básicos para comenzar tu carrera técnica.",
    detailedDescription: "Aprende los conceptos fundamentales de la electricidad, desde la teoría básica hasta las aplicaciones prácticas. Este curso te proporcionará una base sólida en conceptos eléctricos, circuitos, mediciones y seguridad eléctrica. Ideal para principiantes que desean iniciar su carrera en el sector eléctrico.",
    badges: [
      {
        id: "1",
        duration: "40 horas",
        level: "Básico"
      }
    ],
    objectives: [
      "Comprender los conceptos fundamentales de electricidad: voltaje, corriente, resistencia y potencia",
      "Interpretar y diseñar circuitos eléctricos básicos en serie y paralelo",
      "Utilizar correctamente instrumentos de medición como multímetros y pinzas amperimétricas",
      "Aplicar las leyes de Ohm y Kirchhoff en análisis de circuitos",
      "Identificar y seleccionar componentes eléctricos básicos",
      "Implementar medidas de seguridad eléctrica en trabajos básicos"
    ],
    requirements: [
      "Conocimientos básicos de matemáticas (operaciones básicas y álgebra elemental)",
      "Interés en el área eléctrica",
      "No se requiere experiencia previa",
      "Computadora con acceso a internet"
    ],
    duration: "40 horas",
    modality: "Híbrido (20h presencial + 20h virtual)",
    price: 350,
    instructor: {
      name: "Ing. Carlos Mendoza",
      bio: "Ingeniero Electricista con más de 15 años de experiencia en instalaciones industriales y capacitación técnica.",
      experience: "15 años en el sector eléctrico"
    },
    syllabus: [
      {
        id: "1",
        module: "Módulo 1: Fundamentos de Electricidad",
        topics: [
          "Introducción a la electricidad",
          "Conceptos básicos: voltaje, corriente, resistencia",
          "Ley de Ohm y sus aplicaciones",
          "Potencia eléctrica y energía"
        ],
        duration: "8 horas"
      },
      {
        id: "2",
        module: "Módulo 2: Circuitos Eléctricos",
        topics: [
          "Circuitos en serie y paralelo",
          "Leyes de Kirchhoff",
          "Análisis de circuitos básicos",
          "Circuitos mixtos"
        ],
        duration: "10 horas"
      },
      {
        id: "3",
        module: "Módulo 3: Instrumentos de Medición",
        topics: [
          "Uso del multímetro digital",
          "Medición de voltaje, corriente y resistencia",
          "Pinzas amperimétricas",
          "Interpretación de resultados"
        ],
        duration: "8 horas"
      },
      {
        id: "4",
        module: "Módulo 4: Componentes Eléctricos",
        topics: [
          "Resistencias, capacitores e inductores",
          "Interruptores y contactores",
          "Fusibles y protecciones básicas",
          "Cables y conductores"
        ],
        duration: "8 horas"
      },
      {
        id: "5",
        module: "Módulo 5: Seguridad Eléctrica",
        topics: [
          "Riesgos eléctricos",
          "EPP para trabajos eléctricos",
          "Primeros auxilios ante shock eléctrico",
          "Normativas básicas de seguridad"
        ],
        duration: "6 horas"
      }
    ],
    certificate: true,
    includes: [
      "40 horas de capacitación especializada",
      "Material didáctico digital",
      "Acceso a plataforma virtual por 6 meses",
      "Certificado oficial RLC Academy",
      "Kit básico de herramientas (préstamo para prácticas)",
      "Asesoría personalizada durante el curso"
    ]
  },
  {
    id: "electricidad-industrial",
    title: "Electricidad Industrial",
    slug: "electricidad-industrial",
    imageCard: "https://i.ibb.co/RTb2dXTm/electricidadindustrial.png",
    imageDetail: "https://i.ibb.co/RTb2dXTm/electricidadindustrial.png",
    description: "Especialízate en sistemas eléctricos industriales, control de motores y automatización.",
    detailedDescription: "Domina los sistemas eléctricos industriales modernos con énfasis en control de motores, automatización y mantenimiento predictivo. Este curso avanzado te preparará para trabajar en entornos industriales complejos, desde plantas de manufactura hasta instalaciones de producción.",
    badges: [
      {
        id: "1",
        duration: "60 horas",
        level: "Avanzado"
      }
    ],
    objectives: [
      "Diseñar e implementar sistemas de control de motores trifásicos",
      "Interpretar y crear diagramas de control industrial",
      "Configurar y programar variadores de velocidad",
      "Implementar sistemas de arranque y protección de motores",
      "Realizar mantenimiento predictivo y correctivo en sistemas industriales",
      "Aplicar normativas y estándares industriales vigentes"
    ],
    requirements: [
      "Conocimientos sólidos de electricidad básica",
      "Experiencia previa con circuitos eléctricos",
      "Manejo de instrumentos de medición",
      "Deseable: experiencia en entornos industriales"
    ],
    duration: "60 horas",
    modality: "Presencial",
    price: 580,
    instructor: {
      name: "Ing. Roberto Fernández",
      bio: "Ingeniero Mecánico-Electricista especializado en automatización industrial con certificación internacional en sistemas de control.",
      experience: "20 años en automatización industrial"
    },
    syllabus: [
      {
        id: "1",
        module: "Módulo 1: Sistemas Trifásicos",
        topics: [
          "Sistemas trifásicos balanceados y desbalanceados",
          "Conexiones estrella y triángulo",
          "Mediciones en sistemas trifásicos",
          "Factor de potencia y corrección"
        ],
        duration: "12 horas"
      },
      {
        id: "2",
        module: "Módulo 2: Motores Eléctricos Industriales",
        topics: [
          "Tipos de motores industriales",
          "Arranque directo e inversor",
          "Arranque estrella-triángulo",
          "Protecciones térmicas y magnéticas"
        ],
        duration: "15 horas"
      },
      {
        id: "3",
        module: "Módulo 3: Variadores de Velocidad",
        topics: [
          "Principios de variación de velocidad",
          "Configuración y parametrización",
          "Comunicación industrial",
          "Troubleshooting y mantenimiento"
        ],
        duration: "12 horas"
      },
      {
        id: "4",
        module: "Módulo 4: Control Industrial",
        topics: [
          "Contactores y relés auxiliares",
          "Temporizadores y contadores",
          "Diseño de circuitos de control",
          "Lógica de control industrial"
        ],
        duration: "12 horas"
      },
      {
        id: "5",
        module: "Módulo 5: Mantenimiento Industrial",
        topics: [
          "Mantenimiento preventivo y predictivo",
          "Análisis de fallas comunes",
          "Termografía básica",
          "Gestión de mantenimiento"
        ],
        duration: "9 horas"
      }
    ],
    certificate: true,
    includes: [
      "60 horas de capacitación intensiva",
      "Material didáctico especializado",
      "Prácticas en laboratorio industrial",
      "Certificado profesional RLC Academy",
      "Manual técnico de referencia",
      "Software de simulación incluido",
      "Membresía en comunidad profesional"
    ]
  },
  {
    id: "instalaciones-electricas",
    title: "Instalaciones Eléctricas",
    slug: "instalaciones-electricas",
    imageCard: "https://i.ibb.co/nM6kLKqL/instalacionelectrica.jpg",
    imageDetail: "https://i.ibb.co/nM6kLKqL/instalacionelectrica.jpg",
    description: "Aprende a diseñar e implementar instalaciones eléctricas residenciales, comerciales e industriales.",
    detailedDescription: "Conviértete en un experto en instalaciones eléctricas con este curso completo que cubre desde diseños residenciales hasta complejas instalaciones industriales. Aprenderás a interpretar planos, calcular cargas, seleccionar materiales y cumplir con todas las normativas vigentes.",
    badges: [
      {
        id: "1",
        duration: "55 horas",
        level: "Intermedio"
      }
    ],
    objectives: [
      "Diseñar instalaciones eléctricas según el Código Nacional de Electricidad",
      "Calcular cargas eléctricas y dimensionar conductores",
      "Interpretar y elaborar planos eléctricos",
      "Seleccionar materiales y equipos eléctricos apropiados",
      "Implementar sistemas de puesta a tierra efectivos",
      "Realizar pruebas y certificación de instalaciones"
    ],
    requirements: [
      "Conocimientos de electricidad básica",
      "Capacidad de leer planos técnicos (deseable)",
      "Matemáticas básicas",
      "Computadora con AutoCAD o similar (opcional)"
    ],
    duration: "55 horas",
    modality: "Híbrido (30h presencial + 25h virtual)",
    price: 480,
    instructor: {
      name: "Ing. Patricia Ramírez",
      bio: "Ingeniera Eléctrica con especialización en instalaciones y más de 12 años liderando proyectos eléctricos comerciales e industriales.",
      experience: "12 años en proyectos eléctricos"
    },
    syllabus: [
      {
        id: "1",
        module: "Módulo 1: Fundamentos de Instalaciones",
        topics: [
          "Código Nacional de Electricidad",
          "Tipos de instalaciones eléctricas",
          "Simbología y planos eléctricos",
          "Normativas y estándares"
        ],
        duration: "10 horas"
      },
      {
        id: "2",
        module: "Módulo 2: Cálculo de Instalaciones",
        topics: [
          "Cálculo de cargas eléctricas",
          "Dimensionamiento de conductores",
          "Caída de tensión",
          "Factor de demanda y diversidad"
        ],
        duration: "12 horas"
      },
      {
        id: "3",
        module: "Módulo 3: Instalaciones Residenciales",
        topics: [
          "Diseño de circuitos residenciales",
          "Tableros de distribución",
          "Instalación de luminarias",
          "Tomacorrientes y circuitos especiales"
        ],
        duration: "10 horas"
      },
      {
        id: "4",
        module: "Módulo 4: Instalaciones Comerciales e Industriales",
        topics: [
          "Sistemas de distribución industrial",
          "Centros de control de motores",
          "Instalaciones de fuerza",
          "Iluminación industrial"
        ],
        duration: "13 horas"
      },
      {
        id: "5",
        module: "Módulo 5: Sistemas de Protección",
        topics: [
          "Sistemas de puesta a tierra",
          "Protección contra sobrecorriente",
          "Interruptores diferenciales",
          "Pruebas y certificación"
        ],
        duration: "10 horas"
      }
    ],
    certificate: true,
    includes: [
      "55 horas de capacitación especializada",
      "Software de cálculo eléctrico",
      "Plantillas de planos eléctricos",
      "Certificado profesional RLC Academy",
      "Catálogos técnicos digitales",
      "Calculadora de diseño eléctrico",
      "Asesoría en proyectos personales"
    ]
  },
  {
    id: "seguridad-riesgo-electrico",
    title: "Seguridad y Riesgo Eléctrico",
    slug: "seguridad-riesgo-electrico",
    imageCard: "https://i.ibb.co/9HSkTgf1/seguridadelectrica.jpg",
    imageDetail: "https://i.ibb.co/9HSkTgf1/seguridadelectrica.jpg",
    description: "Certifícate en seguridad eléctrica y prevención de riesgos según normativas nacionales e internacionales.",
    detailedDescription: "Curso especializado en seguridad eléctrica que cumple con las normativas OSHA, NFPA 70E y legislación nacional. Aprende a identificar, evaluar y controlar riesgos eléctricos, implementar programas de seguridad y realizar trabajos eléctricos seguros en cualquier entorno.",
    badges: [
      {
        id: "1",
        duration: "35 horas",
        level: "Intermedio"
      }
    ],
    objectives: [
      "Identificar y evaluar riesgos eléctricos en diferentes entornos",
      "Implementar programas de seguridad eléctrica efectivos",
      "Aplicar procedimientos de bloqueo y etiquetado (LOTO)",
      "Seleccionar y usar correctamente el EPP eléctrico",
      "Realizar trabajos en caliente y desenergizado de forma segura",
      "Responder adecuadamente ante emergencias eléctricas"
    ],
    requirements: [
      "Conocimientos básicos de electricidad",
      "Experiencia en trabajos eléctricos (deseable)",
      "Certificado médico para trabajos de riesgo",
      "Mayor de 18 años"
    ],
    duration: "35 horas",
    modality: "Presencial",
    price: 420,
    instructor: {
      name: "Ing. Miguel Torres",
      bio: "Especialista en seguridad eléctrica certificado NFPA 70E con más de 10 años formando profesionales en prevención de riesgos eléctricos.",
      experience: "10 años en seguridad eléctrica"
    },
    syllabus: [
      {
        id: "1",
        module: "Módulo 1: Fundamentos de Seguridad Eléctrica",
        topics: [
          "Conceptos básicos de seguridad eléctrica",
          "Normativas OSHA y NFPA 70E",
          "Legislación nacional vigente",
          "Responsabilidades legales"
        ],
        duration: "6 horas"
      },
      {
        id: "2",
        module: "Módulo 2: Riesgos Eléctricos",
        topics: [
          "Shock eléctrico y sus efectos",
          "Arco eléctrico",
          "Quemaduras eléctricas",
          "Evaluación de riesgos"
        ],
        duration: "8 horas"
      },
      {
        id: "3",
        module: "Módulo 3: EPP y Herramientas",
        topics: [
          "Selección de EPP eléctrico",
          "Categorías de arco eléctrico",
          "Herramientas aisladas",
          "Inspección y mantenimiento de EPP"
        ],
        duration: "7 horas"
      },
      {
        id: "4",
        module: "Módulo 4: Procedimientos Seguros",
        topics: [
          "Bloqueo y etiquetado (LOTO)",
          "Trabajos en caliente",
          "Permisos de trabajo",
          "Trabajo en altura con riesgo eléctrico"
        ],
        duration: "8 horas"
      },
      {
        id: "5",
        module: "Módulo 5: Emergencias y Primeros Auxilios",
        topics: [
          "Respuesta ante shock eléctrico",
          "RCP básico",
          "Uso de DEA",
          "Planes de emergencia"
        ],
        duration: "6 horas"
      }
    ],
    certificate: true,
    includes: [
      "35 horas de capacitación certificada",
      "Manual de seguridad eléctrica",
      "Certificado oficial con validez nacional",
      "Carnet de seguridad eléctrica",
      "Kit de EPP básico",
      "Simulacros prácticos",
      "Recertificación con descuento"
    ]
  },
  {
    id: "ups-tableros-sistemas-energia",
    title: "UPS, Tableros y Sistemas de Energía",
    slug: "ups-tableros-sistemas-energia",
    imageCard: "https://i.ibb.co/jvdRKWRk/upscurso.jpg",
    imageDetail: "https://i.ibb.co/jvdRKWRk/upscurso.jpg",
    description: "Especialízate en sistemas de energía de respaldo, UPS, tableros de distribución y calidad de energía.",
    detailedDescription: "Conviértete en experto en sistemas de energía ininterrumpida (UPS), tableros eléctricos y gestión de calidad energética. Este curso especializado cubre desde el diseño de tableros hasta la implementación de sistemas de respaldo críticos para data centers, hospitales e industrias.",
    badges: [
      {
        id: "1",
        duration: "50 horas",
        level: "Avanzado"
      }
    ],
    objectives: [
      "Diseñar y dimensionar sistemas UPS para aplicaciones críticas",
      "Configurar y mantener tableros de distribución eléctrica",
      "Analizar y mejorar la calidad de energía eléctrica",
      "Implementar sistemas de transferencia automática",
      "Realizar estudios de respaldo energético",
      "Diagnosticar y resolver problemas en sistemas de energía"
    ],
    requirements: [
      "Conocimientos sólidos de electricidad",
      "Experiencia en instalaciones eléctricas",
      "Conocimientos de electrónica de potencia (deseable)",
      "Familiaridad con sistemas trifásicos"
    ],
    duration: "50 horas",
    modality: "Híbrido (35h presencial + 15h virtual)",
    price: 520,
    instructor: {
      name: "Ing. Alberto Vásquez",
      bio: "Ingeniero Electrónico especializado en sistemas de potencia con certificaciones en UPS de marcas líderes y más de 18 años de experiencia.",
      experience: "18 años en sistemas de energía"
    },
    syllabus: [
      {
        id: "1",
        module: "Módulo 1: Fundamentos de Sistemas de Energía",
        topics: [
          "Calidad de energía eléctrica",
          "Problemas comunes: sags, swells, armónicos",
          "Monitoreo de calidad energética",
          "Normativas de calidad de energía"
        ],
        duration: "8 horas"
      },
      {
        id: "2",
        module: "Módulo 2: Sistemas UPS",
        topics: [
          "Tipos de UPS: offline, line-interactive, online",
          "Dimensionamiento de UPS",
          "Baterías y tiempo de respaldo",
          "Configuraciones redundantes"
        ],
        duration: "12 horas"
      },
      {
        id: "3",
        module: "Módulo 3: Tableros Eléctricos",
        topics: [
          "Diseño de tableros de distribución",
          "Selección de barras y componentes",
          "Coordinación de protecciones",
          "Tableros de control y automatización"
        ],
        duration: "10 horas"
      },
      {
        id: "4",
        module: "Módulo 4: Transferencia Automática",
        topics: [
          "Sistemas de transferencia automática (ATS)",
          "Integración UPS-Grupo electrógeno",
          "Lógica de conmutación",
          "Sistemas de respaldo en cascada"
        ],
        duration: "10 horas"
      },
      {
        id: "5",
        module: "Módulo 5: Mantenimiento y Diagnóstico",
        topics: [
          "Mantenimiento preventivo de UPS",
          "Pruebas de baterías",
          "Troubleshooting avanzado",
          "Gestión de sistemas críticos"
        ],
        duration: "10 horas"
      }
    ],
    certificate: true,
    includes: [
      "50 horas de capacitación especializada",
      "Software de simulación de UPS",
      "Acceso a laboratorio de sistemas de energía",
      "Certificado profesional RLC Academy",
      "Manuales técnicos especializados",
      "Kit de medición de calidad energética",
      "Visitas técnicas a instalaciones reales"
    ]
  }
];

// Función para obtener un curso por slug
export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find(course => course.slug === slug);
}

// Función para obtener todos los slugs de cursos
export function getAllCourseSlugs(): string[] {
  return coursesData.map(course => course.slug);
}

// Función para obtener cursos relacionados (excluye el curso actual)
export function getRelatedCourses(currentSlug: string, limit: number = 3): Course[] {
  return coursesData.filter(course => course.slug !== currentSlug).slice(0, limit);
}