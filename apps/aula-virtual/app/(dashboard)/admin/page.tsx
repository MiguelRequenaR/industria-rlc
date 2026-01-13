import Link from 'next/link';
import { BookOpen, Users, BarChart3, Settings } from 'lucide-react';

export default function AdminDashboardPage() {
  const adminSections = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar docentes, estudiantes y permisos',
      href: '/admin/usuarios',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Gestión de Cursos',
      description: 'Crear, editar y administrar cursos',
      href: '/admin/cursos',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Reportes',
      description: 'Ver estadísticas y análisis del sistema',
      href: '/admin/reportes',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Configuración',
      description: 'Ajustes generales del sistema',
      href: '/admin/configuracion',
      icon: Settings,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona todos los aspectos del aula virtual
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${section.bgColor}`}>
                  <Icon className={`h-6 w-6 ${section.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-3 pt-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Usuarios</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Cursos Activos</h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Inscripciones</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
      </div>
    </div>
  );
}
