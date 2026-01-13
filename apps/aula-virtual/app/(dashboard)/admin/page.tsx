import { BookOpen, Users, GraduationCap, UserCheck, CheckCircle2, FolderOpen, FileText } from 'lucide-react';
import { getDashboardStats } from '@/actions/admin-actions';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers,
      icon: Users,
      description: 'Usuarios registrados',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Estudiantes',
      value: stats.totalStudents,
      icon: GraduationCap,
      description: 'Estudiantes activos',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Docentes',
      value: stats.totalTeachers,
      icon: UserCheck,
      description: 'Docentes registrados',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Administradores',
      value: stats.totalAdmins,
      icon: Users,
      description: 'Administradores del sistema',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Cursos',
      value: stats.totalCourses,
      icon: BookOpen,
      description: 'Cursos en el sistema',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      title: 'Cursos Publicados',
      value: stats.publishedCourses,
      icon: CheckCircle2,
      description: 'Cursos disponibles',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Inscripciones',
      value: stats.totalEnrollments,
      icon: UserCheck,
      description: 'Total de inscripciones',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Módulos',
      value: stats.totalModules,
      icon: FolderOpen,
      description: 'Módulos creados',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Lecciones',
      value: stats.totalLessons,
      icon: FileText,
      description: 'Lecciones disponibles',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">Panel de Administración</h1>
        <p className="text-gray-500 mt-2">
          Estadísticas generales del sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {card.description}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
