import type { BlogPost } from "./types";
import type { BlogPost as DbBlogPost, BlogPostWithDetails } from "@/types/database";
import { createClient } from "./supabase/server";

// Función para transformar un post de la BD al formato de la interfaz
function mapDbBlogPostToBlogPost(dbPost: BlogPostWithDetails): BlogPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt || "",
    image: dbPost.image_url || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop",
    category: dbPost.category?.name || "Sin categoría",
    author: {
      name: "IndustriaRLC",
      avatar: dbPost.author?.avatar_url || undefined,
    },
    date: new Date(dbPost.created_at).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    readTime: dbPost.read_time,
    content: Array.isArray(dbPost.content) ? dbPost.content : [],
    featured: dbPost.is_featured,
  };
}

// Obtener todos los posts publicados desde la BD
export async function getBlogPostsFromDb(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(id, name, slug),
      author:profiles(id, full_name, avatar_url)
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return blogPostsFallback;
  }

  if (!data || data.length === 0) {
    return blogPostsFallback;
  }

  return data.map(mapDbBlogPostToBlogPost);
}

// Obtener un post por slug desde la BD
export async function getBlogBySlugFromDb(slug: string): Promise<BlogPost | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      category:blog_categories(id, name, slug),
      author:profiles(id, full_name, avatar_url)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    console.error("Error fetching blog post:", error);
    // Fallback a los datos hardcodeados
    return blogPostsFallback.find(post => post.slug === slug);
  }

  return mapDbBlogPostToBlogPost(data as any);
}

// Obtener categorías únicas desde la BD
export async function getBlogCategoriesFromDb(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_categories")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching blog categories:", error);
    return blogCategories;
  }

  if (!data || data.length === 0) {
    return blogCategories;
  }

  return ["Todos", ...data.map(cat => cat.name)];
}

// Posts de fallback (los que ya tenías hardcodeados)
export const blogPostsFallback: BlogPost[] = [
  {
    id: "1",
    title: "Dominando el código electricista en 2025: Cambios Críticos que debes Conocer",
    slug: "codigo-electricista-2025-cambios-criticos",
    excerpt: "Un análisis profundo de los últimos cambios en el código eléctrico nacional y cómo afectan tu trabajo diario como electricista. No te dejes sorprender durante tu próxima inspección.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop",
    category: "Actualizaciones",
    author: {
      name: "Juan Perez"
    },
    date: "24 Oct, 2025",
    readTime: "10 min de Lectura",
    featured: true,
    content: [
      {
        type: 'heading',
        value: 'Introducción a los Cambios del Código 2025'
      },
      {
        type: 'text',
        value: 'El Código Nacional de Electricidad ha experimentado actualizaciones significativas este año 2025, impactando directamente la forma en que los profesionales del sector eléctrico deben realizar sus instalaciones y mantenimientos. Estos cambios no solo buscan mejorar la seguridad, sino también adaptarse a las nuevas tecnologías emergentes en el campo de la electricidad.'
      },
      {
        type: 'text',
        value: 'Es fundamental que todo electricista profesional se mantenga actualizado con estas modificaciones para garantizar la conformidad con las normativas vigentes y, lo más importante, la seguridad de las instalaciones que realiza.'
      },
      {
        type: 'heading',
        value: 'Principales Cambios en Instalaciones Residenciales'
      },
      {
        type: 'text',
        value: 'Las instalaciones residenciales han experimentado cambios importantes en cuanto a los requisitos mínimos de protección. Ahora se exige la instalación obligatoria de interruptores diferenciales en todos los circuitos, incluyendo aquellos que anteriormente estaban exentos.'
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop'
      },
      {
        type: 'text',
        value: 'Además, los sistemas de puesta a tierra han sido revisados completamente. Las nuevas normativas especifican valores de resistencia más estrictos y métodos de medición más precisos que deben ser implementados en todas las instalaciones nuevas y renovaciones mayores.'
      },
      {
        type: 'heading',
        value: 'Nuevos Requisitos para Instalaciones Comerciales'
      },
      {
        type: 'text',
        value: 'En el ámbito comercial, los cambios son aún más significativos. Se han incorporado nuevos requisitos para la protección contra sobretensiones transitorias, especialmente en instalaciones que manejan equipos electrónicos sensibles.'
      },
      {
        type: 'text',
        value: 'Las instalaciones comerciales ahora deben incluir sistemas de monitoreo de energía que permitan detectar anomalías en tiempo real. Este requisito responde a la necesidad de mejorar la eficiencia energética y prevenir fallas eléctricas antes de que se conviertan en problemas mayores.'
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1470&auto=format&fit=crop'
      },
      {
        type: 'heading',
        value: 'Adaptación a Energías Renovables'
      },
      {
        type: 'text',
        value: 'Una de las actualizaciones más importantes del código 2025 es la inclusión de normativas específicas para instalaciones con energías renovables. Los sistemas fotovoltaicos, almacenamiento de energía con baterías y puntos de carga para vehículos eléctricos ahora cuentan con secciones dedicadas en el código.'
      },
      {
        type: 'text',
        value: 'Estas nuevas normativas establecen requisitos claros para la instalación segura de estos sistemas, incluyendo distancias mínimas, protecciones específicas y procedimientos de desconexión de emergencia.'
      },
      {
        type: 'heading',
        value: 'Conclusión y Recomendaciones'
      },
      {
        type: 'text',
        value: 'Mantenerse actualizado con estos cambios no es opcional para los profesionales del sector eléctrico. Es una responsabilidad que garantiza no solo el cumplimiento legal, sino también la seguridad de las personas y propiedades.'
      },
      {
        type: 'text',
        value: 'Recomendamos a todos los electricistas participar en cursos de actualización y certificación que cubran estos nuevos requisitos. En RLC Academy 360, ofrecemos programas especializados que te mantendrán al día con las últimas normativas del sector.'
      }
    ]
  },
  {
    id: "2",
    title: "Instalaciones Eléctricas: Guía Completa para Principiantes",
    slug: "instalaciones-electricas-guia-principiantes",
    excerpt: "Domina el arte de las instalaciones eléctricas residenciales y comerciales siguiendo las normas vigentes. Una guía paso a paso para iniciar tu carrera.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop",
    category: "Tutoriales",
    author: {
      name: "Juan Perez"
    },
    date: "24 Oct, 2025",
    readTime: "8 min de Lectura",
    featured: false,
    content: [
      {
        type: 'heading',
        value: '¿Qué son las Instalaciones Eléctricas?'
      },
      {
        type: 'text',
        value: 'Las instalaciones eléctricas son el conjunto de elementos y sistemas que permiten la distribución y uso seguro de la energía eléctrica en edificaciones residenciales, comerciales o industriales.'
      },
      {
        type: 'heading',
        value: 'Componentes Básicos'
      },
      {
        type: 'text',
        value: 'Una instalación eléctrica básica consta de varios componentes esenciales: el medidor de energía, el tablero de distribución, los circuitos derivados, los dispositivos de protección y los puntos de uso final como tomacorrientes y luminarias.'
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop'
      },
      {
        type: 'heading',
        value: 'Normativas y Seguridad'
      },
      {
        type: 'text',
        value: 'Todo trabajo eléctrico debe realizarse siguiendo el Código Nacional de Electricidad. Este código establece los estándares mínimos de seguridad que deben cumplirse en todas las instalaciones.'
      },
      {
        type: 'text',
        value: 'La seguridad es primordial. Siempre se debe trabajar con la energía desconectada, usar herramientas aisladas y el equipo de protección personal adecuado.'
      }
    ]
  },
  {
    id: "3",
    title: "Seguridad Eléctrica: Protocolos que Salvan Vidas",
    slug: "seguridad-electrica-protocolos-esenciales",
    excerpt: "Conoce los protocolos de seguridad eléctrica que todo profesional debe dominar. Prevención de accidentes y respuesta ante emergencias eléctricas.",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1470&auto=format&fit=crop",
    category: "Seguridad Eléctrica",
    author: {
      name: "Juan Perez"
    },
    date: "20 Oct, 2025",
    readTime: "12 min de Lectura",
    featured: false,
    content: [
      {
        type: 'heading',
        value: 'Importancia de la Seguridad Eléctrica'
      },
      {
        type: 'text',
        value: 'La electricidad es una herramienta poderosa pero peligrosa. Cada año, miles de accidentes eléctricos ocurren debido a la falta de conocimiento o descuido en las medidas de seguridad.'
      },
      {
        type: 'heading',
        value: 'Riesgos Eléctricos Principales'
      },
      {
        type: 'text',
        value: 'Los principales riesgos eléctricos incluyen el shock eléctrico, las quemaduras por arco eléctrico, las explosiones y los incendios. Cada uno requiere medidas de prevención específicas.'
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop'
      },
      {
        type: 'heading',
        value: 'Equipo de Protección Personal'
      },
      {
        type: 'text',
        value: 'El EPP adecuado es fundamental: guantes dieléctricos, calzado de seguridad, casco con protección facial, ropa resistente al arco eléctrico y gafas de seguridad son elementos esenciales.'
      },
      {
        type: 'text',
        value: 'Nunca trabajes en sistemas energizados sin el equipo apropiado y la capacitación necesaria. La seguridad no es negociable.'
      }
    ]
  },
  {
    id: "4",
    title: "Certificación Eléctrica: Tu Camino al Éxito Profesional",
    slug: "certificacion-electrica-camino-exito",
    excerpt: "Descubre por qué obtener certificaciones profesionales es clave para destacar en el mercado laboral eléctrico. Guía de certificaciones disponibles.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop",
    category: "Certificación",
    author: {
      name: "Juan Perez"
    },
    date: "18 Oct, 2025",
    readTime: "7 min de Lectura",
    featured: false,
    content: [
      {
        type: 'heading',
        value: '¿Por qué Certificarse?'
      },
      {
        type: 'text',
        value: 'Las certificaciones profesionales demuestran tu competencia y compromiso con la excelencia. En el campo eléctrico, pueden ser la diferencia entre un trabajo bien remunerado y uno promedio.'
      },
      {
        type: 'heading',
        value: 'Tipos de Certificaciones'
      },
      {
        type: 'text',
        value: 'Existen diversas certificaciones disponibles: técnico electricista, electricista industrial, especialista en instalaciones, certificación en seguridad eléctrica, y especialización en sistemas de energía renovable.'
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1470&auto=format&fit=crop'
      },
      {
        type: 'heading',
        value: 'Beneficios Profesionales'
      },
      {
        type: 'text',
        value: 'Las certificaciones te abren puertas a mejores oportunidades laborales, aumentan tu credibilidad profesional, te mantienen actualizado con las últimas tecnologías y normativas, y pueden incrementar significativamente tus ingresos.'
      },
      {
        type: 'text',
        value: 'En RLC Academy 360 ofrecemos programas de certificación reconocidos nacionalmente que te prepararán para destacar en tu carrera profesional.'
      }
    ]
  }
];

// Mantener referencia a los posts para funciones síncronas (fallback)
export const blogPosts = blogPostsFallback;

// Función asíncrona para obtener un post por slug (prioriza BD)
export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  return await getBlogBySlugFromDb(slug);
}

// Función para obtener todos los slugs (para generateStaticParams)
export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPostsFromDb();
  return posts.map(post => post.slug);
}

// Función para obtener el post destacado
export async function getFeaturedBlog(): Promise<BlogPost | undefined> {
  const posts = await getBlogPostsFromDb();
  return posts.find(post => post.featured);
}

// Función para obtener posts regulares (no destacados)
export async function getRegularBlogs(limit?: number): Promise<BlogPost[]> {
  const posts = await getBlogPostsFromDb();
  const regular = posts.filter(post => !post.featured);
  return limit ? regular.slice(0, limit) : regular;
}

// Función para filtrar posts por categoría
export async function getBlogsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPostsFromDb();
  if (category === "Todos") return posts;
  return posts.filter(post => post.category === category);
}

// Obtener todas las categorías
export async function getBlogCategories(): Promise<string[]> {
  return await getBlogCategoriesFromDb();
}

// Categorías de fallback
export const blogCategories = [
  "Todos",
  "Seguridad Eléctrica",
  "Certificación",
  "Tutoriales",
  "Noticias",
  "Actualizaciones"
];
