import Link from 'next/link';
import { BookOpen, Users, FileText, Calendar } from 'lucide-react';

export default function DocenteDashboardPage() {
  const docenteSections = [
    {
      title: 'Mis Cursos',
      description: 'Gestiona tus cursos y materiales',
      href: '/docente/cursos',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Estudiantes',
      description: 'Ver y gestionar estudiantes inscritos',
      href: '/docente/estudiantes',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Tareas',
      description: 'Crear y revisar tareas',
      href: '/docente/tareas',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Horarios',
      description: 'Programar clases y eventos',
      href: '/docente/horarios',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel del Docente</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tus cursos, estudiantes y actividades
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {docenteSections.map((section) => {
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

      {/* Resumen rápido */}
      <div className="grid gap-4 md:grid-cols-3 pt-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Mis Cursos</h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Estudiantes</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tareas Pendientes</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">Cargando...</p>
        </div>
      </div>
    </div>
  );
}
