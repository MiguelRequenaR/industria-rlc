# Industriarlc Monorepo

Monorepo con Turborepo que incluye el ecosistema web de Industriarlc: sitio corporativo, academia y aula virtual.

## Estructura del proyecto

```
industriarlc-monorepo/
├── apps/
│   ├── web-corporativa/    # Sitio institucional (puerto 3000)
│   ├── web-academia/       # Web de la academia (puerto 3001)
│   └── aula-virtual/       # Plataforma de cursos (puerto 3002)
├── packages/
│   ├── eslint-config/      # Configuración compartida de ESLint
│   └── typescript-config/  # Configuración compartida de TypeScript
└── turbo.json
```

## Requisitos previos

- **Node.js** >= 18
- **Bun** 1.3.3 (gestor de paquetes)

## Instalación

```bash
bun install
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Ejecuta todas las apps en modo desarrollo |
| `bun run build` | Compila todas las apps |
| `bun run lint` | Ejecuta ESLint en todo el monorepo |
| `bun run check-types` | Verificación de tipos con TypeScript |

## Ejecutar una app específica

```bash
# Web corporativa (puerto 3000)
cd apps/web-corporativa && bun run dev

# Web academia (puerto 3001)
cd apps/web-academia && bun run dev

# Aula virtual (puerto 3002)
cd apps/aula-virtual && bun run dev
```

## Variables de entorno

Las apps que usan Supabase (`web-academia`, `aula-virtual`) necesitan:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo servidor) |

Crea archivos `.env.local` en cada app que lo requiera.

## Tecnologías

- **Framework**: Next.js 16
- **Estilos**: Tailwind CSS 4
- **Base de datos**: Supabase
- **Monorepo**: Turborepo
- **Lenguaje**: TypeScript 5.9
